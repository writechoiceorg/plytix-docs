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

---

## Phase 0 — Cross-cutting behavior (do once, applies to every resource)

Folder: none (exploratory `curl`, or add to `02-Products-v3/` as extra
example requests). Use `/products` as the reference resource since it's
already authenticated and has real data.

- [x] Confirm base reachability, auth flow, response envelope shape — done
      2026-09-03/04 (see `config/api-testing.config.md`).
- [ ] **Query parameter support** — test each of these against
      `GET /api/v3/products` and note which work despite the empty spec:
  - `_fields=<field>` (repeated) — ✅ already confirmed working.
  - `_expand=<relationship>` (default-expand behavior per `API V3.md`).
  - Pagination: is it `pagination.next_page` link-only (as seen so far),
    or do `_page`/`_page_size`/`_offset`/`_limit`/`_sort_by` also work as
    the prose's "possible alternative" syntax suggests? Test both styles.
  - Filtering: try a simple field filter (`sku=<value>`), an operator
    filter (`created[gt]=<date>`), and one relationship filter from the
    `API V3.md` filter table (~line 152-161) to see which filter dialect
    is actually implemented.
- [ ] **Identifier flexibility** — `API V3.md` claims `GET /products/<id>`
      accepts either the Mongo ID or the `sku` as `<identifier>`. Confirm
      on products; test whether other resources have an equivalent natural
      key (e.g. `name` for categories/lists) or only accept the ID.
- [ ] **Subpath route discovery** — for `GET /products/{id}/{path}`, try:
      `attributes`, `attributes/<attribute_name>`, `categories`,
      `relationships`, `assets`. Record which resolve (200) vs 404 vs 422,
      and what each returns. Repeat this short list against `assets/{id}/{path}`
      (`GET` and `PATCH`) once products are confirmed. Don't attempt to
      enumerate every resource's subpaths up front — discover per-resource
      as you reach it below, using whatever subentity names its own
      `Get-X`/output DTO fields suggest (e.g. `ProductOutputDto` has
      `relationships`, `categories`, `assets`, `parent`, `product_family`
      — those are good subpath name candidates).
- [ ] **Mutating status codes** — confirmed value goes in each phase below
      as you test that resource's create/update/delete.
- [ ] **422 validation error shape** — trigger one on `POST /products`
      (omit the required `sku`) and compare its shape to the auth
      endpoint's already-documented-as-nonstandard 401 shape. Note whether
      FastAPI's default `HTTPValidationError` shape is used consistently.

---

## Phase 1 — Foundational, no dependencies

These can be created in any order and don't need any other resource to
exist first. Do them first so later phases have real IDs to reference.

### 1a. Product Categories — folder `03-Product-Categories`
- Endpoints: `GET /product-categories`, `POST /product-categories`,
  `GET /product-categories/{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `{"name": "..."}` required; `parent_id` optional — test both
  a top-level category and a child category (self-referential `parent_id`)
  to confirm nesting works.
- Fixtures to create and keep: one parent + one child category, IDs
  recorded here after the run, for Products (Phase 2) to reference via
  `category_ids`.

### 1b. Asset Categories — folder `04-Asset-Categories`
- Endpoints: `GET /asset-categories`, `POST /asset-categories`,
  `GET /asset-categories/{identifier}`, `GET .../{identifier}/{path}`.
- Same shape as product categories (`name` required, `parent_id`
  optional) — confirm nesting the same way.
- Fixtures to create and keep: one category, for Assets (Phase 2) to
  reference via `category_ids`.

### 1c. Product Attribute Groups — folder `05-Product-Attribute-Groups`
- Endpoints: `GET /product-attribute-groups`, `POST ...`,
  `GET .../{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `{"name": "..."}` required; `attribute_labels` optional.
- Fixtures to create and keep: one group, for Product Attributes
  (Phase 1d) to optionally reference via `group_ids`.

### 1d. Product Attributes — folder `06-Product-Attributes`
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

### 1e. Connections — folder `07-Connections`
- Endpoints: `GET /connections`, `POST /connections`,
  `GET .../{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `name`+`type` required (`type` is a free string per the
  spec's description — "Dropbox, FTP, SFTP" given as examples, not an
  enum). Confirm whether the API validates `type` against a fixed set or
  accepts anything (test one valid-looking value and one nonsense value).
- No fixtures required downstream (Channels in Phase 4 references
  `connections` optionally — reuse one if convenient, not required).

### 1f. Import Profiles — folder `08-Import-Profiles`
- Endpoints: `GET /import-profiles`, `POST /import-profiles`,
  `GET .../{identifier}`, `GET .../{identifier}/{path}`.
- Create body: `name` required, `settings` optional (shape undocumented in
  spec — inspect `ImportProfileCreateInputDto.settings`'s schema directly
  when you get here, or start with `{}` and see what 422 tells you about
  required sub-fields).
- No downstream dependents in this spec.

---

## Phase 2 — Core content (depends on Phase 1)

### 2a. Assets — folder `09-Assets`
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

### 2b. Products — extend existing folder `02-Products-v3`
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

---

## Phase 3 — Saved queries and outputs (depends on Phase 2)

### 3a. Pim Product Lists — folder `10-Pim-Product-Lists`
- Endpoints: `GET /pim-product-lists`, `POST ...`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`.
- Create body: `name`+`type` required. `type` is `Smart` (dynamic, backed
  by a `query`) or `Static` (fixed member list). Test both: one `Static`
  list referencing the Phase 2b product by ID, one `Smart` list with a
  `query` filtering on something guaranteed to match it (e.g. its `sku` or
  the Phase 1a category).
- Fixtures to create and keep: one list of each type, for Channels/
  Ecatalogs (Phase 4) to reference via `product_list_id`.

### 3b. Asset Lists — folder `11-Asset-Lists`
- Same shape and test approach as 3a, but over the Phase 2a asset.
- Fixtures to create and keep: one list, for Ecatalogs (Phase 4) via
  `asset_list_id`.

### 3c. PDF Catalogs — folder `12-Pdf-Catalogs`
- Endpoints: `GET /pdf-catalogs`, `POST ...`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`.
- Create body: `name` required; `output_attributes` (reference Phase 1d
  attribute), `pages`, `settings` optional — start minimal, then add
  `output_attributes` once the minimal create is confirmed working.
- Fixtures to create and keep: one catalog, for Ecatalogs (Phase 4) via
  `pdf_catalog_id`.

### 3d. Product Families & Product Family Models — folder `13-Product-Families`
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

### 3e. Relationships — folder `14-Relationships`
- **Read-only** (`GET /relationships`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`) — no create endpoint. Per `API V3.md`,
  relationship *types* are configured elsewhere (likely the web app UI,
  not this API), so this phase is search/get validation only.
- Check whether the account already has any relationships configured
  (some Phase 2b/3d exploration may surface `relationships` data on a
  product's output). If none exist, document the empty-list shape.

---

## Phase 4 — Distribution (depends on Phase 3)

### 4a. Channels — folder `15-Channels`
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

### 4b. Ecatalogs — folder `16-Ecatalogs`
- Endpoints: `GET /ecatalogs`, `POST /ecatalogs`, `GET .../{identifier}`,
  `GET .../{identifier}/{path}`.
- Create body: `name` required. Build one minimal create, then one fuller
  one wiring in `product_list_id` (3a), `asset_list_id` (3b), and
  `pdf_catalog_id` (3c) together to confirm the cross-references resolve.

---

## Phase 5 — End-to-end usage flows

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

## After all phases

- Sweep `config/api-testing.config.md`'s "Known API quirks",
  "Status-gating rules", and "Resource ID prefixes" tables — every phase
  above should have added at least one row somewhere.
- Update this file's checkboxes and each folder's own `README.md` (test
  report block) per the skill's Phase 6.
- Revisit the "Out of scope" section — by now you'll likely have a fuller
  picture of the account's real capabilities to bring back to Plytix as a
  concrete question, not a guess.
