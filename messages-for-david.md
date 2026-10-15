# Feedback status for David

Updated 2026-10-15.

---

Page: Overview

Solved:
- Quickstart authentication wording: the card now reads "Set up authentication and make your first authenticated request," with no specific flow. The Quickstart's own description is on the Quickstart page. We'll update it there, along with its authentication steps, once the question below is answered.
- API version navigation: the reference card is now "V3 API reference," and a new "API versions" section links the V1/V2 reference and the Migrating to V3 guide.
- Integration path: "Your path to integration" now includes The Plytix data model and an entry point to the integration guides.

Questions:
- We don't have notes from the October 8 call. Our latest transcript is from October 1. Could you share the notes or recording so we can cite the authentication decision directly?
- For now, V3 requests still authenticate with the V1/V2 key and password exchanged for a bearer token, and our tests confirm it works. Should we keep documenting that for V3 until the new model ships? When will the details of the new model (token generation, access levels, errors) be ready? Your answer also decides how we update the Quickstart.

---

Page: The Plytix data model

Solved:
- Product hierarchy: the page now says `product_level` 0 is a standalone product, and 1 to 3 are parent, variant and sub-variant.
- Family structure: `/product-family-models` is replaced with family attributes, each with its attribute and level.
- Product fields summary: custom values are now described as living in `attributes`, with system fields, relationship fields, timestamps and foreign keys at the top level.
- Related-entity expansion: the page now has a `_fields` example and explains that to-many relations return arrays and to-one relations return objects. It also says filters don't narrow the expanded data.
- `_fields` on a single product: you were right. Our retest shows `?_fields=sku` returns only the SKU, and the Endpoint mapping and export guides now use it.
- Asset assignment: the page separates uploading an asset, setting the thumbnail and using media attributes. We've also tested the media format: a media attribute takes the asset ID as a string, and a media gallery takes an array of IDs. Once set, the asset shows up in the product's `assets`.
- V3 scope: the intro now says the paths and conventions refer to V3.
- Formula and Completeness: configuring these attributes is now separate from the values Plytix calculates. We also tested writing a value directly: it's ignored, and the stored value doesn't change.
- Quickstart description: handled together with the Overview point.

Questions:
- `/api/v3/product-family-models` returned data in September but now returns `404`, and it's not in the spec. Has it been retired? If so, we'll remove its reference pages.

---

Page: Searching and pagination

Solved:
- Repeated `_sort_by` works. Fields sort in the order you send them, sorting by the same field twice returns `400`, and we sorted by 11 fields at once without hitting a limit. The guide now explains this, including that a sort field must also be in `_fields`.
- Invalid filters aren't silently ignored. An unknown field or operator returns a `400`. We removed that claim. A search with no filter returns everything.
- We found keyset paging in the October 8 PDF (our summary had missed it) and tested it on products. It works.

Questions:
- Your reviews refer to the October 13 OpenAPI, but the newest one we have is from October 2. Could you send it, and let us know where new versions get published?
- The `next_page` links still come back as `http://` (checked October 15). Is a fix scheduled, and which environments are affected? We'll drop the workaround once it's fixed.

---

Page: Filter operators

Solved:
- To send multiple values, you repeat the parameter (`sku[in]=X&sku[in]=Y`), which returns either match. A comma-separated list or a JSON list returns nothing. On list fields with a single value, `[in]`, `[includes]`, `[intersects]` and `[eq]` all return the same records.
- The relationship filter path was wrong, and we've fixed it on this page and the reference page. The valid fields are `relationship_id`, `related_products.product_id` and `related_products.quantity`.
- V3 has no `like`, `!like` or `text_search` operators. The page maps legacy `like` to the V3 `contains` forms.
- On the V3 side, a text attribute set to an empty string or only spaces is stored as missing. So `[!exists]`, `[length]=0` and `[eq]=` match the same products, and `[null]` matches none.

Questions:
- In V1/V2, is `like` (and `!like`) case-insensitive, like `eq`? We can't test the legacy API on our side yet.
- Is a V3 replacement for `text_search` planned? Do legacy searches accept length operators or `last_days`, and if so, under what names?
- In V1/V2, does `!exists` match a `null` value, an empty string or an empty list?
- When a search combines a related product and a quantity, do both conditions apply to the same related product? We couldn't test this because relationship writes are currently failing (see Endpoint mapping).

---

Page: Responses and updates

Solved:
- We tested the single-attribute `PATCH` body for each type. A decimal is sent as a string (`"12.5"`), a media attribute as an asset ID, a media gallery as an array of IDs, and a multiselect as an array of its option labels. We haven't tested dropdowns yet.
- Deleting a variant's override: we tested this with inheritance on. The variant ends up with no value and doesn't go back to the parent's value. The pages are corrected.

Questions:
- The internal docs say a create returns only the new ID, but the spec and our tests return the full record (without relationship expansions). Is the full record the final behavior for every resource? If so, could the internal doc be updated?
- A `PATCH` with `attributes` replaces the whole map, so any attribute you leave out is deleted. Is that intended, or should it merge? If it's intended, could the spec say so?
- After a variant's override is deleted, the variant has no value and stays listed in `overwritten_attributes`. Is that intended? How should a client make that variant inherit from its parent again? Also, linking an attribute at `parent_level` works through `POST` even though the account says automatic inheritance isn't available. Is that meant to work?

---

Page: Authentication and base URLs

Solved:
- Shared-authentication claims: removed from the intro, the comparison table and the lines about credentials, roles and refresh logic carrying over.
- V1/V2 section: it now has the base URL, path prefixes, token endpoint, credentials and header, plus a short explanation of API credentials versus the bearer token.
- V3 section: it has the base URL and a note that the new token-based model is pending, with a placeholder link to the V3 Authentication page.
- Authentication links: they now point to the legacy Authentication page, and the Quickstart link is gone.
- Descriptions: the page description and the related-resource card no longer describe a shared flow. The same wording on the Migrating to V3 overview is also fixed.

Questions:
- Same authentication question as on the Overview.

---

Page: Endpoint mapping

Solved:
- 1. Variant unlink: it now maps to `PATCH` with `{"parent_id": null}`, not a product `DELETE`. The section separates creating, linking, unlinking and deleting a variant. We tested it: the variant becomes a single product and keeps its own values, but loses the values it inherited.
- 2. Relation reads: these now stay scoped to one product. Our retest shows `_fields` works on a single product and the `/assets` and `/categories` subpaths return data again, so the page uses them. A short paragraph explains how the two response shapes differ. We'll recheck the subpaths before publishing, because they've broken before.
- 3. Subcategories: the product subcategory row sends the V1 `category_id` as `parent_id`, and there's a matching asset subcategory row.
- 4. `all_attributes`: it now maps to `GET /api/v3/family-attributes?product_family_id=<id>`, with notes on scope and level. The system-attributes point is in the questions below.
- 5. Relationships: rows are split by version, each with its payload. V3's `DELETE` is described as removing the whole association. The `/unlink` method and path spelling aren't changed yet (see questions).
- 6. Account-wide endpoints: the callout no longer asks for `account_id` on every call and suggests `product_id` or `product_family_id` instead. The endpoint review marks all three endpoints Public, so they stay.
- 7. Assets: the rows say "No dedicated endpoint" and point to media and media gallery attributes, which we've now tested.
- 8. The table headers now label V1 and V2 rows, "No V3 equivalent" and "No dedicated endpoint" are defined, "Attribute from group" shows the V1 route, and every table has a Notes column.

Questions:
- The V1 Postman collection contradicts itself: is `/unlink` a `POST` or a `PATCH`, and is the path `/product/{id}` or `/products/{id}`? Which document should we treat as the definitive V1 reference?
- The product relationship endpoints stopped working on October 15. `POST` returns `405`, `PATCH` returns `422` and `GET` returns `404`, even though the spec includes them and `POST` worked in September. How should clients create and update relationships now? Once that works: does `PATCH` merge or replace `related_products`, and how can a client remove just one related product?
- Does the V3 family attributes list include system attributes, the way V1's `all_attributes` does? A new family starts with 4 attributes that look like system attributes, but we can't confirm it.

---

Page: Sync your ERP

Solved:
- 1. Authentication: the token step depends on the API version, and the key/password exchange and 15-minute lifetime are no longer presented as the V3 flow.
- 2. Checkpoints: runs use a UTC boundary, a `modified[gte]` to `modified[lt]` window with overlap, and deduplication by ID. The checkpoint is saved only after every page and product succeeds. We tested it: the two filters combine, full UTC timestamps work, and `modified` updates after a single-attribute change and after archiving.
- 3. Plytix-to-ERP flow: the pull selects the fields you apply, and a step writes the changed Plytix-owned fields to the ERP.
- 4. Relations: categories and relationships are requested explicitly with `_fields`.
- 5. Attribute updates: the partial-map warning links the before/after example and explains the concurrency risk. The single-attribute `PATCH` is now tested per type (for example, a decimal is sent as a string).
- 6. The Plytix ID is optional everywhere, with URL-encoded SKU addressing as the alternative. The create response no longer promises that unset fields are omitted, and a `204` counts as success, with read-back optional.
- 7. A new section assigns an owner to each field, the prerequisites call out the attribute types, and writes are compared first to avoid loops.
- 8. New sections cover rate limits, failures, partial runs and retries (a `409` is reconciled by SKU), plus archives and deletions.
- Bracket encoding already matched the reference, and the initial import is now separate from the scheduled runs.

Questions:
- Is there any way to list products deleted since a given time?
- An invalid date such as `not-a-date` returns `200` with an empty list instead of an error. Is that intended?
- The token says 20 requests per 10 seconds, but 80 parallel requests all succeeded and no rate-limit headers came back. Are the limits enforced in production? What does a `429` look like, and does it include `Retry-After`?

---

Page: Export your full catalog

Solved:
- Ordering: requests sort by `id` and include it in the fields. The page explains that page numbers can skip or repeat products mid-export, and a new section covers keyset paging. We tested it on products: it works, and IDs follow creation order.
- Pagination: the loop continues only while `next_page` holds a usable URL. The sample link keeps all its parameters and is marked as shortened.
- HTTPS: `http` links are described as an issue to be fixed, and `--location-trusted` and header forwarding are gone.
- Field selection: troubleshooting points to the product schema and attribute definitions, and separates a misspelled field from an unset value. The claim that `_fields` is ignored on single products is removed, because our retest proved you right.
- Assets: the page says the export includes asset metadata only, that `path` isn't a download URL, and that the export isn't a full backup.
- Marketplace links: removed and replaced with Filtering and query syntax and Sync your ERP.
- Suggested improvements: added a resumable Python export loop with retries and pacing, the page-size tradeoff, and a definition of "full catalog".

Questions:
- What's the supported way to download an asset's file through the API? Responses include only `path`, which is a storage path, not a URL. Can `path` be turned into a file URL, and will a `url` field be added?

---

Page: Audit product data quality with filters

Solved:
- 1. Missing, null and empty: each has its own check, with an OR example that catches all three. The page no longer says `[length]=0` matches missing fields, and it asks readers to trim whitespace in their own code.
- 2. Scope and business rules: a new first step asks readers to write down their rules and scope them by family, level or status. GTIN is presented as a business rule. We tested the `product_family_id=` and `product_level=` filters, and both work.
- 3. Images: `main_image_link` is no longer the image check. The page separates the thumbnail, a media attribute and a media gallery. `thumbnail_id[!exists]` is now tested and works.
- 4. Completeness: described as configured per account, read from the attribute definitions, with a below-threshold `[lt]=90` example and its boundary. We also confirmed that the `attributes` map uses the attribute's label as its key.
- 5. Full result: a new step covers selecting the right fields, reading every page and recording the failed rules per product.
- 6. Requests: bracketed names are encoded, and the unknown-operator `400` is confirmed live and links the reference.
- 7. Related links: the marketplace and Channel references and the duplicate card are gone.

Questions:
- How should `[null]` be sent? `thumbnail_id[null]` returns nothing, with or without `=true`. Can functions be chained, like `[trim][length]=0`, to find text that's only whitespace?
- Is a completeness score always 0 to 100? What does a product outside the attribute's scope show: no score, or `0`?

---

Page: Build a marketplace-specific product feed

Solved:
- We went with your first option, an external feed. The Channel and product list steps and the dashboard note are gone. The guide now reads products from the public search and builds the feed file in the integration.
- The intro says the guide doesn't create a Plytix channel, and it points to the Help Center for native channels.
- The description and related links no longer mention managing channels through the API. A few other pages still do (the webhooks guide and the Channels reference pages), and we'll clean those up separately.

Questions:
- It still depends on the asset download question above (see Export your full catalog), because feeds usually need image links.

---

Page: Safely remove categories, assets, or relationships

Solved:
- 1. Relationship scope: the intro and steps say the `DELETE` removes the whole relationship link, not a single related product.
- 2. Assets: the page no longer says `thumbnail_id` is the only asset write, and it mentions media and media gallery attributes. We've since tested the format (asset ID for media, array for gallery) and will add it to the page.
- 3. Thumbnail: the page separates clearing the thumbnail from deleting the asset. We've since tested it: the asset stays in `assets` while a media attribute still uses it. We'll update the page with that.
- 4. Repeated requests: a `409` counts as success only when it confirms the same link. A new entry covers repeated unlinks. Our tests confirm the two cases return different `404` messages ("is not linked to" versus "Resource not found").
- 5. Read-back: a `204` confirms the change, the follow-up read is optional, and the page no longer promises that other fields stay unchanged.
- 6. The link response shows the exact `201` body, the error messages match our live captures, and the `_ids` note is limited to the link ID arrays. This page had no marketplace link.

Questions:
- None new. Removing a single related product depends on the relationship question in Endpoint mapping.

---

Page: Reconstruct parent/variant hierarchies

Solved:
- Workflow: the guide now starts by reading existing products and grouping them by `parent_id`. Creating a hierarchy is an optional last section for testing.
- Family-model endpoint: removed. The guide reads levels from the family attributes endpoint and explains `attribute_id` and `level`.
- Children and sub-variants: a step lists a parent's children with `parent_id=` or `parent.sku=`, pages through the results, and repeats for sub-variants. We tested both filters, and they work.
- Family and inheritance rules: we verified them live, and the page shows the exact `422` and `403` errors.
- Link level: the example sends `level`. We tested the default: it's `no_level`, and linking at `parent_level` or `variant_level` works too.
- `overwritten_attributes`: qualified as you suggested. Our tests show an override adds `attributes.<label>` to the list.
- Prerequisites and responses: an existing family is no longer required, the create response matches the schema, and there's an example of the rebuilt output.
- Unlinking isn't covered in this guide. If we add it, it'll use `PATCH` with `{"parent_id": null}`.

Questions:
- `num_variations` is inconsistent. On our test parent it counts only direct variants (2), but the seed parent TSH-11470 shows 12, which looks like it includes sub-variants. Which is correct?
- Is an entry ever removed from `overwritten_attributes`? Does the list also cover attributes at `variant_level`?
- The `product-family-models` question in the Data model section applies here too.

---

Page: Bulk operations for large catalogs (internal draft)

Solved:
- Keep it private: the guide is out of the docs site and the navigation. After the next deploy, it won't have a URL and won't appear in search, the MCP or the llms exports.
- Public references elsewhere: the migration pages no longer mention the legacy Bulk API. A few links remain (Sync your ERP, the V3 pagination and updates reference pages, and the Platform MCP pages), and we'll remove them next. The Documentation MCP guide never linked to it.
- Splitting the topics: noted for if publication is revisited. The draft already covers V3 only.
- Code example: the loop now paces requests, retries `429`, `5xx` and failed connections, and logs each response.
- `409` handling: no longer treated as success. The draft says to look up the SKU, confirm it's the right product, then update it.
- Unsupported statements: removed together with the Bulk API section.

Questions:
- You mentioned a Bulk API reference on the Endpoint mapping page, but we can't find one. Could you point us to it?

---

Page: Connect an AI assistant to the Plytix docs

Solved:
- Scope: the page says the server only searches and reads the public docs and can't access account data. "Can't write anything anywhere" is gone.
- Test question: replaced with "Using the Plytix Documentation MCP, explain V3 product filtering and cite the relevant page."
- Troubleshooting: less absolute. A working tool list means the server is up, and readers check the MCP endpoint itself.
- Retrieval: the page says the assistant can use the docs depending on the client and prompt, and encourages asking for the source.
- Public content only: the Bulk draft leaves the MCP at the next deploy. The Channels reference pages are still published, and we'll remove them separately.
- Platform MCP: this page doesn't mention or link it.
- Deployment checks and the example connection: these wait for the live endpoint (see questions).

Questions:
- What will the production docs domain be, and which hosting option did your infrastructure team choose? We'll test the client setups and add example output once the endpoint is live.
- Has the Platform MCP roadmap message been approved for the public docs? Its six pages are still in the sidebar. If it hasn't been approved, we'll remove them, as we did with the Bulk draft.

---

Page: Not migrated and new in V3

Solved:
- The page is dated against the October 2 OpenAPI, and every entry is marked as legacy only, alternative in V3, or planned.
- 1. Bulk: the page says the current V3 contract has no bulk endpoints and bulk is planned. Following your Bulk-draft note, it doesn't mention the legacy Bulk API (see questions).
- 2. Assets: media and media gallery attributes are now the V3 route, kept separate from replacing a file, and the format is confirmed by our tests.
- 3. Account search: all six rows are marked as documented in V1, the dashboard isn't presented as a replacement, and nothing implies retirement.
- 4. Filter discovery: the row explains what `product-attributes` returns and links the filtering reference.
- 5. New entry points: three are described as read-only views managed through nested endpoints, and all four are Public in the visibility review.
- 6. V2: the beta description matches the legacy reference, and the relationship `DELETE` is described as a different route, not a new capability.
- 7. Migration outcome: keep legacy calls only where V3 has no confirmed equivalent.

Questions:
- Should the migration pages mention the legacy V1 Bulk API at all (for example, "available to some accounts, ask your Plytix contact"), or say nothing? Can we say publicly that bulk is planned for V3?
- Are credential and membership search planned for V3, staying V1-only, or being retired?

---

Page: Migrating to V3

Solved:
- 1. Authentication: the page says V1/V2 keep the current flow and V3's new model is pending. Nothing says credentials or refresh logic carry over.
- 2. Bulk: the "gone from both" section is replaced. V3 has no bulk endpoints yet, and bulk is planned. Account search moved to the "keep on V1/V2" table.
- 3. Create responses: the page follows the spec and our tests: `201` with `data` as an object, so code that read `data[0]` must change. The "PATCH recently changed" callout is gone.
- 4. Filters: `status=Review` is now `status=Completed`, and the category filter uses `categories.id[intersects]`. Missing, null and empty values and negated operators are flagged as needing care. We've since tested multiple values: you repeat the parameter.
- 5. Assets: replacing a file, uploading a new asset and assigning through media attributes are now separate.
- 6. Attribute updates: the claim that `PATCH` replaces the whole attributes map stays, because our tests confirm it. It now links the before/after example and shows the single-attribute `PATCH`, with a concurrency warning. The "unknown filters are ignored" claim is removed: they return a `400`.
- 7. Validation: step 9 compares both versions on stable test data, and writes are tested on separate records.

Questions:
- Nothing new. The open items on this page are authentication, the create response, the `PATCH` attributes behavior and legacy bulk, all covered above.
