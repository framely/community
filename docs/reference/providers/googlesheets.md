# Google Sheets

[[toc]]

## Overview

[Google Sheets](https://www.google.com/sheets/about/#overview) is a web-based application that enables users to create, update and modify spreadsheets and share the data online in real time.

Google Sheets provider allow you to use Google Sheets as backend, which the actual data can be managed by your operation team in online spreadsheet collaboratively. Through Google Sheets provider, you can query data from your spreadsheet using the [Query Language](https://developers.google.com/chart/interactive/docs/querylanguage) and update data with the help of low level functions in `io.opencui.provider.GoogleSheetsConnection`.

::: thumbnail
![data management](/images/provider/googlesheets/data-management.png)
*Operations on OpenCUI and Google Sheets*
:::

::: tip Note
Before you start, make sure you have [created a spreadsheet](https://support.google.com/docs/answer/6000292?hl=en).
:::

## Build Connection

To begin with, you need to build a connection between Google Sheets and the provider so that the provider gets access to your spreadsheet. To build the connection, get your [spreadsheet Id](https://developers.google.com/sheets/api/guides/concepts#spreadsheet) and a [service account credential](https://developers.google.com/workspace/guides/create-credentials#service-account) then fill out the following form.

::: thumbnail
![connection](/images/provider/googlesheets/connection.png)
:::

Once you create a service account, you need to give this account permission to view or edit your spreadsheet in three steps:
1. Copy the email of your [service account](https://console.cloud.google.com/iam-admin/serviceaccounts).
2. Go to your [spreadsheet](https://docs.google.com/spreadsheets/u/0/). At the top-right, click **Share**.
3. Paste the email you copied and give the right permission to this service account. For example, if you don't need to update business data in your spreadsheet, set the service account as a **Viewer**, otherwise, set it as an **Editor**.

::: thumbnail
![permit](/images/provider/googlesheets/permit.png)
:::

## Implement Functions
Before you start to implement functions, read implementation first.

### Types Conversion

- When you call the **provider-dependent** function, use the function called _toQueryString_ to convert parameters to the right format.
- When the **provider-dependent** function returns a set of values in the [Google Sheets data type](https://developers.google.com/chart/interactive/docs/querylanguage#literals), we put those values in the return frame you defined, so you can display or use these values in the OpenCUI environment. When returning values, be sure to follow these rules.
  - The **types** of slots in the the frame should be compatible with the types of return columns in the same index. For example, if the types of slots in the frame are [_kotlin.Int_, _kotlin.String_], the SQL data types of return columns should be [_bigint_, _text_] instead of [_text_, _bigint_].
  - The **labels** of slots in the the frame should be the same as the names of return columns in the same index. For example, if the labels of slots in a frame are [_id_, _name_], the names of return columns should be [_id_, _name_] as well.

::: thumbnail
![conversion](/images/provider/googlesheets/conversion.png)
Type Conversion Between OpenCUI and Google Sheets
:::

- Here is the conversion between entities and Google Sheets data types:

| Entity                                                     | Google Sheets Data Type |   
|:-----------------------------------------------------------|:------------------------|
| kotlin.Int / kotlin.Float                                  | number                  |
| Customized entity (Builder-created Entity) / kotlin.String | string                  |
| kotlin.Boolean                                             | boolean                 |
| java.time.LocalDate / java.time.YearMonth                  | date                    |
| java.time.LocalTime                                        | timeofday               |
| java.time.LocalDateTime                                    | datetime                | 


### Provider Dependent Functions
To get your business data from a spreadsheet, you can write a query in **provider-dependent** functions using the [Query Language](https://developers.google.com/chart/interactive/docs/querylanguage). A provider-dependent function implementation consists of **Function Meta** and **Query**.

::: thumbnail
![provider-dependent-function](/images/provider/googlesheets/provider-dependent-function.png)
:::

- **Function Meta** is used to define optional parameters that are needed in your query. The **key** means the parameter's name and the **value** is the parameter's value.
  - The keys you can choose are range, headers, gid and sheet. To learn what each of the parameters means, check out [Creating a Chart from a Separate Spreadsheet](https://developers.google.com/chart/interactive/docs/spreadsheets#creating-a-chart-from-a-separate-spreadsheet).
  - For example, because there is no _from_ clause in Google Sheets, if you want to select data from a sheet that is not the first sheet, you need to specify which sheet to select from. You can use _gid_ to link to the sheet's ID, or you can use _sheet_ to link to the sheet's name.

- **Query** is where you write a query using [Query Language](https://developers.google.com/chart/interactive/docs/querylanguage). Wrapping [Kotlin expressions](../annotations/kotlinexpression.md) in `${}`, you can reference input parameters in the provider-dependent function or return values from other functions.
  - When you reference values using Kotlin expressions,:exclamation:make sure you use `connection.toQueryString(X)` to convert value `X` to the right format.
  - For example, suppose you want to get a user's name by their ID. The user's name is stored in column B while ID in column A. If the input parameter is _userId_, you may write a query like this:
  ```sql
  select B where A = ${connection.toQueryString(userId!!)}
  ```

### Kotlin Functions

To update and append your business, OpenCUI provides external functions: _update_ and _append_. You can call these functions using `connection.update` and `connection.append` in Kotlin functions. Check out the definitions of these functions in `io.opencui.provider.GoogleSheetsConnection`. To learn the source of the function, see [spreadsheets.values.update](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update) and [spreadsheets.values.append](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append).

- The input parameters are the same in these two functions. 

| Name             | Type                | Reference                                                                                                                                                                                                           |   
|:-----------------|:--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| range            | kotlin.String       | Use _range_ to select specific ranges. To learn how to define it, see [A1 notation](https://developers.google.com/sheets/api/guides/concepts#cell).                                                                 |
| values           | kotlin.Any[]        | Use _values_ to add/append a row of values by putting values in a list, like`listOf(a, b, c)`.                                                                                                                      |
| valueInputOption | kotlin.String       | Use _valueInputOption_ to determine how input data should be interpreted. To know what options you should choose, see [ValueInputOption](https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption). |


- The return types are [UpdateValuesResponse](https://developers.google.com/resources/api-libraries/documentation/sheets/v4/java/latest/com/google/api/services/sheets/v4/model/UpdateValuesResponse.html#UpdateValuesResponse--) and  [AppendValuesResponse](https://developers.google.com/resources/api-libraries/documentation/sheets/v4/java/latest/com/google/api/services/sheets/v4/model/AppendValuesResponse.html#AppendValuesResponse--). You can use the methods in these classes to check if the response meets expectations. For example, if you expect to update 3 values, use `UpdateValuesResponse.getUpdatedCells == 3` to check.

Suppose you want to update a user's delivery address and phone number in the range of _"'UserInfo'!B5:C5"_. If the input parameters are _address_ and _phoneNumber_, the Kotlin function will be like this:
```kotlin
var values = listOf(address, phoneNumber)
var result = connection!!.update("'UserInfo'!B2", values, "RAW")
// if the update is successful, return true, otherwise, return false
return result!!.getUpdatedCells() == 2
```
