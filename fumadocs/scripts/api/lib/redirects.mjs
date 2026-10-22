// Reference page URLs are /reference/v3/<tag folder>/<operationId>. When an
// operation keeps its path+method but its URL changes (we set a cleaner
// operationId, upstream renamed the FastAPI function, or it moved tag), add a
// permanent redirect from the old URL. The map accumulates across builds and
// chains are collapsed, so a URL renamed twice still lands in one hop.

import { operations } from './util.mjs';
import { referenceUrl } from './validate.mjs';

const urlsByOperation = (spec) => {
  const map = new Map();
  for (const { key, op } of operations(spec ?? {})) {
    if (op.tags?.[0] && op.operationId) map.set(key, referenceUrl(op.tags[0], op.operationId));
  }
  return map;
};

export function updateRedirects(previousSpec, nextSpec, existing = []) {
  const map = new Map(existing.map((r) => [r.source, r.destination]));
  const before = urlsByOperation(previousSpec);
  const after = urlsByOperation(nextSpec);
  const added = [];

  for (const [key, oldUrl] of before) {
    const newUrl = after.get(key);
    if (newUrl && newUrl !== oldUrl) {
      map.set(oldUrl, newUrl);
      added.push(`${oldUrl} -> ${newUrl}`);
    }
  }

  const live = new Set(after.values());
  const result = [];
  for (const [source] of map) {
    if (live.has(source)) continue; // the URL is a real page again
    let destination = map.get(source);
    const seen = new Set([source]);
    while (map.has(destination) && !seen.has(destination)) {
      seen.add(destination);
      destination = map.get(destination);
    }
    if (destination !== source) result.push({ source, destination });
  }
  result.sort((a, b) => a.source.localeCompare(b.source));
  return { redirects: result, added };
}
