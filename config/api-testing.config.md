# Plytix PIM API — Testing Config

## Environment

- **Auth base URL (prod, "API Docs" account)**: `https://auth.plytix.com` — ✅ confirmed live 2026-08-31.
- **Auth base URL (DEV, "David's Dev Account")**: `https://auth.dev.plytix.com` — ✅ confirmed live 2026-09-04. **Different host per environment, not just per account** — the "API Docs" account's `api_key`/`api_password` get a hard `401 {"error":{"msg":"Bad api_key or api_password: Query did not throw any results"...}}` from this host (they don't exist here at all), and conversely the dev account's credentials 401 against `auth.plytix.com`. Always pair the right auth host with the right credential set.
- **PIM base URL (v1)**: `https://pim.plytix.com/api/v1` — ✅ confirmed live 2026-08-31 (accepts the auth token, returns real data).
- **PIM base URL (v3, prod/sandbox host)**: `https://pim.plytix.com/api/v3` — ❌ **unreachable** for the "API Docs" test account. Every path tried (`/products`, `/assets`, bare `/api/v3`, with/without trailing slash) returns an identical gateway `503 {"message":"name resolution failed"}`. Distinct from a wrong host entirely (`api.plytix.com` gave no HTTP response at all — DNS failure).
- **PIM base URL (v3, DEV host)**: `https://pim.dev.plytix.com/api/v3` — ✅ **fully confirmed live and working, 2026-09-04**. `GET /api/v3/products?_fields=sku&_fields=status`, authenticated with a token from `auth.dev.plytix.com` for **"David's Dev Account"**, returns `200` with real product data (`data: [{id, sku, status}, ...]`) plus `pagination.next_page` (a full next-page URL). Response shape matches `openapi_pimv3.json`'s `SearchProductsResponse` schema exactly. Provided by Plytix (David), a separate account in Plytix's DEV environment, distinct from the "API Docs" account/host used for v1 testing above. **This fully resolves the earlier v3-unreachable blocker**: v3 exists, is live, and behaves as documented — it just isn't deployed/routed on the `pim.plytix.com` prod host for the "API Docs" account. It's on a separate dev host tied to a separate account with its own auth host. Bruno coverage: `02-Products-v3/` (auth + list, both scoped to `Dev` since v3 only exists there), run with `--env "Dev"`.
- **Spec file**: `openapi_pimv3.json` (repo root) — 51 paths, no `servers`/`securitySchemes`/`security` declared in the spec itself; auth is documented only in the v1 Postman collection (`materials/api-references/Plytix_pimv1.postman_collection (5).json`).
- **Bruno collection root**: `bruno-collection/`
- **Credentials**: `bruno-collection/.env` (gitignored). Load before every `bru run`:
  ```bash
  set -a; source bruno-collection/.env; set +a
  ```
  Test account provided by the user 2026-08-31: `PLYTIX_API_KEY` / `PLYTIX_API_PASSWORD`, decodes (via the returned JWT) to account "API Docs" (`6a8ed9ba98cab862c35f5f89`), user `writechoice_test`, role `ADMIN`.
  DEV account provided by the user 2026-09-04: `PLYTIX_DEV_API_KEY` / `PLYTIX_DEV_API_PASSWORD` (password is single-quoted in `.env` — it contains `&`/`@`/`%` which break unquoted `source`), decodes to account "David's Dev Account" (`6a38f5a5b22478f30bfd755c`), user `TestDH`, role `ADMIN`. Use with `auth_base_url` = `https://auth.dev.plytix.com` (the `Dev` Bruno environment, not `Sandbox`).

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

| Product (v3) | *(none)* | Same 24-char hex ObjectId style, e.g. `6a38f614c3d65a5f868b1a06` (confirmed live 2026-09-04 against "David's Dev Account"). |

## Known API quirks

Confirmed live 2026-08-31 while testing the auth flow only:

1. **Undocumented `refresh_token` field** in the success response `data[0]`, alongside `access_token`. No refresh-token endpoint appears anywhere in the gathered materials. Unconfirmed whether it's usable — flag to Plytix.
2. **401 error body shape doesn't match the v1 collection's docs.** Documented: `{ "msg": "Bad api_key or api_password" }`. Actual live: `{ "error": { "msg": "Bad api_key or api_password: Credentials not valid", "errors": [ { "field": "http_status_code", "msg": 401 } ] } }` — nested one level deeper under `error`, extended message text, and an `errors` array whose entry mislabels the field as `"http_status_code"` instead of naming `api_key`/`api_password`.
3. **Undocumented rate limits.** The auth endpoint itself returns `ratelimit-limit: 8` / `x-ratelimit-limit-second: 8` response headers. Separately, the JWT's own claims embed per-account PIM API limits: 20 req/10s and 15000 req/3600s. Neither appears in any of the gathered materials.
4. **`GET /api/v1/products` returns `405 Method Not Allowed`** — v1 product listing is `POST /api/v1/products/search` (confirmed working, matches the Postman collection's "Product search" naming), not a GET. Worth double-checking `API V3.md`/the openapi spec don't repeat this GET-vs-POST assumption for v3's `/api/v3/products`.
5. ~~**v3 API unreachable at its only plausible host**~~ — resolved 2026-09-04, see Environment section above.

Confirmed live 2026-09-04 while testing v3 products against "David's Dev Account":

6. **Auth host is environment-scoped, not just account-scoped.** `auth.plytix.com` (prod) and `auth.dev.plytix.com` (dev) are separate services with disjoint credential sets — mixing the wrong credential with the wrong host produces a generic 401 in both directions, with no hint that the *host* (not the credential) is wrong. Any client/doc guidance should make clear that dev/prod are fully separate auth deployments.
7. **`openapi_pimv3.json`'s `GET /api/v3/products` declares no query parameters at all** — no `_fields`, no pagination params — yet `_fields=<field>` (repeatable) demonstrably works live exactly as documented in the prose `API V3.md` (not the spec). Per this repo's trust order the spec wins on *shape* conflicts, but this isn't a shape conflict — the spec is just missing parameters that are live and working. Flag to Plytix as a likely-incomplete/stale OpenAPI spec, and check other list endpoints (`/assets`, categories, asset lists) for the same gap.

## Status-gating rules

*(none identified yet — no resource lifecycle testing done; blocked on v3 reachability for v3-specific resources)*

## Async / webhook-driven resources

*(none identified yet)*

## Test fixtures

- **Test account**: "API Docs" (`6a8ed9ba98cab862c35f5f89`), user `writechoice_test`, role `ADMIN`. Credentials in `bruno-collection/.env` (gitignored, provided by the user 2026-08-31).
- Confirmed the account holds real v1 product data (e.g. SKU `VST-59102-XL`, `VST-59102-M`) usable as fixtures for further v1 testing.
- **DEV account**: "David's Dev Account" (`6a38f5a5b22478f30bfd755c`), user `TestDH`, role `ADMIN`. Credentials in `bruno-collection/.env` (gitignored, provided by the user 2026-09-04). Confirmed the account holds real v3 product data (e.g. SKUs `BAG-10157`, `CAP-10359`, `HDY-11347` and variants — apparel/accessories catalog), usable as fixtures for further v3 testing. Account rate limit differs from "API Docs": 20 req/10s / **5000** req/3600s (vs. 15000).

## Open questions for the user / Plytix

1. ~~**v3 reachability**~~ — ✅ fully resolved 2026-09-04: v3 is live and working on `https://pim.dev.plytix.com/api/v3`, under "David's Dev Account", authenticated via `https://auth.dev.plytix.com`. See Environment section above for the full trail (wrong-host 503s → right-host-wrong-account 401s → right-host-right-account 200). Bruno coverage in place (`Get Access Token (Dev).bru`, `02-Products-v3/List Products.bru`, `Dev` environment).
2. Is the undocumented `refresh_token` real/usable, or safe to ignore in docs?
3. Should the 401 error shape and undocumented rate limits be raised with Plytix as doc bugs, or are they already known/tracked (e.g. in `API_Feedback_-_From_Product_board.pdf`)?
4. **New, from today's v3 test**: is `openapi_pimv3.json` missing `_fields` (and possibly other) query parameters just for `/products`, or across the board? Worth a systematic pass once more v3 endpoints are tested against "David's Dev Account".
