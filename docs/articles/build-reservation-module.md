---
article: true
date: 2023-01-01

image:
    - blog/banner/tutorial_reservation_iii.png
description:
    - We show you the way to build a reservation module step by step
author: Sunny May
---

# How To Build a Reservation Module

[[toc]]

## Overview
This guide shows you how to design and build a reservation module with [reservation interfaces](./reservation-interfaces.md). The reservation module provides reusable [conversational user interaction (CUI) components](../guide/components.md#conversational-user-interaction-cui-component) so builders who use this module can reuse CUI components to provide reservation services in their own chatbots.

## Design Module
To begin with, we document high level design and requirements for conversational user interface on table reservation bot, so you get some idea on what the bot should behave conversationally. Here are the list of service we want to provide:

There are some assumptions applied to all these services:
1. The bot can get the id of the user without asking.
2. A valid reservation means it is not expired and hasn't been canceled.

### Make a Reservation

The schema representation of the service can be sketched as follows:

Service: Make a reservation                                                                                            
Slots:
1. `userId` with type **String**
2. `date` with type **LocalDate**
3. `time` with type **LocalTime**
4. `table type` with type **TableType** entity (e.g., _small_, _medium_, _large_)

The conversational behavior of the bot for this service can be described in the following contextual snippets:

#### Happy Path
1. Description: the user provides valid values and the reservation is made successfully.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to make a reservation.
:::

::: bot Bot
Which day would you like to book?
1. Wednesday, December 21, 2022
2. Thursday, December 22, 2022
3. Friday, December 23, 2022
   :::

::: user User
This Sunday.
:::

::: bot Bot
What time would you like to book?
1. 9:00 AM - 12:00 PM
2. 1:00 PM - 9:00 PM
   :::

::: user User
5:00 pm.
:::

::: bot Bot
Which table would you like to book?
1. Small table (1 - 4 People)
2. Medium table (4 - 6 People)
3. Large table (6 - 10 People)
   :::

::: user User
Small table, please.
:::

::: bot Bot
Are you sure to book a small table at 5:00 PM for Sunday, December 25, 2022?
:::

::: user User
Yes.
:::

::: bot Bot
Your reservation is secured. Thank you very much for making the reservation! You can check the reservation under your id: xxxx.
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true.

#### Inform Failure
1. Description: the user confirms the reservation but the reservation fails.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true, fail to make a reservation.
3. Annotated conversation:

:::: conversation

::: bot Bot
Are you sure to book a small table at 5:00 PM for Sunday, December 25, 2022?
:::

::: user User
Yes.
:::

::: bot Bot
Sorry, the table you want to book is not available at present.
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true.


#### Support Updating Value

1. Description: before the reservation has been made, the user wants to change the date.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
Can I change the date to this Saturday?
:::

::: bot Bot
The date is changed from Sunday, December 25, 2022 to Saturday, December 24, 2022.
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-24", `complete` = false.

#### Handle Invalid Value

1. Description: there is no available table for Sunday, the user changes to another date.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `complete` = false, there is no available table for 2022-12-25.
3. Annotated conversation:

:::: conversation

::: bot Bot
Sunday, December 25, 2022 is not available. Please choose another date. Which day would you like to book?
1. Wednesday, December 21, 2022
2. Thursday, December 22, 2022
3. Friday, December 23, 2022
   :::

::: user User
Friday.
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-23", `complete` = false.

#### Handle Denial

1. Description: the user denies all the values for making a reservation.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true.
3. Annotated conversation:

:::: conversation

::: bot Bot
Are you sure to book a small table at 5:00 PM for Sunday, December 25, 2022?
:::

::: user User
No.
:::

::::

4. End state: `user id` = "xxxx", `complete` = false.


### View Reservations

Slots:
1. `userId` with type **String**

The conversational behavior of the bot for this service can be described in the following contextual snippets:

#### Happy Path

1. Description: when the user has valid reservations, display them to the user.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to view my reservation.
:::

::: bot Bot
You have reserved a small table at 5:00 PM for Sunday, December 25, 2022.
:::

::::

4. End state: `user id` = "xxxx", `complete` = true.

#### Inform None Reservation

1. Description: when the user has no valid reservations, notify the user.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to view my reservation.
:::

::: bot Bot
Sorry, I can't find your valid reservation. Please check whether you made the reservation with your current account.
:::

::::

4. End state: `user id` = "xxxx", `complete` = true.


### Cancel a Reservation
Slots:
1. `userId` with type **String**
2. `reservation id` with type **Int**

The conversational behavior of the bot for this service can be described in the following contextual snippets:

#### Happy Path

1. Description: the user has a valid reservation and it is canceled successfully.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to cancel my reservation.
:::

::: bot Bot
Your reservation is a small table at 5:00 PM for Sunday, December 25, 2022. Are you sure to cancel it?
:::

::: user User
Yes, please.
:::

::: bot Bot
The reservation has been canceled successfully.
:::

::::

4. End state: `user id` = "xxxx", `reservation id` = "15", `complete` = true.

#### Handle Several Reservations

1. Description: the user has more than one valid reservation so the user needs to choose one of them.
2. Precondition: `user id` = "xxxx", `complete` = false.
3. Annotated conversation:

:::: conversation

::: bot Bot
Which reservation would you like to cancel?
1. Small table at 5:00 PM for Sunday, December 25, 2022
2. Large table at 7:00 PM for Monday, December 26, 2022
   :::

::: user User
The second.
:::

::::

4. End state: `user id` = "xxxx", `reservation id` = "16", `complete` = true.

## Build Module
Next, we show you the steps to build a module for [making a reservation](#make-a-reservation). To explore the rest two services, you can check the [reservation module](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/63734ef820b0d2661d800404/intent?page=0&imported=false&search=).

### Before You Start
Read the following articles first and get familiar with the basic concepts and operation of the platform.
1. [Quick start with pingpong](../guide/pingpong.md) teaches you how to build a simple chatbot which includes the basic operation of the platform.
2. [Key concept](../guide/concepts.md) helps you to understand the type system and the modules.
3. [Slot filling](../guide/slotfilling.md) helps you to design how the bot interacts with users.

Besides, be sure you've read [reservation interfaces](./reservation-interfaces.md) and built a [reservation module](./reservation-interfaces.md#how-to-add) already.

### Add Slots & Annotations
To make a reservation, the information needed is the user ID, date, time and type of table. You need to create a [skill](../guide/concepts.md#skills) and add four slots to store the information. To get an ID of a user automatically without asking the user, you can use a system CUI frame called [user.UserIdentifier](../reference/annotations/systemcomponent.md#user-identifier). A slot called *userId* in this frame is a channel-dependent identifier of the user.

Next, you need to add [dialog annotations](../guide/concepts.md#dialog-annotations) for each slot. The dialog annotation includes:

1. [Value recommendation](../reference/annotations/valuerec.md) (value rec): with VR added to slots, when there is no initial value for a slot, the bot can recommend available values getting from the [source](../reference/annotations/valuerec.md#source) for each slot. Since we will use the value check to conduct validation, we don't need to turn on the [hard mode](../reference/annotations/valuerec.md#hard-mode).
2. [Value check](../reference/annotations/valuecheck.md): when the user provides a value for a slot, the bot will check the [conditions](../reference/annotations/valuecheck.md#conditions). If the condition is false, the bot will inform the user and follow the recovering strategy to revert. In this guide, you can follow the default [recovering strategy](../reference/annotations/valuecheck.md#recovering-strategy).
3. [Confirmation](../reference/annotations/confirmation.md): when the user has provided all the values the bot needs, the bot confirms these values with the user. To confirm all the values in the end, you need to add a [frame-level](../reference/annotations/confirmation.md#how-to-use) confirmation.

To collect all the information to make a reservation, you need the following slots:
1. `userId`, with type **io.opencui.core.user.UserIdentifier**
2. `date`, with type **java.timeLocalDate**
3. `time`, with type **java.time.LocalTime**
4. `tableType`, with type **TableType**

Besides,  you need to add the following annotations:

- Slot annotations for `date`

| Annotation  | Source / Condition                                                     |
|:------------|:-----------------------------------------------------------------------|
| Value rec   | reservation.getTableInfo(null, null, null)!!.map{it.date!!}.distinct() |
| Value check | reservation.getTableInfo(date, null, null).isNotEmpty()                |

- Slot annotations for `time`

| Annotation  | Source / Condition                                                          |
|:------------|:----------------------------------------------------------------------------|
| Value rec   | reservation.getTableInfo(date, null, null)!!.map{it.startTime!!}.distinct() |
| Value check | reservation.getTableInfo(date, time, null).isNotEmpty()                     |

- Slot annotations for `tableType`

| Annotation  | Source / Condition                                               |
|:------------|:-----------------------------------------------------------------|
| Value rec   | reservation.getTableInfo(date, time, null)!!.map{it.tableType!!} |
| Value check | reservation.getTableInfo(date, time, tableType).isNotEmpty()     |

- A frame annotation

| Annotation   | Condition                                         |
|:-------------|:--------------------------------------------------|
| Confirmation | date != null && time != null && tableType != null |


::: tip Explanations for the code expression
1. In the function invocation, you can't pass values from the slots that are behind the current slots. Therefore, when `date` is the first slot, the last two actual parameters of `getTableInfo` in its value check are both nulls.
2. Since the source of value rec should return values of which types are the same as the slot type, `map{it.date!!}` is used to extract the corresponding dates from return values.
   :::

:tipping_hand_woman: Now you can follow the steps below to add schema and annotations:
1. [Import](../reference/platform/reusability.md#import-1) [*io.opencui.core*](https://build.opencui.io/org/633db11928e4f04b5f8443b4/agent/633f953f28e4f04b5f8443b7/intent?page=0&imported=false&search=) to the reservation module.
2. In the reservation module, create a skill called **MakeReservation**.
3. In the **MakeReservation** skill, add a `userId` slot of which type is *io.opencui.core.user.UserIdentifier* and [use a frame](../reference/platform/reusability.md#compose-1) of which type is *ReservationInfo*.
4. To invoke functions imported from the service, add a service slot in the **Services** section in the skill.
5. Add the above annotations needed by each slot to implement the interaction logic.

### Add Responses
After interaction with users, the bot should return the result of services. When a user has provided all the information needed to make a reservation, the bot should inform the user whether the reservation has been made successfully.

:tipping_hand_woman: To do so, you need to add the following [responses](../guide/glossary.md#response). The message in the branch is used to inform a successful reservation while another message is to inform failure.

|         | Condition                                                                                    | Action               | 
|:--------|:---------------------------------------------------------------------------------------------|:---------------------|
| Branch  | reservation.makeReservation(userIdentifier!!.userId!! ,date!!, time!!, tableType!!) != null  | Single Value Message |
| Default | -                                                                                            | Single Value Message |

### Add Templates & Expressions
In the previous sections, you've done development at the structure level. In this section, you will learn to develop at a language level by using [templates](../guide/glossary.md#template) and [expressions](../guide/glossary.md#expression-exemplars). Before you start, **switch to the** [**EN agent**](../reference/platform/multilingual.md#add-multi-language) first.

**Expressions**

When a user wants to make a reservation, he might say "*make a reservation*" or he might mention a specific date, like "*book a table tomorrow*". To cover the above situations, the expressions you need to add to the **MakeReservation**	skill are:
- make a reservation
- book a table $date$
- book a table $time$
- book a table $tableType$

::: warning Warning
Do **NOT** copy and paste the text in `$$` but type the text instead.
:::

**Templates**

When it comes to interaction with a user, the bot might need to recommend available dates to the user and might need to inform the user when he inputs an invalid value. To sum up, the templates you need to add for each slot are: (VR: value recommendation, VC: value check)

- Templates for `date`

| Location  | Template                                                               |
|:----------|:-----------------------------------------------------------------------|
| Prompt    | Which day would you like to book?                                      |
| VR - Body | [`${it.index + 1}`] `${it!!.value!!.expression()}`                     |
| VC        | `${date!!.expression()}` is not available, please choose another date. |

- Templates for `time`

| Location  | Template                                                                                                                                                                                                                                |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Prompt    | What time would you like to book?                                                                                                                                                                                                       |
| VR - Body | [`${it.index + 1}`] `${reservation.getTableInfo(date, null, null)!!.map{it.startTime!!}.distinct()[it.index]!!.expression()}` - `${reservation.getTableInfo(date, null, null)!!.map{it.endTime!!}.distinct()[it.index]!!.expression()}` |
| VC        | `${time!!.expression()}` for `${date!!.expression()}` is not available, please choose another time.                                                                                                                                     |

- Templates for `time`

| Location  | Template                                                                                                                                                                                                                  |
|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Prompt    | Which table would you like to book?                                                                                                                                                                                       |
| VR - Body | [`${it.index + 1}`] `${it.value!!.expression()}` (`${reservation.getTableInfo(date, time, null)!!.map{it.minGuest!!}[it.index]}` - `${reservation.getTableInfo(date, time, null)!!.map{it.maxGuest!!}[it.index]}` People) |
| VC        | `${tableType!!.expression()}` at `${time!!.expression()}` for `${date!!.expression()}` is not available, please choose another table.                                                                                     |

Don't forget to add a template for confirmation:

| Location     | Template                                                                                                       |
|:-------------|:---------------------------------------------------------------------------------------------------------------|
| Confirmation | Are you sure to book a `${tableType!!.expression()}` at `${time!!.expression()}` for `${date!!.expression()}`? |   

Besides, the templates you need to define in response are:

|          | Single Value Message                                                                                                                                                                |
|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Branch   | Your reservation is secured. Thank you very much for making the reservation and we look forward to being of service to you. <br> You can check the reservation under your ID: xxxx. |
| Default  | Sorry, the table you want to book is not available at present. You may change to another time, date or table type and try again.                                                    |

::: tip Explanations for the code expression
1. `map{it.startTime!!}` is used to extract the values of startTime from the return values.
2. `distinct()` is used to get the unique values.
3. To learn more code expression in the body of VR, see the [list](../reference/annotations/valuerec.md#list).
   :::

:tipping_hand_woman: Now you can add expressions and templates as shown above. Then add slots' names and types' names. Before you start to build a provider or a chatbot, be sure to [view all the changes](../reference/platform/versioncontrol.md#review-changes) and merge them into the master first.
