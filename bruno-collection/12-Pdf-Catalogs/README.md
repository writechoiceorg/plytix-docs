# 12 — PDF Catalogs

Covers `GET`/`POST /api/v3/pdf-catalogs`, run against `Dev`.
Self-contained. **Creation is blocked entirely for "David's Dev
Account"** — see below.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| List Pdf Catalogs | GET | Search catalogs | Works fine (200, empty — no catalogs exist) |
| Create Pdf Catalog - Feature Not Enabled (422) | POST | Minimal valid create attempt | **Account-level feature gate**, not a request problem |

## Behaviors that differ from the spec

`POST /pdf-catalogs` 422s on this account regardless of body validity —
`"Cannot create new items the feature pdfs for account ..."`. This is a
genuine feature flag, not a spec/prose discrepancy. Nothing else in this
phase could be tested as a result: `output_attributes`/`pages`/`settings`
shapes remain completely unconfirmed, `GET .../{identifier}`,
`GET .../{identifier}/{path}`, and any undeclared `PATCH`/`DELETE`
spot-check are all untestable without a real catalog to target.

## Test report — 2026-09-08

- ❌ **Blocked**: no PDF catalog could be created in this account. `GET`
  (list) confirmed working (empty result). Everything else in this
  phase's original scope (fuller create with `output_attributes`,
  GET-by-id, subpath discovery, PATCH/DELETE) is **not tested** — there's
  nothing to target.
- Impact on Phase 4: Ecatalogs' `pdf_catalog_id` field can't be exercised
  with a real value in this account — document it as
  optional/untestable-here rather than silently omit it.

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares `PATCH`/`DELETE` for
`/pdf-catalogs/{identifier}` (previously read-only in the spec, matching
this resource's already-known-blocked create path). **No live testing was
attempted for this update** — per this session's scope, since `POST`
already fails with the same account-level feature-not-enabled `422`
(status-gating rule #2) and there is no way to create a disposable PDF
catalog to `PATCH`/`DELETE` in this account, and the one path that would
let us exercise `PATCH`/`DELETE` without creating anything (an existing
real fixture) doesn't exist for this resource — unlike Ecatalogs, this
account has zero pre-existing PDF catalogs at all. These two new methods
remain formally declared but **entirely untestable in this account**, for
the same underlying reason creation is (see status-gating #2). No new
`.bru` files were added for `PATCH`/`DELETE` as a result.

## Open items

- [ ] Ask Plytix: can the PDF Catalogs feature be enabled on this Dev
      account so the rest of this phase can actually run? (Config open
      question #14.) This now also covers testing the newly-declared
      `PATCH`/`DELETE`.
