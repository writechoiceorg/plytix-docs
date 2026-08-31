# 01 — Authentication

Covers the bearer-token exchange (`POST https://auth.plytix.com/auth/api/get-token`)
that every other Plytix PIM API call depends on. This is the only auth
mechanism documented anywhere in the gathered materials — it appears in the
v1 Postman collection but nowhere in `openapi_pimv3.json` or `API V3.md`.

## Endpoint reference

| Request | Method | What it does | Required fields | Key response fields |
|---|---|---|---|---|
| Get Access Token | POST | Exchanges account API credentials for a 15-minute bearer token | `api_key`, `api_password` | `data[0].access_token`, `data[0].refresh_token` (undocumented) |
| Get Access Token - Invalid Credentials | POST | Trigger case: wrong password | same | `error.msg` (differs from documented `msg`) |

## Test report — 2026-08-31

Confirmed against the "API Docs" test account (`writechoice_test`, ADMIN).

- ✅ **Control case (valid credentials)**: `200 OK`, real `access_token`
  (JWT) + `refresh_token` returned. Token confirmed as a JWT with a
  900-second (15-minute) lifetime via `exp`/`iat` claims — matches the
  Plytix product team's statement in the 2026-08-31 kickoff transcript.
- ✅ **Trigger case (invalid password)**: `401 Unauthorized`, but the body
  shape does **not** match the v1 collection's documented example — see
  "Spec/docs discrepancies" below.
- ✅ **Token actually authorizes PIM calls**: reused the token as
  `Authorization: Bearer <token>` against `POST /api/v1/products/search`
  (v1) — got a real `200 OK` with product data back, confirming the token
  is valid beyond the auth service itself.
- ❌ **v3 API unreachable — could not extend testing past auth.** Every
  path tried against `openapi_pimv3.json`'s implied host
  (`pim.plytix.com/api/v3/...`, including `/products`, `/assets`, and the
  bare `/api/v3`) returned an identical `503 {"message":"name resolution
  failed"}` from the gateway — a different failure mode than a wrong host
  entirely (which returns connection failure, no HTTP response at all;
  confirmed by testing `api.plytix.com`, which doesn't resolve). This
  means Plytix's own gateway recognizes `pim.plytix.com` and answers, but
  its internal routing can't find a v3 backend — most likely the v3 API
  isn't deployed/live yet on this host, or this test account lacks a
  beta/feature flag needed to route to it. **This blocks any further live
  testing against `openapi_pimv3.json` until resolved with Plytix** — flag
  to the project team (David/Ksenija) rather than continuing to guess
  hosts.

## Spec/docs discrepancies found

1. **Undocumented `refresh_token` field** in the success response. No
   refresh endpoint exists anywhere in the gathered materials. Unknown
   whether it's usable — needs a follow-up question to Plytix.
2. **401 error body shape doesn't match docs.** Documented:
   `{ "msg": "..." }`. Actual: `{ "error": { "msg": "...", "errors": [...] } }`
   — one level deeper, with an `errors` array whose entry mislabels the
   field as `"http_status_code"`.
3. **Undocumented rate-limit headers** on the auth endpoint itself
   (`ratelimit-limit: 8` req/s), separate from the per-account PIM API
   limits embedded in the token's own JWT claims (20 req/10s, 15000
   req/3600s) — neither is mentioned in any of the gathered materials.
4. **`openapi_pimv3.json` is unreachable at its only plausible host.** The
   spec itself declares no `servers`/`security`, so this was inferred from
   path conventions in `API V3.md` — see the failed test above.

## Open items

- [ ] Ask Plytix whether the v3 API is live yet, and if so, the correct
      host/path and whether this test account needs a feature flag enabled.
- [ ] Ask whether `refresh_token` is real/usable, or safe to ignore.
- [ ] Once v3 is reachable, re-run this same authorization test against it
      specifically (it may use a different token scope or host than v1).
