# 1: A ChatGPT reset

In the field of chatbot development, ChatGPT will be remembered as a pivotal moment. Its demonstrated ability to grasp implicit meaning across domains without additional domain-specific tuning has huge implications: two of the most labor-intensive steps, once considered as cornerstone in traditional chatbot development, are rendered now entirely irrelevant. It is imperative for us to re-evaluate our approach to conversational user interface development in light of this newfound capability. Of course, the first step is to examine what has just changed.

## No more intent classification
Intent is a structured representation of user utterance’s literal meaning, or its most probable sense. The current generation of dialog understanding (DU) is based on intent classification, which models the likelihood of an intent given an input utterance in the form of *P(intent|utterance)*. Back then, formulating DU as text classification problem is a good choice as it allows us leverage large body of most relevant research work, including both dataset curated and algorithm developed. Today, given the evident capability of the large language model (LLM)s like ChatGPT, we can do better.

The goal of the CUI is to make it as effortless as possible for user to access the service chatbot provide. It is thus important for the chatbot to calculate the implied meaning behind the user’s utterances and map it onto the set of actions that the chatbot can perform to assist the user. Clearly the same utterance can be interpreted differently for different business. For example, when a user says *“My mom is sick”*, a florist may suggest a get-well basket, while a clinic front-desk should schedule a doctor’s appointment.

Without modeling context explicitly, conceptually the intent classification approach is not a good fit for dialog understanding. First literal meaning might be too fine grained to be practical. For example, *“My mom is sick”* and *“My mom caught a cold”*, are technically considered to have different literal meaning, but for many real world applications such fine distinction is not useful. Second, it increases the complexity of the downstream module such as dialog management.

A more direction formulation of dialog understanding should be modeling what chatbot should do given user utterance and context, in form of *P(skill|utterance, context)*, with context including both verbal part such as conversation history and non-verbal parts such as what services business provides. This DU formulation can greatly reduce the complexity of the dialog management. With massive parameter count, pretrained on huge collection of web crawl data, and instruction tuned on many tasks, including entailment, recent large language models (LLM) base approach appears to particularly promising. For example, without any training on the task of implicature calculation, ChatGPT can already make pretty good interpretations.

:::info ChatGPT interpretations
![ChatGPT](/images/essentials/du/chatgpt.png)
:::

So the days that we need to worry about intent classification is gone.

## No more training
Of course, in practice, people commonly model the skills chatbot need to invoke given only the user utterance. While this sidestep some of the thorny issues like whether we should treat *“My mom is sick”* and *“My mom caught a cold”*, this approach require we maintain training data for each skill we prepare to serve.

Training a different NLU model for each chatbot has long been an essential part of chatbot development, and I would argue it is the root cause of why it costs significantly more to develop chatbot, comparing to web or mobile app with the same functionalities through the same backend service.

One thing that surprised every one is the zero-shot capability that ChatGPT demonstrates. It is able to understand questions in any domain without fine-tune or retaining, with remarkable accuracy. In fact, unless you want to develop conversational user interface for some professionals, it is clear no per chatbot training is required any more. Yes, we can use ChatGPT to generate high quality training date given its excellent paraphrase capability, but why we want to bother chatbot developer with that extra step? There will be platform that does not require chatbot developer to understand anything about machine learning and natural language understanding, and that day is near.

By removing the need to training NLU model, we can greatly cut down the cost and time to market. Also, existing web or mobile dev team can also take on the responsibility to develop chatbot as the need for NLU/ML background is also gone.

## Parting words
The conversational user interface is obviously not for every use case. But ChatGPT’s acquiring more than 100m user in 72 days shows that just how powerful this interface is: anyone can effectively interact with it. The age of the conversational user interface is here, this wave is at least as big as the web and mobile wave before it. While it is not possible to use ChatGPT directly to expose your services directly, LLMs has the potential to remove two expensive and time consuming steps of building chatbot, so what are you waiting for?