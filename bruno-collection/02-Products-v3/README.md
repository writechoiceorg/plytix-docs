# 02 — Products (v3)

Covers `GET /api/v3/products` (search) and `GET /api/v3/products/{identifier}`
(and its `{path}` subroutes), run only against the `Dev` environment
("David's Dev Account") since v3 is unreachable under `Sandbox` (see
`config/api-testing.config.md`). This folder is self-contained — it
includes its own `Get Access Token (Dev)` request, so
`bru run "02-Products-v3/" --env "Dev"` works standalone.

This folder also carries **Phase 0** of `TESTING_PLAN.md` — the
cross-cutting behavior checks (query params, identifier flexibility,
subpath discovery, 422 shape) tested once here against `/products` as the
reference resource, since they apply to every v3 resource tested in later
phases. **Phase 2b** (real create/delete) extends it further, below.

Reference product used throughout Phase 0 (pre-existing, read-only
fixture — not created by these tests): SKU `BAG-10157`, id
`6a38f614c3d65a5f868b1a06`. Phase 2b additionally creates and keeps its
own fully-featured product — see below.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange for the Dev environment | See `01-Authentication` for shared auth findings |
| List Products | GET | Search products, sparse `_fields` | `_fields` works; spec declares no query params at all |
| Get Product by ID | GET | Fetch by Mongo ObjectId | 200, full `ProductOutputDto`-shaped body |
| Get Product by SKU (Invalid Identifier) | GET | Fetch by SKU (trigger case) | **422** — contradicts `API V3.md`'s identifier-flexibility claim |
| Search Products - Pagination | GET | `_page`/`_page_size` | Works; `_offset`/`_limit` does not (400) |
| Search Products - Filters | GET | Field/operator/relation filters, `_fields`/`_expand` edge cases | All 3 filter dialects work; `_expand` 400s; `category_ids` 400s but `categories` works |
| Get Product Subpath - Attributes | GET | `/attributes`, `/attributes/<name>` | 200 both; documents the generic subpath-discovery 400 trick |
| Get Product Subpath - Categories | GET | `/categories` | 200, expanded category objects |
| Get Product Subpath - Assets | GET | `/assets` | 200, expanded asset objects; also spot-checks `assets/{id}/{path}` |
| Get Product Subpath - Relationships | GET | `/relationships` | 200; real relationship + product-family fixture data found |
| Create Product - Missing SKU (422) | POST | Validation trigger case only, creates nothing | Confirms 422 error envelope shape |
| Create Product - Full Featured | POST | Wires in Phase 1/2a fixtures (categories, attribute, thumbnail) | **201**; kept fixture; `attributes` keyed by name; `category_ids` links immediately (unlike assets) |
| Delete Product | DELETE | Deletes a disposable product | **204** (not spec's 200); confirms SKU-identifier still fails on a self-created product |
| Delete Product Subpath - Deletes Entire Product (Warning) | DELETE | `.../{{id}}/categories` (or any subpath) | **Deletes the whole product**, `{path}` is ignored entirely — see warning below |
| Update Product (PATCH) | PATCH | Partial update (label/status, etc.) | **200**, full updated product returned; `PATCH` newly *formally declared* in the 2026-09-15 spec refresh (was already empirically confirmed working, quirks #26/#27) but never had its own file until now |

## Behaviors that differ from the spec

See `config/api-testing.config.md`'s "Known API quirks" #7-18 for the full
list with request/response detail. Summary:

- `openapi_pimv3.json` declares **zero** query parameters on `GET
  /products`, yet `_fields`, `_page`/`_page_size`, `_sort_by`, and three
  filter dialects (plain/operator/related-entity) all work live.
- `_offset`/`_limit` pagination and `_expand` do **not** work (400).
- `_fields=category_ids` 400s (`HiddenFieldError`); the plural
  `_fields=categories` works instead.
- The spec's `relationships` field doesn't exist live — the real field is
  `product_relationships`, and it has a different (flatter) shape as a
  `/relationships` subpath vs. the nested shape embedded in a full `GET`.
- **`GET /products/<sku>` does not work** — only the Mongo ObjectId is
  accepted as `{identifier}`, contradicting `API V3.md`.
- The subpath-discovery 400 trick (`GET /{resource}/{id}/{bogus-path}`
  returns a helpful "Available fields" list) works generically and is
  recommended for every later phase's subpath discovery.
- **`POST /products` returns `201`, `DELETE /products/{id}` returns
  `204`** — neither matches the spec's declared `200`-only response, both
  match `API V3.md`'s prose convention.
- **`category_ids` links immediately on `POST /products`** — unlike the
  identical field on `POST /assets`, which is silently ignored (see
  `09-Assets/README.md`). Relationship-array fields on create are
  resource-specific; don't assume either way.
- **`attributes` on create is keyed by the attribute's `name`**, not its
  Mongo id.
- **⚠️ `DELETE /products/{identifier}/{path}` deletes the entire
  product**, regardless of `{path}` — it is not scoped to the subpath at
  all. Confirmed with both a real subpath name (`categories`, after
  confirming a category was actually linked) and a made-up one. See
  `Delete Product Subpath - Deletes Entire Product (Warning).bru`'s docs
  for the full detail — this is a real hazard, not a documentation gap to
  casually paper over.

## Test report — 2026-09-04 / 2026-09-07 / 2026-09-08 (incl. Phase 5)

- ✅ **Auth (Dev)**: confirmed 2026-09-04 — see `Get Access Token (Dev).bru`.
- ✅ **List/search (`_fields`)**: confirmed 2026-09-04 — see `List Products.bru`.
- ✅ **Phase 0 complete, confirmed 2026-09-07**: identifier flexibility (ID
  works, SKU 422s), subpath discovery (`attributes`, `categories`,
  `assets`, `relationships` all 200 on products; `categories` 200 /
  `attributes`,`relationships`,`products` 400 on assets), pagination
  (`_page`/`_page_size` works, `_offset`/`_limit` doesn't, `_sort_by`
  works), filtering (plain/operator/related-entity all work), 422 shape
  (flat `errors: [{name, description}]`, distinct from the 401 auth shape
  and from FastAPI's default `HTTPValidationError`).
- ✅ **Phase 2b complete, confirmed 2026-09-08**: fully-featured product
  created and kept (`6aa022262b6fd055ffb7caa4`, SKU `WC-TEST-FULL-001`);
  `attributes`-keyed-by-name confirmed; `category_ids`-links-on-create
  confirmed (contrast with assets); plain `DELETE` confirmed `204`; the
  `DELETE`-subpath-deletes-whole-product hazard confirmed on two separate
  disposable products with different subpath names.
- All 14 requests in this folder pass `bru run "02-Products-v3/" --env
  "Dev"` on a first run (placeholder-free — every request uses a real
  ID/SKU or a `REPLACE_WITH_...` placeholder for the delete-oriented files
  whose original targets were themselves deleted during testing). **Note**:
  re-running "Create Product - Full Featured" after the fixture already
  exists returns `409 Conflict` (duplicate `sku`) instead of `201` —
  expected, not a regression (same `AlreadyExists` family as Phase 1's
  attribute groups/attributes — quirk #33).
- ✅ **Phase 5 (`USER_FLOWS.md`) complete, confirmed 2026-09-08**:
  parent/variant product structure (Flow 2 — `product_level`/
  `num_variations`/family `total_products` all confirmed live) and Smart
  list membership having zero product-side trace (Flow 4) — see
  `config/api-testing.config.md` quirks #46/#48. All 16 requests pass on
  a first run.

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` was refreshed and now formally declares `PATCH
/products/{identifier}` (previously undeclared but working, quirks
#26/#27) alongside `DELETE` (already declared). Retested live against a
disposable scratch product (`WC-TEST-PATCH-001`, id
`6aa98167a30ca5945169a245`, created and deleted in the same run — not the
kept `WC-TEST-FULL-001` fixture) and captured a real `example{}` in the
new "Update Product (PATCH).bru" file. See
`config/api-testing.config.md`'s 2026-09-15 session entry for the full
quirk list from this refresh, including a project-wide cross-tenant data
leak found on three brand-new endpoints elsewhere in the spec (not this
folder — see `13-Product-Families/README.md` and
`17-Product-Relationships/README.md`).

## Open items

- [ ] Ask Plytix: is `GET /products/<sku>` meant to work on v3? (See
      config open question #5.)
- [ ] Ask Plytix: is `_expand` meant to work on `/products`, or is it
      legacy/v1-only? (Config open question #6.)
- [ ] Ask Plytix: are the undocumented raw-model fields
      (`product_family_model_id`, `mark_as_deleted`, `last_context`,
      `modified_user_audit`, `created_user_audit`) intentionally
      internal? (Config open question #7.)
- [ ] **Ask Plytix urgently**: is `DELETE /products/{id}/{path}` deleting
      the whole product intentional, or a bug? (Config open question #12.)
- [ ] Ask Plytix: what's the supported way to unassign a single
      category/asset from a product, given subpath `DELETE` doesn't work
      as a scoped removal? (Config open question #13.)
