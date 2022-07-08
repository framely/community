# Postgrest

[[toc]]


## Overview
Framely also supports the backend component in form of [postgrest provider](/guide/glossary.md#postgrest-provider). The backend component can be declaratively defined in two steps: first create database tables needed by service by adding storage annotation to frames, second provide function implementation using SQL to express business logic. Using backoffice annotation, you can specify the operation team can access these tables via [back office](/guide/glossary.md#backoffice).

There are a couple advantage of using backend component approach to build service provider. 
1. In addition to declaratively building database as content management system, Framely backend component allow you to implement the service declaratively too using SQL. This make it possible for the business analyst to build backend.
2. Since table are created based on the data type in the API schema, so no explicit conversion code are needed, rows in the table or view in the database are automatically converted into object in the Framely.
![frame-table](/images/annotation/providerannotation/frame-table.png)
3. The admin interface or backoffice can also be automatically created based on annotation so that operation team can use backoffice to provide service. 
4. Backoffice components can be reused by cloning for Framely hosted solution.

#### Features
Provider annotations include [storage annotations](./overview.md#storage-annotations) and [back office annotations](./overview.md#backoffice-annotations).
- Storage annotations define the database schema needed by the backend component, which can then be used to create the database for provider.
  - Column information for table
  - Set a default value of a column
  - Set not-null constraints
  - Set unique constraints
- Back office annotations are used to define the user experience of the back office for the backend.
  - Upload a picture to a cell, and it will be stored as a URL
  - Select a value from a dropdown list

#### How To Use
Before starting, turn on **Storage Enabled** in **Frames** field to enable storing frames as tables in the database. There are two levels of provider annotations: slot level and frame level.
- At a slot level, you can configure the column properties and back office annotations in the **Schema**  - **Slots** field.
- At a frame level, you can configure table constraints in the **Annotation** field.

![provider-annotation](/images/annotation/providerannotation/provider-annotation.png)


## SQL Data Type
To create tables to store the frame instance, we need to map each slot of frame to a column in the database. SQL data type is a slot annotation, it defines the SQL data type for corresponding column for the given slot. Normally, we will automatically decide the SQL data type for each slot. But if the slot type is *kotlin.String* or customized entity(e.g. like *Demo.test.City* in the below picture), you need to specify the database type of the column. 

Supported formats are `char(n)`, `varchar(n)`, `text`. Replace "n" with a number between 1 and 10485760, e.g. `char(16)`. To learn more about Character Types, click [here](https://www.postgresql.org/docs/current/datatype-character.html).

![sql-data-type](/images/annotation/providerannotation/sql-data-type.png)

## Default Value
Default value is a slot annotation. You can use a constant or an expression as a default value. When there is no value specified in the column, the column will be filled with its default value.

![default-value](/images/annotation/providerannotation/default-value.png)

For example, if the type of slot is *java.time.LocalDate*, you can set its default value as `'2022-6-15'` or `now()::date`. For details about default value in official documentation, click [here](https://www.postgresql.org/docs/current/ddl-default.html).

## Allow Null
::: right
![allow-null](/images/annotation/providerannotation/allow-null.png)
:::

Allow null is a slot annotation that is turned on by default. Allow null is a column constraint and it means the column can be null. If you turn off allow null, it indicates that the column can't be null. To learn more about it, see [Not-Null Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6).

## Unique
Unique is a frame annotation. If there is only one slot in a group of unique constraints, unique constraints ensure the data contained in the corresponding column is unique among all the rows in the table. If not, unique constraints make sure that the combination of values in the indicated columns is unique across the table.

To add one group of unique constraints, in the **Annotation** field, click **Add** and select unique keys. If there are 3 columns which should be unique individually, be sure to add 3 groups of unique constraints.

![unique](/images/annotation/providerannotation/unique.png)

To learn more about it, see [Unique Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS).
::: tip Tips
For now, among table constraints, we only support unique constraints. If you need more table constraints, please let us know.
:::

## URL
When sending messages to users, compared to plain text, rich cards can carry more information, like pictures, titles, descriptions, etc. To add a picture to a rich card, you need the picture URL.

[Back office](../../guide/glossary.md#backoffice) supports uploading pictures and storing them as URLs. You can upload pictures in back office and get the picture URLs using PostgreSQL Function.

::: thumbnail
![process](/images/annotation/providerannotation/process.png)
Process of Getting Picuture URL
:::

::: right
![url](/images/annotation/providerannotation/url.png)
:::

To enable URL, select *kotlin.String* when choosing [Type](#type) and set data type as `text`. Once done, there will be a switch: URL. Turn on URL so that you can upload pictures in that column.

For example, there is a slot called *catPicture* in a storage-enabled frame, and URL is enabled in this slot. Here are the steps to uploading pictures in back office.

1. Go to back office, find the corresponding table, click **Create**.
2. Upload a picture in the column called *catPiture* and fill another column called catName.
3. Back to the page displaying the table, you can view the picture that you just uploaded.

![back-office](/images/annotation/providerannotation/back-office.png)

## Input Type
There are two input types: text and dropdown. By default, input type is text which means [operators](../../guide/glossary.md#operator-business) can type raw input directly. If you want to make it easy for operators to input legit and compatible value, you can switch input type to dropdown.

![dropdown](/images/annotation/providerannotation/dropdown.png)

Dropdown List is a JSON array, which should return a list of values that are at least legit and potentially compatible so that operator can pick the correct value. The content of dropdown list includes two columns (id, name): where name will be displayed, and id will be assigned as value.

For example, if a column is used to store a city, its dropdown List is like:

```json
[ { id: 'NY', name: 'NewYork' },
  { id: 'LA', name: 'Los Angeles' },]
```