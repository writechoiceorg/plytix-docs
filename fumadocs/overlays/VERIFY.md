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
