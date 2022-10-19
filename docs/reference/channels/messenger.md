# Messenger
::: right
![test](/images/channelConfig/messenger/test.png)
:::
The [Messenger Platform](https://developers.facebook.com/docs/messenger-platform/introduction) is meant for businesses to handle inquiries from their customers. Using the Facebook Messenger integration, you can create a Facebook Messenger bot to interact with your end-users within your business. 

We are going to show here how to integrate OpenCUI with Messenger and deploy the chatbot to a OpenCUI hosted environment. For the private deployment, please consult systems in your organization.

Follow these steps to configure:
[[toc]]

## Before You Begin
On the Messenger side, please ensure you have all of the following:
- **Facebook Page**: A Facebook Page will be used as the identity of your Messenger experience. To create a new Page, visit [Create a Page](https://www.facebook.com/pages/create).
- **Developer Account**: Your developer account is required to create new apps. To create a new developer account, go to the [Meta Developers](https://developers.facebook.com/) website and click the 'Get Started' button.
- **Facebook App**: The Facebook app contains the settings for your Messenger experience, including access tokens. To create a new app, visit your [app dashboard](https://developers.facebook.com/apps) and click on 'Create App' in the top right corner.


## Set Up Messenger
1. Visit your [app dashboard](https://developers.facebook.com/apps) and enter one of the apps you want to serve by OpenCUI chatbot. On the left sidebar, click **Add Product**. Hover over **Messenger** and Click **Set Up**.

![add-messenger](/images/channelConfig/messenger/add-messenger.png)

2. Click **Add or Remove Pages** and select a page you want to subscribe your app to.
3. In the **Access Tokens** section, click **Generate Token** button. :clipboard: Copy the access token, it's needed when [adding Messenger channel](#add-messenger-channel).

![access-token](/images/channelConfig/messenger/access-token.png)


## Add Messenger Channel

1. On the OpenCUI side, enter a chatbot that you want to deploy. Click **Setting** > **Integrations**. In the **Channels** field, click **Add New** > **Facebook Messenger**.
2. The configuration information is as follows. Once you complete the configuration, click **SAVE**.
   - **Name**: You can set a name for your Facebook Messenger. This will be part of the Callback URL.
   - **Callback URL**: :clipboard: Copy this value. This will be used to configure the Facebook Messenger Webhook. 
   - **Verify Token**: You can enter any private token you desire. :clipboard: Copy this value. This will be used to configure the Facebook Messenger Webhook. 
   - **Page Access Token**: Enter the access token generated during the [Messenger setup](#set-up-messenger).
3. [Deploy](../platform/deployment.md) your chatbot.

![add-channel](/images/channelConfig/messenger/add-channel.png)


## Configure Webhook
1. On the Messenger side, in the **Webhooks** section of the Messenger settings console, click **Add Callback URL** button.
2. Paste the *Callback URL* and *Verify Token* values you copied when [adding the Messenger channel](#add-messenger-channel). Click **Verify and Save** to confirm you callback URL.
3. Click **Add subscriptions** and enable `messages` and `messaging_postbacks` in the page subscriptions.

![config-webhook](/images/channelConfig/messenger/config-webhook.png)

::: tip Note
For now, we can only allow one access token on one channel, which means that you need to configure different Facebook apps for different Facebook pages.
:::

## Test Your Chatbot

1. To test that your app setup was successful, go to your page and send a message to yourself. If you get a response, you have fully set up your app for receiving messages! :tada:
2. To make the app accessible to the public, switch to [live mode](https://developers.facebook.com/docs/development/build-and-test/app-modes#live-mode).

::: tip Two app modes in Facebook apps
- In the [development mode](https://developers.facebook.com/docs/development/build-and-test/app-modes#development-mode), only the administrator and tester that you invited can access the app. In this case, talk to the chatbot.
- In the [live mode](https://developers.facebook.com/docs/development/build-and-test/app-modes#live-mode), apps can request [permissions](https://developers.facebook.com/docs/permissions/reference) from anyone, but only permissions approved through [App Review](https://developers.facebook.com/docs/app-review). Click [here](https://developers.facebook.com/docs/messenger-platform/app-review/) to submit your app for review.
:::





