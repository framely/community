# Beyond Slot Filling

[[toc]]

## Motivation

The 5 stage slot filling is designed to minimize builders' effort level in building the conversational experience that get collaborative user served as fast as possible, under the favorable conditions. As such, the bot will follow a deterministic interaction logic that first determine a user's intent, and then aggressively fill slots of that intent one by one until it have all the required parameter to invoke the service.

However, the design bias towards favorable conditions in these standard slot filling components can sometime cumbersome for interaction logic for unhappy use case. For example, when a user wants to buy a ticket, the movie he wants is sold out. Instead of asking what showtime he likes, whether he wants IMAX, it is a better experience to simply exit conversation early:
:::: conversation
::: user User
Two tickets for Star Wars please?
:::
::: bot Bot
Sorry all tickets are sold out today. What else can I do for you?
:::
::::

## Overview
The 5 stage slot filling conversational interaction logic defined by chatbot builder in intentionally modeled under dynamic [state chart](https://statecharts.dev/), or dynamic composite state machines. The deterministic nature warranted by this conceptual model make it easy for business to control interaction logic for their business needs, both in building and debugging phase.

In particular, each entity slot filling is essentially a deterministic state machine, that deterministically move from the start state to end state, that go through the 5 stages of slot filling based the transition table defined by corresponding CUI components. The frame slot are filled by composite state machine that also by frame level CUI component as well as the components defined on each one of its slots. 

Transition is a low level annotation that give builder the ability to control the state machine directly. It is an optional frame level annotation which lets you define transitions between slots hosted directly and indirectly by hosting frame.

Transition can be configured in two parts: triggering and update actions, where triggering defines under what condition the corresponding actions sequence is executed.
::: thumbnail
![transition](/images/annotation/transition/transition.png)
:::

## Transition
 Currently, we support two kinds of transitions: event triggered transitions and condition triggered transitions.

### Event Triggered Transition

Given intent, the interaction logic or transition table defined by slot filling components will always try to proactively fill every it's slot, and delivery the result to user based on the filled slots. While direct slot filling is already capable for many real world use case, many advanced use cases involves no-direct slot filling.

For example, during a purchase session, the user might want to use a certain coupon by say "*use the coupon that will expire soon*". Instead of responding with "I do not know what you are talking about", you can set up an event triggered transition, with triggering event set to be "CouponSelection", and actions include a fill action which can assign the coupon code that is returned from a function that retrieves the expiring coupon code for given user.

:::: conversation
::: bot Bot
Okay lets go ahead and begin checkout.
:::
::: user User
I want to use the coupon that will expire soon
:::
::: bot Bot
Sure. Would you like to use the credit card on file?
:::
::::

The triggering part of event triggerred transition are defined by arbitrary frame event, and update can be any valid action sequence.
::: thumbnail
![transition-event](/images/annotation/transition/transition-event.png)
:::


### Condition Triggered Transition

The default behavior of slot filling after one slot is filled is always moving onto fill the next slot. But sometime, this behavior is not what you want. In addition to early exit example at the beginning of this doc, condition triggerred transition can also be used for looping back. 

For example, a user want to get some food, say you have a taxonomy of food arranged into some tree structure, you can use condition triggerred transition for a while loop kind of conversational experience. Here, as long as the food user specified is not concrete food, but some category, we can jump back and ask user to clarify:

:::: conversation
::: user User
I like order some Chinese food.
:::
::: bot Bot
Cool, what food do you want? We have noodle or rice as main dish.
:::
::: user User
noodle please.
:::
::: bot Bot
Sure, what noodle do you want? we have dry noodle or noodle soup.
:::
::::

Condition triggerred transition allows you to customize interaction logic based on slot values. The triggering part is defined by triggering timing and triggering condition, where timing is defined by a slot, and triggering condition can be specified by arbitrary boolean [kotlin Expression](kotlinexpression.md). When the trigger timing slot is filled and the condition expression evaluates to true, the corresponding actions will be executed. 
::: thumbnail
![transition-condition](/images/annotation/transition/transition-condition.png)
:::

::: warning Used with caution
Transition is a low level control that you can use to implement arbitrary conversational interaction logic. But with great power, comes with great responsibility. The low level control can adversely impact the interaction logic defined at slot filling level if not used carefully. Please test your design when it comes to transition.
:::


## System Action
::: thumbnail
![transition-action](/images/annotation/transition/transition-action.png)
:::

Update action contains one or more actions in sequence, you need to define it by order. When the trigger is active, bot will respond the update action one by one according to the **top-to-bottom order**, please make sure the order of actions is the one you want.

With actions, you can: 
- Prompt Users for necessary information by Simply Reply and List Reply;
- Change the state of slot filling by Clear Slot, Fill Slot and Recheck Slot;
- Transfer conversation by Intent Start, Intent Abort and Intent End.

<br>

| <div style="width:120px">Actions</div>  | Useages 	|
|:------------- |:-------------	|
| Simple Reply  | Prompt user a text or media reply |
| List Reply	  | Prompt user a list reply |
| Clear Slot  	| Claer the target slot value	|
| Fill Slot     | Assign the value expressed in code expression to target slot |
| Recheck Slot  | Move the state back to before check	target slot value |
| Intent Start  | Start a new intent with its slot filled with assignments by code expression |
| Intent Abort  | Abort the intent you specified |
| Intent End    | Terminate the current intent |
| Hand Off      | Transfer the current conversation to live agent. Please make sure you have configued [Support](../support/overview.md) |
| Close Session | Clear the entire session |

<br>

#### Simple Reply

::: thumbnail
<img alt="transition-simple-reply" src="/images/annotation/transition/transition-simple-reply.png">
:::

Simple Reply is usually used to send plain and short messages to users. The messages can be text, card or payment.

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

Clear Slot clears the Target Slot's value, so it should be used when one is not satisfied with the target slot's value. After it been executed, Dialog Management will behave like the target slot has never been offered a value and may attempt to fill it again.

#### Fill Slot

::: thumbnail
<img alt="transition-fill-slot" src="/images/annotation/transition/transition-fill-slot.png">
:::

Fill Slot evaluates Code Expression and assigns the result to Target Slot.

[Code Expression](../../guide/glossary.md#code-expression-input) here is very flexible. It accepts:

- constant
``` kotlin
1                  // target slot's type is kotlin.Int
"an apple"         // kotlin.String
City("beijing")    // entity City, who has an instance of beijing
```
- other slot
``` kotlin
slotA              // the same as slotA
```
- statement
``` kotlin
listOf(1, 2, 3)    // kotlin.Int[]
```
- function
```kotlin
getSomeFrame()     // SomeFrame

// SomeFrame is a frame, who has a slotB, typed kotlin.Int
// getSomeFrame() is a native function, defined as follows
fun getSomeFrame(): SomeFrame {
  val returnValue = SomeFrame()
  returnValue.slotB = 1
  return returnValue
}
```
::: tip Note
When use **Fill Slot** with code expression, you should make sure assignment actually works. For example, code expression should be valid ford current context.
:::


#### Recheck Action

Recheck Action moves [Slot Filling stage](../../guide/slotfilling.md#five-stages-of-slot-filling) before Value Check, so bot will try to use old value directly for value check to make sure it still makes business sense. Framely reset every slot after slot to be cleared to be rechecked by default.

::: thumbnail
<img alt="transition-recheck" src="/images/annotation/transition/transition-recheck.png">
:::


#### Intent Start

Intent Start starts an intent. It will allow you to use Code Expression to initialize some slot, when this expression is evaluated to not null, the new started intent will skip the interaction on these slots.

Code Expression here reaches context in the same way as [Fill Slot](#fill-slot) do.

::: thumbnail
<img alt="transition-intent-start" src="/images/annotation/transition/transition-intent-start.png">
:::

#### Intent Abort

When user feel there is no need to continue to conversation on some intent and wants to exit the current conversation around that, "like I do not want to buy ticket anymore", after he started with ticket buying intent, but change his mind after he checked weather.

::: thumbnail
<img alt="transition-intent-abort" src="/images/annotation/transition/transition-intent-abort.png">
:::

#### End Action

End Action stops the current intent/frame, along with the nested intent/frame in it immediately. For example, when all dishes are sold out, what restaurant can do is tell user his/her bad luck and end the selling intent.

End Action acts on the intent/frame who hosts it, so no extra configuration is needed.

#### Hand Off

Hand Off sends the current intent to human agents. It needs no extra configuration.

#### Close Session

Close Session is usually used when user triggers something so unwelcome that business has to terminate the current session. It needs no extra configuration.


