---
title: Swapping Attribute Types
source_url: https://help.plytix.com/en/swapping-attribute-types
description: "How to change an attribute from one attribute type to another in Plytix"
---

# Swapping Attribute Types

## How to change an attribute from one attribute type to another in Plytix
 Sometimes you realize that an attribute works better as a different attribute type. The best way of switching an attribute type is to export the attribute and re-import it as a new one. This article will walk you through the steps to do this.    [Exporting the attribute](#exporting) [Cleaning up the data for import](#sanitizing) [Deleting the old attribute](#deleting) [Importing as a new attribute](#importing)   _*Skip to any section in this article by clicking on the links above_ 

---

### Exporting the attribute

1. Click on "**Products**" in the navigation menu.
2. Choose "**All products**" from the dropdown. This will take you to the product overview table.
3. Select all your products **(****_This ensures all the attribute information stays attached to their respective products when you re-import)_**_.
_
4. Click "**Export**" 

[![overview-export-csv](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Swapping%20Attribute%20Types/overview-export-csv.png?width=644&height=343&name=overview-export-csv.png)](https://help.plytix.com/hubfs/Help%20center/Managing%20products/Bulk%20edit%20products/swap-attribute-type.png)
5. On the format window, choose to export as a CSV. 
6. Select the attribute(s) you wish to change.
7. Click "**Export**"

![overview-export-csv-attribute_selector](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Swapping%20Attribute%20Types/overview-export-csv-attribute_selector.png?width=670&height=357&name=overview-export-csv-attribute_selector.png)

 

ℹ️  Learn more about [exporting product information](https://help.plytix.com/export-product-data).

---

### Cleaning up the data for import

Now, you might need to clean up the data to ensure it will fit the requirements of the new attribute. 

 

****

_****_********

_****__****_

![Screenshot 2019-11-01 at 12.35.58](https://help.plytix.com/hs-fs/hubfs/Screenshot%202019-11-01%20at%2012.35.58.png?width=337&name=Screenshot%202019-11-01%20at%2012.35.58.png)

| For example: 
I want to change the "Color" attribute from multi-select to dropdown.
The product rows with multiple color options, such as the last two rows below, should be changed to say "Various" or "Multi-Colored" so they can be selected from a dropdown. |
| --- |

 

---

### **Deleting the old attribute**

When you create a custom attribute, the system automatically creates an attribute label. This attribute label is the unique identifier of the attribute inside Plytix and cannot be changed by users. If you want the new attribute to have the same label, then must **delete the old attribute before you import again. **

To [delete an attribute](https://help.plytix.com/create-and-manage-product-attributes#delete):
1. Go to **"Settings"** in the top menu
2. Select the attribute you want to delete
3. Click the "Delete" button that appears at the top of the table
4. Confirm your deletion

![settings-attributes-delete](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Swapping%20Attribute%20Types/settings-attributes-delete.png?width=670&height=357&name=settings-attributes-delete.png)

ℹ️ You might need special permissions to delete an attribute

⚠️  Attributes cannot be deleted if they are used in Channels or Brand Portals. You must first remove them from these places. 

---

### Importing as a new attribute 

Once you've sanitized your data and deleted the old attribute, you can now import that data back as a new attribute.

To do this:
1. follow the steps to [import product data](https://help.plytix.com/import-product) 
2. During data matching, click "**+ Create new**" attribute 
3. Choose the new attribute type you want to use

![import-matching-create_new](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Swapping%20Attribute%20Types/import-matching-create_new.png?width=670&height=357&name=import-matching-create_new.png)

https://help.plytix.com/hubfs/choose-new-attribute-type.png

---

### What's Next?

- Check out the different [attributes types](https://help.plytix.com/attribute-types) you can choose from
- Take a look at the [system attributes](https://help.plytix.com/system-attributes) that come with your Plytix PIM
- Check out how to use [attributes in Brand Portals.](https://help.plytix.com/applying-attributes-to-e-catalogs)

---
