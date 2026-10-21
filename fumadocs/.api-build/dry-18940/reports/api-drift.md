# V3 spec build report

Source: `upstream/openapi-v3.json` · Result: **PASS**

Visibility: 88 public operations published; excluded 10 on-hold, 16 pending, 8 removed, 43 internal; 0 unclassified. Pruned 147 unreachable components.

Coverage: 25/88 operations edited, 33/88 described, 25/88 clean operationIds, 170/190 params described, 116/803 responses with examples. Details: `reports/api-coverage.md`.

## Warnings (26)

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
- lint: no-illogical-composition-keywords: Schemas in `oneOf` must be mutually exclusive. Found overlapping schemas: `From a URL` and `From file content`. Add `url`, `content` to `required` in every schema; an optional property cannot distinguish the schemas. (#/components/schemas/AssetCreateInputDto/oneOf)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `file_modified` property must match format "date-time". (#/paths/~1api~1v3~1assets/post/responses/201/content/application~1json/examples/fromUrl/value/data/file_modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `file_modified` property type must be null. (#/paths/~1api~1v3~1assets/post/responses/201/content/application~1json/examples/fromUrl/value/data/file_modified)
- lint: no-invalid-media-type-examples: Example value must conform to the schema: `file_modified` property must match a schema in anyOf. (#/paths/~1api~1v3~1assets/post/responses/201/content/application~1json/examples/fromUrl/value/data/file_modified)
- lint: no-illogical-composition-keywords: Schema in `anyOf` is empty, so it matches any value. (#/components/schemas/FormulaAttributeCreateInputDto/properties/formula/anyOf/0)
- lint: no-illogical-composition-keywords: Schema in `anyOf` is empty, so it matches any value. (#/components/schemas/FormulaAttributeCreateOutputDto/properties/formula/anyOf/0)

## Notices (1)

- on hold: 10 operations left out (20 overlay edits kept, not applied): GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}/{path}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products; POST /api/v3/products/{product_id}/relationships/{relationship_id}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; GET /api/v3/products/{product_id}/relationships; POST /api/v3/products/{product_id}/relationships
