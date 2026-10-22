# Guideline

> **How to use this file:** Standing writing rules that apply to every page in this project, on top of the glossary and style guide. When a rule here conflicts with an older page, the rule wins and the page gets fixed.

---

## API version names

Always write API versions as **V1/V2** and **V3**, with a capital V.

| Write | Never write |
|---|---|
| V1/V2 | v1 and v2, v1/v2, V1 and V2, v1, v2 (as a pair) |
| V3 | v3 |
| V1 or V2 (alone) | v1, v2 |

**Rules**

- Refer to V1 and V2 together as **V1/V2**. Use "V1" or "V2" alone only when the sentence is about that one version, for example "the V2 product search" or "V1 filter objects".
- Never write "V1 and V2", "V1, V2", or "V1 or V2" when you mean both. Use V1/V2.
- Use the same form in prose, headings, page titles, descriptions, link text, card and tab labels, table headers, sidebar and `meta.json` titles, component strings, and OpenAPI `description` and `summary` text.
- Write natural phrases around the name: "the V3 API", "a V1/V2 integration", "V3's query syntax", "V3 (Beta)", "V1/V2 (Legacy)". (Updated 2026-10-21, Plytix marketing/design feedback item 19: V3 is labelled "V3 (Beta)" and V1/V2 "V1/V2 (Legacy)" everywhere. Don't use "V3 (Current)" or "Legacy (V1/V2)".)
- V1/V2 concept page titles carry the version ("V1/V2 authentication", "V1/V2 pagination"), and a matching concept uses the same name in both versions ("Filtering and search"). (Item 15 and 16, 2026-10-21.)

**Do not change**

Technical tokens keep their exact original form, because they are literal values and changing them breaks links or requests.

- URLs and paths: `/api/v3/products`, `https://pim.plytix.com/api/v1/...`, `/reference/v3/...`, `/reference/v1-v2/...`
- File and folder names, slugs and `href` values: `openapi_pimv3.json`, `openapi-v1v2.json`, `migrating-to-v3/`
- Identifiers: `operationId` values, JSON keys, placeholders such as `<v3-base-url>`
- Code blocks and inline code, unless the code span is only a version name used as a label
- Tab values: if you change a `<Tabs items>` label, change the matching `<Tab value>` to the same text

**Check before closing a page**

Search the page for `\bv[123]\b`. Every match should be inside a URL, path, filename, code block, or placeholder.

---

## Where this applies

The rule covers hand-written pages under `fumadocs/content/docs/`, the generated reference pages' frontmatter, `meta.json` titles, the `description` and `summary` fields in `fumadocs/openapi.json` and `fumadocs/openapi-v1v2.json`, and visible strings in `fumadocs/app/` and `fumadocs/components/`. Hidden `{/* … */}` comments follow it too, so a flag restored later reads correctly.

When you regenerate the API reference, re-check the generated frontmatter against this rule.
