---
title: Restricting Options of Dropdown or Multiselect Attributes upon Import
source_url: https://help.plytix.com/en/restricting-options-of-dropdown-or-multiselect-attributes
description: "How to restrict and validate options for Dropdown or Multiselect attributes upon import in Plytix"
---

# Restricting Options of Dropdown or Multiselect Attributes upon Import

## How to restrict and validate options for Dropdown or Multiselect attributes upon import in Plytix

When working with Dropdown or Multiselect attributes it can be helpful to restrict adding new options upon import to Dropdown or Multiselect attributes, to avoid potential errors when handling product data. In this article you will learn how to restrict the options within Dropdown or Multiselect attributes and restrict the creation of new options for these attributes upon import.

 

[Restricting New Options in Settings](#locking)

[Editing Restricted Attributes](#edit)

[Matching a CSV File to Restricted Attributes](#match)

[Import Logs](#log)

_*Skip to a section in this article by clicking on the links above
_

⚠️ Only admins of an account are able to restrict options of a Dropdown or Multi-select attribute.

---

###  

### **Restricting New Dropdown or Multiselect Options in Settings**

As an admin in Plytix, you have the option to restrict new options upon import or creation when creating or editing a dropdown or multi-select type attribute.

For this you need to:
1. Go to the “**Settings**” section of the PIM under “**Product attributes**”
2. Create or edit a Dropdown or Multiselect attribute
3. Click on “**Restrict**” Edit/Add options on import

![Restrict](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Restricting%20Options%20of%20Dropdown%20or%20Multi-Select%20Attributes%20Upon%20Import/Restrict.jpg?width=688&height=338&name=Restrict.jpg)

---

###  

### **Editing Restricted Attributes**

Users can still edit restricted Dropdown or Multiselect attributes from within the PIM in the settings section, adding or deleting options or even changing this attribute restriction. 

However, users cannot add duplicate options that match an already existing one. 

![Duplicated-option](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Restricting%20Options%20of%20Dropdown%20or%20Multi-Select%20Attributes%20Upon%20Import/Duplicated-option.jpg?width=688&height=417&name=Duplicated-option.jpg)

 

---

###  

### **Matching a CSV File to Restricted Attributes **

When importing a CSV file that contains a restricted attribute, there are a couple of things to keep in mind. When mapping the attributes you will see a little message saying “_This is a restricted attribute. Only valid options will be accepted upon import_.” This way you will know that this attribute is restricted. 

![Restricting Options of Dropdown or Multiselect Attributes upon Import](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Restricting%20Options%20of%20Dropdown%20or%20Multi-Select%20Attributes%20Upon%20Import/Restricting%20Options%20of%20Dropdown%20or%20Multiselect%20Attributes%20upon%20Import.jpg?width=688&height=190&name=Restricting%20Options%20of%20Dropdown%20or%20Multiselect%20Attributes%20upon%20Import.jpg)

Values that do not match any options available in the system will not be imported and will be case sensitive. But if the value matches an option’s letters but not the cases, then that option will be imported to the matching option (example: value RED or red will match option Red). 

 

---

###  

### Import Logs 

After you have successfully imported a CSV with values that didn’t match any options for a restricted Dropdown or Multiselect, the state of the log is **“Finished”** but the result is **“Warning”**. 

[![Warning](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Restricting%20Options%20of%20Dropdown%20or%20Multi-Select%20Attributes%20Upon%20Import/Warning.jpg?width=688&height=226&name=Warning.jpg)](https://help.plytix.com/hubfs/Help%20center/Settings/Create%20and%20manage%20product%20attributes/log-import-restricted-attribute.png)

If you open the log detail you can see which products were affected since these will be marked with a “**Warning**” and contain the following message: “_Attribute X has an invalid value “X”. New values were not added because they do not match valid options established for the attribute_.” 

![Warning-message](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Restricting%20Options%20of%20Dropdown%20or%20Multi-Select%20Attributes%20Upon%20Import/Warning-message.jpg?width=688&height=116&name=Warning-message.jpg)

---

###
What's next?

- Learn how to [create and manage product attributes](https://help.plytix.com/en/create-and-manage-product-attributes)
- Learn more about [attribute types](https://help.plytix.com/en/attribute-types)
- Learn how to [edit product attributes](https://help.plytix.com/en/edit-product-attributes)

---
