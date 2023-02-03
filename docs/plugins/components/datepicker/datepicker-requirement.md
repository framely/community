# Date Picker Requirement

When designing a web or mobile app, a date picker is often required. Instead of developing one from scratch, we tend to use an existing implementation because:

1. Building a visually appealing and functional date picker can be a complex and time-consuming task. Even the simplest date pickers, like the one from Material Design as above, often have multiple sub parts that require separate views to be rendered and control to be implemented.
2. In many cases, the appearance and functionality of the date input UI has minimal impact on user experience and business objectives, so it is important to save effort by focusing on other value-generating activities.

And to use this date picker, simply import it and connect the output (selected date) to your interaction logic, you are done.

Is it possible to design a reusable CUI date picker (component) so that we can get great user experience without spend much effort on the details? What conversational experiences should we support on CUI date picker? Here are some considerations.

## Two Modes: Proactive and Reactive
The component should be able to fill the date slot with LocalDate value under both proactive and reactive conversation mode. In proactive mode, users mention their preference directly, such as *“I like to leave on June 10th”*, before chatbot prompt them for that information. In reactive mode, users respond to chatbot slot request prompt such as: *“Which day do you prefer?”* with *“June 10th, please”*. In both case, we should create the object in form of `date = 06.10`.

## Two Layers: Multiple Language Support
To support different languages, CUI components should support simple annotations so that developers can customize their dialog understanding and text generation behavior. Ideally, such configuration should requires no background in the natural language understanding (NLU) or machine learning (ML) so that everyone can contribute. These annotations should support the context dependent understanding, and be effective for hot-fixing the understanding issues, without needing retraining.

## Interaction with Production System
In addition to actual services users need such as getting a ticket, production system can be utilized to improve conversational user experience. There are at least two opportunities for this:

1. **Value Recommendation**: When prompting users for a preferred date, we can ask backend to provide a list of available date candidates, so that user does not need to suggest something that is not available in the production system, which can be a frustrating and ineffective conversation experience. Further more, when presented with value recommendation, the component should understand utterances like: *“Do you have more options?”* and *“the second one, please”*.
2. **Value Check**: After users provide their preferred date, we can use a backend API to check if it is valid according to business logic. By catching these invalid values early and immediately asking users for an alternative choice, we can save them time and prevent them from wasting time filling out later slots. It should also be possible to specify the recovery strategy.

We should be able to wire different service APIs to a date picker, so that we can use the same date picker in different businesses.

## Toward Natural Conversational Experience
It is absolutely necessary to understand direct utterance such as “I like to leave on June 30th, please”. But often time, there are many indirect but nonetheless natural ways for users to narrow down their choices, and it is important for us to understand these expressions. There are two different kinds:

1. **Auxiliary Slot**: One such constraint is expressed in the different but related data type, and captured in what we called auxiliary slot. For example, we can add `dayOfWeek = Monday` to dialog state per user’s utterance: *“I am only available on Mondays”*.
2. **Companion Slot**: Another common way of expressing constraint is to add logic operation to existing date type. For example: *“but I am not available on June 19th”*.

Of course to fully support these expression, we will need backend provide APIs that can make use these additional ways of expressing the constraints on the date preference.

Furthermore, it is possible that users might change their ideas after they made the initial selection, so we need to support these use cases as well. For example: *“Oh, just noticed that that I actually can not do June 19th, got a whole day training that I can not skip.”*

## Conclusion
Just like GUI counterpart, getting a user’s choice on a date is actually not a simple thing as it might appear. Adding a slot with `LocalDate` type is just a bare minimum start point. To provide a good user experience, a variety of aforementioned interactions need to be supportted. Obviously, building data picker from scratch is not a good idea, we need some component based framework, like OpenCUI, to accumulate the best practice into CUI components so that we can reuse them over and over again, if we do it right.

Reference:
1. [Date Picker - Goldman Sachs Design](https://design.gs.com/components/date-picker)
2. [CUI Component, a requirement analysis](https://opencui.medium.com/component-approach-for-chatbot-dca67b36d888)
3. [5 Levels of Conversational UI](/guide/5levels-cui.md)
4. [3 Layers of Chatbot](https://opencui.medium.com/4-layers-of-chatbot-658ccceea382)