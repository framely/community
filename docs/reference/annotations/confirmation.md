# Confirmation
Confirmations are a way for chatbots to check that they have understood the user's input correctly and that the user is happy with the actions that the chatbot is taking. They can help to build trust between the user and the chatbot. When users know that the chatbot is understanding them correctly and that they are in control of the conversation, they are more likely to trust the chatbot and use it again in the future.

Confirmations can be used in an implicit or explicit way:

- **Implicit confirmations** are subtler and do not require the user to explicitly state that they agree with the chatbot. For example, a chatbot might say *"Alright, 4 guests"* after the user has said *"I want to book a table for 4 guests."* This implicit confirmation shows that the chatbot has understood the user's request and is moving on to the next step.

- **Explicit confirmations** are more direct and require the user to explicitly state that they agree with the chatbot. For example, a chatbot might say *"I understand that you want to book a table for 4 guests. Is that correct?"* This explicit confirmation gives the user a chance to correct the chatbot if it has misunderstood their request.

## Overview
Confirmations can help to prevent errors and keep users happy. You can choose the type of confirmation to display to the user based on different conditions, depending on the situation. The system will check the confirmations in the order you specify, from top to bottom. This means that the chatbot will only show the first confirmation that is met. If no condition is met, the system will not show any confirmations.

- **Condition**: The situation that must be met before a confirmation is sent. For example, a chatbot might need to confirm the user's credit card number before making a purchase.

- **Confirmation**: The message that the chatbot sends to the user to check that they have understood the input correctly. Confirmation can be implicit or explicit: 

  - **Implicit**: Messages that simply inform the user that their input has been received. They do not require the user to reply, but the user may still provide feedback if they want to make a correction.

  - **Explicit**: Messages explicitly check with the user that their input or request was understood correctly. The chatbot will not perform the action until it receives a reply from the user, usually in the form of a yes/no or similar response.

When using explicit confirmations, you can customize how the system understands user utterances that are interpreted as yes or no. This is because there are many ways to say yes or no in different contexts, such as *"Red is my favorite color."* To handle these synonym expressions of yes and no, you can use affirmative and negative expressions.

- **Affirmative expressions** are words or phrases that mean yes, such as *"Sounds good"*, *"I agree"*, and *"Go ahead and delete it."*

- **Negative expressions** are words or phrases that mean no, such as *"I'm not comfortable with that"*, *"I'm not interested"*, and *"Not really, I'll hold off on sending it."*

By using affirmative and negative expressions, you can help the system to correctly understand user utterances that are interpreted as yes or no, even if they are not explicitly saying *"yes"* or *"no"*.

::: tip Note
The common understanding of confirmations for yes and no are already supported by the system skills `io.opencui.core.confirmation.Yes` and `io.opencui.core.confirmation.No`. So, there is no need to define them again. However, if you need to customize the system skill's behavior, you can add expressions to define your own confirmations.
:::

Confirmations can be set at two levels: slot level and frame level.

- **Slot level** confirmations are used to confirm each slot that is defined. If the slot is multi-valued, multi-valued confirmation can be defined, which will confirm each value of the slot.
  
  ::: details More detailed explanation of how to set it on slot level
  ![confirmation](/images/annotation/confirmation/confirmation.png)
  1. Go to the **slot detail page**, and select the **Annotation** tab.
  2. **Enable** Confirmation and click the **Add** button.
  3. In the popup window, set the conditions, confirmations and **Save**.
  :::

- **Frame level** confirmations are used to confirm after all slots on the frame/skill have been completed. The chatbot will bundle slots together for confirmation. Users can accept and modify batch confirmations.

  ::: details More detailed explanation of how to set it on type level
  ![type level confirmation](/images/annotation/confirmation/type_confirmation.png)
  1. On the type level, select the **Annotation** tab.
  2. In the **Confirmation** section, click the **Add** button.
  3. In the popup window, set the conditions, confirmations and **Save**.
  :::

## Best practice

Confirmations are a great way to improve the accuracy and usability of your chatbot. They can be used to prevent errors by ensuring that users have provided accurate information, ensure user satisfaction by giving users the opportunity to correct any mistakes that have been made, and build trust between users and chatbots by showing that the chatbot is taking the user's input seriously.

When using confirmations, it is important to consider the following:
1. **Use confirmations at key points in the conversation.** This includes:
   - When the chatbot is asking for information.
   - When the chatbot is about to take a significant action, such as booking a reservation or making a purchase.
   - When the chatbot is not sure if it has understood the user's input correctly.
   - When the user is likely to make a mistake, such as entering their credit card number.

2. **Use confirmations consistently.** This will help users know when to expect a confirmation and make it easier for them to understand what the chatbot is asking them to confirm.

3. **Use clear and concise language in your confirmations.** The user should be able to easily understand what the chatbot is asking them to confirm. Avoid using jargon or technical terms that the user may not understand.

4. **Give the user a chance to correct the chatbot if it has misunderstood their request.** 

5. **Use a friendly and conversational tone in your confirmations.** This will help to build rapport with the user and make them feel more comfortable interacting with the chatbot.
