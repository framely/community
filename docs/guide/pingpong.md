# Quick Start with PingPong 
> Follow this PingPong chatbot to get started with OpenCUI.

This guide will walk you through using OpenCUI platform to build, test and deploy a simple PingPong chatbot. When interacting with this chatbot, a user can get a greeting message, and a response *"pong"* to input message *"ping"*. For example:

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

After this simple PingPong chatbot, you can easily build **the first level of CUI** [frame without slot](./5levels-cui.md#frame-without-slot) and manage how the messages are presented to users per your own business logic. For example, if you are a restaurant, you can let your users check your business hours as following:

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

Before you start with this guide, it is recommended that you go through these following list first:
1. Get familiar with [the basic idea of building conversational apps](README.md).
2. [Sign up](../reference/platform/signingup.md) for OpenCUI account.

## Create Chatbot
After you log in, there will be an org *(short for organization)* automatically created for you. You can select this org to create chatbots. Here, the org with label `me.quickstart` will be selected: 
::: thumbnail
![org list](/images/guide/pingpong/orglist.png)
:::

To create a chatbot (If you are already inside a chatbot, you can skip these steps): 

1. Inside an org, head to chatbot list page by clicking **Chatbots** in the left side menu, then click **Create** on the right side.

   ::: thumbnail
   ![create chatbot](/images/guide/pingpong/create_chatbot.png)
   :::

2. After clicking **Create**, there will be a pop-up window. You should complete the form for basic chatbot settings, here you only need to care about the **Project Label**, **Region** and **Add language**. All of them can be modified after creation except the **Region** field:
   - Enter your chatbot's label in the **Project Label** field, start with lowercase, for example `pingpong`.
   - Select your preferred **Region**.
   - Select the languages for your chatbot in the **Add Language** field.

   ::: warning Need To Know
   - When you create a chatbot, you must specify a region. For the best performance, you should choose a region that is near your services and end-users. 

   - Once a chatbot is created, you can not change its **Region**. In order to change a chatbot's region, you must export or clone a new one with a different region.
   :::
   
   ::: thumbnail
   ![complete form](/images/guide/pingpong/complete_form.png)
   :::

3. Once you are done with this form, click **Save**.

   ::: thumbnail
   ![create save](/images/guide/pingpong/create_save.png)
   :::

If created successfully, you can see the chatbot shown like the following:

::: thumbnail
![enter chatbot](/images/guide/pingpong/enter_chatbot.png)
:::

## Build Chatbot

The service that a pingpong chatbot can provide is just a simple question-and-answer dialogue. Such frame is typically communicated in one sentence and conversations are done in a single turn. As the service provided by pingpong does not need to collect informations from a user, like booking a flight ticket requires departure time, departure place, destination, etc, chatbot at this level is just a set of [skills](/guide/concepts.md#skills) and its dependency. 

Therefore, we will skip the [describe service at schema level](getting-started.md#1-describe-services-at-schema-level) phase and start with interaction declaration. This section walks you through the steps to build the pingpong chatbot.

### Declare Interaction

What is the interaction provided by this pingpong chabot? The answer is to give a response *"pong"* to the user's message *"ping"*. So all you have to do in the declare interaction phase is to add a response to one skill at **STRUCT** *(short for structure)* level which represents the **interaction layer**. For more information about each of the layers, see [Separation of Concerns](README.md#separation-of-concerns) and [4 Layers of Chatbot](glossary.md#chatbot).

For each chatbot, you can create many skills. But in this case, you only need one. 

1. Click into the [pingpong](#create-a-chatbot) chatbot, stay at **STRUCT** level.

   ::: thumbnail
   ![struct level](/images/guide/pingpong/struct_level.png)
   :::

2. To create a skill, click **Create** on the right side.

   ::: thumbnail
   ![create intent](/images/guide/pingpong/create_intent.png)
   :::

3. Enter a label (e.g. `PingPong`) in the **Skill Label** field and press enter. 
   ::: warning Need To Know
   - Label is not a name, it is **identifier**, a language independent aspect for semantics in OpenCUI. 

   - As a type label, **Skill Label** should start with capital case, limited 2-100 characters, and only support letters, digits and underscores.
   :::

   ::: thumbnail
   ![intent label](/images/guide/pingpong/intent_label.png)
   :::

4. Head to **Response** tab, select **Single Value Message** at **Default Action** section for declaring a simple reply.

   ::: thumbnail
   ![add response](/images/guide/pingpong/add_response.png)
   :::

5. Once done, click **Commit** in the upper-right corner of the Build area for propagating structure level instances to each language level. 

   ::: thumbnail
   ![commit pingpong struct](/images/guide/pingpong/commit_pingpong_struct.png)
   :::

### Fill Language Template and Exemplar

Once the declaration of the interaction is done, these language related parts become required. This makes supporting new languages very easy, all you need to do is to fill language aspects such as templates for text generation and utterance exemplars for helping dialog understanding. 

Now let's add language-related aspects:

1. Switch to language layer by selecting a language from the topbar. In this case, we will switch to English side, so select **EN** in the language dropdown menu. 

   ::: thumbnail
   ![switch pingpong en](/images/guide/pingpong/switch_pingpong_en.png)
   :::

2. To fill language templates, heading to the **Responses** tab, enter `Pong` in the **Single Value Message** field at **Default Action** section and press enter. 

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
   
4. Once you have filled all the language templates and expression exemplars, click **Commit** in the upper-right corner of the Build area for commiting your language layer changes.

   ::: thumbnail
   ![commit pingpong en](/images/guide/pingpong/commit_pingpong_en.png)
   :::

## Test Chatbot

OpenCUI provides a built-in testing feature "**Debug**" to help you to uncover bugs with the debug info, you can test your chatbot by typing messages. Let's test this pingpong chatbot, which will handle a basic conversation with a [default welcome message](concepts.md#default-skills) and response with *"pong"* to message *"ping"*. 

1. As **Debug** can only test committed content, please make sure both structure layer and language layer have been committed. 

   ::: thumbnail
   ![commit struct](/images/guide/pingpong/commit_struct.png)
   *Commit on STRUCT level*

   <br>

   ![commit lang](/images/guide/pingpong/commit_lang.png)
   *Commit on EN level*
   :::

2. On the language layer, click **Debug** in the upper-right corner of the Build area , the test field will slide out. 

   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   *Click Debug*

   <br>

   ![try it now](/images/guide/pingpong/tryitnow.png)
   *Debug slide out*
   :::

3. Click **Connect**, it may take some time to execute. After the connection is executed successfully, you can test your bot by typing messages.

   ::: thumbnail
   ![connect](/images/guide/pingpong/connect.png)
   :::

4. Enter `ping` in the text input box at the bottom and press enter, then the bot will respond `Pong`. You can restart your testing by clicking "**Reset Contexts**" icon, and create test cases by clicking "**Save Test Case**" icon. Of course, if there are some exceptions, you can get log info by clicking "**Debug**". For more information about Debug, see [Testing](../reference/platform/testing.md).
   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::

5. After you have tested your chabot, you can switch to the **STRUCT** level to merge your changes: 
   1. Head to **Versions** page, click **Pull Request** on the right side.
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
   4. After reviewing, you can **Approve** these changes and **Merge** them into master. For more information about changes review, see [Version Contorl](../reference/platform/versioncontrol.md).
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

With Deploy action, the latest master of your chatbot can be published to production environment. And then your user can interact with this chatbot via your integrated channels. So before deploying, you need to make sure your chatbot has integrated at least one channel. 

These following steps will show you how to use the extension channels provided by OpenCUI. If these are not enough, and you are good at development, you can extend any channel you need. For more information about extension, see [Native Provider](../reference/providers/native.md).

Now let's use Messenger as an example. To use this integration:

1. Click **Explore** on the top navigation bar, type `channel` in the search bar and press enter. You can use filter on the right of the search box, please select **service** to assist in filtering.

   ::: thumbnail
   ![search channel](/images/guide/pingpong/search_channel.png)
   :::

2. Select the channel which provided by **OpenCUI** (labeled as `io.opencui`).

   ::: thumbnail
   ![select opencui channel](/images/guide/pingpong/select_opencui_channel.png)
   :::

3. In **channel** service, click **Import** in the upper-left corner of the Build area and select your pingpong chatbot in the popup.
   ::: thumbnail
   ![click import](/images/guide/pingpong/click_import_icon.png)
   *Click import*

   <br>

   ![import to pingpong](/images/guide/pingpong/import_to_pingpong.png)
   *Select your pingpong chatbot*
   :::

4. When you are done with import, you can see this **channel** service in the imported list.

   ::: thumbnail
   ![imported list](/images/guide/pingpong/imported_list.png)
   :::

5. To wire messenger to the channel service: 
   1. Heading to **Settings** page, select **Integrations** tab. In the **Service Provider** section, select **channel** service (labeled as `io.opencui.channel.IChannel`) you just imported.

      ::: thumbnail
      ![service provider section](/images/guide/pingpong/service_provider_section.png)
      *Service provider section*

      <br>

      ![select channel](/images/guide/pingpong/select_channel.png)
      *Select io.opencui.channel.IChannel*
      :::

   2. In the wiring popup window, select **channel**'s implementation **messenger** (labeled as `io.opencui.messenger`).

      ::: thumbnail
      ![select provider](/images/guide/pingpong/select_provider.png)
      :::

   3. Then you will see the configuration information required by messenger channel in the popup window.

      ::: thumbnail
      ![config popup](/images/guide/pingpong/config_popup.png)
      :::

6. To configure messenger channel:
   1. Follow the steps in [Set Up Messenger](../reference/channels/messenger.md#set-up-messenger) to set up your Meta app, **generate access token** and copy this value to OpenCUI.
   2. Configure the integration: 
      - **Label**: Set a label for this channel, should be unique. 
      - **Callback URL**: Copy this value. This will be used to configure Messenger Webhook.
      - **Verify Token**: You can enter any private token you desire. Copy this value. This will be used to configure Messenger Webhook.
      - **Page Access Token**: Enter the access token you copied when set up messenger.
      - **Locale**: Set your chatbot a locale.
      ::: thumbnail
      ![config info](/images/guide/pingpong/config_info.png)
      :::

7. When you're done configuring, merge your changes to master. And then you can deploy your chatbot by clicking **Deploy** in **Versions** page.

   ::: thumbnail
   ![deploy chatbot](/images/guide/pingpong/deploy_chatbot.png)
   :::

8. When successful, there will be a **Green Checked Icon** to indicate current deployed version. Now you can finish setup of the Meta app and test it. Use the **Callback URL** and **Verify Token** values you copied above to configure the Messenger Webhook by following steps in the [Configure Webhook](../reference/channels/messenger.md#configure-webhook)  and [Test Your Chatbot](../reference/channels/messenger.md#test-your-chatbot).

   ::: thumbnail
   ![deploy checked icon](/images/guide/pingpong/deploy_checked_icon.png)
   :::
