# Writer Skill — README

## Purpose

The Writer skill creates new documentation pages from source material: meeting knowledge extracts, summaries, specs, PRDs, or content provided directly by the technical writer. It covers all content documentation types — concepts, how-to guides, tutorials, and reference pages.

## Scope

**This skill covers:**
- Creating new documentation pages from scratch
- Expanding existing pages with new content
- Converting meeting outputs, specs, or feature descriptions into documentation pages
- Rebuilding pages flagged as "Rewrite" in a content audit

**This skill does not cover:**
- API documentation → use the API Writer skill
- Reviewing or assessing existing documentation → use the Reviewer skill
- Auditing content for gaps, redundancy, or structure → use the Content Auditor skill
- Resolving conflicts in source material → the skill flags them and waits for clarification

---

## Reference Files

This skill depends on the following files in the `references/` folder. Before using the skill on a new project, review and update each file to match the project's requirements.

| File | Purpose |
|---|---|
| [`references/glossary.md`](references/glossary.md) | Approved product terminology, definitions, and capitalisation rules |
| [`references/style-guide.md`](references/style-guide.md) | Writing rules, tone, voice, and language standards — shared with the Reviewer skill |
| [`references/page-types.md`](references/page-types.md) | Structure templates for each page type (concept, how-to, reference, tutorial) |
| [`references/projectConvention.md`](references/projectConvention.md) | Platform-specific formatting: frontmatter, MDX components, callout types |
| [`references/information-architecture.md`](references/information-architecture.md) | IA map and file paths — where each page lives in the documentation structure |
| [`references/checklist.md`](references/checklist.md) | Post-writing verification checklist — used before closing any writing task |
| [`references/guideline.md`](references/guideline.md) | Standing rules for every page, such as writing API versions as V1/V2 and V3 |

---

## How to Configure for a New Project

1. **Glossary** — Replace placeholder entries with the product's approved terms. Add definitions as they are discovered during testing or writing.
2. **Style guide** — Review default rules and update any that conflict with the client's requirements (e.g. title case preference, specific tone adjustments). This is the single source of truth — do not create a separate override file.
3. **Page types** — The default structures are generic. Adjust section names or required fields if the project's documentation framework has specific expectations.
4. **projectConvention.md** — Fill in the platform details: frontmatter schema, available components, callout syntax. If a platform MCP is available, note it here so the skill knows to prefer it.
5. **Information architecture** — Map out the documentation structure before writing begins. The skill will not save a file to a path that is not listed here.
6. **Checklist** — Adjust the verification criteria if the project has specific quality gates.

> The skill will automatically update reference files when it discovers new information during a writing session (e.g. a new term, a constraint not previously documented). This keeps the references current without requiring manual review after every session.

---

## When to Run This Skill

The Writer skill sits in the middle of the documentation workflow:

```
Meeting ingestion → Knowledge extract → [WRITER] → Reviewer → Content Auditor
```

Run it after source material has been processed and reference files are populated. Do not run it on raw, unprocessed meeting transcripts — use the `extract-meeting-knowledge` skill first.

---

## Notes for New Team Members

- The reference files are templates — they are meant to be updated per project, not used as-is.
- The style guide applies to all pages equally. If a page needs a different tone or structure, discuss it with the project lead before overriding the guide.
- The skill will always ask before saving to an undefined path. If it is blocking on a missing IA entry, either add the path to `information-architecture.md` or provide it directly in the chat.
- Flags in the output are not errors — they are pauses waiting for your input. Do not skip them.