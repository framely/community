# Key concepts

OpenCUI can be thought of as GitHub for type-based chatbots. Here are the key concepts at the organizational level, and at the chatbot level, for building chatbots.

## Projects
Just like a repository on GitHub, on the OpenCUI platform, projects are the basic unit of work. Users can decide whether it is public or private, and what permissions each user can have on it, etc. Projects can be cloned or imported for reuse. There are three types of projects on the platform.

### Chatbots
An OpenCUI chatbot is an application with a conversational user interface that delivers services to end-users through conversations. It is essentially just a set of annotated types (components), including skills and all their dependencies such as frames, dialog acts, entities, and services.

### Modules
Modules are the reusable units for getting user preferences via conversations, for example, asking user for a date can be one such module. Modules can be combined to form larger reusable modules for more complex use cases. For better conversational experiences, it is common practice that interaction logic are defined on top of some service.

A service defines a set of API functions that specify how business functionalities can be accessed, this includes the schema or data structure needed by these API functions for input and output parameter and how these input parameters can be used to trigger these functions to get result. By using a service as an interface, we can divide chatbot building into backend for business logic and frontend for conversational user interface, each of which can be taken care of by different teams.

### Providers
Each service can have multiple providers that connect to backend implementation for its functionalities. Providers can be shared by different chatbots in the same organization. OpenCUI supports three types of providers: PostgREST(OpenCUI hosted), RESTful, and native providers.

## Type systems
Services can be described by their schema, using description languages such as [OpenAPI](https://swagger.io/docs/specification/data-models/). The core of the API schema is its type system, which is used to describe data types for the input and output parameters of service functions. OpenCUI's type system supports not only primitive types and enums, but also arrays and user-defined types with built-in inheritance and polymorphism behaviors, making it easy to build conversational interfaces for arbitrary service.

To invoke a function through conversations, we need to create an object of that function's type. To do this, OpenCUI allows you to define CUI types (also known as components), such as skills (think of functions), frames (needed by their parameters), and entities (primitive types), in three steps. First, declare the type and its component, which will be mapped to the hosting language's data types (currently Java/Kotlin) so that they can be used to invoke service functions. Second, use dialog annotations to define interaction logic. Lastly, use exemplars and templates to control how natural text is converted to structured representation, and vice versa.

### Skills
Generally, a skill is essentially a function that a user can access through conversations. As a CUI data type for functions, it is designed to define a self-contained conversational component that delivers some functionality to a user. This means that all three aspects of conversational service delivery need to be defined on top of the corresponding data type:

1. Collect what the user wants through slot filling. You can add slots in the **Slots** section of a skill.
2. Invoke functions using the collected slot value as an input parameter. The invoked function can be a native function defined in the current skill, or a function from the slot of the current skill, in a nested sense like `slot.function()`. You can add service slots in the **Services** section of a skill.
3. Verbalize the service result and render it in the channel.

At the language level, skills can be expressed mainly by verb phrases or full sentences. When expressed in a full sentence, the subject needs to be in the first person. Examples of such utterances include: *"Book me a table for two for Sunday evening"* or *"I would like to make a reservation on Sunday"*.

### Frames
In OpenCUI, a frame is a standard object-oriented class type with support for composition and polymorphism behaviors. Frames typically map to parameter types for your function at schema level.

With inheritance, we can easily support conversations like *"What symptoms do you have?"* by defining an interface symptom frame and multiple concrete frames, each for an actual symptom. Since each concrete frame can have different interaction logic, when we try to fill an interface Frame slot, we can naturally get the conversational experience we need.

At the language level, a Frame represents objects with properties and is typically expressed in a noun phrase such as *"large, spicy noodle"*. 

### Dialog acts
Dialog act is another CUI data type in OpenCUI and is designed to help map structured meaning back to natural text.

### Entities
Entity is your primitive type in OpenCUI, and it is basic building block for complex data type. Entity type can have subtypes. For example, cell phone models could be partitioned into feature phone and smartphone, and smartphone can be further partitioned to iPhone and android phones.

For each entity type, there are many entity entries. Each entity entry provides a set of expressions that are considered to be trigger for that entry, or when one of expression is mentioned, we consider user prefer the corresponding entry. 

## Annotations
After these types are defined at schema level, builder can add annotation on top of it to control the every aspect of this component. An example will be what if a user did not specify a value for a required slot, how do we prompt them in a given language. As a declarative platform for building a full stack chatbot, different categories of annotations are supported: dialog annotation. 

### Dialog annotations
There are times that users do not give all the information needed in one utterance. Then we need to define the conversation plan to collect the missing info. In OpenCUI, this is done by adding various dialog annotations. For example, we specify what question we use to get user's preference on a given slot.

Dialog annotations can be defined both on slot and type level. Slot level annotations defines how individual slot can be filled. This includes whether the slot can take multiple values, whether it need confirmation. For frame slot, whether the polymorphism is allowed. Type level annotations are related to multi-slot filling where values for slots need to collectively make business sense. This includes annotations like value recommendations and value check. Value recommendation provides a user with candidate list so that they can pick one from that instead of input something that is invalid. Value check makes sure agent catch user input error as early as possible so that conversation can be efficient. Dialog annotations are naturally separated into interaction related and language related, each can be handled by different set of people. This makes multiple language support easy.

### Provider annotations
OpenCUI allow you to build hosted provider using PostgREST provider, where you can define the data type first, and add storage annotation to help OpenCUI infer corresponding table schema, and you can use backoffice annotation to specify various aspect of admin interface to the data, including look and feel, and input mode. You can use PSQL to implement function and expose these functions via PostgREST restful.

#### Storage annotations
In OpenCUI, builders can also define the backend component or service provider. They can do this declaratively in two steps: first, by adding the storage annotation to the frames defined in the service, and then by creating a restful function implementation by simply providing a SQL statement as application logic. While this is the only way to create the storage layer for the data model, it is certainly one way of doing it, particularly if one wants to start from scratch, as these component service providers can be easily reused by cloning.

To create the data model needed by the service implementation, we can simply turn on the storage annotation on the corresponding frames inside the service provider. This essentially creates an isomorphic database table with each slot mapped to a column in it. When the storage annotation is turned on for the frame, we will automatically create the corresponding tables in the hosting database. Builders can precisely control how that table is created by using the SQL Data Type to specify the database data type for the corresponding column for each slot. For most cases, builders can rely on the default strategy. Not Null is used to indicate whether a column can host a null value. Default Value defines the default value for the column. Unique is used to indicate whether a value in the column needs to be unique and can potentially serve as a key.

After the builder specifies the data model, they can then define the function implementation in the provider by providing a SQL statement that captures the application logic. Such function definition is automatically turned into a restful API on top of the database.

#### Backoffice annotations
In addition to serving users via a chatbot, the business data also needs to be accessed and manipulated by the operations team. For the PostgRest provider, they can do so through the back office, which is automatically created based on the back office annotation. In particular, the user experience of the admin interface can be controlled by the following annotations among others:
Sortable: whether one can sort the entire table by the given column.
Input Mode: whether we can have a dropdown menu for inputting this column and what the choices are.
