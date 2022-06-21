# Prompt Strategy

[[toc]]

## Overview

If user did not mention which movie they want to watch when buying tickets, we need to prompt user for them. 
::: story 
User: Can I get two tickets for 8:00pm please?

Bot: *Which movie? We have two options: Top Gun and Star Wars.*

User: What moive has IMAX version?

Bot: *Both. Which movie do you want to watch?*

User: Top Gun, please.
:::

Prompt strategy is a required slot level annotation that builder can use to control the following aspects of slot filling when user did not provide their preference for given slot:
- Strategy that decide whether to prompt user to fill this slot. The interaction logic defined on Framely is deterministic, so if a slot is decided to be filled by the chosen strategy, then bot will not stop to prompt user for this slot until it is successfully filled and bot moves onto the next slot or response. The digression initiated by user will not change this unless the current intent is aborted or terminated.
- Template that can be help to verbalize the slot request dialog act. Diversity of the response can be increased by adding more templates. Eventually, bot might support data to text models, when they become practical. For the strategy that needs template, builder need to provide at least one.

Prompt strategy is a composite annotation, as Framely provides a set of concrete strategy to cover different use cases, and let's cover them one by one.

## Always
#### Motivation
If a slot is required by business logic, you should configure the prompt strategy to be Always, bot will make sure this slot is filled properly. That means if user did not mention their preference before bot get to this slot, bot will prompt user for it. Always strategy will guarantee there will be value for the given slot.

#### Analysis
Always strategy works well with other annotations, in fact, it imposes no constraints on what you can do with the other [slot filling annotations](../../guide/slotfilling.md), including: [Initialization](init.md), [Value Recommendation](valuerec.md), [Value Check](valuecheck.md) and [Confirmation](./reference/annotations/confirmation.md). Framely runtime will make sure the configurations on these annotations will work together seamlessly.

#### How to Configure
Always strategy is easy to set up:
- Pick a slot
- Set its Fill Strategy to Always
- Fill at least one template in the Prompt text input box.

## Conditional
#### Motivation
Not every slot is required to be filled. For example, when user want to watch a movie that do not have IMAX version, we should not be asking user about it. For example:
If there is a Boolean slot to record whether user wants to see IMAX version, then for movie with IMAX version, bot can 
::: story 
User: Can I get two tickets for 8:00pm Top Gun, please?

Bot: *Do you want the IMAX version?*

User: Yes, please.
:::

::: story
User: Can I get two tickets for 8:00pm NomadLand, please?

Bot: *That will be $10. Please pay with ApplePay.*
:::

#### Analysis
On CUI level, this means a slot can be left unfilled when finish the interaction, and service API then should be prepared for such case, and potentially have default value for such slot at business logic level. 

Conditional is designed for businesses who need to ask and collect information dependently. 

Like Always strategy, the Conditional strategy is also orthogonal to other annotations in the [slot filling](../../guide/slotfilling.md) pipeline. 

#### How to Configure

- Pick a slot
- Set its Fill Strategy to Conditional, then specify the conditional expression in Ask Condition input box, which should be configured like [Condition in Confirmation](./confirmation.md#condition)
- Provide at least one template in Prompt for bot to generate natural language response.

## Gated
#### Motivation
Some time, the information you want to collect from user might be too heavy, or considered to be intrusive, so it is useful for bot to first ask permission before the real question? To figure out how long a patient had fever, is it on and off? what is the highest temperature, etc, directly start on this can be a bit odd for user.
::: story
Bot: *Since when you had fever?*
:::
Instead, it is useful to first open the door before we ask question about interior.
::: story
Bot: *Do you have a fever?*

User: Yes.

Bot: *Since when?*
:::

::: story
Bot: *Do you have a fever?*

User: Nope.

Bot: *How about headache?*
:::

#### Analysis
Gated strategy can only be applied to frame slot. So to take advantage of this prompt strategy, you first need to define a frame to host the closely related slots. Like conditional strategy, this choice is also orthogonal to other annotations in the [slot filling](../../guide/slotfilling.md) pipeline. 

Boolean Gate will ask users the YES-or-NO question once and once only, then waits for three kinds of answers:
If the answer is Yes, Framely will then follow the depth first rule, and start to fill nested slots one at a time in their natural order. 
If the answer is slot value, Framely will assume gate is opened, and start to fill nested slots with user input.
If the answer is NO, the frame slot will simply be skipped (neither be asked nor be filled).

#### How to Configure

- Pick a **frame slot**
- Set its Fill Strategy to Gated, then configure the detail for gated strategy:
  - Prompt: template for boolean question that ask user whether he/she wants to or is able to provide slot value
  - Affirmatives and Negatives: expression exemplars to help DU, see [Affirmatives and Negatives in Confirmation](./confirmation.md#affirmatives-and-negatives)
- Provide at least one template for origin slot in its Prompt for bot to generate natural language response.

![boolean-gate](/images/annotation/fillstrategy/booleangate.png)


## RecoverOnly

#### Motivation
When a service option might only apply to a very small subset of users, like wheelchair assistance, prompt every user for their choice is not a good user experience. But when the initial value, either from user input or initialization failed value check of confirmation, bot need to prompt user for new value. 

::: story
Bot: *Two one way ticket from Beijing to New Yok on July 1st, is this all?*

User: I need wheelchair assistance.

Bot: *Do you have your own mobility device, or you want airport wheelchair service?*
:::

It is not appropriate to ask whether user have own mobility cart in general, but if user mentioned it first, we can go back and fill them.

#### Analysis
RecoverOnly strategy can be useful for the follow use cases:
- Businesses have a default behaviour / choice that could satisfy most users, but the default value does not work out, this strategy kick in.
- Businesses have a behaviour / choice they don't want to promote, but still need to handle if it's required.
Like conditional strategy, this choice is also orthogonal to other annotations in the [slot filling](../../guide/slotfilling.md) pipeline. 

When a slot is configured to have recovering prompt strategy, bot will not be prompt unless there are some prior effort to try to fill it.

#### How to Configure

- Pick a slot
- Set its Fill Strategy to Recovering
- Provide at least one template in Prompt for bot to generate natural language response. Users might say something bots cannot understand, or offer some slot value that fails the Value Check. In these cases, re-prompt is needed to request the slot value from user again.

## External 

#### Motivation
Some time, bot need to rely on external event generated by trusted software to change the state of slot filling. For example, when bot need to wait for user to execute some client action, say payment, any only resume conversation when the preconfigured third-party send expected events.

::: story
Bot: *Your order contains 10 roses. Please complete the [payment]().*
:::
At this point, conversation should be paused. The payment client action is configured so that payment service will send back event. After user finish the payment action, bot will get that expected event, 
and then resume the conversations:
::: story
Bot: *Payment completed. Thanks for your business.*
:::

#### Analysis
External Event by itself only means blocking (of course some [Inform](https://www.framely.ai/reference/annotations/inform.html) is allowed before blocking). It is the builder's responsibility to configure the trusted software to send in event to finish the blocked intent. the conversation. 

Apart from that, if businesses want to interact differently depending on how well the client action has done (e.g. is it succeed, failed, or timed out), it needs to do some conditional branching with the hosting slot's value, just like all the other slots did. One typical place to do this is [Response](https://www.framely.ai/reference/annotations/response.html).

#### How to Configure
- Pick a slot.
- set its Prompt Strategy to External
- Inform: provide template for inform user the conversation state, and they need to do something externally to resume the intent. 

