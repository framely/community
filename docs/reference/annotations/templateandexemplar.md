# Templates and exemplars
Instead of exposing builders to underlying machine learning concepts such as training, testing, and the constantly evolving range of machine learning models, OpenCUI uses exemplars to control dialog understanding and templates to control text generation. These language-level annotations are scattered across different types, slots, and annotations for various reasons, thus helping to shape understanding and text generation in a context-dependent manner. Obviously, all language level annotations are language dependent, thus need to be configured once for each language you want to support.

## Exemplars
Recent development in large language models has revolutionized natural language understand field. Their remarkable zero-shot capabilities allow one to conversationally expose new functionalities quickly, without going through the lengthy labeling process using old style machine learning methods. But these models are never perfect, so we need to provide exemplars to show dialog understanding models how, under a given context, user utterance should be mapped to structured event that can be used to complete the instance creation.

### Expression for entity instance
Entities, or primitive types, need to be recognized from user utterance, thus we need to define recognizer for this. For user defined entity, we require that you select list based recognizer. For this recognizer to work, you need to add instances and their labels under the Interaction view, and then under language view, you need to enumerate commonly used expressions for each instance in that language. For example, for entity "new york city", we want to add "new york city", "big apple" and "nyc" so that when user mention these phrase, dialog understanding module can recognize them. 

Note, in the same entity type, we should not attach the same expression to two different instances. But it is possible that the same expression can be used in more than one entity types. It is dialog understanding's responsibility to figure out exactly which entity type user means, based on the context. 


### Exemplars for every thing else
If one think expressions are for extractive understanding, then exemplars are for abstractive understanding. Abstractive understanding, we assume it is not possible to enumerate all possible utterances that can be interpreted as the given meaning, so we settle with only provide some examples. 

## Template
System dialog act refers to a type of dialogue act performed by a computer system or software application during a conversation with a user. System dialog acts are used to manage the conversation flow and provide information or perform actions based on user input. Examples of system dialog acts include greeting the user, asking for clarification, providing a list of options to choose from, confirming or denying user input, and ending the conversation. These dialog acts are often pre-defined and programmed into the system to help the system understand and respond appropriately to user input. 

On OpenCUI, every message that bot sends to users, proactive or reactive, are all based on one of system dialog acts. But builder never configure system dialog act directly, instead OpenCUI provide customization of these dialog action based on the slots, and annotations. 

### Prompt
Prompt is a customization of SlotRequest, it is defined on a slot. Prompt allow builder to supply one or more templates that will be used by chatbot to request the missing value from user. 

