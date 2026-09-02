---
title: Importing Product Data from ERPs
source_url: https://help.plytix.com/en/erp-import
description: "How to sync your ERP data with Plytix so it always sends the latest product data"
---

# Importing Product Data from ERPs

## How to sync your ERP data with Plytix so it always sends the latest product data

This article walks you through how to import product data from your ERP into Plytix using automated feeds. By syncing your ERP on a recurring schedule, you can keep SKUs, attributes, pricing, and media up to date in Plytix without manual uploads. You will learn how to prepare your ERP export, configure the file format, and set up an import feed in Plytix so product updates flow in consistently. [Before you start](#start)
[Configuring your ERP export](#configure-erp)
[Creating an import feed in Plytix](#import-feed)

_*Skip to any section in this article by clicking on the links above._

---

### **Before you start**

1. Decide **which products and fields** you’ll import (e.g., SKU/ID, Name, Description, Price, Cost, Brand, Category, Images, Status).
2. Choose a **transport method** supported by your IT/security policies:

 - **SFTP** (recommended for recurring files)

 - **HTTPS URL** (public file link)

3. Set up the **file format**: Only CSV is accepted
4. Ensure you have **ERP permissions** to create exports/saved searches and schedule jobs.

---

### **Configuring your ERP export**

Set up a recurring export that produces a single file with one row per product (or per product‑variant) and sends it to an SFTP server or a downloadable URL.
1. **One ID to rule them all:** Include a stable **SKU/unique ID** column. This is how updates will match products in Plytix.
2. **Header row required:** Use clear, machine‑readable column names (no duplicates).
3. **Media:** Provide public URLs for images and files where possible.
4. **Categories/attributes:** Use consistent separators (e.g., > for category paths; | for multi‑value attributes) and document them.

💡 _Tip:_ Start with a tiny sample (5–10 products). It’s faster to validate mapping and attribute types on a small set before scaling up.

---

### Creating an import feed in Plytix

![1. Add new feed](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20ERP%20import/1.%20Add%20new%20feed.png?width=670&height=357&name=1.%20Add%20new%20feed.png)

1. Go to **"Imports"** in the left menu.
2. Click **"Feeds"** and then **_“Add Feed”_**_ _
3. _Choose_ the right feed** **type: URL, FTP/**SFTP connection**, or **Dropbox.**

![2. Feed options](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20ERP%20import/2.%20Feed%20options.png?width=670&height=357&name=2.%20Feed%20options.png)

If **FTP/SFTP** or **Dropbox**:
1. First, create the connection in settings
2. Choose the **file pattern** (e.g., products_*.csv) if your ERP adds timestamps.

If **URL**: paste the direct file link 
1. Scheduling: Set the **Frequency** (hourly, daily, weekly) and **Time window**
2. Choose **Delimiter** and **Encoding**.
3. **Map columns**:

![3. Mapping](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20ERP%20import/3.%20Mapping.png?width=670&height=357&name=3.%20Mapping.png)

 
 - Map your **unique identifier** to **the system SKU** in Plytix.
 - Map the remaining fields to existing attributes in your account or  create new attributes on the fly (text, integer, dropdown, multi‑select, etc.).

💡 _Tip:_ Keep attribute names consistent between your file headers and Plytix to reduce mapping work.

Once your feed is up and running, we recommend turning on Notifications in your Plytix account to get updates whenever an import is done from your ERP. 

After the first scheduled run, check your Import Log for processed rows, created/updated counts, and any possible errors.

---

### **What’s next?**

- [Setting Rules for Product Updates Using Automations](https://help.plytix.com/en/automations)
- [Working Collaboratively with Plytix PIM](https://help.plytix.com/en/collaborative-work-plytix)
- [Importing Product Data via Feeds (URL, FTP/SFTP, or Dropbox)](https://help.plytix.com/en/feed-imports/csv)
