// npm run api:build   — rebuild openapi.json + the V3 reference MDX
// npm run api:accept  — same, accepting reviewed TYPE_CHANGED / UPSTREAM_CHANGED drift
//
// Flags: --accept, --strict-coverage, --no-generate, --no-lint, --dry-run
// --dry-run validates everything but writes only to .api-build/dry-<pid>/
// (openapi.json, baseline lock, reports), so several people or agents can
// check their overlay edits at the same time without touching shared files.
// See scripts/api/lib/pipeline.mjs for the steps and overlays/README.md for the workflow.

import { copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { defaults, runBuild } from './lib/pipeline.mjs';

const args = new Set(process.argv.slice(2));
const options = {
  accept: args.has('--accept'),
  strictCoverage: args.has('--strict-coverage'),
  generate: !args.has('--no-generate'),
  lint: !args.has('--no-lint'),
};

if (args.has('--dry-run')) {
  const d = defaults();
  const dir = path.join(d.tmpDir, `dry-${process.pid}`);
  await mkdir(dir, { recursive: true });
  // Start from the committed baseline and artifact so drift and redirects
  // are computed exactly as a real build would.
  for (const [from, to] of [
    [d.lockFile, 'baseline.lock.json'],
    [d.out, 'openapi.json'],
    [d.redirectsFile, 'redirects.v3.json'],
  ]) {
    if (existsSync(from)) await copyFile(from, path.join(dir, to));
  }
  Object.assign(options, {
    generate: false,
    lockFile: path.join(dir, 'baseline.lock.json'),
    out: path.join(dir, 'openapi.json'),
    redirectsFile: path.join(dir, 'redirects.v3.json'),
    reportDir: path.join(dir, 'reports'),
    tmpDir: path.join(dir, 'tmp'),
  });
  console.log(`Dry run: outputs in ${path.relative(d.tmpDir, dir)} under .api-build/`);
}

const result = await runBuild(options);

console.log(result.report);
if (!result.ok) {
  console.error('V3 spec build FAILED. Nothing was written to openapi.json. See the report above.');
  process.exit(1);
}
