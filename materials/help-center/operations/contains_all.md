---
title: CONTAINS_ALL Operation
source_url: https://help.plytix.com/en/operations/contains_all
description: "How to use the CONTAINS_ALL operation with formulas"
---

# CONTAINS_ALL Operation

## How to use the CONTAINS_ALL operation with formulas

### Definition

CONTAINS_ALL determines if all of a set of values is found within another set. This operation is case sensitive.

### Example

$LABEL = Beautiful Blue Bicycle

CONTAINS_ALL($LABEL,["blue","red"])

Result:
False

### Syntax Guide

CONTAINS_ALL(attribute, [value(s)])

attribute - The attribute that is checked to contain all of the given values

value(s) - The data to be verified

---
