# 05 — Product Attribute Groups

Covers `GET`/`POST /api/v3/product-attribute-groups`,
`GET .../{identifier}`, and `GET .../{identifier}/{path}`, run against
`Dev`. Self-contained.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Product Attribute Group | POST | Create a group | **201**; fixture kept |
| Get Product Attribute Group by ID | GET | Fetch by Mongo ID | Subpath discovery matches spec exactly |
| Delete Product Attribute Group | DELETE | Not previously declared | Works — 204; now formally declared (2026-09-15) — note `PATCH` is still NOT declared for this resource |

## Test report — 2026-09-07

- ✅ Created one group (`6a9f1b872b6fd055ffb7c7df`, "WC Test Attribute
  Group"). **Kept as a fixture** — referenced by Product Attributes
  (`06-Product-Attributes`)'s `TextAttribute` fixture via `group_ids`
  (though see that folder's open item — the linkage's actual effect is
  unconfirmed).
- ✅ GET-by-id and subpath discovery confirmed — raw field list matches
  `ProductAttributeGroupOutputDto` exactly.
- ✅ Undeclared `DELETE` confirmed on a separate throwaway group (since
  deleted).
- No dedicated 422 trigger file for this folder (identical shape already
  confirmed on categories/attributes) — all 4 requests passed on the
  initial run. **Note**: re-running "Create Product Attribute Group"
  after the fixture already exists returns **`409 Conflict`**
  (`"AlreadyExists"`) — a different status/error name than categories'
  `422` duplicate-name response (quirk #25a).

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares `DELETE` for this resource
(previously undeclared but working). **Unlike almost every other
resource touched in this refresh, `PATCH` is still NOT declared** for
`product-attribute-groups` — so this folder only has a renamed
"Delete Product Attribute Group.bru" (dropped "(Undeclared)"), not a
combined update+delete file. Retested `DELETE` fresh against a new
disposable scratch group and captured a real `example{}` (204, then 404).

## Update — 2026-09-22 (full-parameter examples for OpenAPI docs)

Added new coverage (existing examples untouched):
- **New file** `List Product Attribute Groups.bru` — this endpoint had zero
  prior coverage (only Create/Get-by-id/Delete existed). Confirmed
  `GET /api/v3/product-attribute-groups` live with the same undeclared
  query-param support as other v3 list endpoints; captured a "Full
  Parameters" example combining `_fields`, `_page`/`_page_size`, `_sort_by`.
- `Create Product Attribute Group.bru`: new "Create Attribute Group - Full
  Parameters" example — `POST` with both `name` and a populated
  `attribute_labels` array (the full `ProductAttributeGroupCreateInputDto`),
  vs. the existing minimal example where `attribute_labels` defaults to
  `[]`. Scratch group deleted after capture.

## Open items

- [ ] Confirm whether `group_ids` sent on a `product-attributes` create
      actually links to this group — see `06-Product-Attributes`'s open
      item and config open question #11.
