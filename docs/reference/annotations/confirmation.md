# Confirmation

[[toc]]

## Overview

The goal of the conversational user interface is to reach agreement on what the user wants that is also deliverable by business as quickly as possible. So during collaborative conversation, bot might augment use choice based on business logic and data, so we need to keep user informed: 

:::: conversation
::: user User
Need one way ticket pls
:::
::: bot Bot
Let's find a one way ticket for you. Which date do you want to fly?
:::
::: user User
Dec 25th
:::
::: bot Bot
Get, leaving on 2022-12-25. What time would you like to leave?
:::
::::

Or based on business logic,  bot might ask the user to confirm the choice they made before consequential things really happen, and sometimes both: 

:::: conversation
::: bot Bot
You want a one way ticket for: From JFK To London, Leaving on 2022-12-25, Time 17:00:00. Is that correct?
:::
::: user User
Yes
:::
::::


## Features

The features of confirmation are as follows for you:

- Support two types of confirmation: Explicit and Implicit
- Support conditional confirmations
- Support multi-valued slot confirmation via per value confirmed
- Provide corrections on default strategy and interruption strategy
- Provide the way to customize the "yes/no" understanding of user utterances in specific contexts


## How to use

::: thumbnail
![confirmation](/images/annotation/confirmation/confirmation.png)
:::

Confirmation is an optional annotation. There are two places that you can define confirmation: slot level and frame level, different places have different meanings:
- **Slot Level**: bot will confirm on each slot which is defined. 
- **Frame Level**: bot will confirm after all slots on the frame have been done, just like bundle slots together for confirmation. User can accept and modify batch confirmations. 

### Conditions

With condition, bot can confirm with the user when the set of conditions are met. You can use [kotlin Expression](kotlinexpression.md) to express the timing of key pieces of information that should be implied or requested.

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
 
- One should like `artist.identifier() == "adele"` :

::: thumbnail
![condition](/images/annotation/confirmation/condition1.png)
:::

- Another can be simple, like `artist != null`:

::: thumbnail
![condition](/images/annotation/confirmation/condition2.png)
:::

Bot will check the conditions according to the top-to-bottom order, and confirm when the condition is met:  
- If the first condition is `true`, bot will respond the confirmation to the user.
- if the first condition is `false`, bot will move on to the next condition, and so on.

Know more about [kotlin Expression](kotlinexpression.md).


### Explicit 

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

### Implicit

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

### Expressions

There are many ways to say yes or no. To handle the synonym expressions of "yes/no" by the user, Affirmatives and Negatives provide the way for you to customize the "yes/no" understanding in specific contexts. 

Sorry I need to change


## Corrections

The bot should never ignore a user, when there’s been a misunderstanding or misinterpretation of one's input. So bot should always expect user to make corrections, after explicit and implicit confirmations, and give user the opportunity to make changes, even when there weren’t mistakes.

#### Default Strategy

<!--Explicit Confirmation No-->
Expect user corrections to follow the Cooperative Principle by saying “no”, followed by their correction (for example, “No, 7 AM”). 

#### Interruption 

<!--Implicit, slot update-->
Let users make changes to any of the parameters (the key pieces of information that were said or implied).
