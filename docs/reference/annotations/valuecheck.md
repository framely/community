# Value Check

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
Capturing the invalid user input per business logic is essential to make the conversation effective, With Value Check, builder can define what is considered to be invalid input based on service, and have bot to offer users the chance to give alternative choice.

Use value check to check whether the option user input is servable based on business logic. When Value Check fails, you can specify the recovering:
- How bot informs users that the input value is invalid
- Choose which slot to be cleared so that we can restart the slot filling process from that slot again.

## How To Use
Value Check is an optional slot annotation. When [Slot Filling](https://www.framely.ai/guide/slotfilling.html#five-stages-of-slot-filling) moves to Value Check, [DM (Dialog Management)](https://www.framely.ai/guide/architecture.html#dialog-understanding-du) will check conditions defined in Value Check.
- If all conditions are true, Value Check passes and Slot Filling moves on to the next stage.
- If one of the conditions is false, Value Check fails.
  When Value Check fails, bot uses Value Check prompts to inform users that the value is invalid, clear the predefined target slot first and start to conversation again from that slot.

![value-check](/images/annotation/valuecheck/value-check.png)

::: tip Try it with templates  
1. Go to [ValueCheck](https://framely.naturali.io/org/622c8ff683536204fe062b55/agent/6297f6d14cfdb2515448d814/test_case), see examples in Test Cases.
2. Click **Try it now** > **Connect**, you can try it yourself.
:::

### Conditions
Condition holds the boolean code expression that checks whether the value user input is servable by business. If all conditions are true, Value Check passes. If one of the conditions is false, Value Check fails.

Conditions are defined in [code expression](./kotlinexpression.html), which should produce a Boolean value when evaluated, like `slot != null` , `function() == true` . You can joint the statements using `&&` or `||` , like `slot != null && slot < 3` .

### Inform
When Value Check fails, bot informs users that the value is invalid, like bot's utterance shown in [Motivation](../annotations/valuecheck.html#motivation). You should add at least one template to inform. 

### Recovering Strategy

In case value check fails, you can decide which slot to be cleared in Recovering Strategy, so that bot will start from that slot and try to get user choice for every slot after that one by one again. For example, when all the slots party size, data and time are filled but user's choice causes the slot's Value Check fails, you can choose to clear current slot's value only (which is default) or you can clear one of earlier slot, and start conversation from the slot being cleared again.

Suppose the order of slots is as follows. Here are two different situations using different Recovering Strategy.

![slot-order](/images/annotation/valuecheck/slot-order.png)

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
