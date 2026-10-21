// Step 1: keep only the operations visibility.yaml marks `public`, then drop
// every component nothing public references any more.
//
// Runs first so internal operations are never edited, linted, coverage-checked
// or published, and so an overlay aimed at an operation that turned internal
// fails drift detection instead of silently patching nothing.

import { HTTP_METHODS, operations } from './util.mjs';

export function filterSpec(spec, visibility) {
  const decisions = visibility?.operations ?? {};
  const kept = [];
  const excluded = {};
  const unclassified = [];

  for (const { key, path: routePath, method } of [...operations(spec)]) {
    const decision = decisions[key];
    if (decision === 'public') {
      kept.push(key);
      continue;
    }
    if (decision === undefined) unclassified.push(key);
    else (excluded[decision] ??= []).push(key);
    delete spec.paths[routePath][method];
  }

  for (const [routePath, pathItem] of Object.entries(spec.paths)) {
    if (!HTTP_METHODS.some((m) => pathItem[m])) delete spec.paths[routePath];
  }

  // Entries for operations upstream no longer has: harmless, but worth pruning.
  const allUpstream = new Set([...kept, ...unclassified, ...Object.values(excluded).flat()]);
  const staleEntries = Object.keys(decisions).filter((k) => !allUpstream.has(k));

  const pruned = pruneComponents(spec);
  // `on-hold` operations are public but left out until their live behavior is
  // confirmed; overlay edits aimed at them are kept but not applied.
  const held = excluded['on-hold'] ?? [];
  return { kept, excluded, unclassified, staleEntries, pruned, held };
}

// Transitively collects `#/components/<type>/<name>` refs reachable from the
// paths (and from top-level security), and deletes the rest.
export function pruneComponents(spec) {
  const components = spec.components ?? {};
  const reachable = new Set();
  const queue = [];

  const visit = (node) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (node === null || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      if (k === '$ref' && typeof v === 'string' && v.startsWith('#/components/')) {
        if (!reachable.has(v)) {
          reachable.add(v);
          queue.push(v);
        }
      } else {
        visit(v);
      }
    }
  };

  visit(spec.paths);
  visit(spec.webhooks);
  while (queue.length) {
    const [, , type, ...rest] = queue.shift().split('/');
    const name = rest.join('/').replace(/~1/g, '/').replace(/~0/g, '~');
    visit(components[type]?.[name]);
  }

  const pruned = [];
  // securitySchemes are referenced by name from `security`, never by $ref.
  for (const [type, entries] of Object.entries(components)) {
    if (type === 'securitySchemes') continue;
    for (const name of Object.keys(entries ?? {})) {
      if (!reachable.has(`#/components/${type}/${name}`)) {
        delete entries[name];
        pruned.push(`${type}/${name}`);
      }
    }
  }
  return pruned;
}
