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
// fresh from the root spec. The base URL (`servers`) and request/response
// examples are applied last from scripts/v3-examples.json (see
// openapi-examples.mjs), since the FastAPI export has neither. Top-level `tags` order is preserved too, since that
// drives nav ordering; tags new to this refresh are appended.
//
// Why a merge step exists at all: the root spec is a raw FastAPI export whose
// tags are all shaped ["v3", "<resource>"]. fumadocs-openapi groups pages by the
// FIRST tag, so using the export as-is would file every endpoint under a single
// "v3" group. This normalizes tags to one hyphen-free resource name.
//
// It also drops everything Plytix hasn't approved for the public docs (PM-11):
// the resources marked "Internal" or "To be removed" in
// materials/api-references/endpoint-reviews/Plytix API v3 - endpoint visibility.xlsx,
// the infrastructure probes, the product routes and fields that link to those
// resources, and any schema left unreferenced afterward.

import { readFile, writeFile } from 'node:fs/promises';
import { applyExamples, loadExamples } from './openapi-examples.mjs';

const SOURCE = '../openapi_pimv3_20261002 (Latest spec).json';
const TARGET = './openapi.json';

const METHODS = ['get', 'post', 'patch', 'put', 'delete'];

// product-family-models isn't in the visibility sheet; it's only in older specs.
const EXCLUDED_RESOURCES = [
  'channels',
  'connections',
  'ecatalogs',
  'import-profiles',
  'pdf-catalogs',
  'pim-product-lists',
  'product-family-models',
];
const EXCLUDED_ROUTES = ['/metrics', '/is_ready', '/is_alive'];
// Product links to excluded resources. A product's `product_data_sheets` are PDF
// catalogs and its `static_lists` are PIM product lists. (An asset's
// `static_lists` are asset lists, which are public, so those stay.)
const EXCLUDED_PRODUCT_LINKS = ['channels', 'ecatalogs', 'product_data_sheets', 'static_lists'];
// Schemas that only describe those links; any property referencing one is dropped.
const EXCLUDED_LINK_SCHEMAS = [
  'ProductChannelLinkOutputDto',
  'ProductECatalogLinkOutputDto',
  'ProductDataSheetLinkOutputDto',
  'ProductListOutputDto',
];

const isExcludedRoute = (routePath) =>
  EXCLUDED_ROUTES.includes(routePath) ||
  EXCLUDED_RESOURCES.some(
    (r) => routePath === `/api/v3/${r}` || routePath.startsWith(`/api/v3/${r}/`),
  ) ||
  EXCLUDED_PRODUCT_LINKS.some((l) => routePath.startsWith(`/api/v3/products/{identifier}/${l}`));

const refersTo = (node, names) =>
  names.some((name) => JSON.stringify(node).includes(`"#/components/schemas/${name}"`));

// Removes properties that embed an excluded resource, then every schema that no
// remaining operation reaches.
function pruneSchemas(spec) {
  const schemas = spec.components?.schemas ?? {};
  for (const schema of Object.values(schemas)) {
    if (!schema.properties) continue;
    for (const [name, prop] of Object.entries(schema.properties)) {
      if (!refersTo(prop, EXCLUDED_LINK_SCHEMAS)) continue;
      delete schema.properties[name];
      if (schema.required) schema.required = schema.required.filter((r) => r !== name);
    }
  }

  const reachable = new Set();
  const visit = (node) => {
    for (const [, name] of JSON.stringify(node).matchAll(/"#\/components\/schemas\/([^"]+)"/g)) {
      if (reachable.has(name) || !schemas[name]) continue;
      reachable.add(name);
      visit(schemas[name]);
    }
  };
  visit(spec.paths);
  const removed = Object.keys(schemas).filter((name) => !reachable.has(name));
  for (const name of removed) delete schemas[name];
  return removed;
}
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
const ENDPOINT_TITLES = JSON.parse(await readFile('./scripts/endpoint-names.json', 'utf-8')).v3;

const excludedOps = [];
for (const routePath of Object.keys(spec.paths)) {
  if (!isExcludedRoute(routePath)) continue;
  for (const method of METHODS) {
    if (spec.paths[routePath][method]) excludedOps.push(`${method.toUpperCase()} ${routePath}`);
  }
  delete spec.paths[routePath];
}

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
      // A new operation has only FastAPI's generated summary ("Post-Products-…"),
      // so title it from endpoint-names.json instead.
      const title = ENDPOINT_TITLES[`${method.toUpperCase()} ${routePath}`]?.title;
      if (title) op.summary = title;
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

const removedSchemas = pruneSchemas(spec);

const unmatchedExamples = applyExamples(spec, await loadExamples());

await writeFile(TARGET, JSON.stringify(spec, null, 2) + '\n');

const operationCount = Object.values(spec.paths).reduce(
  (n, p) => n + METHODS.filter((m) => p[m]).length,
  0,
);

console.log(
  `Refreshed ${TARGET} from ${SOURCE}: ${operationCount} operations across ${Object.keys(spec.paths).length} paths.`,
);
console.log(`Preserved hand-written descriptions on ${carriedOps.length} operation(s).`);
console.log(
  `Excluded from the public docs: ${excludedOps.length} operation(s) and ${removedSchemas.length} schema(s).`,
);

// A route that disappears upstream takes its editorial text with it, so name
// exactly what was lost rather than letting it vanish between refreshes.
// Excluded routes are dropped on purpose, so they don't count.
const lostDescriptions = [];
for (const [routePath, pathItem] of Object.entries(current.paths ?? {})) {
  if (isExcludedRoute(routePath)) continue;
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
if (unmatchedExamples.length) {
  console.warn(
    `WARNING: scripts/v3-examples.json entries with no matching operation (examples dropped): ${unmatchedExamples.join('; ')}`,
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
