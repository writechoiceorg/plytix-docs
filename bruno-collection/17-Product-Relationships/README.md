# 17 — Product Relationships

Covers the brand-new resources added in the 2026-09-15 `openapi_pimv3.json`
refresh (51→63 paths) for managing product-to-product relationships: the
top-level search endpoints `GET /api/v3/product-relationships` and
`GET /api/v3/related-products`, and the nested, write-capable
`GET`/`POST /api/v3/products/{product_id}/relationships` +
`GET`/`PATCH`/`DELETE .../relationships/{relationship_id}` +
read-only `.../relationships/{relationship_id}/related-products[...]`.
Run against `Dev` ("David's Dev Account"). Self-contained — includes its
own `Get Access Token (Dev)` request.

This is distinct from (but related to) the pre-existing, read-only
`GET /products/{id}/relationships` subpath confirmed in Phase 0 (see
`02-Products-v3/Get Product Subpath - Relationships.bru`) and the
`relationships` *type* CRUD in `14-Relationships/` (e.g. "Bundles",
"Cross-sell") — this folder is about linking specific *products* to each
other under one of those types.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Get Product Relationships (Top-Level) | GET | Search all product-relationship links | **Not account-scoped without a filter — cross-tenant data leak**; `relationship_id` filter 504s |
| Get Related Products (Top-Level) | GET | Search all related-product pairs | **Same cross-tenant leak**; `relationship_id` filter 500s (`HiddenFieldError`) |
| Get Product Relationships Collection | GET | List one product's relationship links | Correctly scoped; flat shape, no related-product id |
| Create Product Relationship Link | POST | Link a product to related product(s) under a relationship type | Confirms `ProductRelationshipLinkInputDto` shape via 422 discovery |
| Get Product Relationship by ID | GET | Fetch one link by relationship_id | Same flat shape as collection |
| Update Product Relationship (Quantity) | PATCH | Change a related product's `quantity` | Response *does* include `related_product_id`, unlike the GETs |
| Delete Product Relationship (Safe Unlink) | DELETE | Remove a relationship link | **First confirmed safe, scoped DELETE-based unlink in this whole project** |
| Get Related Products Subpath (Bug - Empty) | GET | `.../related-products[/{id}]` | **Bug**: returns empty/404 despite a confirmed live link |

## Behaviors that differ from the spec / real findings

- **Cross-tenant data leak (the most important finding in this folder).**
  Both `GET /product-relationships` and `GET /related-products`, called
  with no filter, return records belonging to *other Plytix accounts*,
  not "David's Dev Account." Every other v3 resource in this project
  (~50+ endpoints across Phases 0-5) is automatically scoped to the
  caller's account with no filter needed — this is the first exception
  found, and it's shared by a third new endpoint, `GET /family-attributes`
  (see `13-Product-Families/README.md`). Filtering explicitly by
  `?account_id=<id>` or `?product_id=<id>` avoids it. **Report to Plytix**
  — see `config/api-testing.config.md`'s new quirk/open question.
- `GET /product-relationships?relationship_id=<id>` times out (`504`,
  raw HTML, no JSON envelope). `GET /related-products?relationship_id=<id>`
  instead 500s with a `HiddenFieldError` (the `RelatedProduct` model has
  no `relationship_id` field) — two different failure modes for
  "filter by a field the model doesn't support," neither of which is the
  clean `400` this project's other resources return for the same class of
  mistake (quirk #12).
- **`GET .../relationships/{relationship_id}/related-products` (and its
  single-item variant) is broken** — returns empty/404 even immediately
  after a link is created and independently confirmed via three other
  paths (the create response, the product's own `product_relationships`
  field, and the top-level `/related-products?product_id=` search). Use
  the top-level search endpoint instead until fixed.
- The plain product's embedded `product_relationships` field is missing
  `related_product_id` on its nested `related_products` entries (only
  `quantity`/`last_modified`) — you cannot tell which product a link
  points to from that field alone; use this folder's dedicated endpoints
  or the top-level `/related-products` search instead.
- **`DELETE /products/{id}/relationships/{relationship_id}` is a real,
  safe, scoped unlink** — confirmed the product stays fully intact
  afterward, only the relationship link is removed. This contradicts the
  pattern found everywhere else in this project (`DELETE
  /products/{id}/categories[/{id}]` deletes the whole product — quirks
  #31/#54). Worth flagging to Plytix as evidence the safe pattern *is*
  achievable, and worth asking why it wasn't applied to the older
  category/asset subpath deletes too.

## Test report — 2026-09-15

- ✅ Two disposable scratch products (`WC-TEST-REL-A`/`WC-TEST-REL-B`)
  and one disposable scratch relationship type
  ("WC Test Product Relationship") were created, linked, patched
  (quantity), unlinked via the new safe `DELETE`, and then all three
  resources were deleted. **Nothing was kept as a fixture** — the safe
  `DELETE` meant no cleanup blockers, and no downstream folder currently
  depends on a product-relationship fixture existing.
- ✅ Confirmed the real `ProductRelationshipLinkInputDto` request shape
  via two rounds of 422 discovery.
- ❌ **Found broken**: the `related-products` subpath under a specific
  relationship (both collection and single-item forms).
- ❌ **Found leaking**: both top-level search endpoints, without an
  explicit account/product filter.
- ❌ **Found erroring oddly**: `relationship_id` as a filter on either
  top-level search endpoint (504 on one, 500 on the other).
- ✅ **Found genuinely good**: the new dedicated `DELETE` is the first
  safe, scoped unlink mechanism confirmed anywhere in this API.

## Update — 2026-09-22 (full-parameter examples for OpenAPI docs)

Added new `example{}` blocks (purely additive, no existing examples
touched) for use as OpenAPI description examples:

- `Get Product Relationships Collection.bru`: "Create Product Relationship
  Link - Full Parameters (Multiple Related Products)" — every prior
  example in this file links a single related product per call; this one
  links two at once in the same `related_products` array with distinct
  `quantity` values, against three fresh disposable scratch products and a
  disposable relationship type, all cleaned up afterward.
- `Get Product Relationships (Top-Level).bru`: "Full Query Parameters
  (Filtered + Fields + Sort)" — combines the required safe `account_id`
  filter with `_fields`, `_page`/`_page_size`, and `_sort_by`.
- `Get Related Products (Top-Level).bru`: "Full Query Parameters (Filtered
  + Fields + Sort)" — same combination, filtered by `product_id` against
  the kept `BAG-10157` fixture.

No new quirks found — the PATCH/DELETE full-parameter shapes were already
well covered by this file's existing examples (the `related_products`
entry DTO only has `product_id`/`quantity`, both already exercised).

## Open items

- [ ] Report the cross-tenant data leak on `GET /product-relationships`
      and `GET /related-products` (and `GET /family-attributes`, a third
      affected endpoint) to Plytix as a likely data-isolation bug.
- [ ] Report the broken `.../related-products[/{id}]` subpath to Plytix.
- [ ] Ask Plytix whether the safe, scoped `DELETE` on this new
      relationships resource can be backported to the older
      category/asset subpath-delete hazards (quirks #31/#54).
