# Value check

[[toc]]

## Motivation
Not all user requests can be served per business logic. For example, when booking a table for dinner, user's initial date preference might not be valid if business is closed that day. In such cause, the bot should just inform the user the closure and save user's time by not asking for party size and time. 

:::: conversation
::: user User
I want to book a table this Friday.
:::
::: bot Bot
Sorry, we are not open on Friday. Please choose another date.
:::
::::

## Overview
Capturing the invalid user input per business logic is essential to make the conversation effective, With value check, builder can define what is considered to be invalid input based on service, and have bot to offer users the chance to give alternative choice.

Use value check to check whether the option user input is servable based on business logic. When Value Check fails, you can specify the recovering:
- How bot informs users that the input value is invalid
- Choose which slot to be cleared so that we can restart the slot filling process from that slot again.

## How to use
Value check is an optional slot annotation. When [Slot filling](./overview.md#five-stages-of-slot-filling) moves to value check, [Dialog manager](../glossary.md#dialog-manager-dm) will check conditions defined in value check.
- If all conditions are true, value check passes and Slot filling moves on to the next stage.
- If any of the conditions is false, value check fails. When value check fails, bot uses value check prompts to inform users that the value is invalid, clears the predefined target slot first and starts to conversation again from that slot.

::: thumbnail
![value check](/images/annotation/valuecheck/value-check.png)
::: 

### Conditions
Condition holds the boolean code expression that checks whether the value user input is servable by business. If all conditions are true, value check passes. If one of the conditions is false, value check fails.

Conditions are defined in [kotlin code expression](./kotlinexpression.html), which should produce a Boolean value when evaluated, like `slot != null` , `function() == true` . You can joint the statements using `&&` or `||` , like `slot != null && slot < 3` .

### Inform
When value check fails, bot informs users that the value is invalid, like bot's utterance shown in [Motivation](#motivation). You should add at least one template to inform. 

### Recovering strategy

In case value check fails, you can decide which slot to be cleared in Recovering Strategy, so that bot will start from that slot and try to get user choice for every slot after that one by one again. For example, when all the slots party size, data and time are filled but user's choice causes the slot's value check fails, you can choose to clear current slot's value only (which is default) or you can clear one of earlier slot, and start conversation from the slot being cleared again.

Suppose the order of slots is as follows. Here are two different situations using different Recovering Strategy.

::: thumbnail
![order of slots](/images/annotation/valuecheck/slots-order.png)
:::

**Case 1 - Clear the input value of current slot** <Badge text="Default" vertical="middle"/>

:::: conversation
::: user User
Can I book a table for 2 this Friday?
:::
::: bot Bot
What time would you like to book?
:::
::: user User
5:00 pm.
:::
::: bot Bot
Sorry, small table at 5 pm on Friday is not available. Please choose another **time**.
:::
::::

**Case 2 - Keep the input value of current slot and clear another slot**

:::: conversation
::: user User
Can I reserve a table for two this Friday?
:::
::: bot Bot
What time would you like to book?
:::
::: user User
5:00 pm.
:::
::: bot Bot
Sorry, small table at 5 pm on Friday is not available. Please choose another **date**.
:::
::::
