// Step 3b: trim responses for the rendered page. Runs on the merged spec after
// the overlays, so it never shows up in drift or in crosscheck.
//
// Every operation lists nine or ten status codes, most of them generic errors
// that fumadocs renders with the same sample body. Each page shows only its
// success response and one error: the one written for this operation, with an
// example of its own. The errors every operation shares (401, 402, 500, 502)
// are covered on the Errors and status codes page instead.

import { deepEqual, operations } from './util.mjs';

const SHARED_ERRORS = ['401', '402', '500', '502'];
// Tie-break when several errors have their own example, then the fallback
// order when none does.
const SPECIFIC_ORDER = ['409', '405', '400', '404', '403', '422'];
const FALLBACK_ORDER = ['422', '400'];

const isSuccess = (code) => /^2/.test(code);
const hasExample = (response) =>
  Object.values(response?.content ?? {}).some((m) => m.example !== undefined || Object.keys(m.examples ?? {}).length);
const rank = (order, code) => (order.includes(code) ? order.indexOf(code) : order.length);

function pickError(responses) {
  const errors = Object.keys(responses).filter((c) => !isSuccess(c) && !SHARED_ERRORS.includes(c));
  const specific = errors.filter((c) => hasExample(responses[c]));
  if (specific.length) return specific.sort((a, b) => rank(SPECIFIC_ORDER, a) - rank(SPECIFIC_ORDER, b))[0];
  return FALLBACK_ORDER.find((c) => responses[c]) ?? errors[0];
}

export function trimResponses(spec) {
  const removed = [];
  for (const { key, op } of operations(spec)) {
    const responses = op.responses ?? {};
    const success = Object.keys(responses).find(isSuccess);
    const error = pickError(responses);
    for (const code of Object.keys(responses)) {
      if (code === success || code === error) continue;
      delete responses[code];
      removed.push(`${key} ${code}`);
    }

    // Two examples with the same value under one code.
    for (const response of Object.values(responses)) {
      for (const media of Object.values(response?.content ?? {})) {
        if (!media.examples) continue;
        const kept = [];
        for (const [name, example] of Object.entries(media.examples)) {
          if (kept.some((v) => deepEqual(v, example.value))) delete media.examples[name];
          else kept.push(example.value);
        }
      }
    }
  }
  return { removed };
}
