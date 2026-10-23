// Run by `npm run api:build` after it writes openapi.json; don't run it on a
// hand-edited spec (see overlays/README.md).
import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { tagFolder } from './api/lib/util.mjs';

// OneDrive briefly locks freshly-written folders while it syncs them, which
// makes an immediately-following rename() fail with EPERM on Windows. Retry
// with backoff instead of failing the whole generation run.
async function renameWithRetry(from, to, attempts = 8, delayMs = 300) {
  for (let i = 0; i < attempts; i++) {
    try {
      await rename(from, to);
      return;
    } catch (err) {
      if (err.code !== 'EPERM' && err.code !== 'EBUSY') throw err;
      if (i === attempts - 1) throw err;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

const openapi = createOpenAPI({
  input: ['./openapi.json'],
});

// Read alongside createOpenAPI purely to derive nav ordering (see comparePages).
const spec = JSON.parse(await readFile('./openapi.json', 'utf-8'));

const referenceDir = './content/docs/reference/v3';
const stagingDir = path.join(referenceDir, 'endpoints');

// Nicer group titles than the auto-generated per-tag titles (which are just
// the raw OpenAPI tag slug capitalized, e.g. "Productattributegroups").
// Lucide icon per resource group, shown in the sidebar.
const TAG_ICONS = {
  products: "Package",
  assets: "Image",
  productcategories: "FolderTree",
  assetcategories: "FolderTree",
  assetlists: "List",
  relationships: "Link2",
  productrelationships: "Link",
  relatedproducts: "Link2",
  productfamilies: "Layers",
  familyattributes: "ListTree",
  productattributes: "Tags",
  productattributegroups: "Group",
};

const TAG_LABELS = {
  products: 'Products',
  assets: 'Assets',
  productcategories: 'Product Categories',
  assetcategories: 'Asset Categories',
  assetlists: 'Asset Lists',
  relationships: 'Relationships',
  productfamilies: 'Product Families',
  productattributes: 'Product Attributes',
  productattributegroups: 'Product Attribute Groups',
  familyattributes: 'Family Attributes',
  productrelationships: 'Product Relationships',
  relatedproducts: 'Related Products',
};

await generateFiles({
  input: openapi,
  output: stagingDir,
  per: 'operation',
  groupBy: 'tag',
  meta: true,
  includeDescription: true,
  beforeWrite(files) {
    for (const file of files) {
      if (!file.path.endsWith('.mdx')) continue;
      // Forward the preloaded OpenAPI document from the page's props down to
      // the generated <Comp .../> call, otherwise it renders with no schema.
      file.content = file.content.replace(
        /(<Comp\b[^\n]*?)\s*\/>/g,
        '$1 preloaded={props.preloaded} />',
      );
      // Record the operation's path next to its method, so code that only has
      // the page (its metadata, the llms/MCP Markdown export) can find the operation.
      const operation = file.content.match(/operations=\{\[\{"path":("[^"]+")/);
      if (operation) file.content = file.content.replace(/^( {2}method: .+)$/m, `$1\n  path: ${operation[1]}`);
    }
  },
});

// Within a group, fumadocs emits pages in whatever order the spec happens to
// declare its paths, which interleaves the `/{identifier}/{path}` drill-in
// operations with the main ones. Sort deterministically instead: broadest route
// first, drill-in routes last, and a read-create-update-delete verb order
// inside each route.
const VERB_ORDER = { get: 0, post: 1, put: 2, patch: 3, delete: 4 };
const pageSortKey = new Map();
for (const [routePath, pathItem] of Object.entries(spec.paths)) {
  const segments = routePath.replace(/^\/api\/v3\//, '').split('/').filter(Boolean);
  const isDrillIn = routePath.endsWith('/{path}') ? 1 : 0;
  for (const [method, op] of Object.entries(pathItem)) {
    if (!(method in VERB_ORDER) || !op.operationId) continue;
    pageSortKey.set(op.operationId, [isDrillIn, segments.length, VERB_ORDER[method]]);
  }
}

const comparePages = (a, b) => {
  const ka = pageSortKey.get(a) ?? [9, 9, 9];
  const kb = pageSortKey.get(b) ?? [9, 9, 9];
  for (let i = 0; i < ka.length; i++) {
    if (ka[i] !== kb[i]) return ka[i] - kb[i];
  }
  return a.localeCompare(b);
};

// Move each per-tag folder up to be a real page group directly under
// content/docs/reference/v3/ (a folder, not a flattened separator) — "Endpoints"
// itself is a section header (see reference/meta.json below), but each
// resource inside it stays a collapsible group of its operation pages.
// fumadocs emits the groups in path-declaration order, which puts whichever
// resource the spec happens to list first at the top of the nav. Follow the
// curated order in openapi.json's top-level `tags` array instead, with any
// group not listed there appended rather than dropped.
const stagingMeta = JSON.parse(await readFile(path.join(stagingDir, 'meta.json'), 'utf-8'));
const curatedOrder = (spec.tags ?? []).map((t) => t.name);
const orderedTags = [
  ...curatedOrder.filter((t) => stagingMeta.pages.includes(t)),
  ...stagingMeta.pages.filter((t) => !curatedOrder.includes(t)),
];
const tagFolders = [];

for (const tag of orderedTags) {
  const folder = tagFolder(tag);
  const from = path.join(stagingDir, tag);
  const to = path.join(referenceDir, folder);
  await rm(to, { recursive: true, force: true });
  await renameWithRetry(from, to);

  const tagMetaPath = path.join(to, 'meta.json');
  const tagMeta = JSON.parse(await readFile(tagMetaPath, 'utf-8'));
  tagMeta.title = TAG_LABELS[tag] ?? tagMeta.title;
  if (TAG_ICONS[tag]) tagMeta.icon = TAG_ICONS[tag];
  tagMeta.pages = [...tagMeta.pages].sort(comparePages);
  await writeFile(tagMetaPath, JSON.stringify(tagMeta, null, 2) + '\n');

  tagFolders.push(folder);
}
await rm(stagingDir, { recursive: true, force: true });

// Rebuild reference/meta.json: keep whatever comes before the "Endpoints"
// section (the hand-written "Overview" pages) untouched, and replace
// everything from "Endpoints" onward with the freshly generated groups.
const referenceMetaPath = path.join(referenceDir, 'meta.json');
let referenceMeta;
try {
  referenceMeta = JSON.parse(await readFile(referenceMetaPath, 'utf-8'));
} catch {
  referenceMeta = { title: 'V3 (Beta)', icon: 'Sparkles', pages: [] };
}
const cutIndex = referenceMeta.pages.findIndex(
  (p) => p === '---[Webhook]Endpoints---' || p === '---Endpoints---' || p === 'endpoints',
);
const preservedPages = cutIndex === -1 ? referenceMeta.pages : referenceMeta.pages.slice(0, cutIndex);

// Groups generated last time but gone from the spec now (the operations went
// internal, were removed upstream, or moved tag): delete their folders, or the
// stale pages would stay routable even though they've left the nav.
const previousGroups = cutIndex === -1 ? [] : referenceMeta.pages.slice(cutIndex + 1);
for (const tag of previousGroups) {
  if (tagFolders.includes(tag) || preservedPages.includes(tag)) continue;
  await rm(path.join(referenceDir, tag), { recursive: true, force: true });
  console.log(`Removed stale endpoint group: ${tag}`);
}

await writeFile(
  referenceMetaPath,
  JSON.stringify(
    { ...referenceMeta, pages: [...preservedPages, '---[Webhook]Endpoints---', ...tagFolders] },
    null,
    2,
  ) + '\n',
);

console.log(`Generated ${tagFolders.length} endpoint groups directly under content/docs/reference/v3/.`);
