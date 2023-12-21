# Build an hours provider
On OpenCUI, a provider serves as a backend stub to the actual backend implementation of the service. Most providers are external, meaning that the backend is developed and deployed elsewhere as a related but separate effort. However, the PostgreSQL provider is hosted on OpenCUI. It allows you to use PostgreSQL as a data storage and implement API functions using SQL on the OpenCUI platform. OpenCUI will make these functions available to your chatbot and back office via RESTful APIs.

On OpenCUI, you can declare a frame as basis for table, and add storage annotation to this type so that OpenCUI knows how you want to create table based on this frame. You can use backoffice annotation to control how data are manipulated in backoffice. Furthermore, you can implement functions using SQL, and OpenCUI will turn them into stored procedures and expose them via RESTful automatically. Let's see how we can build a PostgreSQL provider.

In the previous guide, you learned how to use a cloned PostgreSQL provider in conjunction with "hour" module to answer questions on business hours. In this guide, we will show you how to develop such a backend for that service using a PostgreSQL provider.

## Before you start

- Log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./build-simple-chatbot.md) for how to build a skill with entity slots.
- [Reuse a full-stack module](./reuse-component.md) to get familiar with the functionality we try to build here.

## Create provider: hoursProvider
You can create a provider under any organization, following these steps:
1. Within an organization, in the upper right corner of the project area, click **Create** and select **Create provider**.
2. In the pop-up window, complete the form for chatbot basic settings and click **Create**. For this provider, you only need to fill in the following fields:
   - **Project label**: the unique identifier for the chatbot. Type a short, memorable label for your chatbot. We suggest using a lowercase label. For example, `hoursProvider`.
   - **Region**: where you want to deploy this chatbot. Ideally, it should be close to your users.

Keep the **Provider type** to be PostgreSQL, and **Deploy mode** to be OpenCUI-hosted per default.

## Import the service
To implement a service, you need definitions for all types required by that service. This can be done by importing the module where the service is defined. Here are the steps to follow:
- Enter the [hours module](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema) where the service is declared, and **Import** it into the provider you just created.

## Create local types
Sometimes, to simplify development, you may need intermediate functions. This, along with other reasons, may require defining additional types. However, for the service you want to implement here, this is not necessary, so we can skip this step.

## Build tables
With the PostgreSQL provider, you can define a table schema by adding storage annotations to a data type. Generally, a frame will map to a table, with its slots mapping to the corresponding table columns. The frame label specifies the name of the table, while the slot label specifies the name of the column in the table. The SQL data type specifies the type of data that the column can hold. These annotations help OpenCUI automatically create a mapping between the database and Kotlin code. OpenCUI will create tables based on the type definition and storage annotations in a separate database for your organization. Additionally, you should add backoffice annotations to define how the corresponding column should be displayed and manipulated in the backoffice.

### Build frame: Hours
Since most businesses have consistent operating hours from week to week, it is enough to record whether the business is open on each day of the week, along with its respective opening and closing times. These, along with hours for special dates such as holidays, should be stored in a table.

To effectively encode business hours, the following columns are necessary:
- `dayOfWeek`: The day of the week.
- `ifOpen`: Whether the business is open on that day.
- `openingTime`: The time when the business opens on that day. Required when **ifOpen** is true.
- `closingTime`: The time when the business closes on that day. Required when **ifOpen** is true.
- `specialDate`: The date that deviates from the standard business hours. Required when setting a special date, like a holiday or other special event.

To define this table, you will build an `Hours` frame with slots corresponding to the above columns.

#### Schema layer: declare a frame
To create a table for storing business hours data, you will first create an `Hours` frame and enable storage. Then, you will add corresponding slots to the frame, where the slot type specifies the column type.

##### Create the frame
Inside the **target provider** with the hours module already imported and **Types** page.

1. Click **Create** button on the right side, and select **Create frame**.
2. Enter `Hours` as a label for the frame type and press enter.
3. Inside the `Hours` frame, turn on **Storage enabled**.

   ![enable storage](/images/guide/build-service/enable-storage.png)

##### Add slots
Inside the `Hours` frame and **Schema** tab.
- In the **Slots** section, add the following slots:
  - Type **java.time.DayOfWeek** with label `dayOfWeek`.
  - Type **kotlin.Boolean** with label `ifOpen`.
  - Type **java.time.LocalTime** with label `openingTime`.
  - Type **java.time.LocalTime** with label `closingTime`.
  - Type **java.time.LocalDate** with label `specialDate`.

#### Annotate type: Hours
Based on the [columns description](#build-frame-hours) provided, it's important to note that the `dayOfWeek` and `ifOpen` columns should not be left empty. Additionally, since there are only seven days of the week, you need to apply constraints to ensure that the `dayOfWeek` column accepts valid input.

Backend annotations can optimize frames with storage enabled. To ensure completeness of data, turn off **Allow null** for columns that should not be empty. In addition, you can use the **Dropdown** input type to restrict columns to only accept specific options.

##### Add slot level annotations to dayOfWeek
Inside the `Hours/dayOfWeek` slot and **Annotation** tab.
1. Turn off **Allow null**.
2. Switch the **Input type** to **Dropdown**, and add the following JSON array:
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

![dayOfWeek annotations](/images/guide/build-service/dayofweek-annotation.png)

##### Add slot level annotation to ifOpen
Inside the `Hours/ifOpen` slot and **Annotation** tab.
- Turn off **Allow null**.

## Implement the service
Finally, after the tables are ready, you can provide implementation for each function defined in the service. You can do this on the OpenCUI platform using [PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html) or native Kotlin code.

Inside the **target provider** with the hours module already imported and **Service** page.

- In the **Functions** section, click into `getHoursDay` function.
   1. Make sure the implementation is **Provider dependent**.
   2. Add **Implementation** and **Save**. This function will return the business hour for the specific date, so the implementation can be like this:
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

- In the **Functions** section, click into `getHoursWeek` function.
   1. Select **Kotlin** as the **Implementation**.
   2. Add **Implementation** and **Save**. This function will get the business hours for the week, so the implementation can be like this:
      ```kotlin
      val currentDate = java.time.ZonedDateTime.now().toLocalDate()
      var hoursList = mutableListOf<BusinessHours>()
     
      for(i in 0..6){
         var date = currentDate.plusDays(i.toLong())
         hoursList.add(getHoursDay(date))
      }
     
      return hoursList
      ```

After you have finished building a PostgREST provide, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [review changes and merge them into the master](./opencui-flow.md#review-and-merge-pull-request). In the next step, you can use backoffice to add data and use [function console](../providers/postgrest.md#function-console) to test the functions you just implemented.
