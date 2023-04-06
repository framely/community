# Value recommendation

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
::: user User
19:00pm
:::
::: bot Bot
Sorry, Star Wars at 19:00pm have sold out, please choose another time.
:::
::::

## Overview
When a slot has a large set of potentially valid values from user side, but much more restrictive set servable from business side, it is very useful to inform user as early as possible the acceptable ones per business logic. Value recommendation is one way of communicate such restriction so that user can pick from a smaller set of values that is pre-approved by business, instead of go through multiple round of trial and error.

Value recommendation is rather complex conversational component, consist of
- **Source**: where builder can specify a code expression or skill that return a list of value of the target type.

- **Paging behavior**: when list is long, it is important to support "page" navigation like interactions:
  - *"Is there more options?"* for next page.
  - *"Can you go back? I like to see these options again."* for previous page. 

- **Item picking**: provide the ability to deal with selection expressions both by index or by name: 

| Selection 	| Examples 	|
|:--	|:---	|
|Can be expressed by the order in which they are placed	|*"the first one"*, *"second"*	|
| Can be expressed through specific properties	        |*"the red one"*, *"the hot one"*	|
| Support primitive expressions and pronoun expressions	|*"this city"*, *"over there"*	|
| Support don't care expressions                       |*"don't care"*, *"anything will do"*	|

- **List rendering**: allow builder to customize the template that verbalize the offer list in different languages.

::: tip Note
Don't care expressions need to be defined in another annotation, but the interactive experience will be reflected here.
:::

Aside from these main control, OpenCUI value recommendation also comes with other bells and whistles to make it easy to adapt to real world situations. For example, there is a hard and soft mode toggle, which indicates whether option or value outside what bot offers is acceptable. There is also annotation allow you customize the conversational behavior when the item list is empty or just had one entry. 

Value recommendations can be defined at the slot level(both entity slot or frame slot) or type level. If it is defined at the type level, the bot will recommend the entire frame/skill based on that recommendation. The configuration of value recommendation is done in the follow UI:
::: thumbnail
![value rec popup](/images/annotation/valuerec/valuerec.png)
:::

## How to use
There are many controls on the **Value recommendation** component configuration page, that can be used to design conversational interface for different use case, let's go over them one by one.

### Hard mode

When bot recommends options or candidate values for given slot to user, there are two different scenarios:
- When servable options are small enough, it can offer an exhaustive list of servable options, for example:
:::: conversation
::: bot Bot
Which color do you want on the tempo next percent? We only have white and also black left.
:::
::::

- When there are too many valid options, it is not a good idea to list them all, particularly on voice only channel like speaker. So it is a good idea to convey the suggestion nature of your offer:
:::: conversation
::: bot Bot
How can I help you today? Mr. Bond. For example, I can help you with your monthly payment, or check new balance. 
:::
::::

When the number of valid choices business can serve is small, you can turn on the **Hard toggle** to control the conversational experience and communicate to user that the choices you offer are the only ones that will be accepted by your business:

::: thumbnail
![valuerec-hard](/images/annotation/valuerec/valuerec_hard.png)
:::

So if the item the user wants is not in the list of candidates, the bot will not try to fill the slot with the proposed value, i.e. going the value check phase, instead, it will stay at the prompt phase, and give user a default reply such as:
:::: conversation
::: bot Bot
Sorry, we do not offer Star Wars at this time. The only available showtime for Star Wars is 8:00pm and 10:00pm. Which time do you prefer?
:::
::::
The exact script of the first part can be customized on the system skill `io.opencui.core.BadIndex` and `io.opencui.core.BadCandidate` by adding more replies. 

The conversational behavior will also be customized under hard mode for cases when number of entries return the source is one or zero, which can be defined in [Single entry informs](./valuerec.md#single-entry) and [Zero entry informs](./valuerec.md#zero-entry).

::: tip Note
Customization of **system skill** will not only affect the current slot, but also the entire bot behaviors.
:::

#### Two special cases
Whenever there are limited valid options for a slot based on business data, you should enable hard mode. This will give you the customized behavior under tbe strong assumption that user can only pick options from the list of the offered options. After you turn on the hard mode for value recommendation, you can supply the template for two special cases:

- ##### Single entry

Under the hard mode, if there are only one candidate options from the source, the entire conversational experience for the current slot will actually change to something more effective: bot will skip the prompt phase, and go directly to confirmation phase, where an implicit confirmation is required for single entry under hard mode. For example, when user want to one ticket for Star Wars without specifying the showtime:
:::: conversation
::: bot Bot
Ok, available Star Wars showtime is 8:00pm. 
> :memo: **Tip:** implicit confirmation for single entry inform.

Do you want to watch IMAX version? 

> :memo: **Tip:** move onto next slot.
:::
::::

Single entry inform is essentially an implicit confirmation, where bot let users which option bot will assume so that both bot and user can be on the same page. 

The configuration of single entry inform can be done here:
::: thumbnail
![value rec single entry](/images/annotation/valuerec/valuerec_singleentry.png)
:::

- ##### Zero entry

When the recommendation list is empty, the zero entry inform will be replied to users. And then bot will exit the current skill as it can not provide the service anymore. If this default behavior does not meet your expectations, you can customize this behavior with Transition annotation, or recover some value at the previous slot with [Value Check](./valuecheck.md). 

:::: conversation
::: bot Bot
Sorry, we do not have available showtime for Star Wars. What else can I do for you?
:::
::::

The template for this unhappy path can be configured here:
::: thumbnail
![value rec zero entry](/images/annotation/valuerec/valuerec_zeroentry.png)
:::


### Source
To finish a transaction, user and bot need to agree on something that both user wants and business can serve. Source is designed for builder to specify a list of value candidates for the given slot that business can serve. Informing user this list can thus help to converge conversation faster to completion of transaction. 

You use source to specify the list of candidate values for the target slot. For better experience, the candidates in this list should only include the options that are servable according to business logic or data. 

When user want to get a pair of running shoes at Nike store, we need to ask couple questions to narrow down the lists, otherwise the list will be too long, particularly for communicating via voice: 
:::: conversation
::: bot Bot
Sure, what kind of running shoes do you prefer? Do you need it for training or racing?
:::
::: user User
Training please.
:::
::: bot Bot
Running shoes for training, got it. Here are the running shoe series designed for training: Zoom Tempo NEXT%, ...
:::
::::

In OpenCUI, each skill is abstraction of a function with conversational behavior defined on top of it, including its input parameters. Each skill has a return. When a skill has a return type of multivalued target slot type, we can use it as source for value recommendation for the slot. To specify the list of candidates via user interaction, you just need to active intern based source configuration and proceed with specifying what skill you want, and how to initialize some of it slots before we acttive the skill to get candidate list.

::: thumbnail
![value rec source](/images/annotation/valuerec/valuerec_source.png)
:::

When number of servable options for the target slot is not that much, you can instead directly specify it via code expression. In code expression, you can call out to service functions like ` function()` or `function(input: slot!!)`, and optionally apply some post-processing in Kotlin. If the service function is implemented to return only up-to-date options, then you will offer dynamic suggestions. But you can even specify a static list if it makes business sense, for example:
```kotlin
listOf(Color.Red, Color.Black)
```
This will offer two colors for the user to choose from.

### Display

::: thumbnail
![value rec display](/images/annotation/valuerec/valuerec_display.png)
:::

Display defines how the bot renders the list of options to the user. If the hard toggle is turned on, here are three different scenarios triggered by different result sets: 
- **List**: which indicates the returned content is multiple items.
- **Single entry**: which means there is only one item in the result set.
- **Zero entry**: which means the return content is just empty.

Otherwise, only the list scenarios will be shown. 

#### List

<!-- not sure this name is good? -->
You can use the List module to provide a text list or rich card experience at json format level. In order to simplify your definition work, some default behaviors have been provided here. If these default values can meet your application scenario, then you only need to pay attention to header, body (which will be repeated based the list, and pagination configurations) and footer, which shows the main part of display: 

::: thumbnail
![vr-dispaly-full](/images/annotation/valuerec/vr-dispaly-full.png)
:::

- **Number of entries**: defines the number of items displayed per page. The default value is `5`. It can be modified to any value, but it needs to be considered with the channel that the bot will eventually deploy.

- **Delimiter**: here are two fields
  - The first is used to define the delimiter between entries. The default value is `\n`, which indicates a line break.
  - The second is used to define the delimiter of the last entry. It can be empty if not needed.
  
- **Header**: text area, defines the title content of the recommended card, such as *"Top picks for you: "*, *"Recommended for you: "*.

- **Body**: text with code expression embedded, defines the recommended content body. The syntax of the body needs to follow the rules below: 

```kotlin
// index
${it.index + 1}  // index starts with 0, so should '+1';

// Entity type
${it.value!!.expression()}  // on platform, expressions[0] stands for expression

// Frame type
${it!!.value}
```

- **Footer**: text area, defines the bottom content or inform of the recommendation card.


::: tip Note
In theory, you can define header, body, footer as any content as you want, but if you want to reuse these components, then from a presentation point of view, these can be defined a bit more generically.
:::

### Considerations

When designing value recommendations, you can also consider the pros and cons in the table below:

| With value recommendation 	                                                                                                                                                  | Without value recommendation 	                                                                                                                                                                               |
|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <ul><li>Makes it clear what the user can say by establishing boundaries.</li><li>Minimizes confusion, easy for users to answer.</li><li>Can be limiting to users.</li></ul>	 | <ul><li>Encourages the user to respond naturally and in their own words.</li><li>Difficult for users to anticipate what answers are supported.</li><li>Set expectations too high and overpromise.</li></ul>	 |

<br>

Regardless where the value recommendation is defined, they can be defined for slot with either entity type or frame type. So you have to decide where to put it based on your business. 
- **Entity slot**: when slots are more or less independent, this give user the ability to incrementally communicate what they want.
- **Frame slot**: holistic, we always recommend multi slots simultaneously, and they will be filled together. 
::: thumbnail
![value rec levels](/images/annotation/valuerec/valuerec_levels.png)
*Value recommendation on different levels*
:::
