---
title: IFBLANK Operation
source_url: https://help.plytix.com/en/operations/ifblank
description: "How to use the IFBLANK operation in formulas"
---

# IFBLANK Operation

## How to use the IFBLANK operation in formulas

[Definition](#definition)#example

[Example](#example)

[Syntax Guide](#syntax)

[Formula In Use](#formula)

 

---

### Definition

The IFBLANK operation allows you to define the output for a field that is blank. 

 

---

### Example

IFBLANK($LABEL,"Not Available")

$LABEL = 

Result:
Not Available

 

---

### Syntax Guide

IFBLANK(value1, value_if_blank)

value1 - The value to test

value_if_blank- The value to return if value1 is blank

⚠️ Keep in mind that, if the attribute you referenced in this formula does contain a value (and thus is not blank), the result of the formula will be the value of your attribute. This is helpful to note when using different formulas together that will impact the attributes you referenced. 

---

### Formula In Use

![IFBLANK 1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/IFBLANK%20Operation/IFBLANK%201.jpg?width=600&height=739&name=IFBLANK%201.jpg)

---

What's Next
- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [IFNULL operation](https://help.plytix.com/operations/ifnull)
- Check out the [ISBLANK operation](https://help.plytix.com/operations/isblank)

 

---
