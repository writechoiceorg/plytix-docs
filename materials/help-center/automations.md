---
title: Setting Rules for Product Updates Using Automations
source_url: https://help.plytix.com/en/automations
description: "How to create and manage automated rules to improve product data quality and reduce manual work"
---

# Setting Rules for Product Updates Using Automations

## How to create and manage automated rules to improve product data quality and reduce manual work

[What are Automations?](#what-are-the-automations)

[Creating Automations](#creating-automations)

[Using AI in Automations](#using-ai-in-automations)

[Managing Your Automations](#managing-your-automations)

[Common Automation Use Cases](#use-cases)

[Best Practices](#best-practices)

[FAQ](#faq)

_*Skip to any section in this article by clicking on the links above_

---

### What are Automations?

Automations are smart if/then rules that help you maintain high-quality product data by identifying, correcting, and validating product information based on conditions you define.

**Key Benefits:**
- Reduce manual work: automatically complete missing attributes and standardize data
- Improve data quality: ensure consistent and accurate product information
- Save time: eliminate repetitive data correction tasks
- Scale efficiently: handle large catalogs without additional manual work.

**How Automations Work:**

Automations follow a simple condition → action logic:
- IF certain conditions are met (e.g. Brand is empty)
- THEN perform specific actions (e.g. set Brand = "Your Brand Name")

---

### Creating Automations

ℹ️ Please note that you need to have Admin or Editor permissions to create  Automations

**To create an automation,** navigate to the main menu and click on the "Automations" icon (⚡).

![Create an automation 1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Product%20Editing/Workflows/New%20design%202026/Create%20an%20automation%201.jpg?width=670&height=278&name=Create%20an%20automation%201.jpg)

A panel will open up where you can create your automation logic. Click **"+New"** to begin.

💡 **Pro Tip:** Start with simple automations to test the functionality before creating complex automation rules

**Step 1: Name your automation so you can easily identify its purpose****.** Use descriptive names like "Auto-complete Brand for Electronics"

**Step 2: Define trigger conditions:**
1. Click **"Add Condition" **or **"Add Relationship"**
2. Select the **attribute **you want to include in the condition.
3. Choose the **operator** (equals, contains, is empty, etc.).
4. Set the **value** (if applicable).

Example: IF Brand is not defined AND Category equals "Electronics".

ℹ️ These conditions work similarly to Plytix filters. By using **AND** and **OR **logical operators, you can create more tailored and complex rules that better match your needs and give you more flexibility. 

![Create an automation Trigger](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Product%20Editing/Workflows/New%20design%202026/Create%20an%20automation%20Trigger.jpg?width=670&height=342&name=Create%20an%20automation%20Trigger.jpg)

**Step 3: Add an action** to define what happens when conditions are met. Click **Add Action** and choose from:
 - Edit attributes
 - Find and replace
 - Edit relationships
 - Edit categories
 - Assign Family
 - **AI actions** _(see below)_

**

![Automation - Action](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Product%20Editing/Workflows/New%20design%202026/Automation%20-%20Action.jpg?width=670&height=341&name=Automation%20-%20Action.jpg)

**

 

**Step 4: Choose when products enter the automation:**
- **When products change**_,_ only applies to products that start meeting the condition going forward
- **All matching products,** applies to both existing and future products that meet the condition

![Entry Settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Product%20Editing/Workflows/New%20design%202026/Entry%20Settings.jpg?width=670&height=257&name=Entry%20Settings.jpg)

**Step 5: Define the change to be applied**, then click **Save** to create and activate the automation.          

![Automations - Change to be applied](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Product%20Editing/Workflows/New%20design%202026/Automations%20-%20Change%20to%20be%20applied.jpg?width=670&height=348&name=Automations%20-%20Change%20to%20be%20applied.jpg)

** **

ℹ️ **Note**: Automations run automatically when defined conditions change. 

### Using AI Actions in Automations

When adding an action step, you can select an **AI action** to automatically generate or update the content of a specified attribute, without any manual intervention.

This brings the power of **Bulk AI** into your automation rules. Instead of running Bulk AI manually, you can set conditions that trigger AI to act automatically whenever a product meets your criteria.

**Common AI action use cases:**
- Normalize or standardize field values (e.g. clean up inconsistent formatting)
- Enrich or regenerate product descriptions when a product is added to a collection
- Translate content automatically when a field is updated
- Correct errors in text attributes based on defined conditions
- Conditionally regenerate titles or descriptions based on category or status

⚠️ AI actions operate on attribute content once products are already in the PIM. They do not assist with field mapping during the import process itself. If you're importing new products, the automation will act on them once they exist in the platform and meet the defined conditions.

⚠️ Automations with AI actions are automatically suspended if your account runs out of credits, so they don't run and create a negative balance.

You'll see a **'Suspended'** label on the Automations page (hover for details), and a warning banner on the automation's detail page explaining why. You'll also get an email when this happens. Once you have enough credits again, whether by purchasing more or at your next monthly reset, you'll need to go back into the automation's detail page and click **'Resume'** to reactivate it, it won't resume on its own.

💡 Automations can also be suspended for other reasons, for example, if they reference an attribute that's since been deleted. In that case, remove the reference to the deleted attribute before resuming.

---

### Managing Your Automations

You can access all automations by clicking the Automations icon (⚡️) in the left sidebar. From there, you can find:
- **Active Automations**: Currently enabled and running
- **Pause Automations**: Created but disabled, so they’re not running

You’ll also see when your automations were last modified, and who made the changes. 

For each automation, you can:
- **Edit: **Modify conditions and actions
- **Enable/Disable**: Turn automations on or off
- **Duplicate: **Quickly clone an existing automation rule

- **Delete:** Permanently remove automations

![Edit Automations](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Product%20Editing/Workflows/New%20design%202026/Edit%20Automations.jpg?width=670&height=328&name=Edit%20Automations.jpg)

**Audit Trail**

Every automation includes an overview of when it was last updated: 
- **Modified by**: User who modified the automation
- **Last modified**: Most recent changes

![Automations](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Product%20Editing/Workflows/New%20design%202026/Automations.jpg?width=670&height=355&name=Automations.jpg)

---

### Common Automation Use Cases

There are several use cases for setting up automations. Some common ones include:
- **Complete missing attributes**

Scenario: Products imported from ERP are missing Brand information.

IF: Brand is empty
AND: Category equals "Electronics"
THEN: Set Brand = "TechCorp"
- **Auto-complete using related attributes**

Scenario: Set warranty period based on product category

IF: Category equals "Laptop"
AND: Warranty is empty
THEN: Set Warranty = "1 Year"
- **Validate Core Attributes**

Scenario: Mark products as incomplete when essential fields are missing

IF: Product description is empty
OR: Barcode is empty
THEN: Set Status = "Incomplete"
- ** Update Status Based on Completeness**

Scenario: Automatically mark status as “Ready” when all required fields are filled

IF: Description is not empty
AND: Thumbnail is not empty
AND: Brand is not empty
THEN: Set Status = "Ready"
-

**Translate content on update** _(AI action)_

Scenario: Automatically translate product descriptions into another language whenever the source content is updated.

IF: Description is updated
AND: Language equals "English"
THEN: AI translates Description to target language

---

### **Best Practices **

When setting up automations, there are a few best practices for optimal performance. 
- **Start simple: **We recommend starting with basic single-condition automations, before making your rules more complex.
- **Test thoroughly**: Use a small product subset before full deployment
- **Document logic**: Use clear automation names to identify their purpose
-

**Avoid conflicts**: Ensure automations don't contradict each other

---

### **FAQ**

**When is an automation triggered?
**Automations run automatically when the defined conditions change. This happens during:
- Product updates via import 
- Manual attribute edits
- Other automation executions that modify relevant attributes

**Can I pause or stop a running automation?
**You cannot stop an automation process once it has started. To prevent it from running again, disable the automation by clicking 'Pause' in the automation editing panel. 

**Can I schedule when automations should run?
**Currently, automation run automatically whenever the conditions are met. Time-based scheduling is not available in the current version.**
**

**How do I handle products that change while automations are running?
**Automation will continue to execute based on their defined conditions, even if other processes are simultaneously modifying the same products.

**What happens if I delete an automation?
**Deleting an automation removes it permanently, and will no longer run. But it doesn't reverse changes already made to products. Consider disabling instead of deleting for testing purposes.

**Are there limits on the number of automations I can create?
**There are no set limits, but performance may be affected by having too many complex automations running at the same time. 

**What happens if my account runs out of AI credits while an automation is running?
**Any automation with an AI action will be automatically suspended before it runs, rather than executing and creating a negative credit balance. You'll see a **'Suspended'** label on the Automations page, a warning banner on the automation's detail page, and you'll receive an email notifying you of the suspension.

**How do I resume a suspended automation?
**Once you have enough credits, either by purchasing more or at your next monthly reset, go to the automation's detail page and click **'Resume'.** Automations don't resume automatically, even once credits are available again.

**Are there other reasons an automation can be suspended?
**Yes. An automation can also be suspended if it references an attribute that's since been deleted. In that case, you'll need to remove that attribute from the automation before you can resume it.

 

---

### What´s next? 

- Learn more about [Attributes Types](https://help.plytix.com/en/attribute-types)
- Learn how to [Navigating the Product Overview Page](https://help.plytix.com/en/navigating-the-product-overview-page)
- Learn how to [Work With Product Lists](https://help.plytix.com/en/create-and-manage-product-lists)

---
