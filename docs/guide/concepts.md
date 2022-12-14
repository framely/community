# Key Concepts

This section helps you understand the key concepts at the org level, and at chatbot level in terms of build, test, deploy and operate chatbots.

## Projects
Just like repo on the GitHub, on the OpenCUI platform, projects are the basic unit of work. One can decide whether it is public or private, what permission that each user can have on it, etc. Projects can be cloned or imported for reuse. There are three kinds of projects on the platform.

### Chatbots
A OpenCUI chatbot is an application with conversational user interface that connects end-users with your services through conversations. It is essentially just a set of skills and all their dependencies like frames, dialog acts, entities and services. 

### Components
Components are the reusable modules for getting user preferences via conversations, for example, asking user for a date can be one such component. Components can be integrated into bigger and bigger reusable component for more complex use cases. Optionally, component can declare a service, which allows interaction logic to be defined against business logic and service APIs for better conversational experiences.

#### Services
A service defines a set of function interface that specify how business functionalities can be accessed, this includes the schema or data structure needed by these API functions for input and output parameter and how these input parameters can be used to trigger these functions to get result. These services can be used during the conversation for making communicating more effective or after conversation for delivering the service. 

### Providers
Each service can have one or more provider projects that provide the implementation of these functionalities. Providers are also deployable, so the same provider can be used by different chatbots from the same organization. We support three types of providers: Postgresql based provider, restful provider and native provider. Providers can be shared by different chatbots in the same org.


## Type Systems

Services can be described by its schema, using description languages such as [OpenAPI](https://swagger.io/docs/specification/data-models/). The core of the API schema is its type system, which is needed to describe data types for the input and output parameters for the service functions. To make it easy to build conversational interface for any services, in addition to primitive type and enums, OpenCUI type system also supports arrays, user defined types with builtin inheritance and polymorphism behaviors. 

A data type (or simply type) defines what operations can be applied to its instances, and the behavior on these instances resulted from these operations. As a conversational user interface framework, the types you can define on OpenCUI, including skill, frame and entity, have their conversational behavior defined in three layers. In schema layer, they are directly mapped into hosting language data types (currently Java/Kotlin) so that it can be used to invoke the service functions directly; in interaction layer, how to collect user preferences are defined via dialog annotation; finally in language layer, these same types directly encode the semantics of utterances, and builder can use exemplar and template to control how to convert between natural text and structured representation back and forth. 

These pre-defined data types we support like [Java](https://build.opencui.io/org/5f531ff3b18cde225665fcf3/agent/5fa26c1a22714e8c5b7b9ea3/entity), [Kotlin](https://build.opencui.io/org/5f531ff3b18cde225665fcf3/agent/5fa21ced93f59e8e4f65839a/entity) are usually automatically imported into projects. If not, you can import them manually, and then you can view them under Imported tab.

### Skills
Generally, a skill represents what a user wants, at the same time, it is essentially a function that a user can access through conversations for businesses. 

In OpenCUI, skill, as a composite CUI data type for functions, is designed to define a self-contained conversational component that delivers some functionality to a user. This means that all three aspects of conversational service delivery need to be defined on top of the corresponding data type: 
1. Collect what user wants through slot filling. You can add slots in the **Slots** section in a skill.
2. Invoke functions using collected slot value as input parameter. The invoked function can be a native function defined in the current skill, or a function from the slot of the current skill, in a nested sense like `slot.function()`. You can add service slots in the **Services** section in a skill.
3. Verbalize the service result and render them in channel.

At language level, skills can be expressed mainly by verb phrases or full sentence. When expressed in full sentence, the subject need to be first person. Examples for such utterances includes: *"Book me a table for two for Sunday evening"* or *"I would like to make a reservation on Sunday"*.

#### Default Skills
These following **Default Skills** will be created automatically when you successfully create the chatbot, and you can modify them as desired:
- **Greeting**: a default welcome skill, this skill has simple expression exemplars like *"Hi"* or *"Hello"* that are matched when the user begins a conversation with your bot. This skill could return a response to let the user know what your bot does or what they can say to begin a conversation. 
- **Goodbye**: a default ending skill, this skill returns a response to let the user know the conversation or service is ending soon. 
- **Main**: a default mechanism for each chatbot. 

### Frames
Frame is also a composite CUI data type in OpenCUI. Frame is your standard object-oriented class type with composition and polymorphism behaviors support. So smaller frames can be composed to larger frames, with dialog annotations only defined once and reused by different larger frames. 

With inheritance, we can easily support *"What symptoms do you have?"* type of conversation. By define a interface symptom frame, and multiple concrete frame one for each actual symptom. Since each concrete frame can have a different interaction logic, when we try to fill an interface frame slot, we can naturally get the conversational experience we need. 

Since the same frame can be used by different skills, frame also naturally serves as context to pivot conversation back and forth between skills. In particular, a user response like *"How is the weather like there?"* to an earlier chatbot question *"Which day you want to fly to Shanghai?"*, while seemed missing information, is easy to understand if we know both weather and ticket skill use the same location frame.

At language level, a frame represents objects with properties and is typically expressed in a noun phrase like *"Large, spicy noodle"*. In the service layer, the frame are your typical data class, which is parameters for your function.

### Dialog Acts
Dialog act is another composite CUI data type in OpenCUI. When frame is designed to help convert meaning in natural text into structured representation, dialog act is the opposite of the frame. Dialog act is designed to map structured meaning back to natural text.

### Entities
The term entity is used to describe the general concept of types and they are basic building block for complex data type. When discussing entity details, it's important to understand these specific aspects:
1. Type: Defines the type of information you want to extract from user input. For example, cell phone model could be an entity type.
2. Subtype: Entity type can have subtypes. For example, cell phone models could be partitioned into feature phone and smartphone, and smartphone can be further partitioned to iPhone and android phones. These partition of entity type allow for detailed control of how slot be filled.
3. Entry: For each entity type, there are many entity entries. Each entity entry provides a set of words or phrases that are considered equivalent. For example, if cell phone is an entity type, you could define these entity entries: `iphone 12`, `huawei mate pro`, etc.

In conversation layer, entity represents an instance of concept type, like `beijing` is an instance of type `City`. In service layer, entity are mapped to primitive type, of enum like atomic type. Understanding entity is typically done by extractive understanding, with synonyms annotation are the important control that builder has to influence the dialog understanding behavior.

#### How To Define
1. Head to **Entities** page, click **Create**.
2. To add an instance, under the **Instances** tab, click **Add**.
::: thumbnail
![add instance](/images/guide/concepts/add-instance.png)
:::

3. To enable abstract, turn on the **Abstract** toggle.
::: thumbnail
![turn on abstract](/images/guide/concepts/turn-on-abstract.png)
:::

4. To add a parent entity, switch to the **Schema** tab. In the **Parent Entities** section, select an abstract entity.
::: thumbnail
![add parent entity](/images/guide/concepts/add-parent-entity.png)
:::


## Annotations
After these types are defined at schema level, builder can add annotation on top of it to control the every aspect of this component. An example will be what if a user did not specify a value for a required slot, how do we prompt them in a given language. As a declarative platform for building a full stack chatbot, different categories of annotations are supported: dialog annotation, storage annotation and backoffice annotation. 

### Dialog Annotations
 There are times that users do not give all the information needed in one utterance. Then we need to define the conversation plan to collect the missing info. In OpenCUI, this is done by adding various dialog annotations. For example, we specify what question we use to get user's preference on a given slot.

Dialog annotations can be defined both on slot and frame level. Slot level annotations defines how individual slot can be filled. This includes whether the slot can take multiple values, whether it need confirmation. For frame slot, whether the polymorphism is allowed.  Frame level annotations are related to multi-slot filling where values for slots need to collectively make business sense. This includes annotations like value recommendations and value check. Value recommendation provides a user with candidate list so that they can pick one from that instead of input something that is invalid. Value check makes sure agent catch user input error as early as possible so that conversation can be efficient. Dialog annotations are naturally separated into interaction related and language related, each can be handled by different set of people. This makes multiple language support easy.

### Storage Annotations
OpenCUI supports the full stack component, data types (frames) defined on the platform can be persisted to tables in the database. The storage annotation is used to specify how frames are stored in the Postgresql. For each slot, Builder can specify how to store them, whether to create an index for it or add a unique constraint. And stored procedures can be then be defined on these table and served as function via Postgrest. 

### Backoffice Annotations
Aside from being manipulated by users through Postgrest restful API, the persisted data can also be managed via admin web interface. In addition to storage annotation, builder can use backoffice annotation to specify how operation team can access these data via that web interface. This includes whether they can add row, change cell, etc. Backoffice annotation can also include the hint on what help and safeguard we have on the data entry for each slot.  

## Operational Software
After we build the conversational service, we can deploy them for different channels. Then we need to operate the services. This includes both backoffice that manages the transactions from the end users and support software that human agent can step in when bot failed to meet user's needs. 
