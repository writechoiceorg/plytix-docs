---
title: Replacing SKUs in Bulk
source_url: https://help.plytix.com/en/replacing-skus-bulk
description: "How to replace SKUs in Bulk"
---

# Replacing SKUs in Bulk

## How to update product SKUs across your catalogue using a CSV import

If you need to change the SKU values on existing products, for example after a catalogue restructure or a rebrand, you can do this in bulk using the **Replace existing SKU values** import mode. This is a separate import mode from a standard csv product import: instead of matching data to existing products by SKU, it uses your file to reassign the SKU itself.

ℹ️ Looking to import general product data instead? Check out [Importing Product Data from a CSV File](https://help.plytix.com/en/import-product).

⚠️ This action changes the unique identifier for your products. Double check your file before importing, as SKU changes cannot be undone by Plytix.

 

_*Skip to any section in this article by clicking on the links above_

 

---

### Before you start

Prepare a CSV file with two columns:
- **Current SKU**: the existing SKU as it appears in Plytix
- **New SKU**: the SKU you want to assign

Make sure both columns contain unique values. Duplicate values in either column will cause conflicts during import.

![sku_replacing-01](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/Replacing%20SKUs/sku_replacing-01.png?width=670&height=383&name=sku_replacing-01.png)

---

### How to replace SKUs in bulk

1. Go to the navigation menu and click **"Products"**.
2. Click **"Import"** from the dropdown to open the import area.

#### Step 1: Upload

On the **Upload** screen, use the **Import mode** dropdown in the top right (it defaults to "Create or update products") and select **Replace existing SKU values**.

![sku_replacing-02](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/Replacing%20SKUs/sku_replacing-02.png?width=670&height=383&name=sku_replacing-02.png)

Drag and drop your CSV file into the box, or click to browse and select it. Before you upload, check the requirements shown on this screen:
- **File requirements**: CSV format only, maximum 20 MB, UTF-8 encoding recommended.
- **Required content**: a SKU column with unique values, headers for all columns, and one product per row.

 

💡 Not sure your file is formatted correctly? Use **"Download sample file"** on this screen, or check [how to prepare your spreadsheet](https://help.plytix.com/prepare-your-sheet-for-import).

#### Step 2: File settings

You'll land on the **Import settings** screen. Confirm the **Column separator**, **Text delimiter**, and **Charset** match your file, these are auto-detected but can be changed here if needed.

Below the file settings, you'll see a preview of your data with a **SKU** column and a **New SKU** column, showing up to the first 15 rows found in your file. Use this to confirm the right columns are being read before you continue.

Click **"Next"** once you're happy with the preview.

![sku_replacing-03](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/Replacing%20SKUs/sku_replacing-03.png?width=670&height=383&name=sku_replacing-03.png)

#### Step 3: Data matching

On the **Data matching** screen, Plytix will attempt to auto-match your file's columns to the **SKU** and **New SKU** fields. Check the top right of the screen to confirm **all columns are matched** and that the **SKU column** has been detected.

For each matched column, you can review and adjust:
- **SKU column**: this is the identifier Plytix uses to find the product you're updating. It cannot be empty, if any rows have a blank SKU, they won't be matched to a product.
- **New SKU column**: choose how Plytix should handle this data:
 - **Empty value**: **"Ignore"** leaves the existing SKU untouched if the New SKU field is blank for a row. **"Erase existing"** will remove the SKU entirely if the field is left blank (not recommended, since SKUs are required).
 - **New values**: this is set to **"Overwrite"**, replacing the existing SKU with the new value. **"Add"** is greyed out and not selectable for this field, since a SKU can't have multiple values.

Once your columns are matched and your settings look right, click **"Start SKU replacement"** in the top right to run the import.

![sku_replacing-04](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/Replacing%20SKUs/sku_replacing-04.png?width=670&height=383&name=sku_replacing-04.png)

⚠️ Make sure your CSV contains unique values in both the current SKU and new SKU columns to avoid conflicts during import.

⚠️ Double-check your **New SKU** column settings before starting. Since this action replaces the identifier Plytix uses to track the product, incorrect settings here can affect which products get updated.

---

###  

### What's Next?

- Check the status of your import with [Import Logs](https://help.plytix.com/import-logs)
- Learn how to [import product data from a CSV file](https://help.plytix.com/en/import-product)
- Learn how to [use and apply filters](https://help.plytix.com/filtering)

 

 

 

 

 

 

 

###  

 

 

 

 

 

 

---
