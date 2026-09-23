# 15 — Channels

Covers `GET`/`POST /api/v3/channels`, `GET .../{identifier}`, and
`GET .../{identifier}/{path}`, run against `Dev`. Self-contained.

## Endpoint reference

| Request | Method | What it does | Key finding |
|---|---|---|---|
| Get Access Token (Dev) | POST | Auth exchange | Shared finding |
| Create Channel - Minimal | POST | `name`+`format` only | **201**; reveals a huge real default shape |
| Create Channel - Invalid Format (422) | POST | Trigger case | `format` is a hidden fixed set, like Connections' `type` |
| Create Channel - Full Featured | POST | `product_list_id` + full rebuild schedule | 201; fixture kept |
| Get Channel by ID | GET | Fetch by Mongo ID | Richest subpath field list in this project |
| Create Channel - Missing Fields (422) | POST | Validation trigger | Two-entry `errors` array, same as Phase 3 |
| Update and Delete Channel | PATCH/DELETE | Rename + delete | Both work — now formally declared (2026-09-15) |

## Behaviors that differ from the spec

- `format`'s spec description calls it a free string; it's actually a
  hidden fixed set (`CSV`/`XML` confirmed valid, others untested) — same
  pattern as Connections' `type` (Phase 1e).
- Enabling `rebuild_periodically` needs `rebuild_feed_frequency` +
  `rebuild_feed_hod` + `rebuild_feed_moh` + `rebuild_feed_timezone` all
  together — an incomplete combination gives a **vague, field-less** 422
  (`"Schema validation error"`), the only error in this whole project that
  doesn't name the specific problem field.
- `product_list_id` links immediately on create (matches products, not
  assets' silently-ignored pattern).
- Create returns `201`; undeclared `PATCH`/`DELETE` work (200/204).

## Test report — 2026-09-08

- ✅ **Fixture kept**: `6aa047d52b6fd055ffb7cadd` ("WC Test Channel
  Full") — format `CSV`, linked to the Phase 3a Smart product list, full
  rebuild schedule (daily, 03:00 UTC). For Phase 5's end-to-end flows.
- ✅ Minimal create, invalid-format trigger, subpath discovery,
  missing-fields 422, undeclared `PATCH`/`DELETE` (on a separate
  throwaway channel, since deleted) all confirmed. Four intermediate
  throwaway channels used while isolating the rebuild-scheduling
  validation error were cleaned up via the confirmed `DELETE`.
- All 7 requests passed on the initial run. **Note**: re-running "Create
  Channel - Full Featured" after the fixture already exists returns `409
  Conflict` (duplicate name) instead of 201 — expected, not a regression
  (quirk #45a).
- ✅ **Phase 5 (`USER_FLOWS.md`) Flow 6 resolved, confirmed 2026-09-08**:
  no direct channel-product-assignment mechanism exists (`PATCH
  .../products` 422s, same shape as the product lists finding);
  `product_list_id` is the only real path. "Process" (Draft → Live)
  confirmed UI/internal-only — no `POST` action subpath exists, and
  `active: true` alone doesn't trigger a build. See quirk #50 and
  "Update Channel Products Subpath - Not Supported (Flow 6).bru". All 8
  requests pass on a first run.

## Update — 2026-09-15 (spec refresh: 51→63 paths)

`openapi_pimv3.json` now formally declares both `PATCH` and `DELETE`
(previously undeclared but working, quirks #20/#45). Retested fresh
against a new disposable scratch channel, renamed the file to drop
"(Undeclared)", and captured real `example{}` blocks. The `PATCH`
response also surfaced two fields not previously spot-checked in this
project's create-response documentation: `is_fmt` and the
`rebuild_once`/`rebuild_once_at`/`rebuild_once_timezone` trio (alongside
the already-documented `rebuild_periodically` family, quirk #40).

## Update — 2026-09-22 (full-parameter examples for OpenAPI docs)

Added new `example{}` blocks (purely additive, no existing examples
touched) for use as OpenAPI description examples, all against disposable
scratch channels (deleted at the end of the run):

- `Create Channel - Minimal.bru`: "Create Channel - Full Parameters (All
  Fields)" — exercises every documented `ChannelCreateInputDto` field at
  once: full rebuild schedule, `product_list_id`, `output_filename`(+
  timestamp flag), `build_reference_date_timezone`, a full `columns` entry,
  `childs_first`, `column_separator`, `text_delimiter`.
- `Update and Delete Channel.bru`: "Update Channel - Full Parameters (All
  Fields)" — a broad `PATCH` spread (rename, `active`, `childs_first`,
  `process_products`/`parent_include_criteria` for both main and on-demand
  variants, `store_title`/`store_link`/`store_description`). **New
  finding**: `parent_include_criteria`/`on_demand_parent_include_criteria`
  are validated against a hidden fixed 2-value enum
  (`ONLY_PARENT_IN_LIST`/`ALL_PARENT_IN_VARIANTS`) — a 422 on the
  natural-guess value `ALL_PARENTS` revealed it, same hidden-enum pattern
  as `format` (quirk #39) but on a different field, not previously
  documented.
- `Get Channel by ID.bru`: "List Channels - Full Query Parameters" —
  combines `_fields`, `_page`/`_page_size`, `_sort_by`, and a plain
  `format` filter.

## Open items

- [ ] Flag the vague rebuild-scheduling 422 to Plytix as a DX
      inconsistency (config open question #17).
- [ ] New 2026-09-22: document `parent_include_criteria`'s real enum
      (`ONLY_PARENT_IN_LIST`/`ALL_PARENT_IN_VARIANTS`) — the spec calls it
      a free string, same pattern as `format`.
