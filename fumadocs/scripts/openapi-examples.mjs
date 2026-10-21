// Applies the hand-written V3 examples and base URL to an OpenAPI document.
//
// The FastAPI export declares no `servers` and almost no `example` values, so
// fumadocs-openapi falls back to `https://example.com` in code samples and
// invents placeholder values ("string", "stringst"). Examples live in
// scripts/v3-examples.json, keyed by "METHOD /path":
//
//   { "POST /api/v3/products": { "request": {...}, "responses": { "200": {...} } } }
//
// merge-openapi.mjs calls applyExamples() on every refresh. Run this file
// directly (`node scripts/openapi-examples.mjs`) to apply them to openapi.json
// without a refresh.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const SERVERS = [{ url: 'https://pim.plytix.com', description: 'Plytix PIM API' }];

const EXAMPLES_FILE = new URL('./v3-examples.json', import.meta.url);

export async function loadExamples() {
  try {
    return JSON.parse(await readFile(EXAMPLES_FILE, 'utf-8'));
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

/** Sets `servers` and the example values in place. Returns keys that matched no operation. */
export function applyExamples(spec, examples) {
  spec.servers = SERVERS;
  const unmatched = [];

  for (const [key, { request, responses = {} }] of Object.entries(examples)) {
    const [method, ...rest] = key.split(' ');
    const op = spec.paths?.[rest.join(' ')]?.[method.toLowerCase()];
    if (!op) {
      unmatched.push(key);
      continue;
    }

    const requestMedia = op.requestBody?.content?.['application/json'];
    if (request !== undefined) {
      if (requestMedia) requestMedia.example = request;
      else unmatched.push(`${key} (request body)`);
    }

    for (const [status, body] of Object.entries(responses)) {
      // `#200` when the spec was read through readSpec() below.
      const response = op.responses?.[status] ?? op.responses?.[`#${status}`];
      if (!response) {
        unmatched.push(`${key} (response ${status})`);
        continue;
      }
      response.content ??= {};
      response.content['application/json'] ??= {};
      response.content['application/json'].example = body;
    }
  }

  return unmatched;
}

// Status codes ("200", "422") are integer-like keys, which JSON.parse moves to
// the front of their object. Protect them so a round trip keeps response order.
const protectKeys = (text) => text.replace(/"(\d+)":/g, '"#$1":');
const restoreKeys = (text) => text.replace(/"#(\d+)":/g, '"$1":');

export async function readSpec(file) {
  return JSON.parse(protectKeys(await readFile(file, 'utf-8')));
}

export async function writeSpec(file, spec) {
  await writeFile(file, restoreKeys(JSON.stringify(spec, null, 2)) + '\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const target = new URL('../openapi.json', import.meta.url);
  const spec = await readSpec(target);
  const unmatched = applyExamples(spec, await loadExamples());
  await writeSpec(target, spec);
  console.log('Applied servers and examples to openapi.json.');
  if (unmatched.length) console.warn(`WARNING: no matching operation for: ${unmatched.join('; ')}`);
}
