# Value check
Value check is the process of verifying that the input values meet the requirements of the business logic. It can help you to immediately notify the user if the input values they provide fail to pass the business logic. This allows the user to correct the invalid value themselves and allows you to prevent invalid values from being entered into your system. 

For example, when a user is trying to make a reservation at a restaurant, the value check can be used to ensure that the following conditions are met: 
- The date and time of the reservation is within the restaurant's business hours.
- There are still available tables.
- The user has provided a valid email address.

If the value check logic determines that any of these conditions are not met, it can alert the user of the error and prompt them to provide a new value. This allows the user to correct the invalid value and to make a successful reservation.

## Overview
Value check is used to help you ensure that the input values provided are correct information. It works by setting a series of verification conditions that the input value must meet, a message to inform the user when checking fails, and recovery strategies. When the input value fails one of the verification conditions, the bot will respond to the user according to the recovery strategy that is associated with that condition.

- **Condition**: Identify the conditions that need to be met for the value to be considered valid. It is done by setting a [Kotlin expression](kotlinexpression.md) that evaluates a Boolean value, such as `slot != null`, `function() == true`. You can combine the statements using logical operator such as `&&`(and) or `||`(or), such as `slot != null && slot < 3`.

- **Inform**: Define the messages the bot informs users if the value check fails. The messages should be clear and concise, and they should explain the specific error that occurred.

- **Recovering strategy**: Set recovery strategies for invalid values. You can specify what the bot should do if there are invalid values. The default strategy is to clear the current slot and according to the fill strategy to re-ask the user.

::: details More detailed explanation of how to set it
![value check](/images/annotation/valuecheck/value-check.png)
1. Go to the **slot detail page**, and select the **Annotation** tab.
2. **Enable** value check and click the **Add** button.
3. In the popup window:
   - Identify the **conditions** that need to be met for the value to be considered valid.
   - Define the **inform** messages that the bot will display to the user if the value check fails.
   - Set **recovery strategies** for invalid values.
:::

For example, if you are a restaurant and you want to ensure that users only make reservations during your business hours, you could set a value check condition that checks whether the date and time the user provides is within your business hours: 
```kotlin
slot != null && slot.isAfter(businessHoursStart) && slot.isBefore(businessHoursEnd)
```
If the value check fails, the bot could display inform message that says:

```
"The date and time you provided is not within our business hours. Please choose a different date and time."
```

And clear the current slot value and re-ask the user for the date and time.

## Limitations

Here are some things to keep in mind about value check:

- **Clear slot is currently the only action that is supported for recovery strategies.** However, you can also use transitions to define more complex recovery strategies.

- **The clear slot action can only clear the target slot that you have set.** It will still re-check the following slot value to see if it passes the value check. If you want to clear multiple slots, you should set all of them one by one.

- **The Kotlin expression is a simple way to define the conditions for value checking.** However, if you need more complex conditions, you can define functions in the function section and use `function() == true` as the condition. For example, if you want to verify that the user has provided a valid email address, you could define a function called `isEmailValid()` and use `isEmailValid() == true` as the condition.

## Best practice

It is important to note that the best way to use value check will vary depending on the specific scenario. You should carefully consider the needs of the user and the requirements of the task when deciding how to use value check. The bot should not overwhelm the user with prompts or actions, and it should help the user complete the task as quickly and easily as possible.

Here are some tips for using value check effectively:

- **Use prompts**: When the value check fails, the bot can prompt the user to provide a new value. This is a good way to avoid overwhelming the user and to help them complete the task. For example, if the bot is trying to book a table at a restaurant, and the user provides an invalid date, the bot could prompt the user to provide a different date.

- **Use state transitions**: This can be useful for more complex scenarios, where the bot needs to take additional steps to recover from the error. For example, if the value check fails and the bot cannot prompt the user to provide a new value, it can use a state transition to move to a different state. For more information on how state transitions work, see [Transition](transition.md).