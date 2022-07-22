# Creating your first Chatbot

In this section, we create a chatbot that one sends a message of `ping` and gets a response `pong`: 
:::: conversation
::: user User
ping
:::
::: bot Bot
pong
:::
::::

Chatbots are essentially a set of intents, each intent is simply a functionality that can be triggered by user utterance and response can be generated based on execution result of that functionality. As a first step, let's see how we build a simplest chatbot with just one intent pong.

At the end of this series we should be able to have this chatbot deployed on Framely and using the Whatsapp business channel. This should be the result:

![whatsapp](/images/guide/platform/whatsapp.jpg)

## Log into Organization
To build your first chatbot, you need to be logged into the Framely platform. If you do not know how, please refer to [signup and login guide](/guide/platform/signingup.html).

After you logged in, you should be to in an organization created for you. 

![Org example](/images/guide/platform/orgexample.png)

Organization is how you manage everything on the Framely platform, which is an umbrella that contains:
- Owner and member. Owner is responsible for managing the macro aspects of the project while member can be internal or outside collaborator.

- As a user, you can exist in multiple organisations.

- An organisation can own several projects.

- As the owner of the project, you can add team members/collaborators and manage them.

Check out our plans to see what you can do based on our different [plans](/pricing).

## Creating first Chatbot

In the first step of building our PingPong chatbot, we will create our first project.

> Chatbot, components and backend are types of projects you can create on the platform. For more info on terms refer to [glossary](/guide/glossary.html)

**Click** *Chatbot* section on the sidebar. This should take you to the chatbot page.
![chatbot section](/images/guide/platform/chatbotsection.png)

We are going to Click on the **Create** button on the page. This should pop a modal where we are going to fill in the details.

![project modal](/images/guide/platform/Projectmodal.png).

We will discuss the different inputs to help you understand what to select:

**Input1**- This is the project label. You can choose a name for your project. For me:

![input1](/images/guide/platform/input1.png)

**Input2**- Projects have different privacy levels. This can be :

- *Public* - visible to everyone

- *Internal* - visible to internal members only.

- *Private* - For private projects, check  out our flexible [plans](/pricing)

![input1](/images/guide/platform/input2.png)

For now we will set up a **public** project to get started

**Input3** - Channels

Framely provides different applications. For now we will select Default application, for Omnichannel and Multichannel apps, check out our [pricing plans](/pricing)

> Provide info on omnichannel and multichannel

![input1](/images/guide/platform/input3.png)

**Input4** - How you wish to deploy your chatbot

![input1](/images/guide/platform/input4.png)

::: tip Deployment mode
 We offer different packages to help personalise your needs. Check our [pricing plans](/pricing). 
:::

**Input5** - Select region you wish to host.

**Input6** - Here we select the language of the chatbot. This will not be changed after chatbot is created.

![input1](/images/guide/platform/input6.png)

**Input7** is basically the timezone and is set to preference.

Click **Create** and we have our first project.

## Adding Response, Expression

**1.**  *Click* **Create** on the page:
![createintent](/images/guide/platform/CreateIntent.png)
On the new page, we will focus on three sections:
**Type** label, **Response** tab and **Expression** tab
![tabstofocus](/images/guide/platform/tabstofocus.png)

**2.** On the label, we are going to type in **Test** and *press* **Enter**

**3.** Move to the **Response** tab, *click* on **Select types of actions** and *Select* **Simple Reply**.

Framely uses version control. The version control is easy to use and we will discuss later on other things like **pull requests**, **Merging**, **Versions** etc. For now we will learn how to **commit** the changes we have made. Version control allows for collaboration.

**4.** It is easy  to do that through the *Click* of a button. Find the commit button as shown, *Click* to **Commit** changes. The **commit** should be a success.
> Results to a new branch that can be reviewed and merged to master.
![commitbutton](/images/guide/platform/commitbutton.png).

**5.** switch from **Struct**(Interaction language) to **EN**

![switch](/images/guide/platform/switch.png)

**6.** *click* on **Response** tab and fill in input with **pong**

![fill in pong](/images/guide/platform/fillpong.png)

**7.** *Click* on **Expression** tab and fill in with **ping** and alias as **Test**

![fill in pong](/images/guide/platform/pingfill.png)

**8.** **Commit** the changes made using the **Commit** button. Great now we can try it out.


## Testing
**1.**  *click* on the ***try it now** button. This will allow you to test the chatbot.

![trynow](/images/guide/platform/trynow.png)

**2.**   A **Modal** should appear, click on connect, and type in **ping** and you should be able to see something like:

![response](/images/guide/platform/response.png)

And now, you have a **ping pong** chatbot.

## Deploying

During creation of a chatbot project, we selected the region we wish to deploy the chatbot. Deploying the chatbot means that customers can access it. At this stage we have not configured channels but once we configure the channels we will be able to see how to deploy the chatbot


