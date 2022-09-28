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
In this guide, we use [hours component](https://build.framely.ai/org/622c8ff683536204fe062b55/agent/630dc3282d6df2e68a96c688/service_schema) as an example to help you have a quick start with service. Hours component is designed to answer end-users' questions about business hours. 

The whole procedure is shown in picture below and it is divided into these four steps:
[[toc]]

::: thumbnail
![clone](/images/blog/quick-start-with-service/flowchart.gif)
:::

## Step 1: Clone Provider

1. Open [hours provider](https://build.framely.ai/org/622c8ff683536204fe062b55/agent/63101e0437fed01baf0079b3/service_schema) and click **Clone Project**.
2. Choose an organization to clone this provider to.
3. You can change the default project label of the cloned provider.

![clone-provider](/images/blog/quick-start-with-service/clone-provider.png)

## Step 2: Integrate Provider with Chatbot

1. Open [hours chatbot](https://build.framely.ai/org/622c8ff683536204fe062b55/agent/6329731a36b90caee5c750f3/intent) and click **Clone Project**. Choose an organization to clone this chatbot to.
2. Select the region where your chatbot will be deployed. 
3. Go to **Settings** > **Integrations**. Click a service provider, and change it to the cloned provider which implements the service.

![integrate](/images/blog/quick-start-with-service/integrate.png)

4. Click **Commit** on both STRUCT side and EN side.
5. Go to **Versions**, and Click **Pull Request**.
6. Click the current version.

![pull-request](/images/blog/quick-start-with-service/pull-request.png)

7. Click **Approve PR** and then **Merge**.
8. Click **Deploy**. After deployment, refresh the web page and you can see a green checked icon which means the chatbot has been deployed successfully.

![deploy-chatbot](/images/blog/quick-start-with-service/deploy-chatbot.png)



## Step 3: Upload Business Data
1. Back to the cloned provider in [step 1](#step-1-clone-provider). 
2. Repeat #5-8 in [step 2](#step-2-integrate-provider-with-chatbot) to deploy the provider.
3. Go to **Connection**, and click the corresponding region which you selected when cloning the chatbot. You can get a URL of [back office](../guide/glossary.md#backoffice) along with the login information.

![connection](/images/blog/quick-start-with-service/connection.png)

5. Log in to back office. On the left sidebar, you can switch tables in your organization.
6. Click **Create** to add a row.
7. Complete the table and click **Save**. To learn what each column means, see [readme](../articles/hours-readme.html#about-table).

![upload](/images/blog/quick-start-with-service/upload.png)


## Step 4: Try It Now
1. Back to the cloned chatbot in [Step 2](#step-2-integrate-provider-with-chatbot).
2. Click **Commit** on EN side.
3. When commit successfully, click **Try It Now!** then click **CONNECT**.
4. :tada: Now you can use one of the [expressions](../guide/glossary.md#expression-exemplars) defined in intents to ask the bot for business hours and see what the bot replies.

![test](/images/blog/quick-start-with-service/test.png)

::: tip How to find expressions?
On EN side, Click **Intents** > **Imported** > **Expression**.
:::