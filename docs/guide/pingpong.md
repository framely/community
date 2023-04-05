# Build a simple chatbot
A chatbot is essentially an application with a conversational user interface (CUI). The goal of a chatbot is to invoke functions for the user through this interface. The goal of a CUI is to create an instance of a function type defined by its name and input parameters. The callable instance can then be invoked for the user. 

This view suggests that we can build a CUI in a type-based fashion. First, we declare all the function types we want to expose, along with the types needed by their parameters and return values. Next, we attach dialog annotations to these types and their slots (parameters for functions and attributes for classes).
   ::: thumbnail
   ![create save](/images/guide/pingpong/urr.png)
   :::
On the OpenCUI platform, the CUI behavior is attached to types in the form of dialog annotations. Dialog annotations can be attached to a type as a whole (on its Annotation, Response, and Expression tabs) or attached to its slots. Dialog annotations have two layers: the interaction layer, which decides things like which slot we should request from the user, and the language layer, which decides the phrasing we use to request that information in a given language.

Most dialog annotation need to be configured in two stages: once at interaction layer, once for each language you want to support at language layer. You need to propagate the change you made in interaction layer to language layers before you can configure the language layer portion of the annotation. In this tutorial, we annotate one type at a time, so we will switch to language layer after we are done with interaction layer for each type. For more information about schema, interaction logic and language, check out [chatbot in 3 layers](3layers.md).

One of the major challenges of building a CUI is that the builder does not have control over what the user can express at any given turn. When the current conversation path is not defined by the builder, a flow-based chatbot won't know how to respond, which can be detrimental to the business's interests. In contrast, a type-based chatbot can always engage in a constructive conversation by greedily creating value for missing slots in order to invoke a function for the user. Additionally, it is much easier to reuse a type-based CUI than a flow-based one.

This tutorial will guide you step-by-step through the process of creating and building a simple chatbot on the OpenCUI platform. When interacting with the chatbot, users can get a welcome message and a reply *"pong"* based on the input location. For example:

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

OpenCUI supports [5 levels of CUI](../essentials/5levels-cui.md) capabilities. After completing this tutorial, you will be able to develop [a second-level](../essentials/5levels-cui.md#frame-with-slots) conversational experience, such as allowing users to check your business hours or make a reservation.

## Before you start
- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- It is useful to get familiar with [the type-based way of building chatbot](../essentials/README.md).
- We assume that you have finished [clone a chatbot](./start-with-clone.md).

## Create chatbot
Upon logging in, an organization is automatically generated for you. You can create a chatbot under this organization by following these steps:
1. Within an organization, in the upper right corner of the project area, click **Create** and select **Create chatbot**.
2. In the pop-up window, complete the form for chatbot basic settings. For this simple chatbot, you only need to fill the follow three fields:
   - **Project label**: the unique identifier for the chatbot. Type a short, memorable label for your chatbot, we suggest use low cased label. For example, "*pingpong*".
   - **Region**: where do you want to deploy this chatbot to. Ideally it should be close to your users. 
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
Chatbots allow users to access functions through CUI, and the CUI behavior for an exposed function is defined in its corresponding skill. A chatbot can be built one skill at a time. In this tutorial, let's see how we can define a simple skill: 

### 1. Build dependent types
Before you can build a composite type, whether it is a skill or a frame, you need to build its dependent types first. The most basic type on OpenCUI is "entity". It is a primitive type with a recognition mechanism built in, so that the chatbot knows how to extract the value of this type from user input. OpenCUI provides many predefined entities, such as `java.time.LocalDate` for dates, `io.opencui.core.Email` for email addresses, and so on. Notice every type defined on the OpenCUI has direct mapping onto Java/Kotlin, so that you can use them directly anywhere a code expression is expected.

In this case, we need build a custom entity type `Location`.

#### 1.1 Create entity type and add instances
Ensure that you are inside the **pingpong** chatbot and at the **INTERACTION** view:
1. Click **Create** button on the right side, and select **Create entity** to create a new entity.
2. Enter a label for the entity and press enter. For example, `Location`.
3. Within the `Location` entity, click **Add** button to add entity instances, such as `seattle` in the label field and **Save**. You can add as many instances as you need. 

    ::: thumbnail
    ![create entity](/images/guide/pingpong/create_entity.png)
    :::

#### 1.2 Add annotation
For an entity, we only need to add a language layer annotation for each language we want to support. In addition to the type name, we should add expressions (exemplars for the entity) to each instance we added in the last step so that dialog understanding can recognize it from user input.
1. Navigate to the entity and head to the **Instances** tab. 
2. Click the instance entry, add **Expressions** in the pop-up window.
3. Click **Save**.     
::: thumbnail
![pingpong add entity instance expression](/images/guide/pingpong/pingpong_entity_instance.png)
:::

### 2. Build skill
A skill is a conversationally exposed functionality, with input parameters represented by slots. There is no need to have a one-to-one mapping from a skill to some real service function, although it is supported. To build such a composite type on OpenCUI, we first declare its type at the schema level, then add dialog annotation. 

In this tutorial, let's build a simple skill "pingpong" with one slot of Location type. A location is a required slot for this skill, so when it is missing from the user's initial utterance, chatbot will prompt user for it. Once the object of this function type is instantiated, chatbot simply produces an acknowledgement in form of `pong from ${location}`.

#### 2.1 Create a skill
1. Go to the **pingpong** chatbot and ensure that you are at the **INTERACTION** view.
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

#### 2.1 Declare schema
On a composite type's **Schema** tab, we can add slots, declare local functions and other services needed by this skill.
To add a slot to a type:
1. Navigate to the `PingPong` skill and ensure that you are at the **INTERACTION** level.
2. Under the **Schema** tab, select the type you want to add as slot in the **Slots** section. In this case, select entity type `Location`.
3. Pick a label for this slot, so that you can reference it in the response.

::: thumbnail
![add slot](/images/guide/pingpong/add_slot.png)
:::

#### 3. Annotate interactions

The pingpong skill responds a *"pong"* based on the location provided by the user, when the user sends the message *"ping"*. To accomplish this, let's configure a fill strategy on the slot of Location type, and adding a response. 

In the `PingPong` skill and ensure that you are at the **INTERACTION** level:

1. Navigate to the **Schema** tab and click into the `location` slot. Select **Always ask** in the **Fill strategy** section.
   ::: thumbnail
   ![define fill strategy](/images/guide/pingpong/always_ask.png)
   :::

2. Navigate to the **Response** tab and select **Single value message** under the **Default action** section to declare a simple reply.

   ::: thumbnail
   ![add response](/images/guide/pingpong/add_response.png)
   :::

3. Once you are done with change in the interaction layer, click **Propagate** in the upper-right corner of the **Types** area to make the interaction level change available to language level. 

   ::: thumbnail
   ![commit pingpong interaction](/images/guide/pingpong/commit_pingpong_struct.png)
   :::

#### 4. Fill language template and exemplar
There are two kind of language related annotations, templates and exemplars. The text edits for them are scattered in different context, like when bot prompt a slot, the templates and exemplars defined there will only work in these contexts. Templates define how bot should respond, and utterance similar to exemplars defined on skill expression tab will trigger bot to start that skill, and once a skill is started, bot will follow the interaction logic defined to bring skill to completion and deliver the user what they want. 

At language level, PingPong skill can be configured as follows:

1. Switch to the language layer. Select the language you want to work with from the language selector in the upper-left corner of the Types area. In this case, select **EN** for English.
   ::: thumbnail
   ![switch pingpong en](/images/guide/pingpong/switch_pingpong_en.png)
   :::

2. To fill templates: 
   - Prompt: when fill strategy is always ask, prompt is the template that must be filled, which indicates how the chatbot asks the user when the user does not provide the information required by the chatbot.

     1. Navigate to the **Schema** tab and click into the `location` slot.
     2. Enter the sentences in **Prompts** section. For example, "*Wow. Where is the "ping" coming from?*".
     ::: thumbnail
     ![add prompt](/images/guide/pingpong/add_prompt.png)
     :::
   - Response: indicates the final service delivered by the business, so it is necessary to reply to the user through reference parameters in the response. To reference parameters or call function, you need to use `${}`. 
     
     <!--需要解释 template, ${} 和 expression()} -->
   
     Navigate to the **Responses** tab, enter `Great! Pong to ${location?.expression()}.` in the **Single value message** field and press enter. 
     ::: thumbnail
     ![pingpong simple reply](/images/guide/pingpong/pingpong_simple_reply.png)
     :::

3. To fill utterance exemplars:
   - For a skill, 
     1. Navigate to the skill and head to the **Expression** tab. 
     1. In the **Names** section, enter `Ping Pong` for the pingpong skill display name and press enter. This field is also the examples of how this type is mentioned in different languages.
     2. In the **Expressions** section, enter `ping` and press enter. A user utterance similar to any exemplar entered here will be considered as user want to trigger this skill.
     ::: thumbnail
     ![pingpong expression](/images/guide/pingpong/pingpong_expression.png)
     :::

4. Once you have filled in all the language templates and expression exemplars, click **Commit** in the upper-right corner of the Types area to commit your changes in the language layer.
   ::: thumbnail
   ![commit pingpong en](/images/guide/pingpong/commit_pingpong_en.png)
   :::

## Test chatbot
Now you can test your chatbot by **Debug** tool. Note that Debug can only test committed content, so ensure that both the interaction layer and language layer have been committed before testing.
