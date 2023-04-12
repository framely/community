# Build a simple chatbot
A chatbot is an application that provides services to users through a conversational user interface (CUI). A service is an interface for a business capability that usually consists of a set of Application Programming Interface(API) functions. These interfaces decouple the client from the provider, allowing software to be developed independently and reused across various applications and systems.

In order to invoke API functions in a conversational manner, the chatbot needs to create an instance of a function type through conversations, which implies that chatbot also needs to create instances for the input parameters of the function or attributes of composite types in a more general sense. This suggests that we can build a conversational user interface in a type-based fashion in two steps:

1. Declare all the types for which you want to create instances conversationally;
2. Attach dialog annotations to these types and their slots to describe how the whole or part of these types can be instantiated conversationally.

   ::: thumbnail
   ![create save](/images/guide/pingpong/urr.png)
   :::

OpenCUI is designed to support most APIs that can be defined by OpenAPI, a widely used standard for documenting RESTful APIs. This means you can add dialog annotation to not only primitive types like Int, String, but also array, user defined type with polymorphism support, making it easy to build conversational interfaces for arbitrary service APIs. On OpenCUI, functions are represented by skills, user-defined types by frames, and primitive type by entities. Types declared in OpenCUI can be either internal or external. For internal types, OpenCUI generates a Kotlin class, while for external types, it uses existing Java/Kotlin types, ensuring that every type has a direct representation at the Java/Kotlin level. This allows users to tap into the vast Java ecosystem and leverage any available functionality, as well as use Kotlin code expressions to directly express logic.

After a type is declared in OpenCUI, dialog annotations are attached in two layers. In the interaction layer, the annotation determines how conversation is conducted in the language-independent semantic layer. For each supported language, the annotation in the language layer determines how to map the text in the target language to structured semantics and vice versa. As a result, conversation-exposed types are typically defined in three layers: schema, interaction, and language, with entities only in two layers: schema and language.

This tutorial will guide you step-by-step through the process of creating and building a simple chatbot on the OpenCUI platform. The chatbot you build will be able to carry out conversation detailed in the last guide.

OpenCUI adopts a [5 levels maturity model](../essentials/5levels-cui.md) for CUI capabilities. This tutorial will guide you step-by-step through the process of building the same chatbot you played in last guide. After completing this tutorial, you will be able to develop [skills with slots](../essentials/5levels-cui.md#frame-with-slots) conversational experience, enough to allow users to check your business hours or make a reservation.

## Before you start
- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- It is useful to get familiar with [the type-based way of building chatbot](../essentials/README.md).
- We assume that you have finished [clone a chatbot,](./start-with-clone.md) so you know what to build.


## Create a chatbot project
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

::: Tip
Dialog annotations can be attached to a type, either in type-level annotation or to its slot in slot-level annotation.
In this series of quickstart guides, you will complete all the interaction layer configurations for a slot (or a type if it has no slot) before moving on to the language layer. This is not the only way to do it, but we hope it is the easiest to follow. To annotate a type, follow these steps:
1. Add the slot level annotation, one slot at a time.
2. Add the type level annotation.
3. If the type is a skill, configure the response for it.
::: 


## Build a chatbot
Since chatbots can be thought of as a set of independent functionalities, each of these conversationally exposed functions is defined by a skill. We can build a chatbot by building skills, one skill at a time. To build a composite type like skill, we first need to build its dependent types, recursively. 

The conversational experience you will build in the guide require a skill `pingpong` and it needs a primitive type `Location`. So this chatbot need to build two conversationally exposed types:
1. Build a `Location` entity.
2. Build a `Pingpong` skill.

### Build entity: Location
The most basic type in OpenCUI is 'entity'. It is a primitive type that the chatbot knows how to extract the value of from the user's utterance. OpenCUI provides many predefined entities, such as `java.time.LocalDate` for dates, `io.opencui.core.Email` for email addresses, and so on. In this case, let's build a custom entity type `Location`. 


#### Schema layer: create entity and add instances
Ensure that you are inside the **pingpong** chatbot and under the **Structure** view:
1. Click **Create** button on the right side, and select **Create entity** to create a new entity.
2. Enter a label for the entity type and press enter. For example, `Location`.
3. Within the `Location` entity, click **Add** button to add entity instances, you are required to provide a language independent label for each instance, such as `seattle` in the label field and **Save**. You can add as many instances as you need. No spaces are allowed in the instance label, or in any label at all.

    ::: thumbnail
    ![create entity](/images/guide/pingpong/create_entity.png)
    :::

#### Language layer
To enable the chatbot to extract user mentions and create instances for an entity type from user utterances, one or more recognizers must be configured for that type. User-defined entities come with a list-based recognizer, which requires the builder to [enumerate common expressions](../reference/annotations/templateandexemplar.md#expression-for-entity-instance) for each instance that was added for this type in the previous step.

Before beginning work on the language layer, be sure to [propagate](./opencui-flow.md#propagate-the-changes-to-language-layer) the changes made in the interaction layer to the language layer, and then switch over to the language layer.

##### Add expressions for instance
For each instance, we need to enumerate the common expressions that might refer to the instance.
1. Navigate to the entity and head to the **Instances** tab. 
2. For each instance, click to add expressions** in the pop-up window.
3. Click **Save**.
    ::: thumbnail
    ![pingpong add entity instance expression](/images/guide/pingpong/pingpong_entity_instance.png)
    :::

##### Add name for entity type
For type itself, we should also provide the expression or name for the given language.
1. Within the `Location` entity, head to the **Expression** tab.
2. In the **Names** section, enter `Location` for the Location entity display name and press enter. This field also provides examples of how this type is mentioned in different languages.
    ::: thumbnail
    ![pingpong add entity expression](/images/guide/pingpong/pingpong_entity_expression.png)
    :::

### Build a skill
Conceptually, a skill is a conversationally exposed functions, with input parameters represented by its slots. In this tutorial, let's build a simple skill "pingpong" with a single slot of Location type. A location is a required slot for this skill, so when it is missing from the user's initial utterance, the chatbot will prompt the user for it. Once the instance of this function type is created, the chatbot simply produces an acknowledgement in the form of `pong to ${location}`.

#### Schema layer
At this layer, we create the skill, add all its slots that represents input parameters for the corresponding function, as well as local functions and services. 

##### Create skill
Inside the **pingpong** chatbot, head to **Types** page and make sure you are under the **Structure** view.
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

##### Add slots
On a composite type's **Schema** tab, we can add slots to this skill.
To add a slot to a type:
1. Inside the `PingPong` skill, ensure that you are under the **Structure** view.
2. Under the **Schema** tab, select the type you want to add as slot in the **Slots** section. In this case, select entity type `Location`.
3. Pick a label for the slot, in this case let's use `location`, so that you can reference it in the response.

::: thumbnail
![add slot](/images/guide/pingpong/add_slot.png)
:::

#### Add annotations to the slot
For any conversationally exposed composite type, we always need to add exemplars and templates at the language level. For this simple skill, in case the user did not provide the location in the initial utterance, the chatbot needs to prompt the user for that information. The exact prompt behavior is controlled by configuring the [fill strategy](../reference/annotations/fillstrategy.md) for that slot. This needs to be done in both Interaction layer and language layer.

##### Interaction layer
1. Inside the `PingPong` skill, ensure that you are under the **Structure** view.
2. Within the `location` slot of `PingPong` skill, select **Always ask** in the **Fill strategy** section.
   ::: thumbnail
   ![define fill strategy](/images/guide/pingpong/always_ask.png)
   :::
   

##### Language level
Be sure to [propagate](opencui-flow.md#propagate-the-changes-to-language-layer) the changes made in the interaction layer to the language layer before switching over to the language layer. At language layer, configure the following annotations:

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
   
#### Configure response for the skill
After being triggered, the pingpong skill responds a *"pong"* based on the location provided by the user, this behavior is controlled by a response. Responses are executed after the chatbot has all the slots filled per Interaction logic defined by attached dialog annotations. In reality, we should call out the service APIs and render the return back to user in natural text. It is often necessary to reference slots and functions in the response, which can be easily done using `${}` since all templates on OpenCUI are Kotlin string templates.

##### Interaction layer
1. Inside the `PingPong` skill, ensure that you are under the **Structure** view.
2. Navigate to the **Response** tab and select **Single value message** under the **Default action** section to declare a simple reply.

::: thumbnail
![add response](/images/guide/pingpong/add_response.png)
:::

##### Language layer
Be sure to [propagate](opencui-flow.md#propagate-the-changes-to-language-layer) the changes made in the interaction layer to the language layer before switching over to the language layer.

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
