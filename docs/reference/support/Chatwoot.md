# Chatwoot
When a user demands talking to a human agent, we can forward the conversation to the support system. Currently the open source system Chatwoot is the only support system.

## How it works
1. When an end-user demands talking to a human agent.

![how-it-works-1](/images/Chatwoot/how-it-works-1.png)

2. An agent will get notified when the conversation is assigned to him.

![how-it-works-2](/images/Chatwoot/how-it-works-2.png)

3. The agent can view the history of the conversation and communicate with the end-user in conversation window.

![how-it-works-3](/images/Chatwoot/how-it-works-3.png)

4. The agent can resolve the conversation when he is done with service.

![how-it-works-4](/images/Chatwoot/how-it-works-4.gif)

5. After the agent resolves the conversation, next time the end-user will start with interacting bot again.

![how-it-works-4](/images/Chatwoot/how-it-works-5.png)

## Configuration
Now you can follow these steps to configure your account in Chatwoot.

### Add agents
When you [enable Chatwoot](../support/overview.md#enable-support), we create a Chatwoot organization and add all the owners in your organization to it. The owners added to Chatwoot organization are called agents which are set as administrators by default.
::: tip How to Manage Owners in Your Organization?
1. Log into OpenCUI account and enter your organization.
2. Click **Settings** > **Internal Members**. Now You can view all the onwers and members in your organization.
3. Click **···** to set the internal member as owner / member, or to remove internal members.
:::

Once you log into [Chatwoot](https://chatwoot.naturali.io/), you can click **Settings** > **Agents** > **Add Agent** and follow the instructions. Agents you add will receive an email with a confirmation link to activate their account, after which they can access Chatwoot and respond to messages sent by end-users.

![config-agents](/images/Chatwoot/config-agents.png)

::: danger
The role of BotAgent1 should always be administrator. Otherwise, agents can not receive messages sent by end-users.
:::

### Set up inbox
When you enable Chatwoot in a chatbot, we will create an inbox named after the chatbot and connect the inbox to the chatbot. When you deploy the chatbot to a channel and end-users send messages to the chatbot through that channel, you can get the conversation in the corresponding inbox. 

Follow these steps to add an agent to the inbox so when it's needed agents can carry on the conversation.

1. Click **Inboxes** > **Settings**

![config-inbox-1](/images/Chatwoot/config-inbox-1.png)

2. In **Collaborators** field, add agents to the inbox and click **Update** to save changes.

![config-inbox-2](/images/Chatwoot/config-inbox-2.png)

### Add teams
When the conversation is assigned to a team, the agents in the team can carry on the conversation. See [Chatwoot - Add Teams](https://www.chatwoot.com/docs/user-guide/add-teams-settings) to learn how to add teams.

## How to get team id
In the **Conversations** field, select a team. The last number in current url is the id of this team. As shown, the id of **team a** is 47.

![get-team-id](/images/Chatwoot/get-team-id.png)