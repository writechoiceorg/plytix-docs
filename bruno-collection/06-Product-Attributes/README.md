# 06 — Product Attributes

Covers `GET`/`POST /api/v3/product-attributes`, `GET .../{identifier}`,
and `GET .../{identifier}/{path}`, run against `Dev`. Self-contained.
`POST` takes a polymorphic body — a `oneOf` of attribute types via a
`type` discriminator.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Text Attribute | POST | `TextAttribute` | **201**; fixture kept; `group_ids` linkage unconfirmed |
| Create Dropdown Attribute | POST | `DropdownAttribute` | 201; sort/restrict booleans get real defaults |
| Create Formula Attribute - Account Limit Reached (422) | POST | `FormulaAttribute` | **Blocked by account limit** (2 max) — real status-gating rule |
| Create Media Attribute | POST | `MediaAttribute` | 201, minimal shape |
| Smoke Test Remaining Attribute Types | POST | 9 more of the 14 documented types | All 201; table of results in the file's docs |
| Create Attribute - Invalid Type (422, Lists Undocumented Type) | POST | Trigger case | Reveals a **15th, undocumented type**: `HierarchyAttribute` |
| Create Attribute - HierarchyAttribute (500, Unimplemented) | POST | Tries the undocumented type | **500** — real tag, unfinished handler |
| Get Product Attribute by ID | GET | Fetch by Mongo ID | `_fields` confirmed ignored on GET-by-id (new, generalizes to all resources) |
| Update and Delete Product Attribute | PATCH/DELETE | Rename via `name` (not `label`) + delete | Both work — 200/204; now formally declared (2026-09-15); **`label` is explicitly NOT patchable** (422) |

## Behaviors that differ from the spec

- `openapi_pimv3.json`'s 14-type `oneOf` is **incomplete** — the live
  discriminator validator recognizes a 15th tag, `HierarchyAttribute`,
  which 500s if actually used (not ready for docs).
- `FormulaAttribute` has an undocumented account-level creation limit (2),
  already reached on this Dev account — see
  `config/api-testing.config.md`'s new Status-gating rules entry.
- `_fields` on `GET /product-attributes/{id}` is ignored — full shape
  always returned regardless of the query string. Re-checked and
  confirmed the same on `/products/{id}` too; this generalizes beyond
  just this resource.
- `group_ids` accepted on create without error, but its effect can't be
  confirmed from the attribute's own responses (silently absent from every
  read, same silent-drop pattern as `relationships` in Phase 0).
- Create returns `201`, not the spec's `200`; undeclared `DELETE` works
  (204).

## Test report — 2026-09-07 (incl. Phase 5, 2026-09-08)

- ✅ 14 of 14 documented types created successfully except
  `FormulaAttribute` (blocked by account limit, request itself was valid).
  Plus the undocumented `HierarchyAttribute` (15th tag) attempted and
  confirmed 500/unimplemented.
- ✅ **Fixture kept**: `TextAttribute` `6a9f1bf72b6fd055ffb7c7e1`
  (`wc_test_text`) for Products (Phase 2b)'s `attributes` map. Every other
  created attribute (12 of the smoke-tested types, plus the `group_ids`
  test one) was deleted again in the same run via the confirmed undeclared
  `DELETE` — none are Phase 2b dependents.
- ✅ 422 (missing/invalid `type`) and 500 (`HierarchyAttribute`) shapes
  confirmed.
- All 10 requests passed on the initial run. **Note**: re-running "Create
  Text Attribute" after the fixture already exists returns **`409
  Conflict`** (`"AlreadyExists"`, same as attribute groups) instead of
  201; the delete/smoke-test files reference already-deleted ids via
  placeholders, since their real ids no longer exist — expected 404s on
  a fresh run, same as the collection's documented placeholder-ID
  convention.
- ❌ **Phase 5 (`USER_FLOWS.md`) Flow 3 blocked, confirmed 2026-09-08**:
  `CompletenessAttribute` creation with any **real** attribute reference
  500s, reproduced twice — a genuine live bug, not the same as
  `HierarchyAttribute`'s unimplemented-type 500. See
  `config/api-testing.config.md` quirk #47 and "Create Completeness
  Attribute - Real References (500, Bug).bru".

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares both `PATCH` and `DELETE` for
this resource (`DELETE` was previously undeclared but working; `PATCH`
had never been tested). Combined both into "Update and Delete Product
Attribute.bru", replacing "Delete Product Attribute (Undeclared).bru".

**Real finding**: `ProductAttributeUpdateInputDto` accepts `name`,
`description`, `character_limit`, `include_time`, `options`,
`manual_sorting`, `sort_ascending`, `restricted`, `attributes`
(completeness), `formula_str` — but **not `label`**. Sending
`{"label": "..."}` 422s (`"label: Extra inputs are not permitted"`) even
though `label` is the field every `GET` response surfaces most
prominently. Use `name` to rename an attribute instead; renaming via
`name` does not retroactively update the already-set `label`. Both
findings are captured with real `example{}` blocks (a rejected attempt
and a successful one).

## Open items

- [ ] **Report to Plytix as a bug**: `CompletenessAttribute` 500s on real
      attribute references (config open question #18).
- [ ] Confirm `group_ids` actually links (config open question #11).
- [ ] Confirm whether `FormulaAttribute`'s create path itself works, if
      the account limit can ever be raised (config open question #9).
- [ ] Ask Plytix about `HierarchyAttribute`'s status (config open
      question #10).
