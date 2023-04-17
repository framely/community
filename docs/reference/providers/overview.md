# Overview

The goal of OpenCUI is to make it easy to build conversational user interfaces for services. Following best practices, all services on OpenCUI are modeled in two parts: interfaces and implementations, so that the producers and consumers of these functionalities can be developed independently. More importantly, conversational behaviors are based only on these interfaces, which makes it possible to switch to different implementations.

The implementations of interfaces, which we call providers, are available in two kinds: native providers and scripted providers. Native providers are implementations developed in Java/Kotlin, and system-level interfaces are typically implemented in the form of native providers. Scripted providers allow builders to implement in other script languages, such as SQL or JSON. Application-related interfaces, which we call services, are typically implemented in scripted providers.

Once you have a provider and the corresponding backend running, you need to wire this provider to its service interface in your chatbot, which allows the chatbot to communicate with the backend.

## Native Providers
Native providers are developed in the form of extensions, which are software modules developed to supply one or more providers to the platform. OpenCUI is implemented in Kotlin, so these extensions are naturally developed as standard Kotlin modules using standard toolchains like Gradle and popular framework Spring Boot. Extensions are developed in four simple steps:

1. Define the interface on the OpenCUI platform (builders can only do this at the application level for services).
2. Generate the code stubs for these interfaces as a basis for implementation.
3. Develop the extension. You are encouraged to contribute your extension to opencui/extensions.
4. Register each provider developed in the extension on the platform so that it can be wired to chatbots and provide its version of implementation to these chatbots.

These native providers can be registered as external, in which case the builder does not need to make its source available to the OpenCUI platform. However, if a chatbot relies on even one external provider, it cannot be hosted by OpenCUI. Instead, the builder needs to export the generated Kotlin project and build and deploy it according to their DevOps rules. Regardless of whether the providers are external, extension builders need to register their providers on the platform so that we can generate the frontend code for them.

For more details, see [Native Provider](native.md) or [extensions](extension.md).

## Scripted Providers
 
Sometimes, the backend implementations of a service are accessible through some scripted language like SQL or JSON instead of native code. The providers for these backends, known as scripted providers, come in two types: hosted provider type and stub provider type.

- OpenCUI currently supports only one hosted provider: PostgreSQL. When we say 'hosted,' we mean that OpenCUI manages the backend implementation, which includes the database, tables, and SQL-based function implementation.
- For stub providers, OpenCUI does not host any data or have explicit knowledge about the data schema. Instead, OpenCUI handles function invocation through them. There will be many stub provider types available, including a Google Sheets-based provider.
- 
Scripted providers are typically defined in three steps:

1. Define the service application-dependent interface on the platform.
2. Decide on the provider type you want. The provider type determines how to access the actual data source and what scripting language to use for each function implementation declared in the service interface.
3. Use the scripting language required by the provider type to implement the service functions. Functions can also be implemented in Kotlin, known as native functions.

See [PostgreSQL Provider](postgrest.md) for details.
