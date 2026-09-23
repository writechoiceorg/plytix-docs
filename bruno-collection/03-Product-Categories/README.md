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
| Update and Delete Product Category | PATCH/DELETE | Rename + delete | **Both work** — 200/204; now formally declared in the spec (2026-09-15) |
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

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares `PATCH`/`DELETE` for this
resource (previously undeclared but working, quirk #20). Retested fresh
against a new disposable scratch category (the original file's target had
been deleted in the same 2026-09-07 run and had no `example{}`) and
renamed the file to drop "(Undeclared)". Real `example{}` blocks captured
for both `PATCH` and `DELETE` (204, then 404) — the first time this
file's live behavior was captured as a reusable, machine-readable
example rather than only prose in `docs{}`. One small new finding:
`order` comes back as a **string** (`"6"`) on the `PATCH` response,
unlike `POST`'s numeric `order` — a minor type inconsistency not
previously noted.

## Update — 2026-09-22 (full-parameter examples for OpenAPI docs)

Added new `example{}` blocks (existing ones untouched) showing every
parameter/field populated at once, for use as OpenAPI description examples:
- `List Product Categories.bru`: new "List Categories - Full Parameters"
  example combining repeatable `_fields`, `_page`/`_page_size`, `_sort_by`,
  and a `name[icontains]` operator filter in one call — all confirmed
  working together.
- `Update and Delete Product Category.bru`: new "Update Product Category -
  Full Parameters (PATCH, rename + re-parent)" example — `PATCH` with both
  `name` and `parent_id` set together (the full
  `ProductCategoryUpdateInputDto`), against two disposable scratch
  categories (both deleted after capture). `path` reflects the new
  ancestry immediately; `order` still comes back as a string on `PATCH`.
- `Create Product Category.bru` was not touched — its existing "Create
  Child Category" example already exercises the full
  `ProductCategoryCreateInputDto` (`name` + `parent_id`), so there was no
  gap to fill.

## Open items

- [x] Ask Plytix whether undeclared PATCH/DELETE is a stable, intentional
      part of the public API (config open question #8) — resolved by the
      2026-09-15 spec refresh formally declaring both.
