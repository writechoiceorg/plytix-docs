# 07 — Connections

Covers `GET`/`POST /api/v3/connections`, `GET .../{identifier}`, and
`GET .../{identifier}/{path}`, run against `Dev`. Self-contained. No
downstream dependents in `TESTING_PLAN.md` — Channels (Phase 4a)
references `connections` optionally, not required.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Connection - Invalid Type (422, Reveals Enum) | POST | Trigger case | **`type` is a fixed lowercase enum**, not a free string as the spec describes |
| Create Connection | POST | Create with `type: "ftp"` | 201; created then deleted (no dependents) |
| Update and Delete Connection | PATCH/DELETE | Rename/update + delete | Both work — 200/204; now formally declared (2026-09-15); `PATCH` never had a file before |

## Behaviors that differ from the spec

`ConnectionCreateInputDto.type`'s spec description calls it a free string
("Dropbox, FTP, SFTP" as examples only). **False** — validated against a
fixed, case-sensitive, lowercase enum: `dropbox`, `ftp`, `sftp`. Both
uppercase and nonsense values are rejected identically.

## Test report — 2026-09-07

- ✅ Confirmed `type` enum via a 422 trigger (`"FTP"` and a nonsense
  string both fail the same way; only lowercase works).
- ✅ Created one connection (`type: "ftp"`) — **not kept**, since this
  resource has no downstream dependents and undeclared `DELETE` was
  confirmed to work, per the ground rules' cleanup preference.
- ✅ This was the resource where undeclared `DELETE` was first discovered
  this session — 204, confirmed 404 on both a follow-up GET and subpath
  GET.
- All 4 requests pass `bru run "07-Connections/" --env "Dev"`.

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares both `PATCH` and `DELETE`
(`DELETE` was previously undeclared but working; `PATCH` had never been
tested). Combined into "Update and Delete Connection.bru", replacing
"Delete Connection (Undeclared).bru". Retested fresh against a new
disposable scratch FTP connection — `name`/`url`/`port` all confirmed
patchable and round-trip; real `example{}` blocks captured for both.

## Update — 2026-09-22 (full-parameter examples for OpenAPI docs)

Added new `example{}` blocks to both `.bru` files, each populating every
optional field the type supports, for use as OpenAPI description examples.
Nothing pre-existing was removed or changed.

- `Create Connection.bru`: full-parameter creates for `ftp` (adds `url`,
  `port`, `user`, `password`, `use_tls`), `sftp` (same shape), and —
  **first-ever live test of `dropbox` in this project** — `dropbox` (adds
  `token_type`, `token`, `refresh_token`, `email`).
- `Update and Delete Connection.bru`: one full-parameter `PATCH` example
  setting every `ConnectionUpdateInputDto` field at once on an FTP
  connection.
- All scratch connections created for these examples were deleted
  immediately after capture — no new fixtures kept.

**New finding**: `password` (ftp/sftp) and `token`/`token_type`/
`refresh_token` (dropbox) are all write-only — accepted on create and
`PATCH`, never echoed back in any response. Only `email` round-trips for
Dropbox connections.

## Open items

- None specific to this folder — config open question #8 (is undeclared
  PATCH/DELETE stable/intentional) is resolved by the 2026-09-15 spec
  refresh formally declaring both.
