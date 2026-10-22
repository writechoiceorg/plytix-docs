# V3 examples report

`v3-examples.json` replaces the sampler's placeholders (`"string"`, `"stringst"`, `user@example.com`) with synthetic data from one made-up catalog, "NorthPeak Outfitters" (packs, tents and accessories). It is applied by `openapi-examples.mjs`. All cross-references are consistent: account `69085c1e2b4a7f13d90c5e21`, family `Backpacks & Bags`, parent product `BAG-20314` with variant `BAG-20314-SLT`, and so on. IDs are lowercase 24-hex and time-prefixed to match their 2026 `created` dates. Every GTIN-13 has a valid check digit. Timestamps use the live format (`2026-10-06T14:32:18.412000+00:00`). Hosts are `*.northpeak-outfitters.com` only. No real account data is reused: the fixture SKU `BAG-10157` is deliberately not used.

**Update, 2026-10-21:** the site now builds from the latest spec (`openapi_pimv3_20261002 (Latest spec).json`), with internal resources excluded. Create responses moved from `200` to `201`. The entries for excluded resources were dropped. New entries cover the five link and update request bodies the latest spec added. Each search endpoint now gets its own `filters` example (under `parameters`), naming fields that resource has, in place of the spec's product-only example. The coverage table and validator result below predate this update; re-run the validator before relying on them.

## Coverage

| What | Spec count | Covered |
|---|---|---|
| Operations with a `requestBody` | 29 | 29 |
| 2xx responses with a named-component schema | 49 (18 Search, 15 Create, 16 Get) | 49 |
| 2xx responses with an empty `{}` schema, verified shape | — | 4 (see below) |
| Keys in the file | — | 67 |

The four empty-schema responses were added because the live findings show their body: `GET /api/v3/related-products`, `GET` and `POST /api/v3/product-families/{product_family_id}/attributes`, and `GET .../attributes/{attribute_id}`.

**Deliberately not covered:**
- **Every `PATCH` response.** Live `PATCH` now returns `204` with an empty body (quirks #84, #116).
- **Every `DELETE`.** Returns `204`.
- **Generic `/{path}` subpaths.** The body depends on the field named in the path.
- **`POST`/`PATCH`/`GET /products/{product_id}/relationships...`.** These return 405, 422 or 404 as of 2026-10-15 (FB-024 regression in `config/api-testing.config.md`). The `.../related-products` subpath still returns empty data (quirks #63, #112).
- **`/metrics`, `/is_ready`, `/is_alive`.** No verified data.
- **`POST /product-families/{id}/attributes` request.** The live body is `{"attribute_id", "level"}` (`FamilyAttributeLinkInputDto`, quirk #61), but the spec declares no `requestBody`, so `applyExamples` has nowhere to put it. Only its response is included.
- **`POST /products/{id}/relationships` request.** Same reason: no `requestBody` in the spec, and the endpoint is 405 live anyway. The `related_products: [{product_id, quantity}]` quirk therefore doesn't apply to any example.

## Validator result

The validator lives outside the repo, at `C:\Users\guigg\AppData\Local\Temp\claude\c--Users-guigg-WriteChoice-plytix-docs\ab197b6d-0490-4238-b309-21eb8dacd517\scratchpad\validate.js`. It uses `ajv` 6.15.0 from `fumadocs/node_modules`. That is the only installed version, and it has no 2020-12 build, so validation runs in draft-07 mode with `unknownFormats: ignore` and `$ref` resolved against `components`.

**Result: 163 assertions passed, 0 failed.** The assertions cover:
- every key exists as an operation in `openapi.json`
- each request and response validates against its schema
- coverage is complete
- no string or key matches `/\bstring\b|example\.(com|org)|stringst|lorem|\bfoo\b|\bexample\b/i`
- GTIN checksums are valid
- product and asset requests carry no `*_ids` fields
- attribute-create and group-create requests carry no `group_ids` or `attribute_labels`
- decimal attribute values in product requests are strings
- no `label` in the attribute `PATCH`

A negative test with 10 injected faults caught every one of them. The faults were: a bad enum, an extra property, a missing required field, a regex `pattern` violation, a bad response enum, a banned string, a bad GTIN, `*_ids` in a product request, an unknown key and a missing coverage entry.

A dry run of `applyExamples()` (in memory, `openapi.json` not written) reported no unmatched keys or status codes.

## Schema vs. verified findings (where the examples follow the live API)

All citations are to `config/api-testing.config.md` unless noted.

1. **Create status code.** The spec declares `200` for every create; live returns `201` (quirks #19, #116). Create examples are keyed `"200"` because that is the only status the spec has.
2. **`_id` vs `id`.** `ProductAttribute*OutputDto` and `ProductFamily*OutputDto` declare `_id`, but every live capture returns `id` (`06-Product-Attributes/*.bru`, `13-Product-Families/*.bru`). The examples use `id`. This validates only because those output schemas allow additional properties. The spec should be fixed.
3. **Rejected `*_ids` fields.** `category_ids` and `static_list_ids` on products and assets, plus `channel_ids`, `ecatalog_ids` and `product_data_sheet_ids` on product `PATCH`, are declared in this spec but rejected with 422 live (quirks #93, #104). They are left out. `group_ids` on attribute create and `attribute_labels` on group create are also declared but rejected (quirk #104), and are left out too. Linking goes through `POST .../{relation}` with `{"id"}` (quirk #105).
4. **Decimal attribute values.** These are sent as strings (`"349.95"`, FB-020). The only live product read that has a price, `02-Products-v3/Get Product by ID.bru` (2026-09-22), returns the value as a JSON number (`29.99`). So response examples show numbers while request examples show strings. Not re-checked since FB-020, so confirm with Plytix.
5. **Custom attribute keys.** The `attributes` map is keyed by attribute `label`, not `name` (quirk #30).
6. **Embedded `product_relationships`.** On `GET /products/{identifier}`, `product_relationships` is shown as `[{relationship_id, relationship_label}]` with no `related_products` (quirk #113). The spec's `ProductRelationshipModelOutputDto` also lists `related_products` and `relationship`.
7. **`GET /product-relationships` items.** These use the 2026-10-15 flat shape `{from_product_id, to_product_id, product_relationship_type_id, properties: {quantity}}` (FB-024). The spec's `ProductRelationshipOutputDto` says `{relationship_id, relationship_label, related_products, product_id}`, and the 2026-09-15 capture and quirk #112 (2026-10-13) still matched the spec.
8. **`account_id` on family attributes.** Live no longer returns `account_id` on `GET /family-attributes` (quirk #112), so it is left out there. The single-link `GET` and `POST` responses keep it, as captured on 2026-09-15.
9. **Pagination.** `pagination` keys are omitted rather than `null`, and a single page is `{}` (quirk #91; the spec says `string | null`). `next_page` links use `http://` because that is what the API emits (quirk #92, re-confirmed 2026-10-15). **If you would rather show `https://` in docs, it's a single find/replace on `http://pim.plytix.com` in the JSON.**
10. **Asset reads.** These include `path` but no `url` or `thumbnail` (FB-012, 2026-10-15). No `checksum`, `public` or `downloaded_from` is shown, because no live capture includes them.
11. **Connection credentials.** `password`, `token` and `refresh_token` are write-only: sent in requests, never in responses (quirk #76). The spec doesn't mark them `writeOnly`.
12. **Hidden enums.** `ConnectionCreateInputDto.type` uses the lowercase enum (quirk #21), and the spec now matches. `Channel.format` uses `CSV`/`XML`, the only values confirmed valid (quirk #39). The spec types it as a free string.
13. **Product `PATCH` request.** It leaves out `attributes` on purpose. `PATCH` replaces the whole `attributes` map (quirk #85), so a partial-attributes example would teach data loss. Single-attribute writes belong on `PATCH /products/{id}/attributes/{label}` (quirk #87). The example also avoids `parent_id` with a different `product_family_id` (quirk #98).
14. **Channel examples.** No `webhook` block is included, because writing one breaks the channel (quirk #114). The schedule fields are sent as the full set (`rebuild_periodically` + frequency + hod + moh + timezone, quirks #40, #101).
15. **Product family create.** The request uses only `attributes` with consistent `{id, label}` refs (quirk #72). `parent_attributes`/`variant_attributes` are gated by "Automatic inheritance" on the test account (status-gating #4).
16. **Product family models.** `GET /product-family-models[/{identifier}]` is still in this spec but returns 404 live since 2026-10-13 (quirk #111). Its examples use the 2026-09-08 capture shape.

## Guessed shapes (not verified live)

- **PDF catalogs (all four examples).** Creation is feature-gated (quirk #37) and no account has one, so every shape comes from the schema alone. That includes the page `id` format (shown as a 32-hex string, modelled on e-catalog asset UUIDs) and the create response echoing `pages` with `null` defaults.
- **`POST /ecatalogs` response and `PATCH /ecatalogs` request.** Creation is feature-gated (quirk #43). The response mirrors the one read-only `GET` capture (`16-Ecatalogs/Get Ecatalog by ID.bru`), and the `PATCH` request is schema-only.
- **Default fields on `GET /products` without `_fields`.** These are assumed to match the single-record `GET` minus `product_relationships`. Every captured search example used `_fields`.
- **`categories` on `GET /assets/{identifier}`.** Shown shallow as `[{id, name}]`. The `PATCH` capture showed `[{id}]`, the `.../categories` subpath showed `{id, name, account_id}`, and no plain asset `GET` was captured.
- **`GET /product-relationships`.** Built from a one-line field list in FB-024. Whether items also carry `id` or `account_id` is unknown.
- **`GET /channels` list items.** Trimmed to `id, name, format, active, product_list_id`. The only capture used `_fields`.
- **Response formula `formatter` and `DECIMAL_FORMAT` structures on e-catalog output attributes.** Copied from the live capture's pattern, with synthetic labels.
