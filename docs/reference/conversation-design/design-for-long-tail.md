# Design for the long tail

By now, you should have a design that covers the most common paths that users will follow. Now, it's time to consider the less common paths, or the "long tail" of possibilities.

These are situations that are not as common, but they can still happen. For example, what if the user wants to make a reservation for a large party? Or what if the restaurant is already booked for the date and time that the user wants? It's important to think about all the things that can go wrong in your conversation and all the unexpected or unsupported paths that users might take.

By covering these long tail paths, you can ensure that your conversation design is as robust and user-friendly as possible. This will help to improve the user experience and prevent users from getting stuck or frustrated.

## Common detours 

Between key use cases and edge cases, there are a number of somewhat common detours. These are new scenarios that you may not have considered until they were revealed during testing or discovered during development. Most of the time, they require longer, less direct handling down an alternative path.

Here are a few common detours to consider: 

### Unsupported implementation or limited functionality

Even if your chatbot is well-designed, it may not be able to support all common user requests. This can lead to users quickly reaching its limits and finding it unhelpful.

For example, consider an informational chatbot that is designed to answer common questions from users. When a user asks if the venue allows bringing reusable bottles, the chatbot may be unable to provide useful information. This may seem like a language understanding issue, but it is more likely due to the chatbot's lack of skills to handle typical user requests related to the service. Instead, the chatbot may simply reply with answers to similar questions that it has been asked in the past.

Similar issues can arise in the ordering scene, where users may have special preferences, such as no spicy food, vegetarian food, or no milk. These long tails need to be considered when designing chatbots.

### Lack of context

Understanding the context of a conversation is essential for a chatbot to provide relevant and coherent responses. If the chatbot fails to interpret the context correctly or cannot maintain the context over multiple exchanges, it can lead to misunderstandings and unsatisfactory replies.

For example, if a user asks for restaurant recommendations in a certain location, and then wants to narrow down the recommendations by restaurant category, the chatbot should always keep track of the user's previous requests and provide recommendations based on the user's location. If the chatbot does not understand the context of the conversation, it may ask the user for their location again, which can be frustrating for the user.

In a similar scenario, the user may ask about the weather when booking a flight ticket, and may then book a hotel after booking the flight ticket. In these scenarios, the chatbot should be able to access the user's location and date information from the context of the conversation, without asking the user again. This can be done by prompting the user with an implicit confirmation, or by explicitly asking the user if they want to use the previously-provided information.

By understanding the context of a conversation, you can provide a more personalized and helpful experience for users. This can lead to increased customer satisfaction and loyalty.

### Poor interaction

While you have provided some interactions, they may not meet the needs of all customers, especially experienced customers. 

For example, a typical transactional chatbot may be able to handle simple customer feedback, such as asking the user questions about their feelings. However, when an experienced customer gives feedback about a problem, the chatbot may not be able to understand the user's description and continue to ask the user questions about their feelings, step by step, according to the existing rules. This is likely due to a lack of design for understanding user feedback.

To improve the chatbot's ability to understand user feedback, you could add new intents and entities that are specific to different types of feedback. For example, you could add frames for feedback such as "order", "food" and "delivery". You could also add entities for delivery terms such as "price", "time" and "address". By adding these new intents and entities, the chatbot will be better able to understand user feedback and provide helpful responses.

However, it is important to note that these are less common conversational paths through your feature. This means that you should take the time to adequately support them, but you should avoid spending too much time and effort designing them.

## Recovery strategy

Even the best chatbots can make mistakes. If that happens, it is important for the chatbot to have recovery strategies in place. These strategies can help to minimize the impact of the mistake and keep the conversation on track.

Some common recovery strategies include:

- **Sending a fallback message**. This message not only acknowledges the mistake and explains what happened, but also provides some next steps for the user to move on. This can help to keep the conversation on track and prevent the user from becoming frustrated.

- **Offering to transfer the user to a human agent**. This is a good option if the user is asking a complex question or if they need help with something that the chatbot is not able to do. The chatbot can offer to transfer the user to a human agent who can help them with their request.

- **Restarting the conversation from a specific state**. This is a more advanced recovery strategy, but it can be very effective if the chatbot has been able to track the conversation state. This allows the chatbot to start over from a point where it is more likely to be successful.
