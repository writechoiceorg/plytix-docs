// One-off: moves the editorial content that lived in the hand-edited
// fumadocs/openapi.json into overlay files, and seeds the structural overlays.
//
//   node scripts/api/migrate-legacy.mjs
//
// Inputs:
//   ../openapi_pimv3.json      the superseded upstream spec openapi.json was built from
//   ./openapi.json             the hand-edited spec (the editorial delta = it minus the above)
//   ./upstream/openapi-v3.json the current upstream spec (targets must exist here)
// Outputs (refuses to overwrite existing files):
//   overlays/00-fixes.yaml     missing path parameters (upstream bug, OAS-1)
//   overlays/20-meta.yaml      security scheme + nav tag order
//   overlays/ops/<tag>.yaml    migrated operation descriptions / summary / operationId
//   overlays/schemas/<tag>.yaml migrated schema description fixes
//
// Before writing, it proves the migration is lossless: applying the generated
// operation overlays to the superseded spec must reproduce every editorial
// field of the hand-edited openapi.json.

import { existsSync } from 'node:fs';
import path from 'node:path';
import { filterSpec } from './lib/filter.mjs';
import { normalizeSpec } from './lib/normalize.mjs';
import { applyOverlays } from './lib/overlay.mjs';
import { SITE_ROOT, clone, deepEqual, operations, readJson, readYaml, writeYaml } from './lib/util.mjs';

const TODAY = new Date().toISOString().slice(0, 10);
const OVERLAYS = path.join(SITE_ROOT, 'overlays');
const CARRIED = ['summary', 'description', 'operationId'];

const legacyUpstream = await readJson(path.join(SITE_ROOT, '../openapi_pimv3.json'));
const handEdited = await readJson(path.join(SITE_ROOT, 'openapi.json'));
const upstream = await readJson(path.join(SITE_ROOT, 'upstream/openapi-v3.json'));
const visibility = await readYaml(path.join(SITE_ROOT, 'upstream/visibility.yaml'));

const current = clone(upstream);
filterSpec(current, visibility);
const publicOps = new Map([...operations(current)].map((o) => [o.key, o]));

const target = (routePath, method) => `$.paths['${routePath}'].${method}`;
const fileTag = (op) => (op.tags ?? []).find((t) => t !== 'v3') ?? 'untagged';
const successCodes = (op) => Object.keys(op?.responses ?? {}).filter((c) => /^2/.test(c)).sort().join(',');

const overlayDoc = (title, actions) => ({
  overlay: '1.0.0',
  info: { title, version: '1.0.0' },
  actions,
});

const report = { migratedOps: 0, droppedOps: [], staleStatus: [], migratedSchemas: 0, droppedSchemas: [] };

// --- operations ---------------------------------------------------------------
const opActions = {}; // tag -> actions
for (const { key, path: routePath, method, op: legacyOp } of operations(legacyUpstream)) {
  const edited = handEdited.paths?.[routePath]?.[method];
  if (!edited) continue;
  const update = {};
  for (const field of CARRIED) {
    if (edited[field] !== undefined && edited[field] !== legacyOp[field]) update[field] = edited[field];
  }
  if (!Object.keys(update).length) continue;

  const now = publicOps.get(key);
  if (!now) {
    report.droppedOps.push(`${key} (${Object.keys(update).join(', ')}): not a public operation in the current spec`);
    continue;
  }
  const action = {
    target: target(routePath, method),
    description: `Migrated ${TODAY} from the hand-edited openapi.json.`,
    update,
  };
  const before = successCodes(legacyOp);
  const after = successCodes(now.op);
  if (update.description && before !== after) {
    action['x-review'] = `Success status changed upstream (${before} -> ${after}); this description may describe the old response.`;
    report.staleStatus.push(`${key} (${before} -> ${after})`);
  }
  (opActions[fileTag(now.op)] ??= []).push(action);
  report.migratedOps++;
}

// --- schemas ------------------------------------------------------------------
// Which public tag first reaches each schema, to file schema edits next to the
// operations that use them.
const schemaTag = new Map();
for (const { op } of operations(current)) {
  const tag = fileTag(op);
  const queue = [op];
  while (queue.length) {
    const node = queue.shift();
    if (Array.isArray(node)) queue.push(...node);
    else if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (k === '$ref' && typeof v === 'string' && v.startsWith('#/components/schemas/')) {
          const name = v.split('/').pop();
          if (!schemaTag.has(name)) {
            schemaTag.set(name, tag);
            queue.push(current.components.schemas[name]);
          }
        } else queue.push(v);
      }
    }
  }
}

const schemaActions = {};
for (const [name, editedSchema] of Object.entries(handEdited.components?.schemas ?? {})) {
  const legacySchema = legacyUpstream.components?.schemas?.[name];
  if (!legacySchema) continue;
  // The only schema edits were description text; find them at any depth.
  const walk = (edited, legacy, segs) => {
    if (!edited || typeof edited !== 'object') return;
    for (const [k, v] of Object.entries(edited)) {
      if (k === 'description' && typeof v === 'string' && legacy && v !== legacy[k]) {
        const where = `${name}${segs.length ? '.' + segs.join('.') : ''}`;
        if (!current.components.schemas[name]) {
          report.droppedSchemas.push(`${where}: schema not public in the current spec`);
          continue;
        }
        if (!segs.every((s, i) => (i % 2 === 0 ? s === 'properties' : true))) {
          report.droppedSchemas.push(`${where}: edit is not on the schema or a property; port by hand`);
          continue;
        }
        const live = segs.reduce((n, s) => n?.[s], current.components.schemas[name]);
        if (!live) {
          report.droppedSchemas.push(`${where}: property gone from the current spec`);
          continue;
        }
        // The edit was a text fix ("v1:" -> "V1:"). Re-apply it to the current
        // upstream text so newer upstream wording isn't reverted.
        const text = live.description === legacy.description ? v : live.description.replace(/\bv1(?=[:'’])/g, 'V1');
        const t = `$.components.schemas.${name}${segs.map((s) => `.${s}`).join('')}`;
        (schemaActions[schemaTag.get(name) ?? 'shared'] ??= []).push({
          target: t,
          description: `Migrated ${TODAY} from the hand-edited openapi.json.`,
          update: { description: text },
        });
        report.migratedSchemas++;
      } else if (typeof v === 'object') {
        walk(v, legacy?.[k], [...segs, k]);
      }
    }
  };
  walk(editedSchema, legacySchema, []);
}

// --- 00-fixes: undeclared path parameters (OAS-1) -------------------------------
const fixActions = [];
for (const { key, path: routePath, method, op } of operations(current)) {
  const declared = new Set((op.parameters ?? []).filter((p) => p.in === 'path').map((p) => p.name));
  const missing = [...routePath.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]).filter((n) => !declared.has(n));
  if (!missing.length) continue;
  fixActions.push({
    target: target(routePath, method),
    description: `${key} uses ${missing.map((n) => `{${n}}`).join(', ')} in its path but doesn't declare ${missing.length > 1 ? 'them' : 'it'}.`,
    'x-plytix-question': 'OAS-1',
    update: {
      parameters: missing.map((name) => ({ name, in: 'path', required: true, schema: { type: 'string', title: name } })),
    },
  });
}

// --- 20-meta: security + nav order ---------------------------------------------
normalizeSpec(current);
const publicTags = new Set([...operations(current)].map((o) => o.op.tags?.[0]));
const navOrder = (handEdited.tags ?? []).map((t) => t.name).filter((t) => publicTags.has(t));
const metaActions = [
  {
    target: '$',
    description: 'Bearer auth (verified live; see /docs/reference/v3/authentication) and the nav order of the endpoint groups.',
    update: {
      security: [{ bearerAuth: [] }],
      tags: navOrder.map((name) => ({ name })),
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            description:
              'Exchange your API key and password for a short-lived access token, then send it as `Authorization: Bearer <token>`. See [Authentication](/docs/reference/v3/authentication).',
          },
        },
      },
    },
  },
];

// --- round-trip proof -------------------------------------------------------------
{
  const replay = clone(legacyUpstream);
  normalizeSpec(replay);
  const overlays = Object.entries(opActions).map(([tag, actions]) => ({
    file: `ops/${tag}.yaml`,
    doc: overlayDoc(tag, actions),
  }));
  const { errors } = await applyOverlays(replay, clone(replay), overlays, {});
  if (errors.length) throw new Error(`Round trip failed to apply:\n${errors.join('\n')}`);
  const mismatches = [];
  for (const { key, path: routePath, method, op } of operations(handEdited)) {
    const legacyOp = legacyUpstream.paths?.[routePath]?.[method];
    if (!legacyOp || !publicOps.has(key)) continue;
    for (const field of CARRIED) {
      if (op[field] === legacyOp[field]) continue;
      if (!deepEqual(replay.paths[routePath][method][field], op[field])) mismatches.push(`${key} .${field}`);
    }
  }
  if (mismatches.length) throw new Error(`Round trip lost editorial content:\n${mismatches.join('\n')}`);
  console.log('Round trip OK: the operation overlays reproduce every editorial field of openapi.json (public operations).');
}

// --- write ------------------------------------------------------------------------
const header = (what) =>
  `# ${what}\n# Generated ${TODAY} by scripts/api/migrate-legacy.mjs; edit freely from here on.\n`;
const outputs = [
  ['00-fixes.yaml', overlayDoc('Upstream spec fixes', fixActions), 'Patches for upstream spec bugs. Each cites a question in overlays/QUESTIONS.md.\n# The build fails with REDUNDANT_FIX once Plytix fixes one upstream: then delete it.'],
  ['20-meta.yaml', overlayDoc('Spec-level metadata', metaActions), 'Spec-level metadata: security, nav order of the endpoint groups.'],
  ...Object.entries(opActions).map(([tag, actions]) => [`ops/${tag}.yaml`, overlayDoc(`${tag} operations`, actions), `Operation edits for the ${tag} endpoints.`]),
  ...Object.entries(schemaActions).map(([tag, actions]) => [`schemas/${tag}.yaml`, overlayDoc(`${tag} schemas`, actions), `Schema edits for the ${tag} endpoints.`]),
];
for (const [rel] of outputs) {
  if (existsSync(path.join(OVERLAYS, rel))) throw new Error(`overlays/${rel} already exists; not overwriting.`);
}
for (const [rel, doc, what] of outputs) await writeYaml(path.join(OVERLAYS, rel), doc, header(what));

console.log(`Wrote ${outputs.length} overlay files.`);
console.log(`Operations migrated: ${report.migratedOps}; schema descriptions migrated: ${report.migratedSchemas}; path-param fixes: ${fixActions.length}.`);
if (report.staleStatus.length) {
  console.log(`\nDescriptions whose success status changed upstream (marked x-review):\n  ${report.staleStatus.join('\n  ')}`);
}
if (report.droppedOps.length) console.log(`\nNOT migrated (operations):\n  ${report.droppedOps.join('\n  ')}`);
if (report.droppedSchemas.length) console.log(`\nNOT migrated (schemas):\n  ${report.droppedSchemas.join('\n  ')}`);
