# Information Architecture

> **How to use this file:** Map the full documentation structure for this project before writing begins. The Writer skill will not save a file to a path that is not listed here — if a path is missing, the skill will pause and ask. Update this file as the structure evolves. The skill may add new entries automatically when new pages are scoped during a writing session.

---

## Structure Map

> **Updated 2026-09-29:** paths now point to the Fumadocs content root (`fumadocs/content/docs/`). The old `docs/integration-guides/` paths belonged to the Mintlify-era drafts, now in `docs (deprecated)/`. Don't save new pages there. Sidebar order comes from each folder's `meta.json` (see `projectConvention.md`); keep this map and `meta.json` in sync. URLs are the file path under `content/docs/` with `/docs` in front and no extension.

### Home

| Page title | File path | Page type | Status |
|---|---|---|---|
| Plytix API Documentation | `fumadocs/content/docs/index.mdx` | Landing | Written |

### Guides → Get started

> **Restructured 2026-10-21** (Plytix marketing/design feedback, items 8-10): Guides are grouped as Get started, Integration guides, How-to guides, AI assistants, and Upgrade from V1/V2, with the titles Plytix listed. "Overview" was replaced by "What is the Plytix API?" (`/docs/guides/overview` redirects). File names and URLs of the other guides are unchanged.

| Page title | File path | Page type | Status |
|---|---|---|---|
| What is the Plytix API? | `fumadocs/content/docs/guides/what-is-the-plytix-api.mdx` | Concept | Written |
| Quickstart: make your first request | `fumadocs/content/docs/guides/quickstart.mdx` | Tutorial | Written |
| Plytix data model | `fumadocs/content/docs/guides/data-model.mdx` | Concept | Written |

### Guides → Integration guides

| Page title | File path | Page type | Status |
|---|---|---|---|
| Sync your ERP with Plytix | `fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx` | How-to Guide | Written |
| Export your full catalog | `fumadocs/content/docs/guides/exporting-your-full-catalog.mdx` | How-to Guide | Written |
| Build a marketplace feed | `fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx` | How-to Guide | Written |

### Guides → How-to guides

| Page title | File path | Page type | Status |
|---|---|---|---|
| Audit product data quality | `fumadocs/content/docs/guides/auditing-product-data-quality-with-filters.mdx` | How-to Guide | Written |
| Unlink categories, assets, or relationships | `fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx` | How-to Guide | Written |
| Rebuild parent and variant products | `fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx` | How-to Guide | Written |

> Not in the navigation: "Get notified about changes" (`guides/getting-notified-webhooks-and-automations.mdx`, Concept) isn't in Plytix's proposed structure; placement is a question for Plytix. "Bulk operations for large catalogs" is a private draft in `internal-drafts/guides/` (PM-07).

### Guides → AI assistants

Source: Plytix's MCP documentation brief (27 Oct 2026), which supersedes the outline canvas for this section. The Plytix MCP is a beta: one How-to Guide page under AI assistants, titled "Plytix MCP", with Overview, Connect your account, Available capabilities, Example workflows, Limitations and troubleshooting, and Changelog. It wraps V3 but must not be described as an API version or as exposing every V3 endpoint. It authenticates with OAuth. The five child pages drafted on 2026-09-29 (Authentication and OAuth setup, Supported clients, Available tools, Permissions and security considerations, Practical examples) are superseded and archived in `internal-drafts/guides/platform-mcp/`; don't restore them. The page stays blocked on flags until Plytix confirms: the release server URL (the page uses the placeholder `<plytix-mcp-url>`; the brief's `pim.dev.plytix.com/mcp` is DEV only), account eligibility and permissions, the tool list (captured from a tested connection), that OAuth is separate from V3 access tokens, the selection the content-quality example can use, and the release date. Claude and ChatGPT walkthrough tabs are added only after each flow is tested against the release endpoint; a Gemini CLI tab needs its own test. The Documentation MCP is a different server and is already implemented in this repo (`fumadocs/app/api/mcp/route.ts`), so its page was written from that code plus `fumadocs/README.md`; it is not gated on the Plytix MCP.

| Page title | File path | Page type | Status |
|---|---|---|---|
| Connect an AI assistant to the Plytix docs | `fumadocs/content/docs/guides/documentation-mcp.mdx` | How-to Guide | Written |
| Plytix MCP | `fumadocs/content/docs/guides/platform-mcp/index.mdx` | How-to Guide | Draft, blocked on flags |

### Guides → Upgrade from V1/V2

Listed flat in the sidebar with `"...migrating-to-v3"`, overview first.

| Page title | File path | Page type | Status |
|---|---|---|---|
| Migration overview | `fumadocs/content/docs/guides/migrating-to-v3/index.mdx` | How-to Guide | Draft, blocked on flags |
| Authentication and base URLs | `fumadocs/content/docs/guides/migrating-to-v3/authentication-and-base-urls.mdx` | Reference | Draft, blocked on flags |
| Search and pagination | `fumadocs/content/docs/guides/migrating-to-v3/searching-and-pagination.mdx` | Reference | Draft, blocked on flags |
| Filter operators | `fumadocs/content/docs/guides/migrating-to-v3/filter-operators.mdx` | Reference | Draft, blocked on flags |
| Responses and updates | `fumadocs/content/docs/guides/migrating-to-v3/responses-and-updates.mdx` | Reference | Draft, blocked on flags |
| Endpoint mapping | `fumadocs/content/docs/guides/migrating-to-v3/endpoint-mapping.mdx` | Reference | Draft, blocked on flags |
| What's new and not migrated | `fumadocs/content/docs/guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx` | Reference | Draft, blocked on flags |

### API Reference

> **Updated 2026-10-21:** the reference is served at `/reference/**` (not `/docs/reference/**`), the legacy folder is `reference/v1-v2/`, version labels are "V3 (Beta)" and "V1/V2 (Legacy)", and both "Overview" groups are now "Core concepts". Old URLs redirect via `fumadocs/redirects.json`.

| Page title | File path | Page type | Status |
|---|---|---|---|
| API Reference | `fumadocs/content/docs/reference/index.mdx` | Landing | Written |

### API Reference → V3 (Beta) → Core concepts

| Page title | File path | Page type | Status |
|---|---|---|---|
| API Reference Overview | `fumadocs/content/docs/reference/v3/index.mdx` | Landing | Written |
| Authentication | `fumadocs/content/docs/reference/v3/authentication.mdx` | Reference | Written |
| Errors and Status Codes | `fumadocs/content/docs/reference/v3/errors-status-codes.mdx` | Reference | Written |
| Rate Limits | `fumadocs/content/docs/reference/v3/rate-limits.mdx` | Reference | Written |
| Filtering and search | `fumadocs/content/docs/reference/v3/filtering-and-search.mdx` | Reference | Draft, blocked on flags |
| Pagination Reference | `fumadocs/content/docs/reference/v3/pagination.mdx` | Reference | Draft, blocked on flags |
| Working with Updates and Deletes | `fumadocs/content/docs/reference/v3/updates-and-deletes.mdx` | Reference | Draft, blocked on flags |

> These three were drafted 2026-09-29 and are the authoritative v3 pages for their topics; the `migrating-to-v3/` reference pages cover the same ground for the v1 comparison and now link across rather than restating it. Their common blocker: neither `openapi_pimv3.json` nor `fumadocs/openapi.json` declares any query parameter on any search operation, so filter syntax, `_fields`, and all paging parameters rest on `API V3.md` (a design doc with approved/rejected/postponed options). Confirmed from the spec and safe: the response envelope (`data`, `errors`, `pagination`) and the `Pagination` schema's two fields (`next_page`, `previous_page`, no counts).
>
> **Updated 2026-10-01 (review of `filtering-query-syntax.mdx`):** don't write these pages from `API V3.md` alone. `endpoint-tester` already ran (2026-09-07 to 2026-10-01) and `config/api-testing.config.md`'s quirks outrank the prose doc. That testing confirmed plain equality, `[gt]`, `[in]`, `[exists]`/`[!exists]` (with an explicit `=true`), `[icontains]`, dot-notation related-entity filters, `attributes.<name>`, `_fields`, and `_page`/`_page_size`/`_sort_by`. It also **contradicts** `API V3.md` in places: `_expand` and `_offset`/`_limit` return 400; products have no `relationships` field, only `product_relationships`.
>
> **Updated 2026-10-08 (verification run behind `output-reviewer-2026-10-08.md`).** Two corrections to the paragraph above, plus closures:
>
> - **The case-insensitive operator is `contains:ignorecase`, not `icontains`.** This reverses the 2026-10-01 note. `icontains` now returns `400 InvalidFilterOperator`. The API enumerates its full set on any invalid operator, which is the authoritative list to write from: `!contains, !contains:ignorecase, !eq, !exists, !gt, !gte, !in, !includes, !intersects, !lt, !lte, !null, contains, contains:ignorecase, eq, exists, gt, gte, in, includes, intersects, lt, lte, null`. Note `includes`/`!includes` appear there and in no Plytix source; don't document them until Plytix explains them.
> - **Previously "Spec only", now confirmed working:** `_or[#]`/`_and[#]` grouping, `[null]`/`[!null]`, `[length]` **and** `[len]` (both spellings), `[intersects]`, `_fields=*`, and `_sort_by=-<field>` for descending. Still unconfirmed: `days_passed`, `_include_unfiltered_entities`. **Confirmed not working:** the `_![bool][#]` NOT-grouping form from `API V3.md` returns `400`.
> - **Product writes changed shape.** Every `*_ids` field (`category_ids`, `static_list_ids`, `channel_ids`, `ecatalog_ids`, `product_data_sheet_ids`) is now rejected on `POST`/`PATCH /products` with `422 "Extra inputs are not permitted"`, despite still being declared in the spec. Categories are linked with `POST /products/{id}/categories` (body `{"id": "..."}`) and unlinked with `DELETE /products/{id}/categories/{category_id}`, which is safe and scoped. There is no equivalent for assets, so non-thumbnail assets can't be attached or detached via the API at all. See `config/api-testing.config.md` quirks #93-#96.

### API Reference → V3 (Beta) → Endpoints

Generated from `fumadocs/openapi.json` by `fumadocs-openapi`, one folder per resource under `fumadocs/content/docs/reference/v3/` (for example, `products/`, `assets/`, `product-categories/`). File names and titles come from `fumadocs/scripts/endpoint-names.json` (for example, `products/get-product.mdx`, "Get a product"). Page type: Reference (generated). Don't hand-write or hand-edit these pages. Regenerate them from the spec.

### API Reference → V1/V2 (Legacy)

| Page title | File path | Page type | Status |
|---|---|---|---|
| V1/V2 API reference overview | `fumadocs/content/docs/reference/v1-v2/api-v1-v2-reference.mdx` | Landing | Written |
| V1/V2 authentication | `fumadocs/content/docs/reference/v1-v2/token-authentication.mdx` | Reference | Draft, blocked on flags |
| V1/V2 errors and status codes | `fumadocs/content/docs/reference/v1-v2/errors-status-codes.mdx` | Reference | Draft, blocked on flags |
| V1/V2 rate limits | `fumadocs/content/docs/reference/v1-v2/rate-limits.mdx` | Reference | Draft, blocked on flags |
| V1/V2 filtering and search | `fumadocs/content/docs/reference/v1-v2/filtering-and-search.mdx` | Reference | Draft, blocked on flags |
| V1/V2 pagination | `fumadocs/content/docs/reference/v1-v2/pagination.mdx` | Reference | Draft, blocked on flags |

> **Drafted 2026-10-08:** the five pages above mirror v3's Overview group. They are the "Core concepts" cards on the legacy landing page. The authentication page is `token-authentication.mdx`, not `authentication.mdx`, because the generated `authentication/` endpoint folder already owns that slug. Only the auth exchange and basic `POST /api/v1/products/search` were tested live; the rest comes from the v1 Postman collection, so each page carries FLAG callouts. Open conflicts: attribute cap 20 vs 50; `like` vs `contains`/`null` operator names (and `migration-reference.mdx` should be aligned once resolved); valid `qty_operator` values; which pagination fields every response carries; whether v1 rate limits match v3's. No "Updates and Deletes" page: v1/v2 sources only give per-endpoint status codes.

Endpoint pages are generated from `fumadocs/openapi-v1v2.json`, one folder per resource under `fumadocs/content/docs/reference/v1-v2/`. Same rule: regenerate, don't hand-edit.

---

## Naming Conventions

**URL structure:** guides are `/docs/guides/[page-name]`; the API reference is `/reference/[version]/[page-name]` and `/reference/[version]/[resource]/[action]` (for example, `/docs/guides/quickstart`, `/reference/v3/pagination`, `/reference/v3/products/get-product`, `/reference/v1-v2/products/create-product`). Updated 2026-10-21, pending Plytix sign-off on the pattern.
**Folder structure:** mirrors the URL structure. Each folder has a `meta.json` that sets sidebar title, order, and groups.

---

## Notes

<!-- Add any IA decisions, redirects, or structural constraints here -->

**Source: `materials/project-references/brief/before-writing.md`, §3 ("Product Roadmap") — read before scoping the API documentation IA.**

- **Channels have an API.** `[RESOLVED 2026-10-09]`: the project lead confirmed Channels are documented as API resources. `openapi_pimv3_20261002 (Latest spec).json` defines `/api/v3/channels` (GET, POST, PATCH, DELETE) and `/products/{id}/channels` (POST, DELETE), and live testing confirmed them (`config/api-testing.config.md`). This supersedes the roadmap note in `materials/project-references/brief/before-writing.md` §3. Destinations remains an upcoming, not-yet-fully-live feature (see `glossary.md`); don't route channel questions there until it ships.
- **v1/v2 endpoints remain required for write workflows.** Any workflow that creates, updates, or deletes products (ERP write-back, stock updates, price updates, status changes) currently must use v1/v2 — v3 doesn't yet have write parity. IA needs a v1/v2 write-workflow section living alongside the v3 sections, not just a single "migrate to v3" redirect page. Revisit this constraint once v3 write endpoints ship.
- **Several features are upcoming, not yet shippable pages.** Webhooks, Destinations, and (tentatively) Workspaces are in progress at time of writing — see `glossary.md` for each term's `[PENDING]` status. Flag these as placeholders to revisit once confirmed live; don't build final IA structure or write pages for them yet. (Updated 2026-10-28: the Plytix MCP is now a beta with its own page, per the 27 Oct brief; see Guides → AI assistants.)
- **`API V3.md` specifies a bulk API that the spec doesn't implement.** `[CONFLICT, flagged 2026-09-29]`: `API V3.md`'s URL standardization table defines `api/v3/-/bulk/<entities>` for bulk create/edit/delete plus job tracking at `api/v3/-/bulk/-/jobs/`, and also defines PUT operations. Neither appears in `openapi_pimv3.json`, and `bulk-operations-for-large-catalogs.mdx` already states there are no bulk endpoints. `API V3.md` is a design document with approved/rejected/postponed color codes, so parts of it describe intended rather than shipped behavior. Treat the spec as current; confirm the bulk timeline with Plytix. Surfaced while drafting `migrating-to-v3/index.mdx`.
- **v3 has no equivalent for several v1 endpoints.** Confirmed by diffing `openapi_pimv1.json` against `openapi_pimv3.json`: filter discovery (`/api/v1/filters/*`), asset content upload (`PUT /api/v1/assets/{id}/content`), variant endpoints (`/products/{parent}/variants`, resync), and `/api/v1/accounts/api-credentials/search` have no v3 path. The migration guide lists these as gaps; the entity-coverage reference below should absorb them.
- **An API entity-coverage reference is a required future addition.** Customers frequently spend support time looking for endpoints that don't exist (Channels, Smart Lists among them) because no page states plainly what is and isn't accessible via API. Once IA planning starts, this needs its own Reference-type page (see `page-types.md`) — don't let this fall through as "covered elsewhere."