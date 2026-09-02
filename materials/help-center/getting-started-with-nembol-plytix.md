---
title: Getting Started with Nembol & Plytix
source_url: https://help.plytix.com/en/getting-started-with-nembol-plytix
description: "How to create a CSV data feed for your Nembol shop"
---

# Getting Started with Nembol & Plytix

## How to create a CSV data feed for your Nembol shop

In this article, we’ll walk you through setting up a feed export in Plytix, ready to be uploaded to the Nembol platform. You’ll be able to prepare it quickly, in just a few steps, using our template, which includes the attributes required by Nembol.

ℹ️ Please note that this guide is intended as a useful resource for Plytix customers, but Plytix cannot be held responsible for use of third-party tools.

[Creating a Nembol Channel](#create-channel)

[Setting up a Nembol Channel](#setting-up-channel)

_*Skip to any section in this article by clicking on the links above_

---

### Creating a Nembol Channel

All Channels, including Nembol, are managed in the Channels section of Plytix. This area can be found via the **Channels** icon in the left sidebar.

To create a new Nembol Channel:
1. Go to the **Channels** section.
2. On the right of the screen, click the **Add Channel** button.
3. Then give your Channel a unique name, and choose **Nembol**.
4. Click the **Add Channel** button.

**

![Getting Started with Nembol & Plytix - Add channel](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Getting%20Started%20with%20Nembol%20and%20Plytix/Getting%20Started%20with%20Nembol%20%26%20Plytix%20-%20Add%20channel.jpg?width=670&height=344&name=Getting%20Started%20with%20Nembol%20%26%20Plytix%20-%20Add%20channel.jpg)

**

5. You will be taken to the Channel Detail View where you will be greeted with some instructions that will tell you how to set up your Channel. You can add products and attributes to configure your Channel and you can also configure the settings for how to process the Channel data.

---

### Setting up a Nembol Channel

![Getting Started with Nembol & Plytix - main](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Getting%20Started%20with%20Nembol%20and%20Plytix/Getting%20Started%20with%20Nembol%20%26%20Plytix%20-%20main.jpg?width=670&height=185&name=Getting%20Started%20with%20Nembol%20%26%20Plytix%20-%20main.jpg)

**1. Choosing Products**

A Channel is a **Destination**, so products are added to it by assigning them directly, there's no separate product list step. In the **Products** tab:
1. Click the **Add products** button.
2. In the **Add products** window, use the **All products** and **Selected** tabs to browse everything available or review what you've already checked off.
3. Use the **Search by SKU or label** field to find specific products, or tick the **Select all** checkbox to select everything shown.
4. Tick the checkbox next to each product you want to include in the feed.
5. Click the **Save** button to confirm, or the **Cancel** button to back out.

While you're still in the **Add products** window, you can deselect a product before saving by heading to the **Selected** tab and clicking the **X** icon beside it.

To remove a product that's already assigned to the Channel, tick the checkbox next to it (or multiple checkboxes) in the Products table, then click the trash icon in the bulk action bar at the bottom of the screen and click the **Remove from destination** button to confirm.

 

💡 You can also assign products to this Channel from outside the Channel itself, for example, from Product Overview using the bulk action bar, from a product's own Detail page under its **Destinations** tab, or via an Automation. Learn more in [Understanding and Managing Destinations](https://help.plytix.com/en/understanding-and-managing-destinations).

**2. Attribute Mapping**

The third tab in your Nembol Channel setup is called **Mapping**. This is where you'll match attributes from Plytix to Nembol fields.

💡 All attributes can be configured to show a different output based on formulas by applying an [Attribute Transformation](https://help.plytix.com/create-computed-attributes).

**3. Defining Output Format**

In the **Format** tab of your channel, you can configure the order in which your attributes should be displayed, and whether to include attribute values for product parents, variants, sub-variants or all.

**4. Processing the Feed**

To finalize the feed, you need to [process](https://help.plytix.com/en/creating-a-channel#process) it. It will then generate a feed link and file that you can use in your Nembol account.

To process your feed:
1. Go to the top of the Channel area.
2. Click the **Process now** button. In the next window that appears, adjust settings and click the **Start processing** button.

**5. Settings**

Schedule recurring processing in the **Settings** tab of your Channel to automate product content updates. Additionally, from the **Settings** tab of your channel, you can also change the file name, send a copy of your file to Dropbox or an FTP server, and create Webhooks.

💡 Note that this will automatically turn your channel into **Live**, and it will then be counted towards your total count of Live Outputs.

---
