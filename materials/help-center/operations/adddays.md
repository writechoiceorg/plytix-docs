---
title: ADD_DAYS Operation
source_url: https://help.plytix.com/en/operations/adddays
description: "How to use the ADD_DAYS operation in formulas"
---

# ADD_DAYS Operation

## How to use the ADD_DAYS operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

[Compatible Attributes](#compatible)

[Formula In Use](#formula)

###  

---

### Definition

The ADD_DAYS operation adds days to a date.

---

### Example

ADD_DAYS("2020-03-30", 2)

Result:
"2020-04-01"

---

### Syntax Guide

ADD_DAYS(date, days)

**date** - The date to add days to

**days** - The number of days you want to add to the date

---

### Compatible Attribute Types

- Date attributes

---

### Formula In Use

ADD_DAYS($ATT.SALE_EXPIRY_DATE,15)

In this example, the formula tells the system to add 15 days to the date in question (01-January-2020) which results in 16-January-2020.

![ADD_DAYS Operation (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/ADD_DAYS%20Operation/ADD_DAYS%20Operation%20(1).jpg?width=600&height=678&name=ADD_DAYS%20Operation%20(1).jpg)

 

---

### What's Next?

- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [ADD_MONTHS operation](https://help.plytix.com/operations/addmonths)
- Check out the [ADD_YEARS operation](https://help.plytix.com/operations/addyears)

---
