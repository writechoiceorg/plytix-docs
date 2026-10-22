// Step 4: validate the merged spec before it is allowed to replace
// openapi.json. Edits can break a document, so this runs after the overlays.
//
//   - Redocly CLI lint (OpenAPI 3.1 structure + rules in fumadocs/redocly.yaml)
//   - every internal /docs/... link in the spec resolves to a page that exists
//     (hand-written MDX, or a reference page this spec will generate)
//   - every operation has a tag (it decides the nav group and URL)
//   - content: every operation has a description, upstream parameter and field
//     descriptions survive, and no success body renders as `null`

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { SITE_ROOT, operations, tagFolder } from './util.mjs';

export function redoclyLint(specFile, configFile) {
  const cli = path.join(SITE_ROOT, 'node_modules/@redocly/cli/bin/cli.js');
  const res = spawnSync(
    process.execPath,
    [cli, 'lint', specFile, '--config', configFile, '--format', 'json', '--max-problems', '100000'],
    { encoding: 'utf-8', maxBuffer: 256 * 1024 * 1024, cwd: SITE_ROOT },
  );
  let report;
  try {
    report = JSON.parse(res.stdout);
  } catch {
    return { errors: [`Redocly lint did not run: ${res.stderr || res.stdout}`], warnings: [] };
  }
  const fmt = (p) => `${p.ruleId}: ${p.message} (${p.location?.[0]?.pointer ?? '?'})`;
  return {
    errors: report.problems.filter((p) => p.severity === 'error').map(fmt),
    warnings: report.problems.filter((p) => p.severity === 'warn').map(fmt),
  };
}

// Routes every V3 reference page will have after generation.
export const referenceUrl = (tag, operationId) => `/reference/v3/${tagFolder(tag)}/${operationId}`;

function collectStrings(node, out = []) {
  if (typeof node === 'string') out.push(node);
  else if (Array.isArray(node)) node.forEach((n) => collectStrings(n, out));
  else if (node && typeof node === 'object') Object.values(node).forEach((n) => collectStrings(n, out));
  return out;
}

export function checkSpec(spec, { contentDir }) {
  const errors = [];
  const generated = new Set();
  const generatedTags = new Set();
  for (const { key, op } of operations(spec)) {
    if (!op.tags?.length) errors.push(`${key}: no tag, so it has no nav group or URL`);
    else if (op.operationId) {
      generated.add(referenceUrl(op.tags[0], op.operationId));
      generatedTags.add(tagFolder(op.tags[0]));
    }
  }
  // Pages under a generated group are rebuilt from this spec, so the files on
  // disk may be stale (a renamed operationId leaves its old MDX until
  // generate-docs runs). Check those links against the spec, not the disk.
  const isGeneratedGroup = (url) => {
    const m = url.match(/^\/reference\/v3\/([^/]+)\/[^/]+$/);
    return m && generatedTags.has(m[1]);
  };

  const linkRe = /\]\((\/(?:docs|reference)\/[^)\s#]*)(?:#[^)\s]*)?\)|href="(\/(?:docs|reference)\/[^"#]*)/g;
  const broken = new Set();
  for (const text of collectStrings(spec.paths).concat(collectStrings(spec.components))) {
    for (const m of text.matchAll(linkRe)) {
      const url = (m[1] ?? m[2]).replace(/\/$/, '');
      if (generated.has(url)) continue;
      if (isGeneratedGroup(url)) {
        broken.add(url);
        continue;
      }
      // /docs/<x> is content/docs/<x>; /reference/<x> is content/docs/reference/<x>.
      const rel = url.startsWith('/reference') ? 'reference' + url.slice('/reference'.length) : url.replace(/^\/docs\/?/, '');
      const candidates = [`${rel}.mdx`, `${rel}/index.mdx`, `${rel}.md`].map((c) => path.join(contentDir, c));
      if (!candidates.some((c) => existsSync(c))) broken.add(url);
    }
  }
  for (const url of broken) errors.push(`broken internal link in the spec: ${url}`);
  return { errors };
}

// What a reader needs on every published page: an operation description, the
// upstream descriptions of the parameters and fields we still publish, and a
// success body that renders as something other than `null`. `base` is the
// filtered, normalized upstream spec, before the overlays.
export function checkContent(spec, base) {
  const errors = [];
  for (const { key, path: p, method, op } of operations(spec)) {
    if (!op.description?.trim()) errors.push(`${key}: no description`);

    const upstreamOp = base.paths?.[p]?.[method];
    for (const param of upstreamOp?.parameters ?? []) {
      if (!param.description) continue;
      const ours = op.parameters?.find((x) => x.name === param.name && x.in === param.in);
      if (ours && !ours.description) errors.push(`${key}: parameter ${param.in}:${param.name} lost its upstream description`);
    }

    for (const [code, response] of Object.entries(op.responses ?? {})) {
      if (!/^2/.test(code) || code === '204') continue;
      for (const [type, media] of Object.entries(response?.content ?? {})) {
        const empty = !media.schema || Object.keys(media.schema).length === 0;
        if (empty && media.example === undefined && !Object.keys(media.examples ?? {}).length) {
          errors.push(`${key} ${code}: ${type} body has no schema and no example, so it renders as null`);
        }
      }
    }
  }

  // A field we still publish keeps the description upstream gave it. Removing
  // the field itself (an overlay `remove`) is fine.
  for (const [name, schema] of Object.entries(base.components?.schemas ?? {})) {
    const ours = spec.components?.schemas?.[name];
    for (const [prop, upstreamProp] of Object.entries(schema.properties ?? {})) {
      const ourProp = ours?.properties?.[prop];
      if (upstreamProp.description && ourProp && !ourProp.description && !ourProp.$ref) {
        errors.push(`schema ${name}.${prop} lost its upstream description`);
      }
    }
  }
  return { errors };
}
