# System CUI components

## Motivation
One of the design goal of OpenCUI is to automatically handle many conversational issues: where user digress, how we bring them back on track, or where there are ambiguity, how we disambiguate through dynamically scheduled clarification. 

Ideally we expect that you don‘t need to worry how they are triggered, and for most part you do not even need to do much as system CUI components will provide good default behaviors. But if needed you can customize the expression and script to tinker the behavior. 

And the OpenCUI solution is based on aspect oriented programming. It does so by adding additional behavior (via system CUI components) to existing code (an advice) without modifying the code itself, instead separately specifying which code is modified via a "pointcut" specification (triggered by runtime automatically). The  common system CUI are, and as time goes by, we will surely have more of these to enrich the default chatbot behavior.

## Clarification
Often time, user might say something that dialog understanding did not fully understand, for example, there are multiple possibilities. These are the time when we can trigger system skill to engage in the conversation for user to clarify what they really meant. There are couple variants of this:

### Value clarification
During the slot filling, particularly when we try to find value from the conversation history, there might be multiple values that can be used to fill the slot. This CUI component is used to ask user decide which one is what they want.

For example, on the way to booking a flight, if the user asks about the weather and the bot cannot determine which city the user is asking about as there are more than one cities in the context. **Value Clarification** can help the bot to ask the user for disambiguation.

```json
User: "Book one ticket from beijing to seattle."
Chatbot: "What time would you like to leave?"
User: "What is the weather going to be like tomorrow?"
Chatbot: "Which city would you like to check?
          - Beijing
          - Seattle"
User: "Beijing"
```

### Slot clarification
When a user mentions a value that can fill more than one open slot, instead of just filling a slot directly and moving on, the bot should perform the act of disambiguation by asking which slot the user wants to fill with the help of Slot Clarification.

For example, when a user says something like *"book a flight, beijing"*, in some cases, the bot might need to say "what do you mean by beijing, departure or destination?" instead of filling one slot with Beijing randomly.

```json
User: "Book a flight, beijing"
Chatbot: "What do you mean by beijing, departure or destination?"
```

### Intent clarification
Intent Clarification is a simple intent clarification mechanism that can automatically resolve stuck conversations when DU is not 100% sure about its understanding of user utterance. It will be triggered when there are multiple possibly-good answers. 

For example, when a user says: *"I am hungry"* to a virtual restaurant chatbot and there are potentially multiple understanding candidates for this utterance, the bot will clarify the right one with the user by showing the list of understanding candidates like "do you want me to order food or reserve a table at your favorite restaurant?"

```json
User: "I am hungry"
Chatbot: "Do you want me to order food or reserve a table at your favorite restaurant?"
```

## Slot update
Slot update is a system skill that is designed to provide the default behavior for users wanting to modify the value of the previous specified slot. For example, when a user changes his mind during booking a flight, the user might say *"I need to change the destination from Beijing to Shanghai"*. Then the bot will modify the value of destination and always execute the same interaction logic as if that slot is filled for the first time.

```json
User: "Need to change the destination from beijing to shanghai."
Chatbot: "Sure. Your destination is changed from Beijing to Shanghai."
```

If the user's expression is ambiguous like *"Wait, I think Shanghai is better"*, or the user only  mentioned part of the information like *"I need to change the destination"*, the bot will clarify the right value with the user with the help of slot update.

```json
User: "Need one way ticket to beijing pls"
Chatbot: "Let's find a one-way ticket for you. Which date do you want to fly?"
User: "Wait, I think shanghai is better."
Chatbot: "So you want to change your destination to Shanghai?"
```

## Binary gate
Binary Gate is an interaction that needs the user to answer boolean questions for different purposes, so that bot can know whether it needs to collect predefined slots or not. 

While it is possible to add a boolean slot to act like binary gate for some slot, and use its value `true` or `false` to control whether the bot prompts users for that slot or takes an action. But the bot also needs to know the answer other than yes/no, such as the value of the nested slots. 

**Binary Gate** can let DU know where the expectation is the gate, the slot it controls is also active, so DU can understand the common usage instead of do weird things like keep asking questions until it gets the right answer or can not understand the value provided by the user.

To reduce the effort level for dealing with these understanding problems, here are some default behaviors to handle the responses to yes/no questions: 

1. Simple yes/no can be automatically taken care of by `kotlin.Boolean` entity, like *"yes"*, *"yeah"*, *"no"*, *"nope"*. It means you do not need to enter the same patterns over and over again. But you can provide more expression exemplars in `kotlin.Boolean` entity to customize the global yes/no behaviors. These behaviors will work throughout the entire chatbot. 

2. To customize the positive and negative exemplars in specific context, you need to add the relevant annotations like **Multi-valued**, **Confirmation**, **Gated** and provide exemplars of expressions in the specific Affirmatives and Negatives expressions such as `$value$ is my favorite`, `Sorry I need to change`. 

### hasMore
`hasMore` is a reusable component designed specifically for multi-value slots. For example, tasks are multi-valued in chatbots. So when a task is completed, the bot will ask the user if he still needs help. Where 

- *"Yes"* continues the conversation by asking the slot prompts you defined, for example:

```json
Chatbot: "Is there anything else I can help you with today?"
User: "Yes."
Chatbot: "How can I assist you?"
User: "Need one way ticket to beijing pls"
```

- *"No"* goes to the next step. In this case, the bot will send a good-bye message and close the conversation.

```json
Chatbot: "Is there anything else I can help you with today?"
User: "No, thanks"
Chatbot: "Thank you for contacting the virtual Restaurant chatbot. I am glad I could help you today. Good-bye!"
```

- *"Slot Value"* assumes the gate is opened and start to fill slot with uesr input, for example:


```json
Chatbot: "Is there anything else I can help you with today?"
User: "Need one way ticket to beijing pls"
Chatbot: "Let's find a one-way ticket for you. Which date do you want to fly?"
```

### confirmation
`confirmation` is a well known component which asks the user to verify that they want to proceed with an action. It may be paired with a warning or critical information related to that action. For example, when a user wants to cancel an order, you should double-check with the user prior to performing an action that would be difficult to undo:

```json
User: "Can I cancel an order?"
Chatbot: "Sure. Could you provide me with the order number?"
User: "123456"
Chatbot: "I found the order: [order details]. Should I go ahead and Cancel the order?"
User: "Yes."
Chatbot: "I have cancelled the order for you. "
```

Where *"yes"* continues the action, *"no"* renews the slot, *"value"* changes the old value then confirm with the user. For more information about confirmation annotation, see [Confirmation](confirmation.md). 

### booleanGate
`booleanGate` is a component which is mainly used as a binary gate to decide whether it needs to fill the nested slot or skip the nested slot. For example, when checking out, the bot will ask the user whether to use some coupon. While some people might not have it, this binary gate could be useful:

```json
Chatbot: "Do you have some promo code?"
User: "Yes."
Chatbot: "What is your promo code?"
```

If the answer is slot value, the gate will be opened and the bot will start to fill nested slots with user input. So the bot can understand the common usage such as the value of the nested slot promo code naturally:  

```json
Chatbot: "Do you have some promo code?"
User: "XXXXXX"
Chatbot: "Okay lets go ahead and begin checkout..."
```

Otherwise, the bot will keep asking the yes/no question until it gets the right answer.

```json
Chatbot: "Do you have some promo code?"
User: "XXXXXX"
Chatbot: "Do you have some promo code?"
```

For more information about Boolean Gate annotation, see [Gated](fillstrategy.md#gated). 

## User identifier
User identifier is a system frame that provides basic information of the user in a channel-dependent way. Once you've added a slot of which type is [`user.UserIdentifier`](https://build.opencui.io/org/io.opencui/agent/core/struct/frame/633f953f28e4f04b5f84453e), when the user chats with bot in a channel, the bot can access the user ID, the type and the label of the channel. For example, in the [WhatsApp](../channels/whatsapp.md) channel, the user ID is the same as the user's phone number, the type of the channel is *whatsApp* and the label of the channel is defined by the chatbot builder.

With the information from user identifier, it's convenient for business to manage users along with their requests. For example, when the bot has confirmed the reservation information with users, it could store the reservation under the user ID and send the user ID back to the user. When the user comes for dinner, that ID can be used to get the reserved table.

```json
Chatbot: "Are you sure to book a small table at 10:00 AM for Wednesday, December 14, 2022?"
User: "Yes."
Chatbot: "Your reservation is secured. Thank you very much for making the reservation! You can check the reservation under your id: 1202555xxxx."
```