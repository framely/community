# Build a simple provider

On OpenCUI, a provider serves as a backend stub to actual backend implementation of the service. Most providers are external, meaning the backend is developed and deployed elsewhere in related but separated effort. However, there is an OpenCUI-hosted provider called [PostgREST provider](../reference/providers/postgrest.md), which allows you to use PostgreSQL as data storage and implement API functions using SQL on OpenCUI platform. OpenCUI will make these functions available to your chatbot and back office through a RESTful gateway called PostgREST.

To develop a backend using a database and expose functionalities through RESTful APIs, we need to address several issues conceptually:
- At the schema level, we need to determine the necessary tables, their schemas, and types for each column. We may also need to define PostgreSQL composite types as return types for SQL functions.
- At the business logic level, we need to decide on the functionalities we want to expose and determine how to implement them.
- On the admin side, we need to consider how the owner can manipulate the data hosted in the database, including typical CRUD operations.

On OpenCUI, you can declare a frame, or build-defined composite type as basis for table, and add storage annotation to this type so that OpenCUI knows how you want to create table. You can use backoffice annotation to control how data are manipulated in admin tool. Furthermore, you can implement functions using SQL, and OpenCUI will turn them into stored procedures and expose them via RESTful automatically. Let's see how we can build a PostgREST provider.

In the previous guide, we showed you how to build an hours module including declaring a service and building CUI. In this guide, we will show you how to develop a provider for that service using a PostgREST provider.

## Before you start

- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./build-simple-chatbot.md) for how to build a skill with entity slots.
- [Reuse a full-stack module](./reuse-component.md) to get familiar with the functionality we try to build here.

## Import the module for the service
To implement a service, you need to declare all the necessary types for that service. This can be done by importing the module where the service is defined. Here are the steps to follow:
1. First, decide on a target provider. You can use an existing Postgrest provider, or create a new one.
2. Enter the **hours** module where the service is declared and import it into the target provider.

## Create type needed by implementation
Sometimes, to simplify development, you may need intermediate functions. This, along with other reasons, may require defining specific types for implementation. For the service that you want to implement here, it is not the case, so we can skip this step.

## Build tables
With the PostgREST provider, you can define a table schema by adding storage annotations to a data type. This enables OpenCUI to automatically create a mapping between the database and Kotlin code. OpenCUI will create tables based on the type definition and storage annotations in a separate database for your organization. Additionally, you should add backoffice annotations to each slot to define how the corresponding column should be displayed and manipulated in the backoffice.

To store business hours in the database, you can enable storage for frames. After this, a frame will map to a table, with its slots mapping to the corresponding table columns. The frame label specifies the name of the table, while the slot label specifies the name of the column in the table. The SQL data type specifies the type of data that the column can hold.

### Build frame: Hours
To accurately track business hours, it's essential to create a table that records whether the business is open on each day of the week, along with its respective opening and closing times. Since most businesses have consistent operating hours from week to week, it's only necessary to store the business hours for each day of the week. However, in cases where there are deviations from the typical schedule, such as holiday closures, these special dates should also be included in the table.

To effectively represent business hours in a database, the following columns are necessary:
- `dayOfWeek`: The day of the week.
- `ifOpen`: Whether the business is open on that day.
- `openingTime`: The time when the business opens on that day. Required when **ifOpen** is true.
- `closingTime`: The time when the business closes on that day. Required when **ifOpen** is true.
- `specialDate`: The date that deviates from the standard business hours. Required when setting a special date, like a holiday or other special event.

To define this table, you will build an `Hours` frame with slots corresponding to the above columns.

#### Schema layer: declare a frame
To generate a table with columns for business hours data, you will first create an `Hours` frame and enable storage. Then, you will add corresponding slots to the frame, where the slot type specifies the column type.

##### Create the frame
Inside the **target provider** with the hours module already imported and **Types** page.

1. Click **Create** button on the right side, and select **Create frame** to create a new frame.
2. Enter `Hours` as a label for the frame type and press enter.
3. Inside the `Hours` frame, turn on **Storage enabled**.
   ::: thumbnail
   ![enable storage](/images/guide/build-service/enable-storage.png)
   :::

##### Add slots
Inside the `Hours` frame and **Schema** tab.

- In the **Slots** section, add the following slots:
  - `dayOfWeek` with type **java.time.DayOfWeek**
  - `ifOpen` with type **kotlin.Boolean**
  - `openingTime` with type **java.time.LocalTime**
  - `closingTime` with type **java.time.LocalTime**
  - `specialDate` with type **java.time.LocalDate**

#### Annotate type: Hours
Based on the [columns description](#build-frame-hours) provided, it's important to note that the `dayOfWeek` and `ifOpen` columns should not be left empty. Additionally, since there are only seven days of the week, you need to apply constraints to ensure that the `dayOfWeek` column accepts valid input.

Backend annotations can optimize frames with storage enabled. To ensure completeness of data, turn off **Allow null** for columns that should not be empty. In addition, you can use the **Dropdown** input type to restrict columns to only accept specific options.

##### Add slot level annotations to dayOfWeek
Inside the `Hours/dayOfWeek` slot and **Annotation** tab.

1. Turn off **Allow null**.
2. Switch the **Input type** to **Dropdown**, and add this JSON array:
   ```json
   [
    {
     "id": "MONDAY",
     "name": "Monday"
    },
    {
     "id": "TUESDAY",
      "name": "Tuesday"
    },
    {
     "id": "WEDNESDAY",
     "name": "Wedesday"
    },
    {
     "id": "THURSDAY",
     "name": "Thusday"
    },
    {
     "id": "FRIDAY",
     "name": "Friday"
    },
    {
     "id": "SATURDAY",
     "name": "Saturday"
    },
    {
     "id": "SUNDAY",
     "name": "Sunday"
    }
   ]
   ```

When it's done, the `dayOfWeek` slot should look like this:

::: thumbnail
![dayOfWeek annotations](/images/guide/build-service/dayofweek-annotation.png)
:::

##### Add slot level annotation to ifOpen
Inside the `Hours/ifOpen` slot and **Annotation** tab.
1. Turn off **Allow null**.

### Build frame: Configuration
To display business hours for a week, you should start from the current date. To obtain the correct date and time, it's important to store the time zone of your business in a table.

To define this table, you will build a `Configuration` frame that includes a `timeZone` slot. 

#### Schema layer: declare a frame
To generate a table with a column for time zone data, you will first create a `Configuration` frame and enable storage. Then, you will add a `timeZone` slot to the frame, where the slot type specifies the column type.

##### Create the frame
Inside the **target provider** with the hours module already imported and **Types** page.

1. Click **Create** button on the right side, and select **Create frame** to create a new frame.
2. Enter `Configuration` as a label for the frame type and press enter.
3. Inside the `Configuration` frame, turn on **Storage enabled**.

##### Add slots
Inside the `Hours` frame and **Schema** tab.
1. Add a `timeZone` slot with type **java.time.ZoneId**.

#### Annotate type: Configuration
It's important to note that `timeZone` column should not be left empty since time zone data is necessary for accurate business hour display. To enforce this requirement, turn off the **Allow null** for this column.

##### Add slot level annotation to timeZone
Inside the `Configuration/timeZone` slot and **Annotation** tab.
1. Turn off **Allow null**.

## Implement the service
Finally, after the tables are ready, you can provide implementation for each function defined in the service. You can do this on the OpenCUI platform using [PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html) or native Kotlin code.

Inside the **target provider** with the hours module already imported and **Service** page.

1. In the **Functions** section, select `getHoursDay` function.
   - Make sure the implementation is **Provider dependent**.
   - Copy and paste the following code:
     ```sql
     BEGIN
        RETURN QUERY
        SELECT "Hours"."dayOfWeek", "Hours"."ifOpen", "Hours"."openingTime", "Hours"."closingTime" FROM "Hours"
        WHERE
           (CASE
             WHEN (SELECT DISTINCT "Hours"."ifOpen" FROM "Hours" WHERE "specialDate" = date) IS NULL
            THEN "Hours"."dayOfWeek"
            END) = (SELECT EXTRACT(ISODOW FROM date))::text
        OR
           (CASE
               WHEN (SELECT DISTINCT "Hours"."ifOpen" FROM "Hours" WHERE "specialDate" = date) IS NOT NULL
               THEN "specialDate"
            END) = date
        LIMIT 1;
     END    
     ```
    - Click **Save**.

2. To get business hours in a week, the current date needs to be determined first, which means you should get the time zone from the database. To get the time zone, in the **Functions** section, add this function：
   - **Function label**: _getTimeZone_
   - **Return type**: Frame / Configuration
   - **Implementation**: Provider dependent
     ```sql
      BEGIN
         RETURN QUERY
         SELECT "Configuration"."timeZone" FROM "Configuration" LIMIT 1;
      END
      ```
   - Click **Save**.

3. In the **Functions** section, select `getHoursWeek` function.
   - Select **Kotlin** as the **Implementation**.
   - Copy and paste the following code: 
   ```kotlin
   val zoneId = getTimeZone().timeZone!!
   val currentDate = java.time.ZonedDateTime.now(zoneId).toLocalDate()
   var hoursList = mutableListOf<BusinessHours>()
   
   for(i in 0..6){
       var date = currentDate.plusDays(i.toLong())
       hoursList.add(getHoursDay(date))
   }
   
   return hoursList
   ```
   - Click **Save**.

Now that you have finished building a PostgREST provide, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [view it and merge it into the master](./opencui-flow.md#review-and-merge-pull-request). In the next step, you can use backoffice to add data for testing and use [function console](../reference/providers/postgrest.md#function-console) to test the functions that you just implemented.
