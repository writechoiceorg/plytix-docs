---
title: ESCAPEHTML Operation
source_url: https://help.plytix.com/en/operations/escapehtml
description: "How to use the ESCAPEHTML operation in formulas"
---

# ESCAPEHTML Operation

## How to use the ESCAPEHTML operation in formulas

[Definition](#definition)

[Example](#example)

[Syntax Guide](#syntax)

[Formula In Use](#formulas)

---

### Definition

The ESCAPEHTML operation removes all HTML tags from a text.

---

### Example

ESCAPEHTML("<script>alert(‘Hello’)</script><b>Hello World</b>")

Result:
Hello World

---

### Syntax Guide

ESCAPEHTML(text)

text - The text string to remove HTML tags from

 

---

### Formulas In Use

You can copy and paste the formulas below to use in your own account. Just remember to replace the attribute being used ($ATT.RICH_TEXT) with one in your account. 

[Stripping HTML With Line Breaks](#line-break)

[Stripping HTML With Line Breaks and Keeping Bullet Points](#bullets)

#### Stripping HTML With Line Breaks

In order to remove all the HTML code from a Rich text but still maintain the text in different lines as a paragraph.

Transforming this: “<ul><li>This</li><li>That</li><li>The other<br></li></ul>”

Into this:

“This

That

The other”

 

**Formula:**

ESCAPEHTML(SUBSTITUTE($ATT.RICH_TEXT,"<li>", "
"))

####

![ESCAPEHTML Operation - 1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/ESCAPEHTML%20Operation/ESCAPEHTML%20Operation%20-%201.jpg?width=688&height=926&name=ESCAPEHTML%20Operation%20-%201.jpg)

#### Stripping HTML With Line Breaks and Keeping Bullet Points

Maintain bullet points in the plain text version by adding the symbol in the bullet point symbol.

**Formula: **

ESCAPEHTML(SUBSTITUTE($ATT.RICH_TEXT_HTML,"<li>", "
•"))

![ESCAPEHTML Operation - BULLET POINTS](https://help.plytix.com/hs-fs/hubfs/Help%20center/Operations/ESCAPEHTML%20Operation/ESCAPEHTML%20Operation%20-%20BULLET%20POINTS.jpg?width=688&height=998&name=ESCAPEHTML%20Operation%20-%20BULLET%20POINTS.jpg)

---

### What's Next?

- Learn more about [how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [ESCAPESTYLE operation](https://help.plytix.com/operations/escapestyle)
- Check out the [FILTER operation](https://help.plytix.com/operations/filter)

 

If you have any questions just click on the chat box in the bottom-right corner and we'll be happy to answer them...

 

and please let us know 👇
