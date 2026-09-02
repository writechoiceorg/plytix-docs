---
title: AND Operation
source_url: https://help.plytix.com/en/operations/and
description: "How to use the AND operation in formulas"
---

# AND Operation

## How to use the AND operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#guide)

### Definition

The AND operation allows you to test multiple conditions.

This operation will:
- Return TRUE if all of the provided arguments are logically true
- Return FALSE if _any_ of the provided arguments are logically false
- Only FALSE and 0 are considered false

### Example

$ATT.BOOLEAN = 1

AND($ATT.BOOLEAN, true)

Result:
TRUE

### Syntax Guide

AND(logical_expression1, [logical_expression2, ...])

logical_expression1 - An expression that represents or can represent some logical value, i.e. TRUE or FALSE

logical_expression2, ... - [ OPTIONAL ] - Additional expressions

### What's Next

Check out similar operations like: 
- [IF to set conditional statements](https://help.plytix.com/operations/if)
- [OR to test multiple conditions](https://help.plytix.com/operations/or)
- [EQ to test equality of items](https://help.plytix.com/operations/equal)

 

---
