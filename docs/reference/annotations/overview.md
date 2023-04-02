# Overview

Businesses develop chatbots to promote their services through conversational user interfaces (CUIs). Therefore, it is the responsibility of the CUI to create an object of some function type that the chatbot can invoke. Naturally, the CUI must also be capable of recursively creating objects for types that are indirectly required, through conversations.

OpenCUI enables you to declaratively describe how an object of a given type can be created conversationally by attaching dialog annotations to the type and its member slots. These dialog annotations define how the chatbot should guide the conversation to deliver services to users. Dialog annotations are viewed in two levels: interaction level and language level.


### Interaction level
In OpenCUI, the user's utterance is first converted into a language-independent representation of meaning in the form of an event. The chatbot then uses this event and the current dialog state to make a decision on how to steer the conversation towards delivering valuable services to the user. Many of the annotations have an interaction level or a language-independent interpretation. For example, the Fill Strategy is used to decide whether the bot should prompt the user for a value for a given slot; Initialization is used to acquire an initial value; Value Recommendation means the chatbot will give the user a list of candidates that the business can fulfill; Value Check ensures that the value the user provides is good per business logic, and Confirmation gives the user another chance to decide on their choice.

To give businesses full control over the conversation on the bot side (although users can still say whatever they want on their turn), it can be thought of as the bot following a nested composite state machine. Each state machine, which is fully defined by annotations at the interaction level, is used to fill one entity slot. Frame slot are filled with composite state machine.

### Language level
Dialog annotations may contain two kinds of language-related components: templates and expression exemplars. Templates demonstrate how a dialog act can be verbalized in natural language, while expression exemplars exemplify how user utterances in natural language should be converted into a structured representation of meaning.