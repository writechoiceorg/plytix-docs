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
| Delete Connection (Undeclared) | DELETE | Not in spec | Works — 204 (first resource this session where this was found) |

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

## Open items

- None specific to this folder — see config open question #8 (is
  undeclared PATCH/DELETE stable/intentional).
