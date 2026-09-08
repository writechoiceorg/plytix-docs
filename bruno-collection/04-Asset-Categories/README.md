# 04 — Asset Categories

Covers `GET`/`POST /api/v3/asset-categories`, `GET .../{identifier}`, and
`GET .../{identifier}/{path}`, run against `Dev`. Self-contained.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Asset Category | POST | Create a category | **201**; fixture kept |
| Get Asset Category by ID | GET | Fetch by Mongo ID | Same shape as product categories; subpath discovery matches spec exactly |
| Delete Asset Category (Undeclared) | DELETE | Not in spec | Works — 204 |
| Create Asset Category - Missing Name (422) | POST | Validation trigger | Same 422 envelope |

## Behaviors that differ from the spec

Identical pattern to `03-Product-Categories`: undeclared `DELETE` works
(204, confirmed 404 after); create returns `201` not the spec's `200`.

## Test report — 2026-09-07

- ✅ Created one category (`6a9f1b862b6fd055ffb7c7de`, "WC Test Asset
  Category"). **Kept as a fixture** for Assets (Phase 2a) to reference via
  `category_ids`.
- ✅ GET-by-id and subpath discovery confirmed — raw field list matches
  the spec's `AssetCategoryGetOutputDto` exactly, no undocumented fields.
- ✅ Undeclared `DELETE` confirmed on a separate throwaway category
  (since deleted).
- ✅ 422 validation shape confirmed on missing `name`.
- All 5 requests passed on the initial run. **Note**: re-running "Create
  Asset Category" after the fixture already exists will 422 (duplicate
  name), same expected behavior as `03-Product-Categories`.

## Open items

- [ ] Same open question as `03-Product-Categories` re: whether undeclared
      PATCH/DELETE is stable/intentional (config open question #8).
