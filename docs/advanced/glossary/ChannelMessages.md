---
title: Channel & messages
---

# Channel & messages

### Channel
The same chatbot can interact with user from different channel (facebook messenger, wechat public account, etc). Conversation are conducted between chatbot and user by exchange messages in the channel. Channels come with two different capabilities: some channel can only render text messages, particularly these channel based on speakers or without a display, other channel can read media, image or video in some degree. There are two different kinds of channels, live channel and messaging channel.
#### Live channel
User on live channel can not be contacted asynchronously by chatbot, conversation session on the live channel can only be started by user, most web channels belongs to this category.
#### Messaging channel
User on message channel can be reached by chatbot, or conversation session on the message channel can be started by chatbot. Example of message channel is RCS or Facebook messenger.

### Omnichannel support
The ability for chatbot to continue the conversation where user switch from one channel to another.

### Messages
User exchange messages with chatbot/human agent to get things done. There are three different dimensions when it comes to the messages.
#### Text message vs media message
Text messages can be rendered in any channels, including in speaker that doesn't have display. Media messages are best rendered in the channels with display, like RCS and Facebook Messenger.
#### Generic message vs channel specific message
Generic messages are defined in Framely channel, and they will be rendered into all Framely supported channels on the best effort basis. The channel specific messages are defined in the specific channel, these messages will be chosen as reply to users for that channel instead of already defined generic messages. Channel specific message will be supported later.
#### Simple message vs list messages
Simple messages render information in a single frame, and list messages render information in the list of frames.

### Support
When chatbot does not know what to do or when user demand talking to a human agent, we can forward the conversation to support system, the default one is open source system chatwoot. There are two different modes of support: live chat and messaging.
#### Live chat
Under the live chat mode, it is assumed that conversation will get into a queue for human agent, where user will be waiting for the human agent become available. When human agent become available, user can expect his message will be replied in reasonable time frame before his issues is either resolved and an alternative is suggested/agreed upon.
#### Messaging
Under this mode, user will send message, and expect some human agent will eventually come back with reply. At mean time, he will move on to other things.