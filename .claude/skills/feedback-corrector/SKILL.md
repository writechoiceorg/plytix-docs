---
name: feedback-corrector
description: "Analyze a docs page against David's (Plytix) feedback, verify that feedback against our sources, propose corrections that follow the Writer skill's conventions, and apply them only after approval. Use whenever someone shares client feedback, comments, or review notes from David on an existing article and wants them analyzed or applied. Do not use this skill to write new pages (use Writer), to review a page with no client feedback (use Reviewer), or to audit the whole docs set (use docs-ia)."
---

## When to use this skill

Use Feedback Corrector when:
- David (or another Plytix stakeholder) has sent feedback on a published or draft page
- Feedback needs to be checked against the project's sources before anyone changes the page
- A page needs corrections traced back to specific feedback items, with a report of what to raise with the Plytix team

Do **not** use it to:
- Write or expand pages → Writer skill
- Review a page without client feedback → Reviewer skill
- Test live endpoints → `endpoint-tester` skill (recommend it in a flag when a feedback claim needs live confirmation)

```
Writer → Reviewer → Plytix feedback → [FEEDBACK CORRECTOR] → reply to David → Reviewer (optional re-check)
```

**Core rule:** client feedback is input, not truth. David's feedback is verified against our sources before it becomes a change. Nothing is edited until the user approves the proposed corrections.

---

## Workflow overview

| Phase | What happens | Edits the page? |
|---|---|---|
| 1. Identify the page | Ask which page to analyze | No |
| 2. Collect feedback | Ask for David's feedback | No |
| 3. Map feedback to the article | Compare feedback with the page, find divergences | No |
| 4. Verify against sources | Check every feedback item against the trust order, flag contradictions | No |
| 5. Propose corrections | Draft corrections using Writer conventions, show them | No |
| 6. Approval gate | Wait for the user's decision | No |
| 7. Apply and log | Apply approved corrections, run checks, update the shared `feedback-flags.md` | Yes, approved items only |
| 8. Reply to David | Draft a short, paste-ready list of the changes made, to send back to David | No |

Do not skip or merge phases. Never move past Phase 6 without an explicit approval message from the user.

---

## Phase 1: Identify the page

Ask in a single message, then stop and wait:

> Which page should I analyze? Give me the file path (for example `fumadocs/content/docs/...mdx`) or the page title and I'll find it.

- If the user gives a title or URL, resolve it to a file under `fumadocs/content/docs/` with Glob/Grep. If more than one file matches, list them and ask.
- Read the full page once it is resolved. Note its page type (concept, how-to, reference, tutorial) from its structure and frontmatter.
- Do not edit anything under `docs (deprecated)/` or `docs-fumadocs (deprecated)/`.

---

## Phase 2: Collect David's feedback

Ask in a single message, then stop and wait:

> Please paste David's feedback on this page. Include any context you have: who said it, where (call, Slack, doc comment), and whether it was a question or a requested change. A file path to a transcript or comment export also works.

Accept any of: pasted text, a file path in the repo, or a transcript excerpt.

Then split the feedback into **numbered, atomic items** (F1, F2, ...). One item = one claim or one requested change. If a comment bundles several, split it. Keep David's wording in quotes for each item so nothing is paraphrased away.

Classify each item:

| Type | Meaning |
|---|---|
| **Factual** | Claims something about product or API behavior (endpoint, field, limit, auth, status, availability) |
| **Terminology** | Asks for a different product term or name |
| **Scope** | Asks to add, remove, or move content |
| **Structure / flow** | Asks to reorder, merge, split, or restructure |
| **Tone / wording** | Preference about phrasing or voice |
| **Question** | Asks something rather than requesting a change |
| **Unclear** | Cannot be acted on as written |

If any item is unclear, list those items and ask for clarification in one message before continuing. Do not interpret silently.

---

## Phase 3: Map feedback to the article

Compare each feedback item with the page text. For each item, find the exact location (heading and line number) and record one of:

| Result | Meaning |
|---|---|
| **Divergence** | The page says something different from what the feedback says, or lacks what the feedback asks for |
| **Already aligned** | The page already says what the feedback asks for. No change needed; say so |
| **Not applicable** | The item refers to content that is not on this page (belongs on another page, name which) |
| **Not locatable** | The feedback refers to something you cannot find on the page |

For each divergence, state the gap in one line: *page says X; feedback says Y*.

Present a short table to the user as a checkpoint (no need to wait for a reply unless something is ambiguous):

| # | Feedback (short) | Type | Page location | Result |
|---|---|---|---|---|

---

## Phase 4: Verify against sources

For every **Divergence**, check the feedback against our sources before deciding whether the page or the feedback is right. Gather from all categories, not just one. Highest trust first:

1. **Verified live API findings**: `bruno-collection/` (including `open-items.md`, `UNTESTED_ENDPOINTS.md`), `config/api-testing.config.md`, `endpoint-tester` logs
2. **OpenAPI specs**: `openapi_pimv3_20261002 (Latest spec).json` for V3 (the older `openapi_pimv3.json` is superseded), `openapi_pimv1.json` for V1/V2, `openapi_pimv3_by_resource.json` as a derived view
3. **Raw source materials in `materials/`**:
   - `api-references/v3-reference/` (`API V3.md`, newest dated PDF, status map)
   - `api-references/endpoint-reviews/` (public vs internal endpoints)
   - `api-references/v1-reference/` and `bulk-operations/`
   - `project-references/brief/` (`before-writing.md`, requirements, product-board feedback, API analysis, questions for the Plytix dev team)
   - `project-references/brand-and-style/`
   - `transcripts/` (decisions and context from calls, including earlier statements by David)
4. **Existing/scraped docs**: `materials/help-center/`, `api-references/existing-docs-scrape/` (starting point only, unverified)

Also read `feedback-flags.md` at the repo root, if it exists. Note any **Open** flags for this page (a new feedback item may answer one, so it can be resolved in Phase 7) and any flag on another page that covers the same topic (so you reuse its finding instead of raising a contradictory one).

Also check the Writer references that encode standing decisions: `../writer/references/glossary.md`, `style-guide.md`, `guideline.md`, `information-architecture.md` (IA Notes constraints such as Channels having no API, V1/V2 write parity, and roadmap features that are not shipped).

Use targeted Grep/Read. For spec checks, quote the spec path or schema you found. A claim that something "doesn't exist" must cite the search that proves it.

Give each divergence a **verdict**:

| Verdict | Meaning | Action |
|---|---|---|
| **Supported** | Sources confirm the feedback | Propose a correction |
| **Contradicted** | A source at equal or higher trust than the feedback contradicts it | Do **not** propose a correction as stated. Raise a flag with both sides quoted |
| **Unverifiable** | No source confirms or denies it | Raise a flag. Propose a correction only if the user chooses to accept it on David's authority, and mark it as such |
| **Preference** | Wording or style with no factual claim | Propose only if it passes the style guide and glossary; otherwise note the conflict |
| **Conflicts with the page's own conventions** | Feedback violates the glossary, style guide, or guideline (for example "v3" instead of "V3") | Keep the project rule, flag it, and explain why |

Record, per item: the sources checked, what each said (with file path and the quoted line or schema path), and the verdict. Where David's feedback conflicts with something he said earlier in a transcript, quote both.

If the feedback implies a spec or doc may be stale, flag that too, because the issue may be on Plytix's side rather than ours. Per `CLAUDE.md`, when the OpenAPI spec and `API V3.md` disagree, prefer the spec but note the discrepancy.

---

## Phase 5: Propose corrections (do not apply)

Load the Writer references before drafting, in the Writer's loading order:

1. [`../writer/references/glossary.md`](../writer/references/glossary.md)
2. [`../writer/references/style-guide.md`](../writer/references/style-guide.md)
3. [`../writer/references/projectConvention.md`](../writer/references/projectConvention.md) (prefer a connected platform MCP if available)
4. [`../writer/references/page-types.md`](../writer/references/page-types.md): only the type of this page
5. [`../writer/references/information-architecture.md`](../writer/references/information-architecture.md)
6. [`../writer/references/guideline.md`](../writer/references/guideline.md)
7. [`../writer/references/checklist.md`](../writer/references/checklist.md) (used in Phase 7)

If any reference is missing, ask in a single message before continuing, the same way the Writer skill does. Do not assume a default.

Draft a correction for every **Supported** item, every **Preference** item that passes the conventions, and any **Unverifiable** item the user accepts. Each correction must:

- Keep the page's type. A correction must not turn a concept page into a how-to, or add narrative to a reference page.
- Keep the frontmatter valid and within limits (`title` ≤ 60 characters, `description` one sentence of 120-155 characters starting with an action verb, no stripped fields).
- Use only components and callouts from `projectConvention.md`.
- Use glossary terms exactly, and V1/V2 and V3 naming per `guideline.md`.
- Follow the style guide (voice, active voice, present tense, no banned words, no em dashes, sentence case headings).
- Not invent product behavior. If the feedback states behavior that no source supports, it stays flagged, not written.
- Be minimal. Change only what the feedback item requires.

### Present the proposal

Show the user, in this order:

**1. Summary table**

| # | Feedback item | Verdict | Proposed action | Location |
|---|---|---|---|---|

**2. Per-item detail**, for each proposed correction:

```
F3 — [Factual] "David's quote"
Location: [Heading], line N
Sources: [file → quoted line / schema path]
Verdict: Supported

Current:
> existing text

Proposed:
> new text

Why: [one sentence tying the change to the feedback and the source]
```

**3. Items not being changed**, each with a reason: Already aligned, Not applicable (with the page it belongs on), Contradicted, Unverifiable, or Conflicts with conventions.

**4. Flags**, in the Flags format below.

Do not edit the file in this phase. Not even for items that look trivial.

---

## Phase 6: Approval gate

End the proposal with a single question and stop:

> Which corrections should I apply? Reply **all**, list item numbers (for example `F1, F3, F5`), or tell me what to change. I'll leave flagged items untouched unless you say otherwise.

Rules:
- Only apply items the user approved by number or with "all". "All" covers proposed corrections only; it never includes **Contradicted** items.
- If the user edits a proposed correction, re-check the new wording against the style guide and glossary before applying.
- If the user overrides a **Contradicted** or **Unverifiable** item and asks you to apply it anyway, apply it and still log the flag in `feedback-flags.md`, noting that the change was applied on the user's instruction and citing the conflicting source.
- Silence, partial approval of a different set, or new feedback means going back to the relevant phase. Do not infer approval.

---

## Phase 7: Apply and log

### Apply

1. Make each approved edit with the Edit tool, one feedback item at a time. Keep edits minimal.
2. Run the Reviewer skill's mechanical checks on the changed file (em dashes, banned words, vague references, headings deeper than H3, stripped frontmatter fields, code fences without language, protected terms, and `\bv[123]\b` outside URLs, paths, and code). Fix any new violation your edit introduced.
3. Go through [`../writer/references/checklist.md`](../writer/references/checklist.md) for the changed sections. Report any Fail.
4. If a correction changes the page title, path, or its place in navigation, check `meta.json` and the IA map, and surface it rather than guessing.
5. Do not touch other pages. If a correction needs a change on another page, list it in the report.

### Update the shared flag log

All flags from every run go into **one file**: `feedback-flags.md` at the repo root. This file is the running list of things to raise with the Plytix team, shared across pages and sessions. Never create a separate report file per page or per date.

**If the file doesn't exist**, create it with the header and the summary table from the template below.

**If it exists**, read it first, then edit it in place:

- **Page already has a section** → update that section. Add new flags under it, add a new row to its run history, and leave existing flags in place. If this run's sources or David's new feedback resolve an earlier flag, change its status to **Resolved** and add the date and how it was resolved. Don't delete resolved flags.
- **Page has no section yet** → add a new section at the end, using the page template.
- **Duplicate flag** (the same question already open for this page) → don't add a second row. Add the new feedback reference (for example `F4, 2026-10-20`) to the existing row instead.
- **Flag IDs** are global and never reused: `FB-001`, `FB-002`, ... Continue from the highest ID in the file.
- After editing, recalculate the summary table at the top (open and resolved counts per page) and set **Last updated**.

Use the Edit tool for changes to an existing file, so earlier content stays as it is.

Template:

```markdown
# Feedback flags for the Plytix team

Running log of open questions and conflicts found while applying Plytix feedback to the docs. Maintained by the `feedback-corrector` skill: one section per page, updated in place.

**Last updated:** YYYY-MM-DD

## Summary

| Page | Open | Resolved | Last run |
|---|---|---|---|
| [Page title](fumadocs/content/docs/...mdx) | N | N | YYYY-MM-DD |

---

## [Page title]

**Page:** `fumadocs/content/docs/...mdx`

### Run history

| Date | Feedback from | Applied | Skipped | Flagged |
|---|---|---|---|---|
| YYYY-MM-DD | David, [source/context] | N | N | N |

### Flags

| ID | Status | Feedback | What our sources say | Source | Question for Plytix | Raised | Resolution |
|---|---|---|---|---|---|---|---|
| FB-001 | Open | F2: "David's quote" | [finding] | `path` → quoted line | [specific question] | YYYY-MM-DD | |

### Possible stale or inconsistent source material
(Spec vs prose mismatches, outdated help-center content, or earlier statements that conflict with the feedback. Omit if none.)

### Follow-ups on other pages
(Changes needed outside this page. Omit if none.)
```

Write flags for a Plytix reader: say what we found, quote the source, and ask a specific question. No internal jargon, no blame.

### Close out in the response

Don't paste the whole flag log into the response. Instead, give:

- The page file edited, and which items were applied, skipped, and flagged
- A table of applied changes (`#`, Feedback, Change made, Source)
- The flag IDs added or resolved in this run, with a link to `feedback-flags.md` at the repo root

Then continue straight to Phase 8 in the same response.

---

## Phase 8: Reply to David

Draft a short reply the user can paste back to David, in the channel his feedback came from (Slack, doc comment, email). It's written for David, not for the user, so open with one line outside the reply naming the audience, for example "Written for: David, as a reply to his review comment."

Put the reply in a fenced `text` block so it's easy to copy. Keep it simple:

- One opening line naming the page, for example "Thanks, David. I've updated the Overview:"
- One bullet per applied item, in the order of David's feedback, saying what changed on the page in plain words. Refer to his points the way he numbered them (for example "1.", "Proposed change 2", "Suggestion 3") so he can match them up.
- One bullet per item that wasn't applied, with a short reason (for example "the Quickstart description is on its own page, I'll update it in a separate pass").
- Where an open flag needs David's input, add a short "Open questions" list with one specific question per flag. Drop the flag IDs, file paths, and internal terms such as "verdict", "trust order", or "Contradicted".
- No closing summary paragraph.

Rules for the reply:

- List only changes that were actually applied in Phase 7. Never describe a change as done if it was skipped or is still pending.
- Follow the style guide (no em dashes, V1/V2 and V3 naming, glossary terms), but keep the tone conversational.
- Keep it short: a few bullets, a sentence each.
- Don't save it to a file or send it anywhere. The user sends it.

---

## Flags

Raise a flag, never silently resolve, when:

| Situation | Flag format |
|---|---|
| Feedback contradicts a higher-trust source | FLAG: Feedback conflict: [F#] says [X]; [source path] says [Y]. Plytix confirmation needed before changing the page. |
| Feedback cannot be verified | FLAG: Unverifiable: [F#] states [X]; no source confirms or denies it. |
| Feedback contradicts an earlier statement | FLAG: Inconsistent feedback: [F#] says [X]; [transcript path] records David saying [Y]. |
| Feedback violates glossary, style guide, or guideline | FLAG: Convention conflict: [F#] asks for [X]; [reference file, section] requires [Y]. |
| Feedback implies a spec or doc is stale | FLAG: Possible stale source: [source] disagrees with [other source] on [topic]. |
| Feedback belongs on another page | FLAG: Scope: [F#] belongs on [page path or type]. |
| A required term is missing from the glossary | FLAG: Missing term: [term] not in glossary. Definition needed. |

Format each flag as a blockquote in the proposal:
> **FLAG:** [description]

In Phase 7, every flag that is still open becomes a row in `feedback-flags.md`. Do not put `FLAG:` markers into the page itself unless the user asks. In this skill, flags live in the proposal and the shared flag log, so the published page stays clean.

---

## Rules

- **Never edit before approval.** Phases 1-5 are read-only.
- **Verify before agreeing.** Feedback from the client is a claim to check, not an instruction to follow. Also don't dismiss it: a contradicting source at lower trust than the feedback means the feedback may be right and our source stale. Flag it.
- **Cite everything.** Every verdict names the file and quotes the line, schema path, or transcript excerpt it rests on.
- **Preserve the conventions.** Corrections follow the Writer references exactly. If David's wording conflicts with them, the references win and the conflict is flagged.
- **Do not invent.** No new product behavior, endpoints, fields, or limits beyond what a source supports.
- **Stay in scope.** Edit only the page identified in Phase 1. Anything else goes to "Follow-ups on other pages".
- **Don't silently correct.** Every change maps to a numbered feedback item and appears in the close-out summary.
- **One flag log.** All flags go to `feedback-flags.md`, edited in place. Never overwrite it, start a new one, or delete earlier flags; resolve them instead.
- **Ask once, wait.** Each question to the user is a single message, followed by a stop.
