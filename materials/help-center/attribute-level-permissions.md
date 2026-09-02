---
title: Managing Attribute-Level Permissions for Team Roles
source_url: https://help.plytix.com/en/attribute-level-permissions
description: "How to change permissions at an attribute-level"
---

# Managing Attribute-Level Permissions for Team Roles

## How to change permissions at an attribute-level

Plytix is a great tool to use for collaborative work, as there is no limit to how many users can access a single PIM account. As a result, your PIM account will probably have users with different roles interacting with your product information differently (e.g., for content editing, retail management, checking manufacturers’ information, etc.). 

Editing attribute-level permissions helps all the different roles reflected in your account keep your centralized product information free from unwanted errors by:
- Limiting attributes edit access only for roles whose responsibility includes modifying attribute values
- Avoiding accidental changes to attributes that are not relevant to certain roles
- Choosing which attributes can be edited and by whom
- Alternatively, locking attribute values to avoid further edits, by granting “View” only permissions

This article will discuss the two options for attribute-level permissions and how to edit attribute-level rights at a single level and in bulk.

[Prerequisites](#prerequisites)

[Page overview](#page-overview)

[Editing permissions for a single attribute](#edit-single)

[Bulk-editing attribute-level permissions](#edit-bulk)

_*Skip to any section in this article by clicking on the links above_

---

### Prerequisites:

To manage attribute-level permissions in your account, you must first:
- Be the Owner or Admin in the account (you can learn more about system roles [here](https://help.plytix.com/en/system-roles))
- Have at least one custom role created (you can learn how to create custom roles [here](https://help.plytix.com/en/team-roles-creation))

ℹ️ Permissions are granted to each _role_, not to each _user_; you can create **up to 15** [custom roles](https://help.plytix.com/en/team-roles-creation) in a single PIM account, and then assign them to different users

To access the Attribute Permissions page and edit permissions for specific attributes, you must first follow these steps:
1. Under the custom role details, check the **‘Product Information Management’ **option
2. For Products, select **‘Edit’ **in the dropdown
3. Under “Product-level access,” find “Attributes.” Select **‘Edit’** in the dropdown options.

ℹ️ For Attributes, there are only two options: "Edit" or "View"

[![roles-activate_attribute_editing](https://help.plytix.com/hs-fs/hubfs/roles-activate_attribute_editing.png?width=670&height=357&name=roles-activate_attribute_editing.png)](https://help.plytix.com/hubfs/Help%20center/Using%20Plytix/Managing%20Attribute-Level%20Permissions/2.jpg)

💡 You can also access the Attribute Permissions page by going to **Settings > Attributes > Permissions**

---

### Page overview

In the Attributes table, you will view a list of your attributes with the number of roles under “View Permissions” or “Edit Permissions.” Hover over the number of team roles under each permission type ("Edit" or "View") to see the list of roles granted a specific type of permission. 

In the Permissions page, you can filter attributes in two ways:
-  By** “attribute groups”** 
- By **“product family”**

In the search bar, you can search by attribute name.

![attibute_permissions_tab](https://help.plytix.com/hs-fs/hubfs/attibute_permissions_tab.png?width=670&height=357&name=attibute_permissions_tab.png)

---

### Editing permissions for a single attribute

1. Select the attribute for which you want to edit the permissions settings. A toolbar will appear at the bottom of the screen showing the number of attributes selected. Click the pencil icon to open **‘Edit permissions’**.

![attribute_permissions_selected](https://help.plytix.com/hs-fs/hubfs/attribute_permissions_selected.png?width=670&height=357&name=attribute_permissions_selected.png)

2. A panel will appear with a list of your Custom Roles. The checked box refers to whether they have "View" or "Edit" permissions for the attribute you selected. Select the **‘View’ **box for the respective role; when this is checked, the role will only be able to view the attribute, but can’t make any changes to it. If you wish for a role to be able to make changes to an attribute, check the** ‘Edit’ **box. 

![attribute_permissions_edit](https://help.plytix.com/hs-fs/hubfs/attribute_permissions_edit.png?width=670&height=357&name=attribute_permissions_edit.png)

If a role has "View" rights for all attributes, you will not be able to grant them "Edit" rights for specific attributes on the Attributes page. To change this, head over to the Account Settings page, and [change their access](#edit-single) to Attributes to "Edit."

![attribute_permissions_view](https://help.plytix.com/hs-fs/hubfs/attribute_permissions_view.png?width=670&height=357&name=attribute_permissions_view.png)

When hovering over an attribute for which the user has "View" rights, they will see a lock icon and a message that says "You don't have permission to edit this attribute" will pop up. 

![attribute_permissions_denied](https://help.plytix.com/hs-fs/hubfs/attribute_permissions_denied.png?width=670&height=357&name=attribute_permissions_denied.png)

⚠️ Attribute-level permissions limit the edition of attributes in the interface, but **do not** limit it in the importer. This means that, if a role has “View” rights for some attributes, but “Edit” rights for imports, they will still be able to import their edits for **all attributes**, regardless of permissions set in the PIM. To avoid this, head over to the Product permissions tab in Roles settings, and set “Import” to  “View” or “None.”

---

### Bulk-editing attribute-level permissions 

You may want to assign the same permission type for several attributes. To achieve this, you can bulk edit attribute-level permissions. 
1. In the Permissions page, select the attributes you want to bulk edit. Click **'Edit permissions'**

![attribute_permissions-bulk_edit](https://help.plytix.com/hs-fs/hubfs/attribute_permissions-bulk_edit.png?width=670&height=357&name=attribute_permissions-bulk_edit.png)

2. Check** ‘View’ **or **‘Edit’ **for the type of permission you want to grant for the specific role in each row. 

![attribute_permissions-bulk_edit (2)](https://help.plytix.com/hs-fs/hubfs/attribute_permissions-bulk_edit%20(2).png?width=670&height=357&name=attribute_permissions-bulk_edit%20(2).png)

⚠️ When you bulk edit attribute-level rights, the edits you did will be applied to all the attributes you selected. If you wish to change the permission type for only one attribute, select a [single attribute](#edit-single) and edit its permission type.

When bulk editing attribute permissions, you may come across the case of “**Mixed permissions**.” “Mixed permissions” are when a custom role has “View” permissions for some of the selected attributes and “Edit” permissions for other selected attributes.

So, in the example below, the Sales role has Mixed permission types for the 8 attributes I selected. This means that the Sales role has “Edit” permissions for some of the selected attributes and “View” permissions for others. When you bulk edit permission rights for different attributes, the same permission type will be granted for all the attributes you selected. 

![attribute_permissions-bulk_edit-mixed_permissions](https://help.plytix.com/hs-fs/hubfs/attribute_permissions-bulk_edit-mixed_permissions.png?width=670&height=357&name=attribute_permissions-bulk_edit-mixed_permissions.png)

ℹ️ In the case of Mixed permissions in bulk editing, you cannot view which attributes have “View” or “Edit” permissions. To view specific permissions for individual attributes, unselect the other attributes in the Overview page, select a single attribute, and click **‘Edit permissions’**

### What’s Next?

- Learn how to [create and manage team roles](https://help.plytix.com/en/team-roles-creation) in Plytix
- Learn about the different [system roles](https://help.plytix.com/en/system-roles) available in your account 
- Learn how to [add, delete, and manage users](https://help.plytix.com/en/account-users)

 

---
