---
title: Best Practices for Using Plytix’s Shopify Integration
source_url: https://help.plytix.com/en/best-practices-when-using-plytixs-shopify-integration
description: "Avoid common errors when processing your products into Shopify with these helpful tips"
---

# Best Practices for Using Plytix’s Shopify Integration

## Avoid common errors when processing your products into Shopify with these helpful tips

Plytix’s direct integration with Shopify is a helpful tool to both add and enrich products in your store. To achieve the best out of this tool, this article will go over some tips and best practices we recommend to help you avoid potential errors when processing your products into your Shopify store.

[Required fields](#required-fields)

[Working with parents and variants](#parents-variations)

[Working with product lists](#product-lists)

[Metafields](#metafields)

_*Skip to any section in this article by clicking on the links above_

---

### Required fields 

Whether you're completely new to Shopify or are already selling on different stores, there are some helpful things to keep in mind when using Plytix's Shopify connector!

When you're syncing Plytix with your Shopify store for the first time, we recommend running tests with the connector in a store that is **not active** _prior_ to optimizing your mapping. This will avoid any potential mistakes or accidental overwriting of products in an active store and will help you fix any errors you detect beforehand.

The **Title** field is required in Shopify, and is used to create your product handles if no custom handle is defined.

💡 **Handle** is the product's unique identifier in Shopify. When creating a new product from Plytix, if the handle is left blank or does not match an existing one, it will be automatically generated based on the attribute mapped to the **Title** field.

When it comes to **Title**, we do not recommend having the same title for two products; always aim to have unique titles for each product to ensure your data is optimized for both Shopify and search engine results.

And while it may sound obvious: remember to make sure all of your sellable products have a value for their key attributes, like price, when you match them in the connector.

---

### Working with parents and variants

When it comes to variants, Shopify works with **non-sellable parents**. This means that the parent works as a reference product of what you're selling, but what you're really selling in Shopify in this case are the variants. So we recommend defining attributes in which your product variants may differ, like **price** and **size**, exclusively at the variant level.

When working with variants, Shopify allows you to define up to three fields to create variants called **Options** (Option 1, Option 2, and Option 3). You need to map at least one of the options to create variants in your store. When mapping options, keep the following in mind:
- If you map an **Option Name** field, you should also map the corresponding **Option Value** field (i.e. Option 1 Name mapped with Option 1 Value).
- Follow the right order when mapping option fields (e.g. don't map **Option 2 Name** if **Option 1 Name** isn't mapped yet).
- Options are positional: removing **Option 1** also removes any variants defined by **Option 2**, since Option 2 depends on Option 1 existing.

⚠️ Renaming an **Option Name** or **Option Value**, or moving a variant to a different parent product, causes Shopify to treat the variant as brand new. This creates a new variant ID, which can mean losing that variant's sales history and having its inventory (especially inventory managed by other apps) wiped or orphaned. Treat changes to option names or values as a migration rather than a routine edit, and be prepared to re-enter inventory for affected variants afterward.

💡 When adding a new variant to an existing product, we recommend creating the variant in Shopify first and then syncing it in from Plytix, rather than adding it directly from Plytix. This avoids unintentionally affecting the pricing of the product's existing variants.

Shopify only allows you to display up to three variant fields in your store. So, by default, the attributes associated with **Option 1/Option 2/Option 3 Value** will be the same for all products. However, some attributes may only be relevant for some variants rather than all of them.

For example, let's say you sell sets of plates and also chocolate; you may want to display the weight for both products, but there's no point in having "flavor" as a variant field for plates. In this case, you may want to use [attribute transformations](https://help.plytix.com/en/create-computed-attributes) to specify which attributes will apply for the variant fields in your store depending on the product. If this is your case, feel free to contact your account manager for further assistance on how this can be done!

#### Removing and deleting products

You may wonder if you can delete products in Shopify by removing them from the products assigned to your channel and then processing again.

Long story short, you can't delete products in Shopify through Plytix. Products that are already processed in Shopify can only be deleted directly in Shopify. Here's what to keep in mind instead:
- If a product should no longer be sold or visible in your store, we recommend updating its status in Plytix (e.g. to Draft, Archived, or Unlisted) or unpublishing it from the relevant sales channel, rather than removing it from your channel's assigned products. This keeps the product's history intact in Shopify while controlling its visibility.
- If you remove a **variant** from the products assigned to your channel, that variant will be removed from Shopify and will no longer be visible. For example, if you used to sell a t-shirt in red, blue, and green, but decide to stop selling the green one, removing it from your channel's assigned products means the green variant will no longer be an option on that product the next time you process.
- When it comes to **parent** and **single** products, even if you remove them from your channel's assigned products or delete them in Plytix, they will still remain in Shopify. True deletion needs to be done manually in Shopify.

---

### Working with product lists

Before making frequent changes to which products are assigned to your Shopify channel, it's worth understanding how Plytix's caching system works, since it affects your processing times.

[Caching](https://help.plytix.com/en/processing-a-shopify-channel#how-it-work) speeds up processing for products that haven't changed since your last sync. After two syncs, you should have a cache for all your products, meaning processing times will be significantly lower afterward, since only modified and new products need to be reprocessed.

⚠️ Products that encounter an error during syncing won't be cached. This can impact future processing times, which is why we recommend addressing any errors as they arise.

With that in mind, here’s where product lists affects your cache:
- You may feel tempted to change your product lists for different reasons, like wanting to update specific product batches only or creating a new list for new product launches. However, we don't recommend switching between different product lists as such a change could result in products being removed from the cache. Depending on the products included in the old and new lists, you may need to completely resync some products from the old list to update the cache. To ensure faster processing times, we recommend sticking with one dedicated product list per Shopify store.
- As an extra step, you can also set conditions on parent and variant-levels to ensure both are ready to be processed into Shopify
- If you are syncing new products into your Shopify store, make sure they’re added to your lists!

💡To avoid having to change your product list, you can create [smart lists](https://help.plytix.com/en/create-and-manage-product-lists#smart) using [completeness attributes](https://help.plytix.com/en/completeness-tracking) to set conditions for when a product is ready to be exported into Shopify. This way, you’ll ensure that only Shopify-ready products are part of your list and are synced accordingly — without having to manually change your list each time you’re processing products.

---

### Metafields

If you’re interested in using Shopify metafields, check out our Help Center article [here](https://help.plytix.com/en/shopify-metafields)!

When using metafields with a definition, make sure the theme you’ve picked is compatible with Metafields 2.0, otherwise, you won’t be able to sync metafields with a definition to your store.

---
