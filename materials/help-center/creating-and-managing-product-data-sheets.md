---
title: Creating and Managing Product Data Sheets
source_url: https://help.plytix.com/en/creating-and-managing-product-data-sheets
description: "How to create custom PDF templates to autogenerate product data sheets in Plytix"
---

# Creating and Managing Product Data Sheets

## How to create custom PDF templates to autogenerate product data sheets in Plytix

ℹ️ Product Data Sheets is a paid, add-on Plytix feature and may not be included in your current subscription. If you'd like more information, a demo, or to try it out, contact your Account Manager.

**Product Data Sheets** let you build a fully custom, reusable product sheet design connected directly to your product data in Plytix. Once published, Plytix automatically generates shareable product sheet URLs for the products assigned to it. Because Product Data Sheets stay connected to your product data, you can review changes, update your design, and publish new versions whenever you're ready. 

This article walks you through creating, designing, and assigning products to your Product Data Sheets.

[Creating a Product Data Sheet](#creating-a-product-sheet)

[Assigning Products](#product-list)

[Designing the Layout](#designing-product-data-sheet)

[Layout Blocks](#layout-blocks)

[Content Blocks](#content-blocks)

[Style](#style) [Previewing](#preview)   [Viewing a Published Product Data Sheet](#viewing-product-data-sheet)   [Publishing](#publishing)   [Exporting Product Data Sheets](#exporting-pds)   [Export Formats](#export-formats)

 

_*Skip to any section in this article by clicking on the links above_

---

### Creating a Product Data Sheet

To create a new Product Data Sheet template in Plytix:
1. Click **Product Data Sheets** in the left sidebar.
2. Click the **+** button to create a new one.
3. Your new Product Data Sheet is automatically named, but you can rename it later.

![Creating a Product Data Sheet](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Creating%20a%20Product%20Data%20Sheet.jpg?width=670&height=289&name=Creating%20a%20Product%20Data%20Sheet.jpg)

---

### Assigning Products

Products are assigned directly to your Product Data Sheet, the same way as any other Destination.

For example, you might create one Product Data Sheet for your **Footwear** products, and a separate one for **Accessories**, so each product type has fields tailored to its needs.

To assign products:
1. Go to the **Products** tab.
2. Assign the products you want this Product Data Sheet to apply to.
3. Click **Save changes**.

**

![Adding your Product List (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Adding%20your%20Product%20List%20(1).jpg?width=670&height=269&name=Adding%20your%20Product%20List%20(1).jpg)

**

 

💡 You can also assign products from outside the Product Data Sheet itself, for example, from Product Overview using the bulk action bar, from a product's own Detail page under its **Destinations** tab, via an Automation, or via CSV import. Learn more in [Understanding and Managing Destinations](https://help.plytix.com/en/understanding-and-managing-destinations).

---

### Designing the Layout 

In the **Designer** tab, drag and drop components to build your layout. You'll work with two settings: **Components** and **Style**.

The **Components** tab is where you build the structure and content of your Product Data Sheet. Components are divided into two categories: **layout**, which organize the page structure, and **content blocks**, which define the information displayed inside the Product Data Sheet.

### Layout blocks

Layout blocks control how content is arranged on the page. Use them to place components side by side, create different content sections, control spacing, and organize information more clearly in the final PDF.

**Available layout options:**
- **1:1**: two equal-width sections.
- **1:2**: a smaller section next to a larger section.
- **2:1**: a larger section next to a smaller section.

**To add a layout block:**
1. Open the **Components** tab.
2. Select a layout option.
3. Drag the layout block into the page.
4. Add content blocks inside each section of the layout.

You can combine multiple layout blocks within the same Product Data Sheet to create different page structures. Empty layout spaces are preserved in the generated PDF, letting you intentionally create white space in the document.

### Content blocks

Content blocks display product information inside the Product Data Sheet. They can be added directly to the page, or placed inside layout blocks.

To add a content block:
1. Open the **Components** tab.
2. Drag and drop a content block into the layout area.
3. Add an optional heading.
4. Rearrange components by dragging them up or down.

**Available content blocks:**
- Text
- Media
- Variants
- Relationships
- Free table
- Product list table

**

![Designing-Components-General](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Designing-Components-General.jpg?width=670&height=354&name=Designing-Components-General.jpg)

**

There are six types of content blocks available:

**Text 

![Designing-Components-text](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Designing-Components-text.jpg?width=670&height=292&name=Designing-Components-text.jpg)

**
- Choose between a one- or two-column layout.
- One column allows one attribute; two columns allow up to two.
- Select any attribute from your PIM, except Formula, Completeness, or media attributes.

**Media

![Designing-Components-MEDIA](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Designing-Components-MEDIA.jpg?width=670&height=249&name=Designing-Components-MEDIA.jpg)

**
- Add product images or files.
- Select a media attribute (e.g. **Assets**).
- Set the maximum number of images to show.
- Adjust the number of columns (1–4).

**Variants

![Designing-Components-variants](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Designing-Components-variants.jpg?width=670&height=315&name=Designing-Components-variants.jpg)

**
- Show variant data in a table (e.g. size, color, SKU).
- Add up to 6 columns.
- Set custom output labels.
- Use **Add column** to include more attributes.

**Relationships**

**

![Designing-Components-relationships](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Designing-Components-relationships.jpg?width=670&height=334&name=Designing-Components-relationships.jpg)

**

 
- Display related products (e.g. compatible items or bundles).
- Select a relationship type from the dropdown.
- Add up to 6 attributes.
- Customize column output labels.

**Free table**

Create customizable table layouts inside your Product Data Sheet, for when you want more control over table structure, manually organized content, or custom information layouts. Useful for technical specifications, comparison sections, or structured reference information.

**Product list table**

Display multiple products together inside a structured table layout, useful for catalog overviews, price lists, assortments, grouped product overviews, line sheets, or multi-product documentation. Configure which product attributes appear in the table, and how products are displayed in the final PDF.

---

### Style**
**

The **Style** tab is where you customize the visual appearance of your Product Data Sheet: typography, colors, and background settings, to match your brand.

#### **

![Designing-style](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Designing-style.jpg?width=670&height=354&name=Designing-style.jpg)

**

**Typography**

Select the font used in the Product Data Sheet, and customize the color and size of:

- Product titles
- Section titles
- Body text
- Footer text

**Background**

Customize the appearance of the header, page, and footer.

The **Page** background uses a solid color, set using the color picker or a HEX code.

The **Header** and **Footer** offer full design options, not just a background color:
1. Go to the **Style** tab under Designer settings.
2. Click into the **Header** (or **Footer**) section to open its design panel.
3. Under **Background**, choose between:
 - **Color**: a solid background color, set using the color picker or a HEX code.
 - **Image**: upload a background image (recommended size: 794 x 128 px).

4. Under **Company logo**, upload your logo (recommended size: 192 x 512 px). This appears layered on top of your background.
5. Under **Text**, you can add custom text to display in the header or footer, for example a campaign name or season. Configure:
 - The text content itself.
 - **Font**, chosen from the available font dropdown.
 - **Size**.
 - **Color**, set using the color picker or a HEX code.
 - **Alignment** (left, center, or right).

6. Click **Save** once you're happy with the design.

This lets you build a fully branded header and footer, for example, a background image with your logo and a text overlay, rather than a single flat color.

💡 Use your company's brand colors, background imagery, and logo to keep your Product Data Sheets consistent with the rest of your brand materials.

** **

---

### Previewing 

Preview your Product Data Sheet anytime, to review the layout, formatting, and product information before publishing.
1. Open the Product Data Sheet template.
2. Click **Preview** or **View** in the top-right corner of the page.
 - **Preview** is available while the template is in **Draft** status.
 - **View** is available after the template has been published and is **Live**.

![data sheets - preview](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/data%20sheets%20-%20preview.jpg?width=670&height=354&name=data%20sheets%20-%20preview.jpg)

Use the product selector to preview how different products appear using the same template. 

![data sheets - preview-product selection](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/data%20sheets%20-%20preview-product%20selection.jpg?width=670&height=354&name=data%20sheets%20-%20preview-product%20selection.jpg)

After selecting a different product, click **Refresh preview** to regenerate the PDF preview.

💡 Open two browser tabs side by side, one for making changes to your design, and the other to preview it.

---

### Viewing a Published Product Data Sheet

Once your Product Data Sheet is published, you can access it from the Product Overview.

1. Go to **Products** in the left sidebar.
2. Click **Edit Columns** to find the **Product data sheets** group.
3. Select your Product Data Sheet and click **Save columns**.

**

![Viewing-PDS](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Viewing-PDS.jpg?width=670&height=310&name=Viewing-PDS.jpg)

**

** **   4.  Click the product URL to access your Product Sheet.

![Viewing-PDS - 2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Sharing%20Your%20Data/Prooduct%20Data%20Sheets/Viewing-PDS%20-%202.jpg?width=670&height=181&name=Viewing-PDS%20-%202.jpg)

### Publishing

Product Data Sheets use a draft-and-publish workflow, letting you edit templates safely, review changes before publishing, and control when updates become visible.

**Draft**

A template in **Draft** status hasn't been published yet. While in Draft:
- Product Data Sheet URLs aren't generated yet.
- The template is only visible inside Plytix.
- Changes aren't accessible externally.

Click **Publish** to make the Product Data Sheet available and generate its URLs.

**Live**

A template becomes **Live** after it's been published at least once. While Live:
- Product Data Sheet URLs are available.
- The published version can be shared externally.
- Exports use the current published version.

If you make changes after publishing, click **Publish changes** to update the published version.

ℹ️ You can also duplicate or delete a Product Data Sheet from its Detail page, using the icons next to Preview and Publish.

 

### Exporting Product Data Sheets

Each published Product Data Sheet generates a stable URL for every included product. These URLs always display the currently published version, and can be exported directly from:
- The **Products** page, as a URL or PDF.
- **Channels**, as a URL.
- **Brand Portals**.

This lets you share live Product Data Sheets, export PDFs in bulk, include Product Data Sheet URLs in feeds or CSV exports, or embed Product Data Sheets into external workflows.

**Exporting as a PDF from the Products page:**
1. Go to the **Products** page.
2. Select the products you want to export.
3. Click **Export Product Data Sheet** in the bottom action bar.
4. Choose the Product Data Sheet template you want to use.
5. Enter a file name for the export.
6. Select an export format.
7. Click **Export**.

---

### Export formats

**Split PDFs (ZIP)**

Generates one PDF per product, downloaded together as a ZIP file. Useful when each product needs its own PDF, PDFs will be shared individually, or files need to be distributed separately.

⚠️ Maximum export size: 300 products.

---

**Single combined PDF**

Generates one PDF containing all selected products together in a single document. Useful for catalogs, presentations, grouped product documentation, line sheets, or customer-ready overviews.

⚠️ Maximum export size: 100 products.

**Export behavior:**
- Only products included in a published Product Data Sheet can be exported, this also applies to exports from Brand Portals.
- Exports always use the currently published version of the selected template.
- Changes aren't included in exports until the template is published again.
- To remove a published product from a template, remove it from the assignment and re-publish.

---

### What's next?

- Learn how to [export product data](https://help.plytix.com/en/export-product-data)
- Learn how to [export products in PDFs](https://help.plytix.com/en/exporting-products-in-pdf)
- Learn how to [work with product lists](https://help.plytix.com/en/create-and-manage-product-lists)

---
