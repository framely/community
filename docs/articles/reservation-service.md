---
article: false
date: 2022-12-26

image:
- blog/banner/tutorial_reservation_ii.png
description:
- We list the reservation API that supports making a reservation
author: Sunny May
---

# Reservation API

[[toc]]

## Overview
The Reservation API provides different services for [making a table reservation](./requirements-on-reservation.md#make-a-reservation). Following its definition, you can create the [type systems](../guide/concepts.md#type-systems) and [services](../guide/concepts.md#services) in a component. The sample of the service is [reservation](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/63734ef820b0d2661d800404/service_schema). When you have problems in adding APIs, you can always refer to that component.

## API Specification
### <Badge type="warning" text="GET" vertical="middle"/> getTableInfo
**Summary**

Input parameters are set as the filter criteria to get the whole information for available tables. 

**Parameter**
```yaml
- name: date_param
  schema:
    type : java.time.LocalDate
  required: false
  description: The date the user chooses for the reservation.  
- name: time_param
  schema:
    type : java.time.LocalTime
  required: false
  description: The time the user chooses for the reservation.
- name: tableType_param
  schema:
    type : TableType entity
  required: false
  description: The type of table the user chooses for the reservation.
  
```

**Responses**
```yaml
description: A TableInfo object array
content: 
  application/json:
    schema:
      type: array
      items:
        type: object
      properties:
        date:
          type: java.time.LocalDate
          description: The available date.
        startTime:
          type: java.time.LocalTime
          description: The start time of the available time frame.
        endTime:
          type: java.time.LocalTime
          description: The end time of the available time frame. .
        tableType:
          type: TableType entity
          description: The available type of table. 
        minGuest:
          type: kotlin.Int
          description: The minimum number of guests which the table requires.
        maxGuest:
          type: kotlin.Int
          description: The maximum number of guests which the table requires.
```

### <Badge text="POST" vertical="middle"/> makeReservation
**Summary**

Inserting reservation information into the database. 

**Parameter**
```yaml
- name: userId_param
  schema:
    type: kolin.String
  required: true
  description: The user's ID.
- name: date_param
  schema:
    type : java.time.LocalDate
  required: true
  description: The date the user chooses for the reservation.
- name: time_param
  schema:
    type : java.time.LocalTime
  required: true
  description: The time the user chooses for the reservation.
- name: tableType_param
  schema:
    type : TableType entity
  required: true
  description: The type of table the user chsoses for the reservation.
  
```
**Responses**
```yaml
description: A ReservationInfo object array
content: 
  application/json:
    schema:
      type: array
      items:
        type: object
      properties:
        date:
          type: java.time.LocalDate
        time:
          type: java.time.LocalTime
        tableType:
          type: TableType entity
```

## How To Add
To add APIs for [making a reservation](./requirements-on-reservation.md#make-a-reservation), follow these procedures:

### Create a Component
Create a component with service enabled and [add the EN language](../reference/platform/multilingual.md#add-multi-language).

### Create Types
1. Create an [entity](../guide/concepts.md#entities) called **TableType**.
2. Create two [frames](../guide/concepts.md#frames) to represent **ReservationInfo** object and **TableInfo** object.
3. Add slots that are the same as properties of the object in each frame.

::: tip Do NOT add instances to the TableType entity. Why?
To make this component more flexible and let more people reuse it, you can leave the instance empty and let people who use this component add their own instances in their chatbots.
:::

### Add Function Interfaces
1. Follow the [API specification](#api-specification), add function interfaces in the **Service** field of the component. 
2. Before you move to the next step, don't forget to [view your changes](../reference/platform/versioncontrol.md#review-changes) and merge them into the master.
