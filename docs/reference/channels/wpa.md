# WeChat Official Account
A WeChat Official Account exists in the form of a Wechat user's contact, and chat is the basis for the interaction between the Official Account and its users. Follow these steps to configure WeChat Official Account.

## Before You Begin
If you don't have WeChat Official Account, set up one first.
1. Go to [https://mp.weixin.qq.com](https://mp.weixin.qq.com), click **Register Now**
2. Select **Service Account** or **Subscription Account**, and follow the instructions that are provided on the screen to complete the process.

![An image](/images/channelConfig/wechat/RegisterNow.jpeg)

## Add an Integration
1. From the chatbot page, click **Setting** > **Integrations**. In the **Channels** field, click **Add New** > **Wechat Official Account**
   
![An image](/images/channelConfig/wechat/step1_1.jpeg)

2. Fill the *Name* box, and copy *Callback URL*
   
![An image](/images/channelConfig/wechat/step1_2.jpeg)

## Connect Chatbot to WeChat Official Account
1. Go to [https://mp.weixin.qq.com](https://mp.weixin.qq.com) and log in with your WeChat Official Account.
2. In the **Setting and Development** field, click **Basic configuration**.
3. In the **Official Account development information** field, copy *Developer ID(AppID)* and *Developer Password(AppSecret)*
   
![An image](/images/channelConfig/wechat/step2_1.png)


::: tip Notice
If you used *Developer Password(AppSecret)* before but didn't store it, you can click **Reset** to get a new one.
:::

4. Click **Configuration** (or **View**), add *123.56.222.81* to *IP whitelist* and click **Confirm modification** to save the modification.

![An image](/images/channelConfig/wechat/step2_2.jpeg)

5. In the **Server Configuration** (服务器配置) field, click **Change Configuration**.

![An image](/images/channelConfig/wechat/step2_3.png)

6. Paste *Callback URL* you copied in *URL*.
7. Set your *Token* and copy it.
8. Click **Random Generation** to generate *EncodingAESKey* and click **Submit**.

![An image](/images/channelConfig/wechat/step2_4.png)

## Deploy Chatbot
We show here how we deploy chatbot to Framely hosted environment, for the private deployment, please consult systems in your organization.
1. Back to your chatbot page, paste *AppID*, *AppSecret* and *Token* you copied.
2. Click **SAVE**.

![An image](/images/channelConfig/wechat/step3_1.jpeg)

3. Click **Deploy** to deploy your chatbot.

![An image](/images/channelConfig/wechat/step3_2.jpeg)

4. Once you deploy successfully, you can try to send messages to your WeChat Official Account to test your chatbot now.
