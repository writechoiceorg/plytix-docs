---
title: SEARCH Operation
source_url: https://help.plytix.com/en/operations/search
description: "How to use the SEARCH operation in formulas"
---

# SEARCH Operation

## How to use the SEARCH operation in formulas

### Definition

The SEARCH operation finds the first position of a string found in a text. This is not case sensitive. 

### Example

SEARCH("lo","HELLO WORLD")

Result:
4

### Syntax Guide

SEARCH(search_for, text_to_search, [starting_at])

search_for - The string to look for within text_to_search.

text_to_search - The text to search for the first occurrence of search_for.

starting_at - [ OPTIONAL - 1 by default ] - The character within text_to_search at which to start the search.

### Formulas In Use

#### Search and Return Values

Search a string for selected values and return corresponding values.

**Example:**
Search for words or phrases in a description and return product type based on that. Search for the word "boot" in a description and return "snowboard boot"

**Formula:**

IF(GT(SEARCH("boot",$ATT.TEXT),0),"snowboard boots",if(GT(SEARCH("jacket",$ATT.TEXT),0),"snowboard jacket","unknown"))

---
