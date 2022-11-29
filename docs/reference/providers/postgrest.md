# Postgrest

[[toc]]


## Overview
OpenCUI also supports the backend component in form of [postgrest provider](/guide/glossary.md#provider). The backend component can be declaratively defined in two steps: First, create database tables needed by service by adding storage annotation to frames, secondly, provide function implementation using SQL to express business logic. Using backoffice annotation, you can specify the operation team can access these tables via backoffice.

There are a couple advantage of using backend component approach to build service provider. 
1. In addition to declaratively building database as content management system, OpenCUI backend component allows you to implement the service declaratively too using SQL. This make it possible for the business analyst to build backend.
2. Since tables are created based on the data type in the API schema, so no explicit conversion code is needed, rows in the table or view in the database are automatically converted into an object in the OpenCUI.
3. The admin interface or backoffice can also be automatically created based on annotation so that the operation team can use backoffice to provide service. 
4. Backoffice components can be reused by cloning for OpenCUI hosted solution.

::: thumbnail
![data management](/images/provider/postgrest/data-management.png)
*How to create a table and access data*
:::

## Create Tables
1. To begin with, [create a Postgrest provider](./overview.md#create-provider) and then [import a component](./overview.md#import-component) to the provider.
2. Next, you need to define the tables using storage-enabled frames. The label of a frame is the name of a table and the slots in the each frame are columns in each table. You can choose to create a frame or select an imported frame in the **Imported** field.

::: thumbnail
![create a frame](/images/provider/postgrest/create-frame.png)
*Create a frame*
:::

3. Turn on **Storage Enabled** so this frame will be used to create a table in the database. 

::: thumbnail
![enable storage](/images/provider/postgrest/enable-storage.png)
:::

4. Add slots to the frame. 

::: thumbnail
![add slots](/images/provider/postgrest/add-slots.png) 
::: 

## Add Annotations

#### Features
[Annotations](./overview.md#annotation) of providers include storage annotations and backoffice annotations.
- Storage annotations defines the database schema needed by the backend component, which can then be used to create the database for provider.
  - Column information for table
  - Set a default value of a column
  - Set not-null constraints
  - Set unique constraints
- Backoffice annotations are used to define the user experience of the backoffice for the backend.
  - Upload a picture to a cell, and it will be stored as a URL
  - Select a value from a dropdown list

#### How To Use


There are two levels of provider annotations: slot level and frame level.
- At a slot level, you can add both storage annotations and backoffice annotations in the **Schema** field. Except that the **Default Value** needs to be added manually, others are added by default.

::: thumbnail
![click one slot](/images/provider/postgrest/click-slot.png)
*Figure 1: click on one slot*

<br>

![add annotations](/images/provider/postgrest/add-annotations.png)
*Figure 2: annotations*
:::

- At a frame level, you can configure storage annotations which is setting unique constraints in the **Annotation** field.

::: thumbnail
![unique](/images/provider/postgrest/unique.png)
:::


### SQL Data Type
To create tables to store the frame instance, we need to map each slot of frame to a column in the database. SQL data type is a slot annotation, it defines the SQL data type for the corresponding column for the given slot. Normally, we will automatically decide the SQL data type for each slot but if the slot type is ***kotlin.String*** or **builder-defined entity**, you need to specify the database type of the column. 

Supported formats are `char(n)`, `varchar(n)`,`varchar`, `text` where **n** is a positive integer, e.g. `char(16)`. To learn more about character types, click [here](https://www.postgresql.org/docs/current/datatype-character.html).

::: thumbnail
![sql data type](/images/provider/postgrest/sql-data-type.png)
:::

### Input Type
Input type determines how operators input a value. Here are three input types: 
- **Text** means [operators](../../guide/glossary.md#operator-business) can type raw input directly.
- **Dropdown** provides values which operators can pick from. In this way, dropdown makes it easy for operators to input legit and compatible value.
- **Media** supports uploading pictures and storing URLs of pictures in the cell. 

::: tip Notice
Only when the [SQL data type](#sql-data-type) is `text`,`varchar` or `varchar(n)` can you choose **Media**.
:::

#### Dropdown

::: thumbnail
![dropdown annotation](/images/provider/postgrest/dropdown-annotation.png)
:::

Dropdown list returns a JSON array which includes two keys: 
1. "name" will be displayed in backoffice.
2. "id" will be stored as value in the database.

You can provide a dropdown list statically by writing a JSON array like this:

```json
[{ "id": "M", "name": "Male"}, 
  { "id": "F", "name": "Female"}]
```
Then operators can select a value from the dropdown in backoffice.

::: thumbnail
![dropdown](/images/provider/postgrest/dropdown.png)
*Dropdown in backoffice*
:::

#### Media
When you send pictures to a user, you actually send the URLs of the pictures in [rich messages](../channels/universalmessage.md#rich-message). By setting input type to media, you just need to upload pictures and the URLs of pictures will be stored in cells automatically. 

For example, there is a slot called _photo_ of which input type is media on OpenCUI. In its corresponding column in backoffice, you can upload a picture and view the picture in the table.

::: thumbnail
![upload picture](/images/provider/postgrest/upload-picture.png)
*Figure 1: upload pictures*

<br>

![view picture](/images/provider/postgrest/view-picture.png)
*Figure 2: view pitures in the table*
:::

### Allow Null
Allow null is a slot annotation that is turned on by default. Allow null is a column constraint and it means the column can be null. If you turn off allow null, it indicates that the column can't be null. To learn more about it, see [Not-Null Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6).

### Default Value
Default value is a slot annotation. You can use a constant or an expression as a default value. When there is no value specified in the column, the column will be filled with its default value.

For example, if the type of slot is *java.time.LocalDate*, you can set its default value as `'2022-6-15'` or `now()::date`. For details about default value in official documentation, click [here](https://www.postgresql.org/docs/current/ddl-default.html).

### Unique
Unique is a frame annotation. If there is only one slot in a group of unique constraints, unique constraints ensure the data contained in the corresponding column is unique among all the rows in the table. If not, unique constraints make sure that the combination of values in the indicated columns is unique across the table. To learn more about it, see [Unique Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS).

::: tip Notice
For now, among table constraints, we only support unique constraints. If you need more table constraints, please let us know.
:::

## Implement Functions
Before you start to implement functions, read [implementation](./overview.md#implementation) first.

### Types Conversion
- When you call the **Provider Dependent function**, you pass the **entities** (or **frames**) and we will convert their types to [**SQL data types**](https://www.postgresql.org/docs/current/datatype.html) (or [**composite types**](https://www.postgresql.org/docs/current/rowtypes.html)) automatically, so you can use these parameters in your function body.
- When the function returns a set of values of **composite type**, we convert the composite type back to a **frame**, so you can display or use these values in the OpenCUI environment. When returning values, be sure to follow these rules.
  - The **types** of slots in the the frame should be compatible with the types of return columns in the same index. For example, if the types of slots in the frame are [_kotlin.Int_, _kotlin.String_], the SQL data types of return columns should be [_bigint_, _text_] instead of [_text_, _bigint_].
  - The **labels** of slots in the the frame and the names of columns in the same index can be different. For example, if the labels of slots in a frame are [_id_, _name_], the names of return columns can be [_userId_, _userName_].

::: thumbnail
![conversion](/images/provider/postgrest/conversion.png)
*Type Conversion Between OpenCUI and PostgreSQL*
:::

- Here is the conversion between entities and SQL data types:

| Entity                                                     | SQL Data Type               |   
|:-----------------------------------------------------------|:----------------------------|
| kotlin.Int / java.time.Year                                | bigint                      |
| kotlin.Float                                               | double precision            |
| Customized entity (Builder-created Entity) / kotlin.String | text                        |
| kotlin.Unit, kotlin.Any / kotlin.DayOfWeek / kotlin.ZoneId | text                        |
| kotlin.Boolean                                             | boolean                     |
| java.time.LocalDate / java.time.YearMonth                  | date                        |
| java.time.LocalTime                                        | time without time zone      |
| java.time.LocalDateTime                                    | timestamp without time zone | 


### Provider Dependent Functions
In provider dependent functions, the language used for implementation is [PL/pgSQL language](https://www.postgresql.org/docs/current/plpgsql.html). If you are familiar with [SQL](https://www.postgresql.org/docs/14/sql.html), writing SQL commands within a PL/pgSQL function will be easy. 

For example, if you've stored your customers' information in your database and you want to get a customer's name by their user ID, which is an input parameter named *userId_parameter*,  the code will be like this:
``` sql
BEGIN
    RETURN QUERY 
    SELECT name FROM "Info" WHERE "userId" = "userId_parameter";
END
```
Besides, [PL/pgSQL language](https://www.postgresql.org/docs/current/plpgsql.html) also supports [simple loops](https://www.postgresql.org/docs/current/plpgsql-control-structures.html#PLPGSQL-CONTROL-STRUCTURES-LOOPS) and [conditionals](https://www.postgresql.org/docs/current/plpgsql-control-structures.html#PLPGSQL-CONDITIONALS).

::: warning Notice
If the return value is not a storage-enabled frame and the type of slot in the frame is **builder-define entity** or ***kotlin.String***, check whether the type of its corresponding column is *text* in PostgreSQL. If not, use `::text` to convert the type of column into *text*.

For example, the return value is consist of *dishId* and *dishName*. The type of *dishName* is *customized entity* and its corresponding column is *varchar(50)* in PostgreSQL. Add `::text` behind *dishName* to convert *varchar(50)* to *text*, so that the conversion between OpenCUI and PostgreSQL can work smoothly.
``` sql
BEGIN
    RETURN QUERY 
    SELECT "dishId", "dishName"::text FROM "dishItem";
END
```
:::


## Add Data
In the **Configuration** field, you can get the **URL** of backoffice along with **Admin Email** and **Admin Password** to log in backoffice. Via backoffice, you and the operation team can accesss the tables and add data into the database.

::: thumbnail
![configuration](/images/provider/postgrest/configuration.png)
*Figure 1: configuration*

<br>

![backoffice](/images/provider/postgrest/backoffice.png)
*Figure 2: interface after login the backoffice*
:::

## Test Functions
Function testing can be used to see if the result returned by the functions meet your expectation before you call functions in the chatbot. Follow these steps to learn how to use the function testing:
1. Only when you [deploy](../platform/deployment.md#how-to-use) the current version of your provider, can you use the function testing. Be sure to deploy first!
2. After deploying the provider, click **Test**.

::: thumbnail
![click test](/images/provider/postgrest/click-test.png)
:::

3. Select a function which is provider-dependent and pass values to parameters. 
   - If you want to pass null to a parameter, just leave it empty.
   - If the type of a parameter is entity, you can type its value directly.
   - If the type of a parameter is frame, please use JSON format.
4. Click **Execute**.
5. In the **Result** field, you can see the return values of the function. As shown in the figure below, this function returns the information of the reservation. 

::: thumbnail
![function testing](/images/provider/postgrest/function-testing.png)
:::



