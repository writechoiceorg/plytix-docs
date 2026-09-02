---
title: SPLIT Operation
source_url: https://help.plytix.com/en/operations/split
description: "How to use the SPLIT operation in formulas"
---

# SPLIT Operation

## How to use the SPLIT operation in formulas

[Definition](#definition)
[Example](#example)
[Syntax Guide](#syntax-guide) 
[Formula In Use](#formula-in-use)

 

---

### Definition

SPLIT is an operation that will split a string into substrings based on a delimiter. The result is returned as an array of substrings. This can help you format data correctly for certain output requirements where a string/plain text needs to be an array.

---

### Example

$LABEL = 'h-e-l-l-o'

SPLIT($LABEL, "-")

 

**Result:**

['h', 'e', 'l', 'l', 'o']

---

### Syntax Guide

SPLIT(**string**, **separator**)

**string** - The string you want to split

**separator** - Specifies the separator to use when splitting the string

---

### Formula In Use

![SPLIT Operation 1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/SPLIT%20Operation/SPLIT%20Operation%201.jpg?width=688&height=741&name=SPLIT%20Operation%201.jpg)

 

---

### What's next? 

- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
-

Check out the [CONCAT Operation](https://help.plytix.com/en/operations/concat)
-

Check out the [ISBLANK operation](https://help.plytix.com/en/operations/isblank)

 

---
