# Deployment

[[toc]]

## Overview

Framely currently provides two separate serving environments, **development** and **production**. When building your chatbot on paltform and testing your chatbot in [Try It Now](testing.md), it means you are in the development environment, regardless of whether you merge your branch to master or not. When interacting with your bot in an integrated [channel](../channels/overview.md), it means you are in the production environment. 

Deploy is the one that lets you publish the **latest master version** of your bot from development environment to production environment. As deploy only works well with the master version, before you start, please make sure you are done with testing and keep all instances you need merged into master.  

## How To Use

To deploy your chatbot, stay at **STRUCT** level:

1. Head to the **Versions** page, all the versions are listed. If there is no version here, you need to merge your chatbot first, for more information about versions, see [Version Control](versioncontrol.md). 

::: thumbnail
![version page](/images/platform/deployment/version_page.png)
:::

2. Click **Deploy** button, the latest **Merged** version will be published to production environment.

::: thumbnail
![version page](/images/platform/deployment/deploy_button.png)
:::

3. When completed, there will be a **Green Checked Icon** to indicate the current deployed version. 

::: thumbnail
![version page](/images/platform/deployment/deploy_complete.png)
:::

Now you can interact with your bot in each integrated channel like the screenshot below. For more information about channel integration, see [channel](../channels/overview.md). 

::: thumbnail
<img width="400" alt="whatsapp" src="/images/guide/platform/whatsapp.jpg">
:::
