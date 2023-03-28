# Use a service

[[toc]]

## Overview

This guide shows you how to use a service to build a chatbot that answers users' questions about your business hours. A service is a set of interfaces that can be used to access business functionalities. A module with service can handle both service and CUI parts for you.

Importing the module with [hours service](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema) lets you be able to access pre-built functionalities about business hours. With the help of [backoffice](../reference/providers/postgrest.md#access-backoffice), you can manage your business hours dynamically. Not only can you set the main business hours for each day of the week, but also add hours for special days, like holidays.


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

## Set up business hours

Before the chatbot can display your business hours, you should set them up in the backoffice first along with the time zone of your business.

**To set up business hours:**

1. [Clone](../reference/platform/reusability.md#clone-1) the [hoursProvider](https://build.opencui.io/org/me.quickstart/agent/hoursProvider/struct/service_schema) project and change the **Project label** to _hoursProvider_.

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

7. After successful deployment, go to **Configuration** page. Open the **URL** and log in with the **Admin email** and the **Admin password**.

   ::: thumbnail
   ![configuration](/images/guide/use-service/configuration.png)
   :::

8. In backoffice, go to the **hoursProvider** section and click **Hours**. On the **hoursProvider.Hours** page, click **Create**.

   ::: thumbnail
   ![create business hours](/images/guide/use-service/create-business-hours.png)
   :::

9. To add the **main business hours** for a day of the week:
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

10. Follow the same steps to add the remaining 6 days of the week.

11. **_[OPTIONAIL]_** To add business hours for a special date, use the **specialDate** column, which is the date that is not covered in the main business hours.

12. When you finish setting up your business hours, there should be **at least 7 rows** on the **hoursProvider.Hours** page. As the screenshot below shows, the first 7 rows are the main business hours and the last one is for a special date.

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


## Use hours service

Now it's time to create a chatbot and use the hours service. To use a service, you need to import it into your chatbot and set up a service provider for that service.

**To import the service:**

1. Create a chatbot and add the English language.
2. Enter the [hours service](https://build.opencui.io/org/me.quickstart/agent/hours/struct/service_schema)
   - Click **Import**.
   - Select the chatbot you just created.
   - Click **Save**.

   ::: thumbnail
   ![import service](/images/guide/use-service/import-service.png)
   :::

**To set up a service provider:**
1. Enter the chatbot you just created.

2. In the navigation bar, select the **Settings** tab and head to **Integrations** page. In the **Debug service provider** section, click **Select service** and select `me.quickstart.hours.IHours`.
   - Enter a unique label
   - Click **Select service implementation** and select the provider you created by cloning.

   ::: thumbnail
   ![set up provider](/images/guide/use-service/set-up-provider.png)
   :::


## Test chatbot

Finally, you can try to ask the chatbot for business hours. To test the chatbot, use [Debug](../reference/platform/testing.md#how-to-use).

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