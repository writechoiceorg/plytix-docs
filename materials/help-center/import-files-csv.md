---
title: Importing Asset Data from a CSV File
source_url: https://help.plytix.com/en/import-files-csv
description: "How to import product data from a CSV file into Plytix"
---

# Importing Asset Data from a CSV File

## A guide to formatting your CSV for a clean, standalone asset import

In this article, you'll learn how to structure a CSV file to import assets directly into your Plytix Asset Library. With this importer, your files don't need to be linked to a product at all. We'll cover the required fields, the fields you can optionally include, and how to format your data correctly.

ℹ️ This is a different importer to the one covered in [Uploading and Importing Assets](https://help.plytix.com/en/import-files). That article covers uploading files by drag and drop, and importing assets through the **Products** importer, where each row needs a SKU to link the asset to a product. 

The asset importer in this article is a standalone one, found under the **Assets** tab, that lets you bring assets into your Asset Library on their own, no SKU needed.

[Accessing the Asset Importer](#accesing-asset-importer)

[Required Fields and Settings](#required-fields-settings)

[File Preview and Import Settings](#file-preview-import-settings)

[Other Importable Fields](#other-importable-fields)

[Import Options](#import-options)

[Data Matching](#data-matching)

[Reading Your Import Log](#import-log)

_*Skip to any section in this article by clicking on the links above_

 

 

### Accessing the Asset Importer

To get to the Asset Importer:
1. Go to the navigation menu and click **'****Assets.'**
2. Click the arrow icon to expand the Assets submenu.
3. Click **'Imports.'**

**If this is your first import,** you'll see an empty **Import logs** screen with an **'Upload CSV'** button in the centre. Click it, then drag and drop your CSV into the space provided, or click to browse and select your file.

![assets-imports-01](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-01.png?width=670&height=383&name=assets-imports-01.png)

**If you've imported before,** you'll land on the **Import logs** screen showing your import history. Click **'New import' **on the top left corner**, **then drag and drop your CSV into the space provided, or click to browse and select your file.

![assets-imports-01-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-01-2.png?width=670&height=383&name=assets-imports-01-2.png)

💡 Not sure where to start? Download the sample CSV from the importer, or use the one attached to this article, to see the expected structure before building your own file.

### Required Fields and Settings

The only column you always need is **Asset name**. Whether you also need an Asset URL depends on what you're doing, more on that below.

#### Asset name

Every row must have an **Asset name**, and these values must be **unique**. This is how Plytix identifies each asset, and how it matches incoming rows to existing assets when updating.

⚠️ Empty values are not allowed in the Asset name column.

#### Asset URL

If you're creating **new** assets, your file needs a column with a **public URL** for each file, so Plytix can fetch it. Without this, there's no file for Plytix to bring in.

If you're only **updating** assets that already exist, for example adding categories or alt text to assets you've already uploaded, you don't need a URL at all. Plytix will match your rows to existing assets using the Asset name, so a file with just Asset name, Category, and Alt text columns works fine for this.

💡 If you're exporting assets from Plytix to build your CSV, this column will already be filled in with the right links.

#### Required settings

In your spreadsheet:
1. The first row must include **headers** for each column.
2. There must be **one asset per row.**
3. Asset name values must be **unique.**

### Other Importable Fields

At an asset level, you can also import:

[Category](#category)

[Alt Text](#alt-text)

#### Category

Categories work the same way here as they do for products. It's a hierarchy attribute, so category structures are defined with a separator (the default is ">").
- If an asset belongs to more than one category structure, separate them with a comma.
- You can choose different separators during matching if your data uses something other than a comma or ">".

**For example:**

_Bags > Backpacks_, _Marketing > Lifestyle_

💡 This is another great use for this importer: if you have a batch of assets that need sorting into categories, you can assign them all at once.

#### Alt Text

You can also import **alt text** for each asset. This is handy for adding or updating descriptive text in bulk, rather than editing each asset one by one.

💡 This is one of the best uses for this importer: if you need to add or clean up alt text across a large batch of images for accessibility or SEO, you can do it all in one file instead of opening each asset individually.

### File preview and import settings

Once you've selected your file, you'll see a preview of the first 15 rows. This lets you check that Plytix has read your file correctly before you continue.

You'll also see your file settings:
- **Column separator:** 
 - Comma (,)
 - Semicolon (;)
 - Pipe (|)
 - Tab ( )

- **Text delimiter:** single or double quotation marks, used to wrap content that contains your column separator.
- **Charset:** the encoding used to read your file. UTF-8 is the default and works for almost everyone.

ℹ️ These settings are auto-detected, but if your preview doesn't look right, you can change them here.

If everything looks good, click **"Go to matching"** to continue.

[![assets-imports-03](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-03.png?width=670&height=383&name=assets-imports-03.png)](https://help.plytix.com/hubfs/Help%20center/Getting%20Started/Importing%20Product%20Data/Updated/select-file-settings.jpg)

ℹ️ If the preview does not look correct, try changing the file settings (column separator, text delimiter, and charset). All file settings are auto-detected but if they're not correct, you can manually choose the right settings.

### Import Options

Once your file is uploaded, you'll see your **Import options** and **Data matching** on the same screen.

The **"Import assets"** dropdown lets you choose:
- **Add new and update existing** (default): creates new assets and updates any that already exist.
- **Only new**: only creates new assets, and skips anything that already exists.
- **Only update existing**: only updates assets that already exist, and won't create new ones.

![assets-imports-08](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-08.png?width=670&height=383&name=assets-imports-08.png)

### Data Matching

This is where the columns in your file get matched to fields in Plytix. At the top, you'll see a status like "4/4 columns matched," along with a green **"Asset name matched"** badge once your Asset name column is identified.

Each column appears as its own card, showing:
- The **header** from your spreadsheet
- The **field** it's matched to in Plytix
- An **"Unlink"** option, if you'd like to match it differently
- A preview of your **file data** for that column

#### Asset name

Always required, and can't be unlinked. If any rows are missing a value, you'll see **"Empty values are not allowed"** under the field.

![assets-imports-04](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-04.png?width=670&height=383&name=assets-imports-04.png)

#### Category

Since Category can hold multiple values, you'll see a few extra options:
- **Empty values:** Ignore (keep any existing categories) or Erase existing.
- **New values:** Add (add new categories to what's already there) or Overwrite (replace them).
- **Value separator:** the character separating multiple category structures (default is a comma).
- **Hierarchy separator:** the character separating each level of a category (default is ">").

![assets-imports-06](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-06.png?width=670&height=383&name=assets-imports-06.png)

#### Alt Text

Here you'll just see:
- **Empty values:** Ignore (keep any existing alt text) or Erase existing.

![assets-imports-07](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-07.png?width=670&height=383&name=assets-imports-07.png)

💡 If a column doesn't match automatically, you can link it to Asset name, Category, or Alt text yourself. Any columns you don't match will be ignored.

Once you're happy with your matching, you're ready to start the import.

### Reading Your Import Log

Every import you run is saved, so you can always check back on what happened. There are two levels to look at: the import list, and the detailed log for a single import.

#### Your Import List

Click the import icon at the top of the Assets area to see a list of every import you've run. This shows:
- **Date:** when the import was run, and who ran it.
- **Name:** the file name of your CSV.
- **Assets:** how many assets were included in the file.
- **Status:** where the import is at, for example **Finished** or **Cancelled**.
- **Result:** once an import has finished, you'll see either **Success** or **Fail** here.

![assets-imports-log](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-log.png?width=670&height=383&name=assets-imports-log.png)

#### The Detailed Log

Click into any import to see a full breakdown, line by line. This shows:
- **Line:** the row number from your CSV.
- **Asset name** and **Asset URL:** so you can match it back to your file.
- **Action:** what Plytix did with that row, either Create, Update, Skip, or Delete.
- **Result:** Success, Warning, or Error.

![assets-imports-log-details](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Importing%20Asset%20Data%20from%20a%20CSV%20file/assets-imports-log-details.png?width=670&height=383&name=assets-imports-log-details.png)

You can filter this list using the **"All actions"** and **"All states"** dropdowns at the top, handy if you just want to see everything with a Warning, for example.

💡 An overall **Success** result and a row-level **Warning** aren't a contradiction, they answer different questions. Success tells you the import ran. Warning tells you a specific row needs a look. If you see a Warning, click the eye icon next to that row for more detail on what happened.

###  

### What's Next?

- Learn how to [import assets alongside your products](https://help.plytix.com/import-files)
- Learn how to [link and unlink assets to products](https://help.plytix.com/link-and-unlink-files-to-products)
- Learn more about [organizing assets in categories](/en/organizing-files-in-categories)  

---
