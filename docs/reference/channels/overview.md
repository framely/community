# Overview

With channel integrations, your customers can message you through their preferred channel, which is convenient for them. Your bot can start conversations with customers in minutes, send customer care notifications or purchase updates, and offer your customers a level of personalized service. 

## Framely-hosted 

Framely currently provides several built-in integrations with other conversation platforms like Messenger, WhatsApp Business, Google Business Message and WeChat Official Account. You can provide support in the channel that your customers prefer to be reached on, and direct user interactions will be handled for you. 

You can build a chatbot for either one of these channels or all of them, and decide each integration handles end-user interactions in a **universal-message** way or a **channel-specific** way. For more information about the universal-message way, see [Universal Channel](universalmessage.md). For the specific integration channel details, see each type of channel documentation under **Channels** directory.

These integrations provide a user interface to the user, and they call the Framely API for you. All you need to do is build your chatbot and optionally implement a webhook service: 
1. Generate **Token** from the channel platform, such as access token, development information or credential, you should copy and save them.
2. Configure channel integration on Framely platform by using the token, and get the **Callback URL**.
3. Set the channel **Webhook** on channel platform by using the Callback URL.

In Framely-hosted plan, these integrations are fully supported and are configured with platform: 
- [Messenger](messenger.md)
- [WhatsApp Business](whatsapp.md)
- [Google Business Message](googlebusiness.md)
- [WeChat Official Account](wpa.md)

::: tip Note
- Before you start, you should have finished building chatbot and get the merged version.
- Sometimes, you need to provide a private Verify Token, so that channel and Framely can communicate with each other.
:::

::: warning Need To Know
When integrating channels, you should set the channel language as default language. Your bot will be able to understand all languages you have built, and use the default language when interacting with the user. During a conversation, the user can switch languages when needed.
:::

## Private Deploy
In private deploy plan, these integrations are not built-in. Framely provides no support for these integrations. You should export your chatbot and follow the integration owner documentations for support. 