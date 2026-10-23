// Drift detection: compares what the overlays touched in THIS upstream spec
// (records from applyOverlays) with what they touched when each edit was last
// reviewed (overlays/baseline.lock.json).
//
// Blocking (always):
//   ZERO_MATCH      an edited endpoint, parameter or schema is gone/renamed/no longer public
//   MULTI_MATCH     a single-node target now matches several nodes
//   REDUNDANT_FIX   a fix adds a parameter upstream now declares itself
// Blocking until reviewed with `npm run api:accept`:
//   TYPE_CHANGED     the type signature of an edited node changed upstream
//   UPSTREAM_CHANGED upstream changed a field we override (maybe Plytix fixed it)
// Non-blocking (recorded in the lock, visible in the git diff):
//   new actions, new nodes matched by a wildcard, newly overridden fields.

import { deepEqual } from './util.mjs';

export function checkDrift(records, lock, { accept = false } = {}) {
  const errors = [];
  const reviewed = []; // accepted TYPE_CHANGED / UPSTREAM_CHANGED
  const notices = [];
  const nextLock = { version: 1, actions: {} };
  const previous = lock?.actions ?? {};

  for (const record of records) {
    if (record.held) {
      // Not applied this run: keep the reviewed baseline for when it returns.
      if (previous[record.id]) nextLock.actions[record.id] = previous[record.id];
      continue;
    }
    if (record.matches.length === 0) {
      errors.push({ code: 'ZERO_MATCH', id: record.id, detail: 'target matches nothing in the filtered upstream spec' });
    }
    if (record.expect === 'one' && record.matches.length > 1) {
      errors.push({ code: 'MULTI_MATCH', id: record.id, detail: `matches ${record.matches.length} nodes` });
    }
    for (const dup of record.duplicates) {
      errors.push({ code: 'REDUNDANT_FIX', id: record.id, detail: `upstream already declares ${dup}; remove this fix` });
    }

    const before = previous[record.id];
    if (!before && record.matches.length) notices.push(`new action baselined: ${record.id}`);

    const entry = { nodes: {} };
    for (const match of record.matches) {
      const old = before?.nodes?.[match.key];
      const node = { sig: match.sig, upstream: { ...match.upstream } };

      if (old) {
        if (!deepEqual(old.sig, match.sig)) {
          const item = {
            code: 'TYPE_CHANGED',
            id: record.id,
            node: match.key,
            detail: `${JSON.stringify(old.sig)} -> ${JSON.stringify(match.sig)}`,
          };
          if (accept) reviewed.push(item);
          else {
            errors.push(item);
            node.sig = old.sig; // keep the reviewed state until someone accepts
          }
        }
        for (const [field, value] of Object.entries(match.upstream)) {
          if (!Object.hasOwn(old.upstream ?? {}, field)) continue; // newly overridden field
          if (deepEqual(old.upstream[field], value)) continue;
          const item = {
            code: 'UPSTREAM_CHANGED',
            id: record.id,
            node: match.key,
            field,
            was: old.upstream[field],
            now: value,
          };
          if (accept) reviewed.push(item);
          else {
            errors.push(item);
            node.upstream[field] = old.upstream[field];
          }
        }
      } else if (before) {
        notices.push(`new node for ${record.id}: ${match.key}`);
      }
      entry.nodes[match.key] = node;
    }
    if (record.matches.length === 0 && before) entry.nodes = before.nodes; // keep until fixed
    nextLock.actions[record.id] = entry;
  }

  for (const id of Object.keys(previous)) {
    if (!nextLock.actions[id]) notices.push(`baseline entry dropped (action removed): ${id}`);
  }
  return { errors, reviewed, notices, lock: sortLock(nextLock) };
}

const sortLock = (lock) => ({
  version: lock.version,
  actions: Object.fromEntries(
    Object.keys(lock.actions)
      .sort()
      .map((id) => [
        id,
        {
          nodes: Object.fromEntries(
            Object.keys(lock.actions[id].nodes)
              .sort()
              .map((k) => [k, lock.actions[id].nodes[k]]),
          ),
        },
      ]),
  ),
});
