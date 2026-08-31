# Governance, maintenance, and AI/agent-readability

## The continuous-improvement loop

**Measure before you edit** — switch on page-level feedback (ratings, good/neutral/bad) first, to find which pages actually need attention rather than guessing.

1. **Content structure** — break long pages into multiple focused pages (linked via relative links); use subpages for naturally nested content; group related pages under a title; consistent H1/H2 headings populate a jumpable on-page outline and become anchor links.
2. **Edit in two passes** — short sentences are easier to read. First pass: cut ruthlessly against the page's one goal. Second pass: re-read and add back only what's genuinely missing (code, diagrams) with the same discipline — subtract before you add back.
3. **Add interactive content** — things a reader can *do* in-page (live API test blocks, embedded notebooks, clickable walkthroughs, video), not only static prose.
4. **Reverse-engineer your own best pages** — the same analytics that surface weak pages also surface top-rated ones; study what makes those work and apply the pattern elsewhere instead of guessing at improvements from scratch.
5. **Analyze search queries** — track popular in-docs search terms and how many results each returned. A popular query with poor/no matching content is a direct, cheap-to-fix content gap.
6. **Talk to support** — support hears the same recurring pain daily; treat that conversation as a standing gap-discovery channel, and close the loop by telling support once something's fixed.
7. **Deeper analytics** (optional) — a general analytics platform for traffic/bounce-rate detail beyond docs-native feedback signals.

## Docs-as-code governance

- Route documentation changes through the same review process as code — branch-based workflow with review/approval steps.
- "An API feature isn't done-done until the documentation is published" — treat docs as part of the definition of done, not an afterthought.
- Cross-functional contribution: devs, PMs, and writers all contributing, not only a single owner.
- Outdated examples are worse than no examples — they create false expectations and lead developers down dead ends. Sync docs to the codebase; support multiple concurrent versions rather than only the latest.
- Redirect discipline is a governance item as much as a navigation one — see `references/navigation-and-page-design.md`.

## Why AI/agent-readability is now part of IA, not an add-on

Across every source captured here, docs sites increasingly publish for two classes of reader at once: humans and AI agents/assistants. This isn't a separate initiative bolted onto the IA — it reuses the same structural work (clear headings, one goal per page, explicit cross-references) and adds a small set of machine-readable artifacts on top.

**The recurring artifact set:**

- **`llms.txt`** — a site-wide index for agents, analogous to a sitemap but written for LLM consumption.
- **`AGENTS.md`** — instructions for how an agent should read the site (repo-root-path convention).
- **Markdown mirrors** — every HTML page also served as `.md` at the same path, or via `Accept: text/markdown` content negotiation, so agents get clean text without HTML-scraping.
- **A structured model file** (e.g. `model.json`) as the **single source of truth** that templates render from — "no fact about the model may live only in a template." This is the same discipline as avoiding content duplication in the human-facing nav (see subpages/cross-referencing in `references/navigation-and-page-design.md`), applied to the machine-facing layer.

**Content-level practices that help both humans and agents equally**: clear/descriptive headings, short sections, consistent terminology, keeping key facts in text rather than only screenshots, explicit links between related topics "so retrieval has the right context," and stating version/conditionality explicitly near the relevant content rather than only in a separate compatibility page.

## `CLAUDE.md` / Cursor-rules as IA enforcement, not just context

Once AI tools are drafting or editing docs, the IA decisions from `SKILL.md` (audience, content-type boundaries, nav naming) need to travel with the repo as machine-readable context, or the AI silently reverts to its defaults:

- **Audience drifts back to generic** without an explicit reader statement in context (see `references/audience-research.md`'s Level 0). AI tools asked generically for docs default to blending all four Diátaxis types into one hybrid — readable, but serving no one well.
- **Navigation drifts back to feature-shaped** without an explicit goal-orientation instruction plus 3–5 supplied jobs-to-be-done.
- Codify type boundaries directly as a rule, e.g.: *"If a how-to guide needs to explain a concept, link to an explanation page instead of including the explanation inline"* — a direct restatement of Diátaxis's "ruthlessly minimize explanation" principle, made explicit for an AI-authoring context where it won't be inferred.

Practical effect: the context file is where the IA guidelines from this skill actually get *enforced* turn after turn, not just referenced once at planning time.

## Case study — 7act.org's own IA

A small, deliberate example of a docs portal designed for both human and agent readers at once, worth reusing as a reference pattern:

- Every page published in **four parallel artifacts at the same path**: HTML (`/`), Markdown mirror (`/index.md`), machine-readable model (`/model.json`), agent index (`/llms.txt`); content negotiation via `Accept: text/markdown` also returns the Markdown mirror at `/`.
- Site-wide entry points: `/sitemap.md`, `/sitemap.xml` (with `<lastmod>`), `/glossary/index.md`, `/AGENTS.md`.
- Localized into 16 languages, each with its own full artifact set — "adding a page means adding it in all 16 languages, or not at all" (parity as a hard rule, not a best-effort goal).
- CI gate requiring all of: build, link check, HTML validation, and prose style linting green before publish — the mechanical backbone that makes the governance loop above actually enforceable rather than aspirational.
