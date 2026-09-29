# Information Architecture

> **How to use this file:** Map the full documentation structure for this project before writing begins. The Writer skill will not save a file to a path that is not listed here — if a path is missing, the skill will pause and ask. Update this file as the structure evolves. The skill may add new entries automatically when new pages are scoped during a writing session.

---

## Structure Map

> **Updated 2026-09-29:** paths now point to the Fumadocs content root (`fumadocs/content/docs/`). The old `docs/integration-guides/` paths belonged to the Mintlify-era drafts, now in `docs (deprecated)/`. Don't save new pages there. Sidebar order comes from each folder's `meta.json` (see `projectConvention.md`); keep this map and `meta.json` in sync. URLs are the file path under `content/docs/` with `/docs` in front and no extension.

### Home

| Page title | File path | Page type | Status |
|---|---|---|---|
| Plytix API Documentation | `fumadocs/content/docs/index.mdx` | Landing | Written |

### Guides → Get Started

Source: `plytix-outline-canvas.md`, "📘 Guides → 🚀 Get Started" (updated 2026-09-29: "Choosing Between v1/v2 and v3" replaced by "Migrating to v3" and its child "Migration Reference", per the outline).

| Page title | File path | Page type | Status |
|---|---|---|---|
| Overview | `fumadocs/content/docs/guides/overview.mdx` | Concept | Written |
| Quickstart | `fumadocs/content/docs/guides/quickstart.mdx` | Tutorial | Written |
| The Plytix Data Model | `fumadocs/content/docs/guides/data-model.mdx` | Concept | Placeholder |
| Migrating to v3 | `fumadocs/content/docs/guides/migrating-to-v3/index.mdx` | How-to Guide | Placeholder |
| ↳ Migration reference | `fumadocs/content/docs/guides/migrating-to-v3/migration-reference.mdx` | Reference | Placeholder |

### Guides → Integration Guides

Source: `plytix-outline-canvas.md`, "📘 Guides → 🔗 Integration Guides".

| Page title | File path | Page type | Status |
|---|---|---|---|
| Sync your ERP with Plytix | `fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx` | How-to Guide | Written |
| Export your full catalog | `fumadocs/content/docs/guides/exporting-your-full-catalog.mdx` | How-to Guide | Written |
| Audit product data quality with filters | `fumadocs/content/docs/guides/auditing-product-data-quality-with-filters.mdx` | How-to Guide | Written |
| Build a marketplace-specific product feed | `fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx` | How-to Guide | Written |
| Safely remove categories, assets, or relationships | `fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx` | How-to Guide | Written |
| Reconstruct parent/variant hierarchies | `fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx` | How-to Guide | Written |
| Bulk Operations for Large Catalogs | `fumadocs/content/docs/guides/bulk-operations-for-large-catalogs.mdx` | How-to Guide | Written |
| Getting notified: webhooks and Automations | `fumadocs/content/docs/guides/getting-notified-webhooks-and-automations.mdx` | Concept | Written |

> "Building Channel-Specific Product Feeds" was renamed to "Build a marketplace-specific product feed" (`building-marketplace-specific-product-feeds.mdx`) when the guides moved to Fumadocs.

### Guides → Plytix MCPs

Source: `plytix-outline-canvas.md`, "📘 Guides → 🤖 Plytix MCPs". The Platform MCP pages are placeholders for a roadmap feature (see `glossary.md`'s MCP Server entry, `[PENDING]`); don't write them until Plytix confirms the feature is live.

| Page title | File path | Page type | Status |
|---|---|---|---|
| Documentation MCP | `fumadocs/content/docs/guides/documentation-mcp.mdx` | How-to Guide | Placeholder |
| Plytix Platform MCP | `fumadocs/content/docs/guides/platform-mcp/index.mdx` | Concept | Placeholder |
| ↳ Authentication and OAuth setup | `fumadocs/content/docs/guides/platform-mcp/authentication-and-oauth-setup.mdx` | How-to Guide | Placeholder |
| ↳ Supported clients | `fumadocs/content/docs/guides/platform-mcp/supported-clients.mdx` | Reference | Placeholder |
| ↳ Available tools | `fumadocs/content/docs/guides/platform-mcp/available-tools.mdx` | Reference | Placeholder |
| ↳ Permissions and security considerations | `fumadocs/content/docs/guides/platform-mcp/permissions-and-security.mdx` | Reference | Placeholder |
| ↳ Practical examples | `fumadocs/content/docs/guides/platform-mcp/practical-examples.mdx` | How-to Guide | Placeholder |

> Child pages (↳) live in a subfolder whose `index.mdx` is the parent page and whose `meta.json` sets the child order.

### API Reference

| Page title | File path | Page type | Status |
|---|---|---|---|
| API Reference | `fumadocs/content/docs/reference/index.mdx` | Landing | Written |

### API Reference → v3 (Current) → Overview

| Page title | File path | Page type | Status |
|---|---|---|---|
| API Reference Overview | `fumadocs/content/docs/reference/v3/index.mdx` | Landing | Written |
| Authentication | `fumadocs/content/docs/reference/v3/authentication.mdx` | Reference | Written |
| Errors and Status Codes | `fumadocs/content/docs/reference/v3/errors-status-codes.mdx` | Reference | Written |
| Rate Limits | `fumadocs/content/docs/reference/v3/rate-limits.mdx` | Reference | Written |
| Filtering and Query Syntax Reference | `fumadocs/content/docs/reference/v3/filtering-query-syntax.mdx` | Reference | Placeholder |
| Pagination Reference | `fumadocs/content/docs/reference/v3/pagination.mdx` | Reference | Placeholder |
| Working with Updates and Deletes | `fumadocs/content/docs/reference/v3/updates-and-deletes.mdx` | Reference | Placeholder |

### API Reference → v3 (Current) → Endpoints

Generated from `fumadocs/openapi.json` by `fumadocs-openapi`, one folder per resource under `fumadocs/content/docs/reference/v3/` (for example, `products/`, `assets/`, `productcategories/`). Page type: Reference (generated). Don't hand-write or hand-edit these pages. Regenerate them from the spec.

### API Reference → Legacy (v1/v2)

| Page title | File path | Page type | Status |
|---|---|---|---|
| API v1/v2 Reference | `fumadocs/content/docs/reference/legacy/api-v1-v2-reference.mdx` | Reference | Written |

Endpoint pages are generated from `fumadocs/openapi-v1v2.json`, one folder per resource under `fumadocs/content/docs/reference/legacy/`. Same rule: regenerate, don't hand-edit.

---

## Naming Conventions

**URL structure:** `/docs/[section]/[page-name]`, derived from the file path under `fumadocs/content/docs/` (for example, `/docs/guides/quickstart`, `/docs/reference/v3/pagination`)
**Folder structure:** mirrors the URL structure. Each folder has a `meta.json` that sets sidebar title, order, and groups.

---

## Notes

<!-- Add any IA decisions, redirects, or structural constraints here -->

**Source: `materials/project-references/before-writing.md`, §3 ("Product Roadmap") — read before scoping the API documentation IA.**

- **Channels have no API endpoints at all.** `[CONFLICT, flagged 2026-09-29]`: `openapi_pimv3.json` (and `fumadocs/openapi.json`) define `/api/v3/channels` endpoints, and generated pages exist under `fumadocs/content/docs/reference/v3/channels/`. Per the trust order, the spec outranks `before-writing.md`, but a spec entry doesn't prove the endpoints are live or supported. Confirm with Plytix (or test with `endpoint-tester`) before writing anything that relies on either claim. Until then, guides keep following this rule: Channels (Shopify, BigCommerce, feed exports) are configured and managed entirely in the Plytix UI. Do not plan an API reference or how-to page for creating/managing channels — there is nothing to document. Once Destinations ships, route any "assign a product to a channel via the API" need there instead (see `glossary.md`'s Channel/Destinations entries and `style-guide.md`'s worked example under "Don't say no").
- **v1/v2 endpoints remain required for write workflows.** Any workflow that creates, updates, or deletes products (ERP write-back, stock updates, price updates, status changes) currently must use v1/v2 — v3 doesn't yet have write parity. IA needs a v1/v2 write-workflow section living alongside the v3 sections, not just a single "migrate to v3" redirect page. Revisit this constraint once v3 write endpoints ship.
- **Several features are upcoming, not yet shippable pages.** Webhooks, the MCP Server, Destinations, and (tentatively) Workspaces are in progress at time of writing — see `glossary.md` for each term's `[PENDING]` status. Flag these as placeholders to revisit once confirmed live; don't build final IA structure or write pages for them yet.
- **An API entity-coverage reference is a required future addition.** Customers frequently spend support time looking for endpoints that don't exist (Channels, Smart Lists among them) because no page states plainly what is and isn't accessible via API. Once IA planning starts, this needs its own Reference-type page (see `page-types.md`) — don't let this fall through as "covered elsewhere."