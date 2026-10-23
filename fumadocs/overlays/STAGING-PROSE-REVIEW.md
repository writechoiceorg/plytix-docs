# Staging prose review

Staging edited operation summaries and descriptions directly in `openapi.json`. The overlay pipeline regenerates that file, so after the merge **the overlay text wins** and staging's wording is dropped. This lists every place the two differ, for operations that are published on both sides, so any fact staging has that the overlays lack can be ported into `overlays/ops/*.yaml`.

Generated while merging `origin/staging` (24f1d75) into `api-overlays`. Nothing here has been verified against the live API (live verification is on hold, see `VERIFY.md`), so port a claim only if `VERIFY.md` or another source confirms it.

44 differences across 35 operations.

## `GET /api/v3/product-families/{product_family_id}/attributes/{attribute_id}` (get-family-attribute)

**description: staging**

> Fetch a single family-attribute link by its two IDs. Returns the one record: `{product_family_id, attribute_id, level, account_id}`.
> 
> Use this to check whether a specific attribute applies to a family. If it isn’t linked, the response is `404` with a `NotFoundError` describing the missing association.
> 
> To list every attribute on the family instead, use [List a family's attributes](/reference/v3/family-attributes/list-family-attributes).

**description: overlay (published)**

> Returns the link between one product family and one attribute, including its `level`. If the attribute isn't linked to the family, the request returns `404`.

## `POST /api/v3/product-families/{product_family_id}/attributes/{attribute_id}` (add-attribute-to-family-by-id)

**summary: staging**

> Add an attribute to a family by ID

**summary: overlay (published)**

> Link an attribute to a product family by URL

**description: staging**

> Link an attribute to a product family, taking `attribute_id` from the URL instead of the request body. It needs no body, and is otherwise the same action as [Add an attribute to a family](/reference/v3/family-attributes/add-attribute-to-family).
> 
> If the attribute is already linked to that family, this returns `409 AlreadyExists` rather than linking it twice.
> 
> Use the collection form when you want to set the attribute’s `level` in the same call; this form always links at the family’s default.

**description: overlay (published)**

> Links the attribute in the URL to the product family, with no request body.
> 
> If the attribute is already linked to the family, the request returns `409`. To set `level` in the same request, use [Link an attribute to a product family](/reference/v3/family-attributes/add-attribute-to-family).

## `PATCH /api/v3/product-families/{product_family_id}/attributes/{attribute_id}` (update-family-attribute)

**summary: staging**

> Update a family attribute

**summary: overlay (published)**

> Change a family attribute's level

**description: staging**

> Change an existing family-attribute link’s `level`, moving the attribute between the family’s inheritance tiers: `no_level`, `parent_level`, or `variant_level`. Raising an attribute to `parent_level` is what makes a parent’s values flow down to its variants.
> 
> > **Warning:** This requires the automatic-inheritance feature on your account. Without it, every level change returns `403 PermissionError` with "Automatic inheritance is not available for this account", whatever the target level. That’s an account-plan gate rather than a problem with the request; contact your account manager to have the feature enabled.
> 
> `level` is the only part of a link that can be updated. To change which attributes a family has, link and unlink them with [Add an attribute to a family](/reference/v3/family-attributes/add-attribute-to-family) and [Remove an attribute from a family](/reference/v3/family-attributes/remove-attribute-from-family).

**description: overlay (published)**

> Changes the `level` of an attribute's link to the product family. Send the new level, for example `{"level": "variant_level"}`. A successful change returns `204` with an empty body.
> 
> Changing a level needs automatic inheritance on your account. Without it, the request returns `403` with "Automatic inheritance is not available for this account", whatever level you send. If you get this response, ask your Plytix contact whether inheritance is available for your account. See [Update and delete records](/reference/v3/updates-and-deletes).

## `DELETE /api/v3/product-families/{product_family_id}/attributes/{attribute_id}` (remove-attribute-from-family)

**summary: staging**

> Remove an attribute from a family

**summary: overlay (published)**

> Unlink an attribute from a product family

**description: staging**

> Unlink an attribute from a product family. Returns `204` with no body, after which a `GET` on the same pair returns `404`.
> 
> This removes only the link, the attribute itself stays in your account and stays available to other families. To delete the attribute everywhere, use [Delete a product attribute](/reference/v3/product-attributes/delete-product-attribute).
> 
> > **Warning:** The link is what makes an attribute apply to products in the family, so unlinking changes every product in it, not one. Attribute membership is excluded from [Update a product family](/reference/v3/product-families/update-product-family) for the same reason. Check the family’s `total_products` before unlinking.

**description: overlay (published)**

> Removes the link between the attribute and the product family. A successful unlink returns `204` with an empty body, and a later request for the link returns `404`.
> 
> See [Update and delete records](/reference/v3/updates-and-deletes).

## `GET /api/v3/product-families/{product_family_id}/attributes/{attribute_id}/{path}` (get-family-attribute-field)

**description: staging**

> Fetch a single field from one family-attribute link, such as `level`, instead of the whole record.
> 
> A link holds only `product_family_id`, `attribute_id`, `level`, and `account_id`, so there’s rarely a reason to use this over [Get a family attribute](/reference/v3/family-attributes/get-family-attribute), which returns all four in one call.

**description: overlay (published)**

> Returns one field of the link between a product family and an attribute, such as `level`.

## `PATCH /api/v3/product-families/{product_family_id}/attributes/{attribute_id}/{path}` (update-family-attribute-field)

**description: staging**

> Update a single field on a family-attribute link. `level` is the only field a link exposes for update, so this does the same job as [Update a family attribute](/reference/v3/family-attributes/update-family-attribute), with the field name in the path rather than the body.
> 
> > **Warning:** The same account-plan gate applies. Without the automatic-inheritance feature, a level change returns `403 PermissionError` with "Automatic inheritance is not available for this account".
> 
> Prefer the identity endpoint, which takes the change as an ordinary partial update.

**description: overlay (published)**

> To change a link's `level`, use [Change a family attribute's level](/reference/v3/family-attributes/update-family-attribute), which documents the request body and the account requirement.

## `DELETE /api/v3/product-families/{product_family_id}/attributes/{attribute_id}/{path}` (delete-family-attribute-field)

**description: staging**

> Delete a single field from a family-attribute link.
> 
> > **Warning:** Don’t use this to clear a `level`. Field-level deletes elsewhere in the V3 API don’t perform scoped field removal, and act on the parent record instead of the single field named in the path. To take an attribute off a family, use [Remove an attribute from a family](/reference/v3/family-attributes/remove-attribute-from-family); to move it between tiers, use [Update a family attribute](/reference/v3/family-attributes/update-family-attribute).

**description: overlay (published)**

> To remove an attribute from a product family, use [Unlink an attribute from a product family](/reference/v3/family-attributes/remove-attribute-from-family).

## `GET /api/v3/product-families/{product_family_id}/attributes` (list-family-attributes)

**summary: staging**

> List a family's attributes

**summary: overlay (published)**

> List a product family's attributes

**description: staging**

> List every attribute currently linked to one product family. This is the per-family view of the same link records returned by [Search family attributes](/reference/v3/family-attributes/search-family-attributes), scoped by the `product_family_id` in the path, so it needs no account filter.
> 
> Each record is `{product_family_id, attribute_id, level, account_id}`. `level` is the attribute’s inheritance tier within the family: `no_level`, `parent_level`, or `variant_level`.
> 
> The response carries attribute IDs, not full attribute definitions. Resolve names and types with [Search product attributes](/reference/v3/product-attributes/search-product-attributes).
> 
> Responses come back in a single page with no `next_page` link, so don’t build paging logic around this endpoint.
> 
> `product_family_id` is the family’s Plytix `id`, from [Search product families](/reference/v3/product-families/search-product-families), not its name.

**description: overlay (published)**

> Returns the attributes linked to one product family, with each link's `level`. Each record names the `product_family_id`, the `attribute_id`, and the `level`.
> 
> To filter or page through links, including across families, use [Search family attributes](/reference/v3/family-attributes/search-family-attributes).

## `POST /api/v3/product-families/{product_family_id}/attributes` (add-attribute-to-family)

**summary: staging**

> Add an attribute to a family

**summary: overlay (published)**

> Link an attribute to a product family

**description: staging**

> Link an existing attribute to a product family, so that products in the family can carry that attribute.
> 
> Send `{"attribute_id": "<id>"}`. The attribute has to exist already. Create it first with [Create a product attribute](/reference/v3/product-attributes/create-product-attribute). A successful call returns `201`.
> 
> `level` is optional and sets the attribute’s inheritance tier in this family (`no_level`, `parent_level`, or `variant_level`). Omit it and the attribute is linked at `no_level`.
> 
> > **Warning:** `parent_level` and `variant_level` require the automatic-inheritance feature on your account. Without it, setting either returns `403 PermissionError` with "Automatic inheritance is not available for this account", and only `no_level` links can be created. See [Update a family attribute](/reference/v3/family-attributes/update-family-attribute) for the same gate on changing a level later.
> 
> To link by URL instead of in the body, use [Add an attribute to a family by ID](/reference/v3/family-attributes/add-attribute-to-family-by-id). Use this collection form when you want to set `level` in the same call.

**description: overlay (published)**

> Links an existing attribute to the product family, so products in the family can hold a value for that attribute. Send the attribute's ID in `attribute_id`, and optionally a `level`. Without `level`, the attribute is linked at `no_level`.
> 
> A successful link returns `201` with the new link record. A body without `attribute_id` returns `422`.
> 
> To link an attribute without a request body, use [Link an attribute to a product family by URL](/reference/v3/family-attributes/add-attribute-to-family-by-id). See [The Plytix data model](/docs/guides/data-model#product-families-and-variants) for how levels work, and [Update and delete records](/reference/v3/updates-and-deletes) for how writes behave across the V3 API.

## `GET /api/v3/products/{product_id}/relationships/{relationship_id}` (get-product-relationship)

**summary: staging**

> Get a product relationship

**summary: overlay (published)**

> Get a product's relationship link

**description: staging**

> Fetch one of a product's relationship links by the ID of its relationship type. Returns the flat record `{relationship_id, relationship_label, product_id}`.
> 
> Both path segments take Plytix IDs: `product_id` is the product's `id`, not its SKU, and `relationship_id` is the ID of the relationship type, from [Search relationships](/reference/v3/relationships/search-relationships).
> 
> This tells you which relationship type the product takes part in, not which products sit on the other end of it. To see the products a link points to, use [Search related products](/reference/v3/related-products/search-related-products) with `?product_id=<id>`.

**description: overlay (published)**

> Returns one product's link to one relationship type: the `relationship_id`, the `relationship_label`, and the `product_id`.
> 
> The response doesn't list the related products. To get those, use [Search related products](/reference/v3/related-products/search-related-products) with `product_id=<id>`.

## `DELETE /api/v3/products/{product_id}/relationships/{relationship_id}` (remove-product-relationship)

**summary: staging**

> Remove a product relationship

**summary: overlay (published)**

> Remove a relationship from a product

**description: staging**

> Unlink a product from a relationship type. Returns `204` with no body, and the product itself is left fully intact; a follow-up `GET` on it shows `sku`, `label`, and `status` unchanged, with only its `product_relationships` entry for that type gone.
> 
> This is a properly scoped unlink, unlike the generic [Delete a product field](/reference/v3/products/delete-product-field) route, which never removes a single link. Use it whenever you need to break a product's relationship.
> 
> > **Warning:** This removes the whole link for that relationship type, meaning every related product under it, not one of them. To drop a single related product from a multi-product link, send a reduced array to [Update a product relationship](/reference/v3/product-relationships/update-product-relationship) instead.

**description: overlay (published)**

> Removes the product's link to one relationship type. A successful call returns `204` with an empty body.
> 
> The product itself, the relationship type, and the related products aren't deleted. See [Safely remove categories, assets, or relationships](/docs/guides/safely-removing-categories-assets-or-relationships#remove-a-relationship-from-a-product) and [Update and delete records](/reference/v3/updates-and-deletes).

## `GET /api/v3/products` (search-products)

**description: staging**

> Search and list the products in your catalog. With no filters, this returns every product in the account.
> 
> Narrow the results with query-string filters, for example `sku=BAG-10157` or `categories.name=Backpacks`. See [Filtering and query syntax reference](/reference/v3/filtering-and-search) for the full set of operators.
> 
> Use `_fields` (repeatable) to select only the fields you need. Requesting a relationship field such as `categories` or `assets` returns it fully expanded, with no extra call and no `_expand` parameter needed.
> 
> Results are paginated at 25 products per page by default. Set `_page_size` to change that, and follow the `next_page` link in the response's `pagination` object to get the next page instead of building your own offset logic.

**description: overlay (published)**

> Returns the products in your account that match your filters, one page at a time. With no filters, it returns every product, including archived ones.
> 
> Use it to look up products by SKU or any other field, to export your catalog page by page, or to find products that changed after a given date.
> 
> Filters are query parameters written as `field=value` or `field[operator]=value`. A product must match all of them, unless you group filters with `_or`. Besides the top-level fields, you can filter on:
> 
> - Custom attributes, through `attributes.<label>`, for example `attributes.material=Canvas`
> - Related records, through dot paths such as `categories.name`
> - A parent's direct variants, through `parent_id=<id>` or `parent.sku=<sku>`
> 
> A few filter details to plan for:
> 
> - For a case-insensitive match, use `contains:ignorecase`. `icontains` isn't an operator and returns `400`.
> - A date filter with an invalid date, such as `modified[gte]=not-a-date`, returns an empty list instead of an error.
> 
> Results come back 25 per page by default, up to 1000 with `_page_size`. To get the next page, follow `pagination.next_page`. On the last page that key is left out, not set to `null`. The link starts with `http://`, so change it to `https://` before you follow it. Otherwise the redirect can drop your `Authorization` header. The response doesn't include a total count.
> 
> For a stable order while you page through a large result set, sort by `id`, which follows creation order. Each page is a separate request. See [Rate limits](/reference/v3/rate-limits).
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)
> - [Export your full catalog](/docs/guides/exporting-your-full-catalog)
> - [Audit product data quality with filters](/docs/guides/auditing-product-data-quality-with-filters)

## `POST /api/v3/products` (create-product)

**description: staging**

> Create a single product.
> 
> The response returns the created product, including its generated `id`, as an object in `data`.
> 
> To create a variant, include `parent_id`. Leave `product_family_id` out: the variant takes its family from the parent, and a different family returns `422`. See [Rebuild parent and variant products](/docs/guides/reconstructing-parent-variant-hierarchies).
> 
> If the `sku` you send already exists in the account, this returns `409 Conflict` instead of creating a duplicate.

**description: overlay (published)**

> Creates one product and returns the full record, including its new `id`. Only `sku` is required.
> 
> The `sku` must be unique in your account. If a product with that SKU already exists, the request returns `409` and creates nothing. That makes a create safe to retry: if a request times out, sending it again either creates the product or returns `409`, never a duplicate.
> 
> Set custom attribute values in `attributes`, keyed by each attribute's `label` (its snake_case name, not the display name), for example `{"attributes": {"material": "Canvas"}}`. The response also lists the account's completeness attributes, such as `website_ready`, which Plytix calculates for you.
> 
> To create a variant, set `parent_id` to the parent product's ID:
> 
> - The variant joins the parent's product family automatically, so you can leave out `product_family_id`. Sending a different family returns `422`.
> - The variant gets `product_level` `2`, and a parent that was standalone becomes `1`. A variant of a variant is `3`.
> 
> See [Reconstruct parent/variant hierarchies](/docs/guides/reconstructing-parent-variant-hierarchies).
> 
> The body accepts only the fields listed below. List fields such as `category_ids` and `static_list_ids` return `422` with "Extra inputs are not permitted". Link categories after the product exists, with [Link a record to a product](/reference/v3/products/add-product-field).

## `GET /api/v3/products/{identifier}/{path}` (get-product-field)

**description: staging**

> Fetch a single field from a product without pulling back the entire product record, for example `attributes`, `categories`, or `assets`. Relation fields such as `categories` and `assets` come back fully expanded.
> 
> Use the product's Plytix `id` as `identifier`, not its SKU.

**description: overlay (published)**

> Returns the value of one product field without the rest of the record. Set `path` to the field:
> 
> - `attributes` returns the product's custom attribute values as a map, and `attributes/<label>` returns one attribute's value.
> - `categories` and `assets` return the records linked to the product.
> 
> `data` holds the value itself, so its shape depends on the field. A field the product doesn't have returns `400`, naming the field.
> 
> Relationships aren't available here: read `product_relationships` with [Get a product](/reference/v3/products/get-product).

## `POST /api/v3/products/{identifier}/{path}` (add-product-field)

**summary: staging**

> Add a product field

**summary: overlay (published)**

> Link a record to a product

**description: staging**

> Add a field to a product. Use the product's Plytix `id` as `identifier`, not its SKU.
> 
> To set attribute values, send a partial map to [Update a product field](/reference/v3/products/update-product-field) with `attributes` as the path. To link a category, use [Link a category to a product](/reference/v3/products/link-product-category).

**description: overlay (published)**

> Links one record to the product. Set `path` to the link collection, for example `categories`, and send the record's ID as `{"id": "<id>"}`.
> 
> A successful link returns `201` with the linked ID. Send one record per request: the body doesn't take a list of IDs.
> 
> If the record is already linked to the product, the request returns `409`. An ID that doesn't exist returns `404`.
> 
> Assets can't be linked here. To use an asset on a product, set it as the product's `thumbnail_id` or as a value of a media attribute. See [Safely remove categories, assets, or relationships](/docs/guides/safely-removing-categories-assets-or-relationships#connect-other-assets-to-a-product) and [Update and delete records](/reference/v3/updates-and-deletes).

## `PATCH /api/v3/products/{identifier}/{path}` (update-product-field)

**description: staging**

> Update a single field on a product without sending the whole record.
> 
> The `path` is the field name, and the request body is that field's new value on its own, not an object wrapping it. With `attributes` as the path, the body is a partial attributes map that's merged into the product's existing map, so attributes you leave out are kept. That's different from [Update a product](/reference/v3/products/update-product), where naming `attributes` replaces the whole map.
> 
> Use the product's Plytix `id` as `identifier`, not its SKU.
> 
> Plytix checks `path` against the fields a product accepts on an update, so a name it doesn't recognize returns `422` instead of creating anything. A successful call returns `204` with an empty body.

**description: overlay (published)**

> Changes one custom attribute value and leaves the rest of the product as it is. Set `path` to `attributes/<label>` and send the new value on its own as the request body: `"Canvas"`, not `{"value": "Canvas"}`. A successful update returns `204` with an empty body.
> 
> Use this to change a single attribute. [Update a product](/reference/v3/products/update-product) replaces the whole `attributes` map, so any attribute you leave out of it is removed.
> 
> The value's format depends on the attribute type:
> 
> - Text: a string. `null` removes the value.
> - Decimal: a string, such as `"12.5"`. A JSON number returns `422`.
> - Multi-select: an array of the attribute's configured options, such as `["Cotton"]`.
> - Media: one asset ID, as a string.
> - Media gallery: an array of asset IDs.
> 
> Completeness and formula attributes are calculated by Plytix, so writing to them returns `422`.
> 
> Link collections such as `categories` can't be changed here (`405`). Link and unlink records with [Link a record to a product](/reference/v3/products/add-product-field) and [Delete a product field value or link](/reference/v3/products/delete-product-field). See [Update and delete records](/reference/v3/updates-and-deletes).

## `DELETE /api/v3/products/{identifier}/{path}` (delete-product-field)

**summary: staging**

> Delete a product field

**summary: overlay (published)**

> Delete a product field value or link

**description: staging**

> Delete a single field from a product. This isn't a way to unlink a category or other relation: a recognized collection name, such as `DELETE /products/{id}/categories`, returns `405 Method Not Allowed`, and the product is left intact.
> 
> To remove one category from a product, use [Unlink a category from a product](/reference/v3/products/unlink-product-category). See [Unlink categories, assets, or relationships](/docs/guides/safely-removing-categories-assets-or-relationships).

**description: overlay (published)**

> Removes one value from a product. Two forms work:
> 
> - `attributes/<label>` removes that custom attribute's value from the product.
> - `categories/<category_id>` unlinks that one category. The category itself isn't deleted, and the product's other links stay.
> 
> A successful call returns `204` with an empty body. The product itself is never deleted.
> 
> If a variant overrode a value it inherited from its parent, deleting the value doesn't bring the parent's value back. The attribute is removed from the variant, and `attributes.<label>` stays in `overwritten_attributes`.
> 
> A collection without an ID, such as `categories` on its own, returns `405`. A field the product doesn't have returns `404`, and so does a record that isn't linked to the product.
> 
> Assets can't be unlinked here. To detach one, clear the product's `thumbnail_id`, or delete the media attribute value that holds it.
> 
> See [Safely remove categories, assets, or relationships](/docs/guides/safely-removing-categories-assets-or-relationships#remove-a-category-from-a-product) and [Update and delete records](/reference/v3/updates-and-deletes).

## `GET /api/v3/products/{identifier}` (get-product)

**description: staging**

> Fetch a single product by its Plytix product `id`. This always returns the full product record. It doesn't support `_fields` filtering the way [Search products](/reference/v3/products/search-products) does.
> 
> The `identifier` must be the product's Plytix ID, not its SKU, even though SKU is the natural key for most catalogs. If you only have a SKU, look it up first with [Search products](/reference/v3/products/search-products) (filter on `sku=<value>` with `_fields=id`), then use the returned `id` here.

**description: overlay (published)**

> Returns one product. You can use the product's `id` or its SKU as the identifier: `GET /api/v3/products/BAG-10157` returns the same record as a request with the product's ID. An identifier that matches nothing returns `404`.
> 
> To return only some fields, use `_fields`, for example `_fields=sku&_fields=label`. Without it, you get the full record.
> 
> `data` holds the product object itself, not a list, and the response has no `pagination` key.
> 
> `product_relationships` lists only each relationship's ID and label. To get the related products, use [Search related products](/reference/v3/related-products/search-related-products) with `product_id=<id>`.

## `PATCH /api/v3/products/{identifier}` (update-product)

**description: staging**

> Update selected fields on a product. Top-level fields you leave out, such as `label` or `status`, keep their current values. A successful update returns `204` with an empty body; read the product back if you need the updated values.
> 
> Use the product's Plytix `id` as `identifier`, not its SKU.
> 
> > **Warning:** Naming `attributes` here replaces the product's whole attributes map, so every attribute you leave out is removed. To change some attributes and keep the rest, send a partial map to [Update a product field](/reference/v3/products/update-product-field) with `attributes` as the path, or change one attribute at `PATCH /api/v3/products/{identifier}/attributes/{name}`. See [How PATCH treats the attributes map](/docs/guides/migrating-to-v3/responses-and-updates#how-patch-treats-the-attributes-map).
> 
> Categories aren't fields on this request. Link and unlink them one at a time with [Link a category to a product](/reference/v3/products/link-product-category) and [Unlink a category from a product](/reference/v3/products/unlink-product-category). Assets are set through media and gallery attributes. See [Unlink categories, assets, or relationships](/docs/guides/safely-removing-categories-assets-or-relationships).
> 
> Sending `parent_id` and `product_family_id` together returns `422`. A variant inherits family membership from its parent, so omit `product_family_id` when you set `parent_id`.

**description: overlay (published)**

> Changes the fields you send and leaves every other field as it is. A successful update returns `204` with an empty body. To see the result, read the product back.
> 
> The `attributes` map is the exception: it's replaced as a whole. Any custom attribute you leave out of `attributes` is removed from the product. To change custom attributes, do one of the following:
> 
> - Send the complete `attributes` map, with the values you want to keep.
> - Change one attribute at a time with [Update a product field](/reference/v3/products/update-product-field), for example `PATCH /api/v3/products/{identifier}/attributes/material`.
> 
> Completeness and formula attributes are calculated by Plytix. Values you send for them are ignored.
> 
> Send `null` to clear a field:
> 
> - `thumbnail_id: null` removes the thumbnail. If the thumbnail was the asset's only link to the product, the asset also leaves the product's `assets`.
> - `parent_id: null` detaches a variant from its parent. The product goes back to `product_level` `0`, loses the values it inherited, and keeps its product family.
> - `product_family_id: null` removes the product from its product family.
> 
> `gtin` can't be cleared with `null`. A GTIN with an invalid check digit returns `422`.
> 
> Don't send `product_family_id` in the same request as `parent_id`: sending both returns `422`.
> 
> The body accepts only the fields listed below. You can't change `sku` here, and list fields such as `category_ids` and `static_list_ids` return `422`. See [Update and delete records](/reference/v3/updates-and-deletes) for how PATCH works across the V3 API.

## `DELETE /api/v3/products/{identifier}` (delete-product)

**description: staging**

> Permanently delete a single product by its Plytix product `id`. This can't be undone: once deleted, the product's data and its links to categories, assets, and relationships are gone.
> 
> Use the product's Plytix ID here, not its SKU. If you only have a SKU, look it up first with [Search products](/reference/v3/products/search-products).

**description: overlay (published)**

> Deletes one product. A successful delete returns `204` with an empty body, and a later request for the product returns `404`. Deleted products can't be listed afterwards, so a sync job can't find deletions by searching.
> 
> To remove only a link, such as one category, without deleting the product, use [Delete a product field value or link](/reference/v3/products/delete-product-field). See [Update and delete records](/reference/v3/updates-and-deletes).

## `GET /api/v3/product-relationships` (search-product-relationships)

**description: staging**

> Search every product-to-relationship-type link in your account, across all products, as flat `{relationship_id, relationship_label, product_id}` records.
> 
> > **Warning:** Always send a filter. Called with no query parameters, this endpoint isn't scoped to your account and returns other accounts' link records. Both `?account_id=<your account id>` and `?product_id=<id>` scope the results correctly.
> 
> > **Warning:** Don't filter by `relationship_id`. The request hangs and then fails with a gateway timeout rather than returning. To find every product using one relationship type, filter by `account_id` and match `relationship_id` in the results yourself.
> 
> Supports `_fields` (repeatable) for sparse responses, `_sort_by`, and `_page`/`_page_size` pagination, follow the `next_page` link in the response's `pagination` object. See [Pagination](/reference/v3/pagination) and [Filtering and search](/reference/v3/filtering-and-search).
> 
> For a single product's links, [List a product's relationships](/reference/v3/product-relationships/list-product-relationships) is scoped by the URL and needs no filter.

**description: overlay (published)**

> Returns the relationship links of the products in your account, one page at a time: which products use which relationship types.
> 
> To get the products on the other end of a product's relationships, with their quantities, use [Search related products](/reference/v3/related-products/search-related-products) with `product_id=<id>`.
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)

## `GET /api/v3/related-products` (search-related-products)

**description: staging**

> Search the individual product-to-product links in your catalog. Each record is one pair (`product_id`, `related_product_id`, `quantity`, and `last_modified`) which makes this the dependable way to find out which products sit on the other end of a product's relationships.
> 
> > **Warning:** Always send a filter. This endpoint is not automatically scoped to your own account the way the rest of the V3 API is, so a call with no filter returns a result set that isn't limited to your catalog. Filter by `product_id` to list one product's related products, or by `account_id` to scope the search to your account.
> 
> A product's own `product_relationships` field lists each link's `quantity` and `last_modified` but not its `related_product_id`, so that field alone can't tell you which product a link points to. This endpoint can.
> 
> Filtering by `relationship_id` isn't supported: it isn't a field on this resource, and sending it returns `500` with a `HiddenFieldError` rather than the usual `400`. When the relationship type matters, use [Search product relationships](/reference/v3/product-relationships/search-product-relationships) instead, which groups links by `relationship_id`.
> 
> `_fields`, `_page`/`_page_size`, and `_sort_by` work as they do on the other search endpoints. See [Filtering and query syntax reference](/reference/v3/filtering-and-search).

**description: overlay (published)**

> Returns the product-to-product links in your account, one page at a time. Each record links one `product_id` to one `related_product_id`, with the link's `quantity`.
> 
> To get every product related to one product, filter by `product_id`. This is how to read a product's related products: a product's own `product_relationships` field lists only the relationship types it uses.
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)

## `GET /api/v3/assets` (search-assets)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns the assets in your Plytix DAM that match your filters, one page at a time.
> 
> Use it to find an asset's `id` before you read, update, or delete it, or to list the files in your account page by page.
> 
> Filters are query parameters written as `field=value` or `field[operator]=value`. An asset must match all of them, unless you group filters with `_or`.
> 
> Each asset describes its file: `filename`, `extension`, `content_type`, `file_type`, and `file_size`. `path` is the file's storage path inside Plytix, not a download URL, and the record has no URL field.
> 
> `n_products` and `n_catalogs` count the products and catalogs that use the asset. Check them before you delete an asset.
> 
> Results come back 25 per page by default, up to 1000 with `_page_size`. To get the next page, follow `pagination.next_page`. On the last page that key is left out, not set to `null`. The link starts with `http://`, so change it to `https://` before you follow it. Otherwise the redirect can drop your `Authorization` header. The response doesn't include a total count.
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)
> - [The Plytix data model](/docs/guides/data-model#assets)

## `DELETE /api/v3/assets/{identifier}/{path}` (delete-asset-field)

**summary: staging**

> Delete an asset field

**summary: overlay (published)**

> Unlink a category from an asset

## `GET /api/v3/product-categories` (search-product-categories)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns the product categories in your account, one page at a time. With no filters, it returns every category at every level of the tree in one flat list.
> 
> Each category carries its place in the tree:
> 
> - `parent_id`: the ID of the category above it. In search results, a top-level category has no `parent_id` key.
> - `path`: the names from the top of the tree down to this category, for example `["Bags", "Backpacks"]`.
> - `n_children`: how many categories sit directly below it.
> 
> Names can repeat in different branches, so check `path` to pick the right one.
> 
> To find the products filed under a category, search products instead, with a filter such as `categories.name=Backpacks`. See [Search products](/reference/v3/products/search-products).
> 
> Results come back 25 per page by default. Follow `pagination.next_page` to get the next page, and change its `http://` to `https://` first.
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)
> - [The Plytix data model](/docs/guides/data-model#product-categories)

## `DELETE /api/v3/product-categories/{identifier}` (delete-product-category)

**description: staging**

> Permanently delete a product category by its Plytix `id`. A successful delete returns `204` with an empty body.
> 
> > **Warning:** Deleting a parent category can delete its whole subtree. In Plytix's controlled Dev test (October 2026), deleting a parent category also deleted its child and grandchild categories, and the test product lost its associations with them. The product itself stayed, and an unrelated category was unaffected. The effect on many products, and on production, hasn't been tested yet, so check the category's subcategories before you delete it.
> 
> Deleting a category isn't the way to take one product out of it. To remove a single product's association and keep the category, use [Unlink a category from a product](/reference/v3/products/unlink-product-category).

**description: overlay (published)**

> Deletes a product category. A successful delete returns `204` with an empty body, and a later request for the same ID returns `404`.
> 
> If you only want to take a product out of a category, unlink the product instead. The category and its other products stay as they are. See [Safely remove categories, assets, or relationships](/docs/guides/safely-removing-categories-assets-or-relationships#remove-a-category-from-a-product).

## `GET /api/v3/asset-categories` (search-asset-categories)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns the asset categories in your account that match your filters, one page at a time.
> 
> Asset categories organize assets in their own tree, separate from product categories. Each category has a `name`, a `parent_id` (in search results, a top-level category has no `parent_id` key), a `path` with the names from the top of the tree down to it, a `slug`, and an `n_children` count.
> 
> Filters are query parameters written as `field=value` or `field[operator]=value`. A category must match all of them, unless you group filters with `_or`.
> 
> Results come back 25 per page by default, up to 1000 with `_page_size`. To get the next page, follow `pagination.next_page`. On the last page that key is left out, not set to `null`. The link starts with `http://`, so change it to `https://` before you follow it. Otherwise the redirect can drop your `Authorization` header. The response doesn't include a total count.
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)
> - [The Plytix data model](/docs/guides/data-model#product-categories)

## `GET /api/v3/asset-lists` (search-asset-lists)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns the asset lists in your account, one page at a time. An asset list is a saved selection of assets. Each list has a `type`:
> 
> - `Smart`: the list stores a `query`, and its members are the assets that match it.
> - `Static`: membership is stored on each asset. Plytix generates the list's `query`, which points at the list's own ID.
> 
> The records describe the lists, not the assets in them.
> 
> `_fields` doesn't accept `type` here and returns `400`. To see a list's type, use [Get an asset list](/reference/v3/asset-lists/get-asset-list).
> 
> Results come back 25 per page by default. Follow `pagination.next_page` to get the next page, and change its `http://` to `https://` first.
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)

## `GET /api/v3/relationships` (search-relationships)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns the relationship types in your account, such as "Accessories" or "Cross-sell", one page at a time. A relationship type names a kind of connection between products. It doesn't hold the product links themselves.
> 
> Each record holds the type's `id`, its `name`, its `label`, and its `status`. A product's `product_relationships` field names each type it uses by `relationship_id` and `relationship_label`, which match `id` and `label` here. A label doesn't always match the name: in the first example below, the type named "Cross-sell" has the label `related_products`.
> 
> Filters use the same syntax as every V3 search, for example `status=ACTIVE`. To sort by name, send `_sort_by=name`.
> 
> To see which products are linked under each type, use [Search product relationships](/reference/v3/product-relationships/search-product-relationships). To get the products on the other end of one product's links, use [Search related products](/reference/v3/related-products/search-related-products) with `product_id=<id>`.
> 
> Related pages:
> 
> - [The Plytix data model](/docs/guides/data-model#relationships)
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)

## `PATCH /api/v3/relationships/{identifier}` (update-relationship)

**summary: staging**

> Update a relationship

**summary: overlay (published)**

> Rename a relationship

## `GET /api/v3/product-families` (search-product-families)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns the product families in your account, one page at a time. Each record holds the family's `id` and `name`, the number of products in it (`total_products`), and the number of attributes linked to it (`total_attributes`).
> 
> Use it to find a family's `id` before you assign products to the family with `product_family_id`, or before you work with its attributes.
> 
> Filters use the same syntax as every V3 search, for example `name[contains:ignorecase]=apparel`. To sort by name, send `_sort_by=name`.
> 
> By default, records don't list the family's attributes. To get them, with each attribute's inheritance `level`, use [List a product family's attributes](/reference/v3/family-attributes/list-family-attributes).
> 
> Related pages:
> 
> - [The Plytix data model](/docs/guides/data-model#product-families-and-variants)
> - [Reconstruct parent/variant hierarchies](/docs/guides/reconstructing-parent-variant-hierarchies)
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)

## `PATCH /api/v3/product-families/{identifier}` (update-product-family)

**summary: staging**

> Update a product family

**summary: overlay (published)**

> Rename a product family

## `GET /api/v3/family-attributes` (search-family-attributes)

**description: staging**

> Search the links between product families and product attributes across your account. Each record is one family-attribute pair: `product_family_id`, `attribute_id`, `level`, and `account_id`.
> 
> > **Warning:** Always send a filter. This endpoint is not automatically scoped to your own account the way the rest of the V3 API is, so a call with no filter returns a result set that isn’t limited to your catalog. Filter by `account_id` to scope the search to your account, and add `product_family_id` to narrow it to a single family.
> 
> `level` is where the attribute sits in the family’s inheritance: `no_level`, `parent_level`, or `variant_level`. It can also come back `null` on links where it was never set. See [Data model](/docs/guides/data-model) for how family inheritance works.
> 
> To list one family’s attributes without the filtering caveat, use [List a family's attributes](/reference/v3/family-attributes/list-family-attributes), which is scoped by its path.
> 
> Records carry attribute IDs, not full attribute definitions. Resolve names, types, and groups with [Search product attributes](/reference/v3/product-attributes/search-product-attributes).
> 
> `_fields`, `_page`, and `_page_size` work as on the other search endpoints. See [Filtering and query syntax reference](/reference/v3/filtering-and-search).

**description: overlay (published)**

> Returns the links between product families and attributes in your account, one page at a time. Each record names a `product_family_id`, an `attribute_id`, and the link's `level`.
> 
> To get one family's attributes, filter by `product_family_id`. Without a filter, the search covers every product family in your account.
> 
> `level` sets how the attribute's values pass down a family's hierarchy:
> 
> - `parent_level`: a parent's value passes down to its variants and sub-variants.
> - `variant_level`: a variant's value passes down to its sub-variants.
> - `no_level`: values don't pass down.
> 
> See [The Plytix data model](/docs/guides/data-model#product-families-and-variants). Records hold IDs only. To get an attribute's name and type, look it up with [Search product attributes](/reference/v3/product-attributes/search-product-attributes).
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)

## `GET /api/v3/product-attributes` (search-product-attributes)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns attribute definitions, one page at a time. Each record holds the attribute's `id`, `name`, `label`, `type`, and the settings of that type, such as a dropdown's `options`.
> 
> Use it to find the `label` to use as a key in a product's `attributes` map, or to find attributes of one type, for example `type=CompletenessAttribute`. Products store custom attribute values keyed by `label`, not by the display `name`.
> 
> The `type` field tells you which shape a record has. The response schema below has one tab per type.
> 
> Related pages:
> 
> - [The Plytix data model](/docs/guides/data-model#product-attributes)
> - [Sync your ERP](/docs/guides/syncing-your-erp-with-plytix)
> - [Build a marketplace-specific product feed](/docs/guides/building-marketplace-specific-product-feeds)
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)

## `GET /api/v3/product-attribute-groups` (search-product-attribute-groups)

**description: staging**

> Any other query parameter is a filter on a field:
> 
> * `field=value` or `field[op]=value`. Operators: `eq`, `null`, `exists`, `contains`, `contains:ignorecase`, `in`, `includes`, `intersects`, `gt`, `gte`, `lt`, `lte`, `!eq`, `!null`, `!exists`, `!contains`, `!contains:ignorecase`, `!in`, `!includes`, `!intersects`, `!gt`, `!gte`, `!lt`, `!lte`.
> * `field[func:param][op]=value` applies a function first; omitting `[op]` uses `eq`.
>   Functions: `upper`, `lower`, `trim`, `length`, `len`, `days_passed`, `year`, `month`, `day`, `dayofweek`, `abs`, `ceil`, `floor`, `round`.
> * `_or[N]field[op]=value` groups filters sharing index `N`; `_and`, `_exists` and the negated `_!or`,
>   `_!and` and `_!exists` work the same way.

**description: overlay (published)**

> Returns the attribute groups in your account, one page at a time. Each group has a `name`, an `order` (its display position), and `attribute_labels`, the labels of the attributes it contains.
> 
> Groups organize attributes for display. They don't change which attributes a product can hold. Product families control which attributes apply to their products. See [The Plytix data model](/docs/guides/data-model#product-attributes).
> 
> Related pages:
> 
> - [Filtering and search](/reference/v3/filtering-and-search)
> - [Pagination](/reference/v3/pagination)
