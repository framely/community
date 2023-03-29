# Time to build conversational experience
Once in a while, there is a technological breakthrough, and people get to interact with computers in a new way. Every time that happens, the companies that figure out how to deliver their service in this new way early flourish, while the rest wither. 

With ChatGPT, it is that time again. Conversational user interfaces (CUIs) have long been seen as the ultimate human-computer interface, as they allow users to simply express what they want and get it without having to learn how to interact with the system. ChatGPT proves that when there is no friction, users come in droves.

But what tools do I use to build a CUI for my services? It is natural to gravitate towards the long-established players, the ones with big brands behind them, but you have to think: are these tools, which were designed before the technological breakthrough, good choices? It is not difficult to conclude that these tools do not work. Otherwise, why, compared to the countless graphical user interface (GUI) applications that have changed our lives, are impactful conversational user interface (CUI) applications or chatbots still nowhere to be found?

Every platform will claim that they utilize foundation models and that language understanding will be solved. But is language understanding the only problem? Nope. Unlike with GUIs, where users can only interact in the ways implemented for them, with CUIs, users can express anything at any given turn. How do we enable users to interact freely while also providing businesses with direct control of conversations to achieve their objectives?

The truth is, flow-based approach of building CUIs will not be the solution. We need something radical. To reduce the cost of building effective conversational user interfaces (CUIs) for your APIs, OpenCUI introduces a new [type based](../essentials/sgcui.md) approach. But why we think it is the solution? Unfortunately there is no short answer. It is a big decision, you need to get a systematic view, so that you can see it yourselves from the first principles. In this miniseries, let me explain the thinking and conceptual framework, it is long, but you are serious so hopefully you can see the new way is the only way.

#### [Cooperative principle](cooperative.md)
To design the conversational user interface, we need to have a basic assumption on the users that we try to help. For businesses, it is useful to assume that users, once connect to the chatbot they build, are here to get helped by your business thus will be cooperative. This assumption can greatly reduce the complexity of the chatbot building.  

#### [Type-gournded CUI](sgcui.md)
The flow-based approach is the dominant method for building CUIs. However, given the lack of widespread adoption of chatbots, and the absence of truly usable ones, it is time to ask why this approach is not effective and find a solution that actually works.

#### [Fill the missing slots](slotfilling.md)
In order to invoke the API function that users desire, a CUI needs to create an instance of the function type. When the instance is not fully populated based on the information provided by the user so far, the CUI needs to guide the conversation so users can provide information to complete the instantiation.

#### [A CUI maturity model](5levels-cui.md)
Maturity model for CUI will make it easy for business to trade off between the cost and user experience, and provide road map for continuous improvement. 

#### [Do not start from scratch](components.md)
When you need a instance of some type, and someone already defined how to conversationally create an instance of that type, then there is no reason for you not to reuse that, if the conversational behavior is defined with right abstraction so that you can hook it up with your production system. User does not need to change how they express their desire. 

#### [Runtime makes it tick](architecture.md)
Flow-based CUI lay all the burden to builder, they need to imperatively define the conversational behavior for every conceivable conservation path, or the conversational experience will suffer. The type-grounded CUI allow builder to declare what conversational experience they want to deliver, but we need a power runtime to take care of the implementation details.


For the impatient, [you can get started now](https://build.opencui.io).
