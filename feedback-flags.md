# Feedback flags for the Plytix team

Running log of open questions and conflicts found while applying Plytix feedback to the docs. Maintained by the `feedback-corrector` skill: one section per page, updated in place.

**Last updated:** 2026-10-14

## Summary

| Page | Open | Resolved | Last run |
|---|---|---|---|
| [Overview](fumadocs/content/docs/guides/overview.mdx) | 3 | 0 | 2026-10-13 |
| [The Plytix data model](fumadocs/content/docs/guides/data-model.mdx) | 4 | 0 | 2026-10-13 |
| [Searching and pagination](fumadocs/content/docs/guides/migrating-to-v3/searching-and-pagination.mdx) | 5 | 0 | 2026-10-14 |
| [Filter operators](fumadocs/content/docs/guides/migrating-to-v3/filter-operators.mdx) | 5 | 0 | 2026-10-14 |
| [Responses and updates](fumadocs/content/docs/guides/migrating-to-v3/responses-and-updates.mdx) | 4 | 0 | 2026-10-14 |

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
| FB-001 | Open | F1: "As discussed on October 8, v1/v2 will retain the current authentication system, while v3 will introduce a new model whose details are still pending." | The substance matches Plytix's earlier written answer, but we have no record of the October 8 call itself. The newest transcript we hold is dated 2026-10-01. | `materials/project-references/brief/Questions for the Plytix Dev Team.md` → AUTH-1: "for now we will keep using the same v1 auth until we develop v3 auth carefully… we will implement a token generation with different access level." | Could you share notes or a recording from the October 8 call, so we can cite the authentication decision directly? | 2026-10-13 | |
| FB-002 | Open | F1: "v3 will introduce a new model whose details are still pending." Raised again on the Searching and pagination page (F8, 2026-10-14): "Remove the wording that describes a token flow shared by v1/v2 and v3. Keep it consistent with the agreed legacy authentication scope and the pending v3 model." | Today, V3 requests authenticate with the V1/V2 key and password exchanged for a bearer token at `auth.plytix.com`, and our live tests confirm that flow works. The Quickstart, the V3 Authentication reference, and the migration guide's authentication page all document it as the V3 flow. | `config/api-testing.config.md`; `fumadocs/content/docs/reference/v3/authentication.mdx`; AUTH-1 and AUTH-2 in `Questions for the Plytix Dev Team.md` | Until the new V3 model ships, is it correct to keep documenting the current key/password-to-bearer-token exchange for V3? When will details of the new model (token generation, access levels, error format) be available? | 2026-10-13 | |
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
| FB-004 | Open | F3: "The statement that _fields only works on search conflicts with both the OpenAPI, which includes it on GET /products/{identifier}, and the October 8 internal documentation… If testing shows that it is ignored, flag the implementation discrepancy for our dev team." | Our live tests (last reconfirmed 2026-09-22) found `_fields` ignored on `GET /products/{id}` and `GET /product-attributes/{id}`: the full product always came back. The 2026-10-02 spec and the October 8 documentation both say it's supported. The page is unchanged until we retest. | `config/api-testing.config.md` → quirk #24: "`_fields` is ignored on single-resource `GET /{resource}/{id}`"; `openapi_pimv3_20261002 (Latest spec).json` → `GET /api/v3/products/{identifier}` parameter `_fields`; `_API V3 - 08_10_2026.pdf` → "GET /api/v3/products/{product_id}?_fields=sku 200" | WriteChoice will retest. If `_fields` is still ignored on single-product requests, is that a bug to be fixed, or should the spec drop the parameter there? | 2026-10-13 | |
| FB-005 | Open | F2: "/api/v3/product-family-models and the parent_attribute_labels, variant_attribute_labels, and no_level_attribute_labels fields are not present in the OpenAPI." | The endpoint was in the earlier spec and returned real data in our 2026-09-08 tests. It's absent from the 2026-10-02 spec, which documents family attributes instead. The page now uses `family_attributes`. | `bruno-collection/13-Product-Families/README.md`; `openapi_pimv3_20261002 (Latest spec).json` → `ProductFamilyOutputDto.family_attributes`, `FamilyAttributeOutputDto.level` | Has `/api/v3/product-family-models` been retired, or is it only missing from the spec? If retired, we'll remove its generated reference pages. | 2026-10-13 | |
| FB-006 | Open | F6: "ProductUpdateInputDto explicitly describes assets as being managed through media attributes… Please distinguish asset creation, thumbnail assignment, and media attribute updates." | The page now says other assets connect through media and media gallery attributes, following the spec. We haven't tested writing an asset to a media attribute through the API, and the expected value format isn't documented. There's no asset link/unlink endpoint (`POST /products/{id}/assets` returns `405`). | `openapi_pimv3_20261002 (Latest spec).json` → `ProductUpdateInputDto`: "Assets are managed through media attributes."; `config/api-testing.config.md` → quirk #96 | What value does a media or media gallery attribute accept in a product `PATCH` (an asset ID, a list of IDs, an object)? Do assets set that way appear in the product's `assets` field? | 2026-10-13 | |
| FB-007 | Open | F8: "Distinguish configuring Formula/Completeness attributes from directly writing their calculated product values." | The page now says you configure these attributes on the attribute definition and Plytix calculates the values. We haven't confirmed what happens if a client writes a calculated value directly on a product. | `openapi_pimv3_20261002 (Latest spec).json` → `FormulaAttributeCreateInputDto`, `CompletenessAttributeCreateInputDto`; `config/api-testing.config.md` → #30 (completeness values appear automatically) | If a product `PATCH` includes a value for a formula or completeness attribute, is it rejected, ignored, or stored? | 2026-10-13 | |

### Possible stale or inconsistent source material

- `_fields` on single-resource `GET`: live finding (2026-09-22) vs. 2026-10-02 spec and October 8 documentation (FB-004).
- `/api/v3/product-family-models`: in the superseded `openapi_pimv3.json` and earlier live tests, absent from the 2026-10-02 spec (FB-005).

### Follow-ups on other pages

- `.claude/skills/writer/references/glossary.md`, Variant entry (line 303): still says "Plytix supports up to four levels". Align with F1.
- `fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx`: check for the four-levels wording and any `product-family-models` reference.
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
| FB-008 | Open | "This review uses the October 13 OpenAPI as the current v3 reference." Raised again on the Filter operators page (2026-10-14): "This review uses the October 13 OpenAPI and the supplied legacy documentation." Raised again on the Responses and updates page (F0, 2026-10-14): "The explanation of empty 204 responses is useful and matches the October 13 OpenAPI." | The newest spec we hold is dated 2026-10-02. Every V3 statement on the page was verified against that file, so any change made between October 2 and October 13 is not reflected yet. | `openapi_pimv3_20261002 (Latest spec).json` | Could you share the October 13 OpenAPI file, and let us know where new versions are published so we can always check against the current one? | 2026-10-14 | |
| FB-009 | Open | F3: "It also supports repeated `_sort_by` parameters, applied in the supplied order." | The October 8 documentation agrees that `_sort_by` can repeat, but gives the limit as "max XX". The October 2 OpenAPI declares `_sort_by` as a single string (`anyOf: [string, null]`), and we have not tested repetition against the live API. The page now documents repetition. | `materials/api-references/v3-reference/API V3 - status map (08_10_2026).md` → "`_sort_by` can repeat (max XX)"; `openapi_pimv3_20261002 (Latest spec).json` → `GET /api/v3/products`, parameter `_sort_by` | How many `_sort_by` parameters can one request carry, and will the OpenAPI be updated to declare `_sort_by` as a list? | 2026-10-14 | |
| FB-010 | Open | F2: "The claim that an incorrectly translated or unrecognized filter is silently ignored needs a reproducible example or dev-team confirmation. Please distinguish no filter, invalid syntax, and an unknown field/operator." | We could not reproduce or source the silent-ignore claim, so it has been removed from the page. Our tests cover the neighbouring case only: on `_fields`, an unknown value sometimes returns `400 HiddenFieldError` and sometimes is dropped with no error. | `config/api-testing.config.md` → quirks #12 and #13; `API V3 - status map (08_10_2026).md` → "No `search_query` means get all" is marked Postponed, "Treat as unconfirmed" | On a V3 search, what does the API return for a filter on a field that doesn't exist, for an unknown operator, and for malformed bracket syntax? Is "no filter means get all" confirmed shipped behavior? | 2026-10-14 | |
| FB-011 | Open | F7: "The October 8 internal document describes ID-based keyset paging using `_sort_by=id`, `_page=1`, and `id[gt]=<last_id>`." | No file we hold mentions keyset paging, `id[gt]` traversal, or a last-ID cursor, including our summary of the October 8 document, whose pagination section lists only `_page`, `_page_size`, and `_sort_by`. The page documents the stability risk without this technique. | `materials/api-references/v3-reference/API V3 - status map (08_10_2026).md` → "Pagination (p. 10)" | Could you point us to the section describing ID-based keyset paging? Is it a recommended pattern for large exports, and is `id[gt]` supported on every searchable resource? | 2026-10-14 | |
| FB-012 | Open | F6: "Please report HTTP pagination links as an environment issue to resolve, rather than a permanent API convention." | Confirmed live on 2026-10-01: `next_page` and `previous_page` come back as `http://` URLs that `301` to `https`, and clients that drop `Authorization` across the redirect get a `401`. The page now recommends rewriting the scheme and describes the behavior as temporary. | `bruno-collection/02-Products-v3/List Products.bru` → "401 - Following next_page Verbatim Drops Auth"; `config/api-testing.config.md` → quirk #92 | Is the `http://` link generation scheduled to be fixed, and in which environments does it occur? We would like to drop the workaround from the docs once it is resolved. | 2026-10-14 | |

### Possible stale or inconsistent source material

- `_sort_by` cardinality: October 8 documentation and the October 13 OpenAPI say it repeats; our October 2 OpenAPI declares a single string (FB-009).
- `Pagination` schema: the October 2 OpenAPI types `next_page` and `previous_page` as `string | null`, while live responses on 2026-10-01 omitted the keys entirely. The page now covers both.
- V1/V2 pagination limits are documented per endpoint: product search (V1 and V2) and category search state the 100 maximum, while asset, attribute, and relationship search state nothing.

### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/authentication-and-base-urls.mdx` (line 3) and `fumadocs/content/docs/guides/migrating-to-v3/index.mdx` (line 229): remove the "token flow shared by the V1/V2 and V3" wording, per F8 and FB-002.
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
| FB-013 | Open | F1: "Confirm case sensitivity before choosing between v3 contains and contains:ignorecase." | The legacy operator table says `eq` and `!eq` ignore case for text, but says nothing about case for `like`. `!like` isn't in the API operator table, though it appears in usage data and in stored list queries. The page now lists both V3 forms for `like` and `!like` and asks readers to test. | `materials/api-references/v1-reference/Plytix_pimv1.postman_collection.json` → "Standard filter operators", `like`: "Contains check. Check if supplied string is contained within value"; `materials/project-references/brief/before-writing.md` → `like` / `!like`, 6% of uses | Is legacy `like` (and `!like`) case-insensitive, like `eq`? Which V3 operator returns the same results: `[contains]` or `[contains:ignorecase]`? | 2026-10-14 | |
| FB-014 | Open | F5: "Add or explicitly mark the migration status of !like and text_search. Please also verify the 'Not available' labels for length-based filtering against the relevant legacy operators." | V3's own operator list has no `text_search`. The page offers an OR group of `contains` filters as the nearest form, marked as unconfirmed. The legacy API operator table lists no length operator, but the filter usage analysis mentions "length operators" and `last_days` among advanced filters. The page now says "No confirmed direct equivalent" for both. | `config/api-testing.config.md` → quirk #99 (full V3 operator list); `before-writing.md` → "Advanced operators (`gt`, `lt`, `last_days`, length operators)"; Postman → `text_search`: "Item list must be provided as 'field' value" | Is there a planned V3 replacement for `text_search`, and does an OR group of `contains:ignorecase` filters return the same results? Do legacy API searches accept length operators or `last_days`, and if so, under what names? | 2026-10-14 | |
| FB-015 | Open | F4: "An absent field, null, an empty string, and an empty list are distinct cases. Confirm how legacy exists/!exists and negated comparisons translate for each case." | The legacy docs define `exists` and `!exists` only as "defined" and "undefined". V3 documents separate checks for undefined, `null`, and empty (`[length]=0`). On one tested attribute, `[!exists]=true` and `[length]=0` returned the same 16 products, so V3 may treat empty values as undefined in some cases. | Postman → `exists`: "True when the item has its value defined"; `API V3 - status map (08_10_2026).md` → "Filters" table; `config/api-testing.config.md` → quirk #100 | In V1/V2, does `!exists` match a `null`, an empty string, or an empty list? Do `!eq` and `!in` include records where the field is missing? In V3, does `[!exists]` also match empty strings and empty lists? | 2026-10-14 | |
| FB-016 | Open | F6: "Please verify when in, includes, or intersects preserves the legacy behavior, rather than presenting one universal translation for every attribute type." | Legacy `in` applies to multiselect and dropdown attributes (case-sensitive) and to `categories`. V3 documents `[in]` for single values and `[intersects]` for lists. `[intersects]` is confirmed live on `categories.name`, but `[in]` on a list field has never been tested. `includes` and `!includes` appear in the API's operator list and in no Plytix document. | Postman → `in`: "Multiselect and Dropdown attributes are case sensitive"; `config/api-testing.config.md` → quirks #99 and #100 | For a multiselect attribute or `categories`, which V3 operator returns the same records as legacy `in`: `[in]`, `[intersects]`, or `[includes]`? What do `includes` and `!includes` do? | 2026-10-14 | |
| FB-017 | Open | F3: "Confirm that the relationship, product, and quantity predicates match the intended association." | The path `product_relationships.related_products.related_product_id` matches the 2026-10-02 spec and the October 8 documentation, and the page now uses it. We haven't tested this filter live. The October 8 documentation itself warns that, in a related form, "the link could belong to a different relationship". In V1, each `product_ids` object ties the product to its quantity condition. | `openapi_pimv3_20261002 (Latest spec).json` → `ProductRelationshipModelOutputDto.related_products` → `RelatedProductModelOutputDto { related_product_id, quantity }`; `API V3 - status map (08_10_2026).md` → "Related entities filtering" | When a V3 search combines `relationship_id`, `related_products.related_product_id`, and `related_products.quantity`, do all three conditions apply to the same related product within the same relationship? | 2026-10-14 | |

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
| FB-018 | Open | F2: "Reconcile the older internal document's ID-only wording with the latest specification." | The internal API V3 documents say a create returns `201` with only the new ID. The 2026-10-02 OpenAPI defines a full creation representation (for products, `ProductCreateOutputDto`, "without relationship expansions"), and our live test on 2026-10-01 returned the full created product. The page now follows the spec. | `materials/api-references/v3-reference/API V3.md` line 222 → "the response body will include the **ID of the created or modified entity**"; `API V3 - status map (08_10_2026).md` line 146 → "returns 201 `{id}`"; `openapi_pimv3_20261002 (Latest spec).json` → `CreateProductsResponse.data` → `ProductCreateOutputDto`; `config/api-testing.config.md` → quirk #84 | Is the creation representation (the record without relationship expansions) the intended, final contract for every resource's create? If so, could the internal API V3 document be updated to drop the ID-only wording? | 2026-10-14 | |
| FB-019 | Open | F3: "The claim that PATCH deletes every omitted attribute is significant and is not established by the input schema alone. Please provide a minimal before/after example or dev-team confirmation." | Confirmed live on 2026-10-01 with a controlled test: after setting `brand` and `care_instructions`, a PATCH naming only `brand` removed `care_instructions` from the product. Top-level fields merge as expected. The page now shows this before/after example. No Plytix source says whether the replacement is intended. | `config/api-testing.config.md` → quirk #85: "`care_instructions` is **gone from the record entirely**"; `openapi_pimv3_20261002 (Latest spec).json` → `ProductUpdateInputDto.attributes` ("Custom product attributes", no merge or replace rule) | Is replacing the whole `attributes` map on PATCH the intended behavior, or should it merge? If intended, could the spec's `attributes` description state it? | 2026-10-14 | |
| FB-020 | Open | F3: "Verify the single-attribute PATCH payload." | A bare JSON string sent to `PATCH /products/{id}/attributes/brand` returned `204` and changed only that attribute (live, 2026-10-01). The OpenAPI declares no request body for `PATCH /api/v3/products/{identifier}/{path}`, and we haven't tested numbers, lists, or other attribute types on this path. | `config/api-testing.config.md` → quirk #87: "`-d '"BrandViaSubpath"'` on `.../attributes/brand` → `204`"; `openapi_pimv3_20261002 (Latest spec).json` → `PATCH /api/v3/products/{identifier}/{path}` (no `requestBody`) | Is the bare JSON value the documented body for every attribute type (numbers, multiselect lists, media)? Will the spec declare a request body for this path? | 2026-10-14 | |
| FB-021 | Open | F5: "Distinguish deleting a resource, deleting an attribute override, and unlinking an association. Keep the inheritance explanation for attribute deletion." | The page now separates the three. That deleting a variant's attribute override shows the parent's value again rests on one design-document sentence. We can't test it, because automatic inheritance is disabled on the dev account. **Retested 2026-10-14, still gated:** creating a family with `parent_attributes` still returns `403 Forbidden`, "Automatic inheritance is not available for this account". On scratch products without inheritance, a variant didn't receive the parent's `brand`. After `PATCH .../attributes/brand` (`204`) the variant showed its own value. After `DELETE .../attributes/brand` (`204`) the key was gone from the variant: not `null` and not the parent's value. `overwritten_attributes` stayed `[]` throughout. That fits the "doesn't set null" half of the sentence, but the inheritance half still can't be observed. | `materials/api-references/v3-reference/API V3.md` line 232 → "it doesn't set null or applies defaults (it can cause inheritance to resolve for the field)"; `config/api-testing.config.md` → status gating #4 | When you DELETE `/products/{variant_id}/attributes/{name}` on a variant that overrides its parent's value, does the variant then show the parent's value? Could inheritance be enabled on David's Dev Account so we can confirm it? | 2026-10-14 | |

### Possible stale or inconsistent source material

- Create response: the internal API V3 documents (ID only) disagree with the 2026-10-02 OpenAPI and live tests (full creation representation). See FB-018.
- `PATCH /api/v3/products/{identifier}/{path}` has no declared request body in the 2026-10-02 OpenAPI, though the path works live (FB-020).
- This review also cites the October 13 OpenAPI (see FB-008).

### Follow-ups on other pages

- `fumadocs/content/docs/guides/migrating-to-v3/index.mdx`: line 161 ("V3 returns the full entity on a create, so code that reads a create response keeps working") and line 165 ("`201` with the full created entity") contradict F2. The "PATCH recently changed to 204" callout (lines 172-174) should be replaced, as F9 asked. Line 180 and the troubleshooting accordion (line 203) recommend read-merge-write without the concurrency caveat from F4.
- `fumadocs/content/docs/reference/v3/updates-and-deletes.mdx`: lines 12, 38, and 42 say POST returns "the full created record". Lines 57 and 66 recommend read-merge-write and show a bare `34.99` number body, which we haven't tested (FB-020). Line 98 says field-level POST works on attributes, but the October 8 status map marks field-level POST as Postponed.
- Run the `endpoint-tester` skill on a single-attribute PATCH with a number and with a list value (FB-020).
