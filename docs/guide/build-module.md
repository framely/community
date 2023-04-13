# Build a simple module

On OpenCUI, to expose a service through a conversational user interface, you need to create a module, declare the service in it and define the conversational user interface on top of the service. 

In the previous guide, we showed you how to enable your chatbot to field various business hours queries by using an existing module and provider, namely a full-stack component. In this guide, we will show you how to build such an hours module. For more detailed instructions on building a provider that implements the service in the module, please refer to the next guide.

## Before you start

- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./build-simple-chatbot.md) for how to build a skill with entity slots.
- [Reuse a full-stack module](./reuse-component.md) to get familiar with the functionality we try to build here.


## Create a module
1. Within an org, click **Create** on the right side and select **Create module**.
2. In a pop-up window, enter `hours` in the **Project label** field, add **English(en)** in the **Languages** field, and **Enable service interface**. Once done, click **Create**.

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

##### Create a frame
Within the `hours` module, go to the **Types** page.
1. Click **Create** button on the right side, and select **Create frame** to create a new frame.
2. Enter a label for the frame type and press enter. For example, `BusinessHours`.

##### Add slots
1. Inside the `BusinessHours` frame, in the **Slots** section, add `dayOfWeek` slot with type **java.time.DayOfWeek**.
2. Back to the `BusinessHours` frame, add another slot with type **kotlin.Boolean** and change its slot label to _ifOpen_.
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
Let's annotate `BusinessHours` frame per procedure. 

##### Interaction layer
Given that this type is primarily used as a return type for functions, all slots within this frame must be filled directly. OpenCUI provides the **Direct Fill** strategy to facilitate this process.

1. Inside the `BusinessHours` frame, select the `dayOfWeek` entity.
2. In the `dayOfWeek` entity, under the **Annotation** tab, select **Direct fill** in the **Fill strategy** section.
   ::: thumbnail
   ![change fill strategy](/images/guide/build-service/change-fill-strategy.png)
   :::

3. Follow the same steps to set the **Fill strategy** to **Direct fill** for the remaining three slots.

### Add function interfaces

To return business hours on a specific day and in a week, let's use the following two API functions:
1. **getHoursDay**(date:java.time.LocalDate):BusinessHours
2. **getHoursWeek**():List\<BusinessHours\>

Function interfaces should be added in the schema layer, therefore make sure you are under the **Structure** view. To create function interfaces:
1. Within the `hours` module, go to the **Service** page. In the **Functions** section, click **Add**.
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

##### Create a skill
1. Within the `hours` module, make sure you are under the **Structure** view.
2. Go to the **Types** page, create a skill and enter its label as `ShowHours`.

##### Add slots
To prompt a user for a specific day, use the [DatePicker](../reference/plugins/components/datepicker) frame. This frame simplifies the process of entering a date and is an official CUI component declared in the `components` module. 

Before proceeding, ensure that a `components` module exists under the **Dependencies** tab. If it doesn't, import [components module](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the `hours` module first. After successful import, go back to `hours` module and refresh your webpage.

1. Within the `ShowHours` skill, in the **Slots** section, add a slot with a **frame** type labeled **io.opencui.components.dataEntry.DatePicker**. 

2. In order to gain access to function interfaces, a service must be declared:
   - Back to the `ShowHours` skill, in the **Services** section, click **Select service** and select **IHours**. 
   - Leave the **Service label** as default and click **Save**.
   ::: thumbnail
   ![add service](/images/guide/build-service/add-service.png)
   :::

#### Annotate type: ShowHours
After declaring what you need in the schema layer, you need to add dialog annotations. This can be done by analyzing the desired conversational behavior and adding slot-level annotations for each slot, as well as type-level annotations. For skills, you also need to configure the response.

::: tip
Both schema layer and interaction layer are defined under the **Structure** view, but language layer is under corresponding language view, for example, for English, it should be under the **Language / en** view.
:::

##### Add slot level annotation: datePicker

###### Interaction layer
When a user triggers a skill, the chatbot follows the interaction logic based on the annotations attached to the skill. For this particular skill, the desired conversational experience is as follows:
- If the user doesn't mention a specific date, the chatbot should display the business hours for the week.
- If the user provides a date, and the business is open on that day, the chatbot should show the business hours. If the business is closed, the chatbot should inform the user that it's closed.

Since the desired behavior is when the user does not mention the date, the chatbot should respond directly, this slot filling behavior should be supported by [Recover only](../reference/annotations/fillstrategy.md#recover-only).
1. Within the `ShowHours` skill, make sure you are under the **Structure** view.
2. In the **Slots** section, select the `datePicker` slot.
3. Within the `datePicker` slot, under the **Annotation** tab, set the **Fill Strategy** to **Recover only**.

::: tip Remember to propagate
Before beginning work on the language layer, be sure to [propagate](./opencui-flow.md#propagate-the-changes-to-language-layer) the changes made under the Structure view to the **Language / en** view.
:::

###### Language layer
1. Within the `datePicker` slot of the `ShowHours` skill, ensure that you are at the **Language / en** view.
2. Under the **Expression** tab, enter the names in **Names** section, such as `date`.

##### Add type level annotation
For the `ShowHours` skill, we just need to annotate it with utterance exemplars. These exemplars will help the dialog understanding module convert utterances into events, which are structured representations of meaning.

###### Language layer
1. Navigate to the `ShowHours` skill and ensure that you are at the **Language / en** view.
2. under the **Expressions** tab, enter the following content:
   - **Names**: show business hours
   - **Expressions**:
       - _When do you open?_
       - _Do you open  $datePicker$?_

::: warning Attention
Do **NOT** copy and paste the value wrapped by `$`. Please type the value instead.
:::

##### Configure response
The responses for this skill depend on a number of the things: whether `datePicker` slot is filled and what the returned value is. OpenCUI allows you to configure responses with or without branching. When branching is enabled, you can specify conditions to control the response of the skill. Each condition has corresponding actions, such as displaying a list of values using **Multiple value message**.

###### Interaction layer
Within the `ShowHours` skill, make sure you are under the **Structure** view.

1. To turn on the branching for responses, under the **Response** tab, turn on **Branching**.
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
     - **Single value message** is used to inform the user it's closed on that day.
     - **Multiple value message** is used to display a list of business hours in a week, so the user can get additional information to make a choice.
4. If no date is mentioned, use the default branch to display business hours for each day of the week:
    - Back to the **Response** tab, in the **Default action** section, select **Multiple value message**.
    - In the **Source** section, copy and paste the following code:
   ``` kotlin
   hours.getHoursWeek()
   ```

###### Language layer
Within the `ShowHours` skill, make sure you are under the **Language / en** view.

1. Navigate to the **Response** tab. In the **Default action** field, under the **Multiple value message** section, enter the following content:
     - **Header**: _Our business hours in a week are_
     - **Body**:
        - _${`it.value.dayOfWeek!!.expression()`}_
        - _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_
       
2. Under the **Response** tab, in the **Branching** field, click the first branch. 
   - In the **Single value message** section, enter this: _We are open on ${`datePicker!!.date!!.expression()`} from ${`hours.getHoursDay(datePicker!!.date!!).openingTime!!.expression()`} to ${`hours.getHoursDay(datePicker!!.date!!).closingTime!!.expression()`}._

3. Back to the **Response** tab, in the **Branching** field, click the second branch. 
   - In the **Single value message** section, enter this: _Sorry, but we don't open on ${`datePicker!!.date!!.expression()`}._
   - In the **Multiple value message** section, enter the following content:
     - **Header**: _Our business hours in a week are_
     - **Body**:
       _${`it.value.dayOfWeek!!.expression()`}_
       _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_

Now that you have finished building a module, you can [create a pull request](./opencui-flow.md#create-a-pull-request), [view it and merge it into the master](./opencui-flow.md#review-and-merge-pull-request). In the next guide, we will show you how to build a provider that implements the service in the module