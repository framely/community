# Quickstart with PingPong 

This PingPong tutorial will guide you step-by-step through the process of creating, building, and testing a basic chatbot on the OpenCUI platform. A chatbot is essentially an application with a conversational user interface (CUI). Users can interact with the chatbot by first connecting to it, for which they will receive a welcoming message. From there, users can input messages and receive responses from the bot one turn at a time. For example:

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

OpenCUI supports [5 levels of CUI](../../guide/5levels-cui.md) capabilities. By completing this tutorial, you should be able to develop and debug [the first level, FAQ like](../../guide/5levels-cui.md#frame-without-slot) conversational user experience, such as allowing users to check your business hours: 

:::: conversation
::: user User
What is your hours?
:::
::: bot Bot
We open every day from 10:00am to 9:00pm. Can I help you with anything else? 
:::
::: user User
No, thanks
:::
::::

> Before you begin, it is useful to get familiar with [the fundamental idea of crafting conversational applications](../../guide/README.md) and sign up for an [OpenCUI account](../platform/signingup.md).

## Create a Chatbot

>The OpenCUI platform can be understood as GitHub specifically for chatbots. However, instead of repositories, work under organization is organized into projects, including chatbots, reusable modules and providers. Therefore, creating a chatbot is analogous to creating a repository on GitHub.

Upon logging in, an organization (or "org" for short) will be automatically generated for you. You can create a chatbot under this org by following these steps:
1. Within an org, click **Chatbots** on the left side menu to work on chatbots (instead of modules and providers), then click **Create** on the right side.

   ::: thumbnail
   ![create chatbot](/images/guide/pingpong/create_chatbot.png)
   :::

2. Once you click **Create**, a pop-up form for basic chatbot settings will appear, complete the form.
   - **Project Label**, the unique identifier for the chatbot, we suggest use low cased label(e.g., *pingpong*).
   - **Region**: where do you want to deploy this chatbot to. Ideally it should be close to your users. 
   - **Add Language**: add every language you want to support.

   ::: warning Need To Know
   - If you want to change a chatbot's label or region, you will need to clone it with the desired choices. Note all user session data with old chatbot will be lost.
   :::
   
   ::: thumbnail
   ![complete form](/images/guide/pingpong/complete_form.png)
   :::

3. After completing the form, click **Save**.

   ::: thumbnail
   ![create save](/images/guide/pingpong/create_save.png)
   :::

If the chatbot is created successfully, it should be displayed as shown below:
   
   ::: thumbnail
   ![enter chatbot](/images/guide/pingpong/enter_chatbot.png)
   :::

## Build a Chatbot
Chatbots allow user access functions through CUI, and CUI behavior for an exposed function is defined in its corresponding skill. The input parameters of a function are represented by slots in the skill, and the type of these parameters, along with CUI behavior for these types are defined as frames and entities, with frames for composite and polymorphic types, and entities for primitive types. Service is a set of functions, so chatbot is simply a set of skills. Building a chatbot is simply building skills one at a time.

::: thumbnail
![three layers](/images/guide/pingpong/3layers.png)
:::
CUI can be divided into interaction and language layer. The language layer are responsible for converting between natural language text and semantics (structured representation of meaning), interaction logic (also known as dialog management), decide how bot should react in semantics. For more information about each of the layers, see [Separation of Concerns](../../guide/README.md#separation-of-concerns) and [4 Layers of Chatbot](../../guide/glossary.md#chatbot).

In this tutorial, let's see how we can define a simple skill, the one without any slots in the following 4 steps. 

### 1. Create Skill
1. Go to the **pingpong** chatbot and ensure that you are at the **STRUCT** level.

   ::: thumbnail
   ![struct level](/images/guide/pingpong/struct_level.png)
   :::

2. Click **Create** button on the right side to create a new skill.

   ::: thumbnail
   ![create intent](/images/guide/pingpong/create_intent.png)
   :::

3. Enter a label for the skill, such as `PingPong`, in the **Skill Label** field and press enter.

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

### 1. Declare Schema
A skill defines how we invoke a function through CUI, so to build a skill, we need to first declare its schema, or signature of the corresponding function, this includes mostly the input parameters of the function. On a skill's  **Schema** tab, we can add slots, functions and other services needed by this skill. Since the simple skill like "pingpong" does not have any slots, we can skip the [service description phase at the schema level](../../guide/getting-started.md#1-describe-services-at-schema-level).

### 2. Annotate Interactions
On OpenCUI platform, the CUI behavior of any type, include skills, frames and entities, can be defined in form of dialog annotation. Dialogue annotation can be attached to type as whole (on its Annotation, Response and Expression tab), or attached to its slots. Dialogue annotations need to be configured at interaction layer first before we can configure it at the language level.

The pingpong skill responds a *"pong"* when the user sends the message *"ping"*.  This can be done by adding a response to the skill at interaction layer. 
1. Navigate to the **Response** tab and select **Single Value Message** under the **Default Action** section to declare a simple reply.

   ::: thumbnail
   ![add response](/images/guide/pingpong/add_response.png)
   :::

2. Once you are done with change in the interaction layer, click **Commit** in the upper-right corner of the Build area to make the interaction level change available to language level. 

   ::: thumbnail
   ![commit pingpong struct](/images/guide/pingpong/commit_pingpong_struct.png)
   :::

### 3. Fill Language Template and Exemplar
Most dialog annotations need to be configured at the language level, one for each language supported. There are two kind of language related annotations, templates and exemplars. The text edits for them are scattered in different context, like when bot prompt a slot, the templates and exemplars defined there will only work in these contexts. Templates define how bot should respond, and utterance similar to exemplars defined on skill expression tab will trigger bot to start that skill, and once a skill is started, bot will follow the interaction logic defined to bring skill to completion and deliver the user what they want. 

At language level, PingPong skill can be configured as follows:

1. Switch to the language layer. Select the language you want to work with from the language selector in the upper-left corner of the Build area. In this case, select **EN** for English.

   ::: thumbnail
   ![switch pingpong en](/images/guide/pingpong/switch_pingpong_en.png)
   :::

2. To fill response templates, heading to the **Responses** tab, enter `Pong` in the **Single Value Message** field under the **Default Action** section, then press enter. 

   ::: thumbnail
   ![pingpong simple reply](/images/guide/pingpong/pingpong_simple_reply.png)
   :::

3. To fill utterance exemplars for a skill, heading to the **Expression** tab of that skill: 
   - In the **Names** section, enter `Ping Pong` for the pingpong skill display name and press enter. This field is also the examples of how this type is mentioned in different languages.
      ::: thumbnail
      ![pingpong alias](/images/guide/pingpong/pingpong_alias.png)
      :::

   - In the **Expressions** section, enter `ping` and press enter. A user utterance similar to any exemplar entered here will be considered as user want to trigger this skill.
      ::: thumbnail
      ![pingpong expression](/images/guide/pingpong/pingpong_expression.png)
      :::
   
4. Once you have filled in all the language templates and expression exemplars, click **Commit** in the upper-right corner of the Build area to commit your changes in the language layer.

   ::: thumbnail
   ![commit pingpong en](/images/guide/pingpong/commit_pingpong_en.png)
   :::

## Chatbot Testing 
OpenCUI includes a built-in testing feature called **Debug** that helps you uncover CUI bugs by providing debug information. With Debug, you can test your chatbot without setting up channels.

Note that Debug can only test committed content, so ensure that both the interaction layer and language layer have been committed before testing.

::: thumbnail
******![commit struct](/images/guide/pingpong/commit_struct.png)******
*Commit on Interaction level*

<br>

![commit lang](/images/guide/pingpong/commit_lang.png)
*Commit on EN level*
:::

To test your chatbot using Debug, follow these steps:

1. On the language layer, click **Debug** in the upper-right corner of the Build area , the debug field will slide out. 

   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   *Click Debug*

   <br>

   ![try it now](/images/guide/pingpong/tryitnow.png)
   *Debug slide out*
   :::

2. Click **Connect**. This may take some time to as we build and deploy the chatbot to our test environment. Once the connection is established successfully, you can test your chatbot by typing messages.

   ::: thumbnail
   ![connect](/images/guide/pingpong/connect.png)
   :::

3. Enter `ping` in the text input box at the bottom and press enter, then the bot should respond with `Pong`. If you add more than one template, bot will randomly select one for reply. If you add more than one examplar to a skill, any examplar will trigger that skill. It is assumed that the skills are semantically exclusively, so that one should not use the same exemplar in different skills from the same bot. As the skill level exemplars has no context. 

You can save test cases by clicking the "**Save Test Case**" icon, and restart your testing by clicking the "**Reset Contexts**" icon. If there are any exceptions, you can view log information by clicking the "**View Log**" icon. For more information about Debug, refer to the [Testing](../platform/testing.md) section.

   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::

