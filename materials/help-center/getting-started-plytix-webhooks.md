---
title: Getting Started with Plytix Webhooks
source_url: https://help.plytix.com/en/getting-started-plytix-webhooks
description: "Understand  Webhooks and how to use them in Plytix"
---

# Getting Started with Plytix Webhooks

## Understanding Webhooks and how to use them in Plytix

Webhooks are a handy tool to automate notifications in third-party apps after a Plytix channel is processed. This feature allows you to receive real-time updates about your channel processing, so you can integrate Plytix with the tools your team uses.

 

[What Are Plytix Webhooks?](#what-are-webhooks)

[Setting up a Webhook in Plytix](#setting-up-webhooks)

[Technical Information](#technical-info)

[Use Cases for Webhooks](#use-cases)

 

_*Skip to any section in this article by clicking on the links above_

---

### What Are Plytix Webhooks?

Webhooks are automated messages sent from Plytix to a URL of your choice when certain events occur—in this case, when a channel is processed. They allow your other systems to be immediately notified and take action based on this information, without needing to constantly check Plytix for updates.

 

---

### Setting Up a Webhook in Plytix

To set up a webhook:
1.

Log in to your Plytix account.
2.

Navigate to the settings of the channel you want to receive external updates about.
3.

Look for the **Webhook** section and click on the option to create a new webhook.
4.

You'll be prompted to enter a Request URL. This is where Plytix will send the webhook data.

![channel-settings-webhook-create](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Getting%20Started%20with%20Plytix%20Webhooks/channel-settings-webhook-create.png?width=665&height=354&name=channel-settings-webhook-create.png)

5.

Save your webhook configuration.

---

### Technical Information

Here are the key technical aspects of Plytix webhooks:
- **REQUEST URL**: The URL you provide where Plytix will send the webhook data.
- **METHOD**: Plytix uses the POST method to send webhook data.
- **REQUEST BODY**: The data is sent in JSON format. Here's an example of the structure:

```
{  "channel_name": "Example channel",  "channel_processing_status": "success",  "channel_url": "https://pim.plytix.com/example-channel",  "feed_url": "https://pim.plytix.com/example-channel/feed",  "processed_products": 452}
```

 

![channel-settings-webhook](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Getting%20Started%20with%20Plytix%20Webhooks/channel-settings-webhook.png?width=670&height=357&name=channel-settings-webhook.png)

#### Webhook Payload

The webhook payload contains four key pieces of information:
1. `channel_name`: The name of the processed channel.
2. `channel_url`: The URL of the channel in Plytix.
3. `channel_processing_status`: The status of the channel processing (i.e., "success").
4. `processed_products`: The number of products processed in the channel.
5. `feed_url`: The URL of the file containing the products, if it is from a channel that generates a feed.

#### Testing Your Webhook

Plytix provides a "Test Webhook" feature that allows you to send a test payload to your specified URL. This helps ensure that your endpoint is correctly set up to receive and process the webhook data before activating it for real channel processing events.

![channel-settings-webhook-test-success](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Getting%20Started%20with%20Plytix%20Webhooks/channel-settings-webhook-test-success.png?width=670&height=357&name=channel-settings-webhook-test-success.png)

#### **Here are a few things to consider when using Webhooks in Plytix:**

- The webhook method (POST) and the request body structure are not customizable in the basic webhook setup.
- Ensure that the endpoint URL you provide is secure and capable of handling POST requests from Plytix.
- The endpoint should be able to process the JSON payload as described above.

---

### Use Cases for Webhooks

Plytix webhooks can be used in various ways to enhance your workflow:
- Trigger email notifications when a channel is processed.
- Update external dashboards or reporting tools with real-time channel processing data.
- Initiate follow-up processes in your other systems based on successful channel processing.
- Log channel processing activities in external databases or monitoring tools.

Those use cases can be easily configured connecting Plytix webhooks with tools like Zapier, Make, ActiveCampaign, Hubspot or Parabola. 

💡 Check our tutorials to learn how to connect Plytix Webhooks with [Zapier](https://help.plytix.com/en/webhooks-zapier) and [Make](https://help.plytix.com/en/webhooks-make).

This way, you can integrate channel updates in Plytix with other tools your team uses. By leveraging this feature, you can create more efficient, automated processes that keep your team informed and your data synchronized across your entire tech stack.

ℹ️ While the basic webhook setup doesn't allow for customization of the method or payload structure, Plytix may offer advanced options for specific use cases. If you need additional customization—such as modifying headers or altering the payload structure—, please contact your Account Manager to share about your use case requirements.

---

### What's Next?

- Learn how to [set up Plytix Webhooks with Make](https://help.plytix.com/en/webhooks-make)
- Learn how to [set up Plytix Webhooks with Zapier](https://help.plytix.com/en/webhooks-zapier)
- Learn how to [manage your Plytix channels](https://help.plytix.com/en/managing-channels)

---
