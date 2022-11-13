# Glossary
OpenCUI is a component based declarative frontend framework for building conversational user interface for your services. It comes with a low code platform for building personalized service, include chatbot and corresponding backend.

## CUI
Conversational user interface.

## CUX
Conversational user experience.

## GUI
Graphical user interface.

## Imperative
Builders describe how things should be done step by step and computer simply follow that.

## Declarative
Builders describe what are needed and computer figure out how to do it.


## Cooperative Principle
This assumes users are engaged in the conversation with bot for a common goal: user want to access some services that bot want to provide, thus it is user's interest to get what they want in the lowest effort possible.

## Application Logic
Also known as business logic, defines what and how services should be delivered.

## Interaction Logic
Defines how interaction should be carried out based on users input event. Interaction logic are defined by underlying application logic.

## Frontend
User-facing application are commonly partitioned into frontend and backend. Where frontend manages the user interaction, and backend models data and application logic. And backend and frontend communicate via predefined-defined APIs. Frontend includes perception layer (language aware) and interaction layer(for language independent interaction logic).

## Backend
Backend hosts all the data and application logic for different frontends, with chatbot as one such frontend. Backend is implementation of service APIs.

## Project
Chatbot, component and provider are all projects on OpenCUI platform.

### Chatbot
An application with conversational user interface, or CUI frontend, where user can access service through text or voice instead of a graphical user interface. Chatbot can be generally built in 4 layers:
- **Schema Layer**: Or API layer, defines interface to backend service, including data structure needed to invoke the service as both input and output.

- **Interaction Layer**: Defines interaction logic, or how input parameter needed by service should be collected from user via conversational interactions, in a language independent fashion. The decision in this lever include whether to prompt user for given slot, whether to give recommendation when prompt, and what to do if input validation is failed, for example.

- **Language Layer**: Used for converting natural language and structured semantics back and forth. Expression for dialog understanding and template for text generation are the main control.

- **Channel Layer**: Different channels have different ways to encode the conversation relevant information, implementation for channels are defined in this layer to make sure the same bot can be accessed from different channel.

### Component 
The composable architecture of OpenCUI allows you to build encapsulated component that handles interaction for some predefined purpose, and then wire these reusable components into bigger and bigger ones for what you need. And some components contain service APIs, which can be used to declaratively build the backend.  

#### Service
The API for collection of functions that chatbot can use to access business data and logic.

### Provider
Provider is implementation for some APIs. There are two kind of provides, system providers that implements Channel/Support interface and service providers that implements business APIs. You can implement providers in Kotlin code for maximum freedom. Or you can use one of scripted provider backend, and use the corresponding script language to define business logic. OpenCUI currently provides the following scripted provider: Postgrest, RESTful and Google Sheets.

- **Postgrest Provider**: In addition to access, Postgrest provider are used to define both application logic  (via SQL in form of stored procedure) and database schema needed by such logic declaratively on OpenCUI. This allows you to define reusable backend components including both UI and backend (both data and business logic), with the dialog annotation, storage annotation as well as backoffice annotation. 

- **RESTful Provider**: Service can also be accessed via restful API, with restful provider one can describe the mapping of the collected input parameter to actual Json format needed by endpoint.

- **Google Sheets Provider**: Google Sheets provider allow you to use Google Sheets as backend, which the actual data can be managed by your operation team in online spreadsheet collaboratively.




## Runtime 
The core of chatbot is to build common understanding of what user want through conversation, connect user to the right service and generate the natural text for channel to rendering to user.  These core functionalities are provided by OpenCUI runtime as APIs, so each chatbot can focus on what information to collect and leave the actual information collect to runtime. Runtime also contains session management and dispatcher.

## Dialog Manager (DM)
Dialog manager is brain of the chatbot, and is responsible for calling DU with generated dialog expectation to get the frame event, and consult the dialog annotations to decide how to respond to user (in terms of semantic frames and language independent way) for next turn, and use text generator to translate the frame into natural text reply in the language that user speaks. Turn by turn, dialog manger will figure out what user wants, and connect user with the service they care. Runtime is a fully decomposed system, with DM operating solely on DU output, and given DU output, DM output is entirely independent of user utterance, and given DM output, text generation is independent of DU output(DM input). This is important to make DM language independent.

## Dialog Understanding (DU)
A major part of runtime is convert what user said into semantic structure representation, or frame, given the dialog expectation. In OpenCUI, DU is fully controlled by the context dependent expression exemplars, for both initial design and hot fix.

## Dialog Expectation
Information can be used to change how user utterance be understood. For example, if DU expect a song name, then "Beijing welcome you" will be recognized as a song and "Beijing" in there will not be recognized as city; if DU does not expect a song name, "Beijing" in there should be recognized as city. Dialog is used to summarize the conversational history so far, in terms of understanding, or given dialog expectation, the conversational history does not provide additional useful information toward understanding of the user input for the current turn. Dialog expectation is automatically used by DU for this purpose, and builder does not need to worry about it.

## Context
Dialog understanding is always conducted under context, and context is simply the stack of frame that is currently active. So if we are interacting about frame A, and drill into one of its slot of type(frame) B, then the context is [A, B], with B on the top of the stack.

- **Context Independent Expression**: Expression defined in the expression tab for intent are context independent, and they can be triggered in any context, or DU will convert the user utterances similar to the these expression exemplars into frame and send to dialog management for further processing.

- **Context Dependent Expression**: All other expression defined on the OpenCUI platform are considered context dependent, where its expected context is determined by where the expression exemplar is defined.  DU will convert expressions similar to these exemplars into corresponding frames only when the current dialog context matches the context where the exemplar is defined. For example, positive expression exemplar under confirmation on the slot will only be used to convert similar user utterance into corresponding frame when chatbot start the confirmation on that slot.

## Frame Event
The semantic structure representing what user said, converted by DU under given dialog expectation. The Frame event can be at semantic level or pragmatic level.

## Session Manager
Session manager is used to manage the user session, so that each turn contains all the history information.

## Session
A session is a series of back and forth turns between user and chatbot to address user's needs at some point in time. Session can be started by user or chatbot (but do not be confused with who will have the first message, it is possible chatbot have the first message in the session that is started by user, particularly for live chat cases), and it has a closure, explicitly (by mutual agreement) or implicitly (by time out). There can be many sessions between chatbot and a particular user over time.

## Dispatcher
Dispatcher manages the messages from channels and decide whether it is chatbot or human supports is responsible for the conversation.

## Channel
The same chatbot can interact with user from different channel (facebook messenger, WeChat public account, etc). Conversation are conducted between chatbot and user by exchange messages in the channel. Channels come with two different capabilities: some channel can only render text messages, particularly these channel based on speakers or without a display, other channel can read media, image or video in some degree. There are two different kinds of channels, live channel and messaging channel.

- **Live Channel**: User on live channel can not be contacted asynchronously by chatbot, conversation session on the live channel can only be started by user, most web channels belongs to this category.

- **Messaging Channel**: User on message channel can be reached by chatbot, or conversation session on the message channel can be started by chatbot. Example of message channel is RCS or Facebook messenger.

## Messages
User exchange messages with chatbot/human agent to get things done. There are three different dimensions when it comes to the messages.

- **Text Message vs Media Message**. Text messages can be rendered in any channels, including in speaker that doesn't have display. Media messages are best rendered in the channels with display, like Google Business Message and Facebook Messenger.

- **Universal Message vs Channel Specific Message**. Universal messages are defined in Universal Channel, and they will be rendered into all OpenCUI supported channels on the best effort basis. The channel specific messages are defined in the specific channel, these messages will be chosen as reply to users for that channel instead of already defined generic messages. Channel specific message will be supported later.

- **Simple Message vs List Messages**. Simple messages render information in a single frame, and list messages render information in the list of frames. 

## Support
When chatbot does not know what to do or when user demand talking to a human agent, we can forward the conversation to support system, the default one is open source system Chatwoot. There are two different modes of support: live chat and messaging.

- **Live Chat**: Under the live chat mode, it is assumed that conversation will get into a queue for human agent, where user will be waiting for the human agent become available. When human agent become available, user can expect his message will be replied in reasonable time frame before his issues is either resolved and an alternative is suggested/agreed upon.

- **Messaging**: Under this mode, user will send message, and expect some human agent will eventually come back with reply. At mean time, he will move on to other things.

## Backoffice
Back office is a interface for business admin/operator to interact with backend so that business can provide service to user.

## Reusability
Reusability is the one of the key design goal for OpenCUI to help business to reduce the cost of building personalized services. There are four different mechanisms available.

- **Import**: Instead of build functionality from scratch, on OpenCUI, the first choice of acquired functionality is import the relevant components. Where there are right components, builder only need to provide the business dependent data to service their users.

- **Clone**: Clone is another way of reuse. Instead of build chatbot from empty slate, one start from exist chatbot by clone it.

- **Inherit**: We support inherit/implement on frames and intents, so that we can reuse behavior by adding to existing frame instead of building frame from scratch.

- **Compose**: We can use frame as slot of larger frame, to get bigger and bigger behavior.

## Deploy Mode
The project, chatbot or provider, defined on the OpenCUI have two deploy mode options.

- **OpenCUI Hosted**: When configured to be OpenCUI hosted, there will be a button "deploy" that can trigger the new definition be deployed on the OpenCUI cloud to serve the user traffic.

- **Private Deploy**: When configured to be private-deployed, there will be a button "export" that can trigger the code generated for the project. The code can then be used by your devops team to bring up the service.

## Version Control
OpenCUI platform have a version control built in, so that it is easy for builder to collaborate on building chatbot. The version control is modeled after git for the nested structures.

- **Branch**: One always works with a branch. Each builder can keep one active branch for each project.
- **Master**: There is target branch where every one merge their result into. This is the version that get deployed.
- **Base**: The latest version of the master when the branch was created. Each branch has a base.
- **Rebase**: When the master version is upgraded, synchronizing the latest master to your branch.
- **Diffs**: Shows you exactly how it differed from the base master.
- **Commit**: Confirm your branch chagens and ready to start testing.
- **Pull Request**: Pull requests display diffs to compare the changes you made in your branch against the base master, which indicates you are willing to merge them into master.
- **Review**: Before your change can be merged into master, it needs to be reviewed by your peers.
- **Approve**: Only approved change can be merged into master.
- **Merge**: Merging takes the changes from one branch into master. A merge can be done through a pull request if there are no conflicting changes.
- **Close**: You can discard your change by close it.

## Org
Builders belong to organization, and builders from the organization can collaborate freely. OpenCUI charge organization instead of builder.

## Structure / Language View
Each chatbot is consisted of one structure view and one or more language views. 
- **Structure View**: Defines the language independent user interaction logic for chatbot which is shared by different language views.
- **Language View**: Provides annotation so chatbot can convert natural text in difference language into semantic structure frames and back. 

## Type
OpenCUI is statically typed. Type are declared for every slot, every function input parameter and every function return. Entity, frame and intent are all considered to be type on OpenCUI.

- **Statically Typed**: Statically typed is a programming language characteristic in which variable types are explicitly declared and thus are determined at compile time. This lets the compiler decide whether a given variable can perform the actions requested from it or not. Static typing associates types with variables, not with values.

- **Generic Type**: OpenCUI also support generic type, where builder can define behavior first and actual type is decided later.

## Definition
By default, intent, frame and entity can be claimed to be definition, in which case, we generate code for them. When definition is turned off, we do not generate code for them instead assume the corresponding code already exist somewhere.

## Label
Label is a language independent aspct for semantics in OpenCUI, that include entity type, entity instance, frames. Labels are denoted in the full qualified fashion in order to reduce the naming conflict.

## Intent
Intents are simply the tasks that user accomplish through chatbot. It defines what user have to say to indicate that he/she wants something, and which actual function to invoke for that task.
- **System Intent**: Tasks needed by runtime to manipulate the common understanding what is user want to achieve.
- **System Action**: Task that does not have expression trigger.

## Frame
Frame captures the structure meaning that user expressed in their utterance. Intent is essentially frame with actions attached to it. Frame are understood using abstractive methods using machine learning models. Frame can contain one or more slots, with entity or frame types. There are two type of frames: language aware and language ignorant. Frame supports both has-a (composition) and is-a (inheritance) relationship on frame. One can add dialog annotation to frame (then became a CUI frame), but it is not required that frame has to have dialog annotations. Similarly, one can add storage/backoffice annotation to a frame in the backend, but it is not required.
- **SubFrame**: A subframe inherits every thing from parent frame.

## Global
Frame can be declared as global. A global frame can occur in more than one intent/frame as the type for one of slot, just like regular frame, but we will only interact with user once to fill this frame in a session when it is first referenced (if not persisted), and all the subsequent reference via different slot of the same type will access the same information. All slot of the global frame type should be declared as never ask (I can understand call it never ask or always ask are both problematic as we don't know whether it will be asked in the context,  but we should NOT have conditional asking at least). The interaction on these slots are controlled by the global frame itself, not slot.

## Weak Type
Builder can map an interface frame to an entity, then have one subframe for this interface for every instance of the entity type. This reuses the expressions defined on the entity and its instances. The result is the utterance are recognized toward meaning using both dialog understanding (extractive and abstractive) methods.

## Entity
In OpenCUI, entity is a type of item and element that is relevant to the user's intent/frame, for example, city is an entity with instances like Beijing, New York, for example. Entities define typed data that can be extracted from the utterance and is essential to complete a user's required action. Entity instances are understood based on extractive methods. Entity has one or more type expressions.

- **Entity Instance**: Entity instance is an entity of that type. It has a label that is language independent, and then one or more language dependent expressions (value expression) what user say and system could understand.

- **Parent Entity**: If B is parent of current entity, every instance of current entity is also instance of the B.

## Schema
Schema is a static view what frame is about: common goal and information needed by that goal. Anecdotally, there are two types of frames: verb frames and noun frames. Verb frames are related to intent which describe what user wants or what provider serves (they have to agree), and noun frames are essentially composite entity. Frames commonly has slots (has-a relationship), which can be of entity or frame type, that defines some aspects of this frame.

## Annotation
The desired dynamic behavior of component is declaratively defined in form of annotations. These are designed as "control" so builder to control the desired behavior for their chatbots. Annotations can be defined on the frame level which defines behavior of the entire frame, or slot level which define the slot specific behavior. 

- **Dialog Annotation**: It's used to define the conversational behavior of chatbot.

- **Storage Annotation**: It's used to define the database schema needed by backend component, which can then be used to create compatible database to serve needed backend.

- **Backoffice Annotation**: It's used to define the user experience of the back office for back end.

## CUI Component
The main purpose of CUI component is to agree on frame, what user want or the common goal, and fill the frame, or find values for the slots. This is done by two basic components: slot filling and frame filling.

- **Slot Filling**: Slot filling is one of core CUI component. Since the goal of the chatbot is figuring out what user want in form of frame filling. And the basic of the frame filling is to fill a slot, or find out user's preference on a slot. 

- **Frame Filling**: Some time, the slot of the frame can not be filled independently, this is when use annotation on the frame to control the collective filling, but value recommendation, value check and confirmation can be defined on the frame.

## Initialization
Initialize the slot value. There are two ways to initialize a slot. One is static initialization in which the slot is assigned a deterministic value like constant and any non-nullable code expression, and another is dynamic initialization in which the slot is assigned any indeterministic nullable code expression like another slot or a function.

## Fill Strategy
Decide whether or when to prompt the user to fill this slot. More importantly, it also defines how other fill annotations should work together.
- **Always**: Always ask user.
- **Conditional**: Only ask user preference under some condition. Condition need to be specified.
- **Gated**: Used to give user control in terms of whether there should be conversation about certain aspects: "Are you are a member?" can be used to safeguard a list of questions that chatbot might ask to verify users membership and go on with a different UI path for deliver service to user. Gated strategy can only be applied to frame slot.
- **Recover Only**: Not be prompt unless there are some prior effort to fill it, either initialization by builder or prior mention by user.
- **Never**: Never ask, instead get its value from API.
- **External**: Can be set when bot needs to work with external software. Bot will pause the conversation until an external event is received.

## Value Recommendation
In addition to ask user for the value, it is often helpful to give them recommendations so that it is easy for user to pick the options that actually works.

## Value Check
Check whether a given value is servable based on business logic.

## Confirmation
To inform user something (implicit confirmation) or ask user to confirm their choice (explicit confirmation).

## Transition
Transition is a low level annotation that give builder the ability to control the state machine directly. It is an optional frame level annotation which lets you define transitions between slots hosted directly and indirectly by hosting frame.

## Expression Exemplars 
All semantics in OpenCUI can be referenced in multiple languages, and expression is the only way for builder to influence how user utterance is converted into semantic frames. By attaching expression exemplars to each semantic under some context, builder indicate user utterance that are similar to expression exemplars under the same context should be converted to the corresponding frame.

These expression exemplars are used by NLU model to hotfix the understanding issues. Notice expression exemplar are normally only useful under the given context, so it is easy for OpenCUI to convert the same utterance into different frame representation under different context. Builder can provide expression exemplar for any semantics: do-not-care, negation, positive and negative under yes-no questions, for example,  There are different kinds of expression:

- **Type Expression** (Name): The example of how entity, frame types are mentioned in different languages.
- **Value Expression** (Entity Instance Expression): The example of how entity and frame instance are mentioned in different languages.
- **Partial Expression**: Exemplar that specify how to find value for given slot from the conversation history, in order to full understand user utterance when there are pronoun in there, i.e. "what is the weather over there" implies user want to to know weather of the $city$? 
Pronoun Expression(experimental): for each slot, entity, builder can specify which pronoun is used to refer these, so that builder do not need to supply partial expression.  
- **Pronoun Expression**: For each slot, entity, builder can specify which pronoun is used to refer these, so that builder do not need to supply partial expression.

## Code Expression
Code expressions (in Kotlin) can be evaluated dynamically by runtime. Code expression can be used independently or embedded in templates. Since the skills/frames/entities defined on the platform are directly compiled into Kotlin source code, so it is possible to use arbitrary Kotlin code expression in predefined places to specify the interaction logic. For example, in value recommendation, we can use code expression to indicate which function, and how it should be invoked to provide the desired list of instances for user to choose from.

## Text Generation
To be able to easily interact with users in different language, we use text generation module to translate the same semantics or dialog act into different natural text. For now we focus on the template based generation.

To make building multi-language chatbot, builder can specify text generation templates to create desired sentence for user to make it easy for user get to their goal quickly and effortlessly.

### Dialog Act

### Template
In both prompt and response, we need to specify what chatbot say to user. This is accomplished by template. Template is just string with code expression embedded in it. One way of encoding the embedded code expression is to surround them with `${}`, the code expression inside `${}` will be evaluated to string and then concatenated with rest of static content to form the final message for user.

### Prompt
Use these templates to create question to guide user towards their goal. Examples include: "where do you want to go?", and "Are you sure you want to it to be extremely spicy?"

### Response
The services that user want are generally accessed via some form APIs, and result from the APIs will be some structured information. Response are the template to turn these structured result into natural text.

