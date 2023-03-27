# Cost effective conversational experience
OpenCUI aims to greatly reduce the cost of building effective conversational user interfaces (CUIs) for your APIs using a [type based](../essentials/sgcui.md) approach. To invoke an API function that the user desires, the CUI need to create an instance of the corresponding function type. Under this approach, user input is first converted to a frame event, which is a structured representation of what the user wants, by dialog understanding (DU). Based on this frame event and the predefined interaction logic by the builder, dialog management (DM) generates a dialog act that solicits the user's preferences for missing information. Finally, text generation renders the dialog act into natural language in the required language and demographic.

This approach enables existing business development teams to build natural conversational user interfaces (CUIs) for their services. The main thing they need to focus on is the interaction logic, which defines what information the bot needs from the user in order to create the function instance required to invoke the function. Furthermore, language understanding can be handled independently of understanding business logic, allowing it to be managed by a fully decoupled team. Because of this, and the fact that interaction logic can be defined in a language-independent manner, there is no need to hire a machine learning or natural language understanding (NLU) PhD for your team. In fact, OpenCUI features an LLM-based language understanding model that can handle live traffic using only a few examples, and we continuously update the model as more data become available. Finally, if the type you need already has conversational behavior defined, you can reuse it instead of building from scratch, further saving effort.

To fully utilize OpenCUI, one needs to understand its type-grounded conceptual model. While it might be different from the flow based approach, this conceptual model is actually based on many best practices that we have accumulated over the years in building user interfaces. It is useful to get familiar with the basic concepts, and why we should build conversational user interface this way.

#### [Cooperative principle](cooperative.md)
To design the conversational user interface, we need to have a basic assumption on the users that we try to help. For businesses, it is useful to assume that users, once connect to the chatbot they build, are cooperative in nature, in a sense that they are here to get helped by your business.  

#### [Type-gournded CUI](sgcui.md)
Flow based approach is the dominant approach to build CUI, given the fact that we do not see the widespread adoption of chatbot, not even some really usable ones, it is time for us to find a alternative that designed ground up for conversational interaction.

#### [Fill the missing slots](slotfilling.md)
This guide walks you through how to create a basic chatbot on the OpenCUI platform. The sample provides a quick way to explore the functionality of a chatbot, and it can serve as a starting point for your chatbot development. 


#### [A CUI maturity model](5levels-cui.md)
Cloning an existing project is the fastest way to start play with it. This guide show you how to clone a project, so that you do not have to start from scratch.

#### [Do not start from scratch](components.md)
Before you deploy your bot to production environment, you can test its behavior using the builtin **Debug** tool.


#### [Runtime makes it tick](architecture.md)
Reusable module can greatly reduce the cost of building chatbot. In this guide, we show you how to import a table reservation module, configure the provider so that you can start to provide table reservation through conversational user interface in no time.


For the impatient, [you can get started now](https://build.opencui.io).
