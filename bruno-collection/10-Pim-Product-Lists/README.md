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
| Update and Delete Product List (Undeclared) | PATCH/DELETE | Not in spec | Both work — 200/204 |

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

## Open items

- [ ] Ask Plytix: is the Static-list-via-product-field mechanism
      intentional public API design? (Config open question #15.)
