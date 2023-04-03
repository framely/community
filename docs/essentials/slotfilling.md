# Slot filling with 5 stages

The main goal of CUI is to reach an agreement between user and bot on what service users want through conversations. For schema grounded CUI, this means we need to convert what a user wants into skill, a structured representation with slots. For example,  buy-movie-ticket is a skill with slots to collect user's choice for things like movie name, show time, and other related information like whether they want to see IMAX version or not. 

It is common that a user omits some required information in the initial utterance. In such case, bot need to start a deliberate conversational process, commonly known as slot filling, to encourage user to provide their choice for these unfilled slots as quickly as possible. Obviously, these slots should be filled following an application logic dependent interaction logic. For example, since not every movie has the IMAX version, it is better to only ask whether user want to see IMAX version when the movie of their choice has IMAX version. Furthermore, the slots need to be collectively filled: if Star Wars only shows on 8:00pm, bot can not sell user a Star Wars ticket for 6:00pm.


## A framework approach
Most of existing CUI platform provide some low level library, thus allow builder to build experience in a flow based approach using these libraries. The library approach place a huge burden on builder since users can say anything at anytime. The exponentially many conversational path that need to be considered means either poor experience because of missed coverage or skyrocket cost for even just reasonable experience, often time both.

To greatly reduce the effort leve in building CUI, OpenCUI is designed to be a framework for building conversational user interface. In particular, the interaction logic that bots follow can be composed by a small set of interacting dialog components. The design goal for these dialog components is to identify user's needs and understand their preferences efficiently while balancing the effort level between the user and builder. Each of these dialog components is used to address some aspects of slot filling, together they can define a practical conversational user interface for any given services. For example, the core of slot filling includes components that can offer suggestions when they are stuck, and provide value recommendations to help users zero in on their choice quickly.

The framework and its components are designed based on the following principles:
1. It should offer a reasonable user experience accessing services for a collaborative user. This implies that what user wanted might not be servable.
2. While we do not have control of what user might say, we can control the conversational behavior of the bot so that bots conduct practical conversations towards delivering service.
3. The interaction logic of bot should be defined with a minimal set of components configurable via annotations.
4. The components are designed that it is easy to do common things, and it is possible to do less common things.
5. The components are designed to be orthogonal so that there should be only one way of doing one thing, making it easy to design and debug.

By standardizing on how conversational behavior on slot filling can be defined via components and how these components are interacting with each other, the framework approach make it easy for any application builder to define the usable conversational user experience with just a bit of learning. And configurations of these predefined components through annotations are all they need to do, as OpenCUI runtime will follow the interaction logic defined by these annotations and effectively bring conversation toward getting user served.

## Schema level decisions 
OpenCUI CUI framework is static and strong typed since strong typing nature allows compile-time checking that is simply not possible otherwise. Before we define the CUI behavior for the APIs, we first need to describe them at schema level, basically the signature for the API functions and its parameter types. Conversational behavior the CUI components are attached to the type definitions via annotation, so it is influenced by decisions we made at type level. In particular, multi-Valued slot means CUI will try to collect multiple values for the given slot. OpenCUI offers carefully designed CUI component to extract these values one by one, with help of dialog annotations like value recommendation. Unlike the other CUI platform, OpenCUI support user defined type call frame, which can have its interaction logic predefined and then reused when it is used as slot type. Use frame in the nested or expand its slot directly can have big impact on conversational behavior of the frame.

## Five stages of slot filling
The general behavior of slot filling is controlled by the [Fill Strategy](../reference/annotations/fillstrategy.md), which decides whether and how we can prompt users for their preference on this slot. Prompt strategy is a required annotation on the slot level and you can select one from the following list: always, conditional, recover only and external and gated. 

When slot is configured to be filled by user interaction, OpenCUI framework uses a five stage slot filling process that is designed to help user converge on a servable service request as effortless as possible. This filling process can be easily configured via corresponding annotations based on business logic:
1. [Initialization](../reference/annotations/init.md) try to fill the slots based on business logic first.
2. [Prompt](../reference/glossary.md#prompt) allow you to provide the template for SlotRequest dialog act, needed to request user preference for the given slot.
3. [Value Recommendation](../reference/annotations/valuerec.md) provides a list of filling candidates per business data and logic for user to choose from. This can avoid waste user effort for filling slot with an unservable value. 
4. [Value Check](../reference/annotations/valuecheck.md) examines proposed value is servable based on business rules.
5. [Confirmation](../reference/annotations/confirmation.md) give user a second chance to verify the proposed value.

By simply making decision on whether to enable and how to configure these five components, OpenCUI can guide builder come up with a reasonable CUI interaction logic systematically. This way, builder can focus on unique and cost-effective services that brings actual value to user and make their life better.   

It should be clear that message bot send to user in a single turn can contain message generated from more than one of these stages. In the example shown here,
![Value Rec related annotation](/images/annotation/valuerec/valuerec_related.png)
we have message generated from confirmation from previous slot, value check failure for the current slot possibly with user existing slot mention, prompt and value recommendation in attempt to fill the slot again.

## Advanced annotations
Slot level annotations is designed for the common use cases, so it is designed for convenience instead of flexibility. The underlying mechanism of schema grounded conversational user interface, including the 5 stage of slot filling, is modeled based on dynamic [Startchart](https://statecharts.dev/), also known as composite state machines. So, if there are CUI behavior that can not be defined by these high level annotations, one can always to look at [State transition](../reference/annotations/transition.md), which offer a greater deal of control at low level: builder can directly control how bot should react given the state we are in, user input and some arbitrary condition defined on them. 



