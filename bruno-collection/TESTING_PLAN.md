# Plytix PIM v3 API — Full Testing Plan

A resource-by-resource plan to test all 51 paths in `openapi_pimv3.json`
live, using the `api-endpoint-tester` skill. Work through the phases in
order — later phases create resources that reference IDs created in
earlier ones. Each phase maps to one Bruno folder; check off items as they're
tested and update `config/api-testing.config.md` + the folder's own
`README.md` as you go, per the skill's Phase 6.

Feed one phase at a time to the `api-endpoint-tester` skill (e.g. "test
Phase 2, Product Categories, folder 03"). Re-read this file's status
checkboxes at the start of each session to pick up where the last one left
off.

## Ground rules — read before running anything

1. **Environment**: everything below runs against the `Dev` Bruno
   environment / "David's Dev Account" only. v3 is unreachable under the
   `Sandbox` environment (see `config/api-testing.config.md`).
2. **This account has real-looking catalog data already** (apparel/
   accessories SKUs like `BAG-`, `CAP-`, `HDY-`). Treat all pre-existing
   products/assets/categories as **read-only fixtures** — fine to `GET`,
   never `PATCH`/`DELETE`/mutate them. Every create/update/delete test
   must use a resource you create yourself in that same test run.
3. **Clean up what you create.** After each phase, delete the scratch
   resources it created, in reverse dependency order (e.g. delete a test
   product before the test category it referenced, if the category isn't
   needed by a later phase — otherwise leave shared fixtures up and note
   their IDs in the phase's "Fixtures created" list below so later phases
   can reference them instead of re-creating).
4. **Don't re-litigate settled findings** — re-verify them per-resource
   (they may not generalize), but don't spend time re-discovering:
   - No `Search-X`/`Get-X` endpoint declares query parameters in the spec
     (confirmed empty on `/products`, and spot-checked as empty on every
     other path — see Phase 0). `_fields` is proven live on `/products`
     despite this. **For each resource, confirm `_fields` still works —
     don't assume it's universal.**
   - Every mutating endpoint (`POST`/`PATCH`/`DELETE`) declares only
     `200`/`422` responses in the spec — conflicts with `API V3.md`'s
     stated convention (201 for create, 204 for patch/delete, 202 for
     async). **Confirm the actual live status code per resource.** Don't
     assume it's 200 just because the spec says so, and don't assume it's
     201/204 just because the prose says so.
   - The generic `{identifier}/{path}` subpath routes have **zero**
     spec detail (empty response schema, no description, no examples).
     Their shape has to be discovered empirically per resource — see
     Phase 0's subpath-exploration method.

## Out of scope for this plan — resolve with Plytix first

`API V3.md` documents an entire **Process Manager API** and a family of
`-bulk`/`-jobs`/ad-hoc-async-action endpoints (bulk create/edit/delete,
job polling, webhooks) — see lines 196-296 of that file. **None of these
paths appear anywhere in `openapi_pimv3.json`'s 51 paths.** Given this
repo's trust order (spec > prose for what's actually live), treat this as
either unimplemented for v3 or not exposed to this account, not as a
testing gap to fill in yourself. Don't guess at bulk endpoint URLs.

Open questions to route to Plytix before touching this:
- Do any `-bulk`/`-jobs`/Process Manager endpoints exist and work for v3 today?
- If yes, do they need a webhook receiver? (If confirmed live and
  async, invoke `api-webhook-tester` alongside this skill — check
  `.claude/skills/` for whether that skill exists in this project first.)

Also explicitly out of scope: `/is_alive`, `/is_ready`, `/metrics` — infra
health/monitoring probes, not part of the documented customer-facing API
surface.

**Revisited after Phases 0-4 (2026-09-08)**: the fuller picture doesn't
resolve the Process Manager/bulk question either way — no bulk/job/webhook
behavior was stumbled into incidentally while testing the 51 documented
paths, consistent with it simply not existing in this API surface at all
(not just undocumented). Two concrete findings from Phases 0-4 sharpen
what's now known instead:
- **Every resource that supports `POST`/`GET`-by-id also supports
  undeclared `PATCH`/`DELETE`** (11 for 11 tested) — this was the single
  biggest structural discovery of the whole plan, not anything about bulk
  operations. Worth leading with this when reporting back to Plytix, since
  it affects how confidently docs can promise update/delete flows across
  the entire v3 surface, not just the handful of resources spot-checked.
- **This Dev account has two output-generation features disabled
  entirely** (PDF Catalogs, Ecatalogs — status-gating #2/#3) — a
  different kind of scope gap than the Process Manager question:  not
  "does this exist in the API," but "does this account have access to
  exercise it." Worth asking Plytix for an account/tier that has both
  enabled before writing any docs about actually generating/publishing
  catalog or feed output (as opposed to the metadata-record CRUD around
  them, which is fully tested).

---

## Phase 0 — Cross-cutting behavior (do once, applies to every resource)

Folder: none (exploratory `curl`, or add to `02-Products-v3/` as extra
example requests). Use `/products` as the reference resource since it's
already authenticated and has real data.

- [x] Confirm base reachability, auth flow, response envelope shape — done
      2026-09-03/04 (see `config/api-testing.config.md`).
- [x] **Query parameter support** — tested 2026-09-07 against
      `GET /api/v3/products` (see `02-Products-v3/README.md` and
      `config/api-testing.config.md` quirks #7-13):
  - `_fields=<field>` (repeated) — ✅ confirmed working.
  - `_expand=<relationship>` — ❌ does NOT work (400, contradicts
    `API V3.md`'s described default-expand mechanism); expansion happens
    automatically per `_fields` value instead.
  - Pagination — `pagination.next_page` link-only is the default/always
    present. `_page`/`_page_size` ✅ works. `_offset`/`_limit` ❌ does not
    (400). `_sort_by` ✅ works.
  - Filtering — all three tested dialects work: plain field filter
    (`sku=<value>`), operator filter (`created[gt]=<date>`), related-entity
    dot filter (`categories.name=<value>`) and custom-attribute filter
    (`attributes.<name>=<value>` / `attributes.<name>[icontains]=<value>`).
    Confirms v3 implements the query-string "Possible Alternative" dialect
    from `API V3.md`'s filter table, not the JSON-object "Current" one.
- [x] **Identifier flexibility** — tested 2026-09-07. `GET
      /products/<mongo_id>` → 200. `GET /products/<sku>` → **422**
      (`Id must be of type PydanticObjectId`) — `API V3.md`'s claim that
      SKU also works is **false** for this v3 endpoint/account; flagged as
      an open question to Plytix. Natural-key testing for other resources
      (categories/lists by `name`) deferred to their own phases (1a, 1b,
      3a, 3b).
- [x] **Subpath route discovery** — tested 2026-09-07 on products:
      `attributes` (200), `attributes/<attribute_name>` (200),
      `categories` (200, expanded), `relationships` (200, flat shape,
      differs from the nested `product_relationships` field on a full
      GET), `assets` (200, expanded) — all resolve. Spot-checked
      `assets/{id}/{path}` too (ahead of Phase 2a): `categories` (200),
      `attributes`/`relationships`/`products` (400, not valid asset
      fields). Found a generalizable discovery technique: an unrecognized
      `{path}` 400s with a helpful "Available fields" list naming the
      resource's raw internal fields (see
      `02-Products-v3/Get Product Subpath - Attributes.bru`'s docs) — use
      this in every later phase instead of guessing subpath names cold.
- [ ] **Mutating status codes** — confirmed value goes in each phase below
      as you test that resource's create/update/delete. (Phase 0
      deliberately did not test product create/update/delete beyond the
      422 validation probe below — that's Phase 2b's job.)
- [x] **422 validation error shape** — tested 2026-09-07 on `POST
      /products` (sku omitted): `{"data":[],"errors":[{"name":
      "InputDTOValidationError","description":"sku: Field required"}]}` —
      a flat `errors` array of `{name, description}`, distinct from both
      the nested 401 auth shape and FastAPI's (unused) default
      `HTTPValidationError` shape. See
      `02-Products-v3/Create Product - Missing SKU (422).bru`.

---

## Phase 1 — Foundational, no dependencies

These can be created in any order and don't need any other resource to
exist first. Do them first so later phases have real IDs to reference.

### 1a. Product Categories — folder `03-Product-Categories` ✅ done 2026-09-07
- Endpoints: `GET /product-categories`, `POST /product-categories`,
  `GET /product-categories/{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `{"name": "..."}` required; `parent_id` optional — test both
  a top-level category and a child category (self-referential `parent_id`)
  to confirm nesting works.
- Fixtures to create and keep: one parent + one child category, IDs
  recorded here after the run, for Products (Phase 2) to reference via
  `category_ids`.
  - **Parent**: `6a9f1b482b6fd055ffb7c7dc` ("WC Test Category").
  - **Child**: `6a9f1b542b6fd055ffb7c7dd` ("WC Test Child Category").
- Confirmed: create is `201` (not spec's `200`); nesting works (`path`,
  `n_children`); identifier-by-name fails 422 same as products' SKU; and
  — major finding — **undeclared `PATCH`/`DELETE` both work** despite
  zero spec coverage (see `config/api-testing.config.md` quirk #20). See
  `03-Product-Categories/README.md`.

### 1b. Asset Categories — folder `04-Asset-Categories` ✅ done 2026-09-07
- Endpoints: `GET /asset-categories`, `POST /asset-categories`,
  `GET /asset-categories/{identifier}`, `GET .../{identifier}/{path}`.
- Same shape as product categories (`name` required, `parent_id`
  optional) — confirm nesting the same way.
- Fixtures to create and keep: one category, for Assets (Phase 2) to
  reference via `category_ids`.
  - **Category**: `6a9f1b862b6fd055ffb7c7de` ("WC Test Asset Category").
- Confirmed: same 201/PATCH/DELETE pattern as 1a. See
  `04-Asset-Categories/README.md`.

### 1c. Product Attribute Groups — folder `05-Product-Attribute-Groups` ✅ done 2026-09-07
- Endpoints: `GET /product-attribute-groups`, `POST ...`,
  `GET .../{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `{"name": "..."}` required; `attribute_labels` optional.
- Fixtures to create and keep: one group, for Product Attributes
  (Phase 1d) to optionally reference via `group_ids`.
  - **Group**: `6a9f1b872b6fd055ffb7c7df` ("WC Test Attribute Group").
- Confirmed: same 201/DELETE pattern as 1a/1b. See
  `05-Product-Attribute-Groups/README.md`.

### 1d. Product Attributes — folder `06-Product-Attributes` ✅ done 2026-09-07
- Endpoints: `GET /product-attributes`, `POST /product-attributes`,
  `GET .../{identifier}`, `GET .../{identifier}/{path}`.
- **Polymorphic create body** — 14 attribute types via a `type`
  discriminator (`TextAttribute`, `MultilineAttribute`,
  `BooleanAttribute`, `DateAttribute`, `DecimalAttribute`,
  `DropdownAttribute`, `FormulaAttribute`, `HtmlAttribute`, `IntAttribute`,
  `MediaAttribute`, `MediaGalleryAttribute`, `MultiSelectAttribute`,
  `UrlAttribute`, `CompletenessAttribute`). All share `name`+`type`
  required, `label`/`description`/`group_ids` optional.
  - At minimum, create one of each of: `TextAttribute`,
    `DropdownAttribute` (has `options`), `FormulaAttribute` (has
    `formula`/`formula_str` — cross-check syntax against
    `materials/help-center/operations/if.md` and sibling operator pages),
    `MediaAttribute`. Smoke-test the remaining 10 types with a minimal
    valid body each; don't build full example docs for all 14 unless time
    allows.
- Fixtures to create and keep: at least one `TextAttribute`, for Products
  (Phase 2) to reference in its `attributes` map.
  - **TextAttribute**: `6a9f1bf72b6fd055ffb7c7e1` (`wc_test_text`).
- Confirmed: all 14 documented types create fine (`201`) **except
  `FormulaAttribute`**, blocked by a real account-level limit (2 max,
  already reached) — first confirmed status-gating rule this project.
  Found an **undocumented 15th type**, `HierarchyAttribute` (500s,
  unimplemented). `_fields` confirmed ignored on `GET`-by-id (generalizes
  beyond just this resource). `group_ids` linkage on create unconfirmed.
  Undeclared `DELETE` works. See `06-Product-Attributes/README.md`.

### 1e. Connections — folder `07-Connections` ✅ done 2026-09-07
- Endpoints: `GET /connections`, `POST /connections`,
  `GET .../{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `name`+`type` required (`type` is a free string per the
  spec's description — "Dropbox, FTP, SFTP" given as examples, not an
  enum). Confirm whether the API validates `type` against a fixed set or
  accepts anything (test one valid-looking value and one nonsense value).
- No fixtures required downstream (Channels in Phase 4 references
  `connections` optionally — reuse one if convenient, not required).
- Confirmed: `type` is actually a **fixed lowercase enum**
  (`dropbox`/`ftp`/`sftp`), not a free string — the spec's description is
  wrong. This was the resource where undeclared `DELETE` was first
  discovered this session. No fixtures kept (no dependents, cleaned up via
  the confirmed `DELETE`). See `07-Connections/README.md`.

### 1f. Import Profiles — folder `08-Import-Profiles` ✅ done 2026-09-07
- Endpoints: `GET /import-profiles`, `POST /import-profiles`,
  `GET .../{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `name` required, `settings` optional (shape undocumented in
  spec — inspect `ImportProfileCreateInputDto.settings`'s schema directly
  when you get here, or start with `{}` and see what 422 tells you about
  required sub-fields).
- No downstream dependents in this spec.
- Confirmed: full live default shape of `settings` when omitted (see
  `config/api-testing.config.md` quirk history). No fixtures kept (no
  dependents, cleaned up via undeclared `DELETE`). See
  `08-Import-Profiles/README.md`.

**Phase 1 cross-cutting finding**: undeclared `PATCH`/`DELETE` was
confirmed working on **every one** of the six Phase 1 resources despite
`openapi_pimv3.json` declaring neither for any of them — this resolves
Phase 5/`USER_FLOWS.md`'s previously-open "does the dashboard's
rename/delete capability exist via undeclared routes" question, at least
for these six. Confirm per-resource in Phase 2-4 rather than assuming it
always holds, but it's no longer a blind guess.

---

## Phase 2 — Core content (depends on Phase 1)

### 2a. Assets — folder `09-Assets` ✅ done 2026-09-08
- Endpoints: `GET /assets`, `POST /assets`, `GET .../{identifier}`,
  `PATCH .../{identifier}`, `GET .../{identifier}/{path}`,
  `PATCH .../{identifier}/{path}`.
- **No `DELETE /assets/{identifier}` exists in the spec at all** — confirm
  this isn't just missing from `openapi_pimv3.json` by trying
  `DELETE /assets/{id}` on a scratch asset anyway and recording what comes
  back (404? 405? something else?). Log the result either way — if it's a
  real gap, cleanup for this resource means leaving scratch assets in
  place (note their IDs) rather than deleting them.
- Create body: none of `url`/`content`/`filename` are marked `required` in
  the schema, but logically you need at least `url` or `content` to make a
  real asset — test an empty body (expect this to surface a real
  validation error despite the spec's empty `required` list) and then a
  valid one with `url` pointing at a public test image, tagged with the
  Phase 1b category via `category_ids`.
- Use `PATCH` to update `alt_text`/`filename` on the created asset.
- Fixtures to create and keep: one asset, for Products (Phase 2b) to
  reference via `thumbnail_id`.
  - **Asset**: `6aa021b72b6fd055ffb7ca9f` (`wc_test_asset_renamed.jpg`).
- Confirmed: empty body → real 422 (not spec's implied optionality);
  `category_ids` on create is **silently ignored**, but applying it via a
  follow-up `PATCH` works; undeclared `DELETE` works (204, 7th resource
  confirmed this project). See `09-Assets/README.md`.

### 2b. Products — extend existing folder `02-Products-v3` ✅ done 2026-09-08
- Endpoints already covered: `GET /products` (search). Add: `POST
  /products`, `GET /products/{identifier}`, `DELETE /products/{identifier}`,
  `GET .../{identifier}/{path}`, `DELETE .../{identifier}/{path}`.
- Create body: only `sku` required. Build one full-featured create using
  the Phase 1 fixtures: `category_ids` (1a), `attributes` (1d, keyed by
  attribute name/id — confirm which the API expects), `thumbnail_id` (2a).
- `DELETE /products/{identifier}` — create a second, disposable product
  specifically to delete (don't delete the fully-featured one; later
  phases need a real product to reference). Confirm status code (spec
  says 200; prose says 204 — see which is real).
- Confirm identifier-by-`sku` (Phase 0) specifically here, since it's the
  one resource `API V3.md` explicitly calls out as accepting a natural key.
- Fixtures to create and keep: one fully-featured product, for Pim Product
  Lists / Channels / Ecatalogs (Phases 3-4) to have something real to query.
  - **Product**: `6aa022262b6fd055ffb7caa4` (SKU `WC-TEST-FULL-001`).
- Confirmed: `attributes` keyed by attribute **name** (not id);
  `category_ids` links immediately on create (unlike assets — see 2a);
  `thumbnail_id` persists on create; plain `DELETE` → **204**; SKU still
  rejected as `{identifier}` even on a self-created product (re-confirms
  Phase 0). **Critical finding**: `DELETE /products/{id}/{path}` deletes
  the **entire product** regardless of `{path}` — confirmed with both a
  real and a made-up subpath name. See `02-Products-v3/README.md` and
  `config/api-testing.config.md` quirk #31 — flagged as the most urgent
  open question to route to Plytix (config open question #12).

---

## Phase 3 — Saved queries and outputs (depends on Phase 2)

### 3a. Pim Product Lists — folder `10-Pim-Product-Lists` ✅ done 2026-09-08
- Endpoints: `GET /pim-product-lists`, `POST ...`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`.
- Create body: `name`+`type` required. `type` is `Smart` (dynamic, backed
  by a `query`) or `Static` (fixed member list). Test both: one `Static`
  list referencing the Phase 2b product by ID, one `Smart` list with a
  `query` filtering on something guaranteed to match it (e.g. its `sku` or
  the Phase 1a category).
- Fixtures to create and keep: one list of each type, for Channels/
  Ecatalogs (Phase 4) to reference via `product_list_id`.
  - **Static**: `6aa025bd2b6fd055ffb7cab4` ("WC Test Static List").
  - **Smart**: `6aa0322d2b6fd055ffb7cabb` ("WC Test Smart List").
- Confirmed: **major finding** — neither list create schema has a
  member-ID field at all; `type: "Static"` auto-generates a query
  (`static_lists` contains the list's own id), and real membership is set
  by `PATCH`ing the product's/asset's own `static_list_ids` field
  instead. Also confirmed: undeclared `PATCH`/`DELETE` both work; first
  422 in this project with **two** error entries at once. See
  `10-Pim-Product-Lists/README.md`.

### 3b. Asset Lists — folder `11-Asset-Lists` ✅ done 2026-09-08
- Same shape and test approach as 3a, but over the Phase 2a asset.
- Fixtures to create and keep: one list, for Ecatalogs (Phase 4) via
  `asset_list_id`.
  - **Smart**: `6aa032522b6fd055ffb7cabd` ("WC Test Asset Smart List").
- Confirmed: identical shape/behavior to 3a. See
  `11-Asset-Lists/README.md`.

### 3c. PDF Catalogs — folder `12-Pdf-Catalogs` ✅ done 2026-09-08 (blocked)
- Endpoints: `GET /pdf-catalogs`, `POST ...`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`.
- Create body: `name` required; `output_attributes` (reference Phase 1d
  attribute), `pages`, `settings` optional — start minimal, then add
  `output_attributes` once the minimal create is confirmed working.
- Fixtures to create and keep: one catalog, for Ecatalogs (Phase 4) via
  `pdf_catalog_id`.
  - **None** — see below.
- **Blocked**: "David's Dev Account" doesn't have the PDF Catalogs
  feature enabled at all — `POST` 422s regardless of body validity
  (`"Cannot create new items the feature pdfs for account ..."`). `GET`
  (list) works, returns empty. Nothing past the minimal-create attempt
  could be tested. Ecatalogs (Phase 4) will need to document
  `pdf_catalog_id` as untestable in this account. See
  `12-Pdf-Catalogs/README.md`.

### 3d. Product Families & Product Family Models — folder `13-Product-Families` ✅ done 2026-09-08
- **Read-only** (`GET /product-families`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`, and the same three for
  `product-family-models`) — no create endpoint, these are presumably
  derived from products that have `parent_id`/`product_family_id` set
  (variation structures).
- The Phase 2b product created a standalone product with no parent/family.
  To get a non-empty result here, either: (a) find an existing fixture
  product in the account that already has variations (scan `/products`
  search results for `num_variations > 0` or a populated `product_family_id`),
  or (b) create one more scratch product in Phase 2b with `parent_id`
  pointing at another scratch product, to form a minimal family, then
  test this phase against that.
- If the account has no families at all, that's a valid finding too —
  document the empty-list response shape and move on; don't force family
  data into existence just to exercise this endpoint if it risks touching
  real fixture products.
- Confirmed: account already has real family data (no forcing needed);
  the Phase 2b kept product auto-resolved to a real family
  (`6a38f5d8c3d65a5f868b186e`, "Accessories") despite no explicit family
  wiring on create. Subpath discovery matches the spec exactly on both
  resources — no undocumented fields, unlike products/assets. See
  `13-Product-Families/README.md`.

### 3e. Relationships — folder `14-Relationships` ✅ done 2026-09-08
- **Read-only** (`GET /relationships`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`) — no create endpoint. Per `API V3.md`,
  relationship *types* are configured elsewhere (likely the web app UI,
  not this API), so this phase is search/get validation only.
- Check whether the account already has any relationships configured
  (some Phase 2b/3d exploration may surface `relationships` data on a
  product's output). If none exist, document the empty-list shape.
- Confirmed: account has 2 real relationship types; `GET
  /relationships/{id}` resolves the exact `relationship_id` already named
  on the Phase 2b kept product's `product_relationships` field. See
  `14-Relationships/README.md`.

---

## Phase 4 — Distribution (depends on Phase 3)

### 4a. Channels — folder `15-Channels` ✅ done 2026-09-08
- Endpoints: `GET /channels`, `POST /channels`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`.
- Create body: `name`+`format` required (`format`: CSV/XLSX/XML/JSON/
  SHOPIFY/BIGCOMMERCE etc., per the spec description — confirm which
  values are actually accepted; test one simple one like `CSV` first).
  `product_list_id` (Phase 3a), `connections` (Phase 1e, optional) —
  build one minimal channel (`CSV`, no product list) and one fuller one
  referencing the Phase 3a Smart list.
- This is the first resource with a large, mostly-optional property list
  (rebuild scheduling, XML/Shopify-specific fields, column mapping) — treat
  everything past `name`/`format` as exploratory; don't try to test every
  property, just confirm the minimal create works and that a couple of
  scheduling fields (`rebuild_periodically`, `rebuild_feed_frequency`)
  round-trip correctly on `GET`.
- Fixture kept: `6aa047d52b6fd055ffb7cadd` ("WC Test Channel Full").
- Confirmed: `format` is a hidden fixed set (not free string) — same
  pattern as Connections' `type`; `product_list_id` links immediately on
  create; `rebuild_periodically` needs `rebuild_feed_frequency`+`hod`+
  `moh`+`timezone` all together, and an incomplete combination gives a
  **vague, field-less** 422 (the only one like it in this project);
  undeclared `PATCH`/`DELETE` confirmed (11th resource). See
  `15-Channels/README.md`.

### 4b. Ecatalogs — folder `16-Ecatalogs` ✅ done 2026-09-08 (blocked)
- Endpoints: `GET /ecatalogs`, `POST /ecatalogs`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`.
- Create body: `name` required. Build one minimal create, then one fuller
  one wiring in `product_list_id` (3a), `asset_list_id` (3b), and
  `pdf_catalog_id` (3c) together to confirm the cross-references resolve.
- **Blocked**: this account also lacks the Ecatalogs feature entirely
  (same pattern as PDF Catalogs, Phase 3c) — `POST` 422s regardless of
  body validity. `GET` works; this account has one real pre-existing
  ecatalog ("Plytix Brand Portal"), used read-only to confirm
  `output_attributes`/`settings`' real shape without creating anything.
  See `16-Ecatalogs/README.md`.

**Phases 0-4 complete** — every one of `openapi_pimv3.json`'s 51 paths has
now been smoke-tested at least once. Next: Phase 5 (`USER_FLOWS.md`) and
the "After all phases" wrap-up below.

---

## Phase 5 — End-to-end usage flows ✅ done 2026-09-08

Once Phases 0-4 have smoke-tested every individual endpoint, move to
`USER_FLOWS.md` (this folder) — it chains those same endpoints into the
multi-step sequences a real user follows in the dashboard (create a
product and enrich it, build a channel export, build a Brand Portal,
etc.), grounded in the relevant help-center articles for each. It also
carries the single most important cross-cutting question raised by
Phases 1-4's individual endpoint tests: almost no resource besides
`products`/`assets` declares a `PATCH`/`DELETE` anywhere in the spec, yet
the dashboard clearly supports renaming/updating/publishing/deleting all
of them — resolving whether that's a real API gap or an undeclared-but-
working subpath reshapes several of those flows.

All 8 flows in `USER_FLOWS.md` run and resolved — 6 fully (Flows 1, 2, 4,
5, 6, 8), 2 blocked by genuine findings, not testing gaps (Flow 3 — a
reproducible `CompletenessAttribute` 500 bug; Flow 7 — Ecatalogs'
account-level feature gate from Phase 4b). Headline results: the "do
this first" PATCH/DELETE question was already answered by Phases 1-4
(11/11 resources); Flow 5/6's list/channel membership questions both
resolved to "no list/channel-side write path exists, it's exclusively a
product-side `static_list_ids` field or `product_list_id` reference";
Flow 6's "Process" and Flow 7's "Publish" actions are both confirmed
UI/internal-only, reachable via no v3 endpoint. See `USER_FLOWS.md`'s
inline per-flow resolution notes and `config/api-testing.config.md`
quirks #46-51 for full detail.

## After all phases

- Sweep `config/api-testing.config.md`'s "Known API quirks",
  "Status-gating rules", and "Resource ID prefixes" tables — every phase
  above should have added at least one row somewhere. **Done** — swept
  through Phase 5, see the config file directly.
- Update this file's checkboxes and each folder's own `README.md` (test
  report block) per the skill's Phase 6. **Done.**
- Revisit the "Out of scope" section — by now you'll likely have a fuller
  picture of the account's real capabilities to bring back to Plytix as a
  concrete question, not a guess. **Done** — see that section's
  2026-09-08 addendum above.

**The entire plan (Phases 0-5) is now complete.** Remaining work is
external: routing the accumulated open questions in
`config/api-testing.config.md` to Plytix (19 questions, headlined by the
`DELETE`-subpath-deletes-whole-product hazard and the
`CompletenessAttribute` bug), and using these findings to inform the
actual documentation-writing work this engagement exists to produce.
