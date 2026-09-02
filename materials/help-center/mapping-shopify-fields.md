---
title: Mapping Shopify Fields
source_url: https://help.plytix.com/en/mapping-shopify-fields
description: "A guide to mapping your Plytix attributes with Shopify fields"
---

# Mapping Shopify Fields

## A guide to mapping your Plytix attributes with Shopify fields

This guide will help you understand how to map your Plytix attributes to Shopify fields within the Plytix integration for Shopify. You'll learn what each Shopify field represents and how to configure your attribute mapping to seamlessly send product data to your Shopify store using our [Shopify channel.](https://help.plytix.com/en/shopify-connector)

ℹ️ Note that our mapping suggestions are based on what will work for the majority of setups, based on standard Shopify configurations. Some custom setups or unique product structures may require mapping adjustments; you can consult your Account Manager to determine if a different mapping approach would be more suitable.

 

[Product fields](#product)

[Option Name & Value](#options)

[Variant fields](#variant-fields)

_*Skip to any section in this article by clicking on the links above_

 

---

### Product fields

####  
 ************

****

****``

****

****

****

****``

****

****

****

****

****````************

`` ****

****``******** ****

****````````

****``

****

https://help.plytix.com/formula-cheat-sheet-and-guide****
`` ****

****

****````

****``

************

****************

********`` ****

****``

************

****

 ****

https://shopify.github.io/product-taxonomy/releases/2024-10/

****``**** [****](https://help.plytix.com/en/shopify-faq#collections)

****``

******** ****

****``

****

********

 ****

****``

********

****

 ****

****

**** ****

``````

********

https://help.plytix.com/formula-cheat-sheet-and-guide ****

****``

****

****``**** ****

****

****``````

****

****

****

``****

****``

****``````

****

********

****

__

****``

********

https://help.plytix.com/formula-cheat-sheet-and-guide

| Shopify Field | Description | Mapping Suggestions |
| --- | --- | --- |
| Title (required) | The main name for your product that is displayed to your customers
Example: Rover 14 Backpack | Match with a Short text attribute.The title is used to create your product handles if no custom handle is defined.The title has a maximum limit of 255 characters. |
| Handle | The product's unique identifier in Shopify.
Example: rover-14-backpack | Match with a Short text attribute.
When creating a new product from Plytix PIM and the handle is either left blank or unmatched, the handle will be automatically generated based on the attribute you matched to the Title field. If you sell on multiple stores, we recommend using a custom handle per store.
Handles have a maximum limit of 255 characters and only support lowercase, numbers, and hyphens. Special characters are not supported. |
| Handle Redirect | Determines whether Shopify should automatically create a redirect when a product's handle changes.
Accepted values: true, false | Match with a Dropdown, Multiselect, or Boolean attribute.When the mapped value is true on the product level, the system will automatically create a URL redirect from the old handle to the new one, if the product has been updated. |
| Description | A product description that supports HTML.
Example: A lightweight 14L backpack perfect for the back country. | Match with an HTML, Short text or Paragraph attribute. |
| Status | Indicates whether your product is ready to be sold (Active), not ready yet (Draft), no longer available to customers (Archived), or hidden from the storefront but purchasable via direct link (Unlisted).
Accepted values: active, draft, archived, unlisted
Example: active | Match with a Dropdown that contains the accepted values.
You can also use formulas to transform the Plytix Status system attribute into an acceptable Shopify format:DLOOKUP($STATUS, {"Draft": "draft", "Completed": "active", "Archived": "archived"}, "draft") |
| Published | A true/false field that controls whether your product is published to the sales channel(s) set in Published Scope.
Accepted values: true, false
Example: false | Match with a Boolean attribute, or a Short text or Dropdown attribute with the accepted values. 
Published and Published Scope work together: Published acts as the on/off switch, and Published Scope determines which channel(s) it switches.
If you're using the Published At field to schedule a product, make sure the Published field is mapped and set to true; otherwise, the scheduling won't work. |
| Custom Product Type | A custom categorization used for filtering and searching products.
Example: Sport Backpack | Typically matched with the system attribute Categories. Make sure to set your Category Path export settings to Last Child.
The maximum length for a custom product type is 255 characters.
Mapping the field to a blank attribute will remove the value from your product. |
| Standard Product Type | A categorization for the product based on Shopify's Standard Product Taxonomy.
Example: ap-2 (this value represents the category "Animals & Pet Supplies > Pet Supplies") | Match with a Short text attribute. |
| Collections | Adds products to a manual collection in Shopify.
Example: Best Sellers | Match with a Short text, Multiselect, Dropdown attribute. |
| Tags | A string of comma-separated keywords associated with your product used for filtering and search.
Example: 14L,Board Bag,Hydration | Match with a Multiselect attribute.
A product can have up to 250 tags. Each tag has a maximum limit of 255 characters.
Mapping the field to a blank attribute will remove the tags from your product. |
| Vendor | The name of the product's vendor
Example: Nitro | Match with a Short text or Dropdown attribute.
The maximum length for a vendor field is 255 characters.
Mapping the field to a blank attribute will assign the store name as a vendor. |
| Image Gallery | Images or videos related to the product. | Match with a Media Gallery attribute.
For parents and variants, the Image Gallery combines the parent's Featured Image and Image Gallery assets. To avoid showing variant images in the product media, ensure this field matches a media attribute with values only at the parent level. |
| Template Suffix | The suffix of the Liquid template used for the product page.
If this property is specified, the product page uses a template called product.suffix.liquid, where suffix is the value of this property. If this property is empty or null, the product page uses the default template product.liquid. | Match with a Short text or Dropdown attribute.
You can also create formulas with a string value defined. |
| Published at | The date and time (ISO 8601 format) when the product is scheduled to be published.
The date will display until it is reached or replaced with a new date. A past date publishes immediately when synced.Example: 2007-12-31T19:00:00-05:00 | Match with a Date attribute.
Ensure the Published field is mapped and set to true; otherwise, changes to the Published At field will not be applied. |
| Published scope | Specifies which sales channel(s) the Published field applies to. You can send default values for Shopify sales channels, or custom ones if you'd like to assign a product to custom sales channels such as Shop, Google, or YouTube.
Default accepted values: web, global, pos
web: Published applies to the Online Store channel only.
global: Published applies to both the Online Store and Point of Sale channels.
pos: Published applies to the Point of Sale channel only.
Leaving this field blank is treated the same as global: Published will apply to all sales channels.
Example: web
For custom channels, you can match it to the exact name of your channel in Shopify. Example: if the channel is named Shop, the value must be Shop, not shop. | Match with a Dropdown or Multiselect attribute that uses the accepted values.
Ensure the Published field is mapped; otherwise, changes to Published Scope will not be applied.For your custom sales channels, the value in the PIM must exactly match the sales channel name in Shopify (including case). |
| Option Name (1-3)
(Required to create variant products in your store) | The name of the product options your variants vary by, such as size, color, etc.
Example: Size | Match with a Short text or Dropdown attribute. 
You can also create formulas with a string value defined.
This value is shown over the available options in the Shopify store. The option names must be defined on the parent product.
You can add up to 3 options. |

####  

⚠️ Shopify has two image limitations to keep in mind: images can't exceed **20 megapixels**, and can't exceed **20 MB** in file size. Images outside either limit will fail to upload to Shopify. 

ℹ️ **How Published and Published Scope work together:**
- **Published** = `true`, scope blank → the product is published to all sales channels.
- **Published** = `true`, scope set to a specific channel (e.g. `pos`) → the product is published to that channel only.
- **Published** = `false`, scope set to a specific channel (e.g. `pos`) → the product is unpublished from that channel only, other channels are unaffected.

⚠️ Because **Published Scope** is overwritten on every sync when mapped, if you also manage sales channels manually in Shopify or with an automation tool like Shopify Flow, leaving this field unmapped is the safer option, so your manual changes aren't overwritten the next time you process the channel.

####  

⚠️ Neither **Option 1 Name** nor **Option 1 Value** should contain values on single products. If single products contain values in one of these fields, Shopify will attempt to create them as variable products.

---

### Variant Fields

 ************

****

********

****
__

****``````

************

**** ****

****

 ****

****``

******** ****

****``

********

 ****

****``

****

`` ****

****``

****

`` ****

****

****``

****

`` ****

****``

******** ****

****``

******** ****

****

****``

**** ****

****``******** ****

****````

****``******** ****

****``````

****

****

****

****``**** ****

****````

****

****

****``**** ****

****``

****``**** ****

****

****

**** ****

****````````

****``

****

******** ****

https://shopify.dev/api/storefront/2022-04/enums/countrycode

****``

******** ****

https://www.findhs.codes/?utm_campaign=Guru+Ask&utm_medium=Forum&utm_source=Social

****``

****

| Shopify Field | Description | Mapping Suggestions |
| --- | --- | --- |
| Featured image | The main image that identifies your product.
Mapping it ensures each product and variation has a unique featured image. | Match with a Media single attribute (eg your Thumbnail). |
| Option Value (1-3)(at least one required for variant products) | The values for the option names your products come in. 
Example: Small, Medium, Large | Match with a Short text, Multiselect, or Dropdown attribute.
The option values must be defined on all of your variant products.
These values can be up to 255 characters each. |
| Variant position | The order in which your variant options are shown on your product page | Match with an Integer type attribute.
If you choose to use a decimal type attribute, only the value before the decimal point will be used for sorting. |
| SKU | A unique identifier for the product variants in the store.
Required in order to connect to a fulfillment service.
Example: NITROROVER14 | Match with the SKU or another unique identifier in a Short text attribute. |
| Barcode | The barcode, UPC, or ISBN number for the product.
Example: 1234_pink | Match with a Short text attribute or the Plytix GTIN attribute.
Mapping the field to a blank attribute will remove the value from your product. |
| Price | The price of the product variant
Example: 199.00 | Match with a Decimal attribute with a dot separator.
You can also create a formula for special price configurations. The price cannot be blank for product creations.
Mapping the field to a blank attribute will not remove the price from your product, instead, the value needs to be set to 0. |
| Compare at price | The original price of the item before an adjustment or a sale.
Example: 299.00 | Match with a Decimal attribute with a dot separator.
You can also create a computed attribute for special price configurations.
Mapping the field to a blank attribute will not remove the price from your product, instead, the value needs to be set to 0. |
| Cost Per Item | The price that the item costs the seller (used along with Price for tracking profit margins). 
Example: 110.50 | Match with a decimal attribute.
Must be a positive number.
Mapping the field to a blank attribute will not remove the price from your product, instead, the value needs to be set to 0. |
| Unit pricing total amount | Defines the total quantity or volume of the product that is sold. Used to display the full product amount on Shopify (e.g. total volume or weight).Example: 210 | Match with an Integer attribute. |
| Unit pricing measure | Specifies the unit of measure for the total amount (e.g. ml, g, L, kg, oz).Example: ml | Match with a Dropdown or Short text |
| Unit pricing base amount | base amountDefines the base quantity used to calculate the unit price. This value is used by Shopify to display the "price per X" information on product pages.Example: 322 | Match with an Integer attribute. |
| Unit pricing base measure | Specifies the unit of measure for the base measure. It should match the unit used in Shopify's total amount unit.Example: ml | Match with a Dropdown or Short text attribute. |
| Taxable | Whether a tax is charged when the product variant is sold.
Accepted values: true, false
Example: true | Match with a Dropdown or Boolean attribute. |
| Inventory Management | The fulfillment service that tracks the number of items in stock for the product variant.
Accepted values: shopify, null, enabled, or the handle of a fulfillment service.
shopify: you are tracking inventory yourself using the admin.
null: you aren't tracking inventory on the variant.
enabled: this must be the same fulfillment service referenced by the fulfillment_service property.
Example: null | Match with a Dropdown attribute. |
| Inventory Policy | Whether customers are allowed to place an order for the product variant when it's out of stock.
Accepted values: deny, continue
deny: customers are not allowed to place orders for the product variant if it's out of stock. (default)
continue: customers are allowed to place orders for the product variant if it's out of stock.
Example: continue | Match with a Dropdown attribute that has the accepted values. |
| Fulfillment Service | The fulfillment service associated with the product variant.
Accepted values: manual, or the handle of a fulfillment service.
 
Example: manual | Match with a Dropdown attribute with the accepted values. |
| Weight | The weight of the product variant in the unit system specified in the weight unit field.
Example: "100" | Match with a decimal attribute. |
| Weight Unit | The unit of measurement that applies to the product variant's weight.
Accepted values: g, kg, oz, lb
Example: oz | Match with a Dropdown attribute that has the accepted values.
If you specify a value for Weight, you need to define a value for the Weight Unit field as well. |
| Country of Origin | A code designating a country or region according to this list.
Example: US | Match with a Short text or Dropdown attribute. |
| HS (Harmonized System) Code | A code between six and thirteen digits that is used for shipping products internationally which can be searched for here.
Example: 0902109015 | Match with a Short text attribute.
Depending on the country your products are shipped to, the length of your tariff code may differ.
Mapping the field to a blank attribute will remove the value from your product. |

####  

ℹ️ **Tax Code** is no longer available to map. This field was tied to Shopify's Avalara AvaTax app, which Shopify is phasing out. The **Taxable** field (true/false) is unaffected and remains fully supported.

ℹ️ Plytix currently supports up to **600 variants per product**. Your Shopify variant limit might be higher depending on your store subscription.

#### Variant Options Sorting

Assigning integer or decimal type attributes to the **Variant position** field can help you control the way that variant options appear in your Shopify store.

For example, if you want to sort the size options of a product, you can create an **Order** attribute that corresponds to these values (e.g. XS - 1, S - 2, M - 3, L - 4, XL - 5) and assign it to the **Variant position** field.

You may also choose to assign another attribute like **Price** or **Weight** to the **Variant position** field if you want your variant options ordered by one of these values. Click the **Settings** icon to the right of **Variant position** to choose ascending or descending sort logic.

![assign the 'variant position' attribute to variant options that you want displayed in a specific order](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Mapping%20Shopify%20Fields/Mapping%20Shopify%20Fields.png?width=670&name=Mapping%20Shopify%20Fields.png)

ℹ️ Note that the **Variant position** Shopify field can only be assigned to integer or decimal type attributes.

 

---

###  

### What's next?

- Learn how to [set up and manage a Shopify channel](https://help.plytix.com/en/shopify-connector)
- Learn how to[import from Shopify to Plytix](https://help.plytix.com/en/importing-a-shopify-csv-into-plytix)
- Learn about [formulas in Plytix](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Learn more about [attribute types](https://help.plytix.com/attribute-types)

---
