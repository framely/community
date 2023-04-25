# Initialization
When a user orders food, the bot will need to have the user's phone number. While it's acceptable to ask a first-time user for their number, it's not ideal for regular customers or those using a logged-in channel like iMessage, where we can get their phone number programmatically. Instead of always asking for the phone number upfront, the bot can be configured to suggest a value for the slot based on the user's history.

```json
Bot: "The order will be under the same number "1202555xxxx" as last time. Ready to place the order?"
```

There are other use cases where initialization can be helpful. For instance, when booking a vacation, the bot can associate a flight's arrival date and city as the start date and location for a subsequent hotel booking after a user has booked a flight ticket.

```json
Bot: "Booked a ticket from New York to Los Angeles on Feb 2, 2022. Do you want to book a hotel in Los Angeles from Feb 2, 2022?"
```

In both cases, initialization allows you to reduce the user effort level required to acquire services from you, thus providing users with a better user experience.

## Overview
Initialization is the first stage of the [Five stages of slot filling](./overview.md#five-stages-of-slot-filling). When it's time to fill a slot, the bot will first check whether initialization is configured for that slot. If it finds a usable value (not null) based on configuration, it will skip the prompting stage and move directly to the value check and confirmation phase. Note, however, that user preference always takes precedence.

You can initialize the slot with a value defined in arbitrary [kotlin code expression](./kotlinexpression.md), which includes but are not limited to the following expressions:
- **Constant**: For example, if the type of slot is *kotlin.Int*, you may set its association to be `0`.
- **Slot**: You can pick an earlier slot of the same type as proposed value. If you pick a later slot, the behavior is not defined.
- **Function call**: You can use a function return: you can set the phone number as `getUserPhoneNumber()`, which returns the user's phone number.

## How to use
Initialization is an optional slot annotation. If you know that a user will most likely accept a value based on business logic or historical data, you can use it to reduce the need for the user to input by providing something they might accept.

The configuration of initialization is shown in the following figure, and the field labeled `Value` is used for specifying the proposed value.

![initialization](/images/annotation/initialization/init.png)

### Does a user have to accept the proposed value?
Depending on whether you give user a chance to confirm, initialization is used for two different purposes: assignment and suggestion. 

#### Assignment
Sometimes, your business dictates what value can a slot take given existing slot fillings and business logic. This is assignment, where you can first enable the initialization on the slot but not configure the [explicit confirmation](../annotations/confirmation.md#explicit). This way, the bot will simply inform the user of the system's choice for this slot and move on to the next slot. In fact, you typically do not need to configure anything else.

#### Suggestion
At other times, your business may only suggest what value a slot can take, given existing user choices and business logic that a user has to accept. This is suggestion, where you can first enable initialization on the slot and then configure the [explicit confirmation](../annotations/confirmation.md#explicit). This way, the bot will inform the user of the system's suggested value for this slot and then give the user a chance to confirm. If the user agrees, the bot moves on to the next slot; if the user does not agree, the bot goes back to the prompting stage for the user to input again.

### Dos and don'ts
::: tip Dos
1. When using initialization, it is best to add an [implicit confirmation annotation](../annotations/confirmation.md#implicit) to inform the user of the choice that the system provided, in order to keep both the user and the bot on the same page.
2. With suggestion, you also need to configure the prompt in case the user disagrees with the suggested value and the bot needs to extract the user's choice for this slot.
3. Ensure that the proposed value here is compatible with the [value check](./valuecheck.md) annotation, minus any fluctuations due to data changes. For example, if the ticket is no longer available, the proposed value should reflect that. Otherwise, the user may become confused with an ill-timed value check message.
:::


