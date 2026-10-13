# Feedback flags for the Plytix team

Running log of open questions and conflicts found while applying Plytix feedback to the docs. Maintained by the `feedback-corrector` skill: one section per page, updated in place.

**Last updated:** 2026-10-13

## Summary

| Page | Open | Resolved | Last run |
|---|---|---|---|
| [Overview](fumadocs/content/docs/guides/overview.mdx) | 3 | 0 | 2026-10-13 |
| [The Plytix data model](fumadocs/content/docs/guides/data-model.mdx) | 4 | 0 | 2026-10-13 |

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
| FB-002 | Open | F1: "v3 will introduce a new model whose details are still pending." | Today, V3 requests authenticate with the V1/V2 key and password exchanged for a bearer token at `auth.plytix.com`, and our live tests confirm that flow works. The Quickstart, the V3 Authentication reference, and the migration guide's authentication page all document it as the V3 flow. | `config/api-testing.config.md`; `fumadocs/content/docs/reference/v3/authentication.mdx`; AUTH-1 and AUTH-2 in `Questions for the Plytix Dev Team.md` | Until the new V3 model ships, is it correct to keep documenting the current key/password-to-bearer-token exchange for V3? When will details of the new model (token generation, access levels, error format) be available? | 2026-10-13 | |
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
