---
title: Managing Shopify Markets and Languages
source_url: https://help.plytix.com/en/shopify-markets
description: "How to configure and sync markets and languages in Plytix"
---

# Managing Shopify Markets and Languages

## How to configure and sync markets and languages in Plytix

Selling in more than one country or language? Shopify Markets makes it possible to manage catalogs, pricing, and translations for different regions, all from a single Shopify store.

In Plytix, you can fetch your markets and languages directly from Shopify, decide which products show up in each catalog, and map translations so your customers always get localized content.
In this article, you’ll learn how to bring catalogs and languages from Shopify into Plytix, enable or disable products in specific catalogs, and manage translations for your product content. 

[Syncing Markets and Languages](#syncing-catalogs)

[Excluding Products from Markets](#exclude-products)

[Languages in the Mapping Tab](#language-mapping)

*Skip to any section in this article by clicking on the links above

---

### What's Supported

With Shopify Markets synced into your channel, Plytix supports:
- Syncing your existing market catalogs and languages from Shopify.
- Including or excluding products from specific catalogs.
- Translating default product fields (like Title and Description) per language.
- Translating supported metafield types (Single Line Text, Multi Line Text, Rich Text, File Reference, and URL) per language.
- Mapping SEO Title and SEO Description per language.

⚠️ **B2B catalogs** (company location catalogs) are only visible in Plytix when the catalog is assigned to a market. A B2B catalog that isn't assigned to any market won't appear in your channel.

⚠️ **Catalog or market-specific pricing** isn't currently supported. The **Price** field you map in your channel sets the base price only, used as a fallback where no catalog-specific price has been set. Note that a catalog-specific price on a product is lost if that product is excluded from the catalog and later re-included.

⚠️ Non-product translations, like collections, menus, or your homepage, are currently out of scope for this channel. Use Shopify's Translate & Adapt for those.

⚠️ Shopify doesn't treat regional variants of the same language (e.g. UK English vs. US English) as separate languages, so they can't currently be synced as two languages through this channel.

###
Syncing Catalogs and Languages

With Shopify Markets enabled in your account, you'll now see a new Markets tab in your Shopify channel. This tab allows you to sync your existing catalogs sent to various markets and languages directly from Shopify so you can manage updates in your Plytix account.

ℹ️ If your account was set up using Magic Import, your existing markets, catalogs, languages, and translated data are typically already brought in automatically. The steps below are for fetching new catalogs or languages that Magic Import hasn't picked up yet, or for accounts that weren't set up this way.

To sync the product catalogs and languages in your Shopify store, click the **Sync catalogs and languages** button.

![Shopify markets -1](https://help.plytix.com/hs-fs/hubfs/Shopify%20Markets/Shopify%20markets%20-1.jpg?width=624&height=331&name=Shopify%20markets%20-1.jpg)

Once your catalogs and languages are synced into your channels, you'll notice two sections: **Markets** and **Languages**.

In the **Markets** section, you'll find all the catalogs available in your account. These catalogs are toggled off by default in your channel, even if they're active in your Shopify store.

To add your Plytix products to your Shopify catalogs, toggle them on under the **Enable** option. The next time you process your channel, all products assigned to your channel will be added to the catalogs that you've toggled on.

![Shopify markets -2](https://help.plytix.com/hs-fs/hubfs/Shopify%20Markets/Shopify%20markets%20-2.jpg?width=624&height=213&name=Shopify%20markets%20-2.jpg)

If you've added any new catalogs or languages to your Shopify store, you can click the **Sync again** button to have them added to your channel in Plytix.

ℹ️ Clicking the **Sync again** button will only fetch the catalogs and languages from your Shopify store. Your Plytix products will be added to those catalogs only when the catalogs you want to include products in are enabled in your channel, and your channel is processed again.

---

 

### Excluding Products from Markets

To exclude specific products from a catalog, you can set a custom [boolean attribute](https://help.plytix.com/en/attribute-types) for each catalog. Simply map the attribute to the catalog and set it to `false` to prevent a product from being included.

![Shopify markets -3](https://help.plytix.com/hs-fs/hubfs/Shopify%20Markets/Shopify%20markets%20-3.jpg?width=624&height=202&name=Shopify%20markets%20-3.jpg)

💡 You can also use formula attributes to exclude products from catalogs. For example, using `IF(EQ($ATT.COUNTRY, "Germany"), "false", "true")` for a case where if the country is `Germany`, then the product is going to be excluded from the catalog. Learn more about [formula attributes](https://help.plytix.com/en/formula-attributes) here.

---

 

### **
**Mapping Language Translations**
**

Once you've fetched your Shopify languages into your Plytix channel, you'll see them listed under the **Languages** section. To map translations for those languages, toggle on the option under **Translate**.

![Shopify markets -4](https://help.plytix.com/hs-fs/hubfs/Shopify%20Markets/Shopify%20markets%20-4.jpg?width=624&height=331&name=Shopify%20markets%20-4.jpg)

In the **Mapping** tab, you'll see collapsible tabs for all the languages you've enabled.

To map translations for your languages, expand them to view the available fields. Then, follow the same steps of [mapping the Shopify fields](https://help.plytix.com/en/mapping-shopify-fields) with your Plytix attributes.

In addition to default product fields, you can also map translations for:
- **SEO Title and SEO Description**, per language.
- Metafields using the **Single Line Text**, **Multi Line Text**, **Rich Text**, **File Reference**, or **URL** value types. Other metafield types can't currently be translated per language.

💡 You can also use AI in Plytix to autogenerate those translations. Learn more about editing products with AI [here](https://help.plytix.com/en/bulk-ai).

To see how to translate your product content for Shopify Markets using Plytix AI, check out the video below.

 

This way, you can easily manage and sync translations for your products straight from Plytix.

![Shopify markets -5](https://help.plytix.com/hs-fs/hubfs/Shopify%20Markets/Shopify%20markets%20-5.jpg?width=624&height=331&name=Shopify%20markets%20-5.jpg)

 

ℹ️ When mapping an attribute (e.g. description) for specific languages, ensure the corresponding Shopify field in the default product mapping (in this case, the default description) is also mapped.

![Shopify markets -6](https://help.plytix.com/hs-fs/hubfs/Shopify%20Markets/Shopify%20markets%20-6.jpg?width=624&height=331&name=Shopify%20markets%20-6.jpg)

---

### **What's next?**

- Learn how to [map Shopify fields in Plytix](https://help.plytix.com/en/mapping-shopify-fields)
- Learn how to [create and sync metafields to your Shopify store](https://help.plytix.com/en/shopify-metafields)
- Learn how to [use AI to enrich your product content](https://help.plytix.com/en/bulk-ai)

---
