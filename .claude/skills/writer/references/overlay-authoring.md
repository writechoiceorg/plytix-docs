# Writing V3 API reference content (OpenAPI overlays)

V3 endpoint pages are generated from the OpenAPI spec. Never write or edit those MDX pages, and never edit `fumadocs/openapi.json`. All endpoint, parameter, schema, and example text goes into overlay files under `fumadocs/overlays/` (see `fumadocs/overlays/README.md` for file layout, target rules, and drift codes). Run `npm run api:build` in `fumadocs/` after every change.

The style guide, glossary, and V1/V2-V3 naming rules apply to every `summary` and `description` string, exactly as they do to MDX pages.

## Sources and trust

1. Live findings: `config/api-testing.config.md` (quirks, cite as `Q#`), `feedback-flags.md` (`FB-`), `bruno-collection/` captures (check the date; later quirks supersede older examples)
2. The upstream spec: `fumadocs/upstream/openapi-v3.json`
3. Plytix answers in `materials/project-references/brief/Questions for the Plytix Dev Team.md`
4. `API V3.md` and the help center (intent, not behavior)

Cite sources in each action's `description` field (it isn't published). When no source confirms a behavior, don't write it: add a question to `fumadocs/overlays/QUESTIONS.md` and leave the claim out. When the spec contradicts live behavior, document the live behavior and log the discrepancy as an `OAS-` question.

## Operation description

Plain Markdown, no headings, short paragraphs, lists for parallel facts. In this order, skipping what doesn't apply:

1. What it does, in one sentence that starts with a verb ("Creates one product and returns the full record").
2. When to use it, especially versus related operations.
3. What success returns: status code and body. PATCH and DELETE return `204` with no body.
4. Constraints: required fields, uniqueness, limits, valid combinations, parent/variant rules.
5. Side effects and safety: what else changes, whether a retry is safe (state it only when it follows from verified behavior, for example a unique SKU).
6. Gotchas confirmed live (silent ignores, replaced maps, `http://` links).
7. Links: guides and conceptual pages, with site routes (`/docs/guides/...`, `/docs/reference/v3/...`). Link text is the page title.

`summary` is the page title: sentence case, verb first, 60 characters or fewer ("Search products", "Delete a product category").

## Parameters and properties

One or two sentences: what it is, accepted values or format, default, and what happens when it's wrong (status code). Shared parameters (`_fields`, `_page`, `_page_size`, `_sort_by`, `filters`, `identifier`, `path`) and shared error responses come from `fumadocs/overlays/10-shared.yaml`. Override them in `ops/<tag>.yaml` only where a resource behaves differently, and keep `10-shared.yaml` true for every operation it touches.

## Examples

- Use named `examples` on the media type (request bodies and responses), one per scenario, each with a `summary`. Schema-level `example` (singular) isn't rendered; use `examples: [...]` on properties.
- Base every example on a captured response. Replace IDs with fake 24-character hex IDs (`6a1f0c2e9b3d4a5f8c7e1a01` style), account and user data with realistic placeholders, and hosts with `<api-host>`. Never include tokens.
- Large payloads go in `fumadocs/overlays/examples/<tag>/<name>.json`, referenced as `value: { x-example-file: <tag>/<name>.json }`.
- Every documented error code gets an example of the real body.

## Rendering limits (fumadocs-openapi 11.4)

- `oneOf`/`anyOf` render as tabs named from each branch's `title`, so give branches titles.
- `discriminator` and enum descriptions aren't rendered: explain them in `description`.
- Markdown links, lists, tables, and inline code render. Images and MDX callouts don't.

## Endpoint-to-guide map

Link to these from the matching operations. Resources with no guide are candidates for `docs-ia`.

| Resource | Guides and conceptual pages |
|---|---|
| products | `/docs/guides/quickstart`, `/docs/guides/exporting-your-full-catalog`, `/docs/guides/auditing-product-data-quality-with-filters`, `/docs/guides/building-marketplace-specific-product-feeds`, `/docs/guides/syncing-your-erp-with-plytix`, `/docs/guides/reconstructing-parent-variant-hierarchies` (variants) |
| products: link/unlink, thumbnail | `/docs/guides/safely-removing-categories-assets-or-relationships` |
| product-categories | `/docs/guides/safely-removing-categories-assets-or-relationships#remove-a-category-from-a-product`, `/docs/guides/data-model` |
| assets | `/docs/guides/safely-removing-categories-assets-or-relationships#connect-other-assets-to-a-product` |
| product-attributes | `/docs/guides/syncing-your-erp-with-plytix`, `/docs/guides/building-marketplace-specific-product-feeds`, `/docs/guides/data-model` |
| product-families | `/docs/guides/reconstructing-parent-variant-hierarchies`, `/docs/guides/data-model` |
| all search operations | `/docs/reference/v3/filtering-query-syntax`, `/docs/reference/v3/pagination` |
| all writes | `/docs/reference/v3/updates-and-deletes` |
| no guide yet | asset-categories, asset-lists, relationships, product-relationships, related-products, family-attributes, product-attribute-groups |
