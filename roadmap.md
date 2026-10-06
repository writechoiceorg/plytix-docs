Plytix Docs Roadmap (Rebaselined Oct 6, 2026)

Status key: :white_check_mark: done · :arrows_clockwise: in progress · :todo_added: not started · :warning: blocked / at risk

Original start: Aug 31. Rebaseline date: Oct 6 (start of Week 6). Target: **first public beta in the last week of October (Oct 26–30)**, covering V1/V2 and V3.

---

## Project Context (Decided)

- **Platform:** Fumadocs (open source), deployed to a separate domain from the Help Center. :warning: Hosting target (AWS option, domain, DNS) still to be decided by Plytix Infra. See `fumadocs/INFRA-DEPLOYMENT-OPTIONS.md`.
- **Audience:** Technical Internal User/Automation Builder, Integration Engineer (ERP/eCom stack), Partner Developer, and AI agents (Cursor, Copilot, Claude). OpenAPI quality and LLM-readable descriptions are a hard requirement.
- **Scope:** Developer portal only (API v3 + V1/V2 legacy + MCP + migration). The Help Center stays on its own platform.
- **Source of truth priority:** Verified API findings > `materials/` raw sources > Help Center scrape.
- **Key facts to carry into every deliverable (updated Oct 6):**
  - Auth uses a non-standard two-step exchange (API key + password for a bearer token), the same as v1. It is not OAuth 2.0. `refresh_token` is not functional and must not be documented. v3 auth will change later, so launch docs describe the *current* flow and say that it will change.
  - Rate limits: standard accounts are **20 req/10 s + 2,000/hour** or **50 req/10 s + 5,000/hour**; enterprise accounts may be negotiated. Plytix will share official figures for both windows. Token lifetime is 15 minutes.
  - Pagination is `_page` / `_page_size` only (`_offset` / `_limit` do not exist).
  - Product levels: 0 SINGLE, 1 PARENT, 2 VARIANT, 3 SUB_VARIANT.
  - Supported way to link/unlink: `POST /{entity}/{id}/{relation}` and `DELETE /{entity}/{id}/{relation}/{linked_id}` (products/categories, assets/categories, product-attributes/groups). Linking and unlinking **assets on products is not supported**. Generic `DELETE /products/{id}/{path}` must not be presented as a way to unlink.
  - Channels, Connections, Ecatalogs, PDF Catalogs, Import Profiles, Product Lists and infrastructure endpoints are **internal** and not documented. Channel feeds belong to a separate Channel Integration API.
  - Unified error conventions: duplicates return 409, PATCH returns 204 with no content, create returns 201.
  - The v3 OR logic (`_or[index]`) is one of the highest-value v3 improvements to document.
  - Bulk API is restricted to large/enterprise clients, so document it with a clear "contact your account manager" gate.
  - v1/v2 are still used for many write operations. The migration guide must be nuanced, not "move everything to v3." Re-verify this against the new v3 write endpoints.

---

## Completed Since Kickoff (status as of Oct 6)

| Area | Status |
|---|---|
| Discovery calls, access, API testing (Bruno collection, 39 questions to Plytix Eng) | :white_check_mark: |
| Platform choice (Fumadocs), IA/outline, generated reference pipeline | :white_check_mark: |
| Core Concepts: Authentication, Errors, Rate Limits, Filtering, Pagination, Updates & Deletes | :arrows_clockwise: drafted, needs review and updates for Plytix answers |
| Guides: Overview, Quickstart, Data Model | :arrows_clockwise: drafted, review pending |
| Integration Guides (8): ERP sync, Full export, Quality audit, Marketplace feed, Safe removal, Parent/Variant, Bulk, Webhooks | :arrows_clockwise: drafted. Marketplace feed and Safe removal need rework |
| MCP: Documentation MCP + Platform MCP (5 pages) | :arrows_clockwise: drafted, depends on the product timeline for Platform MCP |
| Migration guide + Migration reference | :arrows_clockwise: drafted |
| V1/V2 legacy reference | :arrows_clockwise: generated from `openapi-v1v2.json`. Needs review, redirects and versioning |
| llms.txt, MCP endpoint, search, version switcher | :arrows_clockwise: exist, need QA |
| Analytics (Umami) | :warning: wired but off, needs an instance and env vars |
| Style guide | :todo_added: |
| Visual/brand review and design sign-off | :todo_added: |

---

## Public Release Scope (to be locked in Week 1 below)

**In the first public beta**
- **Guides:** Overview, Quickstart, Data Model, Migrating to v3, the integration guides that remain accurate (ERP sync, full export, quality audit, parent/variant, safe removal rewritten, bulk with gate), Webhooks as a concept page only.
- **MCP:** Documentation MCP and Platform MCP (if Plytix confirms timing, otherwise a clearly marked preview).
- **API Reference V3:** Core Concepts (auth, errors, rate limits, filtering, pagination, updates/deletes) plus the **public** resources: Products, Assets, Product Categories, Asset Categories, Asset Lists, Product Families, Family Attributes, Product Attributes, Product Attribute Groups, Relationships, Product Relationships, Related Products. About 104 operations, taken from the endpoint visibility sheet plus the 6 new link/unlink operations.
- **API Reference V1/V2:** legacy reference with a clear differentiation from V3, redirects and a version switcher.
- **Technical:** navigation and versioning between V1/V2/V3, search, llms.txt and MCP, analytics, link and code-sample checks.

**Later phase**
- SDK and CLI docs (stub "coming soon" pages only), full Bulk API, deep V1/V2 rewrite, Workspaces, community features, new auth (v3 auth) docs, and any internal endpoint if Plytix later makes it public.

**Gated on a Plytix answer (default in parentheses)**
- Products `channels`, `ecatalogs`, `product_data_sheets`, `static_lists` subpaths and `assets/static_lists` (hidden).
- Generic `POST/DELETE /{entity}/{id}/{path}` operations (hidden, or documented as custom-attribute and linking only).
- Platform MCP availability and scopes (preview).
- Webhooks spec (concept only).

---

## Rebaselined Plan: Oct 5 to Oct 30

### Week 6 — Oct 5–9: Rebaseline, scope lock, reviews start

* Agree the rebaselined roadmap and Public Release Scope with Plytix. :arrows_clockwise:
* Confirm V1/V2 readiness for the Oct 12 start: content generated, redirect map owner named, no blockers. :arrows_clockwise:
* Spec handling: build a filter step that uses `Plytix API v3 - endpoint visibility.xlsx` to strip internal operations and unused schemas from the latest spec (Oct 2), then regenerate the V3 reference and remove stale folders (channels, connections, ecatalogs, importprofiles, pdfcatalogs, pimproductlists, productfamilymodels, probes, metrics). :todo_added:
* Send Plytix the open spec items (see Dependencies). :todo_added:
* Update pages affected by Plytix answers (Rate Limits, Pagination, Safe Removal, Auth, Errors). :todo_added:
* Review tracker updated; **Core Concepts review starts**. :todo_added:
* Visual/brand review with Plytix Design (essential for launch vs. later). :todo_added:
* Decide hosting and domain; confirm analytics instance. :warning:
* Define the style guide. :todo_added:

### Week 7 — Oct 12–16: V1/V2 migration, main content review, V3 reference complete

* V1/V2: review the generated content, apply the differentiation pattern, finalize redirects and version switcher. :todo_added:
* V3: **spec ready for public docs by Oct 14** (final descriptions, answers to open items, internal operations removed). Regenerate the reference and add examples and LLM-facing descriptions. :todo_added:
* Guides review (batch 1: Get Started + Core Concepts feedback applied; batch 2: Integration Guides) with Plytix feedback within about 3 business days per batch. :todo_added:
* Rework Safe Removal and Marketplace Feed guides; review Migration guide against the new v3 write endpoints. :todo_added:
* Fix visual/brand items classified as launch-essential. :todo_added:
* SDK/CLI stub pages. :todo_added:

### Week 8 — Oct 19–23: Release Candidate, technical QA

* **Oct 21: Release Candidate** on the production-like environment (final hosting).
* Technical accuracy review with Plytix Product/Eng against the sandbox. :todo_added:
* Navigation, cross-linking and versioning QA across V1/V2/V3. :todo_added:
* Search, MCP and llms.txt QA; agent testing: does the docs site answer the main use cases without hallucinating endpoints? :todo_added:
* Analytics live; link checks and code-example checks (run examples against sandbox). :todo_added:
* **Oct 23: content freeze.** After this date, fixes only. :todo_added:

### Week 9 — Oct 26–30: Fixes, approvals, public beta launch

* Fix feedback from RC review and QA. :todo_added:
* Final approvals and launch checklist (DNS, redirects, analytics, search index, MCP endpoint). :todo_added:
* **Public beta launch (target Oct 28–30).**
* Retro and phase-2 backlog (see Later phase).

---

## Dependencies and Risks to the Last-Week-of-October Target

| # | Dependency / risk | Needed by | Owner | Impact if late |
|---|---|---|---|---|
| 1 | **Hosting decision**: AWS option, domain, DNS, deploy access. MCP and search need a live server. | Oct 9 | Plytix Infra | Blocks the RC environment, MCP, search and launch. |
| 2 | **Internal endpoints still in the spec.** Plytix to filter them at source, or confirm our build-step filtering is acceptable. | Oct 9 | Plytix Eng | Risk of publishing endpoints Plytix wants hidden. |
| 3 | **Classify the 16 operations missing from the visibility sheet** (6 likely public link operations; 10 likely internal: channels, ecatalogs, product_data_sheets, static_lists). | Oct 9 | Plytix Product | Reference scope unclear. |
| 4 | **Generic `{path}` POST/DELETE operations**: confirm whether they stay public (they caused the PROD-7 data loss). | Oct 12 | Plytix Eng | Docs could show unsafe operations. |
| 5 | **Remaining spec items:** PROD-10 (attribute keys and defaults on create), REL-1 (related-products subpath fix), spec title/description/version ("FastAPI 0.1.0"), `refresh_token` and `wayfair` leftovers. | Oct 14 | Plytix Eng | V3 spec not ready for the Oct 14 date. |
| 6 | **Official rate-limit figures** for both windows. | Oct 12 | Plytix Product | Rate Limits page ships with an incomplete table. |
| 7 | **Platform MCP timing and scopes**; Webhooks spec or concept-only confirmation. | Oct 12 | Plytix Product | MCP and Webhooks ship as preview/concept. |
| 8 | **Review turnaround**: feedback within about 3 business days per batch, with named reviewers. | Oct 9 onward | Plytix (David) | Compresses RC fixes. |
| 9 | **Design/brand review**, and a decision on what is launch-essential. | Oct 14 | Plytix Design | Late visual changes after content freeze. |
| 10 | **Redirect map and ownership for old V1/V2 URLs.** | Oct 16 | Plytix Web/Infra | Broken links at launch. |
| 11 | **Analytics instance** (Umami) and env vars. | Oct 16 | Plytix Infra | No launch metrics. |
| 12 | **Sandbox access stays stable** for example testing, and the data-isolation fix (SEC-1) is retested before launch. | Oct 19 | Plytix Eng | Examples cannot be verified. |
| 13 | **Auth will change in v3 later.** Launch docs need a "current auth" notice and a follow-up plan. | Oct 21 | WriteChoice + Plytix | Docs become stale quickly. |

---

## Out of Scope for the First Public Beta (Later Phase)

* Full SDK documentation: SDKs publish around November per the product Gantt. Ship stub/"coming soon" pages.
* Full CLI documentation: same reasoning.
* Deep V1/V2 rewrite: the requirements call for "minimal content improvements."
* Full Bulk API documentation: restricted to enterprise accounts; awareness callout only.
* Documentation of internal endpoints (Channels, Connections, Ecatalogs, PDF Catalogs, Import Profiles, Product Lists) unless Plytix reclassifies them.
* v3 authentication docs once the new auth is released.
* Community/ecosystem features.
* Workspaces: TBD per product roadmap.
