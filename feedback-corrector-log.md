# Feedback corrector run log

Record of every `feedback-corrector` run: the feedback received, what our sources said, what changed on the page, and the reply sent to David. One section per page, newest run first. Open questions for Plytix live in [`feedback-flags.md`](feedback-flags.md).

**Last updated:** 2026-10-29

## Index

| Page | Runs | Last run |
|---|---|---|
| [Overview](#overview) | 1 | 2026-10-13 |
| [The Plytix data model](#the-plytix-data-model) | 1 | 2026-10-13 |
| [Authentication and base URLs](#authentication-and-base-urls) | 1 | 2026-10-14 |
| [Endpoint mapping](#endpoint-mapping) | 1 | 2026-10-14 |
| [Sync your ERP](#sync-your-erp) | 1 | 2026-10-14 |
| [Export your full catalog](#export-your-full-catalog) | 1 | 2026-10-14 |
| [Audit product data quality with filters](#audit-product-data-quality-with-filters) | 1 | 2026-10-14 |
| [Build a marketplace-specific product feed](#build-a-marketplace-specific-product-feed) | 1 | 2026-10-14 |
| [Safely remove categories, assets, or relationships](#safely-remove-categories-assets-or-relationships) | 1 | 2026-10-14 |
| [Reconstruct parent/variant hierarchies](#reconstruct-parentvariant-hierarchies) | 1 | 2026-10-14 |
| [Bulk operations for large catalogs (internal draft)](#bulk-operations-for-large-catalogs-internal-draft) | 1 | 2026-10-14 |
| [Connect an AI assistant to the Plytix docs](#connect-an-ai-assistant-to-the-plytix-docs) | 1 | 2026-10-14 |
| [Not migrated and new in V3](#not-migrated-and-new-in-v3) | 1 | 2026-10-14 |
| [Migrating to V3](#migrating-to-v3) | 1 | 2026-10-14 |
| [Plytix MCP](#plytix-mcp) | 1 | 2026-10-29 |

---

## Overview

**Page:** `fumadocs/content/docs/guides/overview.mdx` · **Page type:** Concept

### Run 2026-10-13

**Feedback from:** David, written review comment to Marcos ("Proposed changes" 1-2, "Suggested improvements" 3)
**Approved by the user:** all

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1a | Keep the Quickstart card's authentication wording general | Factual | Your path to integration, line 22 | Supported | Applied |
| F1b | Update the "next-page description" too | Factual | Not on this page (`guides/quickstart.mdx`, line 3) | Not applicable | Not changed |
| F2 | Make the V1/V2 and V3 scope explicit, link both references and the migration guide | Scope / structure | Your path to integration, lines 24-26 | Supported | Applied |
| F3 | Add The Plytix data model and an entry point to the integration guides | Scope | Your path to integration, lines 20-27 | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1a | Quickstart card now reads "Set up authentication and make your first authenticated request." | `materials/project-references/brief/Questions for the Plytix Dev Team.md` → AUTH-1: "for now we will keep using the same v1 auth until we develop v3 auth carefully" |
| F2 | Reference card retitled "V3 API reference"; new "API versions" section with a scope paragraph and cards for the V1/V2 API reference and Migrating to V3 | `fumadocs/content/docs/reference/meta.json`; `reference/index.mdx`; `guides/migrating-to-v3/index.mdx` |
| F3 | Added "The Plytix data model" and "Integration guides" (links to Sync your ERP) cards; the path is now a 2×2 grid | `fumadocs/content/docs/guides/meta.json`; `guides/data-model.mdx` |

#### Not changed

- **F1b:** the description is on `guides/quickstart.mdx`, whose whole body teaches the bearer-token flow. Handled in a separate Quickstart pass (FB-003).
- **Convention note:** David's "v1/v2" and "v3" were written as V1/V2 and V3 per `guideline.md`.

#### Flags

Added: FB-001, FB-002, FB-003 · Resolved: none (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `guides/quickstart.mdx`: generalize the description and authentication wording.
- `index.mdx` (home): "API Reference" card links only to V3; "Legacy API (v1/v2)" breaks the V1/V2 naming rule.
- Integration Guides has no index page; consider adding one as the entry point.
- The Overview now links to pages still marked "Draft, blocked on flags" (Migrating to V3, V1/V2 reference).

#### Reply to David

```text
Thanks, David. I've updated the Overview:

- 1. Quickstart authentication wording: the Quickstart card now reads "Set up authentication and make your first authenticated request," with no mention of bearer tokens or a specific flow.
- 2. API version navigation: the reference card is now "V3 API reference," and a new "API versions" section explains that the portal covers V1/V2 and V3, with cards for the V1/V2 API reference and the Migrating to V3 guide.
- 3. Integration learning path: "Your path to integration" now includes cards for The Plytix data model and the integration guides, alongside the Quickstart and the V3 reference.
- The Quickstart's own description (point 1) lives on the Quickstart page, so I'll update it in a separate pass together with that page's authentication steps.

Open questions:
- Could you share notes from the October 8 call, so we can reference the authentication decision directly?
- Until the new V3 authentication model ships, should the Quickstart and the V3 Authentication page keep documenting the current API key and password exchange for a bearer token? And when will details of the new model be available?
```

---

## The Plytix data model

**Page:** `fumadocs/content/docs/guides/data-model.mdx` · **Page type:** Concept

### Run 2026-10-13

**Feedback from:** David, written review ("Required corrections", "Points requiring confirmation", "Suggested improvements")
**Approved by the user:** all (F3 excluded: the live finding contradicts it)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Four `product_level` values don't mean four nested levels | Factual | Product Families and variants, line 79 | Supported | Applied |
| F2 | `/product-family-models` and `*_attribute_labels` aren't in the OpenAPI; use `family_attributes` | Factual | Product Families and variants, line 92 | Supported | Applied |
| F3 | `_fields` works on `GET /products/{identifier}` | Factual | How related data comes back, line 148 | Contradicted by live finding (possibly stale) | Not changed |
| F4 | Make the product fields summary more precise | Factual / wording | Summary line 15; Products line 38 | Supported | Applied |
| F5 | Add a `_fields` example, arrays vs. objects, filters don't narrow expansion | Scope | How related data comes back, line 142 | Supported | Applied |
| F6 | Recheck "only the thumbnail can be assigned" | Factual | Summary line 18; Assets line 112 | Supported by spec, unconfirmed live | Applied |
| F7 | Say paths and conventions refer to V3 | Scope | Intro, line 10 | Supported | Applied |
| F8 | Separate configuring Formula/Completeness from writing their values | Factual / wording | Product Attributes, line 68 | Supported | Applied |
| F9 | Update the Quickstart description, as in the Overview feedback | Scope | Not on this page | Not applicable | Not changed |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | "A product's `product_level` field holds one of four values. `0` marks a standalone product outside any hierarchy, and `1` to `3` mark the three levels a hierarchy can have: parent, variant, and sub-variant." Enum table kept. | `openapi_pimv3_20261002 (Latest spec).json` → `ProductLevel`: "SINGLE (0): Individual product … SUB_VARIANT (3)" |
| F2 | Replaced the `/product-family-models` paragraph with family attributes (`attribute` plus `level` of `parent_level`, `variant_level`, or `no_level`), read through `GET /api/v3/product-families/{product_family_id}/attributes` or `_fields=family_attributes.*` | Spec → `ProductFamilyOutputDto.family_attributes`, `FamilyAttributeOutputDto.level` |
| F4 | Summary bullet: custom values in `attributes`; system fields, relationship fields, timestamps, and foreign keys at the top level. Products paragraph lists each group. | Spec → `ProductOutputDto`; October 8 PDF: "`_id` fields are exposed as they are foreign keys" |
| F5 | New paragraphs: to-many relations return arrays, to-one return objects; expansion isn't narrowed by filters; `http` example with `categories.name[intersects]=Backpacks&_fields=sku&_fields=categories&_fields=assets` | `_API V3 - 08_10_2026.pdf` → "to-many relations (`assets`) are returned as a list. to-one relations (`thumbnail`, `parent`) are returned as a single object"; status map: "regardless of filters in the call" |
| F6 | Summary and Assets section now separate uploading (`POST /api/v3/assets`), the thumbnail (`thumbnail_id`), and media/media gallery attributes; no dedicated link/unlink endpoint | Spec → `ProductUpdateInputDto`: "Assets are managed through media attributes."; `config/api-testing.config.md` → quirk #96 |
| F7 | Intro: "Paths, fields, and response conventions on this page refer to the V3 API." | Spec paths |
| F8 | Lead-in: "Two of those types hold values that Plytix calculates rather than values you set. You configure them on the attribute itself through `/api/v3/product-attributes` (the completeness rule or the formula), and Plytix calculates the result on each product:" | Spec → `FormulaAttributeCreateInputDto`, `CompletenessAttributeCreateInputDto`; config #30 |

#### Not changed

- **F3:** live finding quirk #24 (reconfirmed 2026-09-22) says `_fields` is ignored on single-resource `GET`; the 2026-10-02 spec and October 8 PDF say it's supported. Waiting on an `endpoint-tester` retest (FB-004).
- **F9:** belongs on `guides/quickstart.mdx`; added to FB-003.

#### Flags

Added: FB-004, FB-005, FB-006, FB-007 · Updated: FB-003 (F9 reference) · Resolved: none (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `.claude/skills/writer/references/glossary.md`, Variant entry (line 303): still says "up to four levels".
- `guides/reconstructing-parent-variant-hierarchies.mdx`: check for the four-levels wording and `product-family-models`.
- `reference/v3/productfamilymodels/`: generated from the superseded spec; remove or regenerate depending on FB-005.
- Run `endpoint-tester` on `GET /api/v3/products/{id}?_fields=sku` (FB-004) and on a product `PATCH` that sets a media attribute (FB-006).

#### Reply to David

```text
Thanks, David. I've updated The Plytix data model:

- Product hierarchy: the page now says product_level 0 is a standalone product and 1 to 3 are parent, variant, and sub-variant. The enum table is unchanged.
- Family structure endpoint: replaced /product-family-models with family attributes (each with its level and attribute), read through GET /api/v3/product-families/{product_family_id}/attributes or _fields=family_attributes.*.
- Product fields summary: custom attribute values are now described as living in attributes, with system fields, relationship fields, timestamps, and foreign keys at the top level.
- Related-entity expansion: added a short _fields example, explained that to-many relations return arrays and to-one relations return objects, and noted that filters don't narrow the expanded collection.
- 6. Asset assignment: the page now separates uploading an asset, setting the thumbnail through thumbnail_id, and connecting other assets through media and media gallery attributes.
- V3 scope: the intro now says the paths and response conventions refer to the V3 API.
- Formula and Completeness: the page now separates configuring these attributes from the values Plytix calculates.
- Field selection on individual products: not changed yet. Our earlier tests found _fields ignored on GET /products/{id}, but they predate the new spec, so we'll retest before updating the page.
- Quickstart description: I'll handle it in the same Quickstart pass as your Overview feedback.

Open questions:
- Has /api/v3/product-family-models been retired, or is it only missing from the spec?
- What value does a media or media gallery attribute accept in a product PATCH (an asset ID, a list of IDs, or an object)? And do assets set that way show up in the product's assets field?
- If a product PATCH includes a value for a formula or completeness attribute, is it rejected, ignored, or stored?
- If our retest shows _fields is still ignored on single-product requests, should that be fixed in the API or dropped from the spec?
```

---

## Authentication and base URLs

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/authentication-and-base-urls.mdx` · **Page type:** Reference

### Run 2026-10-14

**Feedback from:** David, written review ("Required changes" 1-5)
**Approved by the user:** all

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1a | Remove the shared-auth claim from the intro | Factual | Intro, line 8 | Supported | Applied |
| F1b | Remove the "Same" entries in the comparison table | Factual | Base URLs and paths, lines 16-18, 21 | Supported | Applied |
| F1c | Remove "credentials, roles, refresh logic carry over" | Factual | Lines 24, 28 | Supported | Applied |
| F2a | Complete V1/V2 section with base URL, prefixes, token endpoint, credentials, header | Scope | Lines 12-18 | Supported | Applied |
| F2b | Explain API credentials vs. bearer token | Scope | Not on page | Supported | Applied |
| F3 | Provisional V3 note with a placeholder link | Scope | Not on page | Supported | Applied |
| F4a | Point "Authentication" links to `/docs/reference/legacy/token-authentication` | Factual | Line 28, card line 38 | Supported | Applied |
| F4b | Don't send readers to the Quickstart for V1/V2 auth | Scope | Line 28 | Supported | Applied |
| F5a | Remove shared-flow wording from related-resource descriptions | Tone / wording | Lines 3, 32, 39 | Supported | Applied |
| F5b | Same wording elsewhere in the migration section | Scope | `index.mdx` | Not applicable | Follow-up |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1a | Intro rewritten: "V1/V2 share one authentication flow, and V3 is moving to a new token-based model whose details aren't published yet." | `Questions for the Plytix Dev Team.md` → AUTH-1: "we will implement a token generation with different access level" |
| F1b | Comparison table split into a V1/V2 section and a V3 section; "Same" rows removed; hidden FLAG comment now covers only the unconfirmed production V3 base URL | `config/api-testing.config.md` → quirk #103 |
| F1c | Deleted "Credentials, their roles, and token-refresh logic carry over unchanged…" and the "Token flow" section | AUTH-1 |
| F2a | New `## V1/V2 base URL and authentication` with a five-row table (base URL, path prefixes, token endpoint, credentials, header) | `openapi_pimv1.json` → `servers`, `components.securitySchemes.bearerAuth`, `/auth/api/get-token`; config → auth confirmed live on `/api/v1` |
| F2b | New `### API credentials and bearer tokens` with a comparison table and the 15-minute expiry and `401` behavior | V1 Postman collection → get-token description; config → token lifetime (JWT `exp − iat = 900s`) |
| F3 | New `## V3 base URL and authentication` with the V3 base URL and prefix, and an info callout: "V3 is moving to a new token-based authentication model, and its details aren't published yet." Placeholder link: `/docs/reference/v3/authentication` | AUTH-1 |
| F4a | Inline link and card now point to `/docs/reference/legacy/token-authentication` | `fumadocs/content/docs/reference/legacy/token-authentication.mdx` |
| F4b | Quickstart link removed | FB-003 |
| F5a | New description: "Reference for the V1/V2 base URL, token request, and bearer header, plus the V3 base URL while its new authentication model is pending."; lead-in "Now that you know how V1/V2 requests authenticate…"; card text "Request a V1/V2 bearer token, and see how long it lasts and the errors it can return." | `style-guide.md` → SEO and metadata, "Related articles" section |

#### Not changed

- **F5b:** belongs on `guides/migrating-to-v3/index.mdx` (lines 10, 52, 55-57, 229).

#### Flags

Added: none · Resolved: none · Updated: FB-002 (F1-F3 added) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/index.mdx`: remove the shared-flow wording at lines 10, 52, 55-57, and 229 (F5b).
- `fumadocs/content/docs/reference/legacy/token-authentication.mdx`: remove "The flow is the same one V3 uses…" (line 9) and reconsider the Quickstart card.
- `fumadocs/content/docs/reference/v3/authentication.mdx`: replace with a pending notice or rewrite once the V3 model is published (FB-002).

#### Reply to David

```text
Thanks, David. I've updated the Authentication and base URLs page in the migration guide:

- 1. Removed the shared-authentication claims: the intro, the "Same" rows in the table, and the lines about credentials, roles, and refresh logic carrying over to V3.
- 2. Added a complete V1/V2 section with the base URL, both path prefixes, the token endpoint, the api_key and api_password credentials, and the bearer header. A new table explains how the API credentials differ from the bearer token.
- 3. Added a short V3 section with the base URL and a note that V3 is moving to a new token-based model. It links to /docs/reference/v3/authentication as a placeholder.
- 4. The Authentication link and card now point to /docs/reference/legacy/token-authentication, and the Quickstart link is gone.
- 5. Updated the page description and the related-resource card. The same shared-flow wording also appears on the Migrating to V3 overview page and the legacy Authentication page. I'll update those in a separate pass.

Open questions:
- In our tests, V3 still accepts the V1/V2 token today. Until the new model ships, should the docs tell V3 integrators to use it, or leave V3 authentication fully pending?
- Where will the V3 authentication details be published, so we can replace the placeholder link?
```

---

## Endpoint mapping

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/endpoint-mapping.mdx` · **Page type:** Reference

### Run 2026-10-14

**Feedback from:** David, written review ("Required corrections" 1-6, "Other points to confirm" 7-8)
**Approved by the user:** all

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1a | Variant unlink must not map to product DELETE | Factual | Variants, line 39 | Supported (spec, not live) | Applied, flagged FB-022 |
| F1b | Distinguish create, link existing, unlink, delete | Scope | Variants, lines 33-40 | Supported | Applied |
| F2a | Keep relation reads scoped to one product | Factual | Products, lines 19, 22, 29 | Partly contradicted (single GET `_fields` ignored live) | Applied as filtered search; FB-004 |
| F2b | Explain response-shape difference | Scope | Line 29 | Supported | Applied, flagged FB-026 |
| F3 | Subcategory create needs `parent_id` (products and assets) | Factual | Categories, lines 112-124 | Supported | Applied |
| F4 | Family filter on `all_attributes`, check what's preserved | Factual | Product families, line 136 | Supported; system attributes unverifiable | Applied, flagged FB-025 |
| F5a | Recheck V1 `/unlink` method and `/product/` spelling | Factual | Product relationships, lines 53-54 | Contradicted (V1 sources disagree) | Not changed, flagged FB-023 |
| F5b | Related-product update payload and preservation | Factual | Line 53 | Payload supported; preservation unverifiable | Applied, flagged FB-024 |
| F5c | Remove one related product vs. delete the association | Factual | Lines 54-55 | Supported | Applied |
| F6a | Remove blanket `product_id`/`account_id` filter rule | Factual | Callout, lines 61-63 | Supported | Applied |
| F6b | Check account-wide endpoints against public scope | Question | Lines 58-59, 136 | Already aligned | No change |
| F7 | "No dedicated endpoint" vs. "unavailable" for assets | Terminology | Lines 20-21, 155-156 | Supported | Applied; FB-006 |
| F8a | Label V1 vs. V2 rows | Structure | Table headers | Supported | Applied |
| F8b | "No dedicated equivalent endpoint" wording | Terminology | Intro, rows | Preference | Applied as "No dedicated endpoint" |
| F8c | "Attribute from group: Not available" | Factual | Line 154 | Supported | Applied |
| F8d | Notes column | Structure | All tables | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1a | V1 variant unlink now maps to `PATCH /api/v3/products/{variant_id}` with `{"parent_id": null}`: "Unlinks the variant, which becomes a standalone product. This doesn't delete it." Hidden FLAG added. | `openapi_pimv3_20261002 (Latest spec).json` → `ProductUpdateInputDto.parent_id`; `openapi_pimv1.json` → `DELETE .../variant/{variant_id}` |
| F1b | Variants intro separates unlinking from deleting. New row: `POST /api/v1/products/{product_id}/variant/{variant_id}` → `PATCH /api/v3/products/{variant_id}` with `parent_id`. Create row notes family inheritance and the `422` on a different family. | `openapi_pimv1.json`; config quirks #82, #98 |
| F2a | Asset and category reads now use `GET /api/v3/products?sku=<sku>&_fields=assets` (and `categories`), with a scope note. Hidden FLAG added. | config quirks #24, #80 |
| F2b | Paragraph contrasting the filtered search (product with the relation expanded) with the per-relation subpaths (the relation alone), noting the subpaths returned empty arrays in testing | config quirks #16, #80, #91 |
| F3 | Product subcategory row: "Send the V1 path's `category_id` as `parent_id`…"; new `POST /api/v1/categories/file/{category_id}` → `POST /api/v3/asset-categories` row; `[PENDING]` marker and the old FLAG removed | `ProductCategoryCreateInputDto`, `AssetCategoryCreateInputDto`; `bruno-collection/03-Product-Categories/Create Product Category.bru` |
| F4 | `all_attributes` → `GET /api/v3/family-attributes?product_family_id=<product_family_id>`, with notes on scope, `level`, `_fields=attribute`, and system attributes | `FamilyAttributeOutputDto`; config quirk #74 |
| F5b | Relationship rows split into V1 and V2, with V3 payloads. Assign row now uses the live-tested `POST /api/v3/products/{product_id}/relationships`. Caveat added: send every related product you want to keep. | `bruno-collection/17-Product-Relationships/` |
| F5c | V1 `/unlink` and V2 `DELETE` → "No dedicated endpoint"; new V3 `DELETE` row: "Removes the whole association…" | `openapi_pimv1.json` request bodies; `Manage Product Relationship Link.bru` |
| F6a | Callout is now `info`, titled "Narrow the account-wide association endpoints", and recommends `product_id` / `product_family_id` | config quirk #112 |
| F7 | Asset rows: "No dedicated endpoint", noting media and media gallery attributes and `thumbnail_id`, with "keep this call on V1 for now" | `ProductUpdateInputDto` description; config quirk #107 |
| F8a | Column headers changed to V1; sentences under Products and Variants say which rows have V2 counterparts; relationship rows name their version | `openapi_pimv1.json` paths |
| F8b | Intro defines "No V3 equivalent" vs. "No dedicated endpoint" | `style-guide.md` |
| F8c | Linking table: V1 adds or removes group members through `attribute_labels` on `PATCH /api/v1/attribute-groups/product/{attribute_group_id}` | `openapi_pimv1.json` → `PATCH /api/v1/attribute-groups/product/{attribute_group_id}` |
| F8d | Notes column on every resource table: search body to query parameters, `data` as an object on single GET, `{"id": ...}` link body, `name`-only PATCH on relationships and groups, `label` not patchable, no `attribute_labels` on group create, `url`/`content` and `filename`/`alt_text` on assets | config quirks #60, #66, #91, #104, #105, #108 |

#### Not changed

- **F5a:** the V1 Postman request definitions match the page; only the collection's overview table differs. Waiting on Plytix (FB-023).
- **F6b:** already aligned. All three endpoints are Public in `endpoint-reviews/Plytix API v3 - endpoint review (2026-09-25).xlsx`.

#### Flags

Added: FB-022, FB-023, FB-024, FB-025, FB-026 · Resolved: none · Updated: FB-004, FB-006, FB-008 (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `guides/migrating-to-v3/index.mdx`: lines 33, 34, 41, 218.
- `guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx`: lines 17, 34, 40.
- `.claude/skills/writer/references/information-architecture.md`: line 133 (variant endpoints).
- V1 `POST /api/v1/product_families/{product_family_id}/all_attributes/edit` has no row.
- `endpoint-tester` runs listed in `feedback-flags.md` under Endpoint mapping.

#### Reply to David

```text
Thanks, David. I've updated the Endpoint mapping page:

- 1. The V1 variant unlink now maps to PATCH /api/v3/products/{variant_id} with {"parent_id": null}, not to a product DELETE. The Variants section now separates creating a variant, linking an existing product (that row was missing), unlinking, and deleting.
- 2. The asset and category reads now use a product search filtered by SKU (GET /api/v3/products?sku=<sku>&_fields=assets), and a new paragraph explains how that response differs from the relation subpaths. I didn't use GET /api/v3/products/{identifier}?_fields=..., because _fields is ignored on the single-product GET in our tests.
- 3. The product subcategory row now shows the V1 category_id sent as parent_id, and I added the matching asset subcategory row.
- 4. all_attributes now maps to GET /api/v3/family-attributes?product_family_id=<id>, with notes on scope, level, and expanding the attribute definition.
- 5. Relationship rows are split by version, each with its payload. V1 unlink and V2 DELETE, which remove only the listed products, now say "No dedicated endpoint", and V3's DELETE has its own row as a whole-association removal. I haven't changed the /unlink method or the /product/ path yet: the Postman request definitions match the table, but the collection's overview table doesn't (question below).
- 6. The callout no longer asks for account_id or a filter on every call. It now suggests product_id or product_family_id to narrow results. All three endpoints are marked Public in the endpoint review, so they stay on the page.
- 7. Asset assignment rows now say "No dedicated endpoint", mention media and media gallery attributes, and still suggest V1 until that workflow is confirmed.
- 8. Product and variant sections now say which rows also exist on V2, the intro defines "No V3 equivalent" and "No dedicated endpoint", "Attribute from group" now shows the V1 attribute_labels PATCH, and every resource table has a Notes column.

Open questions:
- When a variant is detached with "parent_id": null, what happens to the attribute values it inherited from the parent?
- Does the V1 /unlink endpoint take POST or PATCH, and is the related-product path /product/{id} or /products/{id}? Which document should we treat as the definitive V1 reference?
- Does a V3 relationship PATCH merge related_products or replace the list, and how should a client remove one related product while keeping the others?
- Does family-attributes include system attributes, as V1 all_attributes does?
- Are the /products/{id}/assets and /products/{id}/categories subpaths meant to return linked records? They came back empty in our tests.
- Could you share the October 13 OpenAPI? Our checks used the October 2 spec.
```

---

## Sync your ERP

**Page:** `fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review ("Required changes" 1-6, "Recommended additions" 7-8, plus notes on deletions, bracket encoding, and import vs. incremental)
**Approved by the user:** all

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | No key/password exchange or 15-minute lifetime as the V3 flow | Factual | Prerequisites; step 1 | Supported | Applied; FB-002 |
| F2 | Explicit checkpoint strategy | Scope | Step 4, line 56 | Supported; filter details unverifiable | Applied, flagged FB-027 |
| F3 | Complete the Plytix-to-ERP flow | Scope | Step 4 | Supported | Applied |
| F4 | Request relations explicitly with `_fields` | Factual | Step 3, line 44 | Supported (single GET ignores `_fields`) | Applied on search; FB-004 |
| F5a | Evidence for partial-map deletion | Factual | Callout, accordion | Supported (live) | Applied (links to the before/after example) |
| F5b | Verify the single-attribute PATCH | Factual | Step 5 | Unverifiable for a number body | Applied with hidden FLAG; FB-020 |
| F5c | Concurrency risk of read-merge-write | Factual | Callout, accordion | Supported | Applied |
| F6a | `id` optional, consistently | Structure | Lines 16, 35 | Supported | Applied |
| F6b | URL-encoded SKU addressing | Factual | Lines 35, 123 | Supported (live) | Applied |
| F6c | Keep create-object vs. search-array | Factual | Line 94 | Already aligned | No change |
| F6d | Don't guarantee unset fields are omitted | Factual | Line 92 | Supported | Applied |
| F6e | `204` confirms; read-back optional | Factual | Line 79, step 7 | Supported | Applied |
| F7a-c | Ownership, attribute existence and types, compare before write | Scope | Not on page | Supported | Applied |
| F8a-c | Rate limits, transient failures, partial runs, retries, `409` reconcile | Scope | Accordion line 120 | Supported; `429` unverifiable | Applied, flagged FB-028 |
| F8d | Archives and deletions | Scope | Not on page | Supported | Applied; FB-027 |
| F9 | Bracket encoding | Factual | curl examples | Already aligned | No change |
| F10 | Initial import vs. incremental | Structure | Procedure | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | Step 1 of "Run the initial import": "How you get a token depends on the API version." V1/V2 links to the legacy Authentication page; V3 is pending and links to Authentication and base URLs. The prerequisite no longer names the exchange. | FB-002; `guides/migrating-to-v3/authentication-and-base-urls.mdx` |
| F2 | "Pull changes from Plytix": UTC run boundary, window `modified[gte]=<checkpoint minus overlap>` to `modified[lt]=<boundary>`, dedupe by `id`, and "Only after every page and every product in the window succeeds, save this run's boundary as the new checkpoint." Hidden FLAG updated. | `ProductOutputDto.modified`; `searching-and-pagination.mdx` line 42 |
| F3 | Pull query selects `id`, `sku`, `status`, `attributes`, `modified`; step 4 applies the Plytix-owned fields that differ | `exporting-your-full-catalog.mdx` (`_fields=attributes` live) |
| F4 | Import step 3: "Relations such as `categories` and `product_relationships` are returned only when you name them"; the single-GET read step is removed | Spec `ProductOutputDto.categories` / `product_relationships`; `Get Product by ID.bru` |
| F5a, F5c | Callout links to `responses-and-updates#how-patch-treats-the-attributes-map` and adds: "V3 has no conditional write, so a change another user makes between your read and your write is overwritten." | Quirk #85; `responses-and-updates.mdx` line 131 |
| F5b | Hidden FLAG: number body untested on the attribute path | Quirk #87; FB-020 |
| F6a, F6b | `id` optional in prerequisites, import step 4, and the 404 accordion; "V3 accepts it as `{identifier}` in a path, URL-encoded" | Quirk #86 |
| F6d | "Don't rely on fields you didn't set being absent from the response, because they can also come back as `null`." | `ProductCreateOutputDto` (nullable fields) |
| F6e | "A `204` means the update succeeded. Read the product back only when your integration needs the resulting values." Old step 7 removed. | Quirk #56 context |
| F7a-c | New section "Decide who owns each field" (ownership table, loop explanation); prerequisite for `price` (decimal) and `stock` (integer); push step 1 "Compare before you write"; new accordion "The same products come back on every run" | Design guidance; spec attribute types |
| F8a-c | New section "Recover from failed runs" (rate limits, transient failures, retried writes, partial runs, expired tokens); create step and `409` accordion now reconcile by SKU | Quirks #33, #102 |
| F8d | New section "Propagate archives and deletions": archived via the pull, deleted via a nightly ID reconciliation, ERP removals as archive or delete | `ProductStatus` enum; webhooks guide |
| F10 | Separate section "Run the initial import" that seeds the first checkpoint | `style-guide.md` → "Split when a guide covers more than one task" |

#### Not changed

- **F6c:** already aligned.
- **F9:** already aligned. The examples use `curl -G --data-urlencode`, which encodes brackets as `filtering-query-syntax.mdx` recommends.

#### Flags

Added: FB-027, FB-028 · Resolved: none · Updated: FB-002, FB-004, FB-008, FB-020 (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `guides/bulk-operations-for-large-catalogs.mdx` line 67: "treat that response as success" on a `409`.
- `.claude/skills/writer/references/style-guide.md`: access-token rule still cites the 15-minute expiry.
- `guides/quickstart.mdx`, `reference/v3/authentication.mdx`: V3 auth wording (FB-002, FB-003).

#### Reply to David

```text
Thanks, David. I've updated the Sync your ERP guide:

- 1. The token step now says it depends on the API version: V1/V2 links to the legacy Authentication page, and V3 says the new token-based model is still pending. The key/password exchange and 15-minute lifetime are no longer presented as the V3 flow.
- 2. The incremental run now records a UTC run boundary, reads modified[gte] (checkpoint minus an overlap) to modified[lt] (the boundary), dedupes by ID, and saves the boundary as the new checkpoint only after every page and product succeeds.
- 3. The incremental query now selects the fields you apply (status, attributes, modified), and a step applies the changed Plytix-owned fields in the ERP.
- 4. Categories and product relationships are now described as returned only when requested with _fields. I put them on the search request, because in our tests _fields is ignored on the single-product GET.
- 5. The partial attributes map warning now links to the before/after example on the Responses and updates page, and explains the concurrent-update risk of read-merge-write. The single-attribute PATCH is confirmed with a text value; a number value is still untested, so I've left a note for us to retest.
- 6. The Plytix ID is now optional everywhere, with URL-encoded SKU addressing as the alternative. The create response no longer promises unset fields are omitted, and a 204 is treated as success, with read-back only when the values are needed.
- 7. A new section assigns an owner and direction to each field, the prerequisites call out price and stock as example attributes that must exist with decimal and integer types, and every write is compared first so the integration's own updates don't loop.
- 8. A new section covers rate limits, transient failures, partial runs, and safe retries. A 409 on create is now reconciled by looking up the SKU rather than repeating the POST. Another new section covers archives and deletions, using a nightly ID reconciliation to catch deleted products.
- Bracket encoding already matched the filtering reference (the examples use --data-urlencode), and the guide now separates the initial import from the scheduled runs.

Open questions:
- Can a search combine modified[gte] and modified[lt], and which timestamp formats does a filter value accept?
- Does modified change after a single-attribute PATCH, and when a product is archived?
- Is there any way to list products deleted since a given time?
- Are the token's rate limits enforced on production V3, and what does a 429 response look like?
- Could you share the October 13 OpenAPI? Our checks used the October 2 spec.
```

---

## Export your full catalog

**Page:** `fumadocs/content/docs/guides/exporting-your-full-catalog.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review ("Required changes": ordering and catalog changes, pagination termination, HTTPS guidance, field selection and discovery, asset metadata versus file backup, marketplace guide links; "Suggested improvement": export loop, page size, full-catalog scope), using the October 13 OpenAPI
**Approved by the user:** all (F1-F7, F9-F16; F8 not proposed, X1 not approved)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Add `_sort_by=id` and include `id` in the fields | Factual | Export the catalog page by page, step 1 | Supported | Applied |
| F2 | Explain that page-based traversal can skip or repeat records | Factual | Step 2 | Supported | Applied |
| F3 | Add keyset paging as a separate strategy, not a snapshot | Factual / Scope | New section | Supported | Applied |
| F4 | Continue only while `next_page` holds a usable URL | Factual | Step 2 | Supported | Applied |
| F5 | Make the sample next-page URL keep all parameters, or mark it as shortened | Factual | Step 2 | Supported | Applied |
| F6 | Describe `http` links as an issue to resolve, not an API convention | Factual | Step 2 callout | Supported | Applied |
| F7 | Remove `--location-trusted` and auth-header forwarding | Factual | Step 2 callout | Supported | Applied |
| F8 | Remove "`_fields` is ignored on single-product GETs" | Factual | Troubleshooting, third accordion | Contradicted | Not changed |
| F9 | A single response isn't an inventory; use the schemas and attribute definitions | Factual | Troubleshooting, first accordion | Supported | Applied |
| F10 | Tell unset values apart from invalid field requests | Factual | Troubleshooting, first accordion | Supported | Applied |
| F11 | Expanded assets are metadata, not files | Factual | Intro, description, step 3 | Supported | Applied |
| F12 | `path` isn't a confirmed download URL; the export isn't a full backup | Factual | Intro, step 3 | Supported (`path` usage unverifiable) | Applied |
| F13 | Update or remove the marketplace guide links | Scope | Step 4, Related articles | Supported | Applied |
| F14 | Add an export-loop example | Scope | New section | Supported | Applied |
| F15 | Explain the page-size tradeoff | Scope | Step 1 | Supported | Applied |
| F16 | Define what "full catalog" means | Scope | Intro | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | Step 1 and step 4 requests add `_fields=id` and `_sort_by=id`; new paragraph: "Always set `_sort_by`. V3 has no default sort order…" | `API V3 - status map (08_10_2026).md` → "there is no default sort"; spec `GET /api/v3/products` → `_sort_by` |
| F2 | Step 2 adds "Page numbers don't freeze the catalog… One product can then be skipped or repeated at a page boundary." with a link to keyset paging | `_API V3 - 08_10_2026.pdf`, p. 10 → "the records after it shift by one position. That can skip or repeat one record at a page boundary" |
| F3 | New H2 "Export by ID instead of page number": three steps (`_page=1`, `_sort_by=id`, `id[gt]=<last_id>`, don't follow `next_page`) and a closing note that it isn't a snapshot | `_API V3 - 08_10_2026.pdf`, p. 10 → "use keyset paging on `id`: keep `_page=1`, sort by `id`, and pass the last id received as `id[gt]`" |
| F4 | "Continue while `next_page` holds a URL you can request, and stop when it's missing, `null`, or empty." | Spec → `Pagination.next_page` `string \| null`; `config/api-testing.config.md` → quirk #91 |
| F5 | Sample link now `…?_fields=id&_fields=sku&...&_sort_by=id&_page_size=100&_page=2`, introduced as "The link above is shortened." | `config/api-testing.config.md` → quirk #8 (link carries params forward) |
| F6 | Callout retitled "Rewrite http links to https before you request them"; adds "This is a link-generation issue to be fixed, not a convention of the API" and "use it unchanged when it already starts with `https://`" | `config/api-testing.config.md` → quirks #92, #115 |
| F7 | Removed `curl --location-trusted`; adds "Don't work around it by letting your client forward the `Authorization` header across every redirect…" | David's feedback; no source requires the workaround |
| F9, F10 | First accordion retitled "A field you asked for with `_fields` is missing from the response"; separates a misspelled name (missing on every product, sometimes `400`, sometimes silent) from an unset value (missing on some products, absent from `attributes` or `null`); links the Get a product schema and `GET /api/v3/product-attributes` | `config/api-testing.config.md` → quirks #12, #13, #100; spec → `ProductOutputDto` |
| F11, F12 | Description and intro now say "asset metadata"; step 3 renamed "Read categories and asset metadata directly from each product.", sample shows `filename`, `file_size`, `path: "public_files/pim/assets/..."`; adds "`path` is where Plytix stores the file, not a download URL…" | Spec → `AssetOutputDto.path`; `bruno-collection/02-Products-v3/List Products.bru` |
| F13 | Step 4 now links Filtering and query syntax; the Related articles card is now "Sync your ERP" (`RefreshCw`) | `endpoint-reviews/Plytix API v3 - endpoint visibility.xlsx` → `/api/v3/channels`: Internal |
| F14 | New H2 "Keep a long export resumable": `export_catalog.py` (append to `products.jsonl`, next-URL checkpoint, five bounded retries on timeouts/`429`/`5xx`, 0.5 s pacing) plus a four-bullet explanation | `fumadocs/content/docs/reference/v3/rate-limits.mdx` (20 per 10 seconds); quirks #91, #92 |
| F15 | Step 1: "A bigger page means fewer requests, but each response is larger… The examples use 100; adjust from there." | Spec → `_page_size` maximum 1000, default 25 |
| F16 | Intro: "Here, full catalog means every product your request selects, with the fields you name. It doesn't include other Plytix resources… or the asset files themselves…" | David's feedback |

#### Not changed

- **F8:** contradicted by our live test (`config/api-testing.config.md` → quirk #24, last confirmed 2026-09-22: "`_fields` is ignored on single-resource `GET /{resource}/{id}`"). Kept until the retest, matching the Data model page (FB-004).
- **X1 (not from David):** the intro and prerequisites still present the V3 bearer token and 15-minute expiry as settled (FB-002). Offered, not approved.

#### Flags

Added: FB-029, FB-030 · Resolved: FB-011 · Updated: FB-004 (F8), FB-008 (October 13 OpenAPI), FB-012 (F6), FB-028 (F14) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `guides/building-marketplace-specific-product-feeds.mdx`, the Channels and PIM product lists reference pages, and `information-architecture.md` line 129: rewrite or remove, since the visibility sheet marks Channels Internal.
- `guides/migrating-to-v3/searching-and-pagination.mdx` (line 42): can now cite keyset paging.
- `guides/syncing-your-erp-with-plytix.mdx` (line 56) and `reference/v3/pagination.mdx` (line 14): align the `next_page` stop condition.
- Run `endpoint-tester` on `_sort_by=id` with `id[gt]` (FB-029) and on `GET /products/{id}?_fields=sku` (FB-004).

#### Reply to David

```text
Thanks, David. I've updated Export your full catalog:

- Ordering and catalog changes: the requests now sort by id and include id in the fields. The page explains that page numbers can skip or repeat a product when the catalog changes mid-export, and a new section covers keyset paging (_page=1, _sort_by=id, id[gt]=<last_id>), noting that it keeps the traversal stable but isn't a snapshot.
- Pagination termination: the loop continues only while next_page holds a usable URL, which covers both a missing key and null. The sample next-page URL now keeps the fields, sort, and page size, and is marked as shortened.
- HTTPS: the warning describes http links as an issue to be fixed, tells readers to rewrite them to https and use https links as they are, and no longer suggests --location-trusted or forwarding the Authorization header.
- Field selection and discovery: the troubleshooting entry now points to the product schema and the attribute definitions, and separates a misspelled field from a product that has no value for it. I haven't removed the entry about _fields on single-product GETs yet: our last live test found it ignored there, so we'll retest before changing it.
- Asset metadata: the page now says the export covers product data and asset metadata, that path isn't a download URL, and that the export alone isn't a restorable backup. It keeps the point that expansion saves a lookup per asset.
- Marketplace links: both links to the marketplace feed guide are gone, replaced by Filtering and query syntax and Sync your ERP.
- Suggested improvement: added a short Python export loop with incremental saving, checkpointing, bounded retries, and rate-limit pacing, plus the page-size tradeoff and a definition of "full catalog".

Open questions:
- Is id[gt] supported on every searchable resource, and do IDs always sort in creation order? We haven't tested _sort_by=id or id[gt] yet.
- What's the supported way to download an asset's file through the API? Can path be turned into a URL, and will the url field we've seen on asset responses be added to the spec?
- Could you share the October 13 OpenAPI? Our checks used the October 2 spec.
```

---

## Audit product data quality with filters

**Page:** `fumadocs/content/docs/guides/auditing-product-data-quality-with-filters.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review (seven numbered points plus a closing note on actionable, catalog-specific audits)
**Approved by the user:** all (X1, the V3 authentication prerequisite, not approved)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1a | Separate missing, null, and empty values | Factual | Find incomplete products, steps 1-3 | Supported | Applied |
| F1b | `exists` doesn't show useful content | Factual | Step 2 | Supported | Applied |
| F1c | Don't claim `[length]=0` matches missing fields | Factual | Step 3 | Supported | Applied |
| F1d | Show the OR combination for absent, null, and empty | Factual | Step 3 | Supported | Applied |
| F1e | Whitespace: a positive length isn't meaningful content | Factual | Step 3 | Supported | Applied |
| F2a | Define scope by family, product level, status, destination | Scope | Intro, Prerequisites, procedure | Supported | Applied |
| F2b | GTIN is a business rule, not a required API field | Factual | Step 1 | Supported | Applied |
| F3a | `main_image_link` is account-specific; absence doesn't prove no images | Factual | Steps 1, 2, 7 | Supported | Applied |
| F3b | Separate thumbnail, media attribute, and media gallery checks | Factual | Steps 1, 2 | Supported (filters untested) | Applied |
| F4a | Completeness is configurable; names are examples | Factual | Step 6 | Supported | Applied |
| F4b | Use attribute definitions, not one product | Factual | Step 6 | Supported | Applied |
| F4c | Confirm the score format and scale | Factual | Step 6 | Supported in part (observed live) | Applied |
| F4d | Use a below-threshold example and explain the boundary | Factual | Step 6 | Supported | Applied |
| F5a | Select ids, SKUs, and audited fields; process every page | Scope | Missing | Supported | Applied |
| F5b | Keep the failed rules per product; avoid double-counting | Scope | Missing | Supported | Applied |
| F6a | Encode brackets in parameter names | Factual | Every example | Supported | Applied |
| F6b | Confirm the unknown-operator `400` claim; cite the reference | Factual | Step 4 | Confirmed live; reworded | Applied |
| F7a | Remove marketplace and Channel/product-list references | Scope | Step 7, Related articles | Supported | Applied |
| F7b | Remove duplicate related-article entries | Scope | Step 7 link and second card | Supported | Applied |
| F8 | Don't imply presence or a score guarantees marketplace readiness | Tone / factual | Description, intro, step 6 | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F8, F2a | New description ("Learn how to find products that break your own catalog rules…"); intro now says "Passing an audit means products meet the rules you defined, not that a marketplace or channel will accept them."; new prerequisite on catalog rules | David's feedback |
| F2a, F2b | New step 1 "Write down the rules you're auditing." with a rule/scope table (`product_family_id`, `status`, `product_level`) and "GTIN is optional in the API: only `sku` is required when you create a product." | Spec → `ProductCreateDto.required: ["sku"]`; `ProductOutputDto.product_level`, `product_family_id` |
| F1a, F1c, F1d | New step 2 with one bullet per check (`[!exists]=true`, `[null]`, `[length]=0`) and an OR-group example on `gtin`; removed "This matches empty values and missing ones together" | `config/api-testing.config.md` → quirk #100; status map → "`field[null]`" |
| F1b, F1e | New step 3 "Treat whitespace as empty in your own code." | David's feedback |
| F3a, F3b | New step 4 with bullets for `thumbnail_id`, a media attribute, and a media gallery attribute; `main_image_link` described as an account-specific text field; step 7 example now uses `thumbnail_id` | Spec → `ProductOutputDto.thumbnail_id`, `MediaAttributeGetOutputDto`, `MediaGalleryAttributeGetOutputDto`; quirk #53 |
| F4a-d | Step 6 rewritten: per-account configuration, list attribute definitions (`GET /api/v3/product-attributes`, `"type": "CompletenessAttribute"`), "numbers between 0 and 100, such as `85.71`", `website_ready%5Blt%5D=90` with the boundary, `[lte]`, and missing-score notes; removed the single-product read | Spec → `CompletenessAttributeGetOutputDto.attributes`; `bruno-collection/06-Product-Attributes/` (`85.71`); quirk #30 |
| F5a, F5b | New step 8 "Collect every page and record the failed rules per product." with a merged-by-`id` JSON example | Spec → `Pagination`; quirk #91 |
| F6a | Every bracketed name encoded (`status%5Bin%5D=Draft`); explanation that `--data-urlencode` encodes only the value | Quirk #11 ("URL-encode the brackets"); `next_page` links (`name%5Bicontains%5D=a`) |
| F6b | "[Filtering and Query Syntax] lists the supported operators. If you send one Plytix doesn't recognize, the request returns `400` and the error lists the operators it accepts." | Quirk #99: "Any invalid operator returns the same enumerated list" |
| F7a, F7b | Removed the marketplace guide link from step 7 and its card; second card is now Filtering and Query Syntax (`Filter` icon) | `endpoint-reviews/Plytix API v3 - endpoint visibility.xlsx` → channels Internal, pim-product-lists "To be removed" |

#### Not changed

- **X1 (not from David):** the prerequisite still presents the V3 bearer token as settled (FB-002). Offered, not approved.

#### Flags

Added: FB-031, FB-032 · Resolved: none · Updated: FB-015 (F1) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `reference/v3/filtering-query-syntax.mdx` (line 39 and curl examples): bracketed names aren't encoded by `--data-urlencode`.
- `guides/exporting-your-full-catalog.mdx` (`id[gt]`) and `guides/syncing-your-erp-with-plytix.mdx` (`modified[gte]`, `modified[lt]`): same encoding fix.
- `guides/building-marketplace-specific-product-feeds.mdx`: rework or remove.
- Run `endpoint-tester` on the filters in FB-031 and on completeness values (FB-032).

#### Reply to David

```text
Thanks, David. I've updated Audit product data quality with filters:

1. Missing, null, and empty values: each now has its own check ([!exists], [null], [length]=0), with an OR example that catches all three. The page no longer says [length]=0 matches missing fields, and it explains that exists or a positive length doesn't mean useful content, so readers trim text values in their own code.
2. Scope and business rules: a new first step asks readers to write down their rules and scope them by family, product level, or status. GTIN is now presented as a business rule, since the API only requires sku.
3. Images: main_image_link is no longer used as the image check. The page separates checking the thumbnail, a required media attribute, and a media gallery, and says a missing value in one field doesn't prove a product has no images.
4. Completeness: described as configured per account, with website_ready as an example. Readers list the attribute definitions instead of reading one product. The example now uses [lt]=90 to find products below the threshold, explains what happens at exactly 90, and says a high score doesn't mean marketplace readiness.
5. Full audit result: a new step covers selecting id, sku, and the audited fields, following next_page while it holds a usable URL, and merging checks by id with the failed rules per product.
6. Request examples: bracketed parameter names are now encoded, for example status%5Bin%5D=Draft. The operator sentence points to the reference first. Our live tests confirm that an unrecognized operator returns 400 with the list of accepted operators, so that part stays.
7. Related links: the marketplace feed references and the Channel and product list description are gone, including the duplicate. The second card now links to Filtering and query syntax.

Open questions:
- Do product searches accept product_family_id=, product_level=, and thumbnail_id[!exists]? Does [length]=0 match an empty media gallery?
- Is [null] sent with no value, and can functions chain (for example [trim][length]=0) to catch text that's only whitespace?
- Does [!exists] also match an empty string or an empty list?
- Is a completeness score always a percentage from 0 to 100, and does a product outside a completeness attribute's scope have no score or 0?
- Is a product's attributes map keyed by the attribute's name or its label?
```

---

## Build a marketplace-specific product feed

**Page:** `fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review (the guide's core workflow depends on private Channels endpoints; three approaches proposed)
**Approved by the user:** option A, rewrite around an external feed (F1-F5)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Channels endpoints are private; creating, scheduling, and reading a channel is out of public scope | Factual / Scope | Intro; Create the feed and connect it, steps 2-4 | Supported | Applied |
| F2 | The dashboard note doesn't fix this, because channels are also created and configured in the interface | Factual | Build and publish the feed from the dashboard | Supported | Applied |
| F3 | Presence in the internal OpenAPI doesn't mean public availability | Factual | Whole page | Supported (our IA note and glossary are stale) | Applied |
| F4 | Choose: external feed, native channels via the interface, or exclude the guide | Structure | Whole page | User chose option A | Applied |
| F5 | Update related links and descriptions that advertise channel management through the API | Scope | Description, intro, Related articles | Supported | Applied on this page; other pages listed as follow-ups |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1, F2, F4 | Page rewritten around an external feed. Removed the product list, channel create, schedule, and read-back steps, the `409`/`502` notes, and the dashboard section. New procedure "Generate the feed from product data": map fields, request the scoped products from `GET /api/v3/products`, read every page (links to the Export guide's script), transform with `build_feed.py` (skips and records products missing required fields), deliver and refresh on your schedule | `endpoint-reviews/Plytix API v3 - endpoint visibility.xlsx` (channels Internal, pim-product-lists To be removed, products Public); `before-writing.md` line 37 (use case 6, "Channel-specific export") and line 135 ("Channels are not in the API") |
| F3, F5 | New description ("Learn how to read a filtered product set from the V3 API and turn it into a marketplace feed file that your own integration builds and delivers."); intro states "this guide doesn't create or configure a Plytix channel" and links the Help Center's Creating a channel and Managing channels articles; Related articles now Export your full catalog and Audit product data quality with filters | `materials/help-center/creating-a-channel.md`, `managing-channels.md` (source URLs) |
| F4 | Step 4 states that `assets` returns metadata and a storage `path`, not a download URL, so image links need a separate plan | Spec → `AssetOutputDto.path`; FB-030 |
| (rewrite) | Prerequisite now uses the version-dependent authentication wording from Sync your ERP | FB-002; `guides/syncing-your-erp-with-plytix.mdx` |

#### Not changed

- Nothing on this page. Other pages that link here or describe channel management through the API are listed below.

#### Flags

Added: none · Resolved: none · Updated: FB-030 (F4) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `guides/getting-notified-webhooks-and-automations.mdx`: channel API webhook callout (line 24) and the card linking here (line 44).
- `guides/platform-mcp/practical-examples.mdx` (line 107): links here.
- `reference/v3/channels/` and `reference/v3/pimproductlists/`: still in navigation.
- `information-architecture.md` (line 129) and `glossary.md` (Channel entry): stale "channels have an API" notes; confirm with the project lead.

#### Reply to David

```text
Thanks, David. I've reworked Build a marketplace-specific product feed around your first option, an external feed:

- The channel and product list steps are gone, along with the dashboard note. The guide no longer uses any Channels or PIM product list endpoints.
- It now reads the products in scope from the public product search, selects the mapped fields, pages through every result, and transforms them into a feed file the integration builds and delivers on its own schedule. A short Python example writes the CSV and records products missing required fields.
- The intro says plainly that this doesn't create or configure a Plytix channel, and points readers who want Plytix to build the feed to the Help Center's channel articles.
- The description and related links no longer mention managing channels through the API. A few other pages still do (the webhooks guide and some reference pages), and I'll update them in a separate pass.

Open question:
- Marketplace feeds usually need image links. What's the supported way to get a file URL for an asset through the API? Expanded assets only carry a storage path.
```

---

## Safely remove categories, assets, or relationships

**Page:** `fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review (six points; notes the category-unlink and thumbnail-update examples match the current specification)
**Approved by the user:** all (X1, the V3 authentication prerequisite, not approved)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Relationship DELETE removes the whole relationship-type link; say so from the intro | Factual | Intro; Remove a relationship, step 2 | Supported | Applied |
| F2 | Recheck "`thumbnail_id` is the only asset write"; the schema says media attributes | Factual | Manage assets from the dashboard | Supported (value format unconfirmed, FB-006) | Applied |
| F3a | `thumbnail_id: null` is supported | Factual | Thumbnail, step 2 | Already aligned | Not changed |
| F3b | Verify when clearing the thumbnail drops the asset from `assets` | Factual | Thumbnail, step 2 | Supported (over-claimed) | Applied |
| F3c | Distinguish clearing a thumbnail from deleting the DAM asset | Factual | Thumbnail section | Supported | Applied |
| F4a | Treat `409` as success only when it confirms the same link | Factual | Troubleshooting, 409 | Supported | Applied |
| F4b | Distinguish an already absent link from a missing product on repeated unlink | Scope | Troubleshooting (new) | Supported in part | Applied |
| F5 | Read-back is verification, not a requirement; don't promise every field unchanged | Factual / Tone | Description, intro, steps, Troubleshooting | Supported | Applied |
| F6a | Remove the marketplace guide link | Scope | Not on this page | Not locatable | Not changed |
| F6b | Verify error messages and link-response bodies | Factual | Step 3, Troubleshooting | Confirmed live; `201` body added | Applied |
| F6c | Scope the hidden `_ids` explanation to internal relationship fields | Factual | Step 1; Troubleshooting | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1, F5 | New description ("Remove a category or a relationship link from a product, or change its thumbnail, through the V3 API while keeping the product's other links."); intro now says removing a relationship link "removes every related product the product has under that relationship type, so it isn't a way to remove a single related product" and that a `204` "confirms the change"; relationship step 2 adds "including every related product listed under it for this product. You can't use it to remove one related product." | `bruno-collection/17-Product-Relationships/Manage Product Relationship Link.bru` → "this only removes the entire relationship-type link (all related products under that `relationship_id` for this product)" |
| F2 | Section renamed "Connect other assets to a product": no link endpoint (`405`); assets managed through media and media gallery attributes per the schema; value format unconfirmed | `config/api-testing.config.md` → quirks #96, #107; spec → `ProductUpdateInputDto`: "Assets are managed through media attributes." |
| F3b, F3c | Thumbnail step 2: clearing changes only the reference; the asset stays in Plytix DAM and `DELETE /api/v3/assets/<asset_id>` is the separate deletion; the `assets` side effect reported as observed only, with the media-reference case unconfirmed | Quirk #97; spec → `DELETE /api/v3/assets/{identifier}` |
| F4a | 409 accordion: treat as success only if the IDs in the `AlreadyExists` description match, or a read shows the link | `bruno-collection/02-Products-v3/Link Category to Product.bru` → `"'<category_id>' is already linked to products <product_id> through 'categories'"` |
| F4b | New accordion "`DELETE /products/<id>/categories/<category_id>` returns 404": "not linked" means already done; any other `404`, check the product | Quirk #105 |
| F5 | Category step 2 drops "every other field on it is untouched"; category step 4 and relationship step 3 renamed "Check the result, if your integration needs it."; 204 accordion: "That status confirms the write succeeded." | David's feedback |
| F6b | Category step 3 now shows the `201` body `{"data": {"id": "<category_id>"}, "errors": []}` | Quirk #94 |
| F6c | Step 1 and the `_fields=category_ids` accordion now say "the ID arrays behind a product's links, such as `category_ids` and `asset_ids`" | Quirk #55 ("`_ids` fields are hidden to prevent exposure of denormalization") |

#### Not changed

- **F3a:** the page already documents `{"thumbnail_id": null}`.
- **F6a:** this page has no marketplace guide link; its cards are Sync your ERP and Reconstruct parent/variant hierarchies.
- **X1 (not from David):** the prerequisite still presents the V3 bearer token as settled (FB-002). Offered, not approved.

#### Flags

Added: FB-033, FB-034 · Resolved: none · Updated: FB-006 (F2), FB-024 (F1) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- Run `endpoint-tester` on clearing `thumbnail_id` for a product whose asset is also in a media attribute (FB-033), and on unlinking a category from a nonexistent product (FB-034).

#### Reply to David

```text
Thanks, David. I've updated Safely remove categories, assets, or relationships:

1. Relationship removal scope: the introduction and the relationship step now say the DELETE removes the product's whole link to that relationship type, including every related product under it, so it isn't a way to remove one related product. The relationship type and the products stay.
2. Asset limitation: the assets section no longer says thumbnail_id is the only asset write. It follows the product schema (assets are managed through media and media gallery attributes) and notes that the value format for those writes isn't confirmed yet.
3. Thumbnail side effects: the page now separates clearing a thumbnail from deleting the asset in Plytix DAM, and only reports what we observed about the assets list (it emptied when the thumbnail was the product's only asset).
4. Idempotent errors: a 409 counts as success only when the IDs in the "already linked" message match, or a read shows the link. A new entry covers repeated unlinks: a "not linked" 404 means the link is already gone, and any other 404 means checking the product first.
5. Read-back: the 204 is now described as confirming the change, the follow-up GET is optional verification, and the page no longer promises that every other field stays unchanged.
6. Runtime claims: the link response now shows the exact 201 body, the error messages match our live captures, and the hidden _ids explanation is limited to the ID arrays behind a product's links, such as category_ids and asset_ids. This page had no marketplace guide link, so nothing changed there.

Open questions:
- Does clearing thumbnail_id remove the asset from the product's assets list even when a media or media gallery attribute still references it?
- What does DELETE /products/{id}/categories/{category_id} return when the product doesn't exist, and is the "is not linked to" description stable enough for clients to match on?
- What value does a media or media gallery attribute accept in a product PATCH?
```

---

## Reconstruct parent/variant hierarchies

**Page:** `fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review (reconstruction workflow, family-model endpoint, children and sub-variants, family and inheritance rules, `overwritten_attributes`, prerequisites and response handling, unlinking)
**Approved by the user:** all

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Lead with reading existing products and assembling the structure | Structure / flow | Build and read the hierarchy, lines 17-81 | Supported | Applied |
| F2 | Keep creation as an optional example, or rename the guide | Structure / flow | Same | Supported | Applied |
| F3 | Replace `/product-family-models/{family_id}` | Factual | Step 5, lines 72-79 | Supported | Applied |
| F4 | Use family attribute endpoints; explain `level` and `attribute_id` | Factual | Step 5, line 79 | Supported | Applied |
| F5 | `product_level`/`num_variations` don't list children; add a `parent_id` query | Factual / scope | Step 4, line 70 | Supported (spec; untested live) | Applied, flagged FB-035 |
| F6 | Handle pagination | Scope | Not on the page | Supported | Applied |
| F7 | Explain how to get sub-variants | Scope | Not on the page | Supported (spec; untested live) | Applied, flagged FB-035 |
| F8 | Select `id`, `sku`, `parent_id`, `product_family_id`, `product_level` | Scope | Not on the page | Supported | Applied |
| F9 | Verify that a variant gets its family from the parent | Factual | Step 3, line 61 | Supported (verified live) | Applied |
| F10 | Verify the matching-family rule and the exact error | Factual | Step 3, line 61 | Supported (verified live) | Applied |
| F11 | Verify the account restriction and the exact error | Factual | Step 5, line 81 | Supported (verified live) | Applied |
| F12 | Show the link `level`; document the default if omittable | Factual | Step 1, line 39 | Level: Supported. Default: Unverifiable | Applied, flagged FB-036 |
| F13 | Qualify `overwritten_attributes` | Factual | Read which values a variant overrides, line 89 | Supported | Applied, flagged FB-037 |
| F14 | An existing family shouldn't be a prerequisite | Structure | Prerequisites, line 15 | Supported | Applied |
| F15 | Match the create response to the schema; don't promise omitted fields | Factual | Step 2, line 50 | Supported | Applied |
| F16 | Add a compact rebuilt-output example | Scope | Not on the page | Supported | Applied |
| F17 | If unlinking is added, use `PATCH {"parent_id": null}` | Factual (conditional) | Not on the page | Not applicable | Not changed |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | New first procedure "Rebuild the hierarchy from existing products": read all products, group by `parent_id`, read one branch, read family levels, assemble output. Intro and description rewritten around reconstruction. | Page title; `information-architecture.md:45` |
| F2 | Creation moved to a final "Create a hierarchy to test against" section; title kept | Same |
| F3 | `GET /product-family-models/<family_id>` step removed | `config/api-testing.config.md` → quirk #111: "all -> `404 NotFoundError`"; absent from the 2026-10-02 spec |
| F4 | Rebuild step 4 reads `GET /product-families/<family_id>/attributes` and explains `attribute_id` and `level` (`parent_level`, `variant_level`, `no_level`, or `null`); mentions `_fields=family_attributes.*` | Spec → `FamilyAttributeOutputDto.level`, `ProductFamilyOutputDto.family_attributes` |
| F5 | Rebuild step 2: "Don't rebuild the tree from `product_level` or `num_variations`… `parent_id` is the only field that connects a child to its parent." Step 3 shows `parent_id=<parent_id>` and `parent.sku=<sku>` | Spec → `GET /api/v3/products` filter grammar; `_API V3 - 08_10_2026.pdf` → `parent.sku=ABC` |
| F6 | Follow `pagination.next_page` until missing, `null`, or empty; rewrite `http://` to `https://`; link to Export your full catalog | Spec → `Pagination`; quirk #92 / FB-012 |
| F7 | Grouping produces level 3 because a sub-variant's `parent_id` points at its variant; per-branch query repeats with the variant's ID | Spec → `ProductLevel`: "SUB_VARIANT (3): Sub-variant of a variant"; V1 Postman variants section |
| F8 | `_fields` for the five fields in steps 1 and 3 | Spec → `ProductOutputDto` |
| F9 | "Leave `product_family_id` out: the variant takes its family from the parent." | Quirk #98 (2026-10-08) |
| F10 | "A different family returns `422` with an error that names no field: `{"name": "ValidationError", "description": "product data validation failed"}`." | Quirk #98 |
| F11 | `403` limited to the level-change `PATCH` and `parent_attributes`/`variant_attributes` on family create, with the full `Forbidden` body | Status-gating rule #4 (2026-10-14); quirks #61, #73 |
| F12 | Link example sends `"level": "no_level"`; "Send it on every link, because the level an attribute gets when you leave it out isn't documented." | `_API V3 - 08_10_2026.pdf`; `Create Family Attribute Link.bru` |
| F13 | Overrides section: the array lists overrides only; a missing attribute may be inherited, `no_level`, calculated, or unset; empty on accounts without inheritance; combine with `level` and parent/variant values | Spec → `overwritten_attributes`: "Overwritten attribute names"; FB-021 retest |
| F14 | Prerequisite is now "Products already linked as parents and variants", linking to the creation section | — |
| F15 | "returns `201` with the new product in `data`, without expanded relations"; removed "leaving out any field you didn't set" | Spec → `CreateProductsResponse.data` → `ProductCreateOutputDto`: "without relationship expansions" |
| F16 | Rebuild step 5 adds a nested JSON example, labeled as integration output, not an API response | — |

#### Not changed

- **F17:** the guide doesn't add unlinking. The spec supports `PATCH {"parent_id": null}` (`ProductUpdateInputDto.parent_id`), untested live (FB-022).

#### Checklist

- Possible Fail on "Fields with their own allowed values are listed as bullets": `product_level` and `level` values stay inline in prose, as on the previous version. Reported, not changed.

#### Flags

Added: FB-035, FB-036, FB-037 · Resolved: none · Updated: FB-005 (F3), FB-008 (October 13 spec) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `.claude/skills/writer/references/style-guide.md` ("Procedure section headings" table): replace "Build and read the hierarchy" with "Rebuild the hierarchy from existing products".
- `fumadocs/content/docs/guides/migrating-to-v3/endpoint-mapping.mdx`: its FLAG comment says this guide reads the hierarchy from `num_variations`.
- `.claude/skills/writer/references/glossary.md`, Variant entry: still says "up to four levels".
- Run `endpoint-tester` on `parent_id=` and `parent.sku=` filters, a sub-variant create, and a family-attribute link without `level` (FB-035, FB-036).

#### Reply to David

```text
Thanks, David. I've updated Reconstruct parent/variant hierarchies:

- Workflow: the guide now leads with reconstruction. It reads every product with id, sku, parent_id, product_family_id, and product_level, groups them by parent_id, and assembles the tree. Creating a family, parent, and variant is now an optional last section for testing, and the title stays.
- Family-model endpoint: removed. The guide reads levels from GET /product-families/{id}/attributes (or family_attributes.* on the family search) and explains each row's attribute_id and level.
- Children and sub-variants: a new step lists one parent's children with parent_id=<id> (or parent.sku), paged through next_page. Sub-variants come from the same query with a variant's ID, or from the same grouping. The page also says product_level and num_variations don't list children.
- Family and inheritance rules: we verified the family assignment and the matching-family rule live, and the page now shows the exact 422 error. The 403 is limited to the two requests we've seen it on, with the exact body. The link example now sends "level": "no_level", and the page says to always send level, since the default isn't documented.
- overwritten_attributes: qualified as you suggested, including that the array stays empty on accounts without inheritance, even when a variant holds its own value.
- Prerequisites and responses: an existing family is no longer required, the create response is described as the new product without expanded relations (no promise about omitted fields), and there's a compact example of the rebuilt output.
- Unlinking: not added, since the guide doesn't cover it. If we add it later, it'll use PATCH with {"parent_id": null}, separate from DELETE.

Open questions:
- Is filtering products by parent_id and parent.sku supported, and is a sub-variant created by setting parent_id to a variant's ID?
- Does a parent's num_variations count its sub-variants, or only its direct variants?
- Which level does a family-attribute link get when level is left out?
- When exactly does Plytix add an attribute to overwritten_attributes?
```

---

## Bulk operations for large catalogs (internal draft)

**Page:** `internal-drafts/guides/bulk-operations-for-large-catalogs.mdx` (moved from `fumadocs/content/docs/guides/bulk-operations-for-large-catalogs.mdx`) · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review (keep the guide unpublished as an internal draft; remove public Bulk API references; split topics if published later; code example, `409` handling, unsupported statements)
**Approved by the user:** all (F1 as Option A, F5, F6, F7; inbound pages not included)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Keep the guide unpublished as an internal draft: no public URL, nav, search, links, MCP, or llms exports | Scope | Whole page; `guides/meta.json` line 18 | Supported | Applied (Option A) |
| F2 | "We could see if we want it in a url but not indexed or linked" | Question / future option | n/a | Not applicable now | Not changed |
| F3 | Remove public Bulk API references elsewhere | Scope | Other pages (endpoint mapping and Documentation MCP guide not locatable) | Not applicable to this page | Not changed; follow-up, FB-038 |
| F4 | Split into a V3-only guide if publication is revisited | Structure | Whole page | Future | Not changed |
| F5 | Code has no pacing or retries and discards the error response | Factual | Step 4, lines 58-63 | Supported | Applied |
| F6 | Don't treat every `409` as success | Factual | Step 5, line 67 | Supported | Applied |
| F7 | Remove unsupported statements about silent failures and customer feedback | Factual | "Before reaching for the older Bulk API", lines 69-78 | Contradicted as "unsupported" (`before-writing.md`), section removed under F1/F3 | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | File moved to `internal-drafts/guides/` at the repo root (outside `fumadocs/content/`, so no route, search, MCP, or llms export) with `git mv`; `"bulk-operations-for-large-catalogs"` removed from `fumadocs/content/docs/guides/meta.json` | `materials/transcripts/kick_off_2.md` → "which is not public because we are not offering to everyone"; `fumadocs/lib/source.ts` loads all of `content/docs` into the source used by search, MCP, and llms routes |
| F5 | Step 4 loop paces with `pause=0.5`, retries `429`, `5xx`, and `000` up to three times with a growing delay, and logs ID, status, and response body to `results.log`; explanation paragraph added | Page steps 3-4; FB-028 |
| F6 | "A retried `POST` for a SKU that already exists returns `409`, but don't count that as success on its own… Search for the SKU, confirm it's the product you meant to create, and `PATCH` it if its values differ." | `config/api-testing.config.md` → quirk #33; Sync ERP guide line 154 |
| F7 | Removed the "Before reaching for the older Bulk API" section (and its FLAG comment), the Bulk API clause in the intro, and the Bulk API mention in the description (now "Process large product catalogs reliably with paced single-item V3 requests, per-item result tracking, and retries limited to the items that failed.", 147 characters) | Feedback F1/F3; `Bulks Documentation (API) (Limited to Large Clients).pdf` |

#### Not changed

- **F2:** a later decision; would need code changes (filter from search, MCP, and llms, plus `noindex`).
- **F3:** other pages; listed as follow-ups. The user approved this page only.
- **F4:** only if publication is revisited. The draft now covers V3 only.

#### Flags

Added: FB-038 (open), FB-039 (resolved) · Resolved: FB-039 · Updated: FB-028 (F5) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- 11 inbound references on 9 pages now 404 and some mention the Bulk API: `guides/migrating-to-v3/index.mdx`, `guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx`, `guides/syncing-your-erp-with-plytix.mdx`, `reference/v3/pagination.mdx`, `reference/v3/updates-and-deletes.mdx`, and four `guides/platform-mcp/` pages.
- `.claude/skills/writer/references/information-architecture.md` line 46 and the style guide's procedure-heading table still list the guide.
- Redeploy if the site is live, and check whether the old URL was indexed.

#### Reply to David

```text
Thanks, David. I've taken Bulk operations for large catalogs off the portal:

- Keep the draft private: I moved the guide out of the docs site into an internal drafts folder in our repo and removed it from the navigation. After the next deploy it has no URL and isn't in search, related articles, the Documentation MCP, or the Markdown/llms exports.
- Remove public references elsewhere: not done yet. Other pages still link to the guide, and the migration guide still mentions the Bulk API. I'll clean those up in a separate pass.
- Separate the two topics: noted for when we revisit publication. The Bulk API section is already out of the draft, so what remains covers only V3.
- Code example: the loop now paces requests, retries 429, 5xx, and failed connections, and logs each item's status and response body.
- 409 handling: the draft no longer treats a 409 as success. It says to search for the SKU, confirm it's the intended product, and update it if its values differ.
- Unsupported statements: removed along with the Bulk API section.

Open questions:
- For the MCP guide, did you mean the Platform MCP guide? The Documentation MCP guide doesn't mention the Bulk API, but the Platform MCP practical examples link to this guide for large batches.
- We couldn't find a Bulk API reference on the Endpoint mapping page. Is there one we missed?
```

---

## Connect an AI assistant to the Plytix docs

**Page:** `fumadocs/content/docs/guides/documentation-mcp.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written editorial review (WriteChoice implements the server, so Plytix can't validate its behavior independently)
**Approved by the user:** all (F1, F4, F5, F8; X1 not included)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Say it searches and reads public docs, no account access; replace "can't write anything anywhere" | Tone / factual | Intro, line 8; Prerequisites, line 23; accordion "read-only", line 148 | Supported | Applied |
| F2 | Confirm endpoint, client configs, authentication, tool names, responses against the deployment | Factual | Whole page; FLAG, lines 12-14 | Unverifiable until deployed | Not changed; FB-040 |
| F3 | Add a successful connection and a cited query example | Scope | Verify the connection | Unverifiable until deployed | Not changed; FB-040 |
| F4 | Replace the API-key-to-bearer-token test question | Tone / factual | Verify the connection, step 2, line 93 | Supported | Applied |
| F5 | Make troubleshooting less absolute | Factual | Step 3, line 104; accordion "server-failed", line 139 | Supported | Applied |
| F6 | Keep the Bulk draft and private Channels docs out of MCP, search, and llms exports | Scope | Not on this page | Not applicable | Not changed; added to FB-038 |
| F7 | Keep Documentation MCP and Platform MCP distinct; Platform MCP link only if approved | Scope | No Platform MCP reference on the page | Already aligned | Not changed; FB-041 |
| F8 | Retrieval is something the assistant can use, not a guarantee; encourage citations | Tone / wording | Description, line 3; intro; lines 108, 116; accordion "no-citation", line 145 | Preference (passes) | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | Intro: "lets an AI assistant search and read the public pages of these docs". Prerequisites: "The Documentation MCP searches and reads the public documentation only. Its tools can't access or change your Plytix account data. That applies to this server's tools: other servers or tools connected to your assistant keep their own capabilities." Accordion: "The Documentation MCP's tools search and read the published pages only. They have no access to your Plytix account, so they can't read or change your products." | `fumadocs/app/api/mcp/route.ts` (`registerSourceTools`, `registerDocsSearchTool`; no auth, no PIM calls) |
| F4 | Step 2 example: "Using the Plytix Documentation MCP, explain V3 product filtering and cite the relevant page.", with a link to Filtering and query syntax and a note that an uncited answer may come from the model's own knowledge | FB-002; `reference/v3/filtering-query-syntax.mdx` |
| F5 | Step 3: a tool list "means the server is up and answering", then check client configuration; the browser description lists supported protocol versions. Accordion: check the endpoint itself, since the site and endpoint "can be up or down independently" | `route.ts` (`GET` returns `protocolVersions`, `listTools()` uses the same request as the curl); `INFRA-DEPLOYMENT-OPTIONS.md` Option 1 |
| F8 | Description: "…so it can search and cite the current docs." (143 characters). Intro: "Whether it uses the server for a given answer depends on your client and your prompt, so ask it to cite the page it used." Line 108: "Your assistant decides when to call them… asking for the source page makes it more likely to use them, and lets you check the answer." Line 116: "Together, they help with questions that are slow to answer by hand, such as:". Accordion prompt: "Using the Plytix Documentation MCP, …" | Feedback F8; style guide |

#### Not changed

- **F2, F3:** need the final domain and a deployed endpoint; example output would be invented until then (FB-040).
- **F6:** not on this page. The Bulk draft already left `content/docs/`; the Channels reference pages are an existing follow-up.
- **F7:** the page has no Platform MCP reference; the Platform MCP pages in the sidebar are raised as FB-041.
- **X1 (not from David):** the Authentication card's "exchange API credentials for a bearer token" wording (FB-002). Offered, not approved.

#### Flags

Added: FB-040, FB-041 · Resolved: none · Updated: FB-038 (F6, partly answered) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `reference/v3/channels/` and `reference/v3/meta.json`: remove from the public site (F6).
- `guides/meta.json` and `guides/platform-mcp/`: remove from the portal if FB-041 isn't approved.
- `glossary.md`: add a "Documentation MCP" entry.
- After deployment: test the client configurations and curl check, then add captured output to "Verify the connection" (FB-040).

#### Reply to David

```text
Thanks, David. I've updated Connect an AI assistant to the Plytix docs:

- Scope: the page now says the server searches and reads the public documentation only and can't access or change Plytix account data. "Can't write anything anywhere" is gone, and the page notes that other tools connected to an assistant keep their own capabilities.
- Setup against the deployment: not done yet. We'll test every client configuration, the authentication requirements, the tool names, and the responses once the final endpoint is live, and add a real example of a connection and a cited answer then.
- Verification question: replaced with "Using the Plytix Documentation MCP, explain V3 product filtering and cite the relevant page."
- Troubleshooting: a working tool list now means the server is up, not that everything else is client configuration, and readers check the MCP endpoint itself rather than the docs site. We'll recheck the curl request against the protocol version on the final deployment.
- Approved public content only: the Bulk draft is out of the site, so it leaves the MCP tools, search, and the Markdown and llms exports at the next deploy. This page never linked to it. The Channels reference pages are still published, and I'll remove them in a separate pass.
- Platform MCP: this page doesn't mention or link the Platform MCP.
- Retrieval: the page now says the assistant can use the docs, depending on the client and the prompt, and encourages asking for the source page.

Open questions:
- What will the production docs domain be, and which hosting option has your infrastructure team chosen?
- Has the Platform MCP roadmap message been approved? Its pages are still in the guides navigation. If not, we'll take them out of the portal.
```

---

## Not migrated and new in V3

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx` · **Page type:** Reference

### Run 2026-10-14

**Feedback from:** David, written review against the October 13 OpenAPI ("Required changes" 1-7, plus dating and status groups)
**Approved by the user:** all (F1 as Option A)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Bulk API is V1, not V2; separate the V3 contract, legacy, and future V3 | Factual | Bulk operations, line 25 | Supported, but conflicts with David's Bulk-draft instruction | Applied (Option A, no legacy mention); FB-042 |
| F2 | Product-to-asset: media attributes are the V3 route; keep asset content separate | Factual | Table, line 17 | Supported | Applied; added to FB-006 |
| F3 | Account search: legacy status explicit for all six rows; dashboard isn't a replacement; no retirement | Factual | Line 12; rows 20-21 | Supported | Applied; FB-043 |
| F4 | Filter discovery: say what `product-attributes` gives; link filtering reference | Factual | Row, line 18 | Supported | Applied |
| F5 | New entry points vs. views; read-only search vs. nested management; public scope | Factual / structure | Lines 27-36 | Supported | Applied |
| F6 | V2 products-only beta; relationship `DELETE` is a new route, not capability | Factual | Line 40 | Supported | Applied; added to FB-023 |
| F7 | "Two versions" made conditional | Tone / factual | Intro, line 8 | Supported | Applied |
| F8 | Date the inventory; distinguish status groups | Structure | Intro, tables | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | Bulk section: "The current V3 contract has no bulk create, update, or delete endpoints. Bulk endpoints are part of Plytix's V3 design (planned), but there's no V3 bulk call to migrate to yet." Points to rate limits; legacy Bulk API mention and the hidden-draft link removed | Bulk PDF (`/api/v1/bulk/products`); status map "Bulk operations (pp. 13–15)"; no `bulk` path in the 2026-10-02 spec; Bulk-draft feedback F3 |
| F2 | Asset link row: "Alternative in V3, unconfirmed", media and media gallery attributes plus `thumbnail_id`, keep on V1 for now. Asset content row: an update changes `filename` and `alt_text`, not the file | Spec → `ProductUpdateInputDto`: "Assets are managed through media attributes"; `AssetUpdateInputDto` (`filename`, `alt_text`); `openapi_pimv1.json` → "Link an existing asset to a product media attribute" |
| F3 | Lead-in: "All six endpoints below remain documented in the V1/V2 reference…"; account rows "Legacy only" with "doesn't replace searching them through the API" | `openapi_pimv1.json` → tag `accounts` |
| F4 | Filter row: `product-attributes` returns definitions with `type`, not system fields, asset or relationship fields, or operators; links Filtering and query syntax | Spec → `ProductAttributeGetBaseOutputDto` |
| F5 | Section renamed "New entry points in V3"; table columns "What it is" and "Managed through"; three entries described as views of existing associations, read-only, managed through nested paths | Spec (GET-only collections, nested write paths); `openapi_pimv1.json` (V1 family attribute and relationship paths); `endpoint-reviews/Plytix API v3 - endpoint visibility.xlsx` (all Public); quirk #74 |
| F6 | V2 `DELETE` described as "the same job V1 does with `/api/v1/products/{product_id}/relationships/{relationship_id}/unlink`, so it's a different route rather than a new capability" | `openapi_pimv1.json` → both titled "Remove products from a relationship"; tag "products V2 BETA" |
| F7 | "Keep a legacy call wherever your integration needs a capability with no confirmed public V3 equivalent, and move everything else to V3." | Feedback F7 |
| F8 | Intro: "It reflects the V3 OpenAPI dated 2026-10-02 and will change as V3 expands." Status groups list (Legacy only, Alternative in V3, Planned) and a Status column | `openapi_pimv3_20261002 (Latest spec).json`; FB-008 |

#### Not changed

- Title and description kept; still accurate.

#### Flags

Added: FB-042, FB-043 · Resolved: none · Updated: FB-006 (F2), FB-023 (F6), FB-008 (October 13 spec) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `guides/migrating-to-v3/index.mdx`: make "usually ends up calling both versions" (line 8) and the "Running both versions is the normal end state" callout (line 51) conditional; remove the V2 Bulk API sentence and hidden-draft link (line 48).
- `guides/migrating-to-v3/endpoint-mapping.mdx`: align its rows with the same status groups.

#### Reply to David

```text
Thanks, David. I've updated Not migrated and new in V3. The page is now dated against the V3 OpenAPI of 2026-10-02 and sorts every entry into legacy only, alternative in V3, or planned:

1. Bulk operations: the section now says only that the current V3 contract has no bulk endpoints and that bulk is planned in the V3 design. Following your note on the Bulk draft, it no longer mentions the legacy Bulk API or links to that guide.
2. Product-to-asset assignment: listed as an unconfirmed V3 alternative through media and media gallery attributes, kept separate from replacing an asset's file, which stays on V1.
3. Account search: all six rows are marked as documented in V1, and the dashboard is described as no replacement for searching through the API. Nothing implies retirement.
4. Filter discovery: the row explains what GET /api/v3/product-attributes returns and links to the V3 filtering reference for system fields, operators, and the rest.
5. New entry points: asset lists are a new resource, and the other three are described as read-only views of existing associations, managed through the nested family and product endpoints. All four are marked Public in the endpoint visibility review.
6. V2: the products-only beta description matches the legacy reference, and the relationship DELETE is now described as a different route for what V1 does with /unlink.
7. Migration outcome: the page now says to keep a legacy call only where the integration needs a capability with no confirmed public V3 equivalent.

Open questions:
- Should migration pages mention the legacy V1 Bulk API at all, for example as "available to some accounts, ask your Plytix contact", or stay silent? Can we say publicly that bulk is planned for V3?
- Are credential and membership search planned for V3, staying V1-only, or due for retirement?
- What value does a media or media gallery attribute accept in a product PATCH?
- Could you share the October 13 OpenAPI? This page is checked against the October 2 version, the newest we hold.
```

---

## Migrating to V3

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/index.mdx` · **Page type:** How-to

### Run 2026-10-14

**Feedback from:** David, written review ("Required corrections" on authentication, legacy bulk, creation responses, and filters; "Technical claims requiring confirmation" 5-6; "Migration validation")
**Approved by the user:** all (F2 as Option A; X1-X3 not included)

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | Authentication: V1/V2 keep the current system, V3 model pending | Factual | Intro line 10; Prerequisites line 18; callout lines 51-53; step 2 lines 55-57; card line 229 | Supported | Applied |
| F2 | Bulk: not "gone from both"; distinguish legacy, availability, V3 contract | Factual | Step 1, lines 46-49 | Supported, conflicts with David's Bulk-draft instruction | Applied (Option A); FB-042 |
| F3 | Create responses: settle ID vs. full entity; shape per operation, array to object | Factual | Step 7, lines 161-174 | Supported (spec and live over internal docs) | Applied; FB-018 |
| F4a | `status=Review` isn't valid | Factual | Step 3, line 104 | Supported | Applied |
| F4b | Category filter should target `categories.id` | Factual | Step 3, lines 85, 95 | Supported by spec, untested live | Applied; FB-016 |
| F4c | Operators don't keep exactly the same meaning | Factual | Step 3, line 99 | Supported | Applied |
| F5 | Assets: replace vs. create vs. media-attribute assignment | Factual | Step 1 table, line 41; accordion, lines 218-220 | Supported | Applied |
| F6a | PATCH replaces the attributes map: example, concurrency, single-attribute | Factual | Step 8, line 180; accordion, line 203 | Claim confirmed live; caveat added | Applied; FB-019, FB-020 |
| F6b | Unrecognized filters silently ignored | Factual | Accordion, lines 194-196 | Page claim contradicted by live tests | Applied; FB-010 |
| F7 | Validation on stable test data, isolated write records | Structure | Step 9, lines 185-187 | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | Intro: "V1/V2 keep their current authentication, and V3 is moving to a new model whose details aren't published yet." Prerequisite: credentials "for the calls you keep on V1/V2". Callout "Keeping some calls on V1/V2": "don't assume one token covers both". Step 2 retitled "Plan authentication for each version" and rewritten; links to the V3 Authentication reference and Quickstart removed. Card: "the V1/V2 token flow, and the status of V3 authentication" | `migrating-to-v3/authentication-and-base-urls.mdx`; FB-001, FB-002 |
| F2 | "These are gone from both" block replaced by "Bulk writes aren't in V3 yet… Bulk endpoints are part of Plytix's V3 design (planned)", linking rate limits; hidden-draft link removed. Account search moved into the "Keep these on V1/V2" table: "Managing keys and users in the Plytix dashboard doesn't replace searching them through the API" | Bulk PDF; status map "Bulk operations"; no `bulk` path in the 2026-10-02 spec; `openapi_pimv1.json` tag `accounts`; Bulk-draft feedback |
| F3 | Step 7 intro and Create row: "`201` with `data` as an object holding the resource's creation representation… V1/V2 return the created record inside an array"; "Code that reads `data[0]`… has to read `data`"; link to Responses and updates. "PATCH recently changed to 204" callout removed | Spec `CreateProductsResponse.data` → `ProductCreateOutputDto`; quirk #84; `API V3.md:222` (ID only, lower trust) |
| F4a | `_or[0]status=Review` → `_or[0]status=Completed` | Spec `ProductStatus` enum |
| F4b | `categories[in]=<id>` → `categories.id[intersects]=<id>` (V3 tab and mapping table) | Spec `ProductOutputDto.categories` (array of category objects); October 8 PDF `categories.name=Shoes`; quirk #99 `categories.name[intersects]` |
| F4c | "Most operators change shape and keep their meaning… Missing fields, `null`, empty values, and negated operators are the exception…" with a link to Missing, null, and empty values; "For list fields such as `categories`, use `[intersects]` rather than `[in]`." | `filter-operators.mdx` § Missing, null, and empty values; FB-015, FB-016 |
| F5 | Asset link row: "No dedicated endpoint. V3 manages a product's assets through media and media gallery attributes… keep this call on V1 for now". Table intro: "They have no confirmed V3 equivalent today". Accordion: uploading a new asset works with `POST /api/v3/assets`; replacing a file stays on V1; attaching goes through media attributes (unconfirmed format). Title uses "V3" | Spec `ProductUpdateInputDto`, `AssetUpdateInputDto`; FB-006 |
| F6a | Step 8 bullet links the before-and-after example, gives the single-attribute path with a bare JSON value, and adds "V3 has no conditional write, so a change someone else makes between your read and your write is overwritten." Accordion: patch one at a time; read-merge-write only without concurrent editors | Quirks #85, #87; `responses-and-updates.mdx` § How PATCH treats the attributes map |
| F6b | Accordion retitled "A V3 search returns more records than the same V1 search"; unknown field returns `400 InvalidFieldError`, unknown operator `400 InvalidFilterOperator`; check `--globoff` and URL encoding | `config/api-testing.config.md` quirks #99, #116, 2026-10-13 retest |
| F7 | Step 9 retitled "Compare both versions on test data before cutting over": stable test dataset, fixed sort (`sku`), counts, fields, response shapes, relations, errors; writes on isolated test records | Feedback F7 |

#### Not changed

- **X1 (not from David):** line 127 says the SKU works as a product path identifier; live tests return `422` (quirks #14, #58). Offered, not approved.
- **X2 (not from David):** lines 153-155 suggest `curl -L --location-trusted` (FB-012). Offered, not approved.
- **X3 (not from David):** line 8 "usually ends up calling both versions". Offered, not approved.

#### Flags

Added: none · Resolved: none · Updated: FB-001, FB-002 (F1), FB-042 (F2), FB-018 (F3), FB-016 (F4b), FB-010 (F6b), FB-019, FB-020 (F6a) (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `reference/v3/filtering-query-syntax.mdx` line 119: `status=Review` and `categories[in]`.
- This page: X1-X3 above.

#### Reply to David

```text
Thanks, David. I've updated Migrating to V3:

- Authentication: the introduction, prerequisites, callout, step 2, and the Authentication and base URLs card now say V1/V2 keep the current flow and V3 is moving to a new model whose details aren't published yet. Nothing says credentials, roles, or refresh logic carry over to V3.
- Legacy bulk operations: the "gone from both" section is gone. The page now says the current V3 contract has no bulk endpoints and that bulk is planned in the V3 design. Following your note on the Bulk draft, it doesn't describe the legacy Bulk API. Account search moved into the "keep on V1/V2" table, since it's documented in V1.
- Creation responses: the page now follows the October 2 OpenAPI and our live tests: a create returns 201 with data as an object holding the creation representation, without expanded relations for products, and code that read data[0] in V1 has to read data. The "keeps working" claim and the full-entity callout are gone. PATCH and DELETE stay at 204 with no body.
- Filter examples and semantics: status=Review is now status=Completed, the category filter uses categories.id[intersects], and the page now points out that missing, null, and empty values and negated operators need separate handling, with a link to the filter operators page.
- 5. Assets: replacing an existing asset's file, uploading a new asset with url or content, and assigning assets through media and media gallery attributes are now separate. The troubleshooting entry no longer suggests uploads are unavailable in V3.
- 6. Attribute updates: the claim stays, because our live test confirmed it, and the page now links the before-and-after example, shows the single-attribute PATCH, and explains that read-merge-write can overwrite concurrent changes.
- 6. Invalid filters: removed. Our live tests show an unknown filter field returns 400 InvalidFieldError and an unknown operator returns 400 InvalidFilterOperator, so the troubleshooting entry now says that.
- Migration validation: step 9 now compares reads on a stable test dataset with a fixed sort, covering counts, fields, response shapes, relations, and errors, and tests writes on isolated records.

Open questions:
- Should migration pages mention the legacy V1 Bulk API at all, given your note on the Bulk draft to remove it from migration comparisons?
- Is the creation representation (the record without expanded relations) the final create response, or will creates move to the ID-only response in the internal documentation?
- Does categories.id[intersects]=<id> match products in a category the same way V1's categories "in" filter does?
- Is replacing the whole attributes map on PATCH intended, and does the single-attribute PATCH take a bare JSON value for every attribute type?
```

---

## Plytix MCP

**Page:** `fumadocs/content/docs/guides/platform-mcp/index.mdx` · **Page type:** How-to

### Run 2026-10-29

**Feedback from:** David, written answers to our MCP page questions, plus the tool inventory sheet (saved as `materials/api-references/mcp/Plytix MCP - Tool Inventory - Tools.csv`)
**Approved by the user:** all ("Proceed with the changes")

#### Feedback items

| # | Feedback (short) | Type | Location | Verdict | Outcome |
|---|---|---|---|---|---|
| F1 | "The production server url will be: pim.plytix.com/mcp" | Factual | Connection details table, step 2, "The connection fails" accordion, top FLAG | Accepted on David's authority (not live until November 6) | Applied |
| F2 | "The MCP access is independent to API v3." | Factual | Prerequisites, after the connection details | Supported | Applied |
| F3 | "MCP is under beta access ... contact your account manager." | Scope | Beta callout, Prerequisites | Supported | Applied |
| F4 | "the MCP Oauth is independent to API v3 token management." | Factual | Prerequisites | Already aligned; FLAG narrowed | Applied |
| F5 | "set on the LLM side and user will be able to set different access to every available tool." | Factual | Intro, Add the Plytix MCP steps, "Your assistant says it can't do what you asked" accordion | Supported (DEV connector screenshot) | Applied |
| F6 | Tool inventory sheet; "the optimized title is shown in the frontend of your model as tool list." | Factual / Scope | Available capabilities | Supported (inventory CSV); titles not in the sheet | Applied |
| F7 | "release date is expected to be the next friday 6th of november" | Factual | Changelog | Supported | Applied |
| F8 | "Regarding the proposal of use cases, they are good." | Scope | Example workflows | Supported | Applied |

#### Applied changes

| # | Change made | Source |
|---|---|---|
| F1 | `<plytix-mcp-url>` replaced with `https://pim.plytix.com/mcp` in three places; top FLAG narrowed to testing before publishing | David's answer; DEV URL `https://pim.dev.plytix.com/mcp` in the 27 Oct brief for the scheme |
| F2, F4 | "The Plytix MCP is separate from the V3 API, so you don't need V3 or a V3 access token to connect. The OAuth sign-in authorizes your AI application, separately from the access tokens in the **API v3** tab." FLAG narrowed to revocation from Plytix | David's answer; glossary → Plytix MCP ("Authenticates with OAuth") |
| F3 | Callout: "To turn it on for your account, contact your account manager." Prerequisite: "Plytix MCP access turned on for your Plytix account. To request it, contact your account manager." FLAG narrowed to the signing-in role | David's answer |
| F5 | Intro now says access is set per tool in the AI application; new step 5 "**Set** the access for each Plytix tool..."; step 4 is now "**Complete** the authorization when Plytix asks you to."; added "To disconnect, remove the Plytix connection in your AI application's settings."; accordion points to per-tool settings | David's answer; Claude connector screenshot for "Plytix PIM - DEV" (per-tool allow, approval, block; **Disconnect**) |
| F6 | Capability table filled with eight rows (products, product categories, product lists, attributes and attribute groups, families, relationships, assets, asset categories and asset lists), all read and write, last verified October 29, 2026; intro notes tools appear by short title and that read and write tools can get different access; FLAG rewritten to the DEV vs inventory discrepancy | `materials/api-references/mcp/Plytix MCP - Tool Inventory - Tools.csv` (72 tools: 12 search, 11 get, 11 create, 12 update, 11 delete, 6 link, 6 unlink, 3 unset) |
| F7 | Changelog entry "November 6, 2026": beta release, Added (links to Available capabilities), Limitations (product and asset data only; channels not available) | David's answer; inventory "all in PIM" |
| F8 | Three workflows added: "Draft content for a sales channel", "Check a supplier file before you import it", "Answer product questions for your team" | David's answer; glossary → Channel; `sample-data.md` (`GF-Basket`) |

Also resolved in the page: the content-review FLAG ("[a supported selection]"). The search tools take V3 filter syntax, and V3 filters products by category name (`categories.name=Drinkware`, `filter-operators.mdx` line 96), so "in the Drinkware category" stays.

#### Not changed

- None. The tool-title column wasn't added because the inventory has no titles (FB-056).

#### Flags

Added: FB-054, FB-055, FB-056, FB-057 · Resolved: none (details in [`feedback-flags.md`](feedback-flags.md))

#### Follow-ups on other pages

- `.claude/skills/writer/references/information-architecture.md` line 47: update the "blocked on flags" list.
- `.claude/skills/writer/references/glossary.md`, Plytix MCP entry: add the account-manager activation and the separation from V3.

#### Reply to David

```text
Thanks, David. I've updated the Plytix MCP page:

- Server URL: the page now uses https://pim.plytix.com/mcp throughout.
- Beta access: the beta callout and the prerequisites say access is turned on per account, and to contact the account manager to request it.
- V3: the page says the Plytix MCP is separate from V3, so readers don't need V3 or a V3 access token, and the OAuth sign-in is separate from the tokens in the API v3 tab.
- Tool access: a new step tells readers to set access for each tool in their AI application (let it run, require approval, or block it), and to disconnect there too. Troubleshooting now points to those settings.
- Tool list: Available capabilities now summarizes your sheet in eight groups, from products to asset categories and lists, with the access and limits for each, such as deletes that can't be undone.
- Release date: the changelog starts with a November 6, 2026 beta entry.
- Use cases: I've added all three as example workflows: drafting channel content from product data, checking a supplier file against the catalog, and answering product questions for internal teams.

Open questions:
- Can you confirm the full URL is https://pim.plytix.com/mcp? We'll test the page against it on November 6.
- Which Plytix role does the person signing in need, and does the assistant see only what that user can see?
- Can a user or admin see or revoke MCP connections from inside Plytix?
- Is your sheet the tool list for the release? Our Claude connection to the DEV server shows 25 read-only tools, including "Get product categorization", which isn't in the sheet. The sheet also doesn't have the display titles. Could you share them?
```
