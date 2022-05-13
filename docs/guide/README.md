# Why Framely

If you want to provide great conversational user experiences but worried about the cost associated with building and operating chatbot, then you come to the right place. Framely's goal is to reduce the cost of build and operate great conversational user interface for any services. After all, chatbot is just an app with conversational user interface, there is no reason building bot should cost significantly more than to building app that expose the same set of services.

## Who should build chatbot?
Man kind has fantasized about talking robot for a long time. In deed, chatbots attract broad interest because of its potential of bring great user experiences. However, why are these magical conversational experience in the movies not yet ubiquitous, particularly considering the availability of the app with same functionalities? What is the difference between building bot and building app? 

The difference is simply who is building it. No matter what you build, your team need to understand your business logic. With declarative framework and component library like reactjs and antd, any people with reasonable amount programming training can build great app. But to build bot, you need to have Ph.Ds on 
your team, and you need to teach them the ever-changing business logic for them to be effective.

## If something works, don't change it!

To make building bot as cost effective as building app, we simply follow the same principles such as [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) and the same workflow such as [version control using git for collaboration](https://en.wikipedia.org/wiki/Git). If something works, why change it? After all CUI and GUI are just different user interface to the same services.

### Separation of Concerns
The division of labor, or separation of concerns is essential for increasing productivity and reducing the cost of building things. Along the line of model-view-controller for building graphical user interface, we decompose chatbot into 3 layers: service, interaction and language perception (both understanding and text generation). In most cases, services already exist, we just need to build interaction for it, so that we can trigger service based on what user wants. It should be clear that interaction logic is largely decided underlying service but constrained by conversation principles, independent of which language is used. By decoupling CUI from service, and the interaction from language, we can save cost by having different people working different aspects, at the same time make supporting multiple language very easy.

### Declarative Framework
All software development is about translating product/feature requirement in owner's head into executable code on computer, imperatively and declaratively. Imperative programming emphasizes direct instruction on how the program executes functions. So developers need to understand both business logic and how things are done at low level as they need to describe step-by-step how the desired functionality should be implemented. On the other end of the spectrum, declarative programming places much of its focus on the overall goal and intended outcome of a program's operations. Developers don't necessarily have to worry about technical details of how things are done.

Of course, in the end, computer still need to know how to do thing. A declarative framework provides a set of primitives each with clearly defined semantics so that builder can use to describe the desired behavior, while leave the implementation of these primitives to the domain experts. A well-designed declarative framework is essential for adopting the separation of concerns principle, so builder can now focus on describing what user experience they want to deliver, without the need to go through potentially steep learning curve, like get a Ph.D in ML/NLU to learn how things should be done. 

### Component Library
Building thing from scratch is slow and expensive. By packaging the solution for well-defined use cases, such as recommending a list of items and asking user which one they like, into a reusable (meaning composable and reconfigurable) module or component, we can then integrate them into bigger and bigger solutions to deliver the desired conversational user experience. This way of building chatbot can save both time and cost, and user can enjoy higher quality experience because of the components can be built and maintained by specialized professionals.

### Dialog Understanding without Ph.D.
Human language are mess, and understanding it is hard as the different text can mean the same thing and the same text can mean different thing in different context. This is one of the key complications of building conversational user interface. The popular approach rely on standard ML/NLU tasks like text classification and named entity recognition. While these standard tasks are well studied, applying them to new business use case requires effective customization, which typically call for serious thus costly expertise in ML/NLU. Framely focus on schema grounded conversational user interface, and use a set of ML/NLU models that every easy for regular dev team to effectively customize for any use cases with just utterance exemplars and template, entirely drop the need for having Ph.D on your team.

## Conclusion
Capable chatbot has been reserved for players with deep pocket, think Erica by Bank of America, but we are here to change that. By providing a declarative and component based approach to build schema grounded conversational user interface to any services, along with regularly updated NLU model, Framely make it possible for regular develop team to build and operate the capable conversational user experiences. We hope the resulted cost reduction can full democratize conversational experience for masses, so what are you waiting for?


## P.S. What we decide NOT to do?
There are many other directions that has been tried in the industry and academia, while we are learning as much as possible from this large body of prior work, these are some trendy things we decide against. So if you want to try these approaches, look else where. 

### End to End
Be able to create a well-functioned chatbot by just looking at past conversations when customers are served well is such an appealing idea that there is so much effort around this, from both academia and industry, but it is not a good idea from the production point of view. First it does not offer direct control, so it is difficult for builder to react ever-changing business conditions. 


### Flow Based Approach
Business logic are typically described as processes, so it is no wonder that flow is typically used to describe the desired interaction as well. Under graphical user interface, builder have full control what user can do at each step of interaction, so flow based definition works well. For conversational interaction, user might say anything they like at any point, and in any order, as long as what they said is relevant, chatobt need to respond in a reasonable fashion, using flow based approach to define user interaction thus become prohibitively costly, and the possible paths that builder need to cover can grow exponentially. It is clear that humans do not follow fixed script during conversation, so in theory it is possible that conversational behavior of the chatbot can be defined in a factorized fashion where builder specify how bot should behave under necessary and sufficient conditions, and chatbot can try to figure out what to do no matter how conversation reached here.   

### Low Level Tooling
Conversational experience can also be built at the code level, where builder need to understand all the details like intent classification and slot filling. While this provides the most flexibility, building chatbot at this level is hard to escape from the implementation details, it will force builder to switch back and forth between what they want and how things should be implemented. This will slow the building process down, and cost more for business to get what they want.
