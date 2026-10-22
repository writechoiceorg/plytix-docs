# V3 spec build report

Source: `upstream/openapi-v3.json` · Result: **PASS**

Visibility: 90 public operations published; excluded 12 on-hold, 6 pending, 49 internal, 8 removed; 0 unclassified. Pruned 148 unreachable components.

Coverage: 90/90 operations edited, 90/90 described, 90/90 clean operationIds, 189/189 params described, 89/137 responses with examples. Details: `reports/api-coverage.md`.

## Warnings (169)

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
- …and 119 more

## Notices (1)

- on hold: 12 operations left out (24 overlay edits kept, not applied): GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}/{path}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products; POST /api/v3/products/{product_id}/relationships/{relationship_id}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; GET /api/v3/products/{product_id}/relationships; POST /api/v3/products/{product_id}/relationships; GET /api/v3/product-relationships; POST /api/v3/product-families/{identifier}/{path}
