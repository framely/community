# System Intent and System Frame

## Slot Update

### Motivation
People want to change slots value for many reasons. The most possibles are: they made a silly mistake, or their previous choices put them between two fires, or they simply changed their mind.

io.framely.core.SlotUpdate offers an experience allowing one to change a slot value by a few words instead of redo the whole conversation. For example, when user change his mind during food ordering:

:::: conversation
::: bot Bot
What kind of dish do you want? We have: 1. Pork Belly, 2. Roast Seabass 3. Roast Duck
:::
::: user User
The first one
:::
::: bot Bot
OK. What kind of drink do you want? We have: 1. Cabernet Sauvignon 2. Riesling
:::
::: user User
I'm really in the mood for something fresh and fruity now, so Riesling please. And can I change the previous order to Roast Seabass?
:::
::: bot Bot
Sure. Changed dish from Pork Belly to Roast Seabass.
:::
::::


### Analysis
Request for io.framely.core.SlotUpdate can be seen as a special digression, so user can express their willingness at anytime.

Clearly, they have to tell bot they want to change from what to what else. This means they might mention a specific slot, some slot value that they have given (an old value), some other value they want to update to (a new value), and when the slot is a multi-valued one, exactly which piece of value (the index) they want to change. io.framely.core.SlotUpdate supports user giving any combination of the information upon, and one can easily customize their own expressions in io.framely.core.SlotUpdate's Expression.

User expressions could be not instructional enough. In this case, bot will ask them for the missing necessities. For example, when user doesn't point out what new value should be changed to, bot will ask him with annotations defined in the updating slot to be supportive.

:::: conversation
::: user User
I want to change the Roast Seabass
:::
::: bot Bot
What do you want to changes to, for dish? We have: 1. Pork Belly, 2. Roast Seabass 3. Roast Duck
:::
::: user User
Pork Belly
:::
::::

The bold texts are Value Recommendation of dish.

User expressions could also contradict each other. io.framely.core.SlotUpdate will ask them to clear out the inconsistency. For example, when user falsely remembers what he has ordered:

:::: conversation
::: user User
I want to change the first dish from Roast Duck to Pork Belly
:::
::: bot Bot
You just said Roast Duck, but the first dish is Roast Seabass. Do you mean you want to change Roast Seabass to Pork Belly?
:::
::::