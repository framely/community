# From Beginner to Master
The OpenCUI platform can be useful at various stages of CUI development, such as development, testing, and deployment. In general, we assume that the service is defined and implemented separately. Once the service is ready and declared on [the platform](https://build.opencui.io), the conversational user interface for those services can be constructed declaratively.

To fully utilize OpenCUI, one needs to understand its type-based conceptual model, which may require some practice to become familiar with. To aid in this process, we have created a set of tutorials that will guide you through the steps of understanding the conceptual model and becoming skilled in utilizing OpenCUI to create outstanding conversational experiences.

#### [Who do you need?](are-you-ready.md)
Existing CUI platforms are typically flow-based and thus imperative, regardless of whether they're no-code or low-code. They primarily help developers in implementing chatbots. In contrast, OpenCUI aims to help product managers declaratively specify their requirements without worrying too much about implementation details, which the OpenCUI runtime carries out most of the heavy lifting. Nonetheless, creating a functional chatbot still requires a team effort, and this list the main roles required.

#### [Key concepts](concepts.md)
In order to follow this quick start series, it is useful to get familiar with the key concepts.

#### [Sign up](signingup.md)
Before we fully open up, we required you signup first so that we can get some idea on how we can help you. All you need is a GitHub account, ideally with your email verified. 

#### [Clone a chatbot](start-with-clone.md)
Cloning an existing project is the fastest way to start play with it. This guide show you how to clone a project, so that you do not have to start from scratch.

#### [Test a chatbot](debug.md)
Before you deploy your bot to production environment, you can test its behavior using the builtin **Debug** tool.

#### [Build a chatbot](pingpong.md)
This guide walks you through how to create a basic chatbot on the OpenCUI platform. The sample provides a quick way to explore the functionality of a chatbot, and it can serve as a starting point for your chatbot development. 

#### [Import a full-stack module](use-hours.md)
The main objective of OpenCUI is to provide conversational user interface for service APIs. One can declare a service in the module, and build CUI on top of it. The resulting module can then be reused by different business, simply by importing it into their chatbot, and create the required provider in the organization and wire it to the service. This guide show you how to add functionality to your chatbot by importing a module.

#### [Build a full-stack module](build-service.md)
This guide show you how to declare a service and define CUI for that service in a module, and as well as how to build a Postgrest provider for that service. Following this guide, you will understand how to build module/provider you reused in last guide.

#### [Deploy a chatbot](quickstart-channel.md)
This guide walks you through how to use the builtin version control system to review and merge your change to master. It explains to you how chatbot work with messaging platform like Messenger, and shows you how to configure both side using Messenger as example. After going through this, you should be able to interact with your chatbot in Messenger. 


For the impatient, [you can get started now](https://build.opencui.io).
