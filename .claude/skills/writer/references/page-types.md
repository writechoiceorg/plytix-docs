# Page types

> **How to use this file:** This file defines the structure template for each page type. The Writer skill loads only the page type relevant to the current task. Adjust section names or required frontmatter fields to match the project's platform before writing begins.
>
> For deeper guidance on the theory behind each page type, refer to the [Diátaxis framework](https://diataxis.fr) and [The Good Docs Project templates](https://www.thegooddocsproject.dev).

---

## Page type overview

| Page type | Goal | Reader stage | When to use |
|---|---|---|---|
| **Concept** | Explain what something is and why it matters | Learner | Introducing a feature, system, or idea the user needs to understand before taking action |
| **How-to guide** | Walk the user through completing a specific task | Practitioner | When the user needs step-by-step instructions to accomplish one specific goal |
| **Reference** | Provide structured, scannable facts | Experienced | Configuration options, error codes, API fields, CLI flags |
| **Tutorial** | Guide the user through a complete, end-to-end scenario | Newcomer | Onboarding flows, first-use walkthroughs, learning a workflow from scratch |

> One URL, one page type. Do not mix tutorial content with reference tables, or concept explanations with how-to steps.

> **Frontmatter and H1 (Fumadocs):** only `title` and `description` go in frontmatter for every page type below; Fumadocs strips unknown fields such as `slug` or `audience` (see `projectConvention.md`). The URL comes from the file path. The frontmatter `title` renders as the page H1, so the `# ...` line in each structure template shows what the title should say. Do not add it to the page body. Audience, time to complete, and prerequisites go in the body.

---

## Concept page

**Goal:** Explain what something is and why it matters. Answer "what" and "why" — not "how."

> Concept pages are the most open-ended page type. The right structure depends heavily on what is being explained. Before writing, read the [Good Docs Project concept guide](https://gitlab.com/tgdp/templates/-/blob/main/concept/guide_concept.md) to understand the options and choose the most appropriate structure for the topic.

### Frontmatter

```yaml
---
title: "{Concept name}"
description: "{Why this concept matters — one sentence}"
---
```

### Structure

```
# [Concept name]

One or two sentences: what this is and why the user needs to understand it.
Do not bold any words in this introduction.

## What it is

Explanation of the concept. Use plain language. Avoid internal jargon
not defined in the glossary.

> For a longer page, consider a short 3-5 bullet TL;DR summary right after the
> intro, per the AEO guidance in `style-guide.md`.

## How it works (if applicable)

Explanation of the underlying mechanism or model — only include if
understanding the mechanism helps the user make decisions.

## Key terms (if applicable)

Define any terms that appear on this page and are not yet in the glossary.
Use the same definitions from glossary.md.

## Examples (if applicable)

Concrete examples that illustrate the concept in context.

## Related articles

Use the `Cards` and `Card` components as defined in style-guide.md and projectConvention.md.
```

### Notes

- Do not include step-by-step instructions on a concept page. If you feel the need to, that content belongs in a how-to guide.
- Concepts and processes are different things. A concept is a *thing* (entity, model, construct). A process is a *sequence of steps*. If source material conflates them, split them.

---

## How-to guide

**Goal:** Help the user accomplish a specific, real-world task. Answer "how."

### Frontmatter

```yaml
---
title: "{How-to title — starts with an imperative verb}"
description: "{Specific problem this guide solves}"
---
```

### Structure

```
# [Imperative verb + task, e.g. "Create a webhook"]

Detailed introduction: state what the guide covers (both directions or
scope), when or why the user would do it, and the conventions of the APIs
used (version, base URLs, auth, response conventions). Include useful links
to reference pages and warnings the reader must know before starting. Keep
theory out, but do not make it thin: this is the most useful paragraph on the
page. See "Introductions" in style-guide.md.
Do not bold any words in this introduction.

## Prerequisites

Lead-in sentence that points to the list, e.g. "Before you start, make sure
you have the following:" Never start a list without one.

- Tools or software required (with links if necessary).
- Prior knowledge or previous setup steps (with links to the relevant guides).
- Be specific and assertive. Avoid vague phrases like "a good knowledge of the tools."

> [Insert callout for known limitations or caveats if needed.]

## [Task-based heading, e.g. "Sync your ERP"]

Never title this section "Steps". Use a heading that names what the guide
does (the guide title without product-name suffixes such as "with Plytix").

Lead-in sentence before the list, e.g. "Follow the steps below to [do X, Y,
and Z]." Never start a numbered list without one.

[Option A — Narrative steps]
### Step 1: [Descriptive title]
Paragraph explaining the step in detail.

[Option B — Numbered list steps]
1. **[Imperative verb]** — concise action.
   - Optional sub-steps, screenshots, or code.
   - Expected result or verification.
2. **[Next action]** …

[If the first step is getting an access token, do not show the request. Link
to Authentication or the Quickstart instead. See style-guide.md.]

## Troubleshooting (optional)

Lead-in sentence, e.g. "Check the problems below if you run into issues while
following this guide." Then one accordion per problem (not a bullet list). Endpoint names in the title use `<code>`; titles that are JSX need a unique `value`:

<Accordions type="multiple">
  <Accordion title={<><code>[ENDPOINT]</code> [symptom]</>} value="[unique-kebab-id]">
    If [what the reader sees], [the cause]. [The fix]. [Optional prevention
    tip, in the same paragraph or one short second paragraph. No "Solution:"
    or "Prevention:" labels.]
  </Accordion>
</Accordions>

## Related articles (optional)

Use the `Cards` and `Card` components as defined in style-guide.md and projectConvention.md.

## What's next (optional)

If this guide is part of a larger workflow, describe the next required task
and include a link.
```

---

## Reference page

**Goal:** Provide definitive, structured, scannable facts. Answer "what exactly."

> Endpoint reference pages are auto-generated from the OpenAPI specs by `fumadocs-openapi` (they carry `_openapi` frontmatter). Don't hand-write or hand-edit them; this template is for hand-written reference pages such as pagination, filtering, or error codes.

### Frontmatter

```yaml
---
title: "{Component / API / Field catalogue}"
description: "{Scope of this reference — one sentence}"
---
```

### Structure

```
# [Component, option set, or topic] reference

One sentence describing what this page documents.
Do not bold any words in this introduction.

> For a longer page, consider a short 3-5 bullet TL;DR summary right after the
> intro, per the AEO guidance in `style-guide.md`.

## [Entity group heading]

Overview of this group of entries and any shared context.

| Field | Type | Required | Default | Description | Notes |
|---|---|---|---|---|---|
| `[field]` | `[type]` | Yes / No | `[value]` | [Description] | [Caveats] |

(Repeat tables, lists, or schemas as needed for each entity group.)

## Related resources

Links to tutorials or how-to guides that use this reference material.
```

### Notes

- Keep descriptions factual and scannable. This is not the place for explanation or narrative.
- If a field has accepted values, list them explicitly.
- If a field has constraints, state them (e.g. "Maximum 255 characters").

---

## Tutorial

**Goal:** Teach by doing. Guide the user through a complete, end-to-end scenario on the "happy path." Answer "how do I learn this from scratch."

### Frontmatter

```yaml
---
title: "{Tutorial title}"
description: "{One-sentence elevator pitch}"
---
```

### Structure

```
# [Goal or scenario]

What the user will build or accomplish. Set context: who this is for
and what they will have at the end.

**Learning objectives:** By the end of this tutorial, you will be able to:
- [Objective 1]
- [Objective 2]

Do not bold any words in the introduction paragraph itself.

## Before you begin

List what the user must know or have done before following this tutorial:
- Knowledge and concepts required
- Environment setup
- Access, tokens, or permissions needed

Include links to related pages where relevant.

## Steps summary (optional)

Only include this section if the tutorial has more than seven steps.
A bulleted list of step titles with anchor links so the user can
get an overview before starting.

## Step 1: [Milestone name]

Narrative and instructions. Tutorials can and should include more
explanation than how-to guides — the goal is learning, not just doing.

## Step 2: [Next milestone]

…

## Related articles (optional)

Use the `Cards` and `Card` components as defined in style-guide.md and projectConvention.md.
```

### Notes

- Tutorials follow the "happy path" — do not include extensive troubleshooting. A brief note on the most common failure point is acceptable.
- Every step should produce a visible or verifiable result. The user should be able to confirm they are on track.
- Keep the scope tight. If the tutorial is growing beyond 10–12 steps, consider splitting it into two tutorials with a clear handoff.
