---
name: reviewer
description: "Review existing or newly written documentation pages (concept, how-to, reference, tutorial) against the project's glossary, style guide, page-type templates, platform conventions, IA map, and source materials, and produce a findings report with a verdict. Use after the Writer skill finishes a page, or whenever someone asks to review, proofread, QA, check, or give feedback on a docs page. Do not use this skill to write new pages (use Writer) or to audit the whole docs set for gaps and redundancy (use docs-ia)."
---

## When to use this skill

Use the Reviewer skill when:
- A page produced by the Writer skill needs a quality pass before publishing
- Someone asks to review, proofread, QA, or check one or more existing `.mdx` pages
- A page was edited by hand and needs to be checked against project standards again
- You need to confirm a page's claims still match the API spec after the spec changed

Do **not** use this skill to:
- Write or expand pages → use the Writer skill
- Audit the whole docs set for gaps, redundancy, or navigation structure → use the `docs-ia` skill
- Test live endpoints → use the `endpoint-tester` skill (you may *recommend* it in a finding)

```
Meeting ingestion → Knowledge extract → Writer → [REVIEWER] → Content Auditor
```

---

## Collect context

Confirm the following in a single message if any are missing:

- **Target page(s)**: which file path(s) to review
- **Review mode**: *report only* (default) or *report and fix*. Never edit the page unless the user picks *report and fix*.
- **Source material**: what the page was written from, if known (knowledge extract, spec, transcript, `materials/` file). If unknown, use the trust order below to verify claims.
- **Page type**: if the frontmatter or intro doesn't make it obvious

Do not start reviewing until the target page(s) are identified.

---

## Required references

The Reviewer uses the **same references as the Writer skill**. They are the single source of truth; do not copy them into this skill or keep a separate version of the rules.

| Reference | Path | What the review checks against it |
|---|---|---|
| Terminology | [`../writer/references/glossary.md`](../writer/references/glossary.md) | Product term spelling, capitalization, `[PENDING]` terms used without a flag |
| Style guide | [`../writer/references/style-guide.md`](../writer/references/style-guide.md) | Voice, tone, headings, lists, numbers, punctuation, banned words, alt text, SEO/AEO metadata |
| Page types | [`../writer/references/page-types.md`](../writer/references/page-types.md) | Required sections and frontmatter for the page's type; one page type per URL |
| Platform conventions | [`../writer/references/projectConvention.md`](../writer/references/projectConvention.md) | Frontmatter fields, allowed components, callout syntax, file naming. Prefer a connected platform MCP when available. |
| Information architecture | [`../writer/references/information-architecture.md`](../writer/references/information-architecture.md) | File path matches the IA map; IA Notes constraints (Channels have no API, v1/v2 write parity, upcoming features) |
| Verification checklist | [`../writer/references/checklist.md`](../writer/references/checklist.md) | Baseline pass/fail gate; every item gets a result in the report |
| Report format | [`references/review-report.md`](references/review-report.md) | Severity levels, verdict rules, and the report template (Reviewer-only) |

### Loading order

1. `checklist.md`: the gate you must report against
2. `glossary.md`
3. `style-guide.md`
4. Platform MCP or `projectConvention.md`
5. `page-types.md`: only the type of the page under review
6. `information-architecture.md`
7. `references/review-report.md`

### When references are missing or out of date

If a reference is missing, pause and ask in a single message, the same way the Writer skill does. If a reference is present but contradicts the repo (for example, `projectConvention.md` names a different docs platform than the one in use, or an IA path doesn't exist on disk), log it as a **Reference drift** finding. Do not silently pick one side.

---

## Source trust order

When checking factual claims, use this order (highest first), per the project's `CLAUDE.md` and `docs-ia` skill:

1. Verified live API findings (Bruno collection results, `endpoint-tester` logs)
2. OpenAPI specs: `openapi_pimv3_20261002 (Latest spec).json` for v3 (the older `openapi_pimv3.json` is superseded), `openapi_pimv1.json` for v1/v2
3. Raw source materials in `materials/` (API V3.md, project references, transcripts)
4. Scraped help center (`materials/help-center/`) and existing docs

If a page's claim is supported only by a lower-trust source and contradicted by a higher one, it's a finding. If the prose `API V3.md` and the OpenAPI spec disagree, the page should follow the spec; flag the discrepancy either way.

---

## Step 1: Run mechanical checks

Run fast, deterministic checks first so the manual pass can focus on judgment calls. Use Grep on the target file(s):

| Check | Pattern (ripgrep) | Rule source |
|---|---|---|
| Em dash / en dash | `—\|–` | style-guide.md, Grammar and punctuation |
| Banned words | `\b(important\|very\|easily\|easy\|quick\|quickly\|simply\|just\|obviously\|with confidence\|leverage\|delve\|seamless\|seamlessly\|robust\|building blocks\|unlock\|cutting-edge\|revolutionize\|synergi[sz]e\|synergistically\|paradigm shift\|next-gen\|effortless\|overnight)\b` (case-insensitive) | style-guide.md, Words and phrases to avoid |
| Vague platform references | `\bthe (system\|tool\|PIM)\b` (case-insensitive) | style-guide.md, Project-specific overrides |
| Ampersands in prose | `&` outside code | style-guide.md, Grammar and punctuation |
| Headings deeper than H3 | `^####` | checklist.md, Structure |
| H1 in the body (duplicates the frontmatter title) | `^# ` outside code | projectConvention.md, Frontmatter |
| Frontmatter fields Fumadocs strips | `^(slug\|keywords\|audience\|time_to_complete\|prerequisites\|generated):` | projectConvention.md, Frontmatter |
| Bold headings | `^#+\s+\*\*` | style-guide.md, Headings |
| Code fences without language | a fence line that is exactly ` ``` ` and opens a block | style-guide.md, Code and samples |
| Protected terms | `\b(eCatalog\|export feed)\b`, lowercase `plytix` | style-guide.md, Protected terminology |
| Images | `!\[` and `<img` to collect alt text for manual review | style-guide.md, Images and diagrams |
| Unresolved flags | `FLAG:\|\[Note: Need clarification\|\[PENDING\]` | Writer skill, Flags |

Mechanical hits are candidates, not findings. Check each one in context. For example, "just" inside a code sample or "important" inside a quoted API field name is not a violation. Ignore matches inside code blocks and inline code.

---

## Step 2: Review the page

Read the whole page, then work through each dimension. Record every finding with its location (heading and line number), the rule it breaks (reference file + section), and a suggested fix.

### 1. Accuracy and sourcing
- Every product behavior, endpoint, field, parameter, and limit is supported by a source at the right trust level. Check endpoint paths, methods, field names, types, and required flags against the OpenAPI spec.
- No invented behavior. Behavior that is implied but not confirmed must carry a visible flag or be removed.
- Versioned behavior states which API version (v1/v2 or v3) it applies to. Write workflows don't claim v3 support that doesn't exist (IA Notes).
- The page doesn't imply an API surface for UI-only features (Channels, Smart Lists) or present roadmap features (Webhooks, MCP Server, Destinations, Workspaces) as shipped.
- Code samples are syntactically valid and use real endpoint shapes. If a sample needs live confirmation, recommend `endpoint-tester` rather than guessing.

### 2. Terminology
- Every product term matches `glossary.md` exactly (spelling, capitalization, first-mention full name).
- Terms not in the glossary are flagged, not defined on the fly.
- `[PENDING]` glossary terms are used with a visible flag.

### 3. Structure (page type)
- The page is one type only. Concept pages have no step-by-step procedures; reference pages have no narrative; tutorials stay on the happy path.
- Required sections for the type are present and in order. Optional sections follow their stated conditions (for example, a tutorial steps summary only when there are more than seven steps).
- Frontmatter `title` present and accurate (it renders as the H1, so a `# H1` in the body is a duplicate); no headings deeper than H3; in-page navigation list present when an H2 has more than four H3s.
- Numbered steps for sequences, bullets for non-sequential items; how-to steps start with a bold imperative verb.

### 4. Formatting and platform
- Frontmatter has every required field and no field Fumadocs strips (`slug`, `keywords`, `audience`, and so on); `title` 60 characters or fewer; `description` one sentence, 120-155 characters, starting with an action verb.
- Only components and callout types listed in `projectConvention.md` (or the platform MCP) are used, with correct syntax.
- UI labels bold and matching on-screen text; file paths and code values in code style; quotation marks only for exact values to type.
- Related articles section follows the `Cards`/`Card` pattern and the opening sentence template; every Lucide icon used is imported.
- The page is listed in its folder's `meta.json` (otherwise it won't show in the sidebar where the IA map says it should).

### 5. Style and voice
- Voice traits (Casual, Respectful, Authentic, Witty) hold; at most one "wink" per page, never inside a procedural step.
- Answer first under each H2; binary language instead of unresolved "it depends"; "don't say no" (lead with what the reader can do).
- Active voice, present tense for product behavior, contractions, plain-language substitutions, no vague pronouns.
- Lists, numbers, hyphens, serial commas, American spelling, and punctuation follow the style guide.
- Sentences short enough for a 7th-8th grade reading level. Call out the specific long or dense sentences rather than giving a general score.
- Alt text: 125 characters or fewer, starts with the subject, describes purpose.

### 6. Placement and scope
- The file path matches `information-architecture.md`. If the path exists on disk but not in the IA map (or the reverse), log it.
- Content that belongs on another page is identified with the page it belongs on.
- No conflict with adjacent pages on the same topic. Spot-check the pages listed around it in the IA map and any page linked from it.
- Internal links resolve to files that exist.

### 7. Checklist gate
Go through every item in `checklist.md` and mark it Pass, Fail, or N/A. Every Fail must map to at least one finding.

---

## Step 3: Write the report

Use the template and severity rules in [`references/review-report.md`](references/review-report.md).

- **One page**: return the report in your response. Save it to a file only if the user asks.
- **More than one page**: save a report file `output-reviewer-YYYY-MM-DD.md` at the repo root (same convention as the Writer's progress file). Add a summary table at the top, then one report section per page. Update the table's status as each page is finished, so an interrupted session can resume.

Give a verdict per page: **Approve**, **Approve with changes**, or **Needs rewrite**, following the verdict rules in the report reference.

---

## Step 4: Fix (only in *report and fix* mode)

- Fix only findings the user approved, or all Minor and Nit findings plus anything the user named. Never fix Blocker accuracy findings by guessing; they need a source or an answer from the project lead.
- Don't resolve the Writer's `FLAG:` blockquotes yourself unless the source that resolves them is in hand. Quote the source in the report.
- After fixing, re-run Step 1's mechanical checks on the changed file and update each finding's status in the report (Fixed, Skipped with reason, or Open).

---

## Review rules

- **Cite the rule.** Every finding names the reference file and section it comes from. If you can't point to a rule, it's a suggestion, not a finding. Mark it as a Nit or leave it out.
- **Don't invent standards.** The references are the standard. If a reference is silent or ambiguous on something that matters, log a **Reference gap** so the rule gets added to the reference file, not to this skill.
- **Be specific.** Quote the offending text and give the replacement. "Tighten this section" is not a finding.
- **Verify before claiming inaccuracy.** Open the spec or source and quote it. A finding that says "this endpoint doesn't exist" must cite the spec search that proves it.
- **Don't silently correct.** Every change, even in fix mode, is traceable to a finding in the report.
- **Stay in scope.** A review of one page doesn't turn into an IA redesign. Structural problems beyond the page go to a single "Out of scope" note that recommends the `docs-ia` skill.
