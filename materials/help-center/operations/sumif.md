---
title: SUMIF Operation
source_url: https://help.plytix.com/en/operations/sumif
description: "How to use the SUMIF operation in formulas"
---

# SUMIF Operation

## How to use the SUMIF operation in formulas

### **Definition**

SUMIF is an Excel function that returns the sum of items if they meet a certain condition.

### **Example**

$ATT.PRICE_1 = 32.44
$ATT.PRICE_2 = 29.33
$ATT.PRICE_3 = 35.22

SUMIF(GT(30, $$ITEM), $ATT.PRICE_1, $ATT.PRICE_2, $ATT.PRICE_3)

Result:
67.66

### **Syntax Guide**

SUMIF(formula, value1, value2, ....)

or

SUMIF(formula, [value1, value2, ...])

formula - A formula that checks if items meet a set of conditions
value - A list of values: [value1, value2, ...] or n values: value1, value2, ...

---
