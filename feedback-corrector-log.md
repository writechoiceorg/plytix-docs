# Feedback corrector run log

Record of every `feedback-corrector` run: the feedback received, what our sources said, what changed on the page, and the reply sent to David. One section per page, newest run first. Open questions for Plytix live in [`feedback-flags.md`](feedback-flags.md).

**Last updated:** 2026-10-14

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
