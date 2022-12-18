# Postgrest

[[toc]]

## Overview

OpenCUI also supports the backend component in form of [postgrest provider](/guide/glossary.md#provider). The backend component can be declaratively defined in two steps: First, create database tables needed by service by adding storage annotation to frames, secondly, provide function implementation using SQL to express business logic. Using backoffice annotation, you can specify the operation team can access these tables via backoffice.

There are a couple advantage of using backend component approach to build service provider. 
1. In addition to declaratively building database as content management system, OpenCUI backend component allows you to implement the service declaratively too using SQL. This make it possible for the business analyst to build backend.
2. Since tables are created based on the data type in the API schema, so no explicit conversion code is needed, rows in the table or view in the database are automatically converted into an object in the OpenCUI.
3. The admin interface or backoffice can also be automatically created based on annotation so that the operation team can use backoffice to provide service. 
4. Backoffice components can be reused by cloning for OpenCUI hosted solution.

## Create Postgrest Provider

To create a postgrest provider: 
1. Go to one of your org, select **Provider** in left side menu, click **Create** on the right side.
   ::: thumbnail
   ![create provider](/images/provider/postgrest/create-provider.png)
   :::

2. In the Create popup window, complete the form for basic settings: 
   - Enter a label for your postgrest provider.
   - Select **Postgrest** in **Provider Type** field.
   - Select **OpenCUI-hosted** in **Deploy Mode** field as currently we only support hosted mode for postgrest provider. 
   - Specify a **Region** for your postgrest database.
   - Click **Save**.

   ::: thumbnail
   ![provider form](/images/provider/postgrest/provider-form.png)
   :::

## Declare Service Interface

When you are done with creation, you need to declare which service interface this postgrest provider implements. 

To declare the service interface, enter the service component you want to implement, click **Import** on right side of the second navigation bar. Then in the popup window, select your postgrest provider and **Save**.

::: thumbnail
![import component](/images/provider/postgrest/import-component.png)
:::

## Create Database Tables

With postgres provider, it is very convenient to create a database without the SQL `CREATE TABLE` statement. All you need to do is create frames or select existing frames (Local or Imported) and **enable Storage**. 

::: thumbnail
![enable storage](/images/provider/postgrest/enable-storage.png)
:::

A frame represents a table, and slots in this frame represent the table columns:
- Frame label specifies the names of the table.
- Slot label specifies the names of the columns of the table.
- Slot type specifies the type of data the column can hold.

::: thumbnail
![data management](/images/provider/postgrest/data-management.png)
:::

```sql
-- OpenCUI will create table by the rules you specify with the frame.
-- Then the SQL CREATE TABLE statement will be like this:

CREATE TABLE frame_label (
  slot_1 SlotType,
  slot_2 SlotType,
  slot_3 SlotType,
  ...
) ;
```

You can use **Storage Annotations** to declare constraints which are used to specify rules for the data in a table. This ensures the accuracy and reliability of the data in the table. Constraints can be column level or table level, therefore, storage annotations can be slot level or frame level. Slot level apply to a column, and frame level apply to the whole table.

If the table needs to be accessed by the operation team on the admin interface, you can also specify it through **Backoffice Annotations**. 

When the postgres provider **Deploy** button is triggered, OpenCUI platform will update the table structure in the corresponding hosted database. 

::: tip Need To Know
When creating a table in hosted database, OpenCUI will automatically add two columns, `ID` column and `create_at` column. So, normally, you don't need to add these two slots in a frame, but you can if you need to.
:::

### Data Type

Data types are a way to limit the kind of data that can be stored in a table: integer, character, date and time, binary, and so on. For sure, there will be some type conversion between OpenCUI platform and SQL date types. For an overview of the available data types: 

| OpenCUI Platform Type   | SQL Data Type Examples      |
|:------------------------|:----------------------------|
| kotlin.Boolean          | boolean                     |
| kotlin.Float            | double precision            |
| kotlin.Int              | bigint                      |
| kotlin.String           | text, char(n), varchar(n)   |
| java.time.LocalDate     | date                        |
| java.time.LocalDateTime | timestamp without time zone |
| java.time.LocalTime     | time without time zone      |
| java.time.Year          | bigint                      |
| java.time.YearMonth     | date                        | 

Types that are not specified in the table above will be considered as string types, including custom entity types. String types can be one of `text`, `char(n)` and `varchar(n)`, where `n` is a positive integer. For more information about such types in PostgreSQL, click [Character Types](https://www.postgresql.org/docs/current/datatype-character.html).

If the type conversion is deterministic, you don't need to worry about it, the SQL date type will be displayed automatically. Otherwise, you need to specify one.

::: thumbnail
![sql data type deterministic](/images/provider/postgrest/sql-data-type-deterministic.png)
*Type conversion is deterministic*

<br>

![sql data type](/images/provider/postgrest/sql-data-type.png)
*Need to specify data type*
:::

### Allow Null

By default, a column can hold NULL values. So the Allow Null toggle is enabled by default. To enforce a column to NOT accept NULL values, disable it. For more information about this constraint in PostgreSQL, see [Not-Null Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6).

::: thumbnail
![sql allow null](/images/provider/postgrest/sql-allow-null.png)
:::

### Default Value

A column can be assigned a default value. When a new row is created and no values are specified for some of the columns, those columns will be filled with their respective default values. The default value can be a constant or an expression. A common example is for a `java.time.LocalTime` slot, you can set default value as `now()`. For more information about default value in PostgreSQL, click [Default Values](https://www.postgresql.org/docs/current/ddl-default.html).

::: thumbnail
![sql default value](/images/provider/postgrest/sql-default-value.png)
:::

### Unique

Unique ensure that the data contained in a column, or a group of columns, is unique among all the rows in the table. It is a frame level annotation, you can have many unique constraints per table. 

You can set one slot in one unique constraint, this specifies that all values in this column are different. You can also set a group of slots in one unique, this specifies that the combination of values in the indicated columns is unique across the whole table, though any one of the columns need not be (and ordinarily isn't) unique. For more information about unique constraints in PostgreSQL, see [Unique Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS).

::: thumbnail
![unique](/images/provider/postgrest/unique.png)
:::

### Input Type

Input type is a backoffice annotation, indicating how the operation team input data values on the admin interface. Here are three options: text, dropdown and media.

::: thumbnail
![sql input type](/images/provider/postgrest/sql-input-type.png)
:::

#### Text

An input box for the data value, allowing to enter any content.

::: thumbnail
![input text](/images/provider/postgrest/input-text.png)
:::

#### Dropdown

A dropdown menu for displaying choices. To select value from options makes it easier for operators to input legit and compatible value.

::: thumbnail
![dropdown annotation](/images/provider/postgrest/dropdown-annotation.png)
:::

Currently dropdown only supports static options, which can be defined via JSON: 
- JSON Representation
```json
[
  {
    "id": "value1",
    "name": "display1"
  },
  {
    "id": "value2",
    "name": "display2"
  }
]
```
- Fields

| Fields         | Type   | Description |
|:---            |:---    |:---         |
| `id`           | string | *Required*. Stored as value in the database. |
| `name`         | string | *Required*. Displayed in backoffice (admin interface). |


For example, you can provide a dropdown list statically via JSON like this:

```json
[
  {
    "id": "M",
    "name": "Male"
  },
  {
    "id": "F",
    "name": "Female"
  }
]
```

Then operators can select the value from the select component in backoffice like this:

::: thumbnail
![dropdown](/images/provider/postgrest/dropdown.png)
:::

#### Media

By setting input type to media, operators can upload pictures by selecting or dragging in the backoffice and the URLs of pictures will be stored in cells automatically. When you need to send rich messages to users, you can use these URLs for displaying.

For example, there is a slot called _photo_ of which input type is media on OpenCUI. In its corresponding column in backoffice, you can upload a picture and view the picture in the table.

::: thumbnail
![upload picture](/images/provider/postgrest/upload-picture.png)
*Figure 1: upload pictures*

<br>

![view picture](/images/provider/postgrest/view-picture.png)
*Figure 2: view pitures in the table*
:::

::: tip Need To Know
When the SQL data type is one of `text`, `varchar` and `varchar(n)`, you can choose **Media**.
:::

## Access Backoffice

Once the table structure has been declared in OpenCUI platform, the hosted database can be accessed through **Backoffice** (the admin interface). To access the actual data source, you need to deploy the postgres provider first. 
1. Heading to **Version** page, in the middle of the second navigation bar, select **Version** tab. 
2. Click **Deploy** in the upper-right corner of the Version area.
::: thumbnail
![deploy postgres provider](/images/provider/postgrest/sql-deploy.png)
:::

When the **Deploy** button is triggered, OpenCUI platform will update the table structure in the corresponding hosted database. Then, you can log in to the backoffice to access the actual data source through Postgres provider configuration information. 

1. Switch to **Build** area, in the middle of the second navigation bar, select **Build** tab.
2. In the left side menu, click **Configuration**, then you can get the configuration information.
3. Copy and paste the **URL** to your browser, use **Admin Email** and **Admin Password** to log into backoffice.
::: thumbnail
![configuration](/images/provider/postgrest/configuration.png)
*Configuration information*

<br>

![backoffice](/images/provider/postgrest/backoffice.png)
*Backoffice, the admin interface*
:::

## Provide Function Implementation

To provide function implementation, you need to add service interface to implement first.

Back to your postgrest provider, heading to **Service** page from the left side menu. In the **Implemented** section, select the service interface you want to implement.

:::thumbnail
![function implementation](/images/provider/postgrest/function-implementation.png)
:::

Then all the functions on the service interface will be shown. To implement a fucntion, click one of the functions in **Functions** section. In the function popup window, you can provide the implementation in **Provider Dependent** script language or just in **Kotlin**. No matter which language you will be using, OpenCUI provides a built-in auto-completion feature to help you with your implementation.

::: thumbnail
![click a function](/images/provider/postgrest/click-function.png)
*Click a function*

<br>

![implement function](/images/provider/postgrest/implement-function.png)
*Provide implementation*
:::

### Provider Dependent Language

For Postgrest providers, the provider dependent language is [PL/pgSQL language](https://www.postgresql.org/docs/current/plpgsql.html). If you are familiar with [SQL](https://www.postgresql.org/docs/14/sql.html), writing SQL commands within a PL/pgSQL function will be easy. 

For example, if you've stored your customers' information in your database and you want to get a customer's name by their user ID, which is an input parameter named *userId_parameter*,  the code will be like this:
``` sql
BEGIN
    RETURN QUERY 
    SELECT name FROM "Info" WHERE "userId" = "userId_parameter";
END
```
Besides, [PL/pgSQL language](https://www.postgresql.org/docs/current/plpgsql.html) also supports [simple loops](https://www.postgresql.org/docs/current/plpgsql-control-structures.html#PLPGSQL-CONTROL-STRUCTURES-LOOPS) and [conditionals](https://www.postgresql.org/docs/current/plpgsql-control-structures.html#PLPGSQL-CONDITIONALS).

::: tip Need To Know
If the return value is not a storage-enabled frame and the type of slot in the frame is **builder-define entity** or ***kotlin.String***, check whether the type of its corresponding column is *text* in PostgreSQL. If not, use `::text` to convert the type of column into *text*.

For example, the return value is consist of *dishId* and *dishName*. The type of *dishName* is *customized entity* and its corresponding column is *varchar(50)* in PostgreSQL. Add `::text` behind *dishName* to convert *varchar(50)* to *text*, so that the conversion between OpenCUI and PostgreSQL can work smoothly.
``` sql
BEGIN
    RETURN QUERY 
    SELECT "dishId", "dishName"::text FROM "dishItem";
END
```
:::

::: warning Warning
The return type of Provider-dependent function **can NOT be entity**. If the function only returns one column, you should add wrap the entity using a frame.

For example, if the type of column is X, you should create a frame and add a slot in the frame. The type of the slot should be corresponding of X in OpenCUI. 
:::

When the function returns a set of values of **composite type**, we convert the composite type back to a **frame**, so you can display or use these values in the OpenCUI environment. When returning values, be sure to follow these rules.
  - The **types** of slots in the the frame should be compatible with the types of return columns in the same index. For example, if the types of slots in the frame are [_kotlin.Int_, _kotlin.String_], the SQL data types of return columns should be [_bigint_, _text_] instead of [_text_, _bigint_].
  - The **labels** of slots in the the frame and the names of columns in the same index can be different. For example, if the labels of slots in a frame are [_id_, _name_], the names of return columns can be [_userId_, _userName_].

### Kotlin

In OpenCUI, function can always be implemented in **Kotlin**, known as native functions. For more information about Kotlin, see [Kotlin](https://kotlinlang.org/docs/functions.html). 

Native functions can be used to convert the value returning from a provider-dependent function to a desirable format. For example, if a provider-dependent function returns a multi-value frame with only one slot, you could use a Kotlin function to convert the multi-value frame into a multi-value slot.

``` kotlin
/* 
Suppose a provider-dependent is getFoodCategory() which returns a list of frame. 
There is one slot called returnValue in the frame. 
*/
return getFoodCategory()!!.map{it -> it.returnValue!!} 
```

## Function Console

When you finish implementing the function, before you wire it to the chatbot, you can verify whether your implementation is as expected through **Function Console**. To use function console, following these steps: 

1. Deploy your postgres provider. In the middle of the second navigation bar, select **Version** tab,  click **Deploy** in the upper-right corner of the Version area.

::: thumbnail
![deploy postgres provider](/images/provider/postgrest/sql-deploy.png)
:::

2. After deploying, switch to **Build** tab. In the upper-right corner of the **Build** area, click **Debug**. 

::: thumbnail
![click test](/images/provider/postgrest/click-test.png)
:::

3. In **Function Console**, select a function and pass values to parameters. 
   - If you want to pass null to a parameter, just leave it empty.
   - If the type of a parameter is entity, you can type its value directly.
   - If the type of a parameter is frame, please use JSON format.
4. Click **Execute**, then you can see the returns in **Result** section. As shown below, this function will return the reservation information. 

::: thumbnail
![function testing](/images/provider/postgrest/function-testing.png)
:::



