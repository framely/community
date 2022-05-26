# Build Conversational Apps
 
At Framely, we are motivated by a simple question: both chatbot and app are user interfacing application providing same services, why should building bot cost much more than building app? We believe the high cost is the main reason that these magical conversational experiences are still elusive even when deep learning based NLU made huge stride in many NLU applications. Reducing the cost associated with chatbot building is the key to democratize conversational user experiences. 

Popular chatbot architecture typically break the conversational interaction logic into two components: state tracking and dialog policy, but rarely have operational definition in terms of how to define them. In Framely's view, interaction logic is largely application dependent, so it is important to provide tools so that application developer can easily implement the desired conversational interaction.

 Instead of trying to respond intelligently to any user utterances, or solve generic language understanding problem, Framely focuses on building schema grounded conversational user interface that only handles the conversation about the services, defined by its API schema. On the input end, such schema grounded conversational interface allows a user to specify which service function they want, and then interact on corresponding input parameters for how they want to be served. On the output end, bot produces dialog act in form of structured data first, and then rendered into natural text in the given language and style using text generation model. The core of interaction logic should be reasoned and defined by a language independent schema. 

## Why Framely
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

## Before You Start

Framely is a low code platform allow you to build schema grounded conversational user interface (CUI) for you service APIs, in a declarative and component based fashion. It is designed to help regular business development team build great CUI for your service, without hiring special talents like NLU Ph.D on your team. Instead of focusing on the conversations, Framely allows you to focus on the data structures, APIs and interaction logic, and takes care of context dependent dialog understanding based on just a few examples. To take full advantage of Framely, these are the couple things you might want to get ready. 

### APIs for the Services

First you need to decide what service you want to provide through chatbot. For example, if you are restaurant, you might decide that you want to expose table reservation, and food order, hours, direction, and maybe jobs. Each of these functionalities or what we call them service should be decided before you try to build the related chatbot. 

Framely can only help you to build CUI, you will have to build your service and make them available via some APIs. Framely can integrate easily with native Java/Koltin service providers and restful providers. And you can make use of full stack component on the Framely repository.

### Interaction Logic Owner

As with any user facing application, someone needs to own the interaction logic. As conversational application, the mode of the interaction is via language text. However, conversational user interface in Framely are schema grounded, which basically means that interaction can be expressed/reasoned in a language independent fashion, in form of dialog act. 

The success of any chatbot project requires you have a CUI product manager. This person should have direct access to product owner, and can make tradeoff between features. Ideally this person understands your business really well (a must), and have background in the CUI (a good to have). It is understood that there are not many people with CUI product experience, which is ok. Framely has a well-defined declarative way of defining interaction logic, the learning curve is very friendly.


### Have operation team ready
Create the CUI for your business is just the first step, you need to have operation team, so you can bring the chatbot online. This is important for two reasons. First language is very complex things, it is hard for you to get it dialog understanding right in one shot, so it is essential to monitor the actual conversations and provide expression to continuously to improve dialog understanding for your domain. Second, with CUI, a user can ask for services that you are not prepared, this is a good opportunity for you to figure out what other features should be developed next. The good thing about CUI is, you do not have to educate your user, if they need a feature, they will find you.

### Budget engineering resource 
When you need to work with channels/support/services that is not currently supported by Framely runtime, you will need to budget some engineering resource. Framely's extensible due to its plug-and-play design, but it will require you have engineering resource.


## Quick Start
Although one can use Framely to serve user's informational need, we designed Framely to help 
you to build conversation user interface for your transactional service as well, so that your chatbot can be one stop conversational solution for all your users' need. 

### Build
Assuming that you have designed and implemented your valuable services already, and now you want to build conversational user interface for these services. On [Framely](https://framely.naturali.io) this can be done in three easy steps. 

#### 1. Describe Services at Schema Level
Services are typically represented by a set of functions. To invoke a particular function for users, we need to collect input parameters for that function from users and capture the function returns somehow. To support arbitrary input and output parameters, Framely support primitive data type in form of Entity, and composite data type in form of Frame and Intent, with polymorphism support built in. These types serve two different purposes: on one hand, they are actual types needed to invoke functions at code level; on the other hand, they are schemas that encode the semantics of what user meant based on dialog understanding model. This connection between representation of meaning and code that actually runs, is basis for our schema grounded conversational user interface.

#### 2. Interaction as Annotation
After specifying the type of information chatbot need to invoke service, builder can describe how this info should be collected. Instead of letting builder imperatively define the flow, Framely provides a set of interaction annotations that can be used declaratively define chatbot's behavior. This includes request information from user by prompting, different strategy that decide when chatbots actually engage in conversation for given slot, and how to offer user candidates based on business model, and so no. These annotations will give builder a framework to reason about conversational interaction towards service, and designing conversational user interface become answering these predefined questions. 

#### 3. Language Template and Exemplar
Conversational user interface are further partitioned into interaction logic and language perception, so naturally interaction annotation contains language related part. Once interaction annotation is decided, these language related parts became required. This makes supporting new languages very easy, after defining the interaction and selecting the language you want, all builder have to do is to fill language aspects of the interaction annotation, and they are done. There are two kind of language related parts builder need to fill: template for text generation, and utterance exemplars for helping dialog understanding.

### Test
After you specify desired conversational behavior you want your chatbot to deliver, you can use built in test tool to test out the interaction logic. This allows you quickly fix any potential issues before it causes bad user experiences.

### Deploy
When chatbot passes your test, you can deploy chatbot to production environment, either Framely hosted or public/private cloud of your choice (for paid account). Of course, before you do that, you want to configure the channels that you want to service, and wire support system where your human agent can pick up the failed conversations and provide user what they want.

### Operate
The real work starts after chatbot is deployed into production environment. It is important that you consistently monitor the actual conversation sessions users had with your chatbot, and fix any issues that chatbot had. Also notice these real user conversations are full of business opportunities if you know how to dig.

For the impatient, [you can get started now](https://framely.naturali.io). For the curious, read on.