# Google Sheets

[[toc]]

## Overview

[Google Sheets](https://www.google.com/sheets/about/#overview) is a spreadsheet program developed by Google and runs on the web browser. You and your teammates can use Google Sheets to create and edit online spreadsheets.

Framely supports the backend component in form of a Google Sheets provider. On the Google Sheets side, your operation team can upload and manage your business data in the spreadsheet. On the Framely side, you can get data from your spreadsheet using the [Query Language](https://developers.google.com/chart/interactive/docs/querylanguage) and update data in your spreadsheet with the help of functions in [io.framely.provider.GoogleSheetsConnection](https://framely.naturali.io/org/5fa0e7dcf549c817cf952edd/agent/62d75a50d1bd62bdd2333bd3/frame/62d75bfad1bd62bdd2333bdb).

![manage-data-on-two-sides](/images/provider/GoogleSheets/manage-data-on-two-sides.png)

::: tip Note
Before you start, make sure you have [created a spreadsheet](https://support.google.com/docs/answer/6000292?hl=en).
:::

## Connection

To begin with, you need to build a connection between Google Sheets and the provider so that the provider gets access to your spreadsheet. To build the connection, get your [spreadsheet Id](https://developers.google.com/sheets/api/guides/concepts#spreadsheet) and a [service account credential](https://developers.google.com/workspace/guides/create-credentials#service-account) then fill out the following form.

![connection](/images/provider/GoogleSheets/connection.png)

Once you create a service account, you need to give this account permission to view or edit your spreadsheet.

**How to permit a service account**
**Step 1** :clipboard: Copy the email of your [service account](https://console.cloud.google.com/iam-admin/serviceaccounts).
**Step 2** Go to your [spreadsheet](https://docs.google.com/spreadsheets/u/0/). At the top-right, click **Share**.
**Step 3**  Paste the email you copied and give the right permission to this service account. For example, if you don't need to update business data in your spreadsheet, set the service account as a **Viewer**, otherwise, set it as an **Editor**.

![permit](/images/provider/GoogleSheets/permit.png)

## Function Implementation
As mentioned in [Implement Functions](http://localhost:8080/reference/providers/overview.html#implement-functions), there are two kinds of ways to implement a function:
- In **provider-dependent** functions, use the [Query Language](https://developers.google.com/chart/interactive/docs/querylanguage) to implement.
  - :exclamation:Provider-dependent functions should always return a multi-value frame(even if the function returns only one row), in which the names of slots are the same as the names of columns, and the slot's type is compatible with the return column's type in the same index.
  - For example, if the slots in a frame are [_id_, _name_] of which types are [_kotlin.Int_, _kotlin.String_], the slots in return columns should be [_id_, _name_] as well, and the types of return columns are supposed to be [_number_, _string_] instead of [_string_, _number_].

- In **Kotlin** functions, write function bodies in [Kotlin](https://kotlinlang.org/docs/functions.html).
  - Kotlin functions can be used to preprocess your data and then you call provider-dependent functions passing the processed data.
    
  - For example, in Google Sheets, you can't use `is not null` to compare `null` with a constant (both `null is not null` and `'xxx' is not null` are illegal). Instead, you can first use Kotlin functions to convert a null value to a string(e.g. `"null"`) and compare the value with `"null"` in provider-dependent functions.
    - In a provider-dependent function: getDate
    ```sql   
    select A where inputParam != "null" and B = inputParam
    ```
    - In a Kotlin function
  
    ```kotlin 
    // 1. Convert inputParam to "null" if it's null
    if(inputParam == null){
        inputParam = "null"
    }
    // 2. Call the provider-dependent function
    getDate(inputParam)
    ```

  - Learn how to implement more Kotlin functions, check out [Kotlin Function](../annotations/kotlinexpression.md).

### Types Conversion

- When you call the **provider-dependent** function, use the function called _toQueryString_ to convert parameters to the right format.
- When the **provider-dependent** function returns a set of values in the [Google Sheets data type](https://developers.google.com/chart/interactive/docs/querylanguage#literals), we put those values in the return frame you defined, so you can display or use these values in the Framely environment.

::: thumbnail
![conversion](/images/provider/GoogleSheets/conversion.png)
Type Conversion Between Framely and Google Sheets
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


### How To Write a Query
To get your business data from a spreadsheet, you can write a query in **provider-dependent** functions. A provider-dependent function implementation consists of **Function Meta** and **Query**.

![provider-dependent-function](/images/provider/GoogleSheets/provider-dependent-function.png)

- **Function Meta** is used to define optional parameters that are needed in your query. The **key** means the parameter's name and the **value** is the parameter's value.
  - The keys you can choose are range, headers, gid and sheet. To learn what each of the parameters means, check out [Creating a Chart from a Separate Spreadsheet](https://developers.google.com/chart/interactive/docs/spreadsheets#creating-a-chart-from-a-separate-spreadsheet).
  - For example, because there is no _from_ clause in Google Sheets, if you want to select data from a sheet that is not the first sheet, you need to specify which sheet to select from. You can use _gid_ to link to the sheet's ID, or you can use _sheet_ to link to the sheet's name.

- **Query** is where you write a query using [Query Language](https://developers.google.com/chart/interactive/docs/querylanguage). Wrapping [Kotlin expressions](../annotations/kotlinexpression.md) in `${}`, you can reference input parameters in the provider-dependent function or return values from other functions.
  - When you reference values using Kotlin expressions,:exclamation:make sure you use `connection.toQueryString(X)` to convert value `X` to the right format.
  - For example, suppose you want to get a user's name by their ID. The user's name is stored in column B while ID in column A. If the input parameter is _userId_, you may write a query like this:
  ```sql
  select B where A = ${connection.toQueryString(userId!!)}
  ```

### How To Update/Append Data

To update and append your business, Framely provides external functions: _update_ and _append_. You can call these functions using `connection.update` and `connection.append` in Kotlin functions. Check out the definitions of these functions in [io.framely.provider.GoogleSheetsConnection](https://framely.naturali.io/org/5fa0e7dcf549c817cf952edd/agent/62d75a50d1bd62bdd2333bd3/frame/62d75bfad1bd62bdd2333bdb). To learn the source of the function, see [spreadsheets.values.update](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update) and [spreadsheets.values.append](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append).

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