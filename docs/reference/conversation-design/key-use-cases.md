# Key use cases

Once you have a clear idea of the [interactions](design-interactions.md) you want to create, it's time to start writing your key use cases. These are the most important and most common conversational paths that users will take through your feature. Considering level of effort and timeline when prioritizing use cases. Here are a few tips for writing key use cases:

- **Aim for impact.** When prioritizing use cases, focus on those that will have the biggest impact on your users. This could mean scenarios that affect the largest number of users, or it could mean focusing on highly visible use cases or market differentiators.

- **Don't overdesign.** Focus on the most important and common interactions. This means avoiding edge cases and scenarios that are unlikely to happen. As you get into the details of the design, you may come up with new ideas or scenarios that you hadn't considered before. You can always add additional use cases later if needed.

- **No need to worry about understanding.** When writing your key use cases, you don't need to worry about understanding every possible way that a user might interact with your feature. Instead, focus on the most common and important scenarios. You can refine your understanding of user utterances later in the development process.

## Start with contextual snippets

When starting, we recommend focusing on just the on contextual snippets instead of dialogue flows. Contextual snippets are a better approach than dialogue flows for complex conversations that involve multiple topics.

Dialogue flows are a way of mapping out all possible conversation paths for a chatbot. However, as the number of topics increases, the number of possible conversation paths grows exponentially. This makes it impractical to map out every possible path, and can lead to chatbots that are not flexible or adaptive.

Contextual snippets, on the other hand, describe conversational behavior in small, manageable pieces. This allows businesses to build chatbots that are more flexible and adaptive, and can better handle unpredictable user responses.

Instead of worrying about the entire dialogue flow and how the user arrived at a certain point in the conversation, you can focus on the specific behavior required at each stage of the interaction. This allows your CUI to better handle unpredictable user responses and provide a more personalized experience.

Additionally, contextual snippets can be combined and reused to create a variety of conversational interactions for any service. This modularity allows businesses to build and test chatbot components independently and iterate quickly. It also makes it easier to scale chatbots to new domains or services, as existing snippets can be adapted or combined to fit new requirements.

## What is contextual snippets

A contextual snippet is a piece of content that defines how a chatbot should behave in a specific conversation context. It consists of five parts:

- **Label**: A short name that identifies the snippet.

- **Description**: A more detailed description of what the snippet does. This description should be clear and concise, and it should explain the purpose of the snippet and how it works.

- **Precondition**: A set of conditions that must be met before the snippet. These conditions are typically expressed in terms of the current dialog state, which is a collection of slot-value pairs that the chatbot's understanding of the conversation.

- **Annotated dialog snippet**: A sample conversation that shows how the chatbot should behave under the specified preconditions, includes the user's utterances, the chatbot's responses.

- **End state**: The dialog state that the chatbot will be in after the annotated dialog snippet is completed. This can be a new dialog state, or it can be the same dialog state that the chatbot was in before the snippet was executed.

When writing contextual snippets, you only need to focus on the use case of the current snippet. You don't need to pay attention to how the dialogue comes and what steps the user goes through. This is because OpenCUI is a flowless design. No matter what the pre-processing is, it will not affect the current conversation. The only difference is the context in the conversation.

This means that OpenCUI will always follow the mechanism that you define. According to the definition in the interaction layer, if there is a value that is required but unknown, the chatbot will ask directly. If there is a value that needs to be checked or confirmed, the chatbot will check and confirm according to the definition.

As a result, you can focus on writing clear and concise snippets that handle the specific use cases that you need to address. You don't need to worry about the flow of the conversation or how the user got to that point in the conversation.

## Example

Let's use a restaurant reservation service as an example. When designing contextual snippets for this service, it is a good approach to start with the happy path, which is the most common and straightforward way for a user to make a reservation. Once the happy path is done, you can then gradually incorporate the requirements for rare corner cases. It is not necessary to modify the happy path snippet to accommodate these new corner cases.

### Contextual snippet 1: Happy path

Here is an example of a contextual snippet for the happy path of a restaurant reservation service. This snippet shows how the chatbot can successfully complete a transaction for a user who wants to book a table. The chatbot asks for the user's preferred date and time, and then confirms the booking informations with the user before processing the booking.

- **Label**: Happy path
- **Description**: Defines what happens if everything goes well.
- **Precondition**: N/A
- **Annotated conversation**: 

  ```json
  User: "I'd like to make a reservation for dinner tonight."
  Chatbot: "Sure, how many people will be in your party?"
  User: "Two people."
  Chatbot: "What time would you like to make your reservation for?"
  User: "7:00 PM."
  Chatbot: "Great, I have a table available for you at 7:00 PM. Is that okay?"
  User: "Yes, that's perfect."
  Chatbot: "Please provide your name and phone number so I can confirm your reservation."
  User: "My name is John Smith and my phone number is 123-456-7890."
  Chatbot: "Thank you, Mr. Smith. Your reservation has been confirmed."
  ```

- **End state**: Slots number of guests, date, time, name and phone number are filled.


### Contextual snippet 2: Invalid input

This snippet shows how the chatbot can handle invalid input successfully complete service. In this case, when  tables are unavailable or users provide incorrect information, the chatbot should gracefully handle such issues and provide helpful responses to users. 

- **Label**: Specified information does not pass validation
- **Description**: After the user specifies the information, the value of the {slot} does not pass validation. Bot will inform the verification failure message and ask the user again.
- **Precondition**: Slots number of people, date are filled.
- **Annotated conversation**:

  ```json
  ...
  Chatbot: "Sure, I can help you with that. What time would you like to make your reservation for?"
  User: "I would like to make my reservation for 7:00 PM."
  Chatbot: "Unfortunately, we do not have any tables available for 7:00 PM tomorrow. Would you like to try a different time?"
  User: "Yes, can I make my reservation for 8:00 PM instead?"
  Chatbot: "Sure, we have a table available for 8:00 PM tomorrow. Would you like to proceed with the reservation?"
  ...
  ```

- **End state**: Slots number of guests, date, time are filled.


### Contextual snippet 3:  User changes mind

This snippet shows how the chatbot can handle a user who changes their mind in their reservation. In this case, the chatbot makes it easy for the user to make changes to the number of guests, and provide helpful responses to the user. 

- **Label**: User changes mind
- **Description**: After the information is determined by the user, the user will be able to easily make changes to their reservation.
- **Precondition**: Slots number of people, date are filled.
- **Annotated conversation**:

  ```json
  // context
  User: I'd like to make a reservation for dinner tonight.
  Chatbot: Sure, how many people will be in your party?
  User: 2 people.
  Chatbot: What time would you like to make your reservation for?
  // current snippet
  User: "Ah, wait, 4 people."
  Chatbot: "I see that you have already specified 2 guests. Would you like to change the number of guests to 4?"
  User: "Yes, please."
  Chatbot: "Alright, a table for 4. What time should I book?"
  ...
  ```

- **End state**: Slots number of people, date are filled.


These above are just examples of contextual snippets. You can expand your snippet according to actual scenarios.