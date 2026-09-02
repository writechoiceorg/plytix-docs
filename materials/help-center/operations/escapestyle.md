---
title: ESCAPESTYLE Operation
source_url: https://help.plytix.com/en/operations/escapestyle
description: "How to use the ESCAPESTYLE operation in formulas"
---

# ESCAPESTYLE Operation

## How to use the ESCAPESTYLE operation in formulas

### Definition

The ESCAPESTYLE operation removes all styling elements from a text.

### Example

ESCAPESTYLE("<script>alert(‘Hello’)</script><b style="color: red">Hello World</b>")

Result:
<script>alert(‘Hello’)</script><b>Hello World</b>

### Syntax Guide

ESCAPESTYLE(text)

text - The text string to remove styling elements from

---
