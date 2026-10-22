# V3 spec overlays

Everything we add to or change in Plytix's V3 OpenAPI spec lives here, as [OpenAPI Overlay 1.0](https://spec.openapis.org/overlay/v1.0.0.html) documents. `fumadocs/openapi.json` is a build artifact: **never edit it by hand**; `npm run api:check` fails in CI if it doesn't match a fresh build.

```
upstream/openapi-v3.json    latest spec from Plytix (fixed filename; replace it with `npm run api:intake`)
upstream/visibility.yaml    which operations are public
overlays/*.yaml             our edits, applied in lexical order of path, later files win
overlays/baseline.lock.json generated: what each edit overrode, for drift detection (commit it)
        │
        ▼  npm run api:build
openapi.json  →  content/docs/reference/v3/<tag folder>/*.mdx
```

## Files

| File | Holds |
|---|---|
| `00-fixes.yaml` | Patches for upstream bugs. Every action needs `x-plytix-question: <ID>` from `QUESTIONS.md`. |
| `10-shared.yaml` | Snippets applied to many operations by wildcard (pagination, `_fields`, filters, shared error responses). |
| `20-meta.yaml` | Spec-level metadata: security scheme, nav order of the endpoint groups (`tags`). |
| `ops/<tag>.yaml` | Per-operation edits (summary, description, operationId, parameters, examples) for one upstream tag. |
| `schemas/<tag>.yaml` | Schema and property edits, filed under the tag that uses them first. |
| `examples/<tag>/*.json` | Sanitized request/response payloads, referenced from an `update` as `{ x-example-file: <tag>/<file>.json }`. |
| `QUESTIONS.md` | Open questions and discrepancies for Plytix. |
| `VERIFY.md` | Claims waiting for a live replay, and why operations are on hold. |
| `NEXT-STEPS.md` | Deferred work: restoring held operations, live verification, Phase 4 hardening, content fixes outside the reference. |

Per-operation files come after `10-shared.yaml`, so an operation-specific description replaces the shared snippet for that one operation.

## Targets

Anchor every edit to something stable: path + method, a parameter's `name` + `in`, or a component name. Never an array index or a free-form query. The build only accepts these target shapes:

| Shape | Example |
|---|---|
| operation | `$.paths['/api/v3/products'].get` |
| parameter | `$.paths['/api/v3/products'].get.parameters[?(@.name=='_fields' && @.in=='query')]` |
| request body | `$.paths['/api/v3/products'].post.requestBody.content['application/json']` |
| response | `$.paths['/api/v3/products'].post.responses['201'].content['application/json']` |
| schema / property | `$.components.schemas.ProductCreateDto.properties.sku` (also `.oneOf[0]`, `.items`) |
| shared parameter (wildcard) | `$.paths.*.*.parameters[?(@.name=='_page' && @.in=='query')]` |
| shared response (wildcard) | `$.paths.*.*.responses['422']` |
| root | `$` (only in `20-meta.yaml`) |

Paths use the upstream form (`/api/v3/product-categories/{identifier}`). Tags are already normalized when overlays run (`productcategories`). Each target may appear once per file.

`update` follows Overlay 1.0: objects merge, arrays append, anything else is replaced. Use `remove: true` only when you really need to delete something upstream.

## operationIds (page URLs)

Each operation's `operationId` is its page filename and URL (`/reference/v3/<tag folder>/<operationId>`, with the tag folder in kebab case: `assetcategories` becomes `asset-categories`). Upstream IDs are FastAPI function names that change when Plytix renames a function, so we set our own in `ops/<tag>.yaml`:

- kebab-case, `<verb>-<resource>`, resource in the singular for one record and the plural for search: `search-products`, `create-product`, `update-product`, `delete-product-category`
- verbs: `search` (paginated, filterable), `list` (a nested collection without filters), `get`, `create`, `update`, `delete`, plus `link` for routes that attach an existing record
- drill-in (`/{identifier}/{path}`) routes add `-field`: `get-product-field`, `update-product-field`
- nested resources name the full chain: `get-product-relationship`, `create-family-attribute`

Never reuse an ID for a different operation. When an ID changes, `api:build` adds a redirect from the old URL to `redirects.v3.json` automatically. Update hand-written links to the new URL in the same change (the build fails on links inside the spec; MDX links are found by the site build).

## Drift detection

Each build records, for every node an edit touches, its type and the upstream value of every field we override (`baseline.lock.json`). On a new upstream spec:

| Report code | Meaning | What to do |
|---|---|---|
| `ZERO_MATCH` | The thing we edit was renamed, removed, or made non-public. | Re-point the target (move the content with it) or delete the action. |
| `MULTI_MATCH` | A single-node target now matches several nodes. | Make the target specific. |
| `REDUNDANT_FIX` | Upstream now declares a parameter a fix adds. | Delete the fix; record the answer in `QUESTIONS.md`. |
| `TYPE_CHANGED` | An edited parameter or property changed type. | Check our text and examples, then `npm run api:accept`. |
| `UPSTREAM_CHANGED` | Plytix changed a field we override (maybe fixing what we patched). | Keep or drop our override, then `npm run api:accept`. |

Operations set to `on-hold` in `upstream/visibility.yaml` are left out of the build. Their edits stay in the overlay files and their baseline entries are kept, so restoring one is a one-line change in `visibility.yaml`.

Fields we never touched aren't recorded, so upstream changes to them flow straight through. The full report is written to `reports/api-drift.md` (and the GitHub job summary in CI). Coverage (which public operations still have no edits) goes to `reports/api-coverage.md`.

## Commands (run in `fumadocs/`)

| Command | Does |
|---|---|
| `npm run api:intake -- <file>` | Copies a new Plytix spec to `upstream/openapi-v3.json`, records it in `upstream/SOURCE.json`, lists added/removed operations and visibility gaps. |
| `npm run api:build` | Filter → normalize → overlays + drift → validate → write `openapi.json` → regenerate MDX. Writes nothing unless every check passes. |
| `npm run api:accept` | Same, accepting reviewed `TYPE_CHANGED` / `UPSTREAM_CHANGED` items into the baseline. |
| `npm run api:check` | CI: build, then fail if any generated file differs from what's committed. |
| `npm run api:crosscheck` | Applies the same overlays with openapi-format and confirms identical output (proves the files stay standard). |
| `npm run api:test` | Pipeline tests, including simulated renames and upstream fixes. |

## Writing descriptions

Follow `.claude/skills/writer/references/style-guide.md` and `glossary.md`. Descriptions are Markdown (links, tables, code). Link to other pages with site routes (`/docs/guides/...`, `/reference/v3/...`); the build fails on a link to a page that doesn't exist. Don't state behavior that no source confirms: add a question to `QUESTIONS.md` instead.
