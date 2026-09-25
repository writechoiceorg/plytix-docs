import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

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
  input: ['./openapi-v1v2.json'],
});

const referenceDir = './content/docs/reference/legacy';
const stagingDir = path.join(referenceDir, 'endpoints');

// Nicer group titles than the auto-generated per-tag titles.
const TAG_LABELS = {
  authentication: 'Authentication',
  accounts: 'Accounts',
  assets: 'Assets',
  'available-filters': 'Available Filters',
  categories: 'Categories',
  products: 'Products (v1)',
  'products-v2-beta': 'Products (v2 beta)',
  'product-attributes': 'Product Attributes',
  'product-attribute-groups': 'Product Attribute Groups',
  relationships: 'Relationships',
  'product-families': 'Product Families',
};

await generateFiles({
  input: openapi,
  output: stagingDir,
  per: 'operation',
  groupBy: 'tag',
  meta: true,
  // Render the operation description inside the page body via <OpenAPIPage
  // showDescription /> (proper Markdown) instead of dumping the raw
  // Markdown string into frontmatter `description`, where <DocsDescription>
  // renders it as unprocessed plain text.
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
    }
  },
});

// Move each per-tag folder up to be a real page group directly under
// content/docs/reference/legacy/ (a folder, not a flattened separator) — "Endpoints"
// itself is a section header (see legacy/meta.json below), but each
// resource inside it stays a collapsible group of its operation pages.
const stagingMeta = JSON.parse(await readFile(path.join(stagingDir, 'meta.json'), 'utf-8'));
const tagFolders = [];

for (const tag of stagingMeta.pages) {
  const from = path.join(stagingDir, tag);
  const to = path.join(referenceDir, tag);
  await rm(to, { recursive: true, force: true });
  await renameWithRetry(from, to);

  const tagMetaPath = path.join(to, 'meta.json');
  const tagMeta = JSON.parse(await readFile(tagMetaPath, 'utf-8'));
  tagMeta.title = TAG_LABELS[tag] ?? tagMeta.title;
  await writeFile(tagMetaPath, JSON.stringify(tagMeta, null, 2) + '\n');

  tagFolders.push(tag);
}
await rm(stagingDir, { recursive: true, force: true });

// Rebuild legacy/meta.json: keep whatever comes before the "Endpoints"
// section (the hand-written overview page) untouched, and replace
// everything from "Endpoints" onward with the freshly generated groups.
const referenceMetaPath = path.join(referenceDir, 'meta.json');
let referenceMeta;
try {
  referenceMeta = JSON.parse(await readFile(referenceMetaPath, 'utf-8'));
} catch {
  referenceMeta = { title: 'Legacy (v1/v2)', root: true, pages: [] };
}
const cutIndex = referenceMeta.pages.findIndex(
  (p) => p === '---Endpoints---' || p === 'endpoints',
);
const preservedPages = cutIndex === -1 ? referenceMeta.pages : referenceMeta.pages.slice(0, cutIndex);

await writeFile(
  referenceMetaPath,
  JSON.stringify(
    { ...referenceMeta, pages: [...preservedPages, '---Endpoints---', ...tagFolders] },
    null,
    2,
  ) + '\n',
);

console.log(`Generated ${tagFolders.length} endpoint groups directly under content/docs/reference/legacy/.`);
