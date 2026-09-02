---
title: Channels - FAQ
source_url: https://help.plytix.com/en/channels-faq
description: "Frequently asked questions about CSV, XLSX, XML, and NDJSON Channels"
---

# Channels - FAQ

## Frequently asked questions about CSV, XLSX, XML, and NDJSON Channels

[When I cancel a channel that is processing in my account, why doesn’t it cancel right away?](#cancel-processing)

[How can I add multiple images to a Google Shopping XML feed?](#multiple-images)

 

_*Skip to any question by clicking on the links above_

 

---

###  

### When I cancel a channel that is processing in my account, why doesn’t it cancel right away?

The way that a process is canceled in the front end of Plytix is a little bit different from the back end. When a user in your account cancels a process in the process queue, whatever leg of the process is currently running will finish up, and then the rest of the process will be canceled. However, if necessary, you can contact us via live chat and we can stop the process for you immediately.

---

### How can I add multiple images to a Google Shopping XML feed?

When setting up your Google Shopping feed using an XML channel, you may want to add an image gallery. So how do you do this in an XML format? Google Shopping guidance says that the images need to be formatted like this:

**<g:image_link>https://www.example.com/image1.jpg</g:image_link>**

Does this mean you'll have to have each image in a media single attribute with separate nodes for each image? Nope!

The trick is to use ending and opening tags together as the value separator between images rather than a comma, like this:

**</g:additional_image_link> <g:additional_image_link>**

Here's how to do it.

**1.** In your XML channel, under the Format tab, find the media gallery and click the **'Edit node'** icon on the attribute.

![google_shopping_format](https://help.plytix.com/hs-fs/hubfs/Help%20center/Channels%20FAQ/google_shopping_format.png?width=688&height=409&name=google_shopping_format.png)

**2.** In the "Edit node" panel, change the Node Tag to fit the marketplace's system requirements.

![google_shopping_edit_node](https://help.plytix.com/hs-fs/hubfs/Help%20center/Channels%20FAQ/google_shopping_edit_node.png?width=688&height=409&name=google_shopping_edit_node.png)

**3.** At the bottom of the panel, instead of '**Subnodes,'** choose the '**Separator'** option.

**4.** Change the separator value from a comma to:

**</g:additional_image_link> <g:additional_image_link>**

**5.** Hit '**Okay'** and '**Save Changes'** to finish adding an image gallery to your feed! 😎

---

### What's next?

- Learn how to [set up a channel](https://help.plytix.com/en/creating-a-channel)
- Learn about [managing channels](https://help.plytix.com/en/managing-channels)https://help.plytix.com/en/mapping-shopify-fields
- Learn how to [define the format for a JSON channel](https://help.plytix.com/en/defining-the-format-for-json-channels)

 

---
