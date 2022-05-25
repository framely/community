# Conversational User Interface

At Framely, we are motivated by a simple question, why should bot building  cost more than an app when both are user interfacing applications and are exposed to the same set of APIs? High cost has limited these magical conversation experiences.

Popular chatbot architecture typically breaks the conversational interaction logic into two components:

- state tracking  
- dialog policy

These components rarely have operational definition in terms of how to define them. Interaction logic is largely application dependent. It is therefore important to provide easily implementable tools by application developer for desired conversational interaction.  

Framely focuses on building schema grounded conversational user interface that only handles the conversation about the services, defined by its API schema. Users inputs which service they want and the bot outputs a dialog act in form of structured data first and then rendered to natural text. The core of interaction logic should be reasoned and defined by a language independent schema.

## Stick to What Works

Frameworks like Vue allow a domain expert with reasonable programming trianing to build great apps and hence CUi building requires good abstractions and high level frameworks else its alot more demanding.

To make building a bot as cost-effective as possible, we follow the same principles such as [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) and the same workflow such as [version control using git](https://en.wikipedia.org/wiki/Git) for collaboration. If something works, why change it? After all CUI and GUI are just different user interface to the same services.

### Separation of Concerns

Separation of concerns is essential in increasing productivity and reducing the cost of building things. We decompose a chatbot into 3 layers:

- Service
- Interaction
- language perception (both understanding and text generation).

we only build triggers for already existent services a user may want in most cases. Interaction logic is largely decided underlying service but constrained by conversation principles, independent of which language is used. By decoupling CUI from service and the interaction from the language, we can save cost by having different people working different aspects at the same time making supporting multiple language very easy.

### Declarative Framework

 Declarative programming places much of its focus on the overall goal and intended outcome of a program's operations. Developers don't necessarily have to worry about technical details of how things are done.
 A declarative framework provides a set of primitives each with clearly defined semantics so that builder can use to describe the desired behavior while leaving the implementation of these primitives to the domain experts. A well-designed declarative framework is essential for adopting the separation of concerns principle so builder can now focus on describing what user experience they want to deliver.

### Component Library

Building from scratch is slow and expensive and hence packaged solutions for well-defined use cases, such as recommending a list of items and asking a user which one they like, are reusable (meaning composable and reconfigurable) module or component and can be integrated into bigger and bigger solutions to deliver the desired conversational user experience.

This way can save both time and cost and a user can enjoy higher quality experience because components are maintained by specialzed professionals

### Dialog Understanding without Ph.D

Human language is a mess and understanding it is hard as different texts can mean the same thing or differentiated by context. This is one of the key complications of building conversational user interface. The popular approach rely on standard ML/NLU tasks like text classification and named entity recognition. While these standard tasks are well studied, applying them to a new business use case requires effective customization, which typically call for serious thus costly expertise in ML/NLU. Framely focuses on a schema grounded conversational user interface and use a set of ML/NLU models that are very easy for regular dev team to effectively customize for any use cases with just utterance exemplars and template.

## What We are Not?

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

Business logic is typically described as processes. Full control of each step a user takes is possible in graphical user interfaces but not in conversational interaction. Without some sort of factorization, the possible conversational paths needed in modeling by flow based approach grows exponentially with complexity. Thus flow based approach to define conversational interaction becomes prohibitively costly. It is clear that humans are unpredicatble during a conversation and therefore the builder can specify the behaviour of the bot when a conversation deviates.

### Low Level Library

Conversational experiences built on code level provide the most flexibility but it is hard to escape implementation details like intent classification and slot filling. This forces the builder to switch back and forth between business logic and language understanding which slows the building process and raises cost to meet business needs.
