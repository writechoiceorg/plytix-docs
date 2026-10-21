// npm run api:crosscheck
//
// Proves our overlay files stay standard Overlay 1.0: applies them with an
// independent implementation (openapi-format) to the same filtered and
// normalized upstream spec, and requires the result to match our applier's.
// Our only extension, { x-example-file }, is inlined first; x- keys on actions
// are ignored by both.

import path from 'node:path';
import { createRequire } from 'node:module';
import { filterSpec } from './lib/filter.mjs';
import { normalizeSpec } from './lib/normalize.mjs';
import { applyOverlays, loadOverlays, resolveExampleFiles, targetOperation } from './lib/overlay.mjs';
import { SITE_ROOT, clone, deepEqual, readJson, readYaml } from './lib/util.mjs';

const require = createRequire(import.meta.url);
const { openapiOverlay } = require('openapi-format');

const overlaysDir = path.join(SITE_ROOT, 'overlays');
const examplesDir = path.join(overlaysDir, 'examples');

const spec = await readJson(path.join(SITE_ROOT, 'upstream/openapi-v3.json'));
const { held } = filterSpec(spec, await readYaml(path.join(SITE_ROOT, 'upstream/visibility.yaml')));
const heldOps = new Set(held);
normalizeSpec(spec);

const { overlays, errors } = await loadOverlays(overlaysDir);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const ours = clone(spec);
await applyOverlays(ours, clone(spec), overlays, { examplesDir, held });

let theirs = clone(spec);
for (const { file, doc } of overlays) {
  const actions = [];
  // Edits for on-hold operations aren't applied by the build either.
  for (const action of doc.actions.filter((a) => !heldOps.has(targetOperation(a.target)))) {
    actions.push({ ...action, update: action.update && (await resolveExampleFiles(action.update, examplesDir)) });
  }
  const { data, resultData } = await openapiOverlay(theirs, { overlaySet: { ...doc, actions } });
  theirs = data;
  if (resultData.totalUnusedActions) {
    console.error(`${file}: openapi-format matched nothing for ${resultData.totalUnusedActions} action(s).`);
  }
}

// Report the first few differing paths, not the whole document.
const diffs = [];
const walk = (a, b, at) => {
  if (diffs.length > 20 || deepEqual(a, b)) return;
  if (a && b && typeof a === 'object' && typeof b === 'object' && Array.isArray(a) === Array.isArray(b)) {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) walk(a[k], b[k], `${at}/${k}`);
  } else {
    diffs.push(at || '/');
  }
};
walk(ours, theirs, '');

if (diffs.length) {
  console.error(`openapi-format produced a different document. First differences:\n  ${diffs.join('\n  ')}`);
  process.exit(1);
}
console.log(`Cross-check OK: openapi-format applies all ${overlays.length} overlay files identically.`);
