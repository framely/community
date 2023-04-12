# Build an hours provider

On OpenCUI, a provider serves as a backend stub to actual backend implementation of the service. Most providers are external, meaning the backend is developed and deployed elsewhere in related but separated effort. However, there is an OpenCUI-hosted provider called [PostgREST provider](../reference/providers/postgrest.md), which allows you to use PostgreSQL as data storage and implement API functions using SQL on OpenCUI platform. OpenCUI will make these functions available to your chatbot and back office through a RESTful gateway called PostgREST.

To develop a backend using a database and expose functionalities through RESTful APIs, we need to address several issues conceptually:
- At the schema level, we need to determine the necessary tables, their schemas, and types for each column. We may also need to define PostgreSQL composite types as return types for SQL functions.
- At the business logic level, we need to decide on the functionalities we want to expose and determine how to implement them.
- On the admin side, we need to consider how the owner can manipulate the data hosted in the database, including typical CRUD operations.

On OpenCUI, you can declare a frame, or user defined composite type as basis for table, and add storage annotation to this type so that OpenCUI knows how you want to create table. You can use backoffice annotation to control how data are manipulated in admin tool. Furthermore, you can implement functions using SQL, and OpenCUI will turn them into stored procedures and expose them via RESTful automatically. Let's see how we can build a PostgREST provider.

In the previous guide, we showed you how to build an hours module including declaring a service and building CUI. In this guide, we will show you how to develop a provider for that service using a PostgREST provider.

## Before you start

- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./build-simple-chatbot.md) for how to build a skill with entity slots.
- [Reuse a full-stack module](./reuse-component.md) to get familiar with the functionality we try to build here.

## Import the module for the service
To implement a service, you need to declare all the necessary types for that service. This can be done by importing the module where the service is defined. Here are the steps to follow:
1. First, decide on a target provider. You can use an existing Postgrest provider, or create a new one.
2. Enter the `hours` module where the service is declared and import it into the target provider.

## Create type needed by implementation 
Sometimes, to simplify development, you may need intermediate functions. This, along with other reasons, may require defining specific types for implementation. For the service that you want to implement here, it is not the case, so we can skip this step.

## Add backend annotations
With the PostgREST provider, you can define a table schema by adding storage annotations to a data type. This enables OpenCUI to automatically create a mapping between the database and Kotlin code. OpenCUI will create tables based on the type definition and storage annotations in a separate database for your organization. Additionally, you should add backoffice annotations to each slot to define how the corresponding column should be displayed and manipulated in the backoffice.

There are two things that should be stored in the database: business hours and the time zone of your business. When displaying business hours for the week, you need to start from the current date. To determine the correct current date, the time zone of the business is important.

To store business hours or a time zone, you can storage-enable frame. After this, a frame will map to a table, with its slots mapping to the corresponding table columns. The frame label specifies the name of the table, while the slot label specifies the name of the column in the table. The SQL data type specifies the type of data that the column can hold. This can be done as follows:
1. Enter the target provider with the `hours` module already imported.
2. Go to the **Types** page to create these two frames and **enable storage** for each of them.
   
Frame: **Hours**

| Slot label   | Slot type            | SQL data type          | Description                                                                                                          | 
|:-------------|:---------------------|:-----------------------|----------------------------------------------------------------------------------------------------------------------|
| dayOfWeek    | java.time.DayOfWeek  | text                   | A day of the week.                                                                                                   |
| ifOpen       | kotlin.Boolean       | boolean                | Whether it's open on that day.                                                                                       |
| openingTime  | java.time.LocalTime  | time without time zone | The time when it opens on that day. <br><br> Required when **ifOpen** is true.                                           |
| closingTime  | java.time.LocalTime  | time without time zone | The time when it closes  on that day. <br><br> Required when **ifOpen** is true.                                         |
| specialDate  | java.time.LocalDate  | date                   | The date that is not covered in the main business hours. <br><br> Required when setting a special date, like a holiday.  |

Frame: **Configuration**

| Slot label | Slot type         | SQL data type          | Description                                                                                                          | 
|:-----------|:------------------|:-----------------------|----------------------------------------------------------------------------------------------------------------------|
| timeZone   | java.time.ZoneId  | text                   |A time zone of business.                                                                                             |

Since there are some columns that can not be empty, and **dayOfWeek** can only be selected in only seven days of the week, the following annotations should be added to set the constraints.
1. Turn off [Allow null](../reference/providers/postgrest.md#allow-null) for these slots: `dayOfWeek`, `ifOpen` and `timeZone`.
2. Switch the [Input type](../reference/providers/postgrest.md#input-type) to **Dropdown** for `dayOfWeek`, and add this JSON array:
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

Take the `dayOfWeek` slot as an example and the annotations of it should look like this:

::: thumbnail
![dayOfWeek annotations](/images/guide/build-service/dayofweek-annotation.png)
:::

## Implement the service
Finally, after the tables are ready, you can provide implementation for each function defined in the service. You can do this on the OpenCUI platform using [PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html) or native Kotlin code.

1. Enter the provider that imported the `hours` module.
2. Go to the **Service** page, in the **Functions** section, select `getHoursDay` function.
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

3. To get business hours in a week, the current date needs to be determined first, which means you should get the time zone from the database. To get the time zone, in the **Functions** section, add this function：
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

4. In the **Functions** section, select `getHoursWeek` function.
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
