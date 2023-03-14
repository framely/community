## Clone a project

OpenCUI is a platform designed to help regular dev team to build natural conversational user interface(CUI) for their services. To reduce the cost of building CUI, OpenCUI adopts a component based approach so that you can make use of prefabricated projects instead of building everything from scratch. There are two different ways of reusing existing work on OpenCUI platform, importing or cloning. This guide will show you how to start to play with a chatbot by cloning it.

The OpenCUI platform can be understood as GitHub specifically for chatbots. However, instead of repositories, work under organization is organized into projects, including chatbots, reusable modules and providers:
- **Chatbot**: A CUI application, where users can access service through text or voice instead of a graphical user interface.
- **Module**: Module consists of CUI components that handle interaction for some predefined domain. Module can be reused by chatbots or other modules. One can define a service interface in a module, which can be used by that module to interact with backend.
- **Provider**: The implementation of module interface. 

When you clone a project, you create an exact copy in your organization that you can inspect and modify. Cloning an existing bot that provides similar services is a great way to get started since you do not have to start from scratch. This guide shows you how to clone a simple chatbot.

### Before you start

[Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).

### Clone chatbot

In OpenCUI, you can discover a variety of public projects from **Explore** tab at the top of the page, which was built by the OpenCUI community. In this guide, we will use pingpong chatbot as an example, click [here](https://build.opencui.io/org/me.quickstart/agent/pingpong/struct/intent?page=0&imported=false&search=) to select pingpong chatbot.

When you are inside the project you want to clone, follow these steps to clone it： 
1. Click **Clone** on the right of the second navigation bar.
2. Choose the **Org** where you want to add your cloned project, and **Save**.
3. Once you click **Save**, a pop-up window for basic chatbot settings will appear, and you can modify them, then click **Save** directly.

::: thumbnail
![enter chatbot](/images/guide/start-with-clone/click_clone.png)
:::

::: warning Need To Know
A project's label or region can not be changed after creation or clone, so choose it wisely. For privacy reasons, the connections and user session data will NOT be cloned.
:::
