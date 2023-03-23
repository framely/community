# Messenger
::: right
![test](/images/channelConfig/messenger/test.png)
:::
The [Messenger Platform](https://developers.facebook.com/docs/messenger-platform/introduction) is meant for businesses to handle inquiries from their customers. Using the Facebook Messenger integration, you can create a Facebook Messenger bot to interact with your end-users within your business. 

We are going to show here how to integrate OpenCUI with Messenger and deploy the chatbot to a OpenCUI hosted environment. For the private deployment, please consult systems in your organization.

Follow these steps to configure:
[[toc]]

## Before you begin
On the Messenger side, please ensure you have all of the following:
- **Facebook Page**: A Facebook Page will be used as the identity of your Messenger experience. To create a new Page, visit [Create a Page](https://www.facebook.com/pages/create).
- **Developer Account**: Your developer account is required to create new apps. To create a new developer account, go to the [Meta Developers](https://developers.facebook.com/) website and click the 'Get Started' button.
- **Facebook App**: The Facebook app contains the settings for your Messenger experience, including access tokens. To create a new app, visit your [app dashboard](https://developers.facebook.com/apps) and click on 'Create App' in the top right corner.


## Set up Messenger
1. Use [Meat App Dashboard](https://developers.facebook.com/apps) to add the Messenger product to your Meta App: 
   1. Enter the App you want to configure, click **Add Product** on the left sidebar menu. 
   2. Click **Set Up** button on **Messenger** product.

   ::: thumbnail
   ![add messenger](/images/channelConfig/messenger/add-messenger.png)
   :::

2. Subscribe your app to a Facebook page. Go to **Messenger > Settings** panel, scroll down to **Access Tokens** section, click **Add or Remove Pages** button and select your page.

   ::: thumbnail
   ![add page](/images/channelConfig/messenger/add-page.png)
   :::

3. Then you will be provided with an access token at this step. In the **Access Tokens** section, click **Generate Token** button. :clipboard: Copy this value. This token will be used to configure the integration from the OpenCUI platform.

   ::: thumbnail
   ![generate token](/images/channelConfig/messenger/generate-token.png)
   :::

## Configure Messenger from OpenCUI

1. On OpenCUI platform, go to service component [io.opencui.channel](https://build.opencui.io/org/io.opencui/agent/channel/struct/service_schema): 
   1. Click **Import** button on the second topbar.
   2. Select the chatbot you want to configure Messenger channel and **Save**.

   ::: thumbnail
   ![import channel component](/images/channelConfig/overview/import-channel.png)
   :::

2. Once you have done, switch to your chatbot to wire Messenger channel:
   1. On **STRUCT** level, head to **Settings** page, in the **Integrations** tab, select the service you just import. In this case, please select **io.opencui.channel.IChannel**.
   2. A configuration dialog opens, at **Service Provider** field, select **io.opencui.messenger** to wiring Messenger channel.

   ::: thumbnail
   ![select the service](/images/channelConfig/overview/select-service.png)
   *Select service io.opencui.channel.IChannel*

   <br>

   ![select a channel](/images/channelConfig/overview/select-channel.png)
   *Wire Messenger channel*
   :::

3. Continue inside the dialog, configure Messenger integration as following: 
   - **Label**: Enter channel label, should be **unique**.
   - **Verify Token**: Enter any private token you desire. :clipboard: Copy this value. This will be used to configure the Messenger Webhook. 
   - **Page Access Token**: Paste the access token you copied during the Facebook app setup above.
   - **Locale**: Select locale which determines the default language used by your bot.
   - **Callback URL**: :clipboard: Copy this value after setting the label and locale. This will be used to configure the Messenger Webhook. 

   ::: thumbnail
   ![add channel](/images/channelConfig/messenger/add-channel.png)
   :::

4. Before you go to next step, don't forget to merge your changes into master and deploy your chatbot.

## Finish Messenger setup

1. Configure the Messenger webhook for your app. Back to your Meta App:
   1. Go to **Messenger > Settings** panel, scroll down to **Webhooks** section, click **Add Callback URL** button. 
   2. A Webhook setting dialog opens, use the **Callback URL** and **Verify Token** values you copied above, click **Verify and Save** button. 

   ::: thumbnail
   ![config webhook](/images/channelConfig/messenger/config-webhook.png)
   :::

2. In the **Webhooks** section, click **Add subscriptions** button and enable `messages` and `messaging_postbacks` in the page subscriptions.

   ::: thumbnail
   ![add subscriptions](/images/channelConfig/messenger/add-subscriptions.png)
   :::

## Test Your Chatbot

1. To test that your app setup was successful, go to your page and send a message to yourself. If you get a response, you have fully set up your app for receiving messages! :tada:
2. To make the app accessible to the public, switch to [live mode](https://developers.facebook.com/docs/development/build-and-test/app-modes#live-mode).

::: tip Two app modes in Facebook apps
- In the [development mode](https://developers.facebook.com/docs/development/build-and-test/app-modes#development-mode), only the administrator and tester that you invited can access the app. In this case, talk to the chatbot.
- In the [live mode](https://developers.facebook.com/docs/development/build-and-test/app-modes#live-mode), apps can request [permissions](https://developers.facebook.com/docs/permissions/reference) from anyone, but only permissions approved through [App Review](https://developers.facebook.com/docs/app-review). Click [here](https://developers.facebook.com/docs/messenger-platform/app-review/) to submit your app for review.
:::