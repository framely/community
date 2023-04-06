# Confirmation

[[toc]]

## Motivation

When ordering a spicy sandwich, the user may specify a level of spiciness that could be too intense for some people. To prevent discomfort, a bot might confirm if the user actually desires the requested spiciness level.

:::: conversation
::: bot Bot
How spicy do you want for your Tofu sandwich? On scale of 1 to 5?
:::
::: user User
5 please?
:::
::: bot Bot
We use strong Jalapeño, so level 5 is considered deadly, are you sure you want level 5?
:::
::::


## Overview
Even when user's choice for a slot passes value check, business can still think there are things that user might not know, thus can inform user something (implicit confirmation) or ask user to confirm their choice (explicit confirmation).

With confirmation, you can control this behavior by 
- Decide on which types of confirmation: Explicit and Implicit
- Specify a conditional under when confirmations should be triggered.
- Support multi-valued slot confirmation via per value confirmed
- Provide corrections on default strategy and interruption strategy
- Provide the way to customize the "yes/no" understanding of user utterances under this context for explicit confirmations


## How to use

::: thumbnail
![confirmation](/images/annotation/confirmation/confirmation.png)
:::

Confirmation is an optional annotation. There are two places that you can define confirmation: slot level and type level, different places have different meanings:
- **Slot Level**: bot will confirm on each slot which is defined. 
- **Type Level**: bot will confirm after all slots on the frame/skill have been done, just like bundle slots together for confirmation. User can accept and modify batch confirmations. 

### Conditions

With condition, bot can confirm with the user when the set of conditions are met. You can use [Kotlin code expression](kotlinexpression.md) to express the timing of key pieces of information that should be implied or requested.

:::: conversation
::: user User
Get me two tickets for Adele on Jul 1st
:::
::: bot Bot
Adele on Jul 1st, the Event Organizer is requiring all attendees to have been fully vaccinated (14 days past final vaccination show) AND to have received a negative COVID-19 test within 48 hours of the event. Please confirm you want to continue?
:::
::: user User
confirm
:::
::: bot Bot
Please select your seats
:::
::::

From the example above, you can see that bot will confirm the COVID-19 info and request a yes or no answer when the artist is Adele, while others will not: 

:::: conversation
::: user User
Get me two tickets for Coldplay on Aug 16th
:::
::: bot Bot
Coldplay on Aug 16th, please select your seats
:::
::::

In this case, there are multiple conditions that need to be set here:

::: thumbnail
![multiple conditions](/images/annotation/confirmation/confirmation_table.png)
:::
 
- One should be like `artist!!.value == "adele"` or `artist == Artist("adele")`:

::: thumbnail
![condition](/images/annotation/confirmation/condition_1.png)
:::

- Another can be simple, like `artist != null`:

::: thumbnail
![condition](/images/annotation/confirmation/condition_2.png)
:::

Bot will check the conditions according to the top-to-bottom order, and confirm when the condition is met:  
- If the first condition is `true`, bot will respond the confirmation to the user.
- if the first condition is `false`, bot will move on to the next condition, and so on.

Explore [Kotlin code expression](kotlinexpression.md) for more information.


### Explicit 

::: thumbnail
![explicit](/images/annotation/confirmation/confirmation_condition_explicit.png)
:::

Explicit confirmation typically involves checking with the user that their input or request was understood correctly, it is very wise to confirm the critical details. Bot will not perform the action until it gets the reply from the user to confirm, usually yes/no or some synonym.

You can double-check with the user prior to performing an action that would be difficult to undo, for example, cancel an order: 

:::: conversation
::: user User
Can I cancel an order?
:::
::: bot Bot
Sure. Could you provide me with the order number?
:::
::: user User
123456
:::
::: bot Bot
I found the order: *[order details]* <br>Should I go ahead and Cancel the order?
:::
::: user User
Yes.
:::
::: bot Bot
I have cancelled the order for you. 
:::
::::

But there are many ways to say yes or no by the user. To handle the synonym expressions of "yes/no", **Affirmatives** and **Negatives** provide the way for you to customize the "yes/no" understanding in specific contexts. 

::: thumbnail
![implicit](/images/annotation/confirmation/confirmation_expression.png)
:::

For example, In some scenarios, "*Sorry I need to change*" represents a new intention, but in certain scenarios, this means the user says no to the confirm. So you can add all of these cases in **Affirmatives** and **Negatives**. 

::: tip Note
The common understanding of confirmation yes and no is already supported in **system skill** *`io.opencui.core.confirmation.Yes`* and *`io.opencui.core.confirmation.No`*, so no need to define it here. But if needed, you can also customize system skill behavior by adding expressions.  
:::

### Implicit

::: thumbnail
![implicit](/images/annotation/confirmation/confirmation_condition_implicit.png)
:::

Unlike explicit confirmation, implicit confirmation does not require a reply from the user. It just simply confirms the input has been received like an FYI notification, and an operation will take place without asking for user approval, although users might give one if they want to make a correction. 

:::: conversation
::: user User
I need to change the shipping address.
:::
::: bot Bot
Can I get your street address?
:::
::: user User
*[address]*
:::
::: bot Bot
Get. I will set your street address to be *[address]* . <br>You will receive an email confirmation of this change in a few minutes. What else can I help you with?
:::
::::

