# Review report format

> **How to use this file:** This file defines how the Reviewer skill rates findings, decides a verdict, and formats the report. It is Reviewer-only. All writing rules live in the Writer skill's references (`../../writer/references/`); do not add style or terminology rules here.

---

## Severity levels

| Severity | Meaning | Examples |
|---|---|---|
| **Blocker** | The page is wrong or misleading. It must not be published until this is fixed. | Endpoint, field, or behavior that contradicts the OpenAPI spec; invented behavior; roadmap feature presented as live; implies an API for a UI-only feature (Channels); v3 write support claimed; unresolved `FLAG:` with no escalation |
| **Major** | The page breaks a required rule and a reader will notice. Fix before publishing. | Wrong page type or mixed page types; missing required section or frontmatter field; product term that contradicts `glossary.md`; component not in `projectConvention.md`; file path not in the IA map; broken internal link |
| **Minor** | A style or formatting rule is broken, but meaning is intact. | Em/en dash; banned word; heading not in sentence case; list punctuation mixed; number formatting; description outside 120-155 characters; alt text over 125 characters |
| **Nit** | Optional polish, or a judgment call with no specific rule behind it. | Tighter wording; a better example; reordering for flow |

Two more finding types sit outside the severity scale and don't affect the verdict:

- **Reference drift**: a Writer reference contradicts the repo (for example, the platform named in `projectConvention.md` isn't the one in use, or an IA path doesn't exist on disk).
- **Reference gap**: a reference is silent on something the review needed a rule for.

---

## Verdict rules

| Verdict | When |
|---|---|
| **Approve** | No Blocker or Major findings. Minor and Nit findings may remain. |
| **Approve with changes** | No Blockers, and every Major finding has a concrete fix the writer can apply without new source material. |
| **Needs rewrite** | Any Blocker, or Major findings that need new source material, or the page is the wrong type for its goal. |

---

## Report template

Use this template for each reviewed page. For multi-page reviews, put a summary table at the top of `output-reviewer-YYYY-MM-DD.md`:

```md
# Review session: YYYY-MM-DD

| Page | File path | Page type | Verdict | Blocker | Major | Minor | Nit | Status |
|---|---|---|---|---|---|---|---|---|
| [title] | `[path]` | [type] | [verdict] | 0 | 0 | 0 | 0 | Pending / In review / Reviewed |
```

Per-page section:

```md
## [Page title]

**File:** `[path]`
**Page type:** [type]
**Mode:** Report only / Report and fix
**Sources checked:** [spec files, materials, pages cross-checked]
**Verdict:** Approve / Approve with changes / Needs rewrite

### Summary

Two or three sentences: overall quality and the most important thing to fix.

### Findings

| # | Severity | Location | Issue | Rule | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Blocker | `## Step 2`, line 48 | Says `GET /api/v3/channels` exists | information-architecture.md, Notes | Remove; bridge to UI setup per style-guide.md "Don't say no" | Open |
| 2 | Minor | Intro, line 7 | "simply" | style-guide.md, Words and phrases to avoid | Delete "simply" | Open |

### Checklist results

| Checklist item | Result | Finding # |
|---|---|---|
| All information comes from the source material | Pass / Fail / N/A | |
| … one row per item in checklist.md … | | |

### Reference drift and gaps

- [Drift or gap, which reference file, and the suggested update]

### Out of scope

- [Structural issues beyond this page; recommend `docs-ia` if relevant]
```

Status values: **Open**, **Fixed**, **Skipped** (with reason), **Needs source** (waiting on the project lead or live testing).
