# Plytix PIM v3 API — Questions for the Plytix Dev Team

## Security

### SEC-1 — Cross-tenant data returned by three endpoints
- **Observed:** Calling `GET /family-attributes`, `GET /product-relationships`, and `GET /related-products` without any filter returns records belonging to Plytix accounts other than the authenticated one, not just the caller's own account. Adding an explicit `account_id` filter (all three endpoints) or `product_id` filter (the latter two) correctly scopes results to the caller's own account.
- **Expected/Unclear:** Every other endpoint in the v3 API automatically scopes results to the authenticated account with no filter needed. These three are the only exceptions found.
- **Question:** Is account scoping missing by default on these three endpoints, and can it be fixed so results are scoped to the caller's account even without an explicit filter? This looks like a data-isolation bug.

## Authentication

### AUTH-1 — Undocumented `refresh_token` field
- **Observed:** `POST /auth/api/get-token` with valid credentials returns `200 {"data":[{"access_token":"...","refresh_token":"..."}]}`. No endpoint that accepts or consumes `refresh_token` appears in any documentation.
- **Expected/Unclear:** Whether `refresh_token` is a real, usable token and, if so, what endpoint it's used with — or whether it's a leftover field clients should ignore.
- **Question:** Is `refresh_token` functional? If so, what's the refresh endpoint and flow? If not, can it be removed from the response to avoid confusing integrators?

### AUTH-2 — v1 401 error body doesn't match documented shape
- **Observed:** `POST /auth/api/get-token` with bad credentials returns `401 {"error":{"msg":"Bad api_key or api_password: Credentials not valid","errors":[{"field":"http_status_code","msg":401}]}}`.
- **Expected/Unclear:** The v1 API documentation shows this response as a flat `{"msg": "Bad api_key or api_password"}`. The actual response is nested under `error`, has an extended message, and `errors[0].field` is set to `"http_status_code"` rather than naming the credential field that's actually wrong.
- **Question:** Can the documented error shape be updated to match the real response? Separately, should `errors[0].field` name the invalid credential instead of `"http_status_code"`?

### AUTH-3 — Conflicting and undocumented rate limits
- **Observed:** The auth response includes `ratelimit-limit: 8` / `x-ratelimit-limit-second: 8` headers. The JWT's own claims embed different, higher per-account limits (20 requests/10s and 15,000 requests/3,600s on one account; 5,000 requests/3,600s on another). A third figure — 50 requests/10s and 5,000 requests/hour — has separately been given by Plytix support to another customer via a support ticket, since the public pricing page doesn't list specific numbers.
- **Expected/Unclear:** Three different rate-limit figures exist across these sources, and none of them are published in customer-facing documentation.
- **Question:** What are the actual, current rate limits per plan/account, and can they be published in the API docs rather than requiring a support escalation to find out?

### AUTH-4 — Wrong host + valid credentials gives a generic 401
- **Observed:** `auth.plytix.com` (production) and `auth.dev.plytix.com` (dev) are separate auth services with disjoint credentials. Using credentials for one host against the other returns a generic `401`, identical to the response for actually-invalid credentials.
- **Expected/Unclear:** Nothing in the response distinguishes "wrong host" from "wrong credentials," so a client who has the right credentials but the wrong host has no way to diagnose the problem from the error alone.
- **Question:** Can the error response (or the docs) make it clear that auth is host-scoped, so integrators know to check the host before assuming their credentials are wrong?

### AUTH-5 — v3 unreachable on the production host
- **Observed:** Every v3 path tried against `pim.plytix.com/api/v3` (including a bare `/api/v3`) returns `503 {"message":"name resolution failed"}`. v3 works fully against `pim.dev.plytix.com/api/v3` under a separate dev account and auth host.
- **Expected/Unclear:** Whether v3 on the production host requires an account-level feature flag, a different account, or is simply not yet rolled out to production.
- **Question:** Is v3 generally available on the production host today? If it requires enabling per account, what's the process?

## Products

### PROD-1 — `GET /products` spec declares no query parameters
- **Observed:** `GET /api/v3/products?_fields=sku&_fields=status` returns `200` with correctly filtered data.
- **Expected/Unclear:** The OpenAPI spec declares zero query parameters for this path (no `_fields`, no pagination params), even though `_fields` and pagination clearly work live.
- **Question:** Can the spec be updated to declare the query parameters this endpoint actually accepts?

### PROD-2 — `_offset`/`_limit` pagination rejected
- **Observed:** `GET /products?_offset=0&_limit=10` returns `400 {"errors":[{"name":"InvalidFieldError","description":"Field '_offset' does not exist in model 'Product'."}]}`. `_page`/`_page_size` works instead.
- **Expected/Unclear:** Docs describe `_offset`/`_limit` as a valid alternative pagination style.
- **Question:** Is `_offset`/`_limit` pagination supported anywhere in v3, or should the docs drop that style entirely in favor of `_page`/`_page_size`?

### PROD-3 — Filtering dialect: only the "alternative" query-string syntax works
- **Observed:** Query-string filters — `sku=<value>`, `created[gt]=<date>`, `categories.name=<value>`, `attributes.<name>[icontains]=<value>` — all return `200` with correct results.
- **Expected/Unclear:** The docs present two filtering dialects: a JSON-object style (e.g. `{"operator":"<filter>","field":"attributes.name","value":"value"}`) labeled "Current," and the query-string style above labeled "Possible Alternative." Live testing only confirms the query-string style; the JSON-object style has not been confirmed working.
- **Question:** Is the JSON-object filter dialect actually supported on v3, or is the query-string style the only one that works? The "Current" vs. "Possible Alternative" labeling appears to be backwards for v3.

### PROD-4 — `_fields=category_ids` rejected despite being declared on the response schema
- **Observed:** `GET /products?_fields=category_ids` returns `400 {"errors":[{"name":"HiddenFieldError","description":"Field 'category_ids' does not exist in model 'Product'."}]}`. `_fields=categories` works and returns expanded category objects instead.
- **Expected/Unclear:** A separate document states that `_ids` fields are intentionally hidden "to prevent exposure of denormalization," but the OpenAPI spec's `ProductOutputDto` still declares `category_ids` as a field.
- **Question:** Since hiding `_ids` fields is intentional, can `category_ids` be removed from `ProductOutputDto` in the spec so it stops advertising a field that will always error?

### PROD-5 — `ProductOutputDto.relationships` doesn't exist live; real field is `product_relationships`
- **Observed:** `GET /products?_fields=relationships` returns `200` with the field simply absent from the response — no error. The actual field name returned on products is `product_relationships`.
- **Expected/Unclear:** The spec's `ProductOutputDto` declares a field called `relationships`.
- **Question:** Can the spec be corrected to use the real field name (`product_relationships`)? Separately, should requesting a nonexistent `_fields` value return an error instead of silently succeeding, so clients notice the mistake?

### PROD-6 — `GET /products/<sku>` returns 422 despite docs stating SKU is a valid identifier
- **Observed:** `GET /products/<sku>` returns `422 {"errors":[{"name":"ValidationError","description":"...Id must be of type PydanticObjectId..."}]}`. Only the Mongo ObjectId works as an identifier.
- **Expected/Unclear:** Documentation states directly: *"Eg. For products, both id and sku (correctly url-encoded) can be used as identifiers."* The same claim is repeated in a more recent version of that same document.
- **Question:** Is SKU meant to work as a product identifier on this endpoint? If not, can both the current and the more recent version of the docs be corrected, since both still make this claim?

### PROD-7 — Undocumented internal fields exposed via subpath error messages
- **Observed:** Requesting an unrecognized subpath (`GET /products/{id}/{bad_path}`) returns a `400` whose error message lists the resource's available fields, revealing fields not documented anywhere: `product_family_model_id`, `mark_as_deleted`, `last_context`, `modified_user_audit`, `created_user_audit`.
- **Expected/Unclear:** None of these appear in `ProductOutputDto` or any other schema.
- **Question:** Are these fields intentionally internal-only, or should any of them be customer-facing and documented?

### PROD-8 — `DELETE` on any product subpath deletes the entire product (critical)
- **Observed:** After linking a category to a product and confirming the link, `DELETE /products/{id}/categories` returns `204`; a follow-up `GET` on the product itself returns `404` — the whole product was deleted, not just the category association. The same result occurs when a completely made-up, non-existent subpath is used instead of `categories`. Both were retested against the documented "1:M Unlink" pattern, which describes a scoped delete at `DELETE /products/{id}/categories/{category_id}` — that scoped form produces the same whole-product deletion.
- **Expected/Unclear:** Documentation describes a general pattern for removing a single linked entity: `DELETE api/v3/<plural_entity_name>/<identifier>/<plural_related_entity_name>/<linked_id>`, implying a scoped, non-destructive removal.
- **Question:** Is it intentional that any `DELETE` on a `/products/{id}/{...}` subpath deletes the whole product regardless of the path given? This contradicts your own documented scoped-delete pattern and is a serious risk for any integration that assumes a scoped delete will only remove the association.

### PROD-9 — No safe, scoped way to remove a single category or asset from a product
- **Observed:** `DELETE /products/{product_id}/relationships/{relationship_id}` is confirmed to safely remove only that relationship — a follow-up `GET` on the product shows every other field unchanged, with only `product_relationships` affected. No equivalent scoped-delete endpoint exists for categories or assets; the only confirmed-safe way to remove a single category is `PATCH /products/{id}` with a reduced `category_ids` array. No safe method has been found for removing a single asset.
- **Expected/Unclear:** Given PROD-8, there's no documented, safe way to unassign one category or one asset from a product without risking the whole-product-delete bug above.
- **Question:** What is the supported, safe way to remove a single category or a single asset from a product? Given that relationships now have a safe, scoped `DELETE`, could the same pattern be extended to categories and assets?

### PROD-10 — `_fields` ignored on single-resource `GET`
- **Observed:** `_fields` correctly filters the response on list/search endpoints, but is silently ignored on `GET /products/{id}` and `GET /product-attributes/{id}` — both always return the full default shape regardless of `_fields`.
- **Expected/Unclear:** No documentation states this restriction.
- **Question:** Is `_fields` intentionally unsupported on single-resource `GET` requests? If so, can that be documented so clients don't assume it works there too?

### PROD-11 — `attributes` map keyed by name, unrequested defaults returned
- **Observed:** `POST /products` with `{"attributes": {"wc_test_text": "..."}}` returns an `attributes` map keyed by attribute **name**, and also includes account-level default attributes that weren't sent in the request (e.g. completeness/readiness scores like `amazon_ready`, `website_ready`).
- **Expected/Unclear:** Nothing documents that `attributes` is keyed by name rather than the attribute's Mongo ID, or that unrequested default attributes get added automatically.
- **Question:** Can this be documented — specifically that `attributes` is keyed by name, and which account-level attributes get auto-populated on create?

### PROD-12 — `product_level` semantics undocumented
- **Observed:** A standalone product starts at `product_level: 0`. The moment another product references it via `parent_id`, its `product_level` flips to `1`. The referencing product itself is `product_level: 2`. `num_variations` and the family's `total_products` update accordingly.
- **Expected/Unclear:** This state machine isn't documented anywhere.
- **Question:** Can you confirm this is the intended behavior so it can be documented accurately?

## Product & Asset Categories

### CAT-1 — Create returns 201, spec declares 200
- **Observed:** `POST /product-categories` and `POST /asset-categories` both return `201` on success.
- **Expected/Unclear:** The OpenAPI spec declares `200` as the success status for both create operations.
- **Question:** Can the spec be corrected to `201`, matching actual behavior and your own documented response-convention?

## Product Attributes & Attribute Groups

### ATTR-1 — `FormulaAttribute` capped at 2 per account, no documented way to raise it
- **Observed:** `POST /product-attributes` with `type: "FormulaAttribute"` returns `422 {"errors":[{"name":"ValidationError","description":"This account reached the limit of 2 formula attributes"}]}` once the limit is reached.
- **Expected/Unclear:** No plan or pricing documentation mentions this cap or how to raise it.
- **Question:** Is a 2-formula-attribute cap standard across all plans, and if so, can it be documented? How can an account request a higher limit?

### ATTR-2 — Undocumented 15th attribute type (`HierarchyAttribute`) 500s on create
- **Observed:** Sending an invalid `type` on `POST /product-attributes` returns a `422` whose error message lists 15 valid type values, while the OpenAPI spec's `oneOf` only declares 14 — the extra one is `HierarchyAttribute`. Attempting to actually create one returns `500 {"errors":[{"name":"ConfigurationError","description":"There was an error processing your request. Please try again later"}]}`.
- **Expected/Unclear:** Whether `HierarchyAttribute` is a real, supported type that should be added to the spec and fixed, or an internal/unfinished type that shouldn't be exposed at all.
- **Question:** Is `HierarchyAttribute` a supported public attribute type? If yes, it needs a working create path and a spec entry. If no, can it be removed from the type-validation error list so it stops appearing as an option?

### ATTR-3 — `group_ids` on attribute create: unclear if it actually links
- **Observed:** Sending a real attribute-group ID in `group_ids` on `POST /product-attributes` is accepted with no error, but the field never reappears — not in the create response, not on a follow-up `GET`, and not via `_fields=group_ids`.
- **Expected/Unclear:** Whether `group_ids` actually creates the group/attribute link internally despite never being visible afterward, or is silently dropped.
- **Question:** Does `group_ids` on attribute create actually link the attribute to the group? If so, what's the supported way to verify or read that link back via the API?

### ATTR-4 — `CompletenessAttribute` returns 500 on any real attribute reference (critical bug)
- **Observed:** `POST /product-attributes` with `type: "CompletenessAttribute"` and `attributes: [{"id": "<real_attribute_id>"}]` (a shape confirmed correct, since raw ID strings are rejected with a distinct `422`) returns `500 {"errors":[{"name":"ConfigurationError","description":"There was an error processing your request. Please try again later"}]}`. Reproduced twice with different numbers of referenced attributes. Only an empty `attributes: []` array succeeds.
- **Expected/Unclear:** `CompletenessAttribute` is a documented, spec'd type whose entire purpose is to reference other attributes — an empty reference list defeats its purpose.
- **Question:** Can you reproduce and fix a `500` when creating a `CompletenessAttribute` with any non-empty `attributes` list? This appears to make the type unusable for its documented purpose.

## Connections

### CONN-1 — `type` documented as free string, actually a fixed enum
- **Observed:** The `ConnectionCreateInputDto.type` field's spec description gives "Dropbox, FTP, SFTP" only as free-text examples. Sending `"FTP"` (uppercase) returns `422 {"errors":[{"name":"InputDTOValidationError","description":"type: Input should be 'dropbox', 'ftp' or 'sftp'"}]}` — the same rejection as a nonsense value.
- **Expected/Unclear:** The spec's description implies `type` accepts arbitrary strings, when it's actually a fixed, lowercase, case-sensitive enum.
- **Question:** Can the spec declare `type` as an enum (`dropbox` / `ftp` / `sftp`) instead of a free-text description, so clients get proper validation without a live 422?

## Assets

### ASSET-1 — Cross-field create requirement not reflected in the spec
- **Observed:** `POST /assets` with `{}` returns `422 {"errors":[{"name":"InputDTOValidationError","description":"Value error, Either 'url' or 'content' must be provided"}]}`.
- **Expected/Unclear:** `AssetCreateInputDto`'s `required` list is empty, implying every field is optional, when in fact at least one of `url`/`content` is required.
- **Question:** Can the spec express this "one of" requirement (e.g. via `oneOf`/`anyOf` or a clearer description), since the flat `required` array currently doesn't reflect it?

### ASSET-2 — `category_ids` silently ignored on asset create, works on product create
- **Observed:** `POST /assets` with a real `category_ids` value succeeds, but a follow-up `GET /assets/{id}/categories` returns `[]` — the categories were never linked. The identical field on `POST /products` links immediately, confirmed via `GET /products/{id}/categories` right after create.
- **Expected/Unclear:** No error or warning indicates that `category_ids` was ignored on the asset create call.
- **Question:** Is silently ignoring `category_ids` on asset create intentional, or a bug? If intentional, can create either reject the field with an error or link it the same way product create does, so behavior is consistent across resources?

### ASSET-3 — `PATCH` on assets returns 200 + full entity, contradicting documented convention
- **Observed:** `PATCH /assets/{id}` and `PATCH /assets/{id}/{path}` both return `200` with the full updated asset in the response body.
- **Expected/Unclear:** Documentation gives two different expected behaviors, both contradicted by this: one states PATCH endpoints "RETURN 204 OK"; another states "PATCH requests will not return the modified entity in the response... A 201 Created status will be returned if the creation or modification has been successfully completed."
- **Question:** Which convention is actually correct for `PATCH` — no body, or the full updated entity? Can the docs be reconciled to state one consistent rule that matches live behavior?

### ASSET-4 — `PATCH .../{path}` on assets takes a raw value, not a partial object
- **Observed:** `PATCH /assets/{identifier}/{path}` (e.g. `.../alt_text`) expects the request body to be the field's bare new value (a raw JSON string), not a partial object like `{"alt_text": "..."}`. Root-level `PATCH /assets/{id}` uses the partial-object convention instead.
- **Expected/Unclear:** This difference in body convention between root `PATCH` and subpath `PATCH` isn't documented anywhere.
- **Question:** Can this be documented explicitly, since a client that reuses the root-level partial-object convention on a subpath `PATCH` will send the wrong body shape?

## Product & Asset Lists

### LIST-1 — Lists have no member-ID field; membership lives on the product/asset itself
- **Observed:** Creating a list with `type: "Static"` auto-generates a hidden query (`static_lists` contains the list's own ID) — a "Static" list is implemented as a Smart list under the hood. Real membership is set via `PATCH /products/{id}` (or `/assets/{id}`) with `{"static_list_ids": ["<list_id>"]}`, not through any field on the list resource itself.
- **Expected/Unclear:** The general 1:M association pattern elsewhere in the API links related entities via `POST .../<identifier>/<plural_related_entity_name>` with the related entity's ID in the body. List membership has no equivalent link endpoint at all.
- **Question:** Is managing Static list membership exclusively through the product/asset's own `static_list_ids` field the intended, final public API design? If so, can this be documented explicitly, since it doesn't follow the API's own general association-endpoint convention?

### LIST-2 — Only list-create 422 reports multiple validation errors at once
- **Observed:** `POST /pim-product-lists` (and `/asset-lists`) with `{}` returns two error entries in one response: `{"errors":[{"name":"InputDTOValidationError","description":"name: Field required"},{"name":"InputDTOValidationError","description":"type: Field required"}]}`. Every other `422` observed elsewhere in the API only reports the first validation failure.
- **Expected/Unclear:** Whether `errors[0]` can always be treated as the only failure, or whether clients need to handle a multi-entry array everywhere.
- **Question:** Is multi-error reporting intentional here, and is it planned to be consistent across all endpoints, or should clients only expect it on list creation?

### LIST-3 — No way to query which Smart lists a product belongs to
- **Observed:** `GET /products/{id}/static_lists` only ever reflects Static list membership. There's no field or subpath that reflects which Smart lists currently match a given product.
- **Expected/Unclear:** The only way to determine Smart list membership appears to be re-running every Smart list's own query and checking whether the product is in the result — not practical at scale.
- **Question:** Is there a reverse-lookup endpoint for Smart list membership that isn't currently documented, or is re-running each list's query the only supported approach?

## PDF Catalogs

### PDFCAT-1 — Feature gated with no indication in error or docs
- **Observed:** `POST /pdf-catalogs` with a valid body returns `422 {"errors":[{"name":"ValidationError","description":"Cannot create new items the feature pdfs for account 6a38f5a5b22478f30bfd755c"}]}` on an account without the feature enabled. `GET /pdf-catalogs` works and returns an empty list.
- **Expected/Unclear:** Nothing in the help center or API docs states that PDF Catalogs is a gated, paid add-on requiring account-level enablement (unlike Product Data Sheets, which is documented as a paid add-on requiring an Account Manager).
- **Question:** Is PDF Catalogs gated behind a paid add-on the same way Product Data Sheets is? Can the error message state this directly (e.g. name the add-on) instead of only naming the account ID, and can this be documented publicly?

## Ecatalogs

### ECAT-1 — Feature gated with no indication in error or docs
- **Observed:** `POST /ecatalogs` with a valid body returns `422 "Cannot create new items the feature ecatalogs for account ..."` on an account without the feature enabled. `GET /ecatalogs` works.
- **Expected/Unclear:** Same gap as PDFCAT-1 — no help-center article states Ecatalogs/Brand Portals is a paid add-on.
- **Question:** Is Ecatalogs gated behind a paid add-on the same way PDF Catalogs and Product Data Sheets are? Can this be documented publicly, and can the error message name the add-on?

### ECAT-2 — `output_attributes` formula DSL and `settings` object are undocumented
- **Observed:** A pre-existing ecatalog's `output_attributes` field uses a formula/formatter mini-language with nested operators (`CONCAT`, `JOIN`, `RESOLVE_RELATIONSHIPS`, `DECIMAL_FORMAT`, `HIERARCHY_SEPARATOR`), and its `settings` field is a deeply nested theme/header/footer/page-builder configuration object. The spec only lightly describes both.
- **Expected/Unclear:** No reference exists describing the full set of `output_attributes` operators or the `settings` schema.
- **Question:** Can you provide (or point to) a complete reference for the `output_attributes` formula DSL and the `settings` object schema? Building correct payloads for either currently requires reverse-engineering an existing example.

## Product Families

### FAM-1 — `POST` on a family-attribute subpath returns 405 despite the spec declaring it valid
- **Observed:** `POST /product-families/{id}/{path}` returns `405 {"errors":[{"name":"MethodNotAllowed","description":"POST is not allowed on this path."}]}` for every field tried, including one that a `PATCH` on the identical URL successfully updates. The current OpenAPI spec explicitly declares `post` as a valid method on this path.
- **Expected/Unclear:** Live behavior contradicts your own current spec, not just older documentation.
- **Question:** Why does this path 405 live when your own spec declares `POST` valid there? Should the spec drop `POST` for this path, or should the endpoint actually support it?

## Product Relationships

### REL-1 — `related-products` subpath returns empty/404 despite a confirmed live relationship
- **Observed:** After linking two products (confirmed three separate ways: the link's own create response, the product's `product_relationships` field, and `GET /related-products?product_id=<id>`), `GET /products/{product_id}/relationships/{relationship_id}/related-products` still returns `{"data": [], "errors": []}`. The single-item form of the same path returns a not-found error. Retrying seconds later gives the same result, ruling out replication lag.
- **Expected/Unclear:** This subpath should reflect the same relationship data confirmed live through three other paths.
- **Question:** Is `GET .../relationships/{relationship_id}/related-products` broken? `GET /related-products?product_id=<id>` works as a correct alternative — is that the endpoint clients should use instead, or is the subpath meant to work too?

## Channels

### CHAN-1 — `format` documented as free string; error doesn't list valid values
- **Observed:** An invalid `format` value returns `422 {"errors":[{"name":"ValidationError","description":"Field format is unknown"}]}`, which — unlike Connections' equivalent enum error — doesn't list which values are valid. `CSV` and `XML` are confirmed valid.
- **Expected/Unclear:** The spec describes `format` as a free string rather than an enum.
- **Question:** Can `format` be declared as an enum in the spec, and can the validation error list the accepted values the same way Connections' `type` error does?

### CHAN-2 — `rebuild_periodically` requires 4 companion fields, with a 422 that names none of them
- **Observed:** Sending `{"rebuild_periodically": true}` alone (or with only one companion field) returns `422 {"errors":[{"name":"ValidationError","description":"Schema validation error"}]}` — no field is named. It only succeeds once `rebuild_feed_frequency`, `rebuild_feed_hod`, `rebuild_feed_moh`, and `rebuild_feed_timezone` are all supplied together.
- **Expected/Unclear:** Every other validation error in this API names the specific field that failed; this is the only one that doesn't.
- **Question:** Can this validation error name the missing field(s), the way every other validation error in the API does? Can the requirement that all four companion fields be supplied together be documented?

### CHAN-3 — Undocumented `wayfair` field in channel defaults
- **Observed:** The default create response for a channel includes an undocumented `wayfair` field, alongside the documented `shopify` block.
- **Expected/Unclear:** `wayfair` isn't in the spec at all.
- **Question:** Is `wayfair` a supported, documented-elsewhere destination that's simply missing from this spec, or an internal/unfinished field that shouldn't be exposed?

### CHAN-4 — Is Channels officially part of the supported public v3 API?
- **Observed:** Documentation shared early in this project described Channels as UI-only, with no API endpoints for creating or managing channels. The current OpenAPI spec declares a full CRUD `/channels` resource, and `POST`/`GET`/`PATCH`/`DELETE /channels` are all confirmed working live.
- **Expected/Unclear:** Whether Channels is meant to be documented and supported as a stable part of the public v3 API, or whether it's still in development and could change without notice.
- **Question:** Can you confirm Channels' current status — stable and supported for public documentation, or still in development?

### CHAN-5 — No API way to trigger a channel build/process
- **Observed:** `PATCH /channels/{id}/products` returns `422` (`products` isn't a field on the channel update schema). `POST /channels/{id}/process` and `POST /channels/{id}/build` both return `405`. Setting `{"active": true}` via `PATCH` leaves the channel's run-status fields unchanged — no build gets triggered.
- **Expected/Unclear:** Whether there's any API-accessible way to assign products directly to a channel or trigger a rebuild, versus this being entirely a UI-only action.
- **Question:** Is there any API endpoint to trigger a channel build/process, or to assign products to a channel directly (rather than via `product_list_id`)? If not, can that be stated explicitly in the docs?

## Cross-Cutting Consistency

### GEN-1 — Duplicate-name conflicts split unpredictably between 409 and 422
- **Observed:** Duplicate-name/uniqueness conflicts return different status codes and error names depending on the resource, with no apparent logic to the split:
  - `422` — product categories, asset categories (`{"name":"ValidationError","description":"Category <name> already exists"}`); PIM product lists, asset lists (`{"name":"ValidationError","description":"A List with same name already exists"}`).
  - `409` — attribute groups, attributes (`{"name":"AlreadyExists","description":"A group/attribute with the same name already exists"}`); products (`{"name":"AlreadyExists","description":"product data validation failed"}` — doesn't name the field); channels (`{"name":"AlreadyExists","description":"A channel with the same name already exists"}`); product families.
- **Expected/Unclear:** No documentation explains why some resources use `422` and others `409` for the same logical conflict.
- **Question:** Is there an intended rule behind the 422/409 split, or should all duplicate-name conflicts be standardized on one status code and error name?

### GEN-2 — Three different error response shapes across the API
- **Observed:** Three distinct error envelope shapes appear across the API: (1) auth errors — `{"error":{"msg":"...","errors":[{"field":"...","msg":...}]}}`; (2) v3 resource validation errors — `{"data":[],"errors":[{"name":"...","description":"..."}]}`; (3) the OpenAPI spec itself declares FastAPI's default `HTTPValidationError` shape on error responses, which is never actually returned by any live endpoint tested.
- **Expected/Unclear:** No single documented error schema covers all three cases.
- **Question:** Can a single, canonical error response schema be documented (and the spec updated to reflect the shape that's actually returned), so clients can write one error handler that reliably covers the whole API?
