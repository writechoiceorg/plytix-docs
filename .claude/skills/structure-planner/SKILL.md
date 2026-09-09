# Create Diataxis Documentation Outline

Analyze this project and generate a documentation navigation outline structured around the [Diataxis](https://diataxis.fr) framework.

**Do not create documentation pages or write any content.** Your only output is the outline file described below.

---

## Step 1 — Gather every available context source

Real projects rarely hand you a single clean input. Treat this as a gathering step, not a mode switch: scan the project for **every** category below that exists and use whichever are present together. Don't force an either/or choice between "existing docs" and "raw materials" — a project can have both, plus more.

### Context categories

- **Existing documentation** — a docs folder, README, or a scrape/mirror of a live docs site (own or third-party). Extract: what's covered, what's missing, what's duplicated, pages that don't fit their Diátaxis type, gaps in the user journey. Useful for *coverage and structure*, but treat its factual claims (endpoint paths, field names, required headers, behavior descriptions) as **unverified** unless corroborated elsewhere — old docs go stale and are frequently wrong about exactly the details a reference page depends on.
- **Raw source materials** — specs, internal docs, README drafts, design docs, API contracts, integration case studies, sample request collections (Postman/Bruno/Insomnia/HAR). Extract: features, APIs, concepts, workflows, terminology — preserve naming conventions exactly. Treat as ground truth for *what exists*, but not necessarily for *current behavior* if a verified-findings source (below) is also present.
- **Verified/live findings** — a testing config, changelog of confirmed API behavior, validated request/response collection, or any file that records "confirmed live on {date}" facts rather than claims. This is the **highest-trust source of fact** in the whole gathering step: where it contradicts the existing docs or even the raw materials, the verified finding wins, and the contradiction itself is worth keeping (see Step 3).
- **Brand / positioning / SEO guidelines** — preferred terminology, keyword priorities, tone, page-structure conventions, CTAs. This shapes *phrasing only* — tab names, section names, page titles and descriptions — never content or scope. Never invent a feature, capability, or page because a keyword list mentions it; only use these guidelines to word real content the other sources already established. Preserve exact brand-name spellings this source specifies (e.g. a specific product name over its more common synonym) rather than normalizing to whichever term is more familiar.
- **Multiple products/brands** — if the gathered materials clearly cover more than one distinct product or brand (different folders, different terminology, different positioning docs), do not silently merge them into one outline. Produce a separate outline per product by default, and call out where their structures deliberately diverge (e.g. one has a section/capability the other doesn't) rather than forcing a shared shape. Only unify if the user explicitly asks for a combined outline.

### In this project (Plytix)

The categories above map onto specific, known locations here — check all of them, not just the ones that come to mind first:

- **Existing documentation** — `materials/help-center/` (a full scrape of Plytix's live end-user help center, one file per article/slug — includes a `plytix-glossary.md` worth mining for terminology even though it ranks as unverified for facts); `materials/api-references/index.html` (a scraped Scalar-rendered "External Provider" API reference); and, once it exists, anything already under `docs/` (an existing `docs.json`/nav scaffold or drafted pages are themselves "existing documentation" to audit against, not to overwrite blindly).
- **Raw source materials** — `openapi_pimv3.json` at the repo root (the FastAPI-generated OpenAPI v3 spec — 51 paths; this is ground truth for endpoint *shapes* specifically, ranking above `materials/api-references/API V3.md`'s prose when the two disagree, per CLAUDE.md); `materials/api-references/API V3.md` (prose v3 design doc — filters, pagination, response conventions, Process Manager API); `materials/api-references/Plytix_pimv1.postman_collection*.json` (v1, plus a partial v2-BETA folder); every PDF under `materials/project-references/` (project requirements, product-board API feedback, bulk-operations docs — note some of these describe *v1* behavior only, don't assume it carries to v3 without checking); and every transcript under `materials/transcripts/` (kickoff calls and internal WriteChoice syncs — read non-English ones, e.g. Portuguese, for content rather than skipping them; do not translate in place).
- **Verified/live findings** — a `config/api-testing.config.md` and any `endpoint-tester` skill logs/findings, if they exist yet in this repo. If neither exists, say so explicitly in Sources & Corrections rather than silently treating raw materials as verified.
- **Brand / positioning / SEO guidelines** — the branding and content-guidelines PDFs under `materials/project-references/` (e.g. `Plytix Content Guidelines*.pdf`, `Plytix-Branding-Guidelines*.pdf`). **These are PDFs and require actually reading them** (a PDF reader/renderer, not a filename guess) — if the tooling to do so is unavailable in the current environment, don't skip them silently: say explicitly in Sources & Corrections that they exist but could not be read this pass, so a later run knows to retry rather than assuming they were already consulted.

Treat this list as a starting point, not a ceiling — if new folders or files show up under `materials/` or elsewhere, gather them under whichever category above fits.

### When sources conflict

Trust order, highest first: **verified/live findings → raw source materials → existing documentation.** SEO/positioning guidelines never override any of the above on matters of fact — they only govern wording. Within "raw source materials," a machine-generated spec (e.g. `openapi_pimv3.json`) outranks a hand-written prose doc describing the same surface (e.g. `API V3.md`) on matters of exact shape — but the disagreement itself still gets flagged (see Step 3), since it may mean the prose describes a planned-but-unshipped feature rather than a stale doc.

Use everything gathered to inform every decision in the outline — tab names, section names, page titles, and page types must all reflect the actual product, not a generic template.

---

## Step 2 — Design the outline

Structure the outline around **two levels**:

### Tabs
Top-level navigation areas. Typically:
- **Guides** — learning and task-oriented content (tutorials, how-tos, concepts)
- **API Reference** — technical reference (endpoints, schemas, error codes, rate limits)

Add, rename, or split tabs only if the product genuinely warrants it (e.g. a separate SDK tab, or a Changelog tab).

### Sections within each tab
Group related pages into named sections. Each section must have:
- A short title
- A 1–2 sentence description of what the section covers and what the user will be able to do after reading it

### Pages within each section
Each page entry must include:
- **Title** — clear, user-facing name
- **Page type** — one of: `Concept`, `Tutorial`, `How-to Guide`, `Reference`
- **Description** — one sentence explaining what the page covers and its specific value to the reader

Apply Diataxis page types as follows:
| Type | Use when… |
|---|---|
| `Concept` | The page explains *what* something is or *why* it works a certain way |
| `Tutorial` | The page walks the user through a complete task to *learn by doing* |
| `How-to Guide` | The page gives step-by-step instructions to *accomplish a specific goal* |
| `Reference` | The page is a precise, exhaustive description of an API, config, schema, or error list |

When brand/positioning/SEO guidelines are among the gathered sources, use their preferred terminology and phrasing patterns for tab names, section names, page titles, and descriptions — but only to word content the other sources already justified. A keyword list is never a reason to add a page, section, or tab.

---

## Step 3 — Write the outline file

Create a single file: **`docs/outline.md`**

Use exactly this format:

```markdown
# Documentation Outline: {Product Name}

{2–3 sentence description of the product and who this documentation is for.}

---

## Tab: {Tab Name}

{One sentence describing the purpose of this tab.}

### {Section Name}

{1–2 sentences describing what this section covers and what the reader will get from it.}

* **{Page Title}** [`{Page Type}`]: {One sentence describing what this page covers and its value to the reader.}
* **{Page Title}** [`{Page Type}`]: {One sentence describing what this page covers and its value to the reader.}

### {Section Name}

{1–2 sentences describing what this section covers and what the reader will get from it.}

* **{Page Title}** [`{Page Type}`]: {One sentence describing what this page covers and its value to the reader.}

---

## Tab: {Tab Name}

{One sentence describing the purpose of this tab.}

### {Section Name}

...
```

---

## User Navigation Flow

After the outline, append a **User Navigation Flow** section to `docs/outline.md`.

This section envisions the ideal path a new user takes from the documentation homepage to their first meaningful win — the moment they've successfully integrated or used the product for the first time.

Use this format:

```markdown
---

## User Navigation Flow

{1–2 sentences describing the type of user this flow is designed for and what "winning" looks like for them.}

1. **Homepage** → {Describe what the user sees and what draws them in — value proposition, key CTA.}
2. **{Page Title}** → {What the user does here and what they take away.}
3. **{Page Title}** → {What the user does here and what they take away.}
4. **{Page Title}** → {What the user does here and what they take away.}
5. **First win** → {Describe the concrete moment of success — e.g. "User receives their first successful API response."}
```

Guidelines:
- The flow should be **linear and opinionated** — pick the single best path, not every possible path
- Every step must reference a real page from the outline above
- Steps should be **5–8 total** — enough to be meaningful, short enough to be a quick win
- The final step must describe a tangible, specific success moment (not "user understands the product")

---

## Sources & Corrections

After the User Navigation Flow, append a **Sources & Corrections** section to `docs/outline.md`.

This section makes the gathering step in Step 1 auditable: what was read, and — critically — every place a higher-trust source contradicted a lower-trust one, so a later content-writing pass doesn't unknowingly reintroduce a fact that's already been disproven.

Use this format:

```markdown
---

## Sources & Corrections

**Sources used:**
- {Existing documentation}: {what it is, e.g. "scrape of the live docs site, N pages"}
- {Raw source materials}: {what it is, e.g. "API contract + 3 client integration case studies"}
- {Verified/live findings}: {what it is, e.g. "testing config with confirmed request/response behavior"}
- {Brand/SEO guidelines}: {what it is, if present}

**Corrections carried into this outline** (existing docs contradicted by a higher-trust source — omit this list if none were found):
- {Old claim} → {Verified fact}, per {source}. Affects: {page(s) in this outline}.
```

If no existing documentation was in scope (nothing to contradict), state that plainly instead of leaving the corrections list empty for no stated reason.

---

## Quality checklist

Before finishing, verify:

- [ ] Every context category actually present in the project (existing docs, raw materials, verified findings, SEO/positioning guidance) was gathered, not just the first one found
- [ ] Every known location under "In this project (Plytix)" was checked: `materials/help-center/`, `materials/api-references/` (including `openapi_pimv3.json` at the repo root), `materials/project-references/` (all PDFs), `materials/transcripts/` (all transcripts, including non-English ones), and any existing `docs/` scaffold
- [ ] If any project-references PDF (branding/content guidelines especially) could not be read, that gap is stated explicitly in Sources & Corrections rather than left unmentioned
- [ ] Multiple distinct products, if present, got separate outlines (or an explicit user-requested merge) rather than a silent blend
- [ ] No placeholder text (`{...}`) remains anywhere in the file
- [ ] Every page has a title, a page type, and a one-sentence description
- [ ] Page types are used consistently per the Diataxis definitions above
- [ ] Section descriptions explain the reader's goal, not just the content
- [ ] Tab and section names reflect the actual product — not generic labels, and use SEO/positioning terminology only where the content already justifies it
- [ ] The Guides tab follows a logical user journey (introduction → quick start → concepts → advanced)
- [ ] The API Reference tab covers: overview, error codes, schemas, rate limits, and endpoints grouped by resource
- [ ] The User Navigation Flow is 5–8 steps, linear, and every step references a real page from the outline
- [ ] The flow ends with a concrete, specific success moment
- [ ] Sources & Corrections lists every source used, and flags every place a verified finding overrides existing docs