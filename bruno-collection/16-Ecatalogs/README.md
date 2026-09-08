# 16 — Ecatalogs

Covers `GET`/`POST /api/v3/ecatalogs`, run against `Dev`. Self-contained.
**Creation is blocked entirely for "David's Dev Account"** — same
feature-gate pattern as PDF Catalogs (`12-Pdf-Catalogs`).

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Ecatalog - Feature Not Enabled (422) | POST | Minimal valid create attempt | **Account-level feature gate**, same pattern as PDF Catalogs |
| List Ecatalogs | GET | Search catalogs | Real pre-existing data — "Plytix Brand Portal" |
| Get Ecatalog by ID | GET | Fetch the real ecatalog | Full `output_attributes`/`settings` shape confirmed from real data |

## Behaviors that differ from the spec

`POST /ecatalogs` 422s on this account regardless of body validity —
identical wording pattern to PDF Catalogs' feature gate
(`"Cannot create new items the feature ecatalogs for account ..."`).
Unlike PDF Catalogs (empty list), this account has one real pre-existing
ecatalog, which made it possible to confirm real `output_attributes`
(a `formula`/`formatter` mini-DSL) and `settings` (theme/header/footer/
filters/page-builder-`components`) shapes without needing to create
anything.

## Test report — 2026-09-08

- ❌ **Blocked**: no ecatalog could be created. `GET` (list + by-id)
  confirmed working against the account's one pre-existing ecatalog
  ("Plytix Brand Portal", `6a38f615c3d65a5f868b1a41`) — treated as a
  read-only fixture, never mutated (no undeclared `PATCH`/`DELETE`
  spot-check attempted, unlike every create-able resource in this
  project).
- Impact: `output_attributes`/`settings`/`notification_list` creation
  shapes remain unconfirmed (only their real *output* shape is known, via
  the pre-existing catalog); `pdf_catalog_id` cross-reference also
  untestable since Phase 3c has no PDF catalog either.
- All 4 requests pass `bru run "16-Ecatalogs/" --env "Dev"`.
- ❌ **Phase 5 (`USER_FLOWS.md`) Flow 7 also blocked, confirmed
  2026-09-08**: the "Publish" question (does any endpoint flip
  `is_public` to `true`) is untestable in this account for the same
  reason as creation — no ecatalog exists to test it against, and the
  one real one is a read-only fixture. No new live testing possible here
  until the feature is enabled.

## Open items

- [ ] Ask Plytix: can Ecatalogs (and PDF Catalogs) be enabled on this Dev
      account? (Config open question #16.)
