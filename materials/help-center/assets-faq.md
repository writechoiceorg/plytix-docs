---
title: Assets - FAQ
source_url: https://help.plytix.com/en/assets-faq
description: "Frequently asked questions about Digital Asset Management, supported file types, size limits, and more"
---

# Assets - FAQ

## Frequently asked questions about Digital Asset Management, supported file types, size limits, and more

[What are digital assets?](#what-are-assets)

[Which assets can I store in Plytix?](#which-assets)

[Why store my assets in Plytix?](#why)

[Is there a limit to how many assets I can store in Plytix?](#limit)

[Where can I find my assets in Plytix?](#where)

[How should I name my assets?](#naming-convention)

[Can I import an asset from a URL that is protected by a basic authentication?](#basic-auth)

[Why did Plytix add letters/numbers to my asset file name?](#add-string-filename)

[Can I import assets from Google Drive?](#import-google-drive)

 

_*Skip to any question by clicking on the links above_

 

---

### **What are digital assets?**

Digital assets include images, videos, audio, PDFs, documents, presentations-- anything that comes in a file format. 

---

### **Which assets can I store in Plytix? **

You can upload assets of the following types PNG, MP4, MP3, GIF, TIFF, PSD, DWG, PPT, TXT, DOCX, PDF, SVG, ZIP, HTML, and more. _Please note that at this time you are not able to play MP3 and MP4 files directly inside Plytix, but they will function normally upon export. 

_

💡 [Click here](https://help.plytix.com/en/supported-file-types) for a list of supported file types. 

 

---

### **Why store my assets in Plytix? **

Storing assets in Plytix is beneficial because you can link them to and view them with your products. This way you get the "full picture" of everything product related-- a single source of truth for your information _and _your digital assets together means better organization of data and greater efficiency for enrichment and export. 

 

---

### **Is there a limit to how many assets I can store in Plytix? **

The limit to asset storage depends on [your plan](https://www.plytix.com/pricing). In short, paid plans have unlimited storage and our Free plan includes up to 10GB of storage.

 

---

### **Where can I find my assets in Plytix? **

Assets in Plytix can be viewed in the "**All Assets**" page. 

💡 [Click here](https://help.plytix.com/en/asset-overview) to learn about the Asset Overview area of Plytix.

 

---

### How should I name my assets?

Having a strong naming convention for your assets not only helps you keep them organized but also makes it easier to link assets to products after uploading them to your Plytix account. 

When establishing a naming convention, it's best to use key information about the asset and the product it shows. This information can include any or all of the following:
- Product Name
- Product SKU
- Type of Image (i.e. packshot, lifestyle image, main image, etc.)
- Number of the image if part of a series

To take advantage of our auto-linking feature, be sure to separate the pieces of information you use in your filename with different delimiters between, including  dashes, dots, underscores or hashtags ('-' '.' '_' or '#').

 

⚠️ Avoid including special characters in your asset filenames. Characters such as letters with accents or specialized language characters (á, é, í, ø, č, etc.) can cause problems with URL generation and cause asset sharing to fail. 

---

### Can I import an asset from a URL that is protected by a basic authentication?

No, this is not possible. URLs must be publicly accessible in order to be used for asset import into Plytix. 

 

---

###  

### Why did Plytix add letters/numbers to my asset file name?

  When uploading assets to your Plytix account, you might notice that Plytix adds letters/numbers to your asset file name. This situation arises under specific circumstances related to how Plytix handles file imports to prevent conflicts and ensure the uniqueness of assets within your account. Understanding the scenarios that lead to this behavior can help you manage your assets more effectively.   To avoid these scenarios, we have included a couple of best practices tips for importing digital files at the end of this section.   **Understanding File Import Scenarios**
When you import files into your Plytix account, several outcomes can occur based on the uniqueness of both the file names and their content. Consider you have an account with two files: “rabbit.png” (a white rabbit) and “cat.png” (a white cat).
1. **Different Content, Same Filename: **If you attempt to import a file with a name that already exists in your account but the file content differs, Plytix will modify the imported file’s name by appending an alphanumeric string. For example, importing another “rabbit.png” file depicting a black rabbit would result in a new file name like “rabbit_aefee.png”.
2. **Identical Content and Filename: **If the file you’re importing shares both the name and content with an existing file, Plytix makes no change. Importing another “cat.png” that also shows a white cat would lead to no alterations.
3. **Different Filename, Identical Content:** When the imported file’s content matches an existing file but under a different name, Plytix will import the file with the new name provided. If “rabbit.png” is imported and matches the content of an existing “cat.png”, it retains the name “rabbit.png”.
4. **New File: **Files that do not exist in your account will be imported with their original names. For instance, importing “parrot.png” for the first time results in it keeping its name “parrot.png”.
 **Best Practices for Streamlined Asset Management**
To enhance your experience and avoid the automatic renaming of files, consider the following solutions during the upload process:
- **When Uploading via CSV: **Ensure you select the “**Skip existing assets**” option. This action prevents the system from importing and renaming files that already exist within your account that have different content but share the same filename.
- **When Uploading Directly to the DAM (Digital Asset Management): **Choose the “**Replace existing assets**” option. This is crucial for direct uploads as it allows for the replacement of existing files with the newly uploaded versions, thereby maintaining the original file names without appending additional characters.
 Incorporating these solutions into your asset management strategy will help maintain the integrity of your file names and simplify the organization of your digital assets within Plytix.  

---

### Can I import assets from Google Drive?

Yes! If you want to import assets from Google Drive, there are a few steps you'll need to follow to prepare your file links so that Plytix can access them.
1. Ensure that your links are publicly accessible. Do this by clicking **'Share' **for the file in Google Drive and, under "General Access," selecting the option, **'Anyone with the link.'

![FAQ Pages](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Assets%20-%20FAQ/FAQ%20Pages.jpg?width=688&height=430&name=FAQ%20Pages.jpg)

**
2. Next, create a Google Sheet with the links to the files you want to import in Column B, and the SKUs you want to link them to in Column A. 
3. In Column C, use this formula: **=SUBSTITUTE(B2,"file/d/","uc?id=")**
4. In the Column D, use this formula: **=SUBSTITUTE(C2,"/view?usp=drive_link","")**
5. Column D now contains links that can be matched to media single attributes or the "Thumbnail" attribute upon import. Simply download your file as a CSV and upload to Plytix as normal. 

 

![userlmn_ebe4e6a8f14fa067d9a0a4f4533ae9aa](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Assets%20-%20FAQ/userlmn_ebe4e6a8f14fa067d9a0a4f4533ae9aa.png?width=688&height=364&name=userlmn_ebe4e6a8f14fa067d9a0a4f4533ae9aa.png)

 

---

### What's next?

- Learn how to [upload assets](https://help.plytix.com/en/import-files)
- Learn about [linking assets to products in bulk](https://help.plytix.com/en/linking-assets-with-products-in-bulk)
- Learn how to [create and manage asset lists](https://help.plytix.com/en/create-and-manage-file-lists)

---
