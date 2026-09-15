# Open Items

Consolidated from the "## Open items" section of every `bruno-collection/*/README.md`.

## 01-Authentication
- [ ] Ask Plytix whether the v3 API is live yet, and if so, the correct
      host/path and whether this test account needs a feature flag enabled.
- [ ] Ask whether `refresh_token` is real/usable, or safe to ignore.
- [ ] Once v3 is reachable, re-run this same authorization test against it
      specifically (it may use a different token scope or host than v1).

## 02-Products-v3
- [ ] Ask Plytix: is `GET /products/<sku>` meant to work on v3? (See
      config open question #5.)
- [ ] Ask Plytix: is `_expand` meant to work on `/products`, or is it
      legacy/v1-only? (Config open question #6.)
- [ ] Ask Plytix: are the undocumented raw-model fields
      (`product_family_model_id`, `mark_as_deleted`, `last_context`,
      `modified_user_audit`, `created_user_audit`) intentionally
      internal? (Config open question #7.)
- [ ] **Ask Plytix urgently**: is `DELETE /products/{id}/{path}` deleting
      the whole product intentional, or a bug? (Config open question #12.)
- [ ] Ask Plytix: what's the supported way to unassign a single
      category/asset from a product, given subpath `DELETE` doesn't work
      as a scoped removal? (Config open question #13.)

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

## 06-Product-Attributes
- [ ] **Report to Plytix as a bug**: `CompletenessAttribute` 500s on real
      attribute references (config open question #18).
- [ ] Confirm `group_ids` actually links (config open question #11).
- [ ] Confirm whether `FormulaAttribute`'s create path itself works, if
      the account limit can ever be raised (config open question #9).
- [ ] Ask Plytix about `HierarchyAttribute`'s status (config open
      question #10).

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

## 10-Pim-Product-Lists
- [ ] Ask Plytix: is the Static-list-via-product-field mechanism
      intentional public API design? (Config open question #15.)

## 11-Asset-Lists
- None specific to this folder — see `10-Pim-Product-Lists`'s open item.

## 12-Pdf-Catalogs
- [ ] Ask Plytix: can the PDF Catalogs feature be enabled on this Dev
      account so the rest of this phase can actually run? (Config open
      question #14.) This now also covers testing the newly-declared
      `PATCH`/`DELETE`.

## 13-Product-Families
- [ ] Report the `GET /family-attributes` cross-tenant data leak to
      Plytix (see `17-Product-Relationships/README.md` for the other two
      affected endpoints).
- [ ] Ask Plytix whether the `POST`-405-on-subpath spec mismatch for
      `/product-families/{id}/{path}` is expected.
- [ ] Ask Plytix whether "automatic inheritance" (the `403` on
      family-attribute `level` changes) can be enabled on this Dev
      account so the `PATCH` success shape can finally be captured.

## 14-Relationships
- None.

## 15-Channels
- [ ] Flag the vague rebuild-scheduling 422 to Plytix as a DX
      inconsistency (config open question #17).

## 16-Ecatalogs
- [ ] Ask Plytix: can Ecatalogs (and PDF Catalogs) be enabled on this Dev
      account? (Config open question #16.) This now also covers testing
      the newly-declared `PATCH`/`DELETE`.

## 17-Product-Relationships
- [ ] Report the cross-tenant data leak on `GET /product-relationships`
      and `GET /related-products` (and `GET /family-attributes`, a third
      affected endpoint) to Plytix as a likely data-isolation bug.
- [ ] Report the broken `.../related-products[/{id}]` subpath to Plytix.
- [ ] Ask Plytix whether the safe, scoped `DELETE` on this new
      relationships resource can be backported to the older
      category/asset subpath-delete hazards (quirks #31/#54).
