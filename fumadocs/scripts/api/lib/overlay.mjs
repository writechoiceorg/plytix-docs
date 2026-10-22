// Step 3: apply our OpenAPI Overlay 1.0 documents (fumadocs/overlays/).
//
// The files are standard Overlay 1.0 so any compliant tool can read them (CI
// cross-checks against openapi-format). This applier adds what the standard
// leaves out:
//   - targets must match one of a fixed set of shapes (TARGET_SHAPES), so every
//     anchor is a path+method, a parameter name+in, or a component name, never
//     an array position or a free-form query;
//   - for every node an action touches, it records the node's type signature
//     and the upstream value of each field it overrides, which drift.mjs
//     compares against overlays/baseline.lock.json.
//
// Merge semantics follow Overlay 1.0 `update`: objects merge recursively,
// arrays append, anything else is replaced. Appending a parameter that already
// exists (same name+in) is refused and reported, because it means upstream now
// declares something one of our fixes adds.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { paths as jsonPaths } from 'jsonpathly';
import {
  clone,
  getAt,
  isPlainObject,
  parseNormalizedPath,
  resolveStableKey,
  stableKey,
} from './util.mjs';

const OP = String.raw`\$\.paths\['[^']+'\]\.(?:get|put|post|delete|patch)`;
const PARAM = String.raw`\.parameters\[\?\(?@\.name ?== ?'[^']+' && @\.in ?== ?'(?:path|query|header|cookie)'\)?\]`;
const MEDIA = String.raw`\.content\['[^']+'\]`;
const STATUS = String.raw`\['(?:\d{3}|[1-5]XX|default)'\]`;
const NAME = String.raw`(?:\.[A-Za-z0-9_-]+|\['[^']+'\])`;
const SCHEMA = String.raw`\$\.components\.schemas${NAME}(?:\.properties${NAME}|\.(?:oneOf|anyOf|allOf)\[\d+\]|\.items)*`;

export const TARGET_SHAPES = [
  { name: 'root', re: /^\$$/ },
  { name: 'operation', re: new RegExp(`^${OP}$`) },
  { name: 'parameter', re: new RegExp(`^${OP}${PARAM}$`) },
  // `update` merges objects, so replacing an object example takes a remove first.
  { name: 'parameter-example', re: new RegExp(`^${OP}${PARAM}\\.example$`) },
  { name: 'request-body', re: new RegExp(`^${OP}\\.requestBody(?:${MEDIA})?$`) },
  { name: 'response', re: new RegExp(`^${OP}\\.responses${STATUS}(?:${MEDIA})?$`) },
  { name: 'schema', re: new RegExp(`^${SCHEMA}$`) },
  { name: 'shared-parameter', re: new RegExp(`^\\$\\.paths\\.\\*\\.\\*${PARAM}$`), wildcard: true },
  { name: 'shared-parameter-example', re: new RegExp(`^\\$\\.paths\\.\\*\\.\\*${PARAM}\\.example$`), wildcard: true },
  { name: 'shared-response', re: new RegExp(`^\\$\\.paths\\.\\*\\.\\*\\.responses${STATUS}$`), wildcard: true },
];

export const ABSENT = Object.freeze({ $absent: true });
const ARRAY_PRESENT = '<array>';

const shapeOf = (target) => TARGET_SHAPES.find((s) => s.re.test(target));

async function listYaml(dir, rel = '') {
  let entries;
  try {
    entries = await readdir(path.join(dir, rel), { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const entry of entries) {
    const child = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (entry.name !== 'examples') out.push(...(await listYaml(dir, child)));
    } else if (/\.ya?ml$/.test(entry.name)) {
      out.push(child);
    }
  }
  return out;
}

// Loads every overlay under `dir` in lexical order of relative path
// (00-fixes, 10-shared, 20-meta, ops/*, schemas/*): later files win.
export async function loadOverlays(dir) {
  const files = (await listYaml(dir)).sort();
  const overlays = [];
  const errors = [];

  for (const rel of files) {
    let doc;
    try {
      doc = YAML.parse(await readFile(path.join(dir, rel), 'utf-8'));
    } catch (err) {
      errors.push(`${rel}: invalid YAML (${err.message})`);
      continue;
    }
    if (!doc || !/^1\.0\.\d+$/.test(String(doc.overlay))) {
      errors.push(`${rel}: must declare "overlay: 1.0.0"`);
      continue;
    }
    if (!doc.info?.title || !doc.info?.version) errors.push(`${rel}: info.title and info.version are required`);
    if (!Array.isArray(doc.actions)) {
      errors.push(`${rel}: "actions" must be a list`);
      continue;
    }

    const seen = new Set();
    doc.actions.forEach((action, i) => {
      const where = `${rel} action #${i + 1}`;
      const target = action?.target;
      if (typeof target !== 'string') return errors.push(`${where}: missing target`);
      if (seen.has(target)) errors.push(`${where}: target repeated in this file: ${target}`);
      seen.add(target);
      if (!shapeOf(target)) {
        errors.push(`${where}: target is not an allowed shape (see overlays/README.md): ${target}`);
      }
      const hasUpdate = Object.hasOwn(action, 'update');
      if (hasUpdate === (action.remove === true)) {
        errors.push(`${where}: needs exactly one of "update" or "remove: true"`);
      }
      if (rel.startsWith('00-fixes') && !action['x-plytix-question']) {
        errors.push(`${where}: upstream fixes must cite an x-plytix-question ID (overlays/QUESTIONS.md)`);
      }
    });

    overlays.push({ file: rel, doc });
  }
  return { overlays, errors };
}

// Replaces { "x-example-file": "<path>" } objects with the JSON file's
// contents (paths relative to overlays/examples/). Keeps large payloads out of
// the YAML. CI inlines these the same way before cross-checking.
export async function resolveExampleFiles(value, examplesDir) {
  if (Array.isArray(value)) {
    return Promise.all(value.map((v) => resolveExampleFiles(v, examplesDir)));
  }
  if (!isPlainObject(value)) return value;
  const keys = Object.keys(value);
  if (keys.length === 1 && keys[0] === 'x-example-file') {
    const file = path.resolve(examplesDir, value['x-example-file']);
    if (!file.startsWith(path.resolve(examplesDir) + path.sep)) {
      throw new Error(`x-example-file escapes overlays/examples/: ${value['x-example-file']}`);
    }
    return JSON.parse(await readFile(file, 'utf-8'));
  }
  const out = {};
  for (const k of keys) out[k] = await resolveExampleFiles(value[k], examplesDir);
  return out;
}

// --- type signatures: what drift treats as "the type changed" ---------------

const typeSig = (s) => {
  if (!isPlainObject(s)) return null;
  const out = {};
  for (const k of ['type', '$ref', 'format', 'const']) if (s[k] !== undefined) out[k] = s[k];
  if (Array.isArray(s.enum)) out.enum = [...s.enum];
  for (const k of ['oneOf', 'anyOf', 'allOf']) {
    if (Array.isArray(s[k])) out[k] = s[k].map((b) => ({ type: b?.type ?? null, $ref: b?.$ref ?? null }));
  }
  if (isPlainObject(s.items)) out.items = { type: s.items.type ?? null, $ref: s.items.$ref ?? null };
  return out;
};

const contentSig = (content) =>
  Object.fromEntries(Object.entries(content ?? {}).map(([ct, m]) => [ct, typeSig(m?.schema)]));

const sigFor = (shape, node) => {
  if (node === undefined) return null; // the node exists only because an overlay added it
  switch (shape) {
    case 'parameter':
    case 'shared-parameter':
      return { in: node.in, required: !!node.required, schema: typeSig(node.schema) };
    case 'request-body':
    case 'response':
    case 'shared-response':
      return node.content ? contentSig(node.content) : typeSig(node.schema);
    case 'schema':
      return typeSig(node);
    default:
      return null;
  }
};

// --- merge ------------------------------------------------------------------

const pointer = (rel) => rel.map((s) => String(s).replace(/~/g, '~0').replace(/\//g, '~1')).join('/');

function mergeInto(target, update, base, rel, leaves, duplicates) {
  for (const [k, u] of Object.entries(update)) {
    const t = target[k];
    const b = isPlainObject(base) ? base[k] : undefined;
    const here = [...rel, k];

    if (isPlainObject(u) && isPlainObject(t)) {
      mergeInto(t, u, b, here, leaves, duplicates);
    } else if (Array.isArray(u) && (Array.isArray(t) || t === undefined)) {
      const arr = Array.isArray(t) ? t : (target[k] = []);
      for (const item of u) {
        const clash =
          isPlainObject(item) && item.name && item.in &&
          arr.some((p) => p?.name === item.name && p?.in === item.in);
        if (clash) duplicates.push(`${pointer(here)}: ${item.name}@${item.in}`);
        else arr.push(clone(item));
      }
      // Recording a whole upstream array would flag every unrelated change to
      // it; record only whether upstream has it at all.
      leaves[pointer(here)] = b === undefined ? ABSENT : ARRAY_PRESENT;
    } else {
      target[k] = clone(u);
      leaves[pointer(here)] = b === undefined ? ABSENT : clone(b);
    }
  }
}

// Applies every overlay to `doc` in place. `base` is the filtered+normalized
// upstream document before any overlay; upstream values and type signatures
// are read from it, so one overlay overriding another (a per-operation edit
// over a shared snippet) never reads as upstream drift.
// "GET /api/v3/x" for a target anchored on one operation, else null (wildcards, schemas, root).
export const targetOperation = (target) => {
  const m = target.match(/^\$\.paths\['([^']+)'\]\.(get|put|post|delete|patch)\b/);
  return m ? `${m[2].toUpperCase()} ${m[1]}` : null;
};

export async function applyOverlays(doc, base, overlays, { examplesDir, held = [] } = {}) {
  const records = [];
  const errors = [];
  const heldOps = new Set(held);

  for (const { file, doc: overlay } of overlays) {
    for (const action of overlay.actions) {
      const shape = shapeOf(action.target);
      if (!shape) continue; // reported by loadOverlays
      const record = {
        id: `${file}::${action.target}`,
        file,
        target: action.target,
        shape: shape.name,
        expect: shape.wildcard ? 'many' : 'one',
        matches: [],
        duplicates: [],
      };
      records.push(record);

      // Edits for an on-hold operation stay in the file but aren't applied
      // (the operation isn't in the filtered spec); drift keeps their baseline.
      if (heldOps.has(targetOperation(action.target))) {
        record.held = true;
        continue;
      }

      let found;
      try {
        found = action.target === '$' ? ['$'] : jsonPaths(doc, action.target);
      } catch (err) {
        errors.push(`${record.id}: JSONPath error (${err.message})`);
        continue;
      }

      let update;
      if (Object.hasOwn(action, 'update')) {
        try {
          update = await resolveExampleFiles(action.update, examplesDir);
        } catch (err) {
          errors.push(`${record.id}: ${err.message}`);
          continue;
        }
        if (!isPlainObject(update)) {
          errors.push(`${record.id}: "update" must be an object`);
          continue;
        }
      }

      // Resolve every match before mutating, so removals can't shift indexes
      // under later matches.
      const nodes = found.map((p) => {
        const segments = parseNormalizedPath(p);
        const key = stableKey(doc, segments);
        return { segments, key, node: getAt(doc, segments), baseNode: resolveStableKey(base, key) };
      });

      for (const { segments, key, node, baseNode } of nodes) {
        const match = { key, sig: sigFor(shape.name, baseNode), upstream: {} };
        record.matches.push(match);

        if (action.remove === true) {
          match.upstream['.'] = baseNode === undefined ? ABSENT : clone(baseNode);
          const parent = getAt(doc, segments.slice(0, -1));
          const last = segments.at(-1);
          if (Array.isArray(parent)) parent.splice(parent.indexOf(node), 1);
          else delete parent[last];
          continue;
        }
        if (!isPlainObject(node)) {
          errors.push(`${record.id}: matched a non-object node at ${key}`);
          continue;
        }
        mergeInto(node, update, baseNode, [], match.upstream, record.duplicates);
      }
    }
  }
  return { records, errors };
}
