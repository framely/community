# Build an hours module

On OpenCUI, to expose a service through a conversational user interface, you need to create a module, declare the service in it and define the conversational user interface on top of the service. 

In the previous guide, we showed you how to enable your chatbot to field various business hours queries by using an existing module and provider, namely a full-stack component. In this guide, we will show you how to build such an hours module. For more detailed instructions on building a provider that implements the service in the module, please refer to the next guide.

## Before you start

- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./build-simple-chatbot.md) for how to build a skill with entity slots.
- [Reuse a full-stack module](./reuse-component.md) to get familiar with the functionality we try to build here.


## Create a module
1. Within an org, click **Create** on the right side and select **Create module**.
2. In a pop-up window, enter _hours_ in the **Project label** field, add **English(en)** in the **Languages** field, and **Enable service interface**. Once done, click **Create**.

## Declare a service
Declaring a service means that you define the function type for each API in the service. However, in order to define these function types, you must first define the data type for their input parameters and return values, which may need to be defined recursively in case one of these data types is composite.

### Build frame: _BusinessHours_
For a function returning the business hours on a specific day, the following information is needed:
- **dayOfWeek**: the day of the week, like Monday, Tuesday, etc.
- **ifOpen**: whether it's open on that day.
- **openingTime**: the time it opens.
- **closingTime**: the time it closes.

Before you can declare the function, let's create a [frame](../reference/concepts.md#frames) type for its return type. Since you don't need to create instances of this type through conversations, you just need to declare this under the **Structure** view.

To build a frame:
1. Within the `hours` module, go to the **Types** page, click **Create** on the right side, and select **Create frame**. Enter _BusinessHours_ as the frame label.
2. Inside the `BusinessHours` frame, in the **Slots** section, add `dayOfWeek` slot with type **java.time.DayOfWeek**.
3. Within the `dayOfWeek` entity, go to **Annotation** tab, change the **Fill Strategy** to **Direct Fill**.
   ::: thumbnail
   ![change fill strategy](/images/guide/build-service/change-fill-strategy.png)
   :::

4. Back to the `BusinessHours` frame, add another slot with type **kotlin.Boolean** and change its slot label to _ifOpen_.
   ::: thumbnail
   ![change slot label](/images/guide/build-service/change-slot-label.png)
   :::

5. Within the `ifOpen` entity, go to **Annotation** tab, change the **Fill Strategy** to **Direct Fill**.

6. Follow the same steps to add the other two slots (For each slot, change **Fill Strategy** to **Direct Fill**):
   - `openingTime` with type **java.time.LocalTime**
   - `closingTime` with type **java.time.LocalTime**
   
Once finished, the frame should look like this:
::: thumbnail
![show frame BusinessHours](/images/guide/build-service/show-frame.png)
:::

### Add function interfaces

To return business hours on a specific day and in a week, let's use the following two API functions:
1. **getHoursDay**(date:java.time.LocalDate):BusinessHours
2. **getHoursWeek**():List\<BusinessHours\>

To create function interfaces:
1. Within the `hours` module, go to the **Service** page. In the **Functions** section, click **Add**.
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

## Build CUI for the service
To offer a functionality through a conversational user interface, you need to define a skill. A skill is essentially a function type with dialog annotations, allowing chatbot to create a callable object to activate the service. The input parameters of the function are captured by the skill's slots, and the function's return can be displayed using its response. 

As always, to build a type, we should first define its dependent types. In this case, the skill you will build does not require new types, so you can start to define a skill that utilizes service APIs right away.

### Build skill: _ShowHour_

Although there are two API functions that need to be exposed, only one skill is necessary. To determine which API functions should be grouped together, consider their simplest description without mentioning parameters or return values. If two API functions have the same description, they should be triggered by the same skill.

#### Declare type at schema layer
To create a skill for managing users' questions on business hours, we need to create the type, add the necessary slots and services.
1. Within the `hours` module, go to the **Types** page, create a `ShowHours` skill.
2. To get a specific day from a user, use [DatePicker](../reference/plugins/components/datepicker) that is designed to make it easier for users to enter a date. DatePicker is an official CUI component, so you need to import [components](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the `hours` module first.
3. After successful import, go back to `hours` module and refresh your webpage.
4. In the `ShowHours` skill, add a slot with type **io.opencui.components.dataEntry.DatePicker**. 
5. Back to the `ShowHours` skill, in the **Services** section, click **Select service** and select **IHours**. Leave the **Service label** as default and click **Save**.
::: thumbnail
![add service](/images/guide/build-service/add-service.png)
:::

#### Deal with interaction layer
After declaring what you need in the schema layer, you need to add dialog annotations. This can be done by analyzing the desired conversational behavior and adding slot-level annotations for each slot, as well as a type-level annotation. For skills, you also need to configure the response.

##### Annotate slot: _datePicker_
When a user triggers a skill, the chatbot follows the interaction logic based on the annotations attached to the skill. For this particular skill, the desired conversational experience is as follows:
- If the user doesn't mention a specific date, the chatbot should display the business hours for the week.
- If the user provides a date, and the business is open on that day, the chatbot should show the business hours. If the business is closed, the chatbot should inform the user that it's closed.

Since the desired behavior is when the user does not mention the date, the chatbot should respond directly, this slot filling behavior should be supported by [Recover only](../reference/annotations/fillstrategy.md#recover-only).
1. Go to the `ShowHours` skill, select the `datePicker` slot.
2. Within the `datePicker` slot, under the **Annotation** tab, change **Fill Strategy** to Recover only.

##### Add responses
The responses for this skill depend on a number of the things: whether datePicker is filled and what the returned value is. On OpenCUI, the response can be configured to have no branching, or we can turn on the branching, and add branching. Each branching is controlled by a condition, and then a response. There are a couple of different response types supported, including multiple value messages to show list data.

1. To turn on the branching for responses, go to the `ShowHours` skill, under the **Response** tab, and turn on **Branching**.
   ::: thumbnail
   ![add a branch](/images/guide/build-service/branching.png)
   :::

2. To show the business hours on a user-mentioned date:
   - Under the **Response** tab, in the **Branching** section, click **Add**.
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
     - **Multiple value message** is to display business hours in a week, so the user can get additional information to make a choice.
4. Use default branch to display business hours for each day in a week:
    - Navigate to the **Response** tab and select **Multiple value message** under the **Default action** section.
    - In the **Source** section, copy and paste the following code:
   ``` kotlin
   hours.getHoursWeek()
   ```
   
### Add templates and exemplars
Before you start, make sure you **Propagate** all the changes you made under the structure view to the language view and switch from the **Structure** view to the **Language / en** view.

1. Go to the `ShowHours` skill, under the **Schema** tab, select `datePicker`slot. 

2. Within the `datePicker`slot, in the **Names** field, enter _date_.

3. Go back to the `ShowHours` skill and navigate to the **Response** tab. In the **Default action** field, under the **Multiple value message** section, enter the following content:
     - **Header**: _Our business hours in a week are_
     - **Body**:
        - _${`it.value.dayOfWeek!!.expression()`}_
        - _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_
       
4. Under the **Response** tab, in the **Branching** field, click the first branch. 
   - In the **Single value message** section, enter this: _We are open on ${`datePicker!!.date!!.expression()`} from ${`hours.getHoursDay(datePicker!!.date!!).openingTime!!.expression()`} to ${`hours.getHoursDay(datePicker!!.date!!).closingTime!!.expression()`}._

5. Back to the **Response** tab, in the **Branching** field, click the second branch. 
   - In the **Single value message** section, enter this: _Sorry, but we don't open on ${`datePicker!!.date!!.expression()`}._
   - In the **Multiple value message** section, enter the following content:
     - **Header**: _Our business hours in a week are_
     - **Body**:
       _${`it.value.dayOfWeek!!.expression()`}_
       _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_

6. Within the `ShowHours` skill, under the **Expressions** tab, enter the following content:
   - **Names**: show hours
   - **Expressions**: 
      - _When do you open?_
      - _Do you open  $datePicker$?_
     
::: warning Attention
Do **NOT** copy and paste the value wrapped by `$`. Please type the value instead.
:::

Now that you have finished building a module, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [view it and merge it into the master](./opencui-flow.md#review-and-merge-pull-request). In the next guide, we will show you how to build a provider that implements the service in the module