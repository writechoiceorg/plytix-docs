// The V3 spec build: upstream spec + visibility.yaml + overlays -> openapi.json.
//
//   1. filter     keep `public` operations, prune unreachable components
//   2. normalize  tags ["v3", "product-categories"] -> ["productcategories"]
//   3. overlays   apply our edits, then check them for drift against the baseline;
//                 keep one success and one error response per operation (responses.mjs)
//   4. validate   Redocly lint + internal link check on a temp copy
//   5. write      openapi.json, redirects.v3.json, overlays/baseline.lock.json
//   6. generate   MDX pages (scripts/generate-docs.mjs), unless disabled
//
// Nothing is written unless every blocking check passes, so openapi.json is
// always the output of a clean run.

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { filterSpec } from './filter.mjs';
import { normalizeSpec } from './normalize.mjs';
import { applyOverlays, loadOverlays } from './overlay.mjs';
import { checkDrift } from './drift.mjs';
import { checkContent, checkSpec, redoclyLint } from './validate.mjs';
import { trimResponses } from './responses.mjs';
import { computeCoverage, renderCoverage } from './coverage.mjs';
import { updateRedirects } from './redirects.mjs';
import { renderReport } from './report.mjs';
import { SITE_ROOT, clone, operations, readJson, readYaml, writeJson } from './util.mjs';

export const defaults = () => ({
  source: path.join(SITE_ROOT, 'upstream/openapi-v3.json'),
  visibility: path.join(SITE_ROOT, 'upstream/visibility.yaml'),
  overlaysDir: path.join(SITE_ROOT, 'overlays'),
  lockFile: path.join(SITE_ROOT, 'overlays/baseline.lock.json'),
  out: path.join(SITE_ROOT, 'openapi.json'),
  redirectsFile: path.join(SITE_ROOT, 'redirects.v3.json'),
  contentDir: path.join(SITE_ROOT, 'content/docs'),
  reportDir: path.join(SITE_ROOT, 'reports'),
  tmpDir: path.join(SITE_ROOT, '.api-build'),
  lintConfig: path.join(SITE_ROOT, 'redocly.yaml'),
  accept: false,
  strictCoverage: false,
  generate: true,
  lint: true,
  contentChecks: true,
});

const OP_KEY_ORDER = ['tags', 'summary', 'description', 'operationId', 'parameters', 'requestBody', 'responses'];
const ROOT_KEY_ORDER = ['openapi', 'info', 'servers', 'security', 'tags', 'paths', 'components'];

const ordered = (obj, order) => {
  const out = {};
  for (const k of order) if (k in obj) out[k] = obj[k];
  for (const k of Object.keys(obj)) if (!(k in out)) out[k] = obj[k];
  return out;
};

// Conventional reading order, so diffs of the generated file stay readable.
const tidy = (spec) => {
  for (const { path: p, method, op } of [...operations(spec)]) spec.paths[p][method] = ordered(op, OP_KEY_ORDER);
  return ordered(spec, ROOT_KEY_ORDER);
};

export async function runBuild(options = {}) {
  const o = { ...defaults(), ...options };
  const result = { ok: false, errors: [], warnings: [], notices: [], drift: null, filter: null, coverage: null };

  const upstream = await readJson(o.source);
  const visibility = await readYaml(o.visibility);
  let spec = clone(upstream);

  // 1. filter
  const filter = filterSpec(spec, visibility);
  result.filter = filter;
  for (const key of filter.unclassified) {
    result.errors.push(`visibility: "${key}" is not in visibility.yaml; classify it (public|internal|removed|pending)`);
  }
  for (const key of filter.staleEntries) result.notices.push(`visibility: entry for an operation upstream no longer has: ${key}`);

  // 2. normalize
  normalizeSpec(spec);
  const base = clone(spec);

  // 3. overlays + drift
  const { overlays, errors: loadErrors } = await loadOverlays(o.overlaysDir);
  result.errors.push(...loadErrors);
  const { records, errors: applyErrors } = await applyOverlays(spec, base, overlays, {
    examplesDir: path.join(o.overlaysDir, 'examples'),
    held: filter.held,
  });
  const heldEdits = records.filter((r) => r.held).length;
  if (filter.held.length) {
    result.notices.push(
      `on hold: ${filter.held.length} operations left out (${heldEdits} overlay edits kept, not applied): ${filter.held.join('; ')}`,
    );
  }
  result.errors.push(...applyErrors);

  const lock = existsSync(o.lockFile) ? await readJson(o.lockFile) : { version: 1, actions: {} };
  const drift = checkDrift(records, lock, { accept: o.accept });
  result.drift = drift;
  result.notices.push(...drift.notices);

  trimResponses(spec);
  spec = tidy(spec);

  // 4. validate
  if (o.lint) {
    await mkdir(o.tmpDir, { recursive: true });
    const tmpSpec = path.join(o.tmpDir, 'openapi.json');
    await writeJson(tmpSpec, spec);
    const lint = redoclyLint(tmpSpec, o.lintConfig);
    result.errors.push(...lint.errors.map((e) => `lint: ${e}`));
    result.warnings.push(...lint.warnings.map((w) => `lint: ${w}`));
  }
  result.errors.push(...checkSpec(spec, { contentDir: o.contentDir }).errors);
  if (o.contentChecks) result.errors.push(...checkContent(spec, base).errors.map((e) => `content: ${e}`));

  const coverage = computeCoverage(spec, records);
  result.coverage = coverage;
  if (o.strictCoverage) result.errors.push(...coverage.strictErrors.map((e) => `coverage: ${e}`));

  const blocking = result.errors.length + drift.errors.length;
  result.ok = blocking === 0;

  // 5. write (only after a clean run)
  if (result.ok) {
    const previous = existsSync(o.out) ? await readJson(o.out) : null;
    const existing = existsSync(o.redirectsFile) ? await readJson(o.redirectsFile) : [];
    const { redirects, added } = updateRedirects(previous, spec, existing);
    result.notices.push(...added.map((a) => `redirect added: ${a}`));
    await writeJson(o.out, spec);
    await writeJson(o.redirectsFile, redirects);
    await writeJson(o.lockFile, drift.lock);
  }

  // Reports are written either way: a failed run needs them most.
  await mkdir(o.reportDir, { recursive: true });
  const source = path.relative(SITE_ROOT, o.source).split(path.sep).join('/');
  const report = renderReport(result, { source });
  await writeFile(path.join(o.reportDir, 'api-drift.md'), report);
  await writeFile(path.join(o.reportDir, 'api-coverage.md'), renderCoverage(coverage));
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, report);
  result.report = report;

  // 6. generate
  if (result.ok && o.generate) {
    const gen = spawnSync(process.execPath, ['scripts/generate-docs.mjs'], { cwd: SITE_ROOT, stdio: 'inherit' });
    if (gen.status !== 0) {
      result.ok = false;
      result.errors.push('generate-docs.mjs failed');
    }
  }
  return result;
}
