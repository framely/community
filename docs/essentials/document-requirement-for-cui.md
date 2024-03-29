# Document CUI design
While service chatbots can improve customer experience, their development can be complex and costly. To minimize these costs and risks, it's important to answer many questions before writing any code, such as what exactly needs to be built, who can provide assistance, how much specific features will cost, and when they will be available. Holding several rounds of discussions with all stakeholders is necessary to answer these questions. Effective communication of requirements and design is crucial for making these discussions productive.

Flow diagrams, such as wireflows, are a popular way of documenting requirements and designs for graphical user interaction. These diagrams document both user choices and desired system responses in a series of turns, with system responses defined based on the entire interaction flow up to that point. A flow-based documentation can precisely describe the design or requirements and is easily modifiable since users can only interact with the GUI app in the ways that have been designed for them. However, conversational interaction can result in an exponentially larger number of possible conversational flows, which raises the question of whether a flow-based approach is still suitable for designing and documenting conversational interaction. If not, what is?

![wireflow](/images/blog/requirement-for-cui/wireflow.png)

## Service driven design
Conversational driven design involves analyzing the conversation history. However, subtle semantic differences between utterances can lead to unnecessary deliberation if they are not grounded to available services. For example, phrases like "Are you guys open now?", "What are your hours on Tuesday?", and "When do you guys close?" may appear to have different intents, but they could all be served by invoking the same service. Documenting user intents can be useful in requirement exploration, but it has little production value if user intent can be fulfilled by one of the existing services.

A better approach is to design a conversational user interface based on the services that a business wants to expose. This is because creating even a simple service requires a large team of experts, including architects, developers, database managers, and devops personnel. Compared to user intentions, service APIs generally have less redundancy. By focusing on how user intention can be grounded to available services, it becomes easier to determine whether an intention is distinct and can be served by one API or not. Additionally, it is possible to identify whether a particular conversation flow requires special attention or not, as the service to be invoked does not depend on the order in which the user specifies their preferences.

## Slot filling
In order to provide a service to a user, a chatbot and the user must first agree on the service configuration, which includes the service name and slot values required by that service. For instance, to sell movie tickets, the chatbot needs to confirm with the user that they want to purchase a movie ticket and then gather their preferences regarding the movie title, showtime, format, and number of tickets. As users often do not provide all the necessary information at once, chatbots must engage in effective conversations to gather these missing information.

| Schema | Interaction Logic | Language Perception | 
| :---    | :---        |:---            |                     
| movie title | <ul><li> Required. </li><li> Provide options.</li><li> Need verified.</li></ul> | <ul><li> Which movie do you want to see? </li><li> Which film are you interested in watching? </li><li> What movie do you have in mind? </li><li> Which film are you considering going to see? </li><li> ... </li></ul> | 
| showtime | <ul><li> Required. </li><li> Provide options.</li><li> Need verified.</li></ul> | <ul><li> Which showtime would you like? </li><li> At what time would you like to see the show? </li><li> What time would you like to go to the movie? </li><li> ... </li></ul> | 
| format | ... | ... | 
| number of tickets | ... | ... |

A good strategy for filling the slots of a service so that the chatbot can deliver what the user wants is to proceed deterministically by going through the slots in a predefined order. For each slot, the chatbot can follow a set of stages, including initialization, prompting, value recommendation, value check, and confirmation. These stages can interact with the production system through service APIs, engaging in a systematic conversation with the user based on both API return values and user input. For example, after receiving a user's initial choice for a movie title, the chatbot can check with the production system to see if there are still available showtimes or seats. Based on this information, the chatbot can then either move on to the next slot or prompt the user for a new movie title.

## Contextual snippet
The conversational behavior of the chatbot for a given service can be described using a set of contextual snippets, along with the schema representation of that service. The schema representation of a service is simply a label for the service and all its required slots, along with their types that define what value can be used to fill each slot. A contextual snippet for the service consists of a label, description, precondition, annotated dialog snippet, and an end state. The preconditions are defined by the dialog states in the form of slot/value pairs, along with the service API's result, and annotated dialog snippets showcase how the chatbot should behave under such conditions. The end state defines the dialog state the chatbot ends up with after the sample conversation snippet is completed.

Let's use movie ticket selling service as an example. The schema representation of the service can be sketched as follows:

1. `movieTitle` **MovieTitle** Required. The title of the movie.
2. `showtime` **LocalTime** Required. The time and date of the movie showing.
3. `format` **MovieFormat** Required. The format of the movie, e.g. IMAX 3D, Digital 3D, Standard.
4. `numberOfTicket` **Integer** Required. The number of tickets being purchased.

The service's conversational behavior is described in the following contextual snippets:

### Contextual snippet 1: Happy path

This snippet shows how the chatbot can successfully complete a transaction for a user who wants to buy movie tickets. The chatbot asks for the user's preferred showtime and number of tickets, and then confirms the purchase with the user before processing the payment.

1. Description: Defines what happens if everything goes well.
2. Precondition: N/A
3. Annotated conversation
   ```json
   User: "Two tickets for the Star Wars, please."
   Chatbot: "Great choice! Do you want watch IMAX for that?"
   User: "Yes, please."
   Chatbot: "There are two available showtimes: 6:00pm and 10:00pm, which one do you like?"
   User: "6:00pm please."
   Chatbot: "That is two tickets for 6:00pm IMAX Star Wars, total $24. Would you like to proceed with the purchase?"
   User: "Yes."
   ```
4. End state: Slots `movieTitle`, `showtime`, `format` and `numberOfTicket` are filled.
   ```json
   {
   "movieTitle": "Star Wars",
   "showtime": "18:00",
   "format": "IMAX",
   "numberOfTicket": 2
   }
   ```

### Contextual snippet 2: Invalid input

This snippet shows how the chatbot can handle invalid input successfully complete service. In this case, when there are no IMAX tickets available, the chatbot offers the user tickets in standard format instead.

1. Description: When the chatbot receives a value for a slot that is not serviceable, it will provide another value if it can or ask the user to provide another value. Using the `format` as an example.
2. Precondition: Slots `movieTitle` is filled.
3. Annotated conversation
   ```json
   Chatbot: "IMAX are sold out today. There are two available showtimes in standard format: 6:00pm and 10:00pm, which one do you like?"
   User: "6:00pm please."
   ```
4. End state: Slots `movieTitle`, `showtime` and `format` are filled.

Contextual snippets allow you to describe the requirements for a conversational user interface in a piecemeal fashion. You can start with just the happy path and gradually add requirements for rarer and rarer corner cases. The happy path requirements do not need to be changed with these new corner cases. The stability provided by this way of documenting requirements allows us to build better and better conversational experiences.

## Parting words
Good requirement and design documentation makes it possible for stakeholders to discuss what should be built without writing a single line of code. Assuming that the chatbot should work on one service at a time and deterministically follow a predefined strategy to fill the slots, we introduce contextual snippets as a method to document requirements for the conversational user interface (CUI) frontend. This method is easy to pick up, can precisely document the expected conversational behavior for delivering a service, and is useful regardless of which platform is used to build the conversational user interface. While there is no explicit global view of all possible interactions, this localized requirement documentation method allows for incrementally building the conversational experience. We hope that this systematic way of documenting CUI requirements can reduce the risk and associated cost in building your next chatbot and make your customers happier.