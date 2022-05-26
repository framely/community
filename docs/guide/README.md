# Schema Grounded Approach
 
Just like their web and mobile counterparts, conversational apps, including chatbots and voicebots, are user facing applications that business build to provide services to their user. However, despite recent advances in natural language understanding (NLU) research, the magical user experiences promised by conversational apps are still elusive and only offered by these privileged. 

Why most businesses can afford to build web app, but not the conversational one with the same functionalities? This simple question motivated us to take on the challenge of democratizing conversational user experiences. Since user interface is largely business logic dependent, business logic can and will vary from business to business, instead of building entire conversational app for businesses, we aim to provide conversational interface building tools that empower business developer to build conversational experience themselves.

 Users interact with a business because it can do something better or cheaper, so there is no need to respond intelligently to all possible user utterances. For any given business, it is enough to focuses only on the conversations related to the service that business provides, which is defined by its API schema. Framely is a framework for building schema grounded conversational interface. In this schema ground approach, the goal is to build conversational interface for data types required by API schema, natural language text and voice are converted into schemas first, which represents what service users want and how they want it. Structured data returned from business logic is then rendered into natural text in the given language and style.


## Why Build CUI Framely
To make building conversational app as cost-effective as building graphical user interface (GUI) app, we follow the same principles such as [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) and the same workflow such as [version control using git](https://en.wikipedia.org/wiki/Git) for collaboration. If these principles and best practices worked well for building GUI apps, why change them? After all CUI and GUI are just different user interface to the same services.

### Separation of Concerns
The division of labor, or separation of concerns is essential for increasing productivity and reducing the cost of building things. Along the line of model-view-controller for building graphical user interface, we decompose a chatbot into 3 layers: service, interaction and language perception (both understanding and text generation). In most cases, services already exist, we just need to build interaction for it, so that we can trigger service based on what a user wants. It should be clear that interaction logic is largely decided underlying service but constrained by conversation principles, independent of which language is used. By decoupling CUI from service, and the interaction from language, we can save cost by having different people working different aspects, at the same time make supporting multiple language very easy.

### Declarative Framework
All software development is about translating product/feature requirement in the owner's head into executable code on computer, imperatively and declaratively. Imperative programming emphasizes direct instruction on how the program executes functions. So developers need to understand both business logic and how things are done at low level as they need to describe step-by-step how the desired functionality should be implemented. On the other end of the spectrum, declarative programming places much of its focus on the overall goal and intended outcome of a program's operations. Developers don't necessarily have to worry about technical details of how things are done.

Of course, in the end, the computer still needs to know how to do things. A declarative framework provides a set of primitives each with clearly defined semantics so that builder can use to describe the desired behavior, while leave the implementation of these primitives to the domain experts. A well-designed declarative framework is essential for adopting the separation of concerns principle, so builder can now focus on describing what user experience they want to deliver, without the need to go through potentially steep learning curve, like get a Ph.D in ML/NLU to learn how things should be done. 

### Component Library
Building things from scratch is slow and expensive. By packaging the solution for well-defined use cases, such as recommending a list of items and asking users which one they like, into a reusable (meaning composable and reconfigurable) module or component, we can then integrate them into bigger and bigger solutions to deliver the desired conversational user experience. This way of building chatbot can save both time and cost, and users can enjoy higher quality experience because of the components can be built and maintained by specialized professionals.

### Dialog Understanding without Ph.D.
Human language are messy, and understanding it is hard as the different texts can mean the same thing and also the same text can mean different things in different contexts. This is one of the key complications of building conversational user interface. The popular approach rely on standard ML/NLU tasks like text classification and named entity recognition. While these standard tasks are well studied, applying them to new business use case requires effective customization, which typically call for serious thus costly expertise in ML/NLU. Framely focuses on a schema grounded conversational user interface, and use a set of ML/NLU models that very easy for regular dev team to effectively customize for any use cases with just utterance exemplars and template, entirely drop the need for having a Ph.D holder on your team.

## What We are Not?
Under the hood, we take advantage of the state of the art deep learning based natural language models that are production friendly. But conversational AI is just a means to develop conversational applications, not the goal. There are many other directions that have been tried in the industry and academia, while we are learning as much as possible from this large body of prior work, there are some trendy things we decide against. So if you want to try these approaches, look else where.

### End to End
Chatbots are developed to deliver services with good user experiences. However, good user experience alone may not be the enough motivation for a business to build one.

::: story
User: *I like some iced coffee.*

Barista: *Sorry, we ran out, but the Starbucks next door has some excellent choices.*
:::

It is good user experience alright, but as a coffee shop owner, you might not want to invest towards this chatbot. To achieve your business goal, you need to have direct and full control of your chatbot so that you can react to ever-changing business conditions. 

Being able to create a well-functioning chatbot by just looking at past conversations is such an appealing idea that there is so much effort around this, from both academia and industry. But this example based on end to end approach, commonly under the name of conversational AI, is not a good idea from the production point of view. Communicating rules in form of examples is not efficient for long tail scenarios. 

### Flow Based Approach
Business logic is typically described as processes. Under graphical user interface, builders have full control of what a user can do at each step of interaction, so flow based definition works well. For conversational interaction, users can say anything they like at any point, and in any order. Without some sort of factorization, the possible conversational paths needed modeling by flow based approach will grow exponentially as complexity grows. Thus flow based approach to define conversational interaction become prohibitively costly. It is clear that humans do not follow a fixed script during conversation, so in theory it is possible for a builder to specify how a bot should behave under necessary and sufficient conditions, and chatbot can try to figure out what to do no matter how conversation reached here.   

### Low Level Library
Conversational experience can also be built directly at the code level. While this provides the most flexibility, building chatbot at this level is hard to escape from the implementation details like intent classification and slot filling. This will force builder to switch back and forth between business logic and language understanding, which will slow the building process down, and cost more for business to get what they want.

