---
title: Managing a BigCommerce Channel
source_url: https://help.plytix.com/en/managing-bigcommerce-channel
description: "How to configure your channel after connecting your BigCommerce store in Plytix to send product content directly to your storefronts."
---

# Managing a BigCommerce Channel

## How to configure your channel after connecting your BigCommerce store in Plytix to send product content directly to your storefronts

After you've set up the connection between Plytix and your desired BigCommerce storefront, it's time to configure your channel preferences to start sending your products to your store. In this article, we'll walk you through the different tabs of your channel: adding products, mapping BigCommerce fields, setting up automatic processing, and understanding your process log, so you can add the information you need and be all set to go live.

ℹ️ If you'd like to get access to Plytix's BigCommerce channel, please contact your Account Manager.

[Creating a BigCommerce Channel](#create-bc-channel)

[Channel Dashboard](#dashboard)

[Process Log](#process-log)

[Scheduling Processing](#scheduling-processing)

[How Caching Works](#how-caching-works)

[Products](#products)

[Mapping](#mapping)

[Custom Fields](#custom-fields)

[Settings](#settings)

_*Skip to any section in this article by clicking on the links above_

---

### Creating a BigCommerce Channel 

To create a BigCommerce Channel, you first need to set up the connection between Plytix and your store through the Plytix app, a simple process with no coding required. To learn how, check out [Connecting Plytix to your BigCommerce Store](https://help.plytix.com/en/connecting-plytix-to-your-bigcommerce-store).

---

### Channel Dashboard

The Channel Dashboard gives you essential information about the channel. Here are some of the elements you'll find:

**Channel Name and Status**

At the top left, you'll see a section showing the channel name and type. The status (**Draft** or **Live**) and connected **Storefront** name display right next to the channel name, so you can confirm at a glance which BigCommerce storefront this channel sends products to.

![dashboard](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/dashboard.jpg?width=624&height=227&name=dashboard.jpg)

Here you can:  1. Change the channel name by clicking on it, then pressing **Enter **to save.

![rename](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/rename.jpg?width=624&height=238&name=rename.jpg)

 2. Go back to the channel overview by clicking the arrow.

![back](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/back.jpg?width=624&height=222&name=back.jpg)

**Processing Information**

At the top right, you'll find information related to processing the channel.

![process-info](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/process-info.jpg?width=624&height=180&name=process-info.jpg)

**Information**
- **Created**: the time the channel was created.
- **Modified**: the last time the channel was updated in any way.
- **Processed**: the last time the channel was processed, either manually or on a schedule.

**Actions**
- **Process Now**: starts the channel processing, which pushes information to your BigCommerce store.
- **View history** (clock icon): see a version history of your channel's configuration over time.
- **Arrows**: take you to the previous/next channel.
- **... menu**: gives you two options, **Download store data** (export product data from your connected store) and **Delete** (permanently deletes your BigCommerce channel).

💡 You can also set up scheduled processing so your products are automatically sent to your store at your preferred frequency and date. See [Scheduling Processing](#scheduling) below.

---

### Process Log

The process log shows the records of the last time information was sent from Plytix to BigCommerce. If you haven't processed your BigCommerce channel yet, you'll see the **Instructions** tab here until you process it for the first time.

The log shows:
- **Start Date**: the date and time the process started.
- **Finish Date**: the date and time the process completed.
- **Status**: **Syncing**, **Processing**, **Canceled**, or **Finished**.
- **Products**: how many products were processed.
- **Result**: **Success** if the information was sent correctly, or a note with the number of errors if it wasn't.

ℹ️ A process shows as **Skipped** when a scheduled sync was due while the channel was still processing a previous run. That scheduled sync won't be queued to run later, if you still need that data synced, process the channel manually or wait for its next scheduled run.

![process-log](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/process-log.jpg?width=670&height=338&name=process-log.jpg)

ℹ️ The number of products **processed** into your BigCommerce store is the total number of parents and singles assigned to your channel. The number of products **synced** (listed in the Log Detail) is the total number of products that were actually created or updated, it doesn't include products that were skipped.

**Log Detail**

If there are any errors during processing, you can review what happened at a product level by clicking the **Start Date** of a process. This takes you to the log detail.

Here you can review error messages from BigCommerce to understand how to fix them. Click the **info** icon to see more details about a specific error.

In the log detail you can also see:
- **Action**: whether the product was **Created**, **Updated**, or **Skipped**. A product is marked **Skipped** if it was already cached and hasn't changed since the last sync.
- **Result**: **Success** if a new or updated product was processed correctly, or **Error** if there was an issue sending it to your store. If a cached product is processed again with no changes, it's skipped and the result shows as blank.

You'll also see a summary note showing the total number of parents and singles reviewed (**processed**), and the number of products that were created or updated in your storefront (**synced**).

![log-detail](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/log-detail.jpg?width=670&height=305&name=log-detail.jpg)

### Scheduling Processing

Click the dropdown arrow next to **Process** to open the **Schedule processing** panel, where you can set up automatic, recurring processing instead of only processing on demand.

**!image placeholder**
1. Toggle **Schedule processing** on.
2. Choose a frequency, time, and timezone for your channel to process automatically.
3. Click **Apply** to save your scheduling settings.

---

### How Caching Works

The first time you process a BigCommerce channel, processing times are longer, since products are being created or updated for the first time. On the next run, Plytix creates a cache (essentially, a memory) for those products. From then on, processing is much faster, since unmodified products stay cached while only modified or new products are updated.

ℹ️ If you delete a product directly in BigCommerce rather than through Plytix, it stays cached and shows as **Skipped** on your next sync, since Plytix has no way to know it was removed. It'll only be recreated if its Plytix data changes, or if you clear the cache.

⚠️ Products that encounter an error during syncing aren't cached. This can affect future processing times, so it's best to review and fix errors as they come up.

💡 If you're troubleshooting slow sync times, it's rarely about how many Channels you have or how many fields are mapped, it's almost always about the cache. Once a full cache is established, processing speeds up significantly regardless of Channel setup.

---

### Products

Your BigCommerce channel is a **Destination**, so products are added to it by assigning them directly, there's no separate product list step. In this tab, you'll see every product currently assigned to this channel, so you can review them easily.

In the **Products** tab:
1. Click the **Add products** button.
2. In the **Add products** window, use the **All products** and **Selected** tabs to browse everything available or review what you've already checked off.
3. Use the **Search by SKU or label** field to find specific products, or tick the **Select all** checkbox to select everything shown.
4. Tick the checkbox next to each product you want to include in the feed.
5. Click the **Save** button to confirm, or the **Cancel** button to back out.

While you're still in the **Add products** window, you can deselect a product before saving by heading to the **Selected** tab and clicking the **X** icon beside it.

To remove a product that's already assigned to the Channel, tick the checkbox next to it (or multiple checkboxes) in the Products table, then click the trash icon in the bulk action bar at the bottom of the screen and click the **Remove from destination** button to confirm.

💡 You can also assign products to this Channel from outside the Channel itself, for example, from Product Overview using the bulk action bar, from a product's own Detail page under its **Destinations** tab, or via an Automation. Learn more in [Understanding and Managing Destinations](https://help.plytix.com/en/understanding-and-managing-destinations).

 

---

### Mapping

In the Mapping tab, you'll match attributes from Plytix to BigCommerce fields. Find a detailed guide in [Mapping BigCommerce Fields](https://help.plytix.com/en/mapping-bigcommerce-fields).

To map a new attribute:
1. Click **Match attribute** in the **PIM Attributes** column.
2. Select the attribute you want to match, or create an [Attribute Transformation](https://help.plytix.com/en/formula-attributes).
3. Click **Apply**.
4. Click **Save changes** in the save bar that appears at the top.

![Mapping](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/Mapping.jpg?width=670&height=327&name=Mapping.jpg)

To unmatch an attribute, click the **Unmatch** icon.

![Unmatch](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/Unmatch.jpg?width=670&height=276&name=Unmatch.jpg)

**Formatting Attributes**

Just like with other channels in Plytix, you can apply attribute transformations for certain attribute types.

1. Hover over the attribute you want to edit.

2. If it has transformation options available, a **Settings** icon will appear to the right. 3. Click the **Settings** icon to see all available options.

![Settings-Channel](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/Settings-Channel.jpg?width=624&height=229&name=Settings-Channel.jpg)

4. Make your changes.

5. Click **Apply**. 6. Click **Save Changes** to save your transformations.

### Custom Fields

Custom fields are additional fields you can create in your BigCommerce store, beyond those listed in the Mapping tab.

⚠️ Custom fields only work at the product (parent) level. There's currently no way to send variant-level custom data through this connector.

ℹ️ This connector doesn't currently support BigCommerce metafields (a separate BigCommerce feature from custom fields). If you need variant-level custom data specifically, custom fields won't cover that use case.

1. Click the **Create custom field.**

![custom-fields-empty](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/custom-fields-empty.jpg?width=670&height=294&name=custom-fields-empty.jpg)

2. Give it a name and confirm by clicking **Create custom field** again.

3. Click **Match attribute** to match your new field with a Plytix attribute. Just like in [Mapping](#mapping), you can match an existing Plytix attribute or create a new attribute transformation.

4. After selecting the attribute, click **Apply**.

If the attribute type you matched supports formatting options, you'll see a **Settings** icon in the **Formatting** column.

![custom-fields-created](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/custom-fields-created.jpg?width=670&height=267&name=custom-fields-created.jpg)

💡 If you need to display a "Request for quote" message instead of a price for certain products, this isn't a native BigCommerce field, but you can push that text through a custom field and adjust your theme to display it in place of the price.

---

### Settings

In the Settings tab, you can:
- Manage custom field processing preferences.
- Clear the cache.
- Create webhooks for third-party notifications after a channel is processed.

ℹ️ Scheduling automatic processing isn't part of the Settings tab, it's managed from the **Process** button's dropdown. See [Scheduling Processing](#scheduling) above.

**For custom fields**: in the **Custom fields** section, set your preference for how fields with empty values should be handled, either ignored, or set to overwrite an existing value.

**To clear your channel's cache**: click **Clear cache**.

⚠️ Clearing the cache causes future syncs to take longer until the new cache is created. Cache clearing applies to your entire channel at once, it can't currently be done for individual products only.

**For webhooks**: click **Create Webhook** to set one up, or learn more in [Webhooks](https://help.plytix.com/en/getting-started-plytix-webhooks).

 

![settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Managing%20a%20BigCommerce%20Channel/settings.jpg?width=670&height=499&name=settings.jpg)

 

---

### What's next? 

- Learn how to [connect Plytix to your BigCommerce store](https://help.plytix.com/en/connecting-plytix-to-your-bigcommerce-store)
- Learn how to [generate a backup of your data](https://help.plytix.com/en/generating-a-backup-of-your-data)
- Learn about the [different channel options](https://help.plytix.com/en/creating-a-channel) available in Plytix 

 

---
