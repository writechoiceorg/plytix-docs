# Documentation Outline: Plytix API & Developer Portal

Plytix is a Product Information Management (PIM) platform — marketed by Plytix itself as moving toward a "content-led-growth platform" — that lets clients centralize product data and syndicate it to storefronts, marketplaces, and other systems ("channels"). This documentation is for the *technical* audience distinct from Plytix's day-to-day PIM users: internal developers and IT teams connecting an ERP or catalog to Plytix, partner/agency developers building integrations or channel connectors on clients' behalf, and (increasingly) non-technical "maker" profiles working through AI assistants via the Plytix MCP.

---

## Tab: Guides

Learning- and task-oriented content: getting a new developer from zero to a working integration, explaining the concepts the API reference assumes you already know, and walking through the real-world integration patterns Plytix's own customers and partners actually use. Renames the current placeholder "Documentation" tab in `docs.json`.

### Getting Started

The "Day 0" experience — takes a developer from no context to a successful first API call, addressing the "Why vs. How gap" and missing-context friction repeatedly flagged by Plytix stakeholders (`API-analysis.pdf`; David Alarcón, kickoff-1: *"the profile of the user that goes into the API docs is not the same [as] our final user"*).

* **Welcome to the Plytix Developer Documentation** [`Concept`]: Orients a new reader to what Plytix is, who this portal is for (internal devs/IT, partner/agency developers, AI-assisted "maker" profiles), and how this portal relates to the separate end-user Help Center — so readers don't go looking for API concepts in the wrong place.
* **Quickstart: Your First API Call** [`Tutorial`]: A step-by-step walkthrough from generating an API key in the Plytix dashboard (linking out to the Help Center's existing UI steps rather than duplicating them, per the WC internal sync's "link to Help Center for dashboard steps" decision) through authenticating and making a first `GET /api/v3/products` call.
* **The Plytix Data Model** [`Concept`]: Explains how Products, system vs. custom Attributes, Attribute Groups, Categories, Families/Variants, Assets, and Relationships fit together — grounded in Ksenija Rybe's product walkthrough (kickoff-1) and `plytix-glossary.md`, and explicitly requested as a "visual guide" in `API-analysis.pdf`.
* **Authentication & API Keys** [`Concept`]: Explains the bearer-token exchange (API key + password → short-lived token), the 15-minute token expiry called out as one of the most common developer complaints (Ksenija Rybe, kickoff-1), and role-based API key access.

### Core Concepts

Educational content explaining "the Plytix way" of using the v3 API, so a developer isn't left guessing at behavior the reference alone doesn't explain (`API-analysis.pdf`'s "Core Concepts" bucket).

* **Key Entities: What's in the API (and What Isn't)** [`Concept`]: Maps UI-facing concepts (Brand Portals, Product Data Sheets, in-tool Automations, in-tool Formula transformations) to their actual API availability — several, like Automations and most Formula transformations, are confirmed UI-only today (Ksenija Rybe, kickoff-1).
* **Filtering, Sorting & Pagination** [`Concept`]: Explains the v3 filter query language conceptually — comparison/grouping operators, `_and`/`_or` grouping, related-entity transversal filtering, field selection (`_fields`), expansion (`_expand`), and pagination (`_page`, `_page_size`, `_sort_by`) — as a companion to the full syntax reference in the API Reference tab. Flagged by Plytix's own analysis as "crucial for v3."
* **Response Conventions** [`Concept`]: Explains why `POST`/`PUT`/`PATCH` requests do **not** return the modified entity, and what the `201 Created` / `202 Accepted` / `204 No Content` status codes each mean, per `API V3.md`'s "Response Conventions for Entity Modification Endpoints."
* **Migrating from API v1/v2 to v3** [`How-to Guide`]: A practical migration guide built on `API V3.md`'s v1→v3 URL-standardization table (search via `POST` → `GET`, `PUT`/`PATCH` semantics, bulk endpoint shapes). Confirmed historical v1→v2 breaking changes (`id` → `_id`, `relationships.related_products` → `links_to`, timestamp format changes, per `API_Feedback_-_From_Product_board.pdf`) are noted for context but must be re-verified against v3 specifically before being asserted as v3 behavior.

### Integration Guides

Solution-oriented "how-to" content for the real integration patterns Plytix stakeholders describe their customers actually building (`API-analysis.pdf`'s "Guides & Tutorials" bucket; both kickoff calls).

* **Syncing Your ERP with Plytix** [`How-to Guide`]: The single most common real-world use case per both kickoffs — creating products in Plytix from ERP events, keeping operational data in the ERP and enrichment data (assets, long descriptions) in Plytix. Links to the Help Center's `erp-import.md` for the CSV/SFTP feed-based alternative, and covers the API-driven pattern David Alarcón and Karina Novotny describe as most common.
* **Building a Channel Connector (External Providers)** [`How-to Guide`]: Documents the bidirectional External Provider integration contract — Plytix calls the provider's `POST /v1/tasks`, `GET /v1/tasks/{task_id}`, `POST /v1/tasks/{task_id}/cancel`, and `GET /v1/tasks/{task_id}/process-logs`; the provider reports back to Plytix via callback endpoints; catalog data moves as an `ndjson` export; each direction authenticates with its own bearer token — sourced from the scraped External Provider/PIM specification (`materials/api-references/index.html`). **Flagged: the Project Requirements doc explicitly conditions including this on confirming it's part of the public v3 scope — not yet confirmed.**
* **Bulk Operations for Large Catalogs** [`How-to Guide`]: Documents the currently-implemented bulk mechanism — the v1, job-based `POST /api/v1/bulk/products` (per-product `id`/`sku`, up to 1000 products per call, async job with `job_id`, per-SKU error reporting) from `Bulks Documentation (API) (Limited to Large Clients).pdf`. **Flagged as enterprise-only/restricted content** (per David Alarcón, kick_off_2: not offered on lower-tier plans) — this page should carry an explicit access-request notice rather than presenting itself as fully public, and must be clearly distinguished from the *unimplemented* v3 bulk/`-jobs` URL scheme `API V3.md` describes in prose (see Sources & Corrections).
* **Getting Notified: Webhooks & Async Job Callbacks** [`Concept`]: Clarifies that on the v3 API, "webhook" currently means an optional callback URL on a bulk/async job payload (`API V3.md`) — a different thing from the in-app, UI-configured "channel processed" webhook documented in the Help Center (`getting-started-plytix-webhooks.md`), which fires on channel processing and is not part of the developer-facing v3 API surface.

### Plytix MCP

A dedicated section per the Project Requirements doc's explicit ask, framed by kickoff stakeholders as the way a less-technical "maker" profile creates/curates Plytix data through an AI assistant without building a custom integration (David Alarcón, kick_off_2). **Flagged: MCP is still being finished** — the internal roadmap shows "Review & Finish MCP" landing Aug–Sept 2026, so content here should be verified against the shipped implementation before publishing.

* **What Is the Plytix MCP?** [`Concept`]: Overview and capabilities — what an MCP-connected AI assistant (Claude, Cursor, Windsurf, VS Code, Gemini, per `API-analysis.pdf`) can do against a Plytix account.
* **Setting Up the Plytix MCP** [`How-to Guide`]: Setup and authentication steps for connecting an MCP client to a Plytix account.
* **Available Tools & Supported Clients** [`Reference`]: The MCP's tool surface (e.g., product/category creation/curation tools) and which AI clients are officially supported.
* **MCP Examples & Common Use Cases** [`How-to Guide`]: Worked examples such as curating and importing a product catalog through an AI assistant, per the Project Requirements' "examples and common use cases" scope item.

### SDKs & CLI

* **Official SDKs & CLI (Coming Soon)** [`Concept`]: A placeholder page stating that type-safe API v3 SDKs and a CLI are on the roadmap (internal roadmap: Sept–Nov 2026) but not yet released. Deliberately left without installation/usage instructions until real SDKs exist — per the Project Requirements' "added as they become available" scope note.

---

## Tab: API Reference

Precise, exhaustive technical reference: authentication, conventions, errors, limits, query syntax, and one auto-generated page per API resource. Already partially wired in `docs.json` (`api-reference/openapi.json`, generated from the root `openapi_pimv3.json`).

### Overview & Conventions

* **API Reference Overview** [`Concept`]: Orients the reader to the auto-generated reference, the base URL, and how this tab relates to the Guides tab's conceptual explanations.
* **Authentication** [`Reference`]: Exact bearer-token request/response shapes, token lifetime (15 minutes), and required headers.
* **Errors & Status Codes** [`Reference`]: Documents the confirmed `{"error": {"name": ..., "description": ...}}` shape for `4xx`/`5xx` responses (`API V3.md`). **Flagged: no canonical list of specific error codes/messages was found anywhere in the gathered materials** — David Alarcón (kick_off_2) references "a list of all the errors" existing somewhere, but it wasn't located; this page needs a confirmed source or live verification (via the `endpoint-tester` skill) before publishing specific codes.
* **Rate Limits** [`Reference`]: **Flagged: no published rate-limit numbers were found in materials.** Their existence and business impact are confirmed (David Alarcón, kick_off_2: large clients have requested temporary rate-limit extensions), but exact values need to be sourced from Plytix directly.
* **Filtering & Query Syntax Reference** [`Reference`]: The full operator, grouping (`_and`/`_or`/`_not`/`_!exists`), related-entity transversal filtering, field-selection, and expansion syntax tables from `API V3.md`, as the exhaustive companion to the Core Concepts explanation.

### Resources

One auto-generated reference page per resource tag in `openapi_pimv3.json` (51 paths across 15 resources) — not hand-outlined individually, since Mintlify generates these directly from the spec:

* **Products, Assets, Product Categories, Asset Categories, Asset Lists, Relationships, Product Families, Product Attributes, Product Attribute Groups, PIM Product Lists, Channels, Connections, Ecatalogs, Import Profiles, PDF Catalogs, Product Family Models** [`Reference`]: Full CRUD/search coverage per resource as defined in the OpenAPI spec.

### Legacy API (v1/v2)

Kept accessible per the Project Requirements doc's explicit requirement that "existing API documentation should remain accessible for current integrations," with clear differentiation from v3.

* **API v1/v2 Reference** [`Reference`]: Sourced from `Plytix_pimv1.postman_collection (5).json` (full v1 coverage; v2 exists only as a partial "🆕 products V2 BETA" folder covering the Products resource). **Flagged: no OpenAPI spec exists for v1/v2**, only the Postman collection — this page's authoring/tooling approach needs a separate decision from the v3 auto-generated reference.

---

## User Navigation Flow

Designed for a technical developer (internal IT/dev, or a partner/agency developer) integrating an ERP or catalog system with Plytix for the first time. "Winning" means successfully creating or updating a real product via the API using their own data.

1. **Homepage** → Sees Plytix positioned as a PIM platform's developer documentation, with a clear CTA into the Quickstart and card-based routing to Guides, API Reference, and Plytix MCP.
2. **Quickstart: Your First API Call** → Generates an API key in the dashboard, authenticates, and gets back a bearer token.
3. **The Plytix Data Model** → Understands how Products, Attributes, Categories, and Assets relate before writing any integration code.
4. **Filtering, Sorting & Pagination** (Core Concepts) → Learns the query syntax needed to search and page through product data.
5. **Products** (API Reference, auto-generated) → Looks up the exact parameters for `GET /api/v3/products` and `PATCH /api/v3/products/{identifier}`.
6. **Syncing Your ERP with Plytix** (Integration Guides) → Applies the general pattern to their own ERP-to-Plytix use case, using SKU as the matching key.
7. **First win** → Successfully sends a `PATCH /api/v3/products/{identifier}` request with their own ERP-sourced data and receives a `201`/`204` confirming the update — their first real product change made through the API.

---

## Sources & Corrections

**Sources used:**
- **Existing documentation:** `docs/docs.json` + `docs/README.md` (current Mintlify scaffold — the "API Reference" tab is already wired to `docs/api-reference/openapi.json`; the "Documentation" tab has one placeholder page); `materials/help-center/` (162-file scrape of Plytix's live end-user Help Center — used for terminology, data-model, and UI-flow context; per this repo's trust order, ranked below raw materials and below verified findings); `materials/api-references/index.html` (scraped Scalar-rendered "External Provider — API Reference" doc — the Channels-by-external-providers integration spec, v0.1.0).
- **Raw source materials:** `openapi_pimv3.json` (ground truth — 51 paths / 15 resources); `materials/api-references/API V3.md` (prose v3 API design doc — filters, pagination, response conventions, URL standardization, Process Manager API); `materials/api-references/Plytix_pimv1.postman_collection (5).json` (full v1 + partial v2-BETA endpoints); `materials/project-references/Writechoice - Project Requirements.pdf`; `materials/project-references/API-analysis.pdf` (Plytix's own proposed documentation architecture — heavily informed this outline's Guides/Core Concepts/Tools/API Reference structure, and its account-usage data justifies prioritizing paid-account/partner use cases); `materials/project-references/API_Feedback_-_From_Product_board.pdf` (real partner/customer feedback — v1→v2 breaking changes, Bulk API error-handling gaps, versioning confusion); `materials/project-references/Bulks Documentation (API) (Limited to Large Clients).pdf` (2021 draft doc for the restricted, currently-live v1 bulk API); `materials/transcripts/kickoff-1.md`, `kick_off_2.md`, `wc-pos-kickoff-call.md`, `wc-pos-kickoff-call-2.md` (stakeholder interviews and internal WriteChoice syncs — user personas, real use cases, friction points, tooling decisions).
- **Verified/live findings:** None yet. No `config/api-testing.config.md` or `endpoint-tester` output exists in this repo. Every "confirmed live" style claim this outline flags as unverified (exact rate-limit values, the canonical error-code list, whether the v3 bulk/Process Manager endpoints described in prose are actually implemented) should be checked by running the `endpoint-tester` skill before content is drafted against it.
- **Brand/positioning/SEO guidance:** `materials/project-references/Plytix Content Guidelines 2026 (1).pdf` and `Plytix-Branding-Guidelines (2).pdf` exist but could not be parsed in this pass (the PDF-to-image rendering dependency, `pdftoppm`/poppler-utils, is not installed in this environment) — they were not consulted for this outline. Terminology instead follows `materials/help-center/plytix-glossary.md` and the transcripts. Revisit both files once that tooling gap is fixed, in case they specify preferred terminology that should reshape page/section *wording* (never scope, per this repo's trust order).

**Corrections carried into this outline:**
- The Help Center scrape's webhooks articles (`getting-started-plytix-webhooks.md`) describe an in-app, UI-configured "channel processed" webhook. This does **not** correspond to a v3 API webhooks feature — the higher-trust `API V3.md` only mentions "webhook" as an optional callback-URL field on bulk/async job payloads. Affects: "Getting Notified: Webhooks & Async Job Callbacks" (Guides), written to distinguish the two rather than conflate them.
- `API V3.md` (raw material) describes a v3 "Process Manager API" and a v3 bulk/`-jobs` URL scheme (`api/v3/-bulk/...`, `api/v3/-jobs/...`), but `openapi_pimv3.json` (ground truth) has zero matching paths among its 51. These appear to be planned but not yet implemented. Affects: "Bulk Operations for Large Catalogs" (Guides) and the API Reference "Resources" section — scoped to document only the confirmed-live v1 bulk API (from the restricted Bulks Documentation PDF) and explicitly flag the v3 scheme as forthcoming rather than live.
- `API_Feedback_-_From_Product_board.pdf`'s breaking-change list (`id`→`_id`, `related_products`→`links_to`, timestamp format) is reported by a partner specifically about the **v1→v2** upgrade, not v1→v3. Affects: "Migrating from API v1/v2 to v3" (Guides) — flagged to re-verify each mapping against v3 specifically (using `API V3.md`'s URL-standardization table and `openapi_pimv3.json`) rather than assuming the v2 changes carry over unchanged.
- The Channels "External Provider" integration (`materials/api-references/index.html`) is a real specification document, but the Project Requirements PDF explicitly conditions its inclusion on confirming it's part of the public v3 scope — not yet confirmed as of this outline. Affects: "Building a Channel Connector (External Providers)" (Guides) — flagged as pending confirmation rather than committed scope.

No multi-product split was needed: all gathered materials describe a single product (the Plytix PIM / API), not multiple distinct products or brands.
