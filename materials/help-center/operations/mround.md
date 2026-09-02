---
title: MROUND Operation
source_url: https://help.plytix.com/en/operations/mround
description: "How to use the MROUND operation in formulas"
---

# MROUND Operation

## How to use the MROUND operation in formulas

### Definition

The MROUND operation rounds a number to the nearest multiple.
- This includes _both_ integer and decimal multiples

### Example

MROUND(47,10)

Result:
50

### Syntax Guide

MROUND(value,factor)

value - The number to round to the nearest multiple of another

factor - The number to whose multiples value will be rounded

![MROUND Operation (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/MROUND%20Operation/MROUND%20Operation%20(1).jpg?width=688&height=767&name=MROUND%20Operation%20(1).jpg)

### Formulas In Use

#### Currency Conversion and Rounding

Converts a currency with a fixed exchange rate and rounds the result to always end on the same decimal (eg. 5)

Instead of converting with a fixed conversion rate where you get odd numbers, like for example:

100 dkk / 7.45 =13.42 EUR

Then this script can convert the odd calculated number 13.42 to one with a fixed decimal. In the example mentioned above, it would be:

100 DKK = 13.5 EUR

**Formula:**

MROUND(DIVIDE($ATT.PRICE_DKK, 7.45), 0.25)

 

---
