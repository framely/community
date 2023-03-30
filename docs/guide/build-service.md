# Build a service

This guide shows you how to build a service using a module and a Postgrest provider. A service defines a set of function interfaces that specify how business functionalities can be accessed. With a service, a chatbot can access your business logic by invoking suitable functions. In this way, CUI product managers can focus on declaring the desired interaction logic and don't need to worry about how the service is built.

In the previous guide: [Reuse a module](./use-hours.md), you build a chatbot based on the service of [hours](https://build.opencui.io/org/me.quickstart/agent/hours/en/service_schema). In this guide, you will build this service by yourself. First, define the service of hours which provides business hours on a specific day or in a week. Second, build a provider like [hoursProvider](https://build.opencui.io/org/me.quickstart/agent/hoursProvider/struct/service_schema) to describe how business hours are stored in the database and implement the service.

## Before you start

[Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).

## Define a service

A service is defined in a module. To begin with, you need to create a module first. Then, you can prepare the types needed in the function interfaces, and add function interfaces with those types.

### Create a module
1. Within an org, click **Create** on the right side and select **Create module**.
2. In a pop-up window, enter _hours_ in the **Project label** field and **Enable service interface**. Leave the **Languages** field empty cause the service is language-independent. Once done, click **Save**.

   ::: thumbnail
   ![create a module](/images/guide/build-service/create-module.png)
   :::

### Create a frame
To provide business hours in a week or on a specific day, the following information is needed:
- **dayOfWeek**: the day of the week, like Monday, Tuesday, etc.
- **ifOpen**: whether it's open on that day.
- **openingTime**: the time it opens.
- **closingTime**: the time it closes.

To cover the above information, you should create a frame. A [frame](./concepts.md#frames) is a composite data type in OpenCUI so these four factors can be composited into a frame as four slots.

To create a frame:
1. In the module you created, go to **Types** page, click **Create** on the right side, and select **Create frame**.
2. Enter _BusinessHours_ as the frame label.
3. In the **Slots** section, click **Add slot** and select **Entity** > **java.time.DayOfWeek**.
4. Inside the entity, change the **Fill Strategy** to **Direct Fill**, and click **<** to go back to the frame page.

   ::: thumbnail
   ![change fill strategy](/images/guide/build-service/change-fill-strategy.png)
   :::

5. In the **Slots** section, click **Add slot** and select **Entity** > **kotlin.Boolean**.
6. Change the slot label to _ifOpen_ and **Fill Strategy** to **Direct Fill**.

   ::: thumbnail
   ![change slot label](/images/guide/build-service/change-slot-label.png)
   :::

7. Follow the same steps to add the last two slots (For each slot, change **Fill Strategy** to **Direct Fill**):
   - Slot _openingTime_ with type **java.time.LocalTime**
   - Slot _closingTime_ with type **java.time.LocalTime**
   
Once finished, the frame should look like this:

::: thumbnail
![show frame BusinessHours](/images/guide/build-service/show-frame.png)
:::

### Add function interfaces
To return business hours on a specific day and in a week, you need to create two function interfaces:
1. **getHoursDay**(date:java.time.LocalDate):BusinessHours
2. **getHoursWeek**():List\<BusinessHours\>

To create function interfaces:
1. In the module you created, go to **Service** page. In the **Functions** section, click **Add**.
   - Enter _getHoursDay_ as the **Function label**.
   - In the **Parameters** section, click **+** to add an input parameter. Enter _date_ as a **Name** and select **Entity** > **java.time.LocalDate** as **Type**.
   - In the **Return type** section, select **Frame** > **BusinessHours** as **Type** and turn off **Nullable**.
   - Click **Save**.

2. In the **Functions** section, click **Add**.
   - Enter _getHoursWeek_ as the **Function label**.
   - In the **Return type** section, select **Frame** > **BusinessHours** as **Type**. Turn on **Multi-value**d and turn off **Nullable**.
   - Click **Save**.

Once finished, the function interfaces should look like this:

::: thumbnail
![show functions](/images/guide/build-service/show-functions.png)
:::

Now that you have finished defining a service. You can [view your changes](../reference/platform/versioncontrol.md#view-your-changes) and merge your branch into the master.


## Build a provider

After you define a service, in order to make it work, you should implement the service in a provider. In this example, you will use an OpenCUI-hosted provider: [Postgrest provider](../reference/providers/postgrest.md) which allows you to define the table structures in the database and store business hours in the database by backoffice.

### Import the module
1. First, make sure you have a target project to import the module to. You can use an existing Postgrest provider, or create a new one.
2. Enter the module where you [defined the service](#define-a-service) and [import](../reference/platform/reusability.md#import-1) this module to the target project.

### Define tables
There are two things that should be stored in the database: business hours and the time zone of your business. When providing business hours in a week, you need to start from the current date. To get the right current date, the time zone of the business is important.

To store business hours and a time zone, use [storage-enable frames](../reference/providers/postgrest.md#create-database-tables). A frame represents a table, and slots in this frame represent the table columns:
  - Frame label specifies the names of the table.
  - Slot label specifies the names of the columns in the table.
  - SQL data type specifies the type of data the column can hold.

To define tables:
1. Enter the provider that imported the hours service.
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
1. Turn off [Allow null](../reference/providers/postgrest.md#allow-null) for these slots: **dayOfWeek**, **ifOpen** and **timeZone**.
2. Switch the [Input type](../reference/providers/postgrest.md#input-type) to **Dropdown** for **dayOfWeek**, and add this JSON array:
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

Take the slot **dayOfWeek** as an example and the annotations of it should look like this:

::: thumbnail
![dayOfWeek annotations](/images/guide/build-service/dayofweek-annotation.png)
:::

### Implement the service
Finally, after the tables are ready, you can implement the service now.
1. Enter the provider that imported the hours service.
2. Go to the **Service** page, in the **Functions** section, click function **getHoursDay**.
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

4. In the **Functions** section, click function **getHoursWeek**
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

::tada:: Congratulations! You have finished building a service. You can [view your changes](../reference/platform/versioncontrol.md#view-your-changes) and merge your branch into the master. In the next step, you can [access backoffice](../reference/providers/postgrest.md#access-backoffice) to add data for testing and use [function console](../reference/providers/postgrest.md#function-console) to test this provider.
