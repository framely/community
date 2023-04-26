# Got team?
Most existing chatbot platforms adopt a flow-based approach to define CUI, making them imperative in nature. These platforms are mainly designed to help developers or coders. On the other hand, OpenCUI is a high-ceiling, low-code, declarative platform due to its type-grounded nature, and is primarily designed for product managers. However, developing chatbots is a serious software development undertaking that requires proper staffing. Here some major roles needed:

## Product manager
Interaction logic is used to decide what to respond to the user and reach the business goal, based on the conversation context, including but not limited to the current user utterance, user profile, session history, and business conditions such as inventories. Obviously, interaction logic is based on business logic, as well as general conversational experience design principles.

The success of any chatbot project requires having a CUI product manager. This person should have direct access to the business owner and be able to make tradeoffs between features, the level of CUI supported, as well as cost and time. Ideally, this person should have a good understanding of your business (which is a must) and a background in CUI (which is good to have). Conversational user interfaces in OpenCUI are type-grounded, which means that interactions can be expressed and reasoned in a language-independent fashion through dialog acts. OpenCUI is opinionated, and the interaction logic defined on the platform is generally effective.

So, the main task for the product manager is to declare the desired interaction logic, which is not too difficult to do. However, before that, you need to decide which services you want to expose through the chatbot, for which you need your software architect.

## Architect
A software architect is responsible for defining the service APIs. After the API is designed and implemented, the service, including the set of functions and the types required by these functions, needs to be declared on the platform before you can build a provider for these services. Providers are used to access the actual implementation, and OpenCUI supports native Java/Kotlin providers and RESTful providers, among others. To build native providers, you need your developers.

## Developers
If you need to work with channels, support, or services that are not currently supported by the OpenCUI runtime, you will need a developer. OpenCUI is extensible due to its plug-and-play design, so extending it is not difficult. You might also need developers to help express complex interaction logic on the platform.

## Script designer
To support each language, you need to have script designers who can express the meaning conveyed in the dialog act with appropriate style and nuance.

## Operation team
Developing and deploying your chatbot is just the first step. You also need to have an operations team in place. This is important for two reasons. First, language is a very complex thing, making it hard to get dialogue understanding right in one shot. Therefore, it's essential to monitor actual conversations and provide utterance exemplars to continuously improve dialogue understanding for your domain. Second, with CUI, a user can ask for services that you may not be prepared for. This is a good opportunity for you to figure out what other features should be developed next. The good thing about CUI is that you never have to educate your user. If they need a feature, they will tell you.
