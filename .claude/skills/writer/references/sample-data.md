# Sample data: the Kitchen and Home demo account

Every example in the docs (V1/V2 spec, V3 overlay examples, guides, code samples) uses one catalog: the Kitchen and Home demo account that the V1/V2 reference (`fumadocs/openapi-v1v2.json`) already uses. The V1/V2 examples are the source of truth; V3 and the guides reuse their names, SKUs, categories, and attributes so readers see the same account from page to page. Don't use `example.com`, `foo`/`bar`, `stringstring`, or real customer data.

Don't rewrite the V1/V2 examples to match this page. When V3 or a guide needs something V1/V2 doesn't have, add it here in the same style.

## The account

| Item | Value |
|---|---|
| What it sells | Kitchen and home products: kettles, mugs and drinkware, coffee, aprons, sinks and faucets, gift baskets |
| `brand` attribute value | `Plytix` |
| `collection` attribute value | `2019` |
| Image source (asset `url`, `downloaded_from`) | `https://www.plytix.com/hubfs/Kitchen%20and%20Home%20Products/<File%20name>.jpg`, for example `.../Enjoy%20Mug%20-%20Blue.jpg` |
| Files Plytix serves | `https://files.plytix.com/...` (as returned by the API) |
| Vendor URL | `http://acme.com` |
| API host in examples | `<api-host>` in captured `next_page` links; `https://pim.plytix.com` in requests |

## People

| Name | Email / username | Role |
|---|---|---|
| The Owner | `USER@plytix.com` | Account owner |
| Alice Anderson | `alice` | `ADMIN` |
| Bob | `bob` | `USER` |
| API user | `api` | API credential |

## Catalog

Product categories:

- Sample Categories
  - Kettles & Teapots
  - Coffee & Tea
    - Ground Coffee
  - Drinkware
- Mugs
  - Ceramic
- Kitchen Sinks
- Kitchen Faucets
- Bathroom Faucets
- Apron
  - Apron Bamboo

Asset categories: Marketing logos (slug `marketing-logos`), Packshots, Marketing Material, Specifications.

Products:

| SKU | Label | Category | Notes |
|---|---|---|---|
| `Black Kettle` | Black Kettle | Kettles & Teapots | Parent in variant examples; variants `Black Kettle_1`, `Black Kettle_11` |
| `1001` | Black Wavy Frost Glass Vessel Bowl | Kitchen Sinks | Brand `Plytix`, collection `2019`, color `Glass`; use for products with many dimension attributes |
| `blue adventure mug S023` | Adventure mug | Mugs > Ceramic | Red version `red adventure mug S02223`; image `Enjoy%20Mug%20-%20Blue.jpg` |
| `GF-Basket` | Gift basket | Sample Categories | Related products (relationship `gift_basket`): `GF-Wine`, `GF-Chocolates`, `GF-Emmental` |
| `RP-001`, `RP-002`, `RP-003` | Recommended products | | Linked with relationship `recommended_products` and a `quantity` |
| `Sample - 001` to `Sample - 011` | | | For lists that need many records |

Asset filenames: `kettle_blue.jpg`, `Kettle handle - White.png`, `demo.png`, `3536.jpg`, or the image source file name.

## Attributes

| Label | Name | Type |
|---|---|---|
| `brand` | Brand | Text |
| `collection` | Collection | Text |
| `color` | Color | Text or multiselect |
| `description` | Description | Rich text |
| `feature_description` | Feature description | Text |
| `gtin` | GTIN | Text |
| `in_stock` | In Stock | Boolean |
| `ready_to_ship` | Ready to ship | Completeness |
| `basic_info_complete` | Basic Info Complete | Completeness |
| `rich_info_complete` | Rich Info Complete | Completeness |
| `suggested_retail_price` | Suggested retail price | Decimal |
| `stock` | Stock | Integer |
| `since` | Since | Date |
| `vendor_url` | Vendor URL | URL |
| `video_url` | Video URL | URL |
| `locations` | Locations | Multiselect |
| `product_length_mm`, `product_width_mm`, `product_height_mm` | Product length/width/height (mm) | Integer |
| `product_weight_kg` | Product weight (kg) | Decimal |

Attribute groups: Dimensions. Relationships: Gift basket (`gift_basket`), Recommended products (`recommended_products`), Gift pack.

## Also in use

Values the V3 examples and guides needed that the V1/V2 examples don't have. Reuse them before adding new ones.

Products and variants:

| SKU | Label | Notes |
|---|---|---|
| `GF-Basket-L` | Gift basket, Large | Variant of `GF-Basket` (the main V3 product, ID `6a1f0c2e9b3d4a5f8c7e1a01`, family Gift Baskets, category Drinkware) |
| `GF-Basket-S`, `GF-Basket-M` | Gift basket, Small / Medium | More `GF-Basket` variants, for list pages |
| `GF-Wine` | Red wine | Second product in V3 search results (`6a1f0c2e9b3d4a5f8c7e1a02`) |
| `GF-Chocolates` | Chocolate box | |
| `GF-Emmental` | Emmental cheese | |
| `BAMBOO-APRON` | Bamboo apron | Three-level hierarchy: variants `BAMBOO-APRON-RED`, `BAMBOO-APRON-BLUE`; sub-variant `BAMBOO-APRON-RED-S` (size) |
| `Black Kettle_1` | | Variant of `Black Kettle` in the create-a-variant walkthrough |

Label rename example: `Gift basket` to `Gift basket, deluxe`.

Before/after brand change (PATCH examples): `Plytix Kitchen` before, `Plytix` after, next to `collection: "2019"`.

Product categories (V3 IDs): `Sample Categories` (slug `sample-categories`, `…1c01`), `Drinkware` (slug `drinkware`, `…1c02`), `Kettles & Teapots` (slug `kettles-teapots`, `…1c03`), `Mugs` (slug `mugs`, `…1c04`). Rename example: `Espresso Cups`. Slug example: `kitchen-sinks` for "Kitchen Sinks".

Product families: Gift Baskets (`…1d01`), Kitchen Sinks (`…1d02`), Aprons (`…1d03`). Created in examples: Mugs. Rename example: Mugs and Cups.

Attributes: `collection` is the sample Text attribute (ID `…1e04`); `size` is a Dropdown (Small, Medium, Large, ID `…1e05`); `in_stock` (In Stock) is the sample Boolean; `feature_description` (Feature description); `hero_image` (Media) and `additional_image_gallery` (Additional Image Gallery, Media gallery); `video_url` (Video URL); `since` (Since, Date); multiselect `color` options Blue, Purple, White, Beige, Orange; formula example "Price in USD". Rename example: Collection to "Collection name".

Attribute groups: Basic Information, Dimensions (labels `product_weight_kg`, `product_length_mm`, `product_width_mm`, `product_height_mm`, `packed_product_weight_kg`), Rich Information. Rename example: Rich Content.

Assets: `Enjoy Mug - Blue.jpg` and `Enjoy Mug - White.jpg`, downloaded from `https://www.plytix.com/hubfs/Kitchen%20and%20Home%20Products/Enjoy%20Mug%20-%20Blue.jpg` and `…/Enjoy%20Mug%20-%20White.jpg` (both verified live 2026-10-22); alt text "Adventure mug in blue" / "Adventure mug in white". Rename example: `adventure-mug-blue.jpg`.

Asset categories: Packshots (with subcategory Studio Shots), Marketing Material, Specifications. Rename example: Product Packshots.

Asset lists: Marketing logos (Static), Mug Images (Smart, `filename` like `mug`), Sinks (Static), Kettle Images (Smart, `filename` like `kettle`), JPG Images, Press Kit, Missing Alt Text. Rename example: Kettle Photos.

Relationships: Gift basket (`gift_basket`), Recommended products (`recommended_products`), Gift pack (`gift_pack`). Rename example: Gift pack to Gift box.

## Rules

- IDs are fake 24-character hex strings (`6a1f0c2e9b3d4a5f8c7e1a01` style in V3).
- Keep error messages exactly as the API returns them; only the IDs or names they quote change.
- Keep values that the example demonstrates (an invalid date, an over-long label, a type mismatch). Rename the surrounding data, not the point of the example.
- A SKU with spaces (`Black Kettle`) must be URL-encoded in query strings and paths: `sku=Black%20Kettle`.
