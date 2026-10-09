# Writer session — 2026-10-08

Legacy (v1/v2) "Core concepts" overview section, mirroring the v3 Overview group (`fumadocs/content/docs/reference/v3/`). Target folder: `fumadocs/content/docs/reference/legacy/`.

| Page title | File path | Page type | Status |
|---|---|---|---|
| Authentication | `fumadocs/content/docs/reference/legacy/token-authentication.mdx` | Reference | Draft, blocked on flags |
| Errors and Status Codes | `fumadocs/content/docs/reference/legacy/errors-status-codes.mdx` | Reference | Draft, blocked on flags |
| Rate Limits | `fumadocs/content/docs/reference/legacy/rate-limits.mdx` | Reference | Draft, blocked on flags |
| Filtering and Search | `fumadocs/content/docs/reference/legacy/filtering-and-search.mdx` | Reference | Draft, blocked on flags |
| Pagination | `fumadocs/content/docs/reference/legacy/pagination.mdx` | Reference | Draft, blocked on flags |
| API v1/v2 Reference (add "Core concepts" cards) | `fumadocs/content/docs/reference/legacy/api-v1-v2-reference.mdx` | Landing | Updated |

Not written: "Working with Updates and Deletes" (v3 has one). The v1/v2 sources only give per-endpoint status codes, which the generated endpoint pages already carry, and the update/delete semantics were never tested live. Candidate for a later page once tested with `endpoint-tester`.

## Source limits

- Live-tested on v1: the auth exchange and `POST /api/v1/products/search` only (`config/api-testing.config.md`, 2026-08-31).
- Everything else comes from the Postman collection (`materials/api-references/Plytix_pimv1.postman_collection.json`) and `openapi_pimv1.json`/`fumadocs/openapi-v1v2.json`, which was inferred from it and is unverified.

## Flags left in the drafts

- **Authentication**: none beyond the shared source caveat.
- **Errors and Status Codes**: the collection documents a flat `{"error": {"msg": ...}}` shape, and the one live 401 matched that nesting but with a mislabeled `errors` entry. Other statuses' bodies are untested.
- **Rate Limits**: standard plan figures were confirmed for v3 only. Whether v1 shares the same figures is assumed from the shared token claims.
- **Filtering and Search**: (1) attribute cap is 20 in the collection overview and 50 in the product search description; (2) `like` (collection) vs `contains` and `null`/`!null` (`migration-reference.mdx`) as v1 operator names; (3) `bte` and `last_days` are listed only under relationship quantity operators.
- **Pagination**: page-size ceiling and `428` rule come from the product search description only; the collection's own examples show `total_count` inconsistently.
