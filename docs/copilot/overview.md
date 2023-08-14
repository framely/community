# Overview

OpenCUI is a practical framework for building applications with a conversational user interface. At a high level, 
it adopts a dual-process approach, utilizing Language Models (LLMs) to address informational or low-impact queries
through prompt engineering. For high-impact and transactional queries, it relies on software engineering. 
Through the integration of LLM-based dialog understanding and schema-based interaction logic, 
OpenCUI facilitates cost-effective development of natural and reliable conversational experiences.

OpenCUI is specially designed to aid in building 'copilots,' which function as conversational companions for your
existing apps. Unlike regular chatbots that directly trigger backend APIs upon request, copilots provide information 
and frontend action buttons to guide users through app interactions. This allows you to address existing UX issues 
without the need to rebuild everything for a conversational user interface. As copilots respond to natural language
requests, they eliminate the steep learning curve typically associated with feature-rich applications. Furthermore, 
copilots offer context-dependent assistance, reducing the effort required for both new and casual users to derive
value from your application.


Copilot is typically developed using the same client/server architecture: there will be copilot frontend that coexists
with your app's frontend, and then there will be a copilot backend, or simply a special chatbot that you can build 
using OpenCUI. To develop a copilot, or conversational companion for your application, you just need to follow three 
steps:
1. **Define API between your app and copilot**: This includes how to describe the context, and what action can your application perform.
2. **Build copilot backend**: This can be done by attaching dialog annotations to function schemas to ensure your copilot can provide reliable responses.
3. **Implement the API and integrate OpenCUI SDK**: Implement the API defined in step #1, and copilot frontend by integrating with OpenCUI SDK to copilot backend built in step #2.

## Define copilot primitives
Before starting to develop the copilot, copilot builders and app frontend teams need to work together to define the data
structures and API that frontend team will provide for copilot so that copilot frontend can capture the current context,
as well as asking app frontend to execute some action.

### API provides state of your app frontend
To provide the context dependent response to user's query, it is important that copilot client get the context that user
are currently in your app. This information can then be passed to copilot backend via OpenCUI SDK in form of **data 
scope** 
and the **context**. The data scope is essential for the dialog understanding(DU) component of the conversation application. App users can access the data within this scope by simply mentioning its name, allowing the DU to comprehend the intended data.  On the other hand, the context represents the information that conversation application needs to collect from the app users in order to identify their current state or page. 

#### Define data scope
As an assistant, copilot should share the same permissions as app users have. Therefore, determining the scope of information accessible to copilots is crucial. In other words, it involves defining the range of data that can be provided to the copilot.

For instance, consider OpenCUI's copilot as a prime example. When users ask to modify a specific type, such as adding a response, the copilot needs to determine which type the users are referring to. To achieve this, data accessible to users must be passed to the DU so that it can recognize the mentioned type. Commonly mentioned names by app users in OpenCUI include "frame" (encompassing both frame and skill), "entity," and more. For **frontend developers**, you can refer to the [sending message](./opencui-sdk.md#send-messages) section to learn how to pass this information, while **copilot builders** can consult the guide on [building entities](./build-copilot.md#build-entities) to learn how to declare the related data structure on the OpenCUI platform.

#### Define context
When app users request a feature, they may not be in the target state or on the intended page. For example, they might want to add a specific type of slot, but the required library has not been imported into the current project. This indicates they are not in the target state, which entails importing the necessary library first. Similarly, if app users want to manage team members but are not on the page where all team members are listed, they are not on the target page.
Taking OpenCUI copilot as an example, the context primarily consists of the organization label, agent label, agent type, page label, and so on. For **frontend developers**, you can refer to the [sending message](./opencui-sdk.md#send-messages) section to learn how to pass the context, while **copilot builders** can refer to [building PageContext frame](./build-copilot.md#build-a-frame) to learn how to declare the context on the OpenCUI platform.

### Outputs of conversational application
There are two ways to execute actions in a conversational application: implicit and explicit. In the implicit approach, when users express their requests, the copilot directly performs the corresponding actions on their behalf. In contrast, the explicit approach involves the copilot providing action buttons to app users, enabling them to execute the actions themselves. To maintain better control, we prioritize the implicit method for executing actions.
For example, let's consider OpenCUI platform. If users want to clone a chatbot, they can create a new chatbot by selecting the cloning option, which is an action. Additionally, if the users are not not currently on the appropriate page to perform this action, they need to direct to the right page first, which is also an action. For **frontend developers**, you can refer to the [action](./opencui-sdk.md#action)  section to learn the data structure required, while **copilot builders** can look up the [universal messages](https://opencui.io/reference/channels/universalmessage.html#json-representation) to grasp the basic format of actions. The "actionParams" field in the action date type and the "payload" field in universal messages need to be determined collaboratively between frontend developers and the copilot builders. Taking the previous example into consideration, the "actionParams" ("payload") field for the clone action can be structured as follows:

```json
{
    "clickAction":"custom",
    "targetAction": {
        "action":"createProject",
        "projectType": "chatbot"
    }
}
```

## Build copilot
Once the events and actions are settled, copilot builders can start to build conversational applications in OpenCUI. For guidance on how to build a copilot, please refer to [How to build a copilot](./build-copilot.md).

## Integrate copilot with OpenCUI SDK
After settling the events and actions, frontend developers can start to integrate conversational applications with OpenCUI SDK. To learn how to integrate with SDK, please refer to [Building copilot for your app with OpenCUI](./opencui-sdk.md).