# Build a chatbot
A chatbot is essentially an application with a conversational user interface (CUI). The goal of a chatbot is to invoke functions for the user through this interface. The goal of a CUI is to create an instance of a function type defined by its name and input parameters. The callable instance can then be invoked for the user. 

This view suggests that we can build a CUI in a type-based fashion. First, we declare all the function types we want to expose, along with the types needed by their parameters and return values. Then, we attach dialog annotations to convert user utterances into data structures represented as frame events. Next, we attach dialog annotations to these types and their slots (parameters for functions and attributes for classes), including both interaction logic, templates, and exemplars at the language layer to help convert back and forth between semantics and natural text.

   ::: thumbnail
   ![create save](/images/guide/pingpong/urr.png)
   :::

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
Chatbots allow user access functions through CUI, and CUI behavior for an exposed function is defined in its corresponding skill. The input parameters of a function are represented by slots in the skill, and the type of these parameters, along with CUI behavior for these types are defined as frames and entities, with frames for composite and polymorphic types, and entities for primitive types. Service is a set of functions, so chatbot is simply a set of skills. Building a chatbot is simply building skills one at a time.


CUI can be divided into interaction and language layer. The language layer are responsible for converting between natural language text and semantics (structured representation of meaning), interaction logic (also known as dialog management), decide how bot should react in semantics. For more information about each of the layers, see [3 layers of chatbot](3layers.md).

In this tutorial, let's see how we can define a simple skill in the following 4 steps: 
### 1. Create dependent types


### 1. Create skill
1. Go to the **pingpong** chatbot and ensure that you are at the **INTERACTION** level.
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

### 2. Declare schema
A skill defines how we invoke a function through CUI, so to build a skill, we need to first declare its schema, or signature of the corresponding function, this includes mostly the input parameters of the function. On a skill's **Schema** tab, we can add slots, functions and other services needed by this skill. 

A simple skill like "pingpong" is parameterized with slots, which needs to respond the reply based on the information provided by the user. When there are missing informations in the user's initial utterance, chatbot will conduct conversations to collect them. This can be done by adding slots to the skill at schema tab of the interaction layer.


#### 2.2 Add slot

When you have created types you need, you can add them as slots to your skill. When the skill becomes active, chatbot will collect information according to the slot and handle the conversation by the fill strategy. 

To add a slot to a skill:
1. Navigate to the `PingPong` skill and ensure that you are at the **INTERACTION** level.
2. Under the **Schema** tab, select the type you want to add as slot in the **Slots** section. In this case, select entity type `Location`.

::: thumbnail
![add slot](/images/guide/pingpong/add_slot.png)
:::


### 3. Annotate interactions
On OpenCUI platform, the CUI behavior of any type, include skills, frames and entities, can be defined in form of dialog annotation. Dialogue annotation can be attached to type as whole (on its Annotation, Response and Expression tab), or attached to its slots. Dialogue annotations need to be configured at interaction layer first before we can configure it at the language level.

The pingpong skill responds a *"pong"* based on the location provided by the user, when the user sends the message *"ping"*. To accomplish this requires defining the slot fill strategy and adding a response to the skill at interaction layer. 

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

### 4. Fill language template and exemplar
Most dialog annotations need to be configured at the language level, one for each language supported. There are two kind of language related annotations, templates and exemplars. The text edits for them are scattered in different context, like when bot prompt a slot, the templates and exemplars defined there will only work in these contexts. Templates define how bot should respond, and utterance similar to exemplars defined on skill expression tab will trigger bot to start that skill, and once a skill is started, bot will follow the interaction logic defined to bring skill to completion and deliver the user what they want. 

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
   - For a entity, in addition to the type name, you also need to add expression for all instances:
     1. Navigate to the entity and head to the **Instances** tab. 
     2. Click the instance entry, add **Expressions** in the pop-up window.
     3. Click **Save**.     
     ::: thumbnail
     ![pingpong add entity instance expression](/images/guide/pingpong/pingpong_entity_instance.png)
     :::

4. Once you have filled in all the language templates and expression exemplars, click **Commit** in the upper-right corner of the Types area to commit your changes in the language layer.
   ::: thumbnail
   ![commit pingpong en](/images/guide/pingpong/commit_pingpong_en.png)
   :::

## Test chatbot
Now you can test your chatbot by **Debug** tool. Note that Debug can only test committed content, so ensure that both the interaction layer and language layer have been committed before testing.
