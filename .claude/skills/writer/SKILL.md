---
name: writer
description: "Create new documentation pages for product features, concepts, and workflows, covering concepts, guides, tutorials, and reference pages. Do not use this skill for content review, or content auditing."
---

## When to use this skill

Use the Writer skill when:
- Creating a new documentation page from scratch
- Expanding an existing page with new content
- Translating a call summary, spec, or feature description into a documentation page
- Rebuilding a page identified as "Rewrite" in the content audit
- Processing a `meeting-notes/` file produced by the `extract-meeting-knowledge` and `summarize-meeting` skills into one or more documentation pages

Do **not** use this skill to review or assess existing documentation — use the Reviewer skill for that.

---

## Collect context

Before loading references or writing anything, identify the source material and confirm key details. Ask in a single message if any are missing.

### Identify the source type

| Source type | How to read it |
|---|---|
| **Knowledge extract** from `extract-meeting-knowledge` | Read the **Global Documentation Directives** section first — apply those rules before loading `projectConvention.md`. Then use Concepts, Processes, Constraints, and Emphasis Flags as your primary content source. |
| **Meeting summary** from `summarize-meeting` | Extract key decisions and action items relevant to the feature being documented. Treat open questions as flags. |
| **Spec, feature description, or PRD** | Read in full. Note any stated constraints, terminology, or sequencing requirements as you would documentation directives. |
| **Content provided directly by the user** | Take it as-is. Clarify ambiguities before writing rather than interpreting silently. |
| **Multiple sources** | Identify conflicts between them before writing. Do not proceed if sources contradict each other on a core behavior — raise a flag. |

### Confirm before proceeding

- **Source material** — which file(s) or content are you drawing from?
- **Product / feature name** — what is being documented?
- **Documentation framework** — which platform is this project using (e.g. Mintlify, Fumadocs, Gitbook)? Is an MCP for that platform available?
- **Page type** — if already known; otherwise identify it after loading references
- **New or expansion** — is this a new page or an expansion of an existing one?

Do not proceed to reference loading until the source material is identified.

---

## Required references

Load all available references before writing. References may come from local files, MCP tools, or other sources — what matters is the information each one provides, not where it lives.

### Terminology & definitions
→ See [`references/glossary.md`](references/glossary.md)

Provides approved product terms, definitions, and capitalisation rules. Flag any term you cannot verify — do not define it yourself.

### Style guide
→ See [`references/style-guide.md`](references/style-guide.md)

Provides language, tone, voice, and writing rules that apply across all pages. This is the single source of truth for writing standards — do not override it per page. If the project requires specific adjustments (e.g. title case vs sentence case), those must be updated in the style guide itself.

### Page types & structures
→ See [`references/page-types.md`](references/page-types.md)

Provides the structure template for each page type: concept, how-to guide, reference, and tutorial. Load only the page type relevant to the current task.

### Platform components & formatting
→ See [`references/projectConvention.md`](references/projectConvention.md)

Provides MDX/frontmatter syntax, structural rules, and callout types for the project. When a platform MCP is connected, prefer the MCP — it reflects the current state of the component library. Use `projectConvention.md` as fallback or to resolve conflicts.

### Information architecture
→ See [`references/information-architecture.md`](references/information-architecture.md)

Provides the IA map — where this page fits, what pages precede and follow it, and the correct file path for saving output. Do not guess or create a path if it is not listed here.

### Verification checklist
→ See [`references/checklist.md`](references/checklist.md)

Use after writing each page to confirm output quality before closing the task.

### Loading order

1. Terminology (`glossary.md`) — establishes the vocabulary you must use throughout
2. Style guide (`style-guide.md`) — establishes tone and writing rules
3. Platform components (MCP or `projectConvention.md`) — establishes what you can build with
4. Page types (`page-types.md`) — load only the relevant type
5. IA structure (`information-architecture.md`) — establishes where the output lives

### When references are missing

After attempting to load all references, if any are unavailable, pause and ask the writer in a single message before proceeding. Example:

> I couldn't find the following references:
> - `references/glossary.md` — I won't be able to verify terminology. Should I proceed and flag unverified terms, or can you point me to the glossary?
> - `references/information-architecture.md` — I don't know where this page should be saved. Can you provide the target file path, or should I produce the content only and leave the path for you to define?
>
> Let me know how you'd like to handle each, and I'll continue.

Do not assume a default and proceed silently. The writer may have the reference in a different location, want to provide it inline, or decide that a specific reference is not needed for this task.

---

## Step 1 — Filter scope

Before drafting, identify what belongs on *this* page vs. adjacent pages.

Before drafting, identify what belongs on *this* page vs. adjacent pages.

For each piece of information in the source material, ask:
> "Does this belong on this specific page, or on another page?"

- If it belongs here → include it
- If it belongs elsewhere → note the topic and the page type it belongs to; do not include it here
- If you cannot determine where it belongs → raise a flag (see Flags section)

This step prevents content from leaking across pages and keeps each page focused on its stated goal.

---

## Step 2 — Write the page

With context confirmed, references loaded, and scope filtered, write the page.

1. Open `references/page-types.md` and load the structure for the identified page type. Load only the relevant type — do not load all four.
2. Open `references/style-guide.md` and apply all default rules plus any project-specific overrides.
3. Write the full page following the loaded structure. Do not skip sections — if a section cannot be written due to missing information, raise a flag at that point and continue with the rest.
4. Apply frontmatter as defined in `references/projectConvention.md`. Do not omit required fields.
5. Raise flags inline as you encounter them — do not batch them at the end.

Do not mark the page as done if it contains unresolved flags.

---

## Step 3 — Verify

- **Do not invent product behavior.** Only document what is explicitly stated in the source material. If something is implied but not confirmed, raise a flag.
- **Concepts and processes are different things.** A concept is a *thing* (entity, model, construct). A process is a *sequence of steps*. If source material conflates them, split them — define the concept, then describe the process separately.
- **If the source is a knowledge extract**, treat items under "Documentation Emphasis Flags" as mandatory callouts in the output. Do not omit them.
- **When source material is ambiguous**, raise a flag rather than choosing an interpretation silently.
- **Preserve product terminology exactly.** Do not paraphrase, shorten, or substitute product-specific names. If a term is not in `glossary.md`, flag it — do not define it yourself.
- **Stop and ask rather than guess** when the page type, scope, or target file path is unclear. An incorrect structure takes longer to fix than a one-question pause.
- **Do not silently reset or correct.** If you encounter a problem, flag it and wait for instruction.

---

## Output Requirements

- Save each completed page to its correct file path as defined in `references/information-architecture.md`. If the path is not defined there, ask before saving — do not create a path.
- If creating multiple pages in one session, save each page individually before starting the next.
- Do not batch multiple pages into a single output block.
- After saving, confirm the path and page type in your response.
- Do not mark a page as done if it contains unresolved flags.

For tasks involving more than two pages:

1. Before writing any page, create a progress file: `output-writer-YYYY-MM-DD.md`
2. List every page to be written:

   | Page title | File path | Page type | Status |
   |---|---|---|---|
   | [title] | [path] | [type] | Pending |

3. Update the status after each page: Pending → In Progress → Written, or Blocked (with reason).
4. Save each page individually before starting the next.

---

## Flags

Raise a flag — do not silently resolve — when any of the following occur:

| Situation | Flag format |
|---|---|
| A term appears that is not in `glossary.md` | FLAG: Missing term — [term] not in glossary. Definition needed before this section can be finalized. |
| Source material contradicts itself | FLAG: Conflict — [topic] is described as [X] in one place and [Y] in another. Clarification needed. |
| Source material contradicts another existing page | FLAG: Cross-page conflict — [topic] on this page conflicts with [other page path]. Review needed. |
| A required IA location is not in `information-architecture.md` | FLAG: Missing IA entry — no path defined for this page. Provide the target file path before saving. |
| Source material is insufficient to complete a section | FLAG: Insufficient source — [section name] cannot be written without additional information on [topic]. |
| Scope is unclear | FLAG: Scope unclear — [topic] may belong on [page type]. Confirm placement before including. |

Format every flag as a blockquote at the point in the draft where the issue occurs:
> **FLAG:** [description]
