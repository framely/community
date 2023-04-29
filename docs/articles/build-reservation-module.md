---
article: true
date: 2023-03-02

image:
    - blog/banner/tutorial_reservation_module.png
description:
    - We show you the way to build a reservation module step by step
author: Sunny May
---

# Build a reservation module
In the previous guide on [build an hours module](../guide/build-module.md), we showed you how to declare a service and build a conversational user interface (CUI) in a module. In this guide, we'll demonstrate how to build CUI for a specific use case, table reservation in particular, on top of a predefined [generic reservation service](../reference/plugins/services/reservation/reservation-api.md).

As the [reservation APIs](../reference/plugins/services/reservation/reservation-api.md) offer service that covers typical booking scenarios, we will utilize this service to create a reservation system in a specific domain, such as table reservations.

The table reservation module assists users in booking, viewing, or canceling reservations for specific dates and times with a specific number of guests. Its reusable nature enables builders to customize the table reservation service within their chatbots. For instance, builders can configure their own table types and capacities that fit their specific restaurant. You can learn more details in [how to reuse a reservation module to build chatbot](./reuse-reservation-module.md).

This guide will use "[making a reservation](./reservation-cui-design.md#make-a-reservation)" as an example to demonstrate the steps to build a module. For information on building the last two services, refer to the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/type) to learn more information.

## Before you start
1. [Sign up](./../guide/signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
2. If you're not yet familiar with the platform procedures, we recommend reading the [Quickstart guide](../guide/index.md) before proceeding.

## Create module: tableReservation
To create a module, fill out the project creation form with the following settings:
- **Project label**: Enter `tableReservation`.
- **Template**: Select **LibraryWithCore**. This template has already imported the necessary types from the `io.opencui.core` library.
- **Languages**: Add **English(en)**.
- **Enable service interface**: Turn this toggle off. We won't need to declare a new service for this module as we'll be reusing an existing one.

## Import the service
To use functions declared in the reservation APIs, you need to import that service first.
1. Enter the [reservation module](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema) where the service is declared and import it into the `tableReservation` module you just created.

## Prepare types for the service
Based on the service, you may need to create local types based on your business logic. For example, some services provide abstract types, allowing businesses to create their own types that inherit those interfaces. The resulting local types inherit the features of the parent types while also enabling the addition of new features. In addition, your business may require new types to describe return data schema.

### Build frame: Table
For our table reservation business, we'll be creating a resource type named `Table`. This resource will represent a table, and in addition to the existing properties in the [Resource](../reference/plugins/services/reservation/reservation-api.md#resource) type provided by the reservation APIs, each table resource should also have its own property representing capacity – the number of guests it can hold.

#### Schema layer: declare a frame
At this layer, you will create a "Table" frame to represent that resource, inherit **Resource** frame and add its own property as a slot.

##### Create the frame
Inside the `tableReservation` module
1. Create a frame labeled `Table`.
2. Inside the `Table` frame, inherit `services.opencui.reservation.Resource`.

   ![inherit](/images/blog/tutorial-build-reservation/inherit.png)

##### Add slots
Next, add a slot of type **kotlin.Int** with the label `capacity`, representing the maximum number of guests that the table can seat.

#### Annotate type: Table
Since this type doesn't need to be exposed conversationally, there's no need to add dialog annotation.

## Build CUI for the service
On OpenCUI, skills are used to build CUI. Before creating a skill, determine which slots to add to it based on the reservation APIs and the CUI design.

### Build skill: MakeReservation
Based on the slots mentioned in the [make a reservation](./reservation-cui-design.md#make-a-reservation) function and [makeReservation](../reference/plugins/services/reservation/reservation-api.md#makereservation) and [listResource](../reference/plugins/services/reservation/reservation-api.md#listresource) functions, the following information is required.
- `userIdentifier`: A unique identifier for the user making the reservation.
- `location`: The specified place that owns resources. Here, it should be the location of your restaurant.
- `resourceType`: The type of the resource. Here, it should be "table".
- `duration`: The resource duration of the reservation. 
- `number`: The number of guests attending the reservation.
- `date`: The date of the reservation.
- `time`: The time of the reservation.

For this module, the following rule applies: the number of guests determines which capacity of the table the user can book. If the number of guests is 2 and there is a table with a capacity of 2, then the user cannot book any table with a capacity greater than 2.

#### Schema layer: declare a skill
To create a skill that helps users make reservations, you need to create the type, add the necessary slots, and define functions needed by the CUI.

##### Create the skill
Inside the `tableReservation` module and **Types** page, under the **Structure** view.
1. Create a skill labeled as `MakeReservation`.

##### Add slots
To prompt a user for a specific day, use the [DatePicker](../reference/plugins/components/datepicker/README.md) frame. Ensure that the `components` module exists under the **Dependencies** tab before proceeding. If it does not, import the [components module](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the `tableReservation` module first. 

Inside the `MakeReservation` skill and **Schema** tab, under the **Structure** view.
1. In the **Slots** section, add the following slots:
   - Type **Frame / io.opencui.core.user.UserIdentifier** with label `userIdentifier`.
   - Type **Entity / services.opencui.reservation.Location** with label `location`.
   - Type **Entity / services.opencui.reservation.ResourceType** with label `resourceType`.
   - Type **Entity / kotlin.Int** with label `duration`.
   - Type **Entity / kotlin.Int** with label `number`.
   - Type **Frame / io.opencui.components.dataEntry.DatePicker** with label `datePicker`.
   - Type **Frame / io.opencui.components.dataEntry.TimePicker** with label `timePicker`.
2. In the **Services** section, select **services.opencui.reservation.IReservation** with the label `reservation` to access functions, then click **Save**.

##### Define functions
Since we use the predefined reservation APIs, we need to add native functions to support the CUI design in our own domain. These functions are defined within the skill, allowing them to access the slots in this skill directly, without passing them as input parameters.

To support the contextual snippets in [Make a reservation](./reservation-cui-design.md#make-a-reservation) service, add these functions:
1. `filterTables(resourceList:List<Resource>):List<Resource>`
    - Filter the table resources based on the number of people according to the [rule](#build-skill-makereservation) mentioned above.
2. `isTableAvailable(date:LocalDate?, time: LocalTime?):Boolean`
    - Check if there is an available table based on the number of people and the input parameters. If an input parameter for date or time is null, the function will not use it as a filter when checking table availability.
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
To define how the chatbot interacts with users and displays results, OpenCUI provides dialog annotations. In this section, you will add dialog annotations the MakeReservation skill.

Before you start, here are some assumptions about this business:
1. There is only one location for this restaurant.
2. For table reservation, the type of resource should be "table".
3. There is only one duration among all the resources.

Given these assumptions, the business can provide the location, resource type, and duration for the reservation process.

During the slot filling process, the following dialog annotations will be used.

1. [Fill strategy](../reference/annotations/fillstrategy.md): The fill strategy for each slot depends on who fills it. The slots filled by the business should have a direct fill strategy, while the slots filled by the user should follow the default always ask strategy. Here are the fill strategies for each slot:
    - Direct fill: `location` slot, `resourceType` slot and `duration` slot.
    - Always ask: `number` slot, `datePicker` slot and `timePicker` slot.
2. [Initialization](../reference/annotations/init.md): When the business fills a slot, you can use initialization to provide a value for that slot. Here are the initial values for each slot:
   - `location`: The first value in the list returned by [listLocation](../reference/plugins/services/reservation/reservation-api.md#listlocation).
   - `resourceType`: "table" with the right type.
   - `duration`: The first duration of the first value in the list returned by [listResource](../reference/plugins/services/reservation/reservation-api.md#listresource).

3. [Value check](../reference/annotations/valuecheck.md): When the user provides a slot value, you can use value check to validate it. For this guide, following the default recovery strategy is sufficient. Here are the rules for each slot to be considered valid:
   - `number`: There is at least one table that can seat the requested number of guests.
   - `datePicker`: There is at least one table available within the business's restrictions and the values (number and date) provided by the user.
   - `timePicker`: There is at least one table available within the business's restrictions and the values (number, date, and time) provided by the user.
   
4. [Confirmation](../reference/annotations/confirmation.md): Once the user has provided all required values, you can ask them to confirm their choices.

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
Once the user has provided all necessary information for a reservation, the chatbot should inform the user whether the reservation has been made successfully. To do this, we will define two branches and configure their respective responses.

##### Define branch: InformFailure
1. Turn on **Branches** and add a branch labeled `InformFailure`.
2. Inside the `InformFailure` branch, add a **Single Value Message** action. Configure this action as follows:
   - The condition of the branch:
     ```kotlin
     makeReservation() == false
     ```
   - Single Value Message:
     ```kotlin
     Sorry, the table you want to book is currently unavailable. You may change to another time or date, and try it again.
     ```

##### Default branch
In the **Default branch** section, add a **Single Value Message** action, and add this template:
```kotlin
Your reservation has been made! We'll see you at `${timePicker!!.time!!.expression()}` on `${datePicker!!.date!!.expression()}`. You can check your reservation under your ID: `${userIdentifier?.userId}`.
```

::tada:: Congratulations! You've built up a reservation module.