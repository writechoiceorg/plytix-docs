---
title: Facebook (Meta) | Creating an XML feed for Facebook Catalog Manager (Meta Commerce Manager)
source_url: https://help.plytix.com/en/how-to-create-a-xml-feed-for-facebook-catalog-manager
description: "How to create data feeds for your Facebook and Instagram marketing through the Facebook Commerce Manager"
---

# Facebook (Meta) | Creating an XML feed for Facebook Catalog Manager (Meta Commerce Manager)

## How to create data feeds for your Facebook and Instagram marketing through the Facebook Commerce Manager

In this article, you'll learn how to set up an XML feed for Facebook Commerce Manager using [Plytix](https://www.plytix.com/syndication?utm_source=help-center&utm_medium=article&utm_campaign=google-feed). This requires you to have a [Plytix account](https://www.plytix.com/sign-up?utm_source=help-center&utm_medium=article&utm_campaign=google-feed)with the Channels feature enabled.

ℹ️ Please note that this guide is intended as a useful resource for Plytix customers, but Plytix cannot be held responsible for use of third-party tools.

 

[Setting up an XML Channel](#setup)

[Attributes for Facebook Catalog](#attributes)

[Choosing products](#choosing)

[Customizing the feed for Facebook's specifications](#customize)

[Processing the feed](#process)

[Adding the feed to Meta Commerce Manager](#addfeed)

 

_*Skip to any section in this article by clicking on the links above_

 

---

 

Setting up an XML Channel

💡 If you already have an [XML feed for Google Merchant Center](https://help.plytix.com/how-to-create-a-xml-feed-for-google-shopping-merchant) created in Plytix, you can clone it for Facebook and then tweak it from there to work faster.

As all Channels in Plytix, an XML Channel lets you customize the products and attributes you want to use to populate your template. To get started, you first need to [create a Channel:](https://help.plytix.com/en/creating-a-channel)
1. Go to the **Channels** icon in the left sidebar.
2. Click the **Add Channel** button.
3. Select the **XML** format option and then click the purple **Add Channel** button.

![add-xml-channel](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Facebook%20(Meta)%20-%20Creating%20an%20XML%20feed%20for%20Facebook%20Catalog%20Manager%20(Meta%20Commerce%20Manager)/add-xml-channel.jpg?width=670&height=375&name=add-xml-channel.jpg)

Once inside the Channel, you'll need to select the attributes you want to be included in your Facebook Catalog XML feed. 

---

###
Attributes for Facebook Catalog

The first tab in your XML Channel setup is called **Attributes**. This is where you'll add all the content you want to appear in your XML feed.

ℹ️ In this article we demonstrate only **basic requirements** to set up a Facebook feed. You may wish to further customize your feed depending on your products.

#### Facebook Reference Material

Facebook's requirements could change at any time. Please refer to these documents provided by Facebook to have the most up to date information about setting up these feeds.
- [Creating a Data Feed](https://www.facebook.com/business/help/1898524300466211?id=725943027795860)
- [Data Feed Fields and Specifications for Catalogs](https://www.facebook.com/business/help/120325381656392?id=725943027795860)

#### Choosing and Transforming Attributes

In the **Attributes** tab, select the attributes you want to make up your feed.
1. Click the **Add Attributes** button.
2. Select the attributes that have the content (not necessarily the name) that matches the content you want to output in the feed. When you are finished, click the purple **Add attributes** button.

![Add attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Facebook%20Commerce%20Manager/Add%20attributes.png?width=670&height=307&name=Add%20attributes.png)

 

Now that you have selected your attributes, you may need to transform them. To make any transformations, click the **Options** icon next to the attribute or add a new Attribute Transformation.

💡 All attributes can be configured to show a different output name and other handy options. You can also create new attributes based on formulas by adding an [Attribute Transformation](https://help.plytix.com/create-computed-attributes).

  ******** https://help.plytix.com/operations/concat https://help.plytix.com/operations/escapehtmlhttps://help.plytix.com/operations/escapestyle https://help.plytix.com/convert-image-formats https://help.plytix.com/resize-images https://help.plytix.com/en/operations#math https://help.plytix.com/operations/lower

| Common transformations | Use |
| --- | --- |
| CONCAT formula | To set up new, competitive titles or descriptions based on other attributes |
| ESCAPEHTML and ESCAPESTYLE operations | To remove formatting to create plain text descriptions for Facebook |
| Image re-formatting from TIFF to JPEG or PNG | To get an acceptable image format output |
| Image resizing | To make sure all high-res images meet the file size requirements |
| Math formulas | To set the right price for Google Shopping |
| LOWER operation | To set options to all lowercase |

 

⚠️ Note that changing the output labels in the **Attribute** tab will not change the names of the attributes within your feed. We will show you how to change the names directly in the XML feed later on in this article.

 

---

### Choosing Products

A Channel is a **Destination**, so products are added to your feed by assigning them directly, there's no separate "product list" step.
1. Navigate to the **Products** tab.
2. Click the **Add products** button.
3. In the **Add products** window, use the **All products** and **Selected** tabs to browse everything available or review what you've already checked off.
4. Use the **Search by SKU or label** field to find specific products, or tick the **Select all** checkbox to select everything shown.
5. Tick the checkbox next to each product you want to include in the feed.
6. Click the **Save** button to confirm, or the **Cancel** button to back out.

While you're still in the **Add products** window, you can deselect a product before saving by heading to the **Selected** tab and clicking the **X** icon beside it.

To remove a product that's already assigned to the Channel, tick the checkbox next to it (or multiple checkboxes) in the Products table, then click the trash icon in the bulk action bar at the bottom of the screen and click the **Remove from destination** button to confirm.

💡 You can also assign products to this Channel from outside the Channel itself, for example, from Product Overview using the bulk action bar, from a product's own Detail page under its **Destinations** tab, or via an Automation. Learn more in [Understanding and Managing Destinations](https://help.plytix.com/en/understanding-and-managing-destinations).

---

### Customizing the feed to fit Facebook specifications

Next, navigate to the **Format** tab, to set up the feed so it conforms with the specifications set by Facebook. With the loaded attributes and products, a preview of the feed is generated alongside the nodes that contain each piece of information we need.

![format-tab](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Facebook%20(Meta)%20-%20Creating%20an%20XML%20feed%20for%20Facebook%20Catalog%20Manager%20(Meta%20Commerce%20Manager)/format-tab.jpg?width=670&height=360&name=format-tab.jpg)

 Below we look at how to further define the XML feed.

ℹ️ Learn more about working with the XML data format in Plytix here: [Define Data Format For XML Channels](https://help.plytix.com/defining-data-format-for-xml-feeds-1)

#### Example Feed

For this example, we will be using the following sample feed provided by Facebook:

![example XML feed provided by facebook](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/screely-1649856509900.png?width=548&name=screely-1649856509900.png)

#### Header

The first part `<?xml version="1.0" encoding="UTF-8"?>` is automatically applied by Plytix.

#### RSS Node

Our first task is to add the RSS node. To do this:
1. Click the **+ Add Node** button on the top right of the **Nodes** area

![add-node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Facebook%20(Meta)%20-%20Creating%20an%20XML%20feed%20for%20Facebook%20Catalog%20Manager%20(Meta%20Commerce%20Manager)/add-node.jpg?width=655&height=354&name=add-node.jpg)

2. An **Edit node** panel will appear where you can customize the node.

![change node tag and add XML attributes to the node by clicking 'add attribute'](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/12.png?width=670&name=12.png)

3. In the **Node Tag** input, write `rss`.

4. Then we add three additional node attributes by clicking **+ Add attribute** (below the **Parent Node** dropdown menu) **three times** and filling them in as follows:
- XML Attribute: **version** Value: **2.0**
- XML Attribute: **xmlns:g** Value: **[http://base.google.com/ns/1.0](http://base.google.com/ns/1.0)**
- XML Attribute: **xmlns:atom** Value: **[http://www.w3.org/2005/Atom](http://www.w3.org/2005/Atom)**

5. Finally, press the **Okay** button at the top of the panel to add the node to the Feed builder.

#### Channel

We now add a `channel` node as a sub node to the `<rss>` node. We do this by selecting the **Add subnode** icon on the `<rss>` node or the **+ Add node** button at the top of the feed builder.

![make a subnode to the RSS node by clicking the 'add subnode' icon](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/13.png?width=600&name=13.png)

In the **Add node** panel, make sure the parent node is set to `rss`. We change the **Node Tag** to `channel` and press the purple **Add node** button.

![within the 'add node' panel, we add a 'channel' node with 'RSS' as its parent node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/14.png?width=670&name=14.png)

#### Leaf Nodes

We can now add title, link and description nodes. These three nodes must all share the `<channel>` node as parent and they must be created as Leaf nodes.

1. On the `<channel>` node, click the **Add subnode** icon.

![add a subnode to the 'channel' node by clicking on the 'add subnode' icon](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/15.png?width=670&name=15.png)

2. Add the **Node Tag** which can be something like `title` to signify that this node contains the name of the catalog you are creating.
3. Activate the **Leaf node** switch. This will give us a field where we can write in a value. Here we have used `Sample Title` as the name of our catalog.

![make leaf nodes for title, link and description by ticking the 'Leaf node' box](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/16.png?width=670&name=16.png)

4. Click the **Add node** button.
5. Repeat these steps twice to create `description` and `link` nodes.
6. For the last leaf node we have to do something slightly different. Add a subnode to the `<channel>` node and make it a leaf node as before, but this time change the **Closing Tags** to `Self-closing`.

![final leaf node has self-closing tags with three XML attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/XML%20Feed%20for%20Facebook%20Catalog%20Manager%20(1).png?width=670&name=XML%20Feed%20for%20Facebook%20Catalog%20Manager%20(1).png)

7. As we did with the rss node, you'll need to add three XML attributes to this leaf node by clicking **+ Add attribute** three times. Label them as follows:
 - XML Attribute: **href** Value: **[https://www.mydealsshop.foo/pages/test-feed](https://www.mydealsshop.foo/pages/test-feed)**
 - XML Attribute: **rel** Value: **self**
 - XML Attribute: **type** Value: **application/rss+xml**

8. When you have your three attributes click the purple **Add node** button. All your leaf nodes will appear below the `<channel>` node.

![the feed builder should show four leaf nodes beneath the 'channel' node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/17.png?width=670&name=17.png)

ℹ️ The 'LEAF' text in front of your node values simply indicates what type of node they are; this text will not be included in the feed.

#### Formatting Attribute Names

As you may have noticed in the example feed above, the names of attributes in our feed do not yet conform to facebook's specifications.

To update this: 
1. Click on the **Edit node** icon on the `<product>` node with the orange `PRODUCTS` label.

![edit the 'products' node by changing its node tag to 'item'](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/18.png?width=670&name=18.png)

2. Change the **node tag** to `item`.

![edit the node tag of the 'products' node to make it conform to facebook specifications](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/19.png?width=670&name=19.png)

Repeat this for all node tags that require changes to conform to facebook naming conventions. Below is a table of some of the required field (attribute) names used by facebook. All required and optional field names can be found [here](https://www.facebook.com/business/help/120325381656392?id=725943027795860).

| Name in Plytix | Facebook Requirement |
| --- | --- |
| SKU | id |
| Label | title |
| Description | description |
| product landing page | link |
| Hero Image | image_link |
| Brand | brand |
| Availability | availability |
| Condition | condition |
| GTIN | gtin |

 

When you're finished, your feed builder should look something like this:

![all nodes in the Plytix feed builder should now reflect facebook naming conventions](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/20.png?width=670&name=20.png)

We also need to delete the topmost `<products>` node that all of our items currently live under.

![delete the topmost products node by clicking the 'delete node' icon](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/21.png?width=670&name=21.png)

This moves all nodes up a hierarchy level and we can see that our feed content and hierarchy is starting to look a lot like what Facebook wants it to look like:

![node and preview panels both show product information in the same way as in the Facebook example feed](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/22.png?width=670&name=22.png)

---

### Processing the feed

Our feed is now complete. All necessary data is included, hierarchy levels are in order, and naming conventions are adjusted for Facebook.

To finalize the feed, you need to process it. This will apply and update all your product information. It will then generate a feed link and file that you can plug into Facebook Commerce Manager.

To process your feed:
1. Go to the top of the Channel area.
2. Click the **Process now** button. In the next window that appears, adjust settings to update/add products and click **Start processing**.

Once the feed has completed processing, you will see a link appear below the feed name. Click to copy the link by clicking on the **Copy** icon.

![copy-url](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Facebook%20(Meta)%20-%20Creating%20an%20XML%20feed%20for%20Facebook%20Catalog%20Manager%20(Meta%20Commerce%20Manager)/copy-url.jpg?width=670&height=202&name=copy-url.jpg)

This link can be copied and pasted from Plytix into your Facebook Commerce Manager. Once your feed link is in Facebook, you can update and process your Channel to bring in new updates directly to Facebook Catalog without needing to replace the link. 

💡 Schedule recurring processing in the **Settings** tab of your Channel to automate product content updates. Note that this will automatically turn your channel into **Live**, and it will then be counted towards your total count of Live Outputs.

 

---

### Adding the Feed to Facebook (Meta) Commerce Manager

The last step in this process must be completed by logging into your [Meta Business Manager Account](https://business.facebook.com/). Once you have logged in, proceed to the Commerce Manager tool and select the catalog you'll be using your feed to update.

1. First, select **Items** under the Catalog menu, then **Add multiple items** from the **Add items** dropdown menu. 

![Access your catalog within Meta Commerce Manager and select 'add multiple items'](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/26.png?width=670&name=26.png)

2. Several source options will appear. Select the **Data Feed** option and click the **Next** button.

![choose the 'data feed' option to add product information to your catalog](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/27.png?width=670&name=27.png)

3. Next, you'll add the feed link you copied from your Channel in Plytix. Add login details if your feed is password protected. Click **Next**.

![set up your data feed by pasting the link to your XML feed from Plytix](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/facebook-setup_feed.png?width=670&name=facebook-setup_feed.png)

4. Choose how often you want to update your catalog using this feed. Selecting the **Add automatic updates** option will ensure that each time your feed is processed by Plytix, it is also updated by Commerce Manager.

![schedule updates to your Facebook catalog by choosing scheduled updates hourly, daily, or weekly](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/facebook-schedule_feed_updates.png?width=670&name=facebook-schedule_feed_updates.png)

5. Lastly, name your data source and select a default currency to display prices, then click the blue **Upload** button.

![the last step to add a data feed to Meta Commerce manager is naming the feed, selecting currency, and clicking upload](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Facebook%20Catalog%20Manager/facebook_complete_settings_upload.png?width=670&name=facebook_complete_settings_upload.png)

Once your feed has finished uploading, your products will be displayed within your catalog. If you receive any error messages, simply fix the error in your feed, process it in Plytix, and update again.

---

###  

### What's Next

- Learn how to[create a channel](https://help.plytix.com/en/creating-a-channel)
- Learn how to [create a custom XML feed for Google Merchant Center](https://help.plytix.com/how-to-create-a-xml-feed-for-google-shopping-merchant)
- Learn how to [sync products to your Shopify store](https://help.plytix.com/en/shopify-connector)

---
