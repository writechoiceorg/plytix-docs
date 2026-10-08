# Review session: 2026-10-08

**Scope:** every page under `fumadocs/content/docs/guides/`, excluding `migrating-to-v3/`, `legacy/`, and `reference/` (18 pages).
**Mode:** Report, then verify, then fix. Nine pages were edited; see "Fixes applied" below.

> ## Fixes applied 2026-10-08
>
> After the verification run, the **accuracy** findings were fixed across nine pages. Style and convention findings (X1-X8) were **not** touched, because the request was to fix what had gone out of date. They remain open and are still the larger body of work.
>
> | Page | What changed | Findings closed |
> |---|---|---|
> | `safely-removing-...` | Rewritten. Hazard callout removed, rebuilt around the link/unlink endpoints, relationships added as a working procedure, assets gap stated honestly, troubleshooting converted to accordions | REM-B1, REM-B2, REM-M1, REM-M2, REM-M3, NEW-B1 |
> | `data-model.mdx` | Families and relationships corrected to writable; the ID-vs-expansion section replaced with how reads actually work | DM-B1, DM-B2, DM-M1 |
> | `reconstructing-...` | Family creation added, variant-create corrected, inheritance gate explained, the two untestable claims surfaced in a visible callout | HIER-B2, HIER-M1, HIER-M2, HIER-M4 |
> | `auditing-...` | `icontains` replaced with `contains:ignorecase`; new `[length]` step for empty-vs-missing; operator list added; completeness claim scoped to the account | AUD-B1, AUD-M5, AUD-m2 |
> | `syncing-your-erp-...` | Create step corrected for the rejected `*_ids` fields; troubleshooting no longer contradicts step 5 | NEW-B1, ERP-m2, ERP-N1 |
> | `building-...feeds` | `PATCH` → `204` stated; the `502` on a partial schedule surfaced as a warning | FEED-M1, FEED-M6 |
> | `getting-notified-...` | Channel `webhook` field documented as accepted-then-discarded | NOTE-M1 |
> | `bulk-operations-...` | "No bulk endpoints" moved into the intro; rate limits made self-serve from the JWT; `429` caveat added; new section on the approved-but-unshipped v3 bulk API | BULK-M2, BULK-M4, BULK-m1, BULK-m2, BULK-m3 |
> | `exporting-...` | `_expand` flag closed with the real error; one em dash removed | EXP-M7, EXP-m1 |
>
> **Upstream sources corrected too**, so the same errors don't get rewritten: `glossary.md`'s Product Family and Relationship entries, and `information-architecture.md`'s 2026-10-01 filtering note (which asserted `icontains`).
>
> **Verification:** all nine pages compile under `@mdx-js/mdx`; every internal link resolves; all callout types, Lucide imports, accordion `value` ids, and code-fence languages check out. `npx next build` fails on `content/docs/reference/v3/authentication.mdx` with a Node subprocess crash (`0xc0000409`) — **confirmed pre-existing** by stashing these changes and reproducing the identical failure on a clean tree. It is outside this review's scope and unrelated to these edits, but it does mean the site currently doesn't build and someone should look at it.
>
> **Still open and needing Plytix, not an edit:** FEED-B1 (the Channels IA conflict) and the roadmap flags on `getting-notified` and all six `platform-mcp/` pages.

> ## ⚠️ Revised 2026-10-08, after live testing
>
> The first pass of this report was written from `config/api-testing.config.md` (last updated 2026-10-01). An `endpoint-tester` session the same day re-ran every blocker claim against "David's Dev Account" and found the API had moved again. **Three findings below are retracted, two are confirmed, and four new Blockers were found that the first pass could not have known about.** Full evidence is in `config/api-testing.config.md` quirks #93-#103 and `bruno-collection/02-Products-v3/README.md`.
>
> | Finding | First pass said | Testing found | Now |
> |---|---|---|---|
> | REM-B1 | `DELETE` on a product subpath destroys the product | Fixed, and the 3-segment form is now a **working scoped unlink** (`204`, product intact) | **Confirmed Blocker**, stronger than stated |
> | REM-B2 | Relationships aren't creatable or removable via API | `POST /relationships` → `201`; link → `201`; scoped unlink → `204`, both products intact | **Confirmed Blocker** |
> | REM-B3 | `GET /products/{id}/categories` always returns `[]` | Returns real data again (2 categories on `BAG-10157`) | **RETRACTED** — quirk #80 resolved |
> | DM-B1 / HIER-B2 | Families are dashboard-only | `POST /product-families` → `201`, attribute link → `201`, rename → `204` | **Confirmed Blockers** |
> | HIER-B1 | `parent_id` + `product_family_id` on create → `422` | Returns `201`. The real rule is that a *mismatched* family is rejected | **RETRACTED**, replaced by HIER-M4 |
> | X9 | `pim.plytix.com/api/v3` unreachable (`503`) | Returns `401` to a dev token, so the host routes v3 | **Downgraded** to "confirm with a prod credential" |
> | AUD-M5 | `[icontains]` untested against an empty string | `icontains` is **rejected outright** — the operator is `contains:ignorecase` | **Escalated to Blocker AUD-B1** |
> | — | — | All five `*_ids` fields now `422` on `POST`/`PATCH /products` | **New Blocker NEW-B1**, hits 3 guides |
> | — | — | Channel `webhook` block silently discarded; `rebuild_periodically` alone `502`s | **New findings**, NOTE-M1 / FEED-M6 |
> | — | — | No `429` reachable; 80 parallel requests all `200`, no rate-limit headers | **New finding BULK-m3** |
>
> **Revised totals: 21 Blocker, 58 Major, 39 Minor, 2 Nit.** The per-page sections below carry the revisions inline, marked **[REVISED]**, **[RETRACTED]** or **[NEW]**.
>
> Six flags were targeted for closure. **Four closed** (EXP-M7 was already closable, REM-M2 both halves, FEED-M1, NOTE-M1). **Two could not close**: HIER-M1/M2 are untestable because automatic inheritance is feature-gated off on the test account, and BULK-m2 could not be closed because no `429` is reachable.
**Sources checked (highest trust first):**

1. `config/api-testing.config.md` — verified live findings, quirks #1-92, status-gating rules, open questions (last updated 2026-10-01)
2. `openapi_pimv3.json` — 63 paths, schema property lists read directly
3. `materials/api-references/API V3 - status map (08_10_2026).md` and `_API V3 - 08_10_2026.pdf` — the newest material in the repo
4. `materials/help-center/` — scraped end-user docs
5. Repo code: `fumadocs/app/api/mcp/route.ts`, `fumadocs/lib/mcp-search.ts`, `fumadocs/app/llms.mdx/docs/[[...slug]]/route.ts`
6. Writer references: `checklist.md`, `glossary.md`, `style-guide.md`, `projectConvention.md`, `page-types.md`, `information-architecture.md`

---

## Summary table

| Page | File path | Page type | Verdict | Blocker | Major | Minor | Nit |
|---|---|---|---|---|---|---|---|
| Overview | `guides/overview.mdx` | Concept | Approve with changes | 0 | 1 | 3 | 1 |
| Quickstart | `guides/quickstart.mdx` | Tutorial | Needs rewrite | 2 | 5 | 7 | 0 |
| The Plytix Data Model | `guides/data-model.mdx` | Concept | Needs rewrite | 2 | 2 | 3 | 0 |
| Sync your ERP | `guides/syncing-your-erp-with-plytix.mdx` | How-to | **Needs rewrite** (was Approve with changes) | **1** | 1 | 3 | 1 |
| Export your full catalog | `guides/exporting-your-full-catalog.mdx` | How-to | Approve with changes | 0 | 7 | 4 | 0 |
| Audit product data quality with filters | `guides/auditing-product-data-quality-with-filters.mdx` | How-to | **Needs rewrite** (was Approve with changes) | **1** | 6 | 2 | 0 |
| Build a marketplace-specific product feed | `guides/building-marketplace-specific-product-feeds.mdx` | How-to | Needs rewrite | 1 | 6 | 2 | 0 |
| Safely remove categories, assets, or relationships | `guides/safely-removing-categories-assets-or-relationships.mdx` | How-to | Needs rewrite | **3** (REM-B3 retracted, NEW-B1 added) | 3 | 1 | 0 |
| Reconstruct parent/variant hierarchies | `guides/reconstructing-parent-variant-hierarchies.mdx` | How-to | Needs rewrite | **1** (HIER-B1 retracted) | 4 | 2 | 0 |
| Bulk Operations for Large Catalogs | `guides/bulk-operations-for-large-catalogs.mdx` | How-to | Approve with changes | 0 | 4 | 3 | 0 |
| Getting notified: webhooks and Automations | `guides/getting-notified-webhooks-and-automations.mdx` | Concept | Approve with changes | 0 | 4 | 2 | 0 |
| Documentation MCP | `guides/documentation-mcp.mdx` | How-to | Approve with changes | 0 | 3 | 2 | 0 |
| Plytix Platform MCP | `guides/platform-mcp/index.mdx` | Concept | Needs rewrite | 1 | 2 | 1 | 0 |
| Authentication and OAuth setup | `guides/platform-mcp/authentication-and-oauth-setup.mdx` | How-to | Needs rewrite | 2 | 2 | 1 | 0 |
| Supported clients | `guides/platform-mcp/supported-clients.mdx` | Reference | Needs rewrite | 1 | 2 | 1 | 0 |
| Available tools | `guides/platform-mcp/available-tools.mdx` | Reference | Needs rewrite | 1 | 3 | 1 | 0 |
| Permissions and security considerations | `guides/platform-mcp/permissions-and-security.mdx` | Reference | Needs rewrite | 2 | 2 | 2 | 0 |
| Practical examples | `guides/platform-mcp/practical-examples.mdx` | How-to | Needs rewrite | 2 | 2 | 1 | 0 |

**Totals:** 19 Blocker, 57 Major, 39 Minor, 2 Nit. Every finding is **Open**.

---

## What this review found, in one page

Three things dominate.

**1. Six pages make factual claims the live API has since contradicted.** *(Updated after the 2026-10-08 testing session.)* Over the past month Plytix shipped product-family and relationship writes, fixed the destructive subpath `DELETE` and then turned that same path into a working scoped unlink, fixed the broken read subpaths, removed every `*_ids` array field from the product write DTOs, and flipped the case-insensitive filter operator back to `contains:ignorecase`. The guides predate all of it. The affected claims are in [data-model.mdx](fumadocs/content/docs/guides/data-model.mdx), [safely-removing-categories-assets-or-relationships.mdx](fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx), [reconstructing-parent-variant-hierarchies.mdx](fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx), [auditing-product-data-quality-with-filters.mdx](fumadocs/content/docs/guides/auditing-product-data-quality-with-filters.mdx), and [syncing-your-erp-with-plytix.mdx](fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx). [safely-removing](fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx#L10) is the sharpest case: it exists only to warn about a hazard Plytix fixed three weeks ago, its prescribed workaround now returns `422`, and the endpoint it warns against is now the correct answer.

**The practical lesson for this engagement:** this set of guides has gone stale twice in five weeks, and the API moved again between the review and the verification run on the same day. Any factual claim in these pages older than about two weeks should be re-tested before publishing, not trusted from the config.

**2. Only one of the twelve how-to pages follows the 2026-10-06 conventions.** [syncing-your-erp-with-plytix.mdx](fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx) was revised; the rest were not. Six still head their procedure `## Steps` (explicitly forbidden), six have no lead-in before Prerequisites, four use the banned `**Problem:** / **Solution:** / **Prevention:**` troubleshooting bullets, and eight reference other pages by their pre-rename title-case names in plain text instead of linking. These are mechanical and can be fixed in one pass.

**3. Thirty-three writer flags are invisible to readers.** `projectConvention.md` says a flag that has to stay on a published page uses `<Callout type="warn" title="FLAG">`. Every flag in these pages is an `{/* ... */}` MDX comment instead, which renders as nothing. The six `platform-mcp/` pages are the worst case: they describe an unreleased product in confident present tense, and a reader sees no caveat at all.

**On the newest material:** the Oct 8 status map and PDF do not contradict any page. They confirm two things the guides already say (no count parameters; `_page_size` max 1000) and add one thing no page knows: the full bulk API surface is now marked **Direct** (approved) in Plytix's own design doc while still being absent from `openapi_pimv3.json`. That affects [bulk-operations-for-large-catalogs.mdx](fumadocs/content/docs/guides/bulk-operations-for-large-catalogs.mdx) only. See finding BULK-M4.

---

## Overview

**File:** `fumadocs/content/docs/guides/overview.mdx`
**Page type:** Concept (per `information-architecture.md`)
**Verdict:** Approve with changes

### Summary

Short, accurate, and nothing on it conflicts with the spec or live findings. The one real question is whether it is a Concept page at all: it is 27 lines, two of which are prose and the rest navigation. Fix the card title drift and the bold-in-body, and decide the page type.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| OV-M1 | Major | Whole page | Listed as Concept in the IA map, but has no "What it is" or any concept content: two intro sentences, a 2-card nav block, and a "Getting help" line. It functions as a section landing page. | `page-types.md`, Concept page; "One URL, one page type" | Either relabel it Landing in `information-architecture.md`, or add the concept content a Concept page owes the reader (what the API is for, the v1/v3 split, what the audience personas are). Relabelling is the smaller change and matches what the page actually does. |
| OV-m1 | Minor | Frontmatter, line 3 | `description` is 103 characters (needs 120-155) and starts with "What the Plytix API is for" rather than an action verb. | `style-guide.md`, SEO and metadata | Rewrite to 120-155 characters starting with a verb, e.g. "Learn what the Plytix API covers, who it's for, and how this documentation differs from the Plytix Help Center." |
| OV-m2 | Minor | Lines 18, 21 | Bold used inside `Card` body text: `**Start with Get Started**`, `**Explore the API Reference**`. | `style-guide.md`, User interface elements (bold is for UI labels only) | Remove the bold. |
| OV-m3 | Minor | Line 17 | Card titled "Get Started" links to a page titled "Quickstart". "Get Started" is the `meta.json` sidebar group, not a page. | `style-guide.md`, "Related articles" (one card per related guide) | Retitle the card "Quickstart" and reword the body to match. |
| OV-N1 | Nit | Line 27 | "reach out to your account manager" gives no path. | — | Consider naming the support channel if one is public. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content (source-backed, no invented behavior, version stated, flags resolved) | Pass | |
| Terminology (glossary match, no undefined terms) | Pass | |
| Structure (page type, title/H1, heading depth, list usage, lead-ins) | **Fail** | OV-M1 |
| Formatting (frontmatter, components, bold/code style, code fences) | **Fail** | OV-m1, OV-m2 |
| Style (voice, tense, banned words, dashes, reading level, alt text) | Pass | |
| Output (correct path, listed in `meta.json`) | Pass | |

---

## Quickstart

**File:** `fumadocs/content/docs/guides/quickstart.mdx`
**Page type:** Tutorial
**Verdict:** Needs rewrite

### Summary

The page carries its own "Must REDO this page" banner, and that banner is written in a component tag that does not exist, so it will not render as a callout. Separately, the base URL in the verification step is the one host where v3 was confirmed **unreachable** in this project's testing. This is the first page a new integrator reads, so both have to be settled before anything else on the page matters.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| QS-B1 | Blocker | Lines 8-10 | Unresolved REDO banner shipped on the page: "Must REDO this page.. New authentication is now done via the auth service, not the API service." The page already posts to `https://auth.plytix.com/auth/api/get-token`, which `config/api-testing.config.md` ("Auth") confirms live, so the banner appears to be stale as well as unresolved. | `checklist.md`, Content ("All flags in the draft have been resolved or escalated") | Confirm with the project lead whether anything is still outstanding. If not, delete the banner. If something is, convert it to `<Callout type="warn" title="FLAG">` per `projectConvention.md` and state what specifically is wrong. |
| QS-B2 | Blocker | Line 80 | The verification request targets `https://pim.plytix.com/api/v3/products`. `config/api-testing.config.md` ("Environment") records every v3 path on that host returning `503 {"message":"name resolution failed"}` for the test account; v3 was only ever confirmed live on `https://pim.dev.plytix.com/api/v3`. A reader following this step may get a 503 and conclude their credentials are wrong. | Source trust order: verified live API findings outrank prose docs | **Needs source.** Ask Plytix for the production v3 host and whether `pim.plytix.com/api/v3` is routed for customer accounts. Until answered, every guide that uses this base URL carries the same risk (see ERP-M1). |
| QS-M1 | Major | Line 8 | `<callout>` is lowercase. MDX treats a lowercase tag as a plain HTML element, so this renders as an unstyled `<callout>` node, not the `Callout` component. | `projectConvention.md`, Components | Capitalize to `<Callout>`. |
| QS-M2 | Major | Line 8 | `type="warning"` uses the alias. | `projectConvention.md`, Callout Types ("use `warn`, not the `warning` alias") | Change to `type="warn"`. |
| QS-M3 | Major | Line 33 | `<Callout title="Self-service key creation">` passes no `type`. | `projectConvention.md`, Callout Types ("Always pass `type` explicitly") | Add `type="info"`. |
| QS-M4 | Major | Whole page | Tutorial page type requires a **Learning objectives** block in the intro and a **Before you begin** section. Neither is present. | `page-types.md`, Tutorial | Add both. Before you begin should name the Owner/Admin requirement currently buried in step 1. |
| QS-M5 | Major | Lines 20-115 | Uses `<Steps>`/`<Step>` with `### Heading` inside each step. `projectConvention.md` allows `Steps` "only for tutorial milestones if the project lead approves," and the Tutorial template uses `## Step 1: [Milestone name]` headings instead. | `page-types.md`, Tutorial; `projectConvention.md`, Components | Either confirm the project lead approved `Steps` here and record that in `projectConvention.md`, or convert to `## Step 1:` / `## Step 2:` / `## Step 3:` headings. |
| QS-m1 | Minor | Line 18 | `## Integration Steps` is title case, and `page-types.md`'s Tutorial template has no wrapper heading over the steps. | `style-guide.md`, Headings (sentence case) | Remove the wrapper heading, or make it sentence case. |
| QS-m2 | Minor | Line 119 | "robust" is on the AI-hype list. | `style-guide.md`, Words and phrases to avoid | "to build an integration that holds up" or just "to build your integration". |
| QS-m3 | Minor | Line 125 | Card title "Status Codes & Errors" uses `&` and does not match the target page's title, "Errors and Status Codes". | `style-guide.md`, Grammar and punctuation (ampersands) | Retitle to "Errors and status codes". |
| QS-m4 | Minor | Frontmatter, line 3 | `description` is 95 characters (needs 120-155). | `style-guide.md`, SEO and metadata | Expand to 120-155. |
| QS-m5 | Minor | Line 101 | The sample response shows `"next_page": "http://pim.plytix.com/..."` with no explanation. Quirk #92 confirms these links are emitted with the `http` scheme, `301` to `https`, and silently cost the caller their `Authorization` header on clients that don't forward auth across a scheme change. [exporting-your-full-catalog.mdx](fumadocs/content/docs/guides/exporting-your-full-catalog.mdx#L49) warns about this; the Quickstart doesn't. | Source trust order: verified live finding | Add one sentence pointing at the export guide's warning, or drop `pagination` from the sample. |
| QS-m6 | Minor | Line 26 | Links to `http://accounts.plytix.com/` over plain HTTP. | `style-guide.md`, Links and callouts | Change to `https://`. |
| QS-m7 | Minor | Line 26 | "Access and login into your Dashboard" is not idiomatic; "login" is a noun. | `style-guide.md`, Grammar and punctuation | "Sign in to [your dashboard](https://accounts.plytix.com/)." |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | QS-B1, QS-B2 |
| Terminology | Pass | |
| Structure | **Fail** | QS-M4, QS-M5, QS-m1 |
| Formatting | **Fail** | QS-M1, QS-M2, QS-M3, QS-m3, QS-m4 |
| Style | **Fail** | QS-m2, QS-m6, QS-m7 |
| Output | Pass | |

---

## The Plytix Data Model

**File:** `fumadocs/content/docs/guides/data-model.mdx`
**Page type:** Concept
**Verdict:** Needs rewrite

### Summary

The best-written page in the set and the one with the most consequential errors. Two of its load-bearing claims — that Product Families are dashboard-only, and that related data comes back as IDs until you request expansion — were true when it was written and are not true now. Both are stated emphatically, one inside a `warn` callout, so a reader will trust them.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| DM-B1 | Blocker | Line 18, and the callout at lines 94-96 | "Creating a Product Family, choosing its attributes, and configuring inheritance are dashboard-only actions. The API can assign a product into an existing family through `product_family_id`, but it can't build the family itself." `openapi_pimv3.json` declares `POST /api/v3/product-families`, `PATCH`/`DELETE /api/v3/product-families/{identifier}`, `POST /api/v3/product-families/{product_family_id}/attributes`, and `POST`/`PATCH`/`DELETE` on `.../attributes/{attribute_id}`. Quirk #60 confirms all six family and relationship writes live: `POST` → `201`, `PATCH`/`DELETE` → `200`/`204`. Quirk #61 confirms attribute linking works via `FamilyAttributeLinkInputDto`. | Source trust order: verified live findings and OpenAPI spec both outrank the older material this came from | Rewrite to the current boundary: you **can** create a family, rename it, delete it, and link attributes to it through the API. What is gated is changing an existing link's `level` (the inheritance setting), which returns `403 "Automatic inheritance is not available for this account"` on the test account (quirk #61, status-gating #4) and may be a plan-tier feature. Also note `ProductFamilyUpdateInputDto` is deliberately `name`-only, because attribute-membership changes trigger cross-product propagation that must go through a job. |
| DM-B2 | Blocker | Line 102, and lines 136-138 | "its `categories` field holds a list of IDs rather than the category objects themselves. Ask for the expanded form when you need names instead of IDs" / "Everything else a product points at … is stored as an ID. Plytix returns the full object only when you request expansion." This describes a mechanism that doesn't exist. Quirk #12: `_fields=category_ids` returns `400 HiddenFieldError`, and `_fields=categories` returns **fully expanded category objects**. Quirk #55: `_ids` fields are hidden by design. Quirk #10: `_expand` returns `400 InvalidFieldError`. There is no separate expansion request. | Source trust order: verified live findings | Replace with the real model: `_ids`-suffixed fields are hidden from reads; asking for the plural field (`categories`, `assets`) on the search endpoint returns the expanded objects directly. Note that `_fields` is ignored on single-resource `GET /products/{id}`, which always returns the full shape (quirk #24). |
| DM-M1 | Major | Line 123 | "Relationships are directional in the API: you read them from a product, through its `product_relationships` field." True but incomplete, and it reads as read-only. `POST`, `PATCH`, and `DELETE` all exist on `/api/v3/products/{product_id}/relationships/{relationship_id}`, and quirk #62 confirms the `DELETE` is the one safe, scoped unlink in the whole v3 API. | `openapi_pimv3.json`; quirk #62 | Add a sentence that links and unlinks are writable, and point at the relationship-link endpoint. This is the same correction as REM-B2. |
| DM-M2 | Major | Frontmatter, line 2 | Title "The Plytix Data Model" is title case. Only the product name is a proper noun here. | `style-guide.md`, Headings and Page titles (sentence case) | "The Plytix data model". |
| DM-m1 | Minor | Line 66 | Lists 14 attribute types. A live invalid-`type` `422` enumerates **15** valid discriminators, the extra one being `HierarchyAttribute`, which is in neither the spec nor this list (quirk #23). Creating one `500`s. | Source trust order: verified live finding | Either keep 14 and say the list is the supported set, or add a note. Don't document `HierarchyAttribute` as usable. |
| DM-m2 | Minor | Line 38 | The "System fields" list omits `product_level`, `static_lists`, `overwritten_attributes`, and `account_id`, all declared on `ProductOutputDto`. The page also uses "System fields" and "System Attributes" interchangeably, and `glossary.md` carries a `[CONFLICT]` on the System Attribute count (help center says 12, then lists 13). | `openapi_pimv3.json`, `ProductOutputDto`; `glossary.md`, System Attribute | Complete the list, and either pick one term or explain the difference. Don't state a count until the glossary conflict is resolved. |
| DM-m3 | Minor | Lines 8, 58 | Two "winks" on one page: "discovering it one `404` at a time" and "Plytix will cheerfully store a product that is nothing but a SKU." | `style-guide.md`, Voice and tone ("One 'wink' per page, maximum") | Keep one. The `404` line is the better of the two. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | DM-B1, DM-B2, DM-M1, DM-m1, DM-m2 |
| Terminology | **Fail** | DM-m2 (System fields vs. System Attributes) |
| Structure | Pass | |
| Formatting | **Fail** | DM-M2 |
| Style | **Fail** | DM-m3 |
| Output | Pass | |

---

## Sync your ERP

**File:** `fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx`
**Page type:** How-to guide
**Verdict:** Approve with changes

### Summary

The reference implementation for this set. It is the only page that follows the 2026-10-06 conventions (task-based procedure heading, lead-ins, accordion troubleshooting, token step linked rather than shown), and its API claims hold up against every quirk checked: `PATCH` → `204` (quirk #84), the whole-`attributes`-map replacement hazard (quirk #85), the scoped single-attribute write (quirk #87), SKU as `{identifier}` (quirk #86). Use it as the template for fixing the other eleven.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| ERP-M1 | Major | Lines 29, 40, 49, 63, 82, 93 | Base URL `https://pim.plytix.com/api/v3` — the host where v3 was confirmed unreachable. Same issue as QS-B2; graded Major here because the reader reaches this page already authenticated and is less likely to misdiagnose it as a credentials problem. | Source trust order: verified live findings | **Needs source.** Resolve once, centrally, then apply to every guide. |
| ERP-m1 | Minor | Line 14 | Navigation path given as **Account Administration > API**. [quickstart.mdx](fumadocs/content/docs/guides/quickstart.mdx#L27) says to open "the **API** tab" at `accounts.plytix.com`, and [platform-mcp/authentication-and-oauth-setup.mdx](fumadocs/content/docs/guides/platform-mcp/authentication-and-oauth-setup.mdx#L51) says the same. Three pages, two paths. | `style-guide.md`, User interface elements ("Bold UI labels exactly as they appear on screen") | Confirm the real path once and use it everywhere. |
| ERP-m2 | Minor | Line 115 | "To avoid this, never build a `PATCH` body with only the changed attribute in it." Read on its own this contradicts step 5, which recommends exactly a single-attribute write (via `PATCH /products/{id}/attributes/{name}`). | `style-guide.md`, Noun precision | Scope it: "never build a product-level `PATCH` body with only the changed attribute inside `attributes`." |
| ERP-m3 | Minor | Filename and IA map | The file is still `syncing-your-erp-with-plytix.mdx` and `information-architecture.md` still lists the title as "Sync your ERP with Plytix", but the page title is now "Sync your ERP" per the 2026-10-06 suffix rule. | `information-architecture.md`, Structure Map; `style-guide.md`, Procedure section headings | Update the IA map's title cell. Renaming the file changes the URL, so only do it if nothing links to the old path yet (eight cards currently do — see the Cross-page findings section). |
| ERP-N1 | Nit | Line 88 | "even though some Plytix API documentation describes `POST` as returning only an ID" — vague attribution, repeated on two other pages. | — | Name the source (`API V3.md`'s response-conventions section, p. 16-17) or drop the clause. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | ERP-M1 |
| Terminology | Pass | |
| Structure | Pass | |
| Formatting | Pass | |
| Style | **Fail** | ERP-m2 |
| Output | **Fail** | ERP-m3 |

---

## Export your full catalog

**File:** `fumadocs/content/docs/guides/exporting-your-full-catalog.mdx`
**Page type:** How-to guide
**Verdict:** Approve with changes

### Summary

Technically the most accurate of the unrevised guides. Every API claim checks out: `_fields` repeatable (quirk #7), page size default 25 and max 1000 (quirk #90, with the `422` bound confirmed), `next_page` key omitted rather than null on the last page (quirk #91), the `http`-scheme auth hazard (quirk #92), `_ids` fields hidden (quirk #12/#55), `_fields` ignored on single-resource `GET` (quirk #24), `AssetOutputDto.path` real. The problems are all convention, not fact.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| EXP-M1 | Major | Line 15 | Procedure section titled `## Steps`. | `style-guide.md`, Procedure section headings ("Never title a procedure section 'Steps'") | `## Export your catalog`. |
| EXP-M2 | Major | Lines 10-13 | `## Prerequisites` goes straight into a bullet list with no lead-in sentence. | `style-guide.md`, Lead-in text before lists and accordions | Add "Before you start, make sure you have the following:". |
| EXP-M3 | Major | Lines 80-89 | Troubleshooting is a bullet list using `**Problem:** / **Solution:** / **Prevention:**` labels. | `style-guide.md`, Troubleshooting format (accordion per problem, continuous prose, no labels); `projectConvention.md`, Components | Convert to `<Accordions type="multiple">` with one `<Accordion>` per problem, titled with the symptom, body in prose. Copy the shape from [syncing-your-erp-with-plytix.mdx](fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx#L103). Add the lead-in sentence above it. |
| EXP-M4 | Major | Line 12 | "See the Quickstart guide for the authentication flow" is plain text, not a link. Six guides repeat this exact string. | `style-guide.md`, Links and callouts; Access token step in integration guides | Link it: `[Quickstart](/docs/guides/quickstart)` or `[Authentication](/docs/reference/v3/authentication)`. |
| EXP-M5 | Major | Line 78 | `See "Build a Marketplace-Specific Product Feed"` — a quoted page name instead of a link, and in the pre-rename title case. | `style-guide.md`, Links and callouts | `See [Build a marketplace-specific product feed](/docs/guides/building-marketplace-specific-product-feeds)`. |
| EXP-M6 | Major | Line 91 | `## Related articles` opens directly with `<Cards>`, no opening sentence. | `style-guide.md`, "Related articles" section ("Open with one sentence") | Add "Now that you can export your catalog, you can explore these related guides." |
| EXP-M7 | Major | Lines 32-34 | Unresolved FLAG, invisible to readers, on `_expand`. It is now answerable: quirk #10 confirms `_expand` returns `400 {"errors":[{"name":"InvalidFieldError","description":"Field '_expand' does not exist in model 'Product'."}]}`. | `checklist.md`, Content (flags resolved or escalated) | Close the flag. The body text at line 30 already states the correct behavior, so the comment can simply be deleted. |
| EXP-m1 | Minor | Line 47 | Em dash: "no `next_page` key — on the last page". | `style-guide.md`, Grammar and punctuation ("Em dash: never use") | Replace with a comma or a period. |
| EXP-m2 | Minor | Lines 94, 97 | Card titles "Auditing Product Data Quality with Filters" and "Build a Marketplace-Specific Product Feed" don't match the target pages' titles. | `style-guide.md`, "Related articles" section | Match the targets exactly: "Audit product data quality with filters", "Build a marketplace-specific product feed". |
| EXP-m3 | Minor | Frontmatter, line 3 | `description` is 90 characters (needs 120-155). | `style-guide.md`, SEO and metadata | Expand. |
| EXP-m4 | Minor | Line 47 | "The default page size is 25; the maximum is 1000" states the maximum as flat fact. It is correct (quirk #90: `_page_size=1001` → `422 "Input should be less than or equal to 1000"`), but worth noting that neither bound appears in `openapi_pimv3.json`, which declares no query parameters at all on any search operation. | `openapi_pimv3.json`; quirk #7 | No text change needed. Flagged so the claim isn't accidentally "corrected" against the spec later. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | EXP-M7 |
| Terminology | Pass | |
| Structure | **Fail** | EXP-M1, EXP-M2, EXP-M3, EXP-M6 |
| Formatting | **Fail** | EXP-M3, EXP-M4, EXP-M5, EXP-m2, EXP-m3 |
| Style | **Fail** | EXP-m1 |
| Output | Pass | |

---

## Audit product data quality with filters

**File:** `fumadocs/content/docs/guides/auditing-product-data-quality-with-filters.mdx`
**Page type:** How-to guide
**Verdict:** Approve with changes

### Summary

The filter operators are all live-confirmed: `[exists]`/`[!exists]` with the explicit `=true`, `[in]` in repeated-parameter form, `attributes.<name>` dot notation, and the `main_image_link` example (quirk #53, which was run specifically to unblock this guide). `marketing_ready` and `website_ready` are real, confirmed in the Bruno captures. Two of its cross-references point at pages that do not exist in this documentation set.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| AUD-M1 | Major | Line 13 | References `"Filtering, Sorting & Pagination."` No such page exists. The real pages are `/docs/reference/v3/filtering-query-syntax` ("Filtering and Query Syntax Reference") and `/docs/reference/v3/pagination`. The reference also uses `&`. | `information-architecture.md`, Structure Map; `style-guide.md`, Grammar and punctuation | Link to [Filtering and query syntax](/docs/reference/v3/filtering-query-syntax). |
| AUD-M2 | Major | Line 83 | `See "Building a Smart product list" in Core Concepts.` There is no "Core Concepts" section and no such page anywhere in `information-architecture.md`. [building-marketplace-specific-product-feeds.mdx](fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx#L17) repeats the same dead reference. | `information-architecture.md`, Structure Map | Either write the page and add it to the IA map, or point readers at the product-list create call shown in the feeds guide. Don't leave a reference to a section that was never built. |
| AUD-M3 | Major | Line 15 | Procedure section titled `## Steps`. | `style-guide.md`, Procedure section headings | `## Audit your product data`. |
| AUD-M4 | Major | Lines 10-13 | Prerequisites has no lead-in sentence, and line 12's "See the Quickstart guide" is not a link. | `style-guide.md`, Lead-in text; Access token step in integration guides | Add the lead-in; link the Quickstart. |
| **AUD-B1** | **Blocker** (was AUD-M5, escalated) | Lines 39-51 (step 3) | **[TESTED 2026-10-08 — worse than flagged]** Step 3's sample uses `[icontains]`. That operator **no longer exists**: `attributes.short_description[icontains]=` returns `400 {"name":"InvalidFilterOperator"}`. The case-insensitive operator is `contains:ignorecase`, confirmed working (`sku[contains:ignorecase]=BAG` → `200`). This **reverses** the 2026-10-01 note in `information-architecture.md` that said the opposite. The published code sample fails outright. | `config/api-testing.config.md` quirk #99 | Replace `[icontains]` with `[contains:ignorecase]` here and anywhere else it appears, and correct the IA note. The API now enumerates its full operator set in the error on any invalid operator, which is the authoritative list to document: `!contains, !contains:ignorecase, !eq, !exists, !gt, !gte, !in, !includes, !intersects, !lt, !lte, !null, contains, contains:ignorecase, eq, exists, gt, gte, in, includes, intersects, lt, lte, null`. Note `includes`/`!includes` appear there and in no Plytix source material — worth asking about before documenting. |
| AUD-M5 | Major — **CLOSED on the empty-vs-missing question** | Lines 49-51 | **[TESTED 2026-10-08]** The flag's actual question — how to tell "empty" from "missing" — is now answered, and the page can state it plainly. On the test account's 41 products: `[!exists]=true` → 16, `[exists]=true` → 25, `[length]=0` → 16, `[length][gt]=0` → 25, `[null]=true` → 0, `[!null]=true` → 25. **Both `[length]` and `[len]` work identically**, which also resolves the Oct 8 status map's open question #2. `[length]=0` treats missing and empty the same, so it is not the discriminator the step implies. | `config/api-testing.config.md` quirk #100 | Rewrite step 3 around `[exists]`/`[!exists]` for presence and `[length]` for emptiness, with the caveat that `[length]=0` also matches missing. Delete the flag. |
| AUD-M6 | Major | Lines 85-93 | `## Related articles` has no opening sentence, and both card titles are stale title-case names. | `style-guide.md`, "Related articles" section | Add the lead-in; match card titles to the target pages. |
| AUD-m1 | Minor | Frontmatter, line 3 | `description` is 102 characters (needs 120-155). | `style-guide.md`, SEO and metadata | Expand. |
| AUD-m2 | Minor | Line 66 | "Every product's `attributes` map already includes a set of automatically computed completeness fields … without any setup on your end." Quirk #30 describes these as "account-level default/system completeness attributes" observed on one account. Which ones exist, and whether any exist, depends on account configuration. | Source trust order: verified live finding | Soften to "your account's completeness attributes appear in the map alongside your own values" and present the three names as examples from one account rather than guarantees. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | AUD-M5, AUD-m2 |
| Terminology | Pass | |
| Structure | **Fail** | AUD-M3, AUD-M4, AUD-M6 |
| Formatting | **Fail** | AUD-M1, AUD-M2, AUD-m1 |
| Style | Pass | |
| Output | Pass | |

---

## Build a marketplace-specific product feed

**File:** `fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx`
**Page type:** How-to guide
**Verdict:** Needs rewrite

### Summary

This page documents a channel create-and-configure workflow that `information-architecture.md`'s standing Notes say should not be written until Plytix confirms the conflict. The page knows this — it says so in an invisible comment at line 10 — and proceeds anyway. That decision needs to be made by a person, not left in a code comment. The API behavior it documents is otherwise sound (quirks #39, #40, #41, #42).

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| FEED-B1 | Blocker | Lines 10-12, and the whole page | The page's opening FLAG states the conflict plainly: Plytix's roadmap notes say channels are UI-only with no API, this project's testing says `GET`/`POST`/`PATCH`/`DELETE` on `/channels` all work, and the guide follows the testing. `information-architecture.md`'s Notes record the same `[CONFLICT, flagged 2026-09-29]` and instruct: "Confirm with Plytix (or test with `endpoint-tester`) before writing anything that relies on either claim. Until then, guides keep following this rule: Channels … are configured and managed entirely in the Plytix UI." This page was written against the opposite rule, and the conflict is invisible to readers. | `information-architecture.md`, Notes; `checklist.md`, Content ("Page doesn't imply an API endpoint or entity exists when it's UI-only — check `information-architecture.md`'s Notes before publishing") | **Needs source.** Get a yes or no from Plytix on whether the `/channels` endpoints are supported and public. If yes, update the IA Notes and keep the page (surfacing the Destinations caveat as a visible callout). If no, the page comes down. Do not publish it with the conflict in a comment. |
| FEED-M1 | Major — **CLOSED** | Lines 76-78 | **[TESTED 2026-10-08]** The flag said `PATCH` had not been re-tested on channels and might still return `200`. Confirmed: `PATCH /channels/{id}` returns **`204`** with an empty body, consistent with the API-wide change in quirk #84. | `config/api-testing.config.md` quirk #101 | Delete the flag and state `204` in step 3's body text. Keep the read-back in step 4, which is now the only way to verify. |
| **FEED-M6** | Major **[NEW]** | Lines 57-74 (step 3) | **[NEW, from live testing]** The step-3 flag describes sending `rebuild_periodically` alone as returning "a validation error that doesn't name the missing field." On a fresh channel it now returns **`502 {"name":"BadGatewayError","description":"There was an error processing your request. Please try again later"}`** — a 5xx on what is a validation case. Sending all five schedule fields together returns `204` as the step shows. A reader who omits a field gets a server error that reads like an outage. | `config/api-testing.config.md` quirk #101a, open question #32 | Keep the "send all the fields together" guidance and make it visible rather than a comment. Report the `502` to Plytix as a bug. |
| FEED-M2 | Major | Line 51 | "The response includes the full created channel, not only its ID, even though some Plytix API documentation describes `POST` as returning only an ID." Correct (quirk #41), but the vague "some Plytix API documentation" appears on three pages. | `style-guide.md`, Accuracy | Name it: `API V3.md`'s response-conventions section. Or drop the clause. |
| FEED-M3 | Major | Line 19 | Procedure section titled `## Steps`. | `style-guide.md`, Procedure section headings | `## Build your feed`. |
| FEED-M4 | Major | Lines 14-17 | Prerequisites has no lead-in; line 16's Quickstart reference is not a link; line 17 points at `"Building a Smart product list" in Core Concepts`, which doesn't exist (same dead reference as AUD-M2). | `style-guide.md`, Lead-in text; `information-architecture.md` | Fix all three. |
| FEED-M5 | Major | Lines 94-103 | `## Related articles` has no opening sentence; both card titles are stale; line 100's card title uses `&`. | `style-guide.md`, "Related articles" section; Grammar and punctuation | Fix. |
| FEED-m1 | Minor | Frontmatter, line 3 | `description` is 102 characters (needs 120-155). | `style-guide.md`, SEO and metadata | Expand. |
| FEED-m2 | Minor | Line 89 | `## What you can't do through the API yet` leads with the negative and promises a "yet". | `style-guide.md`, Rules of engagement ("Don't say 'no.' Lead with what we can do") | Reframe: "## What stays in the Plytix interface", opening with what the reader can do from the API and naming the interface path for the rest. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | FEED-B1, FEED-M1, FEED-M2 |
| Terminology | Pass | |
| Structure | **Fail** | FEED-M3, FEED-M4, FEED-M5 |
| Formatting | **Fail** | FEED-M4, FEED-M5, FEED-m1 |
| Style | **Fail** | FEED-m2 |
| Output | Pass | |

---

## Safely remove categories, assets, or relationships

**File:** `fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx`
**Page type:** How-to guide
**Verdict:** Needs rewrite

### Summary

This page exists to warn about a destructive bug. Plytix fixed that bug on 2026-09-23. The page's central `error` callout, its framing, and its title all rest on behavior that no longer happens. Two of its three other load-bearing claims are also now wrong: relationships are writable, and the verification call in step 4 is itself broken. This is the page with the most to redo.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| REM-B1 | Blocker **[REVISED]** | Lines 10-12 | **Confirmed, and the correct replacement is stronger than the first pass assumed.** The `<Callout type="error">` says `DELETE /products/{id}/categories` and `DELETE /products/{id}/categories/{category_id}` delete the entire product. Re-tested live 2026-10-08 on a disposable product with two real categories: the bare-collection form returns `405 {"name":"MethodNotAllowed","description":"DELETE on 'categories' requires exactly one linked id: DELETE /products/{id}/categories/{linked_id}"}`; an unrecognized subpath returns `404 "Product has no field '<x>'"`; and **the 3-segment form is now a working, safe, scoped unlink** — `204`, product fully intact (`sku`, `label`, `status`, `attributes` unchanged), only the named category removed and the second one still attached. No destructive behavior anywhere. | `config/api-testing.config.md` quirks #94, #95 | Delete the hazard callout and rewrite the page around the link/unlink endpoints, which now do exactly what the page's title promises. Do **not** keep the "use `PATCH` with a reduced `category_ids` array" workaround — see NEW-B1; that call now `422`s. Captured examples: `bruno-collection/02-Products-v3/Unlink Category from Product.bru`. |
| REM-B2 | Blocker | Line 74 | "Relationships can't be removed, or created, through the API at all. Relationship data on a product is read-only. Removing a relationship link is a dashboard-only action today." Contradicted on both counts. `openapi_pimv3.json` declares `POST /api/v3/relationships` (create a relationship type) and `POST`, `PATCH`, `DELETE` on `/api/v3/products/{product_id}/relationships/{relationship_id}`. Quirk #60 confirms relationship-type writes live. Quirk #62: `DELETE /products/{product_id}/relationships/{relationship_id}` "removes only that relationship link — confirmed via a follow-up `GET` on the *product* showing it fully intact … only `product_relationships` emptied," and calls it the **first confirmed safe, scoped `DELETE`-based unlink in this entire project." The page's own title promises relationships, then tells the reader it's impossible. **[RE-VERIFIED live 2026-10-08]**, full round trip: `POST /relationships {"name":"…"}` → `201` (returns `id`, a derived `label`, `status: "ACTIVE"`); `POST /products/{id}/relationships/{rel_id}` with `{"relationship_id":"<rel_id>","related_products":[{"product_id":"<other>","quantity":2}]}` → `201`; `PATCH` the same path to change quantity → `204`; `DELETE` → `204` with both products confirmed intact and `product_relationships` emptied. Note the body field is `product_id`, not `related_product_id` — the latter returns `422 "Extra inputs are not permitted"`, and `relationship_id` must be repeated inside the body as well as in the path. | `openapi_pimv3.json`; quirks #60, #62 | Add relationship unlinking as a working procedure, and make it the page's positive example. As of this session it is one of **two** places in v3 where a scoped `DELETE` does the right thing — categories is now the other (REM-B1). |
| ~~REM-B3~~ | **RETRACTED** | Lines 62-69 | **[RETRACTED after testing]** The first pass called step 4's `GET /products/<product_id>/categories` broken, on quirk #80's "always returns an empty array" finding. Re-tested 2026-10-08: the subpath returns real, fully expanded data again, verified on `BAG-10157` (2 categories) and on a fresh scratch product. `.../assets` likewise. Quirk #80's regression is resolved and has been marked so in the config. **Step 4 is correct as written** — no change needed. | — | None. |
| REM-M1 | Major **[REVISED]** | Lines 17, 28, 30-39 | "The product's current `category_ids`" / "Note the current `category_ids` array". `category_ids` cannot be read (quirk #12: `_fields=category_ids` → `400 HiddenFieldError`, deliberate per quirk #55) — **and as of 2026-10-08 it cannot be written either** (NEW-B1 / quirk #93). The field is now neither readable nor writable, so step 2's entire premise ("`PATCH` sets the field to whatever array you send") is dead. | `config/api-testing.config.md` quirks #12, #55, #93 | Drop `category_ids` from the page entirely. Read with `_fields=categories` or the `GET /products/{id}/categories` subpath; remove with `DELETE /products/{id}/categories/{category_id}`. |
| REM-M2 | Major — **both halves now CLOSED** | Lines 41-43, 58-60 | **[TESTED 2026-10-08]** Two unresolved FLAGs, both now answered. **(a) The reduced-array removal flag is moot** — `category_ids` is rejected entirely (NEW-B1), so the step it hedged no longer exists. Delete the flag along with the step. **(b) Clearing `thumbnail_id` works**: `PATCH /products/{id}` with `{"thumbnail_id": null}` returns `204`, and the follow-up `GET` shows `thumbnail_id: null` with the `thumbnail` key absent (quirk #97). Worth documenting the side effect found in the same run: the product's `assets` array emptied at the same time, because the thumbnail was the only thing that had linked that asset. | `config/api-testing.config.md` quirks #93, #97 | Delete flag (a) with its step. Replace flag (b) with the confirmed behavior as body text. |
| REM-M3 | Major | Lines 14-19, 76-85 | `## Steps` heading; Prerequisites with no lead-in; Quickstart reference not linked; `## Related articles` with no opening sentence and both card titles stale. | `style-guide.md`, Procedure section headings; Lead-in text; "Related articles" section | Fix, using [syncing-your-erp-with-plytix.mdx](fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx) as the model. |
| REM-m1 | Minor | Frontmatter, line 3 | `description` is 103 characters (needs 120-155) and starts with "The right way to…" rather than an action verb. | `style-guide.md`, SEO and metadata | Rewrite starting with a verb. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | REM-B1, REM-B2, REM-B3, REM-M1, REM-M2 |
| Terminology | Pass | |
| Structure | **Fail** | REM-M3 |
| Formatting | **Fail** | REM-M3, REM-m1 |
| Style | Pass | |
| Output | Pass | |

---

## Reconstruct parent/variant hierarchies

**File:** `fumadocs/content/docs/guides/reconstructing-parent-variant-hierarchies.mdx`
**Page type:** How-to guide
**Verdict:** Needs rewrite

### Summary

The read half of this guide is accurate: `product_level` transitions (quirk #46), `ProductFamilyOutputDto`'s three totals, `ProductFamilyModelOutputDto`'s three label arrays, all verified against the spec. The write half has a code sample that returns `422` as written, and the page repeats the now-false "families are dashboard-only" claim.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| ~~HIER-B1~~ | **RETRACTED** | Lines 43-48 (step 3) | **[RETRACTED after testing]** The first pass called step 3's sample broken, on quirk #72 ("combining `product_family_id` with `parent_id` on `POST /products` 422s"). Re-tested 2026-10-08: sending both returns **`201`**. Quirk #72 has been retracted in the config. The code sample is correct as written. | — | None. See HIER-M4 for the one thing on that step that *is* wrong. |
| **HIER-M4** | Major **[NEW]** | Line 50 | **[NEW, from live testing]** "Use the same `product_family_id` as the parent. **The API doesn't enforce this**, but a mismatched family will break how the hierarchy reads back." The API *does* enforce it: creating a variant whose `product_family_id` differs from its parent's returns `422 {"name":"ValidationError","description":"product data validation failed"}`, with no field named. This is the real rule behind the old quirk #72. Also missing from the page: a variant created with `parent_id` **alone** inherits the parent's `product_family_id` automatically, which makes passing it at all optional. | `config/api-testing.config.md` quirk #98 | Correct the sentence: a mismatched family is rejected with a generic `422`, and passing the family is unnecessary because it is inherited. |
| HIER-B2 | Blocker | Line 8, and the FLAG at lines 26-28 | "Creating or configuring a Product Family itself is a dashboard-only action; the API can only assign products into a family that already exists" / "Creating a new Product Family, choosing its attributes, or configuring inheritance between levels are all dashboard-only actions today. There's no API endpoint for any of them." Same error as DM-B1. `POST /api/v3/product-families` and `POST /api/v3/product-families/{product_family_id}/attributes` both exist in the spec and are confirmed live (quirks #60, #61). | `openapi_pimv3.json`; quirks #60, #61 | Correct as in DM-B1. Only the attribute-link `level` change is gated, with `403 "Automatic inheritance is not available for this account"`. Step 1 ("List the product families already in your account") can become "create or find a family." |
| HIER-M1 | Major — **attempted, CANNOT CLOSE** | Lines 74-76 | **[TESTED 2026-10-08, blocked]** Unresolved FLAG on `overwritten_attributes` contents. Tried to exercise it end to end: created a family, linked an attribute, set a value on the parent, then overrode it on the variant. `overwritten_attributes` stayed **`[]`** throughout, and the parent's value never reached the variant in the first place. The cause is status-gating rule #4 — "Automatic inheritance is not available for this account" (`403 Forbidden` on any attribute-level change). With inheritance off, there is nothing to overwrite, so the field cannot be exercised on this account at all. | `config/api-testing.config.md`, Status-gating rule #4 | **Needs source or a different account.** Ask Plytix to enable automatic inheritance on "David's Dev Account", or to confirm the field's contents directly. Until then surface the flag as `<Callout type="warn" title="FLAG">` rather than leaving the claim bare. |
| HIER-M2 | Major — **attempted, CANNOT CLOSE** | Line 78 | **[TESTED 2026-10-08, blocked]** The "deleting a variant's overwritten value resolves back to the parent's" claim is blocked by the same feature gate as HIER-M1: no value is ever inherited on this account, so there is nothing to resolve back to. The mechanism the first pass suggested for testing it (`PATCH`/`DELETE /products/{id}/attributes/{name}`, quirk #87) does work — it is the inheritance half that cannot be reached. | `config/api-testing.config.md`, Status-gating rule #4 | Same as HIER-M1. Both flags now have a documented reason for staying open, which is better than "wasn't tested." |
| HIER-M3 | Major | Lines 10-15, 80-89 | `## Steps` heading; Prerequisites with no lead-in; Quickstart reference not linked; `## Related articles` with no opening sentence and both card titles stale. | `style-guide.md`, Procedure section headings; Lead-in text; "Related articles" section | Fix. |
| HIER-m1 | Minor | Frontmatter, line 3 | `description` is 76 characters (needs 120-155). | `style-guide.md`, SEO and metadata | Expand. |
| HIER-m2 | Minor | Line 39 | "even though some Plytix API documentation describes `POST` as returning only an ID" — third occurrence of the same vague attribution. | `style-guide.md`, Accuracy | Name the source once, in a shared reference page, and link to it. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | HIER-B1, HIER-B2, HIER-M1, HIER-M2 |
| Terminology | Pass | |
| Structure | **Fail** | HIER-M3 |
| Formatting | **Fail** | HIER-M3, HIER-m1 |
| Style | Pass | |
| Output | Pass | |

---

## Bulk Operations for Large Catalogs

**File:** `fumadocs/content/docs/guides/bulk-operations-for-large-catalogs.mdx`
**Page type:** How-to guide
**Verdict:** Approve with changes

### Summary

Honest and correct: v3 has no bulk endpoints, and the single-item-paced-loop pattern is the right answer. This is also the one page the newest material changes. The Oct 8 source promotes Plytix's entire bulk API design to approved status while leaving it absent from the spec, which is worth saying out loud on the page that tells readers it doesn't exist.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| BULK-M1 | Major | Frontmatter, line 2 | Title "Bulk Operations for Large Catalogs" is title case, and `information-architecture.md` carries the same title-case form. | `style-guide.md`, Headings and Page titles (sentence case) | "Process a large catalog" or "Run bulk operations on a large catalog". Update the IA map to match. |
| BULK-M2 | Major | Lines 10-12, 56-58 | Two unresolved FLAGs. The first carries the single most important fact on the page — "This API version doesn't currently have bulk create, update, or delete endpoints" — in an MDX comment, where no reader sees it. A reader who arrived looking for a bulk endpoint gets a page called "Bulk Operations" that never plainly tells them there aren't any until step 4's passing mention. | `checklist.md`, Content; `projectConvention.md`, Writer flags; `style-guide.md`, Answer-first H2s | Promote the first flag to body text in the intro, stated directly. Keep the second (Bulk API untested) as a visible `<Callout type="warn">` in the "older Bulk API" section. |
| BULK-M3 | Major | Lines 14-19, 35, 60-68 | `## Steps` heading; Prerequisites with no lead-in; three quoted page names instead of links (`"Syncing Your ERP with Plytix"` line 17, `"Exporting Your Full Catalog"` line 35, plus the Quickstart at line 16); `## Related articles` with no opening sentence and both card titles stale. | `style-guide.md`, Procedure section headings; Lead-in text; Links and callouts; "Related articles" section | Fix. |
| BULK-M4 | Major | Lines 49-58, and the page premise | **New material.** `materials/api-references/API V3 - status map (08_10_2026).md` ("Bulk operations", pp. 13-15) marks the full bulk surface **Direct**, i.e. approved: `POST api/v3/-/bulk/<plural_entity_name>`, `PATCH` by filter and per-instance, `DELETE` by filter and by item, plus job tracking at `GET api/v3/-/bulk/-/jobs/<bulk_job_id>` and `GET api/v3/-/bulk/-/jobs/?<search_query>`. Only advanced bulk updates and job transitions (`cancel`/`pause`/`resume`/`retry`) are Postponed. None of it appears in `openapi_pimv3.json`. The page's framing — "the older Bulk API" in v2 as the only bulk option — misses that a v3 bulk API is specified and approved but not shipped. | Source trust order (spec outranks the design doc, but the design doc is a source); `information-architecture.md`, Notes (`[CONFLICT, flagged 2026-09-29]` on exactly this) | Keep "no bulk endpoints today" as the operative fact. Add a short, clearly-labelled forward-looking note: the v3 bulk API is designed and approved, returns `{"bulk_job_id": <id>}`, and tracks work through a jobs endpoint, but is not in the current spec. Confirm the timeline with Plytix. Also note the source's own warning on bulk additions: "Webhooks 1st implementation comes with absolutely no guarantees." |
| BULK-m1 | Minor | Lines 21-23 | "Rate limits vary by account and are embedded in your access token's claims. Check the limit for your account with your Plytix contact if it's not otherwise documented." The project has real numbers: quirk #3 records 20 req/10s and 15000 req/3600s in the JWT claims for one account, and the test-fixtures section records 20 req/10s and 5000 req/3600s for another. The auth endpoint itself returns `ratelimit-limit: 8`. | Source trust order: verified live findings; `style-guide.md`, Specifics beat superlatives | Give the shape and the observed range, then say it varies and where to read it. Sending readers to a support contact for something their own token already tells them is friction the page can remove. |
| BULK-m2 | Minor — **attempted, CANNOT CLOSE** | Line 37 | **[TESTED 2026-10-08, no `429` reachable]** Tried hard to produce one: 80 requests issued 40-way parallel in roughly two seconds, which is about 4x the JWT's stated 20-per-10-seconds burst limit. **All 80 returned `200`**, and no PIM response carries a `RateLimit-*`, `X-RateLimit-*` or `Retry-After` header. The limits exist only as claims inside the token. The auth endpoint *does* enforce and advertise one, and it has changed since quirk #3: `RateLimit-Limit: 15` (was 8). | `config/api-testing.config.md` quirk #102, open question #34 | Keep the back-off advice, but mark the `429` shape unverified rather than implied. **BULK-m1 is now fully answerable**: the token's account claims carry `rate_limit: [{limit: 20, window_size: 10}, {limit: 5000, window_size: 3600}]` and a 900-second lifetime, so the page can show readers how to read their own limits instead of sending them to a support contact. |
| **BULK-m3** | Minor **[NEW]** | Line 23 | **[NEW, from live testing]** "Rate limits … are embedded in your access token's claims" is right, but the page never shows the reader where. The path is `user_claims.account.rate_limit` in the decoded JWT, an array of `{limit, window_size}` objects. | `config/api-testing.config.md` quirk #102 | Add the claim path and a one-line decode example. This turns an unactionable sentence into something a reader can use. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | BULK-M2, BULK-M4, BULK-m1, BULK-m2 |
| Terminology | Pass | |
| Structure | **Fail** | BULK-M3 |
| Formatting | **Fail** | BULK-M1, BULK-M3 |
| Style | Pass | |
| Output | **Fail** | BULK-M1 (IA title) |

---

## Getting notified: webhooks and Automations

**File:** `fumadocs/content/docs/guides/getting-notified-webhooks-and-automations.mdx`
**Page type:** Concept
**Verdict:** Approve with changes

### Summary

Does the hardest thing on this list well: it separates two features people conflate, says plainly that neither is API-driven, and resists the pull of the roadmap. The structure is right for a Concept page. The problems are the shared conventions plus two invisible flags, one of which gates the page's forward-looking claim.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| NOTE-M1 | Major — **CLOSED, and the answer is "no"** | Lines 26-28 | **[TESTED 2026-10-08]** The flag asked whether setting the channel `webhook` block through the API registers a working webhook. It does not. `PATCH /channels/{id}` with `{"webhook":{"webhook_url":"…","webhook_headers":{…},"webhook_body":{…}}}` returns **`204`** and then **silently discards the value**: a follow-up `GET` shows the key absent, and `_fields=webhook` is dropped from the search response entirely. (`webhook_body` must be a dictionary — a string returns `422 "webhook.webhook_body: Input should be a valid dictionary"`, so the field is validated and then thrown away.) | `config/api-testing.config.md` quirk #101b, open question #33 | The page's current position — channel webhooks are dashboard-only — is **correct**, and can now be stated with confidence instead of hedged in a comment. Add one visible sentence warning that the API accepts a `webhook` payload and silently ignores it, since a reader who finds the field in the generated reference will otherwise assume it works. |
| NOTE-M2 | Major | Frontmatter, line 2 | Title "Getting notified: webhooks and Automations" is a gerund phrase. | `style-guide.md`, Page titles ("Use active, not passive, titles") | "React to changes in Plytix" or "Get notified when data changes". |
| NOTE-M3 | Major | Line 36 | `"Syncing Your ERP with Plytix"` quoted instead of linked, in the pre-rename title case. | `style-guide.md`, Links and callouts | `[Sync your ERP](/docs/guides/syncing-your-erp-with-plytix)`. |
| NOTE-M4 | Major | Lines 38-47 | `## Related articles` has no opening sentence; both card titles stale; line 44's card title uses `&`. | `style-guide.md`, "Related articles" section; Grammar and punctuation | Fix. |
| NOTE-m1 | Minor | Throughout | `glossary.md` marks both **Webhooks** and **Automations** capitalization `[PENDING]`. The page uses them with no visible flag. | `glossary.md`; `checklist.md`, Terminology ("`[PENDING]` glossary terms are used with a visible flag") | Confirm in-product capitalization with Plytix. It is a small question that blocks three pages. |
| NOTE-m2 | Minor | Line 24, and line 3 | The webhook payload contents (channel name, processing status, channel URL, feed URL, product count) come from `materials/help-center/`, the lowest tier of the trust order, with no flag. `description` is also 98 characters (needs 120-155) and starts with "How Plytix notifies…" rather than a verb. | Source trust order; `style-guide.md`, SEO and metadata | Flag the payload as help-center-sourced and unverified against a live webhook delivery. Rewrite the description. |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | NOTE-M1, NOTE-m2 |
| Terminology | **Fail** | NOTE-m1 |
| Structure | Pass | |
| Formatting | **Fail** | NOTE-M2, NOTE-M3, NOTE-M4, NOTE-m2 |
| Style | Pass | |
| Output | Pass | |

---

## Documentation MCP

**File:** `fumadocs/content/docs/guides/documentation-mcp.mdx`
**Page type:** How-to guide
**Verdict:** Approve with changes

### Summary

Verified against the implementation, not just the materials, and it holds up. The three tool names match `fumadocs-core/dist/mcp.js` (`search`, `list_pages`, `get_page`) and `fumadocs/lib/mcp-search.ts`; the `llms.txt`, `llms-full.txt`, and `/llms.mdx/docs/.../content.md` routes all exist and the trailing-`content.md` form is correct (the route handler drops the last slug segment). The blocker is the one thing the page can't fix itself: it has no domain.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| DOC-M1 | Major | Throughout (14 occurrences) | Every URL is `https://<docs-base-url>/…`. `projectConvention.md` lists Base URL as `[PENDING]`: "production domain not confirmed yet." The FLAG explaining the placeholder is at lines 12-14, in an MDX comment, so a reader sees the placeholder with no explanation. | `projectConvention.md`, Platform; `checklist.md`, Content | **Needs source.** Get the production domain. Until then, surface the placeholder explanation as a visible `<Callout type="warn" title="FLAG">` so the page is at least self-explaining if it ships. |
| DOC-M2 | Major | Lines 139-152 | Troubleshooting is a bullet list using `**Problem:** / **Solution:** / **Prevention:**` labels, and has no lead-in sentence. | `style-guide.md`, Troubleshooting format; Lead-in text; `projectConvention.md`, Components | Convert to `<Accordions type="multiple">` with prose bodies. |
| DOC-M3 | Major | Lines 18-23 | The lead-in reads "You need one of the following, and nothing else:" but the two bullets are both required (an MCP-capable client **and** the endpoint), not alternatives. | `style-guide.md`, Lead-in text; Clarity beats cleverness | "Before you start, make sure you have the following:". Move the "you don't need an account" reassurance below the list, where it already is. |
| DOC-m1 | Minor | Line 137 | "take its docs path and request it under `/llms.mdx`, ending in `/content.md`" is hard to parse. The behavior is correct (verified against `app/llms.mdx/docs/[[...slug]]/route.ts`), the sentence just doesn't show it. | `style-guide.md`, Clarity beats cleverness | "Prefix the page's docs path with `/llms.mdx` and append `/content.md`." Keep the worked example that follows. |
| DOC-m2 | Minor | Line 31 | "`plytix-docs` is a reasonable name to use" — hedged where it could be direct. | `style-guide.md`, Binary language over "it depends" | "Use `plytix-docs` as the server name." |

### Checklist results

| Group | Result | Finding |
|---|---|---|
| Content | **Fail** | DOC-M1 |
| Terminology | Pass | |
| Structure | **Fail** | DOC-M2, DOC-M3 |
| Formatting | **Fail** | DOC-M2 |
| Style | **Fail** | DOC-m1, DOC-m2 |
| Output | Pass | |

---

## The `platform-mcp/` section (six pages)

All six are marked "Draft, blocked on flags" in `information-architecture.md`, and that assessment stands. Before the per-page findings, one problem applies to the whole section.

### Section-wide blocker

**PMCP-B0 — Blocker — all six pages.** The section contains **33 writer flags**, every one of them inside an `{/* ... */}` MDX comment. `projectConvention.md` is explicit: "when a `FLAG` from the Writer skill has to stay visible on a page, use `<Callout type="warn" title="FLAG">`. This is the pattern the existing guides use." None of these do. The rendered result is six pages of confident, present-tense prose about a product that does not exist yet, with no visible caveat anywhere: "Once it's connected and authorized, an assistant such as Claude, ChatGPT, or Gemini can search your products, read your categories and attributes, and change data within the limits of its role" ([index.mdx:25](fumadocs/content/docs/guides/platform-mcp/index.mdx#L25)). `glossary.md`'s MCP Server entry is `[PENDING]`: "Not yet live at time of writing."

**Fix:** before any of these six can be published, each needs a visible `<Callout type="warn">` at the top stating that the Platform MCP is not released, and the present-tense prose needs rewriting to conditional. If publishing is not imminent, the cheaper option is to leave all six out of `guides/meta.json` until the feature ships — they are currently listed, so they will render in the sidebar.

---

### Plytix Platform MCP

**File:** `fumadocs/content/docs/guides/platform-mcp/index.mdx`
**Page type:** Concept
**Verdict:** Needs rewrite

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| PM1-B1 | Blocker | Lines 23-27, 43-51, 61-67 | Roadmap feature written as shipped, throughout. See PMCP-B0. | `checklist.md`, Content; `glossary.md`, MCP Server (`[PENDING]`); `information-architecture.md`, Guides → Plytix MCPs | Add the visible not-released callout and move the prose to conditional. |
| PM1-M1 | Major | Lines 36, 37 | The comparison table's "Sign-in" and "Can it change anything" cells carry `{/* [PENDING] */}` comments, which render as nothing. The table reads as confirmed. | `projectConvention.md`, Writer flags | Mark unconfirmed rows in the visible table text, e.g. "Required (unconfirmed)". |
| PM1-M2 | Major | Line 67 | "Channels and account administration are configured in Plytix, so an agent can prepare work for them but can't set them up." Correct per the IA Notes, but it sits alongside `available-tools.mdx` and `permissions-and-security.mdx`, which both tell the reader to "use Destinations" for the same need. Destinations is `[PENDING]` and not live. | `glossary.md`, Destinations; `information-architecture.md`, Notes | Keep this page's wording (it's the safest of the three) and bring the other two into line. See PM4-B1. |
| PM1-m1 | Minor | Line 45 | "The Platform MCP covers the PIM v3 resource surface" — "the PIM" is a banned vague platform reference. | `style-guide.md`, Project-specific overrides (Vague platform references) | "the Plytix PIM v3 resource surface". |

---

### Authentication and OAuth setup

**File:** `fumadocs/content/docs/guides/platform-mcp/authentication-and-oauth-setup.mdx`
**Page type:** How-to guide
**Verdict:** Needs rewrite

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| PM2-B1 | Blocker | Lines 14-23, and step 4 at lines 71-75 | The unresolved `[CONFLICT]` decides the page's title and its central step, and step 4 ("Complete the authorization") is **empty** — it contains nothing but a comment. A reader following the procedure hits a numbered step with no content. The conflict itself is real: the confirmed v3 flow is the non-OAuth key/password exchange at `auth.plytix.com/auth/api/get-token`, while the outline assumes OAuth. | `checklist.md`, Content; `page-types.md`, How-to guide | **Needs source.** Get the answer from Plytix, then write one flow. Until then this page should not be in `meta.json`. |
| PM2-B2 | Blocker | Whole page | Roadmap feature written as a procedure. See PMCP-B0. 11 flags, all invisible. | `checklist.md`, Content | As PMCP-B0. |
| PM2-M1 | Major | Lines 103-118 | Troubleshooting is a bullet list with `**Problem:** / **Solution:** / **Prevention:**` labels, no lead-in. | `style-guide.md`, Troubleshooting format | Convert to `Accordions` with prose. |
| PM2-M2 | Major | Line 111 | A `{/* ... */}` comment sits mid-sentence between "…for long-running integrations." and "Keep agent-driven jobs short", so the rendered text runs the two together with no space. | `projectConvention.md`, Writer flags | Move the comment out of the sentence; add the missing space. |
| PM2-m1 | Minor | Line 51 | Sign-in path given as `accounts.plytix.com` → **API** tab → **Create API Key**, with "reveal the **API password** with the eye icon". [quickstart.mdx](fumadocs/content/docs/guides/quickstart.mdx#L29) says to copy both "using the clipboard icon". Two pages, two interactions. | `style-guide.md`, User interface elements | Confirm once and align all three pages (see ERP-m1). |

---

### Supported clients

**File:** `fumadocs/content/docs/guides/platform-mcp/supported-clients.mdx`
**Page type:** Reference
**Verdict:** Needs rewrite

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| PM3-B1 | Blocker | Line 16, and the whole client table | The page's compatibility criterion is "connect to a remote MCP server over HTTP, and complete an OAuth sign-in to that server." Both halves are assumed. The page's own flag (lines 18-24) admits "the transport and authorization method are assumed, not confirmed," and asks three questions nobody has answered. The seven-row client table then grades real products against an unconfirmed requirement, invisibly. | `checklist.md`, Content; `glossary.md`, MCP Server (`[PENDING]`) | **Needs source.** The transport and auth method are prerequisites for this page existing. |
| PM3-M1 | Major | Lines 40-50 | The client table's claims about Claude Code, Claude Desktop, Cursor, VS Code, ChatGPT, Windsurf, and Gemini CLI are third-party product capabilities with no citation and a self-admitted "reflects client capabilities at the time of writing, not a test." Published as a Reference page, it reads as authoritative. | `page-types.md`, Reference ("definitive, structured, scannable facts"); `checklist.md`, Content | Either cite each client's own documentation inline, or move this to a short prose section that says what to check rather than asserting per-client answers. |
| PM3-M2 | Major | Lines 68-72 | "Clients that only run local servers" recommends putting "a local bridge in front of it," then says "it adds a component that Plytix doesn't support or maintain." Advice given and withdrawn in two sentences, with no named tool. | `style-guide.md`, Binary language over "it depends" | Either name a bridge and state the caveat once, or cut the section and say remote support is required. |
| PM3-m1 | Minor | Lines 47-48 | Two table cells read "Verify" in the OAuth column, which is an instruction, not a value. | `page-types.md`, Reference ("If a field has accepted values, list them explicitly") | Use "Unconfirmed" and explain once below the table. |

---

### Available tools

**File:** `fumadocs/content/docs/guides/platform-mcp/available-tools.mdx`
**Page type:** Reference
**Verdict:** Needs rewrite

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| PM4-B1 | Blocker | Line 91 | "**Channel configuration**, per the standing rule above, is done in the Plytix interface. Use Destinations to work with channel-eligible products programmatically." Destinations is `[PENDING]` in `glossary.md`: "Not yet fully live at time of writing — confirm shipped status before publishing." This is an imperative instruction to use an unreleased feature. The same sentence appears on [permissions-and-security.mdx:97](fumadocs/content/docs/guides/platform-mcp/permissions-and-security.mdx#L97) and [practical-examples.mdx:104](fumadocs/content/docs/guides/platform-mcp/practical-examples.mdx#L104). | `checklist.md`, Content (roadmap feature presented as shipped); `glossary.md`, Destinations | Reword on all three pages so Destinations is named as the planned path, not the current one: "Plytix plans to expose this through Destinations; today, channel-eligible products are managed in the Plytix interface." |
| PM4-M1 | Major | Line 91 | "per the standing rule above" refers to a rule that is not on this page. It appears to reference `information-architecture.md`'s Notes, which readers can't see. | `style-guide.md`, Noun precision | Delete the clause or state the rule. |
| PM4-M2 | Major | Lines 45, 48 | The table gives "Family attributes" and "Product relationships" a Write column of "Create, update, delete". In `openapi_pimv3.json`, `/api/v3/family-attributes` and `/api/v3/product-relationships` are **GET only**. The writes exist, but on different paths: `/api/v3/product-families/{product_family_id}/attributes[/{attribute_id}]` and `/api/v3/products/{product_id}/relationships/{relationship_id}`. As written, a reader (or an agent) will look for writes on the top-level search endpoints and not find them. | `openapi_pimv3.json` | Split the rows, or add a Notes column naming the write path. Worth also flagging quirk #59: those two top-level search endpoints plus `/related-products` return records from **other Plytix accounts** when called with no filter, which is open question #21 and unresolved. A page telling an agent to search them needs that warning. |
| PM4-M3 | Major | Lines 10-19, 30 | Two unresolved FLAGs, invisible, including the one that says the entire resource-to-tool mapping is unconfirmed and "Don't invent tool names to fill the gap." | `checklist.md`, Content | Surface as a visible callout, per PMCP-B0. |
| PM4-m1 | Minor | Line 36 | "The core of the PIM, and where most agent work happens." | `style-guide.md`, Project-specific overrides (Vague platform references) | "The core of Plytix PIM". |

---

### Permissions and security considerations

**File:** `fumadocs/content/docs/guides/platform-mcp/permissions-and-security.mdx`
**Page type:** Reference
**Verdict:** Needs rewrite

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| PM5-B1 | Blocker | Line 97 | Same Destinations-as-available instruction as PM4-B1, here inside a section headed "What sits outside the API" — so the page says Channels have no API surface and then tells the reader to use an unreleased API feature for them. | `glossary.md`, Destinations; `checklist.md`, Content | As PM4-B1. |
| PM5-B2 | Blocker | Lines 22-33 | `## OAuth scopes` is an **empty section**: the heading renders with nothing under it, because its entire content is a `{/* ... */}` comment. On a security page, a heading promising scopes and delivering silence is worse than no heading. The flag's own judgment is right: "An incorrect scope table on a security page is worse than an absent one." | `page-types.md`, Reference; `projectConvention.md`, Writer flags | Remove the heading until the scopes exist, or replace the section body with a visible statement that the scope model is not published yet. |
| PM5-M1 | Major | Lines 43-91 | The entire role model (four system roles, 15 custom team roles, the twelve-area permission table, attribute-level permissions) is sourced from `materials/help-center/`, the lowest tier of the trust order, and describes the Plytix interface rather than MCP access. The page's own flag at lines 39-41 says so. Readers see confident tables. | Source trust order; `information-architecture.md`, Guides → Plytix MCPs | Label the tables as the interface role model, visibly, and state that whether MCP access resolves through it is unconfirmed. |
| PM5-M2 | Major | Lines 126-134 | The Process Log section states the Activity view holds "the last 25 completed events," then flags invisibly that it's unconfirmed whether MCP actions appear there at all. The auditing advice ("export or note what you need before it scrolls away") is built on an unverified foundation. | `checklist.md`, Content | Surface the flag. An auditing section that can't say whether agent activity is logged should say that plainly. |
| PM5-m1 | Minor | Lines 52, 54, 66 | "the PIM" three times. | `style-guide.md`, Project-specific overrides (Vague platform references) | "Plytix PIM". |
| PM5-m2 | Minor | Line 3 | `description` mentions "the OAuth scopes" as something the page documents. It documents none. | `style-guide.md`, SEO and metadata | Rewrite once PM5-B2 is settled. |

---

### Practical examples

**File:** `fumadocs/content/docs/guides/platform-mcp/practical-examples.mdx`
**Page type:** How-to guide
**Verdict:** Needs rewrite

| # | Severity | Location | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| PM6-B1 | Blocker | Line 104 | Same Destinations-as-available instruction as PM4-B1, inside a callout about Channels. | `glossary.md`, Destinations; `checklist.md`, Content | As PM4-B1. |
| PM6-B2 | Blocker | Whole page | Four workflows with eight sample prompts, none of which has been run against a working server (the page's own flag at lines 10-12 says so, invisibly) because no server exists. Presented as "four workflows you can hand to an AI assistant." | `checklist.md`, Content | Add the visible not-released callout per PMCP-B0, and don't publish prompts as working until one has been run. |
| PM6-M1 | Major | Lines 133-149 | Troubleshooting is a bullet list with `**Problem:** / **Solution:** / **Prevention:**` labels, no lead-in. | `style-guide.md`, Troubleshooting format; `projectConvention.md`, Components | Convert to `Accordions` with prose. |
| PM6-M2 | Major | Line 131 | Points readers at [Safely remove categories, assets, or relationships](/docs/guides/safely-removing-categories-assets-or-relationships) "for the rules behind this workflow." That page currently carries three Blockers (REM-B1, B2, B3), so the rules it teaches are wrong. | Source trust order | Fix the target page first. Flagged here so the dependency isn't missed. |
| PM6-m1 | Minor | Line 28 | "The prompts are starting points, not magic words." Second wink on the page after line 78's "Pace matters more than you'd think". | `style-guide.md`, Voice and tone (one wink per page) | Keep one. |

---

## Cross-page findings

These recur across pages and are cheaper to fix in one pass than page by page.

| # | Severity | Affects | Issue | Rule | Suggested fix |
|---|---|---|---|---|---|
| **NEW-B1** | **Blocker** | 3 pages: syncing-your-erp, safely-removing, data-model | **[NEW, from live testing]** Every `*_ids` relationship-array field is now rejected on both `POST /products` and `PATCH /products/{id}`: `category_ids`, `static_list_ids`, `channel_ids`, `ecatalog_ids`, `product_data_sheet_ids` each return `422 {"name":"InputDTOValidationError","description":"<field>: Extra inputs are not permitted"}`, although `openapi_pimv3.json` still declares all five on `ProductCreateDto` and `ProductUpdateInputDto`. Affected text: [syncing-your-erp-with-plytix.mdx:88](fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx#L88) ("including `attributes` and `category_ids`, can follow in the same request or a later `PATCH`"), the whole of [safely-removing](fumadocs/content/docs/guides/safely-removing-categories-assets-or-relationships.mdx) steps 1-2, and [data-model.mdx:102](fumadocs/content/docs/guides/data-model.mdx#L102). | `config/api-testing.config.md` quirk #93 | Replace with the link/unlink endpoints that now exist: `POST /products/{id}/categories` with body `{"id":"<category_id>"}` → `201` (`409 AlreadyExists` on a duplicate), and `DELETE /products/{id}/categories/{category_id}` → `204`, scoped and safe (quirk #94). Captured examples are in `bruno-collection/02-Products-v3/Link Category to Product.bru` and `Unlink Category from Product.bru`. **Note the asymmetry worth documenting:** this pattern exists for categories and relationships only — `POST /products/{id}/assets` returns `405` and `DELETE /products/{id}/assets/{id}` returns `404`, so with `*_ids` gone there is now **no way at all** to attach or detach a non-thumbnail asset (quirk #96). |
| X1 | Major | 6 pages: exporting, auditing, building, safely-removing, reconstructing, bulk | Procedure section titled `## Steps`. Quickstart uses `## Integration Steps`. | `style-guide.md`, Procedure section headings (decided 2026-10-06) | Replace each with a task-based heading derived from the page title. |
| X2 | Major | 6 pages: exporting, auditing, building, bulk, reconstructing, safely-removing | `## Prerequisites` starts directly with a bullet list, no lead-in sentence. | `style-guide.md`, Lead-in text before lists and accordions (decided 2026-10-06) | Add "Before you start, make sure you have the following:" to each. |
| X3 | Major | 4 pages: exporting, documentation-mcp, platform-mcp/authentication, platform-mcp/practical-examples | Troubleshooting uses `**Problem:** / **Solution:** / **Prevention:**` bullets. | `style-guide.md`, Troubleshooting format (decided 2026-10-06); `projectConvention.md`, Components | Convert each to `Accordions` with one `Accordion` per problem and prose bodies. [syncing-your-erp-with-plytix.mdx](fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx#L99) is the model. |
| X4 | Major | 8 plain-text references across 6 pages | Other pages referenced by quoted title instead of a link, all in the pre-rename title case: `"Filtering, Sorting & Pagination"`, `"Building a Smart product list" in Core Concepts` (×2), `"Syncing Your ERP with Plytix"` (×2), `"Exporting Your Full Catalog"`, `"Build a Marketplace-Specific Product Feed"`, and "the Quickstart guide" (×6). | `style-guide.md`, Links and callouts; Access token step in integration guides | Convert all to markdown links. Two of these targets don't exist (see AUD-M1, AUD-M2) and need a decision first. |
| X5 | Minor | 8 cards across 7 pages | `Card` titles use the pages' pre-rename title-case names: "Auditing Product Data Quality with Filters", "Build a Marketplace-Specific Product Feed", "Exporting Your Full Catalog", "Get Started", "Getting Notified: Webhooks & Automations", "Reconstructing Parent/Variant Hierarchies", "Safely Removing Categories, Assets, or Relationships from a Product", "Syncing Your ERP with Plytix". | `style-guide.md`, "Related articles" section; Headings (sentence case) | Match each card title to its target page's frontmatter `title` exactly. |
| X6 | Major | 7 pages: exporting, auditing, building, safely-removing, reconstructing, bulk, getting-notified | `## Related articles` opens directly with `<Cards>`, missing the required opening sentence. | `style-guide.md`, "Related articles" section ("Open with one sentence") | Add "Now that you know how to [task], you can explore these related guides." |
| X7 | Minor | 9 pages | `description` under 120 characters: overview (103), quickstart (95), exporting (90), auditing (102), building (102), safely-removing (103), reconstructing (76), bulk (103), getting-notified (98). Five also don't start with an action verb. | `style-guide.md`, SEO and metadata (120-155, begin with an action verb) | Rewrite each. |
| X8 | Major | 33 flags across 12 pages | Every writer flag is an `{/* ... */}` MDX comment, so none reaches the reader. Distribution: platform-mcp/authentication 11, platform-mcp/permissions 8, platform-mcp/supported-clients 6, building 4, platform-mcp/index 4, bulk 2, getting-notified 2, reconstructing 2, safely-removing 2, platform-mcp/available-tools 2, platform-mcp/practical-examples 2, auditing 1, documentation-mcp 1, exporting 1, quickstart 1 (the last as a broken `<callout>` tag). | `projectConvention.md`, Writer flags in published drafts; `checklist.md`, Content | Decide per flag: resolve it, or convert to `<Callout type="warn" title="FLAG">`. Several are now answerable from `config/api-testing.config.md` without asking Plytix (EXP-M7, FEED-M1, HIER-M2). |
| X9 | ~~Major~~ **Minor** | 6 pages | **[REVISED after testing]** Base URL `https://pim.plytix.com/api/v3` in every code sample. The first pass flagged this because the config recorded a `503 "name resolution failed"` on that host. Re-tested 2026-10-08: it now returns `401 {"detail": "Unauthorized"}` to a dev-environment token, which proves the host routes v3 and the service answers — it just rejects a token minted for the other environment. The guides are most likely correct. | `config/api-testing.config.md` quirk #103 | Downgraded from "probably wrong" to "confirm once." `bruno-collection/.env` no longer holds the prod "API Docs" credentials, so this could not be exercised end to end. Ask Plytix to re-issue a prod key pair, run one `GET /api/v3/products` against it, then close. No text change expected. |

---

## Reference drift and gaps

**Drift — `glossary.md`, Product Family entry.** Reads: "**API constraint:** creating a family, choosing its attributes, and configuring inheritance are dashboard-only. The API can assign a product into an existing family via `product_family_id` but can't build one. Confirmed by this project's endpoint testing." That testing has since been superseded. `openapi_pimv3.json` declares `POST /api/v3/product-families` and `POST /api/v3/product-families/{product_family_id}/attributes`, and quirks #60 and #61 confirm both live. This glossary entry is the upstream source of DM-B1 and HIER-B2 — fix it first, or the same error gets rewritten.
*Suggested update:* families are creatable, renameable, and deletable through the API, and attributes can be linked to them. What is gated is changing an existing link's `level`, which returns `403 "Automatic inheritance is not available for this account"` on the tested account.

**Drift — `glossary.md`, Relationship entry.** Reads "Account-level entity. Read from a product through its `product_relationships` field," which implies read-only. `POST`/`PATCH`/`DELETE` all exist on `/api/v3/products/{product_id}/relationships/{relationship_id}`, and quirk #62 confirms the `DELETE` is the one safe scoped unlink in v3. Upstream source of REM-B2 and DM-M1.

**Drift — `information-architecture.md`, Guides → Integration Guides table.** Two titles no longer match the pages: "Sync your ERP with Plytix" (page title is now "Sync your ERP", per the 2026-10-06 suffix rule) and "Bulk Operations for Large Catalogs" (title case, which the Headings rule forbids). Also, `information-architecture.md` has not been updated since the 2026-10-06 style decisions, so its titles still reflect the pre-rename state.

**Drift — `information-architecture.md`, Notes, Channels entry.** The standing rule says guides must treat Channels as UI-only until the conflict is resolved. [building-marketplace-specific-product-feeds.mdx](fumadocs/content/docs/guides/building-marketplace-specific-product-feeds.mdx) was written against the opposite rule. One of the two has to move. See FEED-B1.

**Gap — flag visibility.** `projectConvention.md` says a flag that "has to stay visible on a page" uses a `Callout`, but nothing states when a flag has to stay visible versus when an MDX comment is acceptable. Every page in this set chose the comment, including for flags that materially change what the reader should do. *Suggested rule:* a flag that affects what the reader does — an untested sample, an unreleased feature, a placeholder URL — is a visible `Callout`. A flag that only affects what the writer does next can stay a comment.

**Gap — base URL.** `projectConvention.md` records the docs Base URL as `[PENDING]` but says nothing about the **API** base URL the samples should use. Twelve pages picked `pim.plytix.com` independently. *Suggested addition:* record the canonical API base URL per version in `projectConvention.md` once Plytix confirms it.

**Gap — attribution for `API V3.md`.** Three pages use the phrase "even though some Plytix API documentation describes `POST` as returning only an ID," which is vague where the project has a precise citation (`API V3.md`'s response-conventions section; the Oct 8 status map, p. 16-17, confirms `POST` → `201` with an ID and `PATCH` → `204`). *Suggested addition:* a style rule on how to cite Plytix's internal design docs in reader-facing prose, or a decision not to cite them at all.

---

## Checklist matrix

Every item from `checklist.md`, with the pages that fail it. Items with no pages listed pass across all 18.

| Checklist item | Failing pages | Findings |
|---|---|---|
| All information comes from the source material | data-model, safely-removing, reconstructing | DM-B1, DM-B2, REM-B1, REM-B2, REM-B3, HIER-B1, HIER-B2 |
| No product behavior implied without being stated in the source | auditing, reconstructing, getting-notified, bulk, platform-mcp (all 6) | AUD-M5, HIER-M2, NOTE-M1, BULK-m2, PM3-M1, PM6-B2 |
| Page doesn't imply an API exists when it's UI-only | building, platform-mcp/available-tools, platform-mcp/permissions, platform-mcp/practical-examples | FEED-B1, PM4-B1, PM5-B1, PM6-B1 |
| Versioned behavior states which API version it applies to | bulk | BULK-M4 |
| All flags resolved or escalated | 15 of 18 pages | X8, and per-page flag findings |
| Terms match `glossary.md` | data-model, getting-notified | DM-m2, NOTE-m1 |
| No undefined terms remain | — | |
| Page type structure correctly applied | overview, quickstart, supported-clients, permissions | OV-M1, QS-M4, QS-M5, PM3-M1, PM5-B2 |
| Frontmatter `title` present and accurate; no `# H1` in body | — | (no body H1 found on any page) |
| No headings deeper than H3 | — | |
| Numbered steps for sequences, bullets for non-sequential | — | |
| Lead-in before every list and accordion group | 6 pages | X2, EXP-M2, AUD-M4, FEED-M4, REM-M3, HIER-M3, BULK-M3, DOC-M3 |
| How-to intro is detailed (scope, conventions, links, warnings) | exporting, auditing, bulk | (thin intros; folded into page findings) |
| Procedure section not titled "Steps"; no "with Plytix" suffix | 7 pages | X1, QS-m1 |
| Guides other than Authentication/Quickstart don't show `get-token` | — | (all comply; six link in plain text instead — X4) |
| Troubleshooting uses Accordions, endpoint names in code, unique `value` | 4 pages | X3 |
| Accordion bodies are prose, no "Solution:"/"Prevention:" labels | 4 pages | X3 |
| Frontmatter complete, no fields Fumadocs strips | — | (no stripped fields found) |
| All components listed in `projectConvention.md`; icons imported | quickstart | QS-M1, QS-M2, QS-M3 (all icons verified imported and used across all 18) |
| UI labels bold; paths and values in code style | quickstart, syncing, platform-mcp/authentication | ERP-m1, PM2-m1 |
| All code blocks include a language identifier | — | (verified: every opening fence has a language) |
| Active voice throughout | getting-notified | NOTE-M2 |
| Present tense for product behavior | platform-mcp (all 6) | PMCP-B0 |
| No filler phrases | — | |
| No AI-generated words | quickstart | QS-m2 |
| Roughly 7th-8th grade reading level | documentation-mcp | DOC-m1 |
| No em dash or en dash | exporting | EXP-m1 |
| Alt text 125 characters or fewer, starts with the subject | — | N/A: no images on any page in this set |
| Humor capped at one wink per page | data-model, platform-mcp/practical-examples | DM-m3, PM6-m1 |
| Saved to the correct path and listed in `meta.json` | — | (all 18 present and listed; all internal `/docs/` links verified to resolve) |

---

## Out of scope

- **The `platform-mcp/` section's place in the sidebar.** All six pages are listed in `guides/meta.json` and will render, though none is publishable. Whether to delist them until the feature ships is an IA decision, not a page-level one. Recommend the `docs-ia` skill.
- **A "what the API does and doesn't expose" reference page.** `information-architecture.md`'s Notes already call for one ("Customers frequently spend support time looking for endpoints that don't exist… don't let this fall through as 'covered elsewhere'"). Four pages in this set each carry their own partial version of that content ("What you can't do through the API yet", "What you can't do", "What has no tool", "What sits outside the API"), and they don't agree with each other. That's the symptom the IA note predicted.
- **Resolving the `pim.plytix.com` vs `pim.dev.plytix.com` question (X9).** Now narrowed to one confirming call, but it needs a prod credential Plytix has to re-issue.
- ~~**Running `endpoint-tester` to close the flags that are testable.**~~ — **done 2026-10-08.** Results are folded into the findings above and recorded in `config/api-testing.config.md` quirks #93-#103, status-gating rules #4-#5, open questions #29-#35, and `bruno-collection/02-Products-v3/README.md`. Two new Bruno files capture the new link/unlink endpoints. Outcome: four flags closed (EXP-M7, REM-M2, FEED-M1, NOTE-M1), two could not close (HIER-M1/M2 blocked by a feature gate, BULK-m2 blocked by unreachable rate limiting), and four new Blockers surfaced.

## Questions for Plytix arising from this review

Seven new open questions went into `config/api-testing.config.md` (#29-#35). Three of them block documentation and should go in the next conversation with Plytix:

1. **Was removing `category_ids` and the other four `*_ids` fields from `POST`/`PATCH /products` intentional, and will `openapi_pimv3.json` be corrected?** The spec still declares all five. Three published guides teach a call that now `422`s. (Open question #29.)
2. **Is an asset link/unlink endpoint coming?** With `*_ids` gone and no `POST`/`DELETE` on `/products/{id}/assets`, there is currently no way to attach or detach a non-thumbnail asset through the API at all. That is a capability regression, not a documentation gap. (Open question #30.)
3. **`icontains` or `contains:ignorecase`?** The supported spelling flipped between 2026-10-01 and 2026-10-08. Also worth asking what the undocumented `includes`/`!includes` operators do. (Open question #31.)

Three more are straightforward bug reports: the `502` on a channel validation case (#32), the silently-discarded channel `webhook` block (#33), and rate limits that are advertised in the token but not enforced (#34).
