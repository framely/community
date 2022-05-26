# Build Conversational Apps
 
At Framely, we are motivated by a simple question: both chatbot and app are user interfacing application providing same services, why should building bot cost much more than building app? We believe the high cost is the main reason that these magical conversational experiences are still elusive even when deep learning based NLU made huge stride in many NLU applications. Reducing the cost associated with chatbot building is the key to democratize conversational user experiences. 

Popular chatbot architecture typically break the conversational interaction logic into two components: state tracking and dialog policy, but rarely have operational definition in terms of how to define them. In Framely's view, interaction logic is largely application dependent, so it is important to provide tools so that application developer can easily implement the desired conversational interaction.

 Instead of trying to respond intelligently to any user utterances, or solve generic language understanding problem, Framely focuses on building schema grounded conversational user interface that only handles the conversation about the services, defined by its API schema. On the input end, such schema grounded conversational interface allows a user to specify which service function they want, and then interact on corresponding input parameters for how they want to be served. On the output end, bot produces dialog act in form of structured data first, and then rendered into natural text in the given language and style using text generation model. The core of interaction logic should be reasoned and defined by a language independent schema. 

## Stick to What Works
With declarative framework and component library like Vue and Antd, it is easy for domain expert with reasonable amount programming training to build great apps. Without good abstraction and these high level framework, building CUI can be a lot more demanding, you need Ph.Ds with NLU background, and as well as business experts that stay on top of the ever-changing business conditions.

To make building a bot as cost-effective as building app, we follow the same principles such as [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) and the same workflow such as [version control using git](https://en.wikipedia.org/wiki/Git) for collaboration. If something works, why change it? After all CUI and GUI are just different user interface to the same services.

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

