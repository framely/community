# Overview

OpenCUI is a practical framework to build applicaiton with conversational user interface. At a high level, it follows a dual process approach, leveraging LLMs (Language Models) for answering informational and low-impact queries through prompt engineering, and relying on software engineering for high-impact and transactional queries. By integrating LLM-based dialog understanding with schema-based interaction logic, OpenCUI enables the cost-effective development of natural and dependable conversational experiences.

One valuable application of OpenCUI is the creation of "copilots," which serve as conversational companions within your existing apps. These copilots respond to user requests in natural language, removing the steep learning curve typically associated with feature-rich applications. Copilots deliver value to both new and casual users by providing assistance in a context-dependent manner during their interactions. Instead of directly triggering backend APIs, copilots offer information and frontend action buttons to guide users through your app interactions. The development of a copilot involves three main steps:
1. **Define copilot primitives**: Tailor copilot primitives to suit the specific needs of your application.
2. **Build conversational application**: Utilize the OpenCUI platform to build a conversational application. Attach dialog annotations to function schemas to ensure your copilot can provide reliable responses.
3. **Integrate OpenCUI SDK**: Integrate the conversational application with OpenCUI SDK to bring your copilot to life.

## Define copilot primitives
Before starting to develop the copilot, copilot builders and app frontend teams need to work together to define the data structures that will be utilized between the copilot project and the app frontend. 

### Inputs from app frontend
The data passed to copilot project includes the **data scope** and the **context**. The data scope is essential for the dialog understanding(DU) component of the conversation application. App users can access the data within this scope by simply mentioning its name, allowing the DU to comprehend the intended data.  On the other hand, the context represents the information that conversation application needs to collect from the app users in order to identify their current state or page. 

#### Define data scope
As an assistant, copilot should share the same permissions as app users have. Therefore, determining the scope of information accessible to copilots is crucial. In other words, it involves defining the range of data that can be provided to the copilot.
For instance, consider OpenCUI's copilot as a prime example. When users ask to modify a specific type, such as adding a response, the copilot needs to determine which type the users are referring to. To achieve this, data accessible to users must be passed to the DU so that it can recognize the mentioned type. Commonly mentioned names by app users in OpenCUI include "frame" (encompassing both frame and skill), "entity," and more. For **frontend developers**, you can refer to the sending message section to learn how to pass this information, while **copilot builders** can consult the guide on building entites to learn how to declare the related data structure on the OpenCUI platform.

#### Define context
When app users request a feature, they may not be in the target state or on the intended page. For example, they might want to add a specific type of slot, but the required library has not been imported into the current project. This indicates they are not in the target state, which entails importing the necessary library first. Similarly, if app users want to manage team members but are not on the page where all team members are listed, they are not on the target page.
Taking OpenCUI copilot as an example, the context primarily consists of the organization label, agent label, agent type, page label, and so on. For **frontend developers**, you can refer to the sending message section to learn how to pass the context, while **copilot builders** can refer to building PageContext frame to learn how to declare the context on the OpenCUI platform.

### Outputs of conversational application
There are two ways to execute actions in a conversational application: implicit and explicit. In the implicit approach, when users express their requests, the copilot directly performs the corresponding actions on their behalf. In contrast, the explicit approach involves the copilot providing action buttons to app users, enabling them to execute the actions themselves. To maintain better control, we prioritize the implicit method for executing actions.
For example, let's consider OpenCUI platform. If users want to clone a chatbot, they can create a new chatbot by selecting the cloning option, which is an action. Additionally, if the users are not not currently on the appropriate page to perform this action, they need to direct to the right page first, which is also an action. For **frontend developers**, you can refer to the action section to learn the data structure required, while **copilot builders** can look up the universal message to grasp the basic format of actions. The "actionParams" field in the action date type and the "payload" field in universal message need to be determined collaboratively between frontend developers and the copilot builders. Taking the previous example into consideration, the "actionParams" ("payload") field for the clone action can be structured as follows:
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
Once the events and actions are settled, copilot builders can start to build conversational applications in OpenCUI. For guidance on how to build a copilot, please refer to "How to build a copilot project".

## Integrate copilot with OpenCUI SDK
After settling the events and actions, frontend developers can start to integrate conversational applications with OpenCUI SDK. To learn how to integrate with SDK, please refer to "How to integrate OpenCUI SDK".