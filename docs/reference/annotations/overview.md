# Overview

Framely provides a composable way of building conversational user interface for your services quickly. And at the heart of this approach, functionalities are organized into configurable components that can be reused by wired into different contexts. The backbone of any Framely components is its data type. The behavior of these components are defined by the annotations that can attach to these data type, both at the slot level and frame level. 

Framely platform is a declarative front end for builder to configure these components. In another word, it is a platform that builder can declare API schema and data types required, and attach annotations to build components, both CUI components that figure out what user wants as input parameters to these APIs, and service providers implements these APIs. By simply picking and configuring these annotations to attach to declared data type, builder can declare the behaviors they want, and Framely runtime will plug these components into the Framely CUI framework and connect users with services through conversation.


## Type Systems
To build conversational user interface for your services, it is important that we first describe the APIs that implements these service. Having a data model that is as capable as the type system from any modern static typed programming language, OpenAPI is emerged as the standard way of defining APIs. To provide conversational user interface for service that can be described by OpenAPI, we need to support the same data model. Which means, in addition to entity and intent, we support customer data type, arrays, as well as inheritance and polymorphism at conversational level.

Behind the scenes, the components that builder configured on the platform are translated into native kotlin code for execution. We have these following schema level annotations that builders can use to control the system behavior. 

### Interface
A frame can be marked as interface. Builder can define multiple frames as implementations of that interface frame. The implementation is considered to have an is-a relationship with interface frame. Which means that we can fill the interface slot with implementation instance. 

### External
When an artifact, including entity, frame and intent, is defined as external, we assume the corresponding kotlin class is already provided so that we do not have to generate the code for this. The builtin types, like Int, Boolean, are accessible at the Framely level, due to this mechanism. 

### Multi valued
A slot can be declared as multivalued as opposed to single valued. A multivalued slot of type T can be translated into a slot with type List<T>. By creating a generic way of instantiating a list of instances of some type can make it easy to build the CUI for certain types.

### Global
Sometime, we need to have a frame that is session global. For example, multiple symptoms might be fever related, but doctor might only need to ask the details of the fever once instead of every time it is related.

### Dynamic
The entity can be static or dynamic, the instance of static entity are decided at the time of compile, so there are instance can be referenced during the configuration. Instance of dynamic entity, on the other hand, are only available during runtime.

## Annotations
After we define the functions and data types for input parameters and returns, we can attach annotations to these types to define different aspects of the conversational behaviors as well as building the service providers.

### Dialog Annotations
The main job for building the conversational user interface is frame filling, which defines how bot extract the value from conversations with user to fill all the slots of a given frame collectively. Dialog annotations can be defined at containers level like intent and frame, and as well as on slots level. In particular, Fill Strategy is used to decide whether one slot should be filled. Then Initialization is used for providing initial value, Promopt for prompt user for value, Value Recommendation gives user list of candidates business can fulfill, Value Check makes sure value user provides are good per business logic, and Confirmation double check with the user on their choice. Each of these will be explained in detail.

### Language Perception Annotations
Inside dialog annotation, we have two language perception related components: templates and expression exemplars. Templates are used to help text generation module where builder can demonstrate how some structure data can be verbalized in natural text. Expression exemplar, on the other hand, exemplify how natural text user utterances should be converted to structured semantic representation called intents or frames. 

Framely dialog understanding try to convert natural language text into structured meaning representation or intent/frames in two steps: abstractive understanding for figuring out which intent or frame user are talking about and extractive understanding for extracting values for the slot inside the chosen frame. But some semantics are depending on the context, a typical example is yes/no of boolean type, by looking at just the value of this type, we do not know its meaning exactly. When interface frame is configured as weak type, we will use both extractive understanding for "yes/nope" and abstractive understanding for "I do not want it anymore" when we try to fill the slot with that weak type. Weak type is not the only use case needs special attention on the understanding side. Don't care is another such case. User might not have preference for certain slots, like when there are multiple showtime for chosen movie. By adding the pattern for extractive understanding and exemplars for abstractive understanding, we can figure out when user means Don'tCare based on their utterance. Finally, Framely support filling slot with some predefined logical operator. For example, in "Reserve a table for lunch, and I do not want Japanese food today.", we need to extract the fact user want to fill cuisine slot with NOT logical operator, where the information is saved in the NOT companion of the cuisine slot.

### Storage Annotations
On Framely, builder can also define the backend component, or service provider. And they can do this declaratively in two steps: first adding the storage annotation to the data types defined in the service, then creating restful function implementation by simply providing SQL statement as application logic. While this is only the only way to create the storage layer for the data model, this is certainly one way of doing it, particularly if one want to start from scratch as these component service provider can be easily reused by cloning. 

To create the data model needed by service implementation, we can simply turn on storage annotation on the corresponding frames inside service provider. This essentially create a isomorphic database table with each slot mapped to column in it. When the storage annotation is turned on for the frame, we will automatically create the corresponding tables in the hosting database. Builder can precisely control how that table is created by using
1. Data Type: to specify the column database type for each slot. For most cases, builder can rely on the default strategy. URL is special string data type that can be used to serve the media. 
2. Not Null: to indicate whether a column can host a null value.
3. Default Value: defines default value for the column.
4. Unique: to indicate whether a value in the column need to be unique, and thus can potentially serve as key.

After builder specify the data model, they can then define the function implementation in the provider by providing sql statement that capture application logic. Such function definition is automatically turned in the restful API on top of the database. 

### Backoffice Annotations
In addition to user facing service API, the data model also need to be accessed and manipulated by the operation team. And they can do that through the backoffice, which is again created by annotation. In particular, user experience of admin interface can be controlled by the following annotations:
1. Sortable: whether one can sort the entire table by the given column.
2. Input Mode: whether we can have a dropdown menu for input this column, and what are the choices.

Annotation are designed to address specific use case. In this section, we will explain how each annotation can be used to declaratively define the desired conversational interface for given APIs or how to implement these service APIs declaratively. Each component is documented in three parts: overview introduce the use case where one might consider this component, related components need to be factored during the CUI building, and finally all the controls that builder can to use to control behavior, each with why, and how.

::: tip Overview
 - Help your end-user to understand the business boundaries.
 - Help your end-user focus on what they really want.   
 - Preferred, but not required. 
:::

There are two kinds of related components.
::: tip Related Component <Badge text="Preferred" />
 There is no strong dependence. Like music, one of the ways we make sense of our lives, while one can live a life without it.
:::

::: tip Related Component <Badge type="warning" text="Required" />
 There always need some support to work well. Just like the importance of water to we human beings.
:::
