---
article: true
date: 2023-03-02

image:
    - blog/banner/tutorial_reservation_iii.png
description:
    - We show you the way to build a reservation module step by step
author: Sunny May
---

# How To Build a Reservation Module

[[toc]]

## Overview

This guide shows you how to document a conversational user interface (CUI) design for a table reservation, and build a module upon that CUI design with [reservation APIs](../plugins/services/reservation/reservation-api.md). 

Table reservation is designed to help users to book/view/cancel a table at a restaurant for a number of guests at a certain time. By reusing this module, builders can provide a table reservation service for their own businesses in their own chatbots.

## CUI Design

To begin with, we document high-level design and requirements for the conversational user interface on the table reservation bot, so you get some idea of how the bot should behave conversationally.

There are some assumptions applied to all these services:
1. The bot can get the id of the user without asking.
2. A valid reservation means it is not expired and hasn't been canceled.

Here is the list of services we want to provide:

### Make a Reservation

The schema representation of the service can be sketched as follows:

Slots:
1. `user id` with type **String**
2. `number` with type **Int**
3. `date` with type **Date**
4. `time` with type **Time**
   
The conversational behavior of this service is described in the following contextual snippets:

#### Happy Path

1. Description: the user provides valid values and the reservation is made successfully.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
Hi, I'd like to reserve a table, please.
:::

::: bot Bot
How many people will you need the reservation for?
:::

::: user User
There will be two of us.
:::

::: bot Bot
Which day will you be joining us on?
:::

::: user User
This Sunday.
:::

::: bot Bot
What time would you like the reservation for?
:::

::: user User
About 3pm.
:::

::: bot Bot
Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?
:::

::: user User
Yes.
:::

::: bot Bot
Your reservation has been made. We'll see you at 3:00 PM on Sunday, December 25, 2022. You can check the reservation under your ID: xxxx.
:::

::::

4. End state: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `time` = "15:00", `complete` = true.

#### Inform Failure

1. Description: the user confirms the reservation but the reservation creation fails.
2. Precondition: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `time` = "15:00", `complete` = true, fail to make a reservation.
3. Annotated conversation:

:::: conversation

::: bot Bot
Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?
:::

::: user User
Yes.
:::

::: bot Bot
Sorry, the table you want to book is not available at present. You may change to another time or date, and try it again.
:::

::::

4. End state: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `time` = "15:00", `complete` = true.

#### Handle Invalid Value

1. Description: the value provided by the user is not valid, so the bot needs to ask the user to provide another one.
2. Precondition: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `complete` = false, there is no available table for 2022-12-25.
3. Annotated conversation:

:::: conversation

::: bot Bot
Which day will you be joining us on?
:::

::: user User
This Sunday.
:::

::: bot Bot
Sunday, December 25, 2022 is not available. Please choose another date. Which day will you be joining us on?
:::

::: user User
How about Friday?
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-23", `complete` = false.

#### Support Updating Value

1. Description: before the reservation has been made, the user wants to change the number of people, date or time.
2. Precondition: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
Can I change the date to this Saturday?
:::

::: bot Bot
Sure, the date is changed from Sunday, December 25, 2022 to Saturday, December 24, 2022.
:::

::::

4. End state: `user id` = "xxxx", `number` = 2, `date` = "2022-12-24", `complete` = false.

### View Reservations

The schema representation of the service can be sketched as follows:

Slot: `user id`, with type **String**.

The conversational behavior of this service is described in the following contextual snippets:

#### Happy Path

1. Description: Display valid reservations made by the user.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
Hello, I'd like to check my reservation. I can't remember which date I booked.
:::

::: bot Bot
No problem. You have booked a table for Sunday, December 25, 2022, at 3:00 PM.
:::

::::

4. End state: `user id` = "xxxx", `complete` = true.

#### Inform None Reservation

1. Description: Notify the user that there is no valid reservation.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
Hello, I'd like to check my reservation. I can't remember which date I booked.
:::

::: bot Bot
Sorry, I can't find a valid reservation under your ID (xxxx). Please check whether you made the reservation with your current account.
:::

::::

4. End state: `user id` = "xxxx", `complete` = true.

### Cancel a Reservation

The schema representation of the service can be sketched as follows:

Slots:
1. `user id`, with type **String**
2. `reservation id` , with type **String**
   
The conversational behavior of this service is described in the following contextual snippets:

#### Happy Path

1. Description: the user has a valid reservation and it is canceled successfully.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
Hi, I made a reservation earlier this week, but I have to cancel it.
:::

::: bot Bot
No problem. You have reserved a table for Sunday, December 25, 2022 at 3:00 PM. Are you sure to cancel it?
:::

::: user User
Yes, please.
:::

::: bot Bot
The reservation has been canceled successfully.
:::

::::

4. End state: `user id` = "xxxx", `reservation id` = "xx", `complete` = true.

#### Handle Several Reservations

1. Description: the user has more than one valid reservation, so the user needs to choose one first.
2. Precondition: `user id` = "xxxx", `complete` = false.
3. Annotated conversation:

:::: conversation

::: bot Bot
Which reservation would you like to cancel?
1. Sunday, December 25, 2022, 3:00 PM
2. Monday, December 26, 2022, 7:00 PM
:::

::: user User
The second.
:::

::::
4. End state: `user id` = "xxxx", `reservation id` = "xx", `complete` = true.

## Build Module

Now we take [making a reservation](#make-a-reservation) as an example to show you the steps to build a [module](../guide/concepts.md#modules). To know how the last two services are built, you can check the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/intent).

### Before You Start

Read the following articles before starting to build a module.
1. [Quickstart with PingPong](../reference/quickstarts/pingpong.md) teaches how to build a simple chatbot which includes the basic operation of the platform.
2. [Key Concepts](../guide/concepts.md) helps to understand the type system and the modules.
3. [Slot Filling](../guide/slotfilling.md) shows how the bot can interact with users.
4. [Reservation API](../plugins/services/reservation/reservation-api.md) describes the functionality of each API in the [reservation service](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema).

### Describe Service at Schema Level

In OpenCUI, you can describe your service with [type systems](../guide/concepts.md#type-systems). In this section, you create a [frame](../guide/concepts.md#frames) to describe your table resource and a [skill](../guide/concepts.md#skills) to interact with users. After that, you use native functions to implement your business logic.

#### Create Frame & Skill

1. Create a [module](../guide/concepts.md#modules) using the **LibraryWithCore** template.
2. [Import](../reference/platform/reusability.md#import-1) the following libraries to your module:
   - [reservation library](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema) provides reservation APIs.
   - [components library](https://build.opencui.io/org/io.opencui/agent/components/struct/intent) provides DatePicker and TimePicker.
3. Inside your module, create a [frame](../guide/concepts.md#frames) called **Table** to describe your table resource.
   - On the **Table** frame page, [inherit](../reference/platform/reusability.md#inherit-1) **services.opencui.reservation.Resource**.
   - Then add a slot called **capacity** with type **kotlin.Int**. This feature shows the maximum number of guests that the table seats.
4. Create a [skill](../guide/concepts.md#skills) called **MakeReservation** in this module. Add the following slots to this skill.

| Label          | Type                                                                                                                   | Description                                                                                                                                                                                      | 
|:---------------|:-----------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| userIdentifier | [UserIdentifier](../reference/annotations/systemcomponent.md#user-identifier)                                          | The identifier of the user. <br> Automatically filled by the runtime.                                                                                                                            |
| location       | [Location](../plugins/services/reservation/reservation-api.md#location)                                                | The location of the restaurant. <br> Filled by the user or the business. If it's filled by the user, you should add instances of the locations to **services.opencui.reservation.LocationName**. |
| resourceType   | [ResourceType](https://build.opencui.io/org/services.opencui/agent/reservation/struct/entity/63b50c47fb84b020c72ba4de) | The type of resource. <br> Filled by the user or the business. If it's filled by the user, you should add instances of the types to **services.opencui.reservation.ResourceType**.               |
| duration       | kotlin.Int                                                                                                             | The duration of the reservation, in seconds. <br> Filled by the user or the business.                                                                                                            |
| number         | kotlin.Int                                                                                                             | The numbers of guests. <br> Filled by the user.                                                                                                                                                  |
| datePicker     | [DatePicker](../plugins/components/datepicker/datepicker-design.md#schema-representation)                              | The date of the reservation. <br> Filled by the user.                                                                                                                                            |
| timePicker     | [TimePicker](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8af37517f06c1880e3d06 )          | The start time of the reservation. <br> Filled by the user.                                                                                                                                                          |

#### Add Native Functions

In this module, we follow such a rule: the number of guests determines which capacity of the table the user books. If the number of guests is 2 and there is a table of which capacity is 2, no matter whether that table is available, the user isn't allowed to book any table of which capacity is more than 2.

Now, you need to add a native function to filter the resources by the number of guests. Besides, in order to reduce the number of function calls, you can also use a native function to make a reservation.

1. To use the functions in the reservation interfaces, you need to declare the service first.
   - On the **MakeReservation** skill page, in the **Services** section, select **services.opencui.reservation.IReservation service**.
   - Use the default service label and save it.
2. Add a native function that filters the input resources by the number of guests and returns a list of tables.
   - Function label: **filterTables**
   - Input parameter: **services.opencui.reservation.Resource**, multi-valued, not null
   - Return Type: **Table**, multi-valued, not null
   - Implementation:
   ```kotlin
   // If the resourceList is empty, just return an empty list
   if(resourceList.isEmpty()) return emptyList()
   
   // Get a list of unique capacities in ascending order
   val capacityList = ( reservation.listResource(location!!, resourceType!!, null, null, 0) as List<Table>).map{it -> it.capacity!!}.distinct().sorted()
   
   // Find the minimum capacity which is not smaller than the number of people
   var capacity:Int ?= null
   for(i in capacityList){
      if(i >= number!!){
         capacity = i
         break
      }
   }
   
   // Return an empty list if there is no suitable capacity
   if(capacity == null) return emptyList()
   
   // Filter the tables by the capacity
   val filteredResource = (resourceList as List<Table>).filter{
       it.capacity == capacity!!
   }
   return filteredResource
   ```
3. Add a native function to make a reservation. If the reservation is made successlly, return `true`. Otherwise, returns `false`. 
   - Function label: **makeReservation**
   - Input parameter: none
   - Return Type: **kotlin.Boolean**, not null
   - Implementation:
   ```kotlin
   // Get available tables
   val availableTables = filterTables(reservation.listResource(location!!, resourceType!!, datePicker!!.date!!, timePicker!!.time!!, duration!!))
   
   // Make a reservation if there is an available table
   return if (availableTables.isNotEmpty()){
       reservation.makeReservation(userIdentifier!!.userId!!, datePicker!!.date!!, timePicker!!.time!!, duration!!, availableTables.first()) != null
   } else{
       false
   }
   ```

### Define Interaction 

OpenCUI provides [dialog annotations](../reference/annotations#dialog-annotations) to define how the bot interacts with users, and [responses](../reference/glossary.md#response) to display the result. In this section, you add dialog annotations and responses to the **MakeReservation** skill.

Before you start, here are some assumptions about this business:
1. There is only one location for this restaurant.
2. For table reservation, the type of resource should be "table".
3. There is only one duration among all the resources.
  
Under the above assumptions, location, resource type, and duration can be given by the business.

#### Add Annotations

During the slot filling process, the following dialog annotations will be used.

1. [Initialization](../reference/annotations/init.md): when a slot is filled by the business, you can use initialization to provide a value for this slot. Here are the initial values for each slot:
   - **location** slot:  the first value in the return list from [listLocation](../plugins/services/reservation/reservation-api.md#listlocation).
   - **resourceType** slot: "table" with the right type.
   - **duration** slot: the first duration of the first value in the return list from [listResource](../plugins/services/reservation/reservation-api.md#listresource).
   
2. [Fill Strategy](../reference/annotations/fillstrategy.md): for the slots filled by the business, their fill strategy should be Direct Fill. For the slots filled by the user, just follow the default fill strategy (Always Ask). Here is what fill strategy each slot should follow:
   - Direct Fill: **location** slot, **resourceType** slot and **duration** slot.
   - Always Ask: **number** slot, **datePicker** slot and **timePicker** slot.

3. [Value Check](../reference/annotations/valuecheck.md): when a slot value is provided by the user, you can use value check to validate this value. In this guide, following the default recovering strategy would be fine. Here are the rules that make each slot valid:
   - **number** slot: there is at least one table which can seat this number of people.
   - **datePicker** slot: there is at least one table under the restrictions provided by business and the values (number and date) provided by the user.
   - **timePicker** slot: there is at least one table under the restrictions provided by business and the values (number, date and time) provided by the user.
   
4. [Confirmation](../reference/annotations/confirmation.md): when the user has provided all the values needed, you can ask the user to confirm their choice.
   
Now, add the following dialog annotations to the **MakeReservation** skill:

**Slot annotations**:
1. **location** slot
   - Fill Strategy: Direct Fill
   - Initialization with the following Association:
   ```kotlin
   reservation.listLocation().first()
   ```

2. **resourceType** slot
   - Fill Strategy: Direct Fill
   - Initialization with the following Association:
   ```kotlin
   services.opencui.reservation.ResourceType("table")
   ```
   
3. **duration** slot
   - Fill Strategy: Direct Fill
   - Initialization with the following Association:
   ```kotlin
   reservation.listResource(location!!, resourceType!!, null, null, 0).first()!!.durations!!.first()
   ```

4. **number** slot
   - Fill Strategy: Always Ask
   - Value Check with the following Condition:
   ```kotlin
   filterTables(reservation.listResource(location!!, resourceType!!, null, null, duration!!)).isNotEmpty()
   ```
   
5. **datePicker** slot
   - Fill Strategy: Always Ask
   - Value Check with the following Condition:
   ```kotlin
   filterTables(reservation.listResource(location!!, resourceType!!, datePicker!!.date!!, null, duration!!)).isNotEmpty()
   ```

6. **timePicker** slot
   - Fill Strategy: Always Ask
   - Value Check with the following Condition:
   ```kotlin
   filterTables(reservation.listResource(location!!, resourceType!!, datePicker!!.date!!, timePicker!!.time!!, duration!!)).isNotEmpty()
   ```

**Frame annotation**:
- Confirmation with the following Condition:
 ```kotlin
number != null && datePicker!!.date != null && timePicker!!.time != null 
```

#### Add Responses

When a user has provided all the information needed to make a reservation, the bot should inform the user whether the reservation has been made successfully.

To do so, create a branch and add **Single Value Message** actions in the branch and the default response. The message in the branch is used to inform of a successful reservation, while another message is to inform of failure.

The condition of the branch should be
```kotlin
makeReservation() == true
```

### Add language Aspect

In previous sections, you've done development at the structure level that is language-independent. In this section, you develop at a language level, so the bot can process the users' utterances and reply to users in natural text. There are two kinds of language-related parts builder needs to fill: [templates](../reference/glossary.md#template) for text generation and [expressions](../reference/glossary.md#expression-exemplars) for helping dialog understanding.

Before you start, **[switch to the EN agent](https://opencui.io/reference/platform/multilingual.html#add-multi-language)** first.

In order to support users providing values without prompt, add **Names** for these slots first:
1. **number** slot: number of people
2. **datePicker** slot: date
3. **timePicker** slot: time

#### Add Expressions

When a user wants to make a reservation, he might say "_I want to book a table_" or he might mention a specific date, like "_book a table tomorrow_". To cover the above situations, add the following expressions to the **MakeReservation** skill:

- I want to book a table
- I want to book a table `$datePicker$`
- I want to book a table at `$timePicker$`
- I want to book a table for `$number$`

::: warning Attention
Do **NOT** copy and paste the value wrapped by `$`, please type the value instead.
::: 

#### Fill Templates
For dialog annotations, add the following templates:

**Templates at slot level**:
1. **number** slot
   - Prompt: How many people will you need the reservation for?
   - Value Check: There is no available table for `${number}` people, please choose another number.
2. **datePicker** slot
   - Prompt: Which day will you be joining us on?
   - Value Check: There is no available table for `${number}` on `${datePicker!!.date!!.expression()}`, please choose another date.
3. **timePicker** slot
   - Prompt: What time would you like the reservation for?
   - Value Check: There is no available table for `${number}` at `${timePicker!!.time!!.expression()}` on `${datePicker!!.date!!.expression()}`, please choose another time.

**Template at frame level**:
- Confirmation: Are you sure to book a table for `${number}` at `${timePicker!!.time!!.expression()}` on `${datePicker!!.date!!.expression()}`?

For responses, add the following templates in **Single Value Message**:
1. Branch: Your reservation has been made. We'll see you at `${timePicker!!.time!!.expression()}` on `${datePicker!!.date!!.expression()}`. You can check the reservation under your ID: `${userIdentifier?.userId}`.
2. Default: Sorry, the table you want to book is not available at present. You may change to another time or date, and try it again.

When all is done, be sure to [view all the changes](../reference/platform/versioncontrol.md#review-changes) and **merge them into the master**.

::tada:: Congratulations! You've built up a reservation module.