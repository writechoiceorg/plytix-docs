# 11 — Asset Lists

Covers `GET`/`POST /api/v3/asset-lists`, `GET .../{identifier}`, and
`GET .../{identifier}/{path}`, run against `Dev`. Self-contained. Same
shape/behavior as `10-Pim-Product-Lists` — see that folder's README for
the full detail on the Static-list-membership mechanism (spot-checked
here too, not re-documented in depth).

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Smart Asset List | POST | `type: "Smart"` with a `query` | **201**; fixture kept |
| Get Asset List by ID | GET | Fetch by Mongo ID | Subpath discovery matches product lists exactly |
| Create Asset List - Missing Fields (422) | POST | Validation trigger | Same two-entry `errors` array as product lists |
| Update and Delete Asset List | PATCH/DELETE | Rename + delete | Both work — 200/204; now formally declared (2026-09-15) |

## Test report — 2026-09-08

- ✅ **Fixture kept**: `6aa032522b6fd055ffb7cabd` ("WC Test Asset Smart
  List", query on `filename=wc_test_asset_renamed.jpg`) — for Ecatalogs
  (Phase 4) via `asset_list_id`.
- ✅ GET-by-id, subpath discovery, 422, undeclared `PATCH`/`DELETE` (on a
  throwaway `type: "Static"` list, since deleted) all confirmed.
- All 5 requests passed on the initial run. **Note**: re-running "Create
  Smart Asset List" after the fixture already exists will 422 (duplicate
  name), same expected behavior as `10-Pim-Product-Lists`.

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares both `PATCH` and `DELETE`
(previously undeclared but working). Retested fresh against a new
disposable scratch Smart asset list, renamed the file to drop
"(Undeclared)", and captured real `example{}` blocks for both. Aside:
the list-`query` body's filter operator vocabulary is `like`/`!like`
etc., not the `icontains` operator confirmed for live `GET` query-string
filters (quirk #11/#53) — two different filter DSLs, don't conflate them.

## Update — 2026-09-22 (full-parameter examples for OpenAPI docs)

Added new `example{}` blocks (existing ones untouched), mirroring
`10-Pim-Product-Lists`'s same-day update:

- **New file `List Asset Lists.bru`** — the collection `GET
  /asset-lists` endpoint had no dedicated `.bru` file before. Adds a
  full-parameter search example (`_fields` × 5, `_page`+`_page_size`,
  `_sort_by`, `name[icontains]`).
- **`Create Smart Asset List.bru`** — added a full-parameter create
  demonstrating `query`'s multi-group/multi-condition expressiveness
  (two AND-ed conditions in one group, a second OR-ed group).
- **`Update and Delete Asset List.bru`** — added a full-parameter PATCH
  example combining a rename with a full `query` replace using the
  `!exists` operator.

Fixture used (`6ab2fe75125f1d0ceeeed6c1`, "WC Test Full Params Smart
Asset List") was disposable — created, PATCHed, and deleted in the same
session; not kept.

## Open items

- None specific to this folder — see `10-Pim-Product-Lists`'s open item.
