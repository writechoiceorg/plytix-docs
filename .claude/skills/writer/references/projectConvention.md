# Project Convention

> **How to use this file:** This file records the platform-specific details for this project. If a platform MCP is available, note it here. The Writer skill will prefer the MCP over this file when both are available, and use this file as fallback or to resolve conflicts.
>
> **Updated 2026-09-29:** the project moved from Mintlify to Fumadocs. Everything below reflects the Fumadocs site in `fumadocs/` (component registry: `fumadocs/components/mdx.tsx`; frontmatter schema: `fumadocs-core`'s `pageSchema`, loaded in `fumadocs/lib/source.ts`). The Mintlify-era drafts in `docs (deprecated)/` and `docs-fumadocs (deprecated)/` are not the reference for syntax.

---

## Platform

**Documentation framework:** Fumadocs (`fumadocs-core` 16.x, `fumadocs-ui` via `@fumadocs/base-ui`, `fumadocs-mdx`, `fumadocs-openapi`) on Next.js
**Platform MCP available:** No
**Content root:** `fumadocs/content/docs/`
**Docs base route:** `/docs` (set in `fumadocs/lib/shared.ts`)
**Base URL:** `[PENDING]`: production domain not confirmed yet

---

## Frontmatter

Fumadocs validates frontmatter with `pageSchema`, which **strips any field it doesn't know**. Fields like `slug`, `audience`, `keywords`, `time_to_complete`, `prerequisites`, or `generated` are silently dropped and never reach the page. Don't add them.

All pages must include:

```yaml
---
title: "Sync your ERP with Plytix"
description: "Read product data from Plytix, detect changes, and push updates back so your ERP and Plytix stay in sync."
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Renders as the page H1. Don't repeat the title as a `# H1` in the body. Follows the title rules in `style-guide.md` (sentence case, 60 characters or fewer). |
| `description` | Recommended | Renders under the title and is used for metadata. Follows `style-guide.md`'s SEO rules. |
| `icon` | No | A Lucide icon name (for example, `Rocket`). Resolved by `lucideIconsPlugin`. Mainly for sidebar entries. |
| `full` | No | `true` renders a full-width page. Used by generated endpoint pages; don't set it on hand-written pages. |
| `_openapi` | No | Written by the OpenAPI generator. Never hand-edit. |

**Slugs and URLs:** there is no `slug` field. The URL comes from the file path under `content/docs/`. For example, `content/docs/guides/exporting-your-full-catalog.mdx` is served at `/docs/guides/exporting-your-full-catalog`.

**Audience, time to complete, prerequisites:** because these can't live in frontmatter, put them in the page body (for example, in the Prerequisites or Before you begin section defined in `page-types.md`).

---

## Components

These are the only components registered in `fumadocs/components/mdx.tsx`, on top of Fumadocs' default MDX elements. Don't use any other component.

| Component | Usage | Syntax |
|---|---|---|
| `Callout` | Notes, tips, warnings, and writer flags. See Callout types below. | `<Callout type="info" title="...">...</Callout>` |
| `Cards` | Wrapper for a group of `Card` components, used in the "Related articles" section | `<Cards>...</Cards>`. Lays out cards in a grid; use exactly 2 cards in a "Related articles" or "Related resources" section (see `style-guide.md`). Landing and section-index pages use `Cards` for navigation and aren't capped. |
| `Card` | A single related article card with title, icon, link, and short description | `<Card icon={<Search />} title="..." href="/docs/guides/...">Description.</Card>` |
| `Steps` / `Step` | Visual step layout. Available, but how-to procedures use numbered lists per `style-guide.md`. Use only for tutorial milestones if the project lead approves. | `<Steps><Step>...</Step></Steps>` |
| `Tabs` / `Tab` | Alternatives the reader picks one of (for example, v1/v2 vs. v3 samples, or curl vs. Python) | `<Tabs items={['v3', 'v1/v2']}><Tab value="v3">...</Tab><Tab value="v1/v2">...</Tab></Tabs>` |
| `Accordions` / `Accordion` | Collapsible detail such as troubleshooting entries or FAQs | `<Accordions type="multiple"><Accordion title="...">...</Accordion></Accordions>` |
| `OpenAPIPage` | Generated endpoint reference pages only | Written by the OpenAPI generator. Never hand-write. |

### Icons

`Card` icons are Lucide React components imported at the top of the page, below the frontmatter:

```mdx
import { Search, SatelliteDish } from 'lucide-react';
```

Use any icon name from [lucide.dev/icons](https://lucide.dev/icons). Import every icon you use; an unimported icon breaks the build.

### Links

Internal links use absolute paths from the docs route, without the file extension: `/docs/guides/quickstart`, `/docs/reference/v3/pagination`.

---

## Callout Types

> This table is the canonical syntax source referenced from `style-guide.md`'s "Links and callouts" section. Keep the "When to use" wording in sync with that file.

Fumadocs' `Callout` accepts `type`: `info` (default), `warn`, `warning` (alias of `warn`), `error`, `success`, and `idea`. Always pass `type` explicitly, and add a short `title` when it helps the reader scan.

| Type | When to use | Syntax |
|---|---|---|
| Note | Additional context that is helpful but not critical | `<Callout type="info">...</Callout>` |
| Tip | Optional shortcuts or best practices | `<Callout type="idea">...</Callout>` |
| Info | Neutral, supplementary information | `<Callout type="info">...</Callout>` |
| Warning | Actions that may cause data loss or unexpected results | `<Callout type="warn">...</Callout>` (use `warn`, not the `warning` alias) |
| Danger | Irreversible actions or serious consequences | `<Callout type="error">...</Callout>` |

**Writer flags in published drafts:** when a `FLAG` from the Writer skill has to stay visible on a page, use `<Callout type="warn" title="FLAG">...</Callout>`. This is the pattern the existing guides use. In unpublished drafts, the Markdown blockquote format from the Writer skill (`> **FLAG:** ...`) is still fine.

---

## File Naming Conventions

**Format:** kebab-case
**Extension:** `.mdx`
**Example:** `syncing-your-erp-with-plytix.mdx`

Generated endpoint reference pages keep the OpenAPI generator's operation-ID filenames (for example, `search_assets_api_v3_assets_get.mdx`). Don't rename them.

---

## Navigation (`meta.json`)

Sidebar order and grouping come from a `meta.json` file in each folder, not from frontmatter. A page that exists on disk but isn't listed in its folder's `meta.json` pages array won't appear where you expect in the sidebar.

- `"pages"` lists page filenames without the extension, in sidebar order.
- `"---Group name---"` entries create a sidebar separator (for example, `"---Integration Guides---"`).
- `"root": true` makes a folder a top-level sidebar root (used by `guides`, `reference`, `reference/v3`, `reference/legacy`).

When you add a page, add it to the right `meta.json` and to `information-architecture.md`.

---

## Notes

- `fumadocs/AGENTS.md` warns that this Next.js version has breaking changes. Read the docs in `fumadocs/node_modules/next/dist/docs/` before touching any code outside `content/`.
