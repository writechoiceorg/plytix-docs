# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is a **documentation engagement repo**, not a software project — there is no application code, build step, linter, or test suite. WriteChoice (an external docs/technical-writing agency) is producing developer documentation for **Plytix**, a Product Information Management (PIM) / content-led-growth platform, covering both its API (v1/v3) and onboarding materials. The repo currently holds raw source materials and planning skills; no docs content or navigation has been written yet.

Do not go looking for `package.json`, lint configs, or test runners — there aren't any. Work here is research, synthesis, and technical-writing planning, executed through the skills below.

## Repository layout

- `materials/` — raw, ground-truth source material gathered from Plytix, not to be edited casually:
  - `api-references/` — Plytix API source docs, grouped by topic:
    - `v3-reference/` — `API V3.md` (internal API v3 prose reference: filters, pagination, response conventions, Process Manager API), the dated `API V3` PDF exports, and the status map.
    - `v1-reference/` — the Plytix PIM v1 Postman collection and the v1/v2 rate-limits PDF.
    - `bulk-operations/` — Bulk API docs (limited to large clients).
    - `endpoint-reviews/` — Plytix's endpoint review/visibility spreadsheets (which endpoints are public).
    - `existing-docs-scrape/` — scraped `index.html` of the existing docs.
  - `project-references/` — engagement context:
    - `brief/` — project requirements, `before-writing.md`, product-board API feedback, API analysis, questions for the Plytix dev team.
    - `brand-and-style/` — branding guidelines, content guidelines, image optimization guide.
  - `transcripts/` — kickoff call transcripts with Plytix stakeholders (product, PM) and internal WriteChoice team syncs. Contain project context, terminology, and decisions (e.g. tooling choices) not written down elsewhere.
  - `help-center/` — full scrape of Plytix's existing end-user help center (help.plytix.com/en), converted to Markdown, one file per article/category page, mirroring the site's URL slugs (e.g. `operations/if.md` for the formula-operations reference). This is existing/scraped-docs material — per `docs-ia`'s trust order it ranks below `materials/`'s other raw sources and below verified API findings, but above nothing; treat its content and terminology as a starting point, not ground truth.
- `openapi_pimv3_20261002 (Latest spec).json` — the authoritative OpenAPI 3 spec for Plytix's PIM v3 API (FastAPI-generated, 76 paths; the older `openapi_pimv3.json`, 63 paths, is superseded) covering products, assets, product/asset categories, asset lists, product families/attributes, product relationships, and related entities. Treat this as ground truth for endpoint shapes over the prose in `API V3.md` where they conflict.
- `openapi_pimv1.json` — OpenAPI spec for v1/v2. `openapi_pimv3_by_resource.json` is a derived per-resource view of the v3 spec.
- `config/api-testing.config.md` and `bruno-collection/` — verified/live API findings (highest trust): test config, Bruno collection, `open-items.md`, `UNTESTED_ENDPOINTS.md`.
- `fumadocs/` — the live docs site (Fumadocs, content under `fumadocs/content/`). `docs (deprecated)/` and `docs-fumadocs (deprecated)/` are old scaffolds; don't write there.
- `roadmap.md`, `plytix-outline-canvas.md`, `Plytix_Tracker*.csv`, `output-writer-*.md`, `output-reviewer-*.md` — planning, tracking and skill-output logs (historical; they may cite pre-reorganization `materials/` paths).
- `.claude/skills/` — project-specific Claude Code skills that drive the actual work (see below).

## Where to look in `materials/`

| Need | Look in |
|---|---|
| Endpoint shapes | `openapi_pimv3_20261002 (Latest spec).json` (repo root), not `materials/` |
| v3 prose (filters, pagination, conventions) | `api-references/v3-reference/` — newest dated PDF wins over older ones |
| Which endpoints are public vs internal | `api-references/endpoint-reviews/` + `v3-reference/API V3 - status map*.md` |
| v1/v2 auth, collection, rate limits | `api-references/v1-reference/` |
| Bulk API | `api-references/bulk-operations/` |
| Scope, roadmap, personas, open questions | `project-references/brief/` (`before-writing.md` first) |
| Voice, terminology, branding, images | `project-references/brand-and-style/` |
| Decisions and context from calls | `transcripts/` |
| End-user terminology and feature behavior | `help-center/` (unverified) |

See `materials/README.md` for the full tree.

## Skills that drive this project's workflow

Three custom skills live in `.claude/skills/`. Prefer invoking them over improvising equivalent work by hand:

- **`docs-ia`** — defines/audits documentation information architecture using Diátaxis (content shape: tutorial/how-to/reference/explanation) and the Seven-Action Documentation Model (reader's moment of need). Use for planning nav structure, auditing existing docs, or deciding what type a given page should be. Trust order when sources conflict: verified/live API findings > raw source materials (`materials/`) > existing/scraped docs. Positioning/SEO guidance shapes wording only, never scope.
- **`structure-planner`** — generates a Diátaxis-based navigation outline (tabs → sections → pages) at `docs/outline.md`. Outline-only: never writes actual doc content. Always appends a "User Navigation Flow" (5–8 step golden path) and a "Sources & Corrections" section documenting where higher-trust sources overrode lower-trust ones.
- **`endpoint-tester`** — tests live API endpoints via a Bruno collection, validates responses against the spec, and logs discrepancies. Expects a project API-testing config file (base URL, auth, ID prefixes, known quirks, status-gating rules) — none exists yet in this repo, so the first run of this skill should create one from the toolkit template and prompt for the missing basics. Uses `bru` CLI (`npm install -g @usebruno/cli`) plus `curl` for exploratory validation before committing to Bruno files.

When multiple source categories are present for an IA/outline task (existing docs scrape, `materials/` raw sources, verified API findings, brand guidelines), gather from all of them rather than picking one — see `docs-ia`'s and `structure-planner`'s "gathering" steps.

## Working conventions specific to this repo

- Files in `materials/` are inputs, not outputs — don't refactor or "clean up" them; extract facts from them into outline/planning files instead.
- Non-English transcript content (e.g. `wc-pos-kickoff-call.md` is in Portuguese) should be read for decisions/context, not translated in place.
- When the OpenAPI spec (`openapi_pimv3_20261002 (Latest spec).json`) and the prose API reference (`API V3.md`) disagree, prefer the OpenAPI spec, but flag the discrepancy — it may indicate the prose doc (or the spec) is stale.
- No `docs/` output directory exists yet; `structure-planner` will create `docs/outline.md` as the first deliverable of that kind.
