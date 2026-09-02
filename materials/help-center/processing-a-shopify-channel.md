---
title: Processing a Shopify Channel
source_url: https://help.plytix.com/en/processing-a-shopify-channel
description: "How to process a Shopify channel in Plytix to sync your product data to your Shopify store"
---

# Processing a Shopify Channel

## How to process a Shopify channel in Plytix to sync your product data to your Shopify store

This article explains the details of processing a Shopify channel in order to load your products in Shopify for the first time or update them with the information you have stored in Plytix.

If your channel is not yet ready for processing, learn how to create and manage your Shopify channel[here.](https://help.plytix.com/en/shopify-connector) Then, follow the steps in this article to learn how to process your channel. 

 

[Processing](#processing)

[How Processing Works](#cache)

[Summary](#summary)

[After Processing](#after)

[Downloading your Process Reports](#download-process)

 

_*Skip to any section in this article by clicking on the links above_

---

### Processing

You can process your channel in two ways:

1. In your Shopify channel, press the **Process Now** button at the top right of the channel to manually start processing your product data.

 

![Processing a Shopify Channel 1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Processing%20a%20Shopify%20Channel/Processing%20a%20Shopify%20Channel%201.jpg?width=670&height=354&name=Processing%20a%20Shopify%20Channel%201.jpg)

2. Heading over to the **Settings** tab, activate the **Scheduling** option and add your preferred processing options. This will automatically process your Shopify channel at your desired time and frequency. Remember to click the **Save changes** button.

ℹ️ You can still manually process your channel in between scheduled processing times.

#### How Processing Works

When you process a Shopify channel for the first time, processing times will be longer during _the first two times_ the channel is processed for _new_ products, and _the first time_ it is processed for _existing _products.

This is due to the way Plytix stores the product data you send to Shopify:

1. Whenever you are adding new products to Shopify from Plytix by processing your channel, Plytix will **first** fetch your product handles and bring them back to your PIM. The handles will be used to identify those products in future syncs.

2. During the** second** sync, Plytix will create a **cache **(in other words, a memory) for those products.

3. From this point onwards, the next time you sync your channel, processing times become far faster, as unmodified products remain cached while any modified or new products are updated. 

**What causes the cache to reset, either partially or fully:**
- Adding or removing a single product from the channel's assigned products only affects the cache for that specific product.
- Broadly changing which products are assigned to the channel, duplicating the channel, or changing the store connection can clear the cache more widely, you'll need to process the channel at least once afterward before caching applies again.
- Mapping changes, such as adding a new metafield or field to the mapping, force Plytix to reprocess the affected data for every product, since it needs to check whether that new mapping applies.
- Structural changes that effectively create a new product on Shopify's end, such as changing an Option Value on a variant, are treated like new products for caching purposes.
  

💡 Since frequently changing your channel's product assignment or mapping causes more of your catalog to be reprocessed, keeping both reasonably stable between syncs will help keep your processing times fast.

⚠️ Errors that result from processing a Shopify channel will prevent caching for the products affected. Talk to your customer success manager to resolve processing errors. 

 

#### **Summary**

When manually sending information by clicking the **Process Now** button, you will also get a summary of what you are sending to make sure everything is correct.

Click the **Start Processing** button to process your channel and sync new information to Shopify.

![SHOPIFY- SUMMARY](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Processing%20a%20Shopify%20Channel/SHOPIFY-%20SUMMARY.jpg?width=670&height=328&name=SHOPIFY-%20SUMMARY.jpg)

ℹ️ Note that both scheduling processing or manually processing your channel will cause it to automatically become **Live**, making it count towards your total number of [Live Outputs](https://help.plytix.com/en/managing-channels).

 

#### After Processing

Return to your Shopify account and refresh to see that the products from your Shopify channel in Plytix now appear in the **Products** section of your store.

![Processing a Shopify Channel 4](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Processing%20a%20Shopify%20Channel/Processing%20a%20Shopify%20Channel%204.jpg?width=670&height=354&name=Processing%20a%20Shopify%20Channel%204.jpg)

If you process your channel and your products do not appear, or you receive an error in the **Process Log** tab of your channel, check what happened by clicking on the date/time processed.

![Processing a Shopify Channel 5](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Processing%20a%20Shopify%20Channel/Processing%20a%20Shopify%20Channel%205.jpg?width=670&height=354&name=Processing%20a%20Shopify%20Channel%205.jpg)

Then, click the **Result messages** icon next to the error. Make any changes necessary and process again.

![Processing a Shopify Channel 6](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Processing%20a%20Shopify%20Channel/Processing%20a%20Shopify%20Channel%206.jpg?width=670&height=354&name=Processing%20a%20Shopify%20Channel%206.jpg)

If you are still experiencing difficulties, contact your dedicated Account Manager or reach out to us at help@plytix.com.

💡 Click on the SKU of a product to head to its detail page.

ℹ️ If the **Action** column shows as **Skipped** for a product, this means the product was already cached and hasn't experienced any changes since the last sync, so there were no updates to it when processing the channel.

---

### Downloading your Process Logs

After your Shopify channel has been processed, you can download your process reports.

You can do that in two ways:

1. In the **Process Log** tab, hover over a processing date/time and click the **Download** icon that appears on the right.

 

![Processing a Shopify Channel 7](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Processing%20a%20Shopify%20Channel/Processing%20a%20Shopify%20Channel%207.jpg?width=670&height=354&name=Processing%20a%20Shopify%20Channel%207.jpg)

2. You can also do it by heading over to a process details page.

To be redirected to a process' detail page, click on a processing time/date in the main **Process Log** tab. Then, click the **Download report** button.

![Processing a Shopify Channel 8](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Processing%20a%20Shopify%20Channel/Processing%20a%20Shopify%20Channel%208.jpg?width=670&height=354&name=Processing%20a%20Shopify%20Channel%208.jpg)

ℹ️ In your process summary, the number of products **reviewed for processing** may be different from the number of products **synced** to your Shopify store. Products reviewed for processing include all the parents and singles assigned to your Shopify channel before processing it. The products synced to your store are those that have either been newly created or updated; it does not include products that have been skipped. Click to learn more about the [log detail](https://help.plytix.com/en/shopify-connector).

 

---

###  

### What's next?

 - Learn how to [import a Shopify CSV template into Plytix](https://help.plytix.com/en/importing-a-shopify-csv-into-plytix)
 - Learn how to [create and manage a Shopify channel](https://help.plytix.com/en/shopify-connector)
 - Learn how to [use Shopify metafields](https://help.plytix.com/en/shopify-metafields)

---
