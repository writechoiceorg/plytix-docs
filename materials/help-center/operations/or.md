---
title: OR Operation
source_url: https://help.plytix.com/en/operations/or
description: "How to use the OR operation in formulas"
---

# OR Operation

## How to use the OR operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

[Formula In Use](#formula)

 

---

### Definition

The OR operation allows you to test multiple condition options

---

### Example

OR(0, True, Null)

Result:
true

---

### Syntax Guide

OR(logical_expression1, [logical_expression2, ...])

logical_expression1 - An expression that represents some logical value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value

logical_expression2, ... - [ OPTIONAL ] - Additional expressions representing some logical values, i.e. TRUE or FALSE, or expressions that can be coerced to logical values

 

---

### Formula In Use

[![OR Operation](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/OR%20Operation/OR%20Operation.jpg?width=688&height=703&name=OR%20Operation.jpg)](https://help.plytix.com/hubfs/OR%20operation%20-png.png)

IF(OR(EQ($STATUS,"Draft"),EQ($STATUS,"")),"Inactive")

This formula combines the [EQ Operation](https://help.plytix.com/en/operations/equal), OR Operation, and [IF Operations](https://help.plytix.com/operations/if) to state "**If the Status is Draft or is empty, then the output should be Inactive**."

![OR formula](https://help.plytix.com/hs-fs/hubfs/OR%20formula.png?width=688&name=OR%20formula.png)

---

### What's Next? 

- Learn more about[how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [DLOOKUP operation](https://help.plytix.com/operations/dlookup)
- Check out the [COUNTIF operation](https://help.plytix.com/operations/countif)

 

---
