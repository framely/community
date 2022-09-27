---
article: true
date: 2022-09-27

image:
    - blog/quick-start.png
description:
    - Use component to start quickly
author: Sunny May
---

# Quick Start with Service
In this guide, we use [Hours component](https://build.framely.ai/org/622c8ff683536204fe062b55/agent/630dc3282d6df2e68a96c688/service_schema) as an example to help you have a quick start with service. Hours component is designed to answer end-users' questions about business hours. 

The whole procedure is shown in picture below and it is divided into these four steps:
[[toc]]

::: thumbnail
![clone](/images/blog/quick-start-with-service/flowchart.gif)
:::

::: tip Note
You can look up terms marked in italics in [glossary](../guide/glossary.html) which introduces common Framely terminology.
:::
## Step 1: Clone Provider

1. Open [Hours provider](https://build.framely.ai/org/622c8ff683536204fe062b55/agent/63101e0437fed01baf0079b3/service_schema) and click **Clone Project**.
2. Choose an organization to clone this provider to.
3. You can change the default project label of the cloned provider.

![clone-provider](/images/blog/quick-start-with-service/clone-provider.png)

## Step 2: Integrate Provider with Chatbot

1. Open [Hours chatbot](https://build.framely.ai/org/622c8ff683536204fe062b55/agent/6329731a36b90caee5c750f3/intent) and click **Clone Project**. Choose an organization to clone this chatbot to.
2. Select the region where your chatbot will be deployed. 
3. Go to **Settings** > **Integrations**. Click a service provider and change it to the cloned provider.

![integrate](/images/blog/quick-start-with-service/integrate.png)

4. Click **Commit** on both STRUCT side and EN side.
5. Go to **Versions**, Click **Pull Request**

## Step 3: Upload Business Data

When you successfully deploy your project, you can upload business data on [*Backoffice*](https://backoffice-615fa4282cc41400665536e3.api.naturali.io/). In this example, we upload business hours and related information.

1. On the left sidebar, you can switch tables in your organization.
2. Click **Create** to add a row.
3. Complete the table and click **Save**. To learn what each column means, see [Hours - About Table](../articles/hours-readme.html#about-table).

![upload](/images/blog/quick-start-with-service/upload.png)

####### Step 3: Import Component

*Component* defines how chatbot can collect user intention for some reason so that different businesses in the same sector do not need to build the same CUI behavior over and over again. *Import* is a way to reuse functionality of *Component*. By importing *Component* built by others, there is no need to build functionality from scratch. After you upload business data, let's import [Hours component](https://build.framely.ai/org/615fa4282cc41400665536e3/agent/62650a98132e5d9cbc123fa9/service_schema) for service.

1. Enter your [organization](https://build.framely.ai/org), in **Chatbots** field, Click **Create** to create a new *Chatbot*.
2. Fill in the form and modify default settings based on your scenario. :exclamation: Be sure to choose the right **TimeZone**.

![create](/images/blog/quick-start-with-service/create.png)

3. Open [Hours component](https://build.framely.ai/org/615fa4282cc41400665536e3/agent/62650a98132e5d9cbc123fa9/service_schema) and Click **Import Project**. Import this component to the chatbot you just created before.
   
![import](/images/blog/quick-start-with-service/import.png)

4. Back to your chatbot, in **Setting** field, click **Integrations** > **Select Service** and choose the component we imported before.
5. Select **Service Provider** which you deploy in [step 2](../articles/quick-start-with-service.html#step-2-upload-business-data).

![choose-provider](/images/blog/quick-start-with-service/choose-provider.png)

## Step 4: Try It Now
*Intent* is simply a task that end-users accomplish through chatbot. It defines what user have to say to indicate that he/she wants some thing, and which actual function to invoke for that task. Testing your chatbot strats from triggering an intent. To trigger an intent, you can use one of the expressions defined in the intent.


:muscle: One last step, you are almost there. Let's try to test your chatbot!

1. Click **Commit**. 
2. When commit successfully, switch to a language agent.

![commit](/images/blog/quick-start-with-service/commit.png)

3. Click **Commit**. 
4. When commit successfully, click **Try It Now** > **Connect**.
5. :confetti_ball: Well done! Now you can use expressions to ask bot for business hours.

![test](/images/blog/quick-start-with-service/test.png)

::: tip How to find expressions
1. Switch to a language agent.
2. Click **Intents** > **Imported** > **Expression**.
   :::