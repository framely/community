# Initialization
Initialization is the process of assigning initial values to slots. This can be done when the values are known, such as when a user orders food and you already know their name and phone number. You can directly assign those values to the corresponding slots. This can be useful for saving time and effort, as the bot does not have to ask the user for the same information twice.

For example, let's say you have a chatbot that helps users book vacations. If the user has already booked a flight, you can initialize the hotel's `start date` and `location` slots with the values of the flight's `arrival date` and `city`. This means that the user will not have to repeat this information when they book the hotel.

By carefully considering which slots to initialize and with what values, you can make your bots more user-friendly and efficient. 

## Overview

**Initialization is the first step in slot filling.** It is the process of setting a value for a slot before the user is asked to provide it. This can be done to save time and effort, or to ensure that the slot is always filled with a valid value.

To set initialization, you need to specify the target slot and the value.

- **Target slot**: The slot that you want to initialize with a value before asking the user.

- **Value**: The value that will be associated with the target slot. It is done by setting a [Kotlin expression](kotlinexpression.md) that evaluates the desired value. The expression can be a constant, another slot, or a function. You can also use conditional logic to determine the value.

There are two ways to set initialization: slot level and frame level.

- **Slot level**: This is the simplest type of initialization. You do not need to worry about the target slot, as it is the slot itself. You only need to specify the value that you want to initialize the slot with. 

- **Frame level**: This is more flexible than slot level initialization. It allows you to initialize multiple slots including nested slots in a single place. You can also specify the order in which the slots are initialized. Frame level initialization is set in the "**Transition > State**" section.

![initialization](/images/annotation/initialization/init.png)

## Limitations

Here are some things to keep in mind:

- **Initialization is only assigned once.** This means that if the value of a slot is re-asked because it is unavailable or the user is dissatisfied, the initialization that has already been performed will not be performed again. 

- **When a nested slot has initialization defined in the hosting type, the initialization defined on the slot itself will not be executed for the first time.** This means that if a slot is initialized with different values at different places, such as on the hosting type or on the direct slot, the one defined on the hosting type will take precedence. If the nested slot is re-asked, the initialization value defined on the slot itself will be used.

These limitations can be mitigated by carefully considering which slots to initialize and with what values. However, it is important to be aware of these limitations so that you can understand how they will affect your chatbot.

## Best practice

Initialization can be used in a variety of situations, such as:
1. When the value of a slot is known in advance.
2. When you want to ensure that a slot is always filled with a valid value.
3. When you want to save time and effort by not having to ask the user for the value of a slot.

Here are some tips for using initialization effectively:

- **Use prompts.** Configure the prompt in case the user disagrees with the suggested value. This means that you should have a plan for what to do if the user does not agree with the suggested value. For example, you could ask the user to provide a different value, or you could provide a list of possible values.

- **Use value checks.** Make sure that the value you are initializing the slot with is valid for the slot. For example, if you are building a chatbot that helps users book flights, you should use a value check to ensure that the value of the date slot is a valid date.

- **Use confirmations.** When you initialize a slot, it is a good idea to confirm with the user that the value is correct. This can be done implicitly, by displaying the value, or explicitly, by asking the user to confirm the  that it is correct. For example, you could say something like *"The destination is Paris. Is that correct?"*