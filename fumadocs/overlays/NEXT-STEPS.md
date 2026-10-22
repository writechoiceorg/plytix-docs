# V3 reference: deferred work

The overlay pipeline and the reference content for all 87 published V3 operations are done (phases 0 to 3, 2026-10-20). This file lists what was deliberately postponed, so the work can resume later. The full original plan is in the project's planning notes; this file is the part still open.

Related files:

- `README.md`: how the overlays and the build work
- `VERIFY.md`: every published claim waiting for a live recheck, row by row
- `QUESTIONS.md`: open questions for the Plytix dev team

## 1. Restore the operations on hold (deferred from Phase 2)

Twelve operations are `on-hold` in `../upstream/visibility.yaml`: the live API contradicted the spec, so they're left out of the docs. Their overlay text is kept but not applied, and their drift baseline is preserved.

| Operations | Why they're on hold | Question |
|---|---|---|
| `POST /api/v3/products/{product_id}/relationships` and `.../relationships/{relationship_id}`, `PATCH .../relationships/{relationship_id}` | `405`, `405`, `422` on 2026-10-15 (FB-024); they worked on 2026-09-15 | REL-2 |
| `GET /api/v3/products/{product_id}/relationships` | `404 "Field 'relationships' does not exist"` (FB-024) | REL-2 |
| `GET`, `PATCH`, `DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}` | Never worked | REL-2 |
| `GET .../relationships/{relationship_id}/related-products`, `/{related_product_id}`, `/{related_product_id}/{path}` | Empty results or `404` for links that exist (quirk #63; still broken 2026-10-13) | REL-1, REL-2 |
| `POST /api/v3/product-families/{identifier}/{path}` | `405` for every path (quirk #67) | FAM-21 |
| `GET /api/v3/product-relationships` | The published item schema doesn't match the live shape (FB-024); held on 2026-10-22. Its page `/reference/v3/product-relationships/search-product-relationships` is gone, so restore links to it when it comes back | REL-2 |

To restore one, once Plytix confirms the contract and a live test passes:

1. Retest the operation (see section 2 for credentials).
2. Rewrite its overlay text. The held actions carry an `x-review` note because their text predates the current standard: `ops/product-relationships.yaml`, `ops/related-products.yaml`, `ops/product-families.yaml`.
3. Set it back to `public` in `../upstream/visibility.yaml`.
4. Run `npm run api:build` and fix any drift it reports.

## 2. Run the live verification (deferred from phases 1 to 3)

Nothing has been replayed against the live API since the overlays were written: the Dev API key in `bruno-collection/.env` is rejected by both auth hosts (`401 "Query did not throw any results"`). It was also pasted in chat once, so treat it as exposed.

To resume:

1. Ask Plytix (David) for a new Dev API key and password. Put them in `bruno-collection/.env` and quote the password, since it contains `&`. Never `source` the file; parse it.
2. Work through `VERIFY.md` top to bottom (Phase 1 pilot, Phase 2, Phase 3). Write tests run on the Dev account only, with scratch records named `WC-TEST-*`, cleaned up afterwards (`bruno-collection/TESTING_PLAN.md`).
3. For each item: fix any overlay text the result contradicts, record the result in `config/api-testing.config.md`, and close the matching question in `QUESTIONS.md`.
4. Run `npm run api:build`. If a fix in `00-fixes.yaml` is now redundant because Plytix fixed the spec, the build fails with `REDUNDANT_FIX`: delete that fix.

## 3. Send the questions to Plytix

`QUESTIONS.md` holds about 60 open items, grouped by area. Send them to the Plytix dev team in the same format as `materials/project-references/brief/Questions for the Plytix Dev Team.md`. The ones that unblock the most:

- REL-2: the relationship write contract (unblocks section 1)
- OAS-3: spec delivery cadence and a stable URL (unblocks section 4)
- OAS-4: visibility of the 16 `pending` link operations (category, list, and group linking)
- PROD-17, LIST-20, ASSET-24: whether static lists and asset linking are public
- OAS-2: the production V3 base URL (the spec has no `servers` until then)
- ATTR-20: whether `GET /api/v3/product-attributes` is scoped to the caller's account

## 4. Phase 4: hardening (not started)

1. **Automatic intake.** When Plytix provides a stable spec URL (OAS-3), add a `schedule:` trigger to `.github/workflows/api-spec.yml` that runs the existing `intake` job with that URL. It already downloads the spec, runs `api:intake` and `api:build`, and opens a PR with the drift report. Note: PRs opened with the default `GITHUB_TOKEN` don't trigger the `check` job, so use a bot token or push a commit to the PR.
2. **Strict coverage in CI.** Change the `check` job to run `npm run api:check -- --strict-coverage`. It passes today; it makes CI fail when a new upstream operation arrives without overlay edits or with a FastAPI-style operationId.
3. **Cloudflare deploy job (optional).** Add a `deploy` job on `main` after `check` passes, running `npm run cf:deploy` with `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets. Decide who owns the token first. Deploys are manual today.
4. **Periodic live replay.** Once credentials work, schedule the `endpoint-tester` skill to replay the published examples and flag differences.
5. **Lint.** `npm run lint` crashes because `typescript-eslint` doesn't support TypeScript 7. The CI lint step is non-blocking until that's fixed; make it blocking again afterwards.
6. **Optional: apply overlays on every site build.** Add `"prebuild": "npm run api:build"` to `fumadocs/package.json`. Trade-off: a drift failure on a new spec would then block every deploy, not only the spec update.

## 5. Fix content outside the reference

Reviews found pages and references that contradict the current findings. None were changed.

| File | Problem |
|---|---|
| `content/docs/guides/data-model.mdx` | Lists "paragraph" and "hierarchy" attribute types (removed, quirk #110); says product relationship `POST`/`PATCH` work (FB-024); says `GET /products/{id}` ignores `_fields` (FB-004); presents `_fields=family_attributes.*` as working (untested, FAM-23); says family-attribute rows hold `attribute` (they hold `attribute_id`); cites `/api/v3/pim-product-lists` (removed); says static list members are added on the list (membership lives on each record) |
| `content/docs/guides/migrating-to-v3/endpoint-mapping.mdx`, `migrating-to-v3/index.mdx` | Point to `POST`/`DELETE` link routes that are `pending` (no reference page) |
| `content/docs/reference/v3/errors-status-codes.mdx` | Shows the old `422` format (`detail[].loc`) and a `NOT_FOUND` name; live bodies use `errors[]` with `InputDTOValidationError` / `NotFoundError` |
| `content/docs/reference/v3/filtering-query-syntax.mdx` | Says `_fields` is ignored on GET by ID and cites `HiddenFieldError` (both superseded) |
| `content/docs/guides/platform-mcp/available-tools.mdx` | Says attribute groups can't be updated (they can, quirk #108) |
| `.claude/skills/writer/references/glossary.md` | Attributes "keyed by name" (it's `label`); Smart List defined as a UI saved filter only; relationship links listed as writable; `[PENDING]` capitalized terms vs the lowercase convention the site uses |
| `roadmap.md` | Says the generic product field `DELETE` must not be presented as a way to unlink (superseded by quirk #105) |
| `bruno-collection/` READMEs and `.bru` docs | Several still describe fixed bugs (cross-tenant leak, `relationship_id` filter) and miss the 2026-10-15 regressions |

Use the `writer` and `reviewer` skills for these, and the `feedback-corrector` skill if any come from David's feedback.

## 6. Smaller follow-ups

- Since 2026-10-22 each reference page shows one success response and one error (see `README.md`, "Responses on the page"). The shared errors (`401`, `402`, `500`, `502`) now appear only on `content/docs/reference/v3/errors-status-codes.mdx`, so fixing that page (section 5: old `422` format, `NOT_FOUND` name) matters more than before. No bodies were ever captured for `402`, `500`, or `502` (OAS-8).
- Ten success examples (the `GET .../{path}` field routes, the family-attribute link routes) and the `GET /product-attributes` page were written without a capture so they don't render as `null`. They're listed in `VERIFY.md`. `GET /product-relationships` still has no example: its shape changed on 2026-10-15 (FB-024) and wasn't captured.
- Timestamps without a timezone offset in search responses fail `date-time` validation (OAS-9). Redocly reports these as warnings.
- The `AssetCreateInputDto` `oneOf` overlap warning is upstream; it goes away if Plytix tightens the branches.
- Commit the work: everything from phases 0 to 3 is still uncommitted on the `api-overlays` branch.
