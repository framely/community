# Quick Start with PingPong 
> Follow this PingPong chatbot to get started with OpenCUI.

This guide will walk you through using OpenCUI platform to build and test a simple PingPong chatbot. When interacting with this chatbot, a user can get greeting message, and response of *"pong"* to his input message *"ping"*:

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

After this simple PingPong chatbot, you can easily build [level 1 conversational user interface](./5levels-cui.md#frame-without-slot), and easily manage how the messages are presented to users per your own business logic. For example, if you are a restaurant, you can let your users check your business hours as follows:

:::: conversation
::: bot Bot
Hi! I'm a virtual Restaurant chatbot. How can I assist you today?
:::
::: user User
What is your hours?
:::
::: bot Bot
We open every day from 10:00am to 9:00pm. Can I help you with anything else? 
:::
::: user User
No, thanks
:::
::: bot Bot
Thank you for contacting the virtual Restaurant chatbot. I am glad I could help you today. Good-bye!
:::
::::

Now, let's begin:

[[toc]]

## Before You Begin

Before you start follow this guide, it is suggested that you go through the following list first.
1. Get familiar with [the basic idea of building conversational apps](README.md).
2. [Make sure that you meet the prerequisite](are-you-ready.md)
3. [Sign Up For OpenCUI Account](../reference/platform/signingup.md)

## Create
After logging in, there will be an org *(short for organization)* created automatically for you, which is how you manage everything on the OpenCUI platform. To create chatbot, follow these steps: 

1. Select an org from your **org label** (If you are already inside an org, you can skip this step): 

::: thumbnail
![org list](/images/guide/pingpong/orglist.png)
:::

2. When you are inside an org, head to **Chatbots** page by clicking **Chatbots** in the left sidebar menu, then click the **Create** button on the right side.

::: thumbnail
![create chatbot](/images/guide/pingpong/create_chatbot.png)
:::

3. Complete the form for basic chatbot settings, here you only need to care about the **Project Label**, **Region** and **Add language**. All of them can be modified after creation except the **Region** field:
   1. Enter your chatbot's name in the **Project Label** field, start with lowercase, for example `pingpong`.
   2. Select your preferred **Region**.
   3. Select the languages for your chatbot in the **Add Language** field.

   ::: thumbnail
   ![complete form](/images/guide/pingpong/complete_form.png)
   :::

   ::: warning Need To Know
   - When you create a chatbot, you must specify a region. For the best performance, you should choose a region that is near your services and end-users. 

   - Once a chatbot is created, its **Region** cannot change. In order to change a chatbot's region, you must export or clone a new chatbot with a different region.
   :::

   <br>

4. Once you are done with the form, click the **Save** button.

::: thumbnail
![create save](/images/guide/pingpong/create_save.png)
:::

If created successfully, you can see the chatbot shown like the following:

::: thumbnail
![enter chatbot](/images/guide/pingpong/enter_chatbot.png)
:::

## Build

Chatbot is essentially just a set of [intents](/guide/concepts.md#intents) and its dependency. An intent offers conversational interface to some functionality, typically as part of some [services](/guide/concepts.md#services). In conversation layer, the intent represents what a user wants, is typically expressed by full sentences or verb phrases in user utterances.

When you create a chatbot, the following **Default Intents** are created automatically for you, and you can modify them as desired. 

### Default Intents

- **Greeting**: a default welcome intent, this intent has simple expression exemplars like *"Hi"* or *"Hello"* that are matched when the user begins a conversation with your bot. This intent could return a response to let the user know what your bot does or what they can say to begin a conversation. 

- **Goodbye**: a default ending intent, this intent returns a response to let the user know the conversation or service is ending soon. 

- **Main**: a default mechanism for each chatbot. 

::: thumbnail
![default intents](/images/guide/pingpong/default_intents.png)
:::

### Create a New Intent

For each chatbot, you can define many intents. The steps in this section create an intent that can response with "pong" to message "ping".

#### Create an Intent 

1. Click the **Create** button on the right side.

::: thumbnail
![create intent](/images/guide/pingpong/create_intent.png)
:::

2. Enter `PingPong` in the **Intent Label** field, press enter. 

::: thumbnail
![intent label](/images/guide/pingpong/intent_label.png)
:::

::: warning Need To Know
- Label is not a name, it is **identifier**, a language independent aspect for semantics in OpenCUI. 
- As a type label, **Intent Label** should start with capital case, limited 2-100 characters, and only support letters, digits and underscores.
:::

<br>

#### Build PingPong Intent

Separation of concerns is essential in increasing productivity and reducing the cost of building things. OpenCUI decompose chatbot into **3 layers**: schema, interaction and language perception. In this way, the exact conversational experience should be easily controlled by you based on arbitrary business logic. For example, it should be more easier to keep a multilingual chatbot with the same structure which can provide a consistent experience in each language. For more information, see [Separation of Concerns](../guide/README.md#separation-of-concerns).

In this PingPong bot, we can just care about two layers: **interaction** and **language**. The difference between interaction and language is whether the entry is language-dependent or not. Language-related aspect like expression, prompt, reply for dialog understanding and template for text generation needs to be defined on language level, while others should be on structure level. In this way, you can always keep all language bots with the same structure which can provide a consistent experience in multilingual chatbot. For more information, see [Multilingual](../reference/platform/multilingual.md).  

So building PingPong intent, should add response on the structure level first:

1. On **STRUCT** level, click the **Response** tab, add **Simple Reply** in the **Default Action** section.

::: thumbnail
![add response](/images/guide/pingpong/add_response.png)
:::

2. Click **Commit** icon in the right sidebar, for propagating structure level instances to each language level. 

::: thumbnail
![commit pingpong struct](/images/guide/pingpong/commit_pingpong_struct.png)
:::

3. Select **language** in the second topbar, switch to the language level. In this case, we will switch to **EN** *(short for English)* level. 

::: thumbnail
![switch pingpong en](/images/guide/pingpong/switch_pingpong_en.png)
:::

Now let's add language-related aspects:

4. On the language level, click the **Expression** tab, enter `Ping Pong` in the **Alias** section, press enter. This field is the display name of an intent, and it is also an example of what a user might type or express this intent.

::: thumbnail
![pingpong alias](/images/guide/pingpong/pingpong_alias.png)
:::

5. In the **Expression** tab, enter `ping` in the **Expressions** section, press enter.

::: thumbnail
![pingpong expression](/images/guide/pingpong/pingpong_expression.png)
:::

6. Click the **Responses** section, enter `Pong` in the **Simple Reply** section. 

::: thumbnail
![pingpong simple reply](/images/guide/pingpong/pingpong_simple_reply.png)
:::


## Test

Let's try this PingPong bot, which can handle a basic conversation with a welcome message and response with "pong" to message "ping". OpenCUI provides a built-in test feature "**Try It Now**" to help you to uncover bugs with the debug info, you can test your chatbot by typing messages. 

::: tip Note
As **Try It Now** can only test committed content, please make sure both structure level and language level have been committed. For more information, see [Testing](../reference/platform/testing.md).
:::

<br>

1. Make sure you have committed on each level.

::: thumbnail
![commit struct](/images/guide/pingpong/commit_struct.png)
*Figure 1: click commit on STRUCT level*

<br>

![commit lang](/images/guide/pingpong/commit_lang.png)
*Figure 2: click commit on EN level*
:::

2. Click **Try It Now** icon in the right sidebar, the test field will slide out. 

::: thumbnail
![try it now](/images/guide/pingpong/tryitnow_icon.png)
*Figure 1:  click Try It Now icon*

<br>

![try it now](/images/guide/pingpong/tryitnow.png)
*Figure 2: Try It Now slide out*
:::

3. Click **Connect**, and you can test your bot by typing messages.

::: thumbnail
![connect](/images/guide/pingpong/connect.png)
:::

4. Enter `ping` in the text entry and press enter, the bot responds `Pong`.

::: thumbnail
![pingpong test](/images/guide/pingpong/pingpong_test.png)
:::

::: tip Note
You can restart your testing by clicking "**Reset Context**" icon, and create test cases by clicking "**Save Test case**" icon, then you can run test cases when needed. For more information, see [Testing](../reference/platform/testing.md).
:::

## Modify

As we said at the beginning, you can easily manage how the messages are presented to users per your own business logic, and achieved [level 1 conversational user interface](./5levels-cui.md#frame-without-slot), for example: 

:::: conversation
::: bot Bot
Hi! I'm a virtual Restaurant chatbot. How can I assist you today?
:::
::: user User
What is your hours?
:::
::: bot Bot
We open every day from 10:00am to 9:00pm. Can I help you with anything else? 
:::
::: user User
No, thanks
:::
::: bot Bot
Thank you for contacting the virtual Restaurant chatbot. I am glad I could help you today. Good-bye!
:::
::::

You can provide this experience by following these steps:

1. Create a new intent, labeled as "BusinessHours".

::: thumbnail
![create hours](/images/guide/pingpong/create_hours.png)
:::

2. Add the response action you need, in this case we add a **Simple Reply** here, then commit struct.

::: thumbnail
![add hours response](/images/guide/pingpong/add_hours_response.png)
:::

3. Switch to the language side. In **Response** tab, enter `We open every day from 10:00am to 9:00pm.` in the simple reply and press enter.

::: thumbnail
![add hours reply](/images/guide/pingpong/add_hours_reply.png)
:::

4. In **Expression** tab, enter `We open every day from 10:00am to 9:00pm.` in **Expressions** field and press enter. Don't forget to add **Alias** at the same time.

::: thumbnail
![add hours expression](/images/guide/pingpong/add_hours_expression.png)
:::

5. Modify the **Greeting** intent **Response**, enter `Hi! I'm a virtual Restaurant chatbot.` in the simple reply and press enter.

::: thumbnail
![modify greeting](/images/guide/pingpong/modify_greeting.png)
:::

6. Modify the **Goodbye** intent **Response**, enter `Hi! I'm a virtual Restaurant chatbot.` in the simple reply and press enter.

::: thumbnail
![modify goodbye](/images/guide/pingpong/modify_goodbye.png)
:::

7. Add a prompt in the **skills** slot of **Main** intent, enter `How can I assist you today?` in the **Prompts** field and press enter. No need to delete any prompts, when there are multiple prompts, bot will randomly display one to the user.

::: thumbnail
![main skills](/images/guide/pingpong/main_skills.png)
*Figure 1: click skills in Main intent*

<br>

![add skills prompt](/images/guide/pingpong/add_skills_prompt.png)
*Figure 2: add prompt*
:::

8. Commit and Try it Now. If you get this, congratulations, you're done!

::: thumbnail
![modify result](/images/guide/pingpong/modify_result.png)
:::

