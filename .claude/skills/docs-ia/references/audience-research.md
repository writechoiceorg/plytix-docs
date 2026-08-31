# Audience research — from a one-liner to full persona + JTBD

Four levels of depth, roughly cheapest-to-most-rigorous. Match the level to the stakes: a quick internal tool doesn't need statistical personas; a docs portal that's a primary sales/adoption channel probably needs at least qualitative research.

## Level 0 — the one-paragraph reader statement (Mintlify)

The minimum viable audience definition, cheap enough to always do. Three questions, answered for **one primary reader per section** (not a demographic):

- **Who are they?** — role, experience level, relationship to the product.
- **What are they trying to do?** — the specific task or goal.
- **What do they already know?** — what's assumable, where gaps need filling.

Specificity test: *"backend engineers"* is not usable. *"A backend engineer who signed up yesterday and needs to make their first authenticated API call"* is.

Why it matters beyond prose: when the audience is "everyone," docs get structured around the *product* instead of what people are trying to accomplish — three different readers of the same product (a first-time integrator wanting the fastest path to a working example, a returning developer wanting something scannable in five seconds, a technical lead wanting architecture before implementation detail) served identically end up served by none of it well.

Put the statement where AI authoring tools will read it before every edit:

```markdown
## Audience

Our primary readers are backend developers integrating a B2B API for the first time.
They are comfortable with REST and JSON but may not have used our product before.
They want working examples, not explanations of concepts they already understand.

Write for this reader unless a page explicitly specifies otherwise.
```

Feedback loop once live: review what an AI docs assistant gets asked and where it fails. If users ask questions existing content should already answer, that's usually a *structural* problem (unfindable, or not recognizable as relevant) — not a missing-content problem.

## Level 1 — persona (who) + Jobs-to-be-Done (what they want to achieve)

"Personas describe who a person is, while Jobs to be Done focuses on what they want to achieve." Use both; they answer different questions.

**Persona** — three questions:
- Who are they — role, skills, context?
- What are their goals — work and/or personal/career?
- What challenges do they face — obstacles, frustrations?

**JTBD** — the docs get "hired" for a job; if they do it, they're "hired" again — otherwise "fired" for a forum or a competitor. Three questions:
- What specific task?
- Why did they turn to the docs (the trigger)?
- What does success look like (the outcome)?

A persona typically carries several attached JTBDs, each with its own task/trigger/outcome. Combining the two gives an operational brief with direct implications for structure — e.g. a persona whose JTBDs skew toward fast troubleshooting implies code-first examples up front and a dedicated, easy-to-find troubleshooting section, not buried in reference.

## Level 2 — building personas from real data

Start from a **proto persona** (an assumption-based sketch from existing knowledge) and validate/refine with data. Nielsen Norman Group's three persona types, roughly increasing in rigor and cost:

- **Proto personas** — assumption-based sketch, no research yet.
- **Qualitative-based personas** — built from interviews, common threads pulled out.
- **Statistical personas** — qualitative research plus large surveys plus statistical clustering.

Statistical personas are more rigorous but need much more time/resources/expertise. Qualitative research is the practical sweet spot for most teams: a single hour-long conversation can reveal a user's precise problem language, the real context that brought them to the docs, their *actual* workflow (not the self-reported one), what makes them abandon docs, and the moments docs actually helped.

### Concrete data-gathering techniques

- **One-on-one interviews** — 30–60 min calls with ~10 users. Ask about their work and their doc experience; watch for patterns in how they describe problems; observe them attempting tasks rather than only asking; transcribe every session (AI transcription is fine).
- **Support ticket analysis** — review tickets a doc change could have prevented; note the literal words people used; track which doc pages recur across tickets.
- **Documentation feedback signals** — page comments/reactions, in-docs search term tracking, visitor path/flow statistics.

### Analysis techniques

- **Thematic analysis** — cluster repeated phrases into behavioral categories (e.g. complaints cluster around searchability, or missing code samples in less-common languages).
- **Journey mapping** — trace the actual path through the docs from entry to exit (e.g. frequent bouncing between troubleshooting and reference suggests a cross-referencing gap).
- **Content gap analysis** — topics the data shows matter but are thinly covered (e.g. a specific integration users keep asking about that's only briefly documented).

AI tools (ChatGPT/Claude) are explicitly suggested for the heavy lifting of transcript/ticket analysis at this stage.

### From analysis to persona — a 5-step recipe

1. Identify demographics.
2. Analyze behaviors/preferences (quick how-tos vs. detailed reference?).
3. Define goals and challenges.
4. Consider learning styles (visual/text/hands-on/mixed).
5. Write the JTBD list, directly informed by journey mapping and gap analysis.

## Using personas on existing docs (not just new content)

- Reorganize navigation around how/when people actually arrive, not the org chart of the product.
- Add role- or problem-specific landing pages as quick-access points.
- Use the research to find gaps — explicitly including show-stopping problems that harm new-user conversion or cause churn, tying docs research to a business-outcome metric, not just satisfaction.

## Comparing granularities

Four models captured here for defining "who this is for," from most abstract to most operational:

| Model | Granularity |
|---|---|
| Diátaxis (action/cognition × acquisition/application) | two orthogonal axes — claims completeness by construction |
| Seven Actions | seven enumerated verbs — more concrete, more empirically flexible, has to argue for its count |
| Mintlify's "one primary reader" statement | one free-text paragraph per section |
| Persona + JTBD (this file) | full structured research artifact |

None is strictly better — pick per section/portal based on stakes, not by default reaching for the heaviest one.
