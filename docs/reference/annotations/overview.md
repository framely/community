# Overview
The main responsibility of a conversational user interface is to create an instance of a function type so that the chatbot can invoke the necessary functionality for the user. For composite types, such as function types with multiple slots (also known as properties or attributes, potentially nested), these slots should be filled in accordance with the business logic. For example, since not every movie has an IMAX version, the chatbot should only ask whether the user wants to see the IMAX version if it is available for the chosen movie. Similarly, if Star Wars is only showing at 8:00pm, the user should not be able to choose the 6:00pm showing for that movie.

In a conversational system, the information to request from the user, how the chatbot responds to the user's input, and what options are presented to the user are all controlled by the interaction logic. It is important that the interaction logic is designed to follow the business logic, in order to ensure that the chatbot operates in a way that is consistent with the business goals and objectives. Building the interaction logic requires a deep understanding of the business requirements and constraints. Since every business is different, this is a job best left to experienced business application development teams.

## A declarative approach
A interaction logic supports the arbitrary instantiation of the object from a type system that allows for user-defined types, containers, polymorphism, and primitive types will necessarily become complicated. So how do we provide a simple, builder friendly yet powerful conceptual model for builder to define interaction logic?

At conceptual level, OpenCUI provides a declarative approach to define how to create instance for a given type, by adding dialog annotation to the type. For composite type such as skill and frame, we need to also add dialog annotation for each interactable slot. By define the interaction logic on the type, OpenCUI runtime can automatically figure out what to do based on the user input and current dialog state.

## Five phases of slot filling
The general behavior of slot filling, or creating an instance for this slot, is controlled by the [Fill Strategy](../reference/annotations/fillstrategy.md), which decides how this slot should be filled including whether we can prompt users for their choice on this slot. Currently, we support the following fill strategy: always, conditional, recover only and external and gated. 

When slot is configured to be filled by user interaction, OpenCUI framework uses a five stage slot filling process that is designed to help user converge on a servable service request as effortless as possible. This filling process can be easily configured via corresponding annotations based on business logic:
1. [Initialization](../reference/annotations/init.md) try to fill the slots based on business logic first.
2. [Prompt](../reference/glossary.md#prompt) allow you to provide the template for SlotRequest dialog act, needed to request user preference for the given slot.
3. [Value Recommendation](../reference/annotations/valuerec.md) provides a list of filling candidates per business data and logic for user to choose from. This can avoid waste user effort for filling slot with an unservable value. 
4. [Value Check](../reference/annotations/valuecheck.md) examines proposed value is servable based on business rules.
5. [Confirmation](../reference/annotations/confirmation.md) give user a second chance to verify the proposed value.

By simply making decision on whether to enable and how to configure these five components, OpenCUI can guide builder come up with a reasonable CUI interaction logic systematically. This way, builder can focus on unique and cost-effective services that brings actual value to user and make their life better.   

It should be clear that message bot send to user in a single turn can contain message generated from more than one of these stages. In the example shown here,
![Value Rec related annotation](/images/annotation/valuerec/valuerec_related.png)
we have message generated from confirmation from previous slot, value check failure for the current slot possibly with user existing slot mention, prompt and value recommendation in attempt to fill the slot again.

## Advanced annotations
Slot level annotations is designed for the common use cases, so it is designed for convenience instead of flexibility. The underlying mechanism of schema grounded conversational user interface, including the 5 stage of slot filling, is modeled based on dynamic [Startchart](https://statecharts.dev/), also known as composite state machines. So, if there are CUI behavior that can not be defined by these high level annotations, one can always to look at [State transition](../reference/annotations/transition.md), which offer a greater deal of control at low level: builder can directly control how bot should react given the state we are in, user input and some arbitrary condition defined on them. 


Businesses develop chatbots to promote their services through conversational user interfaces (CUIs). Therefore, it is the responsibility of the CUI to create an object of some function type that the chatbot can invoke. Naturally, the CUI must also be capable of recursively creating objects for types that are indirectly required, through conversations.

OpenCUI enables you to declaratively describe how an object of a given type can be created conversationally by attaching dialog annotations to the type and its member slots. These dialog annotations define how the chatbot should guide the conversation to deliver services to users. Dialog annotations are viewed in two levels: interaction level and language level.


### Interaction level
In OpenCUI, the user's utterance is first converted into a language-independent representation of meaning in the form of an event. The chatbot then uses this event and the current dialog state to make a decision on how to steer the conversation towards delivering valuable services to the user. Many of the annotations have an interaction level or a language-independent interpretation. For example, the Fill Strategy is used to decide whether the bot should prompt the user for a value for a given slot; Initialization is used to acquire an initial value; Value Recommendation means the chatbot will give the user a list of candidates that the business can fulfill; Value Check ensures that the value the user provides is good per business logic, and Confirmation gives the user another chance to decide on their choice.

To give businesses full control over the conversation on the bot side (although users can still say whatever they want on their turn), it can be thought of as the bot following a nested composite state machine. Each state machine, which is fully defined by annotations at the interaction level, is used to fill one entity slot. Frame slot are filled with composite state machine.

### Language level
Dialog annotations may contain two kinds of language-related components: templates and expression exemplars. Templates demonstrate how a dialog act can be verbalized in natural language, while expression exemplars exemplify how user utterances in natural language should be converted into a structured representation of meaning.