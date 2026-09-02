---
title: Using Shopify with Plytix - FAQ
source_url: https://help.plytix.com/en/shopify-faq
description: "Frequently asked questions about connecting Plytix to your Shopify store"
---

# Using Shopify with Plytix - FAQ

## Frequently asked questions about connecting Plytix to your Shopify store

[General Information](#general-information)
- [What is the Shopify channel in Plytix?](#intro-to-shopify)
- [How does Plytix’s Shopify connection work?](#how-it-works)
- [Can I connect multiple Shopify stores to one Plytix account?](#multiple-stores)
- [Can I send product variants from Plytix to Shopify?](#variants)
- [Can I send digital assets from Plytix to Shopify?](#assets)

[Settings and Configuration](#settings)
-  [How are collections handled in Plytix?](#collections)
- [Can I send inventory or stock information through the connector?](#inventory)
- [Does Plytix support all types of metafields in Shopify?](#metafields)
- [What happens if there's an error during the sync?](#sync-error)

[Troubleshooting and Support](#troubleshooting)
- [How is the handle field managed in the connector when creating or updating products?](#create-product)
- [Using an Attribute Transformation in the handle field](#attribute-tranformation-handle)
- [Why am I getting a Shopify error related to pixel limit?](#pixel-limit)
- [Why does my product show that it was “Skipped” in the process log?](#skipped-action)
- [In Shopify, under the inventory section, I can uncheck the "Continue selling when out of stock" option. How can I configure it in Plytix so that this option doesn't get toggled on when products are out of stock?](#out-of-stock)
- [Why is my Shopify sync taking so long?](#sync-times)
- [Why am I receiving an invalid URL error?](#invalid-url)
- [Why am I receiving the error "already used in automated collections"?](#automated-collections)
- [How do I set up sales or promotions for my Shopify store?](#promotional-pricing)
- [How can I map an SEO title and description to my products using metafields?](#seo-metafield)

_*Skip to any section in this article by clicking on the links above_

---

### General Information

#### **What is the Shopify channel in Plytix?**

The Shopify channel allows you to directly sync product data between Plytix and Shopify without needing to manually create or update feeds in your Shopify store. This integration ensures product creation, updates, and organization is automatically sent from Plytix to Shopify.

#### How does Plytix's Shopify channel work?

Plytix syncs product data with Shopify via the GraphQL API. It’s a one-way sync, meaning product data is sent from Plytix to Shopify, but Shopify data is not pulled back into Plytix. This ensures accurate product information is maintained in your Shopify store.

#### **Can I connect multiple Shopify stores to one Plytix account?**

Yes, Plytix allows you to connect multiple Shopify stores to a single account. You can add a Shopify channel for each store, making it easy to manage multiple connections from one location.

#### **Can I map product variants to Shopify?**

Yes, Plytix supports the mapping of variants to Shopify. You must define at least one option (e.g., "Color" or "Size") at the parent level and the corresponding values (e.g., "Red" or "Large") at the variant level for the connector to create product variants in Shopify. 

ℹ️ For more information on how to send product variants from Plytix to Shopify, check out our [mapping guide](https://help.plytix.com/en/mapping-shopify-fields#options).

#### **Can I send digital assets from Plytix to Shopify?**

Yes, you can manage your digital assets in Plytix and link them to your products. These assets will then be sent to Shopify during the sync process.

In Plytix, the assets you send to Shopify are stored using their **Shopify asset IDs**—so that,   whenever you modify the images sent to your Shopify store (such as reordering or adding images in your media gallery, or replacing your assets), changes are quickly updated with every sync. 

**This means that:**
- Syncing assets to your store is faster
- Your metadata will be preserved: Alt text** **and other Shopify information related to your digital files will remain intact on assets inside Shopify

---

### **Settings and Configuration**

#### ** **How are collections handled in Plytix?

You can create collections within Plytix and map them to Shopify. Then, you can manage them within Shopify for actions such as customizing the sorting of products within collections.

#### Can I send inventory or stock information through the connector?

While Plytix doesn't manage stock levels in Shopify, you can map inventory-related fields like "Inventory Management" and "Inventory Policy" to ensure accurate stock information is reflected in Shopify.

#### Does Plytix support all types of metafields in Shopify?

Plytix supports many types of metafields, but there are some limitations. For example, we don't support reference metafields (e.g., product or variant references). You can create and manage metafields in Plytix, which will sync to Shopify if the metafield type is supported.

ℹ️ Learn more about [syncing metafields from Plytix to Shopify](https://help.plytix.com/en/shopify-metafields). 

#### What happens if there's an error during the sync?

If an error occurs during the sync, you’ll see it in the Process Log. Each error will provide details on how to fix it, so you can reprocess the channel. Products with errors aren't cached and can slow down future syncs, so it's highly recommended to review and fix any errors before processing your channel again.

ℹ️ Learn more about [how to optimize your channel processing](https://help.plytix.com/en/processing-a-shopify-channel).

---

### **Troubleshooting and Support**

#### How is the handle field managed in the connector when creating or updating products?

**1. Creating a Product**

-  Handle attribute is mapped and blank:

We create the product in Shopify and automatically retrieve the generated handle from Shopify.

The mapped attribute in Plytix gets populated with this handle.

-  Handle attribute is mapped and has a value:

We send this custom handle to Shopify when creating the product.

Shopify creates the product using your custom handle.

-  Handle attribute is not mapped:

We still create the product.

Shopify generates a handle based on the product title.

No handle is retrieved or stored in Plytix.

**2. Updating a Product**
- Handle attribute is mapped and blank:

We do not send the blank value to Shopify.

The existing handle in Shopify remains unchanged.

- Handle attribute is mapped and has a value:

We send this updated handle to Shopify and overwrite the existing one.

- Handle attribute is not mapped:

The handle is not retrieved or updated.

After a product is created, we do not retrieve the handle again in any subsequent sync.

####
**Using an Attribute Transformation in the Handle field 
**

**
 1. Creating a Product
**
-  TRA output has a value:
 **
**We send the generated handle to Shopify.
**
**We do not retrieve or store the handle after creation.
**
**
-  TRA output is blank:
 **
**We create a handle based on the title.
**
**Again, we do not retrieve or store it in Plytix.

**2. Updating a Product

**The same logic applies:

No handle retrieval

No handle is stored in a custom attribute.**
**

_With transformations, handles are always pushed, never retrieved._

#### **Why am I getting a Shopify error related to pixel limit?**

This is because your images have exceeded the pixel limit set by Shopify. Please resize your images according to [Shopify’s requirements](https://www.shopify.com/blog/image-sizes). 

 

💡 You can automatically resize your images when syncing them to your Shopify store using our [formatting options](https://help.plytix.com/en/creating-a-channel#attributes). 

 

#### **Why does my product show that it was “Skipped” in the process log?**

A product is set as “Skipped” after processing when the channel processed a product that was already in the store and had no updates. 

ℹ️ Learn more about [processing details](https://help.plytix.com/en/processing-a-shopify-channel) here. 

#### **In Shopify under the inventory section, I can uncheck the "Continue selling when out of stock" option. How can I configure it in Plytix so that this option doesn't get toggled on when products are out of stock?**

_ _

To avoid this, make sure that the Shopify field** “Inventory Policy” **is mapped with a dropdown attribute and that its attribute value is “deny” rather than “continue.” This is because this field defines whether customers are allowed to place orders for variants when they are out of stock. Click to learn more about [mapping specific Shopify fields.](https://help.plytix.com/en/mapping-shopify-fields)

#### **Why is my Shopify sync taking so long?**

Processing times differ based on factors such as number of SKUs, number of attributes, number and size of assets, and more. They also vary depending on how often you're modifying your product lists or mapping setup since these cause the cache (in other words, your channel's "memory" of your products) to reset, resulting in longer processing times. A channel with a higher number of products, larger images, and many metafields will take longer to process.

If you think processing times are longer than usual for your products, even without any changes in your channel or product setup, feel free to contact our support team. 

#### **Why am I receiving an invalid URL error?**

This is most likely due to using special characters for asset naming. 

These are [Shopify's best practices for naming assets](https://shopify.dev/docs/api/admin-rest/2023-07/resources/product-image):
- Don't use spaces in the file name
- Don't begin your file name with symbols, like "!"
- Avoid using a period before the file extension
- Avoid long, complicated file names that contain excess characters

We also recommend using only English letters, 0-9 numbers, and dashes or underscores for name separation. Please refer to [Shopify's documentation](https://shopify.dev/docs/api/admin-rest/2023-07/resources/product-image) for more information.

#### **Why am I receiving the error "already used in automated collections"?**

If you are receiving the following error "_PRODUCT.wds.location_region: Cannot proceed with this action. This definition is used in one or more automated collections":_

It is because the metafield is being used in automated collections but you are sending a false value from Plytix. To avoid this, enable the "Use in automated collections" checkbox when editing a metafield in Plytix. 

![Using Shopify with Plytix - FAQ 1](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Using%20Shopify%20with%20Plytix%20-%20FAQ/Using%20Shopify%20with%20Plytix%20-%20FAQ%201.jpg?width=567&height=300&name=Using%20Shopify%20with%20Plytix%20-%20FAQ%201.jpg)

#### How do I set up sales or promotions for my Shopify store?

You have a couple of options for handling promotional pricing.

First, you can manually set sale prices on individual products without using discount codes. When you put a product on sale for a lower price, you might want your customers to be able to see the original price, so they see the price comparison. To show a sale price in your online store, your product details need to include a sale price and the original price, called the "Compare at price." You can maintain these two prices in separate attributes in Plytix, or keep only the original price in Plytix and create an attribute transformation to transform the original price into a discounted price.

Second, you can offer customers reduced prices at checkout by creating a discount code from the Shopify dashboard. This doesn't affect the displayed prices of your products. You can create codes for a dollar value discount, a percentage discount, a buy X get Y discount, or a free shipping discount. Customers can then enter discount codes at checkout.

#### How can I map a SEO title and description to my products using metafields?
 By default, SEO title and SEO description are filled with a product's name and the first 155 characters of its product description. If you want to use metafields to manage the meta title and meta description on your products to improve your SEO ranking, here's how:

**Create a Title Tag (Meta Title) for your Shopify product
**Namespace: Global
Value Type: String
key: title_tag

**Create a Description Tag (Meta Description) for your Shopify product
**Namespace: Global
Value Type: String
key: description_tag  

⚠️ Important: Sending any value for both fields will overwrite existing information. Use metafields without definition.

💡 To learn how to create metafields for your Shopify store using the Plytix Shopify Connector, check out our article on[Using Shopify Metafields.](https://help.plytix.com/en/shopify-metafields)  

---

### What's next?

 - Check out the [complete guide to our Shopify connector](https://help.plytix.com/en/getting-started-with-shopify-plytix)
 - Learn about [mapping Plytix attributes to Shopify fields](https://help.plytix.com/en/mapping-shopify-fields)
 - Follow along [our best practices for using Shopify in Plytix](https://help.plytix.com/en/best-practices-when-using-plytixs-shopify-integration)

---
