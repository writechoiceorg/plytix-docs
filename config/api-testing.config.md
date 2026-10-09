# Plytix PIM API — Testing Config

## Environment

- **Auth base URL (prod, "API Docs" account)**: `https://auth.plytix.com` — ✅ confirmed live 2026-08-31.
- **Auth base URL (DEV, "David's Dev Account")**: `https://auth.dev.plytix.com` — ✅ confirmed live 2026-09-04. **Different host per environment, not just per account** — the "API Docs" account's `api_key`/`api_password` get a hard `401 {"error":{"msg":"Bad api_key or api_password: Query did not throw any results"...}}` from this host (they don't exist here at all), and conversely the dev account's credentials 401 against `auth.plytix.com`. Always pair the right auth host with the right credential set.
- **PIM base URL (v1)**: `https://pim.plytix.com/api/v1` — ✅ confirmed live 2026-08-31 (accepts the auth token, returns real data).
- **PIM base URL (v3, prod/sandbox host)**: `https://pim.plytix.com/api/v3` — ⚠️ **status changed 2026-10-08, see quirk #103.** Previously (2026-08-31) every path returned a gateway `503 {"message":"name resolution failed"}`. As of 2026-10-08 it returns `401 {"detail": "Unauthorized"}` to a DEV-environment bearer token, which proves the host now routes v3 and the service answers. Not yet exercised with a valid prod credential — `bruno-collection/.env` currently holds only the DEV key pair, so the "API Docs" credentials would need re-adding to confirm end to end. Do not document this as the production base URL until that run happens, but do not treat it as unreachable either.
- **PIM base URL (v3, DEV host)**: `https://pim.dev.plytix.com/api/v3` — ✅ **fully confirmed live and working, 2026-09-04**. `GET /api/v3/products?_fields=sku&_fields=status`, authenticated with a token from `auth.dev.plytix.com` for **"David's Dev Account"**, returns `200` with real product data (`data: [{id, sku, status}, ...]`) plus `pagination.next_page` (a full next-page URL). Response shape matches `openapi_pimv3.json`'s `SearchProductsResponse` schema exactly. Provided by Plytix (David), a separate account in Plytix's DEV environment, distinct from the "API Docs" account/host used for v1 testing above. **This fully resolves the earlier v3-unreachable blocker**: v3 exists, is live, and behaves as documented — it just isn't deployed/routed on the `pim.plytix.com` prod host for the "API Docs" account. It's on a separate dev host tied to a separate account with its own auth host. Bruno coverage: `02-Products-v3/` (auth + list, both scoped to `Dev` since v3 only exists there), run with `--env "Dev"`.
- **Spec file**: `openapi_pimv3.json` (repo root) — 51 paths, no `servers`/`securitySchemes`/`security` declared in the spec itself; auth is documented only in the v1 Postman collection (`materials/api-references/Plytix_pimv1.postman_collection (5).json`).
- **Bruno collection root**: `bruno-collection/`
- **Credentials**: `bruno-collection/.env` (gitignored). Load before every `bru run`:
  ```bash
  set -a; source bruno-collection/.env; set +a
  ```
  Test account provided by the user 2026-08-31: `PLYTIX_API_KEY` / `PLYTIX_API_PASSWORD`, decodes (via the returned JWT) to account "API Docs" (`6a8ed9ba98cab862c35f5f89`), user `writechoice_test`, role `ADMIN`.
  DEV account provided by the user 2026-09-04: `PLYTIX_DEV_API_KEY` / `PLYTIX_DEV_API_PASSWORD` (password is single-quoted in `.env` — it contains `&`/`@`/`%` which break unquoted `source`), decodes to account "David's Dev Account" (`6a38f5a5b22478f30bfd755c`), user `TestDH`, role `ADMIN`. Use with `auth_base_url` = `https://auth.dev.plytix.com` (the `Dev` Bruno environment, not `Sandbox`).

## Auth

Bearer token flow, documented only in the v1 Postman collection (no auth endpoint appears in `openapi_pimv3.json`):

- **Get token**: `POST https://auth.plytix.com/auth/api/get-token`
  Body: `{ "api_key": "...", "api_password": "..." }`
  Response `200`: `{ "data": [ { "access_token": "...", "refresh_token": "..." } ] }` — confirmed live. `refresh_token` is **undocumented** anywhere in the materials (see quirks).
  Response `401`: confirmed live, but body shape differs from docs — see quirks.
- **Token lifetime**: 15 minutes. Confirmed two ways: (a) the Plytix product team said so in the 2026-08-31 kickoff call (Ksenija Rybe named it as the top API complaint), and (b) the live token's own JWT claims (`exp` − `iat` = 900s). No confirmed refresh-token endpoint; assume a new token must be requested via the same endpoint until proven otherwise.
- **Auth header on subsequent calls**: `Authorization: Bearer <access_token>` — confirmed working live against `POST /api/v1/products/search`.
- Bruno pattern (implemented): `bruno-collection/01-Authentication/Get Access Token.bru` captures the token via `script:post-response` → `bru.setVar("access_token", ...)`.

## Resource ID prefixes

| Resource | Prefix | Notes |
|---|---|---|
| Product (v1) | *(none)* | 24-char hex Mongo-style ObjectId, e.g. `6a8eda245d8cd52df9d24386`. |
| Account | *(none)* | Same ObjectId style, e.g. `6a8ed9ba98cab862c35f5f89` (from JWT claims, not a live resource call). |

| Product (v3) | *(none)* | Same 24-char hex ObjectId style, e.g. `6a38f614c3d65a5f868b1a06` (confirmed live 2026-09-04 against "David's Dev Account"). |
| Every other v3 resource (categories, attribute groups/attributes, connections, import profiles, assets, lists, catalogs, families, relationships, channels, ecatalogs) | *(none)* | Confirmed across all of Phases 1-4 (2026-09-07/08) — every single v3 resource uses the same unprefixed 24-char hex `PydanticObjectId` style, no exceptions found. Safe to treat as a universal ID format for this API; not worth re-confirming per-resource going forward. |

## Known API quirks

Confirmed live 2026-08-31 while testing the auth flow only:

1. **Undocumented `refresh_token` field** in the success response `data[0]`, alongside `access_token`. No refresh-token endpoint appears anywhere in the gathered materials. Unconfirmed whether it's usable — flag to Plytix.
2. **401 error body shape doesn't match the v1 collection's docs.** Documented: `{ "msg": "Bad api_key or api_password" }`. Actual live: `{ "error": { "msg": "Bad api_key or api_password: Credentials not valid", "errors": [ { "field": "http_status_code", "msg": 401 } ] } }` — nested one level deeper under `error`, extended message text, and an `errors` array whose entry mislabels the field as `"http_status_code"` instead of naming `api_key`/`api_password`.
3. **Undocumented rate limits.** The auth endpoint itself returns `ratelimit-limit: 8` / `x-ratelimit-limit-second: 8` response headers. Separately, the JWT's own claims embed per-account PIM API limits: 20 req/10s and 15000 req/3600s. Neither appears in any of the gathered materials.
4. **`GET /api/v1/products` returns `405 Method Not Allowed`** — v1 product listing is `POST /api/v1/products/search` (confirmed working, matches the Postman collection's "Product search" naming), not a GET. Worth double-checking `API V3.md`/the openapi spec don't repeat this GET-vs-POST assumption for v3's `/api/v3/products`.
5. ~~**v3 API unreachable at its only plausible host**~~ — resolved 2026-09-04, see Environment section above.

Confirmed live 2026-09-04 while testing v3 products against "David's Dev Account":

6. **Auth host is environment-scoped, not just account-scoped.** `auth.plytix.com` (prod) and `auth.dev.plytix.com` (dev) are separate services with disjoint credential sets — mixing the wrong credential with the wrong host produces a generic 401 in both directions, with no hint that the *host* (not the credential) is wrong. Any client/doc guidance should make clear that dev/prod are fully separate auth deployments.
7. **`openapi_pimv3.json`'s `GET /api/v3/products` declares no query parameters at all** — no `_fields`, no pagination params — yet `_fields=<field>` (repeatable) demonstrably works live exactly as documented in the prose `API V3.md` (not the spec). Per this repo's trust order the spec wins on *shape* conflicts, but this isn't a shape conflict — the spec is just missing parameters that are live and working. Flag to Plytix as a likely-incomplete/stale OpenAPI spec, and check other list endpoints (`/assets`, categories, asset lists) for the same gap.

Confirmed live 2026-09-07 finishing Phase 0 (cross-cutting checks) against `/api/v3/products`, "David's Dev Account":

8. **Pagination**: default page size is **25**; the response always carries a link-style `pagination.next_page` (full URL) — this is the primary mechanism. `_page`+`_page_size` (one of `API V3.md`'s "Possible Alternative" styles) **works** — confirmed 200, honors the requested size, and the returned `next_page` link carries both params forward. `_offset`+`_limit` (the other alternative style) **does not work** — `400 {"errors":[{"name":"InvalidFieldError","description":"Field '_offset' does not exist in model 'Product'."}]}`.
9. **`_sort_by=<field>` works** — confirmed 200, `_sort_by=sku` returns results in ascending SKU order.
10. **`_expand=<relationship>` does NOT work on `/products`** — `400 {"errors":[{"name":"InvalidFieldError","description":"Field '_expand' does not exist in model 'Product'."}]}`, the same generic invalid-query-param error as `_offset`. This contradicts `API V3.md`'s described `_expand` default-expand mechanism. Expansion instead appears to happen automatically per `_fields` value — requesting `_fields=categories` already returns fully expanded category objects with no `_expand` needed.
11. **Filtering — three dialects confirmed live**, all matching the "Possible Alternative" (query-string) column of `API V3.md`'s filter table (~lines 145-186), not the "Current" (JSON-object) column: (a) plain field filter `sku=<value>` — 200, exact match; (b) operator filter `created[gt]=<date>` — 200 (URL-encode the brackets); (c) related-entity dot filter `categories.name=<value>` and custom-attribute filter `attributes.<attr_name>=<value>` / `attributes.<attr_name>[icontains]=<value>` — all 200 and correctly filter. v3 implements the newer query-string dialect, not the older JSON-object one described as "Current" in the prose doc.
12. **`_fields=category_ids`** (declared in `openapi_pimv3.json`'s `ProductOutputDto`) **is rejected**: `400 {"errors":[{"name":"HiddenFieldError","description":"Field 'category_ids' does not exist in model 'Product'."}]}`. The plural `_fields=categories` works and returns fully expanded category objects instead. Two different "invalid field" behaviors observed on this one endpoint: some unknown `_fields` values 400 with a named error (`category_ids`), while others are silently dropped with no error and no key in the response (see next item, `relationships`).
13. **The spec's `ProductOutputDto.relationships` field does not exist on the live API.** Requesting `_fields=relationships` is silently ignored (200, field just absent from the response — no error). The real field name is **`product_relationships`**, confirmed three ways: the full `GET /products/{id}` response, `_fields=product_relationships` on search, and the internal model's own field-list error message (item 15 below).
14. ~~**Identifier flexibility — `API V3.md`'s claim is false for this v3 endpoint/account.**~~ — ✅ **RESOLVED 2026-10-01, see quirk #86: SKU now works as `{identifier}` (200), and a nonexistent SKU returns 404. Original finding preserved below for history.** **Identifier flexibility — `API V3.md`'s claim is false for this v3 endpoint/account.** `GET /products/<mongo_id>` → 200. `GET /products/<sku>` → `422 {"errors":[{"name":"ValidationError","description":"...Id must be of type PydanticObjectId..."}]}`. Only the raw Mongo ObjectId works as `{identifier}`; SKU is rejected outright. Flag to Plytix — may be a v1-only behavior incorrectly carried over to v3 in the prose doc, or a feature not enabled for this account.
15. **Subpath discovery technique (applies to every v3 resource)**: `GET /{resource}/{id}/{path}` with an unrecognized `{path}` returns `400 {"errors":[{"name":"ValueError","description":"Field '<path>' not found. Available fields: [...]"}]}` — listing the resource's *raw internal model* field names. Confirmed on both `products` (list includes undocumented fields not in `ProductOutputDto`: `product_family_model_id`, `mark_as_deleted`, `last_context`, `modified_user_audit`, `created_user_audit`) and `assets`. **Caveat**: the list is raw-model-only — it does not include computed/joined relations that are still valid subpaths (`categories`, `assets`, `relationships` all resolve 200 on products despite not being in the raw list). Use this trick in every later phase to discover a resource's real fields fast, but still try the Output DTO's own relation names too.
16. **Confirmed subpaths on `/products/{id}/{path}`**: `attributes` (200, full map), `attributes/<name>` (200, single value), `categories` (200, expanded array), `relationships` (200, flat `[{relationship_id, relationship_label, product_id}]` — a different, flatter shape than the `product_relationships` field on the full GET, which nests `related_products: [{quantity, last_modified}]` per entry), `assets` (200, full expanded asset objects).
17. **Confirmed subpaths on `/assets/{id}/{path}`** (spot-checked on a pre-existing read-only asset fixture, ahead of Phase 2a): `categories` (200, `[]` for this asset). `attributes`, `relationships`, `products` are **not** valid asset subpaths (400 — not in the asset's raw field list; assets have no attributes/relationships concept, and there's no reverse `assets/{id}/products` lookup).
18. **422 validation error shape confirmed** on `POST /products` (sku omitted): `{"data":[],"errors":[{"name":"InputDTOValidationError","description":"sku: Field required"}]}`. This is a third distinct error envelope in this account (alongside the nested 401 auth shape and FastAPI's *unused* default `HTTPValidationError` shape) — a flat `errors` array of `{name, description}`, where `description` is a free-text `"<field>: <message>"` string.

Confirmed live 2026-09-07 testing Phase 1 (`product-categories`, `asset-categories`, `product-attribute-groups`, `product-attributes`, `connections`, `import-profiles`) against "David's Dev Account":

19. **Mutating create status code confirmed: `201 Created`**, on every Phase 1 resource — matches `API V3.md`'s stated convention, **not** `openapi_pimv3.json`'s declared `200`/`422`-only responses. (Products' own create wasn't tested yet — that's Phase 2b — but every Phase 1 create so far agrees on 201.)
20. **Major finding — resolves `USER_FLOWS.md`'s central open question.** `openapi_pimv3.json` declares `PATCH`/`DELETE` for **no** Phase 1 resource. Both work anyway, confirmed on every one of the six: `PATCH /{resource}/{id}` with a partial body — `200`, applies the update (spot-checked as a rename on `product-categories`). `DELETE /{resource}/{id}` — `204 No Content`, and a follow-up `GET` on the same id then returns `404 {"errors":[{"name":"NotFoundError","description":"Document with id ... not found"}]}` (genuinely deleted, not soft-deleted); a follow-up subpath `GET` returns a simpler `404 {"errors":[{"name":"NotFoundError","description":"Resource not found"}]}`. Strongly suggests this undeclared-but-working PATCH/DELETE pattern generalizes to every v3 resource — confirm per-resource in later phases rather than assuming, but it's no longer an open "does it exist at all" question.
    - **Update (2026-09-15):** `openapi_pimv3.json` was refreshed to a newer FastAPI export (51→63 paths, 191→289 schemas) that now formally declares `PATCH`/`DELETE` on nearly every resource, plus new resources (`family-attributes`, `product-relationships`/`related-products`). This specific gap is resolved in the spec text itself — no longer just an observed-but-undeclared behavior. The live-behavior findings above remain accurate and worth keeping as historical record of what was verified by hand.
21. **`ConnectionCreateInputDto.type` is not a free string** despite the spec's description ("Dropbox, FTP, SFTP" given only as examples) — it's validated against a fixed, **lowercase** enum: `dropbox`, `ftp`, `sftp`. Uppercase (`"FTP"`) is rejected the same as a nonsense value: `422 {"errors":[{"name":"InputDTOValidationError","description":"type: Input should be 'dropbox', 'ftp' or 'sftp'"}]}`.
22. **Real status-gating rule found (first one)**: `FormulaAttribute` creation is capped — `422 {"errors":[{"name":"ValidationError","description":"This account reached the limit of 2 formula attributes"}]}` on "David's Dev Account" (already at its limit via pre-existing fixtures). `FormulaAttribute`'s create path itself remains unconfirmed as working since this account can't test it further — see Status-gating rules below.
23. **Undocumented 15th product-attribute type found.** `openapi_pimv3.json`'s `POST /product-attributes` `oneOf` declares 14 types, but an invalid-`type` 422 lists **15** valid discriminator tags, including `HierarchyAttribute` — not in the spec at all. Attempting to actually create one 500s (`{"errors":[{"name":"ConfigurationError","description":"There was an error processing your request. Please try again later"}]}`) — reads as an unfinished/unexposed feature, not a documented bug. Don't build customer-facing docs around it; flag to Plytix.
24. **`_fields` is ignored on single-resource `GET /{resource}/{id}`** — only works on the list/search endpoint. Confirmed on both `/products/{id}` and `/product-attributes/{id}`: requesting `_fields=id&_fields=...` still returns the full default shape. Generalizes/refines quirk #7 and #12-13, which were only tested against the search endpoint.
25a. **Duplicate-name uniqueness is enforced, with an inconsistent status code across resources.** Re-creating `product-categories`/`asset-categories` with a name that already exists → `422 {"errors":[{"name":"ValidationError","description":"Category <name> already exists"}]}`. Re-creating `product-attribute-groups`/`product-attributes` with a duplicate name → **`409 Conflict`** `{"errors":[{"name":"AlreadyExists","description":"A group/attribute with the same name already exists"}]}` — a different status code and error `name` than the categories' 422. Discovered via re-running this session's own `bru run` verification against fixtures already created earlier in the same session — a useful reminder that this collection's "Create X" requests are **not idempotent to re-run** once a fixture with that name exists; that's expected, not a bug in the Bruno files.
25. **`group_ids` on `product-attributes` create is accepted without error but its effect is unconfirmed** — sending a real attribute-group id in `group_ids` on create doesn't 422, but the field never appears in the create response, a follow-up `GET`, or `_fields=group_ids` on the list endpoint (silently dropped, like quirk #13's `relationships`). Whether the group linkage actually persisted is unknown — would need to check from the attribute-group's own side (a members-list subpath) to confirm, not attempted yet.

Confirmed live 2026-09-08 testing Phase 2 (`assets`, extending `products`) against "David's Dev Account":

26. **Relationship-array fields on `POST` create are resource-specific: sometimes silently ignored, sometimes applied.** `category_ids` sent on `POST /assets` is **silently ignored** — a follow-up `GET /assets/{id}/categories` returns `[]` even though the create request included a real category id (no error, same silent-drop pattern as quirk #13/#25's `relationships`/`group_ids`). But the identical `category_ids` field sent on `POST /products` **does link immediately** — confirmed via `GET /products/{id}/categories` right after create. Likewise `thumbnail_id` (single-reference, not array) on `POST /products` persists correctly in the create response itself. **Don't assume either behavior generalizes — test relationship-array fields on create per resource.** The fix for assets: send `category_ids` on a follow-up `PATCH /assets/{id}` instead — confirmed that does apply the linkage (see finding below).
27. **`PATCH` reliably applies relationship-array fields that `POST` create may silently drop.** Confirmed on assets: `PATCH /assets/{id}` with `category_ids` in the body **does** link (verified both in the PATCH response's `categories` field and a follow-up `GET .../categories`). Likely the correct workaround anywhere a `POST` create silently drops a relationship field (e.g. worth re-testing `product-attributes`' unconfirmed `group_ids` from quirk #25 via `PATCH` in a future session, given products now has an undeclared-but-working `PATCH` too — see quirk #20).
28. **Mutating status codes confirmed for assets/products**: `POST /assets` → `201`. `PATCH /assets/{id}` and `PATCH /assets/{id}/{path}` → `200` (matches spec, contradicts `API V3.md`'s stated 204-for-patch convention — same as products' `POST`). `POST /products` (full-featured) → `201`. `DELETE /products/{id}` → `204` (matches `API V3.md`'s prose convention, contradicts spec's declared `200`).
29. **`PATCH /assets/{identifier}/{path}` subpath semantics**: `{path}` names a single field (e.g. `alt_text`), and the request body is that field's **raw new value** (a bare JSON string, not a partial object) — different shape convention than the root `PATCH`'s partial-object body. Response is the full updated resource either way.
30. **Products' `attributes` map is keyed by the attribute's `name`, not its Mongo `id`** — confirmed via `POST /products` with `{"attributes": {"wc_test_text": "..."}}`. The response's `attributes` map also includes several account-level default/system completeness attributes (`amazon_ready`, `basic_information_completeness`, `website_ready`, etc., all numeric scores) that weren't sent in the request — these appear automatically on every product, not created by this test.
31. ~~**Critical finding — `DELETE /products/{identifier}/{path}` ignores `{path}` entirely and deletes the whole product.**~~ — ✅ **RESOLVED 2026-09-23.** Re-tested three ways on a fresh disposable product with a real, confirmed category link: `DELETE /products/{id}/categories` now returns `405 Method Not Allowed` ("'delete' is not allowed on the 'categories' collection: no single well-defined write target"); `DELETE /products/{id}/totally_made_up_path_xyz` (unrecognized field) returns `404 Not Found` ("Product has no field '...'"); the product is confirmed fully intact via a follow-up `GET` in both cases. Plytix appears to have fixed the delete handler — this is no longer a live hazard as of 2026-09-23. See `02-Products-v3/Delete Product.bru` for the fresh captured examples. Original 2026-09-08 finding preserved above for history.
32. **`AssetCreateInputDto`'s empty `required` list doesn't reflect a real cross-field validation rule.** `POST /assets` with `{}` → `422 {"errors":[{"name":"InputDTOValidationError","description":"Value error, Either 'url' or 'content' must be provided"}]}` — logically required, just not expressible in the schema's flat `required` array.
33. **`sku` is unique per account, enforced with `409`, same family as attribute groups/attributes (quirk #25a), not categories' `422`.** Re-creating `WC-TEST-FULL-001` → `409 {"errors":[{"name":"AlreadyExists","description":"product data validation failed"}]}` — vaguer message than the other `AlreadyExists` cases (doesn't name the field), but the same status/error-`name` family. Extends quirk #25a's tally: products join attribute-groups/attributes on the `409` side of the categories-vs-everything-else split.

Confirmed live 2026-09-08 testing Phase 3 (`pim-product-lists`, `asset-lists`, `pdf-catalogs`, `product-families`, `product-family-models`, `relationships`) against "David's Dev Account":

34. **Major finding — how "Static" list membership actually works.** Neither `ProductListCreateInputDto` nor `AssetListCreateInputDto` has any field for a fixed member-ID array. Creating `type: "Static"` instead **auto-generates a `query`** targeting the list's own id: `[[{"operator":"in","field":"static_lists","value":["<list_id>"],"field_type":"PimProductAttribute.ObjectIdAttribute"}]]`. A "Static" list is really a Smart list whose query is `static_lists contains <list_id>` — membership lives on **each product's/asset's own `static_list_ids` field**, not on the list. To add a member: `PATCH /products/{id}` (or `/assets/{id}`) with `{"static_list_ids": ["<list_id>"]}` — confirmed working; verify via the computed subpath `GET /products/{id}/static_lists` (`_fields=static_list_ids` on the main resource is silently dropped, same pattern as quirk #13/#25/#26).
35. **Mutating status codes confirmed for lists**: `POST /pim-product-lists` and `POST /asset-lists` → `201`. Undeclared `PATCH`/`DELETE` both work on both resources (200/204), extending the tally from quirks #20/#26 to a 9th and 10th resource.
36. **First multi-entry `errors` array observed.** `POST /pim-product-lists` (and `/asset-lists`) with `{}` returns **two** `errors` entries at once (`name`/`type` both missing) — `[{"name":"InputDTOValidationError","description":"name: Field required"},{"name":"InputDTOValidationError","description":"type: Field required"}]`. Every other 422 confirmed so far in this project has returned only the first validation failure found; this is the first resource to report all of them together. Don't assume `errors[0]` is the only entry worth checking going forward.
37. **PDF Catalogs are entirely feature-gated off for "David's Dev Account."** `POST /pdf-catalogs` with a valid minimal body still 422s: `{"errors":[{"name":"ValidationError","description":"Cannot create new items the feature pdfs for account 6a38f5a5b22478f30bfd755c"}]}`. `GET /pdf-catalogs` works fine (200, empty list) — only creation is blocked. This is an account-level feature flag, not a request problem; blocks any further testing of `output_attributes`/`pages`/`settings` shapes, and means Phase 4's Ecatalogs `pdf_catalog_id` can't be tested with a real value in this account.
38a. **List names (`pim-product-lists`/`asset-lists`) are unique per account, enforced with `422`, joining categories on that side of the split from quirk #25a/#33.** Re-creating "WC Test Static List" → `422 {"errors":[{"name":"ValidationError","description":"A List with same name already exists"}]}`. Discovered via this session's own `bru run` verification re-hitting already-created fixtures — expected, not a bug (same precedent as every prior phase's duplicate-name reruns).
38. **Product Families/Product Family Models/Relationships are genuinely read-only** (`GET` only, confirmed no `POST` anywhere in the spec — unlike every other resource tested so far, no undeclared-write spot-check was attempted here since there's nothing to create in the first place). All three already have real, non-empty pre-existing data in this account (2 product families, matching family models with rich `parent_attribute_labels`/`no_level_attribute_labels`/`variant_attribute_labels` arrays, and 2 relationship types) — no scratch data needed or possible.

Confirmed live 2026-09-08 testing Phase 4 (`channels`, `ecatalogs`) against "David's Dev Account" — the last individual-endpoint phase:

39. **`Channel.format` is also a hidden fixed set, same pattern as Connections' `type` (quirk #21) and NOT the free string the spec describes.** A nonsense value 422s: `{"errors":[{"name":"ValidationError","description":"Field format is unknown"}]}` — unlike Connections' error, this one does **not** enumerate the valid values. `CSV` and `XML` both confirmed valid.
40. **Enabling `rebuild_periodically` requires a full set of companion fields together, and the API gives zero field-level guidance when they're missing.** `{"rebuild_periodically": true}` alone (or with only `rebuild_feed_frequency`) → `422 {"errors":[{"name":"ValidationError","description":"Schema validation error"}]}` — no field named, unlike every other 422 confirmed in this project. Only succeeds once `rebuild_feed_frequency`+`rebuild_feed_hod`+`rebuild_feed_moh`+`rebuild_feed_timezone` are all supplied together. `rebuild_feed_frequency` alone (without `rebuild_periodically: true`) works fine and round-trips, just stays inert. This is a real DX gap worth flagging — every other resource's validation errors name the specific missing/invalid field.
41. **Channels' create response reveals a very rich real default shape** — `output_filename: "plytix_feed"`, `column_separator: ","`, `text_delimiter: "\""`, `process_products`/`parent_include_criteria` enums, plus an undocumented `wayfair` field (not in the spec at all, alongside the documented `shopify` block) — the richest resource shape confirmed in this project.
42. **`product_list_id` links immediately on `POST /channels`** — same behavior as products (quirk #26), not assets' silently-ignored pattern.
43. **Ecatalogs are also entirely feature-gated off for this account**, identical pattern to PDF Catalogs (quirk #37): `POST /ecatalogs` with a valid minimal body → `422 "Cannot create new items the feature ecatalogs for account ..."`. `GET` still works. This account now has **two** distribution-output features disabled (PDF Catalogs, Ecatalogs) — worth asking Plytix whether this is a Dev-account-tier limitation generally.
44. **A real, pre-existing Ecatalog already exists in this account** ("Plytix Brand Portal", id `6a38f615c3d65a5f868b1a41`) — used as a read-only fixture (GET only, never mutated, per the ground rule against touching pre-existing account data) to confirm the real shape of `output_attributes` (a `formula`/`formatter` mini-DSL with nested operators like `CONCAT`/`JOIN`/`RESOLVE_RELATIONSHIPS`/`DECIMAL_FORMAT`/`HIERARCHY_SEPARATOR`) and `settings` (deeply nested theme/header/footer/filters/page-builder-`components` configuration) — both only lightly described in the spec. This is the richest real-data confirmation obtained without creating anything, since creation itself is blocked.
45a. **Channel names are unique per account, `409`/`AlreadyExists` family, same as attribute groups/attributes/products (quirk #25a/#33), not lists' `422` family (quirk #38a).** Re-creating "WC Test Channel Full" → `409 {"errors":[{"name":"AlreadyExists","description":"A channel with the same name already exists"}]}`.
45. **Undeclared `PATCH`/`DELETE` confirmed on Channels too — 11 for 11 resources tested this project now support it.** At this point the finding should be treated as the default expectation for any v3 resource with a `GET .../{identifier}` route, not something requiring fresh proof each time — though still worth a quick spot-check per resource per the ground rules, since "expected" isn't the same as "guaranteed."

Confirmed live 2026-09-08 running Phase 5 (`USER_FLOWS.md`'s end-to-end flows) against "David's Dev Account" — the final testing session:

46. **`product_level` behavior for parent/variant products, precisely confirmed (Flow 2).** A standalone product starts at `product_level: 0`. The moment it **becomes** a parent (another product references it via `parent_id`), it flips to `product_level: 1` — not something set at creation time. The variant itself is `product_level: 2`. `num_variations` and the family's own `total_products` count both update live and immediately.
47. **Real, reproducible bug: `CompletenessAttribute` 500s on any real attribute reference (Flow 3).** `POST /product-attributes` with `type: "CompletenessAttribute"` and a real `attributes: [{"id": "..."}]` reference (the correct shape, confirmed via a preceding 422 — raw ID strings are rejected, `RelatedAttributeDto` objects are required) → `500 {"errors":[{"name":"ConfigurationError","description":"There was an error processing your request. Please try again later"}]}`, reproduced twice with different reference counts. Only an **empty** `attributes` array works (Phase 1d's smoke test). This is a genuine live bug (a documented, spec'd type failing its documented use case), not the same category as `HierarchyAttribute`'s 500 (quirk #23, an undocumented/unimplemented type) — blocks Flow 3 entirely and needs reporting to Plytix as a bug, not a docs gap.
48. **Smart list membership has zero trace on the product side, confirmed empirically (Flow 4).** `GET /products/{id}/static_lists` and every other product field/subpath checked only ever reflect *Static* list membership. There is no reverse-lookup for which Smart lists currently match a given product — the only way to determine that is to re-run the Smart list's own `query` against `GET /products`.
49. **No list-side product-membership write mechanism exists at all, confirmed empirically (Flow 5).** `POST /pim-product-lists/{id}/products` → `405 Method Not Allowed`. `PATCH /pim-product-lists/{id}/products` → `422`, because `products` isn't a real field on `ProductListUpdateInputDto` — this reveals the generic subpath-`PATCH` mechanism's actual rule: `{path}` is validated as a field name against the resource's own Update DTO, and the body becomes that field's new value; an unrecognized field name always 422s this way (a generalizable technique for probing whether *any* subpath write exists on *any* resource, beyond just the discovery-via-GET trick). Static list membership is exclusively a product-side field (`static_list_ids`, quirk #34) — there is no list-side alternative.
50. **No direct channel-product-assignment mechanism exists either, and "Process" is confirmed UI/internal-only (Flow 6).** `PATCH /channels/{id}/products` → the identical `422`/`extra_forbidden` shape as quirk #49 — resolves the help-center-vs-spec discrepancy `USER_FLOWS.md` flagged: `product_list_id` (confirmed linking on create, quirk #42) is the **only** way products reach a channel via the API; the dashboard's "direct assignment" language is UI framing over the same mechanism. Separately: `POST /channels/{id}/process` and `.../build` both → `405`; `PATCH`ing `{"active": true}` left every `running`/`last_run_*`/`file_path` field unchanged — no v3 endpoint (declared or undeclared) triggers the actual export-build action.
51. **Ecatalogs' Flow 7 (Publish) is untestable in this account**, for the same reason as its creation step (quirk #43/status-gating #3) — no new finding, just confirms the blocker extends to every step of that flow, not only creation.
52. **Housekeeping finding: `bru run` verification passes themselves create real, untracked duplicate resources.** Every "Create X" `.bru` file's base `http` block uses a real (non-placeholder) body, so `bru run "<folder>/"` doesn't just *validate* the collection — it actually re-creates the resource each time it's run, and nothing in the collection auto-deletes it afterward. Across this project's many verification runs (one or more per folder per session), this silently left extra real resources in the account beyond the tracked "kept fixture" IDs: an FTP connection, two import profiles, three product attributes (dropdown/media/multiline), one asset, and one product — none of which were part of any documented fixture list. **Found and fully cleaned up 2026-09-08** via an account-wide sweep (filtering every resource type by its `WC Test`/`wc_test`/`WC-TEST` naming prefix) — confirmed the account now holds exactly the fixtures documented in "Test fixtures" below and nothing else. **For any future session that re-runs `bru run` on an existing folder**: expect the same thing to happen again on resources without a name-uniqueness constraint (assets, in particular, have none — quirk #25a/#33/#38a/#45a's uniqueness checks don't cover them), and periodically re-sweep rather than assuming the account matches the docs exactly.

Confirmed live 2026-09-10, while writing the Integration Guides docs (not a new testing phase — a targeted gap-fill against `/api/v3/products`, "David's Dev Account"):

53. **`exists`/`!exists` and `in` filter operators are confirmed working live** — previously listed only in `API V3.md`'s prose table, never independently tested in Phases 0-5. All three confirmed `200` with correct results: `gtin[exists]=true` (25 results, all variants with a real GTIN), `gtin[!exists]=true` (19 results, all base/parent SKUs without one), `status[in]=Draft&status[in]=Completed` (repeated-param form, matches products in either status), and `attributes.main_image_link[!exists]=true` (nested custom-attribute existence check, confirmed working the same way as top-level fields). This closes the gap flagged during Integration Guides research — the "find products with missing images/empty fields" pattern central to data-quality auditing is fully usable via the confirmed query-string dialect, using `!exists` on whichever attribute signals the missing data (e.g. a media attribute or `main_image_link`-style field), not just the 3 dialects (plain equality, `[gt]`, dot-notation) confirmed in Phase 0.

Confirmed live 2026-09-11, incorporating `materials/project-references/API_V3-04_09_2026.pdf` (an official Plytix "API V3 Documentation Updates" changelog, newer than `API V3.md`) into the Integration Guides:

54. ~~**The newly-documented "1:M Unlink" pattern is also destructive — it does not provide a safe scoped removal.**~~ — ✅ **RESOLVED 2026-09-23, alongside quirk #31.** Re-tested `DELETE /products/{id}/categories/{category_id}` against a fresh disposable product with a real, confirmed category link: now returns `404 Not Found` ("Product has no field 'categories/<id>'") — the 3-segment path is treated as a single unrecognized field name and rejected, not executed. Product and its category link both confirmed fully intact via a follow-up `GET`. Still not a *working* scoped-unlink mechanism (it 404s rather than removing just the one category), but it is now safe — no data loss. `PATCH` with a reduced array remains the only confirmed-working removal method. Original 2026-09-11 finding preserved above for history.
55. **`_ids` fields being hidden from `_fields`/responses is confirmed intentional design, not an unexplained spec gap.** The PDF states directly: "`_ids` fields are hidden to prevent exposure of denormalization." This is the documented reason behind quirk #12 (`_fields=category_ids` → `400 HiddenFieldError`) — reclassify that quirk from "spec gap" to "documented behavior," though the plural expanded form (`_fields=categories`) remains the correct way to get the same data.
56. **Real, confirmed documented-vs-live conflict on mutation response bodies.** The PDF's "Response Conventions for Entity Modification Endpoints" states `POST`/`PATCH` should not return the modified entity, only an ID (`201`) or a `process_id` (`202` for async), and its URL-standardization table lists `PATCH` as returning `204`. This directly contradicts this project's extensive live findings across every resource tested: `PATCH` consistently returns `200` **with the full updated entity in the body** (quirk #20 and dozens of confirmed examples), and `POST` returns `201` with the full created entity, not just an ID. Per this project's trust order, the live-confirmed behavior is what's documented in the guides; this conflict is now flagged inline wherever a PATCH/POST example appears, so readers aware of Plytix's own reference aren't caught by surprise.
57. **`product_relationships` is now confirmed as the official renamed term, not just an empirical finding.** The PDF's changelog states directly that `relationship_links` was renamed to `product_relationships` in the documentation, matching what this project already found live (quirk #13) and had to infer as a spec-vs-live correction. No live re-testing needed; this just upgrades the citation from "empirically discovered" to "also officially documented."
58. **The newer PDF still repeats the disproven SKU-as-identifier claim unchanged.** Page 13's identifier section states "for products, both id and sku (correctly url-encoded) can be used as identifiers" — the same claim `API V3.md` made and this project already disproved live (`GET /products/<sku>` → `422`, quirk #14). Not re-tested (no new information), but worth noting this incorrect claim persisted into the newer document rather than being corrected.

Confirmed live 2026-09-15, bringing the Bruno collection up to date with a
refreshed `openapi_pimv3.json` (51→63 paths, 12 brand-new paths covering
`family-attributes`, newly-writable `product-families`/`relationships`,
and a new `product-relationships`/`related-products` resource; plus
`PATCH`/`DELETE` formally declared on nearly every resource that
previously had them only as undeclared-but-working per quirk #20) against
"David's Dev Account":

59. **Critical finding — three brand-new endpoints leak cross-tenant data
    when called with no filter.** `GET /family-attributes`, `GET
    /product-relationships`, and `GET /related-products` (all three new
    in this spec refresh) each returned real records belonging to *other
    Plytix accounts* when called with no query filter at all — the first
    time in this entire project (all of Phases 0-5 plus this session, 60+
    endpoints) that a v3 endpoint has failed to auto-scope to the
    caller's own account. Every other list/search endpoint tested is
    implicitly scoped with no filter needed. Filtering explicitly with
    `?account_id=<id>` (all three) or `?product_id=<id>` (the latter two)
    correctly scopes the results. **This should be reported to Plytix as
    a likely data-isolation bug**, not documented as normal API behavior.
    See `13-Product-Families/README.md` and
    `17-Product-Relationships/README.md` for full request/response
    detail.
60. **Product Families and Relationships (types) are genuinely writable
    now — resolves quirk #38's "zero write capability" finding.** Both
    resources were confirmed fully read-only as recently as Phase 3
    (2026-09-08). The 2026-09-15 spec refresh adds `POST
    /product-families`, `PATCH`/`DELETE /product-families/{identifier}`,
    and the same trio for `/relationships`. Confirmed live: all six
    genuinely work — `POST` returns `201`, `PATCH`/`DELETE` behave like
    every other resource (`200`/`204`, `404` on a follow-up `GET`).
    `ProductFamilyUpdateInputDto` and `RelationshipUpdateInputDto` are
    both deliberately narrow (`name` only) — see each schema's own
    description for why (family: attribute-membership changes are
    excluded because they trigger a destructive, unbounded cross-product
    propagation that must go through a Job, not a synchronous PATCH;
    relationship: `label` is derived/dump-only, `status` is managed by
    the delete flow).
61. **New family-attribute linking endpoints, and a real account-level
    feature gate found on one of them.** `POST
    /product-families/{id}/attributes` links an attribute to a family —
    the undocumented request DTO is `FamilyAttributeLinkInputDto`
    (`attribute_id` required, `level` optional), discovered via 422
    error messages, same technique as every prior phase. Attempting to
    **change** a link's `level` via `PATCH
    .../attributes/{attribute_id}` (e.g. `no_level` → `parent_level`,
    which implies moving values to the parent for variant inheritance)
    returned `403 {"errors":[{"name":"PermissionError","description":
    "Automatic inheritance is not available for this account"}]}` — a
    genuine account-tier feature gate, not a validation error. Add to
    Status-gating rules below. The identity endpoint
    (`/attributes/{attribute_id}`) also accepts `POST` as an idempotent
    link-by-URL variant — `409 AlreadyExists` if the attribute is already
    linked, same status/error-name family as every other duplicate-check
    in this project (quirk #25a).
62. **First confirmed SAFE, scoped `DELETE`-based unlink in this entire
    project.** `DELETE /products/{product_id}/relationships/{relationship_id}`
    (the new dedicated product-relationships resource) removes only that
    relationship link — confirmed via a follow-up `GET` on the *product*
    showing it fully intact (`sku`/`label`/`status` unchanged), only
    `product_relationships` emptied. This is the opposite of every prior
    subpath-delete hazard found in this project: plain `DELETE
    /products/{id}/categories` deletes the whole product (quirk #31), and
    so does the newly-documented "1:M Unlink" pattern `DELETE
    /products/{id}/categories/{category_id}` (quirk #54). Worth asking
    Plytix directly why this new endpoint gets scoped deletion right when
    the older category/asset subpath deletes don't (see updated open
    question #20 below).
63. **Real bug: the new `.../relationships/{relationship_id}/related-products`
    subpath is broken — returns empty/404 despite a confirmed live
    link.** Immediately after linking two products (confirmed three
    independent ways: the link's own create response, the full product's
    `product_relationships` field, and `GET /related-products?product_id=`),
    this dedicated subpath still returned `{"data": [], "errors": []}` for
    the collection form and a `NotFoundError` for the single-item form.
    Retried a few seconds later with the same empty result, ruling out
    simple read-after-write lag. Use `GET /related-products?product_id=<id>`
    instead until fixed.
64. **Filtering the two new top-level search endpoints by `relationship_id`
    fails in two different bad ways.** `GET /product-relationships?relationship_id=<id>`
    hangs and returns a raw `504 Gateway Time-out` (HTML, no JSON
    envelope). `GET /related-products?relationship_id=<id>` instead
    returns `500 {"errors":[{"name":"HiddenFieldError","description":
    "Field 'relationship_id' does not exist in model 'RelatedProduct'"}]}`
    — a real bug, since every other "field doesn't exist" case in this
    project (e.g. quirk #12) correctly returns `400`, not `500`. Filter
    by `product_id` instead on both endpoints.
65. **The plain product's embedded `product_relationships` field is
    missing `related_product_id`.** `GET /products/{id}` (or
    `_fields=product_relationships`) returns each relationship's
    `related_products` entries as only `{quantity, last_modified}` — no
    way to tell which product is on the other end. The new dedicated
    `PATCH /products/{id}/relationships/{relationship_id}` response, by
    contrast, does include `related_product_id` (oddly duplicated under
    both `product_id` and `related_product_id` keys in the same object).
    Use the dedicated endpoints or `GET /related-products?product_id=`
    when you need to know which product a link points to.
66. **`label` is explicitly NOT patchable on `product-attributes`,
    despite being the field every response surfaces most prominently.**
    `PATCH /product-attributes/{id}` with `{"label": "..."}` → `422
    {"errors":[{"name":"InputDTOValidationError","description":"label:
    Extra inputs are not permitted"}]}`. Use `name` instead — confirmed
    renaming via `name` does not retroactively update an already-set
    `label`. `ProductAttributeUpdateInputDto`'s full patchable field list:
    `name`, `description`, `character_limit`, `include_time`, `options`,
    `manual_sorting`, `sort_ascending`, `restricted`, `attributes`
    (completeness), `formula_str` — narrowed server-side per the
    attribute's concrete type.
67. **Spec-vs-live mismatch: `POST` on `/product-families/{identifier}/{path}`
    405s despite the refreshed spec declaring `post` as a valid method on
    that path.** Every `{path}` value tried (including the same field
    name a `PATCH` on the identical URL successfully updates) returns
    `405 {"errors":[{"name":"MethodNotAllowed","description":"POST is
    not allowed on this path."}]}`. The generic subpath mechanism only
    supports `GET`/`PATCH` in practice on this resource, regardless of
    what the spec's path-item declares.
68. **Minor type inconsistency, first noticed this session**: `product-categories`'
    (and `asset-categories`') `order` field comes back as a **string**
    (e.g. `"6"`) on a `PATCH` response, but as a **number** on the
    original `POST`-create response. Cosmetic, but worth flagging if any
    docs promise a consistent type for this field.
69. **Retested and reconfirmed the "undeclared PATCH/DELETE" pattern
    (quirk #20/#45) now that the spec formally declares it** on
    `asset-categories`, `assets` (DELETE only new), `channels`,
    `connections`, `import-profiles`, `pim-product-lists`,
    `product-attribute-groups` (DELETE only, no PATCH declared for this
    one), `product-attributes`, `product-categories`, and `products`
    (PATCH only new) — every one behaves exactly as quirk #20 predicted,
    with fresh `example{}` blocks now captured for the first time in each
    corresponding `.bru` file (previously only prose `docs{}` existed for
    most of these). No behavioral surprises found in this retest pass
    beyond the specific items already called out above (#66/#68).

Confirmed live 2026-09-22, adding full-parameter `example{}` blocks (every
optional field populated at once) to existing endpoints for future OpenAPI
description examples, against "David's Dev Account":

70. **`static_list_ids` on `PATCH /assets/{id}` applies but is invisible in
    every response.** Confirmed via a scratch asset + a scratch Static-type
    asset list: `PATCH /assets/{id}` with `static_list_ids` set returns
    `200` with no `static_list_ids`/`static_lists` key anywhere in the body,
    yet a follow-up `GET /assets/{id}/static_lists` shows the link applied.
    Same silent-field family as `category_ids`/`relationships`/`group_ids`
    (quirks #13/#25/#26/#34) — extends it to this field on this resource.
    `category_ids` in the same PATCH call *does* show up (in the shallow
    `categories` array), so the two fields sent together behave
    inconsistently within a single response.
71. **`ImportProfileCreateInputDto`'s nested `column_matches` entries
    silently default `formatters` to `[]` and `relationship` to `null`**
    when omitted from the request — confirmed via a full-parameter create
    exercising every `ProfileSettingsCreateInputDto` field at once
    (`family_options`, `column_matches`, all enum fields). No surprises
    beyond this defaulting; every other field round-tripped exactly as
    sent.
72. **`ProductFamilyCreateInputDto`'s three attribute-reference arrays
    must use a consistent reference form across all of them.** Mixing
    plain ID strings in `attributes` with `{id,label}` objects in
    `parent_attributes`/`variant_attributes` (or any such mix) →
    `422 {"errors":[{"name":"InputDTOValidationError","description":
    "Value error, attributes: attribute references must be either all
    IDs or all {id, label} objects, not mixed across attributes,
    parent_attributes, variant_attributes"}]}`. Not documented in the
    spec's schema description. See `13-Product-Families/Create Product
    Family.bru`.
73. **The "Automatic inheritance is not available for this account" gate
    (status-gating rule #4) also blocks `parent_attributes`/
    `variant_attributes` on `POST /product-families` create, not only the
    `PATCH .../attributes/{id}` level-change endpoint.** Sending either
    field on create (even with consistently-formed `{id,label}` refs) →
    the same `403 PermissionError`. Only the plain `attributes` array
    (which always links at `level: "no_level"`) is usable on this
    account, at both create time and via the dedicated link endpoint.
    Confirmed the plain-`attributes` path itself works fully: `201`, all
    referenced attributes linked at `no_level` (verified via a follow-up
    `GET /product-families/{id}/attributes`).
74. **Full-parameter query combinations confirmed working with no
    interaction issues** on `GET /product-families` (`_fields` +
    `_sort_by` + `_page`/`_page_size` + a `name[icontains]` filter, all
    at once), `GET /family-attributes` (`account_id` + `product_family_id`
    filters + `_fields` + pagination together — the combination doesn't
    change the cross-tenant-leak behavior of the unfiltered form, quirk
    #59, since both filters were supplied here), and `GET /relationships`
    (`_fields` + `_sort_by` + `_page`/`_page_size` + a `status` filter).
    No new resource-specific gotchas found in any of the three.
75. **`group_ids` on `POST /product-attributes` DOES link — resolves open
    question #11.** Confirmed via a full-parameter create (`06-Product-
    Attributes/Create Text Attribute.bru`'s new "Full Parameters"
    examples): sending a real attribute-group id in `group_ids` on 4
    different attribute types, then a follow-up `GET
    /product-attribute-groups/{id}` on that group, showed all 4 new
    attributes' labels added to the group's `attribute_labels` array
    immediately. The linkage is real and applies on create — it's just
    invisible from the *attribute's* own create response and `GET`
    (silent-field family, same as `relationships`/quirk #13), which is why
    it looked unconfirmed before. Check the linking side (the parent/group
    resource), not just the child, when a relationship-array field seems
    to silently drop.
76. **First live test of `Connection.type: "dropbox"` in this project —
    and confirmation that write-only credential fields exist on this
    resource.** `POST /connections` with `type: "dropbox"` and
    `token_type`/`token`/`refresh_token`/`email` all populated → `201`,
    but `token_type`/`token`/`refresh_token` are never echoed back in the
    response (only `email` round-trips). The same write-only pattern holds
    for `password` on `ftp`/`sftp` connections, confirmed on both `POST`
    and `PATCH`. None of this is stated anywhere in
    `openapi_pimv3.json`'s `ConnectionCreateInputDto`/`ConnectionOutputDto`
    schemas — worth flagging as a documentation gap (credential fields
    should be marked `writeOnly: true`).
77. **`GET /pim-product-lists` and `GET /asset-lists` have a narrower
    valid `_fields` set than the full resource shape — `type` is
    rejected.** `_fields=type` (a real field present on every
    `GET .../{identifier}` response) → `400
    {"errors":[{"name":"ValueError","description":"Unknown field(s) in
    _fields: type. Valid fields: _created_at, _id, account_id, created,
    created_user_audit, id, modified, modified_user_audit, name, query,
    revision_id"}]}` on both resources. Same family as quirk #12
    (`_fields=category_ids` on products) — the search endpoint's
    accepted `_fields` values don't always match the full resource's
    field list. Also newly confirmed: `revision_id` is accepted in
    `_fields` with no error but is silently absent from the response
    (same silent-drop pattern as quirks #13/#25/#26/#34).
78. **Both `pim-product-lists` and `asset-lists` had no dedicated
    `.bru` file for their collection `GET` endpoint before 2026-09-22** —
    only `GET .../{identifier}` was previously covered. Added
    `List Product Lists.bru`/`List Asset Lists.bru` with full-parameter
    examples (`_fields` × several, `_page`/`_page_size`, `_sort_by`,
    `name[icontains]`) — all combine correctly with no interaction
    issues, same pattern as every other list endpoint in this project.
79. **Smart list `query`'s multi-group/multi-condition expressiveness
    confirmed live for the first time on both `pim-product-lists` and
    `asset-lists`.** Prior examples only ever used a single condition in
    a single group. Confirmed: the outer array is OR-ed groups, the
    inner array is AND-ed conditions within a group — a
    two-AND-conditions-plus-a-second-OR-group query created and returned
    correctly on both resources (operators `eq`/`gt`/`like` on product
    lists, `like`/`eq` on asset lists). Also confirmed `query` on `PATCH`
    is a full SET-replace, not a merge, on both resources — matches the
    field's own spec description ("SET-replace filter query").

Confirmed live 2026-09-22, adding full-parameter `example{}` blocks to
`02-Products-v3/` for use as OpenAPI description examples (not a new
testing phase — a targeted parameter-coverage pass against "David's Dev
Account"):

70. **New account-level feature gate: "UEF" blocks `channel_ids`/
    `ecatalog_ids` on `PATCH /products/{id}`.** Sending either field
    (individually or together) returns `403
    {"errors":[{"name":"PermissionError","description":"UEF feature is not
    enabled for this account"}]}` — a 5th feature gate found on this Dev
    account, joining PDF Catalogs (status-gating #2), Ecatalogs (#3), and
    Automatic Inheritance (#4). Blocks confirming the success shape for
    assigning a product directly to a channel/ecatalog via these fields.
71. ~~**`parent_id` on `POST /products` silently suppresses
    `category_ids`/`static_list_ids` from the same create call.**~~ —
    ❌ **RETRACTED 2026-09-23, another false positive caused by the same
    broken-subpath bug as quirk #73.** Re-verified with a fresh
    parent+variant pair, `category_ids` and `static_list_ids` both set
    together with `parent_id` on the SAME `POST /products` call: checking
    via the (broken) `GET .../categories`/`.../static_lists` subpaths
    shows `[]`, but checking correctly via
    `GET /products?_fields=categories&_fields=static_lists&sku=...` shows
    both fields genuinely applied immediately on create, parent_id and
    all. There is no create-vs-patch split for these fields on variants —
    they simply work on `POST`, same as on a standalone product. See
    quirk #80 for the root cause.
72. **Combining `product_family_id` with `parent_id` on `POST /products`
    422s with no field named.** `{"errors":[{"name":"ValidationError",
    "description":"product data validation failed"}]}` — vaguer than
    every other validation error in this project (contrast quirk #36's
    complaint that most 422s at least name a field). Omit
    `product_family_id` when `parent_id` is set on create.
73. ~~**Possible regression — `static_list_ids` no longer applies via
    `PATCH /products/{id}`.**~~ — ❌ **RETRACTED 2026-09-23, root-caused as
    a false positive.** `static_list_ids` genuinely DOES apply via `PATCH`
    (re-confirmed 2026-09-23 on both a fresh scratch product and the
    long-lived `WC-TEST-FULL-001` fixture) — the real bug is quirk #80
    below: `GET .../static_lists` (the subpath this finding checked with)
    is itself broken and always returns empty, regardless of real
    linkage. Verifying via `GET /products?_fields=static_lists&sku=...`
    instead shows the link correctly. Quirk #34 (Static list membership
    via `PATCH .../static_list_ids`) stands as originally confirmed —
    no regression in the PATCH behavior itself, only in this one
    verification method.
74. **`GET /products/{id}` (single-resource) now returns
    `product_relationships` as a flat array of `{relationship_id,
    relationship_label, related_products}` entries**, not the nested
    `{"<label>": [{quantity, last_modified}]}` object shape captured
    against the same product (`BAG-10157`) in earlier sessions (see
    `02-Products-v3/Get Product by ID.bru`'s original example, captured
    2026-09-07). Possible in-flight shape change on this field — flag to
    Plytix.
- **New finding (Channels, confirmed live 2026-09-22 while adding
  full-parameter examples):** `parent_include_criteria` and
  `on_demand_parent_include_criteria` on `ChannelUpdateInputDto` are
  validated against a hidden fixed 2-value enum
  (`ONLY_PARENT_IN_LIST`/`ALL_PARENT_IN_VARIANTS`), not the free string the
  spec's field description implies — a `422` on the natural-guess value
  `ALL_PARENTS` revealed it. Same hidden-enum pattern already documented
  for `format` (quirk #39) and `Connection.type` (quirk #21), just not
  previously confirmed on this pair of fields. See `15-Channels/Update and
  Delete Channel.bru`'s new "Update Channel - Full Parameters" example.

Confirmed live 2026-09-23, auditing `02-Products-v3/` for OpenAPI-spec
parameter completeness against `openapi_pimv3.json`'s `ProductCreateDto`/
`ProductUpdateInputDto` schemas:

80. **Critical, confirmed regression — `GET /products/{id}/categories`,
    `.../assets`, and `.../static_lists` subpaths are all broken, always
    returning an empty array regardless of real, confirmed linkage.**
    Reproduced on a fresh scratch product (categories + thumbnail linked
    on `POST`, confirmed present immediately via `_fields`) and on the
    long-lived reference fixture `BAG-10157` (which still genuinely has 2
    categories and 11 assets). **Confirmed correct workaround**:
    `GET /products?_fields=categories&_fields=assets&_fields=static_lists&sku=...`
    on the search endpoint returns the real, fully expanded data every
    time — only the dedicated per-relation subpath is affected.
    `.../relationships` and `.../attributes` subpaths are unaffected,
    confirmed still working. This is what caused quirk #73 above to be a
    false positive — retract that finding, not a real PATCH regression.
    See `02-Products-v3/Get Product Subpath - Attributes.bru` for full
    detail and captured broken-subpath examples, and
    `02-Products-v3/List Products.bru`'s "Full Parameters (Relationship
    Fields Expanded)" example for the working alternative. Report to
    Plytix as a regression — this previously worked (quirks confirming
    `/categories`/`/assets` expansion date to 2026-09-07).
81. **`PATCH /products/{id}`'s UEF feature gate (quirk #70's
    `channel_ids`/`ecatalog_ids`, now confirmed to also cover
    `product_data_sheet_ids`) blocks the ENTIRE request atomically, not
    just the gated fields.** Sending all 12 `ProductUpdateInputDto` fields
    together — 9 perfectly valid ones (`label`, `category_ids`,
    `parent_id`, etc.) plus the 3 UEF-gated ones — returns a bare `403`
    with none of the 9 valid fields applied. There is no way to combine a
    UEF-gated field with any other field in the same call on this
    account; each PATCH must go out separately depending on whether it
    touches a UEF-gated field. `product_data_sheet_ids` alone also 403s
    the same way — confirmed gated by the same flag, consistent with the
    field's own spec description.
82. **`parent_id` + `product_family_id` together in the same `PATCH`
    conflict, extending the identical conflict already known on `POST`
    create.** Returns `422 {"errors":[{"name":"ValidationError",
    "description":"product data validation failed"}]}` — no field named.
    Omit `product_family_id` whenever `parent_id` is present in a `PATCH`
    body, same rule as create.
83. **Corrected a wrong `account_id` in two long-standing example
    responses.** `02-Products-v3/Get Product by ID.bru` and `Create
    Product - Full Featured.bru` (both dating to the original 2026-09-07/08
    session) showed `account_id: "6a38f5d5c3d65a5f868b1869"` in 3 places —
    this does not match "David's Dev Account"'s real id
    (`6a38f5a5b22478f30bfd755c`, confirmed via a live `GET` and via the
    account's own JWT claims). Likely a copy/paste slip from before the
    account was fully locked in early in the project. Fixed in both files;
    worth a spot-check for the same wrong value elsewhere in the
    collection if it resurfaces (a repo-wide grep found no other
    occurrences as of this session).

Confirmed live 2026-10-01, resolving two open docs-review findings on
`fumadocs/content/docs/guides/syncing-your-erp-with-plytix.mdx` against
"David's Dev Account". **Two behavior changes since 2026-09-23** — both
invalidate previously-confirmed findings, so re-verify other long-standing
response-shape claims before trusting them:

84. **BEHAVIOR CHANGE — `PATCH` now returns `204 No Content` with an empty
    body, on every resource tested.** Confirmed on `PATCH /products/{id}`
    (both a top-level field and the `attributes` map) and `PATCH
    /product-categories/{id}`: all return `204`, `size_download=0`, and the
    change itself applies correctly (verified by follow-up `GET`). This
    **reverses quirks #20, #28 and #56**, which recorded `200` + full
    entity consistently across every resource from 2026-09-07 through
    2026-09-23. It also means Plytix's own `API V3.md` / 2026-09-04 PDF
    (which always listed PATCH as `204`) is now correct and this project's
    live findings are what went stale. `POST` is unchanged: still `201`
    with the full created entity (re-confirmed same session, 626-byte
    body), so the POST half of quirk #56's conflict still stands.
    Six published docs pages asserted the old `200` + full-entity behavior
    and were corrected 2026-10-01.
85. **Critical for any sync integration — `PATCH` REPLACES the `attributes`
    map wholesale; it does not merge into it.** Confirmed with a
    controlled test on a scratch product: set `brand` + `care_instructions`
    via PATCH (both present on read-back), then PATCH naming only `brand`
    — `care_instructions` is **gone from the record entirely**, not just
    from the response. Top-level fields behave the opposite way and merge
    as expected: a `PATCH {"label": "..."}` on a product with two
    attributes left both attributes fully intact. So the rule is: omitted
    top-level fields are preserved, but a named map field is replaced in
    full. Account-level computed attributes (`*_completeness`,
    `amazon_ready`, `website_ready`, etc.) survive either way, since they
    aren't user-set. **Any "send only what changed" integration pattern
    silently destroys attribute data.** This was never tested in Phases
    0-5 — the merge-vs-replace question was simply never asked.
86. **BEHAVIOR CHANGE — SKU now works as `{identifier}`, resolving quirk
    #14 and open question #5.** `GET /products/BAG-10157` and
    `GET /products/BAG%2D10157` both return `200` with the full product,
    identical to `GET /products/6a38f614c3d65a5f868b1a06`. A nonexistent
    SKU returns `404` (not `422`), confirming real SKU resolution rather
    than coincidence. Quirk #14 recorded a hard `422 "Id must be of type
    PydanticObjectId"` on 2026-09-07, and quirk #58 noted Plytix's newer
    PDF "still repeats the disproven SKU-as-identifier claim" — that claim
    is no longer disproven; Plytix shipped the behavior their docs
    described. Same fix window as quirks #31/#54 (both flipped 2026-09-23).
87. **Safe single-attribute write confirmed: `PATCH /products/{id}/attributes/{name}`
    with a bare JSON value.** `-d '"BrandViaSubpath"'` on
    `.../attributes/brand` → `204`, updates only that attribute, and
    `care_instructions` on the same product is confirmed untouched. This is
    the correct answer to quirk #85's data-loss hazard and is what the
    guides now recommend for stock/price sync. Body shape matches quirk
    #29's asset-subpath convention (raw value, not a partial object) —
    now confirmed on products too.
88. **Process note: this project's own live findings now have a shelf
    life.** Three separate long-standing findings (#14 SKU, #20/#28/#56
    PATCH response, plus #31/#54 earlier) have each flipped after Plytix
    shipped changes. Anything load-bearing for a published page should
    carry its confirmation date inline, and response-shape claims older
    than a few weeks should be re-run rather than cited. The 2026-10-01
    session found two reversals in a single 20-minute pass.

Confirmed live 2026-10-01, verifying the pagination parameters flagged as
unconfirmed on `fumadocs/content/docs/reference/v3/pagination.mdx` against
"David's Dev Account":

89. **`_total_count` and `_filtered_count` do not exist — there is no count
    mechanism anywhere in v3.** Both return `400 {"errors":[{"name":
    "InvalidFieldError","description":"Field '_total_count' does not
    exist."}]}`, confirmed on `/products` and `/assets`. They appear in
    `API V3.md`'s prose parameter table and were carried into the docs as
    `[PENDING]`; they were never implemented. Combined with the `Pagination`
    schema carrying no count fields, this settles the "Conflict on counts"
    flag definitively in the spec's favour: **the only way to size a v3
    result set is to page to the end and tally**, or to request
    `_page_size=1000` when the set is known to be small. Worth raising with
    Plytix as a real DX gap — v1 returned `total_count` on every search
    (see `openapi_pimv1.json`), so this is a capability regression from v1
    to v3, not merely an undocumented feature.
90. **`_page`, `_page_size` and `_sort_by` re-confirmed working, and
    `_page`/`_page_size` have real validation bounds** — the first query
    params in this project found to carry any. `_page` must be >= 1
    (`_page=0` and `_page=-1` → `422 "query._page: Input should be greater
    than or equal to 1"`) and `_page_size` must be <= 1000 (`422
    "query._page_size: Input should be less than or equal to 1000"`). Note
    the error prefix `query.<param>` — the first confirmed case of this API
    naming a *query* parameter in an `InputDTOValidationError`, which
    elsewhere only ever names body fields. This also means the params are
    genuinely modelled server-side as a DTO despite being absent from the
    spec, reinforcing quirk #7's "stale spec, not missing feature" reading.
91. **Pagination keys are OMITTED when not applicable, never `null` — the
    spec is wrong about this.** `openapi_pimv3.json`'s `Pagination` schema
    declares both `next_page` and `previous_page` as `string | null`, but
    live responses simply leave the key out. Confirmed shapes, all `200`:
    first page of a multi-page set → `{"next_page": "..."}` only; a middle
    page → both keys; the last page → `{"previous_page": "..."}` only; a
    result set that fits on one page → `{}` (empty object); a page past the
    end → `data: []` with `{"previous_page": "..."}`. Verified identically
    on `/products`, `/assets`, `/product-categories`, `/pim-product-lists`
    and `/relationships`, so it is the API-wide convention. **Any client
    written as `if (pagination.next_page !== null)` is wrong** — test for
    presence or falsiness. Separately, single-resource `GET /products/{id}`
    omits the `pagination` key entirely (it is not `null`) and returns
    `data` as an object rather than an array.
92. **⚠️ Real hazard — `next_page`/`previous_page` are `http://` URLs, and
    following one verbatim can cost you your auth header.** Every link the
    API generates uses the `http` scheme (e.g.
    `http://pim.dev.plytix.com/api/v3/products?_page=2`). Requesting it as
    given returns `301 Moved Permanently` → `https://pim.dev.plytix.com:443/...`
    from `awselb/2.0`, and HTTP clients that do not forward `Authorization`
    across a scheme/port-changing redirect drop it: plain `curl -L` on the
    returned URL yields `401 {"detail":"Unauthorized"}`. `curl -L
    --location-trusted`, or rewriting the scheme to `https` before
    requesting, both return `200`. This directly undercuts the "follow the
    URL, don't rebuild it" advice that is otherwise correct — docs must
    warn about it, and it should be reported to Plytix as a link-generation
    bug (the API should emit `https` links). Note a pre-existing captured
    example in `02-Products-v3/List Products.bru` had silently "corrected"
    the scheme to `https` when it was transcribed on 2026-09-04 — fixed
    2026-10-01, and a reminder to capture responses verbatim rather than
    tidying them.

Confirmed live 2026-10-08 against "David's Dev Account", re-verifying the
blocker claims in `output-reviewer-2026-10-08.md` and closing its six
testable flags. **This session invalidates more prior findings than any
before it** — quirks #12, #26, #27, #31, #54, #62, #72, #80 and the
`icontains` note in `information-architecture.md` all changed. Treat every
relationship-array and filter-operator finding older than this date as
suspect until re-run.

93. **BREAKING — all five `*_ids` relationship-array fields are now
    REJECTED on both `POST /products` and `PATCH /products/{id}`,** despite
    being declared in `ProductCreateDto` and `ProductUpdateInputDto`.
    `category_ids`, `static_list_ids`, `channel_ids`, `ecatalog_ids` and
    `product_data_sheet_ids` each return
    `422 {"errors":[{"name":"InputDTOValidationError","description":"<field>: Extra inputs are not permitted"}]}`.
    Still accepted on both verbs: `label`, `gtin`, `status`, `attributes`,
    `thumbnail_id`, `product_family_id`, `parent_id`. This retracts quirk
    #26 (`category_ids` applying on create) and quirk #27 (`PATCH` as the
    reliable way to apply relationship arrays), and it removes the only
    documented mechanism for category removal — see quirk #94 for the
    replacement. It also supersedes the UEF feature gate (quirks #70, #81):
    the three UEF-gated fields now fail validation before the permission
    check, so the `403` is unreachable on this account.
94. **Major — the 1:M link/unlink pattern from `API V3.md` is now
    IMPLEMENTED for categories, and it is safe and scoped.** `POST
    /products/{id}/categories` with body `{"id": "<category_id>"}` returns
    `201 {"data":{"id":"<category_id>"},"errors":[]}`; a duplicate returns
    `409 {"name":"AlreadyExists","description":"'<id>' is already linked to
    products <product_id> through 'categories'"}`. `DELETE
    /products/{id}/categories/{category_id}` returns `204` and removes
    **only that one link** — confirmed via follow-up `GET` showing the
    product fully intact (`sku`, `label`, `status`, `attributes` unchanged)
    with the other category still attached. This is the second confirmed
    safe scoped unlink after relationships (quirk #62), and it is the
    replacement for the now-rejected `category_ids` array. Matches the
    "1:M link / 1:M unlink" rows marked **Direct** in
    `materials/api-references/API V3 - status map (08_10_2026).md`
    (pp. 11-13).
95. **The destructive-subpath hazard is gone, and the error messages are
    now genuinely helpful.** Re-confirming quirk #31/#54's 2026-09-23
    resolution with the new link/unlink surface in place: `DELETE
    /products/{id}/categories` (bare collection) returns
    `405 {"name":"MethodNotAllowed","description":"DELETE on 'categories'
    requires exactly one linked id: DELETE /products/{id}/categories/{linked_id}"}`;
    `DELETE /products/{id}/totally_made_up_xyz` returns
    `404 {"name":"NotFoundError","description":"Product has no field
    'totally_made_up_xyz'"}`; `PATCH /products/{id}/categories` returns
    `405 {"name":"MethodNotAllowed","description":"PATCH is not allowed on
    'categories': link or unlink here, and update a linked entity at its
    own path."}`. The product survived all three, confirmed by `GET`. No
    destructive behavior remains anywhere in this family of paths.
96. **Assets do NOT support the link/unlink pattern — categories and
    relationships are the only two that do.** `POST /products/{id}/assets`
    with `{"id":"<asset_id>"}` returns `405 Method Not Allowed`; `DELETE
    /products/{id}/assets/{asset_id}` returns
    `404 "Product has no field 'assets/<id>'"`. Combined with quirk #93's
    removal of every `*_ids` array, **there is now no API mechanism at all
    to link or unlink a non-thumbnail asset to a product.** The only
    asset-side write that works is `thumbnail_id` on `PATCH`. This is a
    capability regression worth raising with Plytix.
97. **Clearing `thumbnail_id` with an explicit `null` works** — `PATCH
    /products/{id}` with `{"thumbnail_id": null}` returns `204`, and the
    follow-up `GET` shows `thumbnail_id: null` with the `thumbnail` key
    absent. Closes a long-standing untested case. Side effect worth
    knowing: the product's `assets` array empties at the same time, because
    on this fixture the thumbnail was the only linked asset — setting
    `thumbnail_id` is what had auto-linked it.
98. **RETRACTED quirk #72 — `parent_id` + `product_family_id` together on
    `POST /products` now SUCCEEDS (`201`).** The real rule is narrower than
    quirk #72 described: the conflict is not "both fields present," it is
    **a family that differs from the parent's**. Sending the parent's own
    family alongside `parent_id` works; sending a different family returns
    `422 {"name":"ValidationError","description":"product data validation
    failed"}` with no field named. Also confirmed: a variant created with
    `parent_id` alone **inherits the parent's `product_family_id`
    automatically**. `product_level` transitions re-confirmed (parent
    `0`→`1`, variant `2`, `num_variations` increments).
99. **BREAKING for docs — `icontains` is REJECTED; the operator is
    `contains:ignorecase`.** This reverses the 2026-10-01 finding recorded
    in `information-architecture.md` ("the case-insensitive operator is
    `icontains`, not `contains:ignorecase`"). Live today:
    `sku[icontains]=bag` → `400 {"name":"InvalidFilterOperator"...}`,
    `sku[contains:ignorecase]=BAG` → `200`. The API now enumerates its full
    operator set in the error, which is the authoritative list:
    `!contains, !contains:ignorecase, !eq, !exists, !gt, !gte, !in,
    !includes, !intersects, !lt, !lte, !null, contains,
    contains:ignorecase, eq, exists, gt, gte, in, includes, intersects, lt,
    lte, null`. Note `includes`/`!includes` appear here and in no Plytix
    source material. Any invalid operator returns the same enumerated list,
    which makes this trivially re-checkable in future sessions.
100. **Both `[length]` and `[len]` work — resolves the Oct 8 status map's
    open question #2.** On a field that is missing or empty,
    `attributes.short_description[length]=0` and `[len]=0` both return the
    same 16 results as `[!exists]=true`; `[length][gt]=0` and `[len][gt]=0`
    both return the same 25 as `[exists]=true`. They are functions, not
    operators, which is why neither appears in quirk #99's operator list.
    Also confirmed this session: `[null]`/`[!null]` work, `[intersects]`
    works on a traversed field (`categories.name[intersects]=Backpacks`),
    `_or[#]`/`_and[#]` grouping works, `_fields=*` works, `_sort_by=-<field>`
    (descending) works, and `_total_count` still returns `400 "Field
    '_total_count' does not exist."` (re-confirms quirk #89). **Does not
    work:** the `_![bool][#]` NOT-grouping form that the status map marks
    Direct — `_![eq][0]status=Draft` returns `400 "Field '_![eq][0]status'
    does not exist."`
101. **`PATCH /channels/{id}` returns `204`,** confirming quirk #84's
    behavior change extends to channels (it was explicitly untested there).
    Two further channel findings: **(a)** `{"rebuild_periodically": true}`
    sent alone on a fresh channel now returns **`502
    {"name":"BadGatewayError","description":"There was an error processing
    your request. Please try again later"}`** — worse than quirk #40's
    unhelpful `422`, and a 5xx on what is a validation case. Sending all
    five schedule fields together returns `204` as expected. **(b)** The
    `webhook` block is **silently discarded**: `PATCH` with
    `{"webhook":{"webhook_url":...,"webhook_headers":{...},"webhook_body":{...}}}`
    returns `204`, but a follow-up `GET` shows the key absent and
    `_fields=webhook` is silently dropped from the search response.
    (`webhook_body` must be a dictionary, not a string — a string returns
    `422 "webhook.webhook_body: Input should be a valid dictionary"`.) So
    the channel webhook cannot be configured through the API today, which
    answers the open flag on
    `guides/getting-notified-webhooks-and-automations.mdx`.
102. **Rate limits are NOT enforced on the v3 PIM host, and no PIM response
    carries a rate-limit header.** The JWT's account claims state
    `rate_limit: [{limit: 20, window_size: 10}, {limit: 5000, window_size:
    3600}]`, but 80 requests issued 40-way parallel in roughly two seconds
    (4x the stated 10-second burst limit) all returned `200`, with no
    `RateLimit-*`, `X-RateLimit-*` or `Retry-After` header on any response.
    No `429` could be produced. The auth endpoint *does* enforce and
    advertise a limit, and it has changed since quirk #3: now
    `RateLimit-Limit: 15` / `X-RateLimit-Limit-Second: 15` (was 8).
    **Consequence for docs:** the `429`-and-back-off advice in
    `guides/bulk-operations-for-large-catalogs.mdx` is unverified, and the
    `429` response shape remains uncaptured. Ask Plytix whether the JWT
    limits are advisory, enforced elsewhere (a gateway in front of prod),
    or not yet wired up on the dev host.
103. **`pim.plytix.com/api/v3` is reachable now — the `503 "name resolution
    failed"` recorded in Environment is stale.** `GET
    https://pim.plytix.com/api/v3/products` with the DEV bearer token
    returns `401 {"detail": "Unauthorized"}`, not a gateway error. A `401`
    proves the host routes v3 and the service answers; it rejects this
    token only because the token belongs to the dev environment. **Not a
    full confirmation**: `bruno-collection/.env` no longer holds the "API
    Docs" prod credentials, so v3 on the prod host could not be exercised
    with a valid credential this session. Re-add a prod credential and
    re-run before documenting `https://pim.plytix.com/api/v3` as the
    production base URL — but the host is no longer disproven, and the
    guides that use it are no longer presumed wrong.

## Known gaps

- The ~70 pre-existing `.bru` files from Phases 0-5 that predate the
  `example{}` convention (every "List"/"Get"/successful "Create" request)
  still have no captured `example{}` block — only this session's
  new-endpoint and newly-declared-method files do. A full backfill across
  the rest of the collection was explicitly scoped out of this session
  (2026-09-15) per the user's direction and remains a future opportunity.

## Status-gating rules

1. **`FormulaAttribute` creation is capped per account** (confirmed on "David's Dev Account", already at its limit of 2). `POST /product-attributes` with `type: "FormulaAttribute"` → `422 "This account reached the limit of 2 formula attributes"` regardless of body validity. No known way to raise the limit from the API itself — would need Plytix/dashboard-side confirmation of how this cap is configured, and whether it's raisable for testing purposes.
2. **PDF Catalogs feature is disabled entirely for "David's Dev Account."** `POST /pdf-catalogs` → `422 "Cannot create new items the feature pdfs for account ..."` regardless of body validity — an account-level feature flag, not a per-request gate. `GET` still works (returns an empty list). No known way to enable it via the API.
3. **Ecatalogs feature is also disabled entirely for "David's Dev Account"** — identical pattern to #2: `POST /ecatalogs` → `422 "Cannot create new items the feature ecatalogs for account ..."` regardless of body validity. `GET` still works (this account has one real pre-existing ecatalog, "Plytix Brand Portal"). No known way to enable it via the API. Combined with #2, this account cannot exercise either distribution-output creation path — anyone extending this collection to Channels/Ecatalogs output testing needs a different account.
4. ✅ **Re-confirmed 2026-10-08, still gated, with a changed error `name`:** `Forbidden` (was `PermissionError`); description unchanged. Consequence found this session: because inheritance is off, a parent's attribute value never propagates to its variants, so `overwritten_attributes` **stays `[]` even after a variant explicitly overrides a value**. This makes the `overwritten_attributes` contents and the "delete a variant's value to resolve back to the parent's" behavior **untestable on this account** — both remain open flags on `guides/reconstructing-parent-variant-hierarchies.mdx` and need either an ungated account or an answer from Plytix. **"Automatic inheritance" for product-family attribute levels is disabled for "David's Dev Account."** `PATCH /product-families/{id}/attributes/{attribute_id}` with a `level` change → `403 {"errors":[{"name":"PermissionError","description":"Automatic inheritance is not available for this account"}]}` regardless of the target level — confirmed 2026-09-15, an account-level feature flag, not a request problem. Blocks confirming this PATCH's success response shape. No known way to enable it via the API. Note this account-wide feature-gate pattern is now 3 for 3 (PDF Catalogs, Ecatalogs, automatic inheritance) — worth asking Plytix in one conversation whether "David's Dev Account" is simply provisioned on a lower plan tier that gates several premium features at once.
5. ⚠️ **Superseded 2026-10-08 (quirk #93): this gate is now unreachable.** `channel_ids`, `ecatalog_ids` and `product_data_sheet_ids` are rejected at validation (`422 "Extra inputs are not permitted"`) before the permission check runs, so the `403` below can no longer be produced. Whether the UEF flag is still set on the account is unknown and untestable from the API. Original finding preserved below. **New, confirmed 2026-09-22 — "UEF feature" blocks `channel_ids`/`ecatalog_ids` on `PATCH /products/{id}`.** `403 {"errors":[{"name":"PermissionError","description":"UEF feature is not enabled for this account"}]}`, regardless of body validity, whether the field is sent alone or together with the other. A 5th feature gate on this account (see quirk #70). No known way to enable it via the API. **Update 2026-09-22 (quirk #73)**: the same gate also blocks `parent_attributes`/`variant_attributes` on `POST /product-families` create — only the plain `attributes` array (always `no_level`) is usable on this account, at create time or via the dedicated link endpoint.

## Async / webhook-driven resources

*(none identified yet)*

## Test fixtures

- **Test account**: "API Docs" (`6a8ed9ba98cab862c35f5f89`), user `writechoice_test`, role `ADMIN`. Credentials in `bruno-collection/.env` (gitignored, provided by the user 2026-08-31).
- Confirmed the account holds real v1 product data (e.g. SKU `VST-59102-XL`, `VST-59102-M`) usable as fixtures for further v1 testing.
- **DEV account**: "David's Dev Account" (`6a38f5a5b22478f30bfd755c`), user `TestDH`, role `ADMIN`. Credentials in `bruno-collection/.env` (gitignored, provided by the user 2026-09-04). Confirmed the account holds real v3 product data (e.g. SKUs `BAG-10157`, `CAP-10359`, `HDY-11347` and variants — apparel/accessories catalog), usable as fixtures for further v3 testing. Account rate limit differs from "API Docs": 20 req/10s / **5000** req/3600s (vs. 15000).
- Reference product for Phase 0/1/2 testing: `BAG-10157` (id `6a38f614c3d65a5f868b1a06`) — confirmed to already have real categories (2, from two taxonomies), assets (multiple images, e.g. `6a38f5e1c3d65a5f868b18a5`), and **relationships** (`product_relationships` non-empty: `relationship_id 6a38f5d8c3d65a5f868b186c`, label `related_products`) and a populated **`product_family_id`** (`6a38f5d8c3d65a5f868b186e`, though `num_variations: 0`). This account already has real relationship and product-family fixture data — useful for Phase 3d/3e, may not need to force-create scratch data for those phases.
- **Phase 1 fixtures kept for Phase 2+** (created 2026-09-07, "David's Dev Account" — see each folder's own README for full detail):
  - `03-Product-Categories`: parent `6a9f1b482b6fd055ffb7c7dc` ("WC Test Category"), child `6a9f1b542b6fd055ffb7c7dd` ("WC Test Child Category") — for Products' `category_ids`.
  - `04-Asset-Categories`: `6a9f1b862b6fd055ffb7c7de` ("WC Test Asset Category") — for Assets' `category_ids`.
  - `05-Product-Attribute-Groups`: `6a9f1b872b6fd055ffb7c7df` ("WC Test Attribute Group") — optionally for Product Attributes' `group_ids`.
  - `06-Product-Attributes`: `6a9f1bf72b6fd055ffb7c7e1` (`wc_test_text`, `TextAttribute`) — for Products' `attributes` map.
  - `07-Connections`, `08-Import-Profiles`: no fixtures kept — no downstream dependents, and both confirmed to support undeclared `DELETE` (quirk #20), so scratch resources were cleaned up rather than left in the account.
- **Phase 2 fixtures kept for Phase 3+** (created 2026-09-08, "David's Dev Account"):
  - `09-Assets`: `6aa021b72b6fd055ffb7ca9f` (`wc_test_asset_renamed.jpg`, linked to the Phase 1b asset category via `PATCH`) — for Products' `thumbnail_id`, already wired into the kept product below.
  - `02-Products-v3`: `6aa022262b6fd055ffb7caa4` (SKU `WC-TEST-FULL-001`) — fully-featured (categories, a custom attribute, thumbnail all wired in), for Phase 3/4 (Pim Product Lists, Channels, Ecatalogs) to query. Now also linked (via `static_list_ids`) to the Static product list below.
- **Phase 3 fixtures kept for Phase 4+** (created 2026-09-08, "David's Dev Account"):
  - `10-Pim-Product-Lists`: `6aa025bd2b6fd055ffb7cab4` ("WC Test Static List", type `Static`, the kept product is a member), `6aa0322d2b6fd055ffb7cabb` ("WC Test Smart List", type `Smart`, query on `sku`) — for Channels/Ecatalogs' `product_list_id`.
  - `11-Asset-Lists`: `6aa032522b6fd055ffb7cabd` ("WC Test Asset Smart List", type `Smart`, query on `filename`) — for Ecatalogs' `asset_list_id`.
  - `12-Pdf-Catalogs`: none — feature disabled for this account (quirk #37/status-gating #2); Ecatalogs' `pdf_catalog_id` will need to be documented as untestable here, not silently skipped.
  - `13-Product-Families`, `14-Relationships`: read-only, no fixtures to create.
- **Phase 4 fixtures kept for Phase 5** (created 2026-09-08, "David's Dev Account") — this is the last phase before Phase 5's end-to-end flows, so these plus every prior kept fixture are what Phase 5 has to work with:
  - `15-Channels`: `6aa047d52b6fd055ffb7cadd` ("WC Test Channel Full", format `CSV`, linked to the Phase 3a Smart product list, full rebuild schedule configured).
  - `16-Ecatalogs`: none created — feature disabled for this account (quirk #43/status-gating #3). This account's one real ecatalog ("Plytix Brand Portal", `6a38f615c3d65a5f868b1a41`) is a pre-existing read-only fixture, not something Phase 5 should mutate.

**Phases 0-5 are now complete** — every one of the 51 paths in `openapi_pimv3.json` has been individually smoke-tested, and all 8 end-to-end dashboard-equivalent flows in `USER_FLOWS.md` have been run and resolved (6 fully resolved, 2 blocked by real findings — a live bug in `CompletenessAttribute`, quirk #47, and Ecatalogs' account-level feature gate). No new fixtures were kept from Phase 5 — every scratch resource it created (parent/variant products, a scratch text attribute) had no downstream dependents and was cleaned up via the confirmed `DELETE`. `TESTING_PLAN.md`'s full plan is now complete; only the "After all phases" wrap-up and the accumulated open questions below remain as follow-up work for Plytix.

- **2026-09-15 spec-refresh session fixtures (all cleaned up, none kept)**: this session covered the 12 brand-new paths and the newly-declared `PATCH`/`DELETE` methods from the refreshed `openapi_pimv3.json` (51→63 paths). Every scratch resource created was disposable and fully cleaned up by the end of the session — no new fixtures were added to the account:
  - `13-Product-Families`: two scratch families (`6aa97212a30ca5945169a21e` "WC Test Product Family", renamed and deleted; `6aa9727aa30ca5945169a226` "WC Test Product Family 2", used to test the identity-endpoint `POST` idempotent-link behavior, deleted) and their attribute links — all deleted.
  - `14-Relationships`: two scratch relationship types (`6aa97b0ca30ca5945169a23c` "WC Test Relationship", renamed and deleted; `6aa97b2ca30ca5945169a23e` "WC Test Product Relationship", used for the product-linking tests below, deleted).
  - `17-Product-Relationships`: two scratch products (`6aa97b2ca30ca5945169a23f` `WC-TEST-REL-A`, `6aa97b2da30ca5945169a240` `WC-TEST-REL-B`) linked, patched, unlinked via the new safe `DELETE`, then both deleted.
  - `02-Products-v3`, `03-Product-Categories`, `04-Asset-Categories`, `05-Product-Attribute-Groups`, `06-Product-Attributes`, `07-Connections`, `08-Import-Profiles`, `09-Assets`, `10-Pim-Product-Lists`, `11-Asset-Lists`, `15-Channels`: one scratch resource each, created solely to retest newly-declared `PATCH`/`DELETE` and capture a real `example{}`, then deleted (real ids are in each `.bru` file's `example{}` block and folder README — not re-listed here to avoid duplicating ~11 short-lived ids).
  - `12-Pdf-Catalogs`, `16-Ecatalogs`: no live calls made this session (both remain feature-gated per status-gating #2/#3) — see each folder's README for the note added instead.

## Open questions for the user / Plytix

1. ~~**v3 reachability**~~ — ✅ fully resolved 2026-09-04: v3 is live and working on `https://pim.dev.plytix.com/api/v3`, under "David's Dev Account", authenticated via `https://auth.dev.plytix.com`. See Environment section above for the full trail (wrong-host 503s → right-host-wrong-account 401s → right-host-right-account 200). Bruno coverage in place (`Get Access Token (Dev).bru`, `02-Products-v3/List Products.bru`, `Dev` environment).
2. Is the undocumented `refresh_token` real/usable, or safe to ignore in docs?
3. Should the 401 error shape and undocumented rate limits be raised with Plytix as doc bugs, or are they already known/tracked (e.g. in `API_Feedback_-_From_Product_board.pdf`)?
4. **New, from today's v3 test**: is `openapi_pimv3.json` missing `_fields` (and possibly other) query parameters just for `/products`, or across the board? Worth a systematic pass once more v3 endpoints are tested against "David's Dev Account".
5. ~~**New, from Phase 0 completion (2026-09-07)**: is `GET /products/<sku>` (identifier-by-SKU) meant to work on v3 at all?~~ — ✅ **RESOLVED 2026-10-01 (quirk #86)**: yes, it works now — `200` for both raw and URL-encoded SKU, `404` for a nonexistent one. Plytix shipped the behavior their docs already described; no longer needs raising.
6. **New, from Phase 0**: is `_expand` meant to work on `/products` at all, or was it only ever a v1/legacy mechanism `API V3.md` describes without it applying to v3's automatic per-`_fields` expansion? Worth checking on a resource with more expansion depth once Phase 1-4 get there.
7. **New, from Phase 0**: several raw internal Product model fields surfaced via the subpath-discovery 400 trick (`product_family_model_id`, `mark_as_deleted`, `last_context`, `modified_user_audit`, `created_user_audit`) aren't declared anywhere in `openapi_pimv3.json`'s `ProductOutputDto`. Worth asking Plytix whether any of these are meant to be customer-facing/documented, or are intentionally internal.
8. **New, from Phase 1 (2026-09-07)**: is the undeclared-but-working `PATCH`/`DELETE` on every Phase 1 resource (quirk #20) an intentional, stable part of the public API, or an implementation detail that happens to work today and could change without notice? This determines whether docs can confidently document rename/delete flows for these resources.
9. **New, from Phase 1**: can the Dev account's `FormulaAttribute` limit (currently 2, already reached) be raised so `FormulaAttribute` creation can actually be tested end-to-end, rather than only its limit-rejection path?
10. **New, from Phase 1**: is `HierarchyAttribute` (quirk #23) a real upcoming feature worth waiting for/asking about, or safe to ignore entirely for this documentation engagement?
11. ~~**New, from Phase 1**: does `group_ids` on `POST /product-attributes` actually link the attribute to the group (quirk #25)?~~ — ✅ resolved 2026-09-22 (quirk #75): yes, it links — confirmed from the attribute-group's own `GET`, which shows the new attribute's label added to `attribute_labels`. Still invisible from the attribute's own responses.
12. ~~**New, from Phase 2 (2026-09-08) — the most important one to raise.** `DELETE /products/{identifier}/{path}` deletes the entire product regardless of `{path}` (quirk #31) — is this intentional or a bug?~~ — ✅ **RESOLVED 2026-09-23**: no longer reproducible. The endpoint now returns `405`/`404` instead of deleting the product — Plytix fixed it (quirk #31). No longer needs to be raised.
13. **New, from Phase 2**: is there a supported way to unassign a single category/asset/relationship from a product via the API at all, given `DELETE` on that subpath just deletes the whole product? (E.g. is `PATCH` with a reduced `category_ids` array the only way?) Relevant for any "remove from category" how-to doc.
14. **New, from Phase 3 (2026-09-08)**: can the PDF Catalogs feature (quirk #37) be enabled on "David's Dev Account" so `POST /pdf-catalogs` can actually be tested, rather than only its feature-gate rejection?
15. **New, from Phase 3**: is the "Static list membership lives on the product's `static_list_ids`, not the list" mechanism (quirk #34) intentional public API design, or should docs instead point users toward the dashboard UI for managing static list membership? Affects how confidently a how-to doc can walk through it via the API alone.
16. **New, from Phase 4 (2026-09-08)**: can Ecatalogs (and/or PDF Catalogs) be enabled on "David's Dev Account"? Both distribution-output features are gated off (status-gating #2/#3), meaning nothing about actually building/publishing a catalog or feed output has been tested end-to-end — only the metadata-record CRUD layer. This is a real gap for any docs about the distribution features themselves.
17. **New, from Phase 4**: worth flagging to Plytix as a DX issue — `Channel`'s rebuild-scheduling validation error (quirk #40) is the only 422 in this whole project that doesn't name the specific invalid/missing field. Everything else does. Low priority, but a real inconsistency.
18. **New, from Phase 5 (2026-09-08) — the second most urgent question after #12, and possibly higher priority since it's a clear-cut bug, not a design question.** `CompletenessAttribute` creation 500s on any real attribute reference (quirk #47), reproduced twice — this needs a Plytix bug report, ideally before any docs promise Completeness Attributes as a usable feature.
19. **New, from Phase 5**: can Plytix confirm whether a Channel's "direct product assignment" (per the help-center) really is implemented as an auto-generated hidden product list under the hood (quirk #50), or works some other way entirely invisible to the API? Affects how confidently docs can explain the relationship between the dashboard's "Destination" framing and the API's `product_list_id` field.
20. **New, from the 2026-09-04 PDF update (2026-09-11) — updated 2026-09-15 and 2026-09-23, mostly resolved.** Neither the plain subpath DELETE (`/products/{id}/categories`, quirk #31) nor the newly-documented "1:M Unlink" pattern (`/products/{id}/categories/{category_id}`, quirk #54) originally provided a scoped removal — both deleted the entire product. **2026-09-15 update**: the brand-new `DELETE /products/{id}/relationships/{relationship_id}` endpoint *does* provide a safe, scoped unlink (quirk #62) — proving the pattern is achievable. **2026-09-23 update**: the destructive behavior on both category-side patterns is now fixed — they safely reject (`405`/`404`) instead of deleting the product. The safety question is resolved; the remaining, narrower question is whether Plytix plans to add a genuinely *working* scoped unlink for categories/assets (matching what `relationships` already has), since neither pattern actually removes a single category today — `PATCH` with a reduced array is still the only working method.
21. **New, from the 2026-09-15 spec refresh — the most urgent new question this session, since it looks like a genuine data-isolation bug.** Three brand-new endpoints (`GET /family-attributes`, `GET /product-relationships`, `GET /related-products`) all return records from *other Plytix accounts* when called with no filter (quirk #59). Is this a real cross-tenant data leak that needs an urgent fix, or is there some reason these three specific endpoints are exempt from the account-scoping every other v3 endpoint has? Needs a fast answer before any docs reference these endpoints without a loud warning to always filter by `account_id`/`product_id`.
22. **New, from the 2026-09-15 spec refresh**: is `GET /products/{id}/relationships/{relationship_id}/related-products[/{id}]` (quirk #63) meant to work at all, or is it a known-broken/unfinished endpoint? It returns empty/404 even for a link confirmed to exist by three other means.
23. **New, from the 2026-09-15 spec refresh**: can "automatic inheritance" for product-family attribute levels (quirk #61, status-gating #4) be enabled on this Dev account, so `PATCH /product-families/{id}/attributes/{attribute_id}`'s actual success response can finally be captured rather than only its `403` rejection?
24. **New, from 2026-10-01 (quirk #84) — the most urgent question this session.** `PATCH` switched from `200` + full entity to `204` + empty body somewhere between 2026-09-23 and 2026-10-01. Was this an intentional, announced change, and is it final? It's a breaking change for any integration that reads values out of a PATCH response, and the docs now describe `204`. If it's an accidental regression that will be reverted, six published pages need changing back.
25. **New, from 2026-10-01 (quirk #85).** Is `PATCH` replacing the whole `attributes` map (rather than merging into it) intentional? It's a sharp edge: the natural "send only what changed" pattern silently deletes every attribute the caller omitted, with no error and no warning. If intentional, it's worth Plytix documenting prominently; if not, it's a data-loss bug. (The "is there a safe alternative" half of this question is answered — `PATCH /products/{id}/attributes/{name}` with a bare value works and is scoped, quirk #87. What remains is whether the destructive whole-map behavior is intended.)
26. **New, from 2026-10-01 (quirk #92) — a concrete bug with a one-line fix.** Every `pagination.next_page`/`previous_page` link is generated with the `http` scheme, 301s to `https`, and silently costs the caller their `Authorization` header on any client that doesn't forward auth across a scheme-changing redirect. Can Plytix emit `https` links? Until then every "follow the next_page URL" instruction in the docs needs a warning attached.
27. **New, from 2026-10-01 (quirk #89).** v1 returned `total_count` on every search; v3 has no count mechanism at all (`_total_count`/`_filtered_count` both 400, and the `Pagination` schema carries no counts). Is this deliberate, or still-to-come? It's a real capability regression for anyone building a UI that shows "N results" or a progress bar over an export, and it's the kind of thing a migrating v1 customer will hit immediately.
28. **New, from 2026-10-01 (quirk #91).** The spec's `Pagination` schema says `string | null`, but the API omits the keys instead. Should the spec be corrected, or the API changed to emit explicit nulls? Either is fine for docs, but right now a generated client built from the spec will have a nullable field that is never actually null, only absent.
29. **New, from 2026-10-08 (quirk #93) — the most urgent question this session.** All five `*_ids` relationship-array fields are now rejected on `POST`/`PATCH /products` with `"Extra inputs are not permitted"`, although `openapi_pimv3.json` still declares every one of them. Was this an intentional move to the new link/unlink subpaths (quirk #94), and if so is the spec going to be corrected? Three published guides are built on `category_ids` and currently teach a call that `422`s.
30. **New, from 2026-10-08 (quirk #96).** With `*_ids` gone and no link/unlink support on `/products/{id}/assets`, there is no way to attach or detach a non-thumbnail asset to a product through the API. Is an asset link/unlink endpoint coming, matching what categories and relationships now have? This is a capability regression, not just a docs gap.
31. **New, from 2026-10-08 (quirk #99).** The case-insensitive operator flipped back from `icontains` to `contains:ignorecase` between 2026-10-01 and today. Which is the supported spelling going forward? Also: `includes`/`!includes` appear in the API's own operator list and in none of Plytix's source material — what do they do, and how do they differ from `contains` and `intersects`?
32. **New, from 2026-10-08 (quirk #101a).** `PATCH /channels/{id}` with `{"rebuild_periodically": true}` alone returns `502 BadGatewayError`. A missing-companion-field validation case should not produce a 5xx. Clear bug report.
33. **New, from 2026-10-08 (quirk #101b).** The channel `webhook` block accepts a `204` and then silently discards the value, and `_fields=webhook` is dropped from search responses. Is channel webhook configuration meant to be API-writable at all, or is it dashboard-only? The docs currently can't say either way.
34. **New, from 2026-10-08 (quirk #102).** The JWT advertises per-account rate limits that the v3 host does not appear to enforce (80 requests in ~2s all returned `200`), and no PIM response carries a rate-limit header. Are the limits advisory, enforced only on the prod host, or not yet wired up? Docs currently tell readers to handle `429` without anyone having seen one.
35. **New, from 2026-10-08 (quirk #103).** `pim.plytix.com/api/v3` now answers `401` rather than `503`. Is it the production v3 base URL customers should use? Please also re-issue a prod ("API Docs") credential so this can be confirmed end to end — the current `.env` holds only the DEV pair.
