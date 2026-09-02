---
title: Assigning Products to Product Families
source_url: https://help.plytix.com/en/assigning-products-to-product-families
description: "How to add and remove products to/from a Product Family."
---

# Assigning Products to Product Families

## How to add and remove products to/from a Product Family

When you assign a product to one of your Product Families, you can choose to only display the attributes you have defined for this specific Product Family. This means that that you always see the most relevant attributes for each product type. You can also define which content should be the same for parents and variants, by [setting the Inheritance status ON](https://help.plytix.com/en/how-to-create-and-manage-product-families#edit-inheritance-status) for attributes that share the same value across those products.

In this article, you will learn how to assign, edit or remove products within families. If you want to learn how to create product families, [check out this article](https://help.plytix.com/en/how-to-create-and-manage-product-families).

[Assigning Products to a Family](#assign-family)
- [From the Product Overview](#product-overview)
- [From the Product Detail Page](#product-detail)
- [Via Import](#import)

[Removing Products from a Family](#remove-family)

_*Skip to a section in this article by clicking on the links above
_

---

###
Assigning Products to a Family 

Adding products to a Family can be done in a few ways:

#### **From the Product Overview:**

To assign multiple products to your Family:
1. Go to the Product Overview by clicking on '**Products'**
2. Choose '**All Products'.**
3. Select the products you want to add to a Family. 

You can [use filters on the right side panel](/en/filtering) to narrow your selection

      4.   Select the "**Assign Family**" bulk action: 

![Assign Family](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/New%20design%202026/Assign%20Family.jpg?width=670&height=341&name=Assign%20Family.jpg)

       5.   Select the Family you wish to assign to the selected products. 

ℹ️ Variant products are automatically assigned to the same family as the parent product.

       6.   Click '**Next'**. 

       7.   Confirm the decision

![Assign Family - confirm](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/New%20design%202026/Assign%20Family%20-%20confirm.jpg?width=670&height=315&name=Assign%20Family%20-%20confirm.jpg)

#### **From the Product Detail Page**

If  you want to assign a single product to a Product Family you can:
1. Go to the Product Detail Page of the product
2. On the left side panel, you can see the box '**Product Family'. **To assign a Family, click on the pencil icon.

![PDP - Assign family](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/New%20design%202026/PDP%20-%20Assign%20family.jpg?width=644&height=309&name=PDP%20-%20Assign%20family.jpg)

3. Choose the Family you want to assign the product to.
4. Click '**Next'.**
5. Click 'Confirm'

![Assign Family - confirm](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/New%20design%202026/Assign%20Family%20-%20confirm.jpg?width=670&height=315&name=Assign%20Family%20-%20confirm.jpg)

⚠️ If the product is a parent product, all its variations will also be assigned to the new family automatically. 

ℹ️  Any attribute values that don't belong to the family will be maintained until explicitly deleted. However, they will no longer be editable.

#### **Via Import**

ℹ️ You can only assign products to families that exist in the PIM.

To assign products to existing families via import, simply add a "Family" column in your CSV specifying the family you'd like to assign your products to.

1.  Click 'Imports'

![Assign family - import](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/New%20design%202026/Assign%20family%20-%20import.jpg?width=670&height=185&name=Assign%20family%20-%20import.jpg)

2.  Upload your CSV file

![Import 2](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/New%20design%202026/Import%202.jpg?width=670&height=340&name=Import%202.jpg)

3.  In family options, choose "Ignore" or "Update" your preferences for values of attributes that are outside of the families listed in your CSV.

4.  Choose your preferences for values for **attributes with inheritance on**. If you would like to maintain the value inherited from the parent, choose "**Ignore for variants**". If you would like to overwrite the parent value with a unique value for the variant, choose "**Overwrite**".

![Select Family Option](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/Select%20Family%20Option.jpg?width=670&height=894&name=Select%20Family%20Option.jpg)

5. Click "Go to matching"

The "Family" column will automatically match with the Family field in Plytix

![Mapping - Family](https://help.plytix.com/hs-fs/hubfs/Help%20center/Using%20Plytix/Assigning%20Products%20to%20Product%20Families/Mapping%20-%20Family.jpg?width=670&height=283&name=Mapping%20-%20Family.jpg)

6. Click "Start import"

⚠️ Only single and parent products can be assigned to families. Variant products will always be assigned to the same family the parent belongs to.  For this reason, when assigning products to families via import, please make sure to** always include the parent product**; assigning families when only the variant product is included in the file will not add it to the family.

💡 To change the Product Family a product is assigned to, follow the steps above to change it from the Product Overview , from the Product Detail Page, or via import. 

 

---

### **Removing Products from a Family** 

To remove Products from a Family you can do so from the Product Overview Page in bulk or from the Product Detail Page for an individual Product. You can also change it via Import.

To remove products from a family, follow the same steps to assign products to a family; but, instead of choosing a family, select "**Unassigned**".

This way, the products you selected will not belong to any family. 

---

https://help.plytix.com/hubfs/Help%20center/Using%20Plytix/Create%20and%20Manage%20Product%20Families/remove-family.png

### What's Next

- Learn how to [create and manage product families](https://help.plytix.com/en/how-to-create-and-manage-product-families)
- Learn about [creating product attribute groups](https://help.plytix.com/en/product-attribute-groups)
- Learn about [working with Table Views](https://help.plytix.com/en/table-views)

---
