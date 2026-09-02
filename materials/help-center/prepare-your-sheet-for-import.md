---
title: Importing Data: Preparing Your CSV
source_url: https://help.plytix.com/en/prepare-your-sheet-for-import
description: "How to set up a successful product import into the Plytix platform"
---

# Importing Data: Preparing Your CSV

## How to set up a successful product import into the Plytix platform

In this article, you will learn how to structure a CSV file to successfully import data into the Plytix platform. We will go over suggestions for sanitizing data, the required fields, and how to import different entities like categories, variants, and relationships.

 

[Creating Your Master Spreadsheet(s)](#create-your-master-spreadsheet)

[Required Fields and Settings](#Required-settings)

[Other System Fields](#other-system-fields)

[Custom Fields](#custom-fields)

 

* _Skip to any section in this article by clicking on the links above_

 

![](https://play.vidyard.com/cpdicNZcZtW22g5o2Yckv4.jpg)

 

---

### **Creating Your Master Spreadsheet(s)**

To make sure data is uniform when entering Plytix, we suggest creating a sanitized master spreadsheet or spreadsheets. To test the importer and your formatting, start with a small selection of your products.

The functions below will help you reformat your data from multiple sources.

###  

****

****

https://workspace.google.com/u/0/marketplace/app/merge_sheets/850686067510?hl=en&pann=sheets_addon_widget

https://support.microsoft.com/en-us/office/consolidate-data-in-multiple-worksheets-007ce8f4-2fae-4fea-9ee5-a0b2c9e36d9b

https://workspace.google.com/u/0/marketplace/app/merge_values/857144221591?hl=en&pann=sheets_addon_widget

https://support.microsoft.com/en-us/office/combine-text-from-two-or-more-cells-into-one-cell-81ba0946-ce78-42ed-b3c3-21340eb164a6

https://workspace.google.com/u/0/marketplace/app/remove_duplicates/347814268012?hl=en&pann=sheets_addon_widget

https://support.microsoft.com/en-us/office/find-and-remove-duplicates-00e35bea-b46a-4d5d-b28e-66a552dc138d

https://workspace.google.com/u/0/marketplace/app/split_names/1072896854591?hl=en&pann=sheets_addon_widget

https://support.microsoft.com/en-us/office/split-a-cell-f1804d0c-e180-4ed0-a2ae-973a0b7c6a23

https://workspace.google.com/u/0/marketplace/app/advanced_find_and_replace/460077608560?hl=en&pann=sheets_addon_widget

https://workspace.google.com/u/0/marketplace/app/find_fuzzy_matches/225415879714?hl=en&pann=sheets_addon_widget

| Google Sheets | Excel |
| --- | --- |
| Merge Sheets | Consolidate data in multiple sheets |
| Merge Values | Combine text |
| Remove Duplicates | Find and remove duplicates |
| Split Names | Split a cell |
| Advanced Find and Replace | |
| Find Fuzzy Matches | |

### ** **

⚠️  CSV files cannot be more than **20MB **by default. If you need to import larger files, a 50MB limit is available. Reach out to your account manager to get it enabled for your account.

---

###  

### **Required Fields and Settings**

#### SKUs

All products in Plytix **must have a unique SKU.** This is how we identify your products in the system. Your spreadsheet must include **one SKU column**. These SKUs are not limited by characters and can include a combination of letters and numbers.

⚠️ The SKU is required. If you do not include a column with SKUs, you will be unable to complete the import.

The SKU is the only required field. This is one of the 7 pre-defined attributes (system attributes) that you can import into Plytix. All other product information can be created using unlimited user-defined attributes.

💡 For your first import, we suggest gathering a small sample of your data (20-50 products and 5-10 attributes) to get familiar with the PIM. 

#### Required Settings

In your spreadsheet:
1. The first row of your sheet **must include headers** to identify attributes in each column
2. There must be **one product per row**. Each row below the header row will be read by the PIM as a separate, unique product.
3. All values of an attribute must be contained to one cell

Attributes with multiple values such as colors, materials, etc. must be contained to one cell in that row, separated by a delimiter like a comma. You'll be able to choose a format such as multi-select or dropdown for these kinds of attributes during the import process.

ℹ️  When importing attributes with multiple values, you can use a different separator other than a comma by configuring the import settings.

 

---

###  

### **Other System Fields**

The Plytix platform has 6 other pre-defined fields, or [**system attributes**](https://help.plytix.com/system-attributes), that can match with your information upon import. **These are all optional.
**

[Categories](#categories)

[Variant Of](#variant-of)

[Thumbnail](#thumbnail)

[GTIN](#GTIN)

[Label](#label) 

[Product Families](#family)

#### Categories

Plytix Categories is a special hierarchy attribute. Each root category can have up to 6 subcategories contained within it. To import category structures, follow the instructions and example below:
1. Category structures (categories and subcategories) need to be defined with a separator (the examples will use the default separator ">")
2. If a product is in multiple categories, separate category structures with a comma

****

1. __
2. __
3. __
4. __

__****__****__****__****__****__****__

| For example:
 
A pair of pants could have the following category hierarchies:
 

Clothing > Pants > Denim
Collection > 2017 > AW17
Men > Bottoms > Casual Pants > Denim
Men’s Clearance > Denim

 
In a cell it would look like this:

Clothing>Pants>Denim,Collection>2017>AW17,Men>Bottoms>Casual Pants>Denim,Men’s Clearance>Denim |
| --- |

 

ℹ️  The ‘**>**‘ sign is the default option used to define the hierarchy of the categories from top to bottom. To keep the multiple values in the same cell, we separate them with a comma (_other options for defining hierarchies and separating values may be used, and can be set during import)_.

#### Variant Of: Defining Product Links for Variants and Sub-variants

The "Variant of" system attribute allows you to define the link between product levels.
This means that if your product is a variant or sub-variant, you can define the SKU of the product in the level above it in the "Variant of" field. 

In the example below, the Parent product is a t-shirt (SKU "NSP-10172-P") that comes in multiple colors (variants). Each color comes in multiple sizes (sub-variants).

In the spreadsheet, the "White T-Shirt" variant is linked to the parent SKU in the "Variant of" column. And, each size of the white t-shirt (i.e., XL, XS, etc) is linked to the white variant SKU in the "Variant of" column. 

![Importing Data Preparing Your CSV - subvariants (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Getting%20Started/Importing%20Data%20-%20Preparing%20Your%20CSV/Importing%20Data%20Preparing%20Your%20CSV%20-%20subvariants%20(1).jpg?width=670&height=110&name=Importing%20Data%20Preparing%20Your%20CSV%20-%20subvariants%20(1).jpg)

To import variants and sub-variants correctly, make sure that:
-
 -

The SKU noted in the "Variant of" column is in the level right above the product you're importing. For example, a variant will always be linked to a parent, while a sub-variant will always be linked to a variant.
 -

Parent products are at Level 1 so they should always have the "Variant of" column empty. 

💡 Parents of variants can be sellable or non-sellable products. While no company is the same, we recommend setting them up as non-sellable products. [Learn why here.](https://help.plytix.com/en/manage-product-variations)

#### Thumbnail

The Thumbnail system attribute can also be defined upon import. The Thumbnail is the product's visual identifier in the system. This also requires a public URL to be imported.

#### GTIN

The GTIN system attribute is an optional unique identifier in Plytix and is compatible with EANs, UPCs, and other Global Trade Identification Numbers. This attribute will validate the structure of the GTIN and its uniqueness, prohibiting any duplicates.

💡 If you are facing issues validating your GTIN value, we recommend using a website such as [this one](https://boxshot.com/barcode/tutorials/upc-a-calculator/) to identify the right digits for your barcode number.

#### Label

The Label system attribute is the product's textual identifier in the system. This corresponds to your product's name or title. We suggest using a descriptive product name to give a clear idea of the item you're selling.

#### Product Families

Product Families let you group similar products to show only relevant attributes and set consistent values through automatic inheritance.  You can assign products to existing families using a CSV file - but the family must already exist in the PIM. To do this, simply add a "Family" column in your CSV and specify the family you'd like each product to be assigned to.

ℹ️  Learn more about [Assigning Products to Product Families](https://help.plytix.com/en/assigning-products-to-product-families#import)

---

### **
Custom Fields**

#### **Custom Attributes**

You can create an unlimited number of custom fields in Plytix. These are called Custom Attributes. These can all be created upon import.

Learn about the different attribute types you can create [in this article](https://help.plytix.com/en/attribute-types).

 

Now that you have all you need to create a sparkling spreadsheet, you are ready to [import your products](https://help.plytix.com/import-product)! 

 

---

####  

### **What's next?

**

- Learn about [the process of importing your products](https://help.plytix.com/en/import-product)
- Learn how to [upload and import assets](https://help.plytix.com/import-files)
- Learn how to [set up automated imports](https://help.plytix.com/en/feed-imports/csv)

 

---
