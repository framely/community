# Build a full-stack component

In the previous guide, we showed you how to enable your chatbot to field various business hours queries by [reusing an existing component](./use-hours.md). In this guide, we will show you how to build such a full-stack component, including both the module and the corresponding PostgREST provider. 

## Before you start

- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./pingpong.md) for how to build a skill with entity slots.
- [Reuse a full-stack module](./use-hours.md) to get familiar with the functionality we try to build here.

## Build a module
On OpenCUI, to expose a service through a conversational user interface, you need to create a module, declare the service in it and define the conversational user interface on top of the service. 

### Create a module
1. Within an org, click **Create** on the right side and select **Create module**.
2. In a pop-up window, enter _hours_ in the **Project label** field, add **English(en)** in the **Languages** field, and **Enable service interface**. Once done, click **Create**.

### Declare a service
Declaring a service means that you define the function type for each API in the service. However, in order to define these function types, you must first define the data type for their input parameters and return values, which may need to be defined recursively in case one of these data types is composite.

#### Create required type: BusinessHours
For a function returning the business hours on a specific day, the following information is needed:
- **dayOfWeek**: the day of the week, like Monday, Tuesday, etc.
- **ifOpen**: whether it's open on that day.
- **openingTime**: the time it opens.
- **closingTime**: the time it closes.

Before you can declare the function, let's create a [frame](../reference/concepts.md#frames) type for its return type. Since you don't need to create instances of this type through conversations, you just need to declare this at schema level.

To create a frame:
1. Within the module hours, go to **Types** page, click **Create** on the right side, and select **Create frame**.
2. Enter _BusinessHours_ as the frame label.
3. In the **Slots** section, click **Add slot** and select **Entity** > **java.time.DayOfWeek**.
4. Inside the entity, go to **Annotation** tab, change the **Fill Strategy** to **Direct Fill**, and click **<** to go back to the frame page.

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

#### Add function interfaces

To return business hours on a specific day and in a week, let's use the following two API functions:
1. **getHoursDay**(date:java.time.LocalDate):BusinessHours
2. **getHoursWeek**():List\<BusinessHours\>

To create function interfaces:
1. Within the module hours, go to **Service** page. In the **Functions** section, click **Add**.
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

Now that you have finished declaring a service, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [view it and merge it into the master](./opencui-flow.md#review-and-merge-pull-request).

### Build conversational user interface for the service
To offer a functionality through a conversational user interface, you need to define a skill. A skill is essentially a function type with dialog annotations, allowing chatbot to create a callable object to activate the service. The input parameters of the function are captured by the skill's slots, and the function's return can be displayed using its response. 

As always, to build a type, we should first define its dependent types. In this case, the skill you will build does not require new types, so you can start to define a skill that utilizes service APIs right away.

#### Build _ShowHour_ skill

Although there are two API functions that need to be exposed, only one skill is necessary. To determine which API functions should be grouped together, consider their simplest description without mentioning parameters or return values. If two API functions have the same description, they should be triggered by the same skill.

##### Declare type at schema level
To create a skill for managing users' questions on business hours, we need to create the type, add the necessary slots and services.
1. Within the module hours, go to **Types** page, click **Create** on the right side, and select **Create skill**.
2. Enter _ShowHours_ as the skill label. 
3. To get a specific day from a user, use [DatePicker](../reference/plugins/components/datepicker). DatePicker is an official CUI component, so you need to import [components](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the module hours first.
4. After successful import, go back to module hours and refresh your webpage.
5. In the skill **ShowHours**, add a slot with type **io.opencui.components.dataEntry.DatePicker**. The DatePicker is a CUI component that is designed to make it easier for users to enter a date.
6. Go to the skill **ShowHours** page, in the **Services** section, click **Select service** and select **IHours**. Leave the **Service label** as default and click **Save**.
   
::: thumbnail
![add service](/images/guide/build-service/add-service.png)
:::

##### Deal with interaction level
After declaring what you need in the schema layer, you need to add dialog annotations. This can be done by analyzing the desired conversational behavior and adding slot-level annotations for each slot, as well as a type-level annotation. For skills, you also need to configure the response.

###### To annotate slot **datePicker**:
When a user triggers a skill, the chatbot follows the interaction logic based on the annotations attached to the skill. For this particular skill, the desired conversational experience is as follows:
- If the user doesn't mention a specific date, the chatbot should display the business hours for the week.
- If the user provides a date, and the business is open on that day, the chatbot should show the business hours. If the business is closed, the chatbot should inform the user that it's closed.

Since the desired behavior is when the user does not mention the date, the chatbot should respond directly, this slot filling behavior should be supported by [Recover only](../reference/annotations/fillstrategy.md#recover-only).
1. Go to the skill **ShowHours** page, click the slot **datePicker**
2. Under the **Annotation** tab, change **Fill Strategy** to Recover only.

###### Add responses
The responses for this are depending on a number of the things: whether datePicker is filled and what the returned value is. On OpenCUI, the response can be configured to have no branching, or we can turn on the branching, and add branching. Each branching is controlled by a condition, and then a response. There are a couple of different response types supported, including multiple value messages to show list data.

1. Responses are also first defined at interaction level. Clearly, you will need turn on the branching for Response, so under the **Response** tab, turn on **Branching**.
   ::: thumbnail
   ![add a branch](/images/guide/build-service/branching.png)
   :::

2. To show the business hours on a user-mentioned date:
   - In the **Branching** section, click **Add**.
   - In the **Conditions** section, copy and paste the following code:
   ```kotlin
   datePicker?.date != null && hours.getHoursDay(datePicker!!.date!!).ifOpen == true
   ```
   - In the **Action sequence** section, select **Single value message**.

3. To inform the user it's closed on a user-mentioned date:
   - Back to the **Response** tab, in the **Branching** section, click **Add**. 
   - In the **Conditions** section, copy and paste the following code:
   ```kotlin
   datePicker?.date != null && hours.getHoursDay(datePicker!!.date!!).ifOpen == false
   ```
   - In the **Action sequence** section, select **Single value message** and **Multiple value message**.
     - **Single value message** is to inform the user it's closed on that day.
     - **Multiple value message** is display business hours in a week, so the user can get additional information to make a choice.
4. Use default branch to display business hours for each day in a week:
    - Navigate to the **Response** tab and select **Multiple value message** under the **Default action** section.
    - In the **Source** section, copy and paste the following code:
   ``` kotlin
   hours.getHoursWeek()
   ```
   
#### Add templates and exemplars
Before you start, make sure you **Propagate** all the changes you made in the interaction layer to the language layer and switch from the **Interaction** layer to the **Language/en** layer.

1. Go to the skill **ShowHours** page. Under the **Schema** tab, in the **Slots** section, click the slot **datePicker**. Enter _date_ in the **Names** field.
2. Go back to the skill **ShowHours** page and navigate to the **Response** tab. In the **Default action** field, under the **Multiple value message** section, enter the following content:
     - **Header**: Our business hours in a week are
     - **Body**:
        - ${`it.value.dayOfWeek!!.expression()`}
        - ${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}
3. Under the **Response** tab, in the **Branching** field, click the first branch. 
   - In the **Single value message** section, enter this: We are open on ${`datePicker!!.date!!.expression()`} from ${`hours.getHoursDay(datePicker!!.date!!).openingTime!!.expression()`} to ${`hours.getHoursDay(datePicker!!.date!!).closingTime!!.expression()`}.
4. Back to the **Branching** field, click the second branch. 
   - In the **Single value message** section, enter this: Sorry, but we don't open on ${`datePicker!!.date!!.expression()`}.
   - In the **Multiple value message** section, enter the following content:
     - **Header**: Our business hours in a week are
     - **Body**:
        - ${`it.value.dayOfWeek!!.expression()`}
        - ${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}
5. Under the **Expressions** tab, enter the following content:
   - **Names**: show hours
   - **Expressions**: 
      - When do you open?
      - _Do you open  $datePicker$?_
     
::: warning Attention
Do **NOT** copy and paste the value wrapped by `$`. Please type the value instead.
:::

Now that you have finished building a module, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [view it and merge it into the master](./opencui-flow.md#review-and-merge-pull-request).

## Build a provider

After declaring a service in a module, the next step is to develop a provider for it. On OpenCUI platform, the provider serves as a backend stub to actual backend implementation of the service. Most providers are external, meaning the backend is developed and deployed elsewhere in related but separated effort. 

However, there is an OpenCUI-hosted provider called [PostgREST provider](../reference/providers/postgrest.md), which allows you to use PostgreSQL as data storage and implement API functions using SQL on OpenCUI platform. OpenCUI will make these functions available to your chatbot and back office through a RESTful gateway called PostgREST.

To develop a backend using a database and expose functionalities through RESTful APIs, we need to address several issues conceptually:
- At the schema level, we need to determine the necessary tables, their schemas, and types for each column. We may also need to define PostgreSQL composite types as return types for SQL functions.
- At the business logic level, we need to decide on the functionalities we want to expose and determine how to implement them.
- On the admin side, we need to consider how the owner can manipulate the data hosted in the database, including typical CRUD operations.

On OpenCUI, you can declare a frame, or user defined composite type as basis for table, and add storage annotation to this type so that OpenCUI knows how you want to create table. You can use backoffice annotation to control how data are manipulated in admin tool. Furthermore, you can implement functions using SQL, and OpenCUI will turn them into stored procedures and expose them via RESTful automatically. Let's see how we can build a PostgREST provider.

### Import the module for the service
To implement a service, you need to declare all the necessary types for that service. This can be done by importing the module where the service is defined. Here are the steps to follow:
1. First, decide on a target provider. You can use an existing Postgrest provider, or create a new one.
2. Enter the module where the service is declared and import it into the target project.

### Create type needed by implementation 
Sometimes, to simplify development, you may need intermediate functions. This, along with other reasons, may require defining specific types for implementation. For the service that you want to implement here, it is not the case, so we can skip this step.

### Annotate for schema and backoffice
With the PostgREST provider, you can define a table schema by adding storage annotations to a data type. This enables OpenCUI to automatically create a mapping between the database and Kotlin code. OpenCUI will create tables based on the type definition and storage annotations in a separate database for your organization. Additionally, you should add backoffice annotations to each slot to define how the corresponding column should be displayed and manipulated in the backoffice.

There are two things that should be stored in the database: business hours and the time zone of your business. When displaying business hours for the week, you need to start from the current date. To determine the correct current date, the time zone of the business is important.

To store business hours or a time zone, you can storage-enable frame. After this, a frame will map to a table, with its slots mapping to the corresponding table columns. The frame label specifies the name of the table, while the slot label specifies the name of the column in the table. The SQL data type specifies the type of data that the column can hold. This can be done as follows:
1. Enter the target provider with the hours service already imported.
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
Finally, after the tables are ready, you can provide implementation for each function defined in the service. You can do this on the OpenCUI platform using PSQL (or native Kotlin code, but not for this service, so it is not covered here).

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
   - Click **Save**.

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

Now that you have finished building a PostgREST provide, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [view it and merge it into the master](./opencui-flow.md#review-and-merge-pull-request). In the next step, you can use backoffice to add data for testing and use [function console](../reference/providers/postgrest.md#function-console) to test the functions that you just implemented.
