# Design interactions

Now that you have a clear understanding of your [business's services](gathering-requirements.md#identify-your-business) and your [users](gathering-requirements.md#identify-your-users), it's time to design conversation interactions.

## What are conversation interactions

Conversational user interfaces (CUIs) are designed to help users get what they need. Users can speak and type in a natural way, asking questions and giving instructions. The CUI will then respond in a way that is both informative and engaging.

The key to successful conversational interactions is cooperation. This means that the CUI and the user work together to make the conversation successful. Just like in human conversations, users and CUIs should take turns speaking. This helps to ensure that the conversation smoothly and that both parties have a chance to participate. Ultimately, both parties can achieve their goals.

Here are some of the key elements of interaction in conversational user interfaces:

- Understanding: The CUI should be able to understand the user's input, even if it is not perfectly phrased or grammatically correct. This requires the CUI to have a large vocabulary and to be able to understand the context of the conversation.

- Backchanneling: Backchanneling is a way of communicating without taking a turn. This can be done through gestures, facial expressions, or verbal cues such as "uh-huh" or "I see." Backchanneling helps to show that the listener is following the conversation and that they are interested in what the speaker is saying.

- Repair: Sometimes, there are misunderstandings or errors in a conversation. Repair is the process of correcting these misunderstandings or errors. This can be done by clarifying what was said, asking for clarification, or simply ignoring the misunderstanding.

## High-level design strategies

When starting, it is best to focus on the interactions that the CUI needs to have with users, rather than the specific conversation flows or the way that the CUI will speak. 

In OpenCUI, interactions are language-independent, so this approach will help you to create a solid structure for your CUI that can be used with users of all languages. This is where you can consider factors such as:
- What questions will the CUI need to ask?
- What recommendations will it need to make?
- How will it confirm a user's request?
- Will it use implicit or explicit confirmation?

By designing with interactions first, you can informally experiment with and evaluate different design strategies. This will give you a quick, low-fidelity sense of the conversation you are designing, without the technical distractions of code notation, complex flow diagrams, recognition grammar, understanding issues. You can then use this information to refine your design and make sure that it meets the needs of your users. 

Once you have a good understanding of the interactions that you need, you can then worry about the specific way that the CUI will speak. You can either continue to do this yourself, or use large language models (LLMs) to help you. This will allow you to create a CUI that is both user-friendly and effective.

## Start with conversational components 

Whether you are a beginner or experienced designer, developer, or anyone else, you can easily start interaction design in OpenCUI. We provide a wide range of conversational components to enrich your CUIs, and it allows you to design through a declarative approach.

Declarative design is a way of designing that focuses on what you want to achieve, rather than how you want to achieve it. This makes it easy for anyone to create complex and engaging interactions, without having to worry about the technical details of how they will be implemented.

OpenCUI supports declare conversational components through its dialog annotations. Each annotation represents a specific type of interaction, such as prompts, value recommendations, confirmations, and so on. To use conversational components, you simply specify the annotations and the desired outcomes. 

There are two types of conversational components: 
- [System components](#system-components) 
- [Composite components](#composite-components) 

### System components

System components are pre-built conversational components that are provided by OpenCUI. They include common interactions, such as prompting the user for information, recommending a value, or confirming a user's request, etc.

#### Basic components

| Components          | Description                                               |
|:---                 |:---                                                       |
| Prompt              | Prompts are questions that can be used to ask users for information, such as their name, email address, or other required details. For example, a prompt might ask *"What time would you like to book your table tomorrow?"* |
| Multi-valued prompt | Multi-valued prompts are prompts used to ask users for multiple values. If a task is multi-valued, the chatbot might ask the user if they still need help after completing one task, such as *"Do you still need help with anything else?"* |
| Inform              | Inform is used to display information to the user, but does not require the user to answer it. This means that the user can simply read the information and move on without having to provide any input. Informs are often used to provide the user with additional information or context, such as the chatbot's current state or the next steps in the conversation. |

#### Fill strategies

| Components   | Description                                               |
|:---          |:---                                                       |
| Alway ask    | Always ask is suitable for scenarios where users are required to provide necessary information. It is strong, meaning that if the user does not provide it, the chatbot will keep asking until it gets the information it needs. Always ask can be a helpful way to ensure that the chatbot has all of the information it needs to complete the task. |
| Conditional  | Conditional is suitable for scenarios where users are required to provide necessary information, but only under some conditions. It is not as strong as always ask, as it needs to meet the conditions before asking the user for information. |
| Gated        | Gated is a boolean gate that is used to first introduce a topic before asking detailed questions about it. It can be a helpful way to ensure that the chatbot is only asking questions that are relevant to the user's needs. It can also be especially useful in situations where the user may be sensitive about the information they are providing, as it allows the user to control how much information they share. |
| Recover only | Not every piece of information needs to be asked of the user. Therefore, when there is information that the business does not need to know if the user does not provide it, recover only can be used. This can be a helpful way to protect user privacy and make the chatbot more user-friendly. |
| Direct fill  | Direct fill means that the chatbot will not ask the user for the information. Instead, it will fill the value from somewhere directly. This can be helpful in situations where the information is easily accessible, such as when the chatbot is connected to a database or other data source. |

#### Dialog annotations

| Components           | Description                                               |
|:---                  |:---                                                       |
| Initialization       | Initialization is the process of assigning initial values to slots. When the values are known, they can be initialized. For example, in an ordering scenario, if you know the user's name and phone number, you can directly assign those values to the corresponding slots. This can save time and effort, as you do not have to ask the user for this information every time they. However, it is important to confirm with the user whether to use the phone number before using it. |
| Value recommendation | Recommendations are choices that are provided to users. They can help users to discover new products or services, to save time, or to make better decisions. They can be based on a variety of factors, such as the user's past behavior, their interests, or the current context. Businesses can use recommendations to increase sales, improve customer satisfaction, and boost brand loyalty.  |
| Value check          | Value checks are used to validate user input and inform thems when there is a problem with their input or action. This helps to ensure that users are not stuck in a loop if their input is not accepted. For example, if a user provides an invalid email address, a value check can inform the user of the problem and prompt will let them to enter a valid email address. |
| Confirmation         | Confirmations can help to prevent errors and ensure that users are happy with the actions that chatbots are taking or that the chatbot has understood the user's input correctly. They can be used in an implicit (*“Alright, 4 guests. [...]”*) or explicit (*“I understood 4 guests, is that correct?”*) way. They can help to build trust between the user and the chatbot. |

### Composite components

Composite components are created by combining multiple components. They can be used to create more complex interactions, and meet the specific needs of your applications.

| Components  | Description | Common interactions |
|:---         |:---         |:---                 |
| Date picker | The DatePicker component allows users to input or select a date using natural language in conversational interactions. For example, users can say "next Tuesday" or "the 15th of March" to enter a date. The component can recognize various ways of describing a date, including the day of the week, day of the month, and date of the year. If the user provides an ambiguous date description, the component will interact with the user to finalize a specific date. For example, if the user says "the 15th," the component will ask the user to clarify which date they mean. The component is suitable for the context in which it appears, meaning that it will only recognize natural language date descriptions that are appropriate for the context in which they are used. | <ul><li> Ask for a date. </li><li> Provide date options and help to shrink candidate dates. </li><li> Pass business logic verification. </li><li> Inform or double check with end-user the date value. </li></ul> |

## Example

Here's an example of an interaction design that based on the schema we Illustrative before you could use for a restaurant reservation chatbot:

| Slots            | Type        | Description                                               |
|:---              |:---         |:---                                                       |
| Number of guests | Int         | *Required*. To specify how many people will be coming.    |
| Date             | LocalDate   | *Required*. The date of the reservation.                  |
| Time             | LocalTime   | *Required*. The time of the reservation.                  |
| Name             | Name        | *Required*. The name of the guest.                        |
| PhoneNumber      | PhoneNumber | *Required*. The phone number of the guest.                |
| Note             | Note        | *Required*. Any special requests or dietary restrictions. |

- **Number of guests**

   Usually, for reservation businesses, the number of people is necessary information. If the user does not provide it, it must be asked. Therefore, it should be always ask.

   However, the interactions can be different for different restaurants. If your business reserves fixed tables based on the number of diners, then the number of tables is limited. In this case, the chatbot needs to check with the backend to see if there are still tables available. At this time, the chatbot needs to use value check.

   Of course, if the number of people is not that important to your business, you can use implicit confirmation to inform the user. This is a good way to ensure a good user experience and to find and correct problems early.

   So the interaction logic might be: always ask, value check, implicit confirmation.

- **Date / Time**

  For reservation businesses, the date and time are essential information for booking. Therefore, they must be always asked. When the user provides a date or time, the backend should verify whether the date or time is available. In this case, you need to use value check.

  Of course, in order to facilitate the user's choice, you should present the user with a list of feasible dates and times. The user can then choose them from the list, instead of having to enter a date or a time themselves. This way, the user can be sure that their choices are available.

  In the same way, there can also be implicit confirmation here. This means that the chatbot can inform the user of the date and time that they have chosen. This way, any problems can be found and corrected early.

  So the interaction logic might be: always ask, value recommendation, value check, implicit confirmation. 

- **Name / PhoneNumber**

  For some reservation services, user information can be obtained directly, such as membership. However, direct fill is not recommended here. This is because direct fill will directly assign values, so users will not be able to modify any information. What if the user's name and phone number have changed, or if he's making a reservation for a friend or colleague? Therefore, a more suitable choice is to initialize the information through initialization.

  However, if your business allows users to modify their information, you can use recover only. This can be a good way to save time and hassle for users who have already provided their information. This way, the user can still modify the information if they need to. If some users of your business have information and some do not, you still need to use always ask or conditional. Please always keep in mind, the strategy to use depends on the specific needs of your business.

  Of course, implicit confirmation is always a good choice. This can be a good way to ensure that the user has provided the correct information.

  So the interaction logic might be: initialization, recover only/always ask/conditional, implicit confirmation. 

- **Note** 

  Note of special requests or dietary restrictions is not required by everyone. Therefore, you need to set it according to the actual business scenario. For example, you can set it to always ask, so that no one's needs will be missed. However, this can sometimes be too redundant, for example, the user cannot skip it without answering. In this case, you can also set it to conditional so that the question is only asked based on certain conditions. Or, you can set it to recover only and only ask when the user actively mentions it.

So the high level intercation perspective should look like this:

| Slots            | Type        | Interaction | Description |
|:---              |:---         |:---         |:---         |
| Number of guests | Int         | <ul><li> Always ask </li><li> Value check </li><li> Implicit confirmation </li></ul> | *Required*. To specify how many people will be coming. |
| Date             | LocalDate   | <ul><li> Always ask </li><li> Value recommendation </li><li> Value check </li><li> Implicit confirmation </li></ul> | *Required*. The date of the reservation. |
| Time             | LocalTime   | <ul><li> Always ask </li><li> Value recommendation </li><li> Value check </li><li> Implicit confirmation </li></ul> | *Required*. The time of the reservation. |
| Name             | Name        | <ul><li> Initialization </li><li> Recover only </li><li> Implicit confirmation </li></ul> | *Required*. The name of the guest. |
| PhoneNumber      | PhoneNumber | <ul><li> Initialization </li><li> Recover only </li><li> Implicit confirmation </li></ul> | *Required*. The phone number of the guest. |
| Note             | Note        | <ul><li> Always ask </li><li> Implicit confirmation </li></ul> | *Required*. Any special requests or dietary restrictions. |

## Parting words

The best design approach for conversations will depend on the specific needs of your business and the users. It is important to keep in mind that the design of a CUI is not static. As your business and your users change, you may need to adjust the design of your bot to meet their new needs.
