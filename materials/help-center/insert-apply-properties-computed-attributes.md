---
title: Using Attributes and Other Properties in Formulas
source_url: https://help.plytix.com/en/insert-apply-properties-computed-attributes
description: "How to find and apply different attributes and properties to Formulas"
---

# Using Attributes and Other Properties in Formulas

## How to find and apply different attributes and properties to Formulas

In Plytix, you can create attributes using formulas that may or may not include other attributes or properties. In this article, we will show you what properties are available and how to find and apply them. 

 

[Overview of Available Properties](#overview)

[Inserting Properties into Formulas](#insert)

[Special Properties](#special)

 

---

###
Overview of Available Properties

The properties that you can use in formulas are: 
- System Attributes
- Your custom attributes
- Special Properties like $IS_VARIATION

⚠️ Media attributes, Relationships, Variations, Variation of, Categories, and Families are not available for use in Formulas at this moment

---

###
Inserting Properties into Formulas

When editing a [formula](https://help.plytix.com/formula-cheat-sheet-and-guide), you can insert properties by using the "$" symbol. This symbol also lets you **search for all available properties** to insert into a formula. 

![Using Attributes and Other Properties in Formulas - Inserting Properties into Formulas](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Attributes%20and%20Other%20Properties%20in%20Computed%20Attributes/Using%20Attributes%20and%20Other%20Properties%20in%20Formulas%20-%20Inserting%20Properties%20into%20Formulas.jpg?width=670&height=437&name=Using%20Attributes%20and%20Other%20Properties%20in%20Formulas%20-%20Inserting%20Properties%20into%20Formulas.jpg)

To insert a property into a formula: 
- Use the $ prefix to locate and insert the property
- Do not enclose the property in quotation marks

---

###
Special Properties

There are two special properties that aren't attributes or another entity within Plytix and are only used for formulas 

#### $IS_VARIATION

This property identifies the product in question as being a variation. The result can be either "true" if the product is a variation or "false" if it is a parent product.

**Example in Use: **

![Using Attributes and Other Properties in Formulas - Is Variation](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Attributes%20and%20Other%20Properties%20in%20Computed%20Attributes/Using%20Attributes%20and%20Other%20Properties%20in%20Formulas%20-%20Is%20Variation.jpg?width=670&height=708&name=Using%20Attributes%20and%20Other%20Properties%20in%20Formulas%20-%20Is%20Variation.jpg)

#### $HAS_VARIATIONS

This property identifies the product in question as being a parent product. The result can be either "true" if the product has variants or "false" if it does not.

![Using Attributes and Other Properties in Formulas - has Variation](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Using%20Attributes%20and%20Other%20Properties%20in%20Computed%20Attributes/Using%20Attributes%20and%20Other%20Properties%20in%20Formulas%20-%20has%20Variation.jpg?width=670&height=748&name=Using%20Attributes%20and%20Other%20Properties%20in%20Formulas%20-%20has%20Variation.jpg)

---

### What's Next

- Learn more about [system attributes and what they do](https://help.plytix.com/system-attributes)
- Learn more about[how to write formulas and see a list of operations](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Learn how to [create formulas](https://help.plytix.com/create-computed-attributes)

---
