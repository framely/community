---
article: true
date: 2023-03-02

image:
    - blog/banner/tutorial_reservation_module.png
description:
    - We show you the way to build a reservation module step by step
author: Sunny May
---

# How to build a reservation module
<!--添加和 quickstart 中的对照，build simple moudle 创建的是 base module，这里要创建的是 composite module, 前者要定义 service，后者要使用 service. 除此之外，这里还涉及了 slot filling 的annotation
You will lean how to use the generic functions interfaces to build your own CUI.
-->

This guide shows you how to build a module under the [reservation CUI design](./reservation-cui-design.md). Since [reservation APIs](../reference/plugins/services/reservation/reservation-api.md) offer service interfaces that cover typical booking scenarios, we will use these APIs to create a reservation system in a specific domain, such as table reservations.

The table reservation module is intended to help users to book, view or cancel reservation for specific dates and times with a set number of guests.  Its reusable nature allows builders to customize the table reservation service within their chatbots. For instance, builders can configure their own table types and capacities that fit their specific restaurant.

We will take [making a reservation](./reservation-cui-design.md#make-a-reservation) as an example to show you the steps to build a module. To know how the last two services are built, you can check the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/type) to learn more information.

## Before you start
1. [Sign up](./../guide/signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
2. We assume that you are already familiar with the procedures on the platform. If not, we recommend that you read the [Quickstart guide](../guide/index.md) first.

## Create module: tableReservation
To begin with, create a module and fill out the creating-project form following these settings:
- **Project label**: enter `tableReservation`.
- **Template**: select **LibraryWithCore**. We need to use types from io.opencui.core libraray, this template imported that library.
- **Languages**: add **English(en)**.
- **Enable service interface**: turn this toggle off. We will reuse existing service, so there is no service needed to be declared in this module.

## Import the service
In order to use functions declared in the reservation APIs, you need to import that service first.
1. Enter the [reservation module](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema) where the service is declared and import it into the `tableReservation` module you just created.

## Create local types for the service
Based on the service, you may need to create some local types which are decided by your own business logic. For example, some services provide abstract types, so business can create their own types inheriting those interfaces. On one hand, these local types inherit the features of the parent types, on the other hand, you can add other features to these types. Moreover, your business may require extra processing of the return data which needs a new type to describe its schema.

### Build frame: Table
According to the description of [Resource](../reference/plugins/services/reservation/reservation-api.md#resource) type from reservation APIs, it's an abstract type which means you can create resource,  inherit this type and add features based on your own business. In this guide, it's about table reservation business, so the resource we're talking about here is table. Apart from those existing properties in the **Resource** type, your table resource should also have its own property like capacity, which represents how many guests this table can hold.

#### Schema layer: declare a frame
At this layer, you will create a "Table" frame to represent that resource, inherit **Resource** frame and add its own property as a slot.

##### Create the frame
Inside the `tableReservation` module
1. Create a frame labeled as `Table`.
2. Inside the `Table` frame, inherit `services.opencui.reservation.Resource`.

   ![inherit](/images/blog/tutorial-build-reservation/inherit.png)

##### Add slots
Then add a slot of type **kotlin.Int** with the label `capacity` . This feature shows the maximum number of guests that the table seats.

#### Annotate type: Table
Since this type does not need to be exposed conversationally, there is no need to add dialog annotation.

## Build CUI for the service
Based on the given service interfaces, you need to figure out how to use them to build CUI for your service. On OpenCUI, you will use skills to build CUI. Before you create a skill, based on the reservation APIs and your CUI design, determine which slots should be added to this skill.

### Build skill: MakeReservation
According to the slots mentioned in the [make a reservation](./reservation-cui-design.md#make-a-reservation) and [makeReservation](../reference/plugins/services/reservation/reservation-api.md#makereservation) functions and [listResource](../reference/plugins/services/reservation/reservation-api.md#listresource) functions, the following info is needed.
- `userIdentifier`: A unique identifier for the user making the reservation.
- `location`: The specified place that owns resources. Here, it should be the location of your restaurant.
- `resourceType`: The type of the resource. Here, it should be "table".
- `duration`: The resource duration of the reservation. 
- `number`: The number of guests attending the reservation.
- `date`: The date of the reservation.
- `time`: The time of the reservation.

In this module, we follow such a **rule**: the number of guests determines which capacity of the table the user books. If the number of guests is 2 and there is a table of which capacity is 2, no matter whether that table is available, the user isn't allowed to book any table of which capacity is more than 2.

#### Schema layer: declare a skill
To create a skill for help users to make reservations, you need to create the type, add the necessary slots, and define functions needed by CUI.

##### Create the skill
Inside the `tableReservation` module and **Types** page, under the **Structure** view.
1. Create a skill labeled as `MakeReservation`.

##### Add slots
To prompt a user for a specific day, use the [DatePicker](../reference/plugins/components/datepicker/README.md) frame. Before proceeding, ensure that the `components` module exists under the **Dependencies** tab. If it doesn't, import [components module](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the `hours` module first. 

Inside the `MakeReservation` skill and **Schema** tab, under the **Structure** view.
1. In the **Slots** section, add the following slots.
   - Type **Frame / io.opencui.core.user.UserIdentifier** with label `userIdentifier`.
   - Type **Entity / services.opencui.reservation.Location** with label `location`.
   - Type **Entity / services.opencui.reservation.ResourceType** with label `resourceType`.
   - Type **Entity / kotlin.Int** with label `duration`.
   - Type **Entity / kotlin.Int** with label `number`.
   - Type **Frame / io.opencui.components.dataEntry.DatePicker** with label `datePicker`.
   - Type **Frame / io.opencui.components.dataEntry.TimePicker** with label `timePicker`.
2. To access functions, in the **Services** section, select **services.opencui.reservation.IReservation** with the label `reservation` and **Save**.

##### Define functions
Since we use the reservation APIs which is generally defined, we need to add native functions to support the CUI design in our own domain. As the functions are defined in the skill, the function can get access to the slots in this skill directly, without passing them as input parameters.

To support the contextual snippets in [Make a reservation](./reservation-cui-design.md#make-a-reservation) service, add these functions:
1. `filterTables(resourceList:List<Resource>):List<Resource>`
    - Follow the [rule](#build-skill-makereservation) mentioned above to filter the table resources based on the number of people.
2. `isTableAvailable(date:LocalDate?, time: LocalTime?):Boolean`
    - Based on the number of people and the input parameters, check if there is a available table. When an input parameter is null, it means the date/time won't be regarded as a filter.
3. `makeReservation():Boolean`
   - Select a table resource meets the user's requirement and call the **reservation.makeReservation** passing that resource along with other required information to make a reservation.

To define functions:

Inside the `MakeReservation` skill and **Schema** tab, under the **Structure** view. In the **Functions** section, add these functions
1. **filterTables**
   - Function label: `filterTables`
   - Input parameter
      - Type **Frame / services.opencui.reservation.Resource** with label `resourceList`, multi-valued, not null
   - Return type: **Frame / services.opencui.reservation.Resource**, multi-valued, not null
   - Implementation:
      ```kotlin
      // If the resourceList is empty, just return an empty list
      if(resourceList.isEmpty()) return emptyList()
   
      // Get a list of unique capacities in ascending order
      val capacityList = (reservation.listResource(location!!, resourceType!!, null, null, 0) as List<Table>).map{it -> it.capacity!!}.distinct().sorted()
   
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

2. **isTableAvailable**
   - Function label: `isTableAvailable`
   - Input parameter
      - Type **Entity / java.time.LocalDate** with label `date`, nullable
      - Type **Entity / java.time.LocalTime** with label `time`, nullable
   - Return Type: **kotlin.Boolean**, not null
   - Implementation:
     ```kotlin
     return if (date == null){ 
        filterTables(reservation.listResource(location!!, resourceType!!, null, null, duration!!)).isNotEmpty()
      } else if (date != null && time == null){ 
        filterTables(reservation.listResource(location!!, resourceType!!, date, null, duration!!)).isNotEmpty()
      } else{ 
        filterTables(reservation.listResource(location!!, resourceType!!, date, time, duration!!)).isNotEmpty()
      }
     ```

3. **makeReservation**
   - Function label: `makeReservation`
   - Input parameter: N/A
   - Return Type: **kotlin.Boolean**, not null
   - Implementation:
     ```kotlin
     // Get available tables resource
     val availableResources = filterTables(reservation.listResource(location!!, resourceType!!, datePicker!!.date!!, timePicker!!.time!!, duration!!))
    
     // Make a reservation if there is an available table
     return if (availableResources.isNotEmpty()){
        reservation.makeReservation(userIdentifier!!.userId!!, datePicker!!.date!!, timePicker!!.time!!, duration!!, availableResources.first()) != null
     } else{
        false
     } 
     ```

#### Annotate type: MakeReservation
OpenCUI provides [dialog annotations](../reference/annotations/overview) to define how the chatbot interacts with users, and [responses](../reference/glossary.md#response) to display the result. In this section, you add dialog annotations and responses to the **MakeReservation** skill.

Before you start, here are some assumptions about this business:
1. There is only one location for this restaurant.
2. For table reservation, the type of resource should be "table".
3. There is only one duration among all the resources.
  
Under the above assumptions, location, resource type, and duration can be given by the business.

During the slot filling process, the following dialog annotations will be used.

1. [Fill Strategy](../reference/annotations/fillstrategy.md): for the slots filled by the business, their fill strategy should be Direct Fill. For the slots filled by the user, just follow the default fill strategy (Always Ask). Here is what fill strategy each slot should follow:
    - Direct Fill: **location** slot, **resourceType** slot and **duration** slot.
    - Always Ask: **number** slot, **datePicker** slot and **timePicker** slot.
2. [Initialization](../reference/annotations/init.md): when a slot is filled by the business, you can use initialization to provide a value for this slot. Here are the initial values for each slot:
   - **location** slot:  the first value in the return list from [listLocation](../reference/plugins/services/reservation/reservation-api.md#listlocation).
   - **resourceType** slot: "table" with the right type.
   - **duration** slot: the first duration of the first value in the return list from [listResource](../reference/plugins/services/reservation/reservation-api.md#listresource).

3. [Value Check](../reference/annotations/valuecheck.md): when a slot value is provided by the user, you can use value check to validate this value. In this guide, following the default recovering strategy would be fine. Here are the rules that make each slot valid:
   - **number** slot: there is at least one table which can seat this number of people.
   - **datePicker** slot: there is at least one table under the restrictions provided by business and the values (number and date) provided by the user.
   - **timePicker** slot: there is at least one table under the restrictions provided by business and the values (number, date and time) provided by the user.
   
4. [Confirmation](../reference/annotations/confirmation.md): when the user has provided all the values needed, you can ask the user to confirm their choice.

Now, add the following dialog annotations to the **MakeReservation** skill:

##### Add slot level annotations
1. **`location` slot:**
   - Fill strategy: Direct fill
   - Initialization with the following Association:
      ```kotlin
      reservation.listLocation().first()
      ```

2. **`resourceType` slot:**
   - Fill strategy: Direct fill
   - Initialization with the following Association:
      ```kotlin
      services.opencui.reservation.ResourceType("table")
      ```

3. **`duration` slot:**
   - Fill strategy: Direct fill
   - Initialization with the following Association:
      ```kotlin
      reservation.listResource(location!!, resourceType!!, null, null, 0).first()!!.durations!!.first()
      ```

4. **`number` slot:**
   - Fill strategy: Always ask
   - Value check with the following Condition:
     ```kotlin
     filterTables(reservation.listResource(location!!, resourceType!!, null, null, duration!!)).isNotEmpty()
     ```
   - Names: number of people
   - Prompt: How many people will you need the reservation for?
   - Value check template : 
     ```kotlin
     - There is no available table for `${number}` people, please choose another number.
     ```

5. **`datePicker` slot:**
   - Fill strategy: Always Ask
   - Value check with the following Condition:
     ```kotlin
     filterTables(reservation.listResource(location!!, resourceType!!, datePicker!!.date!!, null, duration!!)).isNotEmpty()
     ```
   - Names: date
   - Prompt: Which day will you be joining us on?
   - Value check template :
     ```kotlin
     There is no available table for `${number}` on `${datePicker!!.date!!.expression()}`, please choose another date.
     ```
  
6. **`timePicker` slot:**
   - Fill strategy: Always Ask
   - Value check with the following Condition:
     ```kotlin
     filterTables(reservation.listResource(location!!, resourceType!!, datePicker!!.date!!, timePicker!!.time!!, duration!!)).isNotEmpty()
     ```
   - Names: time
   - Prompt: What time would you like the reservation for?
   - Value check template :
     ```kotlin
     There is no available table for `${number}` at `${timePicker!!.time!!.expression()}` on `${datePicker!!.date!!.expression()}`, please choose another time.
     ```

##### Add type level annotations
- Confirmation with the following Condition:
  ```kotlin
  number != null && datePicker!!.date != null && timePicker!!.time != null 
  ```
- Confirmation template :
  ```kotlin
  Are you sure to book a table for `${number}` at `${timePicker!!.time!!.expression()}` on `${datePicker!!.date!!.expression()}`?
  ```
- Expressions
  - I want to book a table
  - I want to book a table `$datePicker$`
  - I want to book a table at `$timePicker$`
  - I want to book a table for `$number$`

::: warning Attention
Do **NOT** copy and paste the value wrapped by `$`, please type the value instead.
:::

#### Configure response
When a user has provided all the information needed to make a reservation, the chatbot should inform the user whether the reservation has been made successfully.

##### Define branch: InformFailure
Turn on **Branches** and add **Single Value Message** actions in the branches.
- The condition of the branch:
  ```kotlin
  makeReservation() == false
  ```
- Single Value Message:
  ```kotlin
  Sorry, the table you want to book is not available at present. You may change to another time or date, and try it again.
  ```

##### Default branch
In the **Default branch** section, add **Single Value Message** actions, and add this template:
```kotlin
Your reservation has been made. We'll see you at `${timePicker!!.time!!.expression()}` on `${datePicker!!.date!!.expression()}`. You can check the reservation under your ID: `${userIdentifier?.userId}`.
```

When all is done, be sure to [view all the changes](../reference/platform/versioncontrol.md#review-changes) and **merge them into the master**.

::tada:: Congratulations! You've built up a reservation module.