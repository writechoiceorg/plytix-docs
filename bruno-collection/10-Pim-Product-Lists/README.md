# 10 — Pim Product Lists

Covers `GET`/`POST /api/v3/pim-product-lists`, `GET .../{identifier}`,
and `GET .../{identifier}/{path}`, run against `Dev`. Self-contained.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Static Product List | POST | `type: "Static"` | **201**; reveals how Static membership actually works |
| Create Smart Product List | POST | `type: "Smart"` with a `query` | 201; filters on the kept product's `sku` |
| Get Product List by ID | GET | Fetch by Mongo ID | Subpath discovery |
| Create Product List - Missing Fields (422) | POST | Validation trigger | First **multi-entry** `errors` array seen this project |
| Update and Delete Product List | PATCH/DELETE | Rename + delete | Both work — 200/204; now formally declared (2026-09-15) |

## Behaviors that differ from the spec

- **Static list membership doesn't live on the list at all.** Creating a
  `type: "Static"` list auto-generates a `query` filtering on
  `static_lists contains <this list's own id>` — actual membership is set
  by `PATCH`ing the **product** (or asset)'s own `static_list_ids` field,
  not by anything on the list resource. See "Create Static Product
  List.bru"'s docs for the full trail.
- `openapi_pimv3.json` declares no `PATCH`/`DELETE` — both work anyway,
  same pattern as every resource tested so far.
- Missing-required-field 422s can return **more than one** error entry at
  once (`name` and `type` both flagged together) — the first resource
  this project has seen do that.

## Test report — 2026-09-08

- ✅ **Fixtures kept**: `6aa025bd2b6fd055ffb7cab4` ("WC Test Static
  List" — the Phase 2b kept product, `6aa022262b6fd055ffb7caa4`, was
  added as a member via `PATCH /products/{id}` with `static_list_ids`)
  and `6aa0322d2b6fd055ffb7cabb` ("WC Test Smart List", query on
  `sku=WC-TEST-FULL-001`). Both for Channels/Ecatalogs (Phase 4) via
  `product_list_id`.
- ✅ GET-by-id, subpath discovery, 422 (two-error-array), undeclared
  `PATCH`/`DELETE` (on a separate throwaway list, since deleted) all
  confirmed.
- All 6 requests passed on the initial run. **Note**: re-running "Create
  Static Product List" / "Create Smart Product List" after the fixtures
  already exist will 422 (`"A List with same name already exists"`)
  instead of 201 — list names are unique per account; expected, not a
  regression (quirk #38a).
- ✅ **Phase 5 (`USER_FLOWS.md`) Flow 5 resolved, confirmed 2026-09-08**:
  no list-side product-membership write path exists at all —
  `POST .../products` 405s, `PATCH .../products` 422s (`products` isn't
  a real field on `ProductListUpdateInputDto`). Confirms the only real
  mechanism is `PATCH /products/{id}` with `static_list_ids` (see
  `02-Products-v3`). See quirk #49 and "Update List Products Subpath -
  Not Supported (Flow 5).bru". All 7 requests pass on a first run.

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares both `PATCH` and `DELETE`
(previously undeclared but working, quirks #20/#35). Retested fresh
against a new disposable scratch static list, renamed the file to drop
"(Undeclared)", and captured real `example{}` blocks for both (rename
via `PATCH`, then `204`/`404` on `DELETE`).

## Update — 2026-09-22 (full-parameter examples for OpenAPI docs)

Added new `example{}` blocks (existing ones untouched) to give the docs
team maximal-parameter references:

- **New file `List Product Lists.bru`** — the collection `GET
  /pim-product-lists` endpoint had no dedicated `.bru` file before (only
  `GET .../{identifier}` was covered). Adds a full-parameter search
  example (`_fields` × 6, `_page`+`_page_size`, `_sort_by`,
  `name[icontains]`) plus a 400 example showing `_fields=type` is
  rejected on search even though `type` is a real field on the
  single-item `GET`. New finding: the search endpoint's valid `_fields`
  set (`_created_at, _id, account_id, created, created_user_audit, id,
  modified, modified_user_audit, name, query, revision_id`) does not
  include `type` — narrower than the full resource shape. `revision_id`
  is accepted in `_fields` but silently absent from the response (same
  silent-drop pattern as quirks #13/#25/#26).
- **`Create Static Product List.bru`** — added a full-parameter Smart
  list create demonstrating `query`'s full expressiveness: two AND-ed
  conditions in one OR-group plus a second OR-ed group, across three
  operators (`eq`, `gt`, `like`).
- **`Update and Delete Product List.bru`** — added a full-parameter PATCH
  example combining a rename with a full `query` replace (confirms
  `query` on `PATCH` is SET-replace, not merge).

Fixture used (`6ab2fa2c125f1d0ceeeed6b4`, "WC Test Full Params Smart
List") was disposable — created, PATCHed, and deleted in the same
session; not kept.

## Open items

- [ ] Ask Plytix: is the Static-list-via-product-field mechanism
      intentional public API design? (Config open question #15.)
