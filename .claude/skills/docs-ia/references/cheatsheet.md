# Cheatsheet — one-page decision view

## Classify a piece of content: the Diátaxis compass

| Informs... | ...serves... | → |
|---|---|---|
| action | acquisition (at study) | Tutorial |
| action | application (at work) | How-to guide |
| cognition | application | Reference |
| cognition | acquisition | Explanation |

Boring/list/table → Reference. Imaginable-in-the-bath → Explanation. Both are propositional, no steps.
Contrived/single-path/teacher-owns-it → Tutorial. Real-world/forks/user-owns-it → How-to. Both are action-oriented.

## Classify a reader's moment of need: the Seven Actions

| Reader says... | Action | Typical type | Metric |
|---|---|---|---|
| "What is this, and how does it compare?" | Appraise | Overview / landing page | conversion |
| "Why does it work this way?" | Understand | Explanation / concept guide | concept coverage |
| "Can I try this quickly?" | Explore | Tutorial / quickstart | time-to-first-value |
| "How do I do X in my daily workflow?" | Practice | How-to guide | task success rate |
| "What does parameter/error Y mean?" | Remember | Reference / glossary | reference hit rate |
| "How do I extend/integrate with this?" | Develop | How-to / API reference | ecosystem growth |
| "Why is this broken, right now?" | Troubleshoot | Troubleshooting how-to | time-to-resolution |

## Pick a nav primitive

| Need | Primitive |
|---|---|
| pages share one purpose | Group |
| distinct audience/use-case, own URL space, one task = one tab's content | Tabs |
| genuinely separate product lines, rarely cross over | Products |
| useful from literally anywhere (changelog, status, community) | Anchor |
| sidebar just feels long | **not** a tabs problem — fix grouping/naming first |

## Page self-review, one pass

- [ ] One verb completes "after reading this, the reader can ___"
- [ ] Prerequisites stated before the first action
- [ ] Headings name a task/decision/question, not a topic
- [ ] Each example says what it does, where it goes, what to replace, and the expected result
- [ ] Help sits right before the step that tends to fail
- [ ] Ends with an observable proof of success (+ a next step only if there's a real one)

## Audit an existing portal, in order

1. Inventory pages: purpose, audience, content type, traffic/support volume, owner.
2. Flag mixed-type pages (most common defect) and tutorial/how-to blur.
3. Flag feature-shaped nav (mirrors product architecture, not reader goals).
4. Check personas/nav against actual support tickets and search queries, not assumption.
5. Check every moved/renamed page has a redirect — human bookmarks *and* agent citations both break without one.
6. Prioritize fixes by traffic × support volume; ship one improvement at a time, not a big-bang restructure.

## Deliverable shape — always report this way

Audience + moment of need → primary (± secondary) action → content type → proposed page/nav placement + why → concrete success metric.

## Guardrails, always

- Don't build empty type-folders before there's content to put in them.
- Don't force every action onto every reader, or every reader through all seven actions.
- Explain any non-obvious action → content-type mapping instead of asserting it.
- Don't invent capabilities, commands, metrics, or results to fill a template.
- Neither model claims to be exhaustive, validated, or prescriptive — treat both as lenses.
