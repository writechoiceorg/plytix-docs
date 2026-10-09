# Verification Checklist

> **How to use this file:** Run this checklist after completing each page and before closing the task. The Writer skill will reference this file during its verification step. Adjust the criteria below to match the project's specific quality gates. Flag issues found — do not silently correct them without noting the change.

---

## Page Checklist

Run after writing each page:

```
Review [file path] and confirm:

Content
[ ] All information comes from the source material — nothing invented
[ ] No product behavior is implied without being explicitly stated in the source
[ ] Page doesn't imply an API endpoint or entity exists when it's UI-only (e.g. Channels) — check `information-architecture.md`'s Notes before publishing
[ ] Any versioned behavior states which API version (v1/v2 vs. v3) it applies to
[ ] All flags in the draft have been resolved or escalated — none left silent

Terminology
[ ] All terms match glossary.md exactly (capitalisation, spelling, phrasing)
[ ] No undefined terms remain in the draft

Structure
[ ] Page type structure is correctly applied per page-types.md
[ ] Frontmatter `title` is present and accurate (it renders as the H1; no `# H1` in the body)
[ ] No headings deeper than H3
[ ] Numbered steps used for sequential instructions; bullets for non-sequential items
[ ] Every bullet list, numbered list, and accordion group is preceded by a lead-in sentence (never starts directly under a heading)
[ ] How-to intro is detailed: scope, API conventions, useful links, and warnings where relevant
[ ] Procedure section is not titled "Steps"; it uses a task-based heading, and the title has no "with Plytix" style suffix
[ ] Guides other than Authentication and the Quickstart do not show the `get-token` request; the token step links to Authentication or the Quickstart
[ ] Troubleshooting uses Accordions (one per problem), not a bullet list; endpoint names in titles are in code format with a unique `value`
[ ] Fields with their own allowed values are listed as bullets (inside an Accordion when it is supporting detail), not packed into one paragraph
[ ] Accordion bodies are one or two paragraphs of continuous prose, with no "Solution:"/"Prevention:" labels

Formatting
[ ] Frontmatter is complete and matches projectConvention.md (no fields Fumadocs strips, such as `slug`)
[ ] All platform components used are listed in projectConvention.md, and every Lucide icon is imported
[ ] UI labels are bold; file paths and code values are in code style
[ ] All code blocks include a language identifier

Style
[ ] Active voice throughout
[ ] Present tense for all product behavior descriptions
[ ] No filler phrases (per style-guide.md)
[ ] No AI-generated words flagged in style-guide.md
[ ] Reads at roughly a 7th-8th grade level (spot-check with Hemingway App)
[ ] No em dash (—) or en dash (–) used
[ ] All alt text is 125 characters or fewer and starts with the subject, not "Image of…"
[ ] Any humor/wit is capped at one "wink" per page and isn't forced

Output
[ ] Page saved to the correct path per information-architecture.md, and listed in its folder's `meta.json`
[ ] Path confirmed in the response after saving
```

---

## Session Checklist (multi-page tasks)

Run at the end of a writing session involving more than two pages:

```
[ ] Progress file (output-writer-YYYY-MM-DD.md) is up to date
[ ] All completed pages show status "Written" in the progress file
[ ] All blocked pages show a reason in the progress file
[ ] No page has been batched — each was saved individually
[ ] All unresolved flags have been escalated to the writer
```

---

## Notes

<!-- Add project-specific quality gates or acceptance criteria here -->
