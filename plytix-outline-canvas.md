Outline (Plytix )This is the proposed structure for the new Plytix API documentation site. Two tabs, Guides and API Reference, organized around the way developers actually integrate with Plytix rather than a flat endpoint list. Everything below is grounded in how the v3 API behaves today and the workflows Plytix developers build most often: ERP syncs, catalog exports, data-quality audits, and channel feeds.


🧭Expected Navigation Flow

What a successful quick win would look like to an user when following the docuemntation.


1. Choosing Between v1/v2 and v3 → Confirm which API version to use for the task at hand.
2. Quickstart → Generate credentials, get a bearer token, and make your first call.
3. The Plytix Data Model → Understand how Products, Attributes, Categories, and Assets relate.
4. Filtering, Sorting & Pagination → Learn the query patterns for searching and paging through data.
5. Products (API Reference) → Look up the exact parameters for reading and writing product data.
6. Syncing Your ERP with Plytix → Apply the pattern to a real integration.


---

Guides

Learning- and task-oriented content: get a developer from zero to a working integration, then support the specific jobs they come back to do.


Get Started

* Overview (Concept): What the Plytix API is for, who it's for, and how this documentation relates to the Plytix Help Center.
* Quickstart (Tutorial): Generate an API key, exchange it for a bearer token, and make your first authenticated request.
* The Plytix Data Model (Concept): How Products, Attributes, Categories, Assets, and Relationships fit together.
* Choosing Between v1/v2 and v3 (Concept): Which API version to use for which workflow today, and what's changing as v3 grows.

Plytix MCP

* Set Up the Plytix MCP (How-to Guide): Connect Claude, Cursor, VS Code, or any MCP-compatible AI assistant to Plytix's documentation.

Integration Guides

* Syncing Your ERP with Plytix (How-to Guide): Read product data from Plytix and push updates back, keeping both systems in sync.
* Exporting Your Full Catalog (How-to Guide): Pull your entire catalog, with attributes and assets, in one paginated operation.
* Auditing Product Data Quality with Filters (How-to Guide): Find products with missing images, empty descriptions, or incomplete data before it reaches a channel.
* Build a marketplace-specific product feed (How-to Guide): Filter and shape a product set for a specific channel or marketplace.
* Safely Removing Categories, Assets, or Relationships from a Product (How-to Guide): The right way to unassign a category, asset, or relationship without affecting the rest of the product.
* Reconstructing Parent/Variant Hierarchies (How-to Guide): Retrieve a parent product together with its variants in one structured call.
* Bulk Operations for Large Catalogs (How-to Guide): Create or update large batches of products in a single job, with per-item results.
* Getting Notified: Webhooks & Automations (Concept): Clarifies that v3 exposes no event-subscription API for product/catalog changes — covers the two things that do exist today (a callback URL on channel-processing jobs, and UI-only Automations), and flags broader webhook support as roadmap, not current.


API Reference

Covering authentication, conventions, errors, limits, query syntax, and one page per resource.

Overview 

* API Reference Overview (Concept): How this tab is organized and how it relates to the Guides.
* Authentication (Reference): Bearer-token request and response shapes, and how long a token stays valid.
* Errors and Status Codes (Reference): The status codes and error response shapes you'll see across the API.
* Rate Limits (Reference): How rate limits work and where to find the limits for your plan.
* Filtering and Query Syntax Reference (Reference): The full set of filter operators, grouping, and related-entity filtering.
* Pagination Reference (Reference): How to page through large result sets.
* Working with Updates and Deletes (Reference): A resource-by-resource reference for which update and delete operations are available.

Resources

(Reference): One reference page per resource (Products, Assets, Product Categories, Asset Categories, Asset Lists, Relationships, Product Families, Product Attributes, Product Attribute Groups, PIM Product Lists, Channels, Connections, Ecatalogs, Import Profiles, PDF Catalogs, and Product Family Models), each with full parameters, request/response schemas, and examples.


Legacy API (v1/v2)

* API v1/v2 Reference (Reference): Endpoint reference for teams still integrating against v1/v2, alongside guidance on moving to v3 over time.

---

## Sources & Corrections

**Sources used:**
- Existing documentation: `materials/help-center/` scrape (end-user help center) and Plytix's internal roadmap notes shared by David Alarcón.
- Raw source materials: `API V3.md`, `openapi_pimv3.json`, kickoff/internal-sync transcripts under `materials/transcripts/`.
- Verified/live findings: live `curl` testing against `/channels` (documented in `building-marketplace-specific-product-feeds.mdx`).
- Client feedback: David Alarcón's 2026-09-18 Slack reply questioning the scope of "Getting Notified: Webhooks & Automations" and "Building Channel-Specific Product Feeds."

**Corrections carried into this outline:**
- "Building Channel-Specific Product Feeds" implied Channels are a stable, documented API surface → renamed to "Build a marketplace-specific product feed." Live testing confirmed `GET`/`POST`/`PATCH`/`DELETE` on `/channels` work today, contradicting Plytix's own roadmap notes, which describe Channels as UI-only with an upcoming "Destinations" feature as the real API-facing path. Flagged in-page as subject to change once Destinations ships. Affects: `building-marketplace-specific-product-feeds.mdx`.
- "Getting Notified: Webhooks & Automations" implied v3 exposes event subscriptions for product/catalog changes and Automations management → corrected. Per `API V3.md`/`openapi_pimv3.json`, the only webhook surface is an optional callback (`webhook_url`/`webhook_headers`/`webhook_body`) tied to channel-processing jobs; Automations are UI-only with no create/read/trigger endpoints. The kickoff transcript (Ksenija Rybe, `kickoff-1.md`) confirms broader webhook support is planned "in the next months," not shipped. Affects: `getting-notified-webhooks-and-automations.mdx`.

