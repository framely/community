# Quick Start with PingPong 
> Follow this PingPong chatbot to get started with OpenCUI.

This guide will walk you through using OpenCUI platform to build, test and deploy a simple PingPong chatbot. When interacting with this chatbot, a user can get greeting message, and response of *"pong"* to his input message *"ping"*. For example:

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

After this simple PingPong chatbot, you can easily build the first level of CUI [frame without slot](./5levels-cui.md#frame-without-slot), and easily manage how the messages are presented to users per your own business logic. For example, if you are a restaurant, you can let your users check your business hours as follows:

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
2. Make sure that you meet the [prerequisite](are-you-ready.md).
3. [Sign up](../reference/platform/signingup.md) for OpenCUI account.

## Create Chatbot
After logging in, there will be an org *(short for organization)* automatically created for you. Select this org or any other org you want from your org list: 
::: thumbnail
![org list](/images/guide/pingpong/orglist.png)
:::

To create a chatbot, follow these steps (If you are already inside a chatbot, you can skip these steps): 

1. When you are inside an org, head to chatbot list page by clicking **Chatbots** in the left sidebar menu, then click the **Create** button on the right side.

   ::: thumbnail
   ![create chatbot](/images/guide/pingpong/create_chatbot.png)
   :::

2. After clicking the **Create** button, there will be a pop-up window. You should complete the form for basic chatbot settings, here you only need to care about the **Project Label**, **Region** and **Add language**. All of them can be modified after creation except the **Region** field:
   - Enter your chatbot's name in the **Project Label** field, start with lowercase, for example `pingpong`.
   - Select your preferred **Region**.
   - Select the languages for your chatbot in the **Add Language** field.

   ::: warning Need To Know
   - When you create a chatbot, you must specify a region. For the best performance, you should choose a region that is near your services and end-users. 

   - Once a chatbot is created, its **Region** cannot change. In order to change a chatbot's region, you must export or clone a new chatbot with a different region.
   :::
   
   ::: thumbnail
   ![complete form](/images/guide/pingpong/complete_form.png)
   :::

3. Once you are done with this form, click **Save** button.

   ::: thumbnail
   ![create save](/images/guide/pingpong/create_save.png)
   :::

If created successfully, you can see the chatbot shown like the following:

::: thumbnail
![enter chatbot](/images/guide/pingpong/enter_chatbot.png)
:::

## Build Chatbot

The service that a PingPong chatbot can provide is just a simple question-and-answer dialogue. Such frame is typically communicated in one sentence and conversations are done in a single turn. As the service provided by PingPong does not need to collect informations from a user, like booking a flight ticket requires departure time, departure place, destination, etc, chatbot at this level is just a set of [intents](/guide/concepts.md#intents) and its dependency. 

Therefore, we will skip the [describe service at schema level](getting-started.md#1-describe-services-at-schema-level) phase and start with interaction declaration. This section walks you through the steps to build the PingPong chatbot.

### Declare Interaction

What is the interaction provided by this PingPong chabot? The answer is to give a response *"pong"* to the user's message *"ping"*. So all you have to do in the declare interaction phase is to add a response to one intent at STRUCT *(short for structure)* level which represents the interaction layer.

For each chatbot, you can create many intents. But in this case, you only need one. 

1. Click into the [pingpong](#create-a-chatbot) chatbot, stay at **STRUCT** level.

   ::: thumbnail
   ![struct level](/images/guide/pingpong/struct_level.png)
   :::

2. Click **Create** button on the right side to create a intent.

   ::: thumbnail
   ![create intent](/images/guide/pingpong/create_intent.png)
   :::

3. Enter a label (e.g. `PingPong`) in the **Intent Label** field and press enter. 
   ::: warning Need To Know
   - Label is not a name, it is **identifier**, a language independent aspect for semantics in OpenCUI. 

   - As a type label, **Intent Label** should start with capital case, limited 2-100 characters, and only support letters, digits and underscores.
   :::

   ::: thumbnail
   ![intent label](/images/guide/pingpong/intent_label.png)
   :::

4. Head to **Response** tab, select **Single Value Message** at **Default Action** section for declaring a simple reply.

   ::: thumbnail
   ![add response](/images/guide/pingpong/add_response.png)
   :::

5. Once done, click **Commit** icon in the right sidebar for propagating structure level instances to each language level. 

   ::: thumbnail
   ![commit pingpong struct](/images/guide/pingpong/commit_pingpong_struct.png)
   :::

### Fill Language Template and Exemplar

Once the declaration of the interaction is done, these language related parts become required. This makes supporting new languages very easy, all you need to do is to fill language aspects such as templates for text generation and utterance exemplars for helping dialog understanding. 

Now let's add language-related aspects:

1. Switch to language layer by a selecting a language from the topbar. In this case, we will switch to English side, so select **EN** in the language dropdown menu. 

   ::: thumbnail
   ![switch pingpong en](/images/guide/pingpong/switch_pingpong_en.png)
   :::

2. To fill language templates, heading to the **Responses** tab, enter `Pong` in the **Single Value Message** field at **Default Action** section and press enter. 

   ::: thumbnail
   ![pingpong simple reply](/images/guide/pingpong/pingpong_simple_reply.png)
   :::

3. To fill utterance exemplars for helping dialog understanding, heading to the **Expression** tab: 
   - In the **Names** section, enter `Ping Pong` for the pingpong intent display name and press enter. This field is also the examples of how this type is mentioned in different languages.
      ::: thumbnail
      ![pingpong alias](/images/guide/pingpong/pingpong_alias.png)
      :::

   - In the **Expressions** section, enter `ping` and press enter. These expression exemplars can indicate user's intention under same contexts and can be used by NLU model to hotfix the understanding issues.
      ::: thumbnail
      ![pingpong expression](/images/guide/pingpong/pingpong_expression.png)
      :::
   
4. Once you have filled all the language templates and expression exemplars, click **Commit** icon in the right sidebar for commiting your language layer changes.

   ::: thumbnail
   ![commit pingpong en](/images/guide/pingpong/commit_pingpong_en.png)
   :::

## Test Chatbot

OpenCUI provides a built-in testing feature "**Try It Now**" to help you to uncover bugs with the debug info, you can test your chatbot by typing messages. Let's test this PingPong chatbot, which will handle a basic conversation with a [default welcome message](concepts.md#default-intents) and response with *"pong"* to message *"ping"*. 

1. As **Try It Now** can only test committed content, please make sure both structure layer and language layer have been committed. 

   ::: thumbnail
   ![commit struct](/images/guide/pingpong/commit_struct.png)
   *Commit on STRUCT level*

   <br>

   ![commit lang](/images/guide/pingpong/commit_lang.png)
   *Commit on EN level*
   :::

2. On the language layer, click **Try It Now** icon in the right sidebar, the test field will slide out. 

   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   *Click Try It Now icon*

   <br>

   ![try it now](/images/guide/pingpong/tryitnow.png)
   *Try It Now slide out*
   :::

3. Click **Connect** button, it may take some time to execute. After the connection is executed successfully, you can test your bot by typing messages.

   ::: thumbnail
   ![connect](/images/guide/pingpong/connect.png)
   :::

4. Enter `ping` in the text entry and press enter, then the bot will respond `Pong`. You can restart your testing by clicking "**Reset Context**" icon, and create test cases by clicking "**Save Test case**" icon. For more information about Try It Now, see [Testing](../reference/platform/testing.md).
   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::

5. After you have tested your chabot, you can switch to the **STRUCT** level to merge your changes: 
   1. On the **STRUCT** level, head to **Versions** page, click **Pull Request** on the right side.
      ::: thumbnail
      ![pingpong pull request](/images/guide/pingpong/pingpong_pull_request.png)
      :::
   2. Click the item you want to merge, **Compare Diffs** field will slide out.
      ::: thumbnail
      ![version item](/images/guide/pingpong/version_item.png)
      :::
   3. In the **Compare Diffs** drawer, make sure all the changes you made are what you want. You can switch between different layers from the topbar.
      ::: thumbnail
      ![review changes](/images/guide/pingpong/review_changes.png)
      :::
   4. After reviewing, you can **Approve** these changes and **Merge** them to master. For more information about changes review, see [Version Contorl](../reference/platform/versioncontrol.md).
      ::: thumbnail
      ![approve changes](/images/guide/pingpong/approve_changes.png)
      *Approve changes*

      <br>

      ![merge changes](/images/guide/pingpong/merge_changes.png)
      *Merge changes*
            
      <br>

      ![version tag](/images/guide/pingpong/version_tag.png)
      *Create version tag and Save*
      :::

## Deploy Chatbot

## Maintain Chatbot

As we said at the beginning, you can easily manage how the messages are presented to users per your own business logic, and achieved the first level of CUI [frame without slot](./5levels-cui.md#frame-without-slot), for example: 

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

You can provide such experience by following these steps:

1. Create a new intent, labeled as "BusinessHours".

   ::: thumbnail
   ![create hours](/images/guide/pingpong/create_hours.png)
   :::

2. Add the response action you need, in this case we add a **Single Value Message** here, then commit struct for propagating to language side.

   ::: thumbnail
   ![add hours response](/images/guide/pingpong/add_hours_response.png)
   :::

3. Switch to the language side. Heading to **Response** tab, enter `We open every day from 10:00am to 9:00pm.` in single value message field and press enter.

   ::: thumbnail
   ![add hours reply](/images/guide/pingpong/add_hours_reply.png)
   :::

4. Select **Expression** tab, enter `what is your hours` in **Expressions** field and press enter. Don't forget to add **Names** at the same time.

   ::: thumbnail
   ![add hours expression](/images/guide/pingpong/add_hours_expression.png)
   :::

5. Of course, you can also maintain the behaviors of default intents as you want. To modify the default intent, back to intents list: 

   - Click into **Greeting** intent. Select **Response** tab, enter `Hi! I'm a virtual Restaurant chatbot.` in single value message field and press enter.

      ::: thumbnail
      ![modify greeting](/images/guide/pingpong/modify_greeting.png)
      :::

   - Click into **Goodbye** intent. Select **Response** tab, enter `Thank you for contacting the virtual Restaurant chatbot. I am glad I could help you today. Good-bye!` in single value message field and press enter.

      ::: thumbnail
      ![modify goodbye](/images/guide/pingpong/modify_goodbye.png)
      :::

   - Click into **Main** intent. Add a prompt in the **skills** slot, enter `How can I assist you today?` in the **Prompts** field and press enter. No need to delete any prompts, when there are multiple prompts, bot will randomly display one of them to the user.

      ::: thumbnail
      ![main skills](/images/guide/pingpong/main_skills.png)
      *Click skills in Main intent*

      <br>

      ![add skills prompt](/images/guide/pingpong/add_skills_prompt.png)
      *Add prompt*
      :::

6. Commit and Try it Now. If you get this, congratulations, you're done!

   ::: thumbnail
   ![modify result](/images/guide/pingpong/modify_result.png)
   :::

