# WeChat
::: right
![test](/images/channelConfig/wechat/test.png)
:::
A WeChat Official Account exists in the form of a Wechat user's contact and chat is the basis for the interaction between the Official Account and its users.

We show here how to configure the Framely integration and Messenger and deploy the chatbot to a Framely hosted environment. For the private deployment, please consult systems in your organization.

Follow these steps to configure:
[[toc]]

## Before You Begin
If you don't have WeChat Official Account, set up one first.
1. Go to [WeChat Official Account Platform](https://mp.weixin.qq.com), click **Register Now**
2. Select **Service Account** or **Subscription Account**, and follow the instructions that are provided on the screen to complete the process.

![An image](/images/channelConfig/wechat/RegisterNow.jpeg)

## Set Up WeChat Official Account
1. Go to [WeChat Official Account Platform](https://mp.weixin.qq.com) and log in with your WeChat Official Account.
2. In the **Setting and Development** field, click **Basic configuration**.
3. In the **Official Account development information** field, :clipboard: copy *Developer ID(AppID)* and *Developer Password(AppSecret)*

![An image](/images/channelConfig/wechat/step2_1.png)


::: tip Notice
If you used *Developer Password(AppSecret)* before but didn't store it, you can click **Reset** to get a new one.
:::

4. Click **Configuration** (or **View**), add *123.56.222.81* to *IP whitelist* and click **Confirm modification** to save the modification.

![An image](/images/channelConfig/wechat/step2_2.jpeg)

## Add WeChat Channel
1. From the chatbot page, click **Setting** > **Integrations**. In the **Channels** field, click **Add New** > **Wechat Official Account**
   
![An image](/images/channelConfig/wechat/step1_1.jpeg)

2. Fill the *Name* box and *Token*. Paste *AppID* and *AppSecret* you copied. :clipboard: Copy *Callback URL* and *Token*. This will be used to configure the WeChat Official Account URL. 
   
![An image](/images/channelConfig/wechat/step1_2.jpeg)

3. Click **Deploy** to deploy your chatbot.

![An image](/images/channelConfig/wechat/step3_2.jpeg)

## Configure Server

1. Back to [WeChat Official Account Platform](https://mp.weixin.qq.com), In the **Server Configuration** (服务器配置) field, click **Change Configuration**.

![An image](/images/channelConfig/wechat/step2_3.png)

2. Paste *Callback URL* and *Token* you copied.
3. Click **Random Generation** to generate *EncodingAESKey* and click **Submit**.

![An image](/images/channelConfig/wechat/step2_4.png)

## Test Your Chatbot

Once you deploy successfully, you can try to send messages to your WeChat Official Account to test your chatbot now. If you get a response, you have fully set up your app for receiving messages! :tada:
