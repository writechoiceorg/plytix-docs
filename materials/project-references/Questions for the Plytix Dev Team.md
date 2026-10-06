# Questions for the Plytix Dev Team

## Security

### SEC-1

- **Observed:** Calling `GET /family-attributes`, `GET /product-relationships`, and `GET /related-products` without any filter returns records belonging to Plytix accounts other than the authenticated one, not just the caller's own account. Adding an explicit `account_id` filter (all three endpoints) or `product_id` filter (the latter two) correctly scopes results to the caller's own account.  
- **Question:** Every other endpoint in the API automatically scopes results to the authenticated account with no filter needed. These three are the only exceptions found. Is account scoping missing by default here, and can it be fixed so results are scoped to the caller's account without requiring an explicit filter? This looks like a data-isolation bug.

| Plytix response *This has been fixed and they should be properly scoped now.* |
| :---- |

## Authentication

### AUTH-1

- **Observed:** `POST /auth/api/get-token` with valid credentials returns `200 {"data":[{"access_token":"...","refresh_token":"..."}]}`. No endpoint that accepts or consumes `refresh_token` appears in any OpenAPI spec.  
- **Question:** Is `refresh_token` functional? If so, what's the refresh endpoint and flow? If not, can it be removed from the response to avoid confusing integrators?

| Plytix response *Refresh token is not functional and is not mentioned in the current v1 api docs, for now we will keep using the same v1 auth until we develop v3 auth carefully. But yes, it can be removed. I will add more details to the auth part as we are working in it. Right now it is following the same logic than v1 (API key and API Password), but we will implement a token generation with different access level.* |
| :---- |

### AUTH-2

- **Observed:** `POST /auth/api/get-token` with bad credentials returns `401 {"error":{"msg":"Bad api_key or api_password: Credentials not valid","errors":[{"field":"http_status_code","msg":401}]}}`.  
- **Question:** The openapi spec shows this response as a flat `{"msg": "Bad api_key or api_password"}`, but the actual response is nested under `error` with an extended message. Can we update the spec to match?

| Plytix response *Related to previous response. Currently it is using the same than v1 and when we add auth v3 it will follow the correct format.* |
| :---- |

### AUTH-3

- **Observed:** The auth response includes `ratelimit-limit: 8` / `x-ratelimit-limit-second: 8` headers. The JWT's own claims embed different, higher per-account limits (20 requests/10s and 15,000 requests/3,600s on one account; 5,000 requests/3,600s on another). A third figure has separately been given by Plytix support to another customer via a support ticket: 50 requests/10s and 5,000 requests/hour, since the public pricing page doesn't list specific numbers.  
- **Question:** What are the actual, current rate limits per plan/account, and can they be published in the API docs rather than requiring a support escalation to find out?

| Plytix response *In this case the rate limit of 8 you mention at the start is the simple rate limit the public endpoints like login have (is that the case? or do you refer to other endpoints?). The JWT has the accounts configured rate limit, normal values are either 20/10s & 2000/hour or  50/10s & 5000/hour. but some accounts could have different rates if they negotiated so (mainly enterprise accounts). We will share with you the rate limits for both windows (10s and hourly limits) so you can document it properly.* |
| :---- |

## Products

### PROD-1

- **Observed:** `GET /api/v3/products?_fields=sku&_fields=status` returns `200` with correctly filtered data.  
- **Question:** The OpenAPI spec declares zero query parameters for this path (no `_fields`, no pagination params), even though `_fields` and pagination clearly work live. Can the spec be updated to declare the query parameters this endpoint actually accepts?

| Plytix response *OpenAPI spec now declares proper query params for the search parameters. We cant include all of them because they are dependant on the entity (e.g sku\[eq\]=XXX for products) but there is a description for operators filters.* |
| :---- |

### PROD-2

- **Observed:** `GET /products?_offset=0&_limit=10` returns `400 {"errors":[{"name":"InvalidFieldError","description":"Field '_offset' does not exist in model 'Product'."}]}`. `_page`/`_page_size` works instead.  
- **Question:** OpenAPI spec describes `_offset`/`_limit` as a valid alternative pagination style. Is it supported anywhere in v3, or should the docs drop that style entirely in favor of `_page`/`_page_size`?

| Plytix response *We couldn’t see \_offset and \_limit anywhere in the OpenAPI spec or in the api document, the error is expected, we should go for page and page size.* |
| :---- |

### PROD-3

- **Observed:** `GET /products?_fields=category_ids` returns `400 {"errors":[{"name":"HiddenFieldError","description":"Field 'category_ids' does not exist in model 'Product'."}]}`. `_fields=categories` works and returns expanded category objects instead.  
- **Question:** A separate document states that `_ids` fields are intentionally hidden "to prevent exposure of denormalization," but the OpenAPI spec's `ProductOutputDto` still declares `category_ids` as a field. Since hiding `_ids` fields is intentional, can `category_ids` be removed from the spec so it stops advertising a field that will always error?

| Plytix response *It now returns "{"data": \[\], "errors": \[{"name": "InvalidFieldError", "description": "Field 'category\_ids' does not exist."}\]}" and it no longers leak internal implementation details (saying a field is hidden). also as mentioned above, the spec cant advertise all valid fields for the filters.* |
| :---- |

### PROD-4

- **Observed:** `GET /products?_fields=relationships` returns `200` with the field simply absent from the response. No error is raised. The actual field name returned on products is `product_relationships`.  
- **Question:** Can the spec be corrected to use the real field name (`product_relationships`)? Separately, should requesting a nonexistent `_fields` value return an error instead of silently succeeding, so clients notice the mistake?

| Plytix response *Declaring all possible values that the query params could have (e.g for GET /products \_fields=product\_relationships is valid but \_fields=product\_relationships is not) is not feasible, but we could declare the query params themselves (e.g \_fields, \_page, \_and, operators like \[eq\], \[gte\], etc).* |
| :---- |

### PROD-5

- **Observed:** `GET /products/<sku>` returns `422 {"errors":[{"name":"ValidationError","description":"...Id must be of type PydanticObjectId..."}]}`. Only the Mongo ObjectId works as an identifier.  
- **Question:** OpenAPI spec states directly: *"Eg. For products, both id and sku (correctly url-encoded) can be used as identifiers,"* and the same claim is repeated in a newer version of that document. Is SKU meant to work as a product identifier on this endpoint?

| Plytix response *This has been fixed in the latest spec.* |
| :---- |

### PROD-6

- **Observed:** Requesting an unrecognized subpath (`GET /products/{id}/{bad_path}`) returns a `400` whose error message lists the resource's available fields, revealing fields not documented anywhere: `product_family_model_id`, `mark_as_deleted`, `last_context`, `modified_user_audit`, `created_user_audit`.  
- **Question:** Are these fields intentionally internal-only, or should any of them be customer-facing and documented?

| Plytix response *This has been changed to return an error that doesnt leak internal fields: {"data": \[\], "errors": \[{"name": "ValueError", "description": "Field 'bad-path' not found"}\]}* |
| :---- |

### PROD-7

- **Observed:** After linking a category to a product and confirming the link, `DELETE /products/{id}/categories` returns `204`; a follow-up `GET` on the product itself returns `404`: the whole product was deleted, not just the category association. The same result occurs when a completely made-up, non-existent subpath is used instead of `categories`. Both were retested against the documented "1:M Unlink" pattern, which describes a scoped delete at `DELETE /products/{id}/categories/{category_id}`. That scoped form produces the same whole-product deletion.  
- **Question:** Is it intentional that any `DELETE` on a `/products/{id}/{...}` subpath deletes the whole product regardless of the path given? This contradicts your own documented scoped-delete pattern (`DELETE api/v3/<plural_entity_name>/<identifier>/<plural_related_entity_name>/<linked_id>`).

| Plytix response *This should be fixed now, supported way is: POST /products/{product\_id}/categories with required info in body DELETE /products/{product\_id}/categories/{category\_id}*   |
| :---- |

### PROD-8

- **Observed:** `DELETE /products/{product_id}/relationships/{relationship_id}` is confirmed to safely remove only that relationship: a follow-up `GET` on the product shows every other field unchanged, with only `product_relationships` affected. No equivalent scoped-delete endpoint exists for categories or assets; the only confirmed-safe way to remove a single category is `PATCH /products/{id}` with a reduced `category_ids` array. No safe method has been found for removing a single asset.  
- **Question:** What is the supported, safe way to remove a single category or a single asset from a product? Given that relationships now have a safe, scoped `DELETE`, could the same pattern be extended to categories and assets?

| Plytix response *"Suported way is to do  POST /products/{product\_id}/categories with required info in body DELETE /products/{product\_id}/categories/{category\_id}  Linking and unlinking assets directly is not supported"* |
| :---- |

### PROD-9

- **Observed:** `_fields` correctly filters the response on list/search endpoints, but is silently ignored on `GET /products/{id}` and `GET /product-attributes/{id}`. Both always return the full default shape regardless of `_fields`.  
- **Question:** Is `_fields` intentionally unsupported on single-resource `GET` requests? If so, can we update the OpenAPI so clients don't assume it works there too?

| Plytix response *This has been fixed in the latest spec (30/09/2026).* |
| :---- |

### PROD-10

- **Observed:** `POST /products` with `{"attributes": {"wc_test_text": "..."}}` returns an `attributes` map keyed by attribute **name**, and also includes account-level default attributes that weren't sent in the request (e.g. completeness/readiness scores like `amazon_ready`, `website_ready`).  
- **Question:** Can we document this, specifically that `attributes` is keyed by name rather than by the attribute's Mongo ID, and which account-level attributes get auto-populated on create?

| Plytix response *Currently being reviewed by Core Tech team.* |
| :---- |

### PROD-11

- **Observed:** A standalone product starts at `product_level: 0`. The moment another product references it via `parent_id`, its `product_level` flips to `1`. The referencing product itself is `product_level: 2`. `num_variations` and the family's `total_products` update accordingly.  
- **Question:** Can you confirm this is the intended behavior so it can be documented accurately?

| Plytix response *Yes, this is intended, product levels are as follows Product level hierarchy. \- SINGLE (0): Individual product \- PARENT (1): Parent product with variants \- VARIANT (2): Variant of a parent product \- SUB\_VARIANT (3): Sub-variant of a variant* |
| :---- |

## Product & Asset Categories

### CAT-1

- **Observed:** `POST /product-categories` and `POST /asset-categories` both return `201` on success.  
- **Question:** The OpenAPI spec declares `200` as the success status for both create operations. Can it be corrected to `201`, matching actual behavior and your own documented response convention?

| Plytix response*We have updated OpenAPI spec to expose 201\.* |
| :---- |

## Product Attributes & Attribute Groups

### ATTR-1

- **Observed:** `POST /product-attributes` with `type: "FormulaAttribute"` returns `422 {"errors":[{"name":"ValidationError","description":"This account reached the limit of 2 formula attributes"}]}` once the limit is reached.  
- **Question:** Is a 2-formula-attribute cap standard across all plans, and if so, can it be added to the doc portal? How can an account request a higher limit?

| Plytix response *This seems to be a correct validation error given a feature limit, if im not misteken currently you have to talk with your account manager to get higher limits. We can expand this limit for you if necessary.* |
| :---- |

### ATTR-2

- **Observed:** Sending an invalid `type` on `POST /product-attributes` returns a `422` whose error message lists 15 valid type values, while the OpenAPI spec's `oneOf` only declares 14: the extra one is `HierarchyAttribute`. Attempting to actually create one returns `500 {"errors":[{"name":"ConfigurationError","description":"There was an error processing your request. Please try again later"}]}`.  
- **Question:** Is `HierarchyAttribute` a supported public attribute type? If yes, it needs a working create path and a spec entry. If no, can it be removed from the type-validation error list so it stops appearing as an option?

| Plytix response*Removed HierarchyAttribute from DTOs, it should be totally invalid.* |
| :---- |

### ATTR-3

- **Observed:** Sending a real attribute-group ID in `group_ids` on `POST /product-attributes` is accepted with no error, but the field never reappears: not in the create response, not on a follow-up `GET`, and not via `_fields=group_ids`.  
- **Question:** Does `group_ids` on attribute create actually link the attribute to the group? If so, what's the supported way to verify or read that link back via the API?

| Plytix response *Updated behaviour:"It no longer does, to link or unlink an attribute to a group the supported way is  POST /product-attributes/{id}/groups with required info in body DELETE /products-attributes/{id}/groups/{id}"* |
| :---- |

### ATTR-4

- **Observed:** `POST /product-attributes` with `type: "CompletenessAttribute"` and `attributes: [{"id": "<real_attribute_id>"}]` (a shape confirmed correct, since raw ID strings are rejected with a distinct `422`) returns `500 {"errors":[{"name":"ConfigurationError","description":"There was an error processing your request. Please try again later"}]}`. Reproduced twice with different numbers of referenced attributes. Only an empty `attributes: []` array succeeds.  
- **Question:** Can you reproduce and fix a `500` when creating a `CompletenessAttribute` with any non-empty `attributes` list? This appears to make the type unusable for its documented purpose of referencing other attributes.

| Plytix response *Fixed the bug that caused this. Creation and update of Completness attributes should now be functional. Updated on spec 30/09/2026.* |
| :---- |

## Connections

### CONN-1

- **Observed:** The `ConnectionCreateInputDto.type` field's spec description gives "Dropbox, FTP, SFTP" only as free-text examples. Sending `"FTP"` (uppercase) returns `422 {"errors":[{"name":"InputDTOValidationError","description":"type: Input should be 'dropbox', 'ftp' or 'sftp'"}]}`. That's the same rejection as a nonsense value.  
- **Question:** Can the spec declare `type` as an enum (`dropbox` / `ftp` / `sftp`) instead of a free-text description, so clients get proper validation without a live 422?

| Plytix response *This endpoints is internal \- Not need to be documented.* |
| :---- |

## Assets

### ASSET-1

- **Observed:** `POST /assets` with `{}` returns `422 {"errors":[{"name":"InputDTOValidationError","description":"Value error, Either 'url' or 'content' must be provided"}]}`.  
- **Question:** `AssetCreateInputDto`'s `required` list is empty, implying every field is optional. Can the spec express this "one of" requirement (e.g. via `oneOf`/`anyOf` or a clearer description), since the flat `required` array currently doesn't reflect it?

| Plytix response *Updated in OpenAPI schema.* |
| :---- |

### ASSET-2

- **Observed:** `POST /assets` with a real `category_ids` value succeeds, but a follow-up `GET /assets/{id}/categories` returns `[]`: the categories were never linked. The identical field on `POST /products` links immediately, confirmed via `GET /products/{id}/categories` right after create.  
- **Question:** Is silently ignoring `category_ids` on asset create intentional, or a bug? If intentional, can create either reject the field with an error or link it the same way product create does, so behavior is consistent across resources?

| Plytix response *"It no longer does, to link or unlink an attribute to a group the supported way is  POST /assets/{id}/categories with required info in body DELETE /assets/{id}/categoires/{id}"Updated in OpenAPI spec 30/09/2026.* |
| :---- |

### ASSET-3

- **Observed:** `PATCH /assets/{id}` and `PATCH /assets/{id}/{path}` both return `200` with the full updated asset in the response body.  
- **Question:** OpenAPI spec gives two different expected behaviors here, both contradicted by this: one states PATCH endpoints "RETURN 204 OK"; another states *"PATCH requests will not return the modified entity in the response... A 201 Created status will be returned if the creation or modification has been successfully completed."* Which convention is actually correct: no body, or the full updated entity?

| Plytix response *Updated behaviour and OpenAPI spec, PATCH operations now return 204 with no content.Updated in OpenAPI spec 30/09/2026.* |
| :---- |

### ASSET-4

- **Observed:** `PATCH /assets/{identifier}/{path}` (e.g. `.../alt_text`) expects the request body to be the field's bare new value (a raw JSON string), not a partial object like `{"alt_text": "..."}`. Root-level `PATCH /assets/{id}` uses the partial-object convention instead.  
- **Question:** Can this difference in body convention be documented explicitly, since a client that reuses the root-level partial-object convention on a subpath `PATCH` will send the wrong body shape?

| Plytix response Difference documented in OpenAPI. |
| :---- |

## Product & Asset Lists

### LIST-1

- **Observed:** `POST /pim-product-lists` (and `/asset-lists`) with `{}` returns two error entries in one response: `{"errors":[{"name":"InputDTOValidationError","description":"name: Field required"},{"name":"InputDTOValidationError","description":"type: Field required"}]}`. Every other `422` observed elsewhere in the API only reports the first validation failure.  
- **Question:** Is multi-error reporting intentional here, and is it planned to be consistent across all endpoints, or should clients only expect it on list creation?

| Plytix response *Products are lists are set to be removed \- Not need to be documented.* |
| :---- |

### LIST-2

- **Observed:** `GET /products/{id}/static_lists` only ever reflects Static list membership. There's no field or subpath that reflects which Smart lists currently match a given product.  
- **Question:** Is there a reverse-lookup endpoint for Smart list membership that isn't currently documented, or is re-running each list's own query the only supported way to determine this?

| Plytix response *Products are lists are set to be removed \- Not need to be documented.* |
| :---- |

## PDF Catalogs

### PDFCAT-1

- **Observed:** `POST /pdf-catalogs` with a valid body returns `422 {"errors":[{"name":"ValidationError","description":"Cannot create new items the feature pdfs for account 6a38f5a5b22478f30bfd755c"}]}` on an account without the feature enabled. `GET /pdf-catalogs` works and returns an empty list.  
- **Question:** Product Data Sheets is documented as a paid add-on requiring an Account Manager, but nothing in the help center or API docs states whether PDF Catalogs is gated the same way. Is it? Can this be documented publicly?

| Plytix response *This is an internal endpoint \- Not need to be documented.* |
| :---- |

## Ecatalogs

### ECAT-1

- **Observed:** `POST /ecatalogs` with a valid body returns `422 "Cannot create new items the feature ecatalogs for account ..."` on an account without the feature enabled. `GET /ecatalogs` works.  
- **Question:** Is Ecatalogs/Brand Portals gated behind a paid add-on the same way PDF Catalogs and Product Data Sheets are? No help-center article states this for Ecatalogs the way it does for Product Data Sheets. Can it be documented publicly?

| Plytix response *This is an internal endpoint \- Not need to be documented.* |
| :---- |

### ECAT-2

- **Observed:** A pre-existing ecatalog's `output_attributes` field uses a formula/formatter mini-language with nested operators (`CONCAT`, `JOIN`, `RESOLVE_RELATIONSHIPS`, `DECIMAL_FORMAT`, `HIERARCHY_SEPARATOR`), and its `settings` field is a deeply nested theme/header/footer/page-builder configuration object. The spec only lightly describes both.  
- **Question:** Can you provide (or point to) a complete reference for the `output_attributes` formula DSL and the `settings` object schema?

| Plytix response *This is an internal endpoint \- Not need to be documented.* |
| :---- |

## Product Families

### FAM-1

- **Observed:** `POST /product-families/{id}/{path}` returns `405 {"errors":[{"name":"MethodNotAllowed","description":"POST is not allowed on this path."}]}` for every field tried, including one that a `PATCH` on the identical URL successfully updates. The current OpenAPI spec explicitly declares `post` as a valid method on this path.  
- **Question:** Why does this path 405 live when your own current spec declares `POST` valid there? Should the spec drop `POST` for this path, or should the endpoint actually support it?

| Plytix response*A full URL example rather than a generic one would be useful to understand this. POST means "create", so it doesn't make sense for standard attributes that can not exist once the parent entity exists. E.g. if we create a product with \`POST /products/\` there will always be a \`label\` for that product, so \`POST /products/\<id\>/label\` won't make sense. The only places where a POST makes sense under an instance is for custom attributes (an attribute can not exist and be created) and to link entities. \`POST /products/\<id\>/label/attributes/\<new\_attribute\>\` \`POST /products/\<id\>/assets/\` A very similar logic applies to DELETE* |
| :---- |

## Product Relationships

### REL-1

- **Observed:** After linking two products (confirmed three separate ways: the link's own create response, the product's `product_relationships` field, and `GET /related-products?product_id=<id>`), `GET /products/{product_id}/relationships/{relationship_id}/related-products` still returns `{"data": [], "errors": []}`. The single-item form of the same path returns a not-found error. Retrying seconds later gives the same result, ruling out replication lag.  
- **Question:** Is `GET .../relationships/{relationship_id}/related-products` broken? `GET /related-products?product_id=<id>` works as a correct alternative. Is that the endpoint clients should use instead, or is the subpath meant to work too?

| Plytix response *Fix in progress.* |
| :---- |

## Channels

### CHAN-1

- **Observed:** An invalid `format` value returns `422 {"errors":[{"name":"ValidationError","description":"Field format is unknown"}]}`, which, unlike Connections' equivalent enum error, doesn't list which values are valid. `CSV` and `XML` are confirmed valid.  
- **Question:** The spec currently describes `format` as a free string rather than an enum. Can it be declared as an enum instead, and can the validation error list the accepted values the same way Connections' `type` error does?

| Plytix response *This is an internal endpoint \- Not need to be documented.* |
| :---- |

### CHAN-2

- **Observed:** Sending `{"rebuild_periodically": true}` alone (or with only one companion field) returns `422 {"errors":[{"name":"ValidationError","description":"Schema validation error"}]}`: no field is named. It only succeeds once `rebuild_feed_frequency`, `rebuild_feed_hod`, `rebuild_feed_moh`, and `rebuild_feed_timezone` are all supplied together.  
- **Question:** Can this validation error name the missing field(s), the way every other validation error in the API does? Can the requirement that all four companion fields be supplied together be documented?

| Plytix response *This is an internal endpoint \- Not need to be documented.* |
| :---- |

### CHAN-3

- **Observed:** The default create response for a channel includes an undocumented `wayfair` field, alongside the documented `shopify` block.  
- **Question:** Is `wayfair` a supported, documented-elsewhere destination that's simply missing from this spec, or an internal/unfinished field that shouldn't be exposed?

| Plytix response*Wayfair endpoint belongs to Channel Integration API (separated from API v3).*  |
| :---- |

### CHAN-4

- **Observed:** OpenAPI spec shared early in this project described Channels as UI-only, with no API endpoints for creating or managing channels. The current OpenAPI spec declares a full CRUD `/channels` resource, and `POST`/`GET`/`PATCH`/`DELETE /channels` are all confirmed working live.  
- **Question:** Can you confirm Channels' current status: stable and supported for public OpenAPI spec, or still in development and subject to change?

| Plytix response *This is an internal endpoint \- Not need to be documented.* |
| :---- |

### CHAN-5

- **Observed:** `PATCH /channels/{id}/products` returns `422` (`products` isn't a field on the channel update schema). `POST /channels/{id}/process` and `POST /channels/{id}/build` both return `405`. Setting `{"active": true}` via `PATCH` leaves the channel's run-status fields unchanged: no build gets triggered.  
- **Question:** Is there any API endpoint to trigger a channel build/process, or to assign products to a channel directly (rather than via `product_list_id`)? If not, can that be stated explicitly in the docs?

| Plytix response *This is an internal endpoint \- Not need to be documented.* |
| :---- |

## Cross-Cutting Consistency

### GEN-1

- **Observed:** Duplicate-name/uniqueness conflicts return different status codes and error names depending on the resource, with no apparent logic to the split:  
  - `422`: product categories, asset categories (`{"name":"ValidationError","description":"Category <name> already exists"}`); PIM product lists, asset lists (`{"name":"ValidationError","description":"A List with same name already exists"}`).  
  - `409`: attribute groups, attributes (`{"name":"AlreadyExists","description":"A group/attribute with the same name already exists"}`); products (`{"name":"AlreadyExists","description":"product data validation failed"}`, which doesn't name the field); channels (`{"name":"AlreadyExists","description":"A channel with the same name already exists"}`); product families.  
- **Question:** Is there an intended rule behind the 422/409 split, or should all duplicate-name conflicts be standardized on one status code and error name?

| Plytix response *Unified conflict responses, now they are 409 as they should.* |
| :---- |

### GEN-2

- **Observed:** Three distinct error envelope shapes appear across the API: (1) auth errors: `{"error":{"msg":"...","errors":[{"field":"...","msg":...}]}}`; (2) v3 resource validation errors: `{"data":[],"errors":[{"name":"...","description":"..."}]}`; (3) the OpenAPI spec itself declares FastAPI's default `HTTPValidationError` shape on error responses, which is never actually returned by any live endpoint tested.  
- **Question:** Can a single, canonical error response schema be documented (and the spec updated to reflect the shape that's actually returned), so clients can write one error handler that reliably covers the whole API?

| Plytix response *Changed open api spec to declare the actual error response. As for the auth error, that is not /v3 once we release /v3 for auth, it will have the same shape.* |
| :---- |

