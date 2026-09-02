---
title: Google Shopping | Creating a custom XML feed for Google Shopping
source_url: https://help.plytix.com/en/how-to-create-a-xml-feed-for-google-shopping-merchant
description: "How to configure an XML channel for your preferred Google Shopping feed"
---

# Google Shopping | Creating a custom XML feed for Google Shopping

## How to configure an XML channel for your preferred Google Shopping feed

Google Merchant Center (GMC) offers different feed options to upload product data into its platform. While Plytix has a designated [Google Shopping channel](https://help.plytix.com/en/creating-a-product-data-feed-using-plytixs-google-shopping-template) with a setup template to generate a primary product feed, you may want to create different feed types for GMC. In this article, you will find a guide that you can refer to in order to set up **custom** XML feeds for Google Shopping using Plytix. 

 

[Google Reference Material](#reference-material)

[Setting up your XML Feed](#setting-up-feed)

[Customizing the Feed to Fit GMC Specifications](#customize)

[Changing Attribute Names](#attribute-names)

[Processing the Feed](#processing)

_*Skip to any section in this article by clicking on the links above_

---

### Google Reference Material

Google's requirements vary according to the type of product feed you would like to create. To have the most up to date information about setting up these feeds, please refer to these documents provided by Google:
- [Specifications: XML product data feed in the RSS 2.0 format](https://support.google.com/merchants/answer/160589?hl=en)
- [Product Data Specification](https://support.google.com/merchants/answer/7052112?hl=en)
- [Google Feed Guide](https://support.google.com/merchants/answer/7439058?hl=en&ref_topic=3163841)

ℹ️ Plytix cannot be held responsible for the use of third party applications, but our team will be happy to assist you with sharing your data in different outputs.

---

### Setting up your XML Feed

To start, [create a Channel](https://help.plytix.com/en/creating-a-channel) if you haven't already:
1. Go to the **Channels** icon in the left sidebar.
2. Click the **Add Channel** button.
3. Select the **XML** format option and then click the purple **Add Channel** button.

Once inside the Channel, head over to the "Attributes" tab to add your attributes. This is where you add all the content you want to appear in your XML feed.

**ℹ️ **Some product types or countries have special requirements, so don’t forget to review Google’s specifications to check requirements for your desired product or country you’re selling it to.

In the **Attributes** tab, you need to select the attributes you want to make up your feed.

1. Click the **Add Attributes** button.

2. Select the attributes that have the content (not necessarily the name) that matches the content you want to output in the feed. You can also [upload a CSV template](https://help.plytix.com/en/uploading-a-csv-template-into-your-channel) of the right attributes you need in your store, and match it with existing attributes in your PIM.

![add-attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/add-attributes.jpg?width=655&height=342&name=add-attributes.jpg)

💡 All attributes can be configured to show a different output name and other handy output options, such as different settings per attribute type. You can also create new attributes based on formulas by adding an [Attribute Transformation](https://help.plytix.com/create-computed-attributes). Common transformations include (but are not limited to!) image resizing, changing date formats, and following a specific naming convention for your product titles. 

3. If you would like to create attribute transformations for your XML channel, click the **Add Attributes** button and then select **Apply an attribute transformation**.

⚠️ It should be noted that changing the names of attributes in the **Output Label** column will not change the name of the attribute in the XML feed. We will show you how to change the names within the XML feed in a later [section](#attribute-names) on in this article.

#### Adding products to your feed

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

### Customizing the Feed to Fit GMC specifications

Next, navigate to the **Format** tab, to set up the feed so it conforms with the specifications set by Google Merchant Center. With the attributes and products selected, the feed already includes the attribute data for each product. Below we look at how to further define the XML feed.

ℹ️ Learn more about working with XML data in Plytix [here.](https://help.plytix.com/defining-data-format-for-xml-feeds-1)

#### **Example Feed**

For this example, we will use the following sample feed:

![example xml feed for Google Shopping](https://help.plytix.com/hubfs/example%20on%20feeds%20for%20GMC.png)

You can see full GMC feed examples[here.](https://support.google.com/merchants/answer/160589) Refer to these examples as you work with setting up your feed.

#### **Header**

The first part <?xml version="1.0" encoding="UTF-8"?> is automatically applied by Plytix. 

#### **RSS Node**

Our first task is to add the RSS node. To do this: 1. Click the **+ Add node** button on the top right of the **Nodes** area.

![add-node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/add-node.jpg?width=670&height=367&name=add-node.jpg)

2. An **Add node** panel will appear where you can customize the node.

3. In the **Node Tag** input, remove `new_node` and write `rss`.

![the add node panel appears for node customization options](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/Creating%20an%20XML%20Feed%20for%20GMC-1.png?width=670&name=Creating%20an%20XML%20Feed%20for%20GMC-1.png)

4. Add the additional information that we saw came after `rss` in the example feed shown above. This extra information will be contained in node attributes, which you can add by selecting **+ Add attribute**. A node attribute looks like this: `xmlns:g` and its value is: `http://base.google.com/ns/1.0` We add that information in the **XML Attribute** and **Value** fields as shown below.

![add an XML attribute to the RSS node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/6.png?width=670&name=6.png)

5. Finally click the **Add node** button at the top of the settings to add the node to the Feed Builder.

#### **Channel**

Our next task is to add `channel` as a subnode to the `rss` node. To do this:
1. Add a new node using the **Add Node** button.
2. Set the **Node Tag** to `channel`.
3. Then, declare a **Parent Node** using the dropdown box to select `rss`. This will place the `channel` node below the `rss` node in the Feed Builder. To finish, click the purple **Add node** button.

![select RSS to be the parent node of the 'channel' node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/7.png?width=670&name=7.png)

#### **Leaf Nodes**

We can now add `title`, `link`, and `description` nodes. These three nodes must all share the `channel` node as parent and they must be created as Leaf nodes. 1. On the `channel` node, click the **Add subnode** icon.

![create a leaf node as a subnode of channel and name it 'title'](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/9.png?width=655&name=9.png)

2. In the **Add node** panel that appears, add `title` as the **Node tag**.

3. Check the **Leaf node** box. This will give us a field where we can write in the corresponding value.

4. Click on the purple **Add node** button.

5. Repeat these steps for the `link` and `description` nodes.

This will create the nodes as direct subnodes to the `channel` node.

![leaf nodes for the title, link, and description appear as subnodes of channel](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/10.png?width=670&name=10.png)

The 'LEAF' text in front of your node values simply indicates the type of node; this text will not be included in the feed.

#### **Product Specifications**

As you may have noticed in the examples above, the hierarchy for the `products` and `product` nodes does not yet conform to the specifications in the example feed.

**To update this: **
1. Go into the settings of `products`, by clicking the **Edit node** icon.

![edit the product node by clicking the edit node icon](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/11.png?width=655&name=11.png)

2. Change the **Parent node** to `channel`.

This will move the `products` node and all of its subnodes under the `channel` node.

![make channel the parent node of the product node by selecting it from the dropdown menu](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/12.png?width=670&name=12.png)

By default in Plytix, a product node is called `product`, so we need to change this to `item` in order to meet the GMC specifications.

![closeup on the node tag of the products node which says 'product'](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/13.png?width=655&name=13.png)

**To do this:**
1. Click the orange `product` node's **Edit node** icon.

![edit the products node by clicking the edit node icon](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/14.png?width=670&name=14.png)

2. After changing the **Node Tag** to `item` it should look like this.

![change the node tag of the products node to say 'item'](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/15.png?width=670&name=15.png)

Next, we must delete the topmost `products` node that all our items currently live under. GMC lists all their items one after another (not under an `items` hierarchy level), so we do not need this `products` node.

To do this, click the **Delete node** icon (X) on the righthand side of the top `products` node.

![delete the topmost products node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/16.png?width=670&name=16.png)

Deleting the `products` node moves everything up a hierarchy level, and we can now see that our feed content and hierarchy is starting to take shape.

###

![comparison of the feed builder and preview of the feed, which now conforms to Google](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/17.png?width=670&name=17.png)

---

### Changing Attribute Names

After formatting your XML feed, you will need to change the attribute 'Node Tags' so they match GMC's naming convention. 

To follow the correct naming convention for your selected feed type, make sure to check [Google’s documentation](https://support.google.com/merchants/answer/7439058?hl=en&ref_topic=3163841&sjid=8958897995145294320-EU). 

 

To change your attribute names:
1. Click the **Edit node** icon for each attribute node individually.
2. Change the **Node Tag** for each attribute - and a preview of the output name will display beside the attribute names with opening and closing tags (< >).
3. Press the **Okay** button after editing each node tag and then click the **Save changes** button at the top of the Channel page.
4. Repeat for all attributes requiring a name change.

![Change the node tags of all attribute nodes to make them conform to Google specifications](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/How%20to%20Create%20an%20XML%20Feed%20for%20Google%20Merchant%20Center%20(Shopping)/18.png?width=670&name=18.png)

---

### Processing the Feed

After following these steps, your feed will be completed! All your necessary data is there, your hierarchy levels are in order, and naming conventions are adjusted for GMC.

To finalize the feed, you need to process it. This will apply and update all your product information and generate a feed link and file that you can plug into GMC.

To process your feed:
1. Go to the top of the Channel area.
2. Click the **Process now** button. In the next window that appears, adjust settings to update/add products and click **Start processing**.

Once the feed has completed processing, you will see a link appear below the feed name. Click the **Copy** icon to copy it.

This link can be copied and pasted from Plytix into your GMC account. Once your feed link is in your account, you can update and process your Channel to update products directly in GMC without needing to replace the link.

💡 Schedule recurring processing in the [**Settings** tab of your Channel](https://help.plytix.com/en/creating-a-channel) to automate product content updates or send your product data to an FTP connection. Note that enabling scheduled processing will automatically turn your channel **Live** and it will be counted towards your total number of Live Outputs.

###  

---

###
What's next?

- Learn how to [create a product data feed using Plytix’s Google Shopping Template](https://help.plytix.com/en/creating-a-product-data-feed-using-plytixs-google-shopping-template)
- Learn how to [upload a CSV template into your CSV or XML channel](https://help.plytix.com/en/uploading-a-csv-template-into-your-channel)
- Learn how to [define the data format for XML channels](https://help.plytix.com/en/defining-data-format-for-xml-feeds-1)

 

---

 

####
