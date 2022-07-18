# Universal Channel

Users interact with chatbot through channel, for example Facebook Messenger. On Framely, channels are integration plugin module that listen for user request for given channel, extract the input, and then triggers chatbot for the structured response, where channel plugin need to encode that response in the channel required format and send it out to user. 

Framely focuses on supporting popular rich media channels like Facebook Messenger, Whatsapp, WeChat, and Google Business message. Furthermore, Framely Runtime is designed be extensible so supporting new channels are easy, expect more and more channels will be supported down the road. 

Different channels obviously have different rendering capabilities when it comes to message types. and even when they support the same message type, channels usually do it using different syntax. To support multiple channels at the same time, and to make omnichannel possible, each message can be defined on a per-channel basis. 

While it is ok to describe the response messages specifically for each channel to get the maximal native experience, that will result in unnecessary burden for chatbot builders when they want to support as many channels as possible. 

In Framely, we support universal channel. Messages supported in this channel is called universal messages, and they are a set of messages that are abstracted from commonly supported message type from popular channels like Messenger, Whatsapp, WeChat, imessage and RCS and so on. These universal message will be translated into channel dependent format before we send it out through that channel, so that chatbot builder only need define the response once in universal channel. Of course, if they absolutely need the native experience, they can define response in that channel which will be used over the universal channel. 

Message is a structure encoding of how information should be rendered to user on the channel, on Framely, regardless which channel the message is defined for, it is just a templated string that encodes some json object.

Messages defined on Framely can be classified into two classes depending on what they try to verbalize: 
1. Single value message, it can be used to verbalize a single value of some type. This type of message can only support tuple (think of static list where the number of elements are known at build time).
2. Multiple value message, it is designed to verbalize multiple value of some time, where the number of elements are not know at build time.  The multiple value message bind to a list of some type, and can be expressed via code expression for maximal flexibility.

Fields are the information that channel will render on the client for a particular functionality. Individual channel can support arbitrary fields per their design, universal channel will support the following fields:
1. Url (clickable)
2. Phone number (dialable)
3. Calendar (input/output)
4. Location (input/output)
5. Suggested input (two flavors, horizontal floating menu, vertical suggested input)
These fields should be rendered in rich media channel, but we need to define whether a channel support these fields, if not, builder need to provide response for that channel in this context.

We also support standard events on univerval channel to make user experience a bit more natural. The main events that we try to support is following :
1. Message delivered (DELIVERED): This event indicates that a message has been delivered. To users, this event appears as a delivery receipt for a specific message. The RBM platform automatically sends DELIVERED events when it receives messages from users. Your agent can't control these events.
2. Message read (READ): This event indicates that a message has been opened or acknowledged. To users, this event appears as a read receipt for a specific message. It lets the user know that the agent has received the message and instills confidence that the RBM platform delivered their message.
3. Typing (IS_TYPING): To your agent, this event indicates that a user is typing. To a user, this event appears as a typing indicator and lets them know that your agent is composing a message. The typing indicator expires after a short time (approximately 20 seconds) or when the user's device receives a new message from your agent. Your agent can send multiple IS_TYPING events to reset the typing indicator's expiration timer.

Other channel Framely currently supports:
1. [Facebook Messenger](./messenger.md)
2. [Whatsapp](./whatsapp.md)
3. [WeChat](./wpa.md)