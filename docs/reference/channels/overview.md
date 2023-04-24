# Overview

With channel integrations, your customers can message you through their preferred channel, which is convenient for them. Your bot can start conversations with customers in minutes, send customer care notifications or purchase updates, and offer your customers a level of personalized service. 

In OpenCUI, channels are essentially [Extensions](../providers/extension.md). There are two kinds of channel extensions: 
[[toc]]

## OpenCUI extension channel
OpenCUI extension channels are fully supported by OpenCUI and configured with the OpenCUI platform. You can see all of them in our extension repo. 

Currently we provide several official extensions with other conversation platforms like Messenger, WhatsApp Business, Google Business Message and WeChat Official Account. They provide a user interface to the user, and call the OpenCUI API for you. When you want to integrate these channels for your users, you just need to wire and configure them to your chatbot. And then the user interactions will be handled for you. 

To set up official extension channels, you can follow these steps below:
1. **Set Up Channel Platform**. Set up channel platform and generate **token**, such as access token, development information or credential. You should copy and save them.
2. **Configure Channel From OpenCUI**. On OpenCUI platform, configure channel integration by using the token value you copied above. After completing all the configuration information, get **Callback URL**, copy and save it.
3. **Finish Setup Channel**. Back to the channel platform, set channel **Webhook** by using the Callback URL you copied above.

However, each channel may be set up in a slightly different way, so see the specific channel documentation for details:
- [Google Business Message](googlebusiness.md)
- [Messenger](messenger.md)
- [WhatsApp Business](whatsapp.md)

You can build a chatbot for either one of these channels or all of them, and decide each integration handles user interactions in a **universal-message** way or a **channel-specific** way. For more information about the universal-message way, see [Universal Channel](universalmessage.md).

::: warning Need To Know
When setting up channels, you need to provide locale which determines the default language used by your bot. The bot will be able to understand all languages you have built, and interact with the user using the default language. During a conversation, the user can switch languages when needed.
:::

## External extension channel 
External extension channels are created by other organizations and individuals. OpenCUI provides no support for such channels, as we do not have access to source code. These external channel extensions can only be used by private-deployed chatbot. You can also create a custom channel by using external Extensions.
