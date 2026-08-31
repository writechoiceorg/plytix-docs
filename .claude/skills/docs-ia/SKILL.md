---
name: docs-ia
description: Define, audit, or restructure the information architecture (IA) of a documentation portal — audience definitions, content-type mix, navigation structure, page templates, and governance. Use whenever someone is planning a new docs site, deciding between tutorial/how-to/reference/explanation, designing navigation (groups/tabs/sections/anchors), auditing an existing docs set for structural gaps, or writing CLAUDE.md/Cursor-rules context so AI tools draft docs consistently. Built on Diátaxis and the Seven-Action Documentation Model as the backbone frameworks, plus operational practice from Mintlify and GitBook's own docs guidance.
---

# Documentation Portal Information Architecture

Two lenses drive every IA decision here, and they answer different questions:

- **Seven Actions** — *why/when* does a reader need this: what are they trying to do, right now?
- **Diátaxis** — *what shape* should the content take to serve that need?

Neither replaces the other. A reader's action (e.g. "Explore") tells you the moment of need; Diátaxis's compass tells you the documentation type (tutorial) that serves it. Map many-to-many, not 1:1 — a tutorial can serve Explore or Practice; a reference can serve Remember or Develop; an explanation can serve Understand or Appraise. Explain any non-obvious mapping instead of asserting it, and never claim either model is exhaustive, empirically validated, or prescriptive.

## Lens 1 — Seven Actions (reader's moment of need)

Identify the reader's primary action from their actual phrasing, not a topic guess: *"Which plan fits our team?"* → Appraise. *"Can I try this quickly?"* → Explore. *"What does this flag mean?"* → Remember. *"Why is this deployment failing?"* → Troubleshoot.

| # | Action | Reader needs to | Gap signal | Metric |
|---|---|---|---|---|
| 1 | **Appraise** | discern the product's qualities, maybe compare it | no page states positioning or main strengths | conversion to adoption |
| 2 | **Understand** | grasp the mental model the product is built around | users can operate it but can't explain why it works | concept coverage |
| 3 | **Explore** | try it, low barrier to entry | no quick start or sandbox for newcomers | time-to-first-value |
| 4 | **Practice** | operate it in daily, standard use | same how-to questions recur in support | task success rate |
| 5 | **Remember** | recall parameters, error codes, syntax | a lookup returns nothing | reference hit rate |
| 6 | **Develop** | build on, extend, or integrate with it | integration questions go unanswered | ecosystem growth |
| 7 | **Troubleshoot** | diagnose and resolve, often under pressure | support repeats a question docs never answer | time-to-resolution |

Full per-action detail (examples, framework cross-references): `references/frameworks.md`.

## Lens 2 — Diátaxis (content shape)

Two orthogonal questions place any content or need on a 2×2 map — this is why there are exactly four types, not three or five:

| Content... | ...serves the reader's... | ...belongs to |
|---|---|---|
| informs action | acquisition of skill (*at study*) | **Tutorial** — a lesson; teacher owns the outcome; one path, no choices |
| informs action | application of skill (*at work*) | **How-to guide** — a recipe for a real goal; forks and branches |
| informs cognition | application of skill | **Reference** — dry, consulted not read; mirrors the product's own structure |
| informs cognition | acquisition of skill | **Explanation** — discursive, allowed opinions; the only one worth reading in the bath |

Two conflations cause most bad IA — watch for both:

- **Tutorial vs. how-to** (most common): not basic-vs-advanced, it's contrived/safe-and-linear vs. real-world/branching. If a "tutorial" needs to handle edge cases and reader judgment, it's actually a how-to.
- **Reference vs. explanation**: both are propositional (no steps). If it's boring, a list, or a table → reference. If you'd imagine reading it in the bath → explanation. Reference tends to accrete "helpful" explanatory digressions as it grows — that's decay, not enrichment; link out instead.

Full theory (why exactly four, functional vs. deep quality, "guide not plan"): `references/frameworks.md`.

## Procedure — defining IA for a portal (new or existing)

1. **Define the primary reader(s).** One primary reader per section, not a demographic — role, what they're trying to do, what they already know. Test: *"a backend engineer who signed up yesterday and needs their first authenticated API call"* is usable; *"backend engineers"* isn't. For higher-stakes docs, go deeper with persona + Jobs-to-be-Done research. → `references/audience-research.md`
2. **Enumerate moments of need per reader**, using the Seven Actions table above. Don't force every action onto every reader — most readers only hit three or four in practice.
3. **Map each moment to a content type** with the Diátaxis compass (not a fixed lookup table — reason through the two questions each time). Choose the smallest form that achieves the outcome; don't make a how-to as exhaustive as a reference, and don't let a tutorial cover every option.
4. **Group into navigation.** Name sections for what the reader accomplishes ("Receive real-time events"), never for the product's own architecture ("Webhooks", "Settings"). Pick nav primitives (groups/tabs/products/anchors) by the decision rules in `references/navigation-and-page-design.md`. Put the fastest path to a working state first, always. Keep doing (tutorial/how-to) structurally separate from looking up (reference).
5. **Structure each page.** One goal per page — finish "*after reading this, the reader can ___*" with one verb, not three. Prerequisites before instructions. Headings that name a task/decision/question, not a topic label. Help placed right before the step that tends to fail. End with an observable proof of success. Full checklist: `references/navigation-and-page-design.md`.
6. **Set up governance and agent-readability** before calling the IA done: a feedback/ratings loop, redirect discipline on every moved page (human bookmarks *and* agent citations both break), and — if AI tools will help author or answer questions against these docs — an `llms.txt`/`AGENTS.md` index and a `CLAUDE.md` audience+content-type context block. → `references/governance-and-ai-readability.md`
7. **Deliver in a fixed reporting shape**, whether this is a plan or an audit: audience + moment of need → primary (and rare secondary) action → content type and proposed page/section → nav placement and why → a concrete success metric. Don't just hand back prose recommendations without this shape; it's what makes the output actionable instead of another synthesis.

## Auditing an existing portal

Inventory first: list pages with purpose, audience, content type, traffic/support volume, owner. Then look specifically for:

- **Mixed-type pages** — a page doing two jobs (e.g. a how-to with an explanation tangent bolted on) serves neither reader well and has no clear home in nav. This is the single most common structural defect across all sources here.
- **Blur/conflation** at the type boundary (see Lens 2) — especially tutorial/how-to bleed.
- **Feature-shaped nav** instead of goal-shaped nav.
- **Orphaned or unresearched personas** — nav built around what the team thinks users want rather than what support tickets and search queries show they actually ask.
- **Missing redirects** on anything moved or renamed.

Prioritize fixes by traffic and support-question volume, not everything at once. Don't propose a big-bang restructure — Diátaxis's own guidance is to let structure change one real, shippable improvement at a time, not from an imposed scaffold.

## Guardrails

- These are descriptive lenses, not laws. Don't claim completeness beyond what each source itself claims.
- Vendor sources here (Mintlify, GitBook) are platform-flavored — keep their underlying decision criteria, drop platform-specific config (`docs.json`, specific product nav widgets) when the target platform differs.
- Don't build empty type-based folders (a blank Tutorials/, How-to/, Reference/, Explanation/) and call it IA. Structure should be a consequence of real content decisions, not a scaffold imposed up front.
- Don't invent product capabilities, commands, metrics, or results when drafting content — preserve technical truth even under the pressure to fill a template.

## Reference index

| File | Load when... |
|---|---|
| `references/frameworks.md` | you need the full theory: Diátaxis's two-axis foundation, quality model, and the Seven Actions' full table (signals, worked examples, DITA/Diátaxis/Good-Docs-Project cross-references) |
| `references/audience-research.md` | defining readers beyond a one-line statement — persona + JTBD methodology, qualitative research techniques, proto vs. qualitative vs. statistical personas |
| `references/navigation-and-page-design.md` | choosing nav primitives, naming sections, subpage depth limits, page-level structure and API-doc-specific structure |
| `references/governance-and-ai-readability.md` | setting up the maintenance loop, docs-as-code review, and the llms.txt/AGENTS.md/CLAUDE.md agent-readability pattern |
| `references/glossary.md` | quick term lookup |
| `references/cheatsheet.md` | a one-page decision-table view of everything above, for fast reuse mid-conversation |

## Provenance

Synthesized from captures in the `wc/information-architecture` research repo: the [Seven-Action Documentation Model](https://7act.org/) (Fabrizio Ferri Benedetti), [Diátaxis](https://diataxis.fr/) (Daniele Procida), [Mintlify's "Structure docs that scale" course](https://learn.mintlify.com/courses/structure-docs/overview), and [GitBook's docs guides](https://gitbook.com/docs). None of these sources claim to be exhaustive or empirically validated — treat them as converging practitioner consensus, not settled science.
