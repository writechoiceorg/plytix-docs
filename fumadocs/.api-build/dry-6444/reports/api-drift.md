# V3 spec build report

Source: `upstream/openapi-v3.json` · Result: **FAIL** (2 blocking)

Visibility: 88 public operations published; excluded 10 on-hold, 16 pending, 8 removed, 43 internal; 0 unclassified. Pruned 147 unreachable components.

Coverage: 64/88 operations edited, 67/88 described, 64/88 clean operationIds, 170/190 params described, 151/803 responses with examples. Details: `reports/api-coverage.md`.

## Other blocking errors

- schemas/asset-lists.yaml: invalid YAML (Nested mappings are not allowed in compact mappings at line 57, column 20:

      description: One condition on an asset field, such as `{"field": "extensi…
                   ^
)
- broken internal link in the spec: /docs/reference/v3/productattributes/search_product_attributes_api_v3_product_attributes_get

## Warnings (151)

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
- …and 101 more

## Notices (142)

- on hold: 10 operations left out (20 overlay edits kept, not applied): GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products/{related_product_id}/{path}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/related-products; POST /api/v3/products/{product_id}/relationships/{relationship_id}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}; GET /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; DELETE /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; PATCH /api/v3/products/{product_id}/relationships/{relationship_id}/{path}; GET /api/v3/products/{product_id}/relationships; POST /api/v3/products/{product_id}/relationships
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].get
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].get.parameters[?(@.name=='_fields' && @.in=='query')]
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].get.responses['200'].content['application/json']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].get.responses['400'].content['application/json']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].post
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].post.requestBody.content['application/json']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].post.responses['201']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].post.responses['409']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists'].post.responses['422'].content['application/json']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].get
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].get.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].get.responses['200'].content['application/json']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].get.responses['404'].content['application/json']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].patch
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].patch.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].patch.requestBody.content['application/json']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].patch.responses['204']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].delete
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].delete.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}'].delete.responses['204']
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}/{path}'].get
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}/{path}'].get.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}/{path}'].patch
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}/{path}'].patch.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/asset-lists.yaml::$.paths['/api/v3/asset-lists/{identifier}/{path}'].delete
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets'].get
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets'].get.responses['200'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets'].get.responses['400'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].get
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].get.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].get.responses['200'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].get.responses['404'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].patch
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].patch.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].patch.requestBody.content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].patch.responses['204']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].patch.responses['422'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].delete
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].delete.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}'].delete.responses['204']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].get
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].get.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].get.responses['200'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].get.responses['400'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].patch
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].patch.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].patch.responses['204']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].delete
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].delete.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].delete.responses['204']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].delete.responses['404'].content['application/json']
- new action baselined: ops/assets.yaml::$.paths['/api/v3/assets/{identifier}/{path}'].delete.responses['405']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes'].get
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes'].post
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes'].post.requestBody.content['application/json']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes'].post.responses['201']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes'].post.responses['409']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes'].post.responses['422'].content['application/json']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].get
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].get.responses['200'].content['application/json']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].get.responses['404'].content['application/json']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].patch
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].patch.requestBody.content['application/json']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].patch.responses['204']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].patch.responses['422'].content['application/json']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].delete
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}'].delete.responses['204']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}/{path}'].get
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}/{path}'].get.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}/{path}'].patch
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}/{path}'].patch.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}/{path}'].patch.responses['204']
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}/{path}'].delete
- new action baselined: ops/product-attributes.yaml::$.paths['/api/v3/product-attributes/{identifier}/{path}'].delete.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].get
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].get.parameters[?(@.name=='_fields' && @.in=='query')]
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].get.responses['200'].content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].post
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].post.requestBody.content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].post.responses['201']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].post.responses['409']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories'].post.responses['422'].content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].get
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].get.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].get.responses['200'].content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].get.responses['404'].content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].patch
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].patch.parameters[?(@.name=='identifier' && @.in=='path')]
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].patch.requestBody.content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}'].patch.responses['204']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}/{path}'].get
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}/{path}'].get.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}/{path}'].get.responses['400'].content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}/{path}'].get.responses['404'].content['application/json']
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}/{path}'].patch
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}/{path}'].patch.parameters[?(@.name=='path' && @.in=='path')]
- new action baselined: ops/product-categories.yaml::$.paths['/api/v3/product-categories/{identifier}/{path}'].delete
- new action baselined: ops/product-families.yaml::$.paths['/api/v3/product-families'].get
- new action baselined: ops/product-families.yaml::$.paths['/api/v3/product-families'].get.parameters[?(@.name=='_fields' && @.in=='query')]
- …and 42 more
