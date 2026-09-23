This is the proposed structure for the new Plytix API documentation site. Two tabs, Guides and API Reference, organized around the way developers actually integrate with Plytix rather than a flat endpoint list. Everything below is grounded in how the v3 API behaves today and the workflows Plytix developers build most often: ERP syncs, catalog exports, data-quality audits, and channel feeds.


🧭Expected Navigation Flow

What a successful quick win would look like to an user when following the docuemntation.


1. Overview → Learn what the Plytix API v3 is for and confirm this portal covers your use case.
2. Quickstart → Generate credentials, get a bearer token, and make your first call.
3. The Plytix Data Model → Understand how Products, Attributes, Categories, and Assets relate.
4. Filtering, Sorting & Pagination → Learn the query patterns for searching and paging through data.
5. Products (API Reference) → Look up the exact parameters for reading and writing product data.
6. Syncing Your ERP with Plytix → Apply the pattern to a real integration.


📘 Guides

Learning and task-oriented content: get a developer from zero to a working integration, then support the specific jobs they come back to do.

🚀 Get Started

* Overview (Concept): What the Plytix API is for, who it's for, and how this documentation relates to the Plytix Help Center.
* Quickstart (Tutorial): Generate an API key, exchange it for a bearer token, and make your first authenticated request.
* The Plytix Data Model (Concept): How Products, Attributes, Categories, Assets, and Relationships fit together.
* Migrating to v3 (How-to Guide): Step-by-step guide for teams moving an existing v1/v2 integration to v3, covering auth changes, endpoint mapping, and breaking differences.
    * Migration Reference (Reference): Side-by-side technical comparison of endpoints, request shapes, and response conventions across versions.


🔗 Integration Guides

* Syncing Your ERP with Plytix (How-to Guide): Read product data from Plytix and push updates back, keeping both systems in sync.
* Exporting Your Full Catalog (How-to Guide): Pull your entire catalog, with attributes and assets, in one paginated operation.
* Auditing Product Data Quality with Filters (How-to Guide): Find products with missing images, empty descriptions, or incomplete data before it reaches a channel.
* Build a marketplace-specific product feed (How-to Guide): Filter and shape a product set for a specific channel or marketplace.
* Safely Removing Categories, Assets, or Relationships from a Product (How-to Guide): The right way to unassign a category, asset, or relationship without affecting the rest of the product.
* Reconstructing Parent/Variant Hierarchies (How-to Guide): Retrieve a parent product together with its variants in one structured call.
* Bulk Operations for Large Catalogs (How-to Guide): Create or update large batches of products in a single job, with per-item results.
* Getting Notified: Webhooks & Automations (Concept): How to hear about changes in your Plytix account as they happen.

🤖 Plytix MCPs

* Documentation MCP (How-to Guide): Connect Claude, Cursor, VS Code, or any MCP-compatible AI assistant to Plytix's documentation.
* Plytix Platform MCP (Concept / Parent Page): What the Plytix Platform MCP is, how it differs from the Documentation MCP, and what agents can do with it.
    * Authentication & OAuth Setup (How-to Guide): Authorize an AI assistant or agent to act on a Plytix account via OAuth.
    * Supported Clients (Reference): Which AI assistants and agent frameworks are compatible with the Plytix Platform MCP.
    * Available Tools (Reference): The full set of platform tools exposed through the MCP (e.g., product search, catalog queries).
    * Permissions & Security Considerations (Reference): Required OAuth scopes, access boundaries, and security guidance.
    * Practical Examples (How-to Guide): Common agent workflows built on top of the Plytix Platform MCP.


📚 API Reference

Covering authentication, conventions, errors, limits, query syntax, and one page per resource.

📐 Overview 

* API Reference Overview (Concept): How this tab is organized and how it relates to the Guides.
* Authentication (Reference): Bearer-token request and response shapes, and how long a token stays valid.
* Errors and Status Codes (Reference): The status codes and error response shapes you'll see across the API.
* Rate Limits (Reference): How rate limits work and where to find the limits for your plan.
* Filtering and Query Syntax Reference (Reference): The full set of filter operators, grouping, and related-entity filtering.
* Pagination Reference (Reference): How to page through large result sets.
* Working with Updates and Deletes (Reference): A resource-by-resource reference for which update and delete operations are available.

📦 Endpoints

One reference page per endpoints divided into resources, each with full parameters, request/response schemas, and examples.

* Products
* Assets
* Product Categories
* Asset Categories
* Asset Lists
* Relationships
*  Product Families
* Product Attributes
* Product Attribute Groups
* PIM Product Lists
* Channels
* Connections
* Ecatalogs
* Import Profiles
* PDF Catalogs
* Product Family Models

🗂️ Legacy API v1/v2 (Version Selector)

