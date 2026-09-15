# 13 — Product Families & Product Family Models

Covers `GET /api/v3/product-families` and `GET /api/v3/product-family-models`
(both `{identifier}`/`{path}` variants too), run against `Dev`.
Self-contained. **Was fully read-only** through 2026-09-08 —
`openapi_pimv3.json` declared no `POST` for either resource. The
2026-09-15 spec refresh (51→63 paths) changed this for `product-families`
— see the Update section below for the new write endpoints (create,
update, delete, and a new family-attributes sub-resource).
`product-family-models` remains read-only; not affected by this refresh.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| List Product Families | GET | Search families | Real pre-existing data, no fixture needed |
| Get Product Family by ID | GET | Fetch by Mongo ID | Resolves the Phase 2b product's `product_family_id` |
| Get Product Family Model by ID | GET | Fetch a family's model | Richer shape: variation-level attribute label arrays |
| Get Family Attributes (Top-Level) | GET | Search all family<->attribute links | **New (2026-09-15)**; **not account-scoped without a filter — cross-tenant data leak** |
| Get Family Attributes Collection | GET | List one family's linked attributes | **New**; correctly scoped |
| Create Family Attribute Link | POST | Link an attribute to a family | **New**; `201`; reveals `FamilyAttributeLinkInputDto` via 422 discovery |
| Get Family Attribute by ID | GET | Fetch one link | **New**; matches spec's raw field list exactly |
| Update Family Attribute Level | PATCH | Change a link's `level` | **New**; `403` — account-level feature gate ("Automatic inheritance is not available for this account") |
| Delete Family Attribute Link | DELETE | Unlink an attribute | **New**; `204`; also documents the identity endpoint's idempotent-link `POST` (`409` if already linked) |
| Create Product Family | POST | Create a family | **New — genuinely writable now**, resolving quirk #38's "zero write capability" finding; `201`; `409` on duplicate name |
| Update and Delete Product Family | PATCH/DELETE | Rename + delete | **New**; both work; also documents the generic subpath `PATCH` and a `POST`-not-allowed (405) spec mismatch |

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

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` added 12 new paths overall this refresh, several of
them here: `GET /family-attributes` (top-level), `GET`/`POST
/product-families/{id}/attributes` + `GET`/`PATCH`/`DELETE`/`POST
/product-families/{id}/attributes/{attribute_id}[/{path}]`, and
`POST`/`PATCH`/`DELETE` on `/product-families` and
`/product-families/{identifier}[/{path}]` (previously `GET`-only).

**Major finding**: Product Families are genuinely writable now —
Phase 3 (quirk #38) found **zero** write capability at all. Confirmed
live: `POST /product-families` creates a real family (`201`,
auto-assigned 4 default system attributes even with no `attributes` in
the body); `PATCH` (name only, by design — attribute-membership changes
are excluded because they trigger a destructive cross-product
propagation that must go through a Job); `DELETE` (`204`/`404`).

**Critical finding — cross-tenant data leak**: `GET /family-attributes`
with no filter returns link records from *other Plytix accounts*, not
"David's Dev Account" — the first endpoint in this whole project found to
not auto-scope to the caller's account. Filtering with `?account_id=<id>`
avoids it. The same pattern was independently found on two more brand-new
endpoints in `17-Product-Relationships/` — see that folder's README and
`config/api-testing.config.md`'s new quirk for the full three-endpoint
writeup. **Report to Plytix.**

**Other findings**: `PATCH` on a family-attribute link's `level`
(automatic inheritance) is gated behind a `403 PermissionError` on this
account — a genuine feature tier, not a validation error; `POST` on the
family-attributes identity endpoint is an idempotent link (`409` if
already linked); the generic subpath `PATCH /product-families/{id}/name`
works but `POST` on the same subpath 405s despite the spec declaring
`post` as a valid method there (a real spec-vs-live mismatch).

Disposable scratch families/links were used throughout and fully cleaned
up — no new fixtures kept for this resource (the real pre-existing
"Accessories"/"Apparel"/"Office Supplies" families still cover every
read-only need).

## Open items

- [ ] Report the `GET /family-attributes` cross-tenant data leak to
      Plytix (see `17-Product-Relationships/README.md` for the other two
      affected endpoints).
- [ ] Ask Plytix whether the `POST`-405-on-subpath spec mismatch for
      `/product-families/{id}/{path}` is expected.
- [ ] Ask Plytix whether "automatic inheritance" (the `403` on
      family-attribute `level` changes) can be enabled on this Dev
      account so the `PATCH` success shape can finally be captured.
