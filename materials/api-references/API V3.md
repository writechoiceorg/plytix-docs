

[**Color codes**](#heading)

[**Reserved words**](#heading-1)

[Forbidden field or entity names](#forbidden-field-or-entity-names)

[**Grouping Operators**](#grouping-operators)

[Functions](#heading-2)

[**Filters**](#filters)

[**Related entities filtering transversal**](#heading-3)

[**Returned first level fields**](#returned-first-level-fields)

[Returned multilevel fields](#returned-multilevel-fields)

[**Related entities data expansion**](#related-entities-data-expansion)

[**Pagination**](#pagination)

[**URL S STANDARDIZATION**](#url-s-standardization)

[**Response Conventions for Entity Modification Endpoints**](#response-conventions-for-entity-modification-endpoints)

[General](#general)

[PUT](#put)

[PATCH](#patch)

[**ANEXO**](#anexo)

[**PROCESS MANAGER API**](#process-manager-api)

[**URL S STANDARDIZATION**](#url-s-standardization-1)

## 

| Color codes |  |  |  |
| ----- | :---: | :---: | :---: |
| Approved direct option | Approved alternative | Rejected | Postponed |

| Reserved words |  |  |  |  |  |
| ----- | ----- | :---: | ----- | :---: | ----- |
| Starting with \_ |  | Starting with a . |  | Starting with \_\_ |  |

| Forbidden field or entity names |  |  |  |  |  |
| :---- | ----- | ----- | ----- | ----- | ----- |
| **Starting with \_** (the only exception are attribute names, because there is no API endpoint that goes directly to that entity, and therefore, it always has the entity name first, being unambiguous. Ie. `attributes._<attribute_name>`) |  |  |  |  |  |
| **Containing a .** |  |  |  |  |  |
| **Containing a \[** |  |  |  |  |  |
| **Containing a |** |  |  |  |  |  |

| Grouping Operators |  |  |
| ----- | ----- | ----- |
| Logic | V1/2 | V3 |
| \<filter1\> AND \<filter2\> | "filters": {   \[\[\<filter1\>, \<filter2\>\]\] } | **\<filter1\>&\<filter2\>** |
|  |  | \_top\_logic=and&\<filter1\>&\<filter2\> |
|  |  | \_top\_logic=and&\[0\]\<filter1\>&\[0\]\<filter2\> |
|  |  | \_and\[0\]\<filter1\>&\_and\[0\]\<filter2\> |
| \<filter1\> OR \<filter2\> | "filters": {   \[\<filter1\>, \<filter2\>\] } | \_top\_logic=or&\<filter1\>&\<filter2\> |
|  |  | \_top\_logic=or&\[\#\]\<filter1\>&\[\#\]\<filter2\> |
|  |  | **\_or\[\#\]\<filter1\>&\_or\[\#\]\<filter2\>** |
| (\<filter1\> OR \<filter2\>)AND(\<filter3\> OR \<filter4\>) | Not possible | \[0\]\[logic\]=or&\[1\]\[logic\]=or& \[0\]\<filter1\>&\[0\]\<filter2\>& \[2\]\<filter3\>&\[0\]\<filter4\> |
|  |  | **\_or\[0\]\<filter1\>&\_or\[0\]\<filter2\>& \_or\[1\]\<filter3\>&\_or\[1\]\<filter4\>** |
|  |  | \_and\[0\]\_or\[0\]\<filter1\>&\_and\[0\]\_or\[0\]\<filter2\>& \_and\[0\]\_or\[1\]\<filter3\>&\_and\[0\]\_or\[1\]\<filter4\> |
| (\<filter1\> AND \<filter2\>)OR(\<filter3\> AND \<filter4\>) | "filters": {   \[\[\<filter1\>, \<filter2\>\],    \[\<filter3\>, \<filter4\>\]\] } | \_top\_logic=or& \[0\]\[logic\]=and&\[1\]\[logic\]=and& \[0\]\<filter1\>&\[0\]\<filter2\>& \[2\]\<filter3\>&\[0\]\<filter4\> |
|  |  | \_top\_logic=or&\[0\] \_and\[0\]\<filter1\>&\_and\[0\]\<filter2\>& \_and\[1\]\<filter3\>&\_and\[1\]\<filter4\> |
|  |  | **\_or\[0\]\_and\[0\]\<filter1\>&\_or\[0\]\_and\[0\]\<filter2\>& \_or\[0\]\_and\[1\]\<filter3\>&\_or\[0\]\_and\[1\]\<filter4\>** |
| NOT (\<filter1\> \<bool\> \<filter2\>) | Not possible | \_not\[0\]\<bool\>\[0\]\<filter1\>&\_not\[0\]\<bool\>\[0\]\<filter2\> |
|  |  | **\<\!bool\>\[0\]\<filter1\>&\<\!bool\>\[0\]\<filter2\>eg: \_\!or\[0\]\<filter1\>&\_\!or\[0\]\<filter2\>** |
| SELECT     …FROM     t1 LEFT JOIN     t2 ON         t1.t2\_fk \= t2.id AND         \<t2\_filter\>WHERE     t2.id IS NULL  AND EXISTS (SELECT \* FROM T2 WHERE ) | Not actual generic equivalent, although somewhat present in the relationship\_filters | **\_\!exists\[\#\]\<t2\_filter\> Por public APIs, this must be heavily restricted. For the public PIM API V3.0, it will only be allowed for relationships.id or relationships.label and without being grouped with \_and or \_or** |
| SELECT     …FROM     t1 LEFT JOIN     t2 ON         t1.id \= t2.t1\_fk AND         \<t2\_filter\>WHERE     t2.id IS NULL |  |  |
|  | (3 level nesting) Not possible | Allowed, although it is advisable to study where to limit the depth for each API |

| Functions |  |  |  |  |  |
| :---- | ----- | ----- | :---- | ----- | ----- |
|  |  |  |  |  |  |
| General pattern (\<field\>\[\<function\>\] The 1st arg is the value of the field) (\<entity\_x:n\>\[\<function\>\] The 1st arg is a list) (\<entity\_x:1\>\[\<function\>\] The 1st arg is an instance of the entity) (\<entity\_x:n\_ending\_in\_.\>\[\<function\>\] The 1st arg is an instance of the entity) |  |  | **\<field or entity\>\[\<function\>:\<\*arg1\>:\<\*...\>:\<\*argn\>\]\[\<filter\>\]=\<value\>** (args are literals. If we want references to other fields or entities, it must be in a V3.\<gt\_0\>) |  |  |
| String or Array/List length |  |  | **\<field or entity\_x:n\>\[length\]\[\<filter\>\]=\<value\>**  Eg. countries\[length\]\[gt\]=1 Eg. description\[length\]\[lte\]=256 Eg. related\_products\[length\]\[eq\]=0 |  |  |
| Full days passed from the field’s date to the current date. (Since the date fields are considered to be UTC, the current date is the UTC one too, unless a tz database code) |  |  | **\<field\>\[days\_passed:\<\*tz\_database\_name\>\]\[\<filter\>\]**  Eg. creation\_date\[days\_passed\]\[gt\]=7  (UTC is inferred) Eg. last\_update\[days\_passed:Europe/Madrid\]\[lt\]=1 |  |  |
| Custom filters (can be injected in each API) |  |  | Eg. .\[last\_updated\_by\]\[eq\]=admin Eg. related\_products.\[last\_updated\_by\]\[eq\]=admin Eg. country\_code\[continent\]=africa |  |  |

| Filters |  |  |
| ----- | ----- | ----- |
| Filters only apply to fields |  |  |
|  | Current | Possible Alternative |
| Field \= ‘value’ | {"operator": "eq", "field": "field",  "value": "value"} | **field=value(alt) field\[eq\]=value** |
| (Universal Group \- equality filter) field \<\> ‘value’ OR field IS NULL OR NOT EXISTS(field) | {"operator": "\!eq", "field": "field",  "value": "value"} | field\[not\]=value |
|  |  | \_not\[0\]field=value |
|  |  | field\[\!\!eq\]=value |
|  |  | field\[\~eq\]=value |
|  |  | (If the field is undefinable) \_or\[\#\]field\[\!eq\]=value&\_or\[\#\]field\[\!exists\] (If the field is nullable) \_or\[\#\]field\[\!eq\]=value&\_or\[\#\]field\[\!null\] (If the field is undefinable and nullable) \_or\[\#\]field\[\!eq\]=value&\_or\[\#\]field\[\!exists\]&\_or\[\#\]field\[\!null\] |
| (“not equal” among the elements with value) field \<\> ‘value’ | \[\[   {     "operator": "\!eq",    "field": "field",     "value": "value"   }, {     "operator": "exists",    "field": "field",     "value": null   } \]\] | **field\[\!eq\]=value** |
|  |  | field\[\!\!eq\]=value |
|  |  | field\[\~eq\]=value |
|  |  | (If the field is undefinable) field\[\!eq\]=value\&field\[exists\] (If the field is nullable) field\[\!eq\]=value\&field\[\!null\] (If the field is undefinable and nullable) field\[\!eq\]=value\&field\[exists\]\&field\[\!null\] |
| Field is not null | Not possible | **field\[\!null\]** |
| Field is null | Not possible | **field\[null\]** |
| Field \= ‘’ OR Field \= \[\] | Not possible | field\[len\]=0 |
| NOT (Field \= ‘’ OR Field \= \[\]) AND EXISTS(Field) |  | field\[len\]\[gt\]=0 |
| IS UNDEFINED(field not exists) | {"operator": "\!exists", "field": "field",  "value": null} | **field\[\!exists\]** |
| IS NOT UNDEFINED | {"operator": "exists", "field": "field",  "value": null} | **field\[exists\]** |
| Field like ‘%value%’ (IGNORE CASE) | {"operator": "like", "field": "field",  "value": value} | **field\[icontains\]=value** |
|  |  | **field\[contains:ignorecase\]=value** |
| Field like ‘%value%’ (CASE SENSITIVE) | Not possible | **field\[contains\]=value** |
| With ARRAYs:ARRAY\[field\] && ARRAY\[\<value1\>, \<value2\>\] With jsonb arrays: '\["a", "b", "c"\]'::jsonb ?& array\['a', 'b'\] | {"operator": "in", "field": "\<multiselect\_field\>",  "value": \["value1", "value2"\]} | **field\[intersects\]=value field\[\!intersects\]=value** |
| Field in (‘value1’, ‘value2’) | {"operator": "in", "field": "field",  "value": \["value1", "value2"\]} | **field\[in\]=value1\&field\[in\]=value2** |
|  |  | \_or\[\#\]field=value1&\_or\[\#\]field=value2 |
| Field not in (‘value1’, ‘value2’) OR field IS NULL  | {"operator": "\!in", "field": "field",  "value": \["value1", "value2"\]} | (If the field is undefinable) \_or\[\#\]field\[\!in\]=value1&\_or\[\#\]field\[\!in\]=value2&\_or\[\#\]field\[\!exists\] (If the field is nullable) \_or\[\#\]field\[\!in\]=value1&\_or\[\#\]field\[\!in\]=value2&\_or\[\#\]field\[\!null\] (If the field is undefinable and nullable) \_or\[\#\]field\[\!in\]=value1&\_or\[\#\]field\[\!in\]=value2&\_or\[\#\]field\[\!exists\]&\_or\[\#\]field\[\!null\] |
|  |  | field\[\!in\]=value1\&field\[\!in\]=value2 |
| Field not in (‘value1’, ‘value2’) | \[\[   {     "operator": "\!in",    "field": "field",     "value": \["value1", "value2"\]},   {     "operator": "exists",    "field": "field",     "value": null   } \]\] | **field\[\!in\]=value1\&field\[\!in\]=value2**   |
| Field \> \# | {"operator": "gt", "field": "field",  "value": \#} | **field\[gt\]=\#** |
| Field \>= \# | {"operator": "gte", "field": "field",  "value": \#} | **field\[gte\]=\#** |
| Field \< \# | {"operator": "lt", "field": "field",  "value": \#} | **field\[lt\]=\#** |
| Field \<= \# | {"operator": "lte", "field": "field",  "value": \#} | **field\[lte\]=\#** |
| Generic Length Comparison LEN(field) \<\# comparison\> \= value |  | \<field\>\[length\]\[\<eq|\!eq|lt|lte|gt|gte\>\]=\<value\> |
| LEN(field) \= \# |  | field\[len\_eq\]=\# |
| NOT(LEN(field) \= \#) |  | field\[\!len\_eq\]=\# |
| EXISTS(field) AND field IS NOT NULL AND LEN(field) \<\> \# |  | \_or\[0\]field\[len\_lt\]=\#&\_or\[0\]field\[len\_gt\]=\# |
|  |  | field\[exists\]\&field\[\!len\_eq\]=\# |
| LEN(field) \> \# |  | field\[len\_gt\]=\# |
| LEN(field) \>= \# |  | field\[len\_gte\]=\# |
| LEN(field) \< \# |  | field\[len\_lt\]=\# |
| LEN(field) \<= \# |  | field\[len\_lte\]=\# |
| Field1 like ‘%value%’ or Field2 like ‘%value%’ (IGNORE CASE) | {"operator": "text\_search", "field": \["field1", "field2"\],  "value": "value"} | \_or\[\#\]field1\[icontains\]=value& \_or\[\#\]field2\[icontains\]=value |
| field BETWEEN \#1 AND \#2 | {"operator": "bte", "field": "field",  "value": \[\#1, \#2\]} | field\[from\]=\#1\&field\[to\]=\#2 |
|  |  | field\[between\_from\]=\#1\&field\[between\_to\]=\#2 |
|  |  | field\[between\]=\#1\&field\[between\]=\#2 |
|  |  | field\[gte\]=\#1\&field\[lte\]=\#2 |
| Generic Days passed Comparison UTCDATE(Field) \<\# comparison\> (UTCDATE(NOW(timezone)) \- DAYS(\#)) | Not PossibleOnly allowed for “\<=” in UTC:{"operator": "last\_days", "field": "field",  "value": \#} | \<field\>\[\<days\_passed\_function\>\]\[\<eq|\!eq|lt|lte|gt|gte\>\]=\<value\> |
| UTCDATE(Field) \= (UTCDATE(NOW(timezone)) \- DAYS(\#)) | Not Possible | field\[days\_past\_eq\]=\#-\<tz\> (alt) field\[days\_past\]=\#-\<tz\> (Note: field\[days\_past\]=\# \== field\[days\_past\]=\#-UTC) |
|  |  | field\[days\_passed:\<tz\>\]\[eq\]=\# (alt) field\[days\_passed:\<tz\>\]=\#(Note: field\[days\_passed\]=\# \== field\[days\_passed:UTC\]=\#) |
| field IS NULL OR UTCDATE(field) \<\> (UTCDATE(NOW(timezone)) \- DAYS(\#)) | Not Possible | field\[\!days\_past\_eq\]=\#-\<tz\> |
| UTCDATE(Field) \< (UTCDATE(NOW(timezone)) \- DAYS(\#)) | Not Possible | field\[\!days\_past\_lt\]=\#-\<tz\> |
| UTCDATE(Field) \<= (UTCDATE(NOW(timezone)) \- DAYS(\#)) | Only possible for UTC {"operator": "last\_days", "field": "field",  "value": \#} | field\[since\_x\_days\_ago\]=\# |
|  |  | field\[days\_past\_lte\]=\#-\<tz\> |
| UTCDATE(Field) \> (UTCDATE(NOW(timezone)) \- DAYS(\#)) | Not Possible | field\[\!days\_past\_gt\]=7 |
| UTCDATE(Field) \>= (UTCDATE(NOW(timezone)) \- DAYS(\#)) | Not Possible | field\[days\_past\_gte\]=\# |

| Related entities filtering transversal |  |  |
| ----- | ----- | ----- |
|  | Current | Possible Alternative |
| Basic entity transversal | Not possible | **related-entity.attribute\[\<filter\>\]=value (x:m related entities are named “\<singular\_entity\_name\>\_set”)** |
|  |  | related-entity\_\_attribute\[\<filter\>\]=value |
| Custom attributes | {"operator": "\<filter\>", "field": "attributes.name",  "value": "value"} | **attributes.name\[\<filter\>\]=value** |
|  |  | attributes.label=name\&attributes.value=value (usually requires boolean grouping) |
| Product relationships | "relationship\_filters":\[\[{     "product\_ids":\[{         "id": "\<product\_id\>",         "qty\_operator": "\<op2\>",         "value": \#     }\],     "relationship\_id": "\<relationship\_id\>",     "operator": "\<op1\>" }\]\], | **product\_relationships.relationship\_id=\<relationship\_id\>&product\_relationships.related\_product\_id=\<product\_id\>& product\_relationships.related\_product.quantity\[\<op2\>\]=\#** |
|  | Eg1 \[\[{     "relationship\_id":"5d89c6c696c8f4a322df4bbc",     "operator":"exists",     "product\_ids":\[\], }\]\] | **Eg1product\_relationships.relationship\_id=5d89c6c696c8f4a322df4bbc** |
|  | Eg2 \[\[{     "relationship\_id":"5d89c6c696c8f4a322df4bbc",     "operator":"\!exists",     "product\_ids":\[\] }\]\] | Eg2 **\_\!exists\[0\]product\_relationships.relationship\_id=5d89c6c696c8f4a322df4bbc For the public PIM API V3.0, it will only be allowed for relationships.id or relationships.label and without being grouped with \_and or \_or** |
|  |  | relationships\[have\]id=5d89c6c696c8f4a322df4bbc relationships\[have\]label\[\!eq\]=’pack’ relationships.id\[have\]5d89c6c696c8f4a322df4bbc |
|  |  | \_alias\[relationships\]=alias& .alias.id=5d89c6c696c8f4a322df4bbc& .alias\[len\]=0 |
|  |  | \_fields=relationships.id& relationships\[\!contains\]={"id": "5d89c6c696c8f4a322df4bbc"} |
|  |  | relationships\[contains\_kv:label:pack\]\[eq\]=false |
|  | Eg3 \[\[{     "product\_ids":\[{         "id":"5d89c68596c8f4a322df4bb9",         "qty\_operator":"exists",         "value":null}\],     "relationship\_id": "5d89c6c696c8f4a322df4bbc",     "operator":"exists" }\]\] | **product\_relationships.relationship\_id=5d89c6c696c8f4a322df4bbc& product\_relationships.related\_product\_id=5d89c68596c8f4a322df4bb9** |
|  | Eg4 \[\[{     "product\_ids": \[{         "id": "5d89c67796c8f4a322df4bb8",         "qty\_operator": "gt",         "value": \[2\]}\],     "relationship\_id": "5d89c6c696c8f4a322df4bbc",     "operator": "exists" }\]\] | **product\_relationships.relationship\_id=5d89c6c696c8f4a322df4bbc& product\_relationships.related\_product\_id=5d89c67796c8f4a322df4bb8& product\_relationships.related\_products.quantity\[gt\]=2  product\_relationships Id\_product | Id\_relation  | linked\_to | quantity (Ambiguous: The link could belong to a different relationship) relationships.label=packed\_together& relationships.links.product\_id=5d89c67796c8f4a322df4bb8& relationships.links.quantity\[gt\]=2 Aliases might solve this** |
|  | Eg5 \[\[{     "product\_ids": \[{         "id": "5d89c67796c8f4a322df4bb8",         "qty\_operator": "bte",         "value": \[1, 2\]}\],     "relationship\_id": "5d89c6c696c8f4a322df4bbc",         "operator": "exists" }\]\] | **product\_relationships.relationship\_id=5d89c6c696c8f4a322df4bbc& product\_relationships.related\_product\_id=5d89c67796c8f4a322df4bb8& product\_relationships.relrelated\_products.quantity\[lte\]=2& product\_relationships.relrelated\_products.quantity\[gte\]=1  (Ambiguous: The link could belong to a different relationship) relationships.id=5d89c6c696c8f4a322df4bbc& relationships.links.id=5d89c67796c8f4a322df4bb8& relationships.links.quantity\[gte\]=1& relationships.links.quantity\[lte\]=2 Aliases might solve this** |

| Returned first level fields |  |  |
| ----- | ----- | ----- |
|  | Current | Possible Alternative |
| Selected ones | {     "attributes": \[\] } | **\_fields=\<field1\>&\_fields\<field2\> (Optional)** |
|  |  | \_return=\<field1\>&\_return\<field2\> (Mandatory) |
| All | Not possible, they have to be enumerated | **Default behaviour** |
|  |  | \_return=\* |
|  |  | \_return=\_all |

| Returned multilevel fields |  |  |
| ----- | ----- | ----- |
|  | Current | Possible Alternative |
| Selected ones | {     "attributes": \[\] }  | \_**fields=\<expansion1\>.\<field1\>& \[\*...\]&\_fields=\<expansion1\>.\<fieldn\>& \[\*...\]&\_fields=\<expansionn\>.\<field1\>& \[\*...\]&\_fields=\<expansionn\>.\<fieldn\> If the \<field\> is \*, then all fields are returned (default behaviour for “.”)** |
|  |  | \_return=\<expansion1\>.\<field1\>& \[\*...\]&\_return=\<expansion1\>.\<fieldn\>& \[\*...\]&\_return=\<expansionn\>.\<field1\>& \[\*...\]&\_return=\<expansionn\>.\<fieldn\> Required, or the expansion won’t work |
| All | Not possible when filtering, they have to be enumerated. Default behaviour on get by id. | \_expand=entity  |
|  |  | \_fields=\<entity\>.\* |

| Related entities data expansion |  |  |
| ----- | ----- | ----- |
|  | Current | Possible Alternative |
| pansionExpand all | {     "attributes": \[\] }  | Default behaviour  \_expand=\<m:m\_relationship\>&\_expand=\<m:1\_relationship\>&\_expand=\<1:1\_relationship\>& \_expand=\<relationship\_l1\>.\<relationship\_l2\> |
|  |  | **\_include\_unfiltered\_entities=\<subentity\> (one per subentity)** (required if we want \_field=\<relationship\> to return that field for all elements even unfiltered ones) |
| Expand filtered | Not possible | **default behaviour using \_field=\<subentities\>.\<field\>** |
|  |  | \_expand\_filtered=\<relationship\> (Alternative when there are already other filters on the same relationship that are only intended to indicate what 1st level entity results are retrieved) \_alias\[\<relationship\>\]=\<alias\>& \_expand=.\<alias\>& .\<alias\>.\<field\>\[\<filter\>\]=\<value\>**Not discarded but it is excluded for 3.0 version** relationships.label=pack& \_expand=relationships relationships.label=pack& \_alias\[relationships\]=alias& \_field=.alias.links.quantity& .alias.label\[len\]\[gt\]=10  |

| Pagination |  |
| ----- | ----- |
| Current | Possible Alternative |
| "pagination": {   "page": \#,   "page\_size": \#,  "order": "field" } | **\_page=\#&\_page\_size=\#&\_sort\_by=\<field\>&\_filtered\_count=\<bool\>&\_total\_count=\<bool\>** |
|  | \_offset=\#&\_limit=\#&\_sort\_by=\<field\> |
|  | Inspired by the Stripe API V1. Use a `cursor` value returned by the last call to the list endpoint. \_from\_cursor=\<cursor\>&\_limit=\# \_until\_cursor=\<cursor\>&\_limit=\# |
|  | Inspired by the Stripe API V2. Use a next\_page\_url and/or previous\_page\_url returned by the last call to the list endpoint. |

# URL S STANDARDIZATION

|  | V1 |  | V3 |  |  |
| :---- | :---- | :---- | :---- | :---- | ----- |
| Action | HTTP VERB | PATH | HTTP VERB | PATH | Notes |
| Search | POST | api/v1/\<entities\>/search | GET | **api/v3/\<plural\_entity\_name\>\[?\<search\_query\>\] No `search_query` means "get all", unless there is an HTTP payload indicating its own filters** | Response: 200 {   "data": \[     \*\<json\_object\_1\>,    \*...,    \*\<json\_object\_n\>  \],  "pagination": {     \*"next\_page": \<url\>,     \*"previous\_page": \<url\>,     \*"filtered\_count": \#,     \*"total\_count": \#   } } 4xx/5xx {   "error": {     "name": "\<name\>",     "description": "\<description\>"   } } |
| Get one entity instance | GET | api/v1/\<entity\>/:id | GET | **api/v3/\<plural\_entity\_name\>/\<identifier\>?\<\*expansions\>\*&\<fields\_selection\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>?\<\*expansions\>\*&\<fields\_selection\> \<subentities\> \= (/\<subentity\>)+ \<subentity\> \= \<x:m related entity\>|\<x:1 related\_entity\> \<x:m related entity\> \= \<plural\_entity\_name\>/\<identifier\> \<x:1 related\_entity\> \= \<entity\_name\>** | Identifiers will usually be the primary key field of the entity. For some entities, the identifiers can be other fields. They require dto be fields that are unique for one account\<\>entity. Eg. For products, both id and sku  (correctly url-encoded) can be used as identifiers. |
| Create | POST | api/v1/\<entities\>/ | POST | **api/v3/\<plural\_entity\_name\>** | **“EMPTY” VALUES SUCH AS “” OR \[\] ARE STORED VERBATIMRETURN 201 { id: }** |
| Update all fields of one entity instance | PUT | api/v1/\<entity\>/:id | PUT | api/v3/\<plural\_entity\_name\>/\<identifier\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\> | On attributes, If one field is missing, it will be deleted. On any entity other than attributes, we must decide what a missing field means, or even if it is allowed in some cases. **“EMPTY” VALUES SUCH AS “” OR \[\] WONT MEAN DELETION** |
| Override selected fields of one entity instance | PATCH | api/v1/\<entity\>/:id | PATCH | **api/v3/\<plural\_entity\_name\>/\<identifier\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>** | **“EMPTY” VALUES SUCH AS “” OR \[\] ARE STORED VERBATIMRETURN 204 OK**  |
| Delete one entity instance |  |  | DELETE | **api/v3/\<plural\_entity\_name\>/\<identifier\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>** | **RETURN 204 OK**  |
| Get one entity instance field |  |  | GET | **api/v3/\<plural\_entity\_name\>/\<identifier\>/\<field\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>/\<field\>** |  |
| Create an entity instance field |  |  | POST | **api/v3/\<plural\_entity\_name\>/\<identifier\>/\<field\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>/\<field\>** | It will only work on attributes **“EMPTY” VALUES SUCH AS “” OR \[\] ARE STORED VERBATIM** |
| Override an entity instance field |  |  | PUT | api/v3/\<plural\_entity\_name\>/\<identifier\>/\<field\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>/\<field\> | **“EMPTY” VALUES SUCH AS “” OR \[\] WONT MEAN DELETION** |
| Delete an entity instance field |  |  | DELETE | **api/v3/\<plural\_entity\_name\>/\<identifier\>/\<field\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>/\<field\>** | It will only work on attributes |
| Advanced updates |  |  | PATCH | **api/v3/\<plural\_entity\_name\>/\<identifier\> api/v3/\<plural\_entity\_name\>/\<identifier\>\<subentities\>** | Indicated by adding the content type: application/json-patch+json[https://datatracker.ietf.org/doc/html/rfc6901](https://datatracker.ietf.org/doc/html/rfc6901) [https://datatracker.ietf.org/doc/html/rfc6902](https://datatracker.ietf.org/doc/html/rfc6902) |
| 1:M Link a new entity instance  | POST | link endpoints | POST | **api/v3/\<plural\_entity\_name\>/\<identifier\>/\<plural\_related\_entity\_name\>** | {  "id": \<related\_entity\_id\>,  \[\<M:M stuff\>\]} |
| 1:M get aLink a new entity instance  | GET | Get link entity | GET | **api/v3/\<plural\_entity\_name\>/\<identifier\>/\<plural\_related\_entity\_name\>/\<linked\_id\>** |  |
| 1:M Edit a Relationship entity instance | PATCH | link endpoints | PATCH | **api/v3/\<plural\_entity\_name\>/\<identifier\>/\<plural\_related\_entity\_name\>/\<linked\_id\>** | {  "id": \<related\_entity\_id\>,  \[\<M:M stuff\>\]} |
| 1:M Unlink a new entity instance  | POST | unlink endpoints | DELETE | **api/v3/\<plural\_entity\_name\>/\<identifier\>/\<plural\_related\_entity\_name\>/\<linked\_id\>** | It deletes all the coincidences in the strange case of M:M relationships that allow repetitions. |
| Bulk additions |  |  | POST | **api/v3/-bulk/\<plural\_entity\_name\> api/v3/\<plural\_entity\_name/-/bulk  api/v3/-/bulk/\<plural\_entity\_name\>  List of items equal to the non bulk POST Payload:{   \*"webhook": \<url\>,  \*"external\_reference": \<str\>,  "data": \[{},{} ... {}\]}** | **Response: {   "bulk\_job\_id": \<id\> }** |
| Bulk edits (a filter and the same edit for all matches) |  |  | PATCH | **api/v3/-bulk/\<plural\_entity\_name\>/?\<search\_query\>api/v3/-/bulk/\<plural\_entity\_name\>/?\<search\_query\>Same payload as the non bulk PATCHPayload: {   \*"webhook": \<url\>,  \*"external\_reference": \<str\>,  "data": {"\<field\_1\>": \<value\_1\>, ...,  "\<field\_n\>": \<value\_n\>} }** | **“EMPTY” VALUES SUCH AS “” OR \[\] ARE STORED VERBATIM AND DON’T MEAN DELETION** |
| Bulk edits (different edit per entity instance) |  |  | PATCH | **api/v3/-bulk/\<plural\_entity\_name\>/api/v3/-/bulk/\<plural\_entity\_name\>/List of items equal to the non bulk PATCH plus the idPayload:  {   \*"webhook": \<url\>,  \*"external\_reference": \<str\>,  "data": \[{"id": \<id\_1\>, ...}, ..., {"id": \<id\_n\>, ...}\] }** | **“EMPTY” VALUES SUCH AS “” OR \[\] ARE STORED VERBATIM AND DON’T MEAN DELETION** |
| Bulk deletes by filter |  |  | DELETE | **api/v3/-bulk/\<plural\_entity\_name\>/?\<search\_query\>  api/v3/-/bulk/\<plural\_entity\_name\>/?\<search\_query\>   {   \*"webhook": \<url\>,  \*"external\_reference": \<str\> }** |  |
| Bulk deletes by individual items |  |  | DELETE | **api/v3/-bulk/\<plural\_entity\_name\>/ api/v3/-/bulk/\<plural\_entity\_name\>/ Payload:  {   \*"webhook": \<url\>,  \*"external\_reference": \<str\>,  "data": \[id, id, id\] }** |  |
| Advanced bulk updates |  |  | PATCH | **api/v3/-/bulk/-/edit/\<plural\_entity\_name\>/?\<search\_query\> The payload format is the same one of the advanced updates** |  |
| Bulk Individual updates |  |  | POST | **api/v3/-/bulk/-/edit The payload contains a list of individual actions (deletions, creations and updates) {   \*"webhook": \<url\>,  \*"external\_reference": \<str\>,  "data": \[{ "entity: ‘products", "action": "PATCH|DELETE|POST", data: { individual-object }}\] } The result, except for performance, is equivalent to individually calling the other update endpoints one by one.** |  |
| Bulks: check job |  |  | GET | **api/v3/-bulk/-jobs/\<bulk\_job\_id\>  api/v3/-/bulk/-/jobs/\<bulk\_job\_id\>** | **Response: {   "state": \<str\>,   "webhook": \<url|none\>,   "external\_reference": \<str|none\>,   "created": \<datetime\>,   "updated": \<datetime\>,   "data": \<object|none\> }** |
| Bulks: search job |  |  | GET | **api/v3/-bulk/-jobs/?\<search\_query\>  api/v3/-/bulk/-/jobs/?\<search\_query\> queryable attributes: external\_reference \<str\> state \<str\>** |  |
| Bulks: transition job |  |  | POST | **api/v3/-/bulk/-/jobs/\<bulk\_job\_id\>/\<cancel|pause|resume|retry\> api/v3/-/bulk/-/jobs/\<bulk\_job\_id\>/-/\<cancel|pause|resume|retry\>** |  |
| Ad-Hoc async action (eg. Shopify export) |  |  | POST | **api/v3/-\<action-name\>/  api/v3/-/\<action-name\>/ {   \*"webhook": \<url\>,  \*"external\_reference": \<str\>,  "data": "\<whatever\>" }** eg. api/v3/-/shopify-export/ | **Response: {   "action-name\_job\_id": \<id\> }**  eg. {   "shopify-export\_job\_id": \<id\> } |
| Ad-Hoc async action: check job |  |  | GET | **api/v3/-\<action-name\>/-jobs/\<action-name\_job\_id\>  api/v3/-/\<action-name\>/-/jobs/\<action-name\_job\_id\>**  | **Response: {   "state": \<str\>,   "webhook": \<url|none\>,   "external\_reference": \<str|none\>,   "created": \<datetime\>,   "updated": \<datetime\>,   "data": \<object|none\> }** |
| Ad-Hoc async action: search jobs |  |  | GET | **GET api/v3/-\<action-name\>/-jobs/?\<search\_query\>  GET api/v3/-/\<action-name\>/-/jobs/?\<search\_query\> queryable attributes: external\_reference \<str\>** |  |
| Ad-Hoc async action:  transition job |  |  | POST | **api/v3/-/bulk/-/\<action-name\>/\<action-name\_job\_id\>/\<cancel|pause|resume|retry\> api/v3/-/\<action-name\>/-/jobs/\<action-name\_job\_id\>/-/\<cancel|pause|resume|retry\>** |  |
| Check a job |  |  | GET | **GET api/v3/-jobs/\<job\_id\>** | **Response: {   "state": \<str\>,   "webhook": \<url|none\>,   "external\_reference": \<str|none\>,   "created": \<datetime\>,   "updated": \<datetime\>,   "data": \<object|none\> } add a type?** |
| List jobs |  |  | GET | **api/v3/-jobs/?\<search\_query\> queryable attributes: external\_reference \<str\>**  | **Regardless of the filter, it must ONLY return jobs that have been triggered by the API** |
| Edit jobs |  |  | PATCH | api/v3/-api-jobs/\<job\_id\> {   \*"status": \<status\>,   \*"webhook": \<url\>,   \*"external\_reference": \<str\> } | To maybe pause, stop, resume jobs |

200 OK → SYNC   
201 OK → SYNC  → ID  
**202** JOB \-\> ASYNC

## Response Conventions for Entity Modification Endpoints

### General

For the definition of the new API, the following conventions will apply:

* **POST** requests for creating entities, **PUT** requests for updating entities, and **PATCH** requests will **not** return the modified entity in the response.

* Instead:

  * A **201 Created** status will be returned if the creation or modification has been successfully completed.  
    [201 Created](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201)  
    The request succeeded, and a new resource was created as a result. This is typically the response sent after [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST) requests, or some [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT) requests.

  * A **202 Accepted** status will be returned if the request has been accepted but the processing is still ongoing.  
    [202 Accepted](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202)  
    The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.

* In the case of **201 Created**, the response body will include the **ID of the created or modified entity**.

* In the case of **202 Accepted**, the response body will include a **process\_id** that can be used to track the status of the ongoing operation.

### PUT

It is important to carefully evaluate the use of **PUT** operations, as they can introduce several issues. Specifically, PUT requests typically replace the entire resource, which can lead to unintended data overwrites, increased complexity in handling partial updates, and potential inconsistencies in concurrent environments.

### PATCH

Instead, the recommended approach is to use **PATCH** requests, where only the intended changes are explicitly specified. This method provides more precise control over updates, reduces the risk of accidental data loss, and simplifies concurrency management. Adopting PATCH as the standard for modifications ensures a safer and more maintainable API design.

## ANEXO

| Carácter | Significado en URL |
| ----- | ----- |
| \= | separa clave/valor |
| & | separa parámetros |
| ? | inicia la query |
| \# | inicia fragmento |
| \+ | puede interpretarse como espacio |
| , | a veces reservado por proxies antiguos |
| \< \> | no válidos en URL (se deben escapar) |
| " | pueden romper encoding |
| % | indica secuencia de escape |
| ( ) | válidos pero deberían codificarse según RFC 3986 |
| (espacio) | se convierte en \+ o %20 |

---

# PROCESS MANAGER API

## URL S STANDARDIZATION

|  | V3 |  |  |
| :---- | :---- | :---- | :---- |
| Action | HTTP VERB | PATH | Notes |
| Search, get, patch, post, delete | ALL | **ALL CRUD OPERATIONS EXPOSED WITH API V3** | For processes, we won’t let PATCHes for their `status`es (process transitions will be handled in ad-hoc endpoints) |
|  | POST | **/api/vx/\<to\_be\_decided\>/** | INPUT PAYLOAD: {     "external\_id": \<optional\>,    "webhook": \<optional\>,     “payload”: {           process\_type:          …          input\_data:  } RESPONSE: {     " } |

