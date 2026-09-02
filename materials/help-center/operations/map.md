---
title: MAP Operation
source_url: https://help.plytix.com/en/operations/map
description: "How to use the MAP operation in formulas"
---

# MAP Operation

## How to use the MAP operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

[Formula in Use](#formula)

 

---

### Definition

The MAP operation applies an operation to a list of inputs. 

 

---

### Example

MAP(SUM($$ITEM, 3), [1, 2, 3])

Result:
4,5,6

###  

---

### Syntax Guide

MAP(operation, list)

operation - the operation to perform. Use the '$$ITEM' placeholder to reference the element of the list you're working with

list - the list of elements to apply the operation to

 

---

### Formula in Use

#### Apply bullet points in HTML format to multiselect attributes

CONCAT("<ul>",JOIN(MAP(CONCAT("<li>",$$ITEM,"</li>"), $ATT.PRODUCT_COLOR_MULTISELECT), ""),"</ul>")

![MAP Operation](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/MAP%20Operation/MAP%20Operation.jpg?width=688&height=725&name=MAP%20Operation.jpg)

---

### What's Next?

- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [GT operation](https://help.plytix.com/operations/greaterthan)
- Check out the [GTE operation](https://help.plytix.com/operations/greaterthanorequalto)

---
