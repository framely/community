# Build a simple module

On OpenCUI, to expose a service through a conversational user interface, you need to create a module, declare the service in it and define the conversational user interface on top of the service. 

In the previous guide, we showed you how to enable your chatbot to field various business hours queries by using an existing module and provider, namely a full-stack component. In this guide, we will show you how to build such an hours module. For more detailed instructions on building a provider that implements the service in the module, please refer to the next guide.

## Before you start

- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./build-simple-chatbot.md) for how to build a skill with entity slots.
- [Reuse a full-stack module](./reuse-component.md) to get familiar with the functionality we try to build here.


## Create a project
You can create a module under any organization, following these steps:
1. Within an organization, in the upper right corner of the project area, click **Create** and select **Create module**.
2. In the pop-up window, complete the form for module basic settings and click **Create**. For this simple module, you only need to configure the following three fields: 
   - **Project label**: enter `hours`.
   - **Languages**: add **English(en)**.
   - **Enable service interface**: turn on this toggle.

## Declare a service
Declaring a service means that you define the function type for each API in the service. However, in order to define these function types, you must first define the data type for their input parameters and return values, which may need to be defined recursively in case one of these data types is composite.

### Build frame: BusinessHours
Before you can declare the function, you should prepare a frame type for its return type. On OpenCUI, a frame is a standard object-oriented class type with support for composition and polymorphism behaviors. Frames typically map to parameter types for your function at schema level.

As this type is primarily used as a return type for functions, instances of this type do not need to be created through conversations. You only need to declare this frame under the **Structure** view.

#### Schema layer: declare a frame
If you require a function that returns the business hours on a specific day, you'll need to provide the following information in your frame declaration:
- **dayOfWeek**: the day of the week, like Monday, Tuesday, etc.
- **ifOpen**: whether it's open on that day.
- **openingTime**: the time it opens.
- **closingTime**: the time it closes.

At this layer, you will create a frame and add all of the required slots.

##### Create the frame
Inside the **hours** module and **Types** page, under the **Structure** view.
1. Click **Create** button on the right side, and select **Create frame** to create a new frame.
2. Enter `BusinessHours` as a label for the frame type and press enter.

##### Add slots
Inside the `BusinessHours` frame and **Schema** tab, under the **Structure** view.
1. In the **Slots** section, add a slot of type **java.time.DayOfWeek** with the default label `dayOfWeek`.
2. Back to the `BusinessHours` frame, add another slot with type **kotlin.Boolean** and change its slot label to `ifOpen`.
   ::: thumbnail
   ![change slot label](/images/guide/build-service/change-slot-label.png)
   :::

3. Follow the same steps to add the other two slots:
    - `openingTime` with type **java.time.LocalTime**
    - `closingTime` with type **java.time.LocalTime**

Once finished, the frame should look like this:
::: thumbnail
![show frame BusinessHours](/images/guide/build-service/show-frame.png)
:::

#### Annotate type: BusinessHours
Let's annotate the `BusinessHours` frame.

##### Add slot level annotations to all the slots
Given that this type is primarily used as a return type for functions, all slots within this frame must be filled directly. You need to select **Direct fill** for [fill strategy](../reference/annotations/fillstrategy.md) for all the slots in this frame.

###### Interaction layer
Inside the `BusinessHours` frame and **Schema** tab, under the **Structure** view.

1. Select the `dayOfWeek` entity.
2. Under the **Annotation** tab, select **Direct fill** in the **Fill strategy** section.
3. Back to the `BusinessHours` frame, follow the same steps to set the fill strategy to **Direct fill** for the remaining three slots.

### Add function interfaces

To return business hours on a specific day and in a week, let's use the following two API functions:
1. **getHoursDay**(date:java.time.LocalDate):BusinessHours
2. **getHoursWeek**():List\<BusinessHours\>

To create function interfaces:

Inside the **hours** module and **Service** page, under the **Structure** view.

1. In the **Functions** section, click **Add**.
   - Enter `getHoursDay` as the **Function label**.
   - In the **Parameters** section, click **+** to add an input parameter. Enter `date` as a **Name** and select **Entity** > **java.time.LocalDate** as **Type**.
   - In the **Return type** section, select **Frame** > **BusinessHours** as **Type** and turn off **Nullable**.
   - Click **Save**.

2. In the **Functions** section, click **Add**.
   - Enter `getHoursWeek` as the **Function label**.
   - In the **Return type** section, select **Frame** > **BusinessHours** as **Type**. Turn on **Multi-value**d and turn off **Nullable**.
   - Click **Save**.

Once finished, the function interfaces should look like this:
::: thumbnail
![show functions](/images/guide/build-service/show-functions.png)
:::

## Build CUI for the service
To offer a functionality through a conversational user interface (CUI), you need to define a skill. A skill is essentially a function type with dialog annotations, allowing chatbot to create a callable object to activate the service. The input parameters of the function are captured by the skill's slots, and the function's return can be displayed using its response. 

As always, to build a type, we should first define its dependent types. In this case, the skill you will build does not require new types, so you can start to define a skill that utilizes service APIs right away.

### Build skill: ShowHours
Although there are two API functions that need to be exposed, only one skill is necessary. To determine which API functions should be grouped together, consider their simplest description without mentioning parameters or return values. If two API functions share the same description, they must be triggered by the same skill.

#### Schema layer: declare a skill
To create a skill for managing users' questions on business hours, we need to create the type, add the necessary slots and services.

##### Create the skill
Inside the **hours** module and **Types** page, under the **Structure** view.
1. Click **Create** button on the right side, and select **Create skill** to create a new skill.
2. Enter `ShowHours` as a label for the skill type and press enter.

##### Add slots
To prompt a user for a specific day, use the [DatePicker](../reference/plugins/components/datepicker) frame. This frame simplifies the process of entering a date and is an official CUI component declared in the `components` module. 

Before proceeding, ensure that the `components` module exists under the **Dependencies** tab. If it doesn't, import [components module](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the **hours** module first. After successful import, go back to **hours** module and refresh your webpage.

Inside the `ShowHours` skill and **Schema** tab, under the **Structure** view.

1. In the **Slots** section, add a slot of type **io.opencui.components.dataEntry.DatePicker** with the default label `datePicker`. 

2. In order to gain access to function interfaces, a service must be declared:
   - Back to the `ShowHours` skill, in the **Services** section, click **Select service** and select **IHours**. 
   - Use the default label `hours` and click **Save**.
   ::: thumbnail
   ![add service](/images/guide/build-service/add-service.png)
   :::

#### Annotate type: ShowHours
After declaring what you need in the schema layer, you need to add dialog annotations. This can be done by analyzing the desired conversational behavior and adding slot level annotations for each slot, as well as type level annotations.

##### Add slot level annotation to datePicker
When a user triggers a skill, the chatbot follows the interaction logic based on the annotations attached to the skill. For this particular skill, the desired conversational experience is as follows:
- If the user doesn't mention a specific date, the chatbot should display the business hours for the week.
- If the user provides a date, and the business is open on that day, the chatbot should show the business hours. If the business is closed, the chatbot should inform the user that it's closed.

Since the desired behavior is when the user does not mention the date, the chatbot should respond directly, you need to select **Recover only** for [fill strategy](../reference/annotations/fillstrategy.md) for this slot.

###### Interaction layer
Inside the `ShowHours/datePicker` slot and **Annotation** tab, under the **Structure** view.
- Select **Recover only** in the **Fill strategy** section.

::: tip Remember to propagate the change you made under the Structure view
- Both schema layer and interaction layer are defined under **Structure** view, but language layer is under corresponding language view, for example, for English, it should be under "Language/en".
- Before beginning work on the language layer, always [propagate](./opencui-flow.md#propagate-the-changes-to-language-layer) the changes made so far to the language layer, and then switch over to the corresponding language view.
:::

###### Language layer
Inside the `ShowHours/datePicker` slot and **Expression** tab, under the **Language/en** view.
- In **Names** section, enter the names, such as `date`.

##### Add type level annotation
For the `ShowHours` skill, only two type level annotations: names, utterance exemplars, are required.

###### Language layer
Inside the `ShowHours` skill and the **Expressions** tab, under the **Language/en** view.
1. Add names for `ShowHours` skill:
   - In the **Names** section, enter `show business hours` and press enter.
2. Add expressions for `ShowHours` skill:
   - In the **Expressions** section, enter the following content:
     - _When do you open?_
     - _Do you open  $datePicker$?_

::: warning Attention
Do **NOT** copy and paste the value wrapped by `$`. Please type the value instead.
:::

##### Configure response
The responses for this skill depend on a number of the things: whether `datePicker` slot is filled and what the returned value is. OpenCUI allows you to configure responses with or without branching. When branching is enabled, you can specify conditions to control the response of the skill. Each condition has corresponding actions, such as displaying a list of values using **Multiple value message**.

###### Interaction layer
Inside the `ShowHours` skill and the **Response** tab, under the **Structure** view.

1. To configure responses with branching, turn on **Branching**.
   ::: thumbnail
   ![add a branch](/images/guide/build-service/branching.png)
   :::

2. To show the business hours on a user-mentioned date:
   - In the **Branching** section, click **Add**.
   - Inside a branch:
      - In the **Conditions** section, copy and paste the following code:
      ```kotlin
      datePicker?.date != null && hours.getHoursDay(datePicker!!.date!!).ifOpen == true
      ```
      - In the **Action sequence** section, select **Single value message**.

3. To inform the user it's closed on a user-mentioned date:
   - Back to the **Response** tab, in the **Branching** section, click **Add**. 
   - Inside a branch:
     - In the **Conditions** section, copy and paste the following code:
     ```kotlin
     datePicker?.date != null && hours.getHoursDay(datePicker!!.date!!).ifOpen == false
     ```
   - In the **Action sequence** section, select **Single value message** and **Multiple value message**.
     - **Single value message** is used to inform the user it's closed on that day.
     - **Multiple value message** is used to display a list of business hours in a week, so the user can get additional information to make a choice.
4. If no date is mentioned, use the default branch to display business hours for each day of the week:
    - Back to the **Response** tab, in the **Default action** section, select **Multiple value message**.
    - In the **Source** section, copy and paste the following code:
   ``` kotlin
   hours.getHoursWeek()
   ```

###### Language layer
Inside the `ShowHours` skill and the **Responses** tab, under the **Language/en** view.

1. In the **Multiple value message** field, enter the following content:
     - **Header**: _Our business hours in a week are_
     - **Body**:
        - _${`it.value.dayOfWeek!!.expression()`}_
        - _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_
       
2. In the **Branching** section, click the first branch. 
   - In the **Single value message** section, enter this: _We are open on ${`datePicker!!.date!!.expression()`} from ${`hours.getHoursDay(datePicker!!.date!!).openingTime!!.expression()`} to ${`hours.getHoursDay(datePicker!!.date!!).closingTime!!.expression()`}._

3. Back to the **Response** tab, in the **Branching** field, click the second branch. 
   - In the **Single value message** section, enter this: _Sorry, but we don't open on ${`datePicker!!.date!!.expression()`}._
   - In the **Multiple value message** section, enter the following content:
     - **Header**: _Our business hours in a week are_
     - **Body**:
       _${`it.value.dayOfWeek!!.expression()`}_
       _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_

Now that you have finished building a module, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [view it and merge it into the master](./opencui-flow.md#review-and-merge-pull-request). In the next guide, we will show you how to build a provider that implements the service in the module