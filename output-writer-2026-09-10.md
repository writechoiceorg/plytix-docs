# Writer session — 2026-09-10

Integration Guides section from `plytix-outline-canvas.md`.

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

## Flags left in the drafts (unresolved, by design — need Plytix/project-lead input)

- **Syncing Your ERP with Plytix**: v1/v2-vs-v3 write recommendation tension; `created[gt]` vs a true "modified since" field unconfirmed.
- **Exporting Your Full Catalog**: none beyond the note on some `_fields` values being silently dropped (informational, not blocking).
- **Auditing Product Data Quality with Filters**: `icontains` vs true "empty string" distinction unconfirmed; `CompletenessAttribute` creation is confirmed broken (live bug, not just a caveat).
- **Building Channel-Specific Product Feeds**: the Channels-vs-Destinations roadmap conflict (flagged prominently per the user's explicit instruction to write it anyway).
- **Safely Removing Categories, Assets, or Relationships from a Product**: the PATCH-based removal direction and `thumbnail_id` clearing are logical extensions of confirmed behavior, not separately re-verified; asset removal has no confirmed mechanism at all.
- **Reconstructing Parent/Variant Hierarchies**: `overwritten_attributes`' exact contents once a variant overwrites a value is unconfirmed.
- **Bulk Operations for Large Catalogs**: the v2 Bulk API section is sourced from customer feedback, not independently tested.
- **Getting Notified: Webhooks & Automations**: `ChannelWebhookInputDto`'s live behavior (does it register a working webhook) is unconfirmed; the "Webhooks project" is explicitly roadmap, not current.

## Also done this session

- Resolved `style-guide.md`'s pending Option A/B how-to step-format decision (picked B, deleted A).
- Resolved `ProjectConvention.md`'s pending file-extension/naming placeholder (`.mdx`, kebab-case).
- Added all 8 pages to `information-architecture.md`'s Structure Map.
- Live-verified `exists`/`!exists`/`in` filter operators (previously untested) — logged as quirk #53 in `config/api-testing.config.md`.
