---
title: Language dependent
---

# Language dependent
The language independent part of dynamic behavior of the frame/slot filling is fully defined by above mentioned annotation. The language dependent part of these component, or the dialog understanding and text generation part of these component are handled by expression and templates.

### Expression (exemplar)
All semantics in Framely can be referenced in multiple languages, and expression is the only way for builder to influence how user utterance is converted into semantic frames. By attaching expression exemplars to each semantic under some context, builder indicate user utterance that are similar to expression exemplars under the same context should be converted to the corresponding frame.

These expression exemplars are used by NLU model to hotfix the understanding issues. Notice expression exemplar are normally only useful under the given context, so it is easy for Framely to convert the same utterance into different frame representation under different context. Builder can provide expression exemplar for any semantics: do-not-care, negation, positive and negative under yes-no questions, for example,  There are different kinds of expression:

#### Type expression(currently knowns as alias on platform)
The example of how entity, frame types are mentioned in different languages.
#### Value expression: (currently known as expression on platform)
The example of how entity and frame instance are mentioned in different languages.
#### Partial expression(experimental)
Exemplar that specify how to find value for given slot from the conversation history, in order to full understand user utterance when there are pronoun in there, i.e. "what is the weather over there" implies user want to to know weather of the $city$?
#### Pronoun Expression(experimental)
For each slot, entity, builder can specify which pronoun is used to refer these, so that builder do not need to supply partial expression.

### Dialog context
Dialog understanding is always conducted under context, and context is simply the stack of frame that is currently active. So if we are interacting about frame A, and drill into one of its slot of type(frame) B, then the context is [A, B], with B on the top of the stack.

#### Context independent expression
Expression defined in the expression tab for intent are context independent, and they can be triggered in any context, or DU will convert the user utterances similar to the these expression exemplar into frame and send to dialog management for further processing.

#### Context dependent expression
All other expression defined on the Framely platform are considered context dependent, where its expected context is determined by where the expression exemplar is defined.  DU will convert expressions similar to these exemplar into corresponding frames only when the current dialog context matches the context where the exemplar is defined. For example, positive expression exemplar under confirmation on the a slot will only be used to convert similar user utterance into corresponding frame when chatbot start the confirmation on that slot.

### Text generation
To make building multi-language chatbot, builder can specify text generation templates to is create desired sentence for user to make it easy for user get to their goal quickly and effortlessly.

#### Prompt
Use these templates to create question to guide user towards their goal. Examples include: "where do you want to go?", and "Are you sure you want to it to be extremely spicy?"

#### Response
The services that user want are generally accessed via some form APIs, and result from the APIs will be some structured information. Response are the template to turn these structured result into  into natural text.