---
title: Brand Portals - FAQ
source_url: https://help.plytix.com/en/brand-portals-faq
description: "Frequently asked questions about Plytix's answer to e-catalogs: the Brand Portal"
---

# Brand Portals - FAQ

## Frequently asked questions about Plytix's answer to e-catalogs: the Brand Portal

[Why doesn't X_ _show up in my brand portal?](#show-up)

[What’s the difference between attributes, featured attributes and components in brand portals?](#diff-between)

[How do I create direct links to individual products in my Brand Portal?](#direct-links)

 

_*Skip to any question by clicking on the links above_

---

### **Why doesn't X_ _show up in my brand portal?**

Because of the different ways you can customize the information displayed in your brand portal, it can sometimes be a little tricky to figure out how and where pieces of information will appear in the layout. Here are some tips to help you out:
- Make sure the attributes you want to include have been added to your brand portal in the attribute tab before you enter the layout.
- Select the right type of component for the attribute you want to display. If you choose an attribute component to display an image rather than a gallery component, you will instead display the URL.
- If you want to display _only _your parent products on the main page of your brand portal, toggle on the “Group variations with parent” switch. You can then show variations by adding a variations component within the product page of each product.
- If you want to display videos as part of product listings in your brand portal, you can do this by using an [HTML attribute](https://help.plytix.com/en/attribute-types#HTML) and embedding the video URL in an iframe.
- If you don’t like the way information is displayed within a component, consider using an attribute transformation to change or customize it.

---

### **What’s the difference between attributes, featured attributes and components in brand portals?**

**
**When creating brand portals, the first thing you need to do is add attributes in the “Attributes” tab. Add any attributes that you may want to use; you can decide which ones to display and how they look when you go to the layout. 

In the layout tab, you’ll see a section called “Featured Attributes.” Here you can choose up to five attributes (excluding HTML and media attributes) that will be displayed below the product title of each product on the main page of your brand portal.

To select components that appear on the detail page of each product, you’ll need to turn off the auto-fill view toggle in the “Detail settings” area. You can then select from four different types of components: attributes, gallery, variants, relationships. Basically, these are just different sections of information. If you want to show pictures of your product, choose a gallery attribute. If you want to show “Other products you may like,” select a relationships attribute.

---

### How do I create direct links to individual products in my Brand Portal?

If you want to obtain a file that contains a URL for each SKU you have in a Brand Portal, you can use the following formula in an attribute transformation in a CSV/XLSX channel:

**CONCAT("**[**https://ecatalogs.plytix.com/624232f17878f380ce83c3e1/product_page/",$PRODUCT_ID**](https://ecatalogs.plytix.com/624232f17878f380ce83c3e1/product_page/%22,$PRODUCT_ID)**)**)

To make the formula work for your Brand Portal, you will need:
- the first part of the URL of your brand portal
- Product ID for all products to which you want to create links
- A channel with an attribute transformation attribute that contains the formula above

ℹ️ Be sure to include the products you want to generate links for in the Brand Portal's product list.

Process the channel to generate a file with the desired URLs. These links can then be used for displaying your product information in a graphic way, such as embedding product links in webpages. 

---

### I want to add some YouTube videos on my products for customers to see on a Brand Portal. How do I do this?

You can do this by using an [HTML attribute](https://help.plytix.com/en/attribute-types#HTML) and embedding the video URL in an iframe.

**How to embed a video in an iframe?**

**1**. Obtain the video URL. Some video streaming platforms allow you to copy the embed code with the URL already nested in the iframe. If this isn't possible, you can simply paste the URL into an iframe code.

![Embed video](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Brand%20Portals%20-%20FAQ/Embed%20video.jpg?width=670&height=281&name=Embed%20video.jpg)

**2.** In your Plytix account, create an HTML attribute. You can either import it or paste the embed code into the WYSIWYG editor when editing the HTML attribute by clicking on the **'C****ode view'** or **</> **button. Don't forget to save changes!

![html1 (2)](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Brand%20Portals%20-%20FAQ/html1%20(2).jpg?width=670&height=275&name=html1%20(2).jpg)

**3.** In your brand portal settings, under the Attributes tab, add the HTML attribute. You can change the output label here if you want. Then go to the Layout to add the attribute to a component. 

![Attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Brand%20Portals%20-%20FAQ/Attributes.jpg?width=670&height=310&name=Attributes.jpg)

**4. **In the Layout, under the Product content section, click the **'+ Add' **button to add a 'Component' where you will enter your HTML attribute.

![layout1](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Brand%20Portals%20-%20FAQ/layout1.jpg?width=670&height=295&name=layout1.jpg)

**5.** Choose an **'Attribute' **component and name it.

![add new component](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Brand%20Portals%20-%20FAQ/add%20new%20component.jpg?width=624&height=260&name=add%20new%20component.jpg)

**6.** Add the HTML attribute to the component by clicking the '**+ Add'** button in the Edit component panel  

![edit component ](https://help.plytix.com/hs-fs/hubfs/Help%20center/FAQ/Brand%20Portals%20-%20FAQ/edit%20component%20.jpg?width=624&height=291&name=edit%20component%20.jpg)

Voila! You've embedded a video on your brand portal. 😎

 

---

### What's next?

- Learn how to [create a Brand Portal](https://help.plytix.com/en/create-and-manage-e-catalogs)
- Learn more about [designing Brand Portals](https://help.plytix.com/en/designing-e-catalogs)https://help.plytix.com/en/mapping-shopify-fields
- Check out the [overview of Brand Portal settings](https://help.plytix.com/general-e-catalog-settings)

---
