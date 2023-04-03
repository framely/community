# Cooperative principle
To build a conversational user interface (CUI) for your service, we focus on goal-oriented conversations where participants are assumed to have a common goal. In the business world, this typically means both sides want to complete a transaction, or businesses deliver something that users want. The cooperative principle says that parties involved normally attempt to be informative, truthful, relevant, and clear. The concept was introduced by the philosopher H. Paul Grice in his 1975 article "Logic and Conversation" in which he argued that "talk exchanges" were not merely a "succession of disconnected remarks" and would not be rational if they were. Grice suggested instead that meaningful dialogue is characterized by cooperation. "Each participant recognizes in them, to some extent, a common purpose or set of purposes or at least a mutually accepted direction."

## Four Pillars
Grice expanded his cooperative principle with the four following conversational maxims, which he believed anyone wishing to engage in meaningful, cogent conversation must follow.

### Maxim of Quantity
Say no less than the conversation requires. Say no more than the conversation requires. The maxim of quantity means that we provide as much information as needed to achieve a goal, no more and no less. Think of the difference between having a conversation with someone who replies in just "Yes" or "No" statements and another one with someone who goes on a long monologue with unnecessary detail. This is a critical principle that chatbots must follow to continue the conversation with a user and keep them engaged.

### Maxim of Quality
Don't say what you believe to be false. Don't say things for which you lack evidence. The maxim of quality refers to providing information that is true. Being truthful in a conversation means avoiding falsehoods and saying things without adequate evidence.

### Maxim of Manner
Don't be obscure. Don't be ambiguous. Be brief. Be orderly. When designing conversations, it is also important to follow the maxim of manner. This means being clear, brief, and orderly while avoiding obscurity or ambiguity.

### Maxim of Relevance
Be relevant. The maxim of relevance suggests that we engage in conversations that are relevant to others. For chatbots, this would mean replying to queries with information that helps the user with their goal. A response that is not relevant to the user can break the natural flow of conversation and turn the user away.

## Implications
By designing a bot to help only cooperative users, we can avoid unnecessary over-design and greatly reduce the complexity and cost of building effective chatbots. Within the boundary set by the cooperative principle, we can explicitly seek to simultaneously maximize user experience and minimize building cost. This means that users should be able to say whatever they want to say, but the bot should behave as simply as possible, so it is easy to build, as long as it is still effective in helping the user.

Good conversational user interface design should anticipate anything relevant to business. However, this does not mean the bot needs to serve any request the user might have. Building such an omnipotent bot does not make business sense. Since the goal is to deliver any services in a cost-effective fashion, we can design a bot to follow a simple yet effective strategy, so it is easy for the builder to design and debug. In particular, at any given time, a bot will only engage in a single conversation sequence with one goal, and it will try to bring the active conversation sequence to closure before it moves onto a different one. When a user digresses in the middle of a transaction service, the bot will react to that and then bring the conversation back on track. We say that the bot engages in structured conversations.