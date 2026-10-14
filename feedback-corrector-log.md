# Feedback corrector run log

Record of every `feedback-corrector` run: the feedback received, what our sources said, what changed on the page, and the reply sent to David. One section per page, newest run first. Open questions for Plytix live in [`feedback-flags.md`](feedback-flags.md).

**Last updated:** 2026-10-14

## Index

| Page | Runs | Last run |
|---|---|---|
| [Overview](#overview) | 1 | 2026-10-13 |
| [The Plytix data model](#the-plytix-data-model) | 1 | 2026-10-13 |

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
