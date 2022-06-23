# Confirmation

[[toc]]

## Overview

Getting confirmation from the user is an important step in many business processes. It can give user feedback on how the input was understood. For example, bot can ask the user for confirmation before executing a specific process: 

:::: conversation
::: bot Bot
You want a one way ticket for: From JFK To London, Leaving on 2022-12-25, Time 17:00:00. Is that correct?
:::
::: user User
Sorry I need to change. 
:::
::::

It not only empowers users to correct mistakes immediately, but also reassures them that bot is processing the request. So here are two types of confirmation in a conversation: [explicit](#explicit) and [implicit](#implicit). 

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
Get. I set your street address to be *[address]* . <br>You will receive an email confirmation of this change in a few minutes. What else can I help you with?
:::
::::


### Features

The features of confirmation are as follows for you:

- Support two types of confirmation: Explicit and Implicit
- Support conditional confirmations
- Support multi-valued slot confirmation via per value confirmed
- Provide corrections on default strategy and interruption strategy
- Provide the way to customize the "yes/no" understanding of user utterances in specific contexts


## How to use

Confirmation is an optional annotation. There are two places that you can define confirmation: slot level and frame level, different places have different meanings:
- **Slot Level**: bot will confirm on each slot which is defined. For example: 

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

- **Frame Level**: bot will confirm after all slots on the frame have been done, just like bundle slots together for confirmation. User can accept and modify batch confirmations. For example: 

:::: conversation
::: bot Bot
You want a one way ticket for: From JFK To London, Leaving on 2022-12-25, Time 17:00:00. Is that correct?
:::
::::


### Conditions

With condition, bot can confirm with the user when the set of conditions are met. You can use [Kotlin Expression](kotlinexpression.md) to express the timing of key pieces of information that should be implied or requested.

:::: conversation
::: user User
Get me two tickets for Adele on Aug 16th
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
::: user User
Standing tickets please
:::
::: bot Bot
Great! So to confirm: two standing tickets for Adele on Aug 16th, is that correct. 
:::
::::

As you can see, bot confirms the COVID-19 info when the artist is Adele, the code expression you can write like `artist.identifier() == "adele"` .

### Expressions

There are many ways to say yes or no. To handle the synonym expressions of "yes/no" by the user, Affirmatives and Negatives provide the way for you to customize the "yes/no" understanding in specific contexts. 

Sorry I need to change

### Corrections

The bot should never ignore a user, when there’s been a misunderstanding or misinterpretation of one's input. So bot should always expect user to make corrections, after explicit and implicit confirmations, and give user the opportunity to make changes, even when there weren’t mistakes.

#### Default Strategy

<!--Explicit Confirmation No-->
Expect user corrections to follow the Cooperative Principle by saying “no”, followed by their correction (for example, “No, 7 AM”). 

#### Interruption 

<!--Implicit, slot update-->
Let users make changes to any of the parameters (the key pieces of information that were said or implied).
