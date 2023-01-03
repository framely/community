---
article: true
date: 2022-12-27

image:
    - blog/banner/document_requirement.png
description:
    - We devised an effective way to communicate CUI requirement
author: Sean Wu, Bird Zeng
---

# Document Requirement for CUI
![Banner](/images/blog/banner/document_requirement.png)

Service chatbot is an essential approach to improve the customer experience. With recent advance in large language model, service chatbots are moving from only answering questions to providing transactional services as well. They are now expected to handle requests like reserving a table or ordering food, or even more complex service like health care.

The improved customer experience and lowered operation cost does not come free, complexity of building these service chatbot is exploded. Gone are days when one can build a chatbot by simply maintaining a set of frequently asked questions. Service chatbot, as conversational user interface to the full-fledged backend service APIs, requires rigorous building process to reduce the risk associated with such complexity. To reduce the cost and risk, many questions need to be answered before we write a single line of code: what exactly we will build, and who can help with what, how much will cost us if we include this feature, when can we have it, etc. The answers to these questions need involving many people, many rounds of discussion. Of course, we need a way to effectively communicate requirement and design so make these discussion effective.    

::: thumbnail
![requirement](/images/blog/requirement-for-cui/requirement.png)
*The ugly fact about requirements engineering - from www.projectcartoon.com*
:::

Wireflow, essentially a flow diagram connecting wireframe, is commonly used to document requirement for app with graphical user interface. But wireflow can not be used for communicating the requirements for conversational user interface, for obvious reasons. First, wireframe is only helpful for describing the graphical rendering of single page. Second, users understand that they can only interact with your app in the ways you implement on each page. This is not the case for service chatbot, users can and will say any legit things at any given turn, which can result in the exponentially many potential conversation flows for even modest business use case. Detailing all possible flows upfront is simply not feasible for most realistic use cases. 

::: thumbnail
![wireflow](/images/blog/requirement-for-cui/wireflow.png)
:::

Without a systematic way of documenting CUI requirement, chatbot project can easily end up with subpar conversational experiences along with time and cost budge overrun. This can easily defeat the original purpose of service chatbots. This is why we have not seen wide spreading of usable service chatbots, as many businesses still hesitated in investing in building it. For a method to document chatbot requirement to be considered good, it should require little learning for all parties involved so every stakeholder can pitch in easily. Furthermore, it should describe the requirement precisely, and easy to change. So how do we document service chatbot requirement? Let's first try to figure out how to conduct requirement analysis for service chatbot.


## Service Driven Requirement Analysis
For informational chatbot, the cost of fulfilling an intent is low, just drafting an answer in text, you are done. So intent driven analysis is very popular. Here, intent is the semantic representation of user utterance, it encodes the purpose of user engaging with chatbot. Intent driven analysis typically involves going through conversation history, and try to figure out new intents that chatbot can serve.

Human language are extremely powerful. Without grounded to service, the distinction between utterances can be very subtle, and inviting unnecessary debate. For example, *"Are you guys open now?"*, *"What is your hours on Tuesday?"*, *"When do you guy close?"*, and so on, can be argued to be different intents, but they can all be served the same query to the same knowledge base. While documenting user intents can be a useful step in requirement exploration, there is very little value in documenting user intent that we can not fulfill in production.  

::: thumbnail
![conversationflow](/images/blog/requirement-for-cui/conversationflow.png)
:::

The economics for fulfilling transactional intent is, however, changed completely. You need a large team including architect, developer, database management and also devops just to get started. So there will be much less service APIs comparing to number of possible intents. Also, the goal of service chatbot is to get users the service they want as quickly as possible. So naturally, we can use service as basic unit for chatbot requirement analysis, and simply consider chatbot as a set of services. This simplification is not a limitation on the chatbot capability. User can still keep conversation open for more than one services, but chatbot will keep only one of them active: meaning chatbot will try to complete the current active service first before switch conversation to other services. This allows us to focus on one service at a time. 

## Structured Conversation
Services can be customized along many dimensions, so acquiring users' preferences on these dimensions is essential for delivering what users need. For example, information about movie title, showtime, format, and number of tickets are required to sell to user the right movie tickets. It is common that user does not provide the complete information in one shot, so chatbot need to conduct effective conversation with user to get these information. To provide a consistent and predictable experience for all users, and to make it easy to program, chatbot should conduct structured conversations, as opposed to irrational ones. 

By structured, we first mean that conversation is factored into two layers: logic layer and language layer: chatbot first decide what it needs to say in logic layer, then render that semantic into the language that users understand. At logical level, conversations is deterministic. Here we do not mean that chatbot should say the same exact message, that is boring. Chatbot can and should produce diverse text responses as long as these responses convey the same meaning. Deterministic conversations can result in consistency, which is another advantage of deploying chatbots, in addition to their 24x7 availability. 

| Schema | Interaction Logic | Language Perception | 
| :---    | :---        |:---            |                     
| movie title | <ul><li> Required. </li><li> Provide options.</li><li> Need verified.</li></ul> | <ul><li> Which movie do you want to see? </li><li> Which film are you interested in watching? </li><li> What movie do you have in mind? </li><li> Which film are you considering going to see? </li><li> ... </li></ul> | 
| showtime | <ul><li> Required. </li><li> Provide options.</li><li> Need verified.</li></ul> | <ul><li> Which showtime would you like? </li><li> At what time would you like to see the show? </li><li> What time would you like to go to the movie? </li><li> ... </li></ul> | 
| format | ... | ... | 
| number of tickets | ... | ... | 


Once you figure out the best strategy to serve your users, you can formulate that best practice into a set of predetermined set of rules or guidelines for chatbot to follow. By structured, we also mean that these rules are composite in nature,  so you can use these rules to decompose even the most complex use cases into simpler ones. The composition nature of structured conversations make it easy to reuse the same conversational behavior, typically in form of CUI components. Compared to building conversational user interface from scratch, relying on existing and high quality components allows you to build the good conversational experience cheaper. 

## Contextual Snippet
Historically, slot is used to capture users' choices on the dimensions that service can be customized. So given a service, the goal of the conversation is simply to fill its slots so that chatbot can deliver what user wants. A deterministic strategy for doing this can simply be going over slots in the predefined order, and for each slot, going through the stages such as initialization, prompt, and value recommendation, value check and confirmation. Each of these stages can interact with production system through service APIs, and engaging in systematic conversation with user depending on both API return and user input, based on your declaration. For example, upon getting user's initial choice for movie title, chatbot can check with the production system to see if the there are still available showtime/seat, and move to next slot if there is, or go back to prompt user for movie title. 

The conversational behavior of the chatbot for that service can then be described by a set of contextual snippets along with the schema representation of that service. The schema representation of a service is simply an label for the service, and all its required slots, including their type, which defines what value can be used to fill such slot. A contextual snippet on that service consists of label, description, precondition, annotated dialog snippet and end state. The precondition is defined by the dialog states in form of slot/value pairs, along with service APIs result, and annotated dialog snippets show case how chatbot should behave in such entering condition, and finally end states defines dialog state chatbot ends up with after the sample conversation snippet is done.  

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