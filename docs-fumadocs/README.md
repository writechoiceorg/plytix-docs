# Plytix Docs (Fumadocs)

This is a Fumadocs (Next.js) clone of the Mintlify project at `../docs`, built for
side-by-side comparison. Same content, navigation, and branding — different
docs framework.

- Run locally: `npm install && npm run dev`
- Build: `npm run build`
- Regenerate the API Reference endpoint pages from the OpenAPI spec:
  `npm run generate:api`

## Structure

- `content/docs/guides/` — the "Guides" tab: `overview`, `get-started-with-api`,
  plus `rate-limits` (present but intentionally unlisted in `guides/meta.json`,
  matching the Mintlify site where this page exists and is cross-linked but
  isn't in `docs.json`'s navigation).
- `content/docs/api-reference/` — the "API Reference" tab: the three intro
  pages (`api-overview`, `authentication`, `status-codes`) plus
  `endpoints/`, generated from `openapi.json` (a copy of
  `../docs/api-reference/openapi.json`, itself a copy of the repo-root
  `openapi_pimv3.json` with the same two additions documented in
  `../docs/README.md`).
- `src/app/(home)/page.tsx` — the custom homepage, a close visual port of
  `../docs/index.mdx` (same hero, same three cards, same copy), using Tailwind
  directly instead of Mintlify's `<Card>`/`<CardGroup>` shorthand.

## Navigation model

Mintlify's `docs.json` defines three top-level tabs: Home, Guides, API
Reference. The `/docs` section uses Fumadocs' **Notebook** layout
(`fumadocs-ui/layouts/notebook`, not the default `layouts/docs`) with
`tabMode="navbar"` — see
https://www.fumadocs.dev/docs/ui/layouts/notebook#tab-mode — which renders
Layout Tabs as underlined links in the navbar instead of a sidebar dropdown,
closer to Mintlify's top tab bar. `content/docs/guides/meta.json` and
`content/docs/api-reference/meta.json` are both marked `"root": true`, which
`getLayoutTabs()` auto-detects and turns into those tabs (see
`src/app/docs/layout.tsx`). "Home" isn't a folder (the homepage lives outside
`/docs` entirely), so it's added as a plain nav link in
`src/lib/layout.shared.tsx` instead.

The navbar itself uses `nav={{ mode: 'top' }}` — see
https://www.fumadocs.dev/docs/ui/layouts/notebook#nav-mode — so the logo/title
and nav links sit in the same full-width bar as the tabs, instead of a
separate row above the sidebar.

Note: switching to the Notebook layout also required importing `DocsPage`
(and its `DocsBody`/`DocsTitle`/`DocsDescription`/etc. siblings) from
`fumadocs-ui/layouts/notebook/page` instead of `fumadocs-ui/layouts/docs/page`
in `src/app/docs/[[...slug]]/page.tsx` — each layout variant ships its own
matching `DocsPage`, and mixing a `docs` `DocsPage` under a `notebook`
`DocsLayout` throws "Please use `<DocsPage />` under `<DocsLayout />`" at
render time.

## Branding

Same source as the Mintlify site (`../docs/README.md`'s "Branding" section):
primary color `#7A52FF` (`--color-fd-primary` in `src/app/global.css`), the
`favicon.svg` and `logo/{light,dark}.svg` copied into `public/`, and the
Figtree font loaded via `next/font/google` in `src/app/layout.tsx`.

## OpenAPI integration

Fumadocs generates one physical `.mdx` file per operation via
`fumadocs-openapi`'s `generateFiles()` (`scripts/generate-docs.mjs`), grouped
into per-tag folders (`groupBy: 'tag'`) — the closest equivalent to Mintlify's
single `"openapi": "api-reference/openapi.json"` entry, which instead
generates pages dynamically at request time.

Two non-obvious wiring steps were needed beyond the default scaffold, because
this version of `fumadocs-openapi` (v11) ships `createOpenAPIPage()` as a
client-only export:

1. `src/components/openapi-page.tsx` calls `createOpenAPIPage()` inside a
   `'use client'` file and exports the resulting component. Calling it
   directly inside `src/components/mdx.tsx` (a server module) throws
   "Attempted to call createOpenAPIPage() from the server."
2. Each generated page's frontmatter declares `_openapi.preload`, but the
   generated `<Comp document="..." .../>` call doesn't forward the preloaded
   schema on its own — `src/app/docs/[[...slug]]/page.tsx` calls
   `openapi.preloadOpenAPIPage(page)` and spreads the result onto `<MDX
   .../>`, and `scripts/generate-docs.mjs`'s `beforeWrite` hook patches every
   generated file to read it (`preloaded={props.preloaded}`). Without this,
   pages 500 with `Cannot read properties of undefined (reading 'bundled')`.

If `fumadocs-openapi` is upgraded and either of these becomes unnecessary,
simplify accordingly — they're workarounds for this specific version, not
intentional design.

The `probes` (`/is_ready`) and `unknown` (`/metrics`) tag groups come straight
from `openapi.json` having no better tag for those two operations; Mintlify's
site would generate the same pages from the same spec.

## Known gaps vs. the Mintlify site

- No search backend configured beyond Fumadocs' built-in local search
  (Mintlify ships its own).
- No llms.txt/AI-chat parity check was done beyond confirming the scaffold's
  default routes build.
