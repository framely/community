# Deploy a chatbot

Once you have developed and tested your chatbot, you can deploy it and start serving one or more channels. A channel is an OpenCUI extension that connects to applications where users can send messages, which can be in the form of text messages (such as Messenger, iMessage, and RCS), or in the form of voice (such as Echo or Siri).

Let's use Messenger as an example to understand how it works. When a user sends a message using the Messenger client software, the Messenger platform forwards that message to the endpoint that your channel implementation is listening on. Once your chatbot receives the user input, it produces output and asks the channel implementation to send the reply to the endpoint that the Messenger platform is listening on, which will then forward the reply to the end user.

To make this work, you need to configure both the external channel platform and OpenCUI so that they know where to send messages to.
This guide shows you how to integrate your chatbot with the Messenger channel. Channel are only supported in OpenCUI production environment, and to deploy your change to production environment, you need to create the PR, and merge it into master.

## Before you start
The steps in this guide build upon the chatbot created in one of the previous guides.

## Set up channels
On OpenCUI, it is possible to configure multiple channels of the same type or of different types. In this guide, we will show you how to configure one channel of the Messenger type, and you can repeat this for any number of channels you like. To learn more about each type of channel, please refer to the [Channel](../reference/channels/overview.md) section.

### Create a Messenger channel
Here are the steps on how to set up and enable a Messenger channel:

In the **Settings** tab and under **Integrations** page. 
1. In the **Deploy service provider** section, select `io.opencui.channel.IChannel` for setting up channel.

   ::: thumbnail
   ![service provider section](/images/guide/pingpong/service_provider_section.png)
   *Deploy service provider section*
   :::

2. A popup window will appear where you select `io.opencui.messenger` as channel type.

   ::: thumbnail
   ![select provider](/images/guide/pingpong/select_provider.png)
   :::

3. The popup window will then display the necessary configuration information required by the Messenger channel.


### Configure the Messenger channel
To integrate the Messenger into OpenCUI, we need to set up both side together. 
1. Follow the steps in [Set up Messenger](../reference/channels/messenger.md#set-up-messenger) to set up your Meta application, remember to copy the token from **generate access token**, as you will need that here in OpenCUI.
2. Configure this channel in the window just popped up and save: 
   - **Label**: Set a label for this channel type, should be unique in the chatbot. 
   - **Verify Token**: You can enter any private token you desire. This value will be needed to configure Messenger Webhook on Meta side.
   - **Page Access Token**: Enter the access token you copied from Messenger when set up Messenger.
   - **Locale**: Select a locale which determines the default language used by your bot.
   - **Callback URL**: Copy this value after setting the label and locale. This will be needed to configure Messenger Webhook.

   ::: thumbnail
   ![config info](/images/guide/pingpong/config_info.png)
   :::

## Deploy chatbot
After finishing the configuration of your channel, the next step is to deploy your chatbot. You always deploy the current master of your chatbot to the production environment, enabling your users to interact with it via the integrated channels.

1. When you're done configuring, switch to **Versions** tab, and deploy your chatbot by clicking **Deploy** button.
   ::: thumbnail
   ![deploy chatbot](/images/guide/pingpong/deploy_chatbot.png)
   :::

2. If the deployment is successful, a **Green Checked Icon** will appear to indicate the currently deployed version. 

   ::: thumbnail
   ![deploy checked icon](/images/guide/pingpong/deploy_checked_icon.png)
   :::

3. You can now interact with your chatbot in Messenger app.