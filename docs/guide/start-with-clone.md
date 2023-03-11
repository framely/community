# Clone and Modify

OpenCUI is a platform designed to help regular dev team to build natural conversational user interface(CUI) for their services. To reduce the cost of building CUI, OpenCUI adopt a component based approach so that you can make use of prefabricated projects instead of building everything from scratch. There are two different ways of reusing existing work on OpenCUI platform, importing or cloning. This guide will show you how to start to play with a chatbot by cloning it.

The OpenCUI platform can be understood as GitHub specifically for chatbots. However, instead of repositories, work under organization is organized into projects, including chatbots, reusable modules and providers:
- **Chatbot**: An CUI application, where users can access service through text or voice instead of a graphical user interface.
- **Module**: Module consists of CUI components that handle interaction for some predefined domain. Module can be reused by chatbot or other module. One can define a service interface in a module, which can be used by that module to interact with backend.
- **Provider**: The implementation of module interface. 

When you clone a project, you create an exact copy in your organization that you can inspect and modify. Cloning from a bot that providing the similar services is a great way to get started since you do not have to start from scratch. This guide shows you how to clone a simple chatbot and test it using the builtin debug tool on the OpenCUI platform.

## Clone Chatbot

In OpenCUI, you can discover a variety of public projects from **Explore** tab at the top of the page, which was built by the OpenCUI community. In this guide, we will use pingpong chatbot as an example, click [here](https://build.opencui.io/org/me.quickstart/agent/pingpong/struct/intent?page=0&imported=false&search=) to select pingpong chatbot.

When you are inside the project you want to clone, follow these steps to clone it： 
1. Click **Clone** on the right of the second navigation bar.
2. Choose the **Org** where you want to add your cloned project, and **Save**.
3. Once you click **Save**, a pop-up window for basic chatbot settings will appear, you can modify them, then click **Save** directly.

::: thumbnail
![enter chatbot](/images/guide/start-with-clone/click_clone.png)
:::

::: warning Need To Know
A chatbot's label or region can not be changed after creation or clone, so choose it wisely. For privacy reasons, the connections and user session data will NOT be cloned.
:::

## Test Chatbot 

OpenCUI includes a built-in **Debug** tool that helps you uncover CUI bugs. With Debug, you can test your chatbot without setting up channels. Note that Debug can only test one language at a time, and only committed content. If the chatbot is cloned, and you have not made any changes, then you can directly switch to the language layer for testing.

To test your chatbot using Debug, follow these steps:

1. In a language view, click **Debug** in the upper-right corner of the Build area , the debug window will slide out. 

   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   :::

2. Click **Connect**. This may take some time to as we build and deploy the chatbot to our test environment. Once the connection is established successfully, you can test your chatbot by typing messages.

3. Enter `ping` in the text input box at the bottom and press enter, then the bot should respond with `Pong`. 
4. You can make modification such as changing the response and expression. For the change to take effect, make sure you commit and reconnect.

   You can save test cases by clicking the "**Save Test Case**" icon, and restart your testing by clicking the "**Reset Contexts**" icon. You can view log information by clicking the "**View Log**" icon. For more information about Debug, refer to the [Testing](../reference/platform/testing.md) section.

   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::


