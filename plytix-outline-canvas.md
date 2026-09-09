# Plytix API Documentation: Proposed Outline

This is the proposed structure for the new Plytix API documentation site: two tabs, Guides and API Reference, organized around the way developers actually integrate with Plytix rather than a flat endpoint list. Everything below is grounded in how the v3 API behaves today and the workflows Plytix developers build most often: ERP syncs, catalog exports, data-quality audits, and channel feeds.


## 🧭Expected Navigation Flow

What a successful quick win would look like to an user when following the docuemntation.

1. **Choosing Between v1/v2 and v3** → Confirm which API version to use for the task at hand.
1. **Quickstart** → Generate credentials, get a bearer token, and make your first call.
2. **The Plytix Data Model** → Understand how Products, Attributes, Categories, and Assets relate.
3. **Filtering, Sorting & Pagination** → Learn the query patterns for searching and paging through data.
4. **Products** (API Reference) → Look up the exact parameters for reading and writing product data.
6. **Syncing Your ERP with Plytix** → Apply the pattern to a real integration.
---

## 📘 Guides

Learning- and task-oriented content: get a developer from zero to a working integration, then support the specific jobs they come back to do.

### 🚀 Get Started

* **Overview** *(Concept)*: What the Plytix API is for, who it's for, and how this documentation relates to the Plytix Help Center.
* **Quickstart** *(Tutorial)*: Generate an API key, exchange it for a bearer token, and make your first authenticated request.
* **The Plytix Data Model** *(Concept)*: How Products, Attributes, Categories, Assets, and Relationships fit together.
* **Choosing Between v1/v2 and v3** *(Concept)*: Which API version to use for which workflow today, and what's changing as v3 grows.

### 🧩 Core Concepts

* **Filtering, Sorting & Pagination** *(Concept)*: The everyday query patterns (`in`, `eq`, `exists`, `like`) plus the OR-logic that replaces the multi-filter workarounds many teams use today.
* **Response & Error Conventions** *(Concept)*: How to read a Plytix API response, and what to expect when something goes wrong.
* **Working with Relationships, Categories & Assets on a Product** *(Concept)*: How related data expands automatically, and how to discover a resource's available fields.
* **Updating and Deleting Resources** *(Concept)*: How create, update, and delete work consistently across resources.
* **Static & Smart List Membership** *(Concept)*: How list membership works, and how to add or remove products and assets from a list.

### 🔗 Integration Guides

* **Syncing Your ERP with Plytix** *(How-to Guide)*: Read product data from Plytix and push updates back, keeping both systems in sync.
* **Exporting Your Full Catalog** *(How-to Guide)*: Pull your entire catalog, with attributes and assets, in one paginated operation.
* **Auditing Product Data Quality with Filters** *(How-to Guide)*: Find products with missing images, empty descriptions, or incomplete data before it reaches a channel.
* **Building Channel-Specific Product Feeds** *(How-to Guide)*: Filter and shape a product set for a specific channel or marketplace.
* **Safely Removing Categories, Assets, or Relationships from a Product** *(How-to Guide)*: The right way to unassign a category, asset, or relationship without affecting the rest of the product.
* **Reconstructing Parent/Variant Hierarchies** *(How-to Guide)*: Retrieve a parent product together with its variants in one structured call.
* **Bulk Operations for Large Catalogs** *(How-to Guide)*: Create or update large batches of products in a single job, with per-item results.
* **Getting Notified: Webhooks & Automations** *(Concept)*: How to hear about changes in your Plytix account as they happen.

### 🤖 Plytix MCP

* **What Is the Plytix MCP?** *(Concept)*: What an MCP-connected AI assistant can do with your Plytix account.
* **Setting Up the Plytix MCP** *(How-to Guide)*: Connect an MCP client to your Plytix account.
* **Available Tools & Supported Clients** *(Reference)*: The MCP's tool surface and which AI clients are supported.
* **MCP Examples & Common Use Cases** *(How-to Guide)*: Worked examples, like curating a catalog through an AI assistant.

---

## 📚 API Reference

Precise, exhaustive technical reference: authentication, conventions, errors, limits, query syntax, and one page per resource.

### 📐 Overview & Conventions

* **API Reference Overview** *(Concept)*: How this tab is organized and how it relates to the Guides.
* **Authentication** *(Reference)*: Bearer-token request and response shapes, and how long a token stays valid.
* **Errors & Status Codes** *(Reference)*: The status codes and error response shapes you'll see across the API.
* **Rate Limits** *(Reference)*: How rate limits work and where to find the limits for your plan.
* **Filtering & Query Syntax Reference** *(Reference)*: The full set of filter operators, grouping, and related-entity filtering.
* **Pagination Reference** *(Reference)*: How to page through large result sets.
* **Working with Updates and Deletes** *(Reference)*: A resource-by-resource reference for which update and delete operations are available.

### 📦 Resources

*(Reference)*: One reference page per resource (Products, Assets, Product Categories, Asset Categories, Asset Lists, Relationships, Product Families, Product Attributes, Product Attribute Groups, PIM Product Lists, Channels, Connections, Ecatalogs, Import Profiles, PDF Catalogs, and Product Family Models), each with full parameters, request/response schemas, and examples.

### 🗂️ Legacy API (v1/v2)

* **API v1/v2 Reference** *(Reference)*: Endpoint reference for teams still integrating against v1/v2, alongside guidance on moving to v3 over time.

---

