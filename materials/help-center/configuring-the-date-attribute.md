---
title: Configuring a Date Attribute
source_url: https://help.plytix.com/en/configuring-the-date-attribute
description: "How to configure date attributes in Plytix using standard formatting rules when importing and exporting"
---

# Configuring a Date Attribute

## How to configure date attributes in Plytix using standard formatting rules when importing and exporting

Dates are often written differently depending on region or personal preference. This article lists the format rules, explains how to configure your date attribute format for import, and how to configure the date attribute when sharing data.

 

ℹ️  In Plytix, all date attributes are displayed as [Month Abbreviation (Day), Year] (Ex: Nov 14, 2022) by default and can only be modified upon export.

 

[Date Format Tokens](#tokens)

[Configuring the Date Format for Import](#importing)

[Configuring the Date Format for Export](#sharing)

 

_*Skip to any section in this article by clicking on the links above_

 

---

### Date Format Tokens

Below is the list of tokens you can choose from when configuring a date attribute: 

 

![Configuring Date-1](https://help.plytix.com/hs-fs/hubfs/Configuring%20Date-1.png?width=670&height=515&name=Configuring%20Date-1.png)

  ****
********

| Date column in CSV | Format Tokens |
| --- | --- |
| 25.12.2020 | %d.%m.%Y |
| 12/25/2020 | %m/%d/%Y |
| 25-Dec-2020 | %d-%b-%Y |

 

---

### Configuring the Date Format for Import

When importing a CSV with a date attribute, you must define how Plytix should read that date.

To import a date attribute:
1.

Follow the steps to [import product data](https://help.plytix.com/import-product)
2.

During the matching process, match the date to an existing date attribute or create a new date attribute
3.

You will see these settings: 

![1. Configuring date format for import](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Configuring%20the%20date%20attribute/1.%20Configuring%20date%20format%20for%20import.png?width=664&height=354&name=1.%20Configuring%20date%20format%20for%20import.png)

4. In the **"**Date Format**"** field, type in the corresponding tokens to identify how the date is shown in your CSV file and how Plytix should read it. Separate the tokens using the same spacing character as in your CSV file (typically: **-** or **. **or **/ **)

 

---

### Configuring the Date Format for Export

Formatting the date attribute for output follows a similar process for Product Sheets, Brand Portals, and Channels. 
1. Follow the steps to creating or managing a [Product Sheet](https://help.plytix.com/create-and-manage-pdf-templates), [Brand Portal](https://help.plytix.com/create-and-manage-e-catalogs), or [Channel](https://help.plytix.com/creating-a-channel) and add the Date attribute you want to show. 
2. In the '**Attributes'** tab find your date attribute.
3. In the '**Formatting'** column, you can see the current output format.
4. Click on the '**S****ettings'** icon that appears when you hover your mouse over the date attribute.

![2. Configuring the Date Format for Export - 1](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Configuring%20the%20date%20attribute/2.%20Configuring%20the%20Date%20Format%20for%20Export%20-%201.png?width=644&height=343&name=2.%20Configuring%20the%20Date%20Format%20for%20Export%20-%201.png)

5. Type in the new format tokens.

![3. Configuring the Date Format for Export - 2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Configuring%20the%20date%20attribute/3.%20Configuring%20the%20Date%20Format%20for%20Export%20-%202.png?width=644&height=343&name=3.%20Configuring%20the%20Date%20Format%20for%20Export%20-%202.png)

6. Click** 'Okay' **and **'Save Changes' **on your product sheet, brand portal or channel.

---

### What's next? 

- Learn about [attribute types](https://help.plytix.com/attribute-types)
- Learn how to [filter your products by attributes](https://help.plytix.com/filtering)
- Learn how to use [date formulas](https://help.plytix.com/en/operations#date)

---
