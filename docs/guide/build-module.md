# Build a simple module
On OpenCUI, a module is reusable conversational functionality. While it is possible for a module to be self-contained, modules are commonly just frontends that conversationally expose a single service, with the actual implementation of the service developed and deployed separately. Using services to decouple the frontend and backend development has many benefits and is widely adopted for building user-facing applications.

The Service is a special singleton type in a module with service enabled. It allows you to declare a set of API functions that can be directly accessed by other types. With the service declared, you can define the conversational user interface to expose these functionalities in the same module. Such a module, when paired with a compatible provider, can add conversational functionality to any chatbot with little effort.

In the previous guide, we showed how your chatbot can handle various business hours queries using the "hours" module. In this guide, we will show you how to build such a module in two parts: first declare the service, then define the conversational user interface on top of that. Both essentially involve defining a set of types, with types needed by the service requiring no dialog annotations.

## Before you start
- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Build a simple chatbot](./build-simple-chatbot.md) for how to build a skill with entity slots.
- [Reuse a full-stack component](./reuse-component.md) to get familiar with the functionality you will build here.

## Create module: hours
A module with service support allows you to focus on creating the conversational user interface, leaving the management of business information, like hours, as a separate concern.

To create a module with service support, follow these steps:
1. Within an organization, go to the project list page, click **Create** and select **Create module**.
2. In the pop-up window, complete the form for module basic settings and click **Create**:
   - **Project label**: The unique identifier for the module. We suggest using a lowercase label. For example, `hours`.
   - **Languages**: The languages your module supports, you can add multiple languages. In this case, select **English(en)**.
   - **Enable service interface**: Enable service interface to define a service interface in a module that can be used by the module to interact with the backend.

## Declare service
Declaring a service means that you declare the function type for each API in the service, which include function label, its input parameters and return. Clearly, you must first declare the data types for their input parameters and return values, which may need to be done recursively in case one of these data types is composite. 

In this case, a `hours` service provides information about the business hours of a specific business, typically consists of the following: 
- A data type `BusinessHours` to represent the business hours on a specific day.
- A function `getHoursWeek` to get the hours for the week.
- A function `getHoursDay` to return business hour for the specific date. 

The `getHoursWeek` and `getHoursDay` functions can also be merged into one function. However, for the demo, we keep them separated to make the code more modular and easier to understand.

Here are the steps on how to declare the `hours` service in OpenCUI. 

### Build frame: BusinessHours
To return the business hours on a specific day, you'll need a data type contains the following information:
- **dayOfWeek**: The day of the week, like "Monday", "Tuesday", etc.
- **ifOpen**: Whether it's open on that day.
- **openingTime**: The time it opens.
- **closingTime**: The time it closes.

You will define a "BusinessHours" frame for this purpose since a OpenCUI frame is an user defined composite type. 

#### Schema layer: declare a frame
At this layer, you will create a frame and add all of the necessary slots.

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
Since this type does not need to be exposed conversationally, there is no need to add dialog annotation.

### Declare function: getHoursWeek
The function `getHoursWeek` gets the week of hours. It returns a list of `BusinessHours`, where each represents the business hours for a specific day. To declare this function interface: 

Inside the **hours** module and **Service** page, under the **Structure** view.
1. In the **Functions** section, click **Add**.
2. Enter `getHoursWeek` as the **Function label**.
3. In the **Return type** section, select **Frame** > **BusinessHours** as **Type**. Turn on **Multi-value**d and turn off **Nullable**, then save.

### Declare function: getHoursDay

The function `getHoursDay` returns a specific day's business hour based on the specific date provided by customers. It takes a date as input and returns one `BusinessHours`, where the frame represents the business hours for the specified day. To declare this function interface: 

Inside the **hours** module and **Service** page, under the **Structure** view.
1. In the **Functions** section, click **Add**.
2. Enter `getHoursDay` as the **Function label**.
3. In the **Parameters** section, click **+** to add an input parameter. 
   - Enter `date` as a **Name**.
   - Select **Entity** > **java.time.LocalDate** as **Type**.
4. In the **Return type** section, select **Frame** > **BusinessHours** as **Type** and turn off **Nullable**, then save.


Once finished, the function interfaces should look like this:
::: thumbnail
![show functions](/images/guide/build-service/show-functions.png)
:::

## Build CUI for the service
To provide functionality through a conversational user interface (CUI), you need to define a skill. A skill is essentially a function type with dialog annotations, allowing the chatbot to create a callable object for triggering the service through conversation. The input parameters of the function are captured by the skill's slots, and the function's return can be displayed using its response.

As always, when building a type, you should first define its dependent types, but all the types required by the skill are already defined, so you are good.

### Build skill: ShowHours
Although there are two API functions that need to be exposed, only one skill is necessary. To determine which API functions should be grouped together, consider their simplest description without mentioning parameters or return values. If two API functions share the same description, they must be triggered by the same skill.

#### Schema layer: declare a skill
To create a skill for managing users' questions on business hours, you need to create the type, add the necessary slots and services.

##### Create the skill
Inside the **hours** module and **Types** page, under the **Structure** view.
1. Click **Create** button on the right side, and select **Create skill** to create a new skill.
2. Enter `ShowHours` as a label for the skill type and press enter.

##### Add slots
To prompt a user for a specific day, use the [DatePicker](../reference/plugins/components/datepicker) frame. This frame simplifies the process of entering a date and is an official CUI component declared in the `components` module. 

Before proceeding, ensure that the `components` module exists under the **Dependencies** tab. If it doesn't, import [components module](https://build.opencui.io/org/io.opencui/agent/components/struct/frame/63c8aea6517f06c1880e3cff) to the `hours` module first. After successful import, go back to `hours` module and refresh your webpage.

Inside the `ShowHours` skill and **Schema** tab, under the **Structure** view.

1. In the **Slots** section, add a slot of type **io.opencui.components.dataEntry.DatePicker** with the default label `datePicker`. 

2. In order to gain access to function interfaces, a service must be declared:
   - Back to the `ShowHours` skill, in the **Services** section, select **IHours**. 
   - Use the default label `hours` and click **Save**.
   ::: thumbnail
   ![add service](/images/guide/build-service/add-service.png)
   :::

#### Annotate type: ShowHours
 Based on analysis of the desired conversational behavior and business logic, pick the right annotation to add for desired conversation experience.

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

#### Configure response
On OpenCUI, response comes with a default catch-all branch that has no triggering condition. You can also turn on the additional branching if you need to handle complex use cases. When branching is enabled, you can add one or more branches, each with a triggering condition and the corresponding action. 

OpenCUI supports two types of actions: messages and system actions. System actions are related to dialog management, such as closing the current session. Messages are used to render some structured data into natural language. 

If the data you want to render is a single item, you should use a single value message. A single value message only needs a template to demonstrate how that data item should be rendered into natural language. 

If the data you want to render is a list of items, you need to use a multiple value message. Such message requires you configure a source and a template structure. The source should be a Kotlin code expression that evaluates to a list of items of some data type. The template structure consists of a header, a body, and a footer, each used for a different purpose:
- The header helps users quickly understand the purpose and context of the list.
- The body contains the rendering of one item in the list. You can use "it" to reference the item itself.
- The footer provides additional context or actions related to the list.

When there are multiple branches, the ordering of these branches matters, OpenCUI runtime will go from top to bottom, and find the first branch with its triggering condition evaluated to true and execute its action. If no additional branch is triggered, OpenCUI will execute the actions in the default branch.

The responses for this skill depend on a number of the things: whether `datePicker` slot is filled and whether the business is open on that day. In particular, there should be three branches:
- If the specific date provided by the customer is closed, inform customers it closed and show the business hours for the week.
- If the specific date provided by the customer is open, show the business hours for the specific date.
- No specific date is provided, show the business hours for the week.

Clearly, you need to turn on the branching:

Inside the `ShowHours` skill and the **Response** tab, under the **Structure** view.
- turn on **Branching**.

::: thumbnail
![add a branch](/images/guide/build-service/branching.png)
:::

Now you can define each branch one at a time, first in interaction layer, then in language layer, once for each language you want to support. But this guide assume only English is supported. 

::: tip
Remember to propagate the change in the structure view before you switch to language view, to make sure the annotation you can fill language part is made available.
:::

##### Define branch: for an open day
To show the business hours on a user-mentioned date.
###### Interaction layer
Inside the `ShowHours` skill and the **Response** tab, under the **Structure** view.
1. In the **Branching** section, click **Add**.
2. Inside a branch:
   - In the **Conditions** section, copy and paste the following code:
   ```kotlin
   datePicker?.date != null && hours.getHoursDay(datePicker!!.date!!).ifOpen == true
   ```
   - In the **Action sequence** section, select **Single value message**.

###### Language layer
Inside the `ShowHours` skill and the **Responses** tab, under the **Language/en** view.
In the **Single value message** section, enter this:
_We are open on ${`datePicker!!.date!!.expression()`} from ${`hours.getHoursDay(datePicker!!.date!!).openingTime!!.expression()`} to ${`hours.getHoursDay(datePicker!!.date!!).closingTime!!.expression()`}._


##### Define branch: for a closed day
When you are closed on the date that users are interested in, you first inform that it is closed, then you list regular weekly hours. 

###### Interaction layer
Inside the `ShowHours` skill and the **Response** tab, under the **Structure** view.
To inform the user it's closed on a user-mentioned date:
- Back to the **Response** tab, in the **Branching** section, click **Add**. 
- Inside a branch:
  - In the **Conditions** section, copy and paste the following code:
  ```kotlin
  datePicker?.date != null && hours.getHoursDay(datePicker!!.date!!).ifOpen == false
  ```
- In the **Action sequence** section, select **Single value message** and **Multiple value message**.
  - **Single value message** is used to inform the user it's closed on that day.
  - **Multiple value message** is used to display a list of business hours in a week, so the user can get additional information to make a choice.

###### Language layer
Inside the `ShowHours` skill and the **Responses** tab, under the **Language/en** view.
- In the **Single value message** section, enter this:
_Sorry, but we don't open on ${`datePicker!!.date!!.expression()`}._
- In the **Multiple value message** section, enter the following content:
  - **Header**: _Our business hours in a week are_
  - **Body**:
    _${`it.value.dayOfWeek!!.expression()`}_
    _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_
  - 
##### Default branch: for the week
If user did not give chatbot a date, simply response with regular weekly hours.
###### Interaction layer
Inside the `ShowHours` skill and the **Response** tab, under the **Structure** view.
If no date is mentioned, use the default branch to display business hours for each day of the week:
- In the **Default action** section, select **Multiple value message**.
- In the **Source** section, copy and paste the following code:
   ``` kotlin
   hours.getHoursWeek()
   ```
###### Language layer
Inside the `ShowHours` skill and the **Responses** tab, under the **Language/en** view.
In the **Multiple value message** field, enter the following content:
- **Header**: _Our business hours in a week are_
- **Body**:
   - _${`it.value.dayOfWeek!!.expression()`}_
   - _${`if (it.value.ifOpen == true) it.value.openingTime!!.expression() + " ⁠– " + it.value.closingTime!!.expression() else "Closed"`}_

Now that you have finished building a module, you can  [create a pull request](./opencui-flow.md#create-a-pull-request), [merge it into the master](./opencui-flow.md#review-and-merge-pull-request). You can then go back to the chatbot you used in the last guide, replace the module you imported with this one, and experiment with it. 