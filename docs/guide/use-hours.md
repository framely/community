# Reuse a full-stack module
 Modern business applications are typically broken down into a set of services, each responsible for a specific functionality. For example, airline might have a ticketing service, which includes booking, checking whether a seat is available and canceling. All user interfacing applications are built to expose these kinds of services, chatbot included.

On OpenCUI, a module is a reusable conversational component commonly used to expose a service, simply a set of API functions. Each service can have one or more backend implementations that are developed and deployed separately. A provider, designed to abstract away the details of the underlying communication protocol, can make it easy to interact with the service backend. A full-stack module, or a module that is paired with a provider, is all you need to provide the service conversationally.

::: thumbnail
![relationship](/images/guide/use-service/relationship.png)
:::

OpenCUI allows you to reuse a pre-built, often higher quality component to offer some functionality. This can be done in three simple steps: clone and configure a provider in your organization, import a module into a chatbot, and finally wire the provider to the service in the chatbot configuration. This guide shows you how to follow these steps to reuse an existing full-stack module to field users' questions about your business hours.

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
In addition to displaying the business hours for the week, this chatbot can also show the specific business hours of a particular day. For example:

:::: conversation
::: user User
Hi, are you open this Friday?
:::

::: bot Bot
We are open on Friday, March 31, 2023 from 10:00 AM to 11:00 PM.
:::
::::

## Before you start

[Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).

## Prepare a provider
Before the chatbot can serve requests regarding business hours using an existing module, you need to clone its provider into your organization and configuring it so that it can connect to the actual backend. Additionally, you need to populate the backend with your business information.

In this guide, we will clone a PostgREST provider. The PostgREST provider is an OpenCUI-hosted provider, which means that the backend, or the actual implementation of services, is also managed by OpenCUI. This backend is essentially a PostgreSQL database with RESTful access, and comes with an admin interface called backoffice so that business operators can populate the database with their business data. In this case, you can set the main business hours for each day of the week, as well as the hours for special days such as holidays. Hosted providers introduce no external dependency, making the deployment of the chatbot easier. Furthermore, the connection is automatically configured so that builders don't need to worry about it.

### Clone the provider
1. Clone the [hoursProvider](https://build.opencui.io/org/me.quickstart/agent/hoursProvider/struct/service_schema) project and set the **Project label** to _hoursProvider_ (it is ok to set to something else, but we will use this label in the quickstart).

2. In the cloned provider, merge the cloned the content. 
   * go to **Versions** page and click **Pull request** in the upper-right corner of the Versions area.

      ::: thumbnail
      ![pull request](/images/guide/use-service/pull-request.png)
      :::

   * Click on the request you just pulled, and **Compare diffs** field will slide out.

      ::: thumbnail
      ![click request](/images/guide/use-service/click-request.png)
      :::

   * In the **Compare diffs** drawer, click **Approve PR**, then click **Merge**. 

      ::: thumbnail
      ![click approve pr](/images/guide/use-service/click-approve.png)
      :::

   * Enter the **Version tag** and click **Save**.

      ::: thumbnail
      ![version tag](/images/guide/use-service/version-tag.png)
      :::

3. Click **Deploy** in the upper-right corner of the Versions area. For the PostgREST provider, this will create the tables and composite types defined in the cloned provider in the managed PostgreSQL instance for your organization if they have not been created before (or update schema when changes are needed), and make these tables available for both the backoffice and chatbot through RESTful APIs.

   ::: thumbnail
   ![deploy](/images/guide/use-service/deploy.png)
   :::

### Populate database with business data 
Business hours are defined by two kinds of information: business hours and timezone. Let's see how to set them up using the provided [backoffice](../reference/providers/postgrest.md#access-backoffice).

#### Set up business hours
1. After successful deployment, go to **Configuration** page. Open the **URL** and log in with the **Admin email** and the **Admin password**.

   ::: thumbnail
   ![configuration](/images/guide/use-service/configuration.png)
   :::

2. In backoffice, go to the **hoursProvider** section and click **Hours**. On the **hoursProvider.Hours** page, click **Create**.

   ::: thumbnail
   ![create business hours](/images/guide/use-service/create-business-hours.png)
   :::

3. To add the **main business hours** for a day of the week:
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

4. Follow the same steps to add the remaining 6 days of the week.

5. **_[OPTIONAIL]_** To add business hours for a special date, use the **specialDate** column, which is the date that is not covered in the main business hours.

6. When you finish setting up your business hours, there should be **at least 7 rows** on the **hoursProvider.Hours** page. As the screenshot below shows, the first 7 rows are the main business hours and the last one is for a special date.

   ::: thumbnail
   ![business hours list](/images/guide/use-service/business-hours-list.png)
   :::

#### Set up the business time zone

1. In the **hoursProvider** section and click **Configuration**. On the **hoursProvider.Configuration** page, click **Create**.

2. Enter the time zone of your business. Formatted as an [IANA Time Zone Database](http://www.iana.org/time-zones) name, e.g. "_America/Los_Angeles_".

3. Once done, click **Save**.

   ::: thumbnail
   ![timezone-list](/images/guide/use-service/timezone-list.png)
   :::

## Add functionality to the chatbot
On OpenCUI, importing modules is a way to build complex conversational behavior out of simpler parts. Unlike a cloned project where you can modify any things you want, with an import module, there are only limited things, mostly at the language level, that you can change in order to make module upgradable.

Now it's time to add functionality to the chatbot so that users can access the hours service via conversation. It is simple: just import the module with desired functionality into your chatbot and connect the service to a provider in your organization.

### Import the module
- Enter source module [hours](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema), the one that you want to reuse. You can also go there by doing a search on the explore tab.
- Click **Import**.
- Select the chatbot or module you want to import to.
- Click **Save**.

  ::: thumbnail
  ![import service](/images/guide/use-service/import-service.png)
  :::

### Set up a service provider
- Enter the chatbot.

- In the navigation bar, select the **Settings** tab and head to **Integrations** page. In the **Debug service provider** section, click **Select service** and select `me.quickstart.hours.IHours`. You need to set this up again for production environment under **Deploy service provider** when you are ready for the deployment.
   - Enter a unique label
   - Click **Select service implementation** and select the provider you created by cloning.

   ::: thumbnail
   ![set up provider](/images/guide/use-service/set-up-provider.png)
   :::

## Test a chatbot
Finally, you can try the chatbot for business hours using [Debug](../reference/platform/testing.md#how-to-use).

1. Send "_When do you open?_" and you should get the business hours in a week starting with the current day of the week.

   ::: thumbnail
   ![debug hours week](/images/guide/use-service/debug-hours-week.png)
   :::

2. Send "_Do you open this Friday?_" and if it's open this Friday, you will get the business hours on this Friday. If not, you will be told it's closed and the business hours in a week will be shown.

   ::: thumbnail
   ![debug HoursDay if it's open](/images/guide/use-service/debug-hours-day-open.png)
   *If it's Open this Friday*

   <br>

   ![debug HoursDay if it's closed](/images/guide/use-service/debug-hours-day-closed.png)
   *If it's closed this Friday*
   :::