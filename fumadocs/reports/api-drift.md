# V3 spec build report

Source: `upstream/openapi-v3.json` · Result: **PASS**

Visibility: 78 public operations published; excluded 17 pending, 49 internal, 1 on-hold, 8 removed; 0 unclassified. Pruned 158 unreachable components.

Coverage: 78/78 operations edited, 78/78 described, 78/78 clean operationIds, 161/161 params described, 78/118 responses with examples. Details: `reports/api-coverage.md`.

## Warnings (144)

- lint: info-license: Info object should contain `license` field. (#/info)
- lint: tag-description: Tag object should contain `description` field. (#/tags/0/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/1/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/2/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/3/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/4/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/5/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/6/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/7/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/8/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/9/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/10/description)
- lint: tag-description: Tag object should contain `description` field. (#/tags/11/description)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match format "date-time". (#/paths/~1api~1v3~1products/get/responses/200/content/application~1json/examples/filtered/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property type must be null. (#/paths/~1api~1v3~1products/get/responses/200/content/application~1json/examples/filtered/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match a schema in anyOf. (#/paths/~1api~1v3~1products/get/responses/200/content/application~1json/examples/filtered/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match format "date-time". (#/paths/~1api~1v3~1products/get/responses/200/content/application~1json/examples/filtered/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property type must be null. (#/paths/~1api~1v3~1products/get/responses/200/content/application~1json/examples/filtered/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match a schema in anyOf. (#/paths/~1api~1v3~1products/get/responses/200/content/application~1json/examples/filtered/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match format "date-time". (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property type must be null. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match format "date-time". (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/0/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property type must be null. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/0/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/0/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match format "date-time". (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property type must be null. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match format "date-time". (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/1/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property type must be null. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/1/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets/get/responses/200/content/application~1json/examples/firstPage/value/data/1/modified)
- lint: no-illogical-composition-keywords: Schemas in `oneOf` must be mutually exclusive. Found overlapping schemas: `From a URL` and `From file content`. Add `url`, `content` to `required` in every schema; an optional property cannot distinguish the schemas. (#/components/schemas/AssetCreateInputDto/oneOf)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match format "date-time". (#/paths/~1api~1v3~1assets~1{identifier}/get/responses/200/content/application~1json/examples/asset/value/data/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property type must be null. (#/paths/~1api~1v3~1assets~1{identifier}/get/responses/200/content/application~1json/examples/asset/value/data/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets~1{identifier}/get/responses/200/content/application~1json/examples/asset/value/data/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match format "date-time". (#/paths/~1api~1v3~1assets~1{identifier}/get/responses/200/content/application~1json/examples/asset/value/data/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property type must be null. (#/paths/~1api~1v3~1assets~1{identifier}/get/responses/200/content/application~1json/examples/asset/value/data/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets~1{identifier}/get/responses/200/content/application~1json/examples/asset/value/data/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match format "date-time". (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property type must be null. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match a schema in anyOf. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/0/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match format "date-time". (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/0/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property type must be null. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/0/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match a schema in anyOf. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/0/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match format "date-time". (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property type must be null. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `created` property must match a schema in anyOf. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/1/created)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match format "date-time". (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/1/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property type must be null. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/1/modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `modified` property must match a schema in anyOf. (#/paths/~1api~1v3~1product-categories/get/responses/200/content/application~1json/examples/firstPage/value/data/1/modified)
- …and 94 more

## Notices (24)

- visibility: entry for an operation upstream no longer has: POST /api/v3/product-families/{identifier}/{path}
- visibility: entry for an operation upstream no longer has: POST /api/v3/products/{identifier}/{path}
- visibility: entry for an operation upstream no longer has: GET /api/v3/products/{product_id}/relationships
- visibility: entry for an operation upstream no longer has: POST /api/v3/products/{product_id}/relationships
- visibility: entry for an operation upstream no longer has: GET /api/v3/products/{product_id}/relationships/{relationship_id}
- visibility: entry for an operation upstream no longer has: POST /api/v3/products/{product_id}/relationships/{relationship_id}
- visibility: entry for an operation upstream no longer has: PATCH /api/v3/products/{product_id}/relationships/{relationship_id}
- visibility: entry for an operation upstream no longer has: DELETE /api/v3/products/{product_id}/relationships/{relationship_id}
- visibility: entry for an operation upstream no longer has: GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products
- visibility: entry for an operation upstream no longer has: GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}
- visibility: entry for an operation upstream no longer has: GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}/{path}
- visibility: entry for an operation upstream no longer has: GET /api/v3/products/{product_id}/relationships/{relationship_id}/{path}
- visibility: entry for an operation upstream no longer has: PATCH /api/v3/products/{product_id}/relationships/{relationship_id}/{path}
- visibility: entry for an operation upstream no longer has: DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}
- visibility: entry for an operation upstream no longer has: GET /api/v3/related-products
- visibility: entry for an operation upstream no longer has: GET /api/v3/relationships
- visibility: entry for an operation upstream no longer has: POST /api/v3/relationships
- visibility: entry for an operation upstream no longer has: GET /api/v3/relationships/{identifier}
- visibility: entry for an operation upstream no longer has: PATCH /api/v3/relationships/{identifier}
- visibility: entry for an operation upstream no longer has: DELETE /api/v3/relationships/{identifier}
- visibility: entry for an operation upstream no longer has: GET /api/v3/relationships/{identifier}/{path}
- visibility: entry for an operation upstream no longer has: PATCH /api/v3/relationships/{identifier}/{path}
- visibility: entry for an operation upstream no longer has: DELETE /api/v3/relationships/{identifier}/{path}
- on hold: 1 operations left out (2 overlay edits kept, not applied): GET /api/v3/product-relationships
