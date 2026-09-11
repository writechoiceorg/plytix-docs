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

<!-- Add more terms below -->
