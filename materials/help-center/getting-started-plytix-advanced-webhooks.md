---
title: Getting Started with Plytix Advanced Webhooks
source_url: https://help.plytix.com/en/getting-started-plytix-advanced-webhooks
description: "Learn how to use and customize advanced Webhooks in Plytix."
---

# Getting Started with Plytix Advanced Webhooks

## How to customize advanced Webhooks in Plytix

Plytix's advanced Webhooks feature allows for greater customization options when integrating channel processing notifications with external platforms. This guide will walk you through the setup and use of advanced webhooks in Plytix, so you can customize your channel notification across your existing tools and workflows.

[What Are Advanced Webhooks](#what-are-advanced-webhooks)

[Setting Up Advanced Webhooks](#setting-up-advanced-webhooks)

[Customizable Fields](#customizable-fields)

[Use Cases for Advanced Webhooks](#use-cases)

 

_*Skip to any section in this article by clicking on the links above_

---

### What Are Advanced Webhooks?

Advanced Webhooks in Plytix allow you to customize not only the destination of your webhook notifications but also the structure of the data sent and the HTTP headers used in the request. This feature is particularly useful for integrating Plytix with a wide range of external services and applications, giving you full control over how your product data interacts with your broader tech ecosystem.

---

### Setting Up Advanced Webhooks

To set up an advanced webhook in Plytix:
1. Log in to your Plytix account.
2. Navigate to the **Settings** of the channel for which you want to create a Webhook.
3. Look for "**Webhook Settings**."
4. You'll see a form with various customizable fields.

![webhooks-settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Getting%20Started%20with%20Plytix%20Advanced%20Webhooks/webhooks-settings.jpg?width=670&height=602&name=webhooks-settings.jpg)

#### Customizable Fields

**1. Webhook URL**

Enter the URL where you want Plytix to send the webhook data. This should be an endpoint capable of receiving POST requests.

Example:

```
<https://your-service.com/webhook-endpoint>
```

**2. Custom Headers**

You can add custom HTTP headers to your webhook request. This is useful for authentication or specifying how the receiving service should handle the data.

By default, Plytix includes:
- `Accept: application/json`
- `Content-Type: application/json`

You can add more headers as needed by clicking "**Add custom header.**"

![custom-headers](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Getting%20Started%20with%20Plytix%20Advanced%20Webhooks/custom-headers.jpg?width=670&height=419&name=custom-headers.jpg)

 

**3. Request Body**

The request body is fully customizable. You can structure the JSON payload to match the requirements of your receiving service. Plytix provides variables that will be replaced with actual values when the webhook is triggered.

Available variables:
- `$channel_name`: The name of the processed channel
- `$channel_processing`: The status of the channel processing
- `$channel_url`: The URL of the channel in Plytix
- `$feed_url`: The URL of the generated feed
- `$products`: The number of processed products

Example custom body:

```
{  "channel_name": "$channel_name",  "channel_processing_status": "$channel_processing",  "channel_url": "$channel_url",  "feed_url": "$feed_url",  "processed_products": "$products"}
```

#### Testing Your Webhook

After setting up your advanced webhook:

Click "**Test Webhook**" in Plytix to send a test payload.

Check your receiving endpoint to ensure it's correctly receiving and processing the data. Then, Make any necessary adjustments to your webhook configuration or receiving endpoint.

 

---

### Use Cases for Advanced Webhooks

The flexibility of Plytix's advanced Webhooks allows for direct integration with tools that require specific call configurations. This opens up a wide range of possibilities for automating workflows and keeping your systems in sync, as advanced webhooks can be tailored to your specific business needs. 

Here are some key use cases:

 

**1. Task Management Tools Integration**:

Automatically create or update tasks in platforms like Asana, Trello, or Monday.com when products are processed or ready.

_Example:_ Create a new card in Trello every time a channel processes successfully, with details about the number of products processed.

 

**2. Database Synchronization with ERPs or CRMs**:

Keep your enterprise systems up-to-date with the latest product information.

_Example:_ Trigger a sync process in your ERP system whenever a channel is processed, ensuring inventory levels are always current.

 

**3. Instant Notifications in Communication Platforms**:

Send real-time alerts to specific channels in Slack, Microsoft Teams, or via email.

_Example: _Post a message in a dedicated Slack channel whenever a feed is updated, including the feed URL and number of products processed.

 

**4. Automated Quality Control**:

Trigger quality check processes in your internal systems based on channel processing results.

_Example: _If the number of processed products falls below a certain threshold, automatically create a high-priority ticket in your support system.

 

**5. Marketing Automation**:

Update marketing platforms with the latest product information for campaigns.

_Example:_ Notify your email marketing tool when new products are added, triggering a product showcase email to subscribers.

 

**6. Custom Analytics and Reporting**:

Feed data into custom analytics tools or dashboards for real-time monitoring.

_Example: _Send processing data to a custom dashboard that tracks product readiness across different sales channels.

**7. Inventory Management**:

Keep inventory systems in sync with your latest product data.

_Example:_ Update stock levels in your warehouse management system based on successful channel processing.

 

Overall, Plytix Webhooks help you integrate your Plytix channel data with other platforms your team uses.  The ability to customize headers and the request body allows you to adapt to the specific requirements of various third-party tools and internal systems. 

Whether you're looking to streamline your task management, keep your databases in sync, automate your marketing efforts, or simply stay informed about your product data processing, Plytix's advanced webhooks provide the tools you need to make it happen.

 

---

### What's Next?

- Learn how to [create a channel in Plytix](https://help.plytix.com/en/creating-a-channel)
- Learn about [basic Webhooks in Plytix and how to use them](https://help.plytix.com/en/getting-started-plytix-webhooks)
- Learn about the [different channel processing options available](https://help.plytix.com/en/creating-a-channel#process)

---
