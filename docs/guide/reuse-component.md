# Reuse a full-stack component

A full-stack component is a self-contained, reusable functionality that encompasses both user-interfacing frontend and business logic backend implementation. This tutorial will show you how to add conversational functionality to your chatbot through the reuse of a full-stack component.

### Background
Modern business applications are typically broken down into a set of services, each responsible for a specific functionality. For example, an airline might have a ticketing service, which includes booking, checking seat availability, and canceling. A service is an interface for a business capability that usually consists of a set of Application Programming Interface (API) functions. In the context of a chatbot, these interfaces decouple the conversational frontend from the backend implementation of the service, allowing them to be developed independently, making it easier to update and reuse.

Similar to a chatbot, a module is also an OpenCUI frontend project, but it is commonly used to expose a single service conversationally. However, a module does not have the special skill "Main" like a chatbot does, so it cannot be deployed on its own. Modules are like libraries; they need to be imported into an application like a chatbot to be effective.

Backend implementations of a service are typically also deployed separately. A provider is designed to offer a convenient way for the frontend to interact with a remote service implementation as if it were a local function call, while handling the necessary network communication details behind the scenes. You need to configure a provider so that it has the correct endpoints and required credentials to be usable. Once configured, it can be used by every chatbot in the organization. Here is how chatbots, modules and providers are typically working together. 

::: thumbnail
![relationship](/images/guide/use-service/relationship.png)
:::

A full-stack component, consisting of a module of a service and a compatible provider, is all you need to provide this service conversationally. These pre-built, often higher quality full stack components is a very cost-effective way for you to introduce conversational experiences to your chatbot. This reuse can be done in three simple steps:
1. Decide on a service you want to expose, make sure the module and provider are of high quality; 
2. Set up a compatible provider into your organization and configure it, by cloning;
3. Import the module of that service into the chatbot of your choice; 
4. finally wire the provider to the service in the chatbot configuration; 


## Before you start
- [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
- [Clone a simple chatbot](./clone-simple-chatbot.md) for how to clone a project and test a chatbot.
<!--Reuse a full-stack component 不涉及 build types，是不是不用阅读 build a simple chatbot?-->

## Pick a full-stack component
OpenCUI is designed to promote reusability for both frontend and provider. When you want to add some functionalities to your chatbot, it is a good idea to see if there are full-stack components available that can meet your needs. Reusing a full-stack component allows you to quickly increase the scope of the service that you offer conversationally, without incurring the high costs and long lead times associated with developing from scratch.

This guide shows you how to follow these steps to reuse an existing full-stack component, consisting of [hours module](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema)) and [hours provider](https://build.opencui.io/org/me.quickstart/agent/hoursProvider/struct/service_schema), to field users' questions about your business hours. 

Here is an example dialogue that shows how this chatbot helps users get business hours:

:::: conversation
::: user User
Hello, what time do you open?
:::

::: bot Bot
Our business hours in a week are

**Mon** 10:00 AM – 11:00 PM

**Tue** Closed

**Wed** 10:00 AM – 11:00 PM

**Thu** 10:00 AM – 11:00 PM

**Fri** 10:00 AM – 11:00 PM

**Sat** 10:00 AM – 11:00 PM

**Sun** Closed
:::
::::

In addition to displaying the business hours for the week, this chatbot can also show the business hours for a particular day. For example:

:::: conversation
::: user User
Hi, are you open this Friday?
:::

::: bot Bot
We are open on Friday, March 31, 2023 from 10:00 AM to 11:00 PM.
:::
::::

## Set up a provider
To allow a module to interact with its service implementation, you need to set up a compatible provider in your organization and configure it so that it can connect to the actual backend. Additionally, you need to populate the backend with your business information.

Instead of setting up a provider from scratch, in this guide, you will clone a Postgres provider. The Postgres provider is hosted by OpenCUI, which means that the corresponding backend implementation of services is also built and managed by OpenCUI. This backend is essentially a relational database with service APIs implemented in SQL and made available in RESTful. Additionally, this backend comes with an admin interface called "backoffice," which allows business operators to populate the database with their business data.

Postgres provider contains not only a stub that abstracts the complexities of communication to masquerade remote services as local function calls, but also the schema needed to create the database, as well as function definitions that can be turned into stored procedures. This allows OpenCUI to build and deploy a fully functional backend for a Postgres provider upon request. The Postgres provider is automatically configured and introduces no external dependencies, making it a very convenient way to provide full-stack behavior for small and medium-sized businesses.

Once deployed, you need to inject the business data into the backend. For this use case, you set the business hours for each day of the week, as well as the hours for special occasions.

### Clone the provider
1. Clone the [hoursProvider](https://build.opencui.io/org/me.quickstart/agent/hoursProvider/struct/service_schema) project and set the **Project label** to _hoursProvider_ (it is ok to set to something else, but let's use this label in the quickstart).

2. In the just cloned provider, merge the initial definition. 
   1. go to **Versions** page and click **Pull request** in the upper-right corner of the Versions area.

      ::: thumbnail
      ![pull request](/images/guide/use-service/pull-request.png)
      :::

   2. Click on the request you just pulled, and **Compare diffs** field will slide out.

      ::: thumbnail
      ![click request](/images/guide/use-service/click-request.png)
      :::

   3. In the **Compare diffs** drawer, click **Approve PR**, then click **Merge**. 

      ::: thumbnail
      ![click approve pr](/images/guide/use-service/click-approve.png)
      :::

   4. Enter the **Version tag** and click **Save**.

      ::: thumbnail
      ![version tag](/images/guide/use-service/version-tag.png)
      :::

3. Click **Deploy** in the upper-right corner of the Versions area. For the Postgres provider, this will create the tables and composite types defined in the cloned provider in the managed PostgreSQL instance for your organization if they have not been created before (or update schema when changes are needed), and make these tables available for both the backoffice and chatbot through RESTful APIs.

   ::: thumbnail
   ![deploy](/images/guide/use-service/deploy.png)
   :::

### Populate database
Before the backend can serve relevant information, you need to populate the databased with: your business hours and timezone. You can do this using the provided [backoffice](../reference/providers/postgrest.md#access-backoffice). 

For every organization that uses at least Postgres provider, OpenCUI also created web application for this organization to manage the data in the backend. You can get there as superuser by clicking the **URL** and log in with the **Admin email** and the **Admin password**.

   ::: thumbnail
   ![configuration](/images/guide/use-service/configuration.png)
   :::

Everything is organized into tables in SQL backend, and table can be referenced by provider followed by a type, such as **hoursProvider.Hours**. To get here, simply select the **hoursProvider** section and click **Hours**.

#### Set up business hours
1. On the **hoursProvider.Hours** page, click **Create**.

   ::: thumbnail
   ![create business hours](/images/guide/use-service/create-business-hours.png)
   :::

2. To add the **main business hours** for each day of the week:
   - Fill in the form with the following information:
      - **dayOfWeek**: select a day of the week to add business hours.
      - **ifOpen**: whether you are open on that day.
      - **openingTime**: the time when you open on that day. Required when **ifOpen** is true.
      - **closingTime**: the time when you close on that day. Required when **ifOpen** is true.
      - **specialDate**: for the main business hours, it must be empty.
   - Once done, click **Save**.

   ::: thumbnail
   ![show business hours](/images/guide/use-service/show-business-hours.png)
   :::

3. **_[OPTIONAIL]_** To add business hours for a special date, use the **specialDate** column, which is the date that is not covered in the main business hours. Any day that you will be out of service, including holidays, can be covered in this way.

   ::: thumbnail
   ![business hours list](/images/guide/use-service/business-hours-list.png)
   :::

#### Set up time zone

1. On the **hoursProvider.Configuration** page, click **Create**.

2. Enter the time zone of your business and save. Formatted as an [IANA Time Zone Database](http://www.iana.org/time-zones) name, e.g. "_America/Los_Angeles_".
   ::: thumbnail
   ![timezone-list](/images/guide/use-service/timezone-list.png)
   :::

## Import module to the chatbot
On OpenCUI, importing modules is another way to reuse conversational experiences. Unlike cloning a project where you use existing work as a starting point and modify anything to fit your needs, but you cannot benefit from any improvements that will be introduced to the source project after you clone it. With an imported module, it has to fit your needs from the get-go, as there are only limited things, mostly at the language layer, that you can customize. On the other hand, you can always upgrade an imported module to a newer version with bugs fixed and improved experiences.

Reusing the conversational experience in a module is simple: just import the module with the desired functionality into your chatbot and connect the service to a configured provider in your organization.

### Import the module
1. Enter source module [hours](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema), the one that you want to reuse. You can also go there by doing a search on the explore tab.
2. Click **Import**.
3. Select the chatbot or module you want to import to and save.

  ::: thumbnail
  ![import service](/images/guide/use-service/import-service.png)
  :::

### Wire the provider
For each service that is referenced in the chatbot, you need to wire a provider to it so that the chatbot, or the module imported into the chatbot, can actually access the service implementation. You can wire different providers to the same service under different environments.

Under the chatbot's **Settings** tab, inside **Integrations** page. 
- Inside the **Debug service provider** section.
  1. Click **Select service** and select `me.quickstart.hours.IHours`. 
  2. Enter a unique label, this can be useful for debugging.
  3. Select a provider for this service, from all compatible providers in this organization.

When you are ready to deploy your service to the production environment, you need do it again under the **Deploy service provider** section.

   ::: thumbnail
   ![set up provider](/images/guide/use-service/set-up-provider.png)
   :::

## Test a chatbot
Finally, you can try the chatbot for business hours using built-in [Debug](../reference/platform/testing.md#how-to-use) tool:
- Send "When do you open?" and you should receive the business hours for the entire week starting with the current day of the week.
- Send "Do you open this Friday?" and you will receive the business hours for this Friday if it is open. If not, you will be informed that it is closed and the weekly business hours will be shown.