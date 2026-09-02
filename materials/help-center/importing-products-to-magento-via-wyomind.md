---
title: Magento | Importing Products to Magento via URL Feed (with Wyomind)
source_url: https://help.plytix.com/en/importing-products-to-magento-via-wyomind
description: "How to use a CSV or XML Channel to syndicate data to Magento using the Wyomind plugin"
---

# Magento | Importing Products to Magento via URL Feed (with Wyomind)

## How to use a CSV or XML Channel to syndicate data to Magento using the Wyomind plugin

This article explains how to get your product data from Plytix to Magento using a scheduled feed. Since Magento does not support scheduled feeds for product data upload, it's necessary to use a plugin. In this case, we'll show you how to use Wyomind to take the information from your Channel in Plytix and push it through to your Magento store. For this process you'll need a Magento account and the Wyomind Mass Product Import & Update plugin, [available here](https://www.wyomind.com/magento2/mass-product-update-import-magento.html).

ℹ️ Please note that this guide is intended as a useful resource for Plytix customers, but Plytix cannot be held responsible for use of third-party tools.

[Set up a Channel](#set-up)

[Sync Product Data from Plytix to Wyomind](#download_from_plytix)

[Adjust Import Profile Settings](#adjust_settings)

[Import Your Data](#import)

 

_*skip to any section in this article by clicking on the links above_

 

---

 

### Set up a Channel

With Wyomind, you have the option of uploading either an XML or CSV file from a URL. To get this URL, you'll need to create a channel in Plytix. 

You can learn the basics of setting up a CSV or XML channel by following the steps outlined in our article, [Creating a Channel.](https://help.plytix.com/en/creating-a-channel)

 

---

### Upload Product Data from Plytix to Wyomind

After logging into your account in Wyomind, click on **'System' **in the menu on the left side of the screen. From here, you'll select** 'Create a new profile' **and add the link to your CSV or XML channel in Plytix.

![Create a new import profile on Wyomind from the System tab.](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/1.png?width=688&name=1.png)

---

### Adjusting Import Profile Settings

A preview of your data will appear; you can minimize or drag it to the side of the screen so you can create your import profile.

In the menu for creating an import profile, you'll see that there are five tabs. The first one that loads when you create a new profile is the** 'Settings' **tab. 
1. Make sure that your new profile is set to **'Enabled' **or it will not run.
2. Give your profile a name that clearly defines where your data comes from.
3. Set **'SQL Mode'** to **'No'**.
4. For **'Profile Method'**, choose** 'Update products and import new products'**.

![To create a new import profile, adjust the settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/2.png?width=688&name=2.png)

Further down, you'll see "File Type" settings. Choose **'CSV' **with a comm as the column separator. For the **'first line is a header' **dropdown, select **'yes'**.

![To create a new import profile, adjust the file type](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/3.png?width=688&name=3.png)

In the "Post Process Action" section, select **'Only the required indexers'** for the **'Run indexers' **dropdown.

![To create a new import profile, adjust the post process action](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/4.png?width=688&name=4.png)

Next, navigate to the **'Advanced Settings' **tab of the profile configuration menu. Make adjustments to the settings as needed for "System Settings" and "Stock Settings." For image settings, select **'Http server (url)' **as the **'Image location'**.

![To create a new import profile, adjust the image settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/6.png?width=688&name=6.png)

For setting up categories, we recommend selecting **'Yes' **for** 'Category tree auto-detection'.**

ℹ️ Wyomind requires that categories be separated by '/' (slash) instead of '>' (greater than sign). You can change the categories separator by hovering over your categories attribute in your channel and clicking on the settings icon. 

![To create a new import profile, adjust the categorysettings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/7.png?width=688&name=7.png)

Now it's time to map your columns. This is a similar process to mapping attributes in Plytix. For some attributes like** 'Has Options' **you'll need to select a custom value and make adjustments to map it to your data.

![To create a new import profile, map your columns to the target attributes in Magento](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/8.png?width=688&name=8.png)

Continue adding attributes until all of the columns in your file have been mapped.

![Continue mapping columns until all columns have been matched to the target attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/9.png?width=688&name=9.png)

💡 Your setup will look similar to this, but it may not be exactly the same.

![Some columns may require adjustments depending on your product data](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/10.png?width=688&name=10.png)

![You are finished mapping when all columns have been matched.](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/11.png?width=688&name=11.png)

The next tab in the profile configuration menu is** 'Scheduled tasks'**. Here is where you can choose the days and times you wish to automatically import your product data.

![Assign a schedule so that your import will run automatically on the days and times you want.](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/12.png?width=688&name=12.png)

---

### Import Your Data

After you've finished scheduling, scroll up to the top and click** 'Run Profile Now'**.

![When you have finished creating an import profile, click 'Run Profile Now'](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/13.png?width=688&name=13.png)

Once the import is complete, you'll see a notification in yellow that is has been processed. Select** 'Catalog'**, then **'Products' **from the Wyomind main menu on the left side of your screen to view your product listings.

![View your products in Wyomind by selecting Catalog, then Products](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/14-1.png?width=688&name=14-1.png)

![Your product listings will appear in Wyomind and Magento after a sucessful import.](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Importing%20Products%20to%20Magento%20via%20URL%20Feed/15.png?width=688&name=15.png)

Your products will now be visible in your Magento store!

 

💡 Because of variations in product data, setting up Wyomind for Magento can require some experimenting and troubleshooting if it doesn't work on the first try. If you need additional support, feel free to reach out to a member of our customer success team and we'll be happy to assist you.

 

---

###  

### What's next? 

- Learn how to [create and manage a Shopify channel](https://help.plytix.com/en/shopify-connector)
- Learn how to [create an XML feed for Facebook Catalog Manager](https://help.plytix.com/en/how-to-create-a-xml-feed-for-facebook-catalog-manager)
- Learn about [importing products to WooCommerce via WP All Import](https://help.plytix.com/en/creating-a-url-feed-for-woocommerce-via-wp-all-import)

 

---
