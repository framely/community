# 2: Theory

![Theory](/images/essentials/du/theory.png)

In the development of task-oriented chatbots, dialog understanding (DU) is the process of interpreting user utterances into a structured representation of meaning, in either literal sense or implied sense.

Given an utterance, the literal meaning is its most obvious meaning, typically it stays constant regardless of context. The implied meaning is the best interpretation under the given context of the conversation, thus can be different under different context, and can be totally different from its literal meaning. For example, upon hearing *“I have a meeting in New York City first thing on Tuesday”*, a travel agent might infer that user want to get a ticket to New York City, but his secretary might infer that no meeting can be scheduled on Tuesday morning.

It is clear that the meaning space that DU converts utterances into has a significant impact on the computation model required and downstream dialog management (DM). From this perspective, we will demonstrate that the traditional DU approach based on text classification has its limitations and explain how we can improve upon it.

## Intent Classification Crisis
The current generation of dialog understanding (DU) is based on intent classification, which models the likelihood of an intent given an input utterance in the form of *P(intent|utterance)*, with intent representing the literal meaning of the utterance. Under this supervised learning formulation, we need a set of labeled data, each with a user utterance mapping to its corresponding intent label. The labeling process is generally laborious, time consuming and expensive.

High cost is bad, but the real problem is the mismatch between the literal meaning and the implied meaning that is preferred by downstream dialog management (DM) to take action. To illustrate this, consider the following utterance: *“My mom is sick”*. If your chatbot only sells flowers, you can label it with “buy_flower” intent and ignore its literal meaning. However, when you add a hospital front-desk service, the problem becomes clear: providing only new positive examples for the new service and assuming existing utterances are negative for this service can introduce label errors, which, if left unmanaged, will result in a decrease in accuracy.

To deal with this properly, it would be necessary to revisit every labeled example whenever a new service is added. The cost of adding a new service would increase linearly with the size of labeled datasets. Unfortunately, this approach is simply not feasible due to dynamic nature of business.

## Implicature Calculation
In his influential paper “Logic and Conversation” (1975), Grice proposed that for individuals to interpret what others say during a conversation, a certain level of cooperation is assumed to be in place. One of the key implication from his well-known cooperative principle pertains to relevance: the speaker’s utterance must be pertinent to the conversation. When there are multiple interpretations of the utterance, the listener should select the interpretation that is most relevant to the conversation.

The maxim of relevance is is crucial for efficient communication. This gives speakers greater flexibility to construct their utterances with not only their intended meaning but also additional information to speed up the conversation. As an example, Leech (1983: 94) gives the following exchange:

*A: Where is my box of chocolates?*

*B: The children were in your room this morning.*

The literal meaning of B’s answer here appears not to be relevant to A’s question. But with the assumption that B abides by the cooperative principle it is easy to infer the whereabouts of that box of chocolate. In addition, A might further infer that the children may have eaten the chocolate, which can potentially save a later question *“why it is empty now?”*.

The process of listener finding the relevant interpretation for input utterance is called implicature calculation, where implicature is simply the implied meaning. Obviously, implicature calculation is greatly influenced by listener’s context, as well as his world knowledge.

## Service driven dialog understanding
Proper dialog understanding requires the computation of implied meaning based on context. Context includes a linguistic portion, such as conversational history, and a non-linguistic portion, such as business goals and logic, which can be captured by a set of services. Here, a service represents anything that a business does for the user, it can be as large as buying a home and as small as giving a direction.

Since the goal of chatbot is to provide conversational user interface to a fixed number of services, each triggered by an action, the dialog understanding can be thought as the modeling the probability of each action given the original utterance and context in form of *P(action|utterance, context)*. Notice this computation model can naturally handle dialog action that DM need to perform when a user says: *“Wait, I can not fly on Monday”*.

The design and implementation of DU module should be action (implied meaning) driven instead of intent (literal meaning) driven. This is because:

1. Failing to understanding user when they want something out of your service scope will not negatively impact the business’s financial performance. It is OK for a barber shop to reply *“Sorry we only cut hair here”* to a massage request.
2. Compared to the infinite number of legit user intent, the number of services is generally much smaller, even for large corporations. So focusing on actions and modeling whether an utterance imply it can be a lot more manageable.
3. Services changes can be simply handled by adding or removing the corresponding actions when we compute the best action given utterance and context, which hold constant for each turn.

## Summary
We have explained that, beyond the conceptual mismatch, intent classification based DU is difficult to fix from a labeling perspective. By tracing back to the theory of conversations, we have shown that DU can be better modeled as implicature calculation onto actions that chatbot can perform on user’s behalf. Early experiments with methods based on large language models are already showing promising results for modeling *P(action|utterance, context)*, which could greatly simplify the design and implementation of DM.

Reference:
1. [Stanford implicature entry in their Encyclopedia of Philosophy](https://plato.stanford.edu/entries/implicature/)
2. [Rasa Has Intent Deprecation On Their Roadmap](https://cobusgreyling.medium.com/rasa-has-intent-deprecation-on-their-roadmap-5b37ce447def)