# How to build a copilot？
This guide will demonstrate how to build a copilot using the OpenCUI platform, taking OpenCUI copilot as an example. The OpenCUI copilot provides functionalities such as direct access, onboarding, and feature discovery.

## Before you start
To gain a basic understanding, it is important to first learn [key concepts](https://opencui.io/guide/concepts.html) about type systems and dialog annotations.

## Declare copilot primitives
Before diving into building the conversational user interface, you need to declare the data structures that will be shared with your frontend developers. These structures include the data scope that app users can access and the context of the current context/page.

### Build entities
As is mentioned in [defining data scope](./overview.md#define-data-scope) section, to enable dialog understanding (DU)  in comprehending information mentioned by app users, it is necessary to create entity types that encode the accessible information. For instance, in the case of the OpenCUI copilot, an entity called "FrameType" is created to encompass all frame labels and skill labels. This allows DU to extract the mentioned frame/skill when app users refer to them.
```c
// Details of declaring copilot primitives in OpenCUI copilot
Create entities:
- FrameType: cover all the frame and skill types in current projects.
- EntityType: cover all the entity types in current projects.
- SlotEntity: cover all the slots in current projects.
```

### Build a frame
In order to encode the current state or page, a frame type needs to be created, along with parameters represented as slots within this frame. These slots carry essential information about the current state or page.

Taking OpenCUI copilot as an example, to encode the current page, we create a frame called "[PageContext](https://build.opencui.io/org/ai.bethere/agent/copilot/struct/frame/64b8cd8d459bf49540e3dd9e)" and add slots like orgLabel, agentLabel, and page in this frame. Additionally, we add a typeLabel slot with type FrameType. This allows copilot to confirm the current type with app users, if necessary. In this way, the OpenCUI frontend can encode the context into the "PageContext" frame. If a slot with this type is added, it can be automatically filled with the current context.
```c
// Details of declaring copilot primitives in OpenCUI copilot
I. Create frame with label PageContext.

II. Add the following slots in frame PageContext:
   - orgLabel with type String
   - agentLabel with type String
   - page with type String
   - typeLabel with type FrameType
   ...
```

## Build CUI
This section illustrates the process of building a conversational user interface using the example of [cloning an echo chatbot](https://opencui.io/guide/clone-simple-chatbot.html). In the OpenCUI platform, there are two types of skills: component skills and composite skills. Component skills consist of slots with entity and frame types, while composite skills include these types along with skill types.

To provide direct access, component skills can be used as they can be triggered independently. For instance, if there are two major steps involved in cloning an echo chatbot, each step can be an independent component skill, providing direct access for app users.

To facilitate onboarding, component skills can be combined into a composite skill. In the case of cloning an echo chatbot, the two component skills can be merged into a quickstart skill for cloning.

To enable feature discovery, complementary expressions can be added to component skills so that app users don't need to know the specific names of these features to trigger the corresponding skills. They just need to describe the features.

### Build component skills
To build a component skill to provide direct access, follow these steps:
1. Create a new skill and add the expression to trigger it.
2. Add context if it's required.
3. Add parameters needed to execute a specific action.
4. Add a slot to verify if the app users are in the target state or on the target page.
5. Specify the action for app users to execute.

For example, let's consider the "[CloneProject](https://build.opencui.io/org/ai.bethere/agent/quickstarts/en/intent/64b897ae0f50353c647ca7e1)" skill used to guide app users in cloning a project. The happy path for CloneProject skill involves the following steps:

![Happy path of CloneProject skill](/images/copilot/clone-project.png)

Let's see how to build this skill by following the above steps.

**1. Create a new skill: CloneProject**

In chatbot _ai.bethere.quickstarts_, we create a new skill with label CloneProject and add expression to trigger it.
```c
// Details of building component skill in OpenCUI copilot
I. Create a skill: CloneProject.
II. Add the following expressions of skill CloneProject:
   - How to clone a project?
   - How to cloen a $type$?
```

**2. Add context**

Suppose the action can only be executed when the app user is already on the target page. Therefore, in each component skill, we add a context slot with the type "PageContext" to get the current page.
```c
// Details of building component skill in OpenCUI copilot
Add the following slots in skill CloneProject:
- context with type PageContext
```

**3. Add parameters required for the action**

There are two ways to clone a project:
- Enter the target project and click the Clone button to clone it.
- Enter an organization, click the Create button, select the type, and change the clone mode to Clone from.

Since OpenCUI copilot does not support cross-organizational operation for now, copilot can only assist app users in cloning projects using the second method. The parameters required to clone a project include the project type, organization, and label of the target project.

To determine the project type, we created the entity "ProjectType" and added a slot with this type, so copilot can prompt app users to select the project type. However, DU currently cannot understand the organization and project labels. Therefore, only the project type can be obtained from the app users.
```c
// Details of building component skill in OpenCUI copilot
I. Add the following slots in skill CloneProject:
   - type with type ProjectType
   - orgLabel with type String
   - projectLabel with type String

II. Add annotations for slot type:
   - Fill strategy: Always ask
   - Prompt: Which kind of project would you like to clone?
```

**4. Add slot to verify the current page**

As we can obtain the current page through the context slot, we add a boolean slot called isTargetPage. It is initialized as true if the app users are on the target page, and false otherwise. We also add a [value check](https://opencui.io/reference/annotations/valuecheck.html) annotation. If the app users are not on the target page, we provide an action button for them to navigate to the target page.
```c
// Details of building component skill in OpenCUI copilot
I. Add the following slots in skill CloneProject:
   - isTargetPage with type boolean

II. Add annotations for slot isTargetPage:
   - Fill strategy: Always ask
   - Initialization: if (context?.page == "agentList") true else false
   - Prompt: Have you navigated to the project list page?
   - Value check:
      - Condition: isTargetPage == true
      - Template: 
      {
         "type": "rich",
         "description": "To clone a ${type!!.expression()}, click the button below to go to the project list page first.",
         "insideAction": [
           {
             "type": "click",
             "display": "Take me there",
             "payload": {
               "clickAction": "page",
               "targetPage": "agentList",
               "orgLabel": "${context?.orgLabel}"
             }
           }
         ]
      }
```

**5. Add action**

Finally, after collecting all the required parameters, we can generate an action button to clone a project. Since the app users cannot fill the orgLabel and projectLabel slots, the default action of this skill will not mention the target organization and project. However, if these slots are initialized by other composite skills, there is a chance that they can be filled. Therefore, we added a branch to handle that situation.
```c
// Details of building component skill in OpenCUI copilot
I. Add a default response in skill CloneProject:
   - Action: Singel value message
   - Template: [an action json object to clone one project with specific type]

II. Enable branch in the response of skill CloneProject.

III. Add a branch response in skill CloneProject:
   - Condition: orgLabel != null && projectLabel != null
   - Action: Singel value message
   - Template: [an action json object to clone a specific project]
```

Similarly, a "[TestChatbot](https://build.opencui.io/org/ai.bethere/agent/quickstarts/en/intent/64b897ae0f50353c647ca7e2)" skill can be created. Unlike the CloneProject skill, the debug action can be executed within the chatbot itself. Once app users are in the target chatbot, no parameters are required to execute the debug action.

This is the happy path for TestChatbot skill:

![Happy path of TestChatbot skill](/images/copilot/test-chatbot.png)

### Build a composite skill
To build a composite skill for onboarding app users or combining multiple actions, follow these steps:
1. Create a new skill and add the expression to trigger this skill.
2. Add component skills required for the onboarding procedure and initialize them with fixed parameters.
3. Add dialog annotations to add the missing information if necessary.
4. Add slots to verify if the app users have completed each step if necessary.

For example, let's consider the "[QuickStartClone](https://build.opencui.io/org/ai.bethere/agent/quickstarts/en/intent/64b897ae0f50353c647ca7e3)" skill used to guide app users through the process of quickstart [cloning an echo chatbot](https://opencui.io/guide/clone-simple-chatbot.html). The happy path for the QuickStartClone skill involves the following steps:

![Happy path of QuickStartClone skill](/images/copilot/quickstart-clone.png)

Let's see how to build this skill by following the above steps.

**1. Create a new skill: QuickStartClone**

In chatbot _ai.bethere.quickstarts_, we create a new skill with the label "QuickStartClone". Since quickstarts are a series and cloning an echo chatbot is only part of them, we don't expect app users to trigger this skill directly. Instead, we add this skill as a slot to another composite skill "QuickStartGuide", which can be triggered by app users. Therefore, there is no expression for this skill QuickStartClone.
```c
// Details of building composite skill in OpenCUI copilot 
Create a skill: CloneProject
```

**2. Add component skills**

As we've built the skill "CloneProject" and skill "TestChatbot", now we can add these skills as slots in the skill "QuickStartClone". Since the cloned project is fixed in this quickstart, we can use slotInit state of transition to initialize the skill CloneProject with the predetermined parameters including project type, organization label and project label.
```c
// Details of building composite skill in OpenCUI copilot 
I. Add the following slots in skill QuickStartClone:
   - cloneProject with type CloneProject
   - testChatbot with type TestChatbot

II. Add transition slotInit for QuickStartClone:
   - Fill slot cloneProject.type with value: ProjectType("chatbot")
   - Fill slot cloneProject.orgLabel with value: "me.quickstart"
   - Fill slot cloneProject.projectLabel with value: "pingpongSL"
```

**3. Supplement the missing information**

In the quickstart cloning an echo chatbot, there is an instruction on what to send to test the chatbot. This instruction is not covered in this skill yet, so we add a post-fill action in the slot testChatbot to supplement the missing instruction. Additionally, as there is no response section for the composite skill currently, we add the concluding part here as well.
```c
// Details of building composite skill in OpenCUI copilot 
Add annotation post-fill action for slot testChatbot:
- Condition: true
- Template: 
 [1] Enter "ping" after connecting and the chatbot will ask for a location.
 [2] Send a legit location like "Seattle", and the chatbot will respond with "Pong Seattle". 
 Congratulations on successfully cloning your chatbot! For more details, refer to https://opencui.io/guide/clone-simple-chatbot.html
```

**4. Add slots to check the cloning step**

To ensure that app users complete each step of the cloning process, it's helpful to guide them through the steps one by one. After showing them how to clone the echo chatbot, we want to confirm if they have finished this step. To achieve this, we add a boolean slot. If their answer is negative, copilot will prompt them to complete the cloning step before proceeding to the next step.
```c
// Details of building composite skill in OpenCUI copilot 
I. Add the following slots in skill CloneProject:
   - isNewChatbotPage with type boolean

II. Add annotation for slot isTargetPage:
   - Fill strategy: Always ask
   - Prompt: Have you created a duplicated chatbot?
   - Value check:
      - Condition: isNewChatbotPage == true
      - Template: Before proceeding to the next step, please follow the steps provided above to clone the chatbot first.
```



