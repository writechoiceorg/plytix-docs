# plytix-docs

Documentation engagement repo: WriteChoice is producing developer documentation (API v1/v2/v3, MCP, migration) for Plytix. Mostly research and writing; the only runnable code is the Fumadocs site.

## Layout

| Path | What it is |
|---|---|
| `materials/` | Raw inputs from Plytix: API references, project brief, brand guidelines, transcripts, help-center scrape. See [materials/README.md](materials/README.md). |
| `openapi_pimv3_20261002 (Latest spec).json` | Authoritative v3 OpenAPI spec. Older/derived specs (`openapi_pimv3.json`, `openapi_pimv3_by_resource.json`) and `openapi_pimv1.json` (v1/v2) sit alongside. |
| `config/`, `bruno-collection/` | Live API testing: config, Bruno collection, open items, untested endpoints. |
| `fumadocs/` | The docs site (content in `fumadocs/content/`). |
| `.claude/skills/` | Skills: `docs-ia`, `structure-planner`, `writer`, `reviewer`, `endpoint-tester`. |
| `roadmap.md`, `plytix-outline-canvas.md`, `Plytix_Tracker*.csv` | Planning and tracking. |
| `output-writer-*.md`, `output-reviewer-*.md` | Logs from writer/reviewer runs. |
| `docs (deprecated)/`, `docs-fumadocs (deprecated)/` | Old scaffolds, not in use. |

## Source trust order

Verified/live API findings > OpenAPI spec > `materials/` raw sources > scraped docs (`help-center/`, `existing-docs-scrape/`). Brand and SEO guidelines shape wording, never scope.

See [CLAUDE.md](CLAUDE.md) for working conventions.
