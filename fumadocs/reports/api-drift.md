# V3 spec build report

Source: `upstream/openapi-v3.json` · Result: **PASS**

Visibility: 87 public operations published; excluded 11 on-hold, 16 pending, 8 removed, 43 internal; 0 unclassified. Pruned 147 unreachable components.

Coverage: 87/87 operations edited, 87/87 described, 87/87 clean operationIds, 188/188 params described, 170/792 responses with examples. Details: `reports/api-coverage.md`.

## Warnings (161)

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
- lint: no-illogical-composition-keywords: Schema in `anyOf` is empty, so it matches any value. (#/components/schemas/FormulaAttributeGetOutputDto/properties/formula/anyOf/0)
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
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `file_modified` property must match format "date-time". (#/paths/~1api~1v3~1assets/post/responses/201/content/application~1json/examples/fromUrl/value/data/file_modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `file_modified` property type must be null. (#/paths/~1api~1v3~1assets/post/responses/201/content/application~1json/examples/fromUrl/value/data/file_modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `file_modified` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets/post/responses/201/content/application~1json/examples/fromUrl/value/data/file_modified)
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
- …and 111 more

## Notices (5)

- on hold: 11 operations left out (22 overlay edits kept, not applied): GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}/{path}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products; POST /api/v3/products/{product_id}/relationships/{relationship_id}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; GET /api/v3/products/{product_id}/relationships; POST /api/v3/products/{product_id}/relationships; POST /api/v3/product-families/{identifier}/{path}
- new action baselined: schemas/shared.yaml::$.components.schemas.OperationResponse
- new action baselined: schemas/shared.yaml::$.components.schemas.ProductChannelLinkOutputDto
- new action baselined: schemas/shared.yaml::$.components.schemas.ProductECatalogLinkOutputDto
- new action baselined: schemas/shared.yaml::$.components.schemas.ProductDataSheetLinkOutputDto
