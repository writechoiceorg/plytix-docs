---
title: Amazon | Creating a CSV Feed for Amazon Seller Central
source_url: https://help.plytix.com/en/feed-amazon-seller-central
description: "Upload products from Plytix to Amazon Seller Central by creating a CSV feed."
---

# Amazon | Creating a CSV Feed for Amazon Seller Central

## Learn how to upload products from Plytix to Amazon

Plytix channels are a great way to create various feeds to send your product data to different shopping sites, including Amazon Seller Central. You can either format your file following an Amazon template or directly upload a Plytix file into Amazon. This article will walk you through the steps of generating a Plytix feed to upload your products to Amazon considering these two options.

 

⚠️  Amazon Seller Central has different requirements of which product data is needed based on the product type and marketplace. This article provides a guide of how to generate a Plytix feed to upload products into Amazon, but specifications of elements such as which attributes are required differ according to Amazon’s guidelines. Please refer to Amazon Seller Central’s documentation to have the most accurate information on what product data needs to be included in your feed.

 

[Downloading an Amazon Template](#download-template)

[Creating a Plytix Feed for Amazon](#create-feed)

[Uploading Your Products into Amazon](#upload-products)

 

_*Skip to any section in this article by clicking on the links above_

 

---

### Downloading an Amazon Template

There are two main ways you can go about uploading your products from Plytix to Amazon:
- One is to generate your feed in Plytix and then format the file using one of **Amazon’s templates** before uploading your products into Amazon Seller Central. This is helpful because all the columns and fields will be formatted according to Amazon’s requirements and no manual matching will be needed.
- The second option would be to directly upload your Plytix feed into Amazon and map the required fields upon upload. 

If you would rather have your columns in Amazon’s format for your product type, the first step is to download a file template from Amazon Seller Central. 

To do so, head over to Amazon Seller Central and click on the side bar menu. 

1. Click the **Catalog** menu item, then click the **Add Products** button.

![catalog-add-products_amazon-template](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/catalog-add-products_amazon-template.jpg?width=670&height=634&name=catalog-add-products_amazon-template.jpg)

 2. Under the search bar, click the **I'm uploading a file to add multiple products** option.

 

![upload-file_amazon-page](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/upload-file_amazon-page.jpg?width=670&height=391&name=upload-file_amazon-page.jpg)

3. Then, select the tab **Download spreadsheet**. Click **Get Product Template**.

 

![amazon_download-template](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/amazon_download-template.jpg?width=670&height=400&name=amazon_download-template.jpg)

4. A pop up window will show up with Marketplace options to choose from based on where you’re selling your products to.

![amazon_select-template-country](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/amazon_select-template-country.jpg?width=670&height=378&name=amazon_select-template-country.jpg)

 

5. Follow through the settings to select the types of products you’re selling.

![amazon-template_select-product](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/amazon-template_select-product.jpg?width=670&height=458&name=amazon-template_select-product.jpg)

 

6. Select the marketplaces you’re selling to and the language of your template. Then, click the **Generate Template** button.

![amazon-template_select-marketplace](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/amazon-template_select-marketplace.jpg?width=670&height=456&name=amazon-template_select-marketplace.jpg)

Save your template for later use before you upload your products to Amazon. Find more information about it below. 

 

---

### Creating a Plytix Feed for Amazon

Creating a feed for Amazon Seller Central is a similar process whether you will later use the Amazon file template you generated or will directly upload your Plytix file into Amazon. 

To create a feed for Amazon Seller Central:
1. Create a **CSV/XLSX** [Channel](https://help.plytix.com/en/creating-a-channel) for your Amazon feed.
2. In the **Attributes** tab, add all the attributes you will be sending over in your file as an output.

To simplify this step, you can also [upload a CSV template](https://help.plytix.com/en/uploading-a-csv-template-into-your-channel) to your **attributes** tab. By doing this, you will not have to manually rename and reorder your attributes to match the columns of the Amazon template you're using.

Please note that Amazon templates are in **XLSM format **and have an additional row in their file. So, in order to import your Amazon template into your Plytix channel, you must first:
- Delete the first row of your Amazon template.
- Convert the file into a CSV format. This can easily be done by opening the file with a spreadsheet reader and exporting it as a CSV. 

![attributes-tab-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/attributes-tab-2.jpg?width=670&height=351&name=attributes-tab-2.jpg)

 3.In the **Products** tab, add the products you want to syndicate to Amazon. A Channel is a **Destination**, so products are added by assigning them directly, there's no separate product list step:
1. Click the **Add products** button.
2. In the **Add products** window, use the **All products** and **Selected** tabs to browse everything available or review what you've already checked off.
3. Use the **Search by SKU or label** field to find specific products, or tick the **Select all** checkbox to select everything shown.
4. Tick the checkbox next to each product you want to include in the feed.
5. Click the **Save** button to confirm, or the **Cancel** button to back out.

While you're still in the **Add products** window, you can deselect a product before saving by heading to the **Selected** tab and clicking the **X** icon beside it.

To remove a product that's already assigned to the Channel, tick the checkbox next to it (or multiple checkboxes) in the Products table, then click the trash icon in the bulk action bar at the bottom of the screen and click the **Remove from destination** button to confirm. 

💡 You can also assign products to this Channel from outside the Channel itself, for example, from Product Overview using the bulk action bar, from a product's own Detail page under its **Destinations** tab, or via an Automation. Learn more in [Understanding and Managing Destinations](https://help.plytix.com/en/understanding-and-managing-destinations). 4. Now, head over to the **Format** tab.

 

If you are using an Amazon template, this step is particularly important, since you will need to follow the column order of the Amazon template we selected; so, the order of the attributes need to match the one in the template. 

💡 If you have previously uploaded your Amazon template in your channel, the attributes will already be in the right order. Otherwise, you can always drag and drop your attributes to reorder them as needed. 

![format-tab-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/format-tab-2.jpg?width=670&height=379&name=format-tab-2.jpg)

 5. Click the **Process now** button to process your channel. This will generate a URL; click on it to download your CSV file.

 

![channel-url-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/channel-url-2.jpg?width=670&height=274&name=channel-url-2.jpg)

  6. If you are using an Amazon template, copy and paste the text from your Plytix feed to your Amazon template file to populate the template with your product information.

 

If you're uploading your Plytix CSV directly into Amazon, skip to the next section.

Once you have this file set up, you can then upload it to your Amazon account.

---

### Uploading Your Products into Amazon 

1. In your Amazon Seller Central profile, click on the left-hand side menu of the page. Select **Catalog** then, **Add Products via Upload**.

![catalog-add-products_amazon](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/catalog-add-products_amazon.jpg?width=670&height=529&name=catalog-add-products_amazon.jpg)

 

2. Upload your file. Then, in the **File Type** options, click the **Inventory Loader File** option.

![amazon_upload-spreadsheet](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/amazon_upload-spreadsheet.jpg?width=670&height=383&name=amazon_upload-spreadsheet.jpg)

If you're not including books, music, video, or DVD products in your listings, you can ignore the **Optional Shipping Settings**.

![amazon_upload-settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20a%20CSV%20Feed%20for%20Amazon%20Seller%20Central/amazon_upload-settings.jpg?width=670&height=419&name=amazon_upload-settings.jpg)

3. Click **Submit Products**. If you are submitting a file that does not follow Amazon's template formatting, you will need to follow a couple of extra steps to select your product categories and map Amazon's fields.

ℹ️ Columns will be automatically matched if you are using the same Amazon product fields label in your column names.

4. After you’ve uploaded your file, you will see a confirmation message saying your file has been uploaded.

If there are no errors, your products will be added to your Amazon product listings.

 

---

### **What's next?**

- Learn about [Plytix's Shopify integration](https://help.plytix.com/en/getting-started-with-shopify-plytix)
- Learn how to [import products to WooCommerce](https://help.plytix.com/en/creating-a-url-feed-for-woocommerce-via-wp-all-import) 
- Learn how to [create a product data feed with Plytix's Google Shopping template](https://help.plytix.com/en/creating-a-product-data-feed-using-plytixs-google-shopping-template)

Is there anything you were hoping to find in this article that is missing? Did this article answer the questions you had? Let us know in our [Help Center feedback form](https://help.plytix.com/en/kb-tickets/new)! 🙌

 

---
