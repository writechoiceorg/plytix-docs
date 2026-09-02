---
title: ROUND Operation
source_url: https://help.plytix.com/en/operations/round
description: "How to use the ROUND operation in formulas"
---

# ROUND Operation

## How to use the ROUND operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

[Formula In Use](#formula)

 

---

### Definition

The ROUND operation will round a number to a specified decimal place using normal rounding rules. 

###  

---

### Example

ROUND(15.9952, 2)

Result:
16.00

###  

---

### Syntax Guide

ROUND(value, [places])

**value** - The value to round to places number of places

**places** - [ OPTIONAL - 0 by default ] - The number of decimal places to which to round

ℹ️ Places may be negative, in which case value is rounded at the specified number of digits to the left of the decimal point.

 

---

### Formula In Use

ROUND($ATT.WEIGHT,2)

This formula tells the system to round any values within the Weight attribute to two decimal places. 

![ROUND (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/ROUND%20Operation/ROUND%20(1).jpg?width=688&height=764&name=ROUND%20(1).jpg)

 

---

### What's Next?

- Learn more about[how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [RSUBSTITUTE operation](https://help.plytix.com/operations/rsubstitute)
- Check out the [REPLACE operation](https://help.plytix.com/en/operations/replace)

---
