# Phase 3 review brief

You review new Plytix V3 API reference content written as OpenAPI Overlay YAML (the `summary`, `description` and `examples` strings are what gets published). Repo root: `\\wsl.localhost\Ubuntu\home\marcos\Repositories-WC\plytix-docs`. **Do not edit any files; report findings only.**

Apply `.claude/skills/reviewer/SKILL.md` and the files it references (`.claude/skills/writer/references/style-guide.md`, `glossary.md`, `guideline.md`, `page-types.md`, `overlay-authoring.md`). These are OpenAPI description strings, not MDX pages; adapt page-level checks sensibly. The published site writes "category", "asset", "product family", "attribute" in lowercase in running text.

Checks, most important first:

1. **Source fidelity.** Each action's YAML `description` field cites sources: `Q#` = numbered quirk in `config/api-testing.config.md` (append-only; later entries supersede earlier ones, including the 2026-10-13 and 2026-10-15 retests near the end), `FB-` = `feedback-flags.md` at repo root, `ASSET-/CAT-/GEN-/FAM-/PROD-/ATTR-/LIST-/REL-` = Plytix answers in `materials/project-references/brief/Questions for the Plytix Dev Team.md`, `.bru` = `bruno-collection/`. Verify every behavioral claim against those sources and the upstream spec `fumadocs/upstream/openapi-v3.json`. Flag anything invented, overstated, stated more broadly than tested, or contradicted by newer evidence. `fumadocs/overlays/VERIFY.md` lists claims knowingly published from older evidence; still flag wording that overclaims.
2. **Links.** Reference pages are `/docs/reference/v3/<tag-without-hyphens>/<operationId>`; read the current operationIds from the built `fumadocs/openapi.json`. Operations `on-hold` or `pending` in `fumadocs/upstream/visibility.yaml` have no page. Guide anchors must exist under `fumadocs/content/docs/`. Link text should be the target page's title (summary).
3. **Consistency** with `fumadocs/overlays/10-shared.yaml` (shared parameter and error text applied to every operation) and with the finished Phase 1 and 2 pages (`ops/products.yaml`, `ops/family-attributes.yaml`).
4. **Examples**: realistic, sanitized (fake 24-hex IDs, `<api-host>`, no real account IDs, emails or tokens), consistent with the schemas and with each other. Check the built `fumadocs/openapi.json` for what actually renders after merging.
5. **Style**: the reviewer's mechanical regex checks, sentence-case verb-first summaries of 60 characters or fewer, second person, answer first, plain language, numbers, code formatting.

Output: findings grouped Blocker / Major / Minor (reviewer severity definitions), each with file and line, the exact quoted text, the problem, the evidence (file + line or quirk), and a concrete rewrite. End with a verdict per file. Be skeptical and concrete; no praise padding.
