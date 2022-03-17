---
title: System CUI components
---
# System CUI components
One of the design goal of Framely is to automatically handle many conversational issues: where user digress, how we bring them back on track, or where there are ambiguity, how we disambiguate through dynamically scheduled clarification. Ideally we want to make sure that builder can get these behavior without doing anything. And the Framely solution is based on aspect oriented programming. It does so by adding additional behavior (via system CUI components) to existing code (an advice) without modifying the code itself, instead separately specifying which code is modified via a "pointcut" specification (triggered by runtime automatically). The  common system CUI are, and as time goes by, we will surely have more of these to enrich the default chatbot behavior.

### Clarification
Often time, user might say something that dialog understanding did not fully understand, for example, there are multiple possibilities. These are the time where we can trigger System intent to engage in the conversation for user to clarify what they really meant. There are couple variants of this:

### Value clarification
During the slot filling, particularly when we try to find value from the conversation history, there might be multiple values that can be used to fill the slot. This CUI component is used to ask user decide which one is what they want.

### Slot clarification
When user mentioned a value that can fill more than one open slot, we can use this to figure out which slot user want to fill.

### Intent clarification
When DU can not commit to one understanding, we can use this component to get user commit to one intent.

### SlotUpdate
User can modify the a slot with new value.


[go to another page](./BackgroundKnowledge.md)





