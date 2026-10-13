# API V3 — status map (color codes)

Companion to `_API V3 - 08_10_2026.md`. The Markdown export lost the cell shading that marks each option's status; this file restores it from `_API V3 - 08_10_2026.pdf`. It does not replace the source file, and it records status only, not full content.

## Legend

| Color | Status | Meaning for docs |
| --- | --- | --- |
| Green | **Direct** | Approved direct option. Document as the primary form. |
| Blue | **Alternative** | Approved alternative. Document as a secondary form, or as a workaround where no direct form exists. |
| Yellow | **Postponed** | Not in V3.0. Do not document as available. |
| No fill | **Unmarked** | No status assigned. Check with Plytix before documenting. |

How this was read: rendered PDF pages (18) inspected by eye, with cell fill sampled on page 2. Status is per cell, so a row can mix colors. Where it does, the table below says so. PDF page numbers are given for each section.

Corrections to earlier notes in this session: the `_or[#]` row in Grouping Operators is green (direct), not unmarked.

## Reserved words and forbidden names (p. 2)

| Item | Status |
| --- | --- |
| Reserved words: starting with `_` | Direct |
| Forbidden names: starting with `_` (exception: `attributes._<attribute_name>`) | Direct |
| Forbidden names: containing `.` | Direct |
| Forbidden names: containing `[` | Direct |

The Markdown export also lists reserved words starting with `.` and `__`, and forbidden names containing `|`. The new PDF does not. Treat those as removed from the spec.

## Grouping operators (pp. 2–3)

| Logic | Form | Status |
| --- | --- | --- |
| `f1 AND f2` | `<filter1>&<filter2>` | Direct |
| `f1 AND f2` | `_and[0]<filter1>&_and[0]<filter2>` | Alternative |
| `f1 OR f2` | `_or[#]<filter1>&_or[#]<filter2>` | Direct |
| `(f1 OR f2) AND (f3 OR f4)` | `_or[0]…&_or[1]…` | Direct |
| `(f1 OR f2) AND (f3 OR f4)` | `_and[0]_or[0]…&_and[0]_or[1]…` | Alternative |
| `(f1 AND f2) OR (f3 AND f4)` | `_or[0]_and[0]…&_or[1]_and[1]…` | Direct |
| `NOT (f1 bool f2)` | `_![bool][0]<filter>…` | Direct |
| `NOT EXISTS` on related table | `_!exists[#]<t2_filter>` | Direct. Public PIM API V3.0 limits it to `relationships.id` or `relationships.label`, and it can't be grouped with `_and` or `_or`. |
| 3+ level nesting | Allowed | Direct. The source advises limiting depth per API. |

## Functions (pp. 3–4)

| Function | Status |
| --- | --- |
| General pattern `<field>[<function>:<arg>…][<filter>]=<value>` | Direct |
| Row for `<entity_x:n>[<function>]` (1st arg is a list) | Highlighted green within an otherwise unmarked row. Read as Direct. |
| String or array/list length `[length]` | Direct |
| Full days passed `[days_passed:<tz>]` | Direct |
| Custom filters (injected per API) | Direct |

## Filters (pp. 4–6)

| Operation | Form | Status |
| --- | --- | --- |
| Filters apply to fields only (`categories[exists]`) | | Direct |
| Equals | `field=value`, `field[eq]=value` | Direct |
| Equals, universal group (include null/undefined) | `_or[#]field[eq]=value&_or[#]field[!exists]` etc. | Alternative |
| Not equal (among values) | `field[!eq]=value` | Direct |
| Not equal, including null/undefined | `field[!eq]=value&field[exists]` etc. | Alternative |
| Is not null / is null | `field[!null]`, `field[null]` | Direct |
| Empty (`''` or `[]`) | `field[len]=0` | Alternative |
| Not empty and exists | `field[len][gt]=0` | Alternative |
| Undefined / not undefined | `field[!exists]`, `field[exists]` | Direct |
| Contains, case-insensitive / case-sensitive | `field[contains:ignorecase]=value`, `field[contains]=value` | Direct |
| Array intersects / not intersects | `field[intersects]=value`, `field[!intersects]=value` | Direct |
| In | `field[in]=v1&field[in]=v2` | Direct |
| In (OR form) | `_or[#]field=value1&_or[#]field=value2` | Alternative |
| Not in, or null | `_or[#]field[!in]=…&_or[#]field[!exists]` | Alternative |
| Not in | `field[!in]=v1&field[!in]=v2` | Direct |
| `>`, `>=`, `<`, `<=` | `field[gt]`, `[gte]`, `[lt]`, `[lte]` | Direct |
| Generic length comparison | `<field>[length][eq|!eq|lt|lte|gt|gte]=<value>` | Alternative |
| Field1 or Field2 contains (ignore case) | `_or[#]field1[contains:ignorecase]=…` | Alternative |
| Between | `field[gte]=#1&field[lte]=#2` | Alternative |
| Generic days-passed comparison | `<field>[<days_passed_function>][<comparison>]=<value>` | Alternative |

Note: `[len]` appears for the empty checks and `[length]` for generic length comparison. Both appear in the source as written. Check which one the live API accepts before documenting.

## Related entities filtering, transversal (pp. 6–8)

The "Current" column in the source says "Not possible" for basic entity traversal, and the "Possible Alternative" column carries the status.

| Operation | Form | Status |
| --- | --- | --- |
| Basic entity traversal | `related-entity.attribute[<filter>]=value` | Direct |
| Custom attributes | `attributes.name[<filter>]=value` | Direct |
| Product relationships (general pattern) | `product_relationships.relationship_id=…&product_relationships.related_products.related_product_id=…&…quantity[<op2>]=#` | Direct |
| Eg1: relationship exists | `product_relationships.relationship_id=<id>` | Direct |
| Eg2: relationship not exists | `_!exists[0]product_relationships.relationship_id=<id>` | Direct. Same public-API restriction as above. |
| Eg2 alternative syntaxes: `relationships[have]…`, `_alias[relationships]=alias&…`, `_fields=relationships.id&…` | | Postponed |
| `relationships[!contains]={…}`, `relationships[contains_kv:label:pack][eq]=false` | | Postponed |
| Eg3: related product exists | `product_relationships.relationship_id=…&…related_product_id=…` | Direct |
| Eg4: quantity filter (`gt`) | `product_relationships.…related_products.quantity[gt]=2` | Direct |
| Eg4 ambiguous form: `relationships.label=…&relationships.links.product_id=…&…` | | Postponed. Flagged "Ambiguous: the link could belong to a different relationship. Aliases might solve this." |
| Eg5: quantity range | `…quantity[lte]=2&…quantity[gte]=1` | Direct |
| Eg5 ambiguous form: `relationships.links.*` | | Postponed. Same ambiguity note. |

Typo in the source's Eg5: `product_relationships.relrelated_products.quantity` (it should read `related_products`). Don't copy it.

## Returned fields (p. 9)

| Operation | Form | Status |
| --- | --- | --- |
| First level, selected | `_fields=<f1>&_fields=<f2>` | Direct (optional) |
| First level, all | Default behavior | Direct |
| First level, all (explicit) | `_fields=*` | Alternative |
| Multilevel, selected | `_fields=<expansion>.<field>` | Direct |
| Multilevel, all | `_fields=<entity>.*` | Alternative |

## Related entities data expansion (p. 10)

| Item | Status |
| --- | --- |
| `_fields=<subentity>` and `_fields=<subentity>.<field\|*>` | Direct. "As of now, this is the default and only approved behaviour." Expands all related elements regardless of filters in the call. |

Notes below the table are shown in green text on the page (explanatory, not a status). They cover `_ids` fields hidden, `_id` fields exposed as foreign keys, `_fields=related_entity` behaving like `.*`, and to-many relations returned as a list while to-one relations return a single object.

## Pagination (p. 10)

| Item | Status |
| --- | --- |
| `_page=#&_page_size=#&_sort_by=<field>` | Direct |
| `_filtered_count=<bool>` and `_total_count=<bool>` | Postponed (orange text). The example note says "`_filtered_count` and `_total_count` do not exist yet." |
| `pagination.filtered_count` and `pagination.total_count` in the response | Postponed (orange text) |

`_sort_by` field criteria (green = supported, orange = postponed):

| # | Criterion | Status |
| --- | --- | --- |
| 1 | 1st-level field of the parent entity | Direct |
| 2 | Key within a 1st-level dict of the parent entity | Direct |
| 3 | 1 or 2 traversing related entities pointed to by a single direct FK | Direct |
| 4 | Operators/functions like MAX, MIN, AVG, LENGTH | Postponed |
| 5 | 1, 2 and 3 traversing N-part (1:N or N:M) related entities | Postponed |
| 6 | Non-scalar fields | Postponed |

Documented limits from the example note: `_page` defaults to 1, `_page_size` defaults to 25 (max 1000), `_sort_by` can repeat (max XX), a `-` prefix sorts descending, and there is no default sort. Verify "max XX" before documenting it.

## URL standardization, V3 (pp. 11–13)

| Action | Verb | Path pattern | Status |
| --- | --- | --- | --- |
| Search | GET | `api/v3/<plural_entity_name>[?<search_query>]` | Direct. "No `search_query` means get all" is highlighted yellow within the cell (Postponed). Treat as unconfirmed. |
| Get one entity instance | GET | `api/v3/<plural_entity_name>/<identifier>` (+ `<subentities>`) | Direct |
| Create | POST | `api/v3/<plural_entity_name>` | Direct (returns 201 `{id}`) |
| Override selected fields | PATCH | `…/<identifier>` (+ `<subentities>`) | Direct (returns 204) |
| Delete one instance | DELETE | `…/<identifier>` (+ `<subentities>`) | Direct (returns 204) |
| Get one field | GET | `…/<identifier>/<field>` | Direct |
| Create an entity instance field | POST | `…/<identifier>/<field>` | Postponed. Source note: "It will only work on attributes." |
| Delete an entity instance field | DELETE | `…/<identifier>/<field>` | Direct. "It will only work on attributes." |
| Advanced updates | PATCH | `…/<identifier>` with `application/json-patch+json` (RFC 6901/6902) | Postponed |
| 1:M link a new entity instance | POST | `…/<identifier>/<plural_related_entity_name>` | Direct |
| M:M get an association entity instance | GET | `…/<plural_related_entity_name>/<linked_id>` | Direct |
| M:M edit a relationship entity instance | PATCH | `…/<plural_related_entity_name>/<linked_id>` | Direct |
| 1:M unlink an entity instance | DELETE | `…/<plural_related_entity_name>/<linked_id>` | Direct. Unlinking something not linked returns 404. |

## Bulk operations (pp. 13–15)

| Action | Verb | Path | Status |
| --- | --- | --- | --- |
| Bulk additions | POST | `api/v3/-/bulk/<plural_entity_name>` | Direct |
| Bulk edits (filter, same edit for all matches) | PATCH | `api/v3/-/bulk/<plural_entity_name>/?<search_query>` | Direct |
| Bulk edits (different edit per instance) | PATCH | `api/v3/-/bulk/<plural_entity_name>/` | Direct |
| Bulk deletes by filter | DELETE | `api/v3/-/bulk/<plural_entity_name>/?<search_query>` | Direct |
| Bulk deletes by individual items | DELETE | `api/v3/-/bulk/<plural_entity_name>/` | Direct |
| Advanced bulk updates | PATCH | `api/v3/-/bulk/-/edit/<plural_entity_name>/?<search_query>` | Postponed |
| Bulk individual updates | POST | `api/v3/-/bulk/-/edit` | Postponed |
| Bulks: check job | GET | `api/v3/-/bulk/-/jobs/<bulk_job_id>` | Direct |
| Bulks: search job | GET | `api/v3/-/bulk/-/jobs/?<search_query>` | Direct |
| Bulks: transition job | POST | `…/jobs/<bulk_job_id>/<cancel\|pause\|resume\|retry>` | Postponed |

Webhook note on bulk additions: "Webhooks 1st implementation comes with absolutely no guarantees." `external_reference` is unique per account and action type. The bulk response returns `{ "bulk_job_id": <id> }`.

## Ad-hoc async actions (p. 15–16)

| Action | Verb | Path | Status |
| --- | --- | --- | --- |
| Ad-hoc async action (e.g. Shopify export) | POST | `api/v3/-/<action-name>/` | Direct |
| Check job | GET | `api/v3/-/<action-name>/-/jobs/<action-name_job_id>` | Direct |
| Search jobs | GET | `api/v3/-/<action-name>/-/jobs/?<search_query>` | Direct |
| Transition job | POST | `…/<action-name_job_id>/<cancel\|pause\|resume\|retry>` | Postponed |

Status-code summary on p. 16: 200 sync, 201 sync with ID, 202 async job.

## Response conventions (pp. 16–17)

Not color-coded as options. One green highlight: the DELETE / 204 statement ("In API V3 a DELETE operation erases the entity or field it is performed over; it doesn't set null or apply defaults"). Treat it as confirmed behavior.

The page says both that POST/PATCH return "204 No Content" and that 201 returns the created ID. The tables above agree: POST returns 201 with an ID and PATCH returns 204.

## Annex (pp. 17–18)

Table of URL special characters. Not color-coded. It is written in Spanish ("ANEXO"). Use it for context only, and don't translate in place.

## Process Manager API (p. 18)

| Item | Status |
| --- | --- |
| Search, get, patch, post, delete: all CRUD operations exposed with API V3 | Direct. PATCHes on process `status` are not allowed. Transitions go through ad-hoc endpoints. |
| `POST /api/vx/<to_be_decided>/` with `process_type` / `input_data` payload | Postponed. Path is still `<to_be_decided>`. |

## Open questions

1. **Search with no `search_query`.** The "returns all" note is yellow (Postponed) inside a green cell. Confirm what the live API does.
2. **`[len]` vs `[length]`.** Both appear. Confirm against the live API and `openapi_pimv3.json`.
3. **`_page_size` max and `_sort_by` max.** The source shows "max XX" for sort. The page-size maximum of 1000 should be checked.
4. **Unmarked rows.** A few rows have no fill (for example the OR row's logic column, and some example rows). I treated the status of the adjacent colored cell as the row's status. Where a whole row had no fill, I mapped the status from the explicit form in its neighboring cell.
5. **Spec comparison.** Per CLAUDE.md, `openapi_pimv3.json` outranks this document. Many "Direct" forms here (filters, bulk, jobs) may not exist in the spec. Run `endpoint-tester` before documenting any of them as available.
