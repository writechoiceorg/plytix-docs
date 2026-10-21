// npm run api:intake -- <path-to-new-spec.json> [--channel <how it arrived>]
//
// Brings a new Plytix V3 spec into the repo: copies it to the fixed path
// upstream/openapi-v3.json (so each drop is a readable git diff), records where
// it came from in upstream/SOURCE.json, and prints what changed and which new
// operations visibility.yaml doesn't classify yet. Then run `npm run api:build`.

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { SITE_ROOT, operations, readJson, readYaml, sha256, writeJson } from './lib/util.mjs';

const args = process.argv.slice(2);
const channelAt = args.indexOf('--channel');
const channel = channelAt === -1 ? 'manual' : args.splice(channelAt, 2)[1];
const input = args[0];
if (!input) {
  console.error('Usage: npm run api:intake -- <path-to-new-spec.json> [--channel <email|url|...>]');
  process.exit(1);
}

const TARGET = path.join(SITE_ROOT, 'upstream/openapi-v3.json');
const SOURCE = path.join(SITE_ROOT, 'upstream/SOURCE.json');
const VISIBILITY = path.join(SITE_ROOT, 'upstream/visibility.yaml');

const text = await readFile(path.resolve(input), 'utf-8');
const next = JSON.parse(text);
if (!/^3\.1\./.test(next.openapi ?? '')) {
  console.error(`Expected an OpenAPI 3.1 document, got openapi: ${next.openapi}`);
  process.exit(1);
}

const previous = existsSync(TARGET) ? await readJson(TARGET) : { paths: {} };
const before = new Set([...operations(previous)].map((o) => o.key));
const after = new Set([...operations(next)].map((o) => o.key));
const added = [...after].filter((k) => !before.has(k));
const removed = [...before].filter((k) => !after.has(k));

const visibility = (await readYaml(VISIBILITY))?.operations ?? {};
const unclassified = [...after].filter((k) => !(k in visibility));

await writeFile(TARGET, text);
await writeJson(SOURCE, {
  receivedDate: new Date().toISOString().slice(0, 10),
  originalFilename: path.basename(input),
  sha256: sha256(text),
  channel,
  operations: after.size,
  paths: Object.keys(next.paths ?? {}).length,
});

console.log(`Copied ${path.basename(input)} to upstream/openapi-v3.json (${after.size} operations).`);
console.log(`Added operations (${added.length}):${added.map((k) => `\n  + ${k}`).join('')}`);
console.log(`Removed operations (${removed.length}):${removed.map((k) => `\n  - ${k}`).join('')}`);
if (unclassified.length) {
  console.log(
    `\nNot in visibility.yaml yet; the build fails until each is classified. Add under "operations:" in upstream/visibility.yaml:\n` +
      unclassified.map((k) => `  "${k}": pending`).join('\n'),
  );
}
console.log('\nNext: npm run api:build, then review reports/api-drift.md.');
