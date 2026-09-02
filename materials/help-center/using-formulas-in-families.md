---
title: Using Formulas in Families
source_url: https://help.plytix.com/en/using-formulas-in-families
description: "Formulas in Plytix allow you to automate calculations for product attributes. You are able to assign formulas directly to families, improving control over your product data. How Formulas in Families W"
---

# Using Formulas in Families

##

Formulas in Plytix allow you to automate calculations for product attributes. You are able to assign formulas directly to families, improving control over your product data.

[How Formulas in Families Work](#Formulas-in-families)
[Adding Formulas to a Family](#add-formula-to-family)
[Example Use Case](#EXAMPLE)
[Limitations](#LIMITATIONS)

_*Skip to a section in this article by clicking on the links above
_

---

###
How Formulas in Families Work

With this new functionality, formulas can now behave just like other attributes and be assigned at the family level.

Products **assigned to a family** will **only calculate formulas assigned to that family**. Any formula not added to the family will not be calculated for said products, and therefore will not appear in the "Non-Family Attributes" section of the Product Detail page.

---

### Adding Formulas to a Family

To assign formulas to a family, follow these steps: 1. Go to **Settings > Families**.

2. Select the family you wish to update.

3. Click on **Add Attribute**.

- You can add multiple formulas at the same time.

![Add family attributes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Formulas%20in%20Families/New%20Design%202026/Add%20family%20attributes.jpg?width=670&height=379&name=Add%20family%20attributes.jpg)

4. Skip setting Inheritance Status. **Formulas cannot be selected **for inheritance.

![Add family attributes - formula - inheritance](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Formulas%20in%20Families/New%20Design%202026/Add%20family%20attributes%20-%20formula%20-%20inheritance.jpg?width=670&height=340&name=Add%20family%20attributes%20-%20formula%20-%20inheritance.jpg)

  

ℹ️ The checkboxes for formula attributes are disabled, since formulas are not inheritable.   5. Click **Save** to apply your changes.

After saving, navigate to the detail page of a product belonging to this family, and you'll see the newly assigned formula listed among its Family attributes.

![PDP page - formula](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Formulas%20in%20Families/New%20Design%202026/PDP%20page%20-%20formula.jpg?width=670&height=341&name=PDP%20page%20-%20formula.jpg)

---

### Example Use Case

Imagine you're selling sneakers and you have a formula calculating international size conversions. This calculation is specific only to sneakers. With Formulas in Families, you can assign this formula exclusively to your "Sneakers" family. Previously, this formula would attempt to calculate for every product, resulting in errors for unrelated items lacking relevant data. Now, the formula neatly applies only to relevant products.

---

### Limitations

Currently, formulas assigned to families cannot use inheritance. This restriction ensures that formulas always provide accurate and reliable results. For instance, a calculation designed to sum two specific values (like price adjustments or size conversions) must remain consistent and accurate, which inheritance could potentially disrupt.

If you want the formula to inherit values, you’ll just have to reference values inherited in the calculation.

---

By leveraging this new feature, you can ensure your product data remains accurate, organized, and relevant across your entire catalog.

For further questions or assistance, please contact our customer success team.

---
