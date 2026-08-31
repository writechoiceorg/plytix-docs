# Frameworks — full theory

The two backbone models, in depth. `SKILL.md` has the compressed versions for everyday use; come here when you need the reasoning behind a decision, a worked example, or a cross-framework mapping.

## Diátaxis

### Why exactly four types — not three, not five

A 2×2 map, not a list. Lists feel arbitrary ("why these categories and not some other set?"); a map defined by two orthogonal axes doesn't, because the axes exhaustively define the territory:

- **action vs. cognition** — knowing *how* (practical) vs. knowing *that* (theoretical/propositional)
- **acquisition vs. application** — being *at study* vs. being *at work*

| need | type | the user... | the documentation... |
|---|---|---|---|
| learning | Tutorial | acquires their craft | informs action |
| goals | How-to guide | applies their craft | informs action |
| information | Reference | applies their craft | informs cognition |
| understanding | Explanation | acquires their craft | informs cognition |

> "This is why there are four and only four types of documentation. There is simply no other territory to cover."

The map gives two things a flat list can't: simultaneous **expectations** to the reader (what kind of thing is this page?) and **guidance** to the author (what does this page owe the reader?).

### Each type, key principles

**Tutorials** — a *lesson*; analogy: teaching a child to cook. The instructor bears full responsibility for the learner's success.
- Don't try to teach — let the learner *do*.
- Show the destination up front: "we will build...", not "you will learn...".
- Deliver visible results early and often; maintain a narrative of what to expect.
- Ruthlessly minimize explanation — link out to it instead.
- Concrete and particular, not abstract; one path, no alternatives.
- Aspire to perfect reliability: "you are required to be present, but condemned to be absent."

**How-to guides** — a *recipe* for a real, unmanaged problem. Written from the user's perspective, never the machinery's ("press Deploy" is not guidance).
- Address real-world complexity — adaptable, not narrowly one-case; problems fork and branch and need judgment.
- Omit the unnecessary — practical usability beats completeness; a how-to doesn't need to be end-to-end the way a tutorial does.
- Seek *flow* — ground the sequence in how the user actually thinks and moves, not just what the tool technically allows.
- Name guides after exactly what they show: "How to integrate APM," not "Integrating APM" or "APM."

**Reference** — *austere*, neutral, propositional. Analogy: nutrition info on a food packet — "one hardly *reads* reference material; one *consults* it."
- Describe and only describe — resist the urge to instruct or explain; link out instead.
- Respect the structure of the machinery — reference architecture should mirror the code's own architecture.
- Adopt standard, consistent patterns. Examples illustrate; they don't explain.

**Explanation** — *discursive*, understanding-oriented; "the only kind of documentation that it might make sense to read in the bath." Bounded by an implicit "About...".
- Make connections, even to things outside the immediate topic.
- Provide context — why things are the way they are: design decisions, history, constraints.
- Allowed to hold opinions and weigh alternatives — the only one of the four types where that's appropriate.
- Keep it closely bounded — don't let instruction or technical description creep in.

### The two conflations Diátaxis exists to prevent

**Tutorial vs. how-to guide** — the single most common conflation in software docs. Both are action-oriented with ordered steps, but serve opposite needs (*at study* vs. *at work*). Not the same axis as basic-vs-advanced: a tutorial can teach something highly complex (an experienced anaesthetist still takes a hands-on "difficult neonatal intubations" course as a *lesson*), and a how-to can cover something trivial (a routine-paperwork-disposal manual is still a how-to).

| Tutorial | How-to guide |
|---|---|
| contrived, safe learning environment | the real world, unmanaged |
| eliminates the unexpected | must prepare for the unexpected |
| single path, no choices | forks and branches |
| teacher bears responsibility | user bears responsibility |
| explicit about basics | assumes familiarity |
| concrete and particular | general, case-by-case |

**Reference vs. explanation** — both propositional (no action steps), so the confusion is about *when* the reader turns to it, not *what kind* of knowledge it is. Rule of thumb: boring/list/table → reference; imaginable-in-the-bath → explanation. Risk: reference accretes "helpful" explanatory digressions as it grows — this damages both, cluttering the reference and stunting the explanation.

### "Blur" — the map's failure mode

Adjacent quadrants share an axis and have a natural tendency to bleed into each other:

- tutorials + how-to guides — both guide *action*
- reference + how-to guides — both serve *application*
- reference + explanation — both are *propositional knowledge*
- tutorials + explanation — both serve *acquisition*

Left unchecked this produces partial or total structural collapse — e.g. tutorials and how-tos merging into one undifferentiated mass serving neither need.

The overall journey around the map (not a strict user path, but a recognizable cycle): learning-oriented → goal-oriented → information-oriented → explanation-oriented → back to the start, for a new thing to learn or to go deeper.

### Quality: functional vs. deep

- **Functional** — accuracy, completeness, consistency, precision. Independent, objectively measurable dimensions; a *constraint*. Failing any one is immediately obvious to the reader.
- **Deep** — flow, fitting human needs, feeling good to use, anticipating the reader, beauty. Interdependent, subjective, judged not measured; a *liberation* rather than a constraint. **Conditional on functional quality** — inaccurate docs can never feel beautiful, however well-crafted.

What Diátaxis can and can't do: it can't *give* you functional quality (still needs technical skill and discipline), but it reliably *exposes* lapses in it — e.g. mirroring reference structure to code structure makes gaps visible; stripping explanatory digressions from a tutorial exposes exactly where the reader was left to figure something out alone. For deep quality it does more directly: its categories exist as a response to real needs, and it actively protects *flow* by preventing digressions that break rhythm.

### How to apply: guide, not plan

- **Don't plan a structure, let it emerge.** Don't create empty Tutorials/How-to/Reference/Explanation folders with nothing in them up front — "it's horrible." The top-level structure is a *consequence* of many small real improvements, not a scaffold imposed first.
- **Work one step at a time**, publish immediately; resist completing a big tranche before shipping.
- **The loop**: pick something in front of you → assess against the compass (what need does this serve? how well? what single change would improve it? does its language/logic match its mode?) → decide the one next action → do it and ship it → repeat.
- **"Complete, not finished."** Like a living plant, docs are never *finished*, but at any point can be *complete* — appropriate to their current stage, useful, structurally healthy, ready for what's next.

## Seven-Action Documentation Model

Addresses a gap Diátaxis and DITA don't: those frameworks describe *content types*, but not *when* or *why* a reader needs one. Sandwich metaphor: frameworks/tools are the bread, the reader's-need mental model is the filling — the part that actually gives docs meaning. The model sits *underneath* content-type frameworks, not in place of them.

Seven actions in heptagon order — actions near the top happen early in a reader's relationship with the product; actions near the bottom happen once product knowledge has consolidated.

| # | Action (alt.) | Definition | Metric | Typical gap signal |
|---|---|---|---|---|
| 1 | **Appraise** (Discern) | discern the product's main qualities, compare to others if applicable | conversion rate, docs → adoption | support/sales repeatedly answer "what is this?"; no page states positioning |
| 2 | **Understand** (Learn) | grasp the abstractions/mental models the product is built around | concept coverage — share of core abstractions with a dedicated page | users can operate it but can't explain why it works; concepts live only in code comments or internal wikis |
| 3 | **Explore** (Discover) | try the product, discover what it can do, low barrier to entry | time-to-first-value | no quickstart or sandbox; first-run experience is a wall of reference |
| 4 | **Practice** (Train) | operate the product in daily, standard use | task success rate | same how-to questions recur in support; procedures exist only as tribal knowledge |
| 5 | **Remember** (Recall) | recall information that can't be memorized — parameters, error codes | reference hit rate | a parameter/error-code search returns nothing; reference scattered across blog posts/chat logs |
| 6 | **Develop** (Integrate) | build upon, extend, or integrate with the product | ecosystem growth — integrations/extensions built by users | integration questions go unanswered or land in a forum; extension points undocumented |
| 7 | **Troubleshoot** (Solve) | diagnose and resolve issues, often under pressure | time-to-resolution | support repeats a question whose answer lives only in a chat log; error messages appear in code but never in docs |

### Framework cross-reference (many-to-many, not 1:1)

The model's own site pairs each action with one DITA/Diátaxis/Good-Docs-Project type; the installable skill version deliberately loosens this to many-to-many and requires explaining any non-obvious mapping:

| Action | DITA | Diátaxis | Good Docs Project |
|---|---|---|---|
| Appraise | `<topic>`/`<concept>` | no direct equivalent (closest: Explanation) | Overview, Landing page |
| Understand | `<concept>`/`<glossentry>`/`<section>` | Explanation | Concept guide, Glossary |
| Explore | `<task>`/`<step>`/`<substep>` | Tutorial | Tutorial |
| Practice | `<task>`/`<step>`/`<choicetable>` | How-to guide | How-to guide |
| Remember | `<reference>`/`<refsyn>`/`<properties>` | Reference | Reference, Glossary |
| Develop | `<task>`/`<codeblock>`/`<coderef>` | How-to guide | How-to guide, API reference |
| Troubleshoot | `<troubleshooting>`/`<trouble>`/`<cause>`/`<remedy>` | How-to guide (problem-oriented) | Troubleshooting guide |

Treat these as starting points: "a tutorial can support Explore or Practice; a reference can support Remember or Develop; an explanation can support Understand or Appraise."

### The 5-step procedure (from the installable skill)

1. State the primary action, target reader, and moment of need.
2. Turn the action into an *observable outcome*, not a topic — "connect an existing identity provider," not "SSO overview."
3. Choose the smallest form that supports the action — content types are starting points, not a taxonomy to obey.
4. Draft or revise without inventing product capabilities, commands, metrics, or results.
5. For a full documentation set, map every page to a primary action, then recommend the smallest set of changes that improves coverage.

### Epistemic caveat (stated explicitly by the source)

"This one isn't backed by extensive research or factorial analysis" — a useful descriptive lens, not a validated framework. Do not claim it is exhaustive, empirically validated, or prescriptive. Don't force every document to cover all seven actions; name a secondary action only when it changes the content or navigation decision.

## Composing the two lenses

Seven Actions tells you *when* a reader needs something; Diátaxis tells you *what form* serves it. Worked example:

> A reader hits a `429` error in production (Troubleshoot). The observable outcome is "resolve the rate-limit error and prevent recurrence," not "rate limiting overview." The smallest form: a troubleshooting how-to (Diátaxis: how-to guide, problem-oriented) with a link out to an Explanation page on how rate limiting actually works, for the reader who wants the *why* as well as the fix.

This is also why a documentation set audit maps pages to *actions* first, then checks whether each page's *content type* actually matches the action's need — a page can have the right topic and still fail its reader by being the wrong shape (e.g. a wall of explanation where the reader needed a fast how-to).
