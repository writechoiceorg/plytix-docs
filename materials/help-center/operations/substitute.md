---
title: SUBSTITUTE Operation
source_url: https://help.plytix.com/en/operations/substitute
description: "How to use the SUBSTITUTE operation for in formulas"
---

# SUBSTITUTE Operation

## How to use the SUBSTITUTE operation for in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

[Formula in Use](#formula)

### Definition

The SUBSTITUTE operation replaces existing text in a string with a new text. 

⚠️  This operation is case sensitive.

---

###  

### Example

SUBSTITUTE("HELLO WORLD", "HELLO", "BYE")

Result:
BYE WORLD

---

###
Syntax Guide

SUBSTITUTE(text_to_search, search_for, replace_with, [occurrence_number])

text_to_search - The text within which to search and replace

search_for - The string to search for within text_to_search

search_for will match parts of words as well as whole words; therefore a search for "pop" will also replace text within "popular"

replace_with - The string that will replace search_for

occurrence_number - [ OPTIONAL ] - occurrence_number - [ OPTIONAL ] - Specifies which occurrence of text_to_search you want to replace with new_text.
- If you specify occurence_number, only that particular instance is replaced.
- Otherwise, every occurrence is replaced with the replace_with text.
- If the occurence_number is greater than the number of occurrences, the original string will be returned with no changes

---

###  

### Formula In Use

#### Creating a Handle for Shopify

LOWER(SUBSTITUTE($LABEL," ","-"))

![SUBSTITUTE Operation](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/SUBSTITUTE%20Operation/SUBSTITUTE%20Operation.jpg?width=688&height=774&name=SUBSTITUTE%20Operation.jpg)

---

###  

### What's Next

- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [FIND operation](https://help.plytix.com/operations/find)
- Check out the [RSUBSTITUTE operation](https://help.plytix.com/operations/rsubstitute)

---
