# Plytix v3 API — Usage Flows

Complements `TESTING_PLAN.md`, which tests each of the 51 `openapi_pimv3.json`
paths in isolation. This document maps the **common end-to-end journeys
described in the help center** (how a real user builds something in the
dashboard) onto the **sequence of API calls** that should achieve the same
result. Run these after the corresponding Phase 1-4 resources already have
at least smoke-tested create/get endpoints, since every flow below chains
several resources together using real IDs.

Each flow cites the help-center article(s) it's grounded in (per-article
trust note: help-center content is a starting point for *dashboard*
behavior, not ground truth for the *API* — verify every step live) and
marks any step with **no declared v3 endpoint** so you don't waste time
searching the spec for something that isn't there — those are exactly the
things to test empirically and report back on.

---

## ✅ Resolved 2026-09-08 — read this before the section below

Phases 1-4 of `TESTING_PLAN.md` already answered the "do this first"
question below empirically, resource by resource, before this flow
document was run: **undeclared `PATCH`/`DELETE` works on 11 of 11
resources tested** (categories — both kinds, attribute groups,
attributes, connections, import profiles, product/asset lists, channels;
`assets`/`products` were already known) — see
`config/api-testing.config.md` quirk #45 for the full tally. Hypothesis 1
below is confirmed; hypothesis 2 is ruled out. Today's public v3 API is
**not** create-and-read-only for these resources — every one supports
rename (`PATCH`) and delete (`DELETE`) via the same undeclared
`{identifier}` route, just entirely undocumented in
`openapi_pimv3.json`. The rest of this section is kept for historical
context (it accurately describes the state of knowledge before Phases
1-4 ran) but no longer needs to be re-tested before running the flows
below.

## Do this first: the "can I update/delete anything?" question

This blocks or reshapes almost every flow below, so resolve it before
running any of them.

**The finding**: across all 51 paths, only two resources declare a
`PATCH`/`DELETE` at all — `assets` (`PATCH`, no `DELETE`) and `products`
(`DELETE`, no `PATCH`). Every other resource (categories — both kinds,
attribute groups, attributes, connections, import profiles, pdf catalogs,
channels, ecatalogs, product lists, asset lists) exposes **only `POST`
(create) and `GET` (read)** in the spec. Their output DTOs clearly have
fields a user changes after creation (`ChannelOutputDto.active`,
`ECatalogOutputDto.is_public`, `ProductAttributeGroupOutputDto.order`,
etc.), and the help-center articles above all describe renaming, deleting,
scheduling, and publishing these things from the dashboard — so *something*
must let a client change them.

Two explanations, both testable:
1. The generic `{identifier}/{path}` subpath route — already proven to
   accept `GET`/`PATCH`/`DELETE` on `assets` and `GET`/`DELETE` on
   `products` despite an empty spec schema — **also accepts write verbs on
   every other resource, just entirely undocumented** in the
   auto-generated spec (a plausible FastAPI catch-all-route gap, not a
   deliberate omission).
2. These write paths genuinely don't exist yet in the public v3 API for
   these resources, and the dashboard performs them through an internal
   (non-public) endpoint.

**Test before running any flow below**: take a scratch Product Category
from Phase 1a of `TESTING_PLAN.md` and try, in this order:
- `PATCH /product-categories/{id}` (rename) — spec says this doesn't
  exist; confirm 404/405 either way.
- `DELETE /product-categories/{id}` — same.
- If both fail as "route not found" (404) rather than "method not allowed"
  (405), also try the equivalent under the subpath form (there isn't an
  obvious one for a top-level identifier, so this mainly matters once you
  reach list/channel product-linking below).

Record the result in `config/api-testing.config.md`'s quirks table —
whichever hypothesis wins reshapes every "update X" or "publish X" step in
every flow that follows. If (2) is confirmed, say so plainly to the user:
today's public v3 API is effectively **create-and-read-only** for most
non-product/asset resources, and that's a significant, concrete finding
for Plytix, not a testing gap on our end.

---

## Flow 1 — Create and enrich a single product ✅ resolved 2026-09-08

> Already fully executed as Phase 2b's kept fixture (`02-Products-v3`,
> SKU `WC-TEST-FULL-001`, id `6aa022262b6fd055ffb7caa4`) — every step
> below confirmed live: `attributes` keyed by name, `category_ids` and
> `thumbnail_id` both round-trip and expand on `GET`. No further testing
> needed; see `02-Products-v3/README.md`.

**Dashboard source**: `creating-products.md`, `create-and-manage-product-categories.md`,
`create-and-manage-product-attributes.md`, `link-and-unlink-files-to-products.md`.

1. `POST /product-attribute-groups` → group id *(optional; dashboard lets you skip this)*
2. `POST /product-attributes` (`TextAttribute`, `group_ids: [group id]`) → attribute id
3. `POST /product-categories` → category id
4. `POST /assets` (`url`) → asset id (destined for `thumbnail_id`)
5. `POST /products` — `sku` required; include `attributes` (keyed by the
   Phase 1d attribute — **confirm empirically whether the key is the
   attribute's `name`, its generated `label`, or its `id`**, the dashboard
   article only shows the label being auto-derived from the name), `category_ids`,
   `thumbnail_id` → product id
6. `GET /products/{id}` → confirm all of the above round-tripped, and
   confirm the response embeds `categories`/`thumbnail` expanded (per
   `ProductOutputDto`), not just the raw ids.

No open/undeclared steps in this flow — it's the one flow fully covered by
declared `POST`/`GET` endpoints.

---

## Flow 2 — Build a parent/variant product structure ✅ resolved 2026-09-08

> Tested live with scratch products (`WC-TEST-PARENT-001` +
> `WC-TEST-VARIANT-001`, both created against the real "Accessories"
> family and deleted after). Steps 1-5 below all confirmed working as
> described. New findings: `product_level` starts at `0` for a standalone
> product, but a product that **becomes** a parent (gains a variant)
> flips to `product_level: 1`, while the variant itself is
> `product_level: 2` — not `0`/`1` as might be guessed. `num_variations`
> incremented from 0→1 on the parent immediately. The family's own
> `total_products` count (`GET /product-families/{id}`) also updated
> live (7→9) to include both new products. `overwritten_attributes`
> stayed empty on the variant in this test (no attribute values were set
> that could be overwritten) — inheritance-copying behavior itself
> wasn't exercised further. See `02-Products-v3/README.md`.

**Dashboard source**: `manage-product-variations.md`,
`how-to-create-and-manage-product-families.md`,
`assigning-products-to-product-families.md`.

**Important gap**: creating a Product Family itself, choosing which
attributes belong to it, and setting attribute inheritance (Level 1/Level
2 ON/OFF) are all **Settings-only dashboard actions with no corresponding
write endpoint anywhere in the spec** — `product-families` and
`product-family-models` are `GET`-only. This flow can therefore only
*read* family structure via the API, never create or configure one. Use
an existing family already in the account (check `GET /products` results
for a populated `product_family_id`) rather than trying to create one.

1. `GET /products?_fields=product_family_id&_fields=sku` (or similar) to
   find a fixture product that already belongs to a family — note its
   `product_family_id`.
2. `POST /products` — parent: `sku`, `product_family_id` = the id from
   step 1.
3. `POST /products` — variant: `sku`, `product_family_id` (same family —
   the dashboard enforces same-family linking), `parent_id` = the parent's
   id from step 2.
4. `GET /products/{parent_id}` → confirm `num_variations` incremented and
   `product_level` is consistent between parent/variant.
5. `GET /product-families/{family_id}` and
   `GET /product-family-models/{family_id}` → confirm the new
   parent/variant show up in the family's structure (read-only
   verification only).

Inheritance behavior (attribute values copying from parent to variant on
creation, `overwritten_attributes` tracking) is visible on
`ProductOutputDto.overwritten_attributes` — verify it reflects reality
after step 3, but there's no API way to *configure* which attributes
inherit; that's set once in Settings by a human, outside API scope.

---

## Flow 3 — Track product readiness with a Completeness Attribute ❌ blocked 2026-09-08

> **Real, reproducible bug found — blocks this entire flow.** Step 1
> (`POST /product-attributes`, `type: CompletenessAttribute`, with a
> real `attributes: [{"id": "..."}]` reference) 500s every time:
> `{"errors":[{"name":"ConfigurationError","description":"There was an
> error processing your request. Please try again later"}]}`. Confirmed
> reproducible with both one and two real attribute references, on two
> separate attempts. `CompletenessAttribute` only works with an **empty**
> `attributes` array (smoke-tested fine in Phase 1d) — the moment it's
> given the real references the feature exists to use, it breaks. This
> is not the same failure as `HierarchyAttribute`'s 500 (Phase 1d) —
> that's an undocumented/unimplemented type; this is a **documented,
> spec'd type failing on its documented use case**. Flag to Plytix as a
> live bug, not a docs gap. Steps 2-4 below (creating products, comparing
> computed completeness) can't be tested until this is fixed — see
> `06-Product-Attributes/README.md`.

**Dashboard source**: `completeness-tracking.md`.

1. `POST /product-attributes` — `type: CompletenessAttribute`, `attributes:
   [<ids of the attributes that must be filled in>]` (reuse Flow 1's
   attribute, plus a couple more created the same way) → completeness
   attribute id.
2. `POST /products` — one product missing some of the constituent
   attributes, one with all of them filled in.
3. `GET /products/{id}` on both → confirm the completeness attribute's
   computed value appears in each product's `attributes` map, and that it
   differs between the two (a live-computed percentage, not something you
   set directly).
4. Per Phase 0's filter-dialect discovery: once you know the working
   filter syntax, confirm you can filter `/products` by the completeness
   attribute's value (e.g. `=100`) — this is exactly the "only send 100%-
   complete products to a channel" pattern the help-center article
   recommends building as a Smart List (Flow 4).

---

## Flow 4 — Build a Smart product list (dynamic segment) ✅ resolved 2026-09-08

> Steps 1-2 already covered by Phase 3a's kept Smart list
> (`6aa0322d2b6fd055ffb7cabb`, `10-Pim-Product-Lists`). Step 3 confirmed
> live: Smart list membership has **no trace anywhere on the product
> side** — `GET /products/{id}/static_lists` only ever reflects *Static*
> membership (the field's name is literal, not a catch-all), and no
> other subpath/field on the product exposes which Smart lists currently
> match it. The **only** way to see Smart list membership is to
> re-execute the list's own `query` against `/products` — confirms this
> flow's suspicion exactly. See `10-Pim-Product-Lists/README.md`.

**Dashboard source**: `create-and-manage-product-lists.md`.

1. `POST /pim-product-lists` — `name`, `type: Smart`, `query`: a filter
   using the syntax confirmed in Phase 0 (e.g. status/completeness-based,
   mirroring the help-center's example: "basic info completeness = 100 AND
   status = Completed").
2. `GET /pim-product-lists/{id}` → **note that `ProductListOutputDto` has
   no field listing which products currently match** — there's no
   "current members" field on the list resource itself.
3. To see membership, go through products instead:
   `GET /products?_fields=sku` filtered by the same query used in step 1,
   or check `ProductOutputDto.static_list_ids` on a specific product (note:
   this field is named for *static* membership — confirm empirically
   whether Smart list membership shows up anywhere on the product side at
   all, or only by re-running the list's own `query` against `/products`).

---

## Flow 5 — Build a Static product list (manual membership) ✅ resolved 2026-09-08

> **The real mechanism, fully confirmed**: adding a product to a Static
> list is done via `PATCH /products/{id}` with `{"static_list_ids":
> ["<list_id>"]}` (undeclared but works, per the Phase 0-4 `PATCH`
> finding) — confirmed by Phase 3a's kept Static list, which has the
> Phase 2b product as a real member this way; verify via
> `GET /products/{id}/static_lists`. The two subpath-guess candidates
> below were both tested this session and **ruled out**:
> `POST /pim-product-lists/{id}/products` → `405 Method Not Allowed`;
> `PATCH /pim-product-lists/{id}/products` → `422`, because `products`
> isn't a real field on `ProductListUpdateInputDto` at all (the generic
> subpath `PATCH` mechanism validates the body against that DTO typed at
> the given field name — there simply is no such field). So: no
> list-side write path exists for membership; it's exclusively a
> product-side field. See `10-Pim-Product-Lists/README.md`.

**Dashboard source**: `create-and-manage-product-lists.md` ("Link
products" action).

1. `POST /pim-product-lists` — `name`, `type: Static` (no `query`).
2. **Open/undeclared step**: the dashboard's "Link products" button must
   map to some write call, but nothing in the spec shows a way to add
   product ids to an existing list. Candidates to test empirically (see
   "Do this first" above for why these might work despite not being in
   the spec):
   - `PATCH /pim-product-lists/{id}` with a body like
     `{"product_ids": [...]}` (spec says this route doesn't exist at all —
     confirm 404).
   - `POST` or `PATCH` on a subpath, e.g.
     `POST /pim-product-lists/{id}/products` (matches the "1:M Link a new
     entity instance" URL pattern described in `API V3.md` row 212 —
     entirely unconfirmed against the live API, but the closest documented
     hint).
   - **Confirmed available without guessing**: `ProductCreateDto` already
     has a `static_list_ids` property. So `POST /products` with
     `static_list_ids: [list id]` should add a *new* product to the list
     at creation time — test this first, it's the one part of this flow
     that's actually declared in the spec. The open question is only
     about adding an *existing* product to a list after the fact (there's
     no declared `PATCH /products/{id}` at all — see "Do this first"
     above), which is why the subpath guesses above still matter for that
     case specifically.
3. Whichever works, `GET /products/{id}` on a linked product afterward to
   confirm `static_list_ids` includes the new list's id.

Report back to the user exactly which of these worked — this is one of
the most useful concrete findings this plan can produce, since it
resolves a real ambiguity in a commonly-used dashboard action.

---

## Flow 6 — Export via a Channel ✅ resolved 2026-09-08 (both open steps ruled out)

> Both open/undeclared steps tested and ruled out. **Direct product
> assignment**: `PATCH /channels/{id}/products` → `422`, same
> "`products` isn't a real field on `ChannelUpdateInputDto`" shape as
> Flow 5's list equivalent — no subpath mechanism exists;
> `product_list_id` (a real, declared field, confirmed linking
> immediately on create in Phase 4a) is the only way products reach a
> channel via the API. This directly resolves the help-center-vs-spec
> discrepancy noted below: the dashboard's "direct assignment" language
> is UI framing, not a distinct API mechanism — under the hood it's
> `product_list_id` either way (very likely via an auto-generated hidden
> list when a user "directly assigns" in the dashboard). **"Process"**:
> `POST /channels/{id}/process` and `.../build` both → `405 Method Not
> Allowed` (route exists at the generic subpath level but doesn't accept
> `POST`). Separately, `PATCH`ing `active: true` on the kept channel left
> `running`/`last_run_start_at`/`file_path` all unchanged (still
> false/null) — confirms flipping `active` is just a metadata flag, not
> a build trigger. **"Process" is confirmed UI/internal-only, not
> reachable via any v3 endpoint.** See `15-Channels/README.md`.

**Dashboard source**: `creating-a-channel.md`.

**Important discrepancy to flag**: the help-center article explicitly says
*"A Channel is a Destination, so products are added to it by assigning
them directly, there's no separate product list step."* But
`ChannelCreateInputDto`/`ChannelOutputDto` both have a `product_list_id`
field. These two descriptions don't obviously reconcile — either the
dashboard's "direct assignment" is implemented under the hood as an
auto-generated hidden product list, or `product_list_id` is a legacy/
alternate mechanism the current UI doesn't use. Test both paths.

1. `POST /connections` *(optional — only if testing the FTP/Dropbox
   delivery option)*.
2. `POST /channels` — `name`, `format: "CSV"` (start simple), optionally
   `product_list_id` = a Flow 4/5 list's id.
3. **Open/undeclared step**: assigning products *directly* to the channel
   (the dashboard's primary documented method) — same candidate subpath
   guesses as Flow 5 step 2, but against `/channels/{id}/products` (or
   whatever `GET .../{id}/{path}` discovery in `TESTING_PLAN.md` Phase 0
   turns up as a valid subpath name for this resource).
4. **Open/undeclared step**: "Process" (the action that builds the actual
   export file and flips the channel from Draft to Live) has no candidate
   endpoint anywhere in the 51 paths — no job/action verb, no `-jobs`
   equivalent (those are the out-of-scope Process Manager endpoints from
   `TESTING_PLAN.md`'s "Out of scope" section). Treat this as very likely
   **not exposed in v3 today** rather than something to keep hunting for.
   Confirm by checking whether `GET /channels/{id}` ever shows `active:
   true` / a populated `last_run_*` field on a channel you never processed
   through the dashboard — if it never changes no matter what you `POST`,
   that's confirmation this is UI/internal-only.
5. `GET /channels/{id}` → confirm whatever *did* get set (name, format,
   product_list_id) round-trips correctly regardless of the open items
   above.

---

## Flow 7 — Build a Brand Portal (API resource name: `ecatalogs`) ❌ blocked 2026-09-08

> **Blocked entirely, for a reason this flow couldn't have anticipated**:
> Phase 4b found Ecatalogs feature-gated off for "David's Dev Account" —
> `POST /ecatalogs` 422s regardless of body validity
> (`config/api-testing.config.md` status-gating #3). Steps 1-4 below
> can't be executed at all in this account (no ecatalog can be created to
> wire `product_list_id`/`asset_list_id`/`pdf_catalog_id` into). Step 6's
> "Publish" question is consequently untestable too — there's no
> ecatalog this session created to test it against, and the account's one
> real pre-existing ecatalog ("Plytix Brand Portal") is a read-only
> fixture that must not be mutated. This whole flow needs a different
> account (with both Ecatalogs and PDF Catalogs enabled) before it can be
> executed end-to-end. See `16-Ecatalogs/README.md`.

**Dashboard source**: `create-and-manage-e-catalogs.md`.

**Terminology note for the docs team, not just testing**: the current
dashboard and help center call this feature **"Brand Portals"**
throughout — the term "e-catalog"/"ecatalog" appears only in the
resource's URL slug history and the API's own naming
(`/api/v3/ecatalogs`, `ECatalogCreateInputDto`). Any future docs IA/nav
work should use "Brand Portal" as the reader-facing term and note
`ecatalog` only as the underlying API resource name — flag this to
`docs-ia`/`structure-planner` when planning navigation for this section.

1. `POST /pim-product-lists` (Flow 4 or 5) → product_list_id.
2. `POST /asset-lists` (same Smart/Static pattern as product lists,
   confirm identical create shape) → asset_list_id.
3. `POST /pdf-catalogs` *(optional — only if testing `pdf_catalog_id`)*.
4. `POST /ecatalogs` — `name`, `product_list_id`, `asset_list_id`,
   optionally `pdf_catalog_id`.
5. `GET /ecatalogs/{id}` → confirm `is_public` is `false` by default
   (matches the dashboard's "Preview before Publish" behavior).
6. **Open/undeclared step**: "Publish" (the action that flips `is_public`
   to `true` and generates the portal's live URL) has no candidate
   endpoint in the spec — same category of gap as Channels' "Process."
   Test the same subpath-guess approach
   (`POST`/`PATCH /ecatalogs/{id}/publish` or similar) before concluding
   it's dashboard-only, but expect it to be out of reach via the
   documented v3 surface.

---

## Flow 8 — Relationships (mostly out of API reach today) ✅ resolved 2026-09-08

> Already covered by Phase 3e — `GET /relationships` confirmed 2 real
> relationship types exist ("Bundles", "Cross-sell"), and
> `GET /products/{id}` confirmed the product-side read exposure
> (`product_relationships`) resolves to real relationship-type data. No
> new testing needed; the "cannot create/assign/modify via API" framing
> below is confirmed accurate. See `14-Relationships/README.md`.

**Dashboard source**: `relationships/create.md`,
`relationships/assigning-products.md`.

`relationships` is **entirely `GET`-only** in the spec — no `POST`
anywhere. Both dashboard steps this flow is built from (creating a
relationship *type* like "Recommended Products" in Settings, then
assigning specific SKUs to it) have zero corresponding write endpoint.

1. `GET /relationships` — confirm whatever relationship types already
   exist in the account (created via the dashboard, not by us) are
   visible, and inspect the shape.
2. `GET /products/{id}` on a product known to have relationships (check
   `ProductOutputDto.relationships`) — confirm the *product* side exposes
   relationship data for read purposes, even though nothing can create or
   modify it via API.
3. Document this plainly as a real product limitation for Plytix, not a
   testing gap: **relationships cannot be created, assigned, or modified
   through the public v3 API at all** — only read, and only if the
   dashboard or a CSV import already put the data there.

---

## After running these flows

- Every "**Open/undeclared step**" above that you resolve (worked via a
  subpath guess, or confirmed genuinely unavailable) should get a row in
  `config/api-testing.config.md`'s "Known API quirks" table — these are
  exactly the kind of finding that changes what's *possible* to document
  as a how-to guide versus what has to stay dashboard-only in the docs.
- If a meaningful fraction of "Open/undeclared steps" turn out to work via
  the undeclared subpath mechanism, that's worth a specific callout back
  to Plytix: the public `openapi_pimv3.json` materially undersells what
  the API can actually do, which affects both our docs and any customer
  reading the same spec.
- If they consistently don't work, that reshapes the docs plan directly:
  several dashboard-documented workflows (static list/channel product
  assignment, channel processing, brand portal publishing, relationship
  management) would need to be documented as dashboard-only procedures,
  not API how-tos, until Plytix ships the missing endpoints.
