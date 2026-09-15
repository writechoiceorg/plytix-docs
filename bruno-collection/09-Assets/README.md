# 09 — Assets

Covers `GET`/`POST /api/v3/assets`, `GET`/`PATCH .../{identifier}`, and
`GET`/`PATCH .../{identifier}/{path}`, run against `Dev`. Self-contained.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Asset - Empty Body (422) | POST | Trigger case | Real "url or content required" rule, not expressible in spec's `required` list |
| Create Asset | POST | Create from a public image URL | **201**; `category_ids` silently ignored on create |
| Update Asset | PATCH | Update `alt_text`/`filename`/`category_ids` | **200**; `category_ids` *does* link via PATCH (unlike POST) |
| Get Asset Subpath - Categories | GET | `/categories` | Confirms the PATCH-applied linkage persisted |
| Update Asset Subpath | PATCH | `/alt_text` | Undeclared in spec; body is a raw value, not an object |
| Delete Asset | DELETE | Not previously declared | Works — 204; now formally declared (2026-09-15) |

## Behaviors that differ from the spec

- `AssetCreateInputDto` declares no required fields, but the API still
  enforces "either `url` or `content`" as a real rule.
- **`category_ids` on `POST` is silently ignored** — only `PATCH` actually
  applies it. This is the opposite of what Products does (see
  `02-Products-v3/Create Product - Full Featured.bru`, where the identical
  field works immediately on create) — don't assume either behavior
  generalizes across resources.
- `openapi_pimv3.json` declares no `DELETE` for this resource — it works
  anyway (204), same pattern as every Phase 1 resource.
- `PATCH` subpath (`/{id}/{path}`) takes a bare value as the body, not a
  partial object — different convention than the root `PATCH`.

## Test report — 2026-09-08

- ✅ **Fixture kept**: `6aa021b72b6fd055ffb7ca9f`
  (`wc_test_asset_renamed.jpg`), linked to the Phase 1b asset category via
  `PATCH`, for Products (`02-Products-v3`) to reference via `thumbnail_id`
  — already wired into that folder's kept product.
- ✅ Empty-body validation, real create, root+subpath `PATCH`, subpath
  `GET`/discovery, and undeclared `DELETE` (on a separate throwaway
  asset, since deleted) all confirmed.
- All 7 requests pass `bru run "09-Assets/" --env "Dev"` on a first run.
  Re-running "Create Asset" will succeed again (no name-uniqueness
  constraint observed on assets, unlike Phase 1's named resources) but
  will create an **additional** duplicate asset each time — be aware if
  re-running this folder repeatedly.

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares `DELETE` for this resource
(previously undeclared but working) — `PATCH` was already declared
before this refresh. Renamed "Delete Asset (Undeclared).bru" to
"Delete Asset.bru" and retested fresh against a new disposable scratch
asset. Also captured "Update Asset.bru"'s first-ever real `example{}`
block, retesting the same `alt_text`/`filename` PATCH behavior against a
disposable scratch asset (not the kept fixture, to avoid mutating it
further) — this file previously only had prose `docs{}`, no example.

## Open items

- [ ] Ask Plytix: is `category_ids` meant to work on `POST /assets`, or
      is `PATCH`-after-create the intended flow? (config open question,
      relates to #12/#13.)
