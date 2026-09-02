---
title: INDEX Operation
source_url: https://help.plytix.com/en/operations/index
description: "How to use the INDEX operation to set up conditional formulas in formulas"
---

# INDEX Operation

## How to use the INDEX operation to set up conditional formulas in formulas

[Definition](#defintion)

[Example](#Example)

[Syntax Guide](#syntax)

[Formula in Use](#use)

### Definition

The `INDEX` operation returns the element at a specified position within a list.​

---

### Example

INDEX($ATT.list, 1)

$ATT.list = ["Apple", "Banana", "Cherry", "Date"]

Result:
"Apple"

---

### Syntax Guide

INDEX(list, index)
- **list**: The list from which to retrieve the element.​
- **index**: The position of the desired element in the list.​

---

### Formulas In Use

![Index operation 1](https://help.plytix.com/hs-fs/hubfs/Index%20operation%201.jpg?width=688&height=364&name=Index%20operation%201.jpg)

⚠️ For a list example: ["Apple", "Banana"], using INDEX($ATT.list, 5) will return an empty value, as the index exceeds the list size, in this example, 2.

Using INDEX($ATT.list, 1) on an empty list will return an empty value.

 

---

### What's Next

- Learn more about[how to write formulas](https://help.plytix.com/formula-cheat-sheet-and-guide)
- Check out the [IFBLANK operation](https://help.plytix.com/operations/ifblank)
- Check out the [IFNULL operation](https://help.plytix.com/operations/ifnull)

 

---
