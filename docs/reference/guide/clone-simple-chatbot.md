# Clone an echo chatbot

OpenCUI is a platform that makes it easy to build conversational user interfaces (CUIs) for your services. It uses a type-based approach, so you can use pre-built components instead of building everything from scratch. This can save you time and effort, and it can help you create more consistent and reliable CUIs. 

On OpenCUI platform, organization is like a container for your team's shared work, and these work are organized into projects. A project is a collection of functionalities and resources that are used to build a CUI. Projects can include chatbots, reusable modules, and providers. Chatbots are essentially applications where users can access services through a text-based or voice-based conversational user interface. Modules and providers help to simplify chatbot development. 

There are two ways to reuse existing work on the OpenCUI platform: **Clone** and **Import**. 
- Clone, creates an exact copy of the project in your organization. This allows you to freely experiment with changes without affecting the original project.
- Import, allows you reuse the pre-built components in your own project.

Cloning projects is a great way to get started with OpenCUI. You can easily get a project with the same capabilities as an existing one by cloning it. In this guide, we will show you how to clone a chatbot, and play it with the built-in **Debug** tool.

## Before you start

[Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login). A personal organization will be created for you when you sign up.

## Clone chatbot pingpong

OpenCUI has a growing number of public projects that you can discover by clicking on the **Explore** tab at the top of the page. These projects were built by the OpenCUI community, and you can inspect them to see if they fit your needs. Once you are inside the project you want to clone, you can follow the steps below to clone it.

This guide will show you how to clone a chatbot using `me.quickstart.pingpong` as an example. Click [here](https://build.opencui.io/org/me.quickstart/agent/pingpong/struct/type) to navigate to the chatbot： 

1. In the top-right corner of the page, click **Clone**. 

    ![enter chatbot](/images/guide/start-with-clone/click_clone.png)

2. After clicking Clone, a pop-up window will appear with basic chatbot settings. You will need to decide a few things: 
   - Choose which **Owner** organization you want to clone this project to.
   - Optionally, you can change the **Project label** for this clone.
   - Decide on how you want to **Deploy** this, have OpenCUI hosting it for you or have it deployed on premise.
   - Pick which **Region** you want to deploy this chatbot to, pick one that is closer to your targeted users.

    ![enter chatbot](/images/guide/start-with-clone/clone.png)

3. Click on **Clone** at the bottom of the popup. Once you have cloned the chatbot, you can test it directly.

::: warning Caution
A project's label or region can not be changed after creation or clone, so choose it wisely. For privacy reasons, the connections and user session data will NOT be cloned.
:::

## Test the chatbot

OpenCUI includes a built-in Debug tool that allows you to test your chatbot in a development environment before deploying it to production. This can help you identify and fix CUI design bugs early on. However, there are some restrictions with this tool:
- You cannot test your chatbot in asynchronous extensions including channels, such as Messenger. 
- You can only test one language at a time.
- You can only test content that has been committed in your branch.

Despite these restrictions, the Debug tool is a valuable tool for testing your chatbot before deployment. It can help you catch bugs and improve the overall quality of your chatbot. 

To use the built-in debug tool, you can follow these steps:
1. Switch to a language view, in this case we switch to **Language / en**. 

   ![try it now](/images/guide/start-with-clone/switch_pingpong_en.png)

2. In **Language / en**, click **Debug** in the upper-right corner of the Types area , the debug window will slide out. 

   ![try it now](/images/guide/start-with-clone/tryitnow_icon.png)

3. Click **Connect**. This may take some time as we build and deploy the chatbot to our development environment. Once the connection is successfully established, you can test your chatbot by typing messages in the input box at the bottom and pressing enter. 
   
   For example, enter `ping` then the chatbot should ask for a location, upon getting a legit location say `Seattle`, respond with `Pong Seattle`. 

   ![pingpong test](/images/guide/start-with-clone/pingpong_test.png)

   Additionally, there are other useful operations available in the upper right corner of the Debug area, such as viewing the log, saving a test case, and resetting the session. These operations can help you troubleshoot your chatbot. For more information about the Debug tool, please refer to the [Testing](../platform/testing.md) section.

   ![operation icon](/images/guide/start-with-clone/operation-icon.png)

In addition, you can make modifications to your chatbot, such as changing the response and expression. For the changes to take effect, be sure to commit and reconnect. For more information about workflow, see [OpenCUI workflow](opencui-flow.md).