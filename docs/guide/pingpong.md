# Creating your first Chatbot

Upgrading communication is important for your services. Chatbots are important and provide a conversation interface to help customers with certain matters whenever a human agent is not available or when customer base is large. This means that 24/7 customer care service is possible. This also improves sales and boosts business growth.

Chatbots  can help in transacting or even performing converstational tasks. Transactional chatbots would be ideal for restaurants, cinemas while conversational chatbots would be ideal for things like customer care or medical services since its usually contexually aware.

In this section, we are basically aiming to create a chatbot that one sends a message of `ping` and gets a response `pong`.   The aim of this exercise is to show how one can configure a chatbot to return responses based on intents. If a customer, say would want to get information on  **ping** then the chatbot would return **pong** in a conversational manner. This is applicable in things like frequently asked questions where the solution is readily available and you can let the user know the answer.

To build your first chatbot, you need to be logged into the Framely platform. If you do not know how, please refer to [this guide](/guide/signingup.html).

Assuming you are already on the Framely platform, you should be to find an organisation created for you.

![Org example](/images/guide/platform/orgexample.png)

On the Framely platform we have the organisations which is an umbrella that contains:

- Owner and member. Owner is responsible for managing the macro aspects of the project while member can be internal or outside collaborator.

- As a user, you can exist in multiple organisations.

- An organisation can own several projects.

- As the owner of the project, you can add team members/collaborators and manage them.

Check out our plans to see what you can do based on our different [plans](/pricing).

## Creating first project

In the first step of building our PingPong chatbot, we will create our first project.

> Chatbot and backend are projects on the platform. For more info on terms refer to [glossary](/guide/glossary.html)

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

## Adding Response, Expression and Testing

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

**9.**  *click* on the ***try it now** button. This will allow you to test the chatbot.

![trynow](/images/guide/platform/trynow.png)

**10.**   A **Modal** should appear, click on connect, and type in **ping** and you should be able to see something like:

![response](/images/guide/platform/response.png)

And now, you have a **ping pong** chatbot.


### Version control

This is how we manage and track changes to software code. A good example of version control is [git](https://git-scm.com/). Framely version control is modeled after git. Others can't see your branch, so you have to merge to master so that others can view the master version.  Version control helps members collaborate in building the chatbot.

**1**. Make sure that you have **committed** the changes on **EN** and then you should be back to **STRUCT**

**2**. *Click* on **version** on the **SideMenu**

**3**. *Click* on **+ Pull Request** and you should be able to see your commit:
> Pull request is used to indicate that you want to merge to master

![pr](/images/guide/platform/pr.png)

**4**. *Click* on the item and drawer should slide in and click **Approve**
This is the review stage that can be done by your peers. For our case, we will just approve.

![prapprove](/images/guide/platform/approvepr.png)

**5**. *Click* on merge when the next drawer slides in. This should pop a modal where you enter version tag and *click* 
**Save** . The changes are merged into master.

![tag](/images/guide/platform/TAG.png)


