# Build a simple chatbot
A chatbot is essentially an application with a conversational user interface (CUI) and the goal of a chatbot is to invoke functions for the user through a conversational user interface (CUI). The goal of a CUI is then to create an instance of a function type defined by its name and input parameters, along with their respective types. With the function identified and values for its parameters instantiated, the callable instance created can then be used to invoke the desired function for the user. This view suggests that we can build a CUI in a type-grounded fashion: first, convert user utterances into data structures (represented as frame events), then follow the interaction logic predefined by the builder to generate a structured representation of the response (called a dialog act), and finally, render such a dialog act into natural text in a given language and style.

   ::: thumbnail
   ![create save](/images/guide/pingpong/urr.png)
   :::
In this type-grounded way of building CUI, we start with what services/functions that we want to expose to user through CUI. For each type involved, including the function types, and parameter types for these functions, and also types needed to define these types, we attach dialog annotations that specify how chatbot can create instance of that type through conversations. 

One of the major challenges of building a CUI is that the builder does not have control over what the user can express at any given turn. This can be problematic for the popular flow-based approach where the chatbot won't know what to respond if the current conversational flow is not defined by the builder. If the CUI is defined in a type-grounded fashion, the chatbot can always engage in a constructive conversation, by figuring out the next instance that it needs to create in order to invoke a function for the user. In addition, it is much easier to reuse type-grounded CUI than the flow-based ones.

This tutorial will guide you step-by-step through the process of creating, building a simple chatbot in a type-grounded fashion on the OpenCUI platform. After connecting to chatbot, users can input messages and receive responses from the bot one turn at a time. For example:

:::: conversation
::: bot Bot
Hi! I'm a virtual PingPong chatbot. How can I assist you today?
:::
::: user User
Ping
:::
::: bot Bot
Pong. What else can I do for you? 
:::
::: user User
No, thanks
:::
::: bot Bot
Thank you for contacting the virtual PingPong chatbot. Have a great day! 
:::
::::

OpenCUI supports [5 levels of CUI](../reference/essentials/5levels-cui.md) capabilities. By completing this tutorial, you should be able to develop and debug [the first level, FAQ like](../reference/essentials/5levels-cui.md#frame-without-slot) conversational user experience, such as allowing users to check your business hours.

## Before you start
* [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
* It is useful to get familiar with [the type-grounded way of building chatbot](../reference/essentials/sgcui.md).

## Create chatbot

>The OpenCUI platform can be understood as GitHub specifically for chatbots. Creating a chatbot is analogous to creating a repository on GitHub.

Upon logging in, an organization (or "org" for short) will be automatically generated for you. You can create a chatbot under this org by following these steps:
1. Within an org, click **Create** on the right side and select **Create chatbot**.
2. Once you click **Create chatbot**, a pop-up window for basic chatbot settings will appear, complete the form. For this simple chatbot, you only need to fill the follow three fields:
   - **Project label**: the unique identifier for the chatbot, we suggest use low cased label(e.g., *pingpong*).
   - **Region**: where do you want to deploy this chatbot to. Ideally it should be close to your users. 
   - **Languages**: add every language you want to support.

   After completing the form, click **Create**.

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

## Build chatbot
Chatbots allow user access functions through CUI, and CUI behavior for an exposed function is defined in its corresponding skill. The input parameters of a function are represented by slots in the skill, and the type of these parameters, along with CUI behavior for these types are defined as frames and entities, with frames for composite and polymorphic types, and entities for primitive types. Service is a set of functions, so chatbot is simply a set of skills. Building a chatbot is simply building skills one at a time.


CUI can be divided into interaction and language layer. The language layer are responsible for converting between natural language text and semantics (structured representation of meaning), interaction logic (also known as dialog management), decide how bot should react in semantics. For more information about each of the layers, see [3 layers of chatbot](3layers.md).

In this tutorial, let's see how we can define a simple skill, the one without any slots in the following 4 steps. 

### 1. Create skill
1. Go to the **pingpong** chatbot and ensure that you are at the **INTERACTION** level.
2. Click **Create** button on the right side to create a new skill.
3. Enter a label for the skill, such as `PingPong`, in the **Skill label** field and press enter.
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
A skill defines how we invoke a function through CUI, so to build a skill, we need to first declare its schema, or signature of the corresponding function, this includes mostly the input parameters of the function. On a skill's  **Schema** tab, we can add slots, functions and other services needed by this skill. Since the simple skill like "pingpong" does not have any slots, we can skip this.

### 3. Annotate interactions
On OpenCUI platform, the CUI behavior of any type, include skills, frames and entities, can be defined in form of dialog annotation. Dialogue annotation can be attached to type as whole (on its Annotation, Response and Expression tab), or attached to its slots. Dialogue annotations need to be configured at interaction layer first before we can configure it at the language level.

The pingpong skill responds a *"pong"* when the user sends the message *"ping"*.  This can be done by adding a response to the skill at interaction layer. 
1. Navigate to the **Response** tab and select **Single value message** under the **Default action** section to declare a simple reply.

   ::: thumbnail
   ![add response](/images/guide/pingpong/add_response.png)
   :::

2. Once you are done with change in the interaction layer, click **Propagate** in the upper-right corner of the Types area to make the interaction level change available to language level. 

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

2. To fill response templates, heading to the **Responses** tab, enter `Pong` in the **Single value message** field under the **Default action** section, then press enter. 
   ::: thumbnail
   ![pingpong simple reply](/images/guide/pingpong/pingpong_simple_reply.png)
   :::

3. To fill utterance exemplars for a skill, heading to the **Expression** tab of that skill: 
   - In the **Names** section, enter `Ping Pong` for the pingpong skill display name and press enter. This field is also the examples of how this type is mentioned in different languages.
   - In the **Expressions** section, enter `ping` and press enter. A user utterance similar to any exemplar entered here will be considered as user want to trigger this skill.
   ::: thumbnail
   ![pingpong expression](/images/guide/pingpong/pingpong_expression.png)
   :::
   
4. Once you have filled in all the language templates and expression exemplars, click **Commit** in the upper-right corner of the Types area to commit your changes in the language layer.
   ::: thumbnail
   ![commit pingpong en](/images/guide/pingpong/commit_pingpong_en.png)
   :::

### 5. Test chatbot
Note that Debug can only test committed content, so ensure that both the interaction layer and language layer have been committed before testing.
