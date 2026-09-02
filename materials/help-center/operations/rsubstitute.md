---
title: RSUBSTITUTE Operation
source_url: https://help.plytix.com/en/operations/rsubstitute
description: "How to use the RSUBSTITUTE operation in formulas"
---

# RSUBSTITUTE Operation

## How to use the RSUBSTITUTE operation in formulas

### Definition

The RSUBSTITUTE operation replaces the last occurrence of a string in a text.

### Example

RSUBSTITUTE("HELLO WORLD", "O", "X")

Result:
HELLO WXRLD

### Syntax Guide

RSUBSTITUTE(text_to_search, search_for, replace_with)

text_to_search - The text within which to search and replace

search_for - The string to search for within text_to_search

search_for will match parts of words as well as whole words; therefore a search for "pop" will also replace text within "popular"

replace_with - The string that will replace search_for

---
