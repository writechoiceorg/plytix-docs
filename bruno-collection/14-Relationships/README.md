# 14 — Relationships

Covers `GET /api/v3/relationships` (and `{identifier}`/`{path}`
variants), run against `Dev`. Self-contained. **Was fully read-only**
through 2026-09-08 — `openapi_pimv3.json` declared no `POST`, and per
`API V3.md`, relationship *types* were said to be configured only in the
web app dashboard. The 2026-09-15 spec refresh (51→63 paths) changed
this — see the Update section below. This folder is about relationship
*types* (e.g. "Bundles", "Cross-sell"); linking specific *products* to
each other under a type is covered in `17-Product-Relationships/`.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| List Relationships | GET | Search relationship types | Real pre-existing data (2 types); `_fields` works |
| Get Relationship by ID | GET | Fetch by Mongo ID | Resolves the Phase 2b product's `product_relationships` reference |
| Create Relationship | POST | Create a relationship type | **New (2026-09-15)** — genuinely writable now, resolving quirk #38 and contradicting `API V3.md`'s dashboard-only claim; `201`; `409` on duplicate name |
| Update and Delete Relationship | PATCH/DELETE | Rename + delete | **New**; `PATCH` only accepts `name` — `label` is derived once at creation and frozen thereafter |

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

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` added `POST /relationships` and
`PATCH`/`DELETE /relationships/{identifier}[/{path}]` — this resource was
confirmed genuinely read-only in Phase 3 (quirk #38), and `API V3.md`
explicitly claimed relationship types could only be managed via the
dashboard. **Both are now confirmed false**: `POST` creates a real
relationship type (`201`, `label` auto-derived/slugified from `name`,
`status` defaults to `"ACTIVE"`); `PATCH` renames it (`name` only,
`label` frozen); `DELETE` removes it (`204`/`404`). Duplicate names
409 (`AlreadyExists`, same family as products/attributes/channels).

Disposable scratch relationship types were used and fully cleaned up — no
new fixtures kept (the 2 real pre-existing types, "Bundles"/"Cross-sell",
still cover every read-only need). A second scratch relationship type was
also created here and used to test the new product-linking endpoints in
`17-Product-Relationships/`.

## Open items

- None.
