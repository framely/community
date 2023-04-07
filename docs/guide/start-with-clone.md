# Clone a simple chatbot

OpenCUI is a platform designed to assist regular development teams in building natural conversational user interfaces (CUIs) for their services. To reduce the cost of building CUIs, OpenCUI adopts a type-based approach, so you can use pre-built components instead of building everything from scratch. There are two ways of reusing existing work on the OpenCUI platform: importing or cloning. This guide will show you how to begin experimenting with a chatbot by cloning.

The OpenCUI platform can be thought of as a GitHub specifically for chatbots. However, instead of repositories, the work within the organization is organized into projects, including chatbots, reusable modules, and providers:

- **Chatbot**: A CUI application where users can access a service through text-based or voice-based user interface.
- **Module**: A module consists of CUI components that handle interaction for a predefined domain. Modules can be reused by chatbots or other modules. You can define a service interface in a module, which can then be used to interact with the backend.
- **Provider**: The provider is the stub to the implementation of the module interface.

When you clone a project, you create an exact copy in your organization that you can inspect and modify. Cloning a project allows you to freely experiment with changes without affecting the original project. Cloning an existing chatbot that provides similar services is a great way to get started since you don't have to start from scratch. This guide will show you how to clone a simple chatbot.

## Before you start

[Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).

## Clone chatbot pingpong
In OpenCUI, you can discover a growing number of public projects by clicking on the **Explore** at the top of the page, which were built by the OpenCUI community. You can inspect a project to see if it fits your needs. Once you are inside the project you want to clone, you can follow the steps below to clone it.

In this guide, we will show you how to clone a chatbot (project for that matter) using pingpong as example. Click [here](https://build.opencui.io/org/me.quickstart/agent/pingpong/struct/intent?page=0&imported=false&search=) to go inside `me.quickstart.pingpong` chatbot： 

1. Click **Clone** on the top right of the navigation bar. 
    ::: thumbnail
    ![enter chatbot](/images/guide/start-with-clone/click_clone.png)
    :::

2. Once you click **Clone**, a pop-up window for basic chatbot settings will appear, you need to decide a couple of things:
   - Choose which **Owner** organization you want to clone this project to.
   - Optionally, you can change the **Project label** for this clone.
   - Decide on how you want to **Deploy** this, have OpenCUI hosting it for you or have it deployed on premise.
   - Pick which **Region** you want to deploy this chatbot to, pick one that is closer to your targeted users.
   - Click on **Clone** at the bottom of the popup.
    ::: thumbnail
    ![enter chatbot](/images/guide/start-with-clone/clone.png)
    :::

::: warning Need to know
A project's label or region can not be changed after creation or clone, so choose it wisely. For privacy reasons, the connections and user session data will NOT be cloned.
:::

## Test the chatbot
Before your chatbot is fully ready to be deployed to production environment, OpenCUI includes a built-in **Debug** tool that allows you to test your design in a development environment, so that you can uncover CUI design bugs as early as possible. There are some restrictions with this tool: you can't test your chatbot in asynchronous extensions including channels like Messenger. Furthermore, you can only test one language at a time, and only committed content in your branch.

To test your chatbot using Debug, follow these steps:
1. Switch to a language view, in this case we switch to **EN**. 
   ::: thumbnail
   ![try it now](/images/guide/pingpong/switch_pingpong_en.png)
   :::
2. In a language view, click **Debug** in the upper-right corner of the Types area , the debug window will slide out. 
   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   :::
3. Click **Connect**. This may take some time as we build and deploy the chatbot to our development environment. Once the connection is successfully established, you can test your chatbot by typing messages in the input box at the bottom and pressing enter. For example, enter `ping` then the chatbot should ask for a location, upon getting a legit location say `Seattle`, respond with `Pong Seattle`. 
   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::

You can make modifications, such as changing the response and expression. For the change to take effect, make sure you commit and reconnect.

Additionally, there are other useful operations available in the upper right corner of the Debug area that can assist you with troubleshooting your chatbot. For more information about Debug, refer to the [Testing](../reference/platform/testing.md) section.

::: thumbnail
![operation icon](/images/guide/start-with-clone/operation-icon.png)
:::

### View log
For coders, you can inspect the detailed log by clicking the "**View log**" icon.

### Save test case
You can save test cases by clicking the "**Save test case**" icon, which allow you rerun them in a later stage. 

### View test cases
Clicking the "**Test cases**" icon lets you compare your chatbot's behavior against expected results and identify errors that require attention.

### Reset session
The replies that the chatbot generates for user input depend on the conversation history. Sometimes, you need to have a clean start to try something new. You can restart the testing session by clicking the "**Reset contexts**" icon.





