// Docs pages have two representations at the same URL, HTML and Markdown,
// selected by the request's `Accept` header (proxy.ts). Every response for those
// URLs must say so in `Vary`, alongside the values Next adds (RSC, router state),
// or a shared cache can serve the wrong body (STG-013).

/** URL paths whose body depends on `Accept`: the section routes in lib/shared.ts. */
export const NEGOTIATED_PATH = /^\/(guides|mcp|reference)(\/|$)/;

/** Adds `value` to the Vary header, keeping existing values and skipping duplicates. */
export function appendVary(headers: Headers, value = 'Accept'): void {
  const current = headers.get('Vary');
  if (!current) {
    headers.set('Vary', value);
    return;
  }
  const values = current.split(',').map((v) => v.trim().toLowerCase());
  if (values.includes('*') || values.includes(value.toLowerCase())) return;
  headers.set('Vary', `${current}, ${value}`);
}
