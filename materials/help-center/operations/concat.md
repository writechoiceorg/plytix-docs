---
title: CONCAT Operation
source_url: https://help.plytix.com/en/operations/concat
description: "How to use the CONCAT Operation in formulas"
---

# CONCAT Operation

## How to use the CONCAT Operation in formulas

[Definition](#defintion)

[Example](#Example)

[Syntax Guide](#syntax)

[Formula in Use](#use)

###  

### Definition

The CONCAT operation concatenates, or joins, two or more values. 

 

---

### Example

CONCAT("HELLO", " ", "WORLD")

Result:
HELLO WORLD

 

---

### Syntax Guide

CONCAT(value1, value2,[value3],...)

value1 - The value to which value2 will be appended

value2 - The value to append to value1

value3, … - [OPTIONAL] Additional values to append

⚠️When using a multiselect attribute type, you will get brackets around your multiselect options if you use CONCAT. Try using the [JOIN operation](https://help.plytix.com/en/operations/join) instead to remove the brackets.

---

### Formula in Use

#### Creating a compound title 

CONCAT($ATT.SLOGAN," ","|"," ",$ATT.SHORT_DESCRIPTION)

![CONCAT (1)](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/CONCAT%20Operation/CONCAT%20(1).jpg?width=600&height=825&name=CONCAT%20(1).jpg)

#### Creating a bulleted description

CONCAT("•",$LABEL,"
","•",$LABEL,"
","•",$LABEL,"
","•",$LABEL)

###

![CONCAT - bullet](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/CONCAT%20Operation/CONCAT%20-%20bullet.jpg?width=600&height=690&name=CONCAT%20-%20bullet.jpg)

---

### What's Next

- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [LOWER operation](https://help.plytix.com/operations/lower)
- Check out the [MAP operation](https://help.plytix.com/operations/map)

---
