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
Always strategy works well with other annotations, in fact, it imposes no constraints on what you can do with the other [slot filling annotations](../../guide/slotfilling.md), including: [Initialization](init.md), [Value Recommendation](valuerec.md), [Value Check](vc.md) and [Confirmation](./reference/annotations/confirmation.md). Framely runtime will make sure the configurations on these annotations will work together seamlessly.

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
  - Prompt: boolean question that ask user whether he/she wants to or is able to provide slot value
  - Affirmatives and Negatives: see [Affirmatives and Negatives in Confirmation](./confirmation.md#affirmatives-and-negatives)

![boolean-gate](/images/annotation/fillstrategy/booleangate.png)


## User Mentioned

User Mentioned means bot will only ask user when he/she proactively mentions it first. 

It is commonly used to support CUXs (or services, to be more accurate) that: 

- Businesses have a default behaviour / choice that could satisfy most users, so they decide to sacrifice minority for majority.
- Businesses have a behaviour / choice they don't want to promote, but still need to handle if it's required.



There are three possible behaviours under User Mentioned:

- When user mentions slot value 
  - under a Single-Valued slot: bot collects the value and moves forward
  - under a Multi-Valued slot: bot collects this value as an entry, and proactively requests for the next entry until the Multi-Valued slot achieves maximum limitation or user doesn't want more.
- When user mentions nothing
  - slots will be skipped (neither be asked nor be filled), regardless of Single-Valued or Multi-Valued



**[Usage Instruction]**

<Badge type="warning" text="Required" vertical="top" />

- Create a slot
- Set its Fill Strategy to User Mentioned
- [Prompts](https://www.framely.ai/reference/annotations/prompts.html): Prompts are still required as the slot value user mentioned may not be qualified. For example, users might say something bots cannot understand, or offer some slot value that fails the Value Check. In these cases, re-prompt is needed to request the slot value from user again.

<Badge type="tip" text="Preferred" vertical="top" />

- All annotations relate to [Slot Filling](https://www.framely.ai/reference/slotfilling.html), including: [Value Recommendation](https://www.framely.ai/reference/annotations/vr.html), [Value Check](https://www.framely.ai/reference/annotations/vc.html) and [Confirmation](https://www.framely.ai/reference/annotations/confirmation.html). You are suggested to use them based on requirements.



**[Example]**

Suppose most people don't want a message card when they buy flowers, so the flower shop decides to make a message card as a "hidden surprise". 

To support this, they need to:

- create a slot named messageCard
- set its Fill Strategy to User Mentioned
- add a prompt of "What message do you want to leave?"

And the following conversation can be expected: 

::: story

**Use case 1: user mentions**

Bot: *What kind of flower do you like?*

User: *Rose<br/>&emsp;&emsp;Oh, can you leave a message of "How many loved your moments of glad grace..."*

Bot: *Just leave the note for you.<br/>&emsp;&emsp;Your order is done.*

:::

::: story

**Use case2: user doesn't mention**

Bot: *What kind of flower do you like?*

User: *Rose*

Bot: *Ok, then your order is done.*

:::

## Repair Only


## Never

There are chances businesses want to specify slot value by themselves instead of users. Never ask offers the ability to do that.

Never Ask by itself only means never ask. If nothing else is done, the slot will be skipped (neither be asked nor be filled). This is why Framely uses it as the default choice for Fill Strategy. However, if businesses use Never Ask with SlotInit in Transition, they can then provide slot values with Code Expression, which could be a constant, a synchronous service function etc.

Never Ask alters the standard [Slot Filling](https://www.framely.ai/reference/slotfilling.html) phases by ignoring Ask / Value Recommendation, Value Check and Confirmation. This basically is another way of saying Never Ask doesn't interact with users.



**[Usage Instruction]**

<Badge type="warning" text="Required" vertical="top" />

- Create a slot
- Set its Fill Strategy to Never Ask
- No annotations that required to interact with users should be defined, including: [Prompts](https://www.framely.ai/reference/annotations/prompts.html), [Value Recommendation](https://www.framely.ai/reference/annotations/vr.html), [Value Check](https://www.framely.ai/reference/annotations/vc.html) and [Confirmation](https://www.framely.ai/reference/annotations/confirmation.html). Like the name implied, bot NEVER ASKs. Notice that if these annotations were added out of careless, bot will simply ignore them.

<Badge type="tip" text="Preferred" vertical="top" />

- [Transition](https://www.framely.ai/reference/annotations/transition.html): use SlotInit in Transition to initialize a slot value. Detailed configuration goes as follow:
  - set Trigger Method to State
    - set State's Target Slot to the hosting slot of Never Ask
    - set State's State to SlotInit
  - set Update Action to Fill Slot
    - set Fill Slot's Target Slot to the hosting slot of Never Ask
    - set Fill Slot's Code Expression to the slot value needs to be provided

![never-ask](/images/annotation/fillstrategy/neverask3.png)

**[Example]**

Suppose Valentine's day is coming, the flower shop wants to sell their roses for 10 pieces in a bunch so that they can prepare ahead. 

To support this, they need to:

- create a slot named quantity
- set its Fill Strategy to Never Ask
- set the Transiton to State trigger, and SlotInit it to 10

And the following conversation can be expected: 

::: story

Bot: *Happy Valentine's day! We only sell roses for tens a bunch today.<br/>&emsp;&emsp;What kind of flower do you like?*

User: *Rose*

Bot: *Ok, then your order is done for 10 roses.*

:::


## External Event

Like Never Ask, External Event also gathers slot value from businesses, but targets a different scenario: businesses send an asynchronous client action, then BLOCKs until the the third-party resumes and updates conversation.

External Event by itself only means blocking (of course some [Inform](https://www.framely.ai/reference/annotations/inform.html) is allowed before blocking). It is the external event's responsibility to provide slot value and unblocking the conversation. External events have many forms, callback function is one of the kind. 

Apart from that, if businesses want to interact differently depending on how well the client action has done (e.g. is it succeed, failed, or timed out), it needs to do some conditional branching with the hosting slot's value, just like all the other slots did. One typical place to do this is [Response](https://www.framely.ai/reference/annotations/response.html).



**[Usage Instruction]**

<Badge type="warning" text="Required" vertical="top" />

- Create a slot
- Set its Fill Strategy to External Event

<Badge type="tip" text="Preferred" vertical="top" />

- [Inform](https://www.framely.ai/reference/annotations/inform.html): inform users there's an asynchronous client action happening, and they have to wait until bot gets feedback.



**[Example]**

To complete the flower booking, users must pay for their order first. 

To support this, the flower shop needs to:

- create a slot named isPaid
- set its Fill Strategy to External Event
- set Inform in isPaid to "You need to complete payment to secure the order."
- set Response condition to `isPaid Equal true`, simple reply under that condition to "Payment completed."

And the following conversation can be expected: 

::: story

Bot: *Your order contains 10 roses.<br/>&emsp;&emsp;[Payment Link]<br/>&emsp;&emsp;You need to complete payment to secure the order.*

*... BOT WAITING...*

User: *(Pay for the order)*

Bot: *Payment completed.<br/>&emsp;&emsp;Your order is done.*

:::

