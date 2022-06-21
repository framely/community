# Transition

[[toc]]

## Overview

Annotations that have been introduced so far should cover the most frequent requirements, but may not be adequate for the long tail experiences. Framely allows low-level customizations through Transition to cover them.


For example, suppose a restaurant sells thousands of dishes. There's no way user can view the foods from top to bottom, so the restaurant has to categorize them into tree menu, then expects conversations like:

``` story

User: *Can I order some food?*

Bot: *What kind of dish do you prefer? We have: 1. Noodle 2. Rice*

User: *Noodle, please.*

Bot: *Ok. What kind of noodles do you prefer? We have: 1. Dry Noodle 2. Soup Noodle*

User: *The second.*

Bot: *Got it. What kind of soup noodle do you prefer? We have 1. Tomato Egg Noodle, 2. ...*

```

Solutions for this are awfully complex (if not impossible), but with Transition, the experience can be achieved through one single rule: looping the recommendation until user's answer is NOT a category but a dish (internal node in computer science). 



Transition is powerful enough to handle almost all arbitrary experiences, but it is designed to deal with requirements that CANNOT be accomplished by the methods introduced in  Guide and Reference, not as an alternation of them. Flexibility comes with details and efforts . If Transtion is the ONLY way to get the experience, be prepared to get your hands messy.



## Features

- Two methods to invoke transition
   - User utterances or external events request an intent/frame
   - Slot is being filled via interaction, and specified condition evaluates as true
- Various actions to low-levelly customize the default behaviours
   - Send messages: in plain text, or formatted through a list template
   - Manipulate [Slot Filling](../../guide/slotfilling.md): set the stage to clear, fill, or recheck 
   - Dictate [Dialog Management](../../guide/architecture.md#dialog-management) to rewire in global view: create or destroy an intent, hand it to human agent, or close conversation
- Mix-matches for triggers and actions



## How to use

### Triggers

Transition can be triggered by Event and Condition. Each one aims to customize a specific genre of behaviour.



#### Event

Event-triggered transitions will be invoked anytime an user utterance or external event requests the Event intent/frame. It customizes the Event intent/frame's behaviour by appending actions at the end of it. The actions are special and powerful, because they can reach out contexts provided by the intent/frame who hosts the transition. *Event* intent/frame itself is independent from that.



Here's one example of event-triggered transition: 

Suppose user has ordered a dozen things, and the conversation goes like:

``` story

Bot: *Ok, what else kind of dish do you prefer? We have: 1. Noodle 2. Rice*

User: *What have I ordered so far?*

Bot: *You have ordered: Tomato Egg Noodle, Oil Spread Noodle, ..., and Biangbiang Noodle.*

*Any other dish do you prefer? We have: 1. Noodle 2. Rice*

```

Deisgn for this conversation involves two intents, one is for order (offers conversation for line 1, 4), the other one is for repeat order (offers conversation for line 2, 3). Passing all the dishes from OrderIntent to RepeatOrderIntent is complex, especially when there's more than one upsale section. A better way to do this is to make RepeatOrderIntent as OrderIntent's event-triggered transition's event, and append a reply at the end of OrderIntent.



To define an event-triggered transition, one needs to:

1. Create a transtion
2. Set Trigger Method to Event
3. Set *Event* to the intent/frame needs to be customized
4. Add actions to customize behaviour, in [Update Action](#actions)

::: thumbnail
<img alt="transition-event" src="/images/annotation/transition/transition-event.png">
:::

::: tip
An event can be consumed only once. 

For example, if the same frame is being configured as an [external event](fillstrategy.md#external) slot's type  an event-triggered transition's *Event* at the same time, it will only be served as slot value. Transition customizes things at a low-level, therefore has low priority.
:::


#### Condition

Condition-triggered transitions will be triggered whenever the frame's slot is filled via interaction, AND the Conditions are evaluated as true. This means, if slots that are not being filled a value (e.g. when user answers no for multi-valued slot) or filled directly (e.g. through [Intent Start Assignments](#intent-start)), condition-triggered transitions will not be invoked. Also, for multi-valued slots, triggering happens per value piece instead of the whole slot.



Example for condition-triggered transition is the one mentioned in overview:

``` story

User: *Can I order some food?*

Bot: *What kind of dish do you prefer? We have: 1. Noodle 2. Rice*

User: *Noodle, please.*

Bot: *Ok. What kind of noodles do you prefer? We have: 1. Dry Noodle 2. Soup Noodle*

User: *The second.*

Bot: *Got it. What kind of soup noodle do you prefer? We have 1. Tomato Egg Noodle, 2. ...*

```

Deisgn for this conversation involves two slots, one is source (used to record what user have chosen), the other one is target (ask user what he/she wants based on the source). Condition-triggered transition will assign target's value to source, then clear target to loop asking, until target reaches no suggestion (leaf node, in computer science).



To configure a condition-triggered transition, one needs to:

1. Create a transtion
2. Set Trigger Method to Condition
3. Set Condistions like [Confirmation Conditions](./confirmation.md#condition)
4. Add actions to customize behaviour, in [Update Action](#actions)

::: thumbnail
<img alt="transition-condition" src="/images/annotation/transition/transition-condition.png">
:::



### Actions

Transition's customized behaviours are defined by a sequence of actions under Updated Action. 

::: thumbnail
<img alt="transition-action" src="/images/annotation/transition/transition-action.png">
:::

Framely supports almost a dozen of these actions, which can be categorized into three groups:

1. Actions only reply messages as a side effect and make NO change to [Dialog Management](../../guide/architecture.md#dialog-management): [Simple Reply](#simple-reply), [List Reply](#list-reply)
2. Actions manipulate Slot Filling related behaviours: [Clear Slot](clear-slot), [Fill Slot](fill-slot), and [Recheck Action](recheck-action)
3. Actions dictate Dialog Management to redirect in a global view: [Intent Start](intent-start), [Intent Abort](intent-abort), [End Action](end-action), [Hand Off](#hand-off), and [Close Session](close-session)

Let's cover them one by one.



#### Simply reply

::: thumbnail
<img alt="transition-simple-reply" src="/images/annotation/transition/transition-simple-reply.png">
:::

Simple Reply is usually used to send plain and short messages to users. The messages can be text, card or payment. Learn more about this on [Channels Overview](../channels/overview.md)..



#### List Reply

::: thumbnail
<img alt="transition-list-reply" src="/images/annotation/transition/transition-list-reply.png">
:::

List Reply is also used to send messages, but targets in multi-valued scenarios. List Reply takes a Source who is expected to offer multiple values, decorates each value with the pattern defined in Body, joins them together, and transforms the result with a Header attached at the beginning and a Footer appended at the end. 

Learn more about this at [Value Recommendation's Display](valuerec.md#display). These two work in the same way.



#### Clear Slot

::: thumbnail
<img alt="transition-clear-slot" src="/images/annotation/transition/transition-clear-slot.png">
:::

Clear Slot clears the Target Slot's value, so it should be used when one is not satisfied with the target slot's value, BUT has no idea what the value should be. Dialog Management will behave like the target slot has never been offered a value, after the transition.



#### Fill Slot

::: thumbnail
<img alt="transition-fill-slot" src="/images/annotation/transition/transition-fill-slot.png">
:::

Fill Slot evaluates Code Expression and assigns the result to Target Slot, so unlike Clear Slot, it suits for the case that one is not satisfied with the target slot's value, AND knows what the value is.

Suppose chatbot has structure as follows:

```Kotlin
IntentA

- slota, kotlin.Int typed

- slotb, kotlin.Int typed

- slotc, kotlin.Int[] typed

- slotd, SomeFrame typed



SomeFrame

- slote, kotlin.Int typed
```

Typical code expressions include:

```Kotlin
// constant

1 // for (target slot) slota



// some other slot

slota // for slotb



// statement

listOf(1, 2, 3) // for slotc



// function

fillSomeFrame() // for slotd

// with native function

fun fillSomeFrame(): SomeFrame {

    val returnValue = SomeFrame()

    returnValue.slote = 1

    return returnValue

}
```



#### Recheck Action

Recheck Action moves [Slot Filling stage](../../guide/slotfilling.md#five-stages-of-slot-filling) before Value Check, so it's used when Target Slot is no longer trustable from business side. One common scenario for this is a bunch of slots depend on each other, one of them changed, and the others' credibility are compromised.

!::: thumbnail
<img alt="transition-recheck" src="/images/annotation/transition/transition-recheck.png">
:::


#### Intent Start

Intent Start starts an intent. Passing contexts from the current intent/frame is optional and supported by Assignments. It will fill Code Expression into the corresponding slot DIRECTLY (skip interactions defined on that slot), if set. 

Code Expression here reaches context in the same way as [Fill Slot](#fill-slot) do.

::: thumbnail
<img alt="transition-intent-start" src="/images/annotation/transition/transition-intent-start.png">
:::


#### Intent Abort

When conversation goes wrong in an abnormal way, one doesn't know how to recover it and wants to prevent further damage by simply aborting all related intents in a radical fashion. Radical here means abort the specified intent, along with the nested intent/frame in it, the hosting intents of it (children and ancestors, in programming language). 

Intent Abort will also tell user `${intent?.typeName()} has been aborted!`. To customize the utterance, one needs to customize the response of `[io.framely.core.AbortIntent](https://framely.naturali.io/org/5fa0e7dcf549c817cf952edd/agent/5fa27e3f3a0e9462a4a79edb/intent/5ffbe516d0953b9366732ff7?tab=2)`.

::: thumbnail
<img alt="transition-intent-abort" src="/images/annotation/transition/transition-intent-abort.png">
:::

#### End Action

When conversation goes wrong in a normal but not welcomed way, End Action solves the problem by stopping the current current intent/frame, along with the nested intent/frame in it immediately. For example, when all dishes are sold out, what restaurant can do is tell user his/her bad luck and end the selling intent. 

End Action acts on the intent/frame who hosts it, so no extra configuration is needed.



#### Hand Off

Hand Off sends the current intent to human agents. It needs no extra configuration. 

Learn more about Hand Off at [Support](../support/overview.md). 



#### Close Session

Close Session is usually used when user triggers something so unwelcome that business has to terminate the current session. It needs no extra configuration.



### Mix-matches and Collaborating

Transition can be defined multiple times. Each is composed by a trigger and a sequence of actions introduced as upon.

::: thumbnail
<img alt="transition-multiple" src="/images/annotation/transition/transition-multiple.png">
:::

One must wonder what if multiple transitions are triggered at the same time?

Multiple transitions under the same intent/frame are only allowed WITHOUT duplicate triggers. And by definition, event and condition-triggered transitions will never be invoked at the same time. So does multiple event-triggered transitions. The only complexity comes from condition-triggered transitions.

When multiple condition-triggered transitions hit at the same time, Dialog Management will collect the satisfied trigger's corresponding actions and produce them together in order. The priority goes with the multiple transitions' order first, the action sequences' order inside them second. As for nested frame slots, transition on the BE nested slots' frame will be performed first, and ONLY when nothing is found will Dialog Management try to perform the hosting intent/frame's transitions.

And on the top of that, if there're different category's actions in the collected action sequence, Dialog Management would always perform the message replying and Slot Filling customizing ones first, the Dialog Management rewiring ones later, regardless of the defining order. For example, if there were a Simple Reply, an Intent Start, and another Simple Reply, Dialog Management will perform as Simple Reply, the other Simple Reply, then Intent Start.



With the serializing of actions,  the mix-matching of triggers and action sequences, and the joint of the transition, arbitrary experinces in Framely comes true. 
