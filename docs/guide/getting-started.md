# Getting Started
Although one can use Framely to serve user's informational need, we designed Framely to help 
you to build conversation user interface for your transactional service as well, so that your chatbot can be one stop conversational solution for all your users' need. 

## Build
Assuming that you have designed and implemented your valuable services already, and now you want to build conversational user interface for these services. On [Framely](https://framely.naturali.io) this can be done in three easy steps. 

### 1. Describe Services at Schema Level
Services are typically represented by a set of functions. To invoke a particular function for users, we need to collect input parameters for that function from users and capture the function returns somehow. To support arbitrary input and output parameters, Framely support primitive data type in form of Entity, and composite data type in form of Frame and Intent, with polymorphism support built in. These types serve two different purposes: on one hand, they are actual types needed to invoke functions at code level; on the other hand, they are schemas that encode the semantics of what user meant based on dialog understanding model. This connection between representation of meaning and code that actually runs, is basis for our schema grounded conversational user interface.

### 2. Interaction as Annotation
After specifying the type of information chatbot need to invoke service, builder can describe how this info should be collected. Instead of letting builder imperatively define the flow, Framely provides a set of interaction annotations that can be used declaratively define chatbot's behavior. This includes request information from user by prompting, different strategy that decide when chatbots actually engage in conversation for given slot, and how to offer user candidates based on business model, and so no. These annotations will give builder a framework to reason about conversational interaction towards service, and designing conversational user interface become answering these predefined questions. 

### 3. Language Template and Exemplar
Conversational user interface are further partitioned into interaction logic and language perception, so naturally interaction annotation contains language related part. Once interaction annotation is decided, these language related parts became required. This makes supporting new languages very easy, after defining the interaction and selecting the language you want, all builder have to do is to fill language aspects of the interaction annotation, and they are done. There are two kind of language related parts builder need to fill: template for text generation, and utterance exemplars for helping dialog understanding.

## Test
After you specify desired conversational behavior you want your chatbot to deliver, you can use built in test tool to test out the interaction logic. This allows you quickly fix any potential issues before it causes bad user experiences.

## Deploy
When chatbot passes your test, you can deploy chatbot to production environment, either Framely hosted or public/private cloud of your choice (for paid account). Of course, before you do that, you want to configure the channels that you want to service, and wire support system where your human agent can pick up the failed conversations and provide user what they want.

## Operate
The real work starts after chatbot is deployed into production environment. It is important that you consistently monitor the actual conversation sessions users had with your chatbot, and fix any issues that chatbot had. Also notice these real user conversations are full of business opportunities if you know how to dig.

For the impatient, [you can get started now](https://framely.naturali.io). For the curious, read on.