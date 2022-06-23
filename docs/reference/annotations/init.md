# Initialization

[[toc]]

## Overview

Initialization is the first stage of  "[Five Stages of Slot Filling](../../guide/slotfilling.md#five-stages-of-slot-filling)". Before you ask users to fill the slot, you can provide the slot with an initial value. For example, when a user orders food, the bot will need to have the user's phone number.

:::: conversation
::: bot Bot
Could you please tell me your phone number?
:::
::: user User
2025550172
:::
::: bot Bot
Can you confirm your phone number is "12025550172"?
:::
::: user User
Yes
:::
::::

There is no problem asking like this if the user talks to the bot for the first time, but what if this user is a regular customer? Is it necessary for the user to type their phone number every time? What if user reach out from a logged-in channel like imessage, where we can get their phone number programmatically. If you know that user will most likely accept a value based application logic or historical data, bot can propose that value with Initialization, so that most users won't need to type phone number most of the time. In this way, the above conversation can instead be like this:

:::: conversation
::: bot Bot
Can you confirm your phone number is "12025550172"?
:::
::: user User
Yes
:::
::::

Of course, there are other use cases where initialization can be useful. For example, when booking a vocation, after a user has booked a flight ticket, bot can associate that flight arrival date and city for the start date and location for the subsequent hotel booking.

:::: conversation
::: bot Bot
Booked a ticket from New York to Los Angeles on Feb 2, 2022. What else can I do for you?
:::
::: user User
Can I book a hotel too?
:::
::: bot Bot
Do you want to book a hotel in Los Angeles from Feb 2, 2022?
:::
::::

Clearly, Initialization allow you to reduce the user effort in accessing service by using your know-how, thus give users a better user experience. 

## Features

You can provide the slot with an initial value by defining the association of the slot. Association is defined in [code expression](./kotlinexpression.md), which supports the following expressions:
- Constant
- Slot value
- Function call
- If expression

## How To Use

Initialization is an optional slot annotation. By adding initialization, you can provide an initial value of the slot. When you add an association to a slot, ensure the type of association is consistent with the type of slot.

![init](/images/annotation/initialization/init.png)

::: tip Try it with templates
1. Go to [Initialization](https://framely.naturali.io/org/622c8ff683536204fe062b55/agent/62b12e4eede53f1b65047b11/intent?page=0&imported=false&search=) and see examples in **Test Cases**.
2. Click **Try it now** > **Connect**, you can try it yourself.
:::

Association can be defined in [code expression](../../guide/glossary.md#code-expression-input) as follows. You can explore more expressions in [Kotlin docs](https://kotlinlang.org/docs/home.html).

- **Constant**

  - For example, if the type of slot is *kotlin.Int*, you may set its association to be `0`.

- **Slot value**

  - In the first scenario mentioned in [Overview](#overview), you can set a start date of hotels as `arrivalDate`, which is the arrival date of a flight. 

  - Go to [Intent: BookHotel](https://framely.naturali.io/org/622c8ff683536204fe062b55/agent/62b12e4cede53f1b65047b0f/intent/62b167ba1c33eb097abc218a) to learn more details.

- **Function call**

  - Regarding the second situation in [Overview](#overview), you can set the phone number as `getUserPhoneNumber()`, which returns the user's previous phone number. 

  - Go to [Intent: FoodOrdering](https://framely.naturali.io/org/622c8ff683536204fe062b55/agent/62b12e4cede53f1b65047b0f/intent/62b12eacede53f1b65047b13) to learn more details.
   
- **If expression**

  - If the value you try to provide is conditional, try to use if expression. The format of if expression is like `if (a > b) a else b`. To learn more about if expression, check out [If expression](https://kotlinlang.org/docs/control-flow.html).

::: tip Tips
1. To confirm the initial value with users, you can add [Confirmation annotation](../annotations/confirmation.md).
2. To double-check the initial value with business logic, you can add [Value Check annotation](../annotations/valuecheck.md).
:::



