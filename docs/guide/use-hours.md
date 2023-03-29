# Reuse a module
 Modern business applications are typically broken down into a set of services, each responsible for a specific capability. A service can be developed, deployed and maintained independently of each other, but can be accessed and used by other parts of the application, or even by external systems. So it should be no surprise that all user interfacing application are built to expose service, chatbot included.

On OpenCUI, a service is simply a set of function declarations that frontend can use to interact with product system. Each service needs to be declared in a module, which also typically hosts the conversational user interface for that service. Service can have one or more implementation called provider. When a service is used in a chatbot, a compatible provider needs to be wired to the service. 

Instead of building from scratch, you import some prebuilt module to get the same functionality, which will reduce the cost and improve the conversational experience at the same time. To reuse a module in a chatbot, you need to first prepare the provider needed by that module in your org. There are two kind of providers, OpenCUI hosted providers and external providers. For the hosted provider, you also need to deploy it before it can be wired to module. Assuming the backend is based on database, you need to set up the tables, and populate these tables with into the database and API function can access the right tables. After you imported the module into your chatbot, you also need to wire it up with the service declared in the module.

This guide shows you how to reuse an existing module to answers users' questions about your business hours. The module we will be import is [hours service](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema), which defines a simple services that can serve users' request on business hours in your chatbot. The provider we used for this service is Postgrest based. This provider is based on PostgreSQL, it comes with an admin interface called [backoffice](../reference/providers/postgrest.md#access-backoffice) that allow admin to populate the tables. With this provider, you can set the main business hours for each day of the week, as well as set hours for special days, like holidays.

Here is an example dialogue that shows how this chatbot helps users to get business hours:

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

In addition to displaying the business hours in a week, this chatbot can also show the specific business hours of a particular day, like:

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
Before the chatbot can serve the business hours requests, you need to make its provider ready. In this guide, we clone a Postgrest based provider into your organization, and populate the tables with your business data.

### Clone the provider
Postgrest provider are the OpenCUI hosted provider, so you introduce no external dependency thus make the deployment of chatbot easier. Instead of building this provider from scratch, let's clone this to save effort.

1. Clone the [hoursProvider](https://build.opencui.io/org/me.quickstart/agent/hoursProvider/struct/service_schema) project and change the **Project label** to _hoursProvider_.

2. In the cloned project, go to **Versions** page and click **Pull request** in the upper-right corner of the Versions area.

   ::: thumbnail
   ![pull request](/images/guide/use-service/pull-request.png)
   :::

3. Click on the request you just pulled, and **Compare diffs** field will slide out.

   ::: thumbnail
   ![click request](/images/guide/use-service/click-request.png)
   :::

4. In the **Compare diffs** drawer, click **Approve PR**, then click **Merge**. 

   ::: thumbnail
   ![click approve pr](/images/guide/use-service/click-approve.png)
   :::

5. Enter the **Version tag** and click **Save**.

   ::: thumbnail
   ![version tag](/images/guide/use-service/version-tag.png)
   :::

6. Click **Deploy** in the upper-right corner of the Versions area.

   ::: thumbnail
   ![deploy](/images/guide/use-service/deploy.png)
   :::

### Populate tables with business data 
**To set up business hours:**
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

**To set up the business time zone:**

1. In the **hoursProvider** section and click **Configuration**. On the **hoursProvider.Configuration** page, click **Create**.

2. Enter the time zone of your business. Formatted as an [IANA Time Zone Database](http://www.iana.org/time-zones) name, e.g. "_America/Los_Angeles_".

3. Once done, click **Save**.

   ::: thumbnail
   ![timezone-list](/images/guide/use-service/timezone-list.png)
   :::

## Reuse the module

Now it's time to create a chatbot and use the hours service. To use a service, you need to import it into your chatbot and set up a service provider for that service.

### Import the module
All projects can be cloned to a new organization, a module can also be imported into a new project, like chatbot, or module. 
1. First make sure you have a target project to import the module to. You can use an existing one, or create a new one. We will clone into chatbot instead of module, as the goal here is to showcase how chatbot can reuse the conversational services defined on the module. 

2. Enter the source module: [hours](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema), you can also go in there by doing a search on the explore tab.
   - Click **Import**.
   - Select the chatbot you want to import to.
   - Click **Save**.

   ::: thumbnail
   ![import service](/images/guide/use-service/import-service.png)
   :::

### Set up a service provider
1. Enter the chatbot.

2. In the navigation bar, select the **Settings** tab and head to **Integrations** page. In the **Debug service provider** section, click **Select service** and select `me.quickstart.hours.IHours`.
   - Enter a unique label
   - Click **Select service implementation** and select the provider you created by cloning.

   ::: thumbnail
   ![set up provider](/images/guide/use-service/set-up-provider.png)
   :::


## Test a chatbot

Finally, you can try to ask the chatbot for business hours. To play with the chatbot, use [Debug](../reference/platform/testing.md#how-to-use).

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