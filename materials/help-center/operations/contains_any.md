---
title: CONTAINS_ANY Operation
source_url: https://help.plytix.com/en/operations/contains_any
description: "How to use the CONTAINS_ANY operation in formulas"
---

# CONTAINS_ANY Operation

## How to use the CONTAINS_ANY operation in formulas

### Definition

CONTAINS_ANY determines if any of a set of values is found within another set. This operation is case sensitive.

### Example

$LABEL = Beautiful Blue Bicycle

CONTAINS_ANY($LABEL,["Blue","Red"])

Result:
True

### Syntax Guide

CONTAINS_ANY(attribute, [value(s)])

attribute - The attribute that is checked to contain all of the given values

value(s) - The data to be verified

---
