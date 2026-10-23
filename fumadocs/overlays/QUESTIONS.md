# Open questions for the Plytix dev team: V3 spec

Questions and spec-vs-live discrepancies raised while enriching the V3 OpenAPI spec through overlays. The format matches `materials/project-references/brief/Questions for the Plytix Dev Team.md`, which holds the earlier rounds; that file is source material, so new questions go here.

Every fix in `00-fixes.yaml` cites one of these IDs through `x-plytix-question`. When Plytix fixes an item upstream, the build fails with `REDUNDANT_FIX` on the matching patch: delete the patch and record the answer below.

## OpenAPI spec

### OAS-1

- **Observed:** In `openapi_pimv3_20261002 (Latest spec).json`, 37 operations use path variables they don't declare as parameters (`{product_id}`, `{relationship_id}`, `{related_product_id}`, `{product_family_id}`, `{attribute_id}`, `{id}`, and on the nested routes also `{identifier}`/`{path}`). 21 of them are public: every nested `products/{product_id}/relationships/...`, `product-families/{product_family_id}/attributes/...` and related-products route. That makes the spec invalid OpenAPI (Redocly `path-parameters-defined`), and the docs can't show those parameters. We add them in our overlay as required `string` path parameters.
- **Question:** Can the FastAPI routes declare these parameters (for example, `Path()` arguments instead of reading them from the raw request), so they appear in the generated spec with their real types? Are any of them something other than a 24-character ObjectId string?

| Plytix response |
| :---- |

### OAS-2

- **Observed:** The spec has no `servers` entry and no `securitySchemes`. We add bearer auth in our overlay (verified live). We leave `servers` empty because `https://pim.plytix.com/api/v3` isn't confirmed as the production V3 base URL yet (`config/api-testing.config.md` quirk #103, open question #35).
- **Question:** Can the generated spec declare the production server and the bearer security scheme? Which base URL should customers use for V3?

| Plytix response |
| :---- |

### OAS-3

- **Observed:** Spec drops arrive as a new dated file (`openapi_pimv3_YYYYMMDD.json`) sent by hand.
- **Question:** How often will the spec change (per release, or ad hoc)? Can you publish it at a stable URL (or attach it to each release), so our CI can pick up new versions automatically?

| Plytix response |
| :---- |

### OAS-4

- **Observed:** `upstream/visibility.yaml` (seeded from "Plytix API v3 - endpoint visibility.xlsx") marks 16 sub-resource link operations as `pending`, for example `POST /api/v3/products/{identifier}/categories`. They aren't in the sheet, so they stay out of the docs.
- **Update (2026-10-22):** under the 16 Oct 2026 handoff ("dedicated association operations"), the product-category and attribute-group link routes are now `public`, and the product channel, e-catalog and PDF catalog link routes are `internal`. The asset category, asset static list and product static list link routes stay `pending` (product lists: PROD-18).
- **Question:** Which of the 16 link operations are public? Going forward, who owns the visibility decision for new operations, and would you rather filter internal operations out of the exported spec yourselves?

| Plytix response |
| :---- |

### OAS-5

- **Observed:** Every operation declares `401` with the `OperationResponse` envelope (`data`/`errors`), but the PIM host returns `401 {"detail": "Unauthorized"}` (`List Products.bru` "401 - Following next_page Verbatim Drops Auth", 2026-10-01; quirk #92). We document the live body.
- **Question:** Should the `401` body move to the standard envelope, or should the spec declare `{"detail": string}` for `401`?

| Plytix response |
| :---- |

### OAS-6

- **Observed:** Two parameter declarations don't match how the API is called. `_sort_by` is declared as a single string, but repeating it sorts by several fields (FB-009). `filters` is declared as one object parameter, but a query parameter literally named `filters` returns `400 "Field 'filters' does not exist"` (quirk #116); each filter is its own query parameter.
- **Question:** Can `_sort_by` be declared as an array (`explode: true`), and can the filter grammar be described without a parameter named `filters` (for example, through the operation description only)?

| Plytix response |
| :---- |

### OAS-7

- **Observed:** The `Pagination` schema declares `next_page` and `previous_page` as `string | null`, but the API leaves a key out when it doesn't apply and never sends `null` (quirk #91). The links also use `http://` and redirect, which can drop the `Authorization` header (quirk #92).
- **Question:** Can the schema mark both keys as optional strings (not nullable), and can the links use `https://`?

| Plytix response |
| :---- |

### OAS-8

- **Observed:** Every operation declares `402 Payment Required`. We've never seen it.
- **Question:** When does the V3 API return `402`, and what does the body look like?

| Plytix response |
| :---- |

## Products

### PROD-12

- **Observed:** A SKU works as the identifier on `GET /api/v3/products/{identifier}` (quirk #86). We haven't tested it on `PATCH` or `DELETE`, so the reference only promises the 24-character ID there.
- **Question:** Do `PATCH` and `DELETE /api/v3/products/{identifier}` accept a SKU as well? If so, what happens when a SKU looks like an ID?

| Plytix response |
| :---- |

### PROD-13

- **Observed:** The spec declares `409 Conflict` on `PATCH /api/v3/products/{identifier}`, but no field in the update body is unique (`sku` isn't patchable).
- **Question:** What triggers `409` on a product update?

| Plytix response |
| :---- |

### PROD-14

- **Observed:** `PATCH /api/v3/products/{identifier}` replaces the whole `attributes` map: a custom attribute left out of the map is removed (quirk #85, FB-019). We document this as current behavior.
- **Question:** Is the replacement intended, or will the root PATCH merge `attributes` like it merges top-level fields?

| Plytix response |
| :---- |

## Assets

### ASSET-5

- **Observed:** `POST /api/v3/assets` with `url` is verified live. The `content` + `filename` form is documented from the spec only: we haven't been able to test it yet.
- **Question:** For `content`, is plain base64 expected, or is a `data:<type>;base64,` prefix accepted (V1 required stripping it)? What are the size and file-type limits? What does the API return when Plytix can't download a `url`? Without `filename`, how is a URL asset named?

| Plytix response |
| :---- |

### ASSET-6

- **Observed:** The spec declares `409 Conflict` on `POST /api/v3/assets`, but assets aren't deduplicated: repeating a request creates a second asset (`bruno-collection/09-Assets/README.md`).
- **Question:** What triggers `409` on asset creation?

| Plytix response |
| :---- |

## Product categories

### CAT-1

- **Observed:** `DELETE /api/v3/product-categories/{identifier}` returns `204`, and the category then returns `404` (quirk #20). We haven't deleted a category that has subcategories. In V1, deleting a category also deleted all its subcategories. Plytix's feedback sheet (PM-61, `materials/Plytix - WriteChoice documentation actions _ 19 October 2026.xlsx`) records a Dev reproduction: deleting a parent returned `204`, deleted its child and grandchild, left an unrelated category, and kept the product with those category links removed. The delete page now warns about this, dated and scoped to that test.
- **Question:** Is the subtree delete the intended V3 behavior on production accounts, so the warning can drop its "Dev test" qualification?

| Plytix response |
| :---- |

### CAT-2

- **Observed:** Not tested: deleting a category that has products assigned to it.
- **Question:** Are the products unlinked automatically? Does the delete ever fail because products use the category (V1 returned `409` when a Brand Portal used it as a root category)?

| Plytix response |
| :---- |

### CAT-3

- **Observed:** Not tested: a second `DELETE` on an ID that's already deleted.
- **Question:** Does a repeated delete return `404`, or `204` again?

| Plytix response |
| :---- |

### OAS-9

- **Observed:** Search responses return timestamps without a timezone offset, such as `"created": "2026-09-08T14:56:38.319000"` (`List Products.bru`), and assets return `"file_modified": "2026-09-22T00:00:00"`. Create responses include one (`+00:00`). The spec declares `format: date-time`, which requires an offset, so the live search examples don't validate.
- **Question:** Are timestamps without an offset UTC? Can every response include the offset so they match `date-time`?

| Plytix response |
| :---- |

### PROD-15

- **Observed:** Sending `parent_id` and `product_family_id` in the same `PATCH /api/v3/products/{identifier}` returns `422 "product data validation failed"` (quirk #82). On create, a variant inherits its parent's product family (quirk #98). We haven't tested a `PATCH` that sets only `parent_id` to a parent in a different product family.
- **Question:** When a product moves under a parent in another product family, does it take the new parent's family, keep its own, or fail?

| Plytix response |
| :---- |

### OAS-10

- **Observed:** Most nested and field routes declare no request body, even for `POST` and `PATCH`, and their success responses have an empty schema (`{}`). Examples: `POST /api/v3/product-families/{product_family_id}/attributes` (the body is `FamilyAttributeLinkInputDto`, found only through a `422`), `PATCH .../attributes/{attribute_id}`, and `POST`/`PATCH /api/v3/products/{identifier}/{path}`. We add the bodies we know in our overlay: the family-attribute link body was verified through `201` and `422` responses, the product link body through `201`, and the family-attribute PATCH body is inferred (every PATCH returned `403`).
- **Question:** Can the spec declare these request bodies and typed success responses, including `FamilyAttributeLinkInputDto` and `ProductRelationshipLinkInputDto`?

| Plytix response |
| :---- |

### PROD-16

- **Observed:** `DELETE /api/v3/products/{identifier}` returns `204`, and the product then returns `404`. We haven't tested deleting a parent that has variants, or what happens to records that point at the deleted product (category links, related-product rows). The help center says deleting a parent in the dashboard deletes its variants too.
- **Question:** Through the API, does deleting a parent delete its variants? Are links to the deleted product (for example in `/related-products`) removed?

| Plytix response |
| :---- |

## Product families

### FAM-2

- **Observed:** `DELETE /api/v3/product-families/{product_family_id}/attributes/{attribute_id}` returns `204`, and the link then returns `404`. The spec's `ProductFamilyUpdateInputDto` description says attribute membership changes propagate across the family's products and can delete values from variants, but we saw no job or `process_id`.
- **Question:** When an attribute is unlinked from a family, what happens to the values products in that family hold for it? Is the change applied immediately or in the background?

| Plytix response |
| :---- |

## Relationships

### REL-2

- **Observed:** On 2026-10-15, `POST /api/v3/products/{product_id}/relationships` and `POST .../relationships/{relationship_id}` returned `405`, `PATCH .../relationships/{relationship_id}` returned `422 "relationships: Extra inputs are not permitted"`, and `GET /api/v3/products/{product_id}/relationships` returned `404 "Field 'relationships' does not exist"` (FB-024). They worked on 2026-09-15. The nested related-products GETs still return empty results or `404` for links that exist (quirk #63; REL-1, "Fix in progress"). We've taken these 10 operations out of the docs until the contract is confirmed.
- **Question:** What's the current way to create and update a product's relationship links? Will the routes in the spec come back, and when will the nested related-products GETs be fixed?

| Plytix response |
| :---- |

### PROD-17

- **Observed:** `POST /api/v3/products/{identifier}/static_lists` with `{"id": "<list_id>"}` links a static list, and `DELETE .../static_lists/{id}` unlinks it (quirk #105). But every `/pim-product-lists` operation is `removed` from the public scope, so readers can't look up a list ID. The dedicated `/products/{identifier}/categories` and `/static_lists` link routes are also `pending` (OAS-4), while the generic `/products/{identifier}/{path}` routes we document do the same thing.
- **Question:** Is linking products to static lists part of the public V3 API? Should the docs describe linking through the dedicated routes (once public) or through the generic `{path}` routes?

| Plytix response |
| :---- |

### FAM-3

- **Observed:** The family-attribute field routes (`GET`, `PATCH`, `DELETE /api/v3/product-families/{product_family_id}/attributes/{attribute_id}/{path}`) have never been tested. Your FAM-1 answer suggests `DELETE` under an instance only makes sense for custom attributes and links.
- **Question:** What do these three routes do on a family attribute link? Does `DELETE` on a field such as `level` return `405`?

| Plytix response |
| :---- |

## Phase 3: open spec issues

### OAS-20

- **Observed:** `AssetListCreateInputDto` declares `if type == Static then query: null`, but every Static list returns a generated `query` (`[[{"operator":"in","field":"static_lists","value":["<own id>"]}]]`, quirk #34). Also, `_fields=type` on `GET /asset-lists` returns `400` although `type` is in `AssetListOutputDto` (quirk #77).
- **Question:** Can the output schema describe the generated Static query? Should `type` be accepted in `_fields` on search?

| Plytix response |
| :---- |

### OAS-21

- **Observed:** Several field routes declare no request body and have never been tested, so we publish no body for them: `PATCH /api/v3/product-categories/{identifier}/{path}`, `/asset-categories/{identifier}/{path}`, `/asset-lists/{identifier}/{path}`, `/product-attributes/{identifier}/{path}`, and `/relationships/{identifier}/{path}`. On assets, attribute groups and product families the same route takes the new value on its own.
- **Question:** Do these routes also take the bare new value? Can the spec declare their request bodies?

| Plytix response |
| :---- |

## Assets (Phase 3)

### ASSET-20

- **Observed:** `AssetStatus` declares `ACTIVE` and `DELETED`. Every asset we've seen was `ACTIVE`, and `DELETE /api/v3/assets/{identifier}` makes the asset return `404`.
- **Question:** When does an asset have `status: DELETED`? Does `GET /api/v3/assets` ever return such assets, and should integrations filter them out?

| Plytix response |
| :---- |

### ASSET-21

- **Observed:** The spec declares `409 Conflict` on `PATCH /api/v3/assets/{identifier}` and `PATCH .../{path}`, but the only patchable fields are `filename` and `alt_text`, and assets aren't deduplicated.
- **Question:** What triggers `409` on an asset update? Must `filename` be unique?

| Plytix response |
| :---- |

### ASSET-22

- **Observed:** `DELETE /api/v3/assets/{identifier}` returns `204` and the asset then returns `404`. We haven't deleted an asset that a product uses as `thumbnail_id` or in a media or media gallery attribute.
- **Question:** What happens to those products' `thumbnail_id` and attribute values when the asset is deleted? Does the delete fail while `n_products` or `n_catalogs` is above zero?

| Plytix response |
| :---- |

### ASSET-23

- **Observed:** Your ASSET-4 answer says the bare-value body of `PATCH /api/v3/assets/{identifier}/{path}` is documented in the OpenAPI spec, but the 2026-10-02 spec declares no request body or description on that operation. We add the body in our overlay.
- **Question:** Can the generated spec declare that request body? Which `path` values does it accept besides `filename` and `alt_text`?

| Plytix response |
| :---- |

### ASSET-24

- **Observed:** Linking an asset to an asset category or static asset list works only through `POST /api/v3/assets/{identifier}/categories` and `.../static_lists` (quirk #105), which are `pending`. The generic `/assets/{identifier}/{path}` route has no `POST`, so the docs show how to unlink an asset from a category but not how to link it.
- **Question:** Are the asset link routes public? Can they be added to the visibility sheet?

| Plytix response |
| :---- |

## Product and asset categories (Phase 3)

### CAT-20

- **Observed:** Re-creating a category with the same `name` returned `422 "Category <name> already exists"` (quirk #25a); your GEN-1 answer says conflicts are now `409`. A search returned two categories both named "Apparel & Accessories" (2026-09-22), so names aren't unique across the whole account.
- **Question:** What's the uniqueness scope of a category name (siblings, whole tree)? What's the exact `409` body? Does a `PATCH` rename to a taken name return `409` too?

| Plytix response |
| :---- |

### CAT-21

- **Observed:** Search returns every category in one flat list. In search results a top-level category has no `parent_id` key, while `GET /product-categories/{id}` returns `parent_id: null`. We haven't tested filtering by `parent_id`.
- **Question:** What's the supported way to get only top-level categories, or one category's direct children? Can search include `parent_id: null` for consistency?

| Plytix response |
| :---- |

### CAT-22

- **Observed:** Not tested: `PATCH` with `parent_id: null`, moving a category under one of its own descendants, and whether renaming or moving a category updates its subcategories' `path`. `order` isn't writable in either DTO.
- **Question:** What do these cases do? How is `order` set?

| Plytix response |
| :---- |

### CAT-23

- **Observed:** `PATCH` and `DELETE /api/v3/product-categories/{identifier}/{path}` have never been tested, and the PATCH route declares no request body.
- **Question:** Does `PATCH .../{path}` take the bare new value? What does `DELETE` on a field such as `name` or `parent_id` do?

| Plytix response |
| :---- |

### CAT-40

- **Observed:** `DELETE /api/v3/asset-categories/{identifier}` returns `204`, then `404`. We haven't deleted an asset category that has subcategories.
- **Question:** Does deleting an asset category delete its subcategories? If not, what happens to them?

| Plytix response |
| :---- |

### CAT-41

- **Observed:** Not tested: deleting an asset category that has assets in it, or deleting the same ID twice.
- **Question:** Are the assets unlinked automatically, and does a repeated delete return `404` or `204`?

| Plytix response |
| :---- |

### CAT-42

- **Observed:** `PATCH /api/v3/asset-categories/{identifier}` with `parent_id` moves a category (2026-09-22). `null` hasn't been tested, and duplicate names returned `422` before your GEN-1 answer.
- **Question:** Does `parent_id: null` move a category to the top level? Are names unique among siblings or across the tree, and does a rename to an existing name return `409`?

| Plytix response |
| :---- |

### CAT-43

- **Observed:** The asset category field routes (`GET`, `PATCH`, `DELETE /api/v3/asset-categories/{identifier}/{path}`) have never been tested.
- **Question:** What do these routes accept, and what does `DELETE` on a field do?

| Plytix response |
| :---- |

## Asset lists

### LIST-20

- **Observed:** A Static asset list's members are set on each asset, not on the list (quirk #34). `POST /assets/{id}/static_lists` links one (quirk #105), but that route is `pending`, and `static_list_ids` is rejected on asset `PATCH` (quirk #104). No asset-lists operation returns a list's members.
- **Question:** Is adding assets to a static asset list part of the public V3 API, and through which route? How do you get the assets in a list through the API?

| Plytix response |
| :---- |

### LIST-21

- **Observed:** A list's `query` accepts `FilterModel` conditions with the `FilterOperator` enum (`like`, `text_search`, `len_eq`, `last_days`, `by_in`, and others). Only `eq`, `like`, `in`, and `!exists` were tested. The spec also allows relationship conditions, although assets have no relationships.
- **Question:** What does each operator do? Which asset fields can a condition use? Do relationship conditions mean anything on an asset list?

| Plytix response |
| :---- |

### LIST-22

- **Observed:** `DELETE /api/v3/asset-lists/{id}` returns `204`, then `404`. Not tested: what happens to the assets' static-list links, or to a Brand Portal that uses the list.
- **Question:** Are asset links removed automatically? Can the delete fail, or break a Brand Portal, when one uses the list?

| Plytix response |
| :---- |

### LIST-23

- **Observed:** `PATCH` and `DELETE /api/v3/asset-lists/{identifier}/{path}` have never been tested. We also haven't sent `query` in a `PATCH` to a Static list.
- **Question:** What do these routes do? Can a Static list's generated `query` be replaced, and what happens if it is?

| Plytix response |
| :---- |

## Product attributes and groups

### ATTR-20

- **Observed:** `GET /api/v3/product-attributes` with no filter returned attributes from two other accounts (2026-09-21/22). SEC-1 and the 2026-10-13 fix check (quirk #112) covered only `family-attributes`, `product-relationships`, and `related-products`; this endpoint was never retested. We publish it as scoped to your account.
- **Question:** Does `GET /api/v3/product-attributes` scope results to the caller's account now? Were the foreign records shared or system attributes, or a leak?

| Plytix response |
| :---- |

### ATTR-21

- **Observed:** The create body accepts 13 types (quirk #110). The response enum `AttributeType` also lists `MultilineAttribute` and `ProductAttribute`, and multiline was created successfully in 2026-09.
- **Question:** Can multiline (paragraph) attributes still be created through V3? When does a response show `type: ProductAttribute`?

| Plytix response |
| :---- |

### ATTR-22

- **Observed:** `DELETE /api/v3/product-attributes/{identifier}` returns `204`, then `404`. We haven't checked what happens to product values under its `label`, family links, or group membership.
- **Question:** Are those removed when the attribute is deleted, immediately or in the background? Is the delete refused while the attribute is in use?

| Plytix response |
| :---- |

### ATTR-24

- **Observed:** `DELETE /api/v3/product-attributes/{identifier}/{path}` has never been tested.
- **Question:** What does it do, which paths does it accept, and what does it return for required fields like `name`?

| Plytix response |
| :---- |

### ATTR-25

- **Observed:** `FormulaAttributeCreateInputDto` has both `formula` (untyped) and `formula_str`. No formula has been created yet, because the test account is at its limit of 2.
- **Question:** Which field should clients send, with what syntax? Is either required?

| Plytix response |
| :---- |

### ATTR-26

- **Observed:** When `label` is omitted on create, it took the value of `name`, tested only with names already in snake_case. `label` must match `^[a-z0-9_]+$` (quirk #109).
- **Question:** What happens when `label` is omitted and `name` has capitals or spaces? Is `label` unique per account, and what does a duplicate return?

| Plytix response |
| :---- |

### ATTR-27

- **Observed:** `PATCH /api/v3/product-attributes/{identifier}` accepts `options` for dropdown and multi-select attributes.
- **Question:** Does `options` replace the whole list? What happens to products whose value is an option you removed?

| Plytix response |
| :---- |

### GRP-20

- **Observed:** `ProductAttributeGroupUpdateInputDto` says `order` is patchable and out-of-range values are clamped. Our 2026-10-13 retest notes "only `name` is patchable" (quirk #108), but no `order` request was captured.
- **Question:** Is `order` patchable? Does changing one group's order shift the others?

| Plytix response |
| :---- |

### GRP-21

- **Observed:** `DELETE /api/v3/product-attribute-groups/{identifier}` returns `204`, then `404`.
- **Question:** What happens to the attributes in a deleted group? Can a group with attributes be deleted?

| Plytix response |
| :---- |

### GRP-22

- **Observed:** `PATCH /api/v3/product-attribute-groups/{identifier}/{path}` declares no request body. Live, a bare JSON string on `.../name` returns `204`. We add the body in our overlay.
- **Question:** Can the spec declare the body?

| Plytix response |
| :---- |

### GRP-23

- **Observed:** `DELETE /api/v3/product-attribute-groups/{identifier}/{path}` has never been tested.
- **Question:** What does this route do, and which paths does it accept?

| Plytix response |
| :---- |

## Product families and relationship types (Phase 3)

### FAM-20

- **Observed:** `DELETE /api/v3/product-families/{identifier}` returns `204`, then `404`. We only deleted a family with no products.
- **Question:** What happens to the products in a family when the family is deleted? Is the delete refused while the family has products?

| Plytix response |
| :---- |

### FAM-21

- **Observed:** `PATCH /api/v3/product-families/{id}/name` with a raw JSON string renamed the family, but the spec declares no request body. `POST` on the same path returns `405 "POST is not allowed on this path."` for every field (quirk #67); we've left that operation out of the docs.
- **Question:** Can the spec declare the PATCH body and drop `POST` from `/product-families/{identifier}/{path}`? Is `name` the only field the PATCH field route accepts?

| Plytix response |
| :---- |

### FAM-22

- **Observed:** `ProductFamilyOutputDto` and `ProductFamilyCreateOutputDto` declare the ID as `_id`, but every response returns `id`. We correct this in our overlay.
- **Question:** Can the family output schemas declare `id` instead of `_id`?

| Plytix response |
| :---- |

### FAM-23

- **Observed:** The spec says `_fields=family_attributes.*` on product families returns the family's attribute links. We've never tested it. Family records still carry `total_models`, though `/product-family-models` was removed (quirk #111).
- **Question:** Does `_fields=family_attributes.*` work? What does `total_models` count now?

| Plytix response |
| :---- |

### REL-20

- **Observed:** `DELETE /api/v3/relationships/{identifier}` returns `204`, then `404`. We only deleted a type with no product links.
- **Question:** When a relationship type that products use is deleted, are those links removed, or is the delete refused?

| Plytix response |
| :---- |

### REL-21

- **Observed:** `RelationshipStatus` declares `ACTIVE` and `DELETED`, but a deleted type returns `404`.
- **Question:** Can a client ever see a relationship type with `status: DELETED`? If not, can `status` be left out of the public schema?

| Plytix response |
| :---- |

### REL-22

- **Observed:** `GET`, `PATCH`, and `DELETE /api/v3/relationships/{identifier}/{path}` are public in the spec, with no request body for `PATCH`. We've only seen the `400` that lists the fields.
- **Question:** Does `PATCH .../name` take a bare string, like product families? What does `DELETE` on a field do?

| Plytix response |
| :---- |

### ATTR-28

- **Observed:** Every product attribute output schema (`TextAttributeGetOutputDto`, `ProductAttributeGenericCreateOutputDto`, and 28 more) declares the ID as `_id`, but attribute responses return `id` (`Create Text Attribute.bru`, `Get Product Attribute by ID.bru`). We correct this in our overlay, as for product families (FAM-22).
- **Question:** Can the attribute output schemas declare `id` instead of `_id`?

| Plytix response |
| :---- |

## Field-audit handoff (16 Oct 2026)

Raised while applying `materials/api-references/endpoint-reviews/Plytix_API_v3_Writechoice_Reference.html` (the handoff) and the 8 Oct field audit PDF next to it. The handoff decides what's public; verified live behavior still decides how the API behaves.

### OAS-26

- **Observed:** The handoff excludes fields that the live API still returns, and that the spec still declares: `account_id` on every output; products' `num_variations` and `overwritten_attributes`; relationships' `relationship_label`; assets' `content_type`, `extension`, `file_size`, `file_type`, `file_modified`, `n_catalogs`, `n_products`, `public`, `status`, `checksum`, `path`, and `downloaded_from`; categories' `slug`, `n_children`, and `path`; attribute groups' `attribute_labels`; product families' `total_products`, `total_attributes`, and `total_models` (and `attributes`, `parent_attributes`, `variant_attributes` on create); attributes' `formula`. As of 2026-10-22 the docs hide all of them (overlay `remove` actions), so a reader who calls the API sees fields the reference doesn't list.
- **Question:** When will the API and the generated spec filter these fields out of public responses (and reject the excluded create fields)? Until then, should the docs say that responses can contain undocumented fields?

| Plytix response |
| :---- |

### OAS-27

- **Observed:** The handoff makes fields "excluded", but doesn't say whether they stay usable in filters and `_sort_by`. Examples: `extension` (we replaced our `extension` filter examples with `filename` and `created`), `num_variations` (confirmed sortable live, FB-009), `slug`, `n_children`.
- **Question:** Can clients still filter or sort by an excluded field? If not, will the request return `400`?

| Plytix response |
| :---- |

### OAS-28

- **Observed:** Several `400` errors list the record's fields verbatim, including excluded ones, for example `"Field 'products' not found. Available fields: ['id', 'account_id', 'assigned', 'content_type', ...]"` on `GET /assets/{id}/{path}`, and the same on categories, families, relationships and asset lists. We keep those messages verbatim in the error examples.
- **Question:** Will these messages be filtered to the public fields? If so, we'll update the examples.

| Plytix response |
| :---- |

### OAS-29

- **Observed:** `_fields=type` returns `400` on asset list search (quirk #77), and the handoff marks `type` as a default read field on asset lists and product lists. We keep the caveat in the docs.
- **Question:** Is this a bug that will be fixed? Does the same `400` apply to product lists?

| Plytix response |
| :---- |

### OAS-30

- **Observed:** The handoff lists "interface-oriented metadata" as pending, with no field list. The candidates we document today are `order` (categories, attribute groups), and `manual_sorting` and `sort_ascending` (dropdown and multi-select attributes).
- **Question:** Which fields count as interface-oriented metadata, and will any of them leave the public model?

| Plytix response |
| :---- |

### PROD-18

- **Observed:** The handoff treats product lists as public and a product's `static_lists` as expandable. The 13 Oct visibility sheet marked `/pim-product-lists` as removed, so the docs leave out the routes (`upstream/visibility.yaml`), the product link routes for `static_lists` (still `pending`), and `static_lists` on products (`schemas/products.yaml`).
- **Question:** Which decision is current? If product lists are public, we'll publish the routes and the expansion.

| Plytix response |
| :---- |

### PROD-19

- **Observed:** The field audit marks `sku` as editable, but `ProductUpdateInputDto` has no `sku` and rejects fields it doesn't declare (`422`). The docs say the update body doesn't accept `sku`.
- **Question:** Is editing `sku` planned? If so, what happens to references by SKU (for example `GET /products/{sku}`) after a change?

| Plytix response |
| :---- |

### PROD-20

- **Observed:** The handoff says an explicit `""` or `[]` is distinct from deletion. Live, a text attribute set to `""` or spaces, and a multi-select set to `[]`, are stored as absent: `[!exists]=true`, `[length]=0` and `[eq]=` return the same records (FB-015, confirmed by Plytix in PM-26). The docs describe the live behavior.
- **Question:** Which is the target? If empty values will be stored as distinct from absent ones, when, and how will filters tell them apart?

| Plytix response |
| :---- |

### CAT-24

- **Observed:** The audit makes `order` writable on create and edit for product categories, asset categories and attribute groups. No input DTO declares it for categories (CAT-22), and live `PATCH` on groups accepts only `name` (quirk #108, GRP-20). The docs don't document writing `order`.
- **Question:** When will `order` be accepted, and on which operations? Does changing one record's `order` shift its siblings?

| Plytix response |
| :---- |

### ASSET-25

- **Observed:** The audit lists `url` as a default read field on assets, but live asset records have no URL field (FB-030, rechecked 2026-10-15). The docs now say asset records don't currently include a download URL, and `path` is hidden.
- **Question:** When will `url` be returned, and what does it point to (a permanent file URL, or a signed URL that expires)?

| Plytix response |
| :---- |

### GRP-24

- **Observed:** The handoff replaces a group's `attribute_labels` with a related `attributes` list, but `ProductAttributeGroupOutputDto` has no `attributes` property, and the shape isn't defined. The docs no longer show a group's members.
- **Question:** What does `attributes` on a group look like (attribute IDs, or full attribute records), is it a default field or an expansion, and when will the spec declare it?

| Plytix response |
| :---- |

### ATTR-29

- **Observed:** The audit doesn't list attribute `status` (declared and returned live) or `formula_attribute_labels`, so their public status is unclear. We still document `status`.
- **Question:** Are attribute `status` and `formula_attribute_labels` public? If `status` stays, can a client see `DELETED`?

| Plytix response |
| :---- |

### FAM-24

- **Observed:** `POST /api/v3/product-families/{product_family_id}/attributes` declares no request body, and neither does the product relationship collection `POST` (the handoff's "incomplete association schemas"). We document the family-attribute body (`attribute_id`, `level`) from live captures through `00-fixes.yaml`.
- **Question:** Can the spec declare these request bodies upstream, so we can drop our fixes?

| Plytix response |
| :---- |

## 2026-10-19 spec

### REL-23

- **Observed:** The 2026-10-19 spec removes the relationships API: `/api/v3/relationships/*`, `/api/v3/related-products`, and every `/api/v3/products/{product_id}/relationships/*` route (23 operations, 11 of them published). It adds `/api/v3/product-relationship-types/*` (search, create, get, update, delete, field routes) and `POST`/`PATCH /api/v3/products/{product_identifier}/product_relationship_types` plus `POST .../product_relationship_types/unlink`. `ProductOutputDto.product_relationships` is replaced by `product_relationships_from` and `product_relationships_to`. We've removed the old pages and keep the 11 new operations `pending`, so the docs currently have no relationships reference. This may also answer REL-2.
- **Question:** Which of the 11 new operations are public? Are the old routes gone from production, or only from the spec? Are `product_relationships_from`/`_to` public fields?

| Plytix response |
| :---- |

### PROD-21

- **Observed:** The 2026-10-19 spec drops the generic `POST /api/v3/products/{identifier}/{path}` link route (and `POST /api/v3/product-families/{identifier}/{path}`) in favor of the dedicated link routes (`POST /api/v3/products/{identifier}/categories`, and so on). Our "Link a record to a product" page is removed; we point readers to the category link route instead.
- **Question:** Does the generic `POST` still work in production, or is it retired?

| Plytix response |
| :---- |

### LIST-24

- **Observed:** In the 2026-10-19 spec, `AssetListOutputDto.type` allows `AssetList` besides `Smart` and `Static`, while create (`ListCreateType`) accepts only `Smart` and `Static`. We describe only `Smart` and `Static`.
- **Question:** When does a list come back with `type: AssetList`, and what does it mean?

| Plytix response |
| :---- |

### OAS-31

- **Observed:** The 2026-10-19 spec drops `account_id` from every output schema, and adds descriptions to the `PATCH .../{identifier}/{path}` routes saying a JSON object body is merged into the field. We already omitted `account_id`, and our field-route pages document only single-value replacement.
- **Question:** Is the object-merge behavior live for every resource (for example `PATCH /api/v3/products/{id}/attributes` with `{"color": "blue"}`)? Has `account_id` been removed from the responses, or only from the spec?

| Plytix response |
| :---- |
