// Step 3b: trim responses for the rendered page. Runs on the merged spec after
// the overlays, so it never shows up in drift or in crosscheck.
//
// Every operation lists nine or ten status codes, most of them generic errors
// that fumadocs renders with the same sample body. Each page shows only its
// success response and one error: the one written for this operation, with an
// example of its own. The errors every operation shares (401, 402, 500, 502)
// are covered on the Errors and status codes page instead.
//
// When no error has an example of its own, the page used to show a schema
// sample (`{"name": "string", "description": "string"}`), which doesn't tell a
// reader what went wrong (STG-018). That error now gets an illustrative example
// in a format captured live, labelled as illustrative: a 404 for an operation
// that only addresses a record, otherwise a 422.

import { deepEqual, operations } from './util.mjs';

const SHARED_ERRORS = ['401', '402', '500', '502'];
// Tie-break when several errors have their own example, then the fallback
// order when none does.
const SPECIFIC_ORDER = ['409', '405', '400', '404', '403', '422'];
const FALLBACK_ORDER = ['422', '400'];
// An operation with no body and no query parameters can only fail on the record
// it names, so its most useful error is "not found".
const RECORD_FALLBACK_ORDER = ['404', '422', '400'];

const isSuccess = (code) => /^2/.test(code);
const hasExample = (response) =>
  Object.values(response?.content ?? {}).some((m) => m.example !== undefined || Object.keys(m.examples ?? {}).length);
const rank = (order, code) => (order.includes(code) ? order.indexOf(code) : order.length);

const addressesRecordOnly = (op) =>
  !op.requestBody && !(op.parameters ?? []).some((p) => p?.in === 'query');

function pickError(op) {
  const responses = op.responses ?? {};
  const errors = Object.keys(responses).filter((c) => !isSuccess(c) && !SHARED_ERRORS.includes(c));
  const specific = errors.filter((c) => hasExample(responses[c]));
  if (specific.length) return specific.sort((a, b) => rank(SPECIFIC_ORDER, a) - rank(SPECIFIC_ORDER, b))[0];
  const order = addressesRecordOnly(op) ? RECORD_FALLBACK_ORDER : FALLBACK_ORDER;
  return order.find((c) => responses[c]) ?? errors[0];
}

const ILLUSTRATIVE = 'Illustrative example, in the format the API returns. The ID, field and message depend on your request.';
const envelope = (name, description) => ({ data: [], errors: [{ name, description }] });

/** First required property of the JSON request body, if the body is an object schema. */
function firstRequiredField(op, spec) {
  let schema = op.requestBody?.content?.['application/json']?.schema;
  const ref = schema?.$ref?.match(/^#\/components\/schemas\/(.+)$/)?.[1];
  if (ref) schema = spec.components?.schemas?.[ref];
  return schema?.required?.[0];
}

/** An illustrative example for an error response that has none, or undefined. */
function illustrativeExample(code, op, spec) {
  if (code === '404') {
    return {
      notFound: {
        summary: 'Record not found (illustrative)',
        description: ILLUSTRATIVE,
        // Format from the "404 - Not Found After Delete" captures (2026-09-15).
        value: envelope('NotFoundError', 'Document with id 6a1f0c2e9b3d4a5f8c7e1a99 not found'),
      },
    };
  }
  if (code !== '422') return;
  // Format from List Products.bru "422 - Pagination Bounds" (2026-10-01).
  if ((op.parameters ?? []).some((p) => p?.in === 'query' && p.name === '_page')) {
    return {
      pageOutOfRange: {
        summary: 'Page number below 1 (illustrative)',
        description: ILLUSTRATIVE,
        value: envelope('InputDTOValidationError', 'query._page: Input should be greater than or equal to 1'),
      },
    };
  }
  // Format from the create captures, such as `sku: Field required` (2026-09-07).
  const field = firstRequiredField(op, spec);
  if (field) {
    return {
      missingField: {
        summary: `Missing ${field} (illustrative)`,
        description: ILLUSTRATIVE,
        value: envelope('InputDTOValidationError', `${field}: Field required`),
      },
    };
  }
  return {
    invalidRequest: {
      summary: 'Validation error (illustrative)',
      description: `${ILLUSTRATIVE} The message names the field and what's wrong with it.`,
      value: envelope('InputDTOValidationError', '<field>: <what to fix>'),
    },
  };
}

export function trimResponses(spec) {
  const removed = [];
  const illustrated = [];
  for (const { key, op } of operations(spec)) {
    const responses = op.responses ?? {};
    const success = Object.keys(responses).find(isSuccess);
    const error = pickError(op);
    for (const code of Object.keys(responses)) {
      if (code === success || code === error) continue;
      delete responses[code];
      removed.push(`${key} ${code}`);
    }

    // The kept error has no example: add an illustrative one, on the JSON media
    // type the response already declares (or the shared OperationResponse).
    const kept = error && responses[error];
    if (kept && !hasExample(kept)) {
      const examples = illustrativeExample(error, op, spec);
      if (examples) {
        kept.content ??= {};
        kept.content['application/json'] ??= { schema: { $ref: '#/components/schemas/OperationResponse' } };
        kept.content['application/json'].examples = examples;
        illustrated.push(`${key} ${error}`);
      }
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
  return { removed, illustrated };
}
