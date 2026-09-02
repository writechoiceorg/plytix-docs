---
title: Defining the Data Format For XML Channels
source_url: https://help.plytix.com/en/defining-data-format-for-xml-feeds-1
description: "How to configure the format of an XML feed in Plytix"
---

# Defining the Data Format For XML Channels

## How to configure the format of an XML feed in Plytix

In Plytix, you can build out XML feeds without resorting to code. Our XML Channel builder helps you set up feeds for different vendors and partners. In this article, we will show you how to define the data format for XML Channels in Plytix.

[Format Overview](#default)

[Adding Nodes](#nodes)

[Configuring Nodes](#configure)

 

⚠️ Please refer to the documentation of the feed consumer to get blueprints on how to build your feed template. Example feeds can be helpful when building out your feeds in Plytix.

 

---

###
Format Overview 

The standard layout of a newly created XML feed in Plytix has the following items pre-populated:
- The header (cannot be changed)
- A products node with a subnode containing all your products and attributes pre-populated based on your settings from the "Attributes" and "Products" tabs.

[![build-feed](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Data%20Format%20for%20XML%20Channels/build-feed.jpg?width=688&height=390&name=build-feed.jpg)](https://help.plytix.com/hubfs/XML%20format.png)

On the left you have the feed you can build, and on the right is a preview of how your feed looks.

---

### Adding Nodes

Press the **"+ Add Node"** button to insert a new node, or click the **"Add Subnode"** icon, to insert a node nested below the selected node.

Click the **">"** icon to expand or collapse a node. If you have multiple sub-nodes connected to a node on the same hierarchy level, you can drag and drop to change the order of the sub-nodes in that hierarchy level.

[![3](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Data%20Format%20for%20XML%20Channels/3.jpg?width=688&height=275&name=3.jpg)](https://help.plytix.com/hubfs/add%20nodes%20XML%20-1.png)

---

### Configuring Nodes

Clicking on the pencil icon on a node opens up the settings panel on the right side of your screen.

Here you can configure your node:
- Set your **"Node tag"**.
 - Standard tag: <node></node>
 - Self-closing tag: <node />Choose the "**Closing tag**" you'd like to use. 

⚠️  Self-closing tags cannot be used for parent tags with a child. 
- Change the placement of your node by choosing a different parent tag.
- Add more attributes.
- Select a static attribute value

![Configuring Nodes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Data%20Format%20for%20XML%20Channels/Configuring%20Nodes.jpg?width=688&height=345&name=Configuring%20Nodes.jpg)

---

###  

### What's Next

- Learn how to[set up a feed for Facebook Catalog Manager](https://help.plytix.com/how-to-create-a-xml-feed-for-facebook-catalog-manager)
- Learn how to [set up a feed for Google Manufacturing Center](https://help.plytix.com/en/creating-a-product-data-feed-using-plytixs-google-shopping-template)
- Learn more about [Channel management](https://help.plytix.com/managing-channels)

---
