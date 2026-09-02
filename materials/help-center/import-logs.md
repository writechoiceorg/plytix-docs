---
title: Viewing Import Logs
source_url: https://help.plytix.com/en/import-logs
description: "How to view and interpret the records of your imports in Plytix"
---

# Viewing Import Logs

## How to view and interpret the records of your imports in Plytix

Now that you know how to [import product data](https://help.plytix.com/import-product) into the PIM, let's take a look at how you can see the status of your recent imports in the Import Log. 

 

[Accessing the Import Logs](#accessing-import-logs)

[Import Logs Overview](#import-log-overview)

[Log Details](#log-details)

 

* _Skip to any section in this article by clicking on any of the links above_

 

---

### Accessing the Import Logs 

 

To view a history of your 25 most recent finished imports:
1. ****
2. ****
3. ****

| Go to the top navigation menu and click 'Products'.
Click 'Import' from the dropdown and you will be taken to the Import area.
Click 'Logs' on the left side navigation menu. |
| --- |

You are now on the Import Logs Overview page where you can see your last 25 imports.

![1_Import logs - Accessing](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Import%20logs/1_Import%20logs%20-%20Accessing.png?width=670&height=357&name=1_Import%20logs%20-%20Accessing.png)

---

### Import Logs Overview

 

Imports will be be displayed in this table. Each import will contain the following information:

####

![2_Import logs - Overview](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Import%20logs/2_Import%20logs%20-%20Overview.png?width=670&height=357&name=2_Import%20logs%20-%20Overview.png)

####  

#### DATE

The '**Date'** column lists the date and time of when the import started. Clicking on the date will take you to that import's **[Log Details](#log-details) **that will show you how each product was processed.

 

💡 You can sort imports by most recent imports first, or oldest imports first. 

#### SOURCE

Under '**Source'** you will be able to see the type of import: whether it is a manual import or a scheduled feed import.

#### FILE NAME

The third column contains the name of the file imported. 

 

💡 You can sort imports by filename A-Z or Z-A. 

 

#### **STATE**

The '**State'** column identifies in what part of the import process this file is at.

There are two states: 

![matching](https://help.plytix.com/hs-fs/hubfs/matching.png?width=167&name=matching.png)

![finished](https://help.plytix.com/hs-fs/hubfs/finished.png?width=160&name=finished.png)

| | This means a user on this account has begun the importing process. |
| --- | --- |
| | This means the import is done. |

 

💡 You can sort imports by their state alphabetically.

 

#### RESULT

The result identifies how successfully an import was processed. 

There are four types of results: 

  **

![](https://help.plytix.com/hubfs/success-png.png)

**

 **

![](https://help.plytix.com/hubfs/warning-png.png)

** **

![](https://help.plytix.com/hubfs/cancelled-png.png)

** **

![](https://help.plytix.com/hs-fs/hubfs/error-png.png?width=85&name=error-png.png)

**

| | This means all products and matched columns were successfully    imported into the PIM. |
| --- | --- |
| | This means one or more of your products or attributes failed to import. |
| | This means the import was cancelled at some point during the import      process. |
| | This means the import failed and no new products or attributes were   added or updated to the PIM. |

 

💡 You can sort imports by results A-Z or Z-A. 

 

---

###  

### Log Details 

The Log Details page is where you can see how each product was imported and the results in more detail. It is where you'll find an explanation for what part of the import resulted in a warning or error. 

![3_Import logs - Details](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Import%20logs/3_Import%20logs%20-%20Details.png?width=670&height=357&name=3_Import%20logs%20-%20Details.png)

You can get here two ways: 
-
-

![eye-icon](https://help.plytix.com/hs-fs/hubfs/eye-icon.png?width=41&name=eye-icon.png)

| Clicking on an import's date
Hovering over the import's row and clicking on the eye icon |
| --- |

💡 If you hover over the info icon

![info icon](https://help.plytix.com/hs-fs/hubfs/info%20icon.png?width=22&name=info%20icon.png)

 by the **Result**, you will see a quick summary of the state of all products processed.  

 

The **Log Details **table consists of the following 5 columns: 

#### Line 

This refers to how many rows of products were imported from your spreadsheet and in what order. 

#### SKU 

This refers to your product SKU. Clicking on this will give you a summary of the **State** of the import.

#### Label 

If you matched a column in your spreadsheet to the [System Attribute](https://help.plytix.com/system-attributes) "Label" (the textual identifier for products in Plytix), then the contents of that cell will be seen here. 

#### Action

Refers to the following three ways the PIM will process a product: 

![create](https://help.plytix.com/hs-fs/hubfs/create.png?width=153&name=create.png)

![update](https://help.plytix.com/hs-fs/hubfs/update.png?width=162&name=update.png)

![skip](https://help.plytix.com/hs-fs/hubfs/skip.png?width=127&name=skip.png)

| | If this is a new SKU in the PIM |
| --- | --- |
| | If the SKU is already in the PIM |
| | If the SKU cell was left blank |

#### State

This refers to the following state of each individual product in your spreadsheet:

![success-png](https://help.plytix.com/hs-fs/hubfs/success-png.png?width=149&name=success-png.png)

![warning-png](https://help.plytix.com/hs-fs/hubfs/warning-png.png?width=159&name=warning-png.png)

![](https://help.plytix.com/hubfs/cancelled-png-1.png)

![](https://help.plytix.com/hubfs/failed-png.png)

| | This means the product (SKU) and attributes (columns) were successfully imported into the PIM. |
| --- | --- |
| | This usually means that the product was successfully imported into the PIM, but that there was a problem with one or more of the attributes. |
| | This means someone cancelled the import before this product was imported into the PIM |
| | This means the product failed to be imported into the PIM (this usually happens when the SKU cell is empty or there is another error). |

 

####  

ℹ️ You can search and filter through this table to quickly find any errors in your spreadsheet. You can also download this log table and the original CSV you used for importing.

 

---

###  

### What's next?

Now that you know what our Import Logs look like, why not: 
- Check out our [export logs](https://help.plytix.com/export-logs) 
- Learn about some of the most common [import problems](https://help.plytix.com/import-errors)
- [Invite team members](https://help.plytix.com/account-users) to collaborate

 

---
