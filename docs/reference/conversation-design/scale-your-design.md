# Scale your design

Now that you have a well-designed conversation, it's time to expand your reach to users wherever they are. The OpenCUI platform can help you do this by supporting a variety of channels, such as Messenger, WhatsApp, and Google Business Messages. To ensure that your conversations are consistent across all channels, you'll need to adapt your replies to a universal channel.

## Multi-channel design

When designing your CUI, it's a good idea to deploy it on multiple channels, such as Facebook Messenger, WhatsApp, Google Maps, and your website. This will allow you to reach more users, as they can communicate with your business in a place that best suits their habits. For example, if someone is already using Facebook Messenger, they're more likely to use your CUI if it's available on that platform.

To ensure that your conversations are consistent across all channels, you can use the universal channel. This is a set of message formats that are abstracted from commonly supported message type from popular channels. 

When you send a message in this format, it will be translated into the channel-specific format before being sent out. This means that you can define your replies once, and they will be displayed correctly on all channels. This will save you time and effort, as you won't need to worry about creating different versions of your replies for each channel. Of course, if you absolutely need the native experience, you can also define replies in the specified channel which will be used over the universal message.

When designing your universal messages, you only need to consider whether the message is static or dynamic, and whether it is single-valued or multi-valued. Static messages are those that do not change, while dynamic messages can change based on the user's input or the state of the conversation. Single-valued messages have a single value, while multi-valued messages can have multiple values. For example, a static, single-valued message could be the text "Hello." A dynamic, multi-valued message could be the list of products that a user is interested in.

By understanding these concepts, you can design your universal messages in a way that will be consistent across all channels, while also being flexible enough to meet the needs of your users. For more information about universal message and its formats, see [Universal channel](../channels/universalmessage.md).

## Multilingual design

Multilingual CUIs allow users to interact with a business in their native language. This means that multiple languages can share the same interaction logic. There are two views to help you define multilingual CUIs: the interaction view and the language view.

- **The interaction view** allows you to define the business logic of your CUI. This includes the types, slots, functions, and conversation components that your service needs.

- **The language view** allows you to define the language-specific content for each interaction that the user sees.

By using the interaction view and the language view, you can separate the business logic of your CUI from the language-specific content. This makes it easier to design and maintain multilingual CUIs.

In language view, you need to care about two things, expressions and templates. 

### Expressions

Expressions are trigger statements based on the context. They allow you to customize the business terms that are used in your CUI. 

For example, in the confirmation state, the CUI might confirm a certain value with the user, such as *`"White T-shirt, right?"`*. However, the user might not directly say yes or no. They might instead say something like *`"White is my favorite"`* to indicate that they agree, or *`"maybe red is better"`* to indicate that they want to change the old value. The expressions allow you to capture these different types of user input and handle them appropriately.

The same is true for other conversation components. However, it is important to note that different components in the same context cannot have the same expression. For example, the same expression cannot be used to express both an affirmative answer and a negative answer. This is because the CUI needs to be able to distinguish between different types of user input in order to handle them appropriately.

### Templates

Templates are the content that is displayed to the user. They are used to specify how the bot will say something to the user and defined on the conversation components like prompts, confirms, etc., as well as in the responses.

Template is just string with code expression embedded in it in order to capture the context. One way of encoding the embedded code expression is to surround them with `${}`, the code expression inside `${}` will be evaluated to string and then concatenated with rest of static content to form the final message for user.

Here are some simple examples of templates:
- Destination prompt: *`"Where do you want to go?"`*
- Destination confirmation: *`"Are you sure you want to go to ${destination}?"`*
- Response: *`"You have successfully booked a flight to ${destination}."`*

Templates are what the user sees and interacts with, so it can be customized to different languages and cultures. This allows the bot to communicate with users in a way that is clear and understandable. 

For example, in different language views:
- The destination prompt template could be defined into different languages, such as:
   - English: *`"Where do you want to go?"`*
   - Spanish: *`"¿A dónde quieres ir?"`*
   - Chinese: *`"你想去哪里？"`*

- The destination confirmation template could also be defined into different languages, such as:
  - English: *`"Are you sure you want to go to ${destination}?"`*
  - Spanish: *`"¿Estás seguro de que quieres ir a ${destination}?"`*
  - Chinese: *`"你确定要去 ${destination} 吗？"`*