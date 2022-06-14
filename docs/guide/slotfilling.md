# Slot Filling

The main goal of CUI is to reach an agreement between user and bot on what service users want through conversations. For schema grounded CUI, this means we need to convert what a user wants into intent, a structured representation with slots. For example,  buy-movie-ticket is an intent with slots to collect user's choice for things like movie name, show time, and other related information like whether they want to see IMAX version or not. 

It is common that a user omits some required information in the initial utterance. In such case, bot need to start a deliberate conversational process, commonly known as slot filling, to encourage user to provide their choice for these unfilled slots as quickly as possible. Obviously, these slots should be filled following an application logic dependent interaction logic. For example, since not every movie has the IMAX version, it is better to only ask whether user want to see IMAX version when the movie of their choice has IMAX version. Furthermore, the slots need to be collectively filled: if Star Wars only shows on 8:00pm, bot can not sell user a Star Wars ticket for 6:00pm.


## A Framework Approach
Most of existing CUI platform provide some low level library, thus allow builder to build experience in a flow based approach using these libraries. The library approach place a huge burden on builder since users can say anything at anytime. The exponentially many conversational path that need to be considered means either poor experience because of missed coverage or skyrocket cost for even just reasonable experience, often time both.

To greatly reduce the effort leve in building CUI, Framely is designed to be a framework for building conversational user interface. In particular, the interaction logic that bots follow can be composed by a small set of interacting dialog components. The design goal for these dialog components is to identify user's needs and understand their preferences efficiently while balancing the effort level between the user and builder. Each of these dialog components is used to address some aspects of slot filling, together they can model some practical conversational user interface for given services. For example, these components can offer suggestions when they are stuck, and provide value recommendations so that users can zero in on their choice quickly.

The framework and its components are designed based on the following principles:
1. It should offer a reasonable user experience accessing services for a collaborative user. This implies that what user wanted might not be servable.
2. While we do not have control of what user might say, we can control the conversational behavior of the bot so that bots conduct practical conversations towards delivering service.
3. The interaction logic of bot should be defined with a minimal set of components configurable via annotations.
4. The components are designed that it is easy to do common things, and it is possible to do less common things.
5. The components are designed to be orthogonal so that there should be only one way of doing one thing, making it easy to design and debug.

By standardizing on how conversational behavior on slot filling can be defined via components and how these components are interacting with each other, the framework approach make it easy for any application builder to define the usable conversational user experience with just a bit of learning. And configurations of these predefined components through annotations are all they need to do, as Framely runtime will follow the interaction logic defined by these annotations and effectively bring conversation toward getting user served.

## Schema Level Decisions 
Framely CUI framework is static and strong typed since strong typing nature allows compile-time checking that is simply not possible otherwise. Before we define the CUI behavior for the APIs, we first need to describe them at schema level, basically the signature for the API functions and its parameter types. Conversational behavior the CUI components are attached to the type definitions via annotation, so it is influenced by decisions we made at type level. In particular, multi-Valued slot means CUI will try to collect multiple values for the given slot. Framely offers carefully designed CUI component to extract these values one by one, with help of dialog annotations like value recommendation. Unlike the other CUI platform, Framely support user defined type call frame, which can have its interaction logic predefined and then reused when it is used as slot type. Use frame in the nested or expand its slot directly can have big impact on conversational behavior of the frame.

## Five Stages of Slot Filling
 To make it possible to effectively define desired slot filling behavior for a range of use cases, Framely offer the annotation to control the various aspects of slot filling. We have controls to decide whether a slot should be filled, and if under what condition. In terms of how a slot should be filled through conversation, particularly how we can reduce the user's effort level and improve the efficiency of the conversation, Framely has a five stages pipeline capable of tightly integrating application logic and data.

![five-phases](/images/annotation/fivephases.png)

1. Fill Strategy gives the overall description for Slot Filling. It decides whether a user preference should be collected, and if so, collects from whom. It also influences what kind of interactions are suggested during Slot Filling like an undertone.
2. Init collects user preference from businesses, directly. 
3. Ask / 
4. Value Recommendation collects user preference from users. The two phases, Init and Ask, share the same goal of getting the user preference, then turning it into slot value. As a result, they're recommended to pick one out of two. If by any chance both of them are defined, Framely tends to trust the business-provided value and skip asking users. The getting value goal also explains why Value Recommendation is just an assistant to Ask. Offering candidates is the means instead of ends.
5. Value Check examines the legitimacy and validity of a slot value based on business defined rules. If the result is passed, Slot Filling will proceed to the next phase. If not, the default behaviour is to acquire the slot value again.
6. Confirmation is usually used to emphasize values that users DON'T know (e.g. collected though Init), have side-effects, or simply value too much or trust too little by business. Confirmation supports a clear agreement by explicit confirming. If user confirms with a No, Framely will ask what's next since that bot has no clue about what's going wrong. Otherwise, (regardless user confirms with a Yes, or there's only implicit confirmation), Slot Filling will proceed to the next phase.

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



