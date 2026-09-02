---
title: JOIN Operation
source_url: https://help.plytix.com/en/operations/join
description: "How to use the JOIN operation in formulas"
---

# JOIN Operation

## How to use the JOIN operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

[Formula In Use](#formula)

---

### Definition

The JOIN operation lets you concatenate, or link, values with a delimiter. 

---

### Example

JOIN(["a", "b"], "-")

Result:
a-b

---

### Syntax Guide

JOIN([values], delimiter)

**values **- The values to be appended using delimiter, confined by a set of brackets [ ]

**delimiter** - The character or string to place between each concatenated value

ℹ️  The delimiter may be specified as blank, e.g. JOIN(["1","2","3"],) 

In this case the result would be: 1 2 3

---

### Formula In Use

![JOIN-1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/JOIN%20Operation/JOIN-1.jpg?width=688&height=858&name=JOIN-1.jpg)

 

---

### What's Next?

- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Learn how to [create an attribute transformations for channels and brand portals](https://help.plytix.com/create-computed-attributes)
- Check out the [LEN operation](https://help.plytix.com/operations/len)

---
