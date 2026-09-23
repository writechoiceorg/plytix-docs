Plytix Docs Roadmap

---

## Project Context (Decided)

- **Platform:** Fumadocs (open source) — deployed to a separate domain from the Help Center.
- **Audience:** Three primary personas: Technical Internal User/Automation Builder, Integration Engineer (ERP/eCom stack), Partner Developer. A fourth emerging persona: AI agents (Cursor, Copilot, Claude) — OpenAPI format and LLM-readable descriptions are a hard requirement.
- **Scope:** Developer portal only (API v3 + MCP + migration from v1/v2). The Help Center (end-user docs) stays on its own platform, managed by a separate Plytix team.
- **Source of truth priority:** Verified API findings > `materials/` raw sources > Help Center scrape.
- **Key facts to carry into every deliverable:**
  - Auth uses a non-standard two-step JWT exchange (not OAuth 2.0) — 81 support tickets in two years, the single highest-friction onboarding issue.
  - Rate limits are 50 req/10 s, 5,000 req/hour — currently undocumented (48 tickets, several marked critical).
  - Token lifetime is 15 minutes — major pain point for long-running integrations.
  - Channels (Shopify, BigCommerce, feed exports) are NOT in the API — must be stated explicitly to stop developers wasting time searching for endpoints that don't exist. Point them to the Destinations endpoint instead.
  - The v3 OR logic (`_or[index]`) directly solves the most common filter workaround pattern — this is one of the highest-value v3 improvements to document.
  - Bulk API is restricted to large/enterprise clients — document it with a clear "contact your account manager" gate, do not bury it.
  - v1/v2 are still in active use for all write operations (ERP write-back, stock updates, price changes) — the migration guide must be nuanced, not a simple "move everything to v3."

---

## Month 1 — Discovery, Decisions, Foundation

### Week 1 — Kickoff, Discovery & Early Decisions

* Hold the 2–3 hr discovery call(s) with Product/Eng participation. :white_check_mark:
* Collect async: OpenAPI spec or Postman collection, API keys + sandbox access, doc repo access, brand guidelines/assets. :white_check_mark:
* Start testing the API. :white_check_mark:
* Define documentation platform. :white_check_mark: (Fumadocs)
* Define style guide. :todo_added:

### Week 2 — Decisions, Information Architecture and Core Concepts Kickoff

* Content inventory/gap analysis of current Help Center + Swagger/Postman docs. :todo_added:
* Define the Information Architecture and share it to get feedback. :white_check_mark:
* Start drafting Core Concepts explanations (data model, pagination/rate limits, query language). :arrows_clockwise:
* Confirm v1/v2 differentiation + redirect approach for new APIs so we can already define a map. :white_check_mark:
* Based on the API tests, improve (or suggest improvements) the OpenAPI spec (descriptions, types, request/response examples). :todo_added:
* Draft the entity coverage reference: a clear table of every Plytix entity and whether it is readable, writable, or absent from the v3 API — explicitly noting Channels as UI-only. :todo_added:

### Week 3 — Visual Direction, Core Concepts and Reference Pipeline

* Propose visual direction and homepage concept via Figma. Depending on how advanced, also share key diagrams (data model, Channels flow). :todo_added:
* Finish API testing. :arrows_clockwise:
* Finish Core Concepts pages:
  * The Plytix Data Model (Products, Attributes, Categories, Assets, Relationships, Destinations).
  * Authentication — explain the two-step JWT exchange clearly; call out why it differs from OAuth 2.0 and what integration tooling needs to handle differently.
  * Rate Limits — document the actual limits (50 req/10 s, 5,000 req/hour) and the 15-minute token lifetime; include a retry/backoff pattern.
  * Filtering and Query Syntax — lead with `in` and `eq` (74% of real usage), then OR logic (`_or[index]`) as a prominent callout, then completeness/count/freshness filters.
* Set up automated rendering of the v3 API reference directly from the OpenAPI spec in Fumadocs. :todo_added:
* Keep working on the OpenAPI improvements. :todo_added:

### Week 4 — Foundation Content + Design Sign-off

* Design/visual direction review & sign-off.
* Getting Started tutorial drafted and tested against sandbox (<5 min to first call):
  * Step 1: Generate credentials (Admin → API).
  * Step 2: Exchange credentials for a Bearer token (`POST /auth/api/get-token`).
  * Step 3: Make the first authenticated request (GET products, page size 10).
  * Step 4: Navigate the response (data array, pagination.next_page).
* Finish the OpenAPI spec improvements.
* v3 reference supporting pages complete: Authentication, Errors & Status Codes (with actionable descriptions — not just HTTP codes), Rate Limits, Filtering & Query Syntax, Pagination, Entity Coverage Reference.
* Bulk API handling: add a visible callout on the relevant reference pages that a higher-throughput Bulk API exists for enterprise accounts, with a "contact your account manager" path. Do not document the full Bulk API — it is out of scope — but do not let developers hit rate limits without knowing it exists.

Month 1 milestone: IA + platform approved, visual direction approved, Getting Started + core v3 reference sections live in staging. Auth, rate limits, and entity coverage documented.

---

## Month 2 — Production, MCP, Guides, Legacy

### Week 5 — v3 Endpoint Coverage, Channels & How-to Kickoff

* Continue v3 public endpoint reference (request/response examples, semantic operationIds, LLM-facing descriptions). Priority order based on persona needs:
  1. Products (read + write — incremental sync, full catalog export, quality audit)
  2. Assets (retrieval embedded in product read — highlight as a v3 improvement over v1/v2)
  3. Product Families & Attributes
  4. Categories (product + asset)
  5. Relationships
  6. Destinations (new — assign/remove products from channels, brand portals, product data sheets; explicitly note this replaces the need developers felt to look for channel endpoints)
  7. Remaining entities (Asset Lists, Import Profiles, PDF Catalogs, etc.)
* Start drafting Integration Guides. Lead with the two highest-value guides based on persona research:
  * Syncing Your ERP with Plytix (most common integration pattern).
  * Exporting Your Full Catalog (full paginated snapshot — highlight that the v1/v2 50-attribute limit is gone in v3).
* Draft: Getting Notified — Webhooks & Automations (Concept, since webhooks are in active development).

### Week 6 — MCP Section & How-to Guides

* Build the MCP section (overview, setup/auth, available tools, supported clients, examples) — contingent on MCP being finished per the product Gantt.
* Finish the remaining Integration Guides:
  * Auditing Product Data Quality with Filters (highlight OR logic + completeness filters — these were underused in v1/v2 purely due to discoverability).
  * Build a marketplace-specific product feed (channel-specific filtering pattern; reiterate here that channel configuration is UI-only, not API).
  * Safely Removing Categories, Assets, or Relationships from a Product.
  * Reconstructing Parent/Variant Hierarchies.
  * Bulk Operations for Large Catalogs — scope to what is publicly available; gate the enterprise Bulk API with the account manager callout from Week 4.
* Finish: Getting Notified — Webhooks & Automations once webhooks spec is confirmed.
* Cross-link into reference + core concepts rather than re-explaining inline.

### Week 7 — v1/v2 Restructure & Agent Readability

* Handle the migration of existing v1/v2 content into the new platform. Key nuances:
  * v1/v2 are still required for all write operations (ERP write-back, price/stock updates). The migration guide must reflect this — v3 is read-oriented today.
  * Apply the legacy differentiation pattern + a "why/when to migrate to v3" page.
  * Migration Reference: side-by-side table of endpoints, auth differences (token endpoint changed), request/response shape changes, breaking differences.
* Stub placeholders for SDKs & CLI ("coming soon," pointing at their real Oct/Nov product milestones).
* Agent-readability check: llms.txt / AGENTS.md; verify OpenAPI descriptions are parseable by Cursor, Claude, etc.
* Start documentation testing by agents (does the docs site answer the 7 main use cases without hallucinating endpoints?).

### Week 8 — QA, Agent Testing & Launch Prep

* Technical accuracy review with Plytix Product/Eng against the sandbox.
* Cross-linking + nav QA.
* Stakeholder approval.
* Finish documentation testing by agents.

### Buffer

* Address review feedback, finalize launch checklist, handoff/soft-launch.
* Retro + phase-3 backlog.

Month 2 / final milestone: full v3 public reference, MCP section (if ready), flagship how-to guides, restructured legacy v1/v2 section with accurate write-operations guidance, QA complete, portal ready to launch or hand off.

---

## Out of Scope for This 2-Month Window (Phase 3 Candidates)

* Full SDK documentation — SDKs are Sep–Oct build, Nov publish per the product Gantt; documenting them now means writing against an unpublished, moving target. Ship stub/"coming soon" pages instead, revisit once SDKs publish.
* Full CLI documentation — same reasoning; CLI is an Oct build item.
* Deep v1/v2 rewrite — the requirements call for "minimal content improvements," not a rewrite; a full modernization pass is a later phase.
* Full Bulk API documentation — restricted to enterprise accounts; not publicly documentable at this time beyond the awareness callout.
* Community/ecosystem features (the inRiver-inspired "community" feel) — nice-to-have, not core to the developer-portal MVP.
* Workspaces — TBD per product roadmap; hold until confirmed in scope.
