# Transition

[[toc]]

## Motivation



For example, when the user wants to book a round-trip ticket but no suitable flight is available, you can make a decision on which step the user should start over from: 

- Clear all the information and restart: 

:::: conversation
::: bot Bot
Currently no tickets available. Let's try checking for other options. Please note that you will be asked to re-enter your information. What is the first and last name of the passenger flying?
:::
::::

- Retain basic information and modify others: 

:::: conversation
::: bot Bot
Currently no tickets available. Let's reset some information. Which day would you like to leave?
:::
::::

- Keep all information except the last one: *Return Flight Time*: 

:::: conversation
::: bot Bot
Currently no tickets available. Please choose another Return Flight Time. What time would you like to leave on the return flight home? 
:::
::::

## Overview

Transition can be thought of as customization of system behaviors or enhancement of other annotations. It is an optional frame level annotation which lets you control how the conversation should be when meeting the specified conditions. 

Transition consists of two parts: trigger method and update actions. This means when the condition is met or the event is triggered, bot will respond each action in sequence.

::: thumbnail
![transition](/images/annotation/transition/transition.png)
:::

## How to use

Transition is a composite annotation, as Framely provides different methods to cover different triggers. You need to pick one trigger method first, then you can declare where and how the action responds one by one. 

### Event Trigger

::: thumbnail
![transition-event](/images/annotation/transition/transition-event.png)
:::

Event trigger allows you to specify what should happen or be done when the bot gets user input event. User input event can be specified by a frame instance, which indicates arbitrary semantics. 

For example, in some purchase scenarios, if the user wants to use a certain coupon, you can use an additional frame as event to catch the user's utterance like "*use the coupon that will expire soon*", and also a fill action which can assign the coupon code by invoking a function that retrieves the expiring coupon code for given user.

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


### Condition Trigger

::: thumbnail
![transition-condition](/images/annotation/transition/transition-condition.png)
:::

Condition trigger allows you to customize each default behavior under specified situation. You can use [kotlin Expression](kotlinexpression.md) to express conditions you want, and set the trigger timing by selecting one slot. When the trigger timing slot is done and the condition expression evaluates to true, the corresponding actions will be executed. 

For example, you offer a travel package includes flights and accommodation together, and the package cannot be purchased when either item is sold out. With condition you can notify the user earlier, instead of checking after the user has chosen. 

:::: conversation
::: user User
Book a travel package 
:::
::: bot Bot
Sorry, currently no package available. What else can I do for you?
:::
::::

### Update Action

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

::: tip Note
When use **Fill Slot** with code expression, you should make sure assignment actually works. For example, code expression should be valid ford current context.
:::


<!-- 不确定是否需要下面的细节，还是单独一个 Action 区域来讲 -->

<!-- 
#### Simple Reply

::: thumbnail
<img alt="transition-simple-reply" src="/images/annotation/transition/transition-simple-reply.png">
:::

Simple Reply is usually used to send plain and short messages to users. The messages can be text, card or payment. Learn more about this on [Channels' Overview](../channels/overview.md).



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

Intent Abort will also tell user `${intent?.typeName()} has been aborted!`. To customize the utterance, one needs to customize the response of [io.framely.core.AbortIntent](https://framely.naturali.io/org/5fa0e7dcf549c817cf952edd/agent/5fa27e3f3a0e9462a4a79edb/intent/5ffbe516d0953b9366732ff7?tab=2).

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
-->