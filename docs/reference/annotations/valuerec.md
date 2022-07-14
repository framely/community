# Value Recommendation

[[toc]]

## Motivation
When you need to ask user's preference on a slot that have many potential values, it is often a good idea to offer user a list of candidates value based on application logic, so it is easy for user to converge to a workable choice. For example

:::: conversation
::: user User
Get me two tickets for Star Wars for tonight, please.
:::
::: bot Bot
What time? For Star Wars, we only have two showings left at 19:30pm and 21:30pm. Which one do you want?
:::
::::

Instead of having many trials:
:::: conversation
::: user User
Get me two tickets for Star Wars for tonight, please.
:::
::: bot Bot
Ok, what time?
:::
::: user User
18:30pm
:::
::: bot Bot
Sorry, Star Wars at 18:30pm have sold out, please choose another time.
:::
::::

## Overview
When a slot has a large set of potentially valid values from user side, but much more restrictive set servable from business side, it is very useful to inform user as early as possible the acceptable ones per business logic. Value recommendation is one way of communicate such restriction so that user can pick from a smaller set of values that is pre-approved by business, instead of go through multiple round of trial and error.

Value recommendation is rather complex conversational component, consist of
- Source item list, where builder can specify a code expression or intent that return a list of the target type.
- Paging behavior, when list is long, it is important to support "page" navigation like interactions:
  - *"is there more options?"* for next page
  - *"can you go back? I like to see these options again."* for previous page. 
- Item picking, provide the ability to deal with selection expressions both by index or by name: 

| Selection 	| Examples 	|
|:--	|:---	|
|Can be expressed by the order in which they are placed	|*"the first one"*, *"second"*	|
| Can be expressed through specific properties	        |*"the red one"*, *"the hot one"*	|
| Support primitive expressions and pronoun expressions	|*"this city"*, *"over there"*	|
| Support don't care expressions                       |*"don't care"*, *"anything will do"*	|
- List rendering, allow builder to customize the template that verbalize the offer list in different languages.

Aside from these main control, Framely value recommendation also comes with other bells and whistles to make it easy to adapt to real world situations. For example, there is a hard and soft mode toggle, which indicates whether option or value outside what bot offers is acceptable. There is also annotation allow you customize the conversational behavior when the item list is empty or just had one entry. 

Value recommendation can be defined both on the slot level (both entity slot or frame slot) and frame level, with frame level definition available on all the slot of that frame automatically. The configuration of value recommendation is done in the follow UI:
::: thumbnail
![vr-popup](/images/annotation/valuerec/vr-popup.png)
:::

## How To Use
There are many controls on the VR component configuration page, that can be used to design conversational interface for different use case, let's go over them one by one.

### Hard Mode
#### Motivation
When bot recommends options or candidate values for given slot to user, there are two different scenarios: it will offer an exhaustive list of servable options, or only list of some samples. The conversational interaction logic can be very different when user pick item out of list, or when there is only one entry or even entry in the list. 

Hard is used to declare the relationship between business boundaries and recommendations. If the hard toggle is turned on, meaning your business scope is fully aligned with the recommended options. So if the item the user wants is not in all candidates, the bot will give user a default reply such as:

:::: conversation
::: bot Bot
Sorry, we do not offer Star Wars at this time.
:::
::::

Of course, you can customize them on the system intent `io.framely.core.BadIndex` and `io.framely.core.BadCandidate` by adding more replies. 

And if there are only one or zero recommended options, the default behavior will also be provided. The difference is that it needs to be defined in [Single Entry Prompts](./valuerec.md#single-entry) and [Zero Entry Prompts](./valuerec.md#zero-entry).

We recommend using hard mode when there are limited items and limited quantities. For example, when booking a flight ticket, hard mode can help your users understand the available flight arrangements. Users can choose what they want at one time, instead of trying multiple times and failing to get what they want each time.

::: tip Note
Customization of **system intent** will not only affect the current slot, but also the entire bot behaviors.
:::

### Source
Before you start, you should make sure services or APIs that host your business logic are available, as value recommendation will turn your business data into recommendations.

::: thumbnail
![vr-source](/images/annotation/valuerec/vr-source.png)
:::

Source is the place to declare where the recommended options come from. Normally, you can add it using function methods directly like ` function()` or `function(input: slot!!)` , which need to contact your service and return a list of options. However, in certain advanced scenarios, you may find it easier to define it with the code expression, which can generate dynamic suggestions. 

### Display

::: thumbnail
![vr-display](/images/annotation/valuerec/vr-display.png)
:::

Display is what the bot shows to the user. If the hard toggle is turned on, here are three different scenarios triggered by different result sets: 
- **List**: which indicates the returned content is multiple items.
- **Single entry**: which means there is only one item in the result set.
- **Zero entry**: which means the return content is just empty.

Otherwise, only the list scenarios will be shown. 

#### List

<!-- not sure this name is good? -->
You can use the List module to provide a text list or rich card experience. In order to simplify your definition work, some default behaviors have been provided here. If these default values ​​can meet your application scenario, then you only need to pay attention to header, body and footer, which shows the main part of display: 
- **Header**: text area, defines the title content of the recommended card, such as *"Top picks for you: "*, *"Recommended for you: "*.

- **Body**: text with code expression embedded, defines the recommended content body. The syntax of the body needs to follow the rules below: 

```kotlin
// index
${it.index + 1}  // index start with 0, so should '+1';

// Entity type
${it.value.name()}  // on platform, expressions[0] stand for normalized
${it.value.identifier()}  // on platform, entity instance label

// Frame type
${it!!.value}
```

::: thumbnail
![vr-dispaly-full](/images/annotation/valuerec/vr-dispaly-full.png)
:::

- **Footer**: text area, defines the bottom content or inform of the recommendation card.

- **Number of entries**: defines the number of items displayed per page. The default value is `5`. It can be modified to any value, but it needs to be considered with the channel that the bot will eventually deploy. 

- **Delimiter**: here are two fields
  - The first is used to define the delimiter between entries. The default value is `\n`, which indicates a line break. 
  - The second is used to define the delimiter of the last entry. It can be empty if not needed.


<!-- Todo: add template (universal message) -->

::: tip Note
In theory, you can define header, body, footer as any content as you want, but if you want to reuse these components, then from a presentation point of view, these can be defined a bit more generically.
:::

### Single-entry

Single entry prompt used to handle the scenario when there is only one entry in the recommended options. Like confirmation, there are two ways to provide it to your users: **Explicit** and **Implicit**：

::: thumbnail
![vr-sep-explict](/images/annotation/valuerec/vr-sep-explict.png)
*Explict*
:::

- **Explicit**: requires a reply from the user to confirm, usually *"yes/no"* or some synonym.

:::: conversation
::: user User
Get me two tickets for Star Wars for tonight, please.
:::
::: bot Bot
Star Wars, we only have it at 21:30pm. Would you like to get these?
:::
::::

::: thumbnail
![vr-sep-implicit](/images/annotation/valuerec/vr-sep-implicit.png)
*Implicit*
:::

- **Implicit**: does not require a reply from the user, simply confirms like *"Star War, at 21:30pm"* and moves on, although users might give one if they want to make a correction *"no, 18:30"*. In this example below, the next step is to explicitly confirm the purchase of these tickets.

:::: conversation
::: user User
Get me two tickets for Star Wars for tonight, please.
:::
::: bot Bot
Alright, Star Wars, at 21:30pm. Would you like to proceed with payment?
:::
::::

### Zero-entry

::: thumbnail
![vr-zep](/images/annotation/valuerec/vr-zep.png)
:::

When the recommendation is empty, the zero entry prompt will be replied to users. And then bot will exit the current intent as it can not provide the service anymore. If this default behavior does not meet your expectations, you can customize this behavior with Transition annotation, or recover some value at the previous slot with [Value Check](./valuecheck.md). 


### Expressions

::: thumbnail
![vr-expression](/images/annotation/valuerec/vr-expression.png)
:::

Expressions in value recommendation can provide an active way for your users to get choices directly like *"what do you have?"*, when they are in the dependent context.


### Considerations

Regardless where the VR is defined, they can be defined for slot with either entity type or frame type.
- **Entity Slot**: when slots are more or less independent, this give user the ability to incrementally communicate what they want.
- **Frame Slot**: Holistic, we always recommend multi slots simultaneously, and they will be filled together. 
::: thumbnail
![vr-source](/images/annotation/valuerec/valuerec_levels.png)
*Value recommendation on different levels*
:::
So you have to decide where to put it based on your business. 

::: tip Note
Don't care expressions need to be defined in another annotation, but the interactive experience will be reflected here. See more about [Don't Care](./dontcare.md).
:::

When designing value recommendations, you can also consider the pros and cons in the table below:

| With Value Recommendation 	| Without Value Recommendation 	|
|:---	|:---	|
|<ul><li>Makes it clear what the user can say by establishing boundaries.</li><li>Minimizes confusion, easy for users to answer.</li><li>Can feel limiting to users.</li></ul>	|<ul><li>Encourages the user to respond naturally and in their own words.</li><li>Difficult for users to anticipate what answers are supported.</li><li>Set expectations too high and overpromise.</li></ul>	|
