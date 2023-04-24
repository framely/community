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


While building service chatbots can improve customer experience and lower operation costs, the process of creating them can be complex and costly. To minimize the cost and risk, many questions need to be answered before any code is written: what exactly we will build, and who can help with what, how much a particular feature will cost, and when it will be available, etc. Answering these questions requires inputs from multiple people and often involves multiple rounds of discussion. Effective communication of requirements and design is crucial to ensuring productive discussions when answering these questions.


::: thumbnail
![requirement](/images/blog/requirement-for-cui/requirement.png)
*The ugly fact about requirements engineering - from www.projectcartoon.com*
:::

A flow diagram, such as wireflow, is often used to document low-fidelity designs for graphical user interfaces (GUIs) because users can only interact with the app in the ways that have been designed for them. Therefore, a flow-based documentation can precisely describe the design or requirements and is easily modifiable. However, since users can say anything at any given turn, documenting conversational interaction using a flow-based approach can result in an exponentially larger number of possible conversational paths as user choice need to be part of flow. Therefore, the question becomes: how do we design and document conversational interaction?

::: thumbnail
![wireflow](/images/blog/requirement-for-cui/wireflow.png)
:::

## Service driven design

Conversational driven design focuses on analyzing the conversation history, which can be useful in discovering new services or products that your user might be interested in. However, a chatbot can only offer services that a business provides. Focusing on what users want but the business does not offer can be wasteful. Additionally, subtle semantic distinctions between utterances can lead to unnecessary confusion if they are not grounded in the available services. For instance, phrases such as "Are you guys open now?", "What are your hours on Tuesday?", and "When do you guys close?" may appear to have different intents, but they could all be served by the same query to the same knowledge base. 

::: thumbnail
![conversationflow](/images/blog/requirement-for-cui/conversationflow.png)
:::

Making even simple service available requires a large team, including an architect, developers, database management, and devops. As a result, there are typically significantly fewer service APIs compared to the number of possible intents. Additionally, the goal of a service chatbot is to quickly get users the service they want. Therefore, we can use the service as the basic unit for chatbot requirement analysis and simply consider the chatbot as a set of services. This simplification does not limit a chatbot's capability. Users can still engage in conversations for more than one service, but the chatbot can keep only one of them active at a time by focusing on completing the current active service before switching to another. This approach allows us to design one service at a time.

## Structured Conversation
To deliver what users need or guide them to a different choice when their choice is not serviceable, it is essential for chatbots to acquire users' preferences on various service slots that define how they want the service to be customized. For example, to sell the correct movie tickets, the chatbot needs information about the movie title, showtime, format, and number of tickets. It is common for users to not provide all the necessary information at once, so chatbots must conduct effective conversations with users to gather this information. To provide a consistent and predictable experience for all users and make it easy to program, chatbots should conduct structured conversations.

Conversations can be inspected at two layers: the interaction logic layer and the language layer. By "structured," we mean that the conversations are deterministic at the interaction logic layer. This does not mean that the chatbot should always say the exact same message, but rather that it can produce diverse text responses that convey the same meaning.

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