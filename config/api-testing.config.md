# Plytix PIM API — Testing Config

## Environment

- **Auth base URL**: `https://auth.plytix.com` — ✅ confirmed live 2026-08-31.
- **PIM base URL (v1)**: `https://pim.plytix.com/api/v1` — ✅ confirmed live 2026-08-31 (accepts the auth token, returns real data).
- **PIM base URL (v3)**: `https://pim.plytix.com/api/v3` — ❌ **unreachable**. Every path tried (`/products`, `/assets`, bare `/api/v3`, with/without trailing slash) returns an identical gateway `503 {"message":"name resolution failed"}`. Distinct from a wrong host entirely (`api.plytix.com` gave no HTTP response at all — DNS failure). Most likely explanation: the v3 API isn't deployed/live on this host yet, or this test account needs a beta/feature flag to route to it. **Blocks all further live testing against `openapi_pimv3.json` — needs a question to Plytix (David/Ksenija), not more host-guessing.**
- **Spec file**: `openapi_pimv3.json` (repo root) — 51 paths, no `servers`/`securitySchemes`/`security` declared in the spec itself; auth is documented only in the v1 Postman collection (`materials/api-references/Plytix_pimv1.postman_collection (5).json`).
- **Bruno collection root**: `bruno-collection/`
- **Credentials**: `bruno-collection/.env` (gitignored). Load before every `bru run`:
  ```bash
  set -a; source bruno-collection/.env; set +a
  ```
  Test account provided by the user 2026-08-31: `PLYTIX_API_KEY` / `PLYTIX_API_PASSWORD`, decodes (via the returned JWT) to account "API Docs" (`6a8ed9ba98cab862c35f5f89`), user `writechoice_test`, role `ADMIN`.

## Auth

Bearer token flow, documented only in the v1 Postman collection (no auth endpoint appears in `openapi_pimv3.json`):

- **Get token**: `POST https://auth.plytix.com/auth/api/get-token`
  Body: `{ "api_key": "...", "api_password": "..." }`
  Response `200`: `{ "data": [ { "access_token": "...", "refresh_token": "..." } ] }` — confirmed live. `refresh_token` is **undocumented** anywhere in the materials (see quirks).
  Response `401`: confirmed live, but body shape differs from docs — see quirks.
- **Token lifetime**: 15 minutes. Confirmed two ways: (a) the Plytix product team said so in the 2026-08-31 kickoff call (Ksenija Rybe named it as the top API complaint), and (b) the live token's own JWT claims (`exp` − `iat` = 900s). No confirmed refresh-token endpoint; assume a new token must be requested via the same endpoint until proven otherwise.
- **Auth header on subsequent calls**: `Authorization: Bearer <access_token>` — confirmed working live against `POST /api/v1/products/search`.
- Bruno pattern (implemented): `bruno-collection/01-Authentication/Get Access Token.bru` captures the token via `script:post-response` → `bru.setVar("access_token", ...)`.

## Resource ID prefixes

| Resource | Prefix | Notes |
|---|---|---|
| Product (v1) | *(none)* | 24-char hex Mongo-style ObjectId, e.g. `6a8eda245d8cd52df9d24386`. |
| Account | *(none)* | Same ObjectId style, e.g. `6a8ed9ba98cab862c35f5f89` (from JWT claims, not a live resource call). |

v3 prefixes not yet confirmed — blocked on the v3 host issue above.

## Known API quirks

Confirmed live 2026-08-31 while testing the auth flow only:

1. **Undocumented `refresh_token` field** in the success response `data[0]`, alongside `access_token`. No refresh-token endpoint appears anywhere in the gathered materials. Unconfirmed whether it's usable — flag to Plytix.
2. **401 error body shape doesn't match the v1 collection's docs.** Documented: `{ "msg": "Bad api_key or api_password" }`. Actual live: `{ "error": { "msg": "Bad api_key or api_password: Credentials not valid", "errors": [ { "field": "http_status_code", "msg": 401 } ] } }` — nested one level deeper under `error`, extended message text, and an `errors` array whose entry mislabels the field as `"http_status_code"` instead of naming `api_key`/`api_password`.
3. **Undocumented rate limits.** The auth endpoint itself returns `ratelimit-limit: 8` / `x-ratelimit-limit-second: 8` response headers. Separately, the JWT's own claims embed per-account PIM API limits: 20 req/10s and 15000 req/3600s. Neither appears in any of the gathered materials.
4. **`GET /api/v1/products` returns `405 Method Not Allowed`** — v1 product listing is `POST /api/v1/products/search` (confirmed working, matches the Postman collection's "Product search" naming), not a GET. Worth double-checking `API V3.md`/the openapi spec don't repeat this GET-vs-POST assumption for v3's `/api/v3/products`.
5. **v3 API unreachable at its only plausible host** — see Environment section above. This is the most significant finding: it blocks validating `openapi_pimv3.json` at all right now.

## Status-gating rules

*(none identified yet — no resource lifecycle testing done; blocked on v3 reachability for v3-specific resources)*

## Async / webhook-driven resources

*(none identified yet)*

## Test fixtures

- **Test account**: "API Docs" (`6a8ed9ba98cab862c35f5f89`), user `writechoice_test`, role `ADMIN`. Credentials in `bruno-collection/.env` (gitignored, provided by the user 2026-08-31).
- Confirmed the account holds real v1 product data (e.g. SKU `VST-59102-XL`, `VST-59102-M`) usable as fixtures for further v1 testing.

## Open questions for the user / Plytix

1. **v3 reachability**: is `pim.plytix.com/api/v3` supposed to be live? Does this test account need a beta flag or different host to reach it? This blocks all further `openapi_pimv3.json` validation.
2. Is the undocumented `refresh_token` real/usable, or safe to ignore in docs?
3. Should the 401 error shape and undocumented rate limits be raised with Plytix as doc bugs, or are they already known/tracked (e.g. in `API_Feedback_-_From_Product_board.pdf`)?
