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
 To make it possible to effectively define desired slot filling behavior for a range of use cases, Framely offer the annotation to control the various components of slot filling. Here are how these annotations are arranged to define the interaction logic for slot filling, and a short introduction for each annotation. 

![five-phases](/images/annotation/fivephases.png)

1. [Fill Strategy](https://www.framely.ai/reference/annotations/fillstrategy.html) decides whether a slot should be filled and if so the source of the value input. .
2. [Initialization]((https://www.framely.ai/reference/annotations/init.html)) try to fill the slots based on business logic first. 
3. [Value Recommendation](https://www.framely.ai/reference/annotations/vr.html) provides a list of filling candidates per business data and logic for user to choose from. This can avoid waste user effort for filling slot with an unservable value. 
4. [Value Check](https://www.framely.ai/reference/annotations/vc.html) examines proposed value is servable based on business rules.
5. [Confirmation](https://www.framely.ai/reference/annotations/confirmation.html) give user a second chance to verify the proposed value.

By simply picking and configuring these five components, Framely can guide builder come up with a reasonable CUI interaction logic quickly. This way, you can focus on unique and cost-effective services that brings actual value to user and make their life better.   

## Advanced Annotations

Slot level annotations is designed for the common use cases, so it is designed for convenience instead of flexibility. The underlying mechanism of schema grounded conversation are modeled based on dynamic composite state machines. So, if there are CUI behavior that can not be defined by these high level annotations, one can always to look at [Transition](https://www.framely.ai/reference/annotations/transition.html), which offer a greater deal of control at low level: builder can directly control how bot should react given the state we are in, user input and some arbitrary condition defined on them. 



