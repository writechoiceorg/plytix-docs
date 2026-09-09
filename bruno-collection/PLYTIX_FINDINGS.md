# Plytix PIM v3 API — Complete Test Findings

Compiled from `bruno-collection/TESTING_PLAN.md` and `config/api-testing.config.md`
(Known API quirks #1-52, Status-gating rules #1-3, Open questions #1-19).
Coverage: all 51 `openapi_pimv3.json` paths + all 8 `USER_FLOWS.md` end-to-end
flows tested (Phases 0-5, complete).

Each item lists: resource/endpoint, spec/docs claim vs. actual behavior,
HTTP status + evidence, source file(s), and whether it's genuine
"flag to Plytix" material or just test-scaffolding.

---

## Auth / cross-cutting (`01-*`, `config/api-testing.config.md`)

1. **Undocumented `refresh_token` field** in the auth success response `data[0]`,
   alongside `access_token`. No refresh-token endpoint found in any gathered
   material. Status: 200 (success response). Source: `config/api-testing.config.md`
   quirk #1. **Flag to Plytix** — is it real/usable? (open question #2)
2. **v1 401 error body shape doesn't match the v1 Postman collection's docs.**
   Documented: `{"msg": "Bad api_key or api_password"}`. Actual: nested under
   `error`, extended message, `errors[0].field` mislabeled `"http_status_code"`
   instead of naming the actual bad field. Status: 401. Source: quirk #2.
   **Flag to Plytix.**
3. **Undocumented rate limits.** Auth endpoint returns
   `ratelimit-limit: 8`/`x-ratelimit-limit-second: 8` headers; JWT claims embed
   per-account limits (20 req/10s, 15000 req/3600s on "API Docs" acct; 5000/3600s
   on Dev acct) — not in any gathered material. Source: quirk #3, fixtures section.
   **Flag to Plytix** (open question #3).
4. **`GET /api/v1/products` → 405 Method Not Allowed.** v1 product listing is
   actually `POST /api/v1/products/search`. Source: quirk #4. Test-scaffolding
   note (confirms v1 usage), but worth double-checking v3 docs don't repeat the
   same GET-vs-POST assumption.
5. **Auth host is environment-scoped, not just account-scoped** —
   `auth.plytix.com` (prod) vs `auth.dev.plytix.com` (dev) are separate services
   with disjoint credentials; wrong host+credential combo gives a generic 401
   with no hint the *host* is wrong. Source: quirk #6. **Flag to Plytix** as a
   docs-clarity issue for any client setup guide.

## Products v3 — cross-cutting (`02-Products-v3/`, Phase 0)

6. **`openapi_pimv3.json`'s `GET /api/v3/products` declares zero query
   parameters** (no `_fields`, no pagination) yet `_fields=<field>` (repeatable)
   works live exactly as `API V3.md` (prose) describes. Status: 200 when used.
   Source: quirk #7, `02-Products-v3/README.md`. **Flag to Plytix** — spec
   likely incomplete/stale (open question #4).
7. **`_offset`/`_limit` pagination style does NOT work**, only `_page`/`_page_size`.
   Evidence: `400 {"errors":[{"name":"InvalidFieldError","description":"Field
   '_offset' does not exist in model 'Product'."}]}`. Source: quirk #8.
   Test-scaffolding finding, but contradicts `API V3.md`'s "Possible Alternative"
   dialect — worth noting in docs.
8. **`_sort_by=<field>` works**, confirmed 200. Source: quirk #9. Not a
   discrepancy — informational.
9. **`_expand=<relationship>` does NOT work on `/products`.** Evidence:
   `400 {"errors":[{"name":"InvalidFieldError","description":"Field '_expand'
   does not exist in model 'Product'."}]}`. Contradicts `API V3.md`'s described
   default-expand mechanism; expansion happens automatically per `_fields`
   instead. Source: quirk #10. **Flag to Plytix** (open question #6).
10. **Filtering dialect**: v3 implements the query-string "Possible Alternative"
    dialect from `API V3.md` (`sku=x`, `created[gt]=date`, `categories.name=x`,
    `attributes.<name>[icontains]=x`), not the JSON-object "Current" dialect the
    prose labels as current. All 200. Source: quirk #11. **Flag to Plytix** —
    prose doc's "Current" label is backwards for v3.
11. **`_fields=category_ids` (declared in spec's `ProductOutputDto`) is
    rejected.** Evidence: `400 {"errors":[{"name":"HiddenFieldError","description":
    "Field 'category_ids' does not exist in model 'Product'."}]}`. The plural
    `_fields=categories` works instead. Source: quirk #12. **Flag to Plytix** —
    spec field name doesn't match live field name.
12. **Spec's `ProductOutputDto.relationships` field doesn't exist live** —
    silently ignored (200, field absent, no error) instead of erroring. Real
    field name is `product_relationships`. Source: quirk #13. **Flag to Plytix**
    — spec/reality field-name mismatch, silent-drop behavior is a DX trap.
13. **`GET /products/<sku>` → 422**, contradicting `API V3.md`'s claim that SKU
    works as an identifier. Evidence: `422 {"errors":[{"name":"ValidationError",
    "description":"...Id must be of type PydanticObjectId..."}]}`. Only Mongo
    ObjectId works. Source: quirk #14, re-confirmed Phase 2b (quirk #28's SKU
    note). **Flag to Plytix — high priority** (open question #5), since
    `API V3.md` explicitly documents this as working.
14. **Subpath discovery technique / undocumented raw fields**: unrecognized
    `{path}` 400s with a helpful field list, revealing internal fields not in
    `ProductOutputDto`: `product_family_model_id`, `mark_as_deleted`,
    `last_context`, `modified_user_audit`, `created_user_audit`. Source: quirk
    #15. **Flag to Plytix** — are these meant to be customer-facing? (open
    question #7). Also test-scaffolding value (reusable discovery method).
15. **Confirmed subpaths on `/products/{id}/{path}`**: `attributes`,
    `attributes/<name>`, `categories`, `relationships` (flatter shape than the
    `product_relationships` field), `assets` — all 200. Source: quirk #16.
    Test-scaffolding/reference info, not a bug.
16. **422 validation error shape**: `{"data":[],"errors":[{"name":
    "InputDTOValidationError","description":"sku: Field required"}]}` — a third
    distinct error envelope shape in this account (vs. the 401 shape and
    FastAPI's unused default shape). Source: quirk #18. Informational — worth
    documenting the shape variance, not itself a bug.
17. **`_fields` is ignored on single-resource `GET /{resource}/{id}`** — only
    works on list/search. Confirmed on `/products/{id}` and
    `/product-attributes/{id}`. Source: quirk #24. **Flag to Plytix** —
    inconsistent with list-endpoint behavior, undocumented restriction.

## Product Categories (`03-Product-Categories/`)

18. **Create returns `201`, not the spec's declared `200`.** Matches
    `API V3.md`'s stated convention. Source: TESTING_PLAN.md 1a, quirk #19,
    `03-Product-Categories/README.md`. **Flag to Plytix** — spec is wrong on
    this status code.
19. **Undeclared `PATCH`/`DELETE` both work** despite zero spec coverage.
    `PATCH` → 200 (rename confirmed); `DELETE` → 204, hard-deleted (follow-up GET
    → 404, not soft-deleted). Source: quirk #20, `03-Product-Categories/README.md`.
    **Flag to Plytix — high priority**, this pattern generalizes to 11/11
    resources tested (open question #8): is it intentional/stable, or an
    implementation detail?
20. **Duplicate-name uniqueness enforced via `422`** (`"Category <name> already
    exists"`) — part of a split where categories/lists use `422` and other
    resources use `409` for the same kind of conflict. Source: quirk #25a.
    **Flag to Plytix** as a DX/consistency issue (see consolidated #38 below).

## Asset Categories (`04-Asset-Categories/`)

21. Same `201`/undeclared-`PATCH`/`DELETE`/`422`-duplicate pattern as Product
    Categories — confirmed independently. Source: TESTING_PLAN.md 1b,
    `04-Asset-Categories/README.md`. Same flag status as #18-20, listed
    separately because it was independently re-verified per the plan's
    "confirm per-resource" rule (not assumed to generalize).

## Product Attribute Groups (`05-Product-Attribute-Groups/`)

22. Same `201`/undeclared-`PATCH`/`DELETE` pattern, but **duplicate-name
    conflict is `409`, not `422`** (`{"name":"AlreadyExists","description":"A
    group/attribute with the same name already exists"}`) — different
    status/error family than categories. Source: quirk #25a,
    `05-Product-Attribute-Groups/README.md`. **Flag to Plytix** — the
    categories-vs-everything-else 422/409 split (see consolidated #38 below).

## Product Attributes (`06-Product-Attributes/`)

23. **`FormulaAttribute` creation is capped at 2 per account, already at limit
    on Dev account.** Evidence: `422 {"errors":[{"name":"ValidationError",
    "description":"This account reached the limit of 2 formula attributes"}]}`.
    Source: quirk #22, status-gating #1, `06-Product-Attributes/README.md`.
    **Flag to Plytix** — need a raised limit to test the actual creation path
    (open question #9).
24. **Undocumented 15th product-attribute type: `HierarchyAttribute`.** Spec's
    `oneOf` declares 14 types; an invalid-`type` 422 error message lists 15,
    including this one. Attempting to create it → `500 {"errors":[{"name":
    "ConfigurationError","description":"There was an error processing your
    request. Please try again later"}]}`. Source: quirk #23,
    `06-Product-Attributes/Create Attribute - HierarchyAttribute (500,
    Unimplemented).bru`, README. **Flag to Plytix** (open question #10) — reads
    as unfinished/unexposed, don't build docs around it.
25. **`group_ids` on create accepted without error but effect unconfirmed** —
    never appears in create response, follow-up GET, or `_fields=group_ids`.
    Source: quirk #25. **Flag to Plytix** (open question #11) — silent-drop
    pattern, unclear if it actually links.
26. **Duplicate name → `409`** (see #22, same family). Source: quirk #25a.

## Connections (`07-Connections/`)

27. **`ConnectionCreateInputDto.type` is documented as a free string** (spec
    description: "Dropbox, FTP, SFTP" as examples) **but is actually a fixed,
    lowercase enum** (`dropbox`/`ftp`/`sftp`). Uppercase (`"FTP"`) rejected same
    as nonsense. Evidence: `422 {"errors":[{"name":"InputDTOValidationError",
    "description":"type: Input should be 'dropbox', 'ftp' or 'sftp'"}]}`.
    Source: quirk #21, `07-Connections/Create Connection - Invalid Type (422,
    Reveals Enum).bru`, README. **Flag to Plytix** — spec description is
    factually wrong, should declare the enum.
28. First resource where undeclared `DELETE` was discovered this session (no
    fixtures kept, cleaned up). Source: TESTING_PLAN.md 1e. Test-scaffolding
    note, folded into the general PATCH/DELETE finding (#19).

## Import Profiles (`08-Import-Profiles/`)

29. **`settings` field shape undocumented in spec** — full live default shape
    when omitted was discovered empirically (not itself a bug, just an
    undocumented default). Source: TESTING_PLAN.md 1f,
    `08-Import-Profiles/README.md`. Test-scaffolding/reference value — worth
    including in docs since spec is silent, not itself a discrepancy to report
    as a bug.

## Assets (`09-Assets/`)

30. **`AssetCreateInputDto`'s empty `required` list doesn't reflect a real
    validation rule.** `POST /assets` with `{}` → `422 {"errors":[{"name":
    "InputDTOValidationError","description":"Value error, Either 'url' or
    'content' must be provided"}]}` — a real cross-field requirement not
    expressible in the schema's flat `required` array. Source: quirk #32,
    `09-Assets/Create Asset - Empty Body (422).bru`, README. **Flag to Plytix**
    — spec is misleading about optionality.
31. **`category_ids` on `POST /assets` is silently ignored** (no error,
    follow-up GET shows `[]`), but the identical field on `POST /products`
    links immediately. Fix: apply via follow-up `PATCH /assets/{id}` instead,
    which does work. Source: quirks #26, #27, README. **Flag to Plytix** —
    inconsistent create-time relationship-field behavior across resources is a
    real DX trap.
32. **No `DELETE /assets/{identifier}` in the spec at all** — tested anyway,
    confirmed undeclared `DELETE` works: `204`. Source: TESTING_PLAN.md 2a,
    quirk #26/README. Same family as #19, independently confirmed (7th
    resource).
33. **Mutating status codes**: `POST /assets` → `201`; `PATCH /assets/{id}` and
    `PATCH /assets/{id}/{path}` → `200` (matches spec, contradicts `API V3.md`'s
    stated 204-for-patch convention). Source: quirk #28. **Flag to Plytix** —
    prose doc's stated convention is wrong here.
34. **`PATCH /assets/{identifier}/{path}` body is the field's raw new value**
    (bare JSON string), not a partial object — different convention than root
    `PATCH`. Source: quirk #29. Informational/reference, not a bug, but
    undocumented and worth capturing in docs.

## Products, extended (`02-Products-v3/`, Phase 2b)

35. **`attributes` map is keyed by attribute `name`, not Mongo `id`.**
    Confirmed via `POST /products`. Response also includes account-level
    default completeness attributes not sent in the request. Source: quirk
    #30. Informational — undocumented behavior worth flagging since it's not
    obvious from the spec.
36. **`DELETE /products/{identifier}/{path}` deletes the ENTIRE product
    regardless of `{path}`.** Tested two ways (a real subpath after linking a
    category, and a completely made-up subpath) — both wholesale-deleted the
    product (`204`, then `404` on GET), not a scoped removal. Source: quirk
    #31, `config/api-testing.config.md` quirk #31, TESTING_PLAN.md Phase 2b.
    **Flag to Plytix — highest priority finding in the whole project** (open
    question #12, and #13 on whether any scoped-unassign mechanism exists at
    all). Real hazard if anyone documents subpath-scoped deletes.
37. **`sku` uniqueness enforced with `409`** (`AlreadyExists`, vaguer message
    than other 409s — doesn't name the field), joining the
    attribute-groups/attributes side of the 409-vs-422 split. Source: quirk
    #33.
38. **Consolidated cross-resource inconsistency** (draws together #20, #22,
    #26, #37, and Channels #45a below): duplicate-name/uniqueness conflicts
    return **`422`** for categories and lists, but **`409`** for attribute
    groups, attributes, products, and channels — different status code *and*
    different error `name` for the same logical conflict type, with no
    apparent resource-type logic to the split. Source: quirk #25a, #33, #38a,
    #45a. **Flag to Plytix** as a DX/consistency issue across the whole v3
    surface.

## Pim Product Lists (`10-Pim-Product-Lists/`)

39. **Major finding: neither list create schema has a member-ID field at
    all.** `type: "Static"` auto-generates a hidden `query` (`static_lists
    contains <list_id>`) — a "Static" list is really a Smart list under the
    hood. Real membership lives on **each product's own `static_list_ids`
    field**, set via `PATCH /products/{id}`, not on the list itself. Source:
    quirk #34, `10-Pim-Product-Lists/README.md`. **Flag to Plytix** (open
    question #15) — is this intentional public API design, or should docs
    point users to the dashboard UI instead? Significant for how-to docs.
40. **Mutating status codes**: create → `201`; undeclared `PATCH`/`DELETE` both
    work (200/204). Source: quirk #35. Same family as #19.
41. **First multi-entry `errors` array observed.** `POST` with `{}` returns
    **two** validation errors at once (`name` + `type` both missing), unlike
    every prior 422 which only reported the first failure. Source: quirk #36.
    **Flag to Plytix** — inconsistent error-reporting depth across endpoints
    (don't assume `errors[0]` is exhaustive elsewhere).
42. **Duplicate list name → `422`** (`"A List with same name already
    exists"`), joining categories on the 422 side of the split (#38). Source:
    quirk #38a.

## Asset Lists (`11-Asset-Lists/`)

43. Identical Static/Smart membership mechanism, status codes, and behavior
    as Pim Product Lists (#39-42) — independently confirmed on assets.
    Source: TESTING_PLAN.md 3b, `11-Asset-Lists/README.md`. Same flag status
    as #39.

## PDF Catalogs (`12-Pdf-Catalogs/`)

44. **Feature entirely disabled for "David's Dev Account."** `POST` 422s
    regardless of body validity: `"Cannot create new items the feature pdfs
    for account 6a38f5a5b22478f30bfd755c"`. `GET` (list) works, returns
    empty. Source: quirk #37, status-gating #2, `12-Pdf-Catalogs/README.md`.
    **Flag to Plytix** (open question #14) — need account access to test the
    creation/output path at all; this is a real coverage gap, not a bug.

## Product Families & Product Family Models (`13-Product-Families/`)

45. **Genuinely read-only** — no `POST` anywhere in the spec, confirmed.
    Subpath discovery matches the spec exactly here (no undocumented fields,
    unlike products/assets). Account has real pre-existing family data (2
    families) used read-only. Source: quirk #38,
    `13-Product-Families/README.md`. Not a discrepancy — noted for
    completeness/contrast with other resources.

## Relationships (`14-Relationships/`)

46. **Also read-only**, no create endpoint (relationship *types* are
    configured in the dashboard, not via this API per `API V3.md`). Account
    has 2 real relationship types, confirmed resolvable. Source: quirk #38,
    `14-Relationships/README.md`. Not a discrepancy.

## Channels (`15-Channels/`)

47. **`Channel.format` is documented as a free string but is actually a
    hidden fixed set**, same pattern as Connections' `type` (#27). Evidence:
    `422 {"errors":[{"name":"ValidationError","description":"Field format is
    unknown"}]}` — notably does **not** enumerate valid values (unlike
    Connections' equivalent error). `CSV`/`XML` confirmed valid. Source:
    quirk #39, `15-Channels/README.md`. **Flag to Plytix** — spec wrong, and
    this error is even less helpful than Connections' equivalent.
48. **Enabling `rebuild_periodically` requires a full companion-field set
    together, with zero field-level guidance when incomplete.**
    `{"rebuild_periodically": true}` alone → `422 {"errors":[{"name":
    "ValidationError","description":"Schema validation error"}]}` — no field
    named, unlike every other 422 in the project. Needs
    `rebuild_feed_frequency`+`rebuild_feed_hod`+`rebuild_feed_moh`+
    `rebuild_feed_timezone` all together. Source: quirk #40,
    `15-Channels/Update and Delete Channel (Undeclared).bru` area, README.
    **Flag to Plytix** (open question #17) — real DX gap, only 422 in the
    project with no field name.
49. **Rich undocumented default shape on create**: `output_filename`,
    `column_separator`, `text_delimiter`, `process_products`/
    `parent_include_criteria` enums, plus an **undocumented `wayfair` field**
    not in the spec at all (alongside the documented `shopify` block).
    Source: quirk #41. **Flag to Plytix** — undocumented field.
50. **`product_list_id` links immediately on `POST /channels`** — consistent
    with products, unlike assets' silent-drop pattern (#31 in this list).
    Source: quirk #42. Informational.
51. **Duplicate channel name → `409`** (`AlreadyExists`), joining the
    products/attributes side of the split (#38). Source: quirk #45a.
52. **Undeclared `PATCH`/`DELETE` confirmed — 11th resource**, same family as
    #19. Source: quirk #45.

## Ecatalogs (`16-Ecatalogs/`)

53. **Feature entirely disabled for this account**, identical pattern to PDF
    Catalogs (#44). `POST` → `422 "Cannot create new items the feature
    ecatalogs for account ..."`. `GET` works — one real pre-existing ecatalog
    ("Plytix Brand Portal") used read-only to confirm `output_attributes` (a
    `formula`/`formatter` DSL: `CONCAT`/`JOIN`/`RESOLVE_RELATIONSHIPS`/
    `DECIMAL_FORMAT`/`HIERARCHY_SEPARATOR`) and `settings` (deeply nested
    theme/header/footer/page-builder config), both only lightly described in
    the spec. Source: quirk #43, #44, status-gating #3,
    `16-Ecatalogs/README.md`. **Flag to Plytix** (open question #16) — same
    account-access gap as PDF Catalogs; also worth flagging the undocumented
    `output_attributes` DSL richness as a docs gap (not a bug).

## Phase 5 — End-to-end flows (`USER_FLOWS.md`, cross-resource)

54. **`product_level` behavior precisely mapped**: standalone product starts
    at `0`; flips to `1` the moment another product references it via
    `parent_id` (not set at creation); variant itself is `2`.
    `num_variations`/family's `total_products` update live. Source: quirk
    #46. Informational, not a discrepancy — valuable undocumented mechanic
    worth capturing in docs.
55. **Real, reproducible bug: `CompletenessAttribute` 500s on any real
    attribute reference.** `POST /product-attributes` with `type:
    "CompletenessAttribute"` and correctly-shaped `attributes: [{"id":
    "..."}]` (confirmed correct shape via a preceding 422 — raw ID strings
    are rejected) → `500 {"errors":[{"name":"ConfigurationError",
    "description":"There was an error processing your request. Please try
    again later"}]}`, reproduced **twice** with different reference counts.
    Only an empty `attributes` array works. Source: quirk #47,
    TESTING_PLAN.md Phase 5, USER_FLOWS.md Flow 3. **Flag to Plytix —
    second-highest priority, and possibly higher than #36 since it's
    unambiguously a bug, not a design question** (open question #18). Blocks
    Flow 3 entirely; a documented, spec'd type failing its documented use
    case.
56. **No reverse-lookup exists for Smart list membership** — `GET
    /products/{id}/static_lists` only ever reflects Static membership; the
    only way to know which Smart lists match a product is to re-run that
    list's own query. Source: quirk #48, USER_FLOWS.md Flow 4.
    Informational/design-gap, worth noting for docs but not a bug.
57. **No list-side product-membership write mechanism exists.** `POST
    /pim-product-lists/{id}/products` → `405`. `PATCH .../{id}/products` →
    `422` because `products` isn't a real field on the Update DTO — revealed
    the generic rule that subpath `PATCH` validates `{path}` as an
    Update-DTO field name. Static list membership is exclusively product-side
    (`static_list_ids`, #39) — no list-side alternative. Source: quirk #49,
    USER_FLOWS.md Flow 5. Reinforces #39's flag-worthiness for docs.
58. **No direct channel-product-assignment mechanism exists; "Process" is
    confirmed UI/internal-only.** `PATCH /channels/{id}/products` → same
    `422`/`extra_forbidden` pattern as #57. `product_list_id` (#50) is the
    only real API path for products to reach a channel — the dashboard's
    "direct assignment" language is UI framing over the same mechanism.
    `POST /channels/{id}/process` and `.../build` → `405` each; `PATCH
    {"active": true}` doesn't trigger a build. Source: quirk #50,
    USER_FLOWS.md Flow 6. **Flag to Plytix** (open question #19) — resolves a
    help-center-vs-spec discrepancy, worth confirming with Plytix that the
    API truly has no build-trigger endpoint.
59. **Ecatalogs' Publish flow (Flow 7) is untestable** in this account — same
    feature-gate blocker as #53, confirmed to extend through the whole flow,
    not just creation. Source: quirk #51. Same flag as #44/#53.
60. **Housekeeping/test-scaffolding note, not an API bug**: `bru run`
    verification passes re-execute each "Create X" `.bru`'s real
    (non-placeholder) body, silently creating untracked duplicate resources
    on every verification run (an FTP connection, 2 import profiles, 3
    attributes, 1 asset, 1 product accumulated this way). Found and fully
    cleaned up 2026-09-08 via an account-wide sweep. Source: quirk #52.
    **Not** flag-to-Plytix material — pure test-scaffolding hygiene; noted
    so a future session re-sweeps rather than assuming the account matches
    docs exactly.

---

## Untested / pending per TESTING_PLAN.md

**None.** `TESTING_PLAN.md`'s own status line states: *"The entire plan
(Phases 0-5) is now complete."* All 51 `openapi_pimv3.json` paths have been
smoke-tested at least once (Phases 0-4), and all 8 end-to-end flows in
`USER_FLOWS.md` have been run and resolved (6 fully: Flows 1, 2, 4, 5, 6, 8;
2 blocked by genuine findings, not testing gaps: Flow 3 — item #55 above;
Flow 7 — item #59 above).

Explicitly out of scope by the plan's own design (not gaps): the Process
Manager API and `-bulk`/`-jobs` endpoints described in `API V3.md` (lines
196-296) — none of these paths exist in `openapi_pimv3.json`'s 51 paths,
treated as unimplemented for v3/not exposed to this account rather than an
untested gap; and `/is_alive`, `/is_ready`, `/metrics` (infra probes,
explicitly out of scope).

Only remaining work is external: routing the 19 open questions in
`config/api-testing.config.md` to Plytix, and using these findings to inform
the actual documentation-writing work this engagement exists to produce.
