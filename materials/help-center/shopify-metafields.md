---
title: Using Shopify Metafields
source_url: https://help.plytix.com/en/shopify-metafields
description: "How to create and manage metafields to optimally display your product information on Shopify"
---

# Using Shopify Metafields

## How to create and manage metafields to optimally display your product information on Shopify

Metafields are Shopify's answer to custom attributes. They can be applied to different parts of your Shopify store including products, customers, orders, and other objects. This article explains the various types of metafields, what information they can hold, and how to create them in a Plytix Shopify channel.

🚀 Plytix is compatible with Metafields 2.0! 

[What are metafields?](#what)

[Types of Metafields](#types)

[1. Metafields Without a Definition](#without_def)

[2. Metafields With a Definition](#with_def)
    [Product Reference Metafields](#PRODUCT-REFERENCE)

[Metafield Definitions](#adding_defs)

[Metafield Values](#adding_values)

[Metafield Lists](#lists)

_*Skip to any section in this article by clicking on the links above_

---

### What are metafields?

Metafields let you add extra fields to your Shopify store beyond what's built in by default, so you can display product information that Shopify doesn't have a native field for. For example, if you sell bicycles, you might want to show the number of speeds; if you sell food, you'll probably need to list the ingredients. Metafields don't have to be customer-facing either, some are used purely for internal purposes your team needs but customers never see.

In Plytix, you can create and manage these metafields directly from your Shopify channel, so you're not setting them up manually in Shopify and then matching the data separately.
- [Metafields without definition](#without_def)
- [Metafields with definition](#with_def)

**In short:** metafields _without_ a definition are simpler to set up but need Shopify Liquid code to display on your storefront. Metafields _with_ a definition take a bit more setup, but if you're on a Shopify Online Store 2.0 theme, you can connect most of them directly through the theme editor with no coding required. If you're not sure which to use, definition-based metafields are the easier path for most storefronts.

ℹ️ If you sell in multiple languages using Shopify Markets, several metafield types (Single Line Text, Multi Line Text, Rich Text, File Reference, and URL) can also be translated per language. Learn more in [Managing Shopify Markets and Languages](https://help.plytix.com/en/shopify-markets).

---

### Types of Metafields

Originally, Shopify offered three types of metafields, which are all supported by Plytix:
- **Integer**
- **String**
- **JSON string**

These are what we refer to as metafields _without_ definition, and they are available only for the product level.

On the other hand, metafields _with_ definition are available on a product and variant level. Shopify has 20 different types of metafields with definition (those in **bold** are currently supported by Plytix), grouped here by category:
- **Text & URLs**: **Single Line Text**, **Multi Line Text**, **Rich Text**, **URL**
- **Numbers & Ratings**: **Integer**, **Decimal**, **Rating**
- **Date & Time**: **Date**, **Date & Time**
- **Measurements**: **Dimension**, **Weight**, **Volume**
- **Color**: **Color**
- **References**: **Product reference**, **Product variant reference**, **File reference**, Page reference*
- **Other**: **True or False**, **JSON String**, Money*

*_May or may not be added in the future according to user needs_

💡 If you need a Money-type metafield, the workaround is to switch that metafield's definition in Shopify to **Decimal** or **Integer** instead, passing a value to an actual Money-type field from Plytix will cause a type-mismatch error.

ℹ️ At the moment Plytix only supports product and variant metafields.

⚠️ **Metaobjects** are a separate Shopify data structure from metafields and aren't directly supported by the Plytix Shopify channel. That said, whether this affects you depends on what the metaobject is used for: if it's holding simple backend or display data (like values for a dropdown picker, or a bit of grouping logic), a supported metafield type can often represent the same data instead. Metaobjects with rich visual or interactive elements (like icon sets, sliders, or before/after widgets) generally can't be represented this way.

 

---

### Metafields without a definition

These metafields do the same basic thing as metafields with a definition, but they are less specific and require the use of Shopify Liquid code in order to display them in your store.  ************ ****

****``**** ****

****``******** ****

****``****

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| Integer | A whole number.
Example: 200 | Match with an Integer attribute. |
| String | A piece of text.
A piece of text.Example: Made with 100% eco-friendly materials. | Match with a Dropdown, Multiselect, Short text, Boolean, or Paragraph attribute. |
| JSON String | A JSON-serializable value. This can be an object, an array, a string, a number, a boolean, or a null value.
Example: {"name":"John", "age":30, "car":null} | Match with a Paragraph attribute. |

#### Create a new metafield without a definition: 

1. Go to the **Metafields** tab of your Shopify channel.
2. Click the **Create metafield** button.

![Using Shopify Metafields-1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-1.jpg?width=655&height=347&name=Using%20Shopify%20Metafields-1.jpg)

3. Select **No definition**.
4. Define the namespace and key.
5. Choose the value type (**Integer**, **String**, or **JSON string**).
6. Click the **Create metafield** button.

**

![Using Shopify Metafields-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-2.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-2.jpg)

**

Now your metafield will be available for mapping.

💡 Want to improve your SEO ranking by changing your products' meta title and meta description with a metafield? [Click here to learn how.](https://help.plytix.com/en/shopify-faq#seo-metafields)

---

 

 

### Metafields with a definition

The new version of metafields does not require any coding on Shopify's end to customize your product pages and is fully compatible with Shopify 2.0 themes. Create metafields in Plytix, then, if you have a Shopify Online Store 2.0 theme, you can connect most metafields to your theme by using the theme editor.

**Text & URLs**

  ************
****``****
****``**************** **** ``````````
****``****

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| Single Line Text | A single line of text.Example: Made in the USA | Match with a short text attribute. |
| Multi Line Text | More than a single line of text.Example: In life, you can never have enough tote bags!... | Match with a paragraph, dropdown, HTML, or multiselect attribute. |
| Rich text | It can only support specific formatting: bold, italic, headlines, URL, unordered and ordered list (numbers and bullet points). | It can only be mapped to an HTML attribute. |
| URL | A URL with one of the allowed schemes: https, http, mailto, sms, tel.Example: https://www.plytix.com/ | Match with a URL attribute. |

 

**Numbers & Ratings**

  ************
****``****
****``****
****``********

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| Integer | A whole number.Example: 16 | Match with an integer attribute. |
| Decimal | A number with a decimal point.Example: 25.99 | Match with a decimal attribute. |
| Rating | A decimal value along a given scale, depending on how you configure your definition in Shopify.Example: 4.7 out of 5 stars | Match with an integer or decimal attribute. |

####  

**Date & Time**

  ************ https://www.iso.org/iso-8601-date-and-time-format.html
****``**** https://www.iso.org/iso-8601-date-and-time-format.html
****``

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| Date | A date in ISO 8601 format without a presumed timezone.Example: 2022-03-21 | Match with a date attribute. |
| Date and Time | A date and time in ISO 8601 format without a presumed timezone.Example: 2017-08-01T12:15:00 |

 

**Measurements** ************
****``************
****``************
****``************

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| Dimension | Either a whole number or decimal value with metric or imperial units of measurement.Example: 10 cm | Match with an integer or decimal attribute and a short text attribute for the unit of measurement. |
| Weight | Either a whole number or decimal value with metric or imperial units of measurement.Example: 3.5 lbs | Match with an integer or decimal attribute and a short text attribute for the unit of measurement. |
| Volume | Either a whole number or decimal value with metric or imperial units of measurement.Example: 750 ml | Match with an integer or decimal attribute and a short text attribute for the unit of measurement. |

 

**Color** ************
****``********

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| Color | The hexadecimal code for a color.Example: #51227f | Match with a short text or dropdown attribute. |

 

**References** ************ ******** ******** ************

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| Product Reference | Products can reference single or parent products. Perfect for bundles, cross-sell, and complete-the-look experiences. | Match with a Relationship from your PIM. |
| Variant Reference | Products can reference variant products. Perfect for bundles, cross-sell, and complete-the-look experiences. | Match with a Relationship from your PIM. |
| File Reference | Accepts any media or file type, including PDF, CSV, MP4, PNG, and more. | Match with a media single, media gallery attribute, or assets. |

⚠️ Reference metafields (Product and Variant) come with a few limitations, see [Product and Variant Reference Metafields](#PRODUCT-REFERENCE) below for details.

**Other** ************
****``****
****``********

| Value Type | Description | Mapping Suggestions |
| --- | --- | --- |
| True or False | A true or false value (use lowercase).Example: true | Match with a boolean attribute. |
| JSON String | A JSON-serializable value. This can be an object, an array, a string, a number, a boolean, or a null value.Example: {"name":"John", "age":30, "car":null} | Match with a paragraph or HTML attribute. |

 

#### Create a new metafield with a definition: 

1. Go to the **Metafields** tab of your Shopify channel.
2. Click the **Create metafield** button.

![Using Shopify Metafields-3](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-3.jpg?width=655&height=347&name=Using%20Shopify%20Metafields-3.jpg)

3. **Definition** is selected by default.
4. Choose if you want your metafield to apply to the **Product** or **Variant**. The main difference here is that by choosing Variant, the metafield will not be displayed in the product detail in Shopify.
5. Define the Namespace, Definition Name, and Key.
6. Choose the type of information you want in this metafield from the **Value Type** dropdown.

![Using Shopify Metafields-4](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-4.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-4.jpg)

7. You have the option to enable **Use in automated collection** to connect this metafield to your automated collections in Shopify.

8. Optionally, add a description for your metafield.

![Using Shopify Metafields-5](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-5.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-5.jpg)

9. Click the **Create Metafield** button.

 

💡 Don't worry about the _definition name_ you assign to your metafield. Its only purpose is to identify the metafield in Shopify's backend.

Now your metafield will be available for mapping.

ℹ️ Shopify allows merchants to create up to **256 metafield definitions** per store, but you can create an unlimited amount of metafields in Plytix. If you're approaching that limit, one option is to consolidate several related attributes into a single JSON-type metafield instead of creating a separate definition for each one, for example, using a formula attribute to combine multiple PIM attributes into one JSON value.

ℹ️  If you want to match an attribute to a metafield that already exists in Shopify, make sure to use the same namespace as the already existing metafield. 

⚠️ The namespace cannot be changed once it is created.

---

 

### Product and Variant Reference Metafields

Product and Variant reference metafields allow you to create relationships between your products in Shopify. They can be used, for example, for upselling, cross-selling, or managing bundles.

 - To set one up in your Shopify channel, select **Product** or **Variant** as the Value Type for your metafield.

![Product reference metafield](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Product%20reference%20metafield.jpg?width=670&height=327&name=Product%20reference%20metafield.jpg)

 - It can be one value or a list of values. Once the metafield is added, you can match it to one of your [Plytix Relationships](https://help.plytix.com/en/relationships/create).

 

⚠️ It is not possible to create [attribute transformations](https://help.plytix.com/en/create-computed-attributes) for product or variant reference metafields.

ℹ️ A **Product reference** metafield can only reference single or parent products from the Relationship. Variants with specified relationships will be ignored when processing the channel, use a **Variant reference** metafield for those instead.

⚠️ A single metafield can't mix product and variant references: if a Relationship mapped to a Variant reference metafield includes single products, those single products will be dropped rather than included. If you need both product-level and variant-level references, map them to two separate metafields instead of one.
- If you remove a product from your Plytix Relationship and sync again to Shopify, the metafield will be updated. However, you need to ensure that the option **Erase the value and delete metafield from product** for products with no metafield value is enabled in the [Metafields settings](https://help.plytix.com/en/shopify-connector#settings) of your channel.
- The order of your products in the Relationship in the PIM will be reflected in your Shopify store after the channel is processed.

⚠️ If a reference metafield points to a product that doesn't exist in Shopify yet (for example, on a first-time sync where the related products are being created at the same time), the reference may not be set correctly, with no error shown, and reprocessing the channel again won't fix it on its own, since both products are now cached. If this happens, clear the cache for the affected products in the **Settings** tab and process the channel again once all the referenced products already exist in Shopify.

ℹ️ If a reference metafield is not mapped in your channel, Plytix won't touch it, so any curation you've done directly in Shopify (e.g. manually adjusting a bundle's related products) will persist. Once a metafield is mapped, however, Plytix's value will overwrite the Shopify-side value on every sync.

---

 

### Metafield Definitions

The term "definition" can be a little confusing, but you can think of it as a template for creating a metafield. A metafield definition includes several main components:

- **Namespace**: this is like a folder in which to keep your metafields. You can have the same namespace and key for two metafields if one is a product and one is a variant. A namespace must be between 3-255 characters.
- **Key**: the name you give your metafield. A key must be between 3-64 characters.
- **Description**: this is optional, but can help to clarify the purpose of the metafield.
- **Value Type**: this determines what type of information the metafield will display.
- **Validation Rule** (not supported by Plytix): this determines what information is valid for a metafield, for example, the number or type of characters it can contain. Different types of metafields have different types of validations, so be sure to set these up in your Shopify account.

ℹ️ There's no need to worry about customers seeing metafield namespaces and keys; they are just a way of organizing your metafields.

---

 

 

### Metafield Values

To add values to a metafield, you'll need to map your Plytix attributes to each one. Click the **Match Metafield** option in the **Metafields** tab of your Shopify channel.

![Using Shopify Metafields-6](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-6.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-6.jpg)

A panel will appear that offers options for matching a metafield to a Plytix attribute. Here you can select an **Existing attribute** from the list...

![Using Shopify Metafields-7](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-7.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-7.jpg)

...or click the **Apply an attribute transformation** option to make a formula attribute that satisfies the metafield's validation rule if needed.

![Using Shopify Metafields-8](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-8.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-8.jpg)

If matching a metafield to a transformation attribute, you'll need to complete one more step: add a formula using an operation to transform your stored attributes. After you click the **Validate and Apply** button, the formula will appear in the **Formatting** section of your metafield.

![Using Shopify Metafields-9](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-9.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-9.jpg)

After matching all of your metafields, click the **Save Changes** button at the top of your channel. Process the channel to push your new metafields through to Shopify.

---

 

### Metafield Lists

When you create a metafield with definition, you may choose either a single value or a list of values. This option is only available for metafields with the supported value types:

- Single line text
- Integer
- Decimal
- References (Product, variant, file and page)
- File
- Color
- Rating
- URL
- Weight
- Volume
- Dimension
- Date
- Date and time

Additionally, some value types require units of measurement, so you'll need to match additional attributes to unit lists for these values.
- Weight
- Volume
- Dimension

ℹ️ You may use up to 128 attributes in a metafield list. This is a limit created by Shopify.

To create a metafield list:
1. Click the **Create metafield** button and give your new metafield a name. Leave **Definition** selected.
2. Next, select whether the list will be a **Product** or **Variant** metafield. Add a namespace, definition name, and key for your reference.
3. Select a value type from the **Value Type** dropdown, then select **List of values**.
4. Click the **Create Metafield** button.

![Using Shopify Metafields-10](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-10.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-10.jpg)

5. Now you'll select which attributes to add by clicking the **+ Add attributes** button.

6. Once you've selected your attributes, you can drag and drop them to change their order. When you are ready, click the **Apply** button.

![Using Shopify Metafields-11](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-11.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-11.jpg)

7. Your metafield list now appears with your other metafields, but it can be distinguished by the `LIS` label that appears at the start.

![Using Shopify Metafields-12](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-12.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-12.jpg)

8. Some lists also require units of measurement. To add these, click the **Match unit list** option.

![Using Shopify Metafields-13](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-13.jpg?width=670&height=181&name=Using%20Shopify%20Metafields-13.jpg)

9. Click the **+ Add attributes** button and select attributes for your units of measurement, then drag and drop to match the order of your previously matched attributes. Click the **Apply** button.

![Using Shopify Metafields-14](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-14.jpg?width=670&height=354&name=Using%20Shopify%20Metafields-14.jpg)

10. Your completed metafield list appears with the attributes you matched (hover to see attributes), and your units of measurement (hover to see units), if applicable.

![Using Shopify Metafields-15](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Using%20Shopify%20Metafields/Using%20Shopify%20Metafields-15.jpg?width=670&height=244&name=Using%20Shopify%20Metafields-15.jpg)

---

###  

### What's next?

- Learn how to [map Shopify fields](https://help.plytix.com/en/mapping-shopify-fields)
- Learn how to [import a Shopify CSV template into Plytix](https://help.plytix.com/en/shopify-import)
- Learn how to [get the API access token from your Shopify store](https://help.plytix.com/en/getting-api-credentials-from-your-shopify-store)

 

---

####
