
# Glossary
## Introduction
Framely is a component based declarative platform and repository for building conversational user interface for cooperative users to access your services. It is a low code platform for building personalized service, include chatbot and corresponding backend. The chatbot and backend defined on the platform will be first code-generated into Kotlin source code, which can be compiled and executed on top of Framely runtime anywhere.
## Background knowledge
### Abbreviation
#### CUI
Conversational user interface
#### CUX
Conversational user experience
#### GUI
Graphical user interface
#### SQL
Structure query language
#### RDBMS
Relational database management system
#### API
Application programming interface, typically in restful.

### Imperative
Builders describe to computer how things are done

### Declarative
Builders describe to computer what are needed and computer figure out how to do it.


### Syntax
The arrangement rules of words and phrases to create well-formed sentences in a language.

### Semantics
The meaning of a word, phrase, sentence, or text without context. In Framely, the semantics is defined semantic frames, or just frames.

### Pragmatics
Study of how context contributes to meaning, or meaning under context. We use the frame to express meaning under context as well.

### Cooperative principle
This assume users are engaged in the conversation with bot for a common goal: user want to access some services that bot want to provide, thus it is user's interest to get what they want in lowest effort possible.

### Interaction logic
Defines how interaction should be carried out based on users input event.

### Application logic
Also known as business logic or more commonly service, defines how services should be delivered based on the user requirement (aggregated user input). It is very common that interaction logic reflects underlying application logic.

### Frontend
User interacting application are commonly partitioned into frontend and backend. Where frontend manages the user interaction, and backend models data and application logic. And backend and frontend communicate via predefined-defined APIs. Frontend includes presentation layer and interaction logic layer, or frontend can also be partitioned into schema level and language level.

### Backend
Framely assume backend hosts all the data and application logic for different frontends, chatbot is one such frontend. Backend are typically just implementation of restful APIs on top of database. Popular open source databases includes mysql and postgresql. Backend can be thought provider for services (or implemented the function declared in the services)

### Chatbot
An end user facing application or CUI frontend, user can access information and service through conversations in text or voice instead of a graphical user interface. All user facing application can be generally built in three layers: language, interaction and schema.

## Basic concept

### Schema layer
Interface to service, or data structure needed to invoke the service as both input and output, are defined at schema level. Application logic is also defined in this layer, typically as the backend providers, some time simply via SQL on Framely, some time externally via restful APIs.

### Interaction layer
Defines interaction logic, or how input parameter needed by service should be collected from user via conversational interactions, at an language independent fashion. The decision in this lever include whether to prompt user for given slot, whether to give recommendation when prompt, and what to do if input validation is failed, for example.

### Language layer
(presentation) Includes language related aspects like expression for dialog understanding and template for text generation.


### Component
The key design goal for Framely is to support compose the chatbot out of the reusable component so that builder does not always need to start from scratch. Notice components can be used to build bigger and bigger component. And some component contains service, which defines interface to a set of functions.

### Service
The interface for collection of functions that chatbot/frontend can use to access business logic.
### Function
The smallest unit of functionality that backend can provide, which returns result based on input parameters. Functions are used to providing recommendations during conversation, or access service after conversation interaction. Function signature consists of name and types of the input parameters, as well as type of return.
### Native function
Implementation for these functions are defined in Kotlin, some time implicitly in runtime.

### Provider
Provider provide access to implementation for the services. Backend are simply a collection of providers.
#### Postgrest provider
In addition to access, Postgrest provider are used to define both application logic  (via SQL in form of stored procedure) and database schema needed by such logic declaratively on Framely. This allow builder to define reusable full stack components including both UI and backend (both data and business logic), with the dialog annotation, storage annotation as well as backoffice annotation.   
#### Generic restful provider
Service can also be accessed via restful API, with restful provider one can describe the mapping of the collected input parameter to actual Json format needed by endpoint.

### Input
#### Code expression Input
Code expressions are the Kotlin expression or encoding of Kotlin expression that can be evaluated dynamically by runtime. Code expression can be used independently or embedded in templates. Since the declarative configuration of the chatbot on the platform are compiled into Kotlin source code, so it is possible to use arbitrary Kotlin code expression in some predefined places like condition definition. As more detailed example, in value recommendation, we need to use code expression to indicate which function should be called, with what parameters, and how different function is composed to provided the desired list of instances for user to choose from.
#### SQL function body input
On Postgrest provider, code expression with auto complete set for input parameter name, slot name, and then sql keywords.
#### Json input
There are couple places where Json input box are needed, for example, the source of value recommendation can be a Json representation of partially filled intent.

### Template
In both prompt and response, we need to specify what chatbot say to user. This is accomplished by template. Template is just string with code expression embedded in it. One way of encoding the embedded code expression is to surround them with $$, the code expression inside $$ will be evaluated to string and then concatenated with rest of static content to form the final message for user. Restful function body are template.

## Conceptual Model

### Runtime
The core of chatbot is to build common understanding of what user want through conversation, connect user to the right service and generate the natural text for channel to rendering to user.  These core functionalities are provided by Framely runtime as APIs, so each chatbot can focus on what information to collect and leave the actually information collect to runtime. Runtime also contains session management and dispatcher.

### Dialog manager(DM)
Dialog manager is brain of the chatbot, and is responsible for calling DU with generated dialog expectation to get the frame event, and consult the dialog annotations to decide how to respond to user (in term of semantic frames and language independent way) for next turn, and use text generator to translate the frame into natural text reply in the language that user speaks. Turn by turn, dialog manger will figure out what user wants, and connect user with the service they care. Runtime is a fully decomposed system, with DM operating solely on DU output, and given DU output, DM output is entirely independent of user utterance, and given DM output, text generation is independent of DU output(DM input). This is important to make DM language independent.

### Dialog understanding (DU)
A major part of runtime is convert what user said into semantic structure representation, or frame, given the dialog expectation. In Framely, DU is fully controlled by the context dependent expression exemplars, for both initial design and hot fix.

### Dialog expectation
Information can be used to change how user utterance be understood. For example, if DU expect a song name, then "Beijing welcome you" will be recognized as a song and "Beijing" in there will not be recognized as city; if DU does not expect a song name, "Beijing" in there should be recognized as city. Dialog is used to summarize the conversational history so far, in term of understanding, or given dialog expectation, the conversational history does not provide additional useful information toward understanding of the user input for the current turn. Dialog expectation is automatically used by DU for this purpose, and builder does not need to worry about it.

### Frame event
The semantic structure representing what user said, converted by DU under given dialog  expectation. The Frame event can be at semantic level or pragmatic level.

### Text generation
To be able to easily interact with users in different language, we use text generation module to translate the same semantics into different natural text. For now we focus on the template based generation.

### Session Manager
This is used to manage the user session, so that each turn contains all the history information.

### Session
A session is a series of back and forth turns between user and chatbot to address user's needs at some point in time. Session can be started by user or chatbot (but do not be confused with who will have the first message, it is possible chatbot have the first message in the session that is started by user, particularly for live chat cases), and it has a closure, explicitly (by mutual agreement) or implicitly (by time out). There can be many sessions between chatbot and a particular user over time.

### Dispatcher
This manages the messages from channels and decide whether it is chatbot or human supports is responsible for the conversation.

## Channel & messages

### Channel
The same chatbot can interact with user from different channel (facebook messenger, wechat public account, etc). Conversation are conducted between chatbot and user by exchange messages in the channel. Channels come with two different capabilities: some channel can only render text messages, particularly these channel based on speakers or without a display, other channel can read media, image or video in some degree. There are two different kinds of channels, live channel and messaging channel.
#### Live channel
User on live channel can not be contacted asynchronously by chatbot, conversation session on the live channel can only be started by user, most web channels belongs to this category.
#### Messaging channel
User on message channel can be reached by chatbot, or conversation session on the message channel can be started by chatbot. Example of message channel is RCS or Facebook messenger.

### Omnichannel support
The ability for chatbot to continue the conversation where user switch from one channel to another.

### Messages
User exchange messages with chatbot/human agent to get things done. There are three different dimensions when it comes to the messages.
#### Text message vs media message
Text messages can be rendered in any channels, including in speaker that doesn't have display. Media messages are best rendered in the channels with display, like RCS and Facebook Messenger.
#### Generic message vs channel specific message
Generic messages are defined in Framely channel, and they will be rendered into all Framely supported channels on the best effort basis. The channel specific messages are defined in the specific channel, these messages will be chosen as reply to users for that channel instead of already defined generic messages. Channel specific message will be supported later.
#### Simple message vs list messages
Simple messages render information in a single frame, and list messages render information in the list of frames.

### Support
When chatbot does not know what to do or when user demand talking to a human agent, we can forward the conversation to support system, the default one is open source system chatwoot. There are two different modes of support: live chat and messaging.
#### Live chat
Under the live chat mode, it is assumed that conversation will get into a queue for human agent, where user will be waiting for the human agent become available. When human agent become available, user can expect his message will be replied in reasonable time frame before his issues is either resolved and an alternative is suggested/agreed upon.
#### Messaging
Under this mode, user will send message, and expect some human agent will eventually come back with reply. At mean time, he will move on to other things.

## Backoffice
Back office: interface for business admin/operator to interact with backend so that business can provide service to user.

Stakeholders for entire application (chatbot, backend and back office), there are no one to one mapping between the account system on platform, support of backoffice:

## Roles
### Builder
The people use platform to define chatbot and backend, usually hired by business.
### End-user
The people use chatbot to get things done.
### Operator(business)
The team that user the back office to deliver the information/service to end user.
### Admin(business)
Admin is a special kind of operator, they have full control of the data in the backend.

As general rule, builder use platform, business operator and admin use backoffice. End-user use chatbot. And business admin may or may not hold the admin account on the Framely platform.

## Operation on platform
### Reusability
Reusability is the one of the key design goal for Framely to help business to reduce the cost of building personalized services. There are four different mechanisms available.

#### Import
Instead of build functionality from scratch, on Framely, the first choice of acquired functionality is import the relevant components. Where there are right components, builder only need to provide the business dependent data to service their users.

#### Clone
Clone is another way of reuse. Instead of build chatbot from empty slate, one start from exist chatbot by clone it.

#### Inherit
We support inherit/implementation on frames, so that we can get new behavior by adding to existing frame instead of building frame from scratch.

#### Compose
We can use frame as slot of larger frame, to get bigger and bigger behavior.

### Deployment
The project, chatbot or backend, defined on the Framely have two deploy options.
#### Framely Hosted
When configured to be Framely hosted, there will be a button "deploy" that can trigger the new definition be deployed on the Framely cloud to serve the user traffic.
#### Private Deploy
When configured to be private deployed, there will be a button "export" that can trigger the code generated for the project. The code can then be used by your devops team to bring up the service.

### Version control
Framely platform have a version control built in, so that it is easy for builder to collaborate on building chatbot. The version control is modeled after git for the nested structures.
#### Branch
One always works with a branch. Each builder can keep one active branch for each project.
#### Master
There is target branch where every one merge their result into. This is the version that get deployed.
#### Base
Each branch has a base.
#### Rebase
When master moved to new version, we need to rebase first.
#### Commit
Commit the your current change will result in a new version that can be reviewed and merged into master:
#### Review
Before your change can be merged into master, it need to be reviewed by your peers.
#### Pull request
Pull request to indicate that you have change that you want to merge into master.
#### Approve
Only approved change can be merged into master.
#### Merge
Master will have your change after merged.
#### Close
You can discard your change by close it.

## Concept on platform

### Org
Builders belong to organization, and builders from the organization can collaborate freely. Framely charge organization instead of builder.

### Project
Chatbot and backend are all project on platform. Project also include the chatbot component (old library) and backend component.

### Interaction/Language
Each chatbot is consisted of one interaction view and one or more language views. Interaction view defines the language independent user interaction logic for chatbot which is shared by different language views, and language views provide annotation so chatbot can convert natural text in difference language into semantic structure frames and back.

### Type
Framely is statically typed. Type are declared for every slot, every function input parameter and every function return. Entity, frame and intent are all considered to be type on Framely.

#### Statically typed
Statically typed is a programming language characteristic in which variable types are explicitly declared and thus are determined at compile time. This lets the compiler decide whether a given variable can perform the actions requested from it or not. Static typing associates types with variables, not with values.

#### Generic type
Framely also support generic type, where builder can define behavior first and actual type is decided later.

### Definition
By default, intent, frame and entity can be claimed to be definition, in which case, we generate code for them. When definition is turned off, we do not generate code for them instead assume the corresponding code already exist somewhere.

### Identifier
Identifiers are language independent label for semantics in Framely, that include entity type, entity instance, frames. Identifiers are denoted in the full qualified fashion in order to reduce the naming conflict.

### Intent
Intents are simply the tasks that user accomplish through chatbot. It defines what user have to say to indicate that he/she wants some thing, and which actual function to invoke for that task.
#### System Intent
Tasks needed by runtime to manipulate the common understanding what is user want to achieve.
#### System action
Task that does not have expression trigger.

### Frame
Frame captures the structure meaning that user expressed in their utterance. Intent is essentially frame with actions attached to it. Frame are understood using abstractive methods using machine learning models. Frame can contain one or more slots, with entity or frame types. There are two type of frames: language aware and language ignorant. Frame support both has-a (composition) and is-a (inheritance) relationship on frame. One can add dialog annotation to frame (then became a CUI frame), but it is not required that frame has to have dialog annotations. Similarly, one can add storage/backoffice annotation to a frame in the backend, but it is not required.
#### Subframe
A subframe inherits every things from parent frame.

#### Global
Frame can be declared as global. A global frame can occur in more than one intent/frame as the type for one of slot, just like regular frame, but we will only interact with user once to fill this frame in a session when it is first referenced (if not persisted), and all the subsequent reference via different slot of the same type will access the the same information. All slot of the global frame type should be declared as never ask (I can understand call it never ask or always ask are both problematic as we don't know whether it will be asked in the this context,  but we should NOT have conditional asking at least). The interaction on these slots are controlled by the global frame itself, not slot.

#### Entity linking
Builder can map an interface frame to an entity, then have one subframe for this interface for every instance of the entity type. This reuses the expressions defined on the entity and its instances. The result is the utterance are recognized toward meaning using both dialog understanding (extractive and abstractive) methods.

### Entity
In Framely, entity is a type of item and element that is relevant to the user's intent/frame, for example, city is an entity with instances like Beijing, New York, for example. Entities define typed data that can be extracted from the utterance and is essential to complete a user's required action. Entity instances are understood based on extractive methods. Entity has one or more type expressions.
#### Entity instance
entity instance is an entity of that type. It has a label that is language independent, and then one more more language dependent expression (value expression).
  - Identifier
  - Normalized: standard output to user
  - Expression: what user say and system could understand
#### Parent Entity
  If B is parent of current entity, every instances of current entity is also instance of the B.

### Component
Frame as basis of component\
Framely assumes all chatbot functionalities can be composed from the smaller components, just like Lego system. This allows maximal reuse. In Framely, frame, or semantic structure, is center piece. It defines the common goal can be had between user and chatbot and information needed by that goal. Depending on what annotation we add to frame, they can form CUI components or backend components.

#### CUI component
CUI component defines how chatbot can collect user intention for some reason so that different businesses in the same sector do not need to build the same CUI behavior over and over again. This is done by add dialog annotation to frames, which describe the dynamic behavior of frame filling. Also known as library.

#### Backend component
Backend component provide the structured storage for frontend, when used with CUI component, business only need to supply their data to provide the corresponding services to their end users. Also known as service.

### Schema
Schema is a static view what frame is about: common goal and information needed by that goal. Anecdotally, there are two types of frames: verb frames and noun frames. Verb frames are related to intent which describe what user wants or what provider serves (they have to agree), and noun frames are essentially composite entity. Frames commonly has slots (has-a relationship), which can be of entity or frame type, that defines some aspects of this frame.

### Annotation
The desired dynamic behavior of component is declaratively defined in form of annotations. These are designed as "control" so builder to control the desired behavior for their chatbots.

#### Dialog annotation
It's used to define the conversational behavior of chatbot.

#### Storage annotation 
It's used to define the database schema needed by backend component, which can then be used to create compatible database to serve needed backend.

#### Back office annotation 
It's used to define the user experience of the back office for back end.

#### Slot annotation 
It's used to describe the various slot behavior.

#### Frame annotation 
It attached to frame, and used to define various frame behavior.

## CUI component
The main purpose of CUI component is to agree on frame, what user want or the common goal, and fill the frame, or find values for the slots. This is done by two basic components: slot filling and frame filling.
### Slot filling
Slot filling is one of core CUI component. Since the goal of the chatbot is figuring out what user want in form of frame filling. And the basic of the frame filling is to fill a slot, or find out user's preference on a slot. There are many aspects of the conversation that builder can control:

#### Boolean Gate
A slot CUI component that is used to give user control in term of whether there should be conversation about certain aspects: "Are you are a member?" can be used to safe guard a list of questions that chatbot might ask to verify users membership and go on with a different UI path for deliver service to user.  Boolean gate is specified by one or more text generation templates (which typically is chosen randomly) and multiple positive and negative expression exemplars.

#### Ask Strategy
Decide how this slot should be filled.
  - User mention first: only talk about it if user mention it first.
  - Never: never ask, instead get its value from API
  - Always: always ask user.
  - Conditional: only ask user preference under some condition. Condition need to be specified.

#### Value Recommendation (VR)
In addition to ask user for the value, it is often helpful to give them recommendations so that it is easy for user to pick the options that actually works.

#### Value Check (VC)
Before we commit to a given value, it is useful to consult the service to make sure it is valid option.

#### Confirmation
Sometime it is useful to ask user twice before we move on.

### Frame filling
Some time, the slot of the frame can not be filled independently, this is when use annotation on the frame to control the collective filling, but we can VR, VC and confirmation defined on the frame.

#### State update
  This allow one to define condition and action under the come context of this frame.

## Language dependent
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

## System CUI components
One of the design goal of Framely is to automatically handle many conversational issues: where user digress, how we bring them back on track, or where there are ambiguity, how we disambiguate through dynamically scheduled clarification. Ideally we want to make sure that builder can get these behavior without doing anything. And the Framely solution is based on aspect oriented programming. It does so by adding additional behavior (via system CUI components) to existing code (an advice) without modifying the code itself, instead separately specifying which code is modified via a "pointcut" specification (triggered by runtime automatically). The  common system CUI are, and as time goes by, we will surely have more of these to enrich the default chatbot behavior.

### Clarification
Often time, user might say something that dialog understanding did not fully understand, for example, there are multiple possibilities. These are the time where we can trigger System intent to engage in the conversation for user to clarify what they really meant. There are couple variants of this:

### Value clarification
During the slot filling, particularly when we try to find value from the conversation history, there might be multiple values that can be used to fill the slot. This CUI component is used to ask user decide which one is what they want.

### Slot clarification
When user mentioned a value that can fill more than one open slot, we can use this to figure out which slot user want to fill.

### Intent clarification
When DU can not commit to one understanding, we can use this component to get user commit to one intent.

### SlotUpdate
User can modify the a slot with new value.



