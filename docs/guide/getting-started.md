# Quick Start
Although one can use Framely to serve user's informational need, we designed Framely to help 
you to provide transactional service conversationally as well, so that your conversational services can potentially become a revenue center instead of a cost center for you business, and it is simple, just build, test and deploy. 

## Build
To provide your valuable transactional services in conversational channels, you mainly need to build conversational user interface for these services. On Framely, this can be done declaratively by first specify what information we need to collect from user, how we collect in form of interaction logic, and also templates and exemplars needed for converting between language and application logic, or semantics if you have a natural language understanding background. These steps can be done declaratively on the [Framely platform](https://framely.naturali.io). 

### Service at Schema Level
Services are typically already existed in form of some APIs, and to invoke these service APIs for user, we need to collect input parameter from users. To make it easy to interacting with existing service, builder first define a set of functions and expose them as service. To support arbitrary input and output parameter, Framely support atomic data type in form of Entity, and composite data type in form of Frame and Intent, all these types are what you see is what you get at underlying kotlin code level. The defined artifacts serve two different purposes: on one hand, they are types we need to invoke functions at kotlin level; on the other hand, they are schemas that encode the semantics of what user meant based on dialog understanding model. This grounding, the connection between representation of meaning and actions that can change world, serves the bases for us to build conversational interface for existing services.

### Interaction as Annotation
After builder specify what information do bot need to invoke service function, builder can describe how this info should be collected. Based on the analysis of numerous service oriented conversations, Framely provides a set of dialog annotations that can define chatbot's behavior that is capable of conduct effectively arbitrary service oriented conversations. This includes request information from user by prompting, different strategy that decide under what condition we actually engage in conversation for given slot, and how to offer user candidates based on business model, and so no. These annotation will give a frame of thinking when it comes to conversational interaction towards service, and designing conversational user interface become answering these predefined questions. 

### Language Template and Exemplar
Part of dialog annotations are language related, and Framely make is very clear what are these. Multiple language support is built in, all you have to do is select the language you want, and fill the blank left for language aspects of the dialog annotation, and you are done. There are two kind of language related blanks builder need to fill: template for text generation, and utterance exemplars for helping dialog understanding.

## Test
After you specify what conversational behavior you want your chatbot to deliver, you can use built in try-it-now tool to test out the interaction logic. This allows you quickly fixe any potential issues, and make sure there is good one for deploy for real users.

## Deploy
When chatbot pass the test, you can deploy your chat to production environment, either Framely hosted or public/private cloud of your choice. 


For the impatient, [you can get started now](https://framely.naturali.io). For the curious, read on.