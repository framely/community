# Key Concepts

This section helps you understand the key concepts at the org level, and at chatbot level in terms of build, test, deploy and operate chatbots.

## Projects
On the Framely platform, projects are the basic unit of work, just like the repo on the GitHub. One can decide whether it is public or private, what permission that each user can have on it, etc. Projects can be cloned or imported for reuse. There are three kinds of projects on the platform.

### Chatbots
A Framely chatbot is an application with conversational user interface that connects end-users with your services through conversations. It is essentially just a set of intents and all their dependencies like frames, services. 

### Components
Components are the reusable modules for getting user preferences via conversations, for example, asking user for a date can be one such component. Components can be integrated into bigger and bigger reusable component for more complex use cases. Component can contain a service, which allow interaction logic 

#### Services
A service defines a set of function interface that specify how business functionalities can be accessed, this includes the schema or data structure needed by these API functions for input and output parameter and how these input parameters can be used to trigger these functions to get result. Conversational behavior of these component can interact with services so that we can make the conversation as effective as possible.

### Providers
Each service can have one or more provider projects that provide the implementation of these functionalities. Providers are also deployable, so the same provider can be used by different chatbots from the same organization. We support three types of providers: Postgresql based provider, restful provider and native provider. Providers can be shared by different chatbots in the same org.


## Type Systems
Nowadays, services are typically available behind some APIs that are described by API schema using description languages such as [OpenAPI (previously Swagger)](https://swagger.io/docs/specification/data-models/). The core of the API schema is the set of data types, which is used to describe the input and output parameters for the functions in the service. In order to describe a wide range of functions, OpenAPI requires a type system that supports an extended subset of [JSON Schema Specification Wright Draft 00](https://datatracker.ietf.org/doc/html/draft-wright-json-schema-00). 

To make Framely capable enough to build conversational interface for any service, while staying as conceptually simple as possible, Framely adopts a static parts of type system that is required by OpenAPI: which in addition to primitive type and enums, also include arrays, composite type as well as inheritance and polymorphism support. The Framely CUI types, including intent, frame and entity, are dual purposed: in service or schema layer, they can be directly mapped into code level (currently Java/Kotlin) to invoke the service functions; in conversation layer, these same types directly encode the semantics of user utterances. By grounding user utterance onto data types at schema level, we can easily separate interaction design and language perception, which also makes multilingual support a no-brainer.

### Intents
Intents mean different things from different angles. For developer, an intent is essentially a function that a user can access through conversations. At schema layer, an intent is a composite data type with zero or more slots, each representing some input parameters needed by the underlying function and intent name can be used to identify what user wants. The type of slots can be intent, frame (both concrete and interface) and entity. And a slot can also be multivalued. In some sense, the intent can be thought as a function signature, with its slots directly mapped as input parameter for actual service function. 


At language layer, An intent is typically expressed by full sentences or verb phrases in user utterances. Examples for such utterances includes: "I would like to make a reservation on Sunday" or "Book me a table for two for Sunday evening".

Each intent is self-contained conversational component that deliver some functionality to a user. Every aspect of this component can be configured on top of the corresponding data type at schema level: including frame filling that collects user preference, service triggering and response rendering.


### Frame
Like intent, frame is also a composite data type on Framely. While on the surface they look similar, both can have slots, with one main difference where frame slot can not be intent. But there are some huge difference from type system perspective, while we can have interface frame, we can not have builder defined interface intent.

In conversation layer, a frame represents objects with properties and is typically expressed in a noun phrase like "large, spicy noodle". In the service layer, the frame are your typical data class, which is parameters for your function.

To model complex real world business and more importantly promote reuse, frames support both composition and inheritance. So smaller frames can be composed to larger frames, with dialog annotations only defined once and reused by different larger frames. Also with inheritance, we can easily support "what symptoms do you have?" type of conversation, where each actual symptom has a different implementation frame but can be used to fill the parent frame typed slot.

Since intent is essentially verb + frame, and same frame can be used by different intent, frame also naturally serves as context to pivot conversation back and forth between intents. This makes it easy to support side questions. For example when a chatbot asks a user "which day you want to fly to Shanghai?", user's response "how is the weather like there?", while seemed missing information, is easy to understand.

### Entity
The term entity is used to describe the general concept of types and they are basic building block for complex data type. When discussing entity details, it's important to understand these specific aspects:
1. Type: Defines the type of information you want to extract from user input. For example, cell phone model could be an entity type.
2. Subtype: Entity type can have subtypes. For example, cell phone models could be partitioned into feature phone and smartphone, and smartphone can be further partitioned to iPhone and android phones. These partition of entity type allow for detailed control of how slot be filled.
3. Entry: For each entity type, there are many entity entries. Each entity entry provides a set of words or phrases that are considered equivalent. For example, if cell phone is an entity type, you could define these entity entries: "iphone 12", "huawei mate pro", etc.

In conversation layer, entity represents an instance of concept type, like "beijing" is an instance of type "city". In service layer, entity are mapped to primitive type, of enum like atomic type. Understanding entity is typically done by extractive understanding, with synonyms annotation are the important control that builder has to influence the dialog understanding behavior.


## Annotations
After these types are defined at schema level, builder can add annotation on top of it to control the every aspect of this component. An example will be what if a user did not specify a value for a required slot, how do we prompt them in a given language. As a declarative platform for building a full stack chatbot, different categories of annotations are supported: dialog annotation, storage annotation and backoffice annotation. 

### Dialog Annotations
 There are times that users do not give all the information needed in one utterance. Then we need to define the conversation plan to collect the missing info. In Framely, this is done by adding various dialog annotations. For example, we specify what question we use to get user's preference on a given slot.

Dialog annotations can be defined both on slot and frame level. Slot level annotations defines how individual slot can be filled. This includes whether the slot can take multiple values, whether it need confirmation. For frame slot, whether the polymorphism is allowed.  Frame level annotations are related to multi-slot filling where values for slots need to collectively make business sense. This includes annotations like value recommendations and value check. Value recommendation provides a user with candidate list so that they can pick one from that instead of input something that is invalid. Value check makes sure agent catch user input error as early as possible so that conversation can be efficient. Dialog annotations are naturally separated into interaction related and language related, each can be handled by different set of people. This makes multiple language support easy.

### Storage Annotation
Framely supports the full stack component, data types (frames) defined on the platform can be persisted to tables in the database. The storage annotation is used to specify how frames are stored in the Postgresql. For each slot, Builder can specify how to store them, whether to create an index for it or add a unique constraint. And stored procedures can be then be defined on these table and served as function via Postgrest. 

### Backoffice Annotation
Aside from being manipulated by users through Postgrest restful API, the persisted data can also be managed via admin web interface. In addition to storage annotation, builder can use backoffice annotation to specify how operation team can access these data via that web interface. This includes whether they can add row, change cell, etc. Backoffice annotation can also include the hint on what help and safeguard we have on the data entry for each slot.  

## Operational Software
After we build the conversational service, we can deploy them for different channels. Then we need to operate the services. This includes both backoffice that manages the transactions from the end users and support software that human agent can step in when bot failed to meet user's needs. 