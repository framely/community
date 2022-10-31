# Overview

The goal of OpenCUI is to make it easy to build conversational user interface for functionalities. Many such functionality are not fully known at the time of initial design and implementation of OpenCUI, including application functionalities such as payment processing, and system ones such as channels to connect with users or contact center software to loop in live agents. To accommodate new requirements, OpenCUI follows an open architecture design so that new functionalities can be supported easily. 

Following the best practices, all functionalities on OpenCUI are modeled in two parts: interfaces and implementations, so that the producer and consumer of these functionalities can be developed independently. More importantly, conversational behaviors are only constructed against these interfaces, so it is possible to switch to different implementation.

The implementations of interface, we call providers, are available in two kinds: native providers, and scripted providers. Native providers are implementation developed in Java/Kotlin, system level interfaces are typically implemented in form of native providers. Scripted providers allow builder to implement in other script language, like SQL or Json. Application related interface, we call services, are typically implemented in scripted provider.  


## Native Providers
Native provider are developed in form of extensions. Extensions are software modules that are developed to supply one or more providers to platform. The OpenCUI are implemented in Kotlin, so naturally these extensions are developed as standard Kotlin module, using the standard tool chain like gradle, popular framework spring boot. The extension are developed in four simple steps:
1. Define the interface on the OpenCUI platform (builder can only do this at application level, for services). 
2. Generate the code stub for these interfaces as basis for implementation.
3. Develop the extension. You are encouraged to contribute your extension to opencui/extensions.
4. Register each provider developed in the extension on the platform so that it can be wired to chatbots thus provide its version of implementation to these chatbots.

These native provider can be registered as external, in which case, builder does not need to make its source available to OpenCUI platform. The chatbot that relies on even one external provider can NOT be hosted by OpenCUI, instead builder need export the generated kotlin project, and build and deploy it per their devops rules. Regardless if the providers are external, extension builder need to register their provider on the platform so that we can generate the frontend code for them. 

## Scripted Providers
OpenCUI relies on the service, application related interface, to interact with application backend. Service defines the APIs for how these functionalities can be accessed, and their implementation are typically provided in form of scripted providers. We support two kinds of scripted provider types: hosted provider type and stub provider type.

1. [Postgrest](./postgrest.md) is the only hosted provider type OpenCUI currently supports. By hosted, it means OpenCUI manages the schema of the data source so that we can clone database for new business, as well as hosting the database itself. 

2. On the other hand, OpenCUI does not host data for stub providers, nor we have explicit knowledge about the data schema, so we assume we only handles function invocation through these stub providers. There will be many stub provider types, the first one we implemented are [Google Sheets](./googlesheets.md) based.  


Scripted provider are typically defined in three steps:
1. Define service, application dependent interface, on platform.
2. Pick connection. How scripted provider works are depending on the connection. Connection provider the access to the actual data source, and also decide what script language can be used to define implementation of each function declared in the service interface.
3. Use script language required by connection to implement the service functions. Function can always be implemented in Kotlin, known as native functions.