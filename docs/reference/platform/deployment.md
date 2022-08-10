# Deployment

[[toc]]

## Overview

Framely currently provides two separate serving environments, **development** and **production**. When building your chatbot on paltform and testing your chatbot in [Try It Now](testing.md), it means you are in the development environment, regardless of whether you merge your branch to master or not. When interacting with your bot in an integrated [channel](../channels/overview.md), it means you are in the production environment. 

Deploy is the one that lets you publish the **latest master version** of your bot from development environment to production environment. As deploy only works well with the master version, before you start, please make sure you are done with testing and keep all instances you need merged into master.  

## How To Use

To deploy your chatbot, stay at **STRUCT** level:

1. Head to the **Versions** page, all the versions are listed.
2. Click **Deploy** button, the latest version will be published to production environment.
3. When completed, there will be a flag for the current deployed version. 

Now you can interact with your bot in each integrated channel.

::: thumbnail
<img width="400" alt="whatsapp" src="/images/guide/platform/whatsapp.jpg">
:::
