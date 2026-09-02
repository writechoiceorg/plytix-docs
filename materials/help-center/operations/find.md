---
title: FIND Operation
source_url: https://help.plytix.com/en/operations/find
description: "How to use the FIND operation in formulas"
---

# FIND Operation

## How to use the FIND operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

###  

---

### Definition

The FIND operation finds the first position of a string found in a text and is case sensitive. 

 

---

### Example

FIND("e","Hello There!")

Result:
2

 

ℹ️ If the formula doesn't find any instances, the result is NULL. 

###  

---

### Syntax Guide

FIND(search_for, text_to_search, [starting_at])

**search_for** - The string to look for within text_to_search

**text_to_search** - The text to search for the first occurrence of search_for

**starting_at** _(OPTIONAL)_ - The character within text_to_search at which to start the search. If left blank the system will use 1 by default )

 

---

### What's Next? 

- Learn more about[how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [JOIN operation](https://help.plytix.com/en/operations/join)
- Check out the [LEN operation](https://help.plytix.com/operations/len)

---
