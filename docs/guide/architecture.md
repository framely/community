# Runtime Under the Hood

Framely platform is the place where builder define, share conversational components, service providers and then package these components into enjoyable conversational services. The declaration on the platform is then generated into Kotlin code where it can be compiled and deployed along with Framely runtime to the environment of your choices. 

## Architecture
The conversational interaction specified by builder declaratively in terms of the primitives offered by runtime, the execution of these interactions by the Framely runtime can be depicted as follows:

::: thumbnail
![runtime architecture](/images/architecture.png)
:::

There are three main components that worth some explanations.

### Dialog Understanding (DU)
CUI needs to understand what the users want, regardless if it is service related, i.e., "I want two tickets for star wars at 7:00", or it is some dialogue act, i.e. "That is alright. But thanks." By understanding, we really mean that we can normalize equivalent expressions into predefined semantic representation, instance of intents. 

DU can be modeled as a function (utterance, conversation history) -> (frame), where frame is described in form of FrameEvent. The example for such normalized frame event is "buy(amount=2, movie=star wars, time=7:00pm)". In practice, conversation history is represented by stack of frames (sometime known as dialog state), in form of Dialog Expectation. Dialog expectation describe what is current active semantic frame, as well as which slot bot expects user to fill. 

At implementation level, DU is decomposed into context independent level NLU module and context dependent DU module. DU module use the dialog expectation to The entire DU module is driven by Dialog Manager (DM). The behavior of the DU is controlled by the expression exemplars, where builder specify how intent or frame can be expressed in natural language.

### Dialog Management
Dialog manager executes the interaction logic, which creates structure response based on the input frame event. Interaction logic is defined by builder based on the business goal and CUI principles. The interaction logic defined on the Framely framework is essentially just a dynamic statechart. At each turn, the chatbot needs to take normalized user input in form of FrameEvent, based on current transition rules, emit a response and update the state at the same time. State chart is essentially a composite state machine, thus it is a natural fit for this reactive logic. We added support for service functions which allow dialog manager to naturally interact with the business logic/data via APIs or database connections.

On Framely, every intent is grounded to some actions, either service related or system related so bot can fulfill these intents. We make the following key independence assumption related to fulfillment here: P(action|intent, utterance) = P(action|intent)P(intent|utterance), meaning the action is independent of utterance given the intent. This is the basic assumption of schema grounded conversational user interface.

### Response Generation
Given input event, Framely dialog manager will compute the bot dialog act based on interaction logic. Bot dialog act is the structure representation of what bot need to communicate to user, for example, requesting a slot value from user can be encoded by dialog action: SlotRequest(slotName: String). Bot dialog act can be converted into utterance in natural text, a process called verbalization and response generation conducts such conversion on a sequence of dialog acts. 

There are couple reasons that schema grounded CUI does not produce natural text output directly but produce the bot dialog act as an intermediate meaning representation form. The main reason to adopt the separation of concerns principle here is to reduce the cost, particular for supporting multiple languages, as different language can share the same interaction logic. 

Builder controls this verbalization process by defining a template for a given dialog act, which can be defined to not only deliver the content but also, promotes users collaboration and satisfaction. And best of all, this scripting can be handled by a conversational user experience team. As always, the template is defined under context so that same dialog act can be verbalized into different utterance in different context. Take a SlotRequest("destination") as an example, the template for that in English can be "What is your \<slotName\>?", or "where do you want to go?". Of course, the second version is more restricted to only that slot, while the first template can be applied to more cases.




