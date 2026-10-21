// npm run api:check (CI)
//
// Rebuilds everything from upstream + overlays, then fails if any generated
// file differs from what's committed: catches a hand-edited openapi.json,
// stale MDX, or a baseline lock nobody committed.

import { spawnSync } from 'node:child_process';
import { runBuild } from './lib/pipeline.mjs';
import { SITE_ROOT } from './lib/util.mjs';

const GENERATED = ['openapi.json', 'redirects.v3.json', 'overlays/baseline.lock.json', 'content/docs/reference/v3'];

const result = await runBuild({ strictCoverage: process.argv.includes('--strict-coverage') });
console.log(result.report);
if (!result.ok) {
  console.error('V3 spec build FAILED. See reports/api-drift.md.');
  process.exit(1);
}

const git = spawnSync('git', ['status', '--porcelain', '--', ...GENERATED], { cwd: SITE_ROOT, encoding: 'utf-8' });
if (git.status !== 0) {
  console.error(`git status failed: ${git.stderr}`);
  process.exit(1);
}
if (git.stdout.trim()) {
  console.error(
    'Generated files are out of date with upstream + overlays. Run `npm run api:build` and commit the result ' +
      '(never edit openapi.json or the generated MDX by hand):\n' +
      git.stdout,
  );
  process.exit(1);
}
console.log('Generated files match a fresh build.');
