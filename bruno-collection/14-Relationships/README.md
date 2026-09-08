# 14 — Relationships

Covers `GET /api/v3/relationships` (and `{identifier}`/`{path}`
variants), run against `Dev`. Self-contained. **Fully read-only** —
`openapi_pimv3.json` declares no `POST`; per `API V3.md`, relationship
*types* are configured in the web app dashboard, not this API.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| List Relationships | GET | Search relationship types | Real pre-existing data (2 types); `_fields` works |
| Get Relationship by ID | GET | Fetch by Mongo ID | Resolves the Phase 2b product's `product_relationships` reference |

## Test report — 2026-09-08

- ✅ This account has 2 real relationship types configured ("Bundles" /
  label `bundles`, "Cross-sell" / label `related_products`) — no scratch
  data needed.
- ✅ Confirmed `GET /relationships/{id}` resolves the exact
  `relationship_id` the Phase 2b kept product's `product_relationships`
  field already names, closing the loop from Phase 0/2's exploration of
  that field.
- ✅ Subpath discovery matches the spec's output DTO exactly.
- All 3 requests pass `bru run "14-Relationships/" --env "Dev"`.

## Open items

- None.
