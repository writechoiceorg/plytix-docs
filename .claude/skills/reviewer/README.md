# Reviewer Skill — README

## Purpose

The Reviewer skill checks documentation pages against the project's standards and source materials, then produces a findings report with a verdict. It is the quality gate that runs after the Writer skill.

## Scope

**This skill covers:**
- Reviewing pages produced by the Writer skill before publishing
- Reviewing hand-edited or existing `.mdx` pages
- Re-checking pages against the OpenAPI spec after the spec changes
- Optionally applying approved fixes (*report and fix* mode)

**This skill does not cover:**
- Writing or expanding pages → use the Writer skill
- Auditing the whole docs set for gaps, redundancy, or navigation → use the `docs-ia` skill
- Live endpoint testing → use the `endpoint-tester` skill

---

## Reference files

The Reviewer **shares the Writer skill's references**. It does not keep its own copy of any writing rule, so updating a Writer reference updates both skills.

| File | Owner | Purpose |
|---|---|---|
| `../writer/references/glossary.md` | Writer (shared) | Approved terminology |
| `../writer/references/style-guide.md` | Writer (shared) | Writing rules, voice, and tone |
| `../writer/references/page-types.md` | Writer (shared) | Structure templates per page type |
| `../writer/references/projectConvention.md` | Writer (shared) | Frontmatter, components, callouts, file naming |
| `../writer/references/information-architecture.md` | Writer (shared) | IA map, file paths, and IA constraints |
| `../writer/references/checklist.md` | Writer (shared) | Verification checklist, used as the review gate |
| `references/review-report.md` | Reviewer | Severity levels, verdict rules, report template |

If a review finds that a rule is missing or wrong, the fix goes into the Writer reference file, not into this skill.

---

## How it works

1. **Collect context**: target page(s), review mode, source material
2. **Mechanical checks**: grep for dashes, banned words, heading depth, bare code fences, unresolved flags
3. **Manual review**: accuracy, terminology, structure, formatting, style, placement, checklist gate
4. **Report**: findings with severity, rule citation, and suggested fix, plus a verdict
5. **Fix** (optional): apply approved fixes and re-run the mechanical checks

Multi-page reviews are saved to `output-reviewer-YYYY-MM-DD.md` at the repo root.

---

## Notes for team members

- Report only is the default. The skill won't touch a page unless you ask for *report and fix*.
- Blocker accuracy findings are never fixed by guessing. They need a source or an answer from the project lead.
- "Reference drift" findings mean a Writer reference is out of date with the repo. Update the reference, then re-run the review.
