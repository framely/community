# WhatsApp
::: right
![test](/images/channelConfig/whatsapp/test.png)
:::
The [WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp) gives medium to large businesses the ability to connect with customers at scale. You can start conversations with customers in minutes, send customer care notifications or purchase updates, offer your customers a level of personalized service and provide support in the channel that your customers prefer to be reached on.

We are going to show here how to integrate Framely with WhatsApp and deploy the chatbot to a Framely hosted environment. For the private deployment, please consult systems in your organization.

Follow these steps to configure:
[[toc]]

## Before You Begin
On the WhatsApp side, please ensure you have all of the following:
- [Developer Account](https://developers.facebook.com/)
- [A Meta Business Type App](https://developers.facebook.com/docs/development/create-an-app/)

## Set Up WhatsApp
1. Visit your [app dashboard](https://developers.facebook.com/apps), and enter the app you want to serve by Framely chatbot. On the left sidebar, click **Add Product**. Hover over **WhatsApp** and Click **Set Up**. Create or select a Meta Business Account.

![add-messenger](/images/channelConfig/whatsapp/add-whatsapp.png)

2. Below **WhatsApp**, click **Getting Started**. Scroll down to **Step 5**, and click **Add Phone Number**. Follow the instructions to complete your business information and verify the phone number.
3. Refresh the website, back to **Step 1**. Select the phone number you just added and :clipboard: copy the **Phone number ID**.

![add-messenger](/images/channelConfig/whatsapp/phone-number-id.png)

## Get Access Token
1. Go to [Business Settings](https://business.facebook.com/settings). Below **Users**, click **System Users** > **Add**.
2. Once you have added a system user, click **Generate New Token**. Select the app you just created and tick `whatsapp_business_messaging`, then click **Generate Token**. :clipboard: Copy and save your token.
3. Click **Add Assets**. Select the app you just created, enable **Manage app** control and click **Save Changes**.

![add-messenger](/images/channelConfig/whatsapp/add-system-user.png)

4. Below **Accounts**, click **WhatsApp accounts**. Select your business account and click **Add People**. Select the system user you added in step 1, enable **Manage app** control, and click **Assign**.

![add-messenger](/images/channelConfig/whatsapp/add-people.png)


## Add WhatsApp Channel

1. On the Framely side, enter a chatbot that you want to deploy. Click **Setting** > **Integrations**. In the **Channels** field, click **Add New** > **WhatsApp Business**.

2. The configuration information is as follows. Once you complete the configuration, click **SAVE**.
   - **Name**: You can set a name for your WhatsApp app. This will be part of the Callback URL.
   - **Callback URL**: :clipboard: Copy this value. This will be used to configure the WhatsApp Webhook.
   - **Verify Token**: You can enter any verify token you desire. :clipboard: Copy this value. This will be used to configure the WhatsApp Webhook.
   - **Access Token**: Paste the token you copied when [getting the access token](#get-access-token).
   - **Phone Number ID**: Paste the Phone Number ID you copied when [setting up WhatsApp](#set-up-whatsapp).

3. [Deploy](../platform/deployment.md) your chatbot.

![add-messenger](/images/channelConfig/whatsapp/add-channel.png)

## Configure Webhook

1. Go back to your [app](https://developers.facebook.com/apps), below **WhatsApp**, click **Configuration**. In the **Webhook** field, click **Edit**.

2. Paste the *Callback URL* and *Verify Token* you copied when [adding the WhatsApp channel](#add-whatsapp-channel). Click **Verify and Save** to confirm your callback URL.

3. Click **Manage** and subscribe `messages`.

![add-messenger](/images/channelConfig/whatsapp/config-webhook.png)

## Test Your Chatbot

To test your chatbot, open WhatsApp and send a message to your business phone number. If you get a response, you have fully set up your app for receiving messages! :tada:
