---
title: DLOOKUP Operation
source_url: https://help.plytix.com/en/operations/dlookup
description: "How to use the DLOOKUP operation in formulas"
---

# DLOOKUP Operation

## How to use the DLOOKUP operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax-guide)

 

###
Definition

The DLOOKUP operation is similar to the VLOOKUP you will find in Excel, except it requires a dictionary. DLOOKUP will replace values based on that dictionary. 

---

###  

### Example

DLOOKUP($ATT.COLOR, {"red": "rojo","blue": "azul"},"not defined")

$ATT.COLOR value: red
Result: rojo

---

###  

### Syntax Guide

DLOOKUP(value, dictionary, [default])

value - The value to replace

dictionary - A set of keys and their corresponding values for replacement enclosed in brackets

default - [ OPTIONAL ] - When no value is found, this defines the default value

 

---

 

### What's Next

- Learn more about[how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [REPLACE](https://help.plytix.com/operations/replace) operation
- Check out the [SUBSTITUTE](https://help.plytix.com/operations/substitute) operation

 

---
