# Review session: 2026-10-09

Scope: the "Overview" group of the v3 API reference (`fumadocs/content/docs/reference/v3/`, as listed in `meta.json`). Mode: report only. Nothing was edited.

Sources checked: `openapi_pimv3_20261002 (Latest spec).json`, `materials/api-references/API V3.md`, `information-architecture.md`, the rules in `style-guide.md`, `projectConvention.md`, `page-types.md` and `checklist.md` (including the rules added 2026-10-06 to 2026-10-09). All internal links and Card hrefs on these seven pages resolve. All seven pages are listed in `meta.json`.

| Page | File path | Page type | Verdict | Blocker | Major | Minor | Nit | Status |
|---|---|---|---|---|---|---|---|---|
| API Reference Overview | `reference/v3/index.mdx` | Landing / reference | Needs rewrite | 1 | 2 | 3 | 0 | Reviewed |
| Authentication | `reference/v3/authentication.mdx` | Reference | Approve with changes | 0 | 0 | 3 | 1 | Reviewed |
| Errors and Status Codes | `reference/v3/errors-status-codes.mdx` | Reference | Approve with changes | 0 | 2 | 3 | 0 | Reviewed |
| Rate Limits | `reference/v3/rate-limits.mdx` | Reference | Approve with changes | 0 | 0 | 3 | 1 | Reviewed |
| Filtering and Query Syntax | `reference/v3/filtering-query-syntax.mdx` | Reference | Approve with changes | 0 | 1 | 1 | 0 | Reviewed |
| Pagination | `reference/v3/pagination.mdx` | Reference | Approve with changes | 0 | 1 | 3 | 0 | Reviewed |
| Working with Updates and Deletes | `reference/v3/updates-and-deletes.mdx` | Reference | Approve with changes | 0 | 0 | 2 | 1 | Reviewed |

## Cross-page patterns

These repeat across pages. Fix them once as a sweep.

| Pattern | Pages | Rule |
|---|---|---|
| Page title in Title Case | index, errors, rate-limits, filtering, updates | style-guide.md, Page titles and Heading convention (sentence case; only proper nouns capitalized) |
| `description` outside 120-155 characters and not starting with an action verb | index (59), authentication (75), errors (69), rate-limits (64) | style-guide.md, SEO and metadata |
| Bullet list directly under a heading with no lead-in sentence | pagination (`## Page without surprises`), updates (`## Write safely`) | style-guide.md, Lead-in text before lists and accordions |
| Heading not imperative or task-based | pagination "Page without surprises", updates "Working with..." | style-guide.md, Headings |

---

## API Reference Overview

**File:** `fumadocs/content/docs/reference/v3/index.mdx`
**Page type:** Landing / section index (Cards used as primary navigation, so the two-card cap doesn't apply)
**Mode:** Report only
**Verdict:** Needs rewrite

### Summary

The page states that Product Families, Product Family Models, and Relationships are read-only, which the latest spec contradicts. Fix that before anything else. The page also lists only two of the six overview pages under "Core concepts", so readers can't find rate limits, filtering, pagination, or writes from here.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Blocker | Final line 99, and the card text for Product Families (line 56), Product Family Models (59), Relationships (68) | Says these are "read-only". The latest spec defines `POST /product-families`, `PATCH` and `DELETE /product-families/{identifier}`, and `POST /relationships`, `PATCH` and `DELETE /relationships/{identifier}`. Product Family Models has no path in the spec at all (the generated page folder only has `get_*` pages). | Source trust order: OpenAPI spec over prose; checklist.md, Content | Remove "Read-only." from the cards and delete the closing sentence. Confirm Product Family Models write support with the project lead or endpoint-tester before keeping any claim about it. | Needs source |
| 2 | Major | `## Core concepts`, lines 35-42 | Only Authentication and Errors are listed. Rate limits, Filtering and Query Syntax, Pagination, and Updates and Deletes are siblings in the Overview group but have no card here. | page-types.md, Reference (links to related pages); information-architecture.md | Add cards for the four missing pages (landing pages are not capped). | Open |
| 3 | Major | `## Available services`, lines 48-97 | Product Relationships, Related Products, and Family Attributes are in the spec and in the `meta.json` sidebar but have no card, while the page says each resource "is fully documented". | Accuracy; information-architecture.md | Add cards, or reword line 46 so it doesn't claim completeness. | Open |
| 4 | Minor | Line 29 | "with confidence" | style-guide.md, Words and phrases to avoid | Delete: "...to your Plytix account, so you can sync..." | Open |
| 5 | Minor | Frontmatter `title` | "API Reference Overview" is Title Case | style-guide.md, Page titles | "API reference overview" ("API" stays capitalized) | Open |
| 6 | Minor | Frontmatter `description` | 59 characters, doesn't start with an action verb | style-guide.md, SEO and metadata | e.g. "Learn how the v3 API reference is organized, which resources it covers, and where to start with authentication and paging." | Open |

### Checklist results

| Checklist item | Result | Finding # |
|---|---|---|
| All information comes from the source material | Fail | 1 |
| Versioned behavior states the API version | Pass (page sits under v3) | |
| Page doesn't imply an API for UI-only features | Pass (Channels have an API per the IA Notes 2026-10-09) | |
| Terms match glossary.md | Pass | |
| Page type structure | Pass | |
| Frontmatter title present, no body H1 | Pass | |
| No headings deeper than H3 | Pass | |
| Lead-in before every list/accordion group | Pass (Cards groups have lead-in text) | |
| No banned words | Fail | 4 |
| Sentence-case title, description 120-155 | Fail | 5, 6 |
| Components registered and every icon imported | Pass | |
| Listed in `meta.json` | Pass | |

### Out of scope

- Whether the Overview group needs an API entity-coverage page (IA Notes flag this as a required future addition). Recommend `docs-ia`.

---

## Authentication

**File:** `fumadocs/content/docs/reference/v3/authentication.mdx`
**Page type:** Reference
**Mode:** Report only
**Verdict:** Approve with changes

### Summary

Accurate and well structured. The fixes are metadata and consistency: the description is short, and the 401 label differs from the Errors page.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Minor | Frontmatter `description` | 75 characters, no action verb | style-guide.md, SEO and metadata | e.g. "Reference for exchanging an API key and password for a bearer token, using it in requests, and how long it stays valid." | Open |
| 2 | Minor | `## Error responses`, line 63 | "401 UNAUTHORIZED" here, "401 AUTH FAILED" on the Errors page for the same status | style-guide.md, Core principles (Consistency) | Use one label on both pages (confirm which the API actually returns). | Open |
| 3 | Minor | `## Error responses`, line 62 | The 400 row has prose in a column titled "Example response", while the 401 row has JSON | style-guide.md, Tables | Show an example 400 body, or rename the column "Response". | Open |
| 4 | Nit | Lines 8 and 10 | Two intro paragraphs; the second restates the first | style-guide.md, Introductions | Merge into one. | Open |

### Checklist results

Pass on all items except description length (finding 1) and the Consistency principle (finding 2). The token request is correctly shown here, because this is the Authentication page. The 15-minute expiry has no spec source in the OpenAPI file; it matches the project's testing notes, so no finding.

---

## Errors and Status Codes

**File:** `fumadocs/content/docs/reference/v3/errors-status-codes.mdx`
**Page type:** Reference
**Mode:** Report only
**Verdict:** Approve with changes

### Summary

Content is sound, but the second half is built from accordions with broken indentation and a duplicated sentence, which may render wrongly. The deprecation callout uses a non-registered type alias.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Major | Lines 66-97 | "Each entry in `errors` is an `Error` object:" appears twice (line 66 and inside the first accordion, line 69). The accordion's table is indented one space and the 422 accordion's code fence and table are not indented to the accordion body, so they may not render as a table or code block. | projectConvention.md, Components; checklist.md, Formatting | Delete line 66. Indent the table and the JSON fence to the same level as the accordion text, and put a blank line before each table. Preview the page after fixing. | Open |
| 2 | Major | Line 10 | `<Callout type="warning"...>` | projectConvention.md, Callout Types ("use `warn`, not the `warning` alias") | Change to `type="warn"`. | Open |
| 3 | Minor | Frontmatter `title` and `description` | Title Case; description 69 characters, no action verb | style-guide.md, Page titles and SEO | "Errors and status codes"; "Reference for the HTTP status codes and error response shapes the Plytix API returns." (check length) | Open |
| 4 | Minor | Line 31 | "401 AUTH FAILED" differs from Authentication page ("401 UNAUTHORIZED") | Consistency principle | Align both pages. | Open |
| 5 | Minor | Lines 54-64 | Code fence follows a sentence with no blank line | style-guide.md, Formatting | Add a blank line before the fence. | Open |

### Checklist results

Fail: Formatting (components render correctly), callout type. The status code list and the `422` shape match the spec's declared responses (200 and 422); the spec doesn't define 202, 428, 429, or the `X-Plytix-Deprecation` header, which come from `API V3.md` and the Postman collection, so they carry no spec conflict.

---

## Rate Limits

**File:** `fumadocs/content/docs/reference/v3/rate-limits.mdx`
**Page type:** Reference
**Mode:** Report only
**Verdict:** Approve with changes

### Summary

Clear and honest about what isn't confirmed. Only metadata and small style fixes remain.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Minor | Frontmatter | Title Case ("Rate Limits"); description 64 characters, no action verb | style-guide.md, Page titles and SEO | "Rate limits"; "Learn how Plytix API rate limits work, what happens when you exceed them, and where to find the limits for your plan." | Open |
| 2 | Minor | Line 10-11 | The callout tells readers to check the pricing page, but `materials/` says the public pricing page does not list the limits. | Accuracy; source trust order | Remove the pricing-page link. Keep "ask your account manager", and state that limits are also carried in your access token's claims (as the Pagination page already does). | Open |
| 3 | Minor | Lines 25-26 | Two blank lines before `## Related resources` | style-guide.md, Formatting | Remove one. | Open |
| 4 | Nit | Line 16 | The paragraph carries two limit pairs, windows, and the double-counting rule in one block | style-guide.md, Don't pack parallel facts into one paragraph | Bullet the two standard limit pairs under a lead-in sentence. | Open |

### Checklist results

Pass except finding 1 and 2. The specific numbers (20 or 50 requests per 10 seconds, 2,000 or 5,000 per hour) are confirmed in `materials/` only through a support ticket. Keep them as written, since the page already says other values exist.

---

## Filtering and Query Syntax

**File:** `fumadocs/content/docs/reference/v3/filtering-query-syntax.mdx`
**Page type:** Reference
**Mode:** Report only
**Verdict:** Approve with changes

### Summary

The most complete page in the group, and the only one with a TL;DR. The main problem is a table row that will break column layout.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Major | `## Reserved and forbidden names`, line 188 | The row `Names containing \`.\`, \`[\`, or \`|\` are not valid` has a pipe inside a table cell. Markdown splits the cell at the pipe, even in code. | checklist.md, Formatting (renders correctly) | Escape it as `\|` inside the code span, or move this rule out of the table into a sentence. | Open |
| 2 | Minor | Frontmatter `title` | "Filtering and Query Syntax" is Title Case | style-guide.md, Page titles | "Filtering and query syntax" | Open |


### Checklist results

Pass except finding 1 and 2. The `_page_size` and filter operators were not re-tested live. Recommend `endpoint-tester` for the `_or`/`_and` nesting examples and `_include_unfiltered_entities`, which the page itself marks "Spec only, not yet tested."

---

## Pagination

**File:** `fumadocs/content/docs/reference/v3/pagination.mdx`
**Page type:** Reference
**Mode:** Report only
**Verdict:** Approve with changes

### Summary

Strong, with correct page-size bounds (1 to 1000, default 25) matching the spec. It misstates sort order, and the closing list breaks the new lead-in rule.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Major | `## Request parameters`, line 111 | `_sort_by` is described as "Field to sort by, ascending". The spec says "Field to sort by. Prefix with `-` for descending." The page leaves out descending sort. | Source trust order (spec); checklist.md, Content | "Field to sort by. Prefix with `-` for descending." Verify with endpoint-tester. | Needs source |
| 2 | Minor | `## Page without surprises`, line 149 | Bullet list starts directly under the heading, and the heading isn't imperative | style-guide.md, Lead-in text and Headings | Rename to "Page through results safely" and add "Keep these points in mind when you page through a large result set:". | Open |
| 3 | Minor | Line 150 | "quick succession" | style-guide.md, Words and phrases to avoid | "rapid succession" or "many requests close together" | Open |
| 4 | Minor | Frontmatter `title` | The title "Pagination" is fine; the H3 "Follow the link, but fix the scheme" is not a verb-first heading. | style-guide.md, Headings | "Fix the link scheme before following it" | Open |

### Checklist results

Pass except the items above. The `http://` redirect and `301` behavior is documented as observed; confirm it hasn't changed since the spec update.

---

## Working with Updates and Deletes

**File:** `fumadocs/content/docs/reference/v3/updates-and-deletes.mdx`
**Page type:** Reference
**Mode:** Report only
**Verdict:** Approve with changes

### Summary

Accurate and consistent with the Sync guide on the `attributes` replacement behavior. Fixes are the title, the closing list, and one claim to source.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Minor | Frontmatter `title` | "Working with Updates and Deletes" is Title Case and not an active, verb-first title | style-guide.md, Page titles and Headings | "Update and delete records" | Open |
| 2 | Minor | `## Write safely`, line 123 | Bullet list directly under the heading with no lead-in | style-guide.md, Lead-in text before lists | Add "Follow these practices when you write to the API:" | Open |
| 3 | Nit | Line 115 | JSON Patch (`application/json-patch+json`, RFC 6902) is not in the OpenAPI spec; it appears in `API V3.md`. The page claims it as supported. | Source trust order | Keep, and confirm with endpoint-tester that a v3 PATCH accepts this content type. | Needs source |


### Checklist results

Pass except findings 1 and 2. Finding 3 recommends `endpoint-tester`.

---

## Reference drift and gaps

- **Reference gap (style-guide.md):** no rule says how to label the same HTTP status consistently across pages (401 UNAUTHORIZED vs AUTH FAILED). Suggested addition: "Use the spec's exact status text in tables, and the same label on every page."
- **Reference gap (page-types.md):** the Reference template has no guidance for a section-index/landing page such as `index.mdx`, which is why the "core concepts" omission wasn't caught by a template rule.
- **Reference drift (`CLAUDE.md`):** still describes "no docs content has been written yet" and "no docs/ output directory". Out of date, though it doesn't affect this review.

## Out of scope

- An API entity-coverage reference page (flagged in the IA Notes) belongs to `docs-ia`.
- Product Family Models write support and JSON Patch need live confirmation: recommend `endpoint-tester`.

---

## Fix pass (2026-10-09)

All Open findings were applied. Remaining items:

- **Needs source:** Product Family Models write support (the "Read-only" claim was removed rather than replaced), `_sort_by` descending (taken from the spec, not live-tested), and JSON Patch on PATCH (unchanged).
- **Not changed:** the Rate Limits paragraph was split into a short list; the 401 label is now "401 AUTH FAILED" on both pages, which should be confirmed against a live response.
- Page titles were renamed on index, errors, rate-limits, filtering, and updates; inbound links in the guides were updated to match.

---

## Legacy (V1/V2) Overview review and fixes (2026-10-09)

Scope: the six pages in the Overview group of `reference/legacy/` (`api-v1-v2-reference`, `token-authentication`, `errors-status-codes`, `rate-limits`, `filtering-and-search`, `pagination`). Sources: `openapi_pimv1.json` (itself converted from the V1 Postman collection, so it adds no independent confirmation), the pages' own open `FLAG` comments, and the v3 review above. All links and Card hrefs resolve; all six pages are in `meta.json`.

| Page | Verdict | Blocker | Major | Minor | Nit | Status |
|---|---|---|---|---|---|---|
| API V1/V2 Reference | Approve with changes | 0 | 0 | 3 | 0 | Fixed |
| Authentication | Approve with changes | 0 | 0 | 1 | 0 | Fixed |
| Errors and Status Codes | Approve with changes | 0 | 0 | 2 | 0 | Fixed |
| Rate Limits | Approve with changes | 0 | 0 | 3 | 0 | Fixed |
| Filtering and Search | Approve with changes | 0 | 0 | 1 | 0 | Fixed |
| Pagination | Approve with changes | 0 | 0 | 2 | 0 | Fixed |

| # | Page | Severity | Issue | Rule | Fix | Status |
|---|---|---|---|---|---|---|
| 1 | index | Minor | Intro bolds "V1" and "V2 (beta)" | style-guide.md, Introductions | Removed the bold | Fixed |
| 2 | index | Minor | Description 107 characters, no action verb | style-guide.md, SEO and metadata | Rewritten (134 characters) | Fixed |
| 3 | index | Minor | "Available services" Cards group had no lead-in sentence | style-guide.md, Lead-in text | Added a lead-in | Fixed |
| 4 | authentication | Minor | Description 108 characters | SEO and metadata | Extended | Fixed |
| 5 | errors | Minor | Title Case; description 113 characters | Page titles; SEO | "Errors and status codes"; extended | Fixed |
| 6 | rate-limits | Minor | Title Case; description 117 characters | Page titles; SEO | "Rate limits"; extended | Fixed |
| 7 | rate-limits | Minor | Callout sends readers to the pricing page, which `materials/` says doesn't list limits | Source trust order | Removed the link, kept "ask your account manager" | Fixed |
| 8 | filtering | Minor | Title Case | Page titles | "Filtering and search" | Fixed |
| 9 | pagination | Minor | Description 118 characters | SEO | Extended | Fixed |
| 10 | pagination | Minor | The `428` rule says "products" only; `openapi_pimv1.json` says the same restriction applies to asset search | Source trust order | Table row now says "products (or assets, on asset search)" | Fixed |

Needs source (not changed): the pages carry open `FLAG` comments that still stand. The `text_search` operator isn't in `openapi_pimv1.json`, the `like` vs `contains` operator name, the 50-vs-20 attribute limit, the `total_count` inconsistency, whether V1/V2 and V3 share one rate-limit count, and whether the `page_size` ceiling of 100 applies beyond product search. Recommend `endpoint-tester` on `POST /api/v1/products/search`.
