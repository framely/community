# Multilingual

[[toc]]

## Motivation
Multilingual chatbot is one of the most effective and efficient ways your brand can provide customer support to users in their native language. With multilingual chatbot, you can enhance customer satisfaction and engagement to a different level. 

Just like graphic user experiences are built in two layers, where front-end engineers handle interaction logic, and UI designers control the look and feel, the conversational experience design should be decomposed into two layers as well. OpenCUI provides you a way to define what interactions you will need in **Interaction layer** and then lets you reuse them in every **Language layer**, which will always stay in sync and avoid unnecessary duplication of effort for you, just create once and reuse often.

::: tip Note
Multilingual chatbot assumes you deliver the same service to each user in their native languages. If the intention is to provide different services in different countries with different languages, you need to create different chatbots. 
:::

## Overview
When building a multilingual chatbot, you should design the bot interaction at **Structure** level which represents the interaction layer, and supply language-specific data in each language side. 

It's easy to provide a consistent experience in multilingual chatbot, with the same structured data propagating to every language side by clicking **Propagate** at structure level. No need duplicate the bot you created, no need repeat the process for as many languages as you need, just  filling in the blanks with different languages.

![two layers](/images/platform/multilingual/two_layers.png)

## How to use
Let's go through the steps to get a multilingual chatbot up.

### Add multi-language
When creating a chatbot, you can add multiple languages in **Languages** filed. 

![add language](/images/platform/multilingual/add_language.png)

Or switch to **Settings** tab, head to the **General** page, and add multiple languages in **Project language** filed.

![setting language](/images/platform/multilingual/setting_language.png)

After saved, depending on the language you choose, the corresponding language bot will be created automatically. To access language-specific bot, click the **Language selector** above the left sidebar menu.

![switch language](/images/platform/multilingual/switch_language.png)

### Remove language
Remove a language means you will delete the corresponding language bot. To delete a language-specific bot:
1. Switch to **Settings** tab, and head to the **General** page.
2. In the **Project language** filed, click the "**X**" icon next to the desired language that you want to remove.
3. Confirm the action as prompted.

![delete language](/images/platform/multilingual/delete_language.png)

::: danger Caution 
Deleting a chatbot cannot be undone. This will permanently destroy all corresponding data, and remove all collaborator associations.
:::

### Integrations
When configuring a channel, you can choose a locale as the default locale. While bot will be able to understand all the languages you set, it will reply to users in this locale.

![default language](/images/platform/multilingual/default_language.png)