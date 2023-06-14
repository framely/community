# Overview
We understand no matter how well you build your chatbot, there will always be user requests that are beyond the design and implementation scope, and we need to handoff the conversation to human support team. Support is a software where human agents can handle the conversation when bot has failed or upon user requirement. OpenCUI understand that your human support team already have their favorite support software, so instead of reinventing wheels, OpenCUI is designed to play well with others when it comes to support system, as long as they can provide some basic APIs. 

## Two cooperation modes
There are two different ways support system can work with chatbots, internal mode and external mode. In the internal mode, both channels and bots are managed by support systems, and when either bot or user indicate that they want to talk to a human agent, then the support system will route the conversation from bot to a human agent, and let the human agent take over. In theory, OpenCUI should be able to work with any support system that is designed to work with third party bot solution, by simply implementing the hooks required by a given support system.

In the external mode, messages are coming from the channel attached to the bot, and bot appears to be a normal agent on the support system, and bot is responsible for requesting routing the messages via exposed APIs on the support side. For this mode to work, we need to support system expose the APIs conforming to the following semantics. 

### Support API requirement for external mode
To reduce the effort level on the user side, it is important that we route user conversation to the most relevant support team/department. This translates to support of notion of team/department on the support system side, where team is a group of human agent that are qualified to solve problem of certain topic.
1. We can create a new user on the support side.
2. We can create a conversation to store the history/context of the conversation in case a human agent needs to take over. 
3. We can send messages from a user and bot to this conversation before we hand off to human agent.
4. Support system support more than one human agent teams, each is responsible for something.
5. We can transfer the conversation from bot to specified team by department statically or dynamically, potentially based on , so that a user can be served effectively. 
6. After human agent is done with a service, next time, a user  starts interacting with bot again. Simply invoke CloseSession should be enough.  

In the OpenCUI hosted environment, we are mainly interested in the external mode, currently we provide the great open source support system chatwoot as the only option, but this can change when someone starts to build the connection with other system and open source it.

### Skill based routing under external mode
To reduce the effort level on the user side, we support the conversation routing based on skill. Essentially, skills are grouped into multiple set, each maps to a particular team. When there are unfinished skills in the conversation, that skills can be used to decide which team should we route the conversation to, based on the builder supplied information. When there is no unfinished skill, we can also ask user to provide one, so that they can be transferred to right team directly.

## Configure support

### Before you begin
1. Make sure all the owners in your organization have verified their emails first otherwise you won't be able to get Chatwoot support.

::: tip How to Verify Your Email?
1. Click on your avatar in the top right corner and click on your name.
2. Click "!" icon in the **E-mail** box and follow the instructions to verify your email.
   :::

2. Make sure you have configured your channel first. Learn more about channel configuration, see [Channels](../channels/overview.md).

3. We show here how to integrate your chatbots with Chatwoot in OpenCUI hosted environment. For private deploy, please consult systems in your organization.

### Enable support
Inside your chatbot, in the **Settings** tab and under **Integrations** page.
1. In the **Support** section, turn on the support feature (such as Chatwoot).

   ![enable the support](/images/Chatwoot/enable-support.png)

2. Once you have enabled a support feature, click on it to access its configuration. If you're using the OpenCUI-hosted chatbot, there's no need to fill in any configuration details. However, if you've opted for a private-deployed chatbot, you'll likely need to configure it by providing information such as your account details.

   ![configuration of suppot](/images/Chatwoot/support-configuration.png)

::: tip
If you enable Chatwoot for the first time in your organization, check your email to get your user name and password so you can log into [Chatwoot](https://chatwoot01.framely.ai).
:::

### Set up routing priority
To make skill based routing work, you need to set up routing priority. When there are unfinished skills in the conversation, we follow routing priority to decide which team we should route the conversation to.\
If an unfinished skill is one of the associate skills in routing priority, we route the conversation to the corresponding team. Otherwise, we route the conversation to default team.

To set up routing priority:

Inside your chatbot, in the **Settings** tab and under **Routing priority** page.
1. Click the **Default** team, input team id of the default team. 
2. If you have more than one team, click **Add** to add more teams. The format of **Associate skill** is `Organization.Project.Skill`, e.g. `me.test.supportDemo.TestSkill`.

![routing-priority](/images/Chatwoot/routing-priority.png)

::: tip
To get team id in Chatwoot, see [How to Get Team Id](Chatwoot.md#how-to-get-team-id).
:::