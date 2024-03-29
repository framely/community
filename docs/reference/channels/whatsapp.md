# WhatsApp
The [WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp) gives medium to large businesses the ability to connect with customers at scale. You can start conversations with customers in minutes, send customer care notifications or purchase updates, offer your customers a level of personalized service and provide support in the channel that your customers prefer to be reached on.

We are going to show here how to integrate OpenCUI with WhatsApp and deploy the chatbot to a OpenCUI hosted environment. For the private deployment, please consult systems in your organization.

![test](/images/channelConfig/whatsapp/test.png)

## Before you begin
On the WhatsApp side, please ensure you have all of the following:
- [Developer Account](https://developers.facebook.com/)
- [A Meta Business Type App](https://developers.facebook.com/docs/development/create-an-app/)

## Set up WhatsApp

### Add WhatsApp product
1. Use [Meat App Dashboard](https://developers.facebook.com/apps) to add the WhatsApp product to your Meta App: 
   1. Enter the App you want to configure, click **Add Product** on the left sidebar menu. 
   2. Click **Set Up** button on **WhatsApp** product.
   3. In the pop-up window, make a selection in **Create or select a Meta Business Account** field, and click **Continue**.

   ![add messenger](/images/channelConfig/whatsapp/add-whatsapp.png)


2. Set business phone number. Go to **WhatsApp > Getting Started** panel:
   1. Scroll down to **Step 5**, and click **Add Phone Number**. Follow the instructions to complete your business information and verify the phone number.
   2. Refresh the website, back to **Step 1**. Select the phone number you just added and :clipboard: copy the **Phone number ID**.

   ![add phone number](/images/channelConfig/whatsapp/add-phone-number.png)

### Get access token
In the Business Manager, go to your [Business Settings](https://business.facebook.com/settings) page.
1. Go to **Users > System Users** panel, click **Add** button to add a system users.
2. Once you have added a system user, click **Generate New Token**. 
3. In the Generate token pop-up window:
   - Select the Meta app you created above. 
   - Select `whatsapp_business_messaging` in **Available Permissions** checkbox.
   - Scroll down to the bottom of the popup window, click **Generate Token** button. 
4. :clipboard: Copy and save your token.
5. On the same page, click **Add Assets**. Select your Meta app, enable **Manage app** control and click **Save Changes**.

   ![add system user](/images/channelConfig/whatsapp/add-system-user.png)

6. Go to **Accounts > WhatsApp accounts** panel, select your business account and click **Add People**. Then select the system user you added in step 1, enable **Manage app** control, and click **Assign**.

   ![add people](/images/channelConfig/whatsapp/add-people.png)

## Configure WhatsApp from OpenCUI
OpenCUI allows you to configure multiple WhatsApp channels. This section will show you how to configure a single channel, but you can repeat the process for any number of channels you need.

Inside your chatbot, in the **Settings** tab and under **Integrations** page.

1. In the **Deploy service provider** section, select `io.opencui.channel.IChannel` for setting up channel.

   ![select the service](/images/channelConfig/whatsapp/select-service.png)

2. A popup window will appear. In the **Service provider** dropdown, select `io.opencui.whatsapp`. Then the necessary configuration information required by the Messenger channel will be displayed in the same window.

   ![select a channel](/images/channelConfig/whatsapp/select-channel.png)

3. Continue inside the dialog, configure WhatsApp integration as following: 
   - **Label**: Enter channel label, should be **unique**.
   - **Verify token**: Enter any verify token you desire. :clipboard: Copy this value. This will be used to configure the WhatsApp Webhook.
   - **Access token**: Paste the token you copied during the WhatsApp setup above.
   - **Phone number ID**: Paste the Phone Number ID you copied during the WhatsApp setup above.
   - **Locale**: Select locale which determines the default language used by your bot.
   - **Callback URL**: :clipboard: Copy this value after setting the label and locale. This will be used to configure the WhatsApp Webhook.

   ![add channel](/images/channelConfig/whatsapp/add-channel.png)

4. Before you go to next step, don't forget to merge your changes into master and deploy your chatbot.

## Finish WhatsApp setup
1. Configure the WhatsApp webhook for your app. Back to your Meta App:
   1. Go to **WhatsApp > Configuration** panel, in **Webhooks** section, click **Edit** button. 
   2. A Webhook setting dialog opens, use the **Callback URL** and **Verify Token** values you copied above, click **Verify and Save** button. 
2. In the **Webhooks** section, Click **Manage** button and subscribe `messages`.

   ![config webhook](/images/channelConfig/whatsapp/config-webhook.png)


## Test your chatbot
To test your chatbot, open WhatsApp and send a message to your business phone number. If you get a response, you have fully set up your app for receiving messages! :tada: