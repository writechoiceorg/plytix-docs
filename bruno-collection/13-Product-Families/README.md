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

## Update — 2026-09-22 (full-parameter examples for OpenAPI descriptions)

Added new `example{}` blocks (existing examples untouched) to
`Create Product Family.bru`, `List Product Families.bru`, and
`Get Family Attributes (Top-Level).bru`, each exercising every optional
field/query-param at once, for use as OpenAPI request/response examples:

- **`Create Product Family.bru`**: a full-parameter create populating
  `attributes` with 3 real attribute refs (one custom, two system) in
  consistent `{id,label}` object form — `201`, all 3 linked at
  `level: "no_level"` (confirmed via a follow-up `GET .../attributes`).
  Two **new findings** captured as their own examples: (1) attribute
  references across `attributes`/`parent_attributes`/`variant_attributes`
  must be **all** plain-ID strings or **all** `{id,label}` objects —
  mixing forms across the three fields → `422 InputDTOValidationError`;
  (2) `parent_attributes`/`variant_attributes` on **create** are blocked
  by the *same* "Automatic inheritance is not available for this account"
  `403` that blocks the `PATCH` level-change endpoint — this account can
  only populate the plain `attributes` array (always links at
  `no_level`), not the parent/variant tiers, at create time either.
- **`List Product Families.bru`**: a full-parameter query combining
  `_fields` (5 fields), `_sort_by`, `_page`/`_page_size`, and a
  `name[icontains]` filter in one call — `200`, all confirmed working
  together.
- **`Get Family Attributes (Top-Level).bru`**: a full-parameter query
  combining the safe `account_id` filter with `product_family_id`,
  `_fields` (all 4 record fields), and `_page`/`_page_size` — `200`.

`Create Family Attribute Link.bru`'s existing "Success" example
(`attribute_id` + `level`) already exercises 100% of
`FamilyAttributeLinkInputDto`'s fields — no new example needed there.
Scratch family created for this session (`6ab2fe5c125f1d0ceeeed6b8`,
"WC Test Full Params Family") was deleted immediately after capture, not
kept as a fixture.

New quirks/findings logged in `config/api-testing.config.md`.

## Open items

- [ ] Report the `GET /family-attributes` cross-tenant data leak to
      Plytix (see `17-Product-Relationships/README.md` for the other two
      affected endpoints).
- [ ] Ask Plytix whether the `POST`-405-on-subpath spec mismatch for
      `/product-families/{id}/{path}` is expected.
- [ ] Ask Plytix whether "automatic inheritance" (the `403` on
      family-attribute `level` changes, now confirmed to also block
      create-time `parent_attributes`/`variant_attributes`) can be
      enabled on this Dev account so those success shapes can finally be
      captured.
