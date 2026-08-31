# Navigation and page design

## Feature-shaped nav vs. goal-shaped nav

The most common navigation mistake: mirroring the product's own architecture (features → sections), because that matches the *team's* mental model. It rarely matches the *reader's*, who arrives asking "how do I do X?", not "which feature covers X?"

```
Feature-based (bad)      Goal-based (better)
Sources                  Get started
Destinations             Connect your data
Transformations          Transform and model
Connectors               Reference
Settings
```

Name sections for what a reader will accomplish, not what the section contains: *"Receive real-time events"* beats *"Webhooks"* because it doesn't require the reader to already know the jargon to see its relevance. The same trap applies to AI drafting tools — asked generically for a nav structure, they default to feature-based nav because a feature list is the most obvious input they're given. Fix: state the goal-orientation explicitly and supply 3–5 top jobs-to-be-done in the prompt.

## Nav primitive decision guide

Four structural primitives, each suited to a different need (originally Mintlify's, but the underlying decision criteria generalize to any docs platform):

| Primitive | Use for | Misuse signal |
|---|---|---|
| **Group** | a labeled section whose pages share a purpose — "a reader who wants one is likely to want the others." The default, basic building block. | vague names like "Core concepts" that don't signal whether a reader needs it |
| **Tabs** | separate sections with their own URL space, for meaningfully different audiences/use-cases where one task needs only one tab's content. Canonical good use: conceptual guides vs. API reference. | a tab per product area just because the sidebar got long — that's too much content or badly-named groups, not a tabs problem |
| **Products** | genuinely separate product lines whose audiences rarely cross over | used when users regularly move between sections (use tabs/groups instead) |
| **Anchors** | persistent top-of-sidebar items useful from *anywhere* — changelog, status page, community forum | promoting content already reachable through main navigation |

## Patterns that hold up regardless of platform

- **Quickstart first, always.** The fastest path to a working state for a new reader is the first page in the primary nav group — never buried under an Overview/Introduction a newcomer has to read through first.
- **Separate doing from looking up.** Tutorials/how-tos (doing) and reference (looking up) belong in structurally distinct areas — readers toggle between these modes constantly and conflating them breaks both.
- **Name for outcome, not architecture.** See above.

## Testing navigation before committing

- Quick test: can a new reader tell from a bare section name alone whether it'll help with their task?
- Rigorous test: hand a colleague who hasn't worked on the docs just the section names (no content), ask them to point to where they'd go for 3–4 specific tasks. "Where they click first tells you more than any analytics report."

## Inventory before reorganizing

Before changing a large nav tree, list existing pages with purpose, audience, content type, traffic, and owner. Mark duplicates, gaps, and pages that no longer deserve a place. This prevents keeping every old page just because it exists, and catches multiple pages quietly covering the same task.

**Always redirect** a renamed/moved page's old URL. Bookmarks, search results, and support messages keep pointing at the old address — and so do **agent citations**, which persist just as long and are easy to forget when planning a redirect map.

## Subpage and grouping limits (GitBook)

- Page groups collect related pages under a title.
- Subpages add hierarchy — but cap it: a **maximum of two levels of subpages**; beyond that, readers get lost.
- **Cross-reference instead of duplicating** — never explain the same concept on multiple pages; link to it on first appearance, plus dedicated related-content links elsewhere. Duplication is a maintenance liability as much as a navigation one.
- Global search across all doc types on one site — don't make readers hunt across separate tabs to find something.

## Page-level structure checklist

Navigation gets a reader to the right page; the page still has to let them finish the job. Readers scan (headings, code blocks, lists, visual cues) rather than reading start to end — build for that behavior.

- **One goal per page.** Finish: *"After reading this page, the reader can ___."* Several unrelated verbs in the answer means the page should split (e.g. "install the SDK, understand our architecture, and troubleshoot webhooks" → at least three pages).
- **Match structure to content type**: a tutorial guides a complete experience; a how-to gives the shortest reliable path from a known goal; reference makes facts locatable/comparable; explanation builds understanding through context and relationships.
- **Prerequisites before instructions** — required accounts/roles/permissions, software/versions, values to collect — linked directly, so readers don't discover a blocker mid-procedure.
- **Headings that tell the story** — name a task, decision, or question a reader could scan for: *"Generate an API key"* (not "API keys"), *"Choose a deployment region"* (not "Options"), *"Fix a 401 response"* (not "Troubleshooting"). Keep the heading hierarchy meaningful — don't skip levels just to change visual size.
- **Introduce examples before showing them** — state what a code block does, where it belongs, and what to replace before it; state the expected result after, when it isn't obvious.
- **Help near the failure point** — don't collect every warning at the bottom; if step three commonly fails on a permissions issue, mention the required permission (and link the fix) right before step three. Reserve broad troubleshooting pages for symptoms shared across many workflows.
- **End with proof and direction** — an *observable* verification (a command returns a specific value, a dashboard status appears, a `200 OK`, a page live at a known URL), then a next step only if there's a meaningful one.

Self-review, read as a stranger: goal clear from title/description? prerequisites visible before the first action? headings make sense without their body paragraphs? clear what to copy/change/expect in each example? help placed near the step that can fail? does it state how to verify success?

## API documentation — a common special case

- Answer the essentials somewhere prominent: what the API does (overview + value), how to authenticate (with working examples), what happens when things go wrong (error formats/codes/recovery).
- Organize endpoints by the reader's mental model — **resource** (`/users`, `/orders`) or **workflow** ("Create an account," "Track a shipment") — never one long flat list.
- Show both success and failure response shapes; explain *when and why* to use an endpoint, not only its signature.
- Model error strings should name the exact problem and the fix, e.g. *"422 Unprocessable Entity: The 'start_date' must be in 'YYYY-MM-DD' format."* Precise in-product error copy is sometimes the best "reference doc" a developer never has to open.
- The "seven Cs" for reference quality: **C**lear, **C**oncise, **C**ontextual, **C**omplete, **C**onsistent, **C**oncrete, **C**onvenient (meet developers where they are, ideally without opening the docs at all).
- Generating reference from an OpenAPI spec reduces manual effort and drift, but is only "the foundation layer" — auto-generation alone doesn't produce genuinely good docs.
- Version docs alongside the API itself; flag breaking changes; provide migration guides — old versions stay in active use longer than teams expect.
