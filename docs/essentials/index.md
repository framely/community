# Cost-effective conversational experience

The flow-based approach, widely used in building user interface applications, models both user input and system response as turn-by-turn chains. Defining the system’s response in the chain gives developers complete control over interactions, making it easier to achieve business objectives and provide an excellent user experience.

However, defining the system’s response in this way does not reveal why a particular response is necessary. When a current interaction is not covered by predefined flows, the system simply does not know what to do, leading to the infamous chatbot response, ‘I don’t understand’.

To prevent such a bad user experience, developers must carefully cover every possible interaction flow that a user can get into under this imperative setting. This is not too difficult for graphical user interface (GUI) applications since users can only interact with the system in predefined ways. However, since conversational user interfaces (CUIs) allow users to say anything at any turn, developers are forced to pick their poison: either attempt to enumerate an exponentially increasing number of conversational paths, leading to significant cost overruns, or risk providing a poor user experience by omitting some conversational paths.

We propose a type-based approach to building chatbots called OpenCUI. To see how this approach can provide a good user experience and allow businesses to have complete control without the need to enumerate all possible conversation paths, let’s first examine how chatbots work.

## Three layers
A chatbot is an application that provides services through a conversational user interface (CUI). To support multiple languages with a single interaction logic, a chatbot often processes user input in three steps:
1. **Convert the user’s utterance into an event**, which represents the meaning of the user’s statement in a language-independent manner.
2. **Use the builder-defined interaction logic to generate a dialog act based on the event, the current dialog state, and the service function returns**. The dialog act is a language-independent representation of the message that the chatbot needs to send to users.
3. **Render the dialog act back to the user in the natural language**.

![type-based cui](/images/guide/pingpong/urr.png)

Clearly, chatbots operate in three layers:
1. The schema layer exposes valuable APIs that can be shared across different frontends, including web and mobile apps. These APIs are implemented in the backend, where businesses create value for their users.
2. The interaction layer’s responsibility is to per business’s objective, guide the conversation towards a service that users can benefit from, even if it wasn’t the one they had in mind initially. It relies on service APIs to make the conversation effective.
3. The language layer converts natural language text into structural representations of meaning and vice versa.

The interaction logic is defined in a language-independent logical space, which makes it easier to provide a consistent user experience across different languages. This also allows the existing development team to incorporate the goals and strategies of the business application into the conversational interaction.

## CUI creates callable instances
To invoke one of the service functions, the chatbot must create a callable instance of that function type through the conversations. This process also involves creating instances for the input parameters or recursively for attributes of these types if they are composite. Both input parameter of function and attribute of composite type are normally called slots, and creating instances of slots is commonly known as slot filling.

The chatbot can be built in three layers using a type based approach: first declare types at the schema layer, then attach dialog annotations onto these types at the interaction layer, and finally complete dialog annotations at the language layer by adding templates and exemplars. Dialog annotations specify the expected behavior of the chatbot during its building instances for different types. Here are some example dialog annotations:

- **Prompt** indicates how to prompt the user for their preferences on a slot.
- **Value recommendation** provides a list of candidates to the user for them to choose one from. You need to specify how to get the list, what happens if the list is empty or has only one item, and what to do if there are more items than what you can fit in one turn, etc.
- **Value check** defines what to do if the user’s initial preference is not serviceable, etc. Of course, you want to define how to check the value.

Taking movie ticketing as an example, the decisions you have to make at each layer are:

- **At schema layer**, skill `buyMovieTicket` should have the following slots. We assume the conversation happens in the logged-in session, so the user is known:
  :::info Skill `buyMovieTicket` schema layer
  1. `movieTitle`: **MovieTitle**. The title of the movie.
  2. `date`: **LocalDate**. The date of the movie ticket for.
  3. `showTime`: **LocaTime**. The time of the movie showing.
  4. `format`: **MovieFormat**. The format of the movie, e.g. IMAX 3D, Digital 3D, Standard.
  :::

- **At interaction layer**, you decide how to create an instance of each slot in a language-independent fashion.
  :::info Skill `buyMovieTicket` interaction layer
  1. `movieTitle`: required, prompt, value recommendation, value check.
  2. `date`: if the user did not mention a particular date, assume today.
  3. `showTime`: required, prompt, value recommendation, value check.
  4. `format`: prompt if the movie has more than one format available.
  :::

- **At language layer**, you define the template to render the dialog act into natural text and exemplar to showcase what semantics a natural language expression should be mapped into. For example, there is the prompt for each slot in English:
  :::info Skill `buyMovieTicket` language layer
  1. `movieTitle`: *"Which movie are you interested in?"*
  2. `showTime`: *"Great! Which showtime works best for you?"*
  3. `format`: *"Do you prefer IMAX or regular?"*
  :::

## Benefits, benefits and benefits
The separation of concerns in this three-layered approach allows developers to focus on specific tasks without worrying about the implementation details of other modules or layers, which can lead to more efficient development, easier debugging, greater code reuse, and reduced costs.

However, achieving a better separation of concerns is just one of the many advantages of using a type-based approach to build conversational user interfaces. This approach offers numerous other benefits that make it cost-effective to create exceptional conversational experiences.

### 1. Declarative trumps imperative
Dialog annotations consist of meticulously crafted declarative instructions that specify the desired conversational behavior for an instance of a type, often incrementally. This allows builders to focus on what they want to achieve rather than how to achieve it.

Once defined, the dialog annotations are executed by the OpenCUI runtime. Unlike a flow-based, imperative chatbot, which only knows how to respond to the user if the conversational path is defined, the OpenCUI runtime always knows the right way to respond. This is because the OpenCUI runtime is designed to greedily complete the instantiation of the function type. At any given turn, the chatbot only needs to identify the slot that is missing a value and fill it by executing the corresponding dialog instructions, regardless of the conversation path that led to that point. This eliminates the need to enumerate all potential interaction paths to provide a good user experience.

### 2. Reusable components
One of the cardinal sins in software development is to build everything from scratch. All type systems have built-in support for composition, so dialog-annotated types, also known as components, are naturally composable. Composability is great because it allows developers to build complex systems by assembling reusable and interchangeable components without the burden of maintaining them. This reduces development time and effort, while also promoting modularity and code reuse.

### 3. Simplified modeling
A type system lies at the core of OpenAPI, a widely adopted standard for declaring language-agnostic contracts for APIs. Since APIs involve the exchange of data between different systems or components, data types ensure that the exchanged data is well-formed, consistent, and interoperable. The OpenAPI type system supports modern concepts such as containers, inheritance, and polymorphism, in addition to user-defined data types.

While it is possible to simulate conversational behavior using a flow-based approach for these type system features, doing so puts a burden on the CUI builder and greatly increases the cost of building a good conversational experience. OpenC0UI supports almost every type system feature defined by OpenAPI 3.x at the CUI level for both input and output. This is achieved by using skills to conversationally expose functions, frames to classes, and entities to primitive types and enums. Thus, the builder can focus on modeling the application-level problem at an abstract level permitted by modern type systems instead of emulating the type system behavior at the core of the programming language.

### 4. Implicit context management
One of the defining characteristics of natural language is that the same word can have different meanings in different contexts. In flow-based approaches, context modeling typically requires explicit representation. By contrast, type-based approaches can leverage partially instantiated objects to serve this purpose. On the OpenCUI platform, there are template and exemplar input boxes for each slot and annotation. These annotations only come into play when the OpenCUI runtime attempts to create an object to fill the corresponding slot. Therefore, both response rendering and language understanding are inherently context-dependent.

### 5. Implicit language grounding
Large language models have fundamentally changed natural language understanding permanently. With a transformer architecture pretrained on vast amounts of natural text, these models are capable of delivering great performance under few, and even zero-shot settings. Gone are the days when you needed to train a new model for each service you wanted to offer. By formulating the dialog understanding problem into entailment and question answering, together with retrieval-augmented implementation, you can not only build a dialog understanding module with only a few examples but also simply add examples that the dialog understanding currently fails to understand, which is an effective way of hotfixing the understanding issue.

## Parting words
According to Gates, only two technologies have ever struck him as "revolutionary": the first is the modern graphical user interface (GUI). With its ease of use and gradually reduced cost of building GUI applications over the years, GUI applications have forever changed human civilization. Now, it is that time again — conversational user interface (CUI) has the potential to remove any barriers for any user to access any services. We hope type-based OpenCUI can help you build the great conversational experience your user deserve, without trapping you in the implementation details.

For the impatient, [you can get started now](https://build.opencui.io).