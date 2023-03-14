# Interactions with Channels

Once you have developed and tested your chatbot, you can deploy it and start to serve one or more channels. Here channels are the applications can user use to send request, sometimes in form of text message, to chatbot, live agent or even other users, for example: Messenger, iMessage, and RCS, to name a few. Channels can potentially also be voice based like Echo, Siri, to name a few. OpenCUI chatbot can be easily extended to work with any channels, as long as we develop a specifically designed software extension, also called channels on OpenCUI platform. 

::: thumbnail
![How messenger bot works](/images/guide/how-messenger-bot-works.png)
:::

How does it work? Let's use Messenger as example. User send a message using the client software to Messenger platform, and Messenger platform forward that message to the end point that your channel implementation listens, upon get the user input, chatbot produce output, and ask channel implementation send the reply to the end point that Messenger platform listens, which will forward the reply to end user. Clearly to make this work, one have to configure on both Messenger platform side, and OpenCUI side, so that they both know where to send message to. 

This guide builds on top of [Quickstart with PingPong](pingpong.md), is designed to show you how to integrate your chatbot with the Messenger channel. Channel are only supported in OpenCUI production environment, and to deploy your change to production environment, you need to create the PR, and merge it into master.

## Before You Start

Perform steps in [Quickstart with PingPong](./pingpong.md).

## Merge Changes
OpenCUI comes with a Git like version control system, that is specifically designed for the structured chatbot definition so that we can manage the definition across modules and languages accurately. If you used Git in your development, this process should be very similar.

After you tested your change, t's important to ask project owner to review your changes and ensure they meet the chatbot's features and quality standards, by opening a pull request and comparing the changes across your branch. Once your change is approved, you can merge them into the master. For more information on working with branch and reviewing changes, please refer to the [Version Control](../reference/platform/versioncontrol.md) section.

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
3. Once you're satisfied with the changes, you can **Approve** them and **Merge** them into master. For more information about changes review, see [Version Contorl](../reference/platform/versioncontrol.md).

## Setup Channels

Here are the steps on how to set up and enable a channel, specifically using Messenger as an example:

1. Heading to **Settings** page, select **Integrations** tab. In the **Service Provider** section, select **channel** service, which is labeled as `io.opencui.channel.IChannel`.

   ::: thumbnail
   ![service provider section](/images/guide/pingpong/service_provider_section.png)
   *Service provider section*

   <br>

   ![select channel](/images/guide/pingpong/select_channel.png)
   *Select io.opencui.channel.IChannel*
   :::

2. A popup window will appear where you'll need to select **messenger**, which is labeled as `io.opencui.messenger`.

   ::: thumbnail
   ![select provider](/images/guide/pingpong/select_provider.png)
   :::

3. The popup window will then display the necessary configuration information required by the Messenger channel.

   ::: thumbnail
   ![config popup](/images/guide/pingpong/config_popup.png)
   :::

4. Configure the Messenger channel:
   1. Follow the steps in [Set Up Messenger](../reference/channels/messenger.md#set-up-messenger) to set up your Meta app, **generate access token** and copy this value to OpenCUI.
   2. Configure the integration: 
      - **Label**: Set a label for this channel, should be unique. 
      - **Verify Token**: You can enter any private token you desire. Copy this value. This will be used to configure Messenger Webhook.
      - **Page Access Token**: Enter the access token you copied when set up messenger.
      - **Locale**: Select a locale which determines the default language used by your bot.
      - **Callback URL**: Copy this value after setting the label and locale. This will be used to configure Messenger Webhook.
   3. Click **Save**.
      ::: thumbnail
      ![config info](/images/guide/pingpong/config_info.png)
      :::

In OpenCUI, it's possible to configure multiple channels by adding multiple items. For examples:
- To enable the **Messenger** channel, select **channel** service (`io.opencui.channel.IChannel`), wire `io.opencui.messenger` and provide the required configuration details.
- To enable the **WhatsApp** channel, select **channel** service (`io.opencui.channel.IChannel`), wire `io.opencui.whatsapp` and input the necessary configuration information.

By adding these channels to chatbot, you can easily configure and manage multiple channels for your chatbot. To learn more about each of the channels, please refer to the [Channel](../reference/channels/overview.md) sections.

Once you've finished configuring the channel, the next step is to deploy your chatbot.

## Deploy Chatbot

The Deploy action allows you to publish the latest master of your chatbot to the production environment, allowing your users to interact with it via the integrated channels. However, before deploying, you must ensure that your chatbot is integrated with at least one channel.

1. When you're done configuring, switch to **Version** tab, and deploy your chatbot by clicking **Deploy** button.

   ::: thumbnail
   ![deploy chatbot](/images/guide/pingpong/deploy_chatbot.png)
   :::

2. If the deployment is successful, a **Green Checked Icon** will appear to indicate the currently deployed version. 

   ::: thumbnail
   ![deploy checked icon](/images/guide/pingpong/deploy_checked_icon.png)
   :::

3. You can now complete the setup of your Meta app and test it out. To configure the Messenger Webhook, use the **Callback URL** and **Verify Token** values that you copied earlier and follow the instructions in the [Finish Setup Messenger](../reference/channels/messenger.md#finish-setup-messenger) and [Test Your Chatbot](../reference/channels/messenger.md#test-your-chatbot) section.
