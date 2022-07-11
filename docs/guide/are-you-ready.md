# Before You Start

Framely is a low code platform that allows you to build schema grounded conversational user interface (CUI) for your service APIs, in a declarative and component based fashion. It is designed to help regular business development team build great CUI for your service, without hiring special talents like NLU Ph.D on your team. Instead of focusing on the conversations, Framely allows you to focus on the data structures, APIs and interaction logic and takes care of context dependent dialog understanding based on just a few examples. To take full advantage of Framely, these are the couple things you might want to get ready. 

## APIs for the Services

First you need to decide what service you want to provide through chatbot. For example, if you are restaurant, you might decide that you want to expose table reservation, food orders, hours, direction and maybe jobs. Each of these functionalities or what we call them service should be decided before you try to build the related chatbot. 

Framely can only help you to build CUI, you will have to build your service and make them available via some APIs. Framely can integrate easily with native Java/Koltin service providers and restful providers. And you can make use of full stack component on the Framely repository.

## Interaction Logic Owner

As with any user facing application, someone needs to own the interaction logic. As conversational application, the mode of the interaction is via language text. However, conversational user interface in Framely are schema grounded, which basically means that interaction can be expressed/reasoned in a language independent fashion, in form of dialog act. 

The success of any chatbot project requires you have a CUI product manager. This person should have direct access to product owner and can make tradeoff between features. Ideally this person understands your business really well (a must) and have background in the CUI (a good to have). It is understood that there are not many people with CUI product experience, which is ok. Framely has a well-defined declarative way of defining interaction logic, the learning curve is very friendly.


## Have operation team ready
Creating the CUI for your business is just the first step, you need to have operation team, so you can bring the chatbot online. This is important for two reasons. First, language is a very complex thing, it is hard for you to get it dialog understanding right in one shot, so it is essential to monitor the actual conversations and provide expression to continuously to improve dialog understanding for your domain. Second, with CUI, a user can ask for services that you are not prepared, this is a good opportunity for you to figure out what other features should be developed next. The good thing about CUI is, you do not have to educate your user, if they need a feature, they will find you.

## Budget engineering resource 
When you need to work with channels/support/services that is not currently supported by Framely runtime, you will need to budget some engineering resource. Framely's extensible due to its plug-and-play design, but it will require you to have engineering resource.
