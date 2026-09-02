---
title: Creating Formula Attributes
source_url: https://help.plytix.com/en/formula-attributes
description: "How to create and manage formula attributes in Plytix to automate operations."
---

# Creating Formula Attributes

## How to create formula attributes in Plytix to automate operations

With formula attributes, you can create and store formula operations for data transformations directly in Plytix. You can use them for various cases, ranging from price discounts and currency conversions to text transformation and data concatenation. In this article you will learn how to create and manage formula attributes in Plytix. 

[Uses Cases for Formula Attributes](#use-cases)

[Creating a Formula Attribute](#creating-formulas)

_*Skip to any section in this article by clicking on the links above_

---

###
Use Cases for Formula Attributes

There are various use cases for formula attributes. 
- **Calculate pricing and tax: **apply tax costs based on your marketplace's requirements
- **Convert currencies: **automatically set up your price conversions across different currencies
- **Set conditioned sale prices:** apply discounts to products automatically based on stock levels, sales performance, or seasonal promotions.
- **Add or change tags: **customize your tags to optimize your product search across different sales channels
- **Calculate date estimations: **compute estimated delivery dates or product lifecycle stages based on manufacturing or shipping dates.
- **Derive complex attributes: **Automatically derive complex product attributes like _environmental impact scores_ from multiple data points (e.g., materials used, production methods).

💡 **This is not an exhaustive list. **If you're looking for ways to apply formula attributes for your own use case, feel free to contact our team

---

###
Creating a Formula Attribute

To create a new formula attribute directly in Plytix:

1. Head over to the **Settings** tab and click on "Attributes" in the side menu. Then, click "**+ Create          attribute**."

![Create attribute](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Creating%20Formula%20Attributes/New%20design%202026/Create%20attribute.jpg?width=670&height=245&name=Create%20attribute.jpg)

2. Name your attribute, personalize the label, and add a description (this last field is optional).

3. Select the "**Formula**" attribute type.

![3](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Creating%20Formula%20Attributes/3.jpg?width=670&height=401&name=3.jpg)

4.  In the Formula Editor, add your formula. You can refer to our [Formula Cheat Sheet](https://help.plytix.com/en/formula-cheat-sheet-and-guide) for a guide            on how to write formulas in Plytix, as well as a list of operations available to work with.

In my example, I am using a simple CONCAT formula to concatenate my product SKU and Label. 

![Concat-formula](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Creating%20Formula%20Attributes/Concat-formula.jpg?width=670&height=418&name=Concat-formula.jpg)

5. You can validate it by clicking "**Validate Formula**" to make sure it works by adding mockup                 values for the attributes you selected. 

![Example](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Creating%20Formula%20Attributes/Example.jpg?width=670&height=294&name=Example.jpg)

6. Then, click "**Run Test**."

![Run test](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Creating%20Formula%20Attributes/Run%20test.jpg?width=670&height=348&name=Run%20test.jpg)

**To view your formula attribute in your products:**

Head to a product's detail page. You'll notice that your attribute will be automatically assigned to your products.

ℹ️ Learn more about [Using Formulas in Families](https://help.plytix.com/en/using-formulas-in-families) and [adding them to attribute groups](https://help.plytix.com/en/product-attribute-groups).

You can also view it in the Product Overview.

ℹ️ To choose which attributes you'd like to see in the Product View, click "**Edit columns**" to remove or add attributes from the display. 

If you have referenced other attributes in your formula, the formula value will update every time the referenced attributes change. In my example formula above (insert formula here), the value will update whenever my Label or SKU changes. 

---

### What's Next?

- Find a [full list of all the formula operations that are available in Plytix](https://help.plytix.com/en/formula-cheat-sheet-and-guide)
- Learn how to use and [set up advanced webhooks to receive updates about your products](https://help.plytix.com/en/getting-started-plytix-advanced-webhooks)
- Learn how to [create](https://help.plytix.com/en/creating-a-channel) and [manage Plytix channels](https://help.plytix.com/en/managing-channels)for data syndication

---
