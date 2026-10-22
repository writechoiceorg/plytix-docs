# Phase 3 brief: V3 reference overlays for one resource pair

You write OpenAPI Overlay content for Plytix's V3 API reference. Repo root: `\\wsl.localhost\Ubuntu\home\marcos\Repositories-WC\plytix-docs` (site in `fumadocs/`). Use the Bash tool with Git Bash paths like `//wsl.localhost/Ubuntu/home/marcos/Repositories-WC/plytix-docs/fumadocs`.

## Read first (in this order)

1. `.claude/skills/writer/references/overlay-authoring.md`: the standard (description template, examples, rendering limits, guide map).
2. `fumadocs/overlays/README.md`: target shapes, operationId convention, drift rules.
3. `fumadocs/overlays/10-shared.yaml`: shared parameter and error text already applied to every operation. Don't repeat it. Override per operation only where behavior differs.
4. `fumadocs/overlays/ops/products.yaml`, `ops/family-attributes.yaml`, `ops/assets.yaml`: finished examples of the expected quality, structure, citations, and examples.
5. Style: `.claude/skills/writer/references/style-guide.md`, `glossary.md`, `guideline.md` (V1/V2 and V3 naming). The published site writes "category", "asset", "product family", "attribute" in lowercase in running text.

## Sources (trust order) and the no-invention rule

1. `config/api-testing.config.md` (numbered quirks, cite as `Q#`; append-only, so LATER entries supersede earlier ones, including the 2026-10-15 retest block near the end), `feedback-flags.md` at repo root (`FB-###`), `bruno-collection/<NN>-<Resource>/` (`.bru` `example {}` and `docs {}` blocks; check dates against newer quirks).
2. The upstream spec `fumadocs/upstream/openapi-v3.json` (and the built `fumadocs/openapi.json` to see what's currently published).
3. Plytix answers in `materials/project-references/brief/Questions for the Plytix Dev Team.md`.
4. `materials/api-references/v3-reference/API V3.md` and the help center: intent only, never behavior.

Write only what a source confirms. If a behavior isn't confirmed, leave it out and report a question. If the newest live evidence contradicts the spec, document the live behavior; if an operation doesn't work live at all, recommend it for `on-hold` (with evidence) instead of documenting it. Cite sources in each action's `description` field (unpublished). No live API calls: live testing is on hold.

## Your files (you own only these)

- `fumadocs/overlays/ops/<tag>.yaml` and `fumadocs/overlays/schemas/<tag>.yaml` for your two resources. If the file exists (assets, product-categories), KEEP the existing actions unchanged and add yours. Use the upstream tag name with hyphens for file names (for example `ops/asset-categories.yaml`).
- `fumadocs/overlays/examples/<tag>/` for large example payloads.

Do NOT edit any other file: not `00-fixes.yaml`, `10-shared.yaml`, `20-meta.yaml`, `QUESTIONS.md`, `VERIFY.md`, `upstream/*`, other agents' files, scripts, or content MDX. Put anything those need in your report (below).

## What to write, for every public operation of your two resources

- `summary` (sentence case, verb first, 60 characters or fewer) and `operationId` exactly as in the table below.
- A description following the template, with links to guides and conceptual pages (search: filtering + pagination; writes: updates-and-deletes; plus the guide map). Link text is the target page's title.
- Parameter overrides where the shared text is wrong or too generic for this resource (for example `identifier`, `path`, resource-specific `_fields`, `_sort_by`).
- Request body examples (named `examples` on the media type) and response examples for success and every documented error you have a captured body for, sanitized: fake 24-hex IDs in the `6a1f0c2e9b3d4a5f8c7e1xNN` style (pick a unique letter range per resource), `<api-host>` for hosts, realistic placeholder names, no account IDs, emails, or tokens.
- Schema/property descriptions for the request DTOs (create/update bodies) and enums, in `schemas/<tag>.yaml`, with `examples: [...]` (not `example`). Give `oneOf` branches a `title`.

If an operation's request body isn't declared in the spec (common on `/{identifier}/{path}` routes), you can't target its `requestBody` until a fix adds it. Put the proposed fix in your report instead, and don't add actions that target the missing node.

## operationIds (fixed for everyone; use these exactly, and only link to these or to the existing pages)

| Operation | operationId |
|---|---|
| GET /api/v3/assets | search-assets |
| POST /api/v3/assets | create-asset (done) |
| GET /api/v3/assets/{identifier} | get-asset |
| PATCH /api/v3/assets/{identifier} | update-asset |
| DELETE /api/v3/assets/{identifier} | delete-asset |
| GET/PATCH/DELETE /api/v3/assets/{identifier}/{path} | get-asset-field / update-asset-field / delete-asset-field |
| GET /api/v3/asset-categories | search-asset-categories |
| POST /api/v3/asset-categories | create-asset-category |
| GET/PATCH/DELETE /api/v3/asset-categories/{identifier} | get-asset-category / update-asset-category / delete-asset-category |
| GET/PATCH/DELETE /api/v3/asset-categories/{identifier}/{path} | get-asset-category-field / update-asset-category-field / delete-asset-category-field |
| GET /api/v3/product-categories | search-product-categories |
| POST /api/v3/product-categories | create-product-category |
| GET/PATCH /api/v3/product-categories/{identifier} | get-product-category / update-product-category |
| DELETE /api/v3/product-categories/{identifier} | delete-product-category (done) |
| GET/PATCH/DELETE /api/v3/product-categories/{identifier}/{path} | get-product-category-field / update-product-category-field / delete-product-category-field |
| GET /api/v3/asset-lists | search-asset-lists |
| POST /api/v3/asset-lists | create-asset-list |
| GET/PATCH/DELETE /api/v3/asset-lists/{identifier} | get-asset-list / update-asset-list / delete-asset-list |
| GET/PATCH/DELETE /api/v3/asset-lists/{identifier}/{path} | get-asset-list-field / update-asset-list-field / delete-asset-list-field |
| GET /api/v3/product-attributes | search-product-attributes |
| POST /api/v3/product-attributes | create-product-attribute |
| GET/PATCH/DELETE /api/v3/product-attributes/{identifier} | get-product-attribute / update-product-attribute / delete-product-attribute |
| GET/PATCH/DELETE /api/v3/product-attributes/{identifier}/{path} | get-product-attribute-field / update-product-attribute-field / delete-product-attribute-field |
| GET /api/v3/product-attribute-groups | search-product-attribute-groups |
| POST /api/v3/product-attribute-groups | create-product-attribute-group |
| GET/PATCH/DELETE /api/v3/product-attribute-groups/{identifier} | get-product-attribute-group / update-product-attribute-group / delete-product-attribute-group |
| GET/PATCH/DELETE /api/v3/product-attribute-groups/{identifier}/{path} | get-product-attribute-group-field / update-product-attribute-group-field / delete-product-attribute-group-field |
| GET /api/v3/product-families | search-product-families |
| POST /api/v3/product-families | create-product-family |
| GET/PATCH/DELETE /api/v3/product-families/{identifier} | get-product-family / update-product-family / delete-product-family |
| GET/POST/PATCH/DELETE /api/v3/product-families/{identifier}/{path} | get-product-family-field / link-product-family-field / update-product-family-field / delete-product-family-field |
| GET /api/v3/relationships | search-relationships |
| POST /api/v3/relationships | create-relationship |
| GET/PATCH/DELETE /api/v3/relationships/{identifier} | get-relationship / update-relationship / delete-relationship |
| GET/PATCH/DELETE /api/v3/relationships/{identifier}/{path} | get-relationship-field / update-relationship-field / delete-relationship-field |

Already published and linkable: products (`search-products`, `create-product`, `update-product`, `get-product`, `delete-product`, `get-product-field`, `link-product-field`, `update-product-field`, `delete-product-field`), family attributes (`search-family-attributes`, `list-family-attributes`, `create-family-attribute`, `get-family-attribute`, `link-family-attribute`, `update-family-attribute`, `delete-family-attribute`), `productrelationships/search-product-relationships`, `get-product-relationship`, `delete-product-relationship`, `relatedproducts/search-related-products`. Page URLs are `/docs/reference/v3/<tag-without-hyphens>/<operationId>`. Operations marked `on-hold` or `pending` in `fumadocs/upstream/visibility.yaml` have no page: never link to them.

## Validate

From `fumadocs/`, run `node scripts/api/build.mjs --dry-run` (writes only to `.api-build/dry-<pid>/`). Fix every error from YOUR files (lint, drift ZERO_MATCH, broken links, YAML). Other agents are editing their own files at the same time: ignore errors that come only from files you don't own, and mention them in your report. Before finishing, run the reviewer's mechanical checks on your published strings (no em/en dashes; none of: important, very, easy, easily, quick, quickly, simply, just, obviously, leverage, delve, seamless, robust, unlock, effortless; no "the system/tool/PIM"; no `&` in prose; V3 not v3 outside code), and re-check every claim against its cited source.

## Report back (your final message)

1. Files written, and per operation: done / skipped (why).
2. Proposed `00-fixes.yaml` actions (YAML, each with an `x-plytix-question` ID you propose) for missing request bodies or other spec bugs.
3. New questions for `QUESTIONS.md`, in its exact format (`### ID`, **Observed**, **Question**, empty `| Plytix response |` table). Use ID prefixes ASSET-, CAT-, LIST-, ATTR-, GRP-, FAM-, REL- and start numbering at 20 to avoid clashes (for example `ATTR-20`).
4. Rows for `VERIFY.md` (claims published from older or spec-only evidence).
5. Operations you recommend for `on-hold`, with the evidence.
6. Contradictions you found in existing MDX guides or the glossary (don't fix them).
7. The result of your last dry run.
