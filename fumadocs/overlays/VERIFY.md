# Pending live verification

Live checks against the V3 API are **on hold** (since 2026-10-20): the Dev API key in `bruno-collection/.env` is rejected by both `auth.dev.plytix.com` and `auth.plytix.com` (`401 "Bad api_key or api_password: Query did not throw any results"`). Resume once Plytix issues a new Dev key. Quote the password in `.env`, since it contains `&`.

Everything below is published from documented findings (`config/api-testing.config.md`, `feedback-flags.md`, Bruno captures, Plytix answers) but hasn't been replayed against the live API since the overlays were written. When you replay an item, fix any overlay text it contradicts, record the result in `config/api-testing.config.md`, and close the matching question in `QUESTIONS.md`.

Write tests: Dev account only, scratch resources named `WC-TEST-*`, cleaned up afterwards (`bruno-collection/TESTING_PLAN.md`).

## Phase 1 pilot

| Check | Overlay | Closes |
|---|---|---|
| `POST /products` returns `201` with the current key set; duplicate SKU returns `409` (exact body, `data: []` present?) | `ops/products.yaml` | |
| `PATCH /products/{id}` returns `204`, empty body; same body twice; `sku` in body returns `422`; SKU as identifier | `ops/products.yaml` | PROD-12, PROD-13 |
| `PATCH` with `parent_id` only, to a parent in another family | `schemas/products.yaml` | PROD-15 |
| `POST /assets` with `content` + `filename` (plain base64 and `data:` prefix); without `filename`; with both `url` and `content`; unreachable URL | `ops/assets.yaml` | ASSET-5, ASSET-6 |
| `DELETE /product-categories/{id}` on a parent with a child and a linked product; second delete on the same ID | `ops/product-categories.yaml` | CAT-1, CAT-2, CAT-3 |
| Search: `_page=0` body, unknown `_fields`, unknown operator body, `filters=x` | `ops/products.yaml`, `10-shared.yaml` | OAS-6 |

A ready-made script for these checks was used on 2026-10-20 (it reads `.env` with Node, never `source`s it, and prints no secrets). Ask for it to be recreated under `bruno-collection/` when resuming.

## Phase 2

### On hold (left out of the docs)

These operations are `on-hold` in `upstream/visibility.yaml` because the live API contradicts the spec (FB-024 on 2026-10-15; quirk #63 still on 2026-10-13). Retest them, rewrite their overlay text (it predates Phase 2 and is tagged `x-review`), then set them back to `public`. Closes REL-2.

- `POST /api/v3/products/{product_id}/relationships` (405)
- `GET /api/v3/products/{product_id}/relationships` (404)
- `POST` and `PATCH /api/v3/products/{product_id}/relationships/{relationship_id}` (405, 422)
- `GET`, `PATCH`, `DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}` (never worked)
- `GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products`, `/{related_product_id}`, and `/{related_product_id}/{path}` (empty or 404)

### Published, needs a recheck

| Check | Overlay | Closes |
|---|---|---|
| `GET` and `DELETE /products/{product_id}/relationships/{relationship_id}` still work after FB-024 (last verified 2026-09-15); does DELETE remove all related products under the type? | `ops/product-relationships.yaml` | REL-2 |
| `GET /product-relationships` item shape (FB-024 noted new field names on 2026-10-15) | `ops/product-relationships.yaml` | |
| `GET /related-products` item keys after `account_id` was dropped; does `relationship_id` actually filter? | `ops/related-products.yaml` | |
| `GET /products/{id}/{path}`: `static_lists`; unknown field status and body; `_fields=categories` on GET by ID | `ops/products.yaml` | |
| `POST /products/{id}/{path}` on a non-link path (for example `label`), and on `attributes/<new_label>` | `ops/products.yaml` | |
| `DELETE /products/{id}` on a parent with variants, and on a product with links | `ops/products.yaml` | PROD-16 |
| Family attributes: identity `POST` success (body, `level`), `PATCH` success on an account with inheritance, current record keys (`account_id`?), field routes, unlink effect on product values | `ops/family-attributes.yaml` | FAM-2 |
| Family attributes `POST` with an unknown `attribute_id`, an invalid `level`, an already-linked attribute | `ops/family-attributes.yaml` | |
| List a family with more than 25 attributes: is the collection GET paginated or truncated? | `ops/family-attributes.yaml` | |
| `variant_level` inheritance (sub-variants follow a variant's value); only `parent_level` was tested | `ops/family-attributes.yaml` | |
| Family-attribute field routes (`GET`/`PATCH`/`DELETE .../{path}`) | `ops/family-attributes.yaml` | FAM-3 |
| Linking and unlinking static lists through `/products/{id}/{path}` (documented only for categories until PROD-17 is answered) | `ops/products.yaml` | PROD-17 |

## Phase 3

### On hold

- `POST /api/v3/product-families/{identifier}/{path}`: returns `405 "POST is not allowed on this path."` for every path (quirk #67, FAM-1). Closes FAM-21.

### Published, needs a recheck

| Check | Overlay | Closes |
|---|---|---|
| `GET /product-attributes` unfiltered returns only own-account rows (cross-tenant rows seen 2026-09-21/22, never retested); filters `type=`, `label=`; capture a 200 body | `ops/product-attributes.yaml` | ATTR-20 |
| `POST /product-attributes`: `label` omitted with a capitalized `name`; invalid `label` body; multiline; invalid-type message; formula 201 below the limit; completeness 201 body | `ops/`, `schemas/product-attributes.yaml` | ATTR-21, ATTR-25, ATTR-26 |
| `PATCH /product-attributes/{id}` returns `204` (last captures `200` + body); field that doesn't apply to the type; `options` replacement | `ops/product-attributes.yaml` | ATTR-27 |
| `PATCH`/`DELETE /product-attributes/{id}/{path}`; `GET .../groups` body; delete side effects | `ops/product-attributes.yaml` | ATTR-22, ATTR-24, OAS-21 |
| `PATCH /product-attribute-groups/{id}` with `order`; delete a group with members; `DELETE .../{path}` | `ops/`, `schemas/product-attribute-groups.yaml` | GRP-20, GRP-21, GRP-23 |
| `GET /assets` and `/assets/{id}` record keys (examples built from expanded asset records, 2026-09-23); `DELETED` assets in search; `file_type` filter | `ops/assets.yaml` | ASSET-20 |
| `PATCH /assets/{id}` returns `204` (ASSET-3 and spec; last capture `200`); `alt_text: null`; `PATCH /assets/{id}/alt_text`; other `path` values | `ops/assets.yaml` | ASSET-21, ASSET-23 |
| `DELETE /assets/{id}` on an asset used as a thumbnail or media value | `ops/assets.yaml` | ASSET-22 |
| Asset categories: duplicate name `409` body; `PATCH` returns `204`; `parent_id: null`; delete with children or assets; field routes | `ops/asset-categories.yaml` | CAT-40 to CAT-43 |
| Product categories: duplicate name `409`; search item has no `parent_id` key at top level; create response field set; `slug` regenerated on rename; field routes | `ops/product-categories.yaml` | CAT-20 to CAT-23 |
| Asset lists: `PATCH` returns `204` (last capture `200`); `_fields=type` still `400`; stored-query operators (`like`); field routes; delete side effects | `ops/asset-lists.yaml` | LIST-21 to LIST-23, OAS-20 |
| Product families: `PATCH` and `PATCH .../name` return `204`; `attributes` in `PATCH` returns `422`; create 201 uses `id`; 403 name `Forbidden` on create; delete with products | `ops/product-families.yaml` | FAM-20, FAM-22 |
| Relationship types: `PATCH` returns `204`; `label` derivation for multi-word names; field routes; delete with product links; `DELETED` in search | `ops/relationships.yaml` | REL-20 to REL-22 |
| Product families and relationship types: rename to an existing name (`409` declared, untested); `id` (not `_id`) on families embedded in products and family attributes; `_fields=family_attributes.*` | `ops/product-families.yaml`, `ops/relationships.yaml`, `00-fixes.yaml` | FAM-22, FAM-23 |
| Product attributes: `id` (not `_id`) on every attribute type in create and get responses | `00-fixes.yaml` | ATTR-28 |

## Success examples written without a capture (2026-10-22)

These responses had `schema: {}` and no example, so the reference showed `null`. The examples follow the shape of the captured product field routes and use the IDs and values of each resource's GET example. Replace each one with a real capture.

| Check | Overlay | Closes |
|---|---|---|
| `GET .../{identifier}/{path}` 200 body for one field (`name`, `label`, `query`, `attribute_labels`): is `data` the bare value, with no `pagination`? Product categories: does `parent` match the example? | `ops/product-categories.yaml`, `asset-categories.yaml`, `asset-lists.yaml`, `relationships.yaml`, `product-families.yaml`, `product-attributes.yaml`, `product-attribute-groups.yaml` | |
| `GET /product-families/{id}/attributes/{attribute_id}/level` 200 body | `ops/family-attributes.yaml` | FAM-3 |
| `POST /product-families/{id}/attributes/{attribute_id}` 201 body and default `level` | `ops/family-attributes.yaml` | FAM-2 |
| `GET /product-attributes` 200 page (example ported from the pre-overlay staging spec) | `ops/product-attributes.yaml` | ATTR-20 |

## Field-audit handoff (2026-10-22)

These claims come from Plytix's 16 Oct 2026 handoff (`materials/api-references/endpoint-reviews/Plytix_API_v3_Writechoice_Reference.html`) or from captures replayed on a different route, and haven't been tested live. The excluded fields are hidden from the docs although the live API still returns them (QUESTIONS.md OAS-26).

| Check | Overlay | Closes |
|---|---|---|
| Without `_fields`, each resource returns only its default fields: no relations, and none of the excluded fields once Plytix filters them | `10-shared.yaml`, `ops/products.yaml` | OAS-26 |
| Product expansions: `_fields=thumbnail`, `parent`, `product_family` (object or `null`); `assets`, `categories` (lists) | `ops/products.yaml`, `schemas/products.yaml` | |
| Asset expansion: `_fields=categories` on `GET /assets` and `/assets/{id}` | `ops/assets.yaml`, `schemas/assets.yaml` | |
| Category expansions: `_fields=parent` (object) and `_fields=parents` (list; order?) on product and asset categories, search and get | `ops/product-categories.yaml`, `ops/asset-categories.yaml` | |
| Category search filtered by `parent_id=<id>` returns the direct children (used in the PM-61 delete warning); top-level categories with `parent_id[null]` or `[!exists]` | `ops/product-categories.yaml`, `ops/asset-categories.yaml` | CAT-21 |
| Attribute expansions: `_fields=groups` and `_fields=family_attributes` on search and get | `ops/product-attributes.yaml` | |
| Product family expansion: `_fields=family_attributes` on search and get | `ops/product-families.yaml`, `schemas/product-families.yaml` | FAM-23 |
| Family attribute expansions: `_fields=product_family` and `_fields=attribute`; a link with `level: null` | `ops/family-attributes.yaml` | |
| `PATCH /products/{id}` with `product_family_id: null` removes the family (spec and handoff; untested live) | `ops/products.yaml`, `schemas/products.yaml` | |
| Filter function `[lower]` and the negated group `_!or` (spec prose and handoff) | `10-shared.yaml`, `reference/v3/filtering-and-search.mdx` | |
| `filename[contains:ignorecase]` on asset search, and `filename` `like` `.jpg` in an asset list `query` (new examples replacing `extension`) | `ops/assets.yaml`, `ops/asset-lists.yaml`, `schemas/asset-lists.yaml` | OAS-27 |
| Newly public `POST /products/{id}/categories` and `DELETE /products/{id}/categories/{id}`: 201/409/422 captured 2026-10-08 on the same URLs, but the `404` bodies (unknown ID, category not linked) come from the generic `/{path}` route | `ops/products.yaml` | |
| Newly public `POST /product-attributes/{id}/groups` and `DELETE /product-attributes/{id}/groups/{id}`: 201 captured 2026-10-13; `409` body, `404`/`422` bodies and the DELETE `204` not captured in full | `ops/product-attributes.yaml` | |
| Families created with `name` only; the API still accepts `attributes`, `parent_attributes`, `variant_attributes` (hidden from the docs) | `ops/product-families.yaml`, `schemas/product-families.yaml` | OAS-26 |
