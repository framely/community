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
In the previous guide on [build an hours module](../reference/guide/build-module.md), we showed you how to declare a service and build a conversational user interface (CUI) in the same module. In this guide, we'll demonstrate how to build CUI on top of a predefined [generic reservation service](./reservation/reservation-api).

The table reservation module assists users in booking, viewing, or canceling reservations in a restaurant setting. This guide will only implement "[making a reservation](./reservation-cui-design.md#make-a-reservation)" as an example. Exposing viewing and canceling reservations should be similar, and you can check the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/type) to see how it is done.

## Before you start
1. Log in to [OpenCUI](https://build.opencui.io/login).
2. It is highly recommended that you follow through the [Quickstart guide](../reference/guide/index).
3. It is useful to go over [reservation cui design](./reservation-cui-design.md)
4. It is useful to go over [adding table reservation functionality](./reuse-reservation-module.md)

## Create module: tableReservation
To create a module, fill out the project creation form with the following settings:
- **Project label**: Enter `tableReservation`.
- **Template**: Select **LibraryWithCore**. This template has already imported the necessary types from the `io.opencui.core` library.
- **Languages**: Add **English(en)**. You are required to add at least one language.
- **Enable service interface**: Turn this toggle off. You won't need to declare a new service for this module as you'll be reusing an existing one.

## Import the service
To use functions declared in the reservation APIs, you need to import that service first.
1. Enter the [reservation module](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema) where the service is declared and import it into the `tableReservation` module you just created.

## Prepare types for the service
It is common practice for APIs to be designed to be as generic as possible so that the same backend can be used for different domains. Typically, these APIs are defined using abstract types that can be customized into different concrete types for different domains.

The reservation API follows this principle by introducing an abstract type called 'Resource' as the return type for a function that returns a list of candidate resources. This type represents things that can be booked ahead of time, such as a hairdresser or table.

Each resource has some read-only properties, such as the capacity of a particular table. These available resources and their properties should be set up in the backend by the operations team. During the booking process, the chatbot needs to find out the user's requirements on resources, such as party size, so that it can pair the users with the resource with properties that match their needs.

### Build frame: Table
For a typical restaurant business, the bookable resource is `Table`. In addition to the existing properties defined in the [Resource](./reservation/reservation-api.md#resource), each table should also have a property representing capacity – the number of guests it can hold. Restaurant defines the number of tables they have as well as how many people can each table fit in the backend.

#### Schema layer: declare a frame
At this layer, you will create a "Table" frame, implements **Resource** frame.

##### Create the frame
Inside the `tableReservation` module
1. Create a frame labeled `Table`.
2. Inside the `Table` frame, inherit `services.opencui.reservation.Resource`.

   ![inherit](/images/blog/tutorial-build-reservation/inherit.png)

##### Add slots
Next, add a slot of **kotlin.Int** type with the label `capacity`, representing the maximum number of guests that the table can seat.

#### Annotate type: Table
Since this type doesn't need to be instantiated conversationally, there's no need to add dialog annotation.

## Build CUI for the service
In OpenCUI, conversational user interfaces are simply a set of dialog annotated types, including skills and their dependent types. Since all the dependent types are already available in the OpenCUI system, you can build the 'make reservation' skill directly.

### Build skill: MakeReservation

To implement the [make a reservation](./reservation-cui-design.md#make-a-reservation) use case, you will use location, resourceType and [listResource](./reservation/reservation-api.md#listresource) function to get a list of resources for user to pick, then [makeReservation](./reservation/reservation-api.md#makereservation) function to make the reservation. So the skill should contain the following slots:
- `userIdentifier`: A unique identifier for the user making the reservation.
- `location`: The specified place that owns resources. Here, it should be the location of your restaurant.
- `resourceType`: The type of the resource since . Here, it should be "table".
- `duration`: The resource duration of the reservation. 
- `number`: The number of guests attending the reservation.
- `date`: The date of the reservation.
- `time`: The time of the reservation.

For this module, you will be handling a simpler case, with the following assumptions:
1. The restaurant exists in only one location.
2. The only resource can be booked for this restaurant is `table`.
3. The duration is fixed for all the tables by restaurant.
4. The number of guests determines which table the user can book (its capacity need to be greater than or equals to the party size). 
 
Note that not all slots are designed for user input; some slots may be implied or supplied by the backend, but they are included as slots to make it easier to use the generic reservation APIs. Based the above assumptions, location, resource type, and duration will be provided by business so no need for user to input.

#### Schema layer: declare a skill 


##### Create the skill
Inside the `tableReservation` module and **Types** page, under the **Structure** view.
1. Create a skill labeled as `MakeReservation`.

##### Add slots
To prompt a user for a specific day, use the [DatePicker](../reference/plugins/components/datepicker/index.md) frame. Ensure that the `components` module exists under the **Dependencies** tab before proceeding. If it does not, import the [components module](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the `tableReservation` module first. 

Inside the `MakeReservation` skill and **Schema** tab, under the **Structure** view.
1. In the **Slots** section, add the following slots:
   - `userIdentifier` of type **Frame / io.opencui.core.user.UserIdentifier**.
   - `location` of type **Entity / services.opencui.reservation.Location**.
   - `resourceType` of type **Entity / services.opencui.reservation.ResourceType**.
   - `duration` of type **Entity / kotlin.Int**.
   - `number` of type **Entity / kotlin.Int**.
   - `datePicker` of type **Frame / io.opencui.components.dataEntry.DatePicker**.
   -  `timePicker` of type **Frame / io.opencui.components.dataEntry.TimePicker**.
2. In the **Services** section, select **services.opencui.reservation.IReservation** with the label `reservation` to access functions, then click **Save**.

##### Define functions
To make it easy to use reservation APIs under table reservation use case, you can add some native helper functions. These functions bind the slots value to service function's input parameters, provide a simpler interface for the skill.

To support the contextual snippets in [Make a reservation](./reservation-cui-design.md#make-a-reservation) service, add these functions:
1. `filterTables(resourceList:List<Resource>):List<Resource>`
    - Filter the table resources based on the number of people based on the assumption mentioned above.
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

During the slot filling process, the following dialog annotations will be used.

1. [Fill strategy](../reference/annotations/fillstrategy.md): The fill strategy for each slot depends on who fills it. The slots filled by the business should have a direct fill strategy, while the slots filled by the user should follow the default always ask strategy. Here are the fill strategies for each slot:
    - Direct fill: `location` slot, `resourceType` slot and `duration` slot.
    - Always ask: `number` slot, `datePicker` slot and `timePicker` slot.
2. [Initialization](../reference/annotations/init.md): When the business fills a slot, you can use initialization to provide a value for that slot. Here are the initial values for each slot:
   - `location`: The first value in the list returned by [listLocation](./reservation/reservation-api.md#listlocation).
   - `resourceType`: "table" with the right type.
   - `duration`: The first duration of the first value in the list returned by [listResource](./reservation/reservation-api.md#listresource).

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
Once the user has provided all necessary information for a reservation, the chatbot should inform the user whether the reservation has been made successfully. To do this, you will define two branches and configure their respective responses.

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
