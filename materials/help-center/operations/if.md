---
title: IF Operation
source_url: https://help.plytix.com/en/operations/if
description: "How to use the IF operation in formulas"
---

# IF Operation

## How to use the IF operation in formulas

[Definition](#defintion)

[Example](#Example)

[Syntax Guide](#syntax)

[Formula in Use](#use)

### Definition

The IF operation returns a value based on a set of conditions.

---

### Example

IF(EQ(1, 1), "equal", "different")

Result:
equal

---

### Syntax Guide

IF(logical_expression, value_if_true, value_if_false)

logical_expression - An expression that represents some logical value, i.e. TRUE or FALSE

value_if_true - The value the function returns if logical_expression is TRUE

value_if_false - [ OPTIONAL - blank by default ] - The value the function returns if logical_expression is FALSE

---

### Formulas In Use

#### Conditional Brand Insertion

Searches a string and checks if it contains the value from another attribute. If it does, then it returns the original string, if it doesn't it concatenates it with the value from the second attribute.

**Example:**

If brand is "Nitro" and the description is "Snowboard for kids" it will insert in in front of the description so it becomes "Nitro snowboard for kids"

If the brand is "Nitro" and the description is "Snowboard for kids from Nitro" it will do nothing and use the description as it is (because it already contains the word "Nitro").

**Formula:**

IF(GT(SEARCH($ATT.BRAND,$ATT.DESCRIPTION),0),$ATT.DESCRIPTION,CONCAT($ATT.BRAND," ",$ATT.DESCRIPTION))

 

---

### What's Next

- Learn more about[how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [IFBLANK operation](https://help.plytix.com/operations/ifblank)
- Check out the [IFNULL operation](https://help.plytix.com/operations/ifnull)

---
