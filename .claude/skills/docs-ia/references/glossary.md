# Glossary

**Information architecture (IA)** — how docs are organized, labeled, and linked; what makes navigation, search, and cross-references feel predictable. Dual-purpose: helps readers find answers fast, and helps the team know where new content belongs.

**Diátaxis** — a 2×2 framework of documentation content types, defined by two axes (action/cognition × acquisition/application). See `references/frameworks.md`.

- **Tutorial** — a lesson; learning-oriented; informs action, serves acquisition.
- **How-to guide** — a recipe for a real goal; goal-oriented; informs action, serves application.
- **Reference** — dry, consulted description; information-oriented; informs cognition, serves application.
- **Explanation** — discursive, understanding-oriented; informs cognition, serves acquisition.
- **The compass** — the two yes/no questions (informs action or cognition? serves acquisition or application?) used to classify any piece of content.
- **Blur** — the failure mode where adjacent quadrants (sharing an axis) bleed into each other, e.g. tutorial/how-to conflation.
- **Functional quality** — accuracy, completeness, consistency, precision; objectively measurable; a constraint.
- **Deep quality** — flow, fit to human needs, beauty; subjective, judged; conditional on functional quality.

**Seven-Action Documentation Model** — a model of reader *needs* (not content types), arranged in heptagon order from early-relationship to consolidated-knowledge. See `references/frameworks.md`.

- **Appraise** — discern the product's qualities / compare it to others.
- **Understand** — grasp the mental model the product is built around.
- **Explore** — try the product with a low barrier to entry.
- **Practice** — operate the product in daily, standard use.
- **Remember** — recall information that can't be memorized (parameters, errors).
- **Develop** — build on, extend, or integrate with the product.
- **Troubleshoot** — diagnose and resolve issues, often under pressure.

**Persona** — a sketch of who a reader is: role, skills, context, goals, challenges.

**Jobs-to-be-Done (JTBD)** — what a reader is trying to achieve: task, trigger, desired outcome. Docs get "hired" for a job and "fired" if they fail it.

- **Proto persona** — an assumption-based sketch, no research yet.
- **Qualitative-based persona** — built from interview data, common threads pulled out.
- **Statistical persona** — qualitative research plus large-scale surveys and clustering.

**Docs-as-code** — treating documentation changes like code changes: version control, branch-based review, CI checks before publish.

**`llms.txt`** — a site-wide index of a docs site written for LLM/agent consumption, analogous to a sitemap.

**`AGENTS.md`** — a file at a repo/site root describing how an agent should read and navigate the site.

**`model.json`** (or equivalent) — a structured, single-source-of-truth data file that templates render from, so no fact about a model/framework lives only inside a rendered page.

**`CLAUDE.md` / Cursor rules** — a context file AI coding/writing assistants read before every edit; used here to encode the audience statement and content-type boundaries so AI-authored docs stay on-model.

**Groups** — the basic nav building block: a labeled section whose pages share a purpose.

**Tabs** — nav sections with their own URL space, for meaningfully different audiences/use-cases.

**Products** (nav primitive) — top-level separation for genuinely distinct product lines.

**Anchors** — persistent top-of-sidebar nav items useful from anywhere (changelog, status, community).

**Seven Cs** (API reference quality) — Clear, Concise, Contextual, Complete, Consistent, Concrete, Convenient.
