---
title: Concept on platform
---

# Concept on platform

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
