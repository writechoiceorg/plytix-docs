# Writechoice meeting prep

## 1. User Experience: Your Audience

### User Personas

The API audience is distinct from Plytix's typical end user. The UI is used by eCommerce Managers and Content Teams while the API is used more by technical profiles, almost exclusively on paid accounts (57% of our Legacy Paid accounts have API credentials; only 7% of free accounts do, mostly representing sandbox account of paid accounts).

**Three primary API personas:**

- **Technical Internal User / Automation Builder**
    
    A technical person inside a Plytix customer account — in most cases but not always a professional developer but usually pretty comfortable with APIs. Uses the API to automate repetitive tasks: bulk exports, scheduled reports, data quality checks. Needs conceptual clarity more than technical depth.
    
- **Integration Engineer (at a Plytix customer)**
    
    Employed by a brand, retailer, or agency. Builds and maintains the connection between Plytix and the rest of the customer's tech stack — typically an ERP, an eCommerce platform, or a marketplace. These are the power users: often accounts with several API credentials. They need to understand the full data model, query capabilities, and sync patterns. They are not experts in Plytix specifically — they know their ERP, website or platform deeply and need to understand Plytix's data model to connect the two.
    
- **Partner Developer**
    
    Builds a third-party product that integrates with Plytix (e.g., EasyCatalog's InDesign plugin for catalog production, Norriq's connector for Dynamics NAV/BC). These developers need deep understanding of read patterns, relationship resolution, and performance at scale. They are building for multiple Plytix customers so documentation quality directly affects their ability to support their own product.
    
- *A fourth emerging persona: **AI agents***
    
    *Tools like Cursor, Copilot, and Claude acting on behalf of developers. This is why OpenAPI format and AI-readable descriptions are a hard requirement, not a nice-to-have.*
    

### Main Use Cases ("Jobs to Be Done")

From actual partner usage and v3 testing, these are the real workflows

1. **Incremental sync (delta reads)** — Poll for products modified since the last successful sync using a stored timestamp. Core pattern for ERP connectors and eCom platform integrations. Reduces full syncs from hours to seconds for most updates. Also the need for entity-scoped incremental syncs, for example only getting product for XYZ category
2. **ERP bidirectional sync** — Read product data from Plytix to push to ERP; push price/stock/status updates from ERP back to Plytix.
3. **Full catalog snapshot export** — Pull all products with their attributes, assets, and metadata in one paginated operation. Primary use case for platforms like EasyCatalog (InDesign catalog production), platform migrations, backups. Previously painful with v1/v2's 50-attribute limit. v3 solves this.
4. **Asset retrieval** — Retrieve product images, thumbnails, and asset metadata as part of a product read (not as a separate API call per asset). Resolving assets directly from the product endpoint is a key v3 improvement that simplifies the integration significantly.
5. **Product quality audit** — Filter products by completeness: missing GTIN, missing images, empty descriptions, missing localized content. Useful for pre-publish checks and data enrichment pipelines.
6. **Channel-specific export** — Filter products by attributes (e.g., `attributes.market[intersects]=UK`) to produce channel-specific product sets. Used for marketplace feeds and retailer-specific data packages.
7. **Parent/variant hierarchy reconstruction** — Retrieve parent products and their variants in a structured way, resolving the relationship directly from the product search. Key for ERPs and marketplaces that need hierarchical product structures.

Other use cases currently not covered mentioned by our Customer Success Manager: 

- **No last-modified-by-user attribution**
    
    The `modified` timestamp in-tool indicates when a product was last changed, but the API exposes no field for who made the change. ERP integrations and audit-trail workflows need to distinguish between changes made by a human in the UI and changes written by an automated integration. 
    
- **No asset-level change signal**
    
    The `modified` timestamp on a product record changes when any attribute is updated — but there is no equivalent signal for whether a linked asset file has actually been replaced. Integrations that manage asset delivery pipelines cannot determine if an asset needs re-downloading without fetching and comparing the file. 
    

### Customer Pain Points (most common complaints and blockers)

*The following are drawn from 614 API-related customer feedback entries collected between January 2025 and August 2026. Disclaimer: This is a summary based of real user feedback but quickly analysed with AI.*

**Authentication is the first failure point.**

The API uses a two-step JWT exchange — credentials are posted to an auth endpoint to receive a Bearer token, which is then used for all subsequent requests. This flow is not clearly documented and is non-standard relative to OAuth 2.0, which most ERP and integration tooling expects out of the box. Authentication-related issues represent 81 tickets over two years, including a significant number of 401 errors from developers who expected a simpler API key pattern.

> *"Our technical specialist has noted that you use a non-standard method for retrieving access tokens. This information will help us determine whether we can use an out-of-the-box solution or if special development is required."* — Customer implementing Odoo ERP integration (2025)
> 

**Rate limits are undocumented/difficult to find**

The current documentation directs users to the pricing page for rate limit information, which does not list specific limits. The actual limits — 50 requests per 10 seconds, 5,000 requests per hour — were only confirmed through a support escalation. Rate limit-related tickets total 48, many marked critical, and several remain unresolved.

> *"Your API is very limited — our integration has 10x more code than our other integrations... severe request limitations require special cache handling on our end."* — Customer feedback (2026)
> 

**Asset retrieval requires a separate call per image.**

Under the previous approach, retrieving product images required a separate API call for each asset ID returned in the product response. For a catalog of 1,000 products with images, this meant 1,000+ additional calls. This pattern is one of the most frequently cited integration friction points.

> *"In the product endpoint, we receive images by ID. This means we have to make separate calls to get the image paths — either a ton of API requests or store all images in a database."* — Customer API optimisation request (2025)
> 

**No clear entity coverage reference.**

Developers spend significant support time looking for endpoints that do not exist. Channels, Smart Lists, and certain other entities are not available in the API but are not documented as absent. An entity coverage reference — stating clearly what is and is not accessible via API — is frequently requested and does not currently exist.

**Bulk API provides no actionable error feedback.**

When a Bulk API operation partially fails, the response does not distinguish between a product that was skipped due to no changes versus one that failed silently. This forces developers to manually re-investigate and reprocess, negating the efficiency purpose of the bulk endpoint.

> *"We have no way of differentiating silently ignored errors from products that have no data change. This leaves us no way to act on failed uploads and creates significant inefficiency."* — Customer feedback (2025)
> 

**Filter capabilities were underused due to discoverability.**

*From filter usage analysis across 749 active accounts (2-week window):* The `in` and `eq` operators account for 74% of all filter usage. Advanced capabilities — relationship filters, array length filters, freshness filters — appear in under 1% of configurations despite representing common real-world needs. Only 43 accounts ever used relationship filters. Usage patterns also show customers repeating the same attribute filter across multiple rules as a workaround for the absence of OR logic within a single filter group.

## 2. The "Getting Started" Journey

### Prerequisites

Before a developer can make their first API call, they need:

- An active Plytix paid account (API access also available on free plans, often paid plan users have free sandbox accounts in addition to the paid life account)
- API credentials generated from the Admin section of the Plytix account: an `api_key` and an `api_password`
- No local development environment is required

### Initial Onboarding Steps (first-call sequence)

**Steps can be found in our public help center: https://help.plytix.com/en/api**

```
Step 1 — Generate credentials
In Plytix: Admin → API → Create credentials. The account administrator generates an api_key and api_password pair.

Step 2 — Exchange credentials for a Bearer token
POST https://auth.plytix.com/auth/api/get-token
Content-Type: application/json

{
  "api_key": "<api_key>",
  "api_password": "<api_password>"
}
The access token is returned at data[0].access_token. 
Token lifetime is 15 minutes.

Step 3 — Make the first API call
GET https://pim.plytix.com/api/v3/products?_page_size=10
Authorization: Bearer <access_token>

Step 4 — Navigate the response
Products are returned in a data[] array. The next page URL is returned in pagination.next_page. Follow this URL to paginate through results.
```

## 3. Product Roadmap - What Writechoice should know before writing anything

### Confirmed upcoming work (3–6 month window)

- **v1 and v2 are still in active use** — Any workflow involving creating, updating, or deleting products (ERP write-back, stock updates, price updates, status changes) currently must use v1/v2 endpoints atm. The docs need should make the transition as easy as possible. The v2 (bulk API) is not shared with all users
- **Webhooks** — a Webhooks project is active. Real-time event-driven architectures (rather than polling via incremental sync) might become a documented use case/mentioned as an alternative. The entry point for incoming webhooks is the “automations” feature, set up in tool
- **MCP server** — Plytix will expose an MCP (Model Context Protocol) server, allowing AI IDEs and AI agents (Claude, Gemini) to connect to Plytix data directly. It's a significant differentiator for the developer audience.
- **Destinations** — New direct way of assigning product to destinations (channels, brand portals, and product data sheets) we briefly took a look at. Destinations should be available as retrievable fields in the API users can filter by to see which destinations a product is included in, and also add, remove them. David or I can migrate your account so you can see the changes. **Channels are not in the API.** Channels (Shopify, BigCommerce, feed exports) are configured and managed entirely in the Plytix UI. There are no API endpoints to create or manage channels. It could be worth stating explicitly so developers don't spend time looking for endpoints that don't exist, pointing them to destinations.
- Workspaces (potentially) tbd

---

## 4. Filter Usage Analysis — What This Means for the Docs

*Source: Client filter usage analysis made end of last year by product (Ksenija) with the early v3 data back then.. UI filter usage over 2 weeks across all accounts — not API-only, but directly informs documentation priority and structure. Context: This analysis was done since the new API will allow combining and/or filters, in the API as well as filter interface. Most accounts use “smart lists” that contain a saved set of different conditions to re-use and load them.*

### What the data shows

**Filters are mission-critical, not a secondary feature.**

749 accounts used filters in the past 2 weeks. Median usage is 30 times — meaning half of active filterers use them nearly daily. 70 accounts used filters 250+ times in two weeks. This is core workflow behavior.

**Two operators cover 74% of all filter usage:**

| Operator | % of all uses | What it means for docs |
| --- | --- | --- |
| `in` | 52% | Set membership — "products in category A or B" |
| `eq` | 22% | Exact match |
| `exists` / `!exists` | 8% | Field presence checks |
| `like` / `!like` | 6% | Text contains |
| All others | ~14% | Advanced users — still thousands of real uses |

**Implication for Writechoice:** `in`, `eq`, `exists`, and `like` should appear in most filtering examples. These are what developers will copy-paste. Advanced operators (`gt`, `lt`, `last_days`, length operators) are secondary but shoulnd’t be hidden, power users depend on them.

---

### The most important insight: users are working around missing OR logic

The data reveals a clear workaround pattern. Users who needed "Category A OR Category B" created multiple separate filters:

- `category in A`
- `category in B`
- `category in C`

Accounts with 250+ filter uses show clusters of nearly identical configs differing only by value. Heavy use of `!in`, `!eq`, `!exists` in repeated patterns also indicates users simulating OR logic through negation.

**v3 directly solves this** with `_or[index]` syntax. This is one of the highest-value v3 improvements to document — it will replace dozens of workaround configs the moment power users know it exists.

**Implication for Writechoice:** OR logic might deserve a dedicated, prominent section with some strong examples? 

---

### Relationship and completeness filters are underused — but not because users don't need them

Only 43 accounts (≈2%) ever used relationship filters. Length operators and `last_days` appear in <1% of configs.

The PRD explicitly notes this is **low discoverability, not lack of need**. The current API and UX make these too hard to find and express.

**Implication for Writechoice:** These are high-leverage documentation targets. A clear guide on "Find products with no images," "Products with descriptions under 120 characters," or "Products modified in the last 7 days" will unlock usage that currently doesn't happen purely because developers don't know it's possible. Frame as "here's what you can now do" — not as advanced/optional content.

---

### v3 improvements that directly address the filter data

| v3 Change | Problem it solves | Evidence |
| --- | --- | --- |
| AND/OR in same filter group | Workaround multi-filter configs | Repeated identical configs, overuse of negation |
| Filter by related products | Near-impossible in v1/v2 | Only 43 accounts discovered relationship filters |
| Filter by count (assets, variants, array length) | Not reliably available | <1% used length operators despite common use cases |
| `null` vs `empty` vs `undefined` distinction | Confusing, inconsistent results in v1/v2 | Implicit in exists/!exists workaround patterns |
| `last_days` freshness filter | Available but undiscoverable | 0.5% of configs — need is much higher given sync use cases |
| Nested filter groups | Forced complex workarounds | The category A/B/C multi-filter pattern |

---

### Suggested documentation mentions

Based on usage frequency + v3 improvement value:

1. **`in` and `eq` with v3 syntax** — covers 74% of use cases, where every developer starts
2. **OR logic (`_or[index]`)** — high pent-up demand, strong before/after story
3. **`exists` / `!exists` with null/empty/undefined distinction** — widely used, confusing in v1/v2
4. **Completeness and count filters** — high doc ROI since usage is suppressed by discoverability
5. **Incremental sync with `last_days` / timestamp** — critical for integration patterns, underused relative to need
6. **Relationship filters** — technically available in v3, but only 43 accounts discovered it independently — needs prominent documentation

## Supporting data references

- API v3 test results: *Plytix API v3 Testing Report* (created by David)
- Filter usage analysis: *Client filter usage analysis* (An analysis of the API usage conducted last year, more product-focused)
- Customer feedback: *Feedback Export 24.08.2026* — 614 API-related entries extracted from all internal customer feedback logged between January 2025–August 2026
- Current v1 API docs: https://apidocs.plytix.com