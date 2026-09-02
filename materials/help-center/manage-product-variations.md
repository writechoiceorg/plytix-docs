---
title: Creating and Managing Variants and Sub-variants
source_url: https://help.plytix.com/en/manage-product-variations
description: "How to create and link product variants and sub-variants in Plytix"
---

# Creating and Managing Variants and Sub-variants

## How to create and link product variants and sub-variants in Plytix

If you manage a diverse product catalog, keeping data consistent across different product levels is key. In Plytix, you can organize your product structure into up to three levels:
- **Level 1: Parent products** – The main product that holds shared information.
- **Level 2: Variants** – Versions of the parent product that differ in specific attributes, like color.
- **Level 3: Sub-variants **– More detailed options of a variant, such as different sizes.

In this article, we’ll show you how to set up variants and sub-variants in Plytix, and how to manage updates across these product levels to keep your data consistent.

[Understanding Product Variants and Sub-variants](#what)

[Creating Variants and Sub-variants](#create)

[Resyncing Updates from a Parent and from a Variant](#resync)

[Unlinking Variants and Sub-variants](#unlink)

_
*Skip to any section in this article by clicking on the links above_

---

### Understanding Product Variants and Sub-variants

Working with a multilevel product structure - parents, variants and sub-variants - is a great tool when you’re selling different versions or options of the same product.

Think of a parent product as the framework for what you want to sell. A variant then, reflects the configured versions of that product that make up the different options that you will actually sell. A sub-variant refers to the specific versions of the variant.

For example, you may be selling a t-shirt in different colors. The “framework” of those options is your parent product, and the different color options that you’re selling are your variants. The sub-variants would be the different sizes available for each color.

The benefit of using product variants and sub-variants is that you have a built-in structure that optimizes your product data management. You can also customize what information is shared across your product levels using [automatic inheritance](https://help.plytix.com/en/how-to-create-and-manage-product-families#edit-inheritance-status) to avoid manual updates

---

### Creating Variants and Sub-variants

There are two ways to add new variants and sub-variants in Plytix:  1. Via import
 

ℹ️ Check out [this article to learn how to add variants and sub-variants via import](https://help.plytix.com/en/prepare-your-sheet-for-import)

2. Within the product detail page:

#### **To add variants from a product's detail page:**

1. Navigate to the product you want to be the parent.
2. Click the **"Variants"** tab to manage variants for the product.
3. Here you can view all the linked variants and add new ones

![manage-product-variation-01](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-01.png?width=624&height=357&name=manage-product-variation-01.png)

4. Click the **"Add Variant"** button on the left side of the screen

5. From here you can create a new product as a variant, or link an existing product 

![manage-product-variation-02](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-02.png?width=670&height=383&name=manage-product-variation-02.png)

 

![manage-product-variation-03](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-03.png?width=670&height=383&name=manage-product-variation-03.png)

ℹ️ If a product belongs to [a product family,](https://help.plytix.com/en/how-to-create-and-manage-product-families)you can only link products that belong to the same family. If there are no other products in that family, you will only have the option to create a new product as a variant 

6.  If the parent product belongs to a product family, the variants will inherit the values of attributes with inheritance ON which will cause the variant values for those attributes to be replaced by the parent's.

Confirm your selection and click "Add variant."

ℹ️ Learn more about [Attribute Inheritance.](https://help.plytix.com/en/how-to-create-and-manage-product-families#edit-inheritance-status)

ℹ️ You can have up to 300 variants and sub-variants per parent product.

#### **To add sub-variants from a product's detail page:**

1. Click on the Level 2 product you want to add a sub-variant to
2. Head to  the **"Variants" **tab
3. Here you can see all the linked sub-variants and add new ones
4. To add a new sub-variant, click the **"Add Variant"** button on the left side of the screen

![manage-product-variation-05](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-05.png?width=670&height=383&name=manage-product-variation-05.png)

    5.   From here you can create a new product as a sub-variant, or link an existing product 

![manage-product-variation-06](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-06.png?width=670&height=383&name=manage-product-variation-06.png)

![manage-product-variation-07](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-07.png?width=670&height=383&name=manage-product-variation-07.png)

ℹ️ If a product belongs to a [product family](https://help.plytix.com/en/how-to-create-and-manage-product-families), you can only link products that belong to the same family. If there are no other products in that family, you will only have the option to create a new product as a sub-variant. 

      6.   If the parent and variant product belong to a product family, the sub-variants will inherit    the values of attributes with inheritance ON.

Confirm your selection and click "Add variant."

💡Use [attribute status](https://help.plytix.com/en/product-editing-overview#att-view-options) filters to view which attributes are being inherited.

---

### Resyncing Updates from a Parent and from a Variant

If the parent product belongs to a family, attributes with the inheritance status ON (Level 1) will automatically be synced from the parent to all its variants and sub-variants.

If inheritance for the attributes is set to ON (Level 2), attributes will automatically sync from the variant to all its sub-variants. 

ℹ️ Learn more about[Attribute Inheritance.](https://help.plytix.com/en/how-to-create-and-manage-product-families#edit-inheritance-status)

**Overwriting an inherited attribute**
If you have edited an inherited attribute for a particular product, it will show as "Overwritten" and that product will no longer inherit the value from the product levels above. You can always resync an overwritten attribute  by clicking "Resync" directly from the product [detail page.](https://help.plytix.com/en/product-editing-overview#attributes)

**To resync attributes:**

1. Go to the parent's (Level 1) or variant’s (Level 2) detail page and click on the "Variants" tab

2. Choose the variants or sub-variants for which values you want to resync back with inherited attributes 

3. Click "Resync"

![manage-product-variation-09](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-09.png?width=670&height=383&name=manage-product-variation-09.png)

4. Select the attributes you'd like to resync with the original inherited value 

![manage-product-variation-10](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-10.png?width=670&height=383&name=manage-product-variation-10.png)

5. Click "Next," then confirm your decision and click "Resync variants"

⚠️ Resyncing variants will cause the inherited values to be restored. This will replace any overwritten value

Then all the changes will be applied for all the variants listed in the table.

If you'd like to just copy values for specific attributes from a different product level once, you can click "Copy values" in the options that pop up after selecting your variants. 

###  

---

### Unlinking Variants and Sub-variants

If you’d like to unlink a given variant or sub-variant, select the product you’d like to unlink and click the "Unlink" button above the table view. Unlinked products will remain in your Plytix account as single products. [![manage-product-variation-12](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Manage%20product%20variants/manage-product-variation-12.png?width=670&height=383&name=manage-product-variation-12.png)](https://help.plytix.com/hubfs/Help%20center/Using%20Plytix/Creating%20and%20Managing%20Product%20Variants/Updated/unlink-variants.jpg)

To unlink variants from parents in bulk:
1. Go to the All Products page and select the variants you want to unlink.
2. Export the selection, including the "SKU" and "Variant of" attributes.
3. In the exported CSV, clear the values in the "Variant of" column, leaving those cells blank.
4. Re-import the CSV. When mapping columns, match "SKU" to SKU and "Variant Of" to Variant Of.

Plytix will treat those products as single products on import.

⚠️ Please note that unlinking products may result in data loss, including the loss of inherited values.

---

### What's Next

- Learn how to [manage product categories](https://help.plytix.com/create-and-manage-product-categories)
- Learn how to[link assets to products](https://help.plytix.com/link-and-unlink-files-to-products)
- Learn about [Relationships](https://help.plytix.com/relationships/create)[, a distinct feature for linking related products (e.g. upsells or cross-sells)](https://help.plytix.com/link-and-unlink-files-to-products)

 

---
