---
article: true
date: 2023-01-04

image:
    - blog/banner/tutorial_reservation_i.png
description:
    - We explain the function interfaces that get access to reservation service
author: Sunny May
---

# Reservation Interfaces

[[toc]]

## Overview
The reservation interfaces provide general services for [making a table reservation](./build-reservation-module.md#make-a-reservation).

## Interfaces
### Objects
**ReservationInfo**
- Description: the information provided by the user for reservation
- Properties:
    - `date_param`, with type **java.time.LocalDate**
    - `time_param`, with type **java.time.LocalTime**
    - `tableType_param`, with type **TableType**

**TableInfo**
- Description: the whole information of available tables.
- Properties:
    - `date_param`, with type **java.time.LocalDate**
    - `startTime`, with type **java.time.LocalTime**
    - `endTime`, with type **java.time.LocalTime**
    - `tableType_param`, with type **TableType**
    - `minGuest`, with type **kotlin.Int**
    - `maxGuest`, with type **kotlin.Int**

### Function Signatures

**getTableInfo**
- Description: input parameters are set as the filter criteria to get the whole information for available tables.
- Parameters:
    - `date_param`, with type **java.time.LocalDate**
    - `time_param`, with type **java.time.LocalTime**
    - `tableType_param`, with type **TableType**
- Return: a list of **TableInfo**

**makeReservation**
- Description: Inserting reservation information into the database.
- Parameters:
    - `userId_param`, with type **kotlin.String**, not null
    - `date_param`, with type **java.time.LocalDate**, not null
    - `time_param`, with type **java.time.LocalTime**, not null
    - `tableType_param`, with type **TableType**, not null
- Return: a list of **ReservationInfo**

## How To Add
Following the definition of interfaces, you can create the [type systems](../guide/concepts.md#type-systems) and [services](../guide/concepts.md#services) in a module. If you have problems in adding interfaces, you can refer to the [reservation service](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/63734ef820b0d2661d800404/service_schema).

To add interfaces for [making a table reservation](./build-reservation-module.md#make-a-reservation), follow these procedures:
1. Create a module with service enabled and [add the EN language](../reference/platform/multilingual.md#add-multi-language).
2. Create an [entity](../guide/concepts.md#entities) called **TableType**.
3. Create two [frames](../guide/concepts.md#frames) to represent **ReservationInfo** object and **TableInfo** object. Add slots that are the same as properties of the object in each frame.
4. In the **Service** field, add [function signatures](#function-signatures).

Before you move to the next step, don't forget to [view your changes](../reference/platform/versioncontrol.md#review-changes) and merge them into the master.

