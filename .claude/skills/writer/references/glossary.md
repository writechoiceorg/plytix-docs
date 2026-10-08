# Glossary

> **How to use this file:** Add approved product terms, their definitions, and capitalisation rules as they are established. The Writer and Reviewer skills will use this file to verify all terminology before and during writing. Do not leave terms undefined — if a definition is pending, mark it with `[PENDING]` so the skill knows to flag it.
>
> The skill may add new entries automatically when it encounters undocumented terms during a writing session. Review new entries before the next session to confirm accuracy.
>
> Source: `materials/project-references/Plytix Content Guidelines 2026 (1).pdf`, §3 ("How we talk about Plytix and Plytix products") and §7 ("Word list").
>
> Additional entries below (Bulk API, Destinations, MCP Server, Smart List, Webhooks) are sourced from `materials/project-references/before-writing.md`, §3 ("Product Roadmap") — a meeting-prep doc, not the content-guidelines PDF. Capitalization for these is marked `[PENDING]` where the source doesn't state it explicitly; confirm with the project lead before publishing content that uses them.

---

## Terms

<!-- Add entries below in alphabetical order. Use the format shown. -->

### Automations

**Capitalisation:** Automations `[PENDING]`
**Definition:** A dashboard-only, if/then rule engine that changes or fills in product data automatically when a product matches a condition (e.g. setting a default Brand value when one is missing).
**Notes:** Sourced from `materials/help-center/automations.md` and `materials/project-references/before-writing.md`, not the content-guidelines PDF. Unrelated to Channel webhooks despite Plytix's roadmap describing Automations as the planned "entry point" for an upcoming webhooks capability — that pairing isn't live yet. No corresponding API endpoint exists; confirm shipped status of any API surface before publishing.

---

### Brand Portal

**Capitalisation:** Brand Portal
**Definition:** The Plytix product for sharing curated, always-current product content with retailers, resellers, and other partners.
**Notes:** Not "eCatalog." Product name is "Plytix Brand Portals" on first mention; "Brand Portal" is acceptable on subsequent mentions.

---

### Bulk API

**Capitalisation:** Bulk API `[PENDING]`
**Definition:** The Plytix v2 API surface for bulk create/edit/delete operations, distinct from the v1 and v3 APIs.
**Notes:** Not shared with all users. Referenced in customer feedback for its partial-failure error reporting; if documenting it, confirm current availability and error-response shape before publishing — don't assume v3's response conventions apply.

---

### Channel

**Capitalisation:** channel (lowercase in running text, unless starting a sentence)
**Definition:** A destination you send product data to (e.g. Shopify, Amazon).
**Notes:** Not "export" or "feed." If a reader uses their own term for this (e.g. "export feed" or "output"), bridge to the correct term instead of correcting bluntly: "You may know this as an export feed. In Plytix, it's a channel." **API note:** channels are configured and managed entirely in the Plytix UI — there are no API endpoints to create or manage a channel. For API-driven product-to-destination assignment, the correct term is Destinations (see below), not Channel.

---

### Destinations

**Capitalisation:** Destinations `[PENDING]`
**Definition:** The new, direct way of assigning a product to destinations (channels, Brand Portals, and Product Data Sheets) — replaces the older channel-assignment approach for API purposes. Destinations are retrievable and filterable fields on a product via the API, and products can be added to or removed from them via the API.
**Notes:** Not yet fully live at time of writing — confirm shipped status before publishing. This is the API-facing term to bridge to whenever a reader asks about managing channels, Brand Portals, or Product Data Sheets assignment through the API (see the **Channel** entry above).

---

### ebook

**Capitalisation:** ebook (lowercase)
**Definition:** A downloadable digital publication.
**Notes:** Not "Ebook" or "e-book."

---

### ecommerce

**Capitalisation:** ecommerce (lowercase c, no hyphen)
**Definition:** Online buying and selling of goods.
**Notes:** Not "e-commerce" or "eCommerce."

---

### email

**Capitalisation:** email (lowercase)
**Definition:** Electronic mail.
**Notes:** Not "e-mail."

---

### internet

**Capitalisation:** internet (lowercase)
**Definition:** The global network.
**Notes:** Not "Internet."

---

### MCP Server

**Capitalisation:** MCP Server `[PENDING]`
**Definition:** Plytix's planned Model Context Protocol server, letting AI IDEs and AI agents (Claude, Gemini, etc.) connect to Plytix data directly.
**Notes:** Not yet live at time of writing — confirm shipped status before publishing. A significant differentiator for the developer audience; likely to need its own getting-started content once available.

---

### omnichannel

**Capitalisation:** omnichannel (one word, no hyphen)
**Definition:** Spanning multiple sales or content channels as a connected experience.
**Notes:** Not "omni-channel."

---

### Plytix

**Capitalisation:** Plytix
**Definition:** The platform brand — the voice and product experience that shows up on the website, in-product, in help content, and in all external conversations with customers, prospects, and partners.
**Notes:** Always call the platform "Plytix." Avoid "the PIM" or "the system" in customer-facing content — both are vague and can confuse newer readers.

---

### Plytix AI

**Capitalisation:** Plytix AI
**Definition:** Official Plytix product name.
**Notes:** Spell out in full. Don't abbreviate.

---

### Plytix Brand Portals

**Capitalisation:** Plytix Brand Portals
**Definition:** Official Plytix product name. See also [[Brand Portal]] for the shortened subsequent-mention form.
**Notes:** Spell out in full on first mention. Don't abbreviate.

---

### Plytix DAM

**Capitalisation:** Plytix DAM
**Definition:** Official Plytix product name (Digital Asset Management).
**Notes:** Spell out in full. Don't abbreviate further or expand to "Digital Asset Management" instead of the product name.

---

### Plytix Feed Management

**Capitalisation:** Plytix Feed Management
**Definition:** Official Plytix product name.
**Notes:** Spell out in full. Don't abbreviate to "PFM" or "Feed tool."

---

### Plytix PIM

**Capitalisation:** Plytix PIM
**Definition:** Official Plytix product name (Product Information Management).
**Notes:** Spell out in full. Don't abbreviate further, and don't refer to it as just "the PIM" in customer-facing content.

---

### Plytix Product Data Sheets

**Capitalisation:** Plytix Product Data Sheets
**Definition:** Official Plytix product name.
**Notes:** Spell out in full. Don't abbreviate.

---

### Plytix Shopify Content Manager

**Capitalisation:** Plytix Shopify Content Manager
**Definition:** Official Plytix product name.
**Notes:** Spell out in full. Don't abbreviate.

---

### retweet

**Capitalisation:** retweet (lowercase)
**Definition:** To repost another user's post on X/Twitter.
**Notes:** Not "re-tweet" or "reTweet."

---

### Smart List

**Capitalisation:** Smart List `[PENDING]`
**Definition:** A saved, reusable set of filter conditions in Plytix (referred to in the UI as a "smart list") that a user can load and re-run.
**Notes:** Most accounts use these to save and re-apply common filter combinations. Confirm exact in-product capitalization before publishing.

---

### Webhooks

**Capitalisation:** Webhooks `[PENDING]`
**Definition:** A planned real-time, event-driven alternative to polling-based incremental sync. The entry point for incoming webhooks is the Automations feature, set up in-product.
**Notes:** Active project at time of writing, not yet fully documented — confirm shipped status and exact feature name/capitalization before publishing.

---

### webshop

**Capitalisation:** webshop (one word)
**Definition:** An online storefront.
**Notes:** Not "web shop."

---

### website

**Capitalisation:** website (lowercase, one word)
**Definition:** A site on the web.
**Notes:** Not "web site."

---

### white paper

**Capitalisation:** white paper (two words)
**Definition:** A long-form informational document.
**Notes:** Not "whitepaper."

---

### whiteglove

**Capitalisation:** whiteglove (one word, no hyphen)
**Definition:** Describes a high-touch, hands-on service level.
**Notes:** Not "white-glove" or "white glove."

---
### API Key

**Capitalisation:** API Key (two words)
**Definition:** Describes the correct use of the term.
**Notes:** Not "api key" or "Api Key"

---

> **Data model terms added 2026-09-29** while writing `guides/data-model.mdx`. Definitions are derived from `openapi_pimv3.json` (authoritative for field shapes) and `materials/help-center/`, not from the content-guidelines PDF. Capitalization is marked `[PENDING]` throughout — confirm against in-product labels before publishing.

---

### Asset

**Capitalisation:** Asset `[PENDING]`
**Definition:** A file stored in Plytix DAM (image, video, document, spreadsheet, or other file type). Assets exist independently of products; linking one to a product is a separate action from uploading it.
**Notes:** Assets have their own category tree ([[Product Category]] nodes are not shared with asset categories). The v1 API calls these "files" in places, and the help center uses "files" in article titles. Prefer "asset" in API documentation.

---

### Attribute Group

**Capitalisation:** Attribute Group `[PENDING]`
**Definition:** A display grouping for product attributes. Controls dashboard layout only, not what a product can store.
**Notes:** Distinct from [[Product Family]], which controls which attributes apply to a product.

---

### Product

**Capitalisation:** product (lowercase in running text)
**Definition:** A single item in a Plytix catalog, identified by its SKU. The central entity of the data model: attributes describe it, categories and lists group it, assets and relationships link to it.
**Notes:** `sku` is the only field required to create one. SKUs are unique per account, case sensitive, and capped at 100 characters.

---

### Product Attribute

**Capitalisation:** Product Attribute `[PENDING]`
**Definition:** A reusable field definition (for example, "Material" or "Care instructions") with a type that determines what it can hold and how it can be filtered. A product's values for custom attributes live in its `attributes` map, keyed by attribute name.
**Notes:** Distinct from System Attributes, which sit at the top level of the product object and can't be renamed or deleted. See [[System Attribute]].

---

### Product Category

**Capitalisation:** Product Category `[PENDING]`
**Definition:** A node in a hierarchical tree that products are filed under. Carries a `parent_id`, a `path` array of names, a `slug`, and an `n_children` count. A product can belong to more than one category.
**Notes:** Not the same as an asset category; the two trees are separate. Not a [[Smart List]] — categories are structural, lists are selections.

---

### Product Family

**Capitalisation:** Product Family `[PENDING]`
**Definition:** The set of attributes that applies to one type of product, plus the inheritance rules that pass values from a parent product down to its variants and sub-variants.
**Notes:** **API constraint (corrected 2026-10-08):** families are writable. `POST /api/v3/product-families` creates one, `POST /api/v3/product-families/{id}/attributes` links an attribute to it, and `PATCH` renames it (`name` only, because attribute-membership changes propagate across every product in the family). Assigning a product into a family still uses `product_family_id`. The one dashboard-only piece is **inheritance between levels**: changing an attribute link's `level` returns `403 "Automatic inheritance is not available for this account"` on accounts without the feature. The previous note here said families were entirely dashboard-only; that was true until the 2026-09-15 spec refresh and is the source of errors found in `guides/data-model.mdx` and `guides/reconstructing-parent-variant-hierarchies.mdx` during the 2026-10-08 review.

---

### Relationship

**Capitalisation:** Relationship `[PENDING]`
**Definition:** A named type of connection between products (for example, "Accessories" or "Bundle contents"). Creating the relationship type and linking products to it are two separate steps; each link can carry a `quantity`.
**Notes:** Account-level entity. Read from a product through its `product_relationships` field. **Writable (confirmed 2026-10-08):** `POST /api/v3/relationships` creates the type; `POST`, `PATCH`, and `DELETE` on `/api/v3/products/{product_id}/relationships/{relationship_id}` link products, change a link's `quantity`, and unlink. The link body uses `product_id` (not `related_product_id`) and repeats `relationship_id` inside the body as well as in the path. The `DELETE` is scoped: it removes the link and leaves both products intact.

---

### System Attribute

**Capitalisation:** System Attribute `[PENDING]`
**Definition:** An attribute included in every Plytix account by default, shown with a purple "SYS" marker in the dashboard. System Attributes sit at the top level of the product object rather than inside its `attributes` map, and can't be renamed or deleted.
**Notes:** `[CONFLICT]` The help center article states there are 12, then lists 13. Confirm the count before publishing content that states one. See [[Product Attribute]] for the custom-field counterpart.

---

### Variant

**Capitalisation:** variant (lowercase in running text)
**Definition:** A product that has a `parent_id` pointing at another product. Plytix supports up to four levels, tracked in `product_level`: `0` standalone, `1` parent, `2` variant, `3` sub-variant.
**Notes:** The dashboard labels `parent_id` as "Variant of." When a variant overrides an inherited value, the attribute name appears in its `overwritten_attributes` array. See [[Product Family]] for inheritance configuration.

<!-- Add more terms below -->
