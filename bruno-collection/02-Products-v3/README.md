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
| Get Product by ID | GET | Fetch by Mongo ObjectId | 200, full `ProductOutputDto`-shaped body; also carries the paired "404 after delete" confirmation for `Delete Product.bru` |
| Get Product by SKU (Invalid Identifier) | GET | Fetch by SKU (trigger case) | **422** — contradicts `API V3.md`'s identifier-flexibility claim |
| Search Products - Pagination | GET | `_page`/`_page_size` | Works; `_offset`/`_limit` does not (400) |
| Search Products - Filters | GET | Field/operator/relation filters, `_fields`/`_expand` edge cases | All 3 filter dialects work; `_expand` 400s; `category_ids` 400s but `categories` works |
| Get Product Subpath - Attributes | GET | `/attributes`, `/attributes/<name>` | 200 both; documents the generic subpath-discovery 400 trick |
| Get Product Subpath - Categories | GET | `/categories` | ⚠️ **Confirmed broken as of 2026-09-23** — always `200` with `[]`, regardless of real linkage. Use `_fields=categories` on `List Products` instead. |
| Get Product Subpath - Assets | GET | `/assets` | ⚠️ **Confirmed broken as of 2026-09-23** — always `200` with `[]`, regardless of real linkage. Use `_fields=assets` on `List Products` instead. Also spot-checks `assets/{id}/{path}` (unaffected — that's a different resource's subpath). |
| Get Product Subpath - Relationships | GET | `/relationships` | 200, still working as of 2026-09-23; real relationship + product-family fixture data found |
| Get Product Subpath - Static Lists | GET | `/static_lists` | ⚠️ **Confirmed broken as of 2026-09-23** — always `200` with `[]`, regardless of real linkage. Use `_fields=static_lists` on `List Products` instead. |
| Create Product - Missing SKU (422) | POST | Validation trigger case only, creates nothing | Confirms 422 error envelope shape |
| Create Product - Full Featured | POST | Wires in Phase 1/2a fixtures (categories, attribute, thumbnail) | **201**; kept fixture; `attributes` keyed by name; `category_ids` links immediately (unlike assets) |
| Delete Product | DELETE | Deletes a disposable product | **204** (not spec's 200); confirms SKU-identifier still fails on a self-created product |
| Delete Product Subpath (Hazard Fixed 2026-09-23) | DELETE | `.../{{id}}/categories`, a made-up subpath, and the 1:M Unlink pattern | ✅ **No longer deletes the product** — now `405`/`404`, safe rejection. Was a critical hazard until 2026-09-23 (Plytix fixed it) — see below. |
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
- ~~**⚠️ `DELETE /products/{identifier}/{path}` deletes the entire
  product**~~ — ✅ **Fixed as of 2026-09-23.** Originally confirmed
  2026-09-08 with both a real subpath name (`categories`, after confirming
  a category was actually linked) and a made-up one — both deleted the
  whole product. Re-tested 2026-09-23 on a fresh product with a real
  category link: now returns `405 Method Not Allowed` (recognized
  collection name) or `404 Not Found` (unrecognized field), and the
  product is confirmed fully intact both times. See `Delete Product.bru`'s
  docs for the full detail and fresh captured examples. Still true: there
  is no *working* scoped-unlink via `DELETE` — `PATCH` with a reduced
  `category_ids` array remains the only confirmed method.

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

## Update — 2026-09-22 (full-parameter examples for OpenAPI descriptions)

Added new `example{}` blocks (never replacing existing ones) to `List
Products.bru`, `Get Product by ID.bru`, `Create Product - Full
Featured.bru`, and `Update Product (PATCH).bru`, each maximizing the
number of live, confirmed-working parameters/fields shown in one request,
for use as OpenAPI description examples. All scratch resources created for
this pass (`WC-TEST-MAXPARAMS-PARENT`, `WC-TEST-MAXPARAMS-002`) were
deleted at the end of the session — no new fixtures kept.

New findings from this pass (also logged in
`config/api-testing.config.md`'s quirks list and, where blocking,
`bruno-collection/UNTESTED_ENDPOINTS.md`):

- ~~Setting `parent_id` on `POST /products` silently drops `category_ids`
  and `static_list_ids` from that same create call~~ — **❌ retracted
  2026-09-23, false positive.** See the 2026-09-23 update below.
- Sending `product_family_id` together with `parent_id` on the same
  `POST /products` call returns a vague `422 "product data validation
  failed"` with no field named — omit `product_family_id` when creating a
  variant. (Still accurate — confirmed to extend to `PATCH` too, see below.)
- **New account-level feature gate**: `PATCH /products/{id}` with
  `channel_ids` or `ecatalog_ids` (individually or together) returns `403
  {"errors":[{"name":"PermissionError","description":"UEF feature is not
  enabled for this account"}]}` — a 5th feature gate on this Dev account,
  alongside PDF Catalogs, Ecatalogs, and Automatic Inheritance. (Still
  accurate — see below for a new atomicity finding on top of this.)
- ~~**Possible regression, needs a dedicated re-check**: `static_list_ids`
  sent via `PATCH` does not link~~ — **❌ retracted 2026-09-23, false
  positive.** See the 2026-09-23 update below.
- `_fields` on `GET /products/{id}` is reconfirmed ignored (quirk #24);
  the new example captures a much richer real product body (BAG-10157's
  full ~50-key attributes map) than prior examples in this file, useful as
  a realistic OpenAPI example. It also shows `product_relationships` as a
  flat array of `{relationship_id, relationship_label, related_products}`
  — different from the nested `{"related_products": [...]}` object shown
  in this same file's older "Success - Fetch by Mongo ObjectId" example
  against the same product on an earlier date. Possible in-flight shape
  change on this field; worth flagging to Plytix.

## Update — 2026-09-23 (audit pass — corrections + a critical regression found)

Requested by the user: re-check every example in this folder for
correctness, and make sure the full-parameter examples genuinely cover
every field `openapi_pimv3.json` declares. Result: two of the 2026-09-22
session's findings above turned out to be false positives with the same
root cause, and auditing the folder surfaced a separate, real, critical
regression.

- **Root cause found — `GET /products/{id}/categories`, `.../assets`, and
  `.../static_lists` are all confirmed BROKEN, always returning an empty
  array regardless of real linkage.** Reproduced on a fresh scratch
  product and on the long-lived reference fixture `BAG-10157` (which
  genuinely still has 2 categories and 11 assets). The correct,
  confirmed-working way to get this data is `_fields=categories`/
  `_fields=assets`/`_fields=static_lists` on `List Products` — see its new
  "Full Parameters (Relationship Fields Expanded)" example. `/relationships`
  and `/attributes` subpaths are unaffected. Full writeup, and the
  corrected-to-broken `example{}` blocks, are in `Get Product Subpath -
  Attributes.bru`. **This regression is exactly what produced both of the
  2026-09-22 false positives above** — both were verified using the
  now-broken subpath instead of `_fields`. Re-verified with fresh live
  tests: `category_ids`/`static_list_ids` genuinely DO apply on `POST
  /products` even with `parent_id` set, and `static_list_ids` genuinely
  DOES apply via `PATCH` — no create-vs-patch split, no PATCH regression.
  Report the subpath bug to Plytix; it previously worked (2026-09-07
  captures of the same subpaths returned real expanded data).
- **New finding**: `product_family_id` + `parent_id` conflict (previously
  only confirmed on `POST` create) also applies to `PATCH
  /products/{id}` — same vague `422 "product data validation failed"`.
- **New finding**: the UEF feature gate on `PATCH /products/{id}` is
  atomic for the whole request, not just the gated fields — sending all
  12 `ProductUpdateInputDto` fields together (9 valid + `channel_ids`/
  `ecatalog_ids`/`product_data_sheet_ids`) returns a bare `403` and none
  of the 9 valid fields apply. `product_data_sheet_ids` alone is also
  confirmed gated by the same flag.
- **Fixed a wrong `account_id`** in 3 places across `Get Product by
  ID.bru` and `Create Product - Full Featured.bru` (both from the
  original 2026-09-07/08 session) — showed `6a38f5d5c3d65a5f868b1869`,
  corrected to the real, confirmed account id
  `6a38f5a5b22478f30bfd755c`.
- `Update Product (PATCH).bru`'s "200 - Full Parameters" example was
  expanded from 6 to 8 fields (now includes `parent_id` and
  `static_list_ids`, both re-verified genuinely applying) — the fullest
  successful combination possible on this account, given the UEF-gated
  fields' atomicity and the `parent_id`/`product_family_id` conflict.
- All scratch resources created during this audit were deleted; no new
  fixtures kept.

## Update — 2026-09-23 (Delete Product examples refreshed — critical hazard found FIXED)

User asked to check `Delete Product.bru` since its examples had empty
response bodies. Empty is actually correct for `204 No Content`, but both
examples were stale (2026-09-08 IDs, long since deleted) — refreshed with
a fresh, real POST-then-DELETE cycle. In the process, re-tested the
"Subpath Delete Hazard" example and found **the underlying bug is no
longer reproducible**:

- **`DELETE /products/{id}/{path}` no longer deletes the whole product.**
  Originally confirmed 2026-09-08 (quirk #31) and independently
  re-confirmed against the official "1:M Unlink" pattern 2026-09-11
  (quirk #54) — both destroyed the entire product regardless of `{path}`.
  Re-tested 2026-09-23 three ways on a fresh product with a real,
  confirmed category link: a recognized collection name (`/categories`)
  now returns `405 Method Not Allowed`; an unrecognized field name returns
  `404 Not Found`; the 3-segment "1:M Unlink" path also returns `404`.
  The product is confirmed fully intact (category link included) after
  all three. Plytix appears to have fixed this — see the new
  `Delete Product.bru` examples and `config/api-testing.config.md`'s
  quirks #31/#54 (both now marked resolved).
- Still true: neither pattern provides a *working* scoped unlink — only
  rejects safely instead of deleting. `PATCH` with a reduced
  `category_ids` array remains the only confirmed working removal method.
- All scratch resources created for this refresh were deleted; no new
  fixtures kept.

## Update — 2026-10-01 (pagination parameter verification)

Targeted verification of the five pagination request parameters that
`fumadocs/content/docs/reference/v3/pagination.mdx` carried as
`[PENDING]`/unconfirmed, plus the shape of the `pagination` response
block. Read-only — no resources created, modified or deleted, so no
cleanup was needed and no fixtures changed. Five new `example{}` blocks
added to `List Products.bru`.

| Parameter | Result |
|---|---|
| `_page` | ✅ Works. Must be `>= 1`; `_page=0`/`-1` → `422 "query._page: Input should be greater than or equal to 1"` |
| `_page_size` | ✅ Works. Max `1000`; `1001`+ → `422 "query._page_size: Input should be less than or equal to 1000"`. Default `25` |
| `_sort_by` | ✅ Works (ascending) |
| `_filtered_count` | ❌ `400 InvalidFieldError: Field '_filtered_count' does not exist.` |
| `_total_count` | ❌ `400 InvalidFieldError: Field '_total_count' does not exist.` — same on `/assets` |

Response-block shape (verified identically on `/products`, `/assets`,
`/product-categories`, `/pim-product-lists`, `/relationships`, so it's
the API-wide convention):

| Position in the result set | `pagination` contains |
|---|---|
| First page of several | `next_page` only |
| A middle page | both keys |
| The last page | `previous_page` only |
| Whole set fits on one page | `{}` (empty object) |
| A page past the end | `previous_page` only, `data: []`, status `200` |
| `GET /products/{id}` | no `pagination` key at all; `data` is an object |

**Three findings worth acting on** (full writeups as quirks #89-92 in
`config/api-testing.config.md`):

1. **No counts exist anywhere in v3.** Both count params 400, and the
   `Pagination` schema has no count fields. The only way to size a
   result set is to page to the end and tally. This is a regression from
   v1, which returned `total_count` on every search.
2. **Pagination keys are omitted, never `null`** — contradicting the
   spec's `Pagination` schema, which types both as `string | null`. A
   client testing `!== null` will loop forever.
3. **⚠️ `next_page`/`previous_page` are `http://` URLs.** They `301` to
   `https://...:443`, and clients that drop `Authorization` across a
   scheme-changing redirect then get `401 {"detail":"Unauthorized"}` —
   plain `curl -L` does exactly this. `--location-trusted` or rewriting
   the scheme works. This undercuts the otherwise-correct "follow the
   URL, don't rebuild it" guidance and is captured as the
   "401 - Following next_page Verbatim Drops Auth" example.

Also corrected: the `200 - Sparse Field Selection` example (captured
2026-09-04) showed `next_page` with an `https` scheme. The live API
returns `http`; the example had been tidied during transcription. Fixed.

Docs pages updated off the back of this: `reference/v3/pagination.mdx`
(both FLAG callouts resolved), `guides/migrating-to-v3/migration-reference.mdx`
(count row was wrong), `guides/quickstart.mdx` (showed null pagination
keys), `guides/exporting-your-full-catalog.mdx` (https scheme + new
redirect warning).

## Open items

- [ ] **Ask Plytix**: can `pagination.next_page`/`previous_page` be
      generated with the `https` scheme? Today they're `http`, and
      following one verbatim silently costs the caller their auth header
      on many clients. (Config open question #26.)
- [ ] **Ask Plytix**: is the total absence of a record count in v3
      deliberate? v1 returned `total_count` on every search; v3 has no
      equivalent and both `_total_count`/`_filtered_count` 400. (Config
      open question #27.)
- [ ] Ask Plytix: should the `Pagination` schema be corrected to match
      the API omitting keys, or should the API emit explicit nulls to
      match the schema? (Config open question #28.)
- [ ] Ask Plytix: is `GET /products/<sku>` meant to work on v3? (See
      config open question #5.)
- [ ] Ask Plytix: is `_expand` meant to work on `/products`, or is it
      legacy/v1-only? (Config open question #6.)
- [ ] Ask Plytix: are the undocumented raw-model fields
      (`product_family_model_id`, `mark_as_deleted`, `last_context`,
      `modified_user_audit`, `created_user_audit`) intentionally
      internal? (Config open question #7.)
- [x] ~~**Ask Plytix urgently**: is `DELETE /products/{id}/{path}`
      deleting the whole product intentional, or a bug?~~ — Resolved
      2026-09-23: no longer reproducible, Plytix fixed it. (Config open
      question #12.)
- [ ] Ask Plytix: is there a plan to add a genuinely *working* scoped
      unlink for categories/assets via `DELETE` (matching what
      `relationships` already has), now that the destructive behavior is
      fixed? (Config open question #13/#20.)
- [ ] **Ask Plytix urgently**: `GET /products/{id}/categories`,
      `.../assets`, and `.../static_lists` are confirmed broken (always
      return `[]`) as of 2026-09-23 — is this a known regression, and can
      it be fixed? It previously worked (2026-09-07 captures). See quirk
      #80 in `config/api-testing.config.md`.

---

## Update — 2026-10-08 (docs-review re-verification: the biggest behavior shift yet)

Run to re-verify the blocker claims in `output-reviewer-2026-10-08.md` and
close its testable flags, against "David's Dev Account". **This session
invalidated more prior findings in this folder than any before it.** Every
scratch resource created was deleted; `BAG-10157` and `WC-TEST-FULL-001`
were confirmed intact afterwards (2 categories each).

### Three things changed, and two of them break published guides

**1. All five `*_ids` relationship-array fields are now rejected on both
`POST /products` and `PATCH /products/{id}`** (quirk #93). `category_ids`,
`static_list_ids`, `channel_ids`, `ecatalog_ids`, `product_data_sheet_ids`
each return `422 "<field>: Extra inputs are not permitted"` — despite
`ProductCreateDto` and `ProductUpdateInputDto` still declaring all of them in
`openapi_pimv3.json`. Still accepted on both verbs: `label`, `gtin`, `status`,
`attributes`, `thumbnail_id`, `product_family_id`, `parent_id`.
This retracts quirks #26 and #27.

**2. The 1:M link/unlink pattern is implemented for categories, and it is
safe and scoped** (quirks #94, #95). Two new files in this folder:
- `Link Category to Product.bru` — `POST /products/{id}/categories` with body
  `{"id": "<category_id>"}` → `201`; duplicate → `409 AlreadyExists` with a
  message naming both sides.
- `Unlink Category from Product.bru` — `DELETE
  /products/{id}/categories/{category_id}` → `204`, product fully intact,
  only the named category removed. **This is the mechanism that replaces the
  now-rejected `category_ids` array.**

The sibling error paths are all non-destructive and now carry genuinely
helpful messages: bare-collection `DELETE` → `405` naming the correct path
form; unrecognized subpath → `404 "Product has no field '<x>'"`; `PATCH
/products/{id}/categories` → `405 "link or unlink here, and update a linked
entity at its own path."`

**3. The broken read subpaths are fixed** — quirk #80 is resolved. `GET
/products/{id}/categories` and `.../assets` now return real, fully expanded
data (verified on `BAG-10157`: 2 categories, real assets). The
always-empty-array regression is gone, which closes the urgent open item at
the bottom of this README.

### Other confirmations this run

| Behavior | Result |
|---|---|
| `PATCH /products/{id}` status | `204`, empty body (quirk #84 holds) |
| `{"thumbnail_id": null}` | `204`, clears the thumbnail (quirk #97) |
| `POST /products` status | `201`, `data` as an **object**, not an array |
| `parent_id` + `product_family_id` on create | **`201` — works** (retracts quirk #72) |
| `parent_id` + a *different* family | `422 "product data validation failed"` — this is the real rule |
| Variant with `parent_id` alone | Inherits the parent's `product_family_id` automatically |
| `product_level` / `num_variations` | Parent `0`→`1`, variant `2`, counter increments — unchanged |
| Asset link/unlink | **Not supported** — `POST .../assets` → `405`, `DELETE .../assets/{id}` → `404` (quirk #96) |

### Filter operators (relevant to every search example in this folder)

`icontains` is **rejected** — the operator is `contains:ignorecase` again,
reversing the 2026-10-01 finding (quirk #99). An invalid operator now returns
the authoritative list, which makes this cheap to re-check:

```
!contains, !contains:ignorecase, !eq, !exists, !gt, !gte, !in, !includes,
!intersects, !lt, !lte, !null, contains, contains:ignorecase, eq, exists,
gt, gte, in, includes, intersects, lt, lte, null
```

Both `[length]` and `[len]` work (quirk #100), as do `[null]`/`[!null]`,
`[intersects]` on a traversed field, `_or[#]`/`_and[#]`, `_fields=*`, and
`_sort_by=-<field>`. `_total_count` still `400`s. The `_![bool][#]`
NOT-grouping form from `API V3.md` does **not** work (`400`).

### Rate limits

No `429` could be produced: 80 requests issued 40-way parallel in ~2 seconds
(4x the JWT's stated 20-per-10-seconds burst limit) all returned `200`, and
**no PIM response carries any rate-limit header** (quirk #102). The JWT's
account claims still advertise `[{limit: 20, window_size: 10}, {limit: 5000,
window_size: 3600}]` and a 900-second token lifetime.

### Open items from this run

- [x] ~~`GET /products/{id}/categories`, `.../assets`, `.../static_lists`
      always return `[]`~~ — **resolved 2026-10-08**, all return real data.
- [x] ~~Is there a working scoped unlink for categories?~~ — **yes, shipped**;
      see `Unlink Category from Product.bru`.
- [ ] **Ask Plytix urgently**: was removing `*_ids` from `ProductCreateDto` /
      `ProductUpdateInputDto` intentional, and will the spec be corrected?
      Three published guides currently teach a call that `422`s. (Config open
      question #29.)
- [ ] **Ask Plytix**: with `*_ids` gone and no `/assets` link/unlink, there is
      no way to attach or detach a non-thumbnail asset via the API. Is an
      asset link/unlink endpoint coming? (Config open question #30.)
- [ ] **Ask Plytix**: `icontains` vs `contains:ignorecase` — which is
      supported going forward? And what are the undocumented
      `includes`/`!includes` operators? (Config open question #31.)
- [ ] **Ask Plytix**: are the JWT rate limits enforced anywhere? No `429` is
      reachable on the dev host. (Config open question #34.)
