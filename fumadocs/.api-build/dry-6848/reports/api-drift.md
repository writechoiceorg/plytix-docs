# V3 spec build report

Source: `upstream/openapi-v3.json` · Result: **FAIL** (1 blocking)

Visibility: 87 public operations published; excluded 11 on-hold, 16 pending, 8 removed, 43 internal; 0 unclassified. Pruned 147 unreachable components.

Coverage: 87/87 operations edited, 87/87 described, 87/87 clean operationIds, 188/188 params described, 167/792 responses with examples. Details: `reports/api-coverage.md`.

## Other blocking errors

- schemas/product-attributes.yaml: invalid YAML (Nested mappings are not allowed in compact mappings at line 159, column 20:

      description: Set `type` to `FormulaAttribute`. Holds a value Plytix calcu…
                   ^
)

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

## Notices (459)

- on hold: 11 operations left out (22 overlay edits kept, not applied): GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}/{path}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products; POST /api/v3/products/{product_id}/relationships/{relationship_id}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; GET /api/v3/products/{product_id}/relationships; POST /api/v3/products/{product_id}/relationships; POST /api/v3/product-families/{identifier}/{path}
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes/{attribute_id}'].get
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes/{attribute_id}'].post
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes/{attribute_id}'].delete
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes/{attribute_id}'].patch
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes/{attribute_id}/{path}'].get
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes/{attribute_id}/{path}'].delete
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes/{attribute_id}/{path}'].patch
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes'].get
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{product_family_id}/attributes'].post
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/products/{product_id}/relationships/{relationship_id}'].get
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/products/{product_id}/relationships/{relationship_id}'].delete
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/products/{identifier}/{path}'].post
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/products/{identifier}/{path}'].patch
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].patch
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-attribute-groups/{identifier}/{path}'].patch
- new action baselined: 00-fixes.yaml::$.paths['/api/v3/product-families/{identifier}/{path}'].patch
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductFamilyOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductFamilyOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductFamilyCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductFamilyCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.BooleanAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.BooleanAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.BooleanAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.BooleanAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.CompletenessAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.CompletenessAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.CompletenessAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.CompletenessAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.DateAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.DateAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.DateAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.DateAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.DecimalAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.DecimalAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.DecimalAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.DecimalAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.DropdownAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.DropdownAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.DropdownAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.DropdownAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.FormulaAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.FormulaAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.FormulaAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.FormulaAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.HtmlAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.HtmlAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.HtmlAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.HtmlAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.IntAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.IntAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.IntAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.IntAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaGalleryAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaGalleryAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaGalleryAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.MediaGalleryAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.MultiSelectAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.MultiSelectAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.MultiSelectAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.MultiSelectAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.MultilineAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.MultilineAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductAttributeGenericCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductAttributeGenericCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductAttributeGenericGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductAttributeGenericGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductAttributeGetBaseOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.ProductAttributeGetBaseOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.TextAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.TextAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.TextAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.TextAttributeGetOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.UrlAttributeCreateOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.UrlAttributeCreateOutputDto.properties._id
- new action baselined: 00-fixes.yaml::$.components.schemas.UrlAttributeGetOutputDto
- new action baselined: 00-fixes.yaml::$.components.schemas.UrlAttributeGetOutputDto.properties._id
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='_fields' && @.in=='query')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='_page' && @.in=='query')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='_page_size' && @.in=='query')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='_sort_by' && @.in=='query')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='filters' && @.in=='query')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='product_family_id' && @.in=='path')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='attribute_id' && @.in=='path')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='product_id' && @.in=='path')]
- new action baselined: 10-shared.yaml::$.paths.*.*.parameters[?(@.name=='relationship_id' && @.in=='path')]
- new action baselined: 10-shared.yaml::$.paths.*.*.responses['400']
- new action baselined: 10-shared.yaml::$.paths.*.*.responses['401']
- new action baselined: 10-shared.yaml::$.paths.*.*.responses['403']
- new action baselined: 10-shared.yaml::$.paths.*.*.responses['404']
- new action baselined: 10-shared.yaml::$.paths.*.*.responses['422']
- new action baselined: 20-meta.yaml::$
- new action baselined: ops/asset-categories.yaml::$.paths['/api/v3/asset-categories'].get
- new action baselined: ops/asset-categories.yaml::$.paths['/api/v3/asset-categories'].get.responses['200'].content['application/json']
- …and 359 more
