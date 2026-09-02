---
title: Formula Cheat Sheet & Guide
source_url: https://help.plytix.com/en/formula-cheat-sheet-and-guide
description: "How to write formulas"
---

# Formula Cheat Sheet & Guide

## How to write formulas

Formulas help you transform your attribute outputs for Channels and Brand Portals (known here as Attribute Transformation) and also use them in the [Formula attribute type](https://help.plytix.com/en/formula-attributes). In this guide, you will learn how to use the formula editor and what operations are available. 
- [How to use the Formula Editor](#formula-editor)
 - [How to write a formula](#write-formula)
 - [How to validate a formula](#validate-formula)
 - [How to test formula attributes](#test-attributes)

- [List of Available Operations](#operations)

### How to use the Formula Editor

After you have created your Attribute Transformation, you can start editing the formula by clicking on the options icon next to the attribute you want to configure. 

Once you have done this, you should see this screen slide out from the right side of the page: 

![formula-empty](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Formula%20Cheat%20Sheet%20and%20Guide/formula-empty.png?width=670&height=357&name=formula-empty.png)

In the Formula Editor, you will see a text box. This is where you write your formulas using the available operations, your existing attributes, and text inputs. 

Formula syntax, or how a valid formula is written, is **based largely on Excel**, Google Sheets, and Python. 
- [How to write a formula](#write-formula)
- [How to validate a formula](#validate-formula)
- [How to test formula attributes](#test-attributes)

---

### **How to write a formula**

- Use [operations](#operations)
- Enclose operations in parentheses
- [Insert **properties **](https://help.plytix.com/en/insert-apply-properties-computed-attributes)using the "$" symbol
- Insert **line breaks** using SHIFT+Enter enclosed in "quotes"

**Other Formula Elements:**
- **$$ITEM - **This is used to represent a value of a Multiselect attribute. This is used in operations like [MAP](https://help.plytix.com/operations/map)and [FILTER](https://help.plytix.com/operations/filter) as a placeholder variable that will take the different values of the attribute in a loop execution.
- **[Brackets]** - These are used in formulas like [JOIN](https://help.plytix.com/operations/join) or [DLOOKUP](https://help.plytix.com/operations/dlookup) to represent a set or range of values
- **<html>** - Elements of HTML can be used in formulas in combination with operations to change the style of an attribute value, for example to add bullets or line breaks.
- **# symbol **- This can be used to add notes to your formulas, making complex operations easier to read and troubleshoot.  Anything enclosed between the hashtags won't be part of the operation.

![formula-notes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Formula%20Cheat%20Sheet%20and%20Guide/formula-notes.png?width=644&height=343&name=formula-notes.png)

The formula editor will help you with autosuggest for both operations and attributes. For **operations**, start typing the name of the operation you want to use. For **attributes**, start by typing "$" then the attribute list will appear. 

**Auto-suggest for Operations**

![formula-suggestions](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Formula%20Cheat%20Sheet%20and%20Guide/formula-suggestions.png?width=670&height=357&name=formula-suggestions.png)

**Auto-suggest for Attributes**

![formula-suggestions-2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Formula%20Cheat%20Sheet%20and%20Guide/formula-suggestions-2.png?width=670&height=357&name=formula-suggestions-2.png)

💡  When searching for your own attributes, just type $ and then the name of your attribute. You do not need to use the ATT prefix. 

---

### **How to validate a formula**

When you validate a formula, you are asking the system, "Is this formula written correctly?", "Do you understand this?" 

![formula-validate](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Formula%20Cheat%20Sheet%20and%20Guide/formula-validate.png?width=670&height=357&name=formula-validate.png)

To validate a formula, once you are finished editing, click **"Validate formula".** 

Then, one of two things will happen. Either you will **get an error**, explaining why the formula isn't correctly written, or you will **see the attribute testing area below the Formula Editor**

ℹ️ You can also click **"Validate and save"** in the top right corner to validate the formula and close the window. 

---

### How to test formula attributes

If your formula has been validated, then you will see this area appear below the Formula Editor, and the Editor will be disabled. 

![formula-run_test](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Formula%20Cheat%20Sheet%20and%20Guide/formula-run_test.png?width=670&height=357&name=formula-run_test.png)

This area lets you test different possible inputs for your attribute to make sure your formula gives you the correct results.

Attributes without fixed inputs, like numbers or texts, will have dummy data presented, while those with fixed inputs like multi-select or dropdown, will show your existing inputs.

ℹ️ Note that, when referencing multiselect attributes, the output result will contain brackets "[ ]". To remove brackets from the output, use a [JOIN operation](https://help.plytix.com/en/operations/join) before referencing your multiselect attribute in the formula, following this format: JOIN($YOUR_ATTRIBUTE, "your_separator").

Here's an example using a multiselect attribute in a [CONCAT operation](https://help.plytix.com/en/operations/concat):

CONCAT($ATT.ATTRIBUTE, " ", JOIN($ATT.MULTISELECT, ","))

 

**To test attributes: **
1. Check or change the data for each attribute so that you can test the outcome
2. Click **"Run test"**
3. Check the result at the bottom of the testing area and repeat the process as needed

 

---

### List of Operations

Here are all the available operations listed in **alphabetical order**. Click each link to take you to the operations page in a new tab where you can see the definition, syntax, and examples.
1. [**ADD_DAYS - **Add days to a date](https://help.plytix.com/operation/adddays)
2. [**ADD_MONTHS - **Add months to a date](https://help.plytix.com/operations/addmonths)
3. [**ADD_YEARS - **Add years to a date](https://help.plytix.com/operations/addyears)
4. [**AND - **Test multiple conditions](https://help.plytix.com/operations/and)
5. [**AVERAGE - **Find the average in a numerical dataset](https://help.plytix.com/operations/average)
6. [**CEILING** - Return a number rounded up based on a multiple](https://help.plytix.com/en/operations/ceiling)
7. [**CONCAT - **Concatenate multiple values](https://help.plytix.com/operations/concat)
8. [**CONTAINS_ALL -** Determine if all of a set of values is found within another set](https://help.plytix.com/en/operations/contains_all)
9. [**CONTAINS_ANY -** Determine if any of a set of values is found within another set](https://help.plytix.com/en/operations/contains_any)
10. [**COUNTIF - **Count the number of occurrences of a value in a string](https://help.plytix.com/operations/countif)
11. [**DATE_FORMAT - **Change the data format](https://help.plytix.com/operations/dateformat)
12. [**DECIMAL_FORMAT - **Change the decimal format](https://help.plytix.com/operations/decimalformat)
13. [**DIVIDE - **Divide one number by another](https://help.plytix.com/operations/divide)
14. [**DLOOKUP - **Replace values from a dictionary](https://help.plytix.com/operations/dlookup)
15. [**EQ - **Verify that two values are equal](https://help.plytix.com/operations/equal)
16. [**ESCAPEHTML - **Remove all HTML tags from a text](https://help.plytix.com/operations/escapehtml)
17. [**ESCAPESTYLE - **Remove all styling from a text](https://help.plytix.com/operations/escapestyle)
18. [**FILTER - **Return a list of items that achieve certain conditions](https://help.plytix.com/operations/filter)
19. [**FIND - **Identify the first position of a string found in a text (case sensitive)](https://help.plytix.com/operations/find)
20. [**FLOOR** - Return a number rounded down based on a multiple](https://help.plytix.com/en/operations/floor)
21. [**GT - **Strictly greater than](https://help.plytix.com/operations/greaterthan)
22. [**GTE - **Greater than or equal to](https://help.plytix.com/operations/greaterthanorequalto)
23. [**IF - **Return a value based on a set of conditions](https://help.plytix.com/operations/if)
24. [**IFBLANK - **Return a specified value if blank or not](https://help.plytix.com/operations/ifblank)
25. [**IFERROR - ** Return a specified value if error or not](https://help.plytix.com/operations/iferror)
26. [**IFNULL - **Return a specified value if null or not](https://help.plytix.com/operations/ifnull)
27. [**IS_SUBSTR - **Test if a string is found in a particular text](https://help.plytix.com/operation/issubstr)
28. [**ISBLANK - **Test if a value or field is empty](https://help.plytix.com/operations/isblank)
29. [**INDEX **- Returns a specific position from a list of values](https://help.plytix.com/en/operations/index)
30. [**JOIN - **Concatenate values with a delimiter](https://help.plytix.com/operations/join)
31. [**LEFT** - Extract a substring from a string, starting from the leftmost character](https://help.plytix.com/en/operations/left)
32. [**LEN - **Count the characters in a string](https://help.plytix.com/operations/len)
33. [**LOWER - **Convert a string of text to all lowercase](https://help.plytix.com/operations/lower)
34. [**LT - **Strictly less than](https://help.plytix.com/operations/lessthan)
35. [**LTE - **Less than or equal to](https://help.plytix.com/operations/lessthanorequalto)
36. [**MAP - **Apply an operation to a list of inputs](https://help.plytix.com/operations/map)
37. [**MAX - **Find the maximum value in a numerical dataset](https://help.plytix.com/operations/max)
38. [**MID** - Extract a given number of characters from the middle of a string](https://help.plytix.com/en/operations/mid)
39. [**MIN - **Find the minimum value in a numerical dataset](https://help.plytix.com/operations/minimum)
40. [**MINUS - **Subtract one number from another](https://help.plytix.com/operations/minus)
41. [**MROUND - **Round a number to the nearest integer multiple](https://help.plytix.com/operations/mround)
42. [**MULTIPLY -** Return the product of two numbers](https://help.plytix.com/operations/multiply)
43. [**NE - **Not equal](https://help.plytix.com/operations/notequal)
44. [**NOT - **Return the opposite of the provided logical value](https://help.plytix.com/operations/not)
45. [**OR - **Test multiple condition options](https://help.plytix.com/operations/or)
46. [**PROPER - **Capitalize the first letter in each word of a text](https://help.plytix.com/operations/proper)
47. [**REPLACE - **Replace part of a particular string with a different string](https://help.plytix.com/operations/replace)
48. [**RIGHT** - Extract a substring from a string, starting from the rightmost character](https://help.plytix.com/en/operations/right)
49. [**ROUND - **Round a number to a specified decimal place](https://help.plytix.com/operations/round)
50. [**RSUBSTITUTE - **Replace the last occurrence of a string in a text](https://help.plytix.com/operations/rsubstitute)
51. [**SEARCH - **Find the first position of a string found in a text (not case sensitive)](https://help.plytix.com/operations/search)
52. [**SPLIT - **Split a string into substrings based on a delimiter](https://help.plytix.com/en/operations/split)
53. [**SUB_DAYS - **Subtract days from a date](https://help.plytix.com/operations/subtractdays)
54. [**SUB_MONTHS - **Subtract months from a date](https://help.plytix.com/operations/subtractmonths)
55. [**SUB_YEARS - **Subtract years from a date](https://help.plytix.com/operations/subtractyears)
56. [**SUBSTITUTE - **Replace existing text with a new text in a string (case sensitive)](https://help.plytix.com/operations/substitute)
57. [**SUM - **Add a set of numbers together](https://help.plytix.com/operations/sum)
58. [**SUMIF **- Return the sum of items if they meet a certain condition](https://help.plytix.com/en/operations/sumif)
59. [**TRIM - **Remove all spaces in a text string, leaving just a single space between words](https://help.plytix.com/operations/trim)
60. [**UPPER - **Convert a string to all UPPERCASE](https://help.plytix.com/operations/upper)

---

### What's next?

- Learn more about [attribute types](https://help.plytix.com/attribute-types)
- Find out how to [set up a feed for Google Merchant Center](https://help.plytix.com/how-to-create-a-xml-feed-for-google-shopping-merchant)
- Learn about [using attributes and other properties in formulas](https://help.plytix.com/en/insert-apply-properties-computed-attributes)

---
