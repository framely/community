# Democratize conversational experience
One of the ultimate objectives of any business is to reduce the effort required by users to obtain the products and services they desire. Conversational user interfaces (CUIs) have long been seen as the ultimate human-computer interface, as they allow users to simply express what they want and get it without having to learn how the system should be interacted with.

However, despite the research and engineering efforts, compared to the countless graphical user interface (GUI) applications that have improved various aspects of our lives, usable conversational user interface (CUI) applications, or chatbots, are still nowhere to be found. 

If you believe that the vast availability discrepancy between CUI and GUI is due to numerous differences, you would be mistaken. In fact, there are only two main differences: first, human language is messy, as the same sentence can mean different things in different contexts, and many different sentences can mean the same thing; second, unlike with GUIs where users can only interact in the ways implemented for them, with CUIs, users can express anything at any given turn.

Although recent advancements in large language models (LLMs) have made language understanding an easier problem, enabling users to interact freely while also providing businesses with direct control of conversations to achieve their objectives pose significant challenges, particularly for the dominant, flow-based approach of building CUIs. 

OpenCUI aims to greatly reduce the cost of building effective conversational user interfaces (CUIs) for your APIs using a [type based](../essentials/sgcui.md) approach. To invoke an API function that the user desires, the CUI need to create an instance of the corresponding function type. Under this approach, user input is first converted to a frame event, which is a structured representation of what the user wants, by dialog understanding (DU). Based on this frame event and the predefined interaction logic by the builder, dialog management (DM) generates a dialog act that solicits the user's preferences for missing information. Finally, text generation renders the dialog act into natural language in the required language and demographic.

This approach enables existing business development teams to build natural conversational user interfaces (CUIs) for their services. The main thing they need to focus on is the interaction logic, which defines what information the bot needs from the user in order to create the function instance required to invoke the function. Furthermore, language understanding can be handled independently of understanding business logic, allowing it to be managed by a fully decoupled team. Because of this, and the fact that interaction logic can be defined in a language-independent manner, there is no need to hire a machine learning or natural language understanding (NLU) PhD for your team. In fact, OpenCUI features an LLM-based language understanding model that can handle live traffic using only a few examples, and we continuously update the model as more data become available. Finally, if the type you need already has conversational behavior defined, you can reuse it instead of building from scratch, further saving effort.

To fully utilize OpenCUI, one needs to understand its type-grounded conceptual model, which is actually based on many best practices accumulated over the years in building user interfaces. In this miniseries, we explain how should conversational user interfaces should be built, and why.

#### [Cooperative principle](cooperative.md)
To design the conversational user interface, we need to have a basic assumption on the users that we try to help. For businesses, it is useful to assume that users, once connect to the chatbot they build, are here to get helped by your business thus will be cooperative. This assumption can greatly reduce the complexity of the chatbot building.  

#### [Type-gournded CUI](sgcui.md)
The flow-based approach is the dominant method for building CUIs. However, given the lack of widespread adoption of chatbots, and the absence of truly usable ones, it is time to ask why this approach is not effective and find a solution that actually works.

#### [Fill the missing slots](slotfilling.md)
In order to invoke the API function that users desire, a CUI needs to create an instance of the function type. When the instance is not fully populated based on the information provided by the user so far, the CUI needs to guide the conversation so users can provide information to complete the instantiation.

#### [A CUI maturity model](5levels-cui.md)
Maturity model for CUI will make it easy for business to trade off between the cost and user experience, and provide road map for continuous improvement. 

#### [Do not start from scratch](components.md)
When you need a instance of some type, and someone already defined how to conversationally create an instance of that type, then there is no reason for you not to reuse that, if the conversational behavior is defined with right abstraction so that you can hook it up with your production system. User does not need to change how they express their desire. 

#### [Runtime makes it tick](architecture.md)
Flow-based CUI lay all the burden to builder, they need to imperatively define the conversational behavior for every conceivable conservation path, or the conversational experience will suffer. The type-grounded CUI allow builder to declare what conversational experience they want to deliver, but we need a power runtime to take care of the implementation details.


For the impatient, [you can get started now](https://build.opencui.io).
