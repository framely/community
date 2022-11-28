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

## Add WeChat Channel
1. On the OpenCUI side, enter a chatbot that you want to deploy. Follow [how to use](./overview.md/#how-to-use) and select **io.opencui.wechatOfficialAccount** as the **Service Provider**.
2. The configuration information is as follows. Once you complete the configuration, click **SAVE**.
   - **Label**: Set a label for your WeChat Official Account. Labels in each channel should be **unique**.
   - **Callback URL**: :clipboard: Copy this value after setting the label and locale. This will be used to configure the WhatsApp Webhook.
   - **App ID**: Paste the developer ID you copied when [setting up WeChat Official Account](#set-up-wechat-official-account).
   - **App Secret**: Paste the developer password you copied when [setting up WeChat Official Account](#set-up-wechat-official-account).
   - **Token**: Enter any token you desire. :clipboard: Copy this value. This will be used to configure the WhatsApp Webhook.
   - **Payment**: Enable or disable payment service in this channel.
   - **Locale**: Select a locale of the users whom the chatbot talking to in this channel.
3. [Deploy](../platform/deployment.md) your chatbot.
   
![add channel](/images/channelConfig/wechat/add-channel.png)

## Configure Server

1. Back to [WeChat Official Account Platform](https://mp.weixin.qq.com), In the **Server Configuration** (服务器配置) field, click **Change Configuration**. Paste *Callback URL* and *Token* you copied.

![config server](/images/channelConfig/wechat/config-server.png)

2. Click **Random Generation** to generate *EncodingAESKey* and click **Submit**.

![generate key](/images/channelConfig/wechat/generate-key.png)

## Test Your Chatbot

Once you deploy successfully, you can try to send messages to your WeChat Official Account to test your chatbot now. If you get a response, you have fully set up your app for receiving messages! :tada:
