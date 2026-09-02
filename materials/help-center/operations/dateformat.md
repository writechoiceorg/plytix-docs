---
title: DATE_FORMAT Operation
source_url: https://help.plytix.com/en/operations/dateformat
description: "How to use the DATE_FORMAT operation in formulas"
---

# DATE_FORMAT Operation

## How to use the DATE_FORMAT operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#guide)

### Definition

The DATE_FORMAT operation allows you to change the date format using the following tokens:

![Configuring Date](https://help.plytix.com/hs-fs/hubfs/Configuring%20Date.png?width=688&name=Configuring%20Date.png)

### Example

$ATT.DATE = 2020-03-22

DATE_FORMAT($ATT.DATE, "%d-%b-%Y")

Result:
22-Mar-2020

### Syntax Guide

DATE_FORMAT(date, format)

date - the date to be formatted

format - the new format of the date

![DATE_FORMAT Operation (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/DATE_FORMAT%20Operation/DATE_FORMAT%20Operation%20(1).jpg?width=600&height=620&name=DATE_FORMAT%20Operation%20(1).jpg)

### What's Next

Check out similar operations like: 
- [ADD_DAYS Operation](https://help.plytix.com/operations/adddays)
- [ADD_MONTHS Operation](https://help.plytix.com/operations/addmonths)
- [ADD_YEARS Operation](https://help.plytix.com/operations/addyears)

 

---
