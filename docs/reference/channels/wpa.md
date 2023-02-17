# WeChat Official Account
::: right
![test](/images/channelConfig/wechat/test.png)
:::
A WeChat Official Account exists in the form of a Wechat user's contact and chat is the basis for the interaction between the Official Account and its users.

We are going to show here how to integrate OpenCUI with WeChat and deploy the chatbot to a OpenCUI hosted environment. For the private deployment, please consult systems in your organization.

Follow these steps to configure:
[[toc]]

## Before You Begin
If you don't have WeChat Official Account, set up one first.
1. Go to [WeChat Official Account Platform](https://mp.weixin.qq.com/?lang=en_US&token=), click **Register Now**
2. Select **Service Account** or **Subscription Account**, and follow the instructions that are provided on the screen to complete the process.

![register](/images/channelConfig/wechat/register.png)

## Set Up WeChat Official Account
1. Go to [WeChat Official Account Platform](https://mp.weixin.qq.com) and log in with your WeChat Official Account.
2. In the **Setting and Development** field, click **Basic configuration**.
3. In the **Official Account development information** field, :clipboard: copy *Developer ID(AppID)* and *Developer Password(AppSecret)*

![set up wechat official account](/images/channelConfig/wechat/set-up-account.png)


::: tip Notice
If you used *Developer Password(AppSecret)* before but didn't store it, you can click **Reset** to get a new one.
:::

4. Click **Configuration** (or **View**), add *123.56.222.81* to *IP whitelist* and click **Confirm modification** to save the modification.

![config whitelist](/images/channelConfig/wechat/config-whitelist.png)

## Configure WeChat From OpenCUI

1. On OpenCUI platform, go to service component [io.opencui.channel](https://build.opencui.io/org/io.opencui/agent/channel/struct/service_schema): 
   1. Click **Import** button on the second topbar.
   2. Select the chatbot you want to configure WeChat channel and **Save**.

   ::: thumbnail
   ![import channel component](/images/channelConfig/overview/import-channel.png)
   :::

2. Once you have done, switch to your chatbot to wire WeChat channel:
   1. On **STRUCT** level, head to **Settings** page, in the **Integrations** tab, select the service you just import. In this case, please select **io.opencui.channel.IChannel**.
   2. A configuration dialog opens, at **Service Provider** field, select **io.opencui.wechatOfficialAccount** to wiring WeChat channel.

   ::: thumbnail
   ![select the service](/images/channelConfig/overview/select-service.png)
   *Select service io.opencui.channel.IChannel*

   <br>

   ![select a channel](/images/channelConfig/overview/select-channel.png)
   *Wire WeChat channel*
   :::

2. Continue inside the dialog, configure WeChat integration as following: 
   - **Label**: Enter channel label, should be **unique**.
   - **App ID**: Paste the developer ID you copied during the WeChat Official Account setup above.
   - **App Secret**: Paste the developer password you copied during the WeChat Official Account setup above.
   - **Token**: Enter any token you desire. :clipboard: Copy this value. This will be used to configure the WhatsApp Webhook.
   - **Payment**: Whether to use WeChat Pay.
   - **Locale**: Select locale which determines the default language used by your bot.
   - **Callback URL**: :clipboard: Copy this value after setting the label and locale. This will be used to configure the WeChat Server Configuration.

   ::: thumbnail
   ![add channel](/images/channelConfig/wechat/add-channel.png)
   :::

4. Before you go to next step, don't forget to merge your changes into master and deploy your chatbot.

## Finish Setup WeChat Official Account

1. Back to [WeChat Official Account Platform](https://mp.weixin.qq.com), In the **Server Configuration** (服务器配置) field, click **Change Configuration**. Paste *Callback URL* and *Token* you copied.

![config server](/images/channelConfig/wechat/config-server.png)

2. Click **Random Generation** to generate *EncodingAESKey* and click **Submit**.

![generate key](/images/channelConfig/wechat/generate-key.png)

## Test Your Chatbot

Once you deploy successfully, you can try to send messages to your WeChat Official Account to test your chatbot now. If you get a response, you have fully set up your app for receiving messages! :tada:
