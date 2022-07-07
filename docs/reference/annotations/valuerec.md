# Value Recommendation

[[toc]]

## Motivation
When you need to ask user's preference on a slot that have many potential values, it is often a good idea to offer user a list of candidates value based on application logic, so it is easy for user to converge to a workable choice. For example

:::: conversation
::: user User
Get me two tickets for Star Wars for tonight, please.*
:::
::: bot Bot
What time? For Star Wars, we only have two showings left at 19:30pm and 21:30pm. Which one do you want?
:::
::::

Instead of having many trials:
:::: conversation
::: user User
Get me two tickets for Star War for tonight, please.
:::
::: bot Bot
Ok, what time?
:::
::: user User
18:30pm
:::
::: bot Bot
Sorry, Star War at 18:30pm have sold out, please choose another time.
:::
::::

## Overview
When a slot has a large set of potentially valid values from user side, but much more restrictive set from business side, it is very useful to inform user as early as possible the restriction business had on the slot value. Value recommendation is one way of communicate such restriction so that user can focus on picking from a smaller pre-approved set of values that business had no problem to serve.

When designing value recommendations, you can also consider the pros and cons in the table below:

| With Value Recommendation 	| Without Value Recommendation 	|
|:---	|:---	|
|<ul><li>Makes it clear what the user can say by establishing boundaries.</li><li>Minimizes confusion, easy for users to answer.</li><li>Can feel limiting to users.</li></ul>	|<ul><li>Encourages the user to respond naturally and in their own words.</li><li>Difficult for users to anticipate what answers are supported.</li><li>Set expectations too high and overpromise.</li></ul>	|

## Features

The features of value recommendation are as follows:

### Interactive level

1. Support page navigation, like *"next page"*, *"previous page"*. 

2. Provide the ability to deal with selection expressions in order or by name: 

| Features 	| Examples 	|
|:---	|:---	|
|Can be expressed by the order in which they are placed	|*"the first one"*, *"second"*	|
|Can be expressed through specific properties	|*"the red one"*, *"the hot one"*	|
|Support primitive expressions and pronoun expressions	|*"this city"*, *"over there"*	|
|Support don't care expressions |*"don't care"*, *"anything will do"*	|

::: tip Note
Don't care expressions need to be defined in another annotation, but the interactive experience will be reflected here. See more about [Don't Care](./dontcare.md).
:::

### Business boundaries

Some default behaviors are already supported here, and you can use them directly. If they are not enough, you can customize them with Transition Component.

1. Provide hard mode as the relationship between recommendations and business scope. When the user's expression is out of range, the default response like *"Sorry, we do not offer Star War at this time."* will be replied. 

2. Support to define the confirmation or prompt, when the option of recommendations is single entry or zero entry.
  
  
## Related Annotations

![Value Rec related annotation](/images/annotation/valuerec/valuerec_related.png)

#### Prompt <Badge type="warning" text="Required" />
Once you’ve decided to offer a value recommendation, there must have a prompt in front, as users require this context to understand these recommendation items. For example, you can not always recommend a timetable directly, instead you'd better to indicate the context of the timetable:

::: story
Bot: *What time would you like to leave on the __outbound flight__ ?*
  - *10:30*
  - *11:30*
  - *12:30*
  - ……
:::

::: story
Bot: *What time would you like to leave on the __return flight home__ ?*
  - *10:30*
  - *11:30*
  - *12:30*
  - ……
:::

#### Value Check <Badge text="Preferred" />
With the help of [value check](./valuecheck.md), the bot can find out in time whether the value provided by the user satisfies the business boundaries. For example, when buying a movie ticket, the bot can inform the user in advance whether there is a schedule for the time, instead of notifying it when the last process is reached. 

::: story
Bot: *What time would you like to leave on the outbound flight ?*
  - *10:30*
  - *11:30*
  - *12:30*

User: *I would like to leave at 5pm.*

Bot: *Sorry, tickets at 5pm have sold out, please choose another time.*
:::

#### Confirmation <Badge text="Preferred" />
[Confirmation](./confirmation.md) can give users feedback on how their input was understood. This not only empowers users to correct mistakes immediately, but it also reassures them in a socially and conversationally appropriate way by establishing common ground. 

::: story
Bot: *You want a one way ticket for:*
  - *From JFK To London*
  - *Leaving on 2022-12-25*
  - *Time 17:00:00*

*Is that correct?*
:::


## How To Use

Before you start, you should make sure services or APIs that host your business logic are available, as value recommendation will turn your business data into recommendations.

There are two places that you can define value recommendation: slot level and frame level, different places have different meanings: 
- **Slot Level**: Progressive, We value rec one column at a time, which can quickly result in nothing to recommend for the next slot.
- **Frame Level**: Holistic, we always recommend multi slots simultaneously, and they will be filled together. 
::: thumbnail
![vr-source](/images/annotation/valuerec/valuerec_levels.png)
*Value recommendation on different levels*
:::
So you have to decide where to put it based on your business. 


### Hard Mode

::: thumbnail
![vr-popup](/images/annotation/valuerec/vr-popup.png)
:::

Hard is used to declare the relationship between business boundaries and recommendations. If the hard toggle is turned on, meaning your business scope is fully aligned with the recommended options. So if the item the user wants is not in all candidates, the bot will give user a default reply such as:

::: story
Bot: *Sorry, we do not offer Star War at this time.*
:::

Of course, you can customize them on the system intent `io.framely.core.BadIndex` and `io.framely.core.BadCandidate` by adding more replies. 

And if there are only one or zero recommended options, the default behavior will also be provided. The difference is that it needs to be defined in [Single Entry Prompts](./valuerec.md#single-entry) and [Zero Entry Prompts](./valuerec.md#zero-entry).

We recommend using hard mode when there are limited items and limited quantities. For example, when booking a flight ticket, hard mode can help your users understand the available flight arrangements. Users can choose what they want at one time, instead of trying multiple times and failing to get what they want each time.

::: tip Note
Customization of **system intent** will not only affect the current slot, but also the entire bot behaviors.
:::

### Source

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

#### Single-entry

Single entry prompt used to handle the scenario when there is only one entry in the recommended options. Like confirmation, there are two ways to provide it to your users: **Explicit** and **Implicit**：

::: thumbnail
![vr-sep-explict](/images/annotation/valuerec/vr-sep-explict.png)
*Explict*
:::

- **Explicit**: requires a reply from the user to confirm, usually *"yes/no"* or some synonym.

::: story
User: *Get me two tickets for Star War for tonight, please.*

Bot: *Star War, we only have it at 21:30pm. Would you like to get these?*
:::

::: thumbnail
![vr-sep-implicit](/images/annotation/valuerec/vr-sep-implicit.png)
*Implicit*
:::

- **Implicit**: does not require a reply from the user, simply confirms like *"Star War, at 21:30pm"* and moves on, although users might give one if they want to make a correction *"no, 18:30"*. In this example below, the next step is to explicitly confirm the purchase of these tickets.

::: story
User: *Get me two tickets for Star War for tonight, please.*

Bot: *Alright, Star War, at 21:30pm. Would you like to proceed with payment?*
:::

#### Zero-entry

::: thumbnail
![vr-zep](/images/annotation/valuerec/vr-zep.png)
:::

When the recommendation is empty, the zero entry prompt will be replied to users. And then bot will exit the current intent as it can not provide the service anymore. If this default behavior does not meet your expectations, you can customize this behavior with Transition annotation, or recover some value at the previous slot with [Value Check](./valuecheck.md). 


### Expressions

::: thumbnail
![vr-expression](/images/annotation/valuerec/vr-expression.png)
:::

Expressions in value recommendation can provide an active way for your users to get choices directly like *"what do you have?"*, when they are in the dependent context.