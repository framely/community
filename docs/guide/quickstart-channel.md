# Interactions with Channels

By utilizing channels, user interactions with your chatbot are automatically managed for you. To get started, simply construct your chatbot, establish the channel platform and generate tokens (e.g. access token, development information, credentials), and configure channel integration through OpenCUI platform using these token values.

This guide shows you how to integrate your chatbot with the Messenger channel for easy user interactions.

## Before You Begin

If you don't intend to use an integration, this quickstart is not necessary.

Before proceeding with this guide, make sure to complete the steps outlined in the [Quickstart with PingPong](pingpong.md) guide. The steps in this guide build upon the chatbot created in the previous guide.

## Review Changes

After completing your work, it's important to review your changes and ensure they meet the chatbot's features and quality standards. One way to do this is by opening a pull request and comparing the changes across your branch. Once you are satisfied with the changes, you can merge them into the master. For more information on working with branch and reviewing changes, please refer to the [Version Control](../reference/platform/versioncontrol.md) section.

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
