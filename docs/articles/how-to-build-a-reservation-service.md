---
article: true
date: 2022-12-26

image:
    - blog/banner/tutorial_reservation_ii.png
description:
    - Build a reservation service step by step
author: Sunny May
---

# How to Build a Reservation Service

[[toc]]

## Overview
Following the [requirements on making a reservation](./requirements-on-reservation.md#make-a-reservation), this guide shows you how to build a reservation service step by step with an OpenCUI-hosted service. With this service, it will be easy for a reservation chatbot to help users to make a reservation.

**What do you build?**
- A [component](../guide/concepts.md#components) that provides a service interface and type system. 
- A [provider](../guide/concepts.md#providers) that implements the service and provides the schema of a database. 

::: tip Tip
The sample of a component is [reservation](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/63734ef820b0d2661d800404/service_schema) and of a provider is [reservationProvider](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/6373805420b0d2661d806193/service_schema). If you have problems following procedures, you can always look for examples in this component and provider.
:::

## Before You Start
Read the following articles first and get familiar with the basic concepts and operation of the platform.
1. [Quick start with pingpong](../guide/pingpong.md) teaches you how to build a simple chatbot which includes the basic operation of the platform.
2. [Key concept](../guide/concepts.md) helps you to understand the type system and the roles of different projects.

## Component 
In this section, you create a [component](../guide//concepts.md#components) where you define [type systems](../guide/concepts.md#type-systems) and [services](../guide/concepts.md#services).

### Create Types
The data needed from users in making a reservation is a date, a time and a type of table. Date and time specify which day and what time the user will arrive at your restaurant. The type of table tells what kind of table the user books. The above information can be stored using [entities](../guide/concepts.md#entities). You can use pre-defined data to store the value of date and time. As for the type of table, you need to create a **TableType** entity to represent it. These three entities can be added to a **ReservationInfo** [frame](../guide/concepts.md#frames) so you can reuse them in different skills.

Sometimes, you need to provide available options with more information covered.
- For the time, the bot can provide time frames which include the start time and the end time.
- For the type of table, the bot can provide the type of table, the minimum and the maximum number of guests which the table requires.

In this situation, a **TableInfo** frame can cover all the additional information required by time and type of table. To sum up, the types you need to create are: 

1. Entity: **TableType**

2. Frame: **ReservationInfo**

| Slot        | Type                  |
|:------------|:----------------------|
| date        | java.timeLocalDate    |
| time        | java.time.LocalTime   |
| tableType   | TableType             |

3. Frame: **TableInfo**

| Slot        | Type                  |
|:------------|:----------------------|
| date        | java.timeLocalDate    |
| startTime   | java.time.LocalTime   |
| endTime     | java.time.LocalTime   |
| tableType   | TableType             |
| minGuest    | kotlin.Int            |
| maxGuest    | kotlin.Int            | 

:tipping_hand_woman: Now you can follow these steps to create types: 
1. Create a component with service enabled and [add the EN language](../reference/platform/multilingual.md#add-multi-language).
2. Add the above three types in the component.

::: tip Do NOT add instances to the TableType entity. Why?
To make this component more flexible and let more people reuse it, you can leave the instance empty and let people who use this component add their own instances in their chatbots.
:::

### Add Function Interfaces
To make a reservation, the business logic should include:
1. Getting available values for date, time and the types of table. If the user has selected a certain date, time or type of table, you need to set these values as the filter criteria to get available values. For example, if a user has selected "Monday" as a date, the time frames you recommend should also be available for "Monday".
2. Checking if the user input is valid. For example, if you are not open on "Monday" but the user input for the date is "Monday", you should tell the user that "Monday" is not valid.
3. Inserting reservation information into your database. Besides the values the user inputs, reservation information should also include the user's ID so that you know who made this reservation. 

The following function interfaces can be used to implement the above business logic. (`[]` means it has multiple values, `?` means it's nullable.)

| Function Label       | Parameter            | Parameter Type                       | Return Type                      |
|:---------------------|:---------------------|:-------------------------------------|:---------------------------------|
| getTableInfo         | date_param           | Entity/java.time.LocalDate?          | Frame/TableInfo[]?               |
|                      | time_param           | Entity/java.time.LocalTime?          |                                  |
|                      | tableType_param      | Entity/TableType?                    |                                  |
| makeReservation      | userId_param         | Entity/kolin.String                  | Frame/ReservationInfo?           |
|                      | date_param           | Entity/java.time.LocalDate?          |                                  |
|                      | tableType_param      | Entity/TableType?                    |                                  |
|                      | time_param           | Entity/java.time.LocalTime?          |                                  |
|                      | tableType_param      | Entity/TableType?                    |                                  |



:tipping_hand_woman: Now you can add the above function interfaces in the **Service** field of the component. Before you move to the next step, don't forget to [view your changes](../reference/platform/versioncontrol.md#review-changes) and merge them into the master.

## Provider
In this section, you learn how to create tables in the PostgreSQL database using a [postgrest provider](../reference//providers/postgrest.md#overview) and  implement a service interface in a [provider](../guide/concepts.md#providers).

### Import Component
:tipping_hand_woman: First, follow these steps to import a component to your provider.
1. [Create a postgrest provider](../reference//providers/postgrest.md#create-postgrest-provider).
2. [Import](../reference//providers/postgrest.md#declare-service-interface) the [reservation component](#component) into the provider. 

### Create ables 
To get available dates, time frames and types of tables, first you need tables to store this information. Next, you need another table to store the user's reservation. Here are the three tables you can use: 

1. **TableStatus** stores the quantity of available tables in a period of time for each day and information about the table: the type of table, the minimum and the maximum of guests which the table requires. 
2. **NumOfDays** defines the minimum and the maximum of days for which users can book in advance. For example, if the minimum is 0, it means that users can book a table for today. If the minimum is 1, then it means tomorrow.
3. **Reservation** records the reservations made by users.

:tipping_hand_woman: To sum up, now you need to create the following [storage-enabled frames](../reference/providers/postgrest.md#create-database-tables):

**Frame: TableStatus**

| Slot        | Type                  |
|:------------|:----------------------|
| date        | java.timeLocalDate    |
| tableType   | TableType             |
| minGuest    | kotlin.Int            |
| maxGuest    | kotlin.Int            | 
| startTime   | java.time.LocalTime   |
| endTime     | java.time.LocalTime   |
| quantity    | kotlin.Int            |

**Frame: NumOfDays**

| Slot        | Type                  |
|:------------|:----------------------|
| minNum      | kotlin.Int            |
| maxNum      | kotlin.Int            | 

**Frame: Reservation**

| Slot        | Type                  |
|:------------|:----------------------|
| userId      | kotlin.String         |
| date        | java.timeLocalDate    |
| time        | java.time.LocalTime   |
| tableType   | TableType             |
| status      | kotlin.Int            |

### Implement functions 
Once you've created tables, you can implement the [function interfaces](#add-function-interfaces) imported from the reservation component. By doing so, your business can get access to your database and perform [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operation within it.

:tipping_hand_woman: Now [select a service interface](../reference/providers/postgrest.md#provide-function-implementation) to implement. Next, copy the following codes to implement corresponding functions. Before you start to integrate the provider with a chatbot, be sure to use the [function console](../reference/providers/postgrest.md#function-console) to test functions first.

1. getTableInfo
``` sql
BEGIN
    RETURN QUERY 
    -- set date, time, tableType as constraint if they are not null
    -- select table information of which quantity > 0
    SELECT DISTINCT 
    "TableStatus"."date", 
    "TableStatus"."startTime", 
    "TableStatus"."endTime",
    "TableStatus"."tableType",
    "TableStatus"."minGuest", 
    "TableStatus"."maxGuest"
    FROM "TableStatus" 
    -- if date is not null
    WHERE(
        CASE 
            WHEN date_param IS NOT NULL
            THEN "TableStatus"."date" = date_param
                AND ( "TableStatus"."date" >= now()::date + (SELECT "minNum" FROM "NumOfDays" )::Int )
                AND  ( "TableStatus"."date" <= now()::date + (SELECT "maxNum" FROM "NumOfDays" )::Int )
            ELSE ( "TableStatus"."date" >= now()::date + (SELECT "minNum" FROM "NumOfDays" )::Int )
                AND  ( "TableStatus"."date" <= now()::date + (SELECT "maxNum" FROM "NumOfDays" )::Int )
        END
    )
    -- if time is not null
    AND(
        CASE 
            WHEN "time_param" IS NOT NULL
            THEN "time_param" >= "TableStatus"."startTime" AND "time_param" <= "TableStatus"."endTime"
            ELSE TRUE
        END
    )
    -- if tableType is not null
    AND(
        CASE 
            WHEN "tableType_param" IS NOT NULL
            THEN "TableStatus"."tableType" = "tableType_param"
            ELSE TRUE
        END     
    )
    AND "quantity" > 0
    ORDER BY "TableStatus"."date", "TableStatus"."startTime", "TableStatus"."minGuest";
END
```

2. makeReservation

``` sql
BEGIN
    RETURN QUERY 
    WITH getId AS(
        SELECT id FROM "TableStatus" 
        WHERE( 
            "TableStatus".date = date_param
            AND "time_param" >= "TableStatus"."startTime" AND "time_param" <= "TableStatus"."endTime"
            AND "TableStatus"."tableType" = "tableType_param"
            AND "quantity" > 0  
        )
        LIMIT 1
    ),
    -- update tableStatus
    updated AS(
        UPDATE "TableStatus" SET "quantity" =  ((SELECT "quantity" FROM "TableStatus" WHERE id = (SELECT * FROM getId)) - 1)
        WHERE id = (SELECT id FROM getId)
        RETURNING id
    )

    -- insert data to reservation when update successed
    INSERT INTO "Reservation"("userId", "date", "time", "tableType")
    SELECT "userId_param", "date_param", "time_param", "tableType_param"
    WHERE (SELECT id FROM updated) IS NOT NULL
    RETURNING "Reservation"."id", "Reservation"."date", "Reservation"."time", "Reservation"."tableType";
END
```
