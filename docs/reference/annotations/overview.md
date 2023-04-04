# Overview
The main responsibility of a conversational user interface is to create an instance of a function type so that the chatbot can invoke the necessary functionality for the user. For composite types, such as function types with multiple slots (also known as properties or attributes, potentially nested), these slots should be filled in accordance with the business logic. For example, since not every movie has an IMAX version, the chatbot should only ask whether the user wants to see the IMAX version if it is available for the chosen movie. Similarly, if Star Wars is only showing at 8:00pm, the user should not be able to choose the 6:00pm showing for that movie.

In a conversational system, the information to request from the user, how the chatbot responds to the user's input, and what options are presented to the user are all controlled by the interaction logic. It is important that the interaction logic is designed to follow the business logic, in order to ensure that the chatbot operates in a way that is consistent with the business goals and objectives. Building the interaction logic requires a deep understanding of the business requirements and constraints. Since every business is different, this is a job best left to experienced business application development teams.

## A type-based approach
If the interaction logic supports the instantiation of arbitrary types from composite types, containers, polymorphism, and primitive types, it will necessarily become complicated. So how can we provide a simple, builder-friendly, yet powerful conceptual model for the builder to define interaction logic?

At conceptual level, OpenCUI provides a declarative approach to define how to create instance for a given type, by adding dialog annotation to the type. For composite type such as skill and frame, we need to also add dialog annotation for each interactable slot. By attach the dialog annotations onto the type, OpenCUI runtime can automatically figure out what to do based on the user input and current dialog state.

## Five stages of slot filling
The general behavior of slot filling, which involves creating an instance for a slot, is controlled by the [Fill Strategy](../reference/annotations/fillstrategy.md). This strategy determines how the slot should be filled, including whether users can be prompted for their choice. Currently, we support the following fill strategies: always, conditional, recover only, external, and gated.

When a slot is configured to be filled by user interaction, the OpenCUI framework uses a five-stage slot filling process designed to help users effortlessly converge on a servable request. This filling process can be easily configured via corresponding annotations based on business logic. The stages are as follows:
1. [Initialization](../reference/annotations/init.md): Tries to fill the slots based on business logic first.
2. [Prompt](../reference/glossary.md#prompt): Allows you to provide the template for the SlotRequest dialog act to request user choice for the given slot.
3. [Value Recommendation](../reference/annotations/valuerec.md): Provides a list of candidates per business production system for users to choose from. This can avoid wasted user effort in filling slots with an unservable choice.
4. [Value Check](../reference/annotations/valuecheck.md): Examines the proposed value to determine if it is servable based on business rules.
5. [Confirmation](../reference/annotations/confirmation.md): Gives users a second chance to verify the proposed value.

By systematically deciding on how to configure these five annotations, builders can end up with an effective CUI interaction logic for delivering the services. 

## Advanced annotations
Slot-level annotations are designed for common use cases, prioritizing convenience over flexibility. The underlying mechanism of schema-grounded conversational user interfaces, including the five stages of slot filling, is modeled based on dynamic [statecharts](https://statecharts.dev/), also known as composite state machines. Therefore, if there are CUI behaviors that cannot be defined by these high-level annotations, one can always refer to [state transitions](../reference/annotations/transition.md), which offer greater control at a lower level. Builders can directly control how the bot should react given the current state, user input, and any arbitrary conditions defined on them.

## Two layers
Dialog annotations are defined at two levels: interaction and language. Many annotations have an interaction-level or a language-independent interpretation, such as Fill Strategy, which determine how the bot should fill the given slot. In addition, dialog annotations may include language-related components such as templates and expression exemplars. Templates provide examples of how a dialog act can be expressed in natural language, while expression exemplars exemplify how user utterances in natural language should be converted into a structured representation of meaning.