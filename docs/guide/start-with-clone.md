# Start with Cloneable Project
> Use cloneable projects built by the OpenCUI community to inspire your own chatbots by cloning them into your organization.

When creating chatbots, cloneable projects can be utilized as a foundation upon which to build. There are three kinds of projects:
- **Chatbot**: An application with conversational user interface(CUI), where users can access service through text or voice instead of a graphical user interface.
- **Module**: The composable architecture of OpenCUI allows you to build encapsulated components that handle interaction for some predefined purpose, and then wire these into bigger and bigger ones for what you need. And some modules contain service interface, which can be used as basis to declaratively build the backend.
- **Provider**: The implementation of module interface.

When you clone a project, you create an exact replica in your organization where you can get a closer look, take it apart, and customize it. This powerful reusability can make building amazing chatbots faster. 

However, it's important to customize projects to suit your specific situation. For example, you can modify the language related annotations of a chatbot project, including modifying the expression exemplars or response templates that align with your unique scenario, and provide integration if needed.

This guide shows you how to clone a simple pingpong chatbot and test it.

## Clone Chatbot

In OpenCUI, you can discover a variety of public projects from **Explore** tab at the top of the page, which was built by the OpenCUI community builders to address common use cases. In this case, we will use pingpong chatbot as an example, click [here](https://build.opencui.io/org/me.quickstart/agent/pingpong/struct/intent?page=0&imported=false&search=) into pingpong chatbot.

When you are inside the project you want to clone, follow these steps to clone it： 
1. Click **Clone** on the right of the second navigation bar.
2. Choose the **Org** where you want to add your cloned project, and **Save**.
3. Once you click **Save**, a pop-up window for basic chatbot settings will appear, you can modify them, or click **Save** directly.

::: thumbnail
![enter chatbot](/images/guide/start-with-clone/click_clone.png)
:::

::: warning Need To Know
If you want to change a chatbot's label or region, you will need to clone it with the desired choices. Note all user session data with old chatbot will be lost.
:::

## Test Chatbot 

OpenCUI includes a built-in testing feature called **Debug** that helps you uncover CUI bugs by providing debug information. With Debug, you can test your chatbot without setting up channels.

Note that Debug can only test committed content, so ensure that both the interaction layer and language layer have been committed before testing. If the chatbot is cloned and you have not made any changes, then you can directly switch to the language layer for testing.

To test your chatbot using Debug, follow these steps:

1. On the language layer, click **Debug** in the upper-right corner of the Build area , the debug field will slide out. 

   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   :::

2. Click **Connect**. This may take some time to as we build and deploy the chatbot to our test environment. Once the connection is established successfully, you can test your chatbot by typing messages.

3. Enter `ping` in the text input box at the bottom and press enter, then the bot should respond with `Pong`. If you add more than one template, bot will reply in turn. If you add more than one examplar to a skill, any examplar will trigger that skill. It is assumed that the skills are semantically exclusively, so that one should not use the same exemplar in different skills from the same bot. As the skill level exemplars has no context. 

   You can save test cases by clicking the "**Save Test Case**" icon, and restart your testing by clicking the "**Reset Contexts**" icon. If there are any exceptions, you can view log information by clicking the "**View Log**" icon. For more information about Debug, refer to the [Testing](../reference/platform/testing.md) section.

   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::


