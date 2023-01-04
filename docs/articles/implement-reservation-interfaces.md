---
article: true
date: 2023-01-04

image:
    - blog/banner/tutorial_reservation_ii.png
description:
    - We show you the way to implement reservation interfaces step by step
author: Sunny May
---

# How To Implement Reservation Interfaces

[[toc]]

## Overview
This guide shows you how to implement [reservation interfaces](./reservation-interfaces.md) using a [postgrest provider](../reference/providers/postgrest.md#overview). If you have problems following these steps below, you can refer to the [reservationProvider](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/6373805420b0d2661d806193/service_schema).

## Before You Start
Read the following articles first and get familiar with the basic concepts and operation of the platform.
1. [Quick start with pingpong](../guide/pingpong.md) teaches you how to build a simple chatbot which includes the basic operation of the platform.
2. [Key concept](../guide/concepts.md) helps you to understand type systems and providers.

Besides, be sure you've read [reservation interfaces](./reservation-interfaces.md) and built a [reservation module](./reservation-interfaces.md#how-to-add) already.

## Import Interfaces
First, follow these steps to import reservation interfaces to your provider.
1. [Create a postgrest provider](../reference/providers/postgrest.md#create-postgrest-provider).
2. [Import](../reference/providers/postgrest.md#declare-service-interface) the reservation module into the provider.

## Create Tables
To get available dates, time frames and types of tables, first you need tables to store this information. Next, you need another table to store the user's reservation. Here are the three tables you can use:

1. **TableStatus** stores the quantity of available tables in a period of time for each day and information about the table: the type of table, the minimum and the maximum of guests which the table requires.
2. **NumOfDays** defines the minimum and the maximum of days for which users can book in advance. For example, if the minimum is 0, it means that users can book a table for today. If the minimum is 1, then it means tomorrow.
3. **Reservation** records the reservations made by users.


By [storage-enabled frames](../reference/providers/postgrest.md#create-database-tables), you can define the table structures and OpenCUI will create the tables in PostgreSQL for you. Now you need to create three storage-enabled frames and add the following slots to the corresponding frames.

1. Slots in **TableStatus**
    - `date`, with type **java.timeLocalDate**
    - `tableType`, with type **TableType**
    - `minGuest`, with type **kotlin.Int**
    - `maxGuest`, with type **kotlin.Int**
    - `startTime`, with type **java.time.LocalTime**
    - `endTime`, with type **java.time.LocalTime**
    - `quantity`, with type **kotlin.Int**

2. Slots in **NumOfDays**
    - `minNum`, with type **kotlin.Int**
    - `maxNum`, with type **kotlin.Int**

3. Slots in **Reservation**
    - `userId`, with type **kotlin.String**
    - `date`, with type **java.timeLocalDate**
    - `time`, with type **java.time.LocalTime**
    - `tableType`, with type **TableType**
    - `status`, with type **kotlin.Int**

## Implement Interfaces
Once you've created tables, you can implement the interfaces. By doing so, your business can get access to your database and perform [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operation within it. Now [select a service interface](../reference/providers/postgrest.md#provide-function-implementation) to implement. Next, copy the following codes to implement corresponding functions.

1. getTableInfo

::: details Click me to view the code
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
``
::: 

2. makeReservation

::: details Click me to view the code
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
:::

Before you start to integrate the provider with a chatbot, be sure to use the [function console](../reference/providers/postgrest.md#function-console) to test functions first.
