# Initialization

[[toc]]

## Motivation

When a user orders food, the bot will need to have the user's phone number. It is ok to ask the first time user for it, but not ideal if this user is a regular customer, or he is reaching out from a logged-in channel like Imessage, where we can get their phone number programmatically. So instead of always asking phone number upfront, bot can be configured to propose a value for the slot based on user's history. 

:::: conversation
::: bot Bot
The order will be under the same number "1202555xxxx" as last time. Ready to place the order?
:::
::::

There are other use cases where initialization can be useful. For example, when booking a vocation, after a user has booked a flight ticket, bot can associate that flight arrival date and city for the start date and location for the subsequent hotel booking. View the whole conversation in [Testcase - Vacation](https://framely.naturali.io/org/622c8ff683536204fe062b55/agent/62b12e4eede53f1b65047b11/test_case).

:::: conversation
::: bot Bot
Booked a ticket from New York to Los Angeles on Feb 2, 2022. Do you want to book a hotel in Los Angeles from Feb 2, 2022?
:::
::::

In both case, initialization allows you to reduce the user effort level in acquiring service from you, thus give users a better user experience. 

## Overview
Initialization is the first stage of  "[Five Stages of Slot Filling](../../guide/slotfilling.md#five-stages-of-slot-filling)". When it is time to fill a slot per prompt strategy, bot will first check whether there is initialization configured for this slot. If it finds a usable value (not null), it will skip the prompting stage, and go directly to value check and confirmation phase. 

You can provide the slot with an initial value by defining the association of the slot. Association is defined in [code expression](./kotlinexpression.md), which supports the following expressions:
- Constant: For example, if the type of slot is *kotlin.Int*, you may set its association to be `0`.
- Slot:
  - You can pick an earlier slot of the same type as proposed value. If you pick an later slot, the behavior is not defined, meaning the behavior might change without notice.
- Function call:
  - Regarding the first situation in [Overview](#overview), you can set the phone number as `getUserPhoneNumber()`, which returns the user's previous phone number.
  - Go to [Intent: FoodOrdering](https://framely.naturali.io/org/622c8ff683536204fe062b55/agent/62b12e4cede53f1b65047b0f/intent/62b12eacede53f1b65047b13) to learn more details.
  
Beyond the normal operator like +,-,*,/, you can combine expressions using:
- [If expression](./kotlinexpression.md#if-expression)
  - If the value you try to provide is conditional, try to use [if expression](https://kotlinlang.org/docs/control-flow.html). The format of if expression is like `if (a > b) a else b`.
- [Elvis operator](./kotlinexpression.md#elvis-operator)
  - Instead of writing the complete if expression, you can also express this with the [Elvis operator](https://kotlinlang.org/docs/null-safety.html#elvis-operator) `?:`. If the expression to the left of `?:` is not null, the Elvis operator returns it, otherwise it returns the expression to the right. 
  - For example, if an expression is `a?:b?:c`, and a is null while b is not null, the initial value is b.

## How To Use
Initialization is an optional slot annotation. If you know that user will most likely accept a value based on application logic or historical data, you can use initialization to instruct bot to propose that value for user, reducing user's effort level.
![init](/images/annotation/initialization/init.png)

### Do user have to accept the proposed value?
Depending on whether you give user a chance to confirm, initialization are used for two different purposes: assignment and suggestion. 
#### Assignment
Some time, your business dictates what value can a slot take given existing user choice and business logic, user have to accept. This is assignment, where you can first enable the initialization on the slot, but not configure the [explicit confirmation](../annotations/confirmation.md#explicit). This way, bot will simply inform user the system choice for this slot and move onto the next slot.

#### Suggestion
Some time, your business wants provide a candidate value that user will mostly prefer based on history and statistics across users, but since you are not certain, you want to give user a chance to confirm just in case user might have a different idea. This is suggestion, where you can first enable the initialization on the slot, then enable the [explicit confirmation](../annotations/confirmation.md#explicit). This way, bot will simply inform user the system choice for this slot and give user a chance to confirm. If a user agrees, bot moves onto next slot, if that user does not agree, bot go back to prompting phase to ask user again.


## Considerations
::: tip Tips
1. When using initialization, it is best to add an [implicit confirmation annotation](../annotations/confirmation.md) to inform user the choice system provided, just to keep user and bot on the same page.
2. Make sure the value proposed here is in theory compatible with [value check](../annotations/valuecheck.md), minus fluctuation due to data changes, for example, the ticket is gone. This way, user does not get confused with ill-proposed value that triggered value check upfront.
:::



