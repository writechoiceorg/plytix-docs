# Review session: 2026-11-12

Scope: the two pages that carry the V3 token-creation steps, re-reviewed after their 2026-10-23 rewrite to Plytix's V3 authentication guide. Plytix's guide (`materials/api-references/v3-reference/API V3 - Authentication guide (23_10_2026).md`) was reconfirmed as current on 2026-11-12. The copy received that day differs only by its header logo.

| Page | File path | Page type | Verdict | Blocker | Major | Minor | Nit | Status |
|---|---|---|---|---|---|---|---|---|
| Authentication | `fumadocs/content/docs/reference/v3/authentication.mdx` | Reference | Approve | 0 | 0 | 5 | 1 | Reviewed |
| Quickstart: make your first request | `fumadocs/content/docs/guides/quickstart.mdx` | Tutorial | Approve | 0 | 0 | 3 | 2 | Reviewed |

Both pages follow Plytix's guide closely. **Fixed 2026-11-12:** every Open finding below; the two Needs-source items wait on Plytix. Neither has an accuracy problem against it. The open items are a UI label we can't confirm yet, one gap in Plytix's own permission list, and style fixes.

---

## Authentication

**File:** `fumadocs/content/docs/reference/v3/authentication.mdx`
**Page type:** Reference
**Mode:** Report and fix
**Sources checked:** Plytix's V3 authentication guide (23 Oct 2026, reconfirmed 12 Nov); `openapi_pimv3_20261019 (Latest spec).json` (paths; no `securitySchemes`, which the overlay `fumadocs/overlays/20-meta.yaml` adds); `config/api-testing.config.md` (the `401` body); `fumadocs/overlays/QUESTIONS.md` → "2026-10-23 authentication guide"; memory note on the dev token UI; linked pages `reference/v1-v2/token-authentication.mdx`, `reference/v3/errors-status-codes.mdx`, `guides/migrating-to-v3/authentication-and-base-urls.mdx`
**Verdict:** Approve

### Summary

Every claim on the page matches Plytix's guide: beta access, token ownership and role ceiling, the creation steps, presets and levels, the bearer header, rotate, revoke, expiry, the `401` and `403` checks, and the security advice. The only addition is the `401` body `{"detail": "Unauthorized"}`, which our live testing recorded. The one item that needs Plytix is the tab name. Plytix's guide says **API v3**, but the dev UI shows "beta".

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Minor | Lines 11, 24, 82, 119, 124-125 | The **API v3** tab label comes from Plytix's guide, but the dev Accounts app (`accounts.dev.plytix.com/accounts`) labels the tab "beta". We can't confirm which label customers will see. | style-guide.md, Bolding exceptions ("Bold UI labels exactly as they appear on screen"); checklist.md, Content | Keep **API v3** (it matches Plytix's written guide). The question is already with David in `messages-for-david.md`. Update all five places, and the Quickstart, once he answers. | Needs source |
| 2 | Minor | `### Permissions`, line 47 | The page lists the seven resources from Plytix's guide (products, assets, product categories, asset categories, attributes, product families, relationships). The V3 reference also documents asset lists (`/api/v3/asset-lists`) and product attribute groups (`/api/v3/product-attribute-groups`), and the 2026-10-19 spec replaces relationships with product relationship types (`/api/v3/product-relationship-types`, `/api/v3/product-relationships`). A reader can't tell which permission governs those endpoints. | checklist.md, Content ("nothing invented"); page-types.md, Reference notes ("If a field has accepted values, list them explicitly") | Leave the list as Plytix wrote it. Ask Plytix which permission covers asset lists, attribute groups, and product relationship types, and add the question to `QUESTIONS.md` → "2026-10-23 authentication guide". | Needs source (question logged as AUTH-2 in `QUESTIONS.md`) |
| 3 | Minor | `## Send the token`, line 62 | The header block opens with a bare fence (no language). | style-guide.md, Code and samples; checklist.md, Formatting | Use ` ```http ` (or ` ```text `). | Fixed |
| 4 | Minor | `## Related resources`, lines 133-143 | Three cards. Related resources sections use exactly two. | style-guide.md, "Related articles" section ("Use exactly 2 cards"); projectConvention.md, Components (`Cards`) | Keep "Get started with the API" and "Errors and status codes", and drop the migration card (the V1/V2 link at line 18 already covers that path). Alternatively, keep the migration card in place of the Quickstart card. | Fixed |
| 5 | Minor | `## Related resources`, line 131 | The section has no lead-in sentence before the cards. | style-guide.md, Lead-in text before lists and accordions; "Related articles" section | Add "Now that you know how to create and send an access token, you can explore these related pages." | Fixed |
| 6 | Nit | Intro, line 8 | "no API key and password exchange": the glossary capitalizes the term "API Key", and line 18 of the same page uses "API Key". | glossary.md, API Key | "no API Key and password exchange". | Fixed |

### Checklist results

| Checklist item | Result | Finding # |
|---|---|---|
| All information comes from the source material | Pass | |
| No product behavior implied without a source | Pass | |
| No UI-only feature presented as an API | N/A | |
| Versioned behavior states the API version | Pass (V3 throughout; V1/V2 contrast at line 18) | |
| All flags resolved or escalated | Pass (open items escalated in `messages-for-david.md` / `QUESTIONS.md`) | 1, 2 |
| Terms match glossary.md | Fail | 6 |
| No undefined terms | Pass | |
| Page type structure applied | Pass (procedures allowed here by the style guide's access-token rule; see Reference gaps) | |
| Frontmatter title present, no body H1 | Pass | |
| No headings deeper than H3 | Pass | |
| Numbered steps for sequences, bullets otherwise | Pass | |
| Lead-in before every list, accordion group, and card group | Fail | 5 |
| How-to intro detailed | N/A (reference) | |
| Procedure section not titled "Steps" | Pass | |
| Only Authentication and Quickstart show token creation | Pass (this is the Authentication page) | |
| Troubleshooting uses Accordions with code titles and unique `value` | Pass | |
| Fields with allowed values listed as bullets or tables | Pass | |
| Accordion bodies are prose, no labels | Pass | |
| Frontmatter complete, no stripped fields | Pass (title 14 chars; description 138 chars, starts "Reference for") | |
| Only registered components; icons imported | Pass | |
| UI labels bold, code values in code style | Pass (label itself unconfirmed) | 1 |
| All code blocks have a language | Fail | 3 |
| Active voice | Pass | |
| Present tense | Pass | |
| No filler phrases | Pass | |
| No AI-flagged words | Pass | |
| 7th-8th grade reading level | Pass | |
| No em or en dashes | Pass | |
| Alt text | N/A (no images) | |
| One "wink" maximum | Pass | |
| Correct path and listed in `meta.json` | Pass (`reference/v3/meta.json`, Core concepts) | |

### Reference drift and gaps

- **Reference drift, `projectConvention.md` → Components → Icons:** says `Card` icons are Lucide components imported from `lucide-react`. Every content page (35 files) imports Fluent icons from `@/components/icons` (for example `KeyRegular`), and none uses `lucide-react`. Update the Icons section to the `@/components/icons` pattern. **Fixed 2026-11-12.**
- **Reference gap, `page-types.md` → Reference page:** the template doesn't say whether a reference page may contain procedures. The style guide's "Access token step in integration guides" rule assigns the token-creation steps to this page, so this review treats them as allowed. Add a note to the Reference template naming this exception. **Fixed 2026-11-12** (`page-types.md`, Reference page notes).

### Out of scope

- None.

---

## Quickstart: make your first request

**File:** `fumadocs/content/docs/guides/quickstart.mdx`
**Page type:** Tutorial
**Mode:** Report and fix
**Sources checked:** Plytix's V3 authentication guide (23 Oct 2026, reconfirmed 12 Nov); `openapi_pimv3_20261019 (Latest spec).json` → `GET /api/v3/products` (`_page_size`: default 25, minimum 1, maximum 1000); `config/api-testing.config.md` (`401` body, `http` `next_page`, absent `next_page` on the last page); linked pages `reference/v3/authentication.mdx`, `reference/v3/pagination.mdx`, `guides/syncing-your-erp-with-plytix.mdx`; `guides/meta.json`
**Verdict:** Approve

### Summary

This is a clean happy-path tutorial. The token steps follow Plytix's guide, the request matches the spec, and each step has a verifiable result (the `200`). The fixes are small. One callout leaves out rotation, the Step 1 list has a weak lead-in, and the tab label shares the open question from the Authentication review.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Minor | Lines 19, 27, 36 | The **API v3** tab label is unconfirmed (the dev UI shows "beta"). Same issue as Authentication #1. | style-guide.md, Bolding exceptions; checklist.md, Content | Keep it until David answers, then update it together with the Authentication page. | Needs source |
| 2 | Minor | Callout, line 36 | "Plytix shows the token's value only when you create it." Plytix's guide says "only when it is created or rotated", and the same callout then tells the reader to rotate to get a new value. | checklist.md, Content ("All information comes from the source material") | "Plytix shows the token's value only when you create or rotate it." | Fixed |
| 3 | Minor | `## Step 1`, line 25 | The numbered list follows a definition ("An access token identifies your integration…") rather than a sentence that points to the steps. | style-guide.md, Lead-in text before lists and accordions ("Procedures: Follow the steps below to…") | Add "Follow the steps below to create a token for this tutorial." before the list. | Fixed |
| 4 | Nit | Learning objectives, line 12 | "with the permissions your integration needs", but the tutorial has the reader pick **Read-only** and doesn't cover choosing permissions. | page-types.md, Tutorial ("Every step should produce a visible or verifiable result") | "Create a read-only V3 access token in your account settings". | Fixed |
| 5 | Nit | Card, line 107 | `next_page` is plain text in the card description. | style-guide.md, User interface elements (code values in code style) | "Follow `next_page` through a full result set…" | Fixed |

### Checklist results

| Checklist item | Result | Finding # |
|---|---|---|
| All information comes from the source material | Fail | 2 |
| No product behavior implied without a source | Pass | |
| No UI-only feature presented as an API | N/A | |
| Versioned behavior states the API version | Pass (V3 throughout) | |
| All flags resolved or escalated | Pass | 1 |
| Terms match glossary.md | Pass | |
| No undefined terms | Pass | |
| Page type structure applied | Pass (intro, learning objectives, Before you begin, milestone steps, Related articles) | |
| Frontmatter title present, no body H1 | Pass | |
| No headings deeper than H3 | Pass | |
| Numbered steps for sequences, bullets otherwise | Pass | |
| Lead-in before every list, accordion group, and card group | Fail | 3 |
| How-to intro detailed | N/A (tutorial) | |
| Procedure section not titled "Steps" | Pass | |
| Only Authentication and Quickstart show token creation | Pass (this is the Quickstart) | |
| Troubleshooting uses Accordions | N/A (happy path; one-line `401`/`403` note is allowed for tutorials) | |
| Fields with allowed values listed as bullets | N/A | |
| Accordion bodies are prose | N/A | |
| Frontmatter complete, no stripped fields | Pass (title 35 chars; description 129 chars, starts "Create") | |
| Only registered components; icons imported | Pass | |
| UI labels bold, code values in code style | Fail | 5 |
| All code blocks have a language | Pass | |
| Active voice | Pass | |
| Present tense | Pass | |
| No filler phrases | Pass | |
| No AI-flagged words | Pass | |
| 7th-8th grade reading level | Pass (line 91 is the longest sentence; acceptable) | |
| No em or en dashes | Pass | |
| Alt text | N/A (no images) | |
| One "wink" maximum | Pass | |
| Correct path and listed in `meta.json` | N/A: the path matches `information-architecture.md`, but `guides/meta.json` currently lists only the MCP folder because V3 guides are hidden until V3's release (FB-061). Restore the entry when V3 launches. | |

### Reference drift and gaps

- Same Icons drift as on the Authentication page.

### Out of scope

- None.
