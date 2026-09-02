---
title: Mapping BigCommerce Fields
source_url: https://help.plytix.com/en/mapping-bigcommerce-fields
description: "A guide to mapping your Plytix attributes with BigCommerce fields"
---

# Mapping BigCommerce Fields

## A guide to mapping your Plytix attributes with BigCommerce fields

With Plytix, you can create and update products in your BigCommerce store without needing to manually import a file into your BigCommerce account. Make sure all your information is up to date by matching BigCommerce fields with your Plytix attributes. In this article, you'll learn what each BigCommerce field is and how to map it.

ℹ️ If you'd like to get access to Plytix's BigCommerce channel, please contact your Account Manager.

[Parent-Level vs. Variant-Level Fields](#parent-vs-variant)

[Basic Product Information](#basic-product-info)

[Product Categories](#product-categories)

[Product Identifiers](#product-identifiers)

[Pricing, Purchasing and Inventory Options](#pricing-purchasing-inventory)

[Storefront and SEO Details](#storefront-seo)

[Variant Options](#variant-options)

 

_*Skip to any section in this article by clicking on the links above_

---

### Parent-Level vs. Variant-Level Fields

Some BigCommerce fields must be mapped at the parent level, and others at the variant level. Mapping a field at the wrong level is a common cause of data that looks fine in Plytix but syncs incorrectly, or silently doesn't sync at all.

**Variant-level fields**: SKU, Price, Cost Price, MSRP, Sale Price, Weight, Width, Height, Depth, Inventory Level, Inventory Warning Level, UPC/EAN, GTIN, MPN, BPN, Variant Image, and all Option Value fields.

**Parent-level fields**: Product Name, Product Type, Description, Categories, Brand, Inventory Tracking, Visibility, Featured Product, Availability, Condition, Warranty, Sort Order, Search Keywords, all SEO and Preorder fields, Images, Videos, custom fields, and all Option Name and Option Type fields.

ℹ️ BigCommerce inherits variant-level dimensions and prices from the parent when the variant's value is null. An unmapped variant weight is fine, since BigCommerce falls back to the parent's value, but a weight field that's **mapped and left empty** sends `0` instead, which can overwrite a real weight. Double-check your weight data before your first sync.

ℹ️ Description is a parent-level field. Displaying different descriptions per variant isn't something the connector supports, it would require custom theme work on BigCommerce's end.

### Basic Product Information

This section contains the basic information of the products you're creating in your BigCommerce store. Required fields are highlighted in this article and have a `*` next to them in your Plytix channel.

****

****

****

****

****

****``

****

****````

****``

****

****

****``

****

****

****``

****

****``

****

****``

****

****

****

****

``

| BigCommerce Field | Description | Mapping Suggestions |
| --- | --- | --- |
| Product Name* (required) | The title of your product. Must be unique to each product.Maximum length: 255 charactersExample: Glass Fish Bowl | Match it with a text attribute. |
| Product Type* (required) | Physical (for a physical stock unit) or digital (for a digital download).Accepted values: physical or digital (must be lowercase)Example: physical | Match it with a text or Dropdown attribute. |
| Price* (required) | Your default product price. Includes or excludes tax based on your store's settings.Note: if using decimals, use a period as the decimal separator, with no more than two decimal places.Example: 15.99 | Match it with an Integer or Decimal attribute. |
| Brand | Your product or manufacturer brand. If a brand doesn't already exist, a blank one is created automatically.Maximum length: 250 charactersExample: Nike | Match with a text attribute. |
| Description | The product description.
Example: Everyday wear t-shirt, available in three color options. | Match it with a text attribute. |
| Weight | Required for creating physical products.Example: 1.5 | Match it with an Integer or Decimal attribute.
Do not include units.
Note: If the weight field is mapped but a product has no value, a default of 0 will be sent. Check your weight data before syncing to avoid creating or overwriting products with "0" weight. |
| Images | Your product image gallery. | Match it with a Media Gallery attribute. |
| Variant Image | Your variant’s main image. | Match with a Media Single attribute. |
| Videos | Video ID.When uploading a video from YouTube, the video ID is the part right after v= in your video URL. | Match with a Short Text attribute. |

Consult the [BigCommerce guidelines](https://support.bigcommerce.com/s/?language=en_US) for image and video requirements. Unsupported file types won't upload.

⚠️ Brand matching is fuzzy: "Common Good" and "Common good" are treated as the same brand. If no matching brand exists, BigCommerce creates one automatically by name only, even if the value is blank, but it won't have a URL slug generated for it.

⚠️ Only one video can be added per product.

---

### Product Categories

This is where you include your product taxonomy.

****

****

****

****

****

| BigCommerce Field | Description | Mapping Suggestions |
| --- | --- | --- |
| Categories | Product categories for your connected storefront. | Can only be matched with the Categories system attribute. |

**Format**: `category_id;parent_id;category_name`, with a maximum of 250 array items. BigCommerce rejects values over 1,000. Category names have a maximum length of 50 characters. BigCommerce has no mandated taxonomy, so your category tree is fully merchant-defined.

ℹ️ You can only map one category tree per BigCommerce channel.

⚠️ **Syncing categories overwrites, it doesn't merge.** Sending a category array on an update replaces all of that product's existing categories, a partial list removes the rest. Syncing categories also replaces any category images uploaded directly in the BigCommerce backend, so avoid managing category images there if you're syncing categories from Plytix.

---

### Product Identifiers

Different ways to identify your products in your store.

 

****

****

****

****

****

****

****

****

****

****

****

| BigCommerce Field | Description | Mapping Suggestions |
| --- | --- | --- |
| SKU | Your product’s unique identifier. Required for products with variants.Maximum length: 255 characters. | Match with your Plytix SKU or other unique attribute. |
| MPN | Manufacturer Part Number | Match it with a Text or Integer attribute. |
| UPC/EAN | Universal Product Code/European Article Number
Maximum length: 32 characters. | Match it with a Short Text or Integer attribute. |
| GTIN | The Global Trade Item Number | Match it with a Text or Integer attribute type |
| BPN | Bin Picking Number
Maximum length: 255 characters | Match it with a Text or Integer attribute. |

###  

ℹ️ The BigCommerce product ID that Plytix uses internally to match products (based on title and SKU) can't be mapped as a Plytix attribute.

### Pricing, Purchasing and Inventory Options

Information about your products' selling prices, costs, and available purchasing and tracking options.

****

****

****

****

****

****``

****

****

****``

****

****``

****

****

****

****

````````

****``

****

****``

****

****````

``

****

****``

****

****``

****

****``

****

****``````

****

****

****``

****

****

****

****``

****

``

****

****``

****

****``

****

**
**``

****

``

****````

****

****``

****

````****``

****````

****

**
**``````
**
**``

****

****````

****

**
**``````
**
**``

****

****``

****

****``

| BigCommerce Field | Description | Mapping Suggestions |
| --- | --- | --- |
| Cost Price | The cost price of the product. Stored for reference only, not used or displayed anywhere on the store.Note: Do not include units. 
Example: 20.99 | Match it with an Integer or Decimal attribute. |
| Sales Price | Replaces the base price, if definedNote: Do not include units. 
Example: 25.99 | Match it with an Integer or Decimal attribute. |
| MSRP | Retail price. If entered, it appears next to your Sales price.
Example: 32.99 | Match it with an Integer or Decimal attribute. |
| Tax Class | The tax applied to a product, configured in BigCommerce under Settings → Tax → Tax Classes.
Maximum length: 255 characters
Accepted default values: Default Tax Class, Non-taxable, Shipping, Gift Wrapping. You can also create custom tax classes, so accepted values may vary by store. | Match it with a Short Text or Dropdown attribute. |
| Tax Class ID | The numeric ID of the tax class assigned to the product.Default values: 0 Default Tax Class, 1 Non-taxable, 2 Shipping, 3 Gift Wrapping. Additional custom tax classes may exist.Example: 1 | Match it with an Integer attribute. |
| Shipping Price | Your product's shipping cost.
Example: 5.99 | Match it with an Integer or Decimal attribute. |
| Free Shipping | Accepted values: true, false. Overwrites any fixed shipping price if set to true. | Match with a Boolean attribute. |
| Width | Your product's width for calculating shipping.
Example: 2.3 | Match with an Integer or Decimal attribute. |
| Height | Your product's height for calculating shipping.
Example: 1.5 | Match with an Integer or Decimal attribute. |
| Depth | Your product's depth for calculating shipping.
Example: 0.3 | Match with an Integer or Decimal attribute. |
| Availability | Accepted values: available, disabled, preorder (must be lowercase). | Match it with a Dropdown attribute. |
| Availability Text | Availability text shown on the checkout page, under the product title.
Maximum length: 255 characters
Example: Usually ships in 24 hours | Match it with a Text attribute. |
| Preorder Only | Only match this field if you want to enable preorder only for your products. | Match with a Boolean attribute. |
| Preorder Release Date | Date format: YYYY-MM-DD
Example: 2024-04-15 | Match with a Date attribute. |
| Preorder Message | Message shown when a release date is specified for a preorder product. Supports the %%DATE%% placeholder to automatically insert the release date.Maximum length: 255 charactersExample: This item is available for preorder until %%DATE%%. | Match with a Text or HTML attribute. |
| Min Order Quantity | The minimum quantity an order must contain to purchase this product.Example: 3 | Match with an Integer attribute. |
| Max Order Quantity | The maximum quantity an order can contain when purchasing this product.Example: 10 | Match with an Integer attribute. |
| Purchasing Disabled | Applies to variants. If true, this variant won't be purchasable on the storefront.
Accepted values: true, false | Match with a Boolean attribute. |
| Call for Pricing | Custom information for products with disabled purchasing.Example: This item is only available for purchase upon customized order. Please contact our Help Desk for more information. | Match it with a Text attribute. |
| Price Hidden | false by default, meaning the product's price shows on the product page. If true, the price is hidden. If the price is hidden,Availability must also be set to disabled.Accepted values: true, false | Match with a Boolean attribute. |
| Condition | Your product's condition.Accepted values: New, Used, Refurbished (capitalized).Example: New | Match with a Dropdown attribute. |
| Show Condition | Whether the product condition is shown to the customer on the product page.Accepted values: true, false | Match with a Boolean attribute. |
| Inventory Tracking | The type of inventory tracking for the product.Accepted values: product, variant, noneExample: variant | Match with a Dropdown attribute. |
| Inventory Level | Current inventory level of the product.Example: 430 | Match with an Integer attribute. |
| Inventory Warning Level | Inventory warning level. When inventory drops below this, the store owner is notified.Example: 100 | Match with an Integer attribute. |

 

ℹ️ When using decimals for price fields, use a period as the decimal separator and no more than two decimal places, e.g. `5.99`.

⚠️ **Tax Class ID is ignored entirely if automatic tax calculation is enabled in your store.**

⚠️ Inventory tracking values aren't automatically adjusted if a single product is later converted into a parent product, double-check this setting after restructuring a product.

💡 To display a price range on a parent product, set a **Sale Price** on each variant individually, BigCommerce automatically displays the range on the parent, no custom setup needed.

⚠️ **Currently, mapping the Price field can overwrite BigCommerce price lists.** BigCommerce price lists sit as a separate layer above the base catalog price, and syncing a mapped price can clear a price-list-specific price for that product. If you use BigCommerce price lists (common for B2B or wholesale pricing), review this carefully with your Account Manager before syncing, since there's currently no way to sync a base price without potentially affecting price lists.

---

### Storefront and SEO details

Customize some aspects of how your products will be displayed as well as search engine fields. 

****

****

****

****

****````

****

****````

****

****``

****

****``

****

**
**``

****

****

****

****

****``

****

****``

****

| BigCommerce Field | Description | Mapping Suggestions |
| --- | --- | --- |
| Visibility | Show or hide products from customers in your store.Accepted values: true, false | Match with a Boolean attribute. |
| Featured Product | Set as a featured product on your storefront.
Accepted values: true, false | Match with a Boolean attribute. |
| Search Keywords | Comma-separated keywords for your store's search.
Example: t-shirt, unisex, plytix | Match with a Multiselect attribute. |
| Warranty | Warranty information displayed on the product page. Can include HTML formatting.
Example: This product includes free warranty and returns for the first 2 years. | Match with a Text or HTML attribute. |
| Sort Order | Priority for this product in category pages and search results. Lower integers place it closer to the top.Example: 5 | Match with an Integer attribute, since it must be a whole number. |
| Url | Custom product URL on the storefront.Maximum limit: 200 characters
If unmapped, BigCommerce generates one automatically. | Match with a Short Text, HTML, or URL attribute. |
| Page Title | Your product's page title, overrides the product name if defined.
Maximum limit: 255 characters
Example: New Collection, T-Shirts | Match with a Short Text attribute. |
| Meta Description | Custom meta description for the product page.Example: The latest releases of Plytix's t-shirt line. | Match with a Text or HTML attribute. |
| Meta Keywords | Comma-separated custom meta keywords for the product page. If undefined, the store's default keywords are used. | Match with a Multiselect attribute. |

ℹ️ Relative URLs in HTML fields like Description (e.g. `href="/content/specs/file.pdf"`) work fine on your live storefront, but can break when previewed inside Plytix, since they resolve against whichever host renders the page. This isn't a connector issue, use fully qualified, absolute URLs (starting with `https://`) in your HTML content to avoid this.

 

---

### Variant Options

Add information about your variant options to create variant products in your store.

****

****

****

****

****

****``

****

****

****``

****

****

**``**

****

****

****````````

****

****

****

| BigCommerce Field | Description | Mapping Suggestions |
| --- | --- | --- |
| Option Name 1 | Mandatory for products with 1 or more options.
Maximum length: 255 characters
Example: Size | Match with a text attribute. |
| Option Value 1 | Mandatory for products with 1 or more options.
Maximum length: 255 characters
Example: Small | Match with a text or dropdown attribute. |
| Option Default 1 | 1The variant a customer lands on by default when viewing your product.
Example: Large | Set at the parent level. For example, if your options vary by size and you want the default to be Large, send this on the parent product. |
| Option Type 1 | Type of element representing the option on the storefront.Accepted values: radio_buttons, rectangles, dropdown, swatch | Match with a text, HTML, or dropdown attribute. |
| Option Swatch 1 | Accepted formats: up to 3 hex color codes (comma-separated), or an image URL. | Match with a text, paragraph, HTML, or URL attribute. |
| Option Sorting 1 | Set your options' display order by sending a numerical value. | Match with an Integer or Decimal attribute. |

To send variant products, specify your variant options across these fields: Option Name, Option Value, Option Type, and optionally Option Swatch.

⚠️ If you're sending parent and variant products, make sure **Option Name** and **Option Type** are defined at the **parent level**, and **Option Value** is defined on **every variant**.

These options refer to what your variants vary by, for example, color, size, and weight would be three separate variant option fields. Plytix's BigCommerce integration supports up to 5 variant option fields.

⚠️ If you're sending single (non-variant) products, make sure none of the option fields carry any values.

💡 The swatch field is only used when **Option Type** is set to `swatch`, it's ignored for the other option types. A swatch mapped to an image URL is supported (shown as BigCommerce's "Pattern" type), but a single swatch field can only reference one image, comma-separated multiple image URLs aren't currently supported for swatches.

ℹ️ Whether a swatch shows a text label on hover is controlled by your BigCommerce theme settings, not by the connector.

💡 To control option display order with a formula instead of a static number, you can use a `DLOOKUP` formula mapped to **Option Sorting** to assign sort values based on another attribute.

---

### What's next? 

- Learn how to[connect Plytix to your BigCommerce store](https://help.plytix.com/en/connecting-plytix-to-your-bigcommerce-store)
- Learn how to [manage your BigCommerce channel](https://help.plytix.com/en/managing-bigcommerce-channel) 
- Learn how to [create different channels](https://help.plytix.com/en/creating-a-channel) for syndication

---
