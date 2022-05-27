# Schema Grounded Approach
 
Just like their web and mobile counterparts, conversational apps, including chatbots and voicebots, are user facing applications that business build to provide services to their user. However, despite recent advances in natural language understanding (NLU) research, the magical user experiences promised by conversational apps are still elusive and only offered by these privileged. 

Why most businesses can afford to build web app, but not the conversational one with the same functionalities? This simple question motivated us to take on the challenge of democratizing conversational user experiences. Since user interface is largely business logic dependent, business logic can and will vary from business to business, instead of building entire conversational app for businesses, we aim to provide conversational interface building tools that empower business developer to build conversational experience themselves.

 Users interact with a business because it can do something better or cheaper, so there is no need to respond intelligently to all possible user utterances. For any given business, it is enough to focuses only on the conversations related to the service that business provides, which is defined by its API schema. Framely is a framework for building schema grounded conversational interface. In this schema ground approach, the goal is to build conversational interface for data types required by API schema, natural language text and voice are converted into schemas first, which represents what service users want and how they want it. Structured data returned from business logic is then rendered into natural text in the given language and style.

## Why Build CUI Framely
To make building conversational app as cost-effective as building graphical user interface (GUI) app, we follow the same principles such as [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) and the same workflow such as [version control using git](https://en.wikipedia.org/wiki/Git) for collaboration. If these principles and best practices worked well for building GUI apps, why change them? Frameworks like Vue allow a domain expert with reasonable programming training to build great web apps, why we do not have such framework for building CUI? After all CUI and GUI can be just different user interface to the same services.

### Separation of Concerns
Separation of concerns is essential in increasing productivity and reducing the cost of building things. We decompose chatbot into 3 layers: service, interaction and language perception (both understanding and text generation). Framely only focuses on interaction and language layer. It should be clear that interaction logic is largely decided by underlying service and also constrained by conversation principles, but independent of which language is used. By decoupling CUI from service, and the interaction from language, we can save cost by having different people working on different aspects, at the same time make supporting multiple language very easy.

### Declarative Framework
Declarative programming places much of its focus on the overall goal and intended outcome of a program's operations. Developers don't necessarily have to worry about technical details of how things are done. A declarative framework provides a set of primitives each with clearly defined semantics so that builder can use to describe the desired behavior while leaving the implementation of these primitives to the domain experts. A well-designed declarative framework is essential for adopting the separation of concerns principle so builder can now focus on describing what user experience they want to deliver.

### Component Approach
Instead of building things from scratch, the solution for well-defined use cases, such as recommending a list of items for user to choose one from, can be packaged into a reusable (meaning composable and reconfigurable) module or component, which can then be integrated into bigger and bigger solutions to deliver the desired experience. This component based approach can save both time and cost, and users can enjoy higher quality experience because the components can be built and maintained by specialized professionals.

### Dialog Understanding without Ph.D.
Understanding human language is hard as the different texts can mean the same and also the meaning of the same can change by contexts. This is one of the key complications of building conversational user interface. The popular approach rely on standard ML/NLU tasks like text classification and named entity recognition. While these standard tasks are well studied, applying them to new business use case requires serious customization, which typically call for expensive expertise in ML/NLU. Based on clear separation between interaction and language encouraged by schema grounded CUI, Framely use a set of production friendly ML/NLU models that very easy for regular dev team to customize for any use cases with just utterance exemplars and template.

## What Framely is Not?
Under the hood, we take advantage of the state of the art deep learning based natural language models that are production friendly. But conversational AI is just a means to develop conversational applications, not the goal. There are many other directions that have been tried in the industry and academia, while we are learning as much as possible from this large body of prior work, there are some trendy things we decide against. So if you want to try these approaches, look else where.

### End to End
Chatbots are developed to deliver services with good user experiences. However, good user experience alone may not be enough motivation for a business to build one.

::: story
User: *I would like some iced coffee.*

Barista: *Sorry, we ran out, but the Starbucks next door has some excellent choices.*
:::

It is good user experience alright, but as a coffee shop owner, you might not want to invest towards this chatbot. To achieve your business goal, you need to have direct and full control of your chatbot so that you can react to ever-changing business conditions.

Being able to create a well-functioning chatbot by just looking at past conversations is such an appealing idea that there is so much effort around this, from both academia and industry. But this example based on end to end approach, commonly under the name of conversational AI, is not a good idea from the production point of view. Communicating rules in form of examples is not efficient for long tail scenarios.

### Flow Based Approach
Business logic is typically described as processes. Full control of each step a user takes is possible in graphical user interfaces but not in conversational interaction. Without some sort of factorization, the possible conversational paths needed by flow based modeling approach grows exponentially with complexity. Thus flow based approach to define conversational interaction becomes prohibitively costly.

### Low Level Library
Conversational experiences built on code level provide the most flexibility, but it is hard to escape implementation details like intent classification and slot filling. This forces the builder to switch back and forth between business logic and language understanding which slows the building process and raises cost unnecessarily.
