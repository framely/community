---
article: true
date: 2022-11-26

image:
    - blog/banner/quick_start_with_hours.png
description:
    - We show you the steps of building a chatbot using a hours component
author: Sunny May
---

# Quick Start with Hours Component
In this guide, we use [hours component](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/630dc3282d6df2e68a96c688/service_schema) as an example to help you have a quick start with hours component. Hours component is designed to answer end-users' questions about business hours. 

The whole procedure is divided into these steps:
[[toc]]

## Clone Provider

1. Enter [hours provider](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/634cf3c5fba1927bffe79c86/service_schema) and click **Clone**.
2. Choose an organization to clone this provider to and click **Save**.
3. When creating a cloned project, you can change the default **Project Label** and **Region**.

::: thumbnail
![clone-provider](/images/blog/quick-start-with-service/clone-provider.png)
:::

4. Once the provider is created successfully, the page will automatically jump to the cloned provider. In the **Version** tab, click **Pull Request** and then click the current version.

::: thumbnail
![pull request](/images/blog/quick-start-with-service/pull-request.png)
*Figure 1: pull request*

<br>

![click the current version](/images/blog/quick-start-with-service/click-version.png)
*Figure 2: click the current version*
:::

5. Click **Approve PR** and then click **Merge**. Create a **version tag** and click **Save**.

::: thumbnail
![approve pull request](/images/blog/quick-start-with-service/approve-pr.png)
*Figure 1: approve pull request*

<br>

![merge to master](/images/blog/quick-start-with-service/merge.png)
*Figure 2: merge to master*

<br>

![create version tag](/images/blog/quick-start-with-service/create-version-tag.png)
*Figure 3: create version tag and save*
:::

## Upload Business Data
1. Before you start, you need to deploy the provider and then tables will be created automatically in the PostgreSQL database. In the **Version** tab, click **Deploy**. Once the provider deployed successfully, you can see a green checked icon.

::: thumbnail
![deploy provider](/images/blog/quick-start-with-service/deploy-provider.png)
:::

2. In the **Configuration** field, you can get the **URL** of backoffice along with *Admin Email* and *Admin Password* to log in backoffice. 

::: thumbnail
![configuration](/images/blog/quick-start-with-service/configuration.png)
:::

3. Log in to back office. On the left sidebar, you can switch tables in your organization. Click **Create** to add a row. Complete the table and click **Save**. To learn what each column means, see [readme](../articles/hours-readme.html#about-table).

::: thumbnail
![upload data](/images/blog/quick-start-with-service/upload-data.png)
::: 

## Import Component to Chatbot
1. To begin with, you need to [create a chatbot](../guide/pingpong.md#create-chatbot).
2. Enter [hours component](https://build.opencui.io/org/622c8ff683536204fe062b55/agent/630dc3282d6df2e68a96c688/service_schema) and click **Import**. Select a chatbot in which you want to use the hours component and then click **Save**.

::: thumbnail
![import component](/images/blog/quick-start-with-service/import-component.png)
:::

## Integrate Provider with Chatbot

1. Go back to your chatbot. In the **Settings** field, switch to the **Integrations** tab and Click **Select Service**. Enter a Label and select a Service Provider.

::: thumbnail
![integrate](/images/blog/quick-start-with-service/integrate.png)
:::

## Test Chatbot
1. Click **Commit** on **STRUCT** side. Then switch to **EN** side and click **Commit** as well.

::: thumbnail
![commit struct](/images/blog/quick-start-with-service/commit-struct.png)
*Figure 1: commit at **STRUCT** side*

<br>

![swtich to en](/images/blog/quick-start-with-service/switch-to-en.png)
*Figure 2: swtich to EN side*

<br>

![commit en](/images/blog/quick-start-with-service/commit-en.png)
*Figure 3: commit at **EN** side*
:::

2. When commit successfully, click **Debug**.

::: thumbnail
![click test](/images/blog/quick-start-with-service/click-test.png)
:::

3. Click **CONNECT**. Now you can use one of the [expressions](../guide/glossary.md#expression-exemplars) defined in skills to ask the bot for business hours and see what the bot replies. A sample conversation is shown below.

::: thumbnail
![sample conversation](/images/blog/quick-start-with-service/conversation.png)
:::

::: tip How to find expressions?
On EN side, Click **Skills** > **Imported** > **Expression**.
:::