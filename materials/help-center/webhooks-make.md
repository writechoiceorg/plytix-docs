---
title: Creating Plytix Webhooks with Make
source_url: https://help.plytix.com/en/webhooks-make
description: "Learn how to configure webhooks in Plytix using Make to connect it with the platform you'd like to get notified on."
---

# Creating Plytix Webhooks with Make

## How to configure a Plytix webhook using Make to get notified about channel processing in external platforms

Webhooks allow you to set up automatic notifications between Plytix and third-party apps, keeping you in the loop with real-time updates. With Plytix webhooks, you can get instantly notified about your channel processing information in the platform that works best for your team. In this article, we'll walk you through how to configure webhooks in Plytix using Make to connect it with the platform you'd like to get notified on.

 

[Creating a Webhook Connection](#create-webhook)

[Sending Channel Information via Webhook](#send-channel-info)

[Configuring your Third-Party App Notification](#third-party-app)

 

_*Skip to any section in this article by clicking on the links above_

---

 

### Creating a Webhook Connection

To set up your _Make_ Webhook in Plytix, please keep two tabs open: one with your _Make_ account and one with the Plytix channel you're installing Webhooks in.

First, log into your [Make account](https://www.make.com/en/login).

In the side menu, select "Scenarios," then click "**+Create a new scenario**."

![create-new-scenario](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/create-new-scenario.jpg?width=688&height=291&name=create-new-scenario.jpg)

On the plus sign, click "Webhooks."

![select-webhooks](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/select-webhooks.jpg?width=688&height=510&name=select-webhooks.jpg)

Then, select "**Custom webhooks**."

![custom-webhook](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/custom-webhook.jpg?width=688&height=527&name=custom-webhook.jpg)

Click "Add" to add a new webhook. 

![add-new-webhook](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/add-new-webhook.jpg?width=688&height=409&name=add-new-webhook.jpg)

Give your new Webhook a name, then click "Save."

![name-webhook](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/name-webhook.jpg?width=688&height=438&name=name-webhook.jpg)

This will generate a URL, which we will use to connect our Webhook in Plytix. Click "**Copy address to clipboard**" to copy the URL. 

![copy-url](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/copy-url.jpg?width=688&height=424&name=copy-url.jpg)

Back in your **Plytix account**, head over to the Settings tab of the Plytix channel you'd like to get notified about. Then, click "**+ Create webhoo**k." 

![create-webhook-plytix](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/create-webhook-plytix.jpg?width=688&height=240&name=create-webhook-plytix.jpg)

Copy the URL generated in _Make_ and click "Create."

![paste-webhook-url](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/paste-webhook-url.jpg?width=688&height=430&name=paste-webhook-url.jpg)

Now we'll test the connection to make sure the webhook is set up correctly. 

To do so, in your _Make_ tab, click "**Run once**" 

![run-once-webhook](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/run-once-webhook.jpg?width=688&height=399&name=run-once-webhook.jpg)

While it's running, head back to your Plytix channel and click "**Test Webhook.**"

![test-webhook-plytix](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/test-webhook-plytix.jpg?width=688&height=321&name=test-webhook-plytix.jpg)

If your connection is set up correctly, you will get a confirmation message. 

ℹ️ The information that is displayed about your channel when you first set up your Webhook is only **mockup data**. The data will be updated once your channel processes again. 

Head back to your _Make _tab. You will notice that there's now a green checkbox next to the Webhook element showing the test was successful. The mockup data sent from your Plytix channel will be displayed on the right-hand side. 

![webhooks-green-check](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/webhooks-green-check.jpg?width=688&height=441&name=webhooks-green-check.jpg)

---

 

### Sending Channel Information via Webhook

Now that your webhook integration is set up, you can enable automatic notification of your channel processing.  

To do so, in your _Make_ tab, turn on the scheduling option (it is off by default).

![webhooks-scheduling](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/webhooks-scheduling.jpg?width=688&height=340&name=webhooks-scheduling.jpg)

Now, every time your channel processes, the following information will be sent to your Webhook module in _Make_:
- Channel Name
- Channel URL
- Channel Processing Status
- Number of Processed Products

![webhooks-real-data](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/webhooks-real-data.jpg?width=688&height=446&name=webhooks-real-data.jpg)

---

 

### Configuring your Third-Party App Notification

After setting up your Webhook connection, you can choose where you'd like to receive the notification with information about your channel processing.

_Make_ offers a list of different platforms that you can connect to your Webhook. 

In this article we will use **Gmail** as an example, so that the email address I specify receives an email notification. However, you can choose your preferred platform, and use the steps below as a reference.

To send the Webhook notification to a Gmail account, click on the "**+**" sign. 

![add-another-module](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/add-another-module.jpg?width=688&height=546&name=add-another-module.jpg)

Then, choose the **Gmail module**.

![add-gmail-module](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/add-gmail-module.jpg?width=688&height=464&name=add-gmail-module.jpg)

Click "**Send an Email**"

![send-an-email_gmail](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/send-an-email_gmail.jpg?width=688&height=466&name=send-an-email_gmail.jpg)

Connect your Gmail account. Then, add the recipient's email address and the email subject.

![email-details](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/email-details.jpg?width=688&height=489&name=email-details.jpg)

Under "**Content**," click on each Webhook item to add them to the email message. You can include additional notes that will be displayed in the email notification.

In this example, I added a short header to identify each element of my Plytix channel, listed below:

**Name:** {1.channel_name}
**URL:** https://{1.channel_url}/feed
**Status:** {1.channel_processing_status}
**Products: **{1.processed_products}

Then, click "OK."

![webhook-gmail-content](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Creating%20Plytix%20Webhooks%20with%20Make/webhook-gmail-content.jpg?width=688&height=498&name=webhook-gmail-content.jpg)

⚠️  Make sure to add a "**https://**" before and "**/feed**" after the URL element so that your feed's URL can be displayed correctly in the email.

It is always recommended to test the connection to ensure the email was sent correctly.

To test the Webhook email notification, click "Run once." Then, click "Test webhook" in Plytix again.

The recipient will now find an email address in their inbox with the Plytix channel information you configured!

 

---

###  

### What's Next

- Learn how to [create channels in Plytix](https://help.plytix.com/en/creating-a-channel)
- Learn how to [configure your account notification preferences](https://help.plytix.com/en/general-account-info-settings)
- Learn how to [invite new users to your account](https://help.plytix.com/en/account-users)

 

---
