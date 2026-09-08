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
| Delete Product Attribute Group (Undeclared) | DELETE | Not in spec | Works — 204 |

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

## Open items

- [ ] Confirm whether `group_ids` sent on a `product-attributes` create
      actually links to this group — see `06-Product-Attributes`'s open
      item and config open question #11.
