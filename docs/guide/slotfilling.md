# Frame Filling

The main goal of CUI is to reach an agreement between user and bot on what service users want and how they want it so that we can deliver the service through conversations. For schema grounded CUI, this means we need to convert conversations into semantic frame, a structured representation of user intention. The structure of a frame, defined by the slots it contains, is decided by application logic. For example, a frame designed to sell a movie ticket will need slots to collect user's choice for things like movie name, show time, and other related information like whether they want to see IMAX version or not. 

It is common that a user omits some required information in the initial utterance. In such case, bot need to start a deliberate conversation to encourage user to fill these unfilled slots as quickly as possible.  For example, since not every movie has the IMAX version, so instead of asking users whether they want to see IMAX version for every movie, it is better to only ask this question when the movie of their choice has IMAX version. Obviously, these slots should not be filled independently.This process of filling slots of a frame considering the interdependency so that we can provide a better user experience is called frame filling.

The schema grounded conversation is about building the common understanding of what service a user wants, and how he/she wants it between users and chatbot. To invoke a service, we need to fill slots of its input frame through conversation. This process is thus called frame filling.  For example, user's intent to buy a movie ticket is not complete before the user also lets the agent know the movie he wants to watch, the time he would like to start and also the number of tickets he needs. This information needs to be collected as a whole before agent can provide the desired service. Furthermore, this information needs to collectively make sense: for example, Star Wars only shows on 8:00pm, user input a 6:00pm Star Wars tickets is not going to work. 


Even for a relatively simple use case like above, there can still be infinite number of possible ways of conversations can take place. Instead of trying to enable all these possibilities, we focus on a class of practical conversations that can be composed by intertwining a small set of dialog patterns. Each of these dialog patterns is used to address some aspect of frame filling, and we also provide well-designed implementations to support these dialog patterns so that you do not have to code them up. With these dialog patterns, you can not only speed up the analysis and converge to a practical CUI design faster, with predefined dialog components, you can also get good implementation simply by declaratively configuring them.


The goal for effective service chatbot design should be low user effort, so chatbot can identify user's needs and understand their preferences efficiently. So it is not surprising that we should offer suggestions when they are stuck, and provide value recommendations so that they can zero in on their choice quickly.

## A Framework Approach
The details of frame filling, like whether and how to converse with users on a particular slot, is controlled by interaction logic. With the goal of delivering service to user with minimum effort on their side, interaction logic should certainly depend on the application, thus need to be designed separately by each application builder. How do we help these team to effectively build the desired interaction logic? 

Most of existing CUI platform provide some low level library, thus allow builder to build experience in a flow based approach using these libraries. While offering the most flexibility, this library approach place a huge burden on builder since they need to worry about the interaction between different components. For CUI, user can say anything at anytime. The exponentially many conversational path that need to be considered means either poor experience because of coverage issues or skyrocket cost for even just reasonable experience.

By carefully studying the different ways that bot can respond to any reasonable inputs from a collaborative user on the set of representative services, Framely designed a framework for building conversational user interface based on the following principles:
1. It should offer a reasonable user experience for a collaborative user to access the services that a business provides. This implies the interdependency between slots are captured, for example.
2. The conversational behavior of the bot, or interaction logic, can be defined with a minimal set of control handles called annotations. The emphasis is on balance between user experience and builder experience.  
3. The annotations are designed that it is easy to do common things, and it is possible to do hard things.
4. The annotations are designed to be orthogonal so that there is only one way of doing one thing, which make is easy to design and debug.

By standardizing on how interdependence between slots can be modeled, and how conversational behavior on each slot can be defined, it is easy for any application builder to define the usable conversational user experience with just a bit of learning. And configurations of these predefined annotations are all they need to do, as Framely runtime will follow the interaction logic defined by these annotations and effectively bring conversation toward getting user served.

## Type level decisions 
Different from many CUI platforms, Framely is static and strong typed. The strong typing nature allows compile-time checking that is simply not possible otherwise. So, to fill a slot, one must decide its type first based on by API schema. But there are two aspects of type decision that will impact how conversation can be conducted for that slot. 

- single-valued vs multi-valued
  Multi-Valued slot means CUI will try to collect multiple values for the given type, and put them into a list. Framely offers carefully designed CUI process to acquire them one by one, with interaction of this choice and other dialog annotations like value recommendation automatically taken care of. The common UI requirements like minimum and maximum number of items are options that builder can define easily.

- entity typed or frame typed.
  Frame has multiple slots, which means bot can be configured to fill slot in order one at a time, or as a whole. This means the CUI defining annotation can be defined at both frame level and slot level. As a basic rule, if both frame and slot level annotations are defined, Framely will always prefer the frame level annotation and try to fill the entire frame all at once.

## Five Stages of Slot Filling
The basic building block for frame filling is to fill one single slot. To make it possible to effectively define desired slot filling behavior for a range of use cases, Framely over the controls so that builder can decide when to fill a slot, in form of fill strategy annotation. In terms of how a slot should be filled through conversation, particularly how we can reduce the effort level on the user side and improve the efficiency of the conversation, Framely has a four stages pipeline with hooks tightly integrating with application logic and data.

![five-phases](/images/annotation/fivephases.png)

1. Fill Strategy gives the overall description for Slot Filling. It decides whether a user preference should be collected, and if so, collects from whom. It also influences what kind of interactions are suggested during Slot Filling like an undertone.
2. Init collects user preference from businesses, directly. 
3. Ask / Value Recommendation collects user preference from users. The two phases, Init and Ask, share the same goal of getting the user preference, then turning it into slot value. As a result, they're recommended to pick one out of two. If by any chance both of them are defined, Framely tends to trust the business-provided value and skip asking users. The getting value goal also explains why Value Recommendation is just an assistant to Ask. Offering candidates is the means instead of ends.
4. Value Check examines the legitimacy and validity of a slot value based on business defined rules. If the result is passed, Slot Filling will proceed to the next phase. If not, the default behaviour is to acquire the slot value again.
5. Confirmation is usually used to emphasize values that users DON'T know (e.g. collected though Init), have side-effects, or simply value too much or trust too little by business. Confirmation supports a clear agreement by explicit confirming. If user confirms with a No, Framely will ask what's next since that bot has no clue about what's going wrong. Otherwise, (regardless user confirms with a Yes, or there's only implicit confirmation), Slot Filling will proceed to the next phase.

Among all the slot level annotations, one uses the followings to tailor their own Slot Filling process. Fill Strategy is the most special one as it connects the [schema level](https://www.framely.ai/guide/components.html#schema) and [interaction level](https://www.framely.ai/guide/components.html#interaction-logic) requirements: slot types can restrict Fill Strategy options, and Fill Strategy options suggest the usage of slot level annotations like an undertone. 

If we carry on with that picture, the actual colours used on canvas should not only suit the motif but harmonize with the undertone.

| Phase                    | Slot Level Annotations                             |
| :----------------------- | :------------------------------------------------- |
| Fill Strategy            | [Fill Strategy](https://www.framely.ai/reference/annotations/fillstrategy.html)                                      |
| Init                     | [Initialization]((https://www.framely.ai/reference/annotations/init.html))                                     |
| Ask<br/> Value Recommendation | [Prompts](https://www.framely.ai/reference/annotations/prompts.html), [Multi-Valued Prompts]((https://www.framely.ai/reference/annotations/mvprompts.html))<br/>[Value Recommendation](https://www.framely.ai/reference/annotations/vr.html) |
| Value Check              | [Value Check](https://www.framely.ai/reference/annotations/vc.html)                                        |
| Confirmation             | [Confirmation, Multi-Valued Confirmation](https://www.framely.ai/reference/annotations/confirmation.html)            |


By simply answering the questions that these five annotations implies, Framely can guide you come up with a reasonable CUI interaction logic quickly. This way, you can focus on bring actual value to user by unique and cost-effective services, and make their life better.   


## Advanced Annotations

Slot level annotations is designed for the common use cases, so it is designed for convenience instead of flexibility. The underlying mechanism of schema grounded conversation are modeled based on dynamic composite state machines. So, if there are CUI behavior that can not be defined by these high level annotations, one can always to look at Transition, which offer a greater deal of control at low level: builder can directly control how bot should react given the state we are in, user input and some arbitrary condition defined on them. 

Learn more about this on [Transition](https://www.framely.ai/reference/annotations/transition.html).



