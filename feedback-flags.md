# Feedback flags for the Plytix team

Running log of open questions and conflicts found while applying Plytix feedback to the docs. Maintained by the `feedback-corrector` skill: one section per page, updated in place.

**Last updated:** 2026-10-29

## Summary

| Page | Open | Resolved | Last run |
|---|---|---|---|
| [Overview](fumadocs/content/docs/guides/overview.mdx) | 3 | 0 | 2026-10-13 |
| [The Plytix data model](fumadocs/content/docs/guides/data-model.mdx) | 1 | 3 | 2026-10-13 |
| [Searching and pagination](fumadocs/content/docs/guides/migrating-to-v3/searching-and-pagination.mdx) | 2 | 3 | 2026-10-14 |
| [Filter operators](fumadocs/content/docs/guides/migrating-to-v3/filter-operators.mdx) | 3 | 2 | 2026-10-14 |
| [Responses and updates](fumadocs/content/docs/guides/migrating-to-v3/responses-and-updates.mdx) | 3 | 1 | 2026-10-14 |
| [Authentication and base URLs](fumadocs/content/docs/guides/migrating-to-v3/authentication-and-base-urls.mdx) | 0 (tracked under FB-002) | 0 | 2026-10-14 |
| [Endpoint mapping](fumadocs/content/docs/guides/migrating-to-v3/endpoint-mapping.mdx) | 3 | 2 | 2026-10-14 |
| [Sync your ERP](fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx) | 2 | 0 | 2026-10-14 |
| [Export your full catalog](fumadocs/content/docs/guides/exporting-your-full-catalog.mdx) | 1 | 1 | 2026-10-14 |
| [Audit product data quality with filters](fumadocs/content/docs/guides/auditing-product-data-quality-with-filters.mdx) | 2 | 0 | 2026-10-14 |
| [Build a marketplace-specific product feed](fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx) | 0 (tracked under FB-030) | 0 | 2026-10-14 |
| [Safely remove categories, assets, or relationships](fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx) | 0 | 2 | 2026-10-14 |
| [Reconstruct parent/variant hierarchies](fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx) | 2 | 1 | 2026-10-14 |
| [Bulk operations for large catalogs (internal draft)](internal-drafts/guides/bulk-operations-for-large-catalogs.mdx) | 1 | 1 | 2026-10-14 |
| [Connect an AI assistant to the Plytix docs](fumadocs/content/docs/guides/documentation-mcp.mdx) | 2 | 0 | 2026-10-14 |
| [Not migrated and new in V3](fumadocs/content/docs/guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx) | 2 | 0 | 2026-10-14 |
| [Migrating to V3](fumadocs/content/docs/guides/migrating-to-v3/index.mdx) | 0 (tracked under FB-001, FB-002, FB-010, FB-016, FB-018, FB-019, FB-020, FB-042) | 0 | 2026-10-14 |
| [19 October action list (PM items)](#19-october-2026-documentation-actions-pm-items) | 4 | 0 | 2026-10-19 |
| [19 October marketing and design feedback](#19-october-2026-marketing-and-design-feedback) | 6 | 0 | 2026-10-21 |
| [Plytix MCP](fumadocs/content/docs/guides/platform-mcp/index.mdx) | 4 | 0 | 2026-10-29 |

---

## Overview

**Page:** `fumadocs/content/docs/guides/overview.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-13 | David, written review comment to Marcos ("Proposed changes" 1-2, "Suggested improvements" 3) | 3 (F1a, F2, F3) | 1 (F1b, belongs on the Quickstart) | 3 |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-001 | Open | F1: "As discussed on October 8, v1/v2 will retain the current authentication system, while v3 will introduce a new model whose details are still pending." Raised again on the Migrating to V3 overview (F1, 2026-10-14): "As confirmed on October 8, v1/v2 will retain the current authentication system, while v3 will introduce a new model whose details are pending." | The substance matches Plytix's earlier written answer, but we have no record of the October 8 call itself. The newest transcript we hold is dated 2026-10-01. | `materials/project-references/brief/Questions for the Plytix Dev Team.md` → AUTH-1: "for now we will keep using the same v1 auth until we develop v3 auth carefully… we will implement a token generation with different access level." | Could you share notes or a recording from the October 8 call, so we can cite the authentication decision directly? | 2026-10-13 | |
| FB-002 | Open | F1: "v3 will introduce a new model whose details are still pending." Raised again on the Searching and pagination page (F8, 2026-10-14): "Remove the wording that describes a token flow shared by v1/v2 and v3. Keep it consistent with the agreed legacy authentication scope and the pending v3 model." Raised again on the Authentication and base URLs page (F1-F3, 2026-10-14): "We have confirmed that v3 will introduce a new token-based model, but its details are not ready to document." Raised again on the Sync your ERP page (F1, 2026-10-14): "Remove the API key/password exchange and 15-minute token lifetime as definitive v3 instructions." Raised again on the Migrating to V3 overview (F1, 2026-10-14): "Update all statements that credentials, tokens, roles, and refresh logic remain unchanged between versions." That page now says V1/V2 keep the current flow and V3 authentication is pending. | Today, V3 requests authenticate with the V1/V2 key and password exchanged for a bearer token at `auth.plytix.com`, and our live tests confirm that flow works. The Quickstart and the V3 Authentication reference document it as the V3 flow. Since 2026-10-14, the migration guide's authentication page documents only the V1/V2 flow and marks V3 authentication as pending, so it no longer tells V3 integrators how to authenticate today. | `config/api-testing.config.md`; `fumadocs/content/docs/reference/v3/authentication.mdx`; AUTH-1 and AUTH-2 in `Questions for the Plytix Dev Team.md` | Until the new V3 model ships, is it correct to keep documenting the current key/password-to-bearer-token exchange for V3? When will details of the new model (token generation, access levels, error format) be available? | 2026-10-13 | |
| FB-003 | Open | F1: "Please update the next-page description too." | The description David refers to is on the Quickstart page ("…with the Plytix API V3 and curl"), and the whole Quickstart body teaches the bearer-token flow. Changing only the description would not make the page general. | `fumadocs/content/docs/guides/quickstart.mdx`, line 3 | No question for Plytix. WriteChoice will update the Quickstart in a separate pass, guided by the answer to FB-002. Raised again in the Data model feedback (F9, 2026-10-13): "Update the Quickstart navigation description consistently with the Overview feedback, avoiding a definitive v3 authentication flow until confirmed." | 2026-10-13 | |

### Follow-ups on other pages

- `fumadocs/content/docs/guides/quickstart.mdx`: generalize the description and authentication wording (FB-003).
- `fumadocs/content/docs/index.mdx` (home): the "API Reference" card links only to V3, the same gap F2 raised on this page; "Legacy API (v1/v2)" and "v1/v2" break the V1/V2 naming rule in `guideline.md`.
- Integration Guides has no index page, so the Overview's "Integration guides" card links to the first guide (Sync your ERP). Consider adding a section index page as the entry point.
- The Overview now links to `guides/migrating-to-v3/` and the V1/V2 reference, both still marked "Draft, blocked on flags" in `information-architecture.md`.

---

## The Plytix data model

**Page:** `fumadocs/content/docs/guides/data-model.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-13 | David, written review ("Required corrections", "Points requiring confirmation", "Suggested improvements") | 7 (F1, F2, F4, F5, F6, F7, F8) | 2 (F3, pending a live retest; F9, belongs on the Quickstart, see FB-003) | 4 |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-004 | Resolved | F3: "The statement that _fields only works on search conflicts with both the OpenAPI, which includes it on GET /products/{identifier}, and the October 8 internal documentation… If testing shows that it is ignored, flag the implementation discrepancy for our dev team." Raised again on the Endpoint mapping page (F2a, 2026-10-14): "Use GET /api/v3/products/{identifier}?_fields=assets or categories, or add an explicit product filter." That page uses a filtered search for now. Raised again on the Sync your ERP page (F4, 2026-10-14): "Update the product-read example with the required _fields parameters." That guide requests relations on the search for the same reason. Raised again on the Export your full catalog page (F8, 2026-10-14): "Remove the troubleshooting statement that _fields is ignored on individual GETs; the current specification supports it on GET /products/{identifier}." That page's accordion is unchanged until the retest. | Our live tests (last reconfirmed 2026-09-22) found `_fields` ignored on `GET /products/{id}` and `GET /product-attributes/{id}`: the full product always came back. The 2026-10-02 spec and the October 8 documentation both say it's supported. The page is unchanged until we retest. | `config/api-testing.config.md` → quirk #24: "`_fields` is ignored on single-resource `GET /{resource}/{id}`"; `openapi_pimv3_20261002 (Latest spec).json` → `GET /api/v3/products/{identifier}` parameter `_fields`; `_API V3 - 08_10_2026.pdf` → "GET /api/v3/products/{product_id}?_fields=sku 200" | WriteChoice will retest. If `_fields` is still ignored on single-product requests, is that a bug to be fixed, or should the spec drop the parameter there? | 2026-10-13 | 2026-10-15: retested: `GET /products/{id}?_fields=sku` returns only `sku` (`200`), so the 2026-09-22 finding is stale and config quirk #24 is marked superseded. The Endpoint mapping page now uses the product subpath and `_fields`, and the "doesn't narrow a single-product lookup" accordion was removed from the export guide. No question for Plytix. |
| FB-005 | Open | F2: "/api/v3/product-family-models and the parent_attribute_labels, variant_attribute_labels, and no_level_attribute_labels fields are not present in the OpenAPI." Raised again on the Reconstruct parent/variant hierarchies page (F3, 2026-10-14): "/api/v3/product-family-models/{family_id} is absent from the October 13 OpenAPI. Please use the documented family attribute endpoints or family_attributes expansion." That page now reads `/product-families/{id}/attributes`; the endpoint returned `404` live on 2026-10-13 (quirk #111). | The endpoint was in the earlier spec and returned real data in our 2026-09-08 tests. It's absent from the 2026-10-02 spec, which documents family attributes instead. The page now uses `family_attributes`. | `bruno-collection/13-Product-Families/README.md`; `openapi_pimv3_20261002 (Latest spec).json` → `ProductFamilyOutputDto.family_attributes`, `FamilyAttributeOutputDto.level` | Has `/api/v3/product-family-models` been retired, or is it only missing from the spec? If retired, we'll remove its generated reference pages. | 2026-10-13 | 2026-10-15: `GET /api/v3/product-family-models` now returns `404 NotFoundError` on the dev account (it returned data on 2026-09-08). The question stands, now with this evidence. |
| FB-006 | Resolved | F6: "ProductUpdateInputDto explicitly describes assets as being managed through media attributes… Please distinguish asset creation, thumbnail assignment, and media attribute updates." Raised again on the Endpoint mapping page (F7, 2026-10-14): "Confirm media/media-gallery attribute workflows before saying asset assignment must remain on v1." Raised again on the Safely remove page (F2, 2026-10-14): "Please confirm the public media/media-gallery workflow before stating that thumbnail_id is the only asset-related write." That page now follows the spec and says the value format is unconfirmed. Raised again on the Not migrated and new in V3 page (F2, 2026-10-14): "Please confirm the supported media/media-gallery workflow before classifying assignment as unavailable in v3." That page now lists it as an unconfirmed V3 alternative. | The page now says other assets connect through media and media gallery attributes, following the spec. We haven't tested writing an asset to a media attribute through the API, and the expected value format isn't documented. There's no asset link/unlink endpoint (`POST /products/{id}/assets` returns `405`). | `openapi_pimv3_20261002 (Latest spec).json` → `ProductUpdateInputDto`: "Assets are managed through media attributes."; `config/api-testing.config.md` → quirk #96 | What value does a media or media gallery attribute accept in a product `PATCH` (an asset ID, a list of IDs, an object)? Do assets set that way appear in the product's `assets` field? | 2026-10-13 | 2026-10-15: tested: a media attribute takes the asset ID as a bare string (`PATCH .../attributes/main_image` with `"<id>"` returns `204` and stores `["<id>"]`; an array returns `422`), and a media gallery attribute takes an array (a bare string returns `422`). The asset then appears in the product's `assets`. `DELETE` on the attribute clears it and the asset leaves `assets`. The Endpoint mapping, Not migrated and Migrating to V3 pages now say so. Not tested: removing one asset from a gallery. |
| FB-007 | Resolved | F8: "Distinguish configuring Formula/Completeness attributes from directly writing their calculated product values." | The page now says you configure these attributes on the attribute definition and Plytix calculates the values. We haven't confirmed what happens if a client writes a calculated value directly on a product. | `openapi_pimv3_20261002 (Latest spec).json` → `FormulaAttributeCreateInputDto`, `CompletenessAttributeCreateInputDto`; `config/api-testing.config.md` → #30 (completeness values appear automatically) | If a product `PATCH` includes a value for a formula or completeness attribute, is it rejected, ignored, or stored? | 2026-10-13 | 2026-10-15: tested: `PATCH /products/{id}` with `attributes` holding a Completeness (`website_ready`) or Formula (`price_in_usd`) value returns `204` and the stored value doesn't change, so it is ignored. The single-attribute path returns `422`. The page wording is consistent with this. No question for Plytix. |

### Possible stale or inconsistent source material

- `_fields` on single-resource `GET`: live finding (2026-09-22) vs. 2026-10-02 spec and October 8 documentation (FB-004).
- `/api/v3/product-family-models`: in the superseded `openapi_pimv3.json` and earlier live tests, absent from the 2026-10-02 spec (FB-005).

### Follow-ups on other pages

- `.claude/skills/writer/references/glossary.md`, Variant entry (line 303): still says "Plytix supports up to four levels". Align with F1.
- `fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx`: check for the four-levels wording and any `product-family-models` reference. (Done 2026-10-14: the `product-family-models` step was replaced with family attributes in that page's feedback run.)
- `fumadocs/content/docs/reference/v3/productfamilymodels/`: generated from the superseded spec; remove or regenerate depending on FB-005.
- Run the `endpoint-tester` skill on `GET /api/v3/products/{id}?_fields=sku` (FB-004) and on a product `PATCH` that sets a media attribute (FB-006).

---

## Searching and pagination

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/searching-and-pagination.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required changes" 1-8, "Suggested improvement") | 8 (F1, F2, F3, F4, F5, F6, F7 note, F9) | 2 (F7 keyset paging, unverifiable; F8, belongs on the authentication pages) | 5 |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-008 | Open | "This review uses the October 13 OpenAPI as the current v3 reference." Raised again on the Filter operators page (2026-10-14): "This review uses the October 13 OpenAPI and the supplied legacy documentation." Raised again on the Responses and updates page (F0, 2026-10-14): "The explanation of empty 204 responses is useful and matches the October 13 OpenAPI." Raised again on the Endpoint mapping page (F1, 2026-10-14): "The October 13 specification documents detachment through PATCH /api/v3/products/{variant_id} with {"parent_id": null}." Raised again on the Sync your ERP page (2026-10-14): "Please address the following before approval, using the October 13 OpenAPI and the confirmed project decisions." Raised again on the Export your full catalog page (2026-10-14): "Please address the following before approval, using the October 13 OpenAPI." Raised again on the Reconstruct parent/variant hierarchies page (F3, 2026-10-14): "absent from the October 13 OpenAPI". Raised again on the Not migrated and new in V3 page (2026-10-14): "This review uses the October 13 OpenAPI." That page is now dated against the 2026-10-02 spec. | The newest spec we hold is dated 2026-10-02. Every V3 statement on the page was verified against that file, so any change made between October 2 and October 13 is not reflected yet. | `openapi_pimv3_20261002 (Latest spec).json` | Could you share the October 13 OpenAPI file, and let us know where new versions are published so we can always check against the current one? | 2026-10-14 | |
| FB-009 | Resolved | F3: "It also supports repeated `_sort_by` parameters, applied in the supplied order." | The October 8 documentation agrees that `_sort_by` can repeat, but gives the limit as "max XX". The October 2 OpenAPI declares `_sort_by` as a single string (`anyOf: [string, null]`), and we have not tested repetition against the live API. The page now documents repetition. | `materials/api-references/v3-reference/API V3 - status map (08_10_2026).md` → "`_sort_by` can repeat (max XX)"; `openapi_pimv3_20261002 (Latest spec).json` → `GET /api/v3/products`, parameter `_sort_by` | How many `_sort_by` parameters can one request carry, and will the OpenAPI be updated to declare `_sort_by` as a list? | 2026-10-14 | 2026-10-15: partly answered: sorting by several different fields works in the order sent (`_sort_by=product_level&_sort_by=-sku` confirmed), and repeating the same field returns `400 Sorting by 'sku' more than once is not allowed.` The Searching and pagination guide now says so. Remaining question: is there a limit on how many fields, and will the spec declare `_sort_by` as a list? 2026-10-15: tested: 11 different fields sorted together (`sku`, `id`, `status`, `created`, `modified`, `product_level`, `num_variations`, `label`, `gtin`, `parent_id`, `product_family_id`) returned `200`, so no practical limit was found. A field you sort by must also be in `_fields` (otherwise `400`), and `thumbnail_id` can't be sorted. The guide now says so. Whether the spec will declare `_sort_by` as a list is a spec-quality point, not blocking. |
| FB-010 | Resolved | F2: "The claim that an incorrectly translated or unrecognized filter is silently ignored needs a reproducible example or dev-team confirmation. Please distinguish no filter, invalid syntax, and an unknown field/operator." Raised again on the Migrating to V3 overview (F6, 2026-10-14): "Please provide reproducible examples confirmation for the claims that… unrecognized filters are silently ignored." Live tests contradict the claim for filters: an unknown field returns `400 InvalidFieldError` ("Field 'filters' does not exist.") and an unknown operator returns `400 InvalidFilterOperator`; that page now says so. | We could not reproduce or source the silent-ignore claim, so it has been removed from the page. Our tests cover the neighbouring case only: on `_fields`, an unknown value sometimes returns `400 HiddenFieldError` and sometimes is dropped with no error. | `config/api-testing.config.md` → quirks #12 and #13; `API V3 - status map (08_10_2026).md` → "No `search_query` means get all" is marked Postponed, "Treat as unconfirmed" | On a V3 search, what does the API return for a filter on a field that doesn't exist, for an unknown operator, and for malformed bracket syntax? Is "no filter means get all" confirmed shipped behavior? | 2026-10-14 | 2026-10-15: tested: an unknown filter field returns `400 InvalidFieldError` ("Field 'x' does not exist.") and an unknown operator returns `400 ValueError` listing every valid operator. Neither is silently ignored, so the claim stays off the page. A search with no filter returns all records. No question for Plytix. |
| FB-011 | Resolved | F7: "The October 8 internal document describes ID-based keyset paging using `_sort_by=id`, `_page=1`, and `id[gt]=<last_id>`." | No file we hold mentions keyset paging, `id[gt]` traversal, or a last-ID cursor, including our summary of the October 8 document, whose pagination section lists only `_page`, `_page_size`, and `_sort_by`. The page documents the stability risk without this technique. | `materials/api-references/v3-reference/API V3 - status map (08_10_2026).md` → "Pagination (p. 10)" | Could you point us to the section describing ID-based keyset paging? Is it a recommended pattern for large exports, and is `id[gt]` supported on every searchable resource? | 2026-10-14 | 2026-10-14: found in the October 8 PDF itself (pagination section, p. 10), which our summary had left out: "For large exports while the catalog is being edited use keyset paging on `id`: keep `_page=1`, sort by `id`, and pass the last id received as `id[gt]`." The open part (live support for `_sort_by=id` and `id[gt]`) moves to FB-029. |
| FB-012 | Open | F6: "Please report HTTP pagination links as an environment issue to resolve, rather than a permanent API convention." | Confirmed live on 2026-10-01: `next_page` and `previous_page` come back as `http://` URLs that `301` to `https`, and clients that drop `Authorization` across the redirect get a `401`. The page now recommends rewriting the scheme and describes the behavior as temporary. Raised again on the Export your full catalog page (F6, 2026-10-14): "Treat HTTP pagination links as an environment issue to resolve… remove --location-trusted or unrestricted forwarding of authorization headers as general workarounds." Still `http://` in the 2026-10-13 retest (quirk #115). | `bruno-collection/02-Products-v3/List Products.bru` → "401 - Following next_page Verbatim Drops Auth"; `config/api-testing.config.md` → quirk #92 | Is the `http://` link generation scheduled to be fixed, and in which environments does it occur? We would like to drop the workaround from the docs once it is resolved. | 2026-10-14 | 2026-10-15: re-checked: `pagination.next_page` is still an `http://` URL on the dev host. |

### Possible stale or inconsistent source material

- `_sort_by` cardinality: October 8 documentation and the October 13 OpenAPI say it repeats; our October 2 OpenAPI declares a single string (FB-009).
- `Pagination` schema: the October 2 OpenAPI types `next_page` and `previous_page` as `string | null`, while live responses on 2026-10-01 omitted the keys entirely. The page now covers both.
- V1/V2 pagination limits are documented per endpoint: product search (V1 and V2) and category search state the 100 maximum, while asset, attribute, and relationship search state nothing.

### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/authentication-and-base-urls.mdx` (line 3) and `fumadocs/content/docs/guides/migrating-to-v3/index.mdx` (line 229): remove the "token flow shared by the V1/V2 and V3" wording, per F8 and FB-002. Done for `authentication-and-base-urls.mdx` on 2026-10-14; done for `index.mdx` on 2026-10-14 in its own feedback run.
- `fumadocs/content/docs/reference/v3/pagination.mdx`: add the repeated `_sort_by` parameter and the lower `_page_size` bound of 1 once FB-009 is answered; line 14 states the keys are "never `null`", which should match this page's wording.
- `fumadocs/content/docs/guides/exporting-your-full-catalog.mdx` (line 49): same "the key is absent, not `null`" wording to align.
- Run the `endpoint-tester` skill on a repeated `_sort_by` request (FB-009) and on a filter using a nonexistent field and an unknown operator (FB-010).

---

## Filter operators

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/filter-operators.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required corrections" 1-4, "Coverage and clarification" 5-7) | 13 (F1a, F1b, F1c, F2, F3, F4a, F4b, F4c, F5a, F5b, F6, F7a, F7b) | 1 (F7c, already aligned) | 5 |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-013 | Resolved | F1: "Confirm case sensitivity before choosing between v3 contains and contains:ignorecase." | The legacy operator table says `eq` and `!eq` ignore case for text, but says nothing about case for `like`. `!like` isn't in the API operator table, though it appears in usage data and in stored list queries. The page now lists both V3 forms for `like` and `!like` and asks readers to test. | `materials/api-references/v1-reference/Plytix_pimv1.postman_collection.json` → "Standard filter operators", `like`: "Contains check. Check if supplied string is contained within value"; `materials/project-references/brief/before-writing.md` → `like` / `!like`, 6% of uses | Is legacy `like` (and `!like`) case-insensitive, like `eq`? Which V3 operator returns the same results: `[contains]` or `[contains:ignorecase]`? | 2026-10-14 | 2026-10-15: narrowed: V3 has no `like` or `!like` operator (the `400` for an unknown operator lists the valid ones), and the page maps legacy `like` to the V3 `contains` forms, which is accurate. Only the legacy half remains: is V1/V2 `like` case-insensitive? Testing needs the "API Docs" credentials, which `bruno-collection/.env` doesn't hold. 2026-10-19: resolved by Plytix's action list (PM-17, PM-54). In their Dev test, V1/V2 `like` matched `ALPHA` against `AlphaBeta` and `alphabeta`, the same records as V3 `[contains:ignorecase]`; plain `[contains]` didn't. `!like` maps to `[!contains:ignorecase]` combined with `[!exists]` in one OR group, because V3 negations skip records with no value. `filter-operators.mdx` and `filtering-query-syntax.mdx` are updated. |
| FB-014 | Open | F5: "Add or explicitly mark the migration status of !like and text_search. Please also verify the 'Not available' labels for length-based filtering against the relevant legacy operators." | V3's own operator list has no `text_search`. The page offers an OR group of `contains` filters as the nearest form, marked as unconfirmed. The legacy API operator table lists no length operator, but the filter usage analysis mentions "length operators" and `last_days` among advanced filters. The page now says "No confirmed direct equivalent" for both. | `config/api-testing.config.md` → quirk #99 (full V3 operator list); `before-writing.md` → "Advanced operators (`gt`, `lt`, `last_days`, length operators)"; Postman → `text_search`: "Item list must be provided as 'field' value" | Is there a planned V3 replacement for `text_search`, and does an OR group of `contains:ignorecase` filters return the same results? Do legacy API searches accept length operators or `last_days`, and if so, under what names? | 2026-10-14 | 2026-10-15: confirmed: V3 accepts no `text_search`, `like` or `!like` operator (valid list: `contains`, `contains:ignorecase`, `eq`, `exists`, `gt`, `gte`, `in`, `includes`, `intersects`, `lt`, `lte`, `null`, and `!` forms). The question about a planned replacement and legacy length operators stands. |
| FB-015 | Open | F4: "An absent field, null, an empty string, and an empty list are distinct cases. Confirm how legacy exists/!exists and negated comparisons translate for each case." Raised again on the Audit product data quality page (F1, 2026-10-14): "Please do not claim that [length]=0 also matches missing fields unless that behavior has been confirmed. Where the audit must capture absent, null, and empty values, show the appropriate OR combination." That page now combines `[!exists]`, `[null]`, and `[length]=0` in one OR group. | The legacy docs define `exists` and `!exists` only as "defined" and "undefined". V3 documents separate checks for undefined, `null`, and empty (`[length]=0`). On one tested attribute, `[!exists]=true` and `[length]=0` returned the same 16 products, so V3 may treat empty values as undefined in some cases. | Postman → `exists`: "True when the item has its value defined"; `API V3 - status map (08_10_2026).md` → "Filters" table; `config/api-testing.config.md` → quirk #100 | In V1/V2, does `!exists` match a `null`, an empty string, or an empty list? Do `!eq` and `!in` include records where the field is missing? In V3, does `[!exists]` also match empty strings and empty lists? | 2026-10-14 | 2026-10-15: V3 half answered: a text attribute set to `""` or to spaces is stored as absent (POST, whole-map PATCH and subpath all behave the same), so `[!exists]=true`, `[length]=0` and `[eq]=` return the same records, `[trim][length]=0` matches the same set, and `[null]` returns nothing. The Responses and updates page row on empty values was corrected. Only the legacy half remains: in V1/V2, does `!exists` match a `null`, an empty string or an empty list? 2026-10-19: partly answered by Plytix's action list (PM-26, PM-54). V3: cleared and never-set values both match `[!exists]` and `[length]=0`, and neither matches `[null]`, which matches our result. V1/V2: the tested V1 negations kept records with no value (PM-54 shows this for `!like`, whose V3 recipe needs `[!exists]`). Still open: whether V1/V2 `!exists` matches a `null`, an empty string, or an empty list. |
| FB-016 | Resolved | F6: "Please verify when in, includes, or intersects preserves the legacy behavior, rather than presenting one universal translation for every attribute type." Raised again on the Migrating to V3 overview (F4, 2026-10-14): "Please also verify the category filter against v3's related-entity structure, including whether it should target categories.id." That page now uses `categories.id[intersects]=<id>`, following the spec's traversal structure; untested live. | Legacy `in` applies to multiselect and dropdown attributes (case-sensitive) and to `categories`. V3 documents `[in]` for single values and `[intersects]` for lists. `[intersects]` is confirmed live on `categories.name`, but `[in]` on a list field has never been tested. `includes` and `!includes` appear in the API's operator list and in no Plytix document. | Postman → `in`: "Multiselect and Dropdown attributes are case sensitive"; `config/api-testing.config.md` → quirks #99 and #100 | For a multiselect attribute or `categories`, which V3 operator returns the same records as legacy `in`: `[in]`, `[intersects]`, or `[includes]`? What do `includes` and `!includes` do? | 2026-10-14 | 2026-10-15: narrowed: on `categories.name`, `[in]`, `[includes]`, `[intersects]`, `[eq]` and `[contains]` all return the same single record for one value, and `[in]=A,B` (comma) returns nothing. Remaining question: what is the multi-value syntax, and do the operators differ for several values? 2026-10-15: tested: repeating the parameter (`categories.name[in]=A&categories.name[in]=B`, `sku[in]=X&sku[in]=Y`) returns the union (OR). A comma-separated value and a JSON list both return nothing. For one value `[in]`, `[includes]`, `[intersects]` and `[eq]` return the same records on a list field. |
| FB-017 | Open | F3: "Confirm that the relationship, product, and quantity predicates match the intended association." | The path `product_relationships.related_products.related_product_id` matches the 2026-10-02 spec and the October 8 documentation, and the page now uses it. We haven't tested this filter live. The October 8 documentation itself warns that, in a related form, "the link could belong to a different relationship". In V1, each `product_ids` object ties the product to its quantity condition. | `openapi_pimv3_20261002 (Latest spec).json` → `ProductRelationshipModelOutputDto.related_products` → `RelatedProductModelOutputDto { related_product_id, quantity }`; `API V3 - status map (08_10_2026).md` → "Related entities filtering" | When a V3 search combines `relationship_id`, `related_products.related_product_id`, and `related_products.quantity`, do all three conditions apply to the same related product within the same relationship? | 2026-10-14 | 2026-10-15: partly answered: the page's filter path was wrong. `product_relationships.related_products.related_product_id` (and `product_relationships.related_product_id` on the reference page) return `400 Field does not exist`; the valid fields are `product_relationships.relationship_id`, `product_relationships.related_products.product_id` and `product_relationships.related_products.quantity`. Both pages are corrected. On seed data, combining `relationship_id` with `product_id` matches only products whose link to that product is under that relationship, which supports same-link matching. Not verified: whether `product_id` and `quantity` match the same related product, because relationship writes are failing (see FB-024) and the seed quantities are all `1`. |

### Possible stale or inconsistent source material

- The case-insensitive V3 operator changed from `icontains` (live 2026-10-01) back to `contains:ignorecase` (live 2026-10-08). `filtering-query-syntax.mdx` still shows `name[icontains]=a` in its encoding callout.
- The legacy API operator table omits `!like`, while the brief's usage data and live stored list queries both use it.
- This review also cites the October 13 OpenAPI (see FB-008).

### Follow-ups on other pages

- `fumadocs/content/docs/reference/v3/filtering-query-syntax.mdx` (line 39): replace the `name[icontains]=a` example, which the API now rejects. Line 119 uses `categories[in]`, which hasn't been tested on a list field; revisit after FB-016.
- `fumadocs/content/docs/guides/migrating-to-v3/searching-and-pagination.mdx` (line 74): added `--globoff` to the curl example in this run. Without it, curl rejects `created[gt]` as a bad URL range. That bug came from the 2026-10-14 run on that page.
- `fumadocs/content/docs/reference/legacy/filtering-and-search.mdx`: check its operator list against the Postman "Standard filter operators" table (`like`, `text_search`, no `null`/`!null`).
- Run the `endpoint-tester` skill on a combined `product_relationships` filter (FB-017), `[in]` versus `[intersects]` on a multiselect attribute (FB-016), and `[!exists]` versus `[null]` versus `[length]=0` on an attribute holding an empty string (FB-015).

---

## Responses and updates

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/responses-and-updates.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required changes" 1-6, "Suggested improvements" 1-4) | 15 (F1, F2a, F2b, F3a, F3b, F3c, F4, F5a, F5b, F5c, F6a, F6b, F7, F8, F9) | 3 (F2c, handled in sources, see FB-018; F5d, already aligned; F10, belongs on other pages) | 4 (plus F0 added to FB-008) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-018 | Open | F2: "Reconcile the older internal document's ID-only wording with the latest specification." Raised again on the Migrating to V3 overview (F3, 2026-10-14): "The October 2 OpenAPI defines a product creation DTO under data, while the October 8 internal document describes a 201 response containing the ID." That page now follows the spec and live tests. | The internal API V3 documents say a create returns `201` with only the new ID. The 2026-10-02 OpenAPI defines a full creation representation (for products, `ProductCreateOutputDto`, "without relationship expansions"), and our live test on 2026-10-01 returned the full created product. The page now follows the spec. | `materials/api-references/v3-reference/API V3.md` line 222 → "the response body will include the **ID of the created or modified entity**"; `API V3 - status map (08_10_2026).md` line 146 → "returns 201 `{id}`"; `openapi_pimv3_20261002 (Latest spec).json` → `CreateProductsResponse.data` → `ProductCreateOutputDto`; `config/api-testing.config.md` → quirk #84 | Is the creation representation (the record without relationship expansions) the intended, final contract for every resource's create? If so, could the internal API V3 document be updated to drop the ID-only wording? | 2026-10-14 | |
| FB-019 | Open | F3: "The claim that PATCH deletes every omitted attribute is significant and is not established by the input schema alone. Please provide a minimal before/after example or dev-team confirmation." Raised again on the Migrating to V3 overview (F6, 2026-10-14): "Please provide reproducible examples confirmation for the claims that PATCH replaces the entire attributes map." That page now links the before-and-after example and adds the concurrency caveat. | Confirmed live on 2026-10-01 with a controlled test: after setting `brand` and `care_instructions`, a PATCH naming only `brand` removed `care_instructions` from the product. Top-level fields merge as expected. The page now shows this before/after example. No Plytix source says whether the replacement is intended. | `config/api-testing.config.md` → quirk #85: "`care_instructions` is **gone from the record entirely**"; `openapi_pimv3_20261002 (Latest spec).json` → `ProductUpdateInputDto.attributes` ("Custom product attributes", no merge or replace rule) | Is replacing the whole `attributes` map on PATCH the intended behavior, or should it merge? If intended, could the spec's `attributes` description state it? | 2026-10-14 | 2026-10-19: partly answered by Plytix's action list (PM-52). Their Dev test shows `PATCH /products/{identifier}/attributes` merges a partial map while the root PATCH replaces it, so the safe route for partial changes is now documented on Responses and updates, Update and delete records, and Sync your ERP (retest tracked under FB-047). Still open: whether the root replace is intended, and whether the spec will state it. |
| FB-020 | Resolved | F3: "Verify the single-attribute PATCH payload." Raised again on the Sync your ERP page (F5, 2026-10-14): "Verify the single-attribute PATCH example and keep this guide consistent with the reference." That guide's example sends a number (`34.99`) to a decimal `price` attribute. Raised again on the Migrating to V3 overview (F6, 2026-10-14): "document the confirmed single-attribute update alternative." That page uses the bare JSON value form, confirmed for strings only. | A bare JSON string sent to `PATCH /products/{id}/attributes/brand` returned `204` and changed only that attribute (live, 2026-10-01). The OpenAPI declares no request body for `PATCH /api/v3/products/{identifier}/{path}`, and we haven't tested numbers, lists, or other attribute types on this path. | `config/api-testing.config.md` → quirk #87: "`-d '"BrandViaSubpath"'` on `.../attributes/brand` → `204`"; `openapi_pimv3_20261002 (Latest spec).json` → `PATCH /api/v3/products/{identifier}/{path}` (no `requestBody`) | Is the bare JSON value the documented body for every attribute type (numbers, multiselect lists, media)? Will the spec declare a request body for this path? | 2026-10-14 | 2026-10-15: partly answered: a Decimal attribute needs the bare value as a string (`"12.5"` returns `204`, the number `12.5` returns `422`), and `null` removes a text value (`204`). A MultiSelect attribute returned `422 product data validation failed` for a string and for a list of strings. Remaining question: what value does a multiselect, dropdown or media attribute accept? 2026-10-15: tested: Decimal takes a string (`"12.5"`), a media attribute takes a bare asset ID string, a media gallery attribute takes an array of IDs, and a MultiSelect attribute takes an array of its configured option labels (`["Cotton"]` returns `204`; a bare string, an object, or labels that aren't options return `422`). Dropdown wasn't tested. |
| FB-021 | Open | F5: "Distinguish deleting a resource, deleting an attribute override, and unlinking an association. Keep the inheritance explanation for attribute deletion." | The page now separates the three. That deleting a variant's attribute override shows the parent's value again rests on one design-document sentence. We can't test it, because automatic inheritance is disabled on the dev account. **Retested 2026-10-14, still gated:** creating a family with `parent_attributes` still returns `403 Forbidden`, "Automatic inheritance is not available for this account". On scratch products without inheritance, a variant didn't receive the parent's `brand`. After `PATCH .../attributes/brand` (`204`) the variant showed its own value. After `DELETE .../attributes/brand` (`204`) the key was gone from the variant: not `null` and not the parent's value. `overwritten_attributes` stayed `[]` throughout. That fits the "doesn't set null" half of the sentence, but the inheritance half still can't be observed. | `materials/api-references/v3-reference/API V3.md` line 232 → "it doesn't set null or applies defaults (it can cause inheritance to resolve for the field)"; `config/api-testing.config.md` → status gating #4 | When you DELETE `/products/{variant_id}/attributes/{name}` on a variant that overrides its parent's value, does the variant then show the parent's value? Could inheritance be enabled on David's Dev Account so we can confirm it? | 2026-10-14 | 2026-10-15: answered by live test, with one new question. Inheritance works when an attribute is linked at `parent_level` through `POST /product-families/{id}/attributes` (only `parent_attributes` at family create and the `PATCH` level change return `403`). A variant follows the parent's value, an override adds `attributes.<label>` to `overwritten_attributes`, and `DELETE` (or `PATCH` with `null`) leaves the variant with **no value**: it does not show the parent's value again, and the entry stays in the array. Pages corrected. New question for Plytix: is that intended, and how does a client make an overridden variant inherit again? Also: is linking at `parent_level` through `POST` meant to work on an account where automatic inheritance is "not available"? |

### Possible stale or inconsistent source material

- Create response: the internal API V3 documents (ID only) disagree with the 2026-10-02 OpenAPI and live tests (full creation representation). See FB-018.
- `PATCH /api/v3/products/{identifier}/{path}` has no declared request body in the 2026-10-02 OpenAPI, though the path works live (FB-020).
- This review also cites the October 13 OpenAPI (see FB-008).

### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/index.mdx`: line 161 ("V3 returns the full entity on a create, so code that reads a create response keeps working") and line 165 ("`201` with the full created entity") contradict F2. The "PATCH recently changed to 204" callout (lines 172-174) should be replaced, as F9 asked. Line 180 and the troubleshooting accordion (line 203) recommend read-merge-write without the concurrency caveat from F4. (Done 2026-10-14 in that page's feedback run: create shape per operation, callout removed, concurrency caveat added.)
- `fumadocs/content/docs/reference/v3/updates-and-deletes.mdx`: lines 12, 38, and 42 say POST returns "the full created record". Lines 57 and 66 recommend read-merge-write and show a bare `34.99` number body, which we haven't tested (FB-020). Line 98 says field-level POST works on attributes, but the October 8 status map marks field-level POST as Postponed.
- Run the `endpoint-tester` skill on a single-attribute PATCH with a number and with a list value (FB-020).

---

## Authentication and base URLs

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/authentication-and-base-urls.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required changes" 1-5) | 9 (F1a, F1b, F1c, F2a, F2b, F3, F4a, F4b, F5a) | 1 (F5b, belongs on `index.mdx`) | 0 new (F1-F3 added to FB-002) |

### Flags

No new flags. The pending V3 authentication model is tracked under FB-002 in the Overview section. The V3 note on this page links to `/docs/reference/v3/authentication` as a placeholder until Plytix publishes the new model.

### Possible stale or inconsistent source material

- `fumadocs/content/docs/reference/legacy/token-authentication.mdx` (line 9) says "The flow is the same one V3 uses, so a token from this exchange works against V1/V2 and V3." This page now links to it, so it should match David's feedback.
- `fumadocs/content/docs/reference/v3/authentication.mdx` documents the V1/V2 key-and-password exchange as the V3 flow, and is the placeholder target of this page's V3 note (FB-002).
- V2 sharing the V1 flow rests on `openapi_pimv1.json` (`servers`, `bearerAuth`). No V2 request has been tested live.

### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/index.mdx`: line 10 ("Your authentication doesn't change either way"), line 52 ("Both versions take the same bearer token…"), lines 55-57 (step 2 "Keep your authentication as it is", linking to the V3 Authentication page and the Quickstart), and the card description at line 229 still describe a shared flow (F5b). (Done 2026-10-14 in that page's feedback run.)
- `fumadocs/content/docs/reference/legacy/token-authentication.mdx`: remove the "same one V3 uses" sentence (line 9). The Related resources card to the Quickstart also points V1/V2 readers to the pending V3 Quickstart (F4b).
- `fumadocs/content/docs/reference/v3/authentication.mdx`: replace with a pending notice, or rewrite once the V3 model is published (FB-002).

---

## Endpoint mapping

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/endpoint-mapping.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required corrections" 1-6, "Other points to confirm" 7-8) | 14 (F1a, F1b, F2a in part, F2b, F3, F4, F5b, F5c, F6a, F7, F8a, F8b, F8c, F8d) | 2 (F5a, conflicting sources; F6b, already aligned) | 5 new (plus F2a added to FB-004, F7 to FB-006, F1 to FB-008) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-022 | Resolved | F1: "DELETE /api/v1/products/{parent_product_id}/variant/{variant_id} unlinks the variant from its parent… The October 13 specification documents detachment through PATCH /api/v3/products/{variant_id} with {"parent_id": null}." | The page now maps the V1 unlink to `PATCH` with `"parent_id": null`, and the V1 link to `PATCH` with `parent_id`. Both follow the October 2 spec, but we haven't tested either live. The V1 docs warn that unlinking "might cause data loss". | `openapi_pimv3_20261002 (Latest spec).json` → `ProductUpdateInputDto.parent_id`: "null detaches the product from its current parent"; `openapi_pimv1.json` → `DELETE /api/v1/products/{parent_product_id}/variant/{variant_id}`: "Variant becomes a Single product. ⚠️ This action might cause data loss" | When a variant is detached with `"parent_id": null`, what happens to the attribute values it inherited from the parent? Does linking an existing product with `parent_id` keep the V1 rules (variant must be a single product, same family or unassigned)? | 2026-10-14 | 2026-10-15: mostly answered: `PATCH` with `{"parent_id": null}` returns `204`, `parent_id` is removed, `product_level` returns to `0`, the variant's own values are kept and the parent's `num_variations` drops. `PATCH` with a `parent_id` relinks (`204`, level `2`). Remaining question: when a variant that inherited values is detached, which values does it keep? (Not tested: the scratch variant held its own value, no inherited one.) 2026-10-15: tested with inheritance: after `PATCH` with `{"parent_id": null}`, a variant that had inherited `brand` from its parent has no `brand` (the inherited value isn't kept), `product_level` is `0`, its family is kept and `overwritten_attributes` is empty. |
| FB-023 | Open | F5: "Please recheck the legacy /unlink method and the /product/ versus /products/ path spelling against the definitive legacy reference. The public documentation shows differences from this table." | The V1 Postman collection disagrees with itself. Its request definitions use `POST .../relationships/{relationship_id}/unlink` and `PATCH .../relationships/{relationship_id}/product/{related_product_id}`, and the page follows them. The collection's overview table lists `/unlink` as `PATCH` and the path as `.../products/{id}`. Neither form has been tested live. The Not migrated and new in V3 page (F6, 2026-10-14) now refers to the V1 `/unlink` path without naming its method. | `materials/api-references/v1-reference/Plytix_pimv1.postman_collection.json` → request "Remove products from a relationship" (`POST`) and "Modify relationship attributes" (`.../product/:related_product_id`); same file, collection description, Products table rows `/products/id/relationships/id/unlink \| PATCH` and `/products/id/relationships/id/products/id \| PATCH` | Which method does `/unlink` accept, and is the related-product path `/product/{id}` or `/products/{id}`? Which document should we treat as the definitive V1 reference? | 2026-10-14 | |
| FB-024 | Open | F5: "For individual related-product updates, include the required v3 payload and confirm how other related products are preserved." Raised again on the Safely remove page (F1, 2026-10-14): "it is not an operation for removing just one related product." That page now says so in its introduction. | The V3 `PATCH` body `{"related_products": [{"product_id": "...", "quantity": N}]}` is confirmed live, but only on a link with one related product. We don't know whether related products left out of the array are kept or removed. V3's `DELETE` removes every related product under the relationship, and we found no V3 way to remove a single one. The page tells readers to send every related product they want to keep. | `bruno-collection/17-Product-Relationships/Manage Product Relationship Link.bru` → "PATCH (Update quantity)" and "this only removes the entire relationship-type link" | Does `PATCH /api/v3/products/{product_id}/relationships/{relationship_id}` merge `related_products` or replace the list? How should a client remove one related product while keeping the others? | 2026-10-14 | 2026-10-15: worse than before: on 2026-10-15 `POST /products/{id}/relationships` and `POST /products/{id}/relationships/{relationship_id}` both returned `405 Method Not Allowed`, `PATCH` on the relationship returned `422 relationships: Extra inputs are not permitted`, and `GET /products/{id}/relationships` returned `404 Field 'relationships' does not exist`. The spec declares all of them, and `POST` worked on 2026-09-15. The Endpoint mapping page now carries a warning. New question for Plytix: what is the current contract for creating and updating a product's relationships? |
| FB-025 | Open | F4: "Add the appropriate family filter and verify that the returned associations, levels, and expanded attribute definitions preserve the legacy operation's meaning." | The page now maps `all_attributes` to `GET /api/v3/family-attributes?product_family_id=<id>`, a filter confirmed live. The V1 endpoint includes system attributes; we haven't checked whether V3 does. | `openapi_pimv1.json` → `GET /api/v1/product_families/{product_family_id}/all_attributes`: "including system attributes"; `config/api-testing.config.md` → quirk #74 | Does `GET /api/v3/family-attributes?product_family_id=<id>` (or `GET /api/v3/product-families/{id}/attributes`) include system attributes, as V1's `all_attributes` does? | 2026-10-14 | 2026-10-15: partly answered: a new family starts with 4 attributes linked at `no_level` that appear to be system attributes, so `family-attributes` seems to include them. Not confirmed by name. The question stands in a narrower form: does the V3 list include system attributes the way V1's `all_attributes` does? |
| FB-026 | Resolved | F2: "Also explain the response-shape difference between a product with expanded relations and a relation subpath." | `GET /api/v3/products/{identifier}/assets` and `.../categories` returned an empty array for products with confirmed links. A filtered search with `_fields=assets` returned the real data. The page explains both shapes and recommends the filtered search until the subpaths are fixed. | `config/api-testing.config.md` → quirk #80 (2026-09-23): subpaths "always returning an empty array regardless of real, confirmed linkage" | Are the `/products/{id}/assets` and `/products/{id}/categories` subpaths expected to return the linked records? If so, is the empty result a known regression? | 2026-10-14 | 2026-10-15: retested: `GET /products/{id}/assets` and `.../categories` return the linked records again (`200`), so config quirk #80 is marked superseded. The Endpoint mapping page now maps the V1 reads to the subpaths. Recheck before publishing, because this has flipped before. No question for Plytix. |

### Possible stale or inconsistent source material

- `FamilyAttributeOutputDto` in the 2026-10-02 OpenAPI still declares `account_id`, but live tests (2026-10-08) reject `account_id` as a field and filter on `/family-attributes`, `/product-relationships`, and `/related-products` (`400 InvalidFieldError`). The review says the October 13 DTOs no longer have it (see FB-008).
- V1 Postman collection: request definitions and the overview table disagree on the relationship unlink method and path (FB-023).
- `config/api-testing.config.md` quirk #80 (empty subpaths) dates from 2026-09-23 and hasn't been retested (FB-026).

### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/index.mdx`: line 33 presents V3's relationship `DELETE` as the counterpart of V1 `/unlink` (it removes the whole association). Line 34 says variants are created with `parent_id` and `product_family_id` (the family is inherited). Line 41 says asset linking is "not supported" (use "No dedicated endpoint" with the media-attribute note). Line 218's accordion title uses "v3". (Lines 41 and 218 done 2026-10-14 in that page's feedback run; lines 33 and 34 still open.)
- `fumadocs/content/docs/guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx`: line 17 (asset rows, same wording change), line 34 (`family-attributes` described as "across families"; it narrows with `product_family_id`), line 40 (V2's `DELETE` removes listed products, the same job as V1 `/unlink`, so it isn't a new operation). (Done 2026-10-14 in that page's feedback run.)
- `.claude/skills/writer/references/information-architecture.md` line 133 lists variant endpoints as having no V3 equivalent; only resync lacks one now.
- V1 also has `POST /api/v1/product_families/{product_family_id}/all_attributes/edit`, which no row on the Endpoint mapping page covers.
- Run the `endpoint-tester` skill on: `PATCH /products/{variant}` with `"parent_id": null` and with a new `parent_id` (FB-022); a relationship `PATCH` on a link with two related products, sending one (FB-024); `GET /family-attributes?product_family_id=` compared with V1 `all_attributes` (FB-025); `GET /products/{id}/assets` (FB-026); `GET /products?id=<id>&_fields=assets` (filtering by `id` is untested).

---

## Sync your ERP

**Page:** `fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required changes" 1-6, "Recommended additions" 7-8, plus notes on deletions, bracket encoding, and import vs. incremental) | 15 (F1, F2, F3, F4, F5a, F5b, F5c, F6a, F6b, F6d, F6e, F7a-c, F8a-c, F8d, F10) | 2 (F6c and F9, already aligned) | 2 new (plus F1 added to FB-002, F4 to FB-004, the October 13 OpenAPI to FB-008, F5 to FB-020) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-027 | Open | F2: "Use full UTC timestamps, a defined run boundary, and overlap or boundary handling with deduplication." Also: "define how archives and deletions propagate, since polling existing products by modified cannot discover products already deleted." | The guide now uses a window of `modified[gte]=<checkpoint minus overlap>` and `modified[lt]=<run boundary>`, with full UTC timestamps such as `2026-10-14T08:55:00Z`. We have tested `created[gt]` with a date only. We haven't tested `modified` filters, two operators on the same field in one request, a full timestamp as a filter value, or whether `modified` advances after an attribute `PATCH` or when a product is archived. | `config/api-testing.config.md` → quirk #11: "operator filter `created[gt]=<date>` — 200"; `openapi_pimv3_20261002 (Latest spec).json` → `ProductOutputDto.modified` ("Last modification timestamp", `date-time`) | Can a search combine `modified[gte]` and `modified[lt]`, and what timestamp formats does a filter value accept (time zone, fractional seconds)? Does `modified` change when a single attribute is updated through `PATCH /products/{id}/attributes/{name}`, and when a product's status changes to `Archived`? Is there any way to list products deleted since a given time? | 2026-10-14 | 2026-10-15: mostly answered: `modified[gte]` and `modified[lt]` combine, and date-only, UTC (`Z`), fractional-second and offset timestamps are all accepted. `modified` advances after a single-attribute `PATCH` and after archiving; archived products stay in results with `status: Archived`. The ERP sync guide's flag was updated. Remaining: (1) is there any way to list products deleted since a given time? (2) an invalid date such as `not-a-date` returns `200` with an empty list instead of an error. Is that intended? |
| FB-028 | Open | F8: "Cover rate-limit handling, transient failures, partial runs, and safe retries." Raised again on the Export your full catalog page (F14, 2026-10-14): "Add a small export-loop example covering… bounded retries, and rate-limit pacing." That page's script retries `429` with backoff and paces at 20 requests per 10 seconds. Raised again on the Bulk operations for large catalogs draft (F5, 2026-10-14): "Align the code example with the guidance: it currently has no pacing or retry handling and discards the error response." That draft's loop now paces at 20 requests per 10 seconds and retries `429`, `5xx`, and failed connections. | The access token carries per-account limits (20 requests per 10 seconds, 5,000 per hour on the dev account), but 80 parallel requests in about 2 seconds all returned `200`, with no rate-limit headers and no `429`. The guide recommends pacing and backing off on `429`, and says the `429` response hasn't been captured. | `config/api-testing.config.md` → quirk #102: "Rate limits are NOT enforced on the v3 PIM host, and no PIM response carries a rate-limit header" | Are the limits in the token enforced on production V3? What does a `429` response look like, and does it carry a `Retry-After` or rate-limit header? | 2026-10-14 | 2026-10-19: Plytix's action list (PM-28) asks us not to document `Retry-After` as guaranteed until the actual V3 headers are confirmed, which is this question. The exporter now honors `Retry-After` when present and backs off with jitter otherwise. FB-046, raised for the same header, was folded into this flag. |

### Possible stale or inconsistent source material

- `.claude/skills/writer/references/style-guide.md` ("Access token step in integration guides") still tells writers to keep "the 15-minute expiry" in integration guides, which no longer fits the pending V3 authentication model.

### Follow-ups on other pages

- `fumadocs/content/docs/guides/bulk-operations-for-large-catalogs.mdx` (line 67): tells readers to "treat that response as success" when a retried `POST` returns `409`. Align it with this guide: search by SKU, confirm it's the same product, then update. (Done 2026-10-14 in that page's feedback run; the page is now an internal draft at `internal-drafts/guides/bulk-operations-for-large-catalogs.mdx`.)
- `.claude/skills/writer/references/style-guide.md`: update the access-token rule's example facts to match the version-dependent wording (FB-002).
- `fumadocs/content/docs/guides/quickstart.mdx` and `fumadocs/content/docs/reference/v3/authentication.mdx`: still present the key/password flow as V3's (FB-002, FB-003).
- Run the `endpoint-tester` skill on `modified[gte]` plus `modified[lt]` with full UTC timestamps, on whether `modified` advances after an attribute `PATCH` and after `PATCH {"status": "Archived"}` (FB-027), and on a number body for `PATCH /products/{id}/attributes/<decimal attribute>` (FB-020).

---

## Export your full catalog

**Page:** `fumadocs/content/docs/guides/exporting-your-full-catalog.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required changes": ordering, termination, HTTPS, field discovery, assets, marketplace links; "Suggested improvement": export loop, page size, full-catalog scope) | 15 (F1-F7, F9-F16) | 1 (F8, contradicted by a live test, see FB-004) | 2 new (plus F8 added to FB-004, the October 13 OpenAPI to FB-008, F6 to FB-012, F14 to FB-028; FB-011 resolved) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-029 | Resolved | F1: "Add explicit _sort_by=id and include id in the selected fields." F3: "keep _page=1, sort by id, and use id[gt]=<last_id>." | The October 8 document describes this pattern, and the status map says there is no default sort. The page now sorts by `id` and documents keyset paging as a separate method. We have tested `_sort_by=sku` and `_sort_by=-<field>`, but not `_sort_by=id`, and we haven't tested an `id` filter of any kind. | `_API V3 - 08_10_2026.pdf`, pagination section (p. 10): "use keyset paging on `id`: keep `_page=1`, sort by `id`, and pass the last id received as `id[gt]`"; `config/api-testing.config.md` → quirk #9 (`_sort_by=sku`) | Is `id[gt]` supported on every searchable resource, and do IDs compare in creation order, so that a product created during an export always sorts after the existing ones? | 2026-10-14 | 2026-10-15: tested on products: `_sort_by=id`, `_sort_by=-id` and `id[gt]=<id>` all work and follow creation order (IDs are time-prefixed). Other resources were not tested. No question for Plytix. |
| FB-030 | Open | F12: "Confirm how path can be used for file access before presenting it as a downloadable URL." | Expanded `assets` on a product search carry `path`, a storage path such as `public_files/pim/assets/.../BAG-10157_10.jpg`, with no `url`. Live asset responses have also carried `url` and `thumbnail` fields on `files.dev.plytix.com`, but neither is in the spec. The page now says `path` isn't a download URL and that downloading files is a separate step. Raised again by the Build a marketplace-specific product feed rewrite (F4, 2026-10-14): marketplace feeds usually need image links, and that guide can only tell readers to plan for them separately until this is answered. | `openapi_pimv3_20261002 (Latest spec).json` → `AssetOutputDto.path`: "Path to the file" (no `url` property); `bruno-collection/02-Products-v3/List Products.bru` (expanded assets); `bruno-collection/09-Assets/Update Asset.bru` (`url`, `thumbnail`) | What is the supported way to download an asset's file through the API? Can `path` be turned into a file URL, and will the `url` field be added to the spec? | 2026-10-14 | 2026-10-15: re-checked: `GET /assets` and `GET /assets/{id}` return only `path` (no `url` or `thumbnail`), and assets expanded on a product add `alt_text` and `downloaded_from` but still no `url`. |

### Possible stale or inconsistent source material

- `materials/api-references/v3-reference/API V3 - status map (08_10_2026).md` leaves out the keyset-paging passage and the "Follow `pagination.next_page` until it is missing" line from the October 8 PDF's pagination section (FB-011).
- `.claude/skills/writer/references/information-architecture.md` line 129 says Channels are documented as API resources (resolved 2026-10-09). `materials/api-references/endpoint-reviews/Plytix API v3 - endpoint visibility.xlsx` marks every `/api/v3/channels` operation **Internal**, and `/api/v3/pim-product-lists` **To be removed**. David's F13 agrees with the sheet.
- `_fields` on single-resource `GET`: live finding (2026-09-22) vs. the spec, the October 8 document, and David (FB-004).

### Follow-ups on other pages

- `fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx`: rewrite or remove, because its Channel workflow uses endpoints marked Internal (F13). The same applies to the Channels and PIM product lists reference pages under `fumadocs/content/docs/reference/v3/`, and to the IA note above.
- `fumadocs/content/docs/guides/migrating-to-v3/searching-and-pagination.mdx` (line 42): it can now cite keyset paging (FB-011 resolved), and it links here for "the full pattern".
- `fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx` (line 56): "Follow `pagination.next_page` until it's absent" should become "while it holds a usable URL".
- `fumadocs/content/docs/reference/v3/pagination.mdx` (line 14): still says the keys are "never `null`".
- This page's intro and prerequisites still describe the V3 bearer token and 15-minute expiry as settled (FB-002). Not part of David's feedback, so it wasn't changed.
- Run the `endpoint-tester` skill on `_sort_by=id` with `id[gt]=<id>` (FB-029), and on `GET /api/v3/products/{id}?_fields=sku` (FB-004).

---

## Audit product data quality with filters

**Page:** `fumadocs/content/docs/guides/auditing-product-data-quality-with-filters.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review (seven numbered points: missing/null/empty values, audit scope and business rules, image example, completeness, collecting the full result, request examples and error claims, related links) | 20 (F1a-e, F2a-b, F3a-b, F4a-d, F5a-b, F6a-b, F7a-b, F8) | 0 | 2 new (plus F1 added to FB-015) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-031 | Open | F2: "Explain which products require each field, based on family, product level, status, or destination." F3: "Distinguish checking a thumbnail, a required media attribute, and a media gallery." F1: "For text, consider whitespace as well." | The spec says any query parameter other than `_fields`, `_page`, `_page_size`, and `_sort_by` filters on a field, and the page now uses these filters. We've tested `status`, `gtin[!exists]`, `[null]`, and `[length]` on a text attribute, but not `product_family_id=` or `product_level=` on products, `thumbnail_id[!exists]` or `[null]`, or `[length]=0` on a media gallery attribute. The sources write `[null]` with no value; we haven't captured the request form we tested. Because we can't confirm that functions chain, the page asks readers to trim whitespace in their own code. | `openapi_pimv3_20261002 (Latest spec).json` → `GET /api/v3/products` description: "Any other query parameter is a filter on a field", `field[func:param][op]=value`; `config/api-testing.config.md` → quirks #53, #100; `API V3 - status map (08_10_2026).md` → "Is not null / is null: `field[!null]`, `field[null]`" | Do product searches accept `product_family_id=`, `product_level=`, and `thumbnail_id[!exists]`? Does `[length]=0` match a media gallery attribute with no assets? Is `[null]` sent with no value? Can functions chain, for example `[trim][length]=0`, to find text that is only whitespace? | 2026-10-14 | 2026-10-15: partly answered: `product_family_id=<id>`, `product_level=<n>`, `thumbnail_id[!exists]=true` and `sku[length]=9` work. `thumbnail_id[null]` (with or without `=true`) returned nothing, and `sku[trim][length]=...` returned `200` with no error but whitespace-only matching wasn't proven. Remaining question: the request form of `[null]`, and whether functions chain. |
| FB-032 | Open | F4: "Confirm the score format and scale before showing numeric comparisons." Also: "Use attribute definitions to identify the configured labels and rules." | Live completeness values are decimals such as `85.71`, `100.0`, and `0.0`, which the page describes as observed between 0 and 100. The spec doesn't define the value format. Our tests record that a product's `attributes` map is keyed by the attribute's `name`. The spec's `label` field uses the snake-case pattern `^[a-z0-9_]+$`, which suggests it may be the key. | `bruno-collection/06-Product-Attributes/` (`"amazon_ready": 85.71`); `config/api-testing.config.md` → quirk #30: "keyed by the attribute's `name`"; spec → `CompletenessAttributeCreateInputDto.label` | Is a completeness score always a percentage from 0 to 100? Does a product outside a completeness attribute's scope have no score, or `0`? Is a product's `attributes` map keyed by the attribute's `name` or its `label`? | 2026-10-14 | 2026-10-15: partly answered: a product's `attributes` map is keyed by the attribute's `label` (52 of 57 keys matched a label, none matched a display `name`). The Data model and Quickstart pages now say "label" and config quirk #30 is corrected. Remaining question: is a completeness score always 0 to 100, and what does a product outside the attribute's scope show? (Values seen: `72.73`, `100.0`, `0`.) |

### Possible stale or inconsistent source material

- `fumadocs/content/docs/reference/v3/filtering-query-syntax.mdx` (line 39) says curl's `--data-urlencode` encodes the brackets. curl encodes only the value after `=`, so the bracketed name is sent raw. The API's own `next_page` links encode it (`name%5Bicontains%5D=a`), and quirk #11 notes "URL-encode the brackets".
- `config/api-testing.config.md` quirk #30 (attributes keyed by `name`) vs. the spec's snake-case `label` (FB-032).

### Follow-ups on other pages

- `fumadocs/content/docs/reference/v3/filtering-query-syntax.mdx`: fix the encoding callout (line 39) and encode the bracketed names in its curl examples (F6).
- `fumadocs/content/docs/guides/exporting-your-full-catalog.mdx` (`id[gt]`) and `fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx` (`modified[gte]`, `modified[lt]`): same raw-bracket `--data-urlencode` pattern.
- `fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx`: still to be reworked (Channels Internal, PIM product lists to be removed). This page no longer links to it.
- This page's prerequisite still presents the V3 bearer token as settled (FB-002). Not part of David's feedback, so it wasn't changed.
- Run the `endpoint-tester` skill on the filters in FB-031 and on a product's completeness values (FB-032).

---

## Build a marketplace-specific product feed

**Page:** `fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review (Channels endpoints are private; choose between an external feed, native channels through the interface, or excluding the guide) | 5 (F1-F5, option A: rewritten around an external feed) | 0 | 0 new (F4 added to FB-030) |

### Flags

No new flags. The guide was rewritten around public product endpoints, so it no longer depends on Channels or PIM product lists. The one open question it depends on, how to get a file URL for an asset, is tracked under FB-030.

### Possible stale or inconsistent source material

- `.claude/skills/writer/references/information-architecture.md` line 129 ("Channels have an API. [RESOLVED 2026-10-09]") and the glossary's Channel entry ("channels can be created and managed through the v3 API") contradict `Plytix API v3 - endpoint visibility.xlsx` (all `channels` operations Internal), `before-writing.md` §3 ("Channels are not in the API"), and David's feedback. Both notes rest on the endpoints' presence in the OpenAPI spec, which David says doesn't mean public availability. The project lead made the 2026-10-09 call and should agree to the update.

### Follow-ups on other pages

- `fumadocs/content/docs/guides/getting-notified-webhooks-and-automations.mdx`: the "The channel API accepts a webhook payload and ignores it" callout (line 24) presents channel management through the API, and the card linking here says "Configure the channel a webhook would notify you about." (line 44).
- `fumadocs/content/docs/guides/platform-mcp/practical-examples.mdx` (line 107): links here; check the surrounding text still matches the new approach.
- `fumadocs/content/docs/reference/v3/channels/` and `fumadocs/content/docs/reference/v3/pimproductlists/`: generated reference pages for Internal and to-be-removed endpoints are still in navigation.
- `.claude/skills/writer/references/information-architecture.md` (line 129) and `glossary.md` (Channel entry): update to say channels are configured in the Plytix interface only.

---

## Safely remove categories, assets, or relationships

**Page:** `fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review (relationship scope, asset limitation, thumbnail side effects, idempotent errors, read-back, related links and runtime claims) | 9 (F1, F2, F3b, F3c, F4a, F4b, F5, F6b, F6c) | 2 (F3a, already aligned; F6a, no marketplace link on this page) | 2 new (plus F2 added to FB-006, F1 to FB-024) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-033 | Resolved | F3: "Please verify when this also removes the asset from the product's assets collection, considering any remaining media references." | `{"thumbnail_id": null}` returns `204` and clears the thumbnail. In our test, the product's `assets` list emptied at the same time, but on that product the thumbnail was the only linked asset. We haven't tested a product whose asset is also referenced by a media or media gallery attribute. The page now reports only what we observed. | `config/api-testing.config.md` → quirk #97: "the product's `assets` array empties at the same time, because on this fixture the thumbnail was the only linked asset" | When `thumbnail_id` is cleared, does the asset leave the product's `assets` list even if a media or media gallery attribute still references it? | 2026-10-14 | 2026-10-15: tested: with the same asset set as the thumbnail and in a media attribute, clearing `thumbnail_id` (`204`) leaves the asset in `assets`; with only the media attribute set, `DELETE` on that attribute removes it from `assets`. So the asset stays while anything still references it. |
| FB-034 | Resolved | F4: "If documenting repeated unlink requests, distinguish an already absent association from a missing product." | Unlinking a category that isn't linked returns `404 NotFoundError` with a description saying it "is not linked to" the product "through 'categories'". We haven't captured the response for a product that doesn't exist on this path. The page treats the "not linked" `404` as done and tells readers to check the product on any other `404`. | `config/api-testing.config.md` → quirk #105: "unlinked/unknown id -> `404 NotFoundError` ("... is not linked to <resource> <id> through '<relation>'")" | What does `DELETE /products/{id}/categories/{category_id}` return when the product doesn't exist? Is the "is not linked to" description stable enough for clients to match on? | 2026-10-14 | 2026-10-15: tested: unlinking from a product that doesn't exist returns `404 NotFoundError` "Resource not found", and unlinking a category that isn't linked returns `404` "'<id>' is not linked to products <id> through 'categories'". The two cases can be told apart by the description. No question for Plytix. |

### Follow-ups on other pages

- `.claude/skills/writer/references/style-guide.md` ("Procedure section headings", line 114): lists this page's old H2 "Change or clear a product's thumbnail" (unchanged); the assets section is now "Connect other assets to a product".
- This page's prerequisite still presents the V3 bearer token as settled (FB-002). Not part of David's feedback, so it wasn't changed.
- Run the `endpoint-tester` skill on clearing `thumbnail_id` for a product whose asset is also in a media attribute (FB-033), and on unlinking a category from a nonexistent product (FB-034).

---

## Reconstruct parent/variant hierarchies

**Page:** `fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review (reconstruction workflow, family-model endpoint, children and sub-variants, family and inheritance rules, `overwritten_attributes`, prerequisites and response handling, unlinking) | 16 (F1-F16) | 1 (F17, the guide doesn't add unlinking) | 3 new (plus F3 added to FB-005, the October 13 spec to FB-008) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-035 | Open | F5: "Include a query using parent_id, handle pagination, and explain how to retrieve sub-variants." | The page now rebuilds the tree from a full product read grouped by `parent_id`, and shows `parent_id=<id>` (and `parent.sku=<sku>`) for reading one branch. The spec's filter grammar treats any non-reserved query parameter as a field filter, and the October 8 documentation shows `parent.sku=ABC`, but neither filter has been tested live. No sub-variant (`product_level: 3`) has been created or read on the dev account. | `openapi_pimv3_20261002 (Latest spec).json` → `GET /api/v3/products`: "Any other query parameter is a filter on a field"; `ProductLevel`: "SUB_VARIANT (3): Sub-variant of a variant"; `_API V3 - 08_10_2026.pdf` → `GET /api/v3/products?parent.sku=ABC` | Is filtering products by `parent_id` and `parent.sku` supported? Is a sub-variant created by setting `parent_id` to a variant's ID? Does a parent's `num_variations` count its sub-variants, or only its direct variants? | 2026-10-14 | 2026-10-15: partly answered: `parent_id=<id>` and `parent.sku=<sku>` filter to direct variants, and sub-variants exist at `product_level: 3`. `num_variations` is inconsistent: seed parent TSH-11470 shows 12 (2 variants plus 10 sub-variants), but a scratch parent with one variant and one sub-variant showed 1. Remaining question: does `num_variations` count sub-variants? 2026-10-15: re-tested on scratch data: a parent with two variants, one of which has two sub-variants, shows `num_variations: 2` and that variant shows `2`, so it counts direct variants only. Seed parent TSH-11470 shows `12` (2 variants plus 10 sub-variants), which looks like a descendant count. Still need Plytix to say which is correct. |
| FB-036 | Resolved | F12: "Show the intended attribute-link level and document the default if omitting level is supported." | The page now sends `"level": "no_level"` on every link and tells readers to always send `level`. `level` is optional on `POST /product-families/{id}/attributes`, but no source says what level an attribute gets when it's left out; only `"no_level"` was tested live. | `bruno-collection/13-Product-Families/Create Family Attribute Link.bru` → "`level` is optional… only `"no_level"` was exercised live"; `_API V3 - 08_10_2026.pdf` → `{"attribute_id": "<aid>", "level": "no_level"} 201` | When `level` is left out of a family-attribute link, which level does the attribute get? Is linking straight at `parent_level` or `variant_level` blocked by the same inheritance `403` as the level-change `PATCH`? | 2026-10-14 | 2026-10-15: tested: a family attribute linked with no `level` gets `no_level`, and `POST` with `parent_level` or `variant_level` returns `201`. The Reconstruct hierarchies and Data model pages were updated. The related question about `POST` at `parent_level` on a gated account moved to FB-021. |
| FB-037 | Open | F13: "This identifies overrides; its absence does not prove that every other attribute is inherited." | The page now says the array lists overrides only, and that a missing attribute may be inherited, linked at `no_level`, calculated, or unset. The spec describes the field only as "Overwritten attribute names". On the dev account, where inheritance is off, a variant held its own `brand` value while `overwritten_attributes` stayed `[]`. | `openapi_pimv3_20261002 (Latest spec).json` → `ProductOutputDto.overwritten_attributes`; FB-021 retest (2026-10-14) | When exactly does Plytix add an attribute to `overwritten_attributes`: only for attributes linked at `parent_level` or `variant_level`, and only on accounts with automatic inheritance? Does it clear when the override is deleted? | 2026-10-14 | 2026-10-15: partly answered: with an attribute linked at `parent_level`, an override adds `attributes.<label>` (for example `attributes.brand`) to `overwritten_attributes`, and the entry stays after the override is deleted. Without inheritance the array stays empty. Pages updated. Remaining question: is an entry ever removed, and does the array cover `variant_level` attributes too? |

### Possible stale or inconsistent source material

- The inheritance `403` came back with the error name `PermissionError` in the 2026-09-15 tests (quirk #61, `UNTESTED_ENDPOINTS.md`) and `Forbidden` in the 2026-10-14 retest (status-gating rule #4). The page uses `Forbidden`.
- `ProductFamilyOutputDto` still declares `total_models`, though `product-family-models` is gone from the spec and returns `404` (FB-005).

### Follow-ups on other pages

- `.claude/skills/writer/references/style-guide.md` ("Procedure section headings" table): lists this page's old H2 "Build and read the hierarchy"; it's now "Rebuild the hierarchy from existing products".
- `fumadocs/content/docs/guides/migrating-to-v3/endpoint-mapping.mdx`: its FLAG comment says this guide reads the hierarchy from `num_variations`; the guide now uses `parent_id` (FB-035).
- `.claude/skills/writer/references/glossary.md`, Variant entry: still says "up to four levels".
- Run the `endpoint-tester` skill on `GET /products?parent_id=<id>`, `GET /products?parent.sku=<sku>`, creating a product whose `parent_id` is a variant, and a family-attribute link without `level` (FB-035, FB-036).

---

## Bulk operations for large catalogs (internal draft)

**Page:** `internal-drafts/guides/bulk-operations-for-large-catalogs.mdx` (moved from `fumadocs/content/docs/guides/` on 2026-10-14; no longer published)

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review (keep the guide unpublished as an internal draft, remove public Bulk API references, split topics if published later, code example, `409` handling, unsupported statements) | 4 (F1 as Option A: file moved out of the site and removed from `meta.json`; F5; F6; F7) | 3 (F2, a later decision; F3, other pages; F4, only if publication is revisited) | 2 new (FB-038 open, FB-039 resolved; plus F5 added to FB-028) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-038 | Open | F3: "Remove public references to the legacy Bulk API elsewhere. This includes migration comparisons, endpoint mappings, and the related-article description in the Documentation MCP guide." | The migration guide's overview and "Not migrated and new in V3" page mention the Bulk API. The Endpoint mapping page and the Documentation MCP guide don't mention it or link to this guide. The "For large batches, see Bulk operations for large catalogs" lines are in the Platform MCP guide (Practical examples, plus links in Authentication and OAuth setup, Available tools, and Permissions and security). | `fumadocs/content/docs/guides/documentation-mcp.mdx` (cards: Authentication, API Reference only); `guides/migrating-to-v3/endpoint-mapping.mdx` (no "bulk"); `guides/platform-mcp/practical-examples.mdx` lines 79, 142 | Did you mean the Platform MCP guide rather than the Documentation MCP guide? Is there a Bulk API reference on the Endpoint mapping page that we've missed? | 2026-10-14 | Partly answered 2026-10-14 by David's Documentation MCP feedback (F6): "Apply the same publication rules to MCP tools, search, Markdown exports, llms.txt, and llms-full.txt… Remove the public link to the Bulk guide and its legacy Bulk description." The guide page itself never linked the Bulk guide (`git log -G "[Bb]ulk"` on it returns nothing), so this most likely describes what the MCP served. Moving the draft out of `content/docs/` removes it from the MCP at the next deploy. The Endpoint mapping question is still open. |
| FB-039 | Resolved | F1: "We therefore do not want the new portal to introduce or promote that functionality." | At kickoff, when asked whether the Bulk API documentation should be made public, David answered "Ideally yes… if we flag it some way, you know, like this is the request feature or something like that." | `materials/transcripts/kick_off_2.md` → "So we have like the bulk API documentation… which is not public because we are not offering to everyone." / "Don't know, Ideally yes." | None. | 2026-10-14 | 2026-10-14: the newer written instruction wins. The guide is kept as an internal draft and the Bulk API section was removed. |

### Possible stale or inconsistent source material

- F7 calls the silent-failure statement unsupported, but the project brief states it with a customer quote: `materials/project-references/brief/before-writing.md` lines 80-85, "the response does not distinguish between a product that was skipped due to no changes versus one that failed silently… — Customer feedback (2025)". The section was removed under F1/F3 regardless.
- The removed section called it "Plytix's V2 API… Bulk API", but the Bulk API PDF documents `POST http://pim.plytix.com/api/v1/bulk/products` (V1).

### Follow-ups on other pages

- Inbound links now 404 (11 references on 9 pages). Replace them with links to [Rate Limits](/docs/reference/v3/rate-limits) or [Pagination](/docs/reference/v3/pagination), and remove the Bulk API sentences (F3):
  - `guides/migrating-to-v3/index.mdx` line 48 ("A Bulk API exists in V2…" plus link) (done 2026-10-14)
  - `guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx` lines 23-25 ("Bulk operations" section) (done 2026-10-14: the section now covers the V3 contract only, with no legacy Bulk API mention or link)
  - `guides/syncing-your-erp-with-plytix.mdx` lines 168 (rate-limit link) and 204 (card)
  - `reference/v3/pagination.mdx` line 164 (card); `reference/v3/updates-and-deletes.mdx` line 128
  - `guides/platform-mcp/practical-examples.mdx` lines 79, 142; `authentication-and-oauth-setup.mdx` line 103; `available-tools.mdx` line 32; `permissions-and-security.mdx` line 119
- `.claude/skills/writer/references/information-architecture.md` line 46: lists the guide as "Written" at its old path. Mark it as an internal draft.
- `.claude/skills/writer/references/style-guide.md` ("Procedure section headings" table): uses this guide as an example.
- If the site has been deployed, redeploy so the URL stops resolving, and check whether search engines indexed `/docs/guides/bulk-operations-for-large-catalogs`.
- If publication is revisited (F4), retitle as a V3-only guide, for example "Process large catalogs with the V3 API".

---

## Connect an AI assistant to the Plytix docs

**Page:** `fumadocs/content/docs/guides/documentation-mcp.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written editorial review (scope, deployment check, test question, troubleshooting, public content only, Platform MCP references, retrieval framing) | 4 (F1, F4, F5, F8) | 4 (F2 and F3, need a deployment; F6, not on this page; F7, already aligned) | 2 new (plus F6 added to FB-038) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-040 | Open | F2: "Before publication, provide the final endpoint and verify the client configurations, authentication requirements, tool names, and expected responses." F3: "A short example showing a successful connection and a documentation query with a source would help." | The code confirms three tools (`search`, `list_pages`, `get_page`), no authentication, and a `GET` description listing the supported MCP protocol versions. The production domain is still a placeholder (`<docs-base-url>`), and the hosting choice is open: one option runs the docs on S3 and `/api/mcp` on a separate Lambda. No client configuration, curl check, or response has been tested against a deployment, so the page has no example output yet. WriteChoice will test and capture these once the endpoint is live. | `fumadocs/app/api/mcp/route.ts`; `fumadocs/INFRA-DEPLOYMENT-OPTIONS.md` → Option 1: "`/api/mcp*` → Lambda origin, everything else → S3 origin"; page FLAG comment, lines 12-14 | What will the production docs domain be, and which hosting option has your infrastructure team chosen? | 2026-10-14 | |
| FB-041 | Open | F7: "Only include the planned Platform MCP link and capability statements if that roadmap communication has been approved." | This page no longer mentions the Platform MCP. However, the six Platform MCP pages are still in the public Guides sidebar, while our IA map marks them "Draft, blocked on flags" and the glossary describes the MCP Server as "Not yet live at time of writing". | `fumadocs/content/docs/guides/meta.json` → `"platform-mcp"`; `.claude/skills/writer/references/information-architecture.md` lines 53-63; `glossary.md` → MCP Server | Has the Platform MCP roadmap message been approved for the public docs? If not, we'll take those pages out of the portal the same way as the Bulk draft. | 2026-10-14 | 2026-10-19: answered in effect by Plytix's action list (PM-36): gate the five Platform MCP child pages to match the parent's coming-soon state (no direct access, search entries, cross-links, or agent exports), and reopening them needs explicit publication approval. The parent page stays as coming soon. Not applied yet: the chosen approach is a `draft` frontmatter flag filtered out in `fumadocs/lib/source.ts`. |

### Possible stale or inconsistent source material

- The page said "The site and the MCP endpoint ship from the same deployment", but `INFRA-DEPLOYMENT-OPTIONS.md` Option 1 hosts them separately. The page now tells readers to check the endpoint itself (F5).
- The glossary's "MCP Server" entry describes the planned Platform MCP; "Documentation MCP" has no glossary entry.

### Follow-ups on other pages

- `fumadocs/content/docs/reference/v3/channels/` and `reference/v3/meta.json` (`"channels"`): still public and served through the MCP, search, and llms exports (F6; already listed under the Marketplace feed follow-ups).
- `fumadocs/content/docs/guides/meta.json` and `guides/platform-mcp/`: remove from the portal if FB-041 isn't approved.
- `.claude/skills/writer/references/glossary.md`: add a "Documentation MCP" entry, distinct from the Platform MCP's "MCP Server" entry.
- After deployment: run each client configuration and the curl check, then add a captured `tools/list` response and a cited answer to "Verify the connection" (F2, F3; FB-040).
- This page's Authentication card (line 158) still says "exchange API credentials for a bearer token" (FB-002). Offered as X1, not approved.

---

## Not migrated and new in V3

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review against the October 13 OpenAPI ("Required changes" 1-7, plus dating and status groups) | 8 (F1 as Option A, F2-F8) | 0 | 2 new (plus F2 added to FB-006, F6 to FB-023, the October 13 spec to FB-008) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-042 | Open | F1: "Please correct the statement that Bulk API exists only in v2… Keep the statement that the current v3 OpenAPI contains no bulk endpoints, but distinguish this from existing legacy functionality and future v3 designs." Raised again on the Migrating to V3 overview (F2, 2026-10-14): "Please distinguish existing legacy bulk functionality, account availability, and the lack of bulk endpoints in the current v3 OpenAPI." That page follows the same approach as the Not migrated page: V3 contract only, bulk planned, no legacy mention. | The correction is right: the Bulk PDF documents `POST /api/v1/bulk/products` and `GET /api/v1/bulk/products/<job_id>`, so it's V1. But your Bulk-draft feedback the same day asked to "Remove public references to the legacy Bulk API elsewhere. This includes migration comparisons." The page now follows that instruction: it says the V3 contract has no bulk endpoints and that bulk is planned in the V3 design, without mentioning the legacy Bulk API. The October 8 status map marks the V3 bulk routes "Direct", but none is in the October 2 spec. | `materials/api-references/bulk-operations/Bulks Documentation (API) (Limited to Large Clients).pdf`; `API V3 - status map (08_10_2026).md` → "Bulk operations (pp. 13–15)"; `feedback-corrector-log.md` → Bulk operations for large catalogs run, F3 | Should migration pages mention the legacy V1 Bulk API at all (for example, "available to some accounts, ask your Plytix contact"), or stay silent about it? Can we say publicly that bulk is planned for V3? | 2026-10-14 | 2026-10-19: partly answered by Plytix's action list (PM-07): no public page should introduce or promote the private V1 Bulk guide, and planned V3 bulk and bulk exports must stay distinct from it. All 9 links to the guide are removed. Still open: whether we can say publicly that bulk is planned for V3. |
| FB-043 | Open | F3: "Do not imply retirement unless that decision has been confirmed." | The page now lists `POST /api/v1/accounts/api-credentials/search` and `POST /api/v1/accounts/memberships/search` as legacy only, and says the dashboard doesn't replace searching through the API. No source says whether these will come to V3 or be retired. | `openapi_pimv1.json` → tag `accounts`; no `accounts` path in `openapi_pimv3_20261002 (Latest spec).json` | Are credential and membership search planned for V3, staying V1-only, or due for retirement? | 2026-10-14 | |

### Possible stale or inconsistent source material

- `API V3 - status map (08_10_2026).md` lists `api/v3/-/bulk/...` routes as "Direct", but no bulk path exists in the 2026-10-02 spec (FB-042).

### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/index.mdx` line 8 ("a working integration usually ends up calling both versions") and the "Running both versions is the normal end state" callout (line 51): make conditional, as F7 did here. Line 48 still mentions "A Bulk API exists in V2" and links the hidden Bulk draft (FB-042). (2026-10-14: callout and line 48 done in that page's feedback run; line 8 still open.)
- `fumadocs/content/docs/guides/migrating-to-v3/endpoint-mapping.mdx`: check that its rows use the same status groups (legacy only, alternative in V3, planned).

---

## Migrating to V3

**Page:** `fumadocs/content/docs/guides/migrating-to-v3/index.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-14 | David, written review ("Required corrections" 1-4, "Technical claims requiring confirmation" 5-6, "Migration validation") | 10 (F1, F2 as Option A, F3, F4a-c, F5, F6a, F6b, F7) | 0 (X1-X3 offered, not approved) | 0 new (references added to FB-001, FB-002, FB-010, FB-016, FB-018, FB-019, FB-020, FB-042) |

### Flags

No new flags. Every open question from this review is already tracked: authentication (FB-001, FB-002), legacy bulk (FB-042), create responses (FB-018), the category filter (FB-016), the attributes map and single-attribute PATCH (FB-019, FB-020), and invalid filters (FB-010).

### Possible stale or inconsistent source material

- The page said an unrecognized filter is ignored and the search returns everything. Live tests return `400 InvalidFieldError` for an unknown field and `400 InvalidFilterOperator` for an unknown operator (`config/api-testing.config.md` quirks #99, #116, and the 2026-10-13 retest).
- `ProductStatus` in the 2026-10-02 spec has `Completed`, `Draft`, and `Archived`; `Review` was used as a status value in examples here and in `filtering-query-syntax.mdx`.

### Follow-ups on other pages

- `fumadocs/content/docs/reference/v3/filtering-query-syntax.mdx` line 119: replace `status=Review` (not a valid status) and `categories[in]` (untested on a list field; FB-016).
- This page, not approved in this run: line 127 says the SKU works as a product identifier in the path, which live tests disproved (`GET /products/<sku>` returns `422`, quirks #14 and #58); lines 153-155 offer `curl -L --location-trusted` as a workaround, which David asked to remove on the Export page (FB-012); line 8 still says a migrated integration "usually ends up calling both versions".

---

## 19 October 2026 documentation actions (PM items)

**Source:** Plytix's action list "Plytix - WriteChoice documentation actions, 19 October 2026" (38 items, PM-xx IDs, evidence baseline 16-18 October 2026, Dev account). This run spans several pages, so it's logged here instead of in each page's section. The reply to David is in `messages-for-david.md` under "19 October documentation actions (PM items)".

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-19 | Plytix action list (PM items) | 18 (PM-07, PM-13, PM-16, PM-17, PM-19, PM-23, PM-24, PM-25, PM-26, PM-28, PM-29, PM-30, PM-32, PM-35, PM-42, PM-45, PM-52, PM-54) | 20, out of this pass: PM-11; library-generated UI and snippets (PM-40, PM-41, PM-56, PM-57, PM-58, PM-59); site UI (PM-06, PM-43, PM-44, PM-46, PM-60, PM-63); PM-36; reference-spec items (PM-37, PM-38, PM-50, PM-51, PM-61, PM-62) | 4 new (FB-044 to FB-047); PM-28's header question is tracked under FB-028 |

### Applied

| PM | Pages (under `fumadocs/content/docs/`) | Change | Basis |
|---|---|---|---|
| PM-07 | `guides/syncing-your-erp-with-plytix.mdx`, `reference/v3/pagination.mdx`, `reference/v3/updates-and-deletes.mdx`, four `guides/platform-mcp/` pages | Removed all 9 links to the withdrawn Bulk guide; pacing now links Rate limits; two cards replaced. The Writer style guide's worked example no longer cites the Bulk guide | Bulk guide is an internal draft (`internal-drafts/`) |
| PM-13 | `guides/quickstart.mdx` | Callout title now "Increase the page size for production workloads" | Page text |
| PM-16 | `reference/v3/errors-status-codes.mdx`, `guides/quickstart.mdx`, `guides/migrating-to-v3/responses-and-updates.mdx`, `guides/exporting-your-full-catalog.mdx` | Removed "only 200 and 422 are declared" and the universal-envelope claims; `204` has no body; `pagination` scoped to search responses | The 2026-10-02 spec declares `201`, `204`, and the full error set; the site's `openapi.json` (built from the superseded spec) declares only `200` and `422` |
| PM-17 | `reference/v3/filtering-query-syntax.mdx` | `icontains` replaced by `contains:ignorecase` in 4 places; scoped to text attributes; negation and absence note | `config/api-testing.config.md` quirk #99 (`icontains` rejected). Closes the FB-013 follow-up on line 39 |
| PM-19 | `reference/v3/filtering-query-syntax.mdx` | `_include_unfiltered_entities` callout replaced with a qualified note on expansion | Plytix Dev control (flag rejected with true and false); flag absent from the spec |
| PM-23 | `reference/v3/pagination.mdx`, `guides/migrating-to-v3/searching-and-pagination.mdx` | No snapshot promise from a date filter; deterministic sort plus reconciliation | Matches `exporting-your-full-catalog.mdx` and the ERP guide |
| PM-24 | `guides/syncing-your-erp-with-plytix.mdx` | New "Reconcile on a slower schedule": full read of synced fields, value comparison, missing IDs confirmed with `GET` (`404`) before any downstream delete | Plytix review; the `404` for an unmatched identifier is confirmed in `reference/v3/updates-and-deletes.mdx` |
| PM-25 | `guides/reconstructing-parent-variant-hierarchies.mdx`, `guides/data-model.mdx` | Removed the `POST`-link workaround after the inheritance `403`; FB-036 FLAG comment notes the change | Our test still shows the `POST` link at `parent_level` returns `201` (FB-036); Plytix asked us not to present it as a workaround |
| PM-26 | `guides/migrating-to-v3/responses-and-updates.mdx`, `reference/v3/updates-and-deletes.mdx`, `guides/syncing-your-erp-with-plytix.mdx` | Tested clearing behavior by attribute type; cleared and never-set values overlap in `[!exists]` and `[length]=0`; removed "stored verbatim" and "inherited value takes over" | FB-015 and FB-020 (ours) match; gallery, media, and `null` cases from Plytix's Dev tests (FB-046) |
| PM-28 | `guides/exporting-your-full-catalog.mdx` | Exporter rewritten: both rate-limit windows, persisted request times, `Retry-After` (seconds or HTTP-date), bounded jittered backoff, stop and resume for waits over 60 seconds | Offline tests, 26/26 passing; whether V3 sends `Retry-After` is open (FB-028) |
| PM-29 | `guides/building-marketplace-specific-product-feeds.mdx` | `build_feed.py` deduplicates by `id` (last copy wins), skips blank lines, writes through temporary files | Offline tests |
| PM-30 | `guides/migrating-to-v3/index.mdx`, `guides/exporting-your-full-catalog.mdx` | Removed `--location-trusted`; the exporter validates the origin and path of every `next_page` and saved URL before sending the token, and doesn't follow redirects | Offline tests: 7 bad link shapes, a `301` to another host. Closes the `--location-trusted` follow-up under "Migrating to V3" |
| PM-32 | 23 pages (guides, migration, V3 and legacy reference) | Swapped 24 related cards that repeated the automatic previous/next link; six intros now say "related pages" | Script check: no related section repeats a footer destination |
| PM-35 | `guides/safely-removing-categories-assets-or-relationships.mdx`, `guides/migrating-to-v3/endpoint-mapping.mdx`, `guides/migrating-to-v3/not-migrated-and-new-in-v3.mdx`, `guides/migrating-to-v3/index.mdx` | Tested media and gallery payloads documented with a gallery example; asset linking moved from "Keep on V1" to "Move to V3" | FB-006 and FB-033 (ours) match; ordering, de-duplication, and `{id}` rejection from Plytix's Dev tests |
| PM-42 | `guides/exporting-your-full-catalog.mdx` | Page validation before writing; per-page files with an atomic manifest; corrupt or missing state reported; deduplicated final output | Offline fault-injection tests; 9 deliberate breakages of the script were each caught by the suite |
| PM-45 | `reference/legacy/filtering-and-search.mdx`, `reference/legacy/pagination.mdx` | Broken `migration-reference` cards now open Filter operators and Searching and pagination | Page doesn't exist |
| PM-52 | `guides/migrating-to-v3/responses-and-updates.mdx`, `reference/v3/updates-and-deletes.mdx`, `guides/syncing-your-erp-with-plytix.mdx` | Three PATCH routes with before/after examples; read-merge-write advice removed | Root replace is ours (quirk #85); the `/attributes` merge is Plytix's Dev test only (FB-047) |
| PM-54 | `guides/migrating-to-v3/filter-operators.mdx` | `like` and `!like` recipes, multiselect any-value and all-value operators, punctuation and Unicode warnings | Plytix's Dev tests; two gaps flagged (FB-044, FB-045) |

Also fixed: `reference/v3/updates-and-deletes.mdx` sent a decimal attribute as a bare number (`'34.99'`), which FB-020 shows returns `422`. It now sends `'"34.99"'`.

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-044 | Open | PM-54: "ASCII `!in` needs its tested lowercase handling." | The recipe and its control IDs weren't included in the action list. The page warns that a lowercase rewrite didn't hold for `ÉCOLE` and asks readers to compare record IDs, but gives no runnable `!in` case recipe. | Action list, PM-54 | What is the exact lowercase recipe you tested for ASCII `!in`, and which control IDs did it preserve? | 2026-10-19 | |
| FB-045 | Open | PM-54: "Escape literal punctuation for the tested pattern cases." | The page says `[contains:ignorecase]` treated `A.B` and `A+B` as patterns. The escape syntax isn't given, so the page doesn't show one. | Action list, PM-54 | What escape syntax makes `contains:ignorecase` match punctuation literally, and does plain `contains` behave the same way? | 2026-10-19 | |
| FB-046 | Open | PM-26: "Clearing, absence, null and empty values are explained by tested type and route." | The type-by-type table uses Plytix's results for `null` on MultiSelect and Media gallery, gallery `[]`, and the rejected media `""`. Text `null` on the attribute path (FB-020) and Text `""` / MultiSelect `[]` (FB-015) are ours. The route for each Plytix `null` case wasn't stated. | Action list, PM-26; FLAG comment in `responses-and-updates.mdx` | Which route did each `null` test use: root PATCH, `/attributes`, or the attribute's own path? | 2026-10-19 | |
| FB-047 | Open | PM-52: "Retest on release candidate." | `PATCH /products/{identifier}/attributes` with a partial map is documented as a merge from Plytix's Dev test. We haven't run it; only the root replace is ours (quirk #85). | Action list, PM-52; FLAG comment in `responses-and-updates.mdx` | Can you confirm the `/attributes` merge on the release candidate? | 2026-10-19 | |

### Effect on existing flags

- FB-013 (Filter operators): resolved. V1 `like` ignores case, and `[contains:ignorecase]` is its V3 match (PM-17, PM-54).
- FB-015 (Filter operators): the V3 overlap of `[!exists]`, `[length]=0`, and `[null]` is now confirmed by Plytix as well. The legacy question about `!exists` on `null`, `""`, and `[]` is still open.
- FB-016 (Filter operators): the multi-value semantics are answered by PM-54 (`in` and `intersects` match any value, `includes` matches all values). Repeating the parameter remains the tested multi-value form.
- FB-036 (The Plytix data model): unchanged as a question. The pages no longer mention the `POST` route (PM-25).
- FB-019 (Responses and updates): partly answered. The `/attributes` merge route is documented from Plytix's test (PM-52); whether the root replace is intended is still open.
- FB-028 (Sync your ERP): absorbs FB-046. Plytix's PM-28 asks the same `Retry-After` question.
- FB-041 (Connect an AI assistant to the Plytix docs): answered in effect by PM-36. The five Platform MCP child pages are to be gated; the change isn't applied yet.
- FB-042 (Not migrated and new in V3): partly answered by PM-07. Don't promote the V1 Bulk guide; whether V3 bulk can be announced is still open.

### Not applied in this run

- Reference-spec items (PM-37, PM-38, PM-50, PM-51, PM-61, PM-62): findings were drafted but nothing was changed.
  - PM-62: 22 invalid JSON units on 9 legacy pages, all fixable with syntax-only repairs.
  - PM-51: 16 saved Postman payloads on 4 operations.
  - PM-37: 9 legacy operations where the prose marks fields mandatory but the schema doesn't.
  - PM-38: a rule-based title map for all 150 V3 operations.
  - Regenerating the V3 pages would also publish about 20 descriptions already in `openapi.json` but never regenerated (product relationships, related products, family attributes).
  - `merge-openapi.mjs` still reads the superseded `openapi_pimv3.json`, and it only carries `description`, `summary`, and `operationId`, so request-body examples added to `openapi.json` would be lost on the next refresh.
- Library-generated behavior (PM-40, PM-41, PM-56, PM-57, PM-58, PM-59, and the playground and snippet parts of PM-50 and PM-51): the multipart `file` field is already declared `format: binary` in `openapi-v1v2.json`, so the file control and the JavaScript and Python snippets come from fumadocs-openapi.
- `npm run build` currently fails on `@import '@fluentui/react-icons/headless/styles.css'` in `fumadocs/app/global.css` (Tailwind can't resolve the package export). This predates this run.

---

## 19 October 2026 marketing and design feedback

**Source:** "Plytix - WriteChoice documentation actions _ 19 October 2026 - Marketing-Design Feedback.csv" (16 items, numbered 1-19; items 3, 4, and 11 aren't in the file). This run spans the site, so it's logged here. The reply to David is in `messages-for-david.md` under "19 October marketing and design feedback".

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-21 | Plytix marketing/design list | 14 (1, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19) | 2 (2 and 17, held back by WriteChoice for now) | 6 new (FB-048 to FB-053) |

### Applied

| # | Change | Where |
|---|---|---|
| 1 | Endpoint pages moved from operationId slugs to `/reference/v3/<resource>/<action>` and `/reference/v1-v2/<resource>/<action>` (for example, `/reference/v3/products/get-product`). Concept pages moved to `/reference/v3/...` and `/reference/v1-v2/...`. 243 permanent redirects cover every old `/docs/reference/...` URL, plus `/docs/guides/overview`. | `fumadocs/scripts/endpoint-names.json` (one entry per operation, keyed by `METHOD /path`), `generate-docs*.mjs`, `lib/source.ts` (`url`), `app/(docs)/reference/`, `proxy.ts`, `redirects.json`, `next.config.mjs` |
| 5 | Homepage, Guides intro, and site metadata describe Plytix as a product content platform (Plytix PIM, Plytix DAM, Plytix Feed Management), kept separate from what the API covers | `app/(home)/page.tsx`, `guides/what-is-the-plytix-api.mdx`, `app/layout.tsx` |
| 6 | Header links: Plytix.com, Login, Book a demo (pill button), matching knowledge.plytix.com | `lib/layout.shared.tsx` |
| 7 | Footer copied from the knowledge base (Platform, Company, Resources, legal, social), without its "API documentation" link | `components/site-footer.tsx` |
| 8 | Guides grouped as Get started, Integration guides, How-to guides, AI assistants, Upgrade from V1/V2, with the titles Plytix listed | `guides/meta.json`, page frontmatter, card and link text across 31 files |
| 9 | "Overview" replaced by "What is the Plytix API?" (purpose, audience, coverage, where to start, versions). Reviewed with the `reviewer` skill: Approve with changes (Related-articles section; wording pending FB-049) | `guides/what-is-the-plytix-api.mdx` |
| 10 | Migration pages listed flat under "Upgrade from V1/V2", "Migration overview" first, so no item is both a page and a dropdown | `guides/meta.json` (`"...migrating-to-v3"`) |
| 12 | 238 endpoint titles in plain language ("Get a product", "Get a product field", "List a family's attributes"); "subpath" removed from guide prose and V3 descriptions | `openapi.json` and `openapi-v1v2.json` `summary`, `endpoint-mapping.mdx`, `migrating-to-v3/index.mdx` |
| 13 | V3 code samples use `https://pim.plytix.com` (`servers`); realistic synthetic examples for all 29 V3 request bodies and 53 responses; 26 invalid JSON blocks in V1/V2 descriptions repaired (PM-62) | `scripts/v3-examples.json`, `scripts/openapi-examples.mjs`, `openapi-v1v2.json` |
| 14 | Reference "Overview" groups renamed "Core concepts" | `reference/v3/meta.json`, `reference/v1-v2/meta.json` |
| 15 | V1/V2 concept titles carry the version ("V1/V2 authentication", ...), each with a callout linking the V3 equivalent | `reference/v1-v2/*.mdx` |
| 16 | V3 "Filtering and query syntax" renamed "Filtering and search" (slug `filtering-and-search`, redirected); index card labels match page titles | `reference/v3/filtering-and-search.mdx`, `reference/v3/index.mdx` |
| 18 | Reproduced: below 1280px the sticky "On this page" bar covered the heading a reader jumped to, and on desktop the sidebar and TOC sat 8px under the header. Fixed by reporting the real header height and tying heading scroll margins to the sticky offsets; checked at 1440, 1280, 1100, 800, and 420px | `app/global.css` |
| 19 | "V3 (Beta)" and "V1/V2 (Legacy)" in the switcher, sidebar roots, and cards; beta callout on the V3 overview | `reference-version-switcher.tsx`, `meta.json`, `reference/v3/index.mdx` |

Not changed under item 13: the `http://` `next_page` values in the Quickstart and Export your full catalog. They show what the API returns today, and both pages explain the scheme rewrite next to them (quirk #92).

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-048 | Open | Item 1: "Propose a short, consistent and stable URL pattern ... then apply the agreed pattern before launch." | Applied as a proposal: `/reference/<version>/<resource>/<action>`, slugs held in `endpoint-names.json` so they don't move when titles change. The kickoff raised URL control as Jessie's SEO concern. | `kick_off_03___plytix.md:496-508` | Does the `/reference/v3/products/get-product` pattern work for Jessie's SEO plans, or do you want another root? | 2026-10-21 | |
| FB-049 | Open | Item 5: "Use multi-technology platform wording." | The Content Guidelines give official product names but no tagline. We used "a product content platform" with Plytix PIM, Plytix DAM, and Plytix Feed Management. | `Plytix Content Guidelines 2026.pdf` sections 1 and 3 | Is "product content platform" the wording you want, or is there an approved platform line? | 2026-10-21 | |
| FB-050 | Open | Items 6-7: "Could you confirm if the header/footer can be replicated?" | Yes. Both are live in the build, copied from knowledge.plytix.com on 2026-10-21. We left out the footer's "API documentation", "Our Branding Guidelines", and "Cookie preferences" items (the last two have no link target on the knowledge base). | knowledge.plytix.com | Should "Our Branding Guidelines" and "Cookie preferences" be added, and where do they link? | 2026-10-21 | |
| FB-051 | Open | Item 8 structure | "Get notified about changes" (`getting-notified-webhooks-and-automations.mdx`) isn't in your proposed structure and isn't in the nav. | `guides/meta.json` | Should it go under How-to guides, or stay unpublished? | 2026-10-21 | |
| FB-052 | Open | Item 13 examples | Writing examples surfaced spec gaps: Create endpoints declare only `200` but return `201`; attributes and families declare `_id` but return `id`; decimals must be sent as strings but a price came back as a number; the `GET /product-relationships` shape conflicts between the spec and two retests; PDF catalog and eCatalog examples come from the schema alone (creation is gated on our account). | `fumadocs/scripts/v3-examples-report.md`, `config/api-testing.config.md` | Can the spec be corrected for `201` and `id`, and can you confirm the decimal round trip and the product-relationships response shape? | 2026-10-21 | |
| FB-053 | Open | Item 12 (found while renaming) | "Get a product field" says the `categories`, `assets`, and `static_lists` fields return an empty array; "Endpoint mapping" says a 2026-10-15 retest found `/assets` and `/categories` work again. | `openapi.json` description; `endpoint-mapping.mdx:34` | None. WriteChoice will retest with `endpoint-tester` and align both pages. | 2026-10-21 | |

### Not applied in this run

- Items 2 (meta titles and descriptions) and 17 (version switcher alternative): held back by WriteChoice for now.
- `merge-openapi.mjs` still reads the superseded `openapi_pimv3.json`. It now also applies `servers` and `v3-examples.json`, but it rebuilds component schemas from the source, so hand edits to schema descriptions (for example, the V1/V2 capitalization fixes) are lost on a refresh. Don't run `merge:api` until that's fixed; use `node scripts/openapi-examples.mjs` to re-apply examples.
- The `npm run build` failure noted on 2026-10-19 is fixed: the Fluent icons stylesheet is now imported from `app/layout.tsx`. `npm run lint` fails before linting because `typescript-eslint` doesn't support TypeScript 7.
- V3 code samples don't send an `Authorization` header, because `openapi.json` declares no security scheme. Adding one depends on the V3 authentication model (FB-002).

---

## Plytix MCP

**Page:** `fumadocs/content/docs/guides/platform-mcp/index.mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| 2026-10-29 | David, written answers to our MCP page questions (server URL, eligibility, OAuth, tool list, release date, use cases), plus the tool inventory sheet | 8 (F1-F8) | 0 | 4 new (FB-054 to FB-057) |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-054 | Open | F3: "if you want this to be activated for your account, please contact your account manager." | The page now says beta access is turned on per account through the account manager. The answer doesn't say which Plytix role the person signing in with OAuth needs. | Page FLAG under Prerequisites | Which Plytix role does the person signing in need (for example, can a `USER` connect, or only an admin)? Does the assistant see only what that user can see in Plytix? | 2026-10-29 | |
| FB-055 | Open | F5: "The MCP will be set on the LLM side and user will be able to set different access to every available tool." | The page now tells readers to set per-tool access and to disconnect in their AI application. Claude's connector for the DEV server shows per-tool access settings and a **Disconnect** button. We don't know whether Plytix itself lists or revokes connections. | Screenshot of the Claude connector "Plytix PIM - DEV", 29 Oct 2026 | Can a user or admin see and revoke Plytix MCP connections from inside Plytix? If so, where? | 2026-10-29 | |
| FB-056 | Open | F6: the tool inventory sheet ("Keep in mind that the optimized title is shown in the frontend of your model as tool list.") | The inventory lists 72 tools, 23 of them read tools (12 search, 11 get), reviewed through a ChatGPT connection. A Claude connection to the DEV server shows 25 read-only tools, including "Get product categorization", which matches none of the inventory's tools. The inventory has no title column, so the page doesn't list titles. | `materials/api-references/mcp/Plytix MCP - Tool Inventory - Tools.csv`; DEV connector screenshot | Is the inventory the tool list for the November 6 release? What is "Get product categorization", and will production expose the same tools as DEV? Can you share the display title for each tool? | 2026-10-29 | |
| FB-057 | Open | F1: "The production server url will be: pim.plytix.com/mcp" | The page uses `https://pim.plytix.com/mcp`. The `https://` follows the DEV URL in the brief (`https://pim.dev.plytix.com/mcp`). The server isn't live yet, so no step on the page has been tested against it. | Plytix MCP brief, 27 Oct 2026 | Can you confirm the full URL is `https://pim.plytix.com/mcp`? WriteChoice will test the page against it on November 6. | 2026-10-29 | |

### Follow-ups on other pages

- `.claude/skills/writer/references/information-architecture.md` line 47: the page is no longer blocked on the release URL, eligibility, OAuth, use cases, or release date. It's still blocked on the tool-list check (FB-056), the role and revocation questions (FB-054, FB-055), and testing against production.
- `.claude/skills/writer/references/glossary.md`, Plytix MCP entry: add that beta access is turned on per account through the account manager and is separate from V3.
