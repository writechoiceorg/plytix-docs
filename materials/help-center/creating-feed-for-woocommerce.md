---
title: WooCommerce | Importing Products to WooCommerce via URL Feed (with WP All Import)
source_url: https://help.plytix.com/en/creating-feed-for-woocommerce
description: "How to create a CSV or XML feed Channel to syndicate data to WooCommerce using the WP All Import plugin"
---

# WooCommerce | Importing Products to WooCommerce via URL Feed (with WP All Import)

## How to create a CSV or XML feed Channel to syndicate data to WooCommerce using the WP All Import plugin

This article explains how to get your product data from Plytix to WooCommerce using a scheduled feed. Since WooCommerce does not support scheduled feeds for product data upload, it's necessary to use a plugin. In this case, we'll show you how to use WP All Import to take the information from your Channel in Plytix and push it through to your WooCommerce store. For this process, you'll need a WordPress account for a WooCommerce store and the WP All Import Plugin, [available here](https://www.wpallimport.com/woocommerce-product-import/).

 

⚠️ WP All Import is a paid tool. Please note that this guide is intended as a useful resource for Plytix customers, but Plytix cannot be held responsible for use or billing of third-party tools.

 

[General Recommendations](#recommendations)

[Set up a Channel](#set-up)

[Download Product Data from Plytix to WP All Import](#download_from_plytix)

[Adjust Display of Product Information - Simple Products](#adjust-prod-info)

[Adjust Display of Product Information - Variations](#variations)

[Link Assets](#link-assets)

[Format Categories](#format-cats)

[Adding Custom Fields at the Variation Level](#adding-custom-fields-variation-level)

[Review Settings and Import](#review-n-import)

 

_*Skip to any section in this article by clicking on the links above_

---

### General Recommendations

Before you start importing your products into your WooCommerce store using the WP All Import plugin, we recommend considering the following best practices for optimal use of the tool:
- First, make sure that you have a product list with products that are ready to be sent to your store (you can learn more about creating product lists [here](https://help.plytix.com/en/create-and-manage-product-lists)).
- The following are some attributes we recommend that you include in your CSV or XML channel to be imported into WooCommerce which you can match to already existing WooCommerce fields:

- Product Name
- Product Description
- Product Short Description
- Product Image
- Product Gallery
- Price
- Product Category
- Product Tags

You will also be able to create custom attributes for attributes that are not already available in WooCommerce.
- Before, if you had single products as well as parents and variations, you had to create two different channel feeds (one for single products and another one for products with variations) and import the two files separately into WooCommerce. Now, however, you can import all products together and check your settings to make sure products without variations are created as single products (see [section](#variations)below). 

---

###
Set up a Channel

With WP All Import, you have the option of downloading either an XML or CSV file from a URL. To get this URL, you'll need to create a channel in Plytix. 

You can learn the basics of setting up a CSV or XML channel by following the steps outlined in our article, [Creating a Channel.](https://help.plytix.com/en/creating-a-channel)

Once you have created and processed your CSV or XML channel, copy your feed URL located under your channel name.

![WP All Import Update](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/WP%20All%20Import%20Update.jpg?width=670&height=177&name=WP%20All%20Import%20Update.jpg)

---

### Download Product Data from Plytix to WP All Import

1. To start, log in to your Wordpress account. On the left side of the screen, you'll see the menu. Click on **'WP All Import'** and then **'Import'**.

2. You'll have several options for importing your data. In this case, select **'Download a file'** and **'From URL'**, where you'll then paste the URL of the Channel you created in Plytix. Click **'Download'.**

3. You can then choose to add new items or update existing items. In the dropdown menu, be sure to select **'WooCommerce Products'**.

![woocommerce-import-options](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/woocommerce-import-options.jpg?width=670&height=419&name=woocommerce-import-options.jpg)

4. Step 2 will show you a preview of the file you're retrieving from Plytix. If it looks correct, click **'Continue to Step 3'**.

![check preview of the file you want to import to WooCommerce](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/2.png?width=670&name=2.png)

---

### Adjust Display of Product Information - Simple Products

ℹ️ This section is only relevant if you are **only **importing **single products**. If you have both single products as well as parents and variations, skip to the next [section](#variations). 

Now you'll be able to adjust the information contained in your product listings (the information displayed on your product page). Note that this section is largely the same for both simple products and variations, but variations require an extra step, which can be found below.

To adjust product listings, drag and drop the attributes from your Channel, shown to the right of the screen, to the "Title and Description" section on the left. Select your product title, description, and any other information you want customers to see in your WooCommerce store.

![add product title and description by dragging and dropping attributes from your feed](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import%20(1).png?width=670&name=Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import%20(1).png)

Next, you'll come to the WooCommerce add-on section. Here you have options to set your product type, add inventory information, customize shipping information, and more. 

Some fields you can add in this section are:
- **SKU**
- **Price**

####

![match sku and price attributes with the woocommerce add-on](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/4-1.png?width=670&name=4-1.png)

- **Cross-Sells **(like Related Products or Bundles)

####

![5](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/5.png?width=670&name=5.png)

You can also create new attributes here:

####

![create custom attributes in the woocomerce add-on](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/6-1.png?width=670&name=6-1.png)

ℹ️ The images above reflect just a few of the options you have to customize your shop with the WooCommerce add-on. You can find more information by checking out [WP All Import's WooCommerce Add-On page.](https://www.wpallimport.com/tag/woocommerce-add-on/) 

---

### Adjust Display of Product Information - Variations

When it comes to listing products with variations in WooCommerce, there are several different options. After selecting **'Variable Product'** in the "Product Type" dropdown, click on the** 'Variations'** tab.

We recommend choosing the second option: **'All products with variations are grouped with a unique value that is the same for each variation and unique for each product.' **Then, drag and drop the **'variationof'** attribute to the "Unique Value" box.

![14](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/14.png?width=670&name=14.png)

💡 The above option is our recommendation based on what has worked for many Plytix customers. Depending on the configuration of your product information in Plytix, you may want to try a few different options to see what works best for you. 

 

Make sure to also check the box that states "**Create products with no variations as simple products**" so that you can import both single products as well as parents and variations together in the same feed.

 

![woocommerce-single-feed](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/woocommerce-single-feed.jpg?width=670&height=218&name=woocommerce-single-feed.jpg)

 

#### Adding Variations as Child XML Element

Use this option if you're importing an **XML file** where the variations are nested as child elements inside each product element, rather than existing as separate records grouped by a shared value (like **variationof**). For example:

<product>
  <sku>ParentSKU</sku>
  <title>T-Shirt</title>
  <variants>
    <variant>
      <sku>PRODUCT-RED</sku>
      <color>Red</color>
      <price>19.99</price>
    </variant>
    <variant>
      <sku>PRODUCT-BLUE</sku>
      <color>Blue</color>
      <price>19.99</price>
    </variant>
  </variants>
</product>

To set this up in WP All Import:
1. In the Variations tab, select the option for variations as child XML elements.
2.

Drag and drop one of the **<variant>** elements from the popup XML tree into the **Variations XPath** box. WP All Import will then loop through all sibling **<variant> **elements automatically.
3. Map each variation's attributes (SKU, price, colour, etc.) from the popup XML tree, not the main product tree.
4. If you want a variation to use a value from the parent product instead (for example, the same price for every variation), drag that value from the main XML tree and check **XPath from Parent**.

⚠️ This option does not have a Custom Fields section for variations. If you need to import custom field data at the variation level using this method, you'll need custom code via WP All Import's action reference (see [Adding Custom Fields at the Variation Level](#adding-custom-fields-variation-level) below for the general workaround approach).

💡 If your XML already contains a flat structure with a shared grouping value (like `variationof`), the method described above under "Adjust Display of Product Information - Variations" may be simpler. Use the child XML element method specifically when your data is nested this way and you don't want to flatten it first.

---

### Link Assets

In the Images section, choose the attribute or attributes associated with your product photos. Drag and drop them to the text box that appears below the **'Download images hosted elsewhere'** option.

![add images by dragging and dropping assets from your url feed](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/4.png?width=670&name=4.png)

---

### Format Categories

In the "Taxonomies, Categories and Tags" section, choose the **'Products have hierarchical (parent/child) Product categories'** option and **'An element in my file contains the entire hierarchy'**, then drag and drop the **'categories'** system attribute from Plytix to the text box.

![choose the 'categories' attribute to categorize your products](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import%20(3).png?width=670&name=Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import%20(3).png)

###  

### Adding Custom Fields at the Variation Level

⚠️ WooCommerce does not natively support custom fields at the variation level, and this use case isn't covered by the standard WP All Import setup described above. The following is a workaround using third-party tools, not a Plytix-supported feature.

If you need to sync custom field data from Plytix to individual product variations (rather than just the parent product), you'll need an additional plugin to create the fields in WooCommerce, plus an import tool that can map to them:
1. **Plugin**: Install Advanced Custom Fields (ACF), along with the [ACF Extension for WooCommerce Variable Products](https://store.creedally.com/product/acf-extension-for-woocommerce-variable-product/), which adds support for ACF field groups at the variation level. 
2. **Importing from Plytix**: Once your ACF field groups are set up for variations, you can map your Plytix feed data to them using either:

- WP All Import, with the ACF add-on enabled, or
- WP Ultimate CSV Importer

Both tools support mapping to ACF field groups, so syncing variation-level custom field data from a Plytix Channel feed should be achievable with either.

💡 As with WP All Import itself, ACF, the ACF Extension for WooCommerce Variable Products, and WP Ultimate CSV Importer are third-party tools. Plytix cannot be held responsible for their use, configuration, or billing.

---

### Review Settings and Import

Check any other options where you'd like to add information. Then click **'Continue to Step 4'**.

💡 If you wish to add multiple feeds, or you're not planning to schedule regular imports, select **'Save settings as a template'** at the bottom of the screen to load your settings the next time you import your feed. Otherwise, feel free to skip it.

![review and save your import settings as a template for the next time you import](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/6.png?width=670&name=6.png)

In this step, select your SKU as the "Unique Identifier" that WP All Import uses to create product listings.

![choose a unique identifier for your products-- we recommend your SKU](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import%20(2).png?width=670&name=Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import%20(2).png)

In this step, you can also schedule imports on a daily or weekly basis within the "Scheduling Options" section by selecting **'Automatic Scheduling'**. 

![schedule your import to run automatically on a certain day every week or month](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/7.png?width=670&name=7.png)

After you've completed Step 4, click **'Confirm & Run Import'** to begin importing your data.

![double check the information and then click to confirm and run your import](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/9.png?width=670&name=9.png)

Once the import has finished, you'll see the following screen:

![When the import is completed a message of success will be displayed and your products can be found in the 'Products' section](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20URL%20Feed%20for%20WooCommerce%20via%20WP%20All%20Import/10.png?width=670&name=10.png)

Your products will be available to view under **'Products' **on the lefthand menu of your WordPress account. 

---

---

### What's next? 

- Learn how to [create and manage a Shopify channel](https://help.plytix.com/en/shopify-connector)
- Learn more about [create an XML feed for Facebook Catalog Manager](https://help.plytix.com/en/how-to-create-a-xml-feed-for-facebook-catalog-manager)
- Learn how to [define the output format for CSV and XLSX channels](https://help.plytix.com/en/defining-data-format-for-scv-and-xlsx-feeds)

 

---
