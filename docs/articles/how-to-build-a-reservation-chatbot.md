---
article: true
date: 2022-12-26

image:
    - blog/quick-start.png
description:
    - Build a reservation chatbot step by step
author: Sunny May
---

# How to Build a Reservation Chatbot

[[toc]]

## Overview
Following the [requirements on making a reservation](./requirements-on-reservation.md#make-a-reservation), this guide shows you how to build a reservation chatbot step by step with a [reservation service](./how-to-build-a-reservation-service.md).

**What do you build?**
- A [component](../guide/concepts.md#components) that provides reusable [conversational user interaction (CUI) components](../guide/components.md#conversational-user-interaction-cui-component). 
- A [chatbot](../guide/concepts.md#chatbots) that reuses CUI components to provide reservation services and [supports CRUD](../guide/5levels-cui.md#crud-support) operation.

::: tip Tip
The chatbot you learn to build and test in the guide is part of a sample chatbot. You can explore more functionalities like viewing and canceling reservations in the [reservationApp](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/63734f1920b0d2661d80040f/intent). Also, the sample of the component is [reservation](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/63734ef820b0d2661d800404/service_schema).
:::

## Before You Start
Read the following articles first and get familiar with the basic concepts and operation of the platform.
1. [Quick start with pingpong](../guide/pingpong.md) teaches you how to build a simple chatbot which includes the basic operation of the platform.
2. [Key concept](../guide/concepts.md) helps you to understand the type system and the roles of different projects.
3. [Slot filling](../guide/slotfilling.md) helps you to design how the bot interacts with users.

Besides, be sure you've followed [how to build a reservation service](./how-to-build-a-reservation-service.md) to build the component and provider for reservation service.

## Component 
In this section, you add [CUI components](../guide/components.md#conversational-user-interaction-cui-component) to the [reservation component](./how-to-build-a-reservation-service.md#component).

### Add Slots & Annotations
To make a reservation, the information needed is the user ID, date, time and type of table. You need to create a [skill](../guide/concepts.md#skills) and add four slots to store the information. To get an ID of a user automatically without asking the user, you can use a system CUI frame called [user.UserIdentifier](../reference/annotations/systemcomponent.md#user-identifier). A slot called *userId* in this frame is a channel-dependent identifier of the user.

Next, you need to add [dialog annotations](../guide/concepts.md#dialog-annotations) for each slot. The dialog annotation includes:

1. [Value Recommendation](../reference/annotations/valuerec.md) (VR): with VR added to slots, when there is no initial value for a slot, the bot can recommend available values getting from the [source](../reference/annotations/valuerec.md#source) for each slot. Since we will use the value check to conduct validation, we don't need to turn on the [hard mode](../reference/annotations/valuerec.md#hard-mode).
2. [Value Check](../reference/annotations/valuecheck.md) (VC): when the user provides a value for a slot, the bot will check the [conditions](../reference/annotations/valuecheck.md#conditions). If the condition is false, the bot will inform the user and follow the recovering strategy to revert. In this guide, you can follow the default [recovering strategy](../reference/annotations/valuecheck.md#recovering-strategy).
3. [Confirmation](../reference/annotations/confirmation.md): when the user has provided all the values the bot needs, the bot confirms these values with the user. To confirm all the values in the end, you need to add a [frame-level](../reference/annotations/confirmation.md#how-to-use) confirmation.

To collect all the information to make a reservation, you need the following slots:

| Slot        | Type                                   |
|:------------|:---------------------------------------|
| userId      | io.opencui.core.user.UserIdentifier​    |
| date        | java.timeLocalDate                     |
| time        | java.time.LocalTime                    |
| tableType   | TableType                              |

Besides,  you need to add the following annotations: 

| Slot       | Annotation     | VR Source / VC Condition / Confirmation Condition                            | 
|:-----------|:---------------|:-----------------------------------------------------------------------------|
| date       | VR             | reservation.getTableInfo(null, null, null)!!.map{it.date!!}.distinct()       |
|            | VC             | reservation.getTableInfo(date, null, null).isNotEmpty()                      |
| time       | VR             | reservation.getTableInfo(date, null, null)!!.map{it.startTime!!}.distinct()  |
|            | VC             | reservation.getTableInfo(date, time, null).isNotEmpty()                      |
| tableType  | VR             | reservation.getTableInfo(date, time, null)!!.map{it.tableType!!}             |
|            | VC             | reservation.getTableInfo(date, time, tableType).isNotEmpty()                 |
| -          | Confirmation   | date != null && time != null && tableType != null                            |

::: tip Explanations for the code expression
1. In the function invocation, you can't pass values from the slots that are behind the current slots. Therefore, when *date* is the first slot, the actual parameters of `getTableInfo` in its VR are all nulls and the last two parameters of `getTableInfo` in its VC are both nulls.
2. Since the source of VR should return values of which types are the same as the slot type, you need to use `map{it.date!!}` to extract the corresponding dates from return values.
:::

:tipping_hand_woman: Now you can follow the steps below to add schema and annotations:
1. [Import](../reference/platform/reusability.md#import-1) [*io.opencui.core*](https://build.opencui.io/org/633db11928e4f04b5f8443b4/agent/633f953f28e4f04b5f8443b7/intent?page=0&imported=false&search=) to the [reservation component](./how-to-build-a-reservation-service.md#component).
2. In the reservation component, create a skill called **MakeReservation**.
3. In the **MakeReservation** skill, add a **userId** slot of which type is *io.opencui.core.user.UserIdentifier​* and [use a frame](../reference/platform/reusability.md#compose-1) of which type is *ReservationInfo*.
4. To invoke functions imported from the service, add a service slot in the **Services** section in the skill.
5. Add the above annotations needed by each slot to implement the interaction logic.

### Add Responses
After interaction with users, the bot should return the result of services. When a user has provided all the information needed to make a reservation, the bot should inform the user whether the reservation has been made successfully. 

:tipping_hand_woman: To do so, you need to add the following [responses](../guide/glossary.md#response). The message in the branch is used to inform a successful reservation while another message is to inform failure.

|                | Condition                                                                                    | Action               | 
|:---------------|:---------------------------------------------------------------------------------------------|:---------------------|
| Branch         | reservation.makeReservation(userIdentifier!!.userId!! ,date!!, time!!, tableType!!) != null  | Single Value Message |
| Default Action | -                                                                                            | Single Value Message |

### Add Templates & Expressions
In the previous sections, you've done development at the structure level. In this section, you will learn to develop at a language level by using [templates](../guide/glossary.md#template) and [expressions](../guide/glossary.md#expression-exemplars). Before you start, **switch to the** [**EN agent**](../reference/platform/multilingual.md#add-multi-language) first.

**Expressions**

When a user wants to make a reservation, he might say "*make a reservation*" or he might mention a specific date, like "*book a table tomorrow*". To cover the above situations, the expressions you need to add to the skill are: 

| Skill                   | Expressions                 |
|:------------------------|:----------------------------|
| MakeReservation         | make a reservation          |
|                         | book a table $date$         |
|                         | book a table $time$         |
|                         | book a table $tableType$    |

::: warning Warning
Do **NOT** copy and paste the text in `$$` but type the text instead.
::: 

**Templates**

When it comes to interaction with a user, the bot might need to recommend available dates to the user and might need to inform the user when he inputs an invalid value. To sum up, the templates you need to add for each slot are: (VR: value recommendation, VC: value check) 

| Slot       | Location     | Template                                                                                                    | 
|:-----------|:-------------|:------------------------------------------------------------------------------------------------------------|
| date       | Prompt       | Which day would you like to book?                                                                           |
|            | VR - Body    | [${it.index + 1}] ${it!!.value!!.expression()}                                                              |
|            | VC           | ${date!!.expression()} is not available, please choose another date.                                        |
| time       | Prompt       | What time would you like to book?                                                                           |
|            | VR - Body    | [${it.index + 1}] ${reservation.getTableInfo(date, null, null)!!.map{it.startTime!!}.distinct()[it.index]!!.expression()} - ${reservation.getTableInfo(date, null, null)!!.map{it.endTime!!}.distinct()[it.index]!!.expression()}                     |
|            | VC           | ${time!!.expression()} for ${date!!.expression()} is not available, please choose another time.             |
| tableType  | Prompt       | Which table would you like to book?                                                                         |
|            | VR - Body    | [${it.index + 1}] ${it.value!!.expression()} (${reservation.getTableInfo(date, time, null)!!.map{it.minGuest!!}[it.index]} - ${reservation.getTableInfo(date, time, null)!!.map{it.maxGuest!!}[it.index]} People)                                        |
|            | VC           | ${tableType!!.expression()} at ${time!!.expression()} for ${date!!.expression()} is not available, please choose another table.                                                                                                                     |
| -          | Confirmation | Are you sure to book a ${tableType!!.expression()} at ${time!!.expression()} for ${date!!.expression()}?    |

Besides, the templates you need to define in reseponse are: 

|          | Single Value Message                 |
|:---------|:-------------------------------------|
| Branch   | Your reservation is secured. Thank you very much for making the reservation and we look forward to being of service to you. <br> You can check the reservation under your ID: xxxx.    |
| Default  | Sorry, the table you want to book is not available at present. You may change to another time, date or table type and try agian.        |

::: tip Explanations for the code expression
1. `map{it.startTime!!}` is used to extract the values of startTime from the return values. 
2. `distinct()` is used to get the unique values.
3. To learn more code expression in the body of VR, see the [list](../reference/annotations/valuerec.md#list).
:::

:tipping_hand_woman: Now you can add expressions and templates as shown above. Then add slots' names and types' names. Before you start to build a provider or a chatbot, be sure to [view all the changes](../reference/platform/versioncontrol.md#review-changes) and merge them into the master first.

## Chatbot 

In this section, you reuse [CUI components](../guide/components.md#conversational-user-interaction-cui-component) and customize a builder-defined entity.

### Import Component
:tipping_hand_woman: To begin with, you need to create an [OpenCUI-hosted](../guide/glossary.md#deploy-mode) chatbot and [import](../reference/platform/reusability.md#import-1) the [reservation component](#component) into the chatbot.

### Set Integration
:tipping_hand_woman: Next, when your [reservation provider](./how-to-build-a-reservation-service.md#provider) is ready, you can [integrate the provider with your chatbot](../reference/providers/postgrest.md#wire-to-chatbot) to get access to the reservation service. 

::: tip Tip
If your provider is not ready, you can just move on to the next step but be sure to set the integration before the [testing](../reference/platform/testing.md).
:::

### Add Instances
For now, there is no [entity instance](../guide/glossary.md#entity) added to the **TableType** entity. 

:tipping_hand_woman: To complete the entity, you need to add the following instances to the imported entity: TableType.

| Imported Entity    | Instance |
|:-------------------|:---------|
| TableType          | small​    |
|                    | medium   |
|                    | large    |

### Add Expressions
At a language level, there is no expression for instances in the **TableType** entity. 

:tipping_hand_woman: To complete the entity, you need to **switch to the** [**EN agent**](../reference/platform/multilingual.md#add-multi-language) and add expressions for each instance.

| Entity    | Instance | Expressions                |
|:----------|:---------|:---------------------------|
| TableType | small​    | small <br>small table      |
|           | medium   | medium <br>medium table    |
|           | large    | large <br>large table      |

### What's Next
Once you've built your chatbot, you can [test](../reference/platform/testing.md) it and see if it works as you expect. If it works well on the platform, you can try to deploy the chatbot to a [channel](../reference/channels/overview.md#opencui-extension-channel) and check the real conversation on a specific channel. You may use the [rich message](../reference/channels/universalmessage.md#rich-message) to provide a better experience for your users.

