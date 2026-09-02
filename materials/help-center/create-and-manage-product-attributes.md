---
title: Creating and Managing Product Attributes
source_url: https://help.plytix.com/en/create-and-manage-product-attributes
description: "Learn what attributes are, and how to create and use them in Plytix"
---

# Creating and Managing Product Attributes

## Learn what attributes are, and how to create and use them in Plytix

**Product Attributes** are fields that hold your product information in Plytix. These are the building blocks for your product content. Other systems may call these properties, values, or fields.

In this article, we will teach you how to create and manage custom product attributes in Plytix.

[Creating a New Attribute](#create)

[Editing Attribute Options](#options)

[Renaming and Modifying Existing Attributes](#editing)

[Adding Attributes to Groups](#att-group)

[Adding Attributes to Product Families](#product-families)

[Deleting Attributes](#delete)

[See Attributes in Use](#use)

 

_*Skip to any section in this article by clicking on the links above_

---

###  

### Creating a New Attribute

There are two ways to create new attributes, either from Settings or upon import. To learn how to [create attributes upon import click here.](https://help.plytix.com/import-product)

**Create a new attribute from Settings:**

1. Navigate to **'Settings'** in the side menu.

ℹ️ The Settings area will automatically open in the **'Attributes'** tab. If not, you may not have permissions to manage attributes.

2. Click the '**Create attribute'** button in the top left corner. This will open the attribute creation panel.
[![settings-attributes-add](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-add.png?width=670&height=357&name=settings-attributes-add.png)](https://help.plytix.com/hubfs/Help%20center/Settings/Create%20and%20manage%20product%20attributes/attributes-setting.png)

3. **Choose** the [attribute type](https://help.plytix.com/attribute-types) you want to create. Once selected, you'll see a brief description of that attribute type, along with the fields to fill in on the right.

![settings-attributes-create](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-create.png?width=670&height=357&name=settings-attributes-create.png)

4. **Type a name **for your attribute and the label will be created automatically. You may also choose to add a description to help other users of your account understand what kind of information this attribute holds.

![settings-attributes-create-attribute_details](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-create-attribute_details.png?width=670&height=357&name=settings-attributes-create-attribute_details.png)

5.  Depending on the attribute type you've chosen, you may see some **additional settings:**
-
 - **Short Text** and **Paragraph** attributes let you tick 'Limit characters input' to set a maximum character count.
 - **Dropdown** and **Multiselect** attributes let you define the selectable options, as well as how they're sorted and whether new options can be added on import. See [Editing Attribute Options](#editing-attribute-options) below for details.
 - **Completeness** and **Formula** attributes can only be configured from Settings, they're not available to create upon import. Completeness attributes [track how complete your product data is based on other attributes](https://help.plytix.com/en/completeness-tracking), while [Formula attributes let you transform the output of other attributes](https://help.plytix.com/en/formula-attributes).

[![settings-attributes-create-attribute_type](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-create-attribute_type.png?width=670&height=357&name=settings-attributes-create-attribute_type.png)](https://help.plytix.com/hubfs/Help%20center/Settings/Create%20and%20manage%20product%20attributes/create-attribute-settings.png) 6. Once you have finished, click **'Create Attribute'.**
[![settings-attributes-create_attribute_button](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-create_attribute_button.png?width=670&height=357&name=settings-attributes-create_attribute_button.png)](https://help.plytix.com/hubfs/Help%20center/Settings/Create%20and%20manage%20product%20attributes/create-attributes-settings.png)

If you want to create multiple attributes in a row, click the '**Create this and another'** button to start the process over again. 

⚠️ In order to keep your data clean and simple, it's not possible to create an attribute with the same name as an already existing one. 

ℹ️ Labels will be automatically generated by the system based on the attribute name. So if your attribute name is **"Product Description**" the label will become "**product_description". **Labels cannot be edited after creation.

 

---

 

### Editing Attribute Options

There are 3 attribute types that have options associated with them: Dropdown, Multi-select, and [Completeness attributes](https://help.plytix.com/en/completeness-tracking).

#### Dropdown and Multi-select Options

These attribute types require you to define the different selectable options that will appear in the PIM. If you select one of these attributes, you will see the following options:

[![settings-attributes-dropdown-settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-dropdown-settings.png?width=670&height=357&name=settings-attributes-dropdown-settings.png)](https://help.plytix.com/hubfs/Help%20center/Settings/Create%20and%20manage%20product%20attributes/dropdown-attribute.png)
- **'Sort Options By' **will determine how your options appear in the PIM.
You can choose to sort them by '**Name'** (alphabetically, choose ascending or descending) or create your own '**Manual order'** via drag and drop.
- '**Add options on import'** lets you restrict the options one can add upon import for your dropdown or multi-select attributes. When you '**Restrict'** this option, users will not be able to import any options besides those already established in the system. 

To add new options, write in the space provided and click** '+ Add option"** to apply a single option and then add a new one.

[![settings-attributes-dropdown-settings-add_option](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-dropdown-settings-add_option.png?width=670&height=357&name=settings-attributes-dropdown-settings-add_option.png)](https://help.plytix.com/hubfs/Help%20center/Settings/Create%20and%20manage%20product%20attributes/add-option-dropdown.png)

⚠️ Options are **case-sensitive**. Be careful with options to avoid creating the same Dropdown or Multi-select attribute, i.e. "Blue" and "blue".

💡Try restricting the ability to add options on import for more consistent, sanitized data in your Dropdown or Mulit-select attributes. [Learn more about restricting your Dropdown or Multi-select attributes here](https://help.plytix.com/en/restricting-options-of-dropdown-or-multiselect-attributes).

 

### Renaming and Modifying Existing Attributes

All attributes can be modified after creation. Elements you can change are: **the name **and** **the** attribute options.**

**To edit an attribute name:**
1. Go to **'Settings'** in the side menu.
2. Find the attribute you want to edit by scrolling or using the search bar.
3. Click on the '**Name'** of the attribute to modify the name.
4. Hit '**enter'** on your keyboard.

**

![settings-attributes-rename](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-rename.png?width=670&height=357&name=settings-attributes-rename.png)

To To modify attribute options:
**
1. From the 'Attributes' area of the 'Settings' tab, find the attribute you want to edit.
2. Click on the pencil icon.
3.  Modify your attribute options as desired and click 'Save Attribute'.

![settings-attributes-edit_attribute](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-edit_attribute.png?width=644&height=343&name=settings-attributes-edit_attribute.png)

⚠️ If you remove an option from a Dropdown or Multiselect attribute, that value will also be removed from any products that currently contain that value.

---

### Adding Attributes to Groups

To add attributes to **attribute groups**:

1. In Settings, go to the 'Attributes' tab. From the Attributes list, tick the checkbox next to the attribute or attributes you'd like to add to a group(s).

2. Then, click the option "Add to groups" that pops up in the toolbar.

![settings-attributes-add_to_groups](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-add_to_groups.png?width=670&height=357&name=settings-attributes-add_to_groups.png)

3. Select the groups you want to add your attributes to.

![settings-attributes-add_to_groups-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-add_to_groups-2.png?width=670&height=357&name=settings-attributes-add_to_groups-2.png)

4. Click "Save."

---

### Adding Attributes to Product Families

To add attributes to **product families:**

1. In Settings, go to the 'Attributes' tab. From the Attributes list, tick the checkbox next to the attribute or attributes you'd like to add to a family. A menu will appear at the bottom of the screen showing how many attributes are selected.

2. Click on the "Add to families" icon that pops up in the toolbar. This opens the "Add to families" panel.

![settings-attributes-add_to_families](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-add_to_families.png?width=670&height=357&name=settings-attributes-add_to_families.png)

ℹ️ Completeness attributes cannot be added to product families.

3. Under 'Families,' select one or more families to add the attribute(s) to.

![settings-attributes-add_to_families-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-add_to_families-2.png?width=670&height=357&name=settings-attributes-add_to_families-2.png)

4. Under **'Set inheritance,'** choose whether the attribute(s) should inherit automatically from the parent product to its variants. You can set this separately for Level 1 and Level 2 variants by ticking 'ON' next to each attribute.

![settings-attributes-add_to_families-3](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-add_to_families-3.png?width=670&height=357&name=settings-attributes-add_to_families-3.png)

ℹ️ Learn more about [setting the inheritance status here](https://help.plytix.com/en/how-to-create-and-manage-product-families#edit-inheritance-status).

⚠️ Setting inheritance to ON for an attribute will cause the parent's value to overwrite whatever value the variant currently has for that attribute.

### Deleting an Attribute

**To delete an attribute:**
1. Go to '**Settings'** in the side menu.
2. Select the attribute you want to delete.
3. Click the **'Delete' **button that appears at the top of the table.

![settings-attributes-delete](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-delete.png?width=655&height=349&name=settings-attributes-delete.png)

4. Confirm your deletion by typing "DELETE" and clicking **'Delete'**.

![settings-attributes-delete-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-delete-2.png?width=670&height=357&name=settings-attributes-delete-2.png)

⚠️  If an attribute is being used in a Channel or a Brand Portal, they must be removed from those locations before they're deleted. 

###  

---

### Attributes in Use

In Plytix, you can see the locations where each attribute is used. 

**To see attributes in use: **

1. Go to '**Settings'** in the side menu.

2. In the '**Attributes'** area, find the attribute you want to see in use.

3. Hover over the attribute to reveal the **'See Locations'** icon.

![settings-attributes-see_locations](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-see_locations.png?width=670&height=357&name=settings-attributes-see_locations.png)

4. Click the icon to show everywhere this attribute is used.

![settings-attributes-locations](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Creating%20and%20Managing%20Product%20Attributes/settings-attributes-locations.png?width=670&height=357&name=settings-attributes-locations.png)

5. Click on the dropdown to filter by Products, Brand Portals, or Channels. You can click on the different sections to be taken to the Product, Channel, or Brand Portal where the attribute is used. 

💡 Hover over an item to copy its URL.

---

###  

### What's next?

- Learn how to [organize your attributes by group](https://help.plytix.com/how-to-arrange-attributes-in-groups)
- Learn about [adding content to your products](https://help.plytix.com/product-editing-overview)
- Learn how to [use attribute filters to find information](https://help.plytix.com/adding-filter-attributes)

 

---
