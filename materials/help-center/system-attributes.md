---
title: System Attributes
source_url: https://help.plytix.com/en/system-attributes
description: "Learn about the standard Plytix attributes that come preloaded into all Plytix accounts"
---

# System Attributes

## Learn about the standard Plytix attributes

In this article, we will go over each of the **12 **System Attributes including what type of attribute they are and how you can use them. 

 

ℹ️ System attributes are included by default in Plytix. They cannot be renamed or deleted from the PIM. You can always [create additional custom attributes](https://help.plytix.com/how-to-create-and-manage-product-attributes). 

  #SKU#GTIN#last-modified #label#thumbnail#created #variation-of#categories#status #variants#files#family #product_id

| SKU | GTIN | Last modified |
| --- | --- | --- |
| Label | Thumbnail | Created |
| Variant of | Categories | Status |
| Variants | Assets | Family |
| Product ID | | |

 

_*Skip to any section in this article by clicking on the links above_

---

### What are System Attributes?

System attributes are attributes that are by default included in Plytix. As you can see below, System Attributes are easily identified by the purple "SYS" before the attribute name. 

![SYS](https://help.plytix.com/hs-fs/hubfs/SYS.jpg?width=670&height=474&name=SYS.jpg)

---

### SKU 

This is the unique identifier of all your products and is used as such for imports, exports, and lookups. It is the only field that is **required for all products** in the PIM. 

**Type:** Short Text

⚠️  The **SKU must be unique** to a product (no two products can have the same SKU). 

⚠️ SKUs are **case sensitive.**

**⚠️ SKUs can have a maximum of 100 characters.**

---

### Label

This is a short-text identifier for your products. This shows in the product overview page as well as a product detail page.

![Label](https://help.plytix.com/hs-fs/hubfs/Help%20center/Getting%20Started/System%20Attributes/New%20design%202026/Label.jpg?width=670&height=182&name=Label.jpg)

Click on a product to head to its detail page: 

![System Attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Getting%20Started/System%20Attributes/New%20design%202026/System%20Attributes.jpg?width=670&height=320&name=System%20Attributes.jpg)

**Type:** Short Text

💡 A Label makes it easier to identify your products in places like our [import logs](https://help.plytix.com/import-logs).

---

### Variant of 

When you input values in this attribute, it will automatically identify the product as a child or variant of another product**. **The attribute can only contain one SKU which corresponds to the parent product. The 'Variant of' attribute is also used for sub-variants to indicate their variant SKU. 

![Importing Data Preparing Your CSV - subvariants (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Getting%20Started/Importing%20Data%20-%20Preparing%20Your%20CSV/Importing%20Data%20Preparing%20Your%20CSV%20-%20subvariants%20(1).jpg?width=670&height=110&name=Importing%20Data%20Preparing%20Your%20CSV%20-%20subvariants%20(1).jpg)

**Type:** A special type of short text attribute

ℹ️ Variants cannot have multiple parents. Therefore, the "Variant of" attribute can only contain** ONE SKU**. 

---

### Variants

This field will list all the variant SKUs of a given parent product. This field can contain multiple SKUs.

**Type:** Short text with a list of SKUs

---

### GTIN

This is a unique identifier for your Global Trade Number. This can be an EAN, UPC, JAN...etc. 

**Type:** External validation

⚠️  The GTIN must also be unique to each product. 

⚠️  This attribute will ONLY accept valid GTIN formats between 8 and 14 characters

---

### Thumbnail

This is the "featured image" that will appear around the Plytix platform as the visual identifier of your product. You can [create other Media (Single) attributes](https://help.plytix.com/how-to-create-and-manage-product-attributes) in Settings. 

**Type:** Media Single

ℹ️  This attribute allows for only one output (image).

💡 To add a thumbnail to your product, simply head over to its detail page and click on the picture icon above the label. You can also assign thumbnails [upon import](https://help.plytix.com/en/prepare-your-sheet-for-import).

---

### Categories

This attribute creates category trees. You can assign your product to many categories at a time and categories can be up to 6 levels deep. [Learn how to create categories here.](https://help.plytix.com/create-and-manage-product-categories)

**Type:** A hierarchical multi-select attribute

💡 Categories are a great way to organize your products in [Brand Portals.](https://help.plytix.com/create-and-manage-e-catalogs)

---

### Assets

This attribute lists** ALL **the files (assets) you have linked to a particular product. It is the only attribute of its kind.

**Type:** Media Gallery

ℹ️  The assets attribute cannot be matched during import, but assets that are linked to a product will automatically become part of the assets attribute. 

---

### Last modified

This attribute shows the last time a product was edited. 

**Type:** Date

ℹ️  This date will be updated automatically anytime a product is edited. It cannot be changed or deleted. 

---

### Created

This attribute shows the date of when your product was created. 

**Type:** Date

ℹ️  This is automatically added by the system and cannot be changed or deleted. 

---

### Status

This attribute lets the user set the product as "Complete," "Draft," or "Archived." 

**Type:** Dropdown

![Status SYS](https://help.plytix.com/hs-fs/hubfs/Help%20center/Getting%20Started/System%20Attributes/New%20design%202026/Status%20SYS.jpg?width=670&height=316&name=Status%20SYS.jpg)

💡 Learn more about the [status attribute](https://help.plytix.com/product-status-draft-completed) and how to set the[status of products on import](https://help.plytix.com/import-product#import-overview) 

---

### Family

This attribute allows you to assign products to a group of similar products that all contain the same attributes. 

**Type: **Dropdown

ℹ️ Products can only be assigned to one family. Attributes that are not included in a family will still be displayed on a product that has them, but they cannot be edited. 

---

### Product ID

This attribute is a string of alphanumeric characters that is autogenerated when any new product is created in your account. It is for internal use by Plytix to identify your products. 

**Type:** Short Text

ℹ️ This attribute can be exported, but it cannot be matched during import or viewed/edited within Plytix. 

---

### What's next? 

- Learn more about different [attribute types](https://help.plytix.com/attribute-types)
- Learn how to [create custom attributes](https://help.plytix.com/how-to-create-and-manage-product-attributes)
- Learn about [enriching your product information](https://help.plytix.com/edit-product-attributes)

 

---
