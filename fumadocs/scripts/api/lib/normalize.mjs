// Step 2: mechanical normalization of the raw FastAPI export.
//
// Every operation is tagged ["v3", "<resource>"] (since the 2026-10-19 spec,
// ["v3", "api-v3", "<resource>"]). fumadocs-openapi groups pages by the FIRST
// tag, so the export as-is would file every endpoint under one "v3" group.
// Drop the version markers and flatten the resource name
// ("product-categories" -> "productcategories") so it matches the folder names
// under content/docs/reference/v3/.
//
// Runs before the overlays so they always see the final tag names, and so this
// step can never overwrite a value an overlay set.

import { operations } from './util.mjs';

export const normalizeTag = (tag) => tag.replace(/-/g, '');

const VERSION_TAGS = new Set(['v3', 'api-v3']);

export function normalizeSpec(spec) {
  const tagsInOrder = [];
  for (const { op } of operations(spec)) {
    const resourceTags = (op.tags ?? []).filter((t) => !VERSION_TAGS.has(t)).map(normalizeTag);
    if (resourceTags.length === 0) continue;
    op.tags = resourceTags;
    if (!tagsInOrder.includes(resourceTags[0])) tagsInOrder.push(resourceTags[0]);
  }
  return { tagsInOrder };
}
