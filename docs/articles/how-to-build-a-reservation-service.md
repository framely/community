---
article: true
date: 2022-12-26

image:
    - blog/banner/tutorial_reservation_ii.png
description:
    - We show you the way to implement a reservation service step by step
author: Sunny May
---

# How to Implement a Reservation Service

[[toc]]

## Overview
This guide shows you how to implement a [reservation service](./reservation-service.md) using a [postgrest provider](../reference//providers/postgrest.md#overview). The sample of the provider is [reservationProvider](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/6373805420b0d2661d806193/service_schema). If you have problems following procedures, you can always refer to that provider.

## Before You Start
Read the following articles first and get familiar with the basic concepts and operation of the platform.
1. [Quick start with pingpong](../guide/pingpong.md) teaches you how to build a simple chatbot which includes the basic operation of the platform.
2. [Key concept](../guide/concepts.md) helps you to understand type systems and components.

## Import Component
:tipping_hand_woman: First, follow these steps to import a component to your provider.
1. [Create a postgrest provider](../reference//providers/postgrest.md#create-postgrest-provider).
2. [Import](../reference//providers/postgrest.md#declare-service-interface) the [reservation component](./reservation-service.md#create-types) into the provider. 

## Create Tables 
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

## Implement Functions 
Once you've created tables, you can implement the [function interfaces](./reservation-service.md#add-function-interfaces) imported from the reservation component. By doing so, your business can get access to your database and perform [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operation within it.

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
