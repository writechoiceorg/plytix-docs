# 03 — Product Categories

Covers `GET`/`POST /api/v3/product-categories`, `GET .../{identifier}`, and
`GET .../{identifier}/{path}`, run against `Dev` ("David's Dev Account").
Self-contained — includes its own `Get Access Token (Dev)` request.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding, see `01-Authentication` |
| List Product Categories | GET | Search categories | `_fields`/`_page_size` work, same as products |
| Create Product Category | POST | Create top-level category | **201** (not spec's 200); fixture kept |
| Create Child Product Category | POST | Create nested category (`parent_id`) | Confirms nesting via `path`/`n_children` |
| Get Product Category by ID | GET | Fetch by Mongo ID | Subpath discovery; `parent` computed subpath; SKU-style identifier-by-name fails (422) |
| Update and Delete Product Category (Undeclared) | PATCH/DELETE | Rename + delete, neither declared in spec | **Both work** — 200/204 |
| Create Product Category - Missing Name (422) | POST | Validation trigger | Same 422 envelope as products |

## Behaviors that differ from the spec

- `openapi_pimv3.json` declares no `PATCH`/`DELETE` for this resource at
  all — both work live (see `config/api-testing.config.md` quirk #20).
  This is the first resource where this was discovered this session.
- Create returns **`201`**, not the spec's declared `200`.
- `GET /product-categories/<name>` (by name instead of ID) fails the same
  way `GET /products/<sku>` does in Phase 0 — only the Mongo ObjectId
  works as `{identifier}`.

## Test report — 2026-09-07

- ✅ Created one top-level (`6a9f1b482b6fd055ffb7c7dc`, "WC Test Category")
  and one child category (`6a9f1b542b6fd055ffb7c7dd`, "WC Test Child
  Category", `parent_id` pointing at the first). **Both kept as fixtures**
  for Products (Phase 2b) to reference via `category_ids`.
- ✅ Nesting confirmed: child's `path` shows full ancestry; parent's
  `n_children` incremented from 0 to 1.
- ✅ Subpath discovery, `parent` computed subpath, identifier-by-name
  rejection, undeclared `PATCH` (rename) and `DELETE` — all confirmed on
  a separate throwaway category, created and destroyed in the same run
  (not one of the two kept fixtures).
- ✅ 422 validation shape confirmed on missing `name`.
- All 7 requests passed on the initial run. **Note**: re-running "Create
  Product Category" / "Create Child Product Category" after the fixtures
  already exist will 422 (`"Category ... already exists"`) instead of 201
  — category names are unique per account; this is expected, not a
  regression (see `config/api-testing.config.md` quirk #25a).

## Open items

- [ ] Ask Plytix whether undeclared PATCH/DELETE is a stable, intentional
      part of the public API (config open question #8) — determines
      whether docs can confidently promise rename/delete for this and
      every other Phase 1 resource.
