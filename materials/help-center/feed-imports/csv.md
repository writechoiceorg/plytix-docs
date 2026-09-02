---
title: Importing Product Data via Feeds (URL, FTP/SFTP, or Dropbox)
source_url: https://help.plytix.com/en/feed-imports/csv
description: "How to automate the import of your data via a CSV feed from a URL, an FTP or SFTP, or your Dropbox account"
---

# Importing Product Data via Feeds (URL, FTP/SFTP, or Dropbox)

## How to automate the import of your data via a CSV feed from a URL, an FTP or SFTP, or your Dropbox account

If you have to update the same set of data over and over again, scheduled CSV feed imports will make your life so much easier. The CSV feed import allows you to automate the incoming information and reduce the amount of time spent monitoring and executing imports manually. This is especially important if you are updating prices regularly, have an ERP system, get incoming data from suppliers, need daily stock updates in the PIM, etc. Imports feeds can be automated on a schedule using a CSV feed from a file, FTP/SFTP server, or Dropbox account.

⚠️  If this feature has not been enabled for your account, please contact your Customer Success Manager to get access.

💡Check out [how to prepare your CSV for a successful](https://help.plytix.com/prepare-your-sheet-for-import)import. We'll show you required fields and how to format your data correctly.

 

[Setting up your feed](#setupfeed)

[- File Path for Dropbox and FTP/SFTP](#filepaths)

[File preview and settings](#file-preview)

[Import Overview](#import-overview)

[Data Matching](#data-matching)

[Import Log](#import-log)

[Feed overview](#feed-overview)

[Editing scheduled feed](#edit-feed)

 

_*Skip to any section in this article by clicking on the links above_

 

---

### **
Setting up your feed **

To set up your first CSV feed import:
1. Go to the navigation menu and click on **'Products'.**
2. Then click **'Import'** from the dropdown and you will be taken to the import area.
3. On the left sidebar click on the **'Feeds' **option.
4. Click on the purple** 'Add Feed' **button.

 

![1_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/1_feed_imports.png?width=670&height=357&name=1_feed_imports.png)

Once you have clicked on **'Add Feed'** you will be led to the set up of your feed.

Here you can: 
- Give your feed a name.
- Define whether your CSV feed is from a file, FTP/SFTP server, or Dropbox account.
- Insert the file URL.
- Schedule your import feed on the frequency of your choice.

![2_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/2_feed_imports.png?width=670&height=357&name=2_feed_imports.png)

ℹ️ Make sure that the URL you are inserting does not have any spaces, otherwise Plytix may not be able to fetch the file. 

⚠️ The file size limit for import feeds is 20 MB. Larger files will need to be split and imported via separate feeds. 

####
Dropbox or FTP/SFTP connection

When choosing an FTP/SFTP or Dropbox connection, the settings will look a bit different: 

![3_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/3_feed_imports.png?width=670&height=357&name=3_feed_imports.png)

Here you will be able to choose from a dropdown a previously created FTP/SFTP or Dropbox connection. Instead of a URL, you will have to define the file path of your folder.

**File Path for Dropbox:**
- Apps/Plytix PIM**/_Your Folder Name_/_YourFileName.csv_**

ℹ️ When copying your file path into Plytix, you should ONLY INCLUDE the part of the above path in_ **bold and italics**. _

 

**File Path for FTP/SFTP:**
- **_/Your Folder Name/YourFilename.csv_**

ℹ️ When copying your file path into Plytix, note that you should have your file contained only _one folder deep_ within your FTP or SFTP.
We suggest avoiding spaces in your file path. 

If you have not set up a Dropbox or FTP/SFTP connection yet, [learn how to set it up here](https://help.plytix.com/en/establish-channel-connections-to-ftp-and-dropbox). 

---

### **
File preview and settings**

Once you have defined your CSV feed, you will see a preview of your file. This lets you confirm if the file has been read correctly by Plytix. If you are happy with your preview, click **'Next'** to continue.

ℹ️ Please note that the following steps are just the same as when importing a usual CSV, where you will have to go through a mapping process. If you are already familiar with this, you can [skip to the Import Log section](#import-log). 

 

![4_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/4_feed_imports.png?width=670&height=357&name=4_feed_imports.png)

 

ℹ️ If the preview does not look correct, try changing the file settings. All file settings are auto-detected so you may need to make adjustments.

#### **File settings

**

**Column separator**

CSV files have a separator character in their format, this is traditionally a comma, but in some cases we see other separator characters. From here you can choose between:
- Comma (,)
- Semicolon (;)
- Pipe (|)
- Tabulator ( )

**Text delimiter**

As CSV files are using normal text characters to separate data values, a text delimiter is introduced to encapsulate your content in case your content uses the Column separator. You can choose between single or double quotation marks.

**Charset**

At its core, all content is encoded into numbers when you save a file. The Charset defines what system/dictionary the PIM uses to translate the encoded numbers into readable text. Today, almost everyone uses UTF-8 to ensure world wide compatibility.

_* This setting is auto detected, but you have the option to change it.

_

---

### Import overview

After you have accepted the file preview, you will see a new screen. This is where you can define how your information will be imported into Plytix. 

#### File name and status

At the top of the screen, you will see the file name of the CSV feed you are importing and its status. 

![5_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/5_feed_imports.png?width=670&height=357&name=5_feed_imports.png)

The status area identifies how ready your CSV is for import and will check the following things: 
- That you have identified an **SKU column (required)**
- How many **columns out of the total are matched** to data in the PIM

You can also filter how many columns are **matched, unmatched, or duplicated**

ℹ️ You do not need to match all columns to start your import. Columns that are not matched will be ignored.

###  

#### Import Settings

These import settings tell Plytix how to ingest the data coming in. 

![6_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/6_feed_imports.png?width=600&height=319&name=6_feed_imports.png)

The **"Import Products"** dropdown lets you choose the following options:
- Add new products & update existing products (default)
- Only add new products
- Only update existing products

#### File Settings

These are the file settings as shown in the preview. You can modify them here as well.

![7_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/7_feed_imports.png?width=600&height=319&name=7_feed_imports.png)

⚠️ If you change the file settings, you may distort or modify how your data is understood by Plytix.

 

#### Import Profiles

If you have any saved Import Profiles, click on** "Load profile" **to automatically apply the settings and data matching you have set up for a particular data set. 

![8_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/8_feed_imports.png?width=600&height=319&name=8_feed_imports.png)

You can also save a new profile by clicking **"Save profile". **

 

[Learn more about Import Profiles and how to use them.](https://help.plytix.com/import-profiles)

 

ℹ️ Don't save a new Import Profile until after you have completed the Data Matching section

 

---

###  

### Data Matching

This is the part of the Import Overview where you can map the data from your CSV into data you have in Plytix. 

![9_feed_imports_01](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/9_feed_imports_01.png?width=670&height=357&name=9_feed_imports_01.png)

In Data Matching, you will see a list of all the headers in your spreadsheet, that will be [matched](#matched) or [unmatched.](#unmatched) 

#### Auto-matched attributes

Plytix will automatically match attributes in the system with column headers in your spreadsheet. Automatic matches will happen when the name of the header and the name of the existing attribute are an **exact match (case sensitive). **

**Matched attribute** columns will appear like this: 

![Importing-Product-Data-via-Feeds-10](https://help.plytix.com/hs-fs/hubfs/Help%20center/Files%20Not%20Used%20in%20Articles/Import/Import%20Feeds/Importing-Product-Data-via-Feeds-10.jpg?width=670&height=266&name=Importing-Product-Data-via-Feeds-10.jpg)

You can unmatch these columns by clicking the **'Unmatch'** button on the top right. 

⚠️ Unmatched columns will not be imported.

At the top left-most section, you will find the **header from your spreadsheet.**

![9_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/9_feed_imports.png?width=670&height=357&name=9_feed_imports.png)

Next to that will be the **matched attribute or relationship**.

![10_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/10_feed_imports.png?width=670&height=357&name=10_feed_imports.png)

Below this, you will see different **advanced** **settings** for how to translate and ingest your data. These vary based on the attribute type.

![11_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/11_feed_imports.png?width=670&height=357&name=11_feed_imports.png)

**Empty Values**

In case the incoming data value is blank when updating an existing product, you can choose if the PIM should** 'Ignore'** and leave the existing value untouched (if any), or **'Erase the existing' **value.

 

**New Values**

Some attribute types can hold multiple values, for example Categories and Multi-select attributes. When these types of attributes receive new incoming data from an import, you can choose between adding the new data to the attribute, or replacing the old data with the new incoming data.

By default** **"Empty Values" are ignored and "New Values" will overwrite the existing one. Other settings include choosing different separators for multi-value or hierarchical attributes.

 

To the far right, you will see the **preview data** from your file. This helps you choose the right [attribute type.](https://help.plytix.com/attribute-types)

![12_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/12_feed_imports.png?width=670&height=357&name=12_feed_imports.png)

#### Unmatched attributes

If an attribute does not have an exact match in Plytix, it will not be matched automatically. You will have to either match your data to an existing attribute or create a new attribute or relationship to match it to. 

**Unmatched attributes** columns will appear like this: 

![13_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/13_feed_imports.png?width=670&height=357&name=13_feed_imports.png)

You can match the data to an existing attribute or relationship by clicking **'Match existing' **or create a new attribute or relationship to match to by clicking **'Create new'**. 

 

**How to match existing data: **
1. Click **'Match existing'.**
2. Choose if you want to match an attribute or relationship.

![14_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/14_feed_imports.png?width=644&height=343&name=14_feed_imports.png)

3. Choose the element you want to match
4. Click **'Match'.**

 

**How to create new data matches for attributes**
1. Click **'Create new'.**

![15_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/15_feed_imports.png?width=644&height=343&name=15_feed_imports.png)

2. Review and change the name if necessary.
3. Choose the [attribute type](https://help.plytix.com/attribute-types) you want to create:

![16_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/16_feed_imports.png?width=644&height=343&name=16_feed_imports.png)

4. Click** 'Create and match'.**

ℹ️ The system will automatically import all multi-value options for multi-select and dropdown attributes that are included in the spreadsheet. You do not need to add any options in order to match them. 

[Learn more about attribute types and how to choose the best one for your data.](https://help.plytix.com/attribute-types)

 

Once you have mapped all of your information, you can simply click on **'Save import settings'** and your scheduled feed import will be up and running. 

 

![17_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/17_feed_imports.png?width=670&height=357&name=17_feed_imports.png)

 

⚠️ If you make any changes to your original file such as adding new columns or taking out any columns, you will need to [edit the feed matching](#edit-feed) to map it to the new structure of your file, otherwise your feed import might not work. 

 

 

---

### Import Log

Once your feed was successfully imported you will be able to see the processing history. 

For this, go to:
1. **'Products' **in the top navigation bar.
2. In the dropdown menu click on **'Import'.**
3. Click on** 'Logs'.**

Here you can see an overview of all the data that has been imported either via a manual CSV upload or a scheduled feed.

To get a more detailed overview of the import, you can click on the eye icon.

![18_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/18_feed_imports.png?width=670&height=357&name=18_feed_imports.png)

---

 

### Feed overview

 

To get an overview of all the scheduled feed imports you have set up:
1. From the 'Products' dropdown, click on '**Imports'.** 
2. Click on '**Feeds'** on the left sidebar.

Here you will see your CSV feeds and their current status.

For each feed you will be able to see:
- The name of the feed
- The last time this feed was processed
- Schedule information
- When the feed was created
- When the feed was last modified
- Whether this feed is active or not

![19_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/19_feed_imports.png?width=670&height=357&name=19_feed_imports.png)

By clicking on the '**Active'** switch you can activate or deactivate your feed at any time.

From this overview you will also be able to manually process your feed outside of the scheduled times, or delete it. 

 

---

### Editing Scheduled Feed 

If you need to edit the feed matching of a file you have already set up because you have made some changes to your original file, click on the file name. This will lead you to the settings page of the scheduled feed. 

[![20_feed_imports](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Feed%20import/20_feed_imports.png?width=670&height=357&name=20_feed_imports.png)](https://help.plytix.com/hubfs/Help%20center/Import/Import%20Feeds/edit-scheduled-feed.png)

ℹ️ You must set your feed to '**inactive'** in order to be able to edit it. 

 

This will lead you again through the mapping process, where you will have to map the information from your file against new or existing attributes in the system. 

 

---

###
What's next?

 

Now that you know how to import product data:
- Check the status of your import with [Import Logs](https://help.plytix.com/import-logs)
- Learn how to [upload and import assets](https://help.plytix.com/import-files)
- Learn how to [import a Shopify CSV template into Plytix](https://help.plytix.com/en/shopify-import)

 

---
