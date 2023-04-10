# Build a simple chatbot
The goal of a chatbot is to deliver functionality to the user through a conversational user interface. In order to do that, it first needs to create a callable instance of some function type that can be invoked by the user. To achieve this, we need to be able to create instances conversationally for any type that is required by the parameters for functions and attributes for user defined types (both are slots on OpenCUI). This suggests that we can build a conversational user interface in a type-based fashion in two steps: 
1. Declare all the types we want to expose;
2. Attach dialog annotations to these types and their slots, which describe how the whole or part of the type can be instantiated conversationally.

   ::: thumbnail
   ![create save](/images/guide/pingpong/urr.png)
   :::

 To support multiple languages, dialog annotations are defined in two layers. The first layer is the Interaction layer, which determines which slot should be requested for additional information from the user. The second layer is the language layer, which determines the phrasing that should be used to request that information in a given language. In this guide, we finish all the interaction layer configuration for a type before we switch to the language layer, but this is not required.

OpenCUI supports skill for conversationally exposed function, frame for user defined types, and entity for primitive types. Notice every type defined on the OpenCUI has direct mapping onto some Java/Kotlin classes. We can also add dialog annotations to existing Java/Kotlin data types. This allows users to tap into the vast Java ecosystem and leverage any functionality they can think of while also using Kotlin code expressions to directly express the logic.

This tutorial will guide you step-by-step through the process of creating and building a simple chatbot on the OpenCUI platform. When interacting with the chatbot, users will receive a welcome message and a reply of "pong" based on their input location. For example:

:::: conversation
::: bot Bot
Hi! I'm a virtual PingPong chatbot. How can I assist you today?
:::
::: user User
ping
:::
::: bot Bot
Wow. Where is the "ping" coming from?
:::
::: user User
Seattle
:::
::: bot Bot
Great! Pong to Seattle. What else can I do for you? 
:::
::: user User
No, thanks
:::
::: bot Bot
Thank you for contacting the virtual PingPong chatbot. Have a great day! 
:::
::::

OpenCUI adopts a [5 levels maturity model](../essentials/5levels-cui.md) for CUI capabilities. After completing this tutorial, you will be able to develop [a second-level](../essentials/5levels-cui.md#frame-with-slots) conversational experience, such as allowing users to check your business hours or make a reservation.

## Before you start
- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- It is useful to get familiar with [the type-based way of building chatbot](../essentials/README.md).
- We assume that you have finished [clone a chatbot,](./start-with-clone.md) so you know what to build.

## Create a chatbot
When you sign up for OpenCUI, a personal organization is automatically created for you. You can create a chatbot under this organization (or any other organization) following these steps:
1. Within an organization, in the upper right corner of the project area, click **Create** and select **Create chatbot**.
2. In the pop-up window, complete the form for chatbot basic settings. For this simple chatbot, you only need to fill in the following three fields:
   - **Project label**: the unique identifier for the chatbot. Type a short, memorable label for your chatbot. We suggest using a lowercase label. For example, "*pingpong*".
   - **Region**: where you want to deploy this chatbot. Ideally, it should be close to your users. 
   - **Languages**: the languages your chatbot supports, you can add multiple languages. Multilingual chatbots assume you deliver the same service to each user in their native languages.

3. After completing the form, click **Create**.

   ::: warning Need To Know
   If you want to change a chatbot's label or region, you will need to clone it with the desired choices. Note all user session data with old chatbot will be lost.
   :::

   ::: thumbnail
   ![create save](/images/guide/pingpong/create_save.png)
   :::

If the chatbot is created successfully, it should be displayed as shown below:
   
::: thumbnail
![enter chatbot](/images/guide/pingpong/enter_chatbot.png)
:::

## Build a chatbot
Since chatbots can be thought of as a set of independent functionalities, each of these conversationally exposed functions is defined by a skill. We can build a chatbot by building skills, one skill at a time. To build a composite type like skill, we first need to build its dependent types, recursively. In this tutorial, let's see how we can define a simple skill: 

### Build an entity
The most basic type on OpenCUI is "entity". It is a primitive type that the chatbot knows how to extract the value of this type from user utterance. OpenCUI provides many predefined entities, such as `java.time.LocalDate` for dates, `io.opencui.core.Email` for email addresses, and so on. In this case, let's build a custom entity type `Location`. 

#### Create an entity and add an instance
Ensure that you are inside the **pingpong** chatbot and at the **Interaction** view:
1. Click **Create** button on the right side, and select **Create entity** to create a new entity.
2. Enter a label for the entity type and press enter. For example, `Location`.
3. Within the `Location` entity, click **Add** button to add entity instances, you are required to provide a language independent label for each instance, such as `seattle` in the label field and **Save**. You can add as many instances as you need. No spaces are allowed in the instance label, or in any label at all.

    ::: thumbnail
    ![create entity](/images/guide/pingpong/create_entity.png)
    :::

#### Add annotations
To enable the chatbot to extract user mentions and create instances of this type from utterances, one or more recognizers must be configured for each type. User-defined entities come with a list-based recognizer, which requires the builder to [enumerate common expressions](../reference/annotations/templateandexemplar.md#expression-for-entity-instance) for each instance that was added for this type in the previous step.

Before beginning work on the language layer, be sure to [propagate](./opencui-flow.md#propagate-the-changes-to-language-layer) the changes made in the interaction layer to the language layer, and then [switch over to the language layer](./opencui-flow.md#switch-from-interaction-layer-to-language-layer). At language layer, configure the following annotations:

1. Navigate to the entity and head to the **Instances** tab. 
2. Click the instance entry, add **Expressions** in the pop-up window.
3. Click **Save**.
    ::: thumbnail
    ![pingpong add entity instance expression](/images/guide/pingpong/pingpong_entity_instance.png)
    :::

4. Within the `Location` entity, head to the **Expression** tab.
5. In the **Names** section, enter `Location` for the Location entity display name and press enter. This field also provides examples of how this type is mentioned in different languages.
    ::: thumbnail
    ![pingpong add entity expression](/images/guide/pingpong/pingpong_entity_expression.png)
    :::

### Build a skill
Conceptually, a skill is a conversationally exposed functions, with input parameters represented by its slots. In this tutorial, let's build a simple skill "pingpong" with a single slot of Location type. A location is a required slot for this skill, so when it is missing from the user's initial utterance, the chatbot will prompt the user for it. Once the instance of this function type is created, the chatbot simply produces an acknowledgement in the form of `pong to ${location}`.

#### Declare a skill at schema level
First, let's declare a skill at the schema level. This includes creating the skill first and then adding a slot, a local function and services.

##### Create a skill
1. Within the **pingpong** chatbot, head to **Types** page and switch to the **Interaction** layer.
2. Click **Create** button on the right side, and select **Create skill** to create a new skill.
3. Enter a label for the skill and press enter. For example, `PingPong`.
   ::: warning Need To Know
   In OpenCUI, a label is not a name but an identifier that is independent of the language used. The Skill Label, being a type of label, should adhere to the following guidelines:
   - It should start with a capital letter.
   - It should be between 2 and 100 characters in length.
   - It should only contain letters, digits, and underscores.
   <br>

   :::
   ::: thumbnail
   ![intent label](/images/guide/pingpong/intent_label.png)
   :::

##### Add a slot
On a composite type's **Schema** tab, we can add slots to this skill.
To add a slot to a type:
1. Within the `PingPong` skill, ensure that you are at the **Interaction** level.
2. Under the **Schema** tab, select the type you want to add as slot in the **Slots** section. In this case, select entity type `Location`.
3. Use a label `location` for this slot, so that you can reference it in the response.

::: thumbnail
![add slot](/images/guide/pingpong/add_slot.png)
:::

#### Add annotations to the slot
For any conversationally exposed composite type, we always need to add exemplars and templates at the language level. For this simple skill, in case the user did not provide the location in the initial utterance, the chatbot needs to prompt the user for that information. The exact prompt behavior is controlled by configuring the [fill strategy](../reference/annotations/fillstrategy.md) for that slot. This needs to be done in both Interaction layer and language layer.

##### Interaction level
1. Inside the `PingPong` skill, ensure that you are at the **Interaction** level.
2. Within the `location` slot of `PingPong` skill, select **Always ask** in the **Fill strategy** section.
   ::: thumbnail
   ![define fill strategy](/images/guide/pingpong/always_ask.png)
   :::
   
##### Language level
Be sure to [propagate](opencui-flow.md#propagate-the-changes-to-language-layer) the changes made in the interaction layer to the language layer before [switching over to the language layer](./opencui-flow.md#switch-from-interaction-layer-to-language-layer). At language layer, configure the following annotations:

1. Within the `location` slot of `PingPong` skill, ensure that you are at the **Language / en** level.
2. Fill templates for Prompt. When fill strategy of slot is always ask, you must add at least one template to [Prompt](../reference/annotations/templateandexemplar.md#prompt). 
   - Head to the **Annotation** tab.
   - Enter the sentences in **Prompts** section. For example, "*Wow. Where is the "ping" coming from?*".
3. Add names for `location` slot. 
   - Head to the **Expression** tab.
   - Enter the names in **Names** section, such as "Location".
   
::: thumbnail
![add prompt](/images/guide/pingpong/add_prompt.png)
:::
   
#### Add annotations to the skill
After being triggered, the pingpong skill responds a *"pong"* based on the location provided by the user, this behavior is controlled by a response. Responses are executed after the chatbot has all the slots filled per Interaction logic defined by attached dialog annotations. In reality, we should call out the service APIs and render the return back to user in natural text. It is often necessary to reference slots and functions in the response, which can be easily done using `${}` since all templates on OpenCUI are Kotlin string templates.

##### Interaction level
1. Inside the `PingPong` skill, ensure that you are at the **Interaction** level.
2. Navigate to the **Response** tab and select **Single value message** under the **Default action** section to declare a simple reply.

::: thumbnail
![add response](/images/guide/pingpong/add_response.png)
:::

##### Language level
Be sure to [propagate](opencui-flow.md#propagate-the-changes-to-language-layer) the changes made in the interaction layer to the language layer before [switching over to the language layer](./opencui-flow.md#switch-from-interaction-layer-to-language-layer).

1. Under to the **Responses** tab, enter `Great! Pong to ${location?.expression()}.` in the **Single value message** field and press enter.
::: thumbnail
![pingpong simple reply](/images/guide/pingpong/pingpong_simple_reply.png)
:::

2. Add utterance exemplars to help dialog understanding module to convert utterance into event, some structured representation of meaning.
   - Navigate to the `PingPong` skill and head to the **Expression** tab.
   - In the **Names** section, enter `Ping Pong` for the pingpong skill display name and press enter. This field also provides examples of how this type is mentioned in different languages.
   - In the **Expressions** section, enter `ping` and press enter. If a user's utterance matches any of the exemplars entered here, it will be considered as an intention to trigger this skill.
   ::: thumbnail
   ![pingpong expression](/images/guide/pingpong/pingpong_expression.png)
   :::

## Test a chatbot
Before you begin testing your newly defined chatbot using the **Debug** tool, click **Commit** in the upper-right corner to commit your changes in the language layer. Note that Debug can only be used to test committed content for current language, per [OpenCUI workflow](opencui-flow.md#commit-the-changes).
