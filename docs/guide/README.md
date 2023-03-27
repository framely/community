# From Beginner to Master
OpenCUI aims to greatly reduce the cost of building effective conversational user interfaces (CUIs) for your APIs using a [type based](../reference/sgcui.md) approach. To invoke an API function that the user desires, the CUI need to create an instance of the corresponding function type. Under this approach, user input is first converted to a frame event, which is a structured representation of what the user wants, by dialog understanding (DU). Based on this frame event and the predefined interaction logic by the builder, dialog management (DM) generates a dialog act that solicits the user's preferences for missing information. Finally, text generation renders the dialog act into natural language in the required language and demographic.

This approach enables existing business development teams to build natural conversational user interfaces (CUIs) for their services. The main thing they need to focus on is the interaction logic, which defines what information the bot needs from the user in order to create the function instance required to invoke the function. Furthermore, language understanding can be handled independently of understanding business logic, allowing it to be managed by a fully decoupled team. Because of this, and the fact that interaction logic can be defined in a language-independent manner, there is no need to hire a machine learning or natural language understanding (NLU) PhD for your team. In fact, OpenCUI features an LLM-based language understanding model that can handle live traffic using only a few examples, and we continuously update the model as more data become available. Finally, if the type you need already has conversational behavior defined, you can reuse it instead of building from scratch, further saving effort.

The OpenCUI platform can be useful at various stages of CUI development, such as development, testing, and deployment. In general, we assume service is defined and implemented separately. Once services is ready and declared on [the platform](https://build.opencui.io), the conversational user interface for those services can be constructed declaratively. 

To fully utilize OpenCUI, one needs to understand its type-grounded conceptual model, which may require some practice to become familiar with. To aid in this process, we have created a set of tutorials that will guide you through the steps of understanding the conceptual model and becoming skilled in utilizing OpenCUI to create outstanding conversational experiences.

#### [Wha is this for?](are-you-ready.md)
Most existing CUI platform are flow based thus is imperative in nature. Regardless whether it is no code or low code, these platform are designed to help developer. OpenCUI is designed to help product manager to declaratively define what they want, instead of how it is done. But it still takes a team to build a usable chatbot, who do you need?

#### [Sign up](signingup.md)
Before we fully open up, we required you signup first so that we can get some idea on how we can help you. All you need is a GitHub account, ideally with your email verified. 

#### [Clone a chatbot](start-with-clone.md)
Cloning an existing project is the fastest way to start play with it. This guide show you how to clone a project, so that you do not have to start from scratch.

#### [Test a chatbot](debug.md)
Before you deploy your bot to production environment, you can test its behavior using the builtin **Debug** tool.

#### [Build a simple chatbot](pingpong.md)
This guide walks you through how to create a basic chatbot on the OpenCUI platform. The sample provides a quick way to explore the functionality of a chatbot, and it can serve as a starting point for your chatbot development. 

#### [Import a module](quickstart-reservation.md)
Reusable module can greatly reduce the cost of building chatbot. In this guide, we show you how to import a table reservation module, configure the provider so that you can start to provide table reservation through conversational user interface in no time.

#### [Deploy a chatbot](quickstart-channel.md)
This guide walks you through how to use the builtin version control system to review and merge your change to master. It explains to you how chatbot work with messaging platform like Messenger, and shows you how to configure both side using Messenger as example. After going through this, you should be able to interact with your chatbot in Messenger. 


For the impatient, [you can get started now](https://build.opencui.io).
