# Channel Configuration
The same chatbot can interact with users from different channels (facebook messenger, wechat public account, etc). You can deploy your chatbot to these channels where your customers go for help.

## WeChat Official Account Channel
A WeChat Official Account exists in the form of a Wechat user's contact, and chat is the basis for the interaction between the Official Account and its users. Follow these steps to config WeChat Official Account.

### Before you begin
If you don't have WeChat Official Account, set up one first.
1. Go to [https://mp.weixin.qq.com](https://mp.weixin.qq.com), click **Register Now**
2. Select **Service Account** or **Subscription Account**, and follow the instructions that are provided on the screen to complete the process.

![An image](/.vuepress/public/images/channelConfig/RegisterNow.jpeg)

### Step 1
**Add an integration**
1. From the chatbot page, click **Setting** > **Integrations**. In the **Channels** field, click **Add New** > **Wechat Public Account**
   
![An image](/.vuepress/public/images/channelConfig/step1_1.jpeg)

2. Fill the *Name* box, and copy *Callback URL*
   
![An image](/.vuepress/public/images/channelConfig/step1_2.jpeg)

### Step 2
**Connect chatbot to WeChat Official Account**
1. Go to [https://mp.weixin.qq.com](https://mp.weixin.qq.com) and log in with your WeChat Official Account.
2. In the **Setting and Development** field, click **Basic configuration**.
3. In the **Official Account development information** field, copy *Developer ID(AppID)* and *Developer Password(AppSecret)*
   
![An image](/.vuepress/public/images/channelConfig/step2_1.png)


::: tip Notice
If you used *Developer Password(AppSecret)* before but didn't store it, you can click **Reset** to get a new one.
:::

4. Click **Configuration** (or **View**), add *123.56.222.81* to *IP whitelist* and click **Confirm modification** to save the modification.

![An image](/.vuepress/public/images/channelConfig/step2_2.jpeg)

5. In the **Server Configuration** (服务器配置) field, click **Change Configuration**.

![An image](/.vuepress/public/images/channelConfig/step2_3.png)

6. Paste *Callback URL* you copied during **Step 1** in *URL*.
7. Set your *Token* and copy it.
8. Click **Random Generation** to generate *EncodingAESKey* and click **Submit**.

![An image](/.vuepress/public/images/channelConfig/step2_4.png)

### Step 3
**Deploy chatbot**
1. Back to your chatbot page, paste *AppID*, *AppSecret* and *Token* you copied during **Step 2**.
2. Click **SAVE**.

![An image](/.vuepress/public/images/channelConfig/step3_1.png)

3. Click **Deploy** to deploy your chatbot.

![An image](/.vuepress/public/images/channelConfig/step3_2.jpeg)

4. Once you deploy successfully, you can try to send messages to your WeChat Official Account to test your chatbot now.
