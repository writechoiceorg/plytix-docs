# Open Items

Consolidated from the "## Open items" section of every `bruno-collection/*/README.md`.

## 01-Authentication
- [x] Ask Plytix whether the v3 API is live yet, and if so, the correct
      host/path and whether this test account needs a feature flag enabled.
      — **Partially answered.** v3 is confirmed live and fully working on
      `https://pim.dev.plytix.com/api/v3` under "David's Dev Account" (auth
      via `https://auth.dev.plytix.com`), separate from the prod host
      (`pim.plytix.com`), which still 503s for the "API Docs" account
      (`config/api-testing.config.md`, Environment section). Plytix's own
      David couldn't get it working on the prod host live on the call either
      and speculated something needs enabling on their end, inconclusively
      (`materials/transcripts/kick_off_2.md` ~L764-806;
      `materials/transcripts/wc-pos-kickoff-call-2.md` ~L119). Whether a
      *general* test account needs a feature flag on the prod host remains
      unanswered — still worth asking Plytix directly.
- [ ] Ask whether `refresh_token` is real/usable, or safe to ignore.
      — No source material anywhere answers this; genuine gap, still open.
- [x] Once v3 is reachable, re-run this same authorization test against it
      specifically (it may use a different token scope or host than v1).
      — Done: `Get Access Token (Dev).bru` and the `02-Products-v3` folder
      already run against the `Dev` environment/host.

## 02-Products-v3
- [x] Ask Plytix: is `GET /products/<sku>` meant to work on v3? (See
      config open question #5.)
      — **Answered as a confirmed doc-vs-live conflict**, not just an open
      question. `materials/api-references/API V3.md` and the newer
      `materials/project-references/API_V3-04_09_2026.pdf` (p.13) both claim
      SKU works as an identifier; live testing 422s
      (`config/api-testing.config.md` quirk #14), and the newer PDF still
      repeats the same unfixed claim (quirk #58). Reframe the ask to Plytix
      as "your own newer doc still says this works, but it doesn't" rather
      than "is this meant to work."
- [x] Ask Plytix: is `_expand` meant to work on `/products`, or is it
      legacy/v1-only? (Config open question #6.)
      — **Fully answered, can close.** `API_V3-04_09_2026.pdf` (p.11) states
      `_expand` is "not discarded but excluded for 3.0 version" — legacy/
      v1-only by design, confirmed by a live 400. No open question remains.
- [ ] Ask Plytix: are the undocumented raw-model fields
      (`product_family_model_id`, `mark_as_deleted`, `last_context`,
      `modified_user_audit`, `created_user_audit`) intentionally
      internal? (Config open question #7.)
      — Still a genuine gap: confirmed absent from `ProductOutputDto` in
      both `openapi_pimv3.json` and `openapi_pimv3_by_resource.json`, and
      never mentioned in any prose material. `modified_user_audit`/
      `created_user_audit` do appear, but only on the unrelated `AssetList`
      schema (a documented `UserAudit` object) — not a match.
- [ ] **Ask Plytix urgently**: is `DELETE /products/{id}/{path}` deleting
      the whole product intentional, or a bug? (Config open question #12.)
      — Stronger evidence this is a bug: Plytix's own
      `API_V3-04_09_2026.pdf` documents a scoped "1:M Unlink" delete design
      that live testing shows doesn't hold even for that officially
      documented pattern, reproduced twice (`config/api-testing.config.md`
      quirk #54). Frame the ask as "your own docs describe a scoped delete
      that doesn't work as described" rather than "is this intentional."
- [ ] Ask Plytix: what's the supported way to unassign a single
      category/asset from a product, given subpath `DELETE` doesn't work
      as a scoped removal? (Config open question #13.)
      — Partially answered: `PATCH` with a reduced array is the confirmed
      working mechanism for categories, already documented in
      `docs/integration-guides/safely-removing-categories-assets-or-relationships.mdx`.
      For assets specifically, still unconfirmed. Also newly relevant: the
      new `DELETE /products/{id}/relationships/{relationship_id}` (quirk
      #62) *is* a safe scoped delete, proving the pattern is achievable —
      sharpens the ask to "why wasn't this applied to categories/assets."

## 03-Product-Categories
- [x] Ask Plytix whether undeclared PATCH/DELETE is a stable, intentional
      part of the public API (config open question #8) — resolved by the
      2026-09-15 spec refresh formally declaring both.

## 04-Asset-Categories
- [x] Same open question as `03-Product-Categories` re: whether undeclared
      PATCH/DELETE is stable/intentional (config open question #8) —
      resolved by the 2026-09-15 spec refresh.

## 05-Product-Attribute-Groups
- [ ] Confirm whether `group_ids` sent on a `product-attributes` create
      actually links to this group — see `06-Product-Attributes`'s open
      item and config open question #11.
      — Still a genuine gap: no material (help-center, PDFs, transcripts,
      openapi schema descriptions) confirms this either way.

## 06-Product-Attributes
- [ ] **Report to Plytix as a bug**: `CompletenessAttribute` 500s on real
      attribute references (config open question #18).
      — Confirmed real, reproduced twice via this project's own testing
      (`config/api-testing.config.md` quirk #47); not acknowledged anywhere
      else in Plytix materials. Framing is correct as-is — this is a bug
      report, not an open question.
- [ ] Confirm `group_ids` actually links (config open question #11).
      — Same gap as `05-Product-Attribute-Groups` above.
- [ ] Confirm whether `FormulaAttribute`'s create path itself works, if
      the account limit can ever be raised (config open question #9).
      — The limit of 2 is confirmed real and live-tested
      (`config/api-testing.config.md`, Status-gating rules #1); no plan/
      pricing material anywhere documents this cap or how to raise it —
      genuine gap, still needs Plytix.
- [ ] Ask Plytix about `HierarchyAttribute`'s status (config open
      question #10).
      — Looks experimental/unimplemented, not a real public type: absent
      from `materials/help-center/attribute-types.md`'s full attribute-type
      list; help-center only uses "hierarchy" to describe the built-in
      Categories system attribute
      (`materials/help-center/prepare-your-sheet-for-import.md` L132); it's
      a 15th undocumented discriminator in the openapi spec that 500s on
      create. Safe to treat as unsupported for docs purposes, but still
      worth a final roadmap confirmation from Plytix.

## 07-Connections
- None specific to this folder — config open question #8 (is undeclared
  PATCH/DELETE stable/intentional) is resolved by the 2026-09-15 spec
  refresh formally declaring both.

## 08-Import-Profiles
- None specific to this folder.

## 09-Assets
- [ ] Ask Plytix: is `category_ids` meant to work on `POST /assets`, or
      is `PATCH`-after-create the intended flow? (config open question,
      relates to #12/#13.)
      — Partially answered: confirmed silently ignored on `POST /assets`
      create, confirmed working via `PATCH`-after-create (both already
      documented in the integration guide). Whether the silent-ignore on
      create is intentional design or a bug is still unconfirmed — narrow
      the ask to that specific point.

## 10-Pim-Product-Lists
- [x] Ask Plytix: is the Static-list-via-product-field mechanism
      intentional public API design? (Config open question #15.)
      — **Answered, can close as intentional design.**
      `openapi_pimv3.json`'s `ProductCreateDto`/`AssetCreateInputDto`
      schemas declare `static_list_ids` as a first-class, named, described
      field — not an undocumented workaround. One FYI worth passing to
      Plytix anyway: this deviates from the API's own general 1:M-
      association-endpoint convention documented in
      `API_V3-04_09_2026.pdf` — a minor inconsistency, not a blocker.

## 11-Asset-Lists
- None specific to this folder — see `10-Pim-Product-Lists`'s open item.

## 12-Pdf-Catalogs
- [ ] Ask Plytix: can the PDF Catalogs feature be enabled on this Dev
      account so the rest of this phase can actually run? (Config open
      question #14.) This now also covers testing the newly-declared
      `PATCH`/`DELETE`.
      — Confirmed as a real, deliberate account-level feature gate (422
      "Cannot create new items the feature pdfs for account ...", matches
      the same "Add-ons" pattern documented for the separate but similar
      Product Data Sheets feature, which
      `materials/help-center/creating-and-managing-product-data-sheets.md`
      explicitly calls a paid add-on requiring an Account Manager; also see
      the account-wide "Add-ons" section in
      `materials/help-center/general-account-info-settings.md`). The actual
      ask (enable it on this Dev account) remains open — no material
      confirms whether/how that can be done.

## 13-Product-Families
- [ ] Report the `GET /family-attributes` cross-tenant data leak to
      Plytix (see `17-Product-Relationships/README.md` for the other two
      affected endpoints).
      — Confirmed real via this project's own testing
      (`config/api-testing.config.md` quirk #59); not documented or
      acknowledged anywhere else in the gathered materials. Report as-is.
- [ ] Ask Plytix whether the `POST`-405-on-subpath spec mismatch for
      `/product-families/{id}/{path}` is expected.
      — Confirmed via direct spec comparison: the refreshed
      `openapi_pimv3.json` explicitly declares `post` as valid on that
      path, yet it 405s live regardless of the field targeted
      (`config/api-testing.config.md` quirk #67). No longer "does the spec
      say this" (it does) — narrow the ask to "why does live differ from
      your own spec."
- [ ] Ask Plytix whether "automatic inheritance" (the `403` on
      family-attribute `level` changes) can be enabled on this Dev
      account so the `PATCH` success shape can finally be captured.
      — "Automatic inheritance" itself is confirmed as a real,
      well-documented feature (`materials/help-center/how-to-create-and-manage-product-families.md`,
      matching the `level` field on `FamilyAttributeOutputDto`). Only the
      item's actual ask — enabling it on this Dev account — remains open.

## 14-Relationships
- None.

## 15-Channels
- [ ] Flag the vague rebuild-scheduling 422 to Plytix as a DX
      inconsistency (config open question #17).
      — No material explains this further; keep as-is.
- [ ] **New**: resolve a three-way scope conflict on whether Channels is
      actually part of the public v3 API. `materials/project-references/before-writing.md`
      states flatly "Channels are not in the API," while
      `materials/project-references/Writechoice - Project Requirements.pdf`
      separately describes a Channels endpoint "currently being
      developed... provided it is confirmed as part of the public API v3
      scope" — yet `openapi_pimv3.json` and live testing show a fully
      working `/channels` CRUD resource today. Ask Plytix to confirm
      Channels' actual scope/status before docs commit to covering it.

## 16-Ecatalogs
- [ ] Ask Plytix: can Ecatalogs (and PDF Catalogs) be enabled on this Dev
      account? (Config open question #16.) This now also covers testing
      the newly-declared `PATCH`/`DELETE`.
      — Same account-level feature-gate pattern confirmed as
      `12-Pdf-Catalogs` (422 "Cannot create new items the feature
      ecatalogs for account ..."). Genuine gap: unlike Product Data
      Sheets, no help-center article (`create-and-manage-e-catalogs.md`,
      `brand-portals-faq.md`, etc.) explicitly states Ecatalogs/Brand
      Portals is a paid add-on — worth asking Plytix to confirm whether
      it's gated the same way, in addition to the enablement ask.

## 17-Product-Relationships
- [ ] Report the cross-tenant data leak on `GET /product-relationships`
      and `GET /related-products` (and `GET /family-attributes`, a third
      affected endpoint) to Plytix as a likely data-isolation bug.
      — Confirmed real via this project's own testing
      (`config/api-testing.config.md` quirk #59); not documented or
      acknowledged anywhere else. Report as-is.
- [ ] Report the broken `.../related-products[/{id}]` subpath to Plytix.
      — Confirmed real bug (quirk #63): empty/404 despite a link
      confirmed live three other independent ways. Use
      `GET /related-products?product_id=<id>` as the workaround until fixed.
- [ ] Ask Plytix whether the safe, scoped `DELETE` on this new
      relationships resource can be backported to the older
      category/asset subpath-delete hazards (quirks #31/#54).
      — Still open; note the new endpoint (quirk #62) proves the safe
      pattern is achievable, sharpening the ask.
- [ ] **New**: `docs/integration-guides/safely-removing-categories-assets-or-relationships.mdx`
      currently states relationships can't be created/removed via the API
      at all — this is now stale/incorrect given the confirmed working,
      safe `DELETE /products/{id}/relationships/{relationship_id}`. Needs
      a correction independent of Plytix's answer above.
