---
title: Import Problems
source_url: https://help.plytix.com/en/import-errors
description: "Common problems with imports and how to solve them"
---

# Import Problems

## Common problems with imports and how to solve them

Thousands of different files and pieces of data are uploaded to Plytix all the time. We've seen a lot of spreadsheets come through, so we've also noticed that there are common problems and errors when it comes to importing into our system. In this article, we will highlight some of the most common errors we encounter and how to fix them. 

#corrupt

 

[Corrupted File](#corrupt)

[Funky Characters](#corrupt)

[Wrong File Settings](#settings)

[Other Problems](#other)

 

_*Skip to any section in this article by clicking on the links above_

 

---

### Corrupted File or Funky Characters

This means that something is off within the spreadsheet and it may not be visually apparent to you (sometimes they are literally invisible). This usually happens with text fields.

If this happens, it is likely that when you import your CSV and see this message: 

[![import-error](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Import%20Problems/import-error.png?width=670&height=357&name=import-error.png)](https://help.plytix.com/hubfs/file-preview.png)

This means our importer tried to read the file and failed. Sometimes this can be fixed by changing the Charset and the other file settings, but sometimes not. If your case is the latter try to do this: 

**Solution 1: Re-Export**
1. Import your spreadsheet into another system like Google Sheets.*
2. Download your CSV in CSV format.
3. Try to upload again to our system.

⚠️ Don't use Excel for this. It is notorious for corrupting files with formulas and formatting styles.

Usually this works because these systems are simply better at reading and cleaning up all kinds of corrupted files. We just haven't been around as long. 

Also, this will tell you if your CSV is corrupted beyond repair. If those systems can't read it, then it is likely something else is going on. 

**Solution 2: Remove Rich Text or long text fields **

This is mostly just to test and identify which columns are the ones messing up your import.
1. Remove long text fields.
2. Try to import again.
3. If successful, review the text fields you removed for any characters or formatting issues that may have thrown things off.

**Solution 3: Re-Export in UTF-8**

The most common and standard Charset is [UTF-8.](https://www.w3schools.com/charsets/ref_html_utf8.asp)

For this reason it is probably the safest bet in terms of reading/parsing the majority of characters. Try to re-export your CSV using UTF-8 and import again.

 

---

### Wrong File Settings

If you see the screen above, and you believe your data is not corrupted, **check the file settings.** 

Make sure your Charset has been properly matched. Our system tries to guess this the best it can, but there are times when it doesn't guess right. You can also check your delimiters and separators by checking the properties of your CSV file. 

**Solution: Reconfigure File Settings**
1. In the file preview, it will give you options for delimiters and character sets, change these to the settings of your CSV file
2. The correct file settings will show you a preview with data split correctly among columns

⚠️ Sometimes the preview may appear correct for some attributes, but not all. Please check your actual file settings to ensure you are importing data correctly.

 

---

### Other errors

If your import was successful, but some information didn't appear in your account, check your Import Logs. 

[Learn more about Import Logs here.](https://help.plytix.com/import-logs)

 

ℹ️ If you can't figure it out, reach out. Make sure to send over the CSV you are struggling with and we will see what we can do. 

 

---

 

### What's next?

- Learn about [Import Logs to view more information about your imports](https://help.plytix.com/import-logs)
- Learn how to [set up your CSV for import](https://help.plytix.com/prepare-your-sheet-for-import)
- Learn how to use [Import Profiles to match faster](https://help.plytix.com/import-profiles)

---
