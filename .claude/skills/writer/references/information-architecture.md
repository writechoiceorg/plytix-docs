# Information Architecture

> **How to use this file:** Map the full documentation structure for this project before writing begins. The Writer skill will not save a file to a path that is not listed here — if a path is missing, the skill will pause and ask. Update this file as the structure evolves. The skill may add new entries automatically when new pages are scoped during a writing session.

---

## Structure Map

<!-- 
Add the documentation structure below. Use the format shown.
Nest sections to reflect the actual navigation hierarchy.
-->

### Guides — Integration Guides

Source: `plytix-outline-canvas.md`, "📘 Guides → 🔗 Integration Guides".

| Page title | File path | Page type | Status |
|---|---|---|---|
| Syncing Your ERP with Plytix | `docs/integration-guides/syncing-your-erp-with-plytix.mdx` | How-to Guide | Written |
| Exporting Your Full Catalog | `docs/integration-guides/exporting-your-full-catalog.mdx` | How-to Guide | Written |
| Auditing Product Data Quality with Filters | `docs/integration-guides/auditing-product-data-quality-with-filters.mdx` | How-to Guide | Written |
| Building Channel-Specific Product Feeds | `docs/integration-guides/building-channel-specific-product-feeds.mdx` | How-to Guide | Written |
| Safely Removing Categories, Assets, or Relationships from a Product | `docs/integration-guides/safely-removing-categories-assets-or-relationships.mdx` | How-to Guide | Written |
| Reconstructing Parent/Variant Hierarchies | `docs/integration-guides/reconstructing-parent-variant-hierarchies.mdx` | How-to Guide | Written |
| Bulk Operations for Large Catalogs | `docs/integration-guides/bulk-operations-for-large-catalogs.mdx` | How-to Guide | Written |
| Getting Notified: Webhooks & Automations | `docs/integration-guides/getting-notified-webhooks-and-automations.mdx` | Concept | Written |

### [Section name]

| Page title | File path | Page type | Status |
|---|---|---|---|
| | | | |

---

## Naming Conventions

**URL structure:** [e.g. /docs/[section]/[page-name]]
**Folder structure:** [e.g. mirrors URL structure]

---

## Notes

<!-- Add any IA decisions, redirects, or structural constraints here -->

**Source: `materials/project-references/before-writing.md`, §3 ("Product Roadmap") — read before scoping the API documentation IA.**

- **Channels have no API endpoints at all.** Channels (Shopify, BigCommerce, feed exports) are configured and managed entirely in the Plytix UI. Do not plan an API reference or how-to page for creating/managing channels — there is nothing to document. Once Destinations ships, route any "assign a product to a channel via the API" need there instead (see `glossary.md`'s Channel/Destinations entries and `style-guide.md`'s worked example under "Don't say no").
- **v1/v2 endpoints remain required for write workflows.** Any workflow that creates, updates, or deletes products (ERP write-back, stock updates, price updates, status changes) currently must use v1/v2 — v3 doesn't yet have write parity. IA needs a v1/v2 write-workflow section living alongside the v3 sections, not just a single "migrate to v3" redirect page. Revisit this constraint once v3 write endpoints ship.
- **Several features are upcoming, not yet shippable pages.** Webhooks, the MCP Server, Destinations, and (tentatively) Workspaces are in progress at time of writing — see `glossary.md` for each term's `[PENDING]` status. Flag these as placeholders to revisit once confirmed live; don't build final IA structure or write pages for them yet.
- **An API entity-coverage reference is a required future addition.** Customers frequently spend support time looking for endpoints that don't exist (Channels, Smart Lists among them) because no page states plainly what is and isn't accessible via API. Once IA planning starts, this needs its own Reference-type page (see `page-types.md`) — don't let this fall through as "covered elsewhere."