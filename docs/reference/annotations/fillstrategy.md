# Prompt Strategy

[[toc]]

## Motivation

If a user did not mention which movie they want to watch when buying tickets, we need to prompt the user for them. 
:::: conversation
::: user User
Can I get two tickets for 8:00pm please?
:::
::: bot Bot
Which movie? We have two options: Top Gun and Star Wars.
:::
::: user User
Which movie has IMAX version?
:::
::: bot Bot
Both. Which movie do you want to watch?
:::
::: user User
User: Top Gun, please.
:::
::::

## Overview
Prompt strategy is a required slot level annotation that you can use to control when and how to prompt for slot value.
- Strategy that decide whether or when to prompt the user to fill this slot. More importantly, it also defines how other fill annotations should work together. 
- Prompt is customization of dialog act SlotRequest, it contains a template that can be help to verbalize the slot request dialog act. Diversity of the response can be increased by adding more templates. For the strategy that requires prompt template, builder needs to provide at least one.

## How to Use
Prompt strategy is a composite annotation, as Framely provides a set of concrete strategy to cover different use cases and let's cover them one by one.

### Always
#### Overview
Always strategy works well with other annotations, in fact, it imposes no constraints on what you can do with the other [slot filling annotations](../../guide/slotfilling.md), including: [Initialization](init.md), [Value Recommendation](valuerec.md), [Value Check](valuecheck.md) and [Confirmation](confirmation.md). 
Always strategy is easy to set up:
- Set its Fill Strategy to Always
- Fill at least one template in the Prompt text input box.
 
#### How to Use
If a slot is required by business logic, you should configure the prompt strategy to be Always, bot will make sure this slot is filled properly. That means if a user does not mention their preference before, bot will prompt the user for it when it is time to fill this slot. Always strategy will guarantee there will be a value for the given slot.


### Conditional
#### Motivation
Not every slot is required to be filled. For example, when a user wants to watch a movie that does not have IMAX version, we should not be asking the user about it. For example:
If there is a Boolean slot to record whether a user wants to see the IMAX version, then for the movie with the IMAX version, bot can 
:::: conversation
::: user User
Can I get two tickets for 8:00pm Top Gun, please?
:::
::: bot Bot
Do you want the IMAX version?
:::
::: user User
Yes, please.
:::
::::
For a movie without IMAX version, bot can skip the otherwise silly question to ask.
:::: conversation
::: user User
Can I get two tickets for 8:00pm NomadLand, please?
:::
::: bot Bot
That will be $10. Please pay with ApplePay.
:::
::::

#### Overview
Conditional strategy gives builder a way to specify when or when not to prompt users for their choice on a given slot, by means of a boolean expression. As always, the slot used in this condition expression should be earlier than the current slot and bot behavior, when you reference a later slot in condition is not defined and can change without notice.

Like Always strategy, the Conditional strategy is also orthogonal or casts no constrains to other annotations in the [slot filling](../../guide/slotfilling.md) pipeline with the condition expression is evaluated to true. When it is evaluated to false, however, the slot will be left with unfilled and bot will move to the next slot or response.

Conditional strategy is easy to set up:
- Pick a slot, set its Fill Strategy to Conditional then, specify the conditional expression in Ask Condition input box, which should be a boolean expression in kotlin sense.
- Provide at least one template in Prompt for bot to generate natural language response.
- 
#### How to Use
Conditional strategy is useful for conditionally required slot. When slot are only required under some condition per business logic, you can use conditional strategy.



### Gated
#### Motivation
Some time, the information you want to collect from user might be too heavy or considered to be intrusive, so it is customary to ask permission from a user to get into details. For example, to figure out how long a patient had fever, is it on and off? what is the highest temperature, etc, directly poking on this can be a bit odd for the user.
:::: conversation
::: bot Bot
Since when have you had fever?
:::
::: user User
I don't have a fever. What are you talking about?
:::
::::

Instead, it is useful to first open the door before we ask a question about interior.
:::: conversation
::: bot Bot
Do you have a fever?
:::
::: user User
Yes.
:::
::: bot Bot
Since when?
:::
::::

Of course, user can say no so bot can move onto next slot.
:::: conversation
::: bot Bot
Do you have a fever?
:::
::: user User
Nope.
:::
::: bot Bot
How about headache?
:::
::::

#### Overview
Gated strategy can only be applied to frame slot. So to take advantage of this prompt strategy, you first need to define a frame to host the closely related slots. Like conditional strategy, this choice is also orthogonal to other annotations in the [slot filling](../../guide/slotfilling.md) pipeline. 

Boolean Gate will ask users the YES-or-NO question once, then waits for three kinds of answers:
If the answer is Yes, Framely will then follow the depth first rule and start to fill nested slots one at a time in their natural order. 
If the answer is slot value, Framely will assume gate is opened and start to fill nested slots with user input.
If the answer is NO, the frame slot will simply be skipped (neither be asked nor be filled).


Set up gated strategy is easy, on a **frame slot**:
- Set its Fill Strategy to Gated then configure the detail for gated strategy:
  - Prompt: template for boolean question that ask user whether he/she wants to or is able to provide slot value
  - Affirmatives and Negatives: expression exemplars to help DU, see [Affirmatives and Negatives in Confirmation](./confirmation.md#affirmatives-and-negatives)
- Provide at least one template for origin slot in its Prompt for bot to generate natural language response.

![boolean-gate](/images/annotation/fillstrategy/booleangate.png)

#### How to Use
When there is complex subject with many details, it is more natural to use a boolean question as gate to get user permission to go into details. This can reduce the user confusion and your effort to deal with resulted unhappy conversation path. 


### Recover Only

#### Motivation
When a service option might only apply to a very small subset of users, like wheelchair assistance, prompting every user for their choice is not a good user experience. But when the initial value, either from user input or initialization failed value check of confirmation, bot need to prompt user for new value. 

:::: conversation
::: bot Bot
Two one way ticket from Beijing to New Yok on July 1st, is this all?
:::
::: user User
I need wheelchair assistance.
:::
::: bot Bot
Do you have your own mobility device or do you want airport wheelchair service?
:::
::::

It is not appropriate to ask whether a user has own mobility cart in general, but if the user mentioned it first, we can go back and fill them.

#### Overview
When a slot is configured to have recovering prompt strategy, the bot will not be prompt unless there are some prior effort to fill it, either initialization by builder or prior mention by user.

Configure the recover only is simple
- Set its Fill Strategy to Recovering
- Provide at least one template in Prompt for bot to generate natural language response. 

#### How to Use
RecoverOnly strategy can be useful for the following use cases:
- Businesses have a default behaviour / choice that could satisfy most users in form of initialization, but that does not gain user's approval, this strategy kick in.
- Businesses have a behaviour / choice they don't want to promote, but still need to handle if it's required.
- Users might say something bot cannot understand or offer some slot value that fails the Value Check or suggestion initialization failed to get user approval. In these cases, re-prompt is needed to request the slot value from user again.


### External 

#### Motivation
Sometimes, bot needs to rely on external event generated by trusted software to change the state of slot filling. For example, when bot needs to wait for user to execute some client action, say payment, any only resume conversation when the preconfigured third-party send expected events.

:::: conversation
::: bot Bot
Your order contains 10 roses. Please complete the [payment]().
:::
::::
At this point, conversation should be paused. The payment client action is configured so that payment service will send back event. Afte ther user finishes the payment action, bot will get that expected event
and then resume the conversations:
:::: conversation
::: bot Bot
Payment completed. Thanks for your business.
:::
::::

#### Overview
External Event by itself only means blocking (of course some [Inform](https://www.framely.ai/reference/annotations/inform.html) is allowed before blocking). It is the builder's responsibility to configure the trusted software to send in an event to finish the blocked intent in the conversation. 

Apart from that, if the businesses wants to interact differently depending on how well the client action has done (e.g. is it successful, failed, or timed out), it needs to do some conditional branching with the hosting slot's value, just like all the other slots did. One typical place to do this is [Response](https://www.framely.ai/reference/annotations/response.html).

To set a slot's prompt strategy to be external:
- set its Prompt Strategy to External
- Inform: provide template to inform a user the conversation state,
- Configure the third party software to send event to resume the intent. Different third party software have different mechanism.

#### How to Use
Whenever the bot needs to work with external software, external fill strategy is your choice. Use inform to let the user know when the ball is in somebody else's courts and continue with updated status when it got triggered by external event.

