# Build a full-stack component

In the previous guide, we showed you how to make your chatbot field various business hours queries by [reuse a existing component](./use-hours.md). In this guide, we will show you how to build such a component, including exposed module [hours](https://build.opencui.io/org/me.quickstart/agent/hours/en/service_schema) and PostgREST provider [hoursProvider](https://build.opencui.io/org/me.quickstart/agent/hoursProvider/struct/service_schema): First, declare a service. Second, define the conversational user interface(CUI) for it. Third, implement the PostgREST provider by yourself.

## Before you start

[Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).

## Build a module
A service defines a set of function interfaces that specify how business functionalities can be accessed. By using a service as an interface, we can divide chatbot building into backend for business logic and frontend for conversational user interface, each of which can be taken care of by different teams.

On OpenCUI, we use module to expose a service through conversational user interface. To build these exposed module, we declare the service and then define the conversational user interface on top of the service. 

### Create a module
1. Within an org, click **Create** on the right side and select **Create module**.
2. In a pop-up window, enter _hours_ in the **Project label** field, add **English(en)** in the **Languaes** field, and **Enable service interface**. Once done, click **Create**.

### Declare a service

To declare a service means we define the function type for each API in the service. But to define these function types, we first need to define the data type for their input parameters and returns, and we have to do this recursively in case the one of these data type are composite, or use defined types. 

On the OpenCUI platform, types such as skills, frames, and entities can be annotated with dialog annotations so that the chatbot can create objects of these types via conversations. Dialog acts, on the other hand, can only be used to render the language-independent meaning into the language of choice.

#### Create a type: BusinessHours
For a function return the business hours on a specific day, the following information is needed:
- **dayOfWeek**: the day of the week, like Monday, Tuesday, etc.
- **ifOpen**: whether it's open on that day.
- **openingTime**: the time it opens.
- **closingTime**: the time it closes.

So before we can declare the function, we need to create a [frame](./concepts.md#frames) with 4 slots.

To create a frame:
1. Within the module hours, go to **Types** page, click **Create** on the right side, and select **Create frame**.
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

#### Add function interfaces
To return business hours on a specific day and in a week, lets use the following two API function:
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

Now that you have finished declaring a service. You can [view your changes](../reference/platform/versioncontrol.md#view-your-changes) and merge your branch into the master.

### Build CUI
OpenCUI allow you to use [annotations](../reference/annotations/overview.md) to define how the bot interacts with users. These annotations can be viewed in two layers: a language independent interaction layer and the language layer where you add templates and exemplars. Templates demonstrate how dialog act should be rendered in a language, and exemplars define how text should be converted to event.

#### Create skills
To expose a functionality through conversational user interface, we need to define a skill. A skill is essentially a function that a user can trigger through conversations. The input parameters of function are captured by skill's slots and the response can be defined in its response section.

You can use two different skills to manage users' questions on business hours with and without a specific date. To create skills:

1. Within the module hours, go to **Types** page, click **Create** on the right side, and select **Create skill**.
2. Enter _HoursWeek_ as the skill label. This skill provides business hours in a week.
3. Back to the **Types** page, create another skill: _HoursDay_. This skill provides business hours on a specific day.
4. To get a specific day from a user, use [DatePicker](../reference/plugins/components/datepicker). DatePicker is an official CUI component, so you need to import [components](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the module hours first.
5. After successful import, go back to module hours and refresh your webpage.
6. In the skill **HoursDay**, add a slot with type **io.opencui.components.dataEntry.DatePicker**.

#### Add the service
To access the functions in the service, you need to add the service first:
1. Go to the skill **HoursWeek** page, in the **Services** section, click **Select service** and select **IHours**. Leave the **Service label** as default and click **Save**.
   
   ::: thumbnail
   ![add service](/images/guide/build-service/add-service.png)
   :::

2. Follow the same steps to declare the service for skill **HoursDay**.

#### Define interactions
When a user triggers a skill, the bot follows the interactions based on the annotation you attached to the skill. For skill HoursWeek, the bot should display business hours in a week. For skill HoursDay, on the date the user asks for, if it's open, the bot should show the business hours on that day. If not, the bot should inform the user it's closed.

To annotate interactions:
1. Go to the skill **HoursWeek** page, navigate to the **Response** tab, and select **Multiple value message** under the **Default action** section. In the **Source** section, copy and paste the following code:
   ``` kotlin
   hours.getHoursWeek()
   ```

2. Go to the skill **HoursDay** page, since the date is provided by a user spontaneously, the bot doesn't need to ask for the date value. Enter the slot **datePicker** and change **Fill Strategy** to [Recover only](../reference/annotations/fillstrategy.md#recover-only).
3. Navigate to the **Response** tab and select **Single value message** under the **Default action** section to display the business hours on that day.
4. Still, under the **Response** tab, turn on **Branching** and click **Add**.

   ::: thumbnail
   ![add a branch](/images/guide/build-service/branching.png)
   :::

5. In the **Conditions** section, copy and paste the following code:
   ```kotlin
   hours.getHoursDay(datePicker!!.date!!).ifOpen == false
   ```

6. In the **Action sequence** section, select **Single value message** and **Skill start**. Then, Select **HoursWeek** in the **Skill start** action.
   - **Single value message** is to inform the user it's closed on that day.
   - **Skill start** is used to start skill HoursWeek to provide business hours in a week, so the user knows other options.

#### Add templates and exemplars
Both templates are exemplars are language dependent, and you have to set them up for each interactable type and each language you support. OpenCUI allow you to define templates and exemplars in a context dependent way. Depending on which input box you use to define them, they are used differently. You can use arbitrary kotlin expression in template directly, in exemplars, you can only reference slot.

Before you start, make sure you **propagate** all the changes you made in the interaction layer to the language layer and switch from the INTERACTION layer to the **EN** layer.

Go to the skill **HoursWeek** page.
1. Under the **Response** tab, copy and paste the following content:
   - **Header**: Our business hours in a week are
   - **Body**:
      - ${`it.value.dayOfWeek!!.expression()`}
      - ${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}
2. Under the **Expressions** tab, copy and paste the following content:
   - **Names**: hours in a week
   - **Expressions**: When do you open?

Go to the skill **HoursDay** page.
1. Under the **Schema** tab, in the **Slots** section, click the slot **datePicker**. Enter _date_ in the **Names** field.
2. Under the **Response** tab
   - In the **Single value message** section, copy and paste this: We are open on ${`datePicker!!.date!!.expression()`} from ${`hours.getHoursDay(datePicker!!.date!!).openingTime!!.expression()`} to ${`hours.getHoursDay(datePicker!!.date!!).closingTime!!.expression()`}.
   - Enter the branch. In the **Single value message** section, copy and paste this: Sorry, but we don't open on ${`datePicker!!.date!!.expression()`}.
3. Under the **Expressions** tab
   - Type _hours on a day_ in the **Names** field.
   - Type _Do you open  $datePicker$?_ in the **Expressions** field.

::: warning Attention
Do **NOT** copy and paste the value wrapped by `$`, please type the value instead.
:::

Now that you have finished building a module. You can [view your changes](../reference/platform/versioncontrol.md#view-your-changes) and merge your branch into the master.

## Build a provider

After you declared a service, you should develop a provider for it. On OpenCUI platform, the provider is used as an API stub, or connector to actual implementation of the service, also known as backend. Most providers are external where backend is developed and deployed else where and OpenCUI hosted. But there is an OpenCUI-hosted provider: [PostgREST provider](../reference/providers/postgrest.md) which allows you to use PostgreSQL as data storage, implement API function in SQL on OpenCUI platform. OpenCUI will make these functions available to your chatbot and backoffice through a restful gateway called PostgREST.

Let's see how we can build a PostgREST provider.

### Import the module for the service
1. First, make sure you have a target provider. You can use an existing Postgrest provider, or create a new one of this kind.
2. Enter the module where you [defined the service](#define-a-service) and [import](../reference/platform/reusability.md#import-1) this module to the target project.

### Define tables
With PostgREST provider, table schema is defined by adding [storage annotations](../guide/concepts.md#storage-annotations) to a data type, this allows OpenCUI to create mapping between database and Kotlin code automatically after that. OpenCUI will create tables based the type definition and storage annotation in the separate database for your organization. You should definitely add [backoffice](../guide/concepts.md#backoffice-annotations) to define who each column of table (slot in it corresponding type) should be display and manipulated on the backoffice.

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
Finally, after the tables are ready, you can implement the service, or provide implementation for each function defined in the service. You can do this on the OpenCUI platform using PSQL or native Kotlin code.

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

Now that you have finished building a postgrest provider. You can [view your changes](../reference/platform/versioncontrol.md#view-your-changes) and merge your branch into the master. In the next step, you can [access backoffice](../reference/providers/postgrest.md#access-backoffice) to add data for testing and use [function console](../reference/providers/postgrest.md#function-console) to test this provider.
