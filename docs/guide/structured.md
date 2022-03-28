# Structured Conversation 
The goal of the Framely is to build conversational user interface for your services. This general assumption not only provide conversational design guideline for conversational service builder, but also put a expectation on what kind of user behavior we should generally prepare for. In short, since we expect user engage in conversation with out bot with a goal of get served with least effort on their part, so we should expect that user will be cooperative.

## Cooperative Principle
In conversation analysis, the cooperative principle is the assumption that participants in a conversation normally attempt to be informative, truthful, relevant, and clear. The concept was introduced by philosopher H. Paul Grice in his 1975 article "Logic and Conversation" in which he argued that "talk exchanges" were not merely a "succession of disconnected remarks," and would not be rational if they were. Grice suggested instead that meaningful dialogue is characterized by cooperation. "Each participant recognizes in them, to some extent, a common purpose or set of purposes, or at least a mutually accepted direction."

Grice expanded his cooperative principle with the four following conversational maxims, which he believed anyone wishing to engage in meaningful, cogent conversation must follow.

### Maxim of Quantity
Say no less than the conversation requires. Say no more than the conversation requires. The maxim of quantity means that we provide as much information as needed to achieve a goal, no more and no less. Think of the difference between having a conversation with someone who replies in just Yes or No statements and another one with someone who goes on a long monologue with unnecessary detail. This is a critical principle that chatbots must follow in order to continue the conversation with a user and keep them engaged. 

### Maxim of Quality
Don't say what you believe to be false. Don't say things for which you lack evidence. The maxim of quality refers to provide information that is true. Being truthful in a conversation means avoiding falsehoods and saying things without adequate evidence. 

### Maxim of Manner
Don't be obscure. Don't be ambiguous. Be brief. Be orderly. When designing conversations, it is also important to follow the maxim of manner. This means being clear, brief and orderly while avoiding obscurity or ambiguity.  

### Maxim of Relevance
Be relevant. The maxim of relevance suggests that we engage in conversations that are relevant to others. For chatbots, this would mean replying to queries with information that help the user with their goal. A response that is not relevant to the user can break the natural flow of conversation and turn the user away.  

## Structured Conversations
In addition to provide clear guideline when it comes to conversational design for bot, we assume the user will follow the same principle and hence the four maxims as well. Of course, this does not mean that we can control how user will interact with chatbot, user still say whatever they want to say. This just mean that the bot are only designed to help the cooperative user for most part, which will avoid the unnecessary over design, and thus greatly reduce the complexity and cost of build the effective chatbots.

While we can not control what user want even when they are cooperative, we have control on how chatbot should engage in the conversation. Since the goal is to deliver the service in a cost effective fashion, we want bot to follow a simple yet effective strategy, easy for builder to design and debug, yet powerful enough to deliver arbitrary services. In particularly, we want bot to engage in structured conversations.
 
Structured conversations are simply composite conversation sequences, in both sequential and nested sense. Each sequence has concrete goal, and have a clear start and finish. Finish can come in different flavors: including abort by user or early exit per business logic. Furthermore, each sequence has a clear owner. Owner start the sequence, and set the goal and communicate to other party, and  other party is cooperating in help to achieve the goal for the owner. 

Of course, current conversation owner can yield ownership to other party: for example, the bot can say "what can I do for you", this can potentially started a nested conversation sequence that is owned by user. And after the sequence concludes, then the ownership automatically get back to bot. Of course, in this case, user can choose not to take the ownership by simply reply "nothing, thanks" , which will bring closure to bot's owned sequence, bot is expected to simply close the sequence in the next turn. 

## Summary
Under the cooperative principle, for goal oriented conversation, we let bot follow a very simple strategy: at any given time, bot will only engage in single conversation sequence with one goal, and it will try to bring the active conversation sequence to closure before it move onto a different one.  Of course, we assume cooperative user will say anything they see it, bot will try to act to informational request right away, and then bring conversation back, but will make user commit to single transactional request at any given time. This structured conversation can be easily carried out by stack based topic tracker, in addition to being easy for debug. The structure conversation is also powerful enough for any service, so it serves basis for dialog annotation design on Framely.
