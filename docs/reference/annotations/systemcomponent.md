# System CUI Components

## Motivation

One of the design goal of Framely is to automatically handle many conversational issues: where user digress, how we bring them back on track, or where there are ambiguity, how we disambiguate through dynamically scheduled clarification. 

Ideally we expect that you don‘t need to worry how they are triggered, and for most part you do not even need to do much as system CUI components will provide good default behaviors. But if needed you can customize the expression and script to tinker the behavior. 

And the Framely solution is based on aspect oriented programming. It does so by adding additional behavior (via system CUI components) to existing code (an advice) without modifying the code itself, instead separately specifying which code is modified via a "pointcut" specification (triggered by runtime automatically). The  common system CUI are, and as time goes by, we will surely have more of these to enrich the default chatbot behavior.

## Clarification
Often time, user might say something that dialog understanding did not fully understand, for example, there are multiple possibilities. These are the time when we can trigger system intent to engage in the conversation for user to clarify what they really meant. There are couple variants of this:

### Value Clarification
During the slot filling, particularly when we try to find value from the conversation history, there might be multiple values that can be used to fill the slot. This CUI component is used to ask user decide which one is what they want.

For example, on the way to booking a flight, if the user asks about the weather and the bot cannot determine which city the user is asking about as there are more than one cities in the context. **Value Clarification** can help the bot to ask the user for disambiguation.

:::: conversation
::: user User
Book one ticket from beijing to seattle.
:::
::: bot Bot
What time would you like to leave?
:::
::: user User
What is the weather going to be like tomorrow
:::
::: bot Bot
Which city would you like to check?
- Beijing
- Seattle
:::
::: user User
Beijing
:::
::::

### Slot Clarification
When a user mentions a value that can fill more than one open slot, instead of just filling a slot directly and moving on, the bot should perform the act of disambiguation by asking which slot the user wants to fill with the help of Slot Clarification.

For example, when a user says something like *"book a flight, beijing"*, in some cases, the bot might need to say "what do you mean by beijing, departure or destination?" instead of filling one slot with Beijing randomly.

:::: conversation
::: user User
Book a flight, beijing
:::
::: bot Bot
What do you mean by beijing, departure or destination?
:::
::::

### Intent Clarification
Intent Clarification is a simple intent clarification mechanism that can automatically resolve stuck conversations when DU is not 100% sure about its understanding of user utterance. It will be triggered when there are multiple possibly-good answers. 

For example, when a user says: *"I am hungry"* to a virtual restaurant chatbot and there are potentially multiple understanding candidates for this utterance, the bot will clarify the right one with the user by showing the list of understanding candidates like "do you want me to order food or reserve a table at your favorite restaurant?"

:::: conversation
::: user User
I am hungry
:::
::: bot Bot
Do you want me to order food or reserve a table at your favorite restaurant?
:::
::::


## Slot Update

Slot update is a system intent that is designed to provide the default behavior for users wanting to modify the value of the previous specified slot. For example, when a user changes his mind during booking a flight, the user might say *"I need to change the destination from Beijing to Shanghai"*. Then the bot will modify the value of destination and always execute the same interaction logic as if that slot is filled for the first time.

:::: conversation
::: user User
Need to change the destination from beijing to shanghai
:::
::: bot Bot
Sure. Your destination is changed from Beijing to Shanghai.
:::
::::

If the user's expression is ambiguous like *"Wait, I think Shanghai is better"*, or the user only  mentioned part of the information like *"I need to change the destination"*, the bot will clarify the right value with the user with the help of slot update.

:::: conversation
::: user User
Need one way ticket to beijing pls
:::
::: bot Bot
Let's find a one-way ticket for you. Which date do you want to fly?
:::
::: user User
Wait, I think shanghai is better.
:::
::: bot Bot
So you want to change your destination to Shanghai?
:::
::::
