# materials/

Raw source material from Plytix. Inputs only — extract facts into outline/planning files instead of editing these.

```
materials/
├── api-references/
│   ├── v3-reference/          API V3 prose doc, dated PDF exports, status map
│   ├── v1-reference/          v1 Postman collection, v1/v2 rate limits
│   ├── bulk-operations/       Bulk API docs (large clients only)
│   ├── endpoint-reviews/      Plytix endpoint review / visibility spreadsheets
│   └── existing-docs-scrape/  scraped index.html of current docs
├── project-references/
│   ├── brief/                 requirements, before-writing, feedback, dev-team questions
│   └── brand-and-style/       branding, content guidelines, image guide
├── transcripts/               kickoff calls and team syncs
└── help-center/               scrape of help.plytix.com (Markdown, mirrors site slugs)
```

Trust order when sources conflict: verified/live API findings > `openapi_pimv3_20261002 (Latest spec).json` > files here > scraped docs (`help-center/`, `existing-docs-scrape/`).
