// Refreshes fumadocs/openapi.json against the authoritative spec at the repo
// root, WITHOUT discarding the hand-written editorial content already in it.
//
// openapi.json is the single source of truth for the docs site. Hand-write
// endpoint `description` text (and `summary` / `operationId` overrides) directly
// in it; this script preserves them. Run it after the root spec is refreshed,
// then run `npm run generate:api` to rebuild the MDX pages.
//
// What it carries over from the current openapi.json, per operation:
//   - description  (the editorial prose shown on the endpoint page)
//   - summary      (the page title)
//   - operationId  (the page filename, e.g. search_products.mdx)
// Everything else — parameters, request/response schemas, new endpoints — comes
// fresh from the root spec. Top-level `tags` order is preserved too, since that
// drives nav ordering; tags new to this refresh are appended.
//
// Why a merge step exists at all: the root spec is a raw FastAPI export whose
// tags are all shaped ["v3", "<resource>"]. fumadocs-openapi groups pages by the
// FIRST tag, so using the export as-is would file every endpoint under a single
// "v3" group. This normalizes tags to one hyphen-free resource name.

import { readFile, writeFile } from 'node:fs/promises';

const SOURCE = '../openapi_pimv3.json';
const TARGET = './openapi.json';

const METHODS = ['get', 'post', 'patch', 'put', 'delete'];
const CARRIED = ['description', 'summary', 'operationId'];

// Assigning a carried field that the root spec doesn't have would append it to
// the end of the operation object, leaving `description` sitting after
// `responses`. Key order carries no meaning in JSON, but this file is
// hand-edited, so emit operations in the conventional OpenAPI reading order and
// keep anything unrecognized after it.
const KEY_ORDER = [
  'tags',
  'summary',
  'description',
  'operationId',
  'parameters',
  'requestBody',
  'responses',
];

const orderKeys = (op) => {
  const ordered = {};
  for (const key of KEY_ORDER) {
    if (key in op) ordered[key] = op[key];
  }
  for (const key of Object.keys(op)) {
    if (!(key in ordered)) ordered[key] = op[key];
  }
  return ordered;
};

const spec = JSON.parse(await readFile(SOURCE, 'utf-8'));

let current = { paths: {}, tags: [] };
try {
  current = JSON.parse(await readFile(TARGET, 'utf-8'));
} catch {
  console.warn(`No existing ${TARGET}; generating it from scratch.`);
}

// "v3" is a version marker on every operation, not a grouping; drop it and
// flatten the remaining resource name ("product-categories" -> "productcategories")
// so it matches the folder names under content/docs/reference/v3/.
const normalizeTag = (tag) => tag.replace(/-/g, '');

const seenTags = [];
const carriedOps = [];
const upstreamChanges = [];

for (const [routePath, pathItem] of Object.entries(spec.paths)) {
  for (const method of METHODS) {
    const op = pathItem[method];
    if (!op) continue;

    const resourceTags = (op.tags ?? []).filter((t) => t !== 'v3').map(normalizeTag);
    if (resourceTags.length > 0) {
      op.tags = resourceTags;
      if (!seenTags.includes(resourceTags[0])) seenTags.push(resourceTags[0]);
    }

    const existing = current.paths?.[routePath]?.[method];
    if (!existing) {
      pathItem[method] = orderKeys(op);
      continue;
    }

    const kept = [];
    for (const field of CARRIED) {
      if (existing[field] === undefined) continue;
      if (op[field] !== undefined && op[field] !== existing[field]) {
        // The root spec now says something different. The local text wins so a
        // refresh never silently wipes editorial work, but flag it for review.
        upstreamChanges.push(`${method.toUpperCase()} ${routePath} .${field}`);
      }
      op[field] = existing[field];
      kept.push(field);
    }
    pathItem[method] = orderKeys(op);
    if (kept.includes('description')) carriedOps.push(`${method.toUpperCase()} ${routePath}`);
  }
}

// Nav order: tags already in openapi.json keep their position; tags new to this
// refresh are appended so they can't silently vanish.
const previousOrder = (current.tags ?? []).map((t) => t.name);
const ordered = previousOrder.filter((t) => seenTags.includes(t));
const added = seenTags.filter((t) => !previousOrder.includes(t));
spec.tags = [...ordered, ...added].map((name) => ({ name }));

await writeFile(TARGET, JSON.stringify(spec, null, 2) + '\n');

const operationCount = Object.values(spec.paths).reduce(
  (n, p) => n + METHODS.filter((m) => p[m]).length,
  0,
);

console.log(
  `Refreshed ${TARGET} from ${SOURCE}: ${operationCount} operations across ${Object.keys(spec.paths).length} paths.`,
);
console.log(`Preserved hand-written descriptions on ${carriedOps.length} operation(s).`);

// A route that disappears upstream takes its editorial text with it, so name
// exactly what was lost rather than letting it vanish between refreshes.
const lostDescriptions = [];
for (const [routePath, pathItem] of Object.entries(current.paths ?? {})) {
  for (const method of METHODS) {
    if (!pathItem[method]?.description) continue;
    if (!spec.paths[routePath]?.[method]) {
      lostDescriptions.push(`${method.toUpperCase()} ${routePath}`);
    }
  }
}
if (lostDescriptions.length) {
  console.warn(
    `WARNING: gone from the source spec, hand-written description LOST: ${lostDescriptions.join('; ')}`,
  );
}
if (upstreamChanges.length) {
  console.warn(
    `NOTE: the source spec now differs from the local text here; kept the local version: ${upstreamChanges.join('; ')}`,
  );
}
const droppedTags = previousOrder.filter((t) => !seenTags.includes(t));
if (droppedTags.length) {
  console.warn(`WARNING: tag(s) gone from the source spec: ${droppedTags.join(', ')}`);
}
if (added.length) {
  console.warn(
    `NOTE: new tag(s) appended to nav: ${added.join(', ')}. ` +
      `Add display titles to TAG_LABELS in generate-docs.mjs, and reorder openapi.json's "tags" array if you want them elsewhere in the nav.`,
  );
}
