# Clone a chatbot

OpenCUI is a platform designed to help regular development teams build natural conversational user interfaces (CUIs) for their services. To reduce the cost of building CUIs, OpenCUI adopts a component-based approach so that you can use pre-built components instead of building everything from scratch. There are two different ways of reusing existing work on the OpenCUI platform: importing or cloning. This guide will show you how to begin experimenting with a chatbot by cloning it.

The OpenCUI platform can be thought of as a GitHub specifically for chatbots. However, instead of repositories, the work within the organization is organized into projects, including chatbots, reusable modules, and providers:

- **Chatbot**: A CUI application where users can access a service through text or voice instead of a graphical user interface.
- **Module**: A module consists of CUI components that handle interaction for a predefined domain. Modules can be reused by chatbots or other modules. You can define a service interface in a module that can be used by the module to interact with the backend.
- **Provider**: The provider is the implementation of the module interface.

When you clone a project, you create an exact copy in your organization that you can inspect and modify. Cloning a project allows you to freely experiment with changes without affecting the original project. Cloning an existing bot that provides similar services is a great way to get started since you don't have to start from scratch. This guide will show you how to clone a simple chatbot.

### Before you start

[Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).

### Clone chatbot pingpont

In OpenCUI, you can discover a growing number of public projects from **Explore** tab at the top of the page, which was built by the OpenCUI community. In this guide, we will show you how to clone a chatbot (project for that matter) using pingpong as example, following these steps： 

* Click **Explore** at the top of page. 
* Type "pingpong" in the search box at the top. 
* Click [here](https://build.opencui.io/org/me.quickstart/agent/pingpong/struct/intent?page=0&imported=false&search=) to select me.quickstart/pingpong chatbot. 
* Once you are inside project you want to clone, you can inspect the project to see if it fits your needs. If so, click **Clone** on the top right of page (the second navigation bar). 

    ::: thumbnail
    ![enter chatbot](/images/guide/start-with-clone/click_clone.png)
    :::

* On the new popup window, you need to decide couple things: 
  - Choose which **Owner** organization you want to clone this project to;
  - Optionally you can change the project label for this clone; 
  - Decide on how you want to deploy this, have OpenCUI hosting it for you or have it deployed on premise; 
  - Pick which region you want to deploy this chatbot to, pick one that is closer to your targeted users; 
  - Decide the timezone for your chatbot, the interpretation of "today" will be based on this timezone; 
  - Click on **Clone** at the bottom of the popup.

    ::: thumbnail
    ![enter chatbot](/images/guide/start-with-clone/clone.png)
    :::

::: warning Need To Know
A project's label or region can not be changed after creation or clone, so choose it wisely. For privacy reasons, the connections and user session data will NOT be cloned.
:::

### Next steps
Now you have a chatbot in your organization, you can play with it by following [test a chatbot](debug.md).
