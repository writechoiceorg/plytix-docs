---
title: Creating Plytix Webhooks with Zapier
source_url: https://help.plytix.com/en/webhooks-zapier
description: "Learn how to configure a Plytix webhook connection using Zapier to get notified about channel updates on external platforms."
---

# Creating Plytix Webhooks with Zapier

## How to configure a Plytix webhook connection using Zapier to get notified about channel updates in external platforms

With Webhooks, you can get notified about your Plytix channel processing in any third-party app your team uses, keeping you in the loop with real-time updates. In this article, we'll walk you through how to configure webhooks in Plytix using Zapier to connect it with the platform you'd like to receive the notification on. 

 

[Creating a Webhook Connection](#create-webhook)

[Configuring the third-party app notification](#third-party-app)

[Sending Channel Information via Webhook](#send-channel-info)

 

_*Skip to any section in this article by clicking on the links above_

---

### Creating a Webhook Connection

To set up your _Zapier_ Webhook in Plytix, please keep two tabs open: one with _Zapier_ and one with Plytix.

1. First, log into your [_Zapier_ account.](https://zapier.com/app/login)

2. In the side menu, select "**+Create**." From the dropdown list, select "**Zaps**."

![create-new-zap](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/create-new-zap.jpg?width=688&height=907&name=create-new-zap.jpg)

3. This will redirect you to configure your trigger options. Click on the Trigger element.

![select-trigger](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/select-trigger.jpg?width=688&height=446&name=select-trigger.jpg)

4. Then, choose "**Webhooks by Zapier.**" 

![create-new-webhook-zapier](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/create-new-webhook-zapier.jpg?width=688&height=626&name=create-new-webhook-zapier.jpg)

5. Click on your Webhook to set it up. In the "App & Event" tab, click "**Catch Hook"**. 

![catch-hook](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/catch-hook.jpg?width=688&height=399&name=catch-hook.jpg)

6. Then, click on the "**Test**" tab. Copy your **webhook URL**.

![copy-webhook-url](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/copy-webhook-url.jpg?width=688&height=496&name=copy-webhook-url.jpg)

7. Back in your **Plytix channel Settings**, click on "+Create webhook." 

![create-webhook-plytix](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/create-webhook-plytix.jpg?width=688&height=263&name=create-webhook-plytix.jpg)

8. Paste the URL you just copied from your _Zapier_ webhook and click "**Create**."

![paste-url-plytix](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/paste-url-plytix.jpg?width=688&height=430&name=paste-url-plytix.jpg)

9. Now, back in the _Zapier_ tab, click "**Test trigge**r."

![test-trigger-zap](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/test-trigger-zap.jpg?width=688&height=808&name=test-trigger-zap.jpg)

10. As the test is running, go back to your Plytix channel settings and click "**Test webhook**."

![test-webhook-plytix](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/test-webhook-plytix.jpg?width=688&height=321&name=test-webhook-plytix.jpg)

ℹ️ The information that is displayed about your channel when you first testing your Webhook is only **mockup data**. The information will be updated in Zapier with real channel data after the channel processes.

Now, you should see that your channel's mockup data is displayed in Zapier's webhook.

![testing-data-zapier](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/testing-data-zapier.jpg?width=688&height=808&name=testing-data-zapier.jpg)

To send real data from your channel through the webhook, click "**Process now**" in your **Plytix channel**.

Test your webhook again by clicking "**Find new records**" in Zapier; you will now see your channel data displayed.

![actual-data-testing-zap](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/actual-data-testing-zap.jpg?width=688&height=537&name=actual-data-testing-zap.jpg)

 

---

### Configuring your Third-Party App Notification

After setting up your Webhook connection, you can choose where you'd like to receive the notification with information about your channel processing.

_Zapier_ offers a [list of different platforms](https://zapier.com/apps) that you can connect to your Webhook. 

In this article we will use Gmail as an example, so that the email address I specify receives an email notification. However, you can choose your preferred platform, and use the steps below as a reference.

To send the Webhook notification to a Gmail account, click on "**2.Action**" below to the Webhooks module.

![select-action-zap](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/select-action-zap.jpg?width=688&height=458&name=select-action-zap.jpg)

Then, choose **Gmail**. 

![select-gmail-app](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/select-gmail-app.jpg?width=688&height=665&name=select-gmail-app.jpg)

Under "**Event**" click "**Send Email.**"

![send-email-zap](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/send-email-zap.jpg?width=688&height=454&name=send-email-zap.jpg)

In the "**Accounts**" tab, add a valid Gmail account through which you will send the email notification.

In the "**Action**" tab, enter your email details. Add the recipient's email address, confirm the Gmail account you'd like to send it from, and any other additional details. 

![email-details](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/email-details.jpg?width=688&height=694&name=email-details.jpg)

In the **Email Body**, click on each Webhook item to add them to the email message. Just expand the dropdown list for "**_Catch Hook in Webhooks by Zapier_**" and select each element from your channel.

You can include additional notes that will be displayed in the email notification.

In this example, I added a short header to identify each element, listed below:

**Name**: {1.channel_name}
**URL**: https://{1.channel_url}/feed
**Status**: {1.channel_processing_status}
**Products: **{1.processed_products}

![email-body-content](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/email-body-content.jpg?width=688&height=696&name=email-body-content.jpg)

⚠️ Make sure to add a "**https://**" before and "**/feed**" after the URL element so that your feed's URL can be displayed correctly in the email.

You can test the email note in the "**Test**" tab by clicking "**Test step.**"

![email-test-trigger](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/email-test-trigger.jpg?width=688&height=780&name=email-test-trigger.jpg)

 

The recipient will now find an email address in their inbox with the Plytix channel information you configured!

---

### Sending Channel Information via Webhook

Now that your Webhook integration is set up, you can enable automatic notification of your channel processing.  

To do so, publish your Zap by clicking the "**Publish**" button on the top right.

![publish-zap](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/publish-zap.jpg?width=688&height=725&name=publish-zap.jpg)

Then, toggle on the boolean option in the top left (it is off by default).

![boolean-on](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Zapier/boolean-on.jpg?width=529&height=484&name=boolean-on.jpg)

Now, every time your channel processes, the following information will be sent to the Gmail (or any other third-party app you chose) notification you configured in Zapier:
- Channel Name
- Channel URL
- Channel Processing Status
- Number of Processed Products

---

### What's Next?

- Learn how to [create channels in Plytix](https://help.plytix.com/en/creating-a-channel)
- Learn how to [configure your account notification preferences](https://help.plytix.com/en/general-account-info-settings)
- Learn how to [create webhooks using Make](https://help.plytix.com/en/webhooks-make)

 

---
