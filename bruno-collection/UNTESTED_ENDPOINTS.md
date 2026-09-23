# Untested and Partially-Tested Endpoints

*Last updated: 2026-09-23. All re-tests performed against "David's Dev Account" on `https://pim.dev.plytix.com/api/v3`.*

This document lists every endpoint—or discrete scenario within an endpoint—that could not be fully tested, grouped by root cause. Each entry states what was attempted, what happened, what the documentation impact is, and what needs to happen before the gap can be closed.

---

## 1. Account Feature Gates

These endpoints exist in the spec, and the error responses confirm the feature is known to the server, but this Dev account does not have the feature enabled. The success path cannot be exercised without a different account tier or explicit enablement by Plytix.

---

### 1a. `POST /pdf-catalogs` — PDF Catalog creation

**File:** `12-Pdf-Catalogs/Create Pdf Catalog - Feature Not Enabled (422).bru`

**What was attempted:** `POST /pdf-catalogs` with a minimal valid body.

**What happened:** `422 Unprocessable Entity` with body `{"errors":[{"name":"ValidationError","description":"Cannot create new items the feature pdfs for account ..."}]}`. The error fires before any field validation, meaning the payload shape is irrelevant — the whole endpoint is gated.

**Consequence:** The success response shape (`201` + created catalog object), the field set accepted on create, and `PATCH`/`DELETE /pdf-catalogs/{id}` (declared in the 2026-09-15 spec refresh) are all untested. No example responses available for docs.

**What's needed to close:** Ask Plytix to enable the PDF Catalogs add-on on the Dev account, or provide an account that has it.

---

### 1b. `POST /ecatalogs` and `PATCH`/`DELETE /ecatalogs/{id}` — Ecatalog creation and mutation

**File:** `16-Ecatalogs/Create Ecatalog - Feature Not Enabled (422).bru`

**What was attempted:** `POST /ecatalogs` with a minimal valid body.

**What happened:** `422 Unprocessable Entity` with body `{"errors":[{"name":"ValidationError","description":"Cannot create new items the feature ecatalogs for account ..."}]}`. Same feature-gate pattern as PDF Catalogs.

**Consequence:** Create success shape, accepted fields, and `PATCH`/`DELETE` (declared in the 2026-09-15 spec refresh) all untested. The existing ecatalog in the account (`Plytix Brand Portal`, id `6a38f615c3d65a5f868b1a41`) was reachable via `GET`, so the read shape is fully confirmed — only write operations are blocked.

**What's needed to close:** Same as above — enablement on the Dev account, or a separate account that has Ecatalogs enabled.

---

### 1c. `PATCH /product-families/{id}/attributes/{attr_id}` — Change family attribute level

**File:** `13-Product-Families/Update Family Attribute Level.bru`

**What was attempted:** `PATCH /product-families/{id}/attributes/{attr_id}` with `{"level": "parent_level"}` against a real family-attribute link.

**What happened:** `403 Forbidden` with body `{"errors":[{"name":"PermissionError","description":"Automatic inheritance is not available for this account"}]}`. This is a plan-level feature gate — attribute-level inheritance (moving attribute values up to the parent product and having variants inherit them) is not available on this Dev account.

**Consequence:** The success response shape for a level change is unconfirmed. This is the only write operation across the entire collection where the success path is blocked by a feature gate rather than a bug. The endpoint is known to exist and to accept the correct input shape (the 403 fires after auth and before field validation).

**What's needed to close:** Ask Plytix to enable "automatic inheritance" on the Dev account, or provide credentials for a higher-tier account that has it.

---

### 1e. `PATCH /products/{id}` with `channel_ids` / `ecatalog_ids` — Success path

**File:** `02-Products-v3/Update Product (PATCH).bru` ("403 - Relationship Field Blocked by UEF Feature Gate" example)

**What was attempted:** `PATCH /products/{id}` with `{"channel_ids": ["<real channel id>"]}`, then `{"ecatalog_ids": ["<real ecatalog id>"]}`, then both together.

**What happened:** All three attempts returned `403 Forbidden` with `{"errors":[{"name":"PermissionError","description":"UEF feature is not enabled for this account"}]}` — a new error message/gate not seen anywhere else in this project.

**Consequence:** The success shape for assigning a product directly to a channel or ecatalog via `ProductUpdateInputDto`'s `channel_ids`/`ecatalog_ids` fields is unconfirmed. Cannot document these fields as usable without a loud caveat.

**What's needed to close:** Ask Plytix to enable whatever "UEF" feature gates this on the Dev account, or provide an account that has it.

---

### 1d. `POST /product-attributes` with `FormulaAttribute` — Success path

**File:** `06-Product-Attributes/Create Text Attribute.bru` (FormulaAttribute example)

**What was attempted:** `POST /product-attributes` with `{"name": "...", "type": "FormulaAttribute", "formula_str": "..."}`.

**What happened:** `422 Unprocessable Entity` with `{"errors":[{"name":"ValidationError","description":"This account reached the limit of 2 formula attributes"}]}`. The Dev account already has 2 formula attributes and cannot create more.

**Consequence:** The `201` success shape for `FormulaAttribute` was never captured. The 422 limit-enforcement error is documented. The create-path shape itself can be reasonably inferred from the `FormulaAttributeCreateInputDto` schema in the spec, but is not live-confirmed.

**What's needed to close:** Either delete one of the existing formula attributes on this account to free a slot, or test against a fresh account without existing formula attributes.

---

## 2. Live Server Bugs — Valid Requests Return 500

These endpoints receive correctly-formed requests that pass field validation but return `500 ConfigurationError`. Both have been reproduced multiple times and re-tested on 2026-09-22 with no change. The success path is fully blocked until Plytix fixes the underlying handler.

---

### 2a. `POST /product-attributes` with `HierarchyAttribute`

**File:** `06-Product-Attributes/Create Text Attribute.bru` (HierarchyAttribute example)

**What was attempted:** `POST /product-attributes` with `{"name": "...", "type": "HierarchyAttribute"}`.

**What happened:** `500 Internal Server Error` with `{"errors":[{"name":"ConfigurationError","description":"There was an error processing your request. Please try again later"}]}`. The type passes pydantic discriminator validation (it is a recognized type tag in the live API's 15-type enum) but the create handler is not wired up.

**Additional context:** `HierarchyAttribute` is absent from both `openapi_pimv3.json`'s declared `oneOf` types (14 total) and from `materials/help-center/attribute-types.md`'s full type list. Its presence in the pydantic discriminator strongly suggests it is an in-progress feature, not a finished public type.

**Re-tested:** 2026-09-22 — still `500`.

**Consequence:** `HierarchyAttribute` cannot be documented as a supported attribute type. It should not appear in any customer-facing docs until confirmed fixed and officially released.

**What's needed to close:** Plytix must fix the server-side handler. Until then, treat `HierarchyAttribute` as a non-public type.

---

### 2b. `POST /product-attributes` with `CompletenessAttribute` + real attribute references

**File:** `06-Product-Attributes/Create Text Attribute.bru` (CompletenessAttribute example)

**What was attempted:** `POST /product-attributes` with `{"name": "...", "type": "CompletenessAttribute", "attributes": [{"id": "<real_attribute_id>"}]}`.

**What happened:** `500 Internal Server Error` with the same `ConfigurationError` body. Reproduces consistently when the `attributes` array contains real attribute object references. An empty `attributes: []` creates successfully with `201` — only the non-empty reference case 500s.

**Re-tested:** 2026-09-22 — still `500`.

**Consequence:** `CompletenessAttribute` can be documented as a type that exists and creates (with an empty attribute list), but its core purpose — tracking completeness across a specified set of attributes — cannot be fully exercised or documented. The success shape with real references is unknown.

**What's needed to close:** Bug report to Plytix. The handler needs to correctly process non-empty `attributes` arrays.

---

## 3. Timed Out / Unresponsive Endpoint

---

### 3a. `GET /product-relationships?relationship_id=<id>` — Filter by relationship type

**File:** `17-Product-Relationships/Get Product Relationships (Top-Level).bru` (timeout example)

**What was attempted:** `GET /product-relationships?relationship_id=6a38f5d8c3d65a5f868b186c` — filtering the top-level product-relationships search by a real relationship type id from this account.

**What happened (2026-09-15):** Raw `504 Gateway Time-out` HTML page returned after a long hang — not a JSON error envelope.

**What happened (2026-09-22 re-test):** The request hung for the full 15-second timeout and returned **no response at all** (curl exit code 000). Worse than the original test — the 504 HTML is no longer even returned, suggesting the problem has deepened.

**Consequence:** Filtering the top-level product-relationships endpoint by relationship type is completely unusable. The workaround (`?account_id=` or `?product_id=` filters, both confirmed working) is documented in the `.bru` file, but the `relationship_id` filter path cannot be covered in any docs as a supported operation.

**What's needed to close:** Bug report to Plytix. The `relationship_id` filter likely lacks a database index, causing a full-table scan that times out. The `product_id` and `account_id` filters should be used instead until this is fixed.

---

## 4. Endpoint Returns Wrong HTTP Status on a Valid Error

---

### 4a. `GET /related-products?relationship_id=<id>` — Filter by relationship type (500 instead of 400)

**File:** `17-Product-Relationships/Get Related Products (Top-Level).bru` (500 example)

**What was attempted:** `GET /related-products?relationship_id=6a38f5d8c3d65a5f868b186c`.

**What happened:** `500 Internal Server Error` with body `{"errors":[{"name":"HiddenFieldError","description":"Field 'relationship_id' does not exist in model 'RelatedProduct'."}]}`.

**Re-tested:** 2026-09-22 — still `HTTP 500`.

**Why this is a bug, not a usage error:** The `RelatedProduct` model genuinely has no `relationship_id` field (confirmed). However, every other "field doesn't exist" case in the entire v3 API correctly returns `400` or `422` with a `HiddenFieldError` or `InvalidFieldError` body — the same error name and description, but the right status code. This endpoint leaks the validation error as a `500` instead of catching it properly.

**Consequence:** The `relationship_id` filter on `/related-products` cannot be safely documented as either "supported" (it doesn't work) or "returns a clean 400" (it 500s). The behavior is misleading to API consumers who would assume a 500 means a server problem, not an invalid query parameter.

**What's needed to close:** Bug report to Plytix — specifically that the `HiddenFieldError` on `/related-products?relationship_id=` should be caught and returned as `400`, not allowed to bubble up as `500`.

---

## 5. Endpoint Returns Incorrect Data

---

### 5a. `GET /products/{id}/relationships/{rel_id}/related-products` — Always empty

**File:** `17-Product-Relationships/Get Related Products Subpath (Bug - Empty).bru`

**What was attempted:** `GET /products/{product_id}/relationships/{relationship_id}/related-products` immediately after a relationship link was confirmed active (verified via: the create response itself, the product's `product_relationships` field, and `GET /related-products?product_id=<id>` — three independent confirmations).

**What happened:** `200 OK` with `{"data": [], "errors": []}` — empty, despite the confirmed live link. Reproduced on both the collection endpoint and the single-item `...related-products/{related_product_id}` variant (which returns `404 NotFoundError` for the same just-linked product).

**Re-tested:** 2026-09-22 — still empty on the `BAG-10157` product's pre-existing Cross-sell relationship.

**Consequence:** This subpath is entirely unreliable. It cannot be documented as a working way to discover which products are on the other end of a relationship link. The workaround (`GET /related-products?product_id=<id>`, scoped with `account_id` to avoid the cross-tenant leak) is the only confirmed-working alternative.

**What's needed to close:** Bug report to Plytix. The subpath appears to query a different data store or index than the one the link was written to.

---

### 5b. ~~`PATCH /products/{id}` with `static_list_ids` — Silently no-ops (possible regression)~~ — RETRACTED, see 5c

**❌ Retracted 2026-09-23.** This was a false positive: `static_list_ids` genuinely does apply via `PATCH` (re-confirmed via `GET /products?_fields=static_lists&sku=...`, which correctly shows the link on both a fresh scratch product and the long-lived `WC-TEST-FULL-001` fixture). The `GET /products/{id}/static_lists` subpath used to check this is itself broken — see 5c below, which is the real bug this entry's testing actually found.

---

### 5c. `GET /products/{id}/categories`, `.../assets`, and `.../static_lists` — Always empty regardless of real linkage

**File:** `02-Products-v3/Get Product Subpath - Attributes.bru`, `List Products.bru`

**What was attempted:** `GET /products/{id}/categories`, `.../assets`, and `.../static_lists` against products with confirmed real, live linkage — a fresh scratch product (categories + thumbnail asset linked on `POST`, confirmed present via `_fields` immediately after) and the long-lived reference fixture `BAG-10157` (genuinely has 2 categories and 11 assets).

**What happened:** `200 OK` with `{"data": [], "errors": []}` every time — always empty, regardless of confirmed real linkage. Reproduced consistently across multiple products and multiple re-tests.

**Why this is a bug, not a usage error:** `GET /products?_fields=categories&_fields=assets&_fields=static_lists&sku=...` on the search endpoint returns the exact same data fully expanded and correct, on the same products, at the same time. The dedicated per-relation subpath route is broken while the equivalent `_fields` mechanism on the list/search endpoint works fine. `/relationships` and `/attributes` subpaths on the same resource are confirmed unaffected. This previously worked — 2026-09-07 captures of `/categories` and `/assets` on `BAG-10157` returned real expanded data.

**Consequence:** The dedicated subpath route can no longer be recommended in docs as the way to fetch expanded categories/assets/static-list-membership for a product. It also produced two false-positive bug reports earlier in this project (see 5b above, and the retracted quirk #71 in `config/api-testing.config.md`) before the root cause was found — any doc-writing or testing session that verifies a relationship-array field via this subpath should switch to `_fields` on the search endpoint instead.

**What's needed to close:** Bug report to Plytix — a regression in the `/{identifier}/{path}` subpath handler for `categories`/`assets`/`static_lists` specifically (not `relationships`, which is unaffected).

---

## 6. Cross-Tenant Data Leaks — Unfiltered Use Untestable

Four top-level listing/search endpoints return records belonging to **other Plytix accounts** when called without an explicit account filter. All three were introduced in the 2026-09-15 spec refresh. The filtered variants (using `?account_id=` or `?product_id=`) are confirmed working and scoped correctly — only the unfiltered behavior is broken.

Re-tested all four on 2026-09-22: all still leaking.

---

### 6a. `GET /product-attributes` — Unfiltered listing

**File:** `06-Product-Attributes/Create Text Attribute.bru` (docs block)

**What happens:** Returns `BooleanAttribute` records from account ids `5d0bae46c7ab750468a3d67e` and `60795dcd302a91ac42e7f5f9` — neither is "David's Dev Account" (`6a38f5a5b22478f30bfd755c`).

**Note:** Unlike the other three (which are new endpoints from the Sept refresh), this resource is not new — the data-isolation gap here may indicate a pre-existing but previously unnoticed bug, or that this endpoint was always intended to require an explicit filter.

**Workaround:** Use `GET /product-attributes/{id}` by known ObjectId. Do not use the listing endpoint in any customer-facing docs or workflows until fixed.

---

### 6b. `GET /family-attributes` — Unfiltered listing

**File:** `13-Product-Families/Get Family Attributes (Top-Level).bru`

**What happens:** Returns family-attribute link records from account ids `60bf43f6097dd5dba9792edd` and `5ee27f5db2a5094797405d9b`. Use `?account_id=6a38f5a5b22478f30bfd755c` for correctly-scoped results.

---

### 6c. `GET /product-relationships` — Unfiltered listing

**File:** `17-Product-Relationships/Get Product Relationships (Top-Level).bru`

**What happens:** Returns relationship link records where `relationship_id` starts with `5de6...` — a different account's data. Use `?account_id=` or `?product_id=` for correctly-scoped results.

---

### 6d. `GET /related-products` — Unfiltered listing

**File:** `17-Product-Relationships/Get Related Products (Top-Level).bru`

**What happens:** Returns `RelatedProduct` records with `account_id: "5da70dd81f44e030456efd2b"` — explicitly visible in the response body and clearly not this account. Use `?account_id=` or `?product_id=` for correctly-scoped results.

---

**Priority note on leaks 6a–6d:** These are live data-isolation bugs affecting real Plytix customer data. All four should be reported to Plytix as a single security/privacy issue ("four listing endpoints return cross-tenant records without an explicit filter") rather than as four separate bugs — same root cause, same fix pattern.

---

## 7. Spec Declares Route, Live Returns 405

---

### 7a. `POST /product-families/{id}/{path}` — Subpath create

**File:** `13-Product-Families/Update and Delete Product Family.bru` (docs block)

**What was attempted:** `POST /product-families/{id}/name` (and other subpath values).

**What happened:** `405 Method Not Allowed` with `{"errors":[{"name":"MethodNotAllowed","description":"POST is not allowed on this path."}]}`, regardless of which `{path}` value was tried.

**Why this matters:** `openapi_pimv3.json` (as of the 2026-09-15 refresh) explicitly declares `post` as a valid method on `/product-families/{identifier}/{path}`. The live API rejects it. This is a spec-vs-live mismatch, not a usage error.

**Consequence:** The success shape of `POST /product-families/{id}/{path}` is unknown. The `PATCH` subpath variant (`PATCH /product-families/{id}/name`) works correctly with a `200`.

**What's needed to close:** Ask Plytix whether `POST` on this path was declared by mistake in the spec, or whether the live implementation is behind — and get the spec corrected accordingly.

---

## 8. Scope Uncertainty — Cannot Determine What to Document

---

### 8a. Channels — Conflicting signals about public API scope

**File:** `15-Channels/Create Channel - Minimal.bru` (docs block)

**What was tested:** Full CRUD on `/channels` confirmed working. `POST` (multiple format variants), `GET`, `PATCH`, `DELETE`, and the `PATCH /channels/{id}/products` subpath are all confirmed live.

**The problem:** Three sources conflict:
- `materials/project-references/before-writing.md` states flatly: "Channels are not in the API."
- `materials/project-references/Writechoice - Project Requirements.pdf` describes a Channels endpoint as "currently being developed... provided it is confirmed as part of the public API v3 scope."
- `openapi_pimv3.json` and live testing show a fully working `/channels` CRUD resource today.

**Consequence:** All Channels endpoint behavior is confirmed and documented in the Bruno collection, but whether to include Channels in the public-facing documentation cannot be decided without Plytix's explicit confirmation. Writing docs for Channels before that confirmation risks including an officially-unsupported endpoint.

**What's needed to close:** Ask Plytix directly: is `/channels` part of the public, customer-facing v3 API scope that should be documented? The answer determines whether the collection's Channels coverage lands in docs.

---

## Summary Table

| Endpoint | Reason not fully tested | Priority | Needs |
|---|---|---|---|
| `POST /pdf-catalogs` | Account feature gate (422) | Medium | Feature enablement |
| `POST /ecatalogs`, `PATCH`/`DELETE /ecatalogs/{id}` | Account feature gate (422) | Medium | Feature enablement |
| `PATCH /product-families/{id}/attributes/{attr_id}` | Account feature gate (403) | Low | Higher-tier account |
| `PATCH /products/{id}` `channel_ids`/`ecatalog_ids` | Account feature gate (403, "UEF feature") | Medium | Feature enablement |
| `POST /product-attributes` `FormulaAttribute` | Account plan limit (422) | Low | Delete existing or use fresh account |
| `POST /product-attributes` `HierarchyAttribute` | Server bug, 500 (re-tested 2026-09-22) | High | Plytix bug fix |
| `POST /product-attributes` `CompletenessAttribute` + refs | Server bug, 500 (re-tested 2026-09-22) | High | Plytix bug fix |
| `GET /product-relationships?relationship_id=` | Hangs indefinitely (re-tested 2026-09-22) | High | Plytix bug fix |
| `GET /related-products?relationship_id=` | 500 instead of 400 (re-tested 2026-09-22) | High | Plytix bug fix |
| `.../relationships/{rel_id}/related-products` | Always empty despite live links (re-tested 2026-09-22) | High | Plytix bug fix |
| `GET /product-attributes` (unfiltered) | Cross-tenant data leak (re-tested 2026-09-22) | Critical | Plytix security fix |
| `GET /family-attributes` (unfiltered) | Cross-tenant data leak (re-tested 2026-09-22) | Critical | Plytix security fix |
| `GET /product-relationships` (unfiltered) | Cross-tenant data leak (re-tested 2026-09-22) | Critical | Plytix security fix |
| `GET /related-products` (unfiltered) | Cross-tenant data leak (re-tested 2026-09-22) | Critical | Plytix security fix |
| `POST /product-families/{id}/{path}` | Spec declares it, live 405s | Medium | Plytix spec correction |
| All Channels endpoints | Scope unclear — conflicting source materials | High | Plytix scope confirmation |
| `GET /products/{id}/categories`, `.../assets`, `.../static_lists` | Always empty regardless of real linkage (confirmed bug, 2026-09-23) | High | Plytix bug fix — use `_fields=` on search instead |
