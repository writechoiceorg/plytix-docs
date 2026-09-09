# Project Convention

> **How to use this file:** Fill in the platform-specific details for this project before writing begins. If a platform MCP is available (e.g. Mintlify MCP, Fumadocs MCP), note it here — the Writer skill will prefer the MCP over this file when both are available, and use this file as fallback or to resolve conflicts.

---

## Platform

**Documentation framework:** Mintlify
**Platform MCP available:** Yes
**Base URL:** [e.g. https://docs.yourproject.com]

---

## Frontmatter

All pages must include the following frontmatter fields:

```yaml
---
# Required fields — fill in per project
title: ""
description: ""
# Add further required fields below
---
```

**Optional fields:**
<!-- List optional frontmatter fields and their accepted values -->

---

## Components

List the available components for this project. The Writer skill will only use components listed here.

| Component | Usage | Syntax |
|---|---|---|
| [e.g. Callout / Note / Warning] | [When to use it] | [Exact syntax] |
| `CardList` | Wrapper for a group of Card components in the "Related articles" section | `<CardList cols={N}>...</CardList>` — set `cols` to match the number of cards (max 3) |
| `Card` | A single related article card with title, icon, link, and short description | `<Card title="..." icon="..." link="...">Description.</Card>` |

---

## Callout Types

> This table is the canonical syntax source referenced from `style-guide.md`'s "Links and callouts" section — keep the "When to use" wording in sync with that file.

| Type | When to use | Syntax |
|---|---|---|
| Note | Additional context that is helpful but not critical | `<Note>...</Note>` |
| Tip | Optional shortcuts or best practices | `<Tip>...</Tip>` |
| Info | Neutral, supplementary information | `<Info>...</Info>` |
| Warning | Actions that may cause data loss or unexpected results | `<Warning>...</Warning>` |
| Danger | Irreversible actions or serious consequences | `[PENDING]` — Mintlify has no distinct built-in "danger" component. Confirm whether `<Warning>` should double for this case or a custom callout is needed before publishing. |

---

## File Naming Conventions

**Format:** [e.g. kebab-case]
**Extension:** [e.g. `.mdx` / `.md`]
**Example:** `[example-file-name.mdx]`

---

## Notes

<!-- Add any additional platform-specific rules or constraints here -->
