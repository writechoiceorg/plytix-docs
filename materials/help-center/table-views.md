---
title: Working with Views
source_url: https://help.plytix.com/en/table-views
description: "How to create and manage Table Views to customize what you see in the Product Overview table in Plytix"
---

# Working with Views

## How to create, customize, and manage Views to save columns, filters, sorting, Product Families, and hierarchy levels in your Product Overview

**Views** let you save the full setup of your Product Overview, so you can quickly return to the exact product list you need.

Previously, **Table Views** only saved which columns appeared in your table and how those columns were ordered. Views now go further. A** View** can save your columns, filters, sorting, Product Family, and hierarchy levels together as one complete Product Overview setup.

That means you can create different Views for different workflows, not just different table layouts. For example, instead of rebuilding the same setup every time, you could create a View for:
- Products missing images
- Products ready for Shopify
- Recently updated products
- A specific Product Family
- Parent products only
- Variants only

Each View appears as a tab at the top of the Product Overview. Click a tab to switch between saved setups and see your product catalog in the way that makes sense for the task you're working on.

Every View is also either **Private** or **Shared** with your team, Account Owners and Admins can customize the account's Default View, and you can export directly from any View. More on all three below.

[What is a View?](#what-is-a-view)

[Why use Views?](#why-use-views)

[Table Views vs Views](#table-views-vs-views)

[Where to find Views](#where-to-find-views)

[Private and Shared Views](#private-shared-views)

[Default View](#default-view)#custom-views

[Customizing Your Account's Default View](#customizing-default-view)

[Temporarily Changing the Default View](#temporarily-changing-defview)

[Resetting the Default View](#resseting-def-view)

[Saving Changes from the Default View as a New View](#saving-changes-def-view)

[Creating Custom Views](#custom-views)

[Editing a View](#editing-a-view)

[Duplicating a view](#duplicating-a-view)

[Exporting from a View](#exporting-view)

[Saving and resetting changes](#saving-and-resetting-changes)

[Adjusting columns in a View](#adjusting-columns-in-a-view)

[Reordering View tabs](#reordering-tabs)

[Hiding a View tab](#hiding-a-view)

[Managing Views](#managing-views)

[Deleting Views](#deleting-views)

[Migrating legacy Table Views](#migrating)

[Permissions](#permissions)**
**

**_*_**_Skip to any section in this article by clicking on the links above_

---

### **
**What is a View?

A View is a saved configuration of your Product Overview.

Each View can remember:
- Which columns are displayed

- Which filters are applied

- How products are sorted

- Which Product Family is shown

- Which hierarchy levels are displayed

This lets you combine the structure of your table with the specific product conditions you want to see.

For example, you could create one View that shows only products missing images, with the SKU, thumbnail, status, and image columns visible. You could create another View for products ready for a marketplace, filtered by status and showing only the attributes your team needs to review.

Instead of manually applying the same filters and columns again and again, you can save the setup once and return to it from the View tab bar.

---

### **
**Why use Views?

Views help you move faster when you work with your catalog regularly.

They are useful when you need to:
- Review a specific group of products often
- Save filters and columns together
- Switch between different team workflows
- Focus on specific Product Families
- Review parent products and variants separately
- Keep different catalog cleanup or enrichment tasks organized

In short, Views turn the Product Overview from one general product table into a set of saved workspaces for different jobs.

---

### **
**Table Views vs Views

**Legacy Table Views** only saved the table setup.

They could save things like:
- Which columns were shown
- The order of those columns
- Frozen column status

The new Views save the full Product Overview setup.

**Views can save:**
- Columns
- Filters
- Sorting
- Product Family
- Hierarchy levels

This means Views are not just for changing how your table looks. They also help control which products you see and how you work with them.

---

### **
**Where to find Views

Views live in the tab bar at the top of the Product Overview.

Each tab represents a saved View. Clicking a tab changes the Product Overview to match that saved setup.

![Working with Table Views](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Working%20with%20Table%20Views.jpg?width=670&height=207&name=Working%20with%20Table%20Views.jpg)

You will always see a Default View as the first tab. You can also create custom Views, hide Views from the tab bar, and manage all Views from **Settings > Views.**

---

### Private and Shared Views

Every View you create is either **Private** or **Shared**:
- **Private view**: Visible only to you. Saved changes affect only your view.
- **Shared view**: Visible to all users in the account. Saved changes update the view for everyone.

To set or change a View's type:
1. Open the **...** menu on the View tab.
2. Click **Private view** (or **Shared view**, whichever is currently set) to expand the option.
3. Choose **Private view** or **Shared view** from the submenu that appears.

![Views-private_view](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Working%20with%20table%20views/Views-private_view.png?width=670&height=383&name=Views-private_view.png)

ℹ️ Switching a View from Private to Shared makes it visible to your whole team going forward, and vice versa. Only the View's creator, an Account Owner, or an Account Admin can make this change, the same permissions that apply to editing a View in general.

### Default View

The **Default View** is always available in the Product Overview and appears first in the Views bar. It gives you a consistent starting point with no filters or sorting applied.

 

![Default view - PO](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Default%20view%20-%20PO.jpg?width=670&height=208&name=Default%20view%20-%20PO.jpg)

By default, it shows the following columns:
- SKU
- Thumbnail
- Label
- Status
- Categories
- Last modified
- Created

ℹ️ The Default View can’t be renamed, hidden, or deleted. From the View menu, you can** **Duplicate it, Go to Settings, or Reset to default. 

### Customizing Your Account's Default View

Account Owners and Admins can set the Default View's columns for the whole account, choosing the setup that makes the most sense for their team. This is different from [temporarily changing the Default View](#temp-default-view) for your own session, which only affects what you personally see and doesn't get saved.

To customize the account's Default View:
1. Open the **...** menu on the Default View tab.
2. Select **Edit view**.
3. Adjust the columns you want everyone to see by default.
4. Click **Save changes**.

This updates the Default View for every user in the account going forward, not just your own session.

ℹ️ Only Account Owners and Admins can make this permanent change. Other users can still temporarily adjust their own view of the Default View, but those changes won't be saved for the account.

---

### Temporarily Changing the Default View

You can temporarily change the Default View during your session. For example, you can:
- Add or remove columns
- Apply filters
- Change sorting

These changes don't overwrite the Default View itself.

When you make a temporary change, you'll see:
- An orange dot on the Default View tab
- An **Unsaved view** button in the top-right toolbar

![Default view 2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Default%20view%202.jpg?width=670&height=140&name=Default%20view%202.jpg)

This shows that the current setup has changed, but has not been saved as a View.

---

### Resetting the Default View

To undo temporary changes and return to the original Default View:
1. Open the **...** menu on the Default View tab.
2. Select **Reset view**.

Your columns, filters, and sorting will return to the original system setup.

---

### Saving Changes from the Default View as a New View

If you change the Default View and want to keep that setup, you can save it as a new custom View.

To save your modified Default View:
1. Make your changes to the Default View.
2. Click **Unsaved changes** in the top-right toolbar.
3. Select **+ Save as new view**.

** **

**

![Default view 2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Default%20view%202.jpg?width=670&height=140&name=Default%20view%202.jpg)

**

A new View will be created with an auto-generated name, such as **New view #1**. The new tab will open in rename mode so you can name it right away.

After the new View is created, the Default View returns to its original setup.

ℹ️ The **Save as new view** button appears in the toolbar only. It is not available from the tab options menu.

---

### Creating Custom Views

Custom Views let you create saved Product Overview setups tailored to the way you work.

You can use custom Views to quickly return to product lists you check often, such as:
- Products missing required information

- Products missing images

- Products ready for a specific sales channel

- Products assigned to a specific Product Family

- Recently modified products

- Parent products only

- Variants only

- Products that need review before publishing

💡 Custom Views are especially useful when different teams need to work with the same product catalog in different ways.

**In order to create a Custom View from the Product Overview Page: **
1. In the table view, click the **+ Create new view** button in the tab bar. 
2. Click **Add new** to continue.
3. A new custom view tab is created and added to the tab bar. The **Edit view** side panel opens automatically.
4. Enter a name for your new View.
5. Configure the View settings, such as columns, **filters, sorting, product family, or levels displayed. **This configuration can be done in the panel or directly from the Product Overview page/table. 

**

![Create a custom view](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Create%20a%20custom%20view.jpg?width=670&height=327&name=Create%20a%20custom%20view.jpg)

**

You can configure: ********

| Setting | What it does |
| --- | --- |
| View name | Lets you name or rename the View |
| Product Family | Shows all products or products from a specific Product Family |
| Levels displayed | Shows parents, variants, or all hierarchy levels |
| Sorting | Sorts products by a selected sortable attribute |
| Columns displayed | Lets you choose which columns appear in the View |
| Filters applied | Lets you choose which filters are applied |

ℹ️ Changes made in the panel take effect as a live preview immediately, but are not saved until you explicitly click **Save changes.**

       6.    Click **Save changes** to keep the new Custom View.

Once the new Custom View is created, you'll see these options in its **...** menu:
- Edit view
- Duplicate view
- Export as CSV
- Copy view link
- Open in new tab
- Hide tab
- Go to settings
- Private view / Shared view (see [Private and Shared Views](#view-types) below)

![Edit options](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Edit%20options.jpg?width=670&height=234&name=Edit%20options.jpg)

ℹ️  You can show up to **5 Custom Views** in the Product Overview. To add a new one after reaching the limit, first hide or remove an existing Custom View.

---

### Editing a View

To edit an existing custom View:
1. Open the **...** menu on the View tab.
2. Select **Edit view**.
3. Make your changes in the settings panel.
4. Click **Save changes**.

![Edit view](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Edit%20view.jpg?width=670&height=216&name=Edit%20view.jpg)

Once saved, the View will keep the updated setup the next time you open it.

---

### **
**Duplicating a View

Duplicating a View lets you create a copy without rebuilding it from scratch.

The duplicated View keeps the same:
- Columns
- Filters
- Sorting
- Product Family
- Displayed hierarchy levels

To duplicate a View:
1. Open the **...** menu on the View tab.
2. Select **Duplicate view**.

![Duplicate](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Duplicate.jpg?width=670&height=216&name=Duplicate.jpg)

A new View is created and opened automatically. It will be named after the original View, followed by **duplicated**.

For example, duplicating a View called **Shopify review** would create a new View called **Shopify review duplicated**.

### Exporting from a View

Every View's **...** menu includes an **Export as CSV** option, letting you export its products and attributes directly, in just a couple of clicks. The export matches exactly what's shown in that View, its columns and whichever products meet its filters, so you don't need to manually reselect anything in a separate export flow.

To export from a View:
1. Open the **...** menu on the View tab.
2. Select **Export as CSV**.

ℹ️ This exports the same products and attributes currently visible in the View, as a CSV file. If you want to export something different, adjust the View's filters and columns first, or export directly from the Product Overview instead.

---

### **
**Saving and resetting changes

Whenever you change a View, it enters an unsaved state.

This can happen when you update:
- Columns
- Filters
- Sorting
- Product Family
- Displayed hierarchy levels

When a View has unsaved changes, you’ll see:
- An orange dot on the active tab
- A gray dot on inactive tabs with unsaved changes
- Toolbar options to save, save as new, or reset the View

![Saving changes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Saving%20changes.jpg?width=670&height=161&name=Saving%20changes.jpg)

**Save changes**: Click **Save changes** to update the current View with your latest setup. Once saved, the unsaved indicator disappears and a confirmation message is shown. Use this option when you want to overwrite the current View with the setup you're looking at now.

**Save as new view**: Click **Save as new view** to create a new View using the current setup, including any unsaved changes you've made. The original View returns to its last saved setup, and the new View opens as a new tab with an auto-generated name. Use this option when you want to keep the original View, but also save your current setup as a separate View.

**Reset view**: Click **Reset view** to discard unsaved changes and return the View to its last saved setup. For the Default View, this resets it to the original system defaults. Use this option when you were exploring or testing filters and don't want to keep the changes.

**Using Views for temporary exploration**: You don't have to save every change you make. You can adjust filters, sorting, or columns temporarily while exploring your catalog. The Product Overview updates immediately, and the View will show as unsaved.

 

When you’re done, you can choose what to do next:
- Click **Reset view** to return to the saved setup
- Click **Save as new view** to keep the temporary setup as a new View
- Click **Save changes** to update the current View

This gives you room to explore your product data without accidentally changing your saved setup.

---

### **
**Adjusting columns in a View

To make your View easier to work with, you can adjust the width of most columns in the Product Overview.

To change a column width, drag the edge of the column until it displays the information the way you want.

![Changing Column Width](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Changing%20Column%20Width.jpg?width=670&height=149&name=Changing%20Column%20Width.jpg)

💡 You can also use keyboard shortcuts to navigate through your View, similar to how you would work in a spreadsheet.

 ⚠️ Column width cannot be adjusted for the following attribute types:
- Boolean
- Media Gallery
- Media Single
- HTML
- Completeness
- Date

---

### **
**Reordering View tabs

You can drag custom View tabs to change their order in the tab bar. The Default View always stays first and can't be moved.

Changing the order of tabs doesn't change the setup of any View. All columns, filters, and sorting remain unchanged.

---

### **
**Hiding a View tab

Hiding a View removes it from the tab bar without deleting it.

This is useful when you want to keep a View saved, but do not need it visible all the time.

To hide a View:
1. Open the **...** menu on the View tab.
2. Select **Hide tab**.

![Hiding tab](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Hiding%20tab.jpg?width=670&height=222&name=Hiding%20tab.jpg)

The tab will disappear from the Product Overview, and the next available tab will become active.If the View has unsaved changes, you’ll see a warning before the tab is hidden. The Default View cannot be hidden.

### Opening a Hidden View

Hidden Views are still saved. You can open them again from the View tab bar.

To open a hidden View:
1. Click the **+ Create new view** button in the View tab bar.
2. Select the hidden View you want to open.

The selected View will be restored as an active tab.

---

### **
**Managing Views

You can manage all Views from **Settings > Views**. This is where you can see both visible and hidden Views. From this page, you can:
- See all saved Views
- See who created and last modified each View, and when
- Open the edit panel for any View
- Duplicate a View
- Open a View in a new tab
- Copy a link to a View
- Delete a View

You can access Settings from the left-hand navigation menu or by opening the **...** menu on a View tab and selecting **Go to Settings**.

Use **Settings > Views** when you want to manage your full list of Views, not just the tabs currently shown in the Product Overview.

ℹ️  For more details on managing Views from the Settings Tab, check out our article on how to [create and manage product views](/create-and-manage-product-table-views). 

---

### Deleting Views

Views can only be deleted from **Settings > Views**. They can't be deleted from the Product Overview tab menu. This helps prevent confusion between hiding a View and permanently deleting it.

To delete a View:
1. Go to **Settings**.
2. Go to **Views**.
3. Find the View you want to delete.
4. Click the **...** menu next to the View.
5. Select **Delete**.
6. Type `DELETE` to confirm the action.

⚠️ Deleting a View is permanent and cannot be undone.

Only account owners, admins, and the View creator can delete a View. If you do not have permission, the Delete option will be disabled with a tooltip explaining why.

If the deleted View was your last active tab, you’ll be taken back to the Default View.

---

### **
**Migrating legacy Table Views

[Migrating a Table View from the Product Overview](#migrating-po)

[Migrating a Table View from Settings](#migrating-from-settings)

If your account has existing Table Views, you can migrate them to the new Views experience before legacy Table Views are removed.

When you migrate a Table View, its column configuration is copied into a new View. This includes:
- Column selection
- Column order
- Frozen column status

The new View is created with a default name, such as _New view #15_. You'll need to rename and save it manually.

You can also add filters, sorting, a Product Family, and hierarchy levels to the new View. Once saved, the new View is independent of the original Table View.

#### **Migrating a Table View from the Product Overview**

1. Click the **+** next to your View tabs.
2. Select **Add from a table view**.
3. Choose the legacy Table View you want to migrate.
4. Click **Apply**.
5. Click the current **New view #X** name and enter a name for the View.
6. Configure the Product Family, hierarchy levels, filters, or sorting as needed.
7. Click the back icon in the upper-left corner to return to the Product Overview.
8. Open the **Unsaved view** menu and select **Save changes**.
9. Confirm by clicking **Yes, save changes**.

![Legacy table views](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Working%20with%20Table%20Views/new%20design%202026/Legacy%20table%20views.jpg?width=670&height=335&name=Legacy%20table%20views.jpg)

#### **Migrating a Table View from Settings**

1. Go to **Settings → Views**.
2. Click **New**.
3. Select **From table view**.
4. Choose the legacy Table View you want to migrate.
5. Click the current **New view #X** name and enter a name for the View.
6. Configure the Product Family, hierarchy levels, filters, or sorting as needed.
7. Click **Save** in the lower-right corner.

---

### **
**Permissions

Any user with access to the PIM can create a View, Private or Shared. However, visibility and editing permissions are restricted. ******** **** **** **** **** **** ****

| Action | Who can do it |
| --- | --- |
| Create Views | All users |
| View and search a Shared View | All users with access to the PIM |
| View a Private View | Only its creator |
| Modify a View | View creator, Account Owner, or Account Admin |
| Delete a View | View creator, Account Owner, or Account Admin |
| Edit the account's Default View | Account Owner or Account Admin only |

If you don't have permission to view, modify, or delete a View, the relevant option will be disabled or hidden.

---

### What's Next? 

-

Learn how to use [filters](https://help.plytix.com/filtering) to search through products 
-

Create [smart and static lists](https://help.plytix.com/create-and-manage-product-lists)
- Learn how to [edit your products](https://help.plytix.com/edit-product-attributes) 

---
