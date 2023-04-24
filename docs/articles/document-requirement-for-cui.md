---
article: true
date: 2022-12-27

image:
    - blog/banner/document_requirement.png
description:
    - We devised an effective way to communicate CUI design
author: Sean Wu, Bird Zeng
---

# Document CUI Design
![Banner](/images/blog/banner/document_requirement.png)

Service chatbot is an essential approach to improve the customer experience. With recent advance in large language model, service chatbots slowly move beyond only answering questions. They are now expected to handle transactional requests like reserving a table or ordering food, or even more complex service like health care.

While building service chatbots can improve customer experience and lower operation costs, the process of creating them can be complex and costly. Gone are days when one can build a chatbot by simply maintaining a set of frequently asked questions. Service chatbot, as conversational user interface to the full-fledged backend service APIs, requires proper building process to reduce the risk associated with such complexity. To minimize the cost and risk, many questions need to be answered before any code is written: what exactly we will build, and who can help with what, how much a particular feature will cost, and when it will be available, etc. Answering these questions requires inputs from multiple people and often involves multiple rounds of discussion. Effective communication of requirements and design is crucial to making these discussions productive.

![requirement](/images/blog/requirement-for-cui/requirement.png)
*The ugly fact about requirements engineering - from www.projectcartoon.com*

Wireflow, a flow diagram connecting wireframes, is often used to document low-fidelity designs for graphical user interfaces because it is easy for all parties to learn and use, and can precisely describe the design or requirements in a way that is easy to modify. However, wireflow can only describe the graphical rendering not conversational interaction, so we need a method to document low level CUI design. But how do we design conversational interaction?

![wireflow](/images/blog/requirement-for-cui/wireflow.png)

## Service Driven Design
For informational chatbots, the cost of fulfilling an intent is low, as it simply involves drafting a text response. As a result, intent-driven analysis that reviews conversation history to identify new intents that the chatbot can serve is a popular method. In this approach, an "intent" is the semantic representation of a user's utterance and represents the purpose of the user's interaction with the chatbot.

Human language are extremely powerful and subtle distinctions between utterances can lead to unnecessary debate if not grounded to services. For example, *"Are you guys open now?"*, *"What is your hours on Tuesday?"*, *"When do you guy close?"*, and so on, can be argued to be different intents, but they could all be served by the same query to the same knowledge base. While documenting user intents can be a useful step in requirement exploration, there is very little value in documenting user intent that we can not fulfill in production.  

![conversationflow](/images/blog/requirement-for-cui/conversationflow.png)

The economics for fulfilling transactional intent, however, is completely different. A large team including architect, developer, database management and also devops is required just to get started.  As a result, there are typically significantly fewer service APIs compared to the number of possible intents. Also, the goal of service chatbot is to get users the service they want as quickly as possible. So naturally, we can use service as basic unit for chatbot requirement analysis, and simply consider chatbot as a set of services. This simplification does not limit a chatbot's capability. User can still engage in conversations for more than one services, but chatbot can keep only one of them active at a time, by focusing on first completing the current active service before switch to another. This allows us to design one service at a time. 

## Structured Conversation
To deliver what users need, it is essential for chatbots to acquire users' preferences on various slots of service that define how they want service being customized. For example, information about the movie title, showtime, format, and number of tickets is required to sell the correct movie tickets to a user. It is common for users to not provide all necessary information in one go, so chatbots must conduct effective conversations with users to gather this information. To provide a consistent and predictable experience for all users and make it easy to program, chatbots should conduct structured conversations rather than irrational ones.

By structured, we mean that the conversation is divided into two layers: the logic layer and the language layer. The chatbot first decides what it needs to say at the logic layer, then renders that semantic content into the language that users understand. At the logical level, conversations are deterministic. This does not mean that the chatbot should always say the same exact message, but rather that it can produce diverse text responses at language level as long as they convey the same meaning. Deterministic conversations can result in consistency, which is an advantage of deploying chatbots in addition to their 24/7 availability.

| Schema | Interaction Logic | Language Perception | 
| :---    | :---        |:---            |                     
| movie title | <ul><li> Required. </li><li> Provide options.</li><li> Need verified.</li></ul> | <ul><li> Which movie do you want to see? </li><li> Which film are you interested in watching? </li><li> What movie do you have in mind? </li><li> Which film are you considering going to see? </li><li> ... </li></ul> | 
| showtime | <ul><li> Required. </li><li> Provide options.</li><li> Need verified.</li></ul> | <ul><li> Which showtime would you like? </li><li> At what time would you like to see the show? </li><li> What time would you like to go to the movie? </li><li> ... </li></ul> | 
| format | ... | ... | 
| number of tickets | ... | ... | 


By structured, we also mean that chatbot generates responses based on a set of  composite rules that can be used to break down even the most complex use cases into simpler ones. The compositional nature of structured conversations makes it easy to reuse the same conversational behavior, often in the form of CUI components. Using existing, high-quality components to build a conversational user interface (CUI) rather than starting from scratch allows for the creation of a good conversational experience at a lower cost.

## Contextual Snippet
A good strategy for filling the slots of a service so that the chatbot can deliver what the user wants should be deterministic by going through the slots in a predefined order and, for each slot, going through the stages of initialization, prompting, value recommendation, value check, and confirmation. These stages can interact with the production system through service APIs, engaging in a systematic conversation with the user based on both API return values and user input. For example, after receiving a user's initial choice for a movie title, the chatbot can check with the production system to see if there are still available showtimes or seats, and either move on to the next slot or prompt the user for a new movie title.

The conversational behavior of the chatbot for that service can then be described using a set of contextual snippets along with the schema representation of that service. The schema representation of a service is simply an label for the service, and all its required slots along with their types that defines what value can be used to fill such slot. A contextual snippet for the service consists of label, description, precondition, annotated dialog snippet and an end state. The preconditions are defined by the dialog states in the form of slot/value pairs, along with service APIs result, and annotated dialog snippets showcase how chatbot should behave in such entering condition. The end states defines dialog state chatbot ends up with after the sample conversation snippet is done.  

Let's use movie ticket selling service as example, the scheme representation of the service can be sketched as follows:

| Service     | Slots  | 
| :---        | :---               |
| **Sell Movie Ticket**   | <ol><li>`movie title`, with type **MovieTitle** entity.</li><li>`showtime`, with type **LocalTime**.</li><li>`format`, with type **MovieFormat**, e.g. *IMAX 3D*, *Digital 3D*, *Standard*.</li><li>`number of ticket`, with type **Integer**.</li></ol>  | 

### Contextual Snippet 1: Happy Path

| Snippet 1                  | Happy Path                                    | 
| :---                       | :---                                          | 
| **Description**            | Defines what happens if everything goes well. | 
| **Precondition**           | complete: `false`                             | 
| **Annotated Conversation** | <ul><li> :blush: : Two tickets for the Star Wars, please. </li><li> :robot: : Do you want watch IMAX for that?</li><li> :blush: : Yes, please. </li><li> :robot: : There are two available showtimes: 6:00pm and 10:00pm, which one do you like? </li><li> :blush: : 6:00pm please. </li><li> :robot: : That is two tickets for 6:00pm IMAX Star Wars, total $24, please. </li></ul> | 
| **End State**              | <ul><li>title = `Star Wars`, </li><li>showtime = `6:00pm`, </li><li>format = `IMAX`, </li><li>number of tickets = `2`, </li><li>complete = `true`. </li></ul> | 

### Contextual Snippet 2: IMAX is NOT available any more, but user are OK with standard form

| Snippet 2                  | IMAX is NOT available, but user are OK with standard form | 
| :---                       | :---                                                      | 
| **Description**            | After user specify title, there is no imax available.     | 
| **Precondition**           | <ul><li>title = `"Star Wars"`, </li><li>complete = `false`, </li><li>Services APIs says IMAX is sold out. </li></ul> | 
| **Annotated Conversation** | <ul><li> :robot: : IMAX are sold out today. There are two available showtimes in standard format: 6:00pm and 10:00pm, which one do you like? </li><li> :blush: : 6:00pm please. </li></ul> | 
| **End State**              | <ul><li>title = `"Star Wars"`, </li><li>showtime = `"6:00pm"`, </li><li>format = `"Standard"`, </li><li>number of tickets = `2`, </li><li>complete = `true`. </li></ul> | 

<br>

Contextual snippets allow you to describe the requirement for conversational user interface in a piece meal fashion. You can start with just happy path, and gradually add requirement for rarer and rarer corner cases. The happy path requirement does not need to be changed with these new corner case. The stability provided by this way of document requirement allow us to build better and better conversational experiences. 

## Parting Words

Good requirement documentation make it possible to stakeholders to discussion what should be built without writing a single line of code. Assuming that chatbot should work on one service at a time, and deterministically follow predefined strategy to fill the slots, we introduce contextual snippets as a method to document requirement for CUI frontend. This method is very easy to pick up, can precisely document what is expected conversational behavior for delivering service, and is useful regardless which platform is used to build conversational user interface. While there is no explicit global view of all possible interactions, this localized requirement documentation method allows for incrementally building conversational experience. We hope this systematic way of document CUI requirement can reduce the risk and thus associated cost in building your next chatbot, and make your customer happier.