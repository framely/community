# Introduction

We started Framely after we realized that building and operating chatbot is unnecessarily hard and expensive, especially if we consider chatbot is just application with conversational user interface. After all, building app with graphical user interface nowadays is a lot more manageable in comparison. There are many reasons for this, but ignoring all the principles and best practices we learned over many years in building GUI application, thus not having tools with high level abstractions is a crucial one.

## The Goal
Framely is designed to make building effective conversational user interface (CUI) easy. There are three aspects worth mentioning. First, conversation is not the goal, but a means. The goal is to deliver service through conversation. Furthermore, we mainly focus on serving collaborative users, who are more interested in get served with the least effort on their part. Which means we should focus on understanding the common instead of obscure user utterances, and adopt dialog policy that try to bring the conversation toward serving as quickly as possible.

Second, while end user experience is the key reason for business to work on conversational services, we actually focus on builder experience when it comes to Framely design. We think it is builder's job to trade off between cost and user experience, and Framely just need to provide tools so builder can build user experience they want. Of course, we always try to provide the best possible default user experience when builder want to be lazy.

Third, we want not only to help business to build enjoyable conversational services, but also to greatly reduce the cost of building and operating such thing. In particular, we want to make it possible for the same engineering team that build out service have the ability to build the conversational user interface for it, without going through a steep learning curve. 

## How?

We try to achieve these goals toward Framely by simply take advantage of the lessons we learned, and principles such as [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) and best practices like [version control using git for collaboration](https://en.wikipedia.org/wiki/Git) we accumulated from the past 40+ years of building user facing application, particularly from building graphical user interface applications.

### Service, Interaction and Language
Following the separation of concerns, we assume that conversational services are always built in 3 layers: service, interaction and language (both understanding and text generation). In most cases, services already exist, we just need to build interaction for it, so that we can trigger service based on what user wants. It should be clear that interaction logic is generally only depending on underlying service and interaction design, and independent of which language user is speaking. By decoupling the interaction from language, we can save cost by having different people working different aspects, at the same time make supporting multiple language very easy.

### Declarative
Imperative programming emphasizes direct instruction on how the program executes functions. The code consists of a step-by-step sequence of command imperatives that dictate how the program implements desired functionality. Examples of imperative programming languages include C, C++, Java and Fortran.
Declarative programming places much of its focus on the overall goal and intended outcome of a program's operations. Developers don't necessarily have to mind how that desired outcome is accomplished, nor hardcode the program's control flow. SQL, HTML and CSS are some good examples of languages that take this approach.

Choosing support declarative approach can reduce the burden on builder's shoulder so that they can mainly focus on describe what user experience they want, instead of how to implement such experience.

### Component Based

some example.

## Why Not ...?
There are many other directions that has been tried in the industry and academia, why we decide against these?

### End to End
Be able to create a well-functioned chatbot by just looking at past conversations when customers are served well is such an appealing idea that there is so much effort around this, from both academia and industry, but it is not a good idea from the production point of view. First it does not offer direct control so it is difficult for builder to react ever-changing business conditions. 


### Drag and Drop

VitePress is the little brother of VuePress. It's also created and maintained by our Vue.js team. It's even more lightweight and faster than VuePress. However, as a tradeoff, it's more opinionated and less configurable. For example, it does not support plugins. But VitePress is powerful enough to make your content online if you don't need advanced customizations.

It might not be an appropriate comparison, but you can take VuePress and VitePress as Laravel and Lumen.

### Just Library