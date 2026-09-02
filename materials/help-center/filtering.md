---
title: Using Product Filters
source_url: https://help.plytix.com/en/filtering
description: "How to use Attribute and Relationship filters to find products in Plytix faster"
---

# Using Product Filters

## How to use Attribute and Relationship filters to find products in Plytix faster

This article explains the different ways you can use filters to quickly find products in your Plytix account.

[Finding Product Filters](#finding)

[Attribute Filters](#attribute)

[System Attributes Filters](#System-attr)

[Date Attribute Filters](#relative-date)

[Relationships Filters](#relationships)

[Saving Filters](#saving)

[Clearing Filters](#clearing)

_*Skip to any section in this article by clicking on the links above_

---

 

---

### Finding Product Filters

Narrow down the products you see in the Product Overview table.
1. Click on '**Products'** in the navigation menu.
2. Choose '**All products'** from the dropdown.

Product Filters are found on the right side menu of the Product Overview page. 

![Using Product Filters (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Using%20Product%20Filters%20(1).jpg?width=670&height=330&name=Using%20Product%20Filters%20(1).jpg)

💡You can now resize the side panel so it can be expanded or shrunk to fit your workflow.

---

### Attribute Filters

To use attribute filters: 
1. Click "**Attributes"** in the filter panel

![Filters_ Attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Filters_%20Attributes.jpg?width=644&height=269&name=Filters_%20Attributes.jpg)

**
**
2. From the dropdown, select the attribute for which you would like to filter.
3. Choose the operator.

![Attributes - operator](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Attributes%20-%20operator.jpg?width=644&height=294&name=Attributes%20-%20operator.jpg)

💡  You can further narrow or broaden your search by stacking filters on top of one another. To do this, click '**AND'** or '**OR'** and follow the process to add a filter. 

The Product Overview table will now show the results of your chosen filters.

![Filters - results](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Filters%20-%20results.jpg?width=670&height=330&name=Filters%20-%20results.jpg)

ℹ️  Each attribute type has a specific set of conditions that can be selected to change the parameters of the filter. To learn what types of conditions there are for every attribute type, see the article: [Attribute Types](https://help.plytix.com/attribute-types).

---

 

### **System Attributes Filters**

In addition to filtering by the attributes you've created, there are also some system filters available by default in your PIM to help you find what you need.

#### Assets 

Filter by whether the assets attribute is defined or not (i.e., if there are any assets associated with a product).

#### Categories 

Filter by the categories a product belongs to.

#### Created and Last Modified 

Filter by the date a product was created or last modified. You can also filter by who created or last modified a product using the ‘by’ and ‘by anyone but’ options.

#### Family

Filter products by the family they belong to, or check whether the family attribute is defined for the product or not.

ℹ️ Learn more about [creating and managing product families.](https://help.plytix.com/en/how-to-create-and-manage-product-families)

#### GTIN 

Filter by the Global Trade Item Number (GTIN) to check for specific GTINs or get a list of products where the GTIN is defined or not.

#### Has Variation and Is Variation 

"Has Variation" indicates if a product has different variants, and "Is Variation" identifies if a product is a variant of another.

#### Label 

Find a specific label (a short-text identifier for your products), check whether it is defined, or whether it contains specific text.

#### Product type  

This allows you to filter by the product type. The available options are "Single," "Parent," "Variant" and "Sub-variant."

![Product type](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Product%20type.jpg?width=670&height=195&name=Product%20type.jpg)

ℹ️ Would you like to work with product variants? Learn more about [how to create and manage them in Plytix.](https://help.plytix.com/en/manage-product-variations)

#### SKU

Filter by the SKU to search for specific SKUs, or to exclude products that don't contain any of the specified SKUs.

#### Static Lists 

This allows you to filter by products that belong to a given static list. 

#### Status 

Filter by the product’s status, such as "Completed," "Draft," or "Archived."

#### Thumbnail

Filter by whether products have a thumbnail defined or not.

---

### **
Date Attribute Filters**

When filtering using date attributes (Created, Last Modified or a custom date attribute), you may filter dates dynamically using **relative dates.** This means that instead of constantly updating filters, you can find products based on whether they were modified today, yesterday, a week ago, or up to one year ago.

To use relative date filters:
1. In the **'Filters'** area of the Product Overview, click on the **'New filter'** 
2. Select a date attribute from the attributes list.
3. From the second dropdown, select **'Relative Date.'**
4. Change the number of days according to the results for which you want to filter.

**

![Filters - Date attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Filters%20-%20Date%20attributes.jpg?width=670&height=184&name=Filters%20-%20Date%20attributes.jpg)

**

💡 To filter for only products modified today, type "0" in the days input field. To filter for products modified today and yesterday, type "1".  To filter for products modified in the last week (including today), type "7". Results can be filtered up to 365 days from today.

ℹ️ Note that the relative date selector is based on UTC time. Results include all products modified on a certain date, so they are not relative to a specific hour of the day. For example, selecting "Last 1 days" will return all products modified yesterday and today-- not products only modified in the last 24 hours.

---

 

### Relationship Filters

Relationship filters let you filter your products based on how they relate to other SKUs. You can combine relationship filters with any other filter type: attributes, categories, system attributes, and more, just like any other filter in the panel.

**What's changed:**
Previously, relationship filters were independent and always applied on top of other filters using "AND" logic. They couldn't be mixed with other filter types in the same filter group.
With the new setup, relationship filters are fully integrated into the filter panel. You can combine them freely with any other entity: attributes, categories, and more.

**What happens to saved filters created before this change?
**If you have saved filters (e.g. in Smart Lists) that include relationship filters created before this update, they will **continue to work, **your data won't be affected. However, **you won't be able to edit those old filters**. When you find one, you'll see a prompt explaining that the filter uses the old format and inviting you to:
1. **Remove** the existing relationship filter condition.
2. **Recreate it** using the new filter setup.
 This is a one-time action and takes just a few seconds. Once recreated, your filter will work like any other modern filter in Plytix.  

**To use relationship filters: **
1. Click on the **'****Filters'** icon and select **'****Relationships'**

**

![Relationships Filters](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Relationships%20Filters.jpg?width=670&height=307&name=Relationships%20Filters.jpg)

**

       2.     From the list, select the relationship you want to filter by._
      _ 3. _    _If you selected specific SKUs, define the quantity of related products for which you want                 to filter.

---

### Saving Filters

You can also save your filters to a [smart list](https://help.plytix.com/create-and-manage-product-lists), so you can reload your filtering conditions another time.https://help.plytix.com/smart-and-static-lists

To do this: 
1. Click the **'Save filters'** icon at the top of the filters section.

![Save filters](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Save%20filters.jpg?width=644&height=179&name=Save%20filters.jpg)

2. Select** 'Create new List'** and give your list a name.
3. Click **'Save filter'.

**[![Save filters 2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Save%20filters%202.jpg?width=644&height=341&name=Save%20filters%202.jpg)](https://help.plytix.com/hubfs/Help%20center/Managing%20products/Product%20Details%20Page/save-smart-list.png)

💡 Load a saved filter anytime by clicking '**Load list'.** You can also access these lists under the Product Lists page. 

---

###
Clearing Filters

When you want to view a different set of filters or return to an unfiltered view of all of your products, you can remove one filter at a time or all filters at once.

To remove one filter, hover over it and click  **"Delete condition"**

![Filters - Delete condition](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Filters%20-%20Delete%20condition.jpg?width=670&height=205&name=Filters%20-%20Delete%20condition.jpg)

To remove all selected filters, click on **'Clear all'** at the top of the filters menu.

![Clear all - Filters](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Product%20Filters/New%20design%202026/Clear%20all%20-%20Filters.jpg?width=670&height=212&name=Clear%20all%20-%20Filters.jpg)

---

### What's next?

- Learn about [all the things you can do from the product overview page](https://help.plytix.com/en/navigating-the-product-overview-page)
- Learn how to create [asset lists](https://help.plytix.com/create-and-manage-file-lists)
- Lean how to manage your [product lists](https://help.plytix.com/create-and-manage-product-lists)
