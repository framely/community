---
article: true
date: 2023-01-03

image:
    - blog/banner/chatbot_development_with_opencui.png
description:
    - Reduce complexity of building functional chatbot
author: Sean Wu
---

# Chatbot Development with OpenCUI
![Banner](/images/blog/banner/chatbot_development_with_opencui.png)

Modern graphical user interface (GUI) applications are typically decomposed into frontend and backend, which are connected by predefined service APIs. Backends provide the implementation of these APIs, which are then consumed by frontends developed on mobile, web and messaging platforms. Frontends are further decomposed into perception layer and interaction logic layer according to model-view-controller design pattern. Different tasks can then be handled by different people who specialized in that task. Specializing allows individuals to become more skilled and efficient at that task, which can result in reduced costs and improved quality. Unfortunately, while there are frontend framework Vue or SwiftUI make division of labor possible for GUI development, we do not have something equivalent for conversational user interface (CUI) development, that is until OpenCUI.

OpenCUI is open source CUI framework designed to greatly reduce the complexity of building functional chatbot that deliver business result. It promotes a [4 layers approach](https://opencui.medium.com/4-layers-of-chatbot-658ccceea382) so that business can benefit from division of labor when implementing chatbot. Since chatbot are CUI based instead of GUI based, we have to make some adaptations. 

Existing chatbot building method requires training dedicated machine learning models for each chatbot, so you have to add talent with machine learning and natural language understanding background to the team. For OpenCUI, however, its dialog understanding (DU) module make use of the transformer based large language model (LLM), the same technology that made ChatGPT tick. The same magic allow single DU model to understand user intention in arbitrary domains, so there is no training involved. The behavior of dialog understanding (DU) module, including the wiring of the understanding to the rest of interaction logic, can be defined and hot-fixed simply by adding expression exemplar to right context, so everyone can do it. With this new type of dialog understanding, regular business development team can productively build chatbot along with the rest of UI applications. 

Today, most software are developed in procedure-based paradigms, where developers focus on specifying the sequence of operations that the code should perform in order to achieve the desired result. OpenCUI instead supports a component-based approach where software development are divided into component development and application development. Component development is responsible for the design and implementation of reusable component, and application development can then be simplified to picking prefabricated, often third party components and integrating them together. The key requirement on components are black box composable, this means that the using of a component, including integrating it into a bigger one only require the knowledge about what this component do, not how this component do it. If one wires the component based on required interface, the bigger component should just work. This approach of application building allows builder only to focus on what they want, which result in high productivity. 

To build conversational user interface for any service, OpenCUI uses a data system that is based on the OpenAPI, with support for user defined data type, list, inheritance and polymorphism. With this type system, we can define function signatures (known as services in OpenCUI), and parameter type (known as frames and entities). OpenCUI provides a set of system components known as annotations, by simply configuring annotation on the function signature or required parameter type, builder can specify how API functions can be triggered through conversation. 

There are other things we introduced to make building full fledged chatbot has never been easier, like using contextual snippet for documenting user interaction requirement and design, using SQL to implement service provider directly. To get started, here is a list of the tutorials that can show you how. 

1. Build a table reservation chatbot from scratch. You can learn how to use Postgrest to implement reservation service, as well as building reservation CUI component and make a chatbot out of it.
    1. [Requirements on Reservation Chatbot](requirements-on-reservation.md)
    2. [Implement Reservation Service using Postgrest](how-to-build-a-reservation-service.md)
    3. [Build Table Reservation Component/Chatbot](how-to-build-a-reservation-chatbot.md) 