---
title: Defining Export Settings for Attributes
source_url: https://help.plytix.com/en/defining-the-format-for-attributes-and-assets-upon-export
description: "How to reformat categories, date attributes, decimal attributes, boolean attributes, and relationships when exporting from Channels and Brand Portals"
---

# Defining Export Settings for Attributes

## How to reformat categories, date attributes, decimal attributes, boolean attributes, and relationships when exporting from Channels and Brand Portals

Although you maintain information in Plytix in the way that is best for your business, you may need to change the way this information looks when you export it to share with others. Attributes that can be adjusted for sharing will display a "Settings" icon like this when you hover over them:

![Settings icon for attributes that can be reformatted upon export](https://help.plytix.com/hs-fs/hubfs/Help%20center/setting%20icon-png.png?width=58&name=setting%20icon-png.png)

[Defining the Output Format for Categories](#categories)

[Defining the Output Format for Date](#date)

[Defining the Output Format for Decimals](#price)

[Defining the Output Format for Booleans](#boolean)

[Defining the Output Format for Relationships](#relationships)

 

_*Skip to any section in this article by clicking on the links above_

 

💡 If you want to change the format of an attribute that is not mentioned in this article, you may be able to use [an attribute transformation](https://help.plytix.com/en/insert-apply-properties-computed-attributes) to change it.

ℹ️ If you want to change the format of an asset, check our our article [Defining the Export Settings for Media Attributes](https://help.plytix.com/en/defining-export-settings-for-media-attributes). 

---

### Defining the Output Format for Categories

It can be useful to change the formatting of your categories when you maintain categories in multiple languages, or if you sell to different platforms, each with their own set of requirements. When exporting the "Categories" attribute, you have control over: 
- the hierarchy separator - default is the **greater than sign (>)** but can be any character
- the category path - choose from "**Full Path**," "**Exclude First**" or "**Last Child**"
- the selected category tree - any category or subcategory in your account. Choosing a subcategory will create a blank output for products not in that category.

###

![Defining Export Settings for Attributes-1.1jpg](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Format%20for%20Attributes%20Upon%20Export/Defining%20Export%20Settings%20for%20Attributes-1.1jpg.jpg?width=688&height=564&name=Defining%20Export%20Settings%20for%20Attributes-1.1jpg.jpg)

###  

---

### Defining the Output Format for Date

###

![Defining Export Settings for Attributes-2.1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Format%20for%20Attributes%20Upon%20Export/Defining%20Export%20Settings%20for%20Attributes-2.1.jpg?width=688&height=312&name=Defining%20Export%20Settings%20for%20Attributes-2.1.jpg)

Because dates are often written differently depending on region, preference or context, there are many way you may choose to display the date when exporting a date attribute. By creating a combination of the tokens below, you can create a wide array of different time/day/month/year formats:

![Using different tokens to change the date format lets you customize it however you need to.](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Format%20for%20Attributes%20and%20Assets%20Upon%20Export/screely-1664538410107.png?width=688&name=screely-1664538410107.png)

ℹ️ For information about how to format dates for import and export, check out our article on [Configuring a Date Attribute](https://help.plytix.com/en/configuring-the-date-attribute).

 

---

### Defining the Output Format for Decimals

 

When exporting a decimal attribute, for example the price of a product, you have options to define:
- the decimal separator - **Dot (.)** or **Comma (,)**
- the level of precision for the decimal - For example "**1.5**," "**1.50**," "**1.502**," etc.

![Defining Export Settings for Attributes-Settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Format%20for%20Attributes%20Upon%20Export/Defining%20Export%20Settings%20for%20Attributes-Settings.jpg?width=688&height=316&name=Defining%20Export%20Settings%20for%20Attributes-Settings.jpg)

💡 If you want to leave the number of decimal digits unlimited, simply leave the "Precision" value blank.

 

---

### Defining the Output Format for Booleans

When exporting a boolean attribute, you have the option to change the values that appear for true and false values. Some examples of values that could be used instead of "true" and "false" include:
- "Yes" and "No"
- "Y" and "N"
- "T" and "F"

###

![Defining Export Settings for Attributes-3.1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Format%20for%20Attributes%20Upon%20Export/Defining%20Export%20Settings%20for%20Attributes-3.1.jpg?width=688&height=318&name=Defining%20Export%20Settings%20for%20Attributes-3.1.jpg)

---

### Defining the Output Format for Relationships

When exporting relationships, you may want to export only the related product(s), or you may want to include a quantity if your products are related to each other in a ratio other than 1:1. You can add, remove, and reorder the format for this export by dragging and dropping: 
- Identifier - default "**SKU**"
- Quantity Separator - default "**#**"
- Quantity

###

![Defining Export Settings for Attributes-4.1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Defining%20the%20Format%20for%20Attributes%20Upon%20Export/Defining%20Export%20Settings%20for%20Attributes-4.1.jpg?width=688&height=479&name=Defining%20Export%20Settings%20for%20Attributes-4.1.jpg)

**For example:**

Your product is a double bed. This product is assigned a relationship called "Suggested Products" which includes products that compliment this bed like pillows, sheets, and headboards. When exporting this relationship, the "Suggested Products" related to the bed will appear as follows:
-
 - PillowSKU#2
 - SheetSetSKU#1
 - HeadboardSKU#1

 If you selected the option to "Show quantity separator," the separator field can't be empty:

![Exporting Relationships-Validation.](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Exporting%20Relationships/Exporting%20Relationships-Validation..png?width=688&height=467&name=Exporting%20Relationships-Validation..png)

---

### What's next?

- Learn about [creating and managing product categories](https://help.plytix.com/en/create-and-manage-product-categories)
- Learn how to [define export settings for media attributes](https://help.plytix.com/en/defining-export-settings-for-media-attributes)
- Learn how to [define the format for images upon export](https://help.plytix.com/en/resize-images)

 

---
