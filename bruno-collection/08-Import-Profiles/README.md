# 08 — Import Profiles

Covers `GET`/`POST /api/v3/import-profiles`, `GET .../{identifier}`, and
`GET .../{identifier}/{path}`, run against `Dev`. Self-contained. No
downstream dependents anywhere in `TESTING_PLAN.md`.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Import Profile | POST | Minimal create (`name` only) | 201; reveals full live `settings` defaults |
| Create Import Profile - With Settings | POST | Partial `settings` override | Confirms partial merge with defaults |
| Create Import Profile - Missing Name (422) | POST | Validation trigger | Same 422 envelope |
| Delete Import Profile (Undeclared) | DELETE | Not in spec | Works — 204 |

## Behaviors that differ from the spec

`ProfileSettingsInputDto`'s shape was entirely undocumented beyond field
names/descriptions in the spec (no example, no defaults). Now confirmed
live default values: `import_action: "ALL"`, `import_assets_action:
"SKIP"`, `import_decimal_separator: "."`, `new_products_status: "Draft"`,
`create_static_list: false`, `column_matches: []`, with
`charset`/`column_separator`/`text_delimiter`/`family_options` defaulting
to `null`.

## Test report — 2026-09-07

- ✅ Created two profiles (minimal, and with a partial `settings`
  override) — **neither kept**, no downstream dependents, and undeclared
  `DELETE` confirmed working, so both were cleaned up per the ground
  rules.
- ✅ Subpath discovery confirmed — raw field list
  (`id, account_id, name, settings, created, modified`) matches the spec
  exactly, no undocumented fields.
- ✅ 422 (missing `name`) and undeclared `DELETE` (204, then 404)
  confirmed.
- All 5 requests pass `bru run "08-Import-Profiles/" --env "Dev"`.

## Open items

- None specific to this folder.
