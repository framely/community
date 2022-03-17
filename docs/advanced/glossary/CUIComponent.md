---
title: CUI component
---


# CUI component
The main purpose of CUI component is to agree on frame, what user want or the common goal, and fill the frame, or find values for the slots. This is done by two basic components: slot filling and frame filling.
### Slot filling
Slot filling is one of core CUI component. Since the goal of the chatbot is figuring out what user want in form of frame filling. And the basic of the frame filling is to fill a slot, or find out user's preference on a slot. There are many aspects of the conversation that builder can control:

#### Boolean Gate
A slot CUI component that is used to give user control in term of whether there should be conversation about certain aspects: "Are you are a member?" can be used to safe guard a list of questions that chatbot might ask to verify users membership and go on with a different UI path for deliver service to user.  Boolean gate is specified by one or more text generation templates (which typically is chosen randomly) and multiple positive and negative expression exemplars.

#### Ask Strategy
Decide how this slot should be filled.
- User mention first: only talk about it if user mention it first.
- Never: never ask, instead get its value from API
- Always: always ask user.
- Conditional: only ask user preference under some condition. Condition need to be specified.

#### Value Recommendation (VR)
In addition to ask user for the value, it is often helpful to give them recommendations so that it is easy for user to pick the options that actually works.

#### Value Check (VC)
Before we commit to a given value, it is useful to consult the service to make sure it is valid option.

#### Confirmation
Sometime it is useful to ask user twice before we move on.

### Frame filling
Some time, the slot of the frame can not be filled independently, this is when use annotation on the frame to control the collective filling, but we can VR, VC and confirmation defined on the frame.

#### State update
This allow one to define condition and action under the come context of this frame.