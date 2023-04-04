# Cost-effective conversational experience
The flow-based approach is a popular method for developing graphical user interface (GUI) applications as it offers developers the ability to naturally incorporate business logic into user interactions. 

However, to provide a good user experience, developers need to carefully define every possible interaction flow. This is not a problem for GUIs since users can only interact with the GUI in the ways it was designed. However, with conversational user interfaces (CUIs), users can and will freely express themselves at any given turn. Building a CUI using the flow-based approach can be problematic, as developers are faced with a choice: either try to enumerate exponentially growing conversational paths, resulting in significant cost overruns, or risk providing a bad user experience.

So, how can we build a chatbot that gives users the freedom to express themselves while allowing businesses to have full control of the conversation? Let's take another look at what a chatbot really is for businesses.

### Type-based approach
The objective of chatbots is to provide services to users through a conversational user interface(CUI), where a service is an interface for a business capability that usually consists of a set of functions. These interfaces decouple the client from the provider, enabling software to be built independently and reused by different applications and systems.

The objective of CUI is to instantiate a function type or create an instance of that type through conversations. For composite types such as functions and user-defined classes, this involves identifying the type by its name and recursively filling the slots or creating instances for these slots (input parameters for functions or attributes for user-defined classes) at a language-independent schema level.

To do this, we first convert the user's utterance into an event. Given the event and the current dialog state, we then generate a dialog act by following interaction logic that greedily tries to complete the instantiation of the function type. Both events and dialog acts are language-independent representations of meaning, so the interaction logic can be reused for different languages. Once a function object is instantiated, the chatbot can invoke it and wrap the return in a dialog act. Finally, dialog acts are rendered back to the user in natural language.
### Three layers
Clearly, this type-based conversation can be built in three layers: we declare types at the schema layer, attach dialog annotations onto these types at the interaction logic layer, and finally complete dialog annotations at the language layer by adding templates and exemplars. This separation of concerns allows developers to focus on specific tasks without worrying about the implementation details of other modules or layers, which can lead to more efficient development, easier debugging, greater code reuse, and reduced costs.

Grounding CUI development in types at the schema level has some key advantages over conversation-driven development. The API schema provides a natural boundary for both design and implementation. Given the set of APIs, it should be immediately clear whether a given conversation is relevant or not. The API schema is typically the result of careful deliberation between the product owner and software architect, so it is usually normalized to be minimal and orthogonal. This means that similar functionalities are generally serviced by the same APIs, so there is no need to create an equivalence between user intention at the language level, as all we have to do is map language to the APIs.

One of the major challenges of building a CUI is that the builder does not have control over what the user can express at any given turn. This can be problematic for all flow-based CUI approaches, since the chatbot may not know how to proceed if the current conversational path is not defined by the builder. However, for type-based CUI, the goal of interaction logic is to greedily complete the instantiation of the function type. At any given state, the logic only needs to figure out which slot is missing a value and what the best strategy is to fill it. This decision can be made regardless of the conversational path that was followed to reach this state, so there is no need to enumerate an exponentially increasing number of conversational paths for the chatbot to be effective. The interaction logic is language independent, making it easy for existing business application developers to incorporate business goals and strategies to make the conversation relevant for both the user and the business.

With the business logic taken care of at the interaction layer, the main responsibility left for the language layer is the translation between structured data and natural language used by the general public. By adding some natural annotation to the types and their slots, current evidence suggests that this layer can largely be addressed through the use of large language models (LLMs) in a zero-shot learning setting. Therefore, there may be no need to hire natural language understanding talent for your team anymore.

Better separation of concerns is a sufficient condition for choosing a technology stack. OpenCUI was built with many other considerations to make it more attractive for those who want to build a great conversational experience without incurring cost overruns.

### Reusable component
Since all type systems have built-in support for composition, these types, along with annotations - let's call them [components](./components.md) - are naturally composable. Composability is a good thing because it enables developers to build complex systems by assembling small, reusable, and interchangeable components instead of always building from scratch. And here are some more.

### Principled assumption
To design a conversational user interface, we need to make some basic assumptions about the users we're trying to help. For businesses, it's useful to assume that users who connect to the chatbot are here to get help from their business and will be [cooperative](./cooperative.md). This assumption can greatly reduce the complexity of building the chatbot.

### A proper type system simplify modeling
OpenAPI is a widely adopted open-source standard that is used to declare language-agnostic contracts for APIs, making it easier for developers to communicate the functionality of their APIs. It requires a type system because APIs involve the exchange of data between different systems or components, and data types provide a way to ensure that the exchanged data is well-formed, consistent, and interoperable. Since the APIs specified in OpenAPI need to be mapped to client SDKs and server stubs in modern hosting languages before they can be used, the [OpenAPI type system](https://swagger.io/docs/specification/data-models/) supports modern concepts such as containers, inheritance, and polymorphism, in addition to user-defined data types.

While it is possible to simulate conversational behavior of these type system features using a flow-based approach, doing so puts a burden on the CUI builder and greatly increases the cost of building a good conversational experience. OpenCUI supports every type system feature defined by OpenAPI 3.x at the CUI level for both input and output by mapping conversationally exposed functions to skills, classes to frames, and primitive types and enums to entities. This way, the builder can focus on modeling the problem at an abstract level permitted by modern type systems.

### A maturity model for CUI only
In the spirit of separation of concerns, we developed a [maturity model for CUI](./5levels-cui.md). By taking the backend implementation out of the picture, this maturity model offers greater resolution on CUI-related issues. This makes it easier for businesses to balance cost and conversational experience, and provides a roadmap for continuous improvement on the conversational frontend.

### Implicit context management
One of the hallmarks of natural language is that the same word can have different meanings in different contexts, a data structure that summarizes the conversation so far. Many flow-based approaches need to explicitly model context. In type-based approaches, a partially instantiated object can serve this purpose. On the OpenCUI platform, there are template and exemplar input boxes for each slot and annotation. These annotations will only work when the OpenCUI runtime tries to create an object to fill the corresponding slot, so both response rendering and language understanding are naturally context-dependent.

### Open-soured runtime
The flow-based approach for CUIs places the burden solely on the builder, who must define the conversational behavior for every conceivable path, or else the conversational experience will suffer. In contrast, type-grounded CUIs allow builders to declare the conversational experience they want to deliver. To support this approach, we have open-sourced a powerful [runtime](./architecture.md) that takes care of the implementation details.

## Conclusion
According to Gates, only two technologies have ever struck him as 'revolutionary': the first is the modern graphical user interface (GUI). With its ease of use and gradually reduced cost of building GUI applications over the years, GUI applications have forever changed human civilization. Now, it is that time again - conversational user interface (CUI) has the potential to remove any barriers for any user to access any services. We hope this type-based approach can help you build the great conversational experience your user deserve, without breaking your bank.


For the impatient, [you can get started now](https://build.opencui.io).
