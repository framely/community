# Quickstart with PingPong 

This PingPong tutorial will guide you step-by-step through the process of creating, building, and testing a basic chatbot on the OpenCUI platform. A chatbot is essentially an application with a conversational user interface. Users can interact with the chatbot by first connecting to it, after which they will receive a welcoming message. From there, users can input messages and receive responses from the bot. For example:

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

By completing this tutorial, you should be able to develop the [FAQ like](../../guide/5levels-cui.md#frame-without-slot) conversational user experience, such as allowing users to check your business hours: 

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

>Here is a step-by-step guide to creating a chatbot. If you are already working within a chatbot, you may proceed directly to the [chatbot building process](#build-a-chatbot) and skip these steps.

Upon logging in, an organization (or *org* for short) will be generated automatically for you. You may choose this org to initiate the creation of chatbots. To create a chatbot, follow these steps:

1. Within an org, navigate to the chatbot list page by clicking **Chatbots** on the left side menu. Then, click **Create** on the right side.

   ::: thumbnail
   ![create chatbot](/images/guide/pingpong/create_chatbot.png)
   :::

2. Once you click **Create**, a pop-up window will appear. Complete the form for basic chatbot settings, focusing on the **Project Label**, **Region**, and **Add Language** fields. Except for the **Project Label** and **Region** fields, all other fields can be modified after creating the chatbot.
   - In the **Project Label** field, enter the label for your chatbot starting with a lowercase letter (e.g., *pingpong*).
   - Choose your preferred **Region**.
   - Select the languages for your chatbot in the **Add Language** field.

   ::: warning Need To Know
   - When creating a chatbot, it is essential to select an appropriate region to optimize performance. The ideal region should be in close proximity to your services and end-users.

   - It is not possible to change a chatbot's region after it has been created. Therefore, if you need to change a chatbot's region, you must export it or create a new one with the desired region by cloning it.
   :::
   
   ::: thumbnail
   ![complete form](/images/guide/pingpong/complete_form.png)
   :::

3. After completing the form, click **Save**.

   ::: thumbnail
   ![create save](/images/guide/pingpong/create_save.png)
   :::

If the chatbot is created successfully, it will be displayed as shown below:

::: thumbnail
![enter chatbot](/images/guide/pingpong/enter_chatbot.png)
:::

## Build a Chatbot

The pingpong chatbot is a simple question-and-answer dialogue service that is typically communicated in one sentence, and the conversations are completed in a single turn. Since this service does not require any data collection, such as booking a flight ticket, which requires the departure time, departure place, destination, etc., we can skip the [service description phase at the schema level](../../guide/getting-started.md#1-describe-services-at-schema-level) and proceed directly to the interaction declaration. This section will guide you through the steps required to build the pingpong chatbot.

### 1. Interaction Declaration

The main interaction offered by the pingpong chatbot is to respond with *"pong"* when the user sends the message *"ping"*. In the declare interaction phase, you only need to add this response to a single skill at structure level, which represents the interaction layer. For more information about each of the layers, see [Separation of Concerns](../../guide/README.md#separation-of-concerns) and [4 Layers of Chatbot](../../guide/glossary.md#chatbot). You can create multiple skills for each chatbot, but for this pingpong chatbot, a single skill is sufficient. 

To create a new skill and add a response to the pingpong chatbot at the STRUCT level, follow these steps:

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
   - It should be between 2 to 100 characters in length.
   - It should only contain letters, digits, and underscores.
   
   <br>

   :::

   ::: thumbnail
   ![intent label](/images/guide/pingpong/intent_label.png)
   :::

4. Navigate to the **Response** tab and select **Single Value Message** under the **Default Action** section to declare a simple reply.

   ::: thumbnail
   ![add response](/images/guide/pingpong/add_response.png)
   :::

5. Once you have finished creating the skill, click **Commit** in the upper-right corner of the Build area to propagate the structure level instances to each language level.

   ::: thumbnail
   ![commit pingpong struct](/images/guide/pingpong/commit_pingpong_struct.png)
   :::

### 2. Filling Language Template and Exemplar

After declaring the interaction, the next step is to provide language-specific details such as templates for text generation and utterance exemplars for dialog understanding. This step is crucial for supporting new languages as it helps the chatbot to communicate with users in a natural way.

To get started, follow these steps:

1. Switch to the language layer. Select the language you want to work with from the language selector in the upper-left corner of the Build area. In this case, select **EN** for English.

   ::: thumbnail
   ![switch pingpong en](/images/guide/pingpong/switch_pingpong_en.png)
   :::

2. To fill language templates, heading to the **Responses** tab, enter `Pong` in the **Single Value Message** field under the **Default Action** section, then press enter. 

   ::: thumbnail
   ![pingpong simple reply](/images/guide/pingpong/pingpong_simple_reply.png)
   :::

3. To fill utterance exemplars for helping dialog understanding, heading to the **Expression** tab: 
   - In the **Names** section, enter `Ping Pong` for the pingpong skill display name and press enter. This field is also the examples of how this type is mentioned in different languages.
      ::: thumbnail
      ![pingpong alias](/images/guide/pingpong/pingpong_alias.png)
      :::

   - In the **Expressions** section, enter `ping` and press enter. These expression exemplars can indicate user's intention under same contexts and can be used by NLU model to hotfix the understanding issues.
      ::: thumbnail
      ![pingpong expression](/images/guide/pingpong/pingpong_expression.png)
      :::
   
4. Once you have filled in all the language templates and expression exemplars, click **Commit** in the upper-right corner of the Build area to commit your changes in the language layer.

   ::: thumbnail
   ![commit pingpong en](/images/guide/pingpong/commit_pingpong_en.png)
   :::

## Chatbot Testing

OpenCUI includes a built-in testing feature called **Debug** that helps you uncover bugs by providing debug information. With Debug, you can test your chatbot by typing messages. In this example, we will test the pingpong chatbot that will respond with *"pong"* to the message *"ping"* and has a default welcome message.

Note that Debug can only test committed content, so ensure that both the structure layer and language layer have been committed before testing.

::: thumbnail
![commit struct](/images/guide/pingpong/commit_struct.png)
*Commit on STRUCT level*

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

2. Click **Connect**. This may take some time to execute. Once the connection is established successfully, you can test your chatbot by typing messages.

   ::: thumbnail
   ![connect](/images/guide/pingpong/connect.png)
   :::

3. Enter `ping` in the text input box at the bottom and press enter, then the bot should respond with `Pong`. You can save test cases by clicking the "**Save Test Case**" icon, and restart your testing by clicking the "**Reset Contexts**" icon. If there are any exceptions, you can view log information by clicking the "**View Log**" icon. For more information about Debug, refer to the [Testing](../platform/testing.md) section.

   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::

## Review Changes

After completing your work, it's important to review your changes and ensure they meet the chatbot's features and quality standards. One way to do this is by opening a pull request and comparing the changes across your branch. Once you are satisfied with the changes, you can merge them into the master. For more information on working with branch and reviewing changes, please refer to the [Version Control](../platform/versioncontrol.md) section.

To create a pull request:
1. In the second navigation bar, select the **Version** tab.
2. Click **Pull Request** in the upper-right corner of the Version area.
::: thumbnail
![pingpong pull request](/images/guide/pingpong/pingpong_pull_request.png)
:::

To review changes: 
1. Click the item you want to review, and **Compare Diffs** field will slide out.
   ::: thumbnail
   ![version item](/images/guide/pingpong/version_item.png)
   :::
2. In the **Compare Diffs** drawer, make sure all the changes you made are what you want. You can switch between different layers from the topbar.
   ::: thumbnail
   ![review changes](/images/guide/pingpong/review_changes.png)
   :::
3. Once you're satisfied with the changes, you can **Approve** them and **Merge** them into master. For more information about changes review, see [Version Contorl](../platform/versioncontrol.md).
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
