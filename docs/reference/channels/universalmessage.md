# Universal Channel

Users interact with chatbot through channel, for example Facebook Messenger. On OpenCUI, channels are integration plugin module that listen for user request for given channel, extract the input, and then triggers chatbot for the structured response, where channel plugin need to encode that response in the channel required format and send it out to user. 

## Motivation

OpenCUI focuses on supporting popular rich media channels like Facebook Messenger, WhatsApp, WeChat, and Google Business Message. Furthermore, OpenCUI Runtime is designed be extensible so supporting new channels are easy, expect more and more channels will be supported down the road. 

Different channels obviously have different rendering capabilities when it comes to message types. and even when they support the same message type, channels usually do it using different syntax. To support multiple channels at the same time, and to make omnichannel possible, each message can be defined on a per-channel basis. 

While it is ok to describe the response messages specifically for each channel to get the maximal native experience, that will result in unnecessary burden for chatbot builders when they want to support as many channels as possible. 

In OpenCUI, we support universal channel. Messages supported in this channel is called universal messages, and they are a set of messages that are abstracted from commonly supported message type from popular channels like Messenger, WhatsApp, WeChat, iMessage and RCS and so on. These universal message will be translated into channel dependent format before we send it out through that channel, so that chatbot builder only need define the response once in universal channel. Of course, if they absolutely need the native experience, they can define response in that channel which will be used over the universal channel. 

## Overview

Universal Message offers a way for you to offer a richer in-conversation experience than standard text messages by integrating clickable buttons, images, lists, and more alongside text a single message. Universal Message can be used for many purposes, such as displaying product information, providing the message recipient to choose from a set of options, and showing search results.

Universal Messages defined on OpenCUI can be classified into two classes depending on what they try to verbalize: 
1. **Single value message**, it can be used to verbalize a single value of some type. This type of message can only support tuple (think of static list where the number of elements are known at build time).
    ::: thumbnail
    ![Single value message](/images/channelConfig/universal/single-value-message.png)
    :::

2. **Multiple value message**, it is designed to verbalize multiple value of some time, where the number of elements are not know at build time.  The multiple value message bind to a list of some type, and can be expressed via code expression for maximal flexibility.
    ::: thumbnail
    ![Multiple value message](/images/channelConfig/universal/multiple-value-message.png)
    :::

We also support standard events on univerval channel to make user experience a bit more natural. The main events that we try to support is following :
1. **Message delivered (DELIVERED)**: This event indicates that a message has been delivered. To users, this event appears as a delivery receipt for a specific message. The RBM platform automatically sends DELIVERED events when it receives messages from users. Your agent can't control these events.

2. **Message read (READ)**: This event indicates that a message has been opened or acknowledged. To users, this event appears as a read receipt for a specific message. It lets the user know that the agent has received the message and instills confidence that the RBM platform delivered their message.

3. **Typing (IS_TYPING)**: To your agent, this event indicates that a user is typing. To a user, this event appears as a typing indicator and lets them know that your agent is composing a message. The typing indicator expires after a short time (approximately 20 seconds) or when the user's device receives a new message from your agent. Your agent can send multiple IS_TYPING events to reset the typing indicator's expiration timer.

## How To Use

Message is a structure encoding of how information should be rendered to user on the channel. On OpenCUI, regardless which channel the message is defined for, it is just a templated string that encodes some json object.

Use the following guides to learn how to send messages to your customers by using universal message.

### Rich Message

![rich message](/images/channelConfig/universal/rich-message.png)

Rich Message allows you to send a structured message that includes information, media and suggested actions. Rich message can contain the following items:
- `title` *Required*.
- `description` *Required*.
- `richMedia` *Optional*.
- A list of suggested actions, including `insideActions` or `floatActions`. *Optional*, actions of rich message can only one of them.

#### JSON Representation

``` json
{
    // Universal message type
    "type" : "rich",
    "title" : "card title",
    "description" : "card description",

    // Rich media
    "richMedia": {
        "height": "SHORT | MEDIUM | TALL", 
        "fileUrl" :　"e.g. file url",
        "altText": "Image alternative text",
        "thumbnailUrl": "e.g. image url",
        "forceRefresh": "true|false"
    }
    // End media
    
    // Card inside actions, including "reply", "click", "call".
    "insideActions" : [
        {
            "type" : "click",
            "url" : "e.g. jump link",
            "display" : "e.g. link text",
            "payload": "<POSTBACK_DATA>"
        },
        {
            "type" : "reply",
            "display" : "option 1",
            "payload": "<POSTBACK_DATA>"
        },
        {
            "type" : "call", 
            "display" : "contact us", 
            "phoneNumber": "+12223334444",
            "payload": "+12223334444"
        }
    ]
    // End card inside actions

    // Float actions, type can only be "reply"
    "floatActions" : [
        {
            "type" : "reply",
            "display" : "option1",
            "payload": "<POSTBACK_DATA>"
        },
        {
            "type" : "reply",
            "display" : "option2",
            "payload": "<POSTBACK_DATA>"
        }
    ]
    // End float actions
}
```

#### Properties

##### Message Payload

| Fields            | Type                                     | Description                                                              |
|:---               |:---                                      |:---                                                                      |
| `type`            | string                                   | *Required*. Universal message type, value must be `rich`.                |
| `title`           | string                                   | *Required*. Title of the rich message card.                              |
| `description`     | string                                   | *Required*. Description of the rich message card.                        |
| `richMedia`       | object ([richMedia](#richmedia))         | *Optional*. Media to display in the rich message card.                   |
| `insideActions[]` | object ([insideActions](#insideactions)) | *Optional*. List of actions to include in rich message card.             |
| `floatActions[]`  | object ([floatActions](#floatactions))   | *Optional*. List of suggested replies float on top of rich message card. | 

##### richMedia

| Fields         | Type    | Description |
|:---            |:---     |:---         |
| `height`       | enum    | *Required*. The height of the media within a rich card, value including `SHORT`, `MEDIUM`, `TALL`, should be only one of them. |
| `fileUrl`      | string  | *Required*. Publicly reachable URL of the file. Use only with HTTP/HTTPS URLs, Maximum 5 MB. |
| `altText`      | string  | *Required*. Text describing the details about the media for accessibility purposes. |
| `thumbnailUrl` | string  | *Optional*. Publicly reachable URL of the thumbnail. If you don't provide a thumbnail URL, the platform displays a blank placeholder thumbnail until the user's device downloads the file. Maximum 25 KB. |
| `forceRefresh` | boolean | *Optional*. If set, the platform fetches the file and thumbnail from the specified URLs, even if the platform has cached copies of the file (and/or of the thumbnail). |

##### insideActions

| Fields        | Type   | Description |
|:---           |:---    |:---         |
| `type`        | string | *Required*. Must be one of the following <ul><li>`reply`: A suggestion for the user to reply with specified text. </li><li>`click`: Opens the specified URL when the buttons is tapped. </li><li>`call`: Opens the user's default dialer app with the specified phone number filled in. </li></ul> |
| `display`     | string | *Required*. The text that is shown in the suggested action. |
| `payload`     | string | *Required*. The string that the agent receives when a user taps the suggested action. |
| `url`         | string | *Required when `type` is `click`*. Opens the specified URL. |
| `phoneNumber` | string | *Required when `type` is `call`*. The specified phone number, in [RFC 3966](https://www.rfc-editor.org/rfc/rfc3966) format. For example, "+1-201-555-0123". |

##### floatActions

| Fields        | Type   | Description |
|:---           |:---    |:---         |
| `type`        | string | *Required*. Only supported type is `reply`. |
| `display`     | string | *Required*. The text that is shown in the suggested action. |
| `payload`     | string | *Required*. The string that the agent receives when a user taps the suggested action. |

#### Limitations

Since different channels have different restrictions on the same field, we list them for you in the table below. You can decide how to use them based on your situation: 

| Fields            | Messenger                | Google Business Message  | WhatsApp Business Platform |
|:---               |:---                      |:---                      |:---                        |
| `title`           | Maximum 80 characters    | Maximum 200 characters   | Maximum 1,024 characters   |
| `description`     | Maximum 80 characters    | Maximum 2,000 characters | Maximum 60 characters      |
| `insideActions[]` | Maximum 3                | Maximum 4                | Maximum 3, text only       |
| `floatActions[]`  | Maximum 13               | Maximum 13               | -                          |
| `display`         | Maximum 20 characters    | Maximum 25 characters    | Maximum 20 characters      |
| `payload`         | Maximum 1,000 characters | Maximum 2,048 characters | Maximum 256 characters     |

For more information, you can jump into the following reference documentations: 
* [Messenger Platform](https://developers.facebook.com/docs/messenger-platform/reference)
* [Google Business Message](https://developers.google.com/business-communications/business-messages/reference)
* [WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp)

#### Examples

##### Inside Actions

When you need to send a chunk of related information, media, or suggestions, you should send a rich card with inside actions. A rich message card can contain any or all of the listed items, but must contain at least a title and description to be valid. 

::: thumbnail
![inside actions](/images/channelConfig/universal/inside-actions.png)
:::

The following code sends a rich message card with an image and suggested inside actions. 

``` json
{
  "type": "rich",
  "title": "Framely",
  "description": "Schema grounded Chatbots for any Services",
  "richMedia": {
    "fileUrl": "https://www.framely.ai/images/schema.png",
    "altText": "schema",
    "height": "TALL"
  },
  "insideActions": [
    {
      "type": "click",
      "url": "https://www.framely.ai",
      "display": "Website",
      "payload": "website"
    },
    {
      "type": "reply",
      "display": "Contact Us",
      "payload": "contact_us"
    }
  ]
}
```

When you need to present a user with dynamic options to choose between, you can also use a rich message card. Suitable for cases where selections do not need to show details.

::: thumbnail
![dynamic inside actions](/images/channelConfig/universal/dynamic-inside-actions.png)
:::

The following code sends a rich message card with dynamic suggested inside actions. 

``` json
// Header
{
  "type": "rich",
  "title": "Here are some options for you:",
  "description": "please select one of them",
  "insideActions": [
// End Header

// Body, Delimiter should be "," and End should be empty.
    {
      "type": "reply",
      "display": "${it.value.name()}",
      "payload": "${it.value.label()}"
    }
// End Body

// Footer
  ]
}
// End Footer
```


##### Float Actions

Float actions guide users through conversations by providing replies that your chatbot knows how to react to. When a user taps a suggested float action, your chatbot receives a message that contains the reply's text and postback data.

::: thumbnail
![float actions](/images/channelConfig/universal/float-actions.png)
:::

The following code sends text with two suggested float actions.

``` json
{
  "type": "rich",
  "title": "Confirmation of your tickets:",
  "description": "Movie: ${movie!!.name()} \nTime: ${showtime!!.name()}",
  "floatActions": [
    {
      "type": "reply",
      "display": "Yes",
      "payload": "confirmation_yes"
    },
    {
      "type": "reply",
      "display": "No",
      "payload": "confirmation_no"
    }
  ]
}
```