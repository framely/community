---
title: Basic concept
---

# Basic concept

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