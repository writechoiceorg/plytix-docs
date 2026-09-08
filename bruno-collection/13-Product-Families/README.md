# 13 — Product Families & Product Family Models

Covers `GET /api/v3/product-families` and `GET /api/v3/product-family-models`
(both `{identifier}`/`{path}` variants too), run against `Dev`.
Self-contained. **Fully read-only** — `openapi_pimv3.json` declares no
`POST` for either resource.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| List Product Families | GET | Search families | Real pre-existing data, no fixture needed |
| Get Product Family by ID | GET | Fetch by Mongo ID | Resolves the Phase 2b product's `product_family_id` |
| Get Product Family Model by ID | GET | Fetch a family's model | Richer shape: variation-level attribute label arrays |

## Test report — 2026-09-08

- ✅ This account already has real product family data (e.g.
  "Accessories", "Apparel") — no scratch data created or needed, per
  `TESTING_PLAN.md`'s own preference not to force family data into
  existence.
- ✅ Confirmed the Phase 2b kept product's auto-assigned
  `product_family_id` (`6a38f5d8c3d65a5f868b186e`, "Accessories")
  resolves to a real family, even though that product was created
  standalone with no explicit family wiring in its create body.
- ✅ Subpath discovery on both resources matches their spec'd output DTOs
  exactly — no undocumented fields found here (unlike products/assets).
- All 4 requests pass `bru run "13-Product-Families/" --env "Dev"`.

## Open items

- None.
