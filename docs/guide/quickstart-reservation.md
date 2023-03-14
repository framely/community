# Table Reservation

[[toc]]

## Overview

This guide shows you how to reuse a module to build a table reservation chatbot. A module is a reusable CUI unit with its conversational behavior defined against some service APIs. There are two kinds of module, base module come with its own service APIs, while composite module need to import other modules to deliver some complex conversational experience.
Notice a base module can have one or more provider that provide the implementations of the service APIs defined in that module.

Import right module allow you to add new functionality to your chatbot quickly. In this guide, we demonstrate how can you add [table reservation](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/intent) to your restaurant chatbot. The table reservation module relies on a base module [reservation API](../reference/plugins/services/reservation/reservation-api.md) that currently has a [Google Calendar based provider](../reference/plugins/services/reservation/google-calendar-reservation.md). 

The resulting chatbot can help users to make/view/cancel table reservations, here is an example dialogue:

:::: conversation

::: user User
Hi, I'd like to reserve a table, please.
:::

::: bot Bot
How many people will you need the reservation for?
:::

::: user User
There will be two of us.
:::

::: bot Bot
Which day will you be joining us on?
:::

::: user User
This Sunday.
:::

::: bot Bot
What time would you like the reservation for?
:::

::: user User
About 3pm.
:::

::: bot Bot
Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?
:::

::: user User
Yes.
:::

::: bot Bot
Your reservation has been made. We'll see you at 3:00 PM on Sunday, December 25, 2022. You can check the reservation under your ID: xxxx.
:::

::::

The detailed CUI design for table reservation can be found [here](../articles/build-reservation-module.md#cui-design).


It only takes few steps to add a table reservation functionality to a chatbot:
1. **Set up** resources in Google platform. Here resource is the booked table.
2. **Import** a table reservation module to your chatbot. 
3. **Set up** the provider in your chatbot to access to your resources.

## Before You Start

1. [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
2. Set up [Google Workspace](../reference/plugins/services/reservation/google-calendar-reservation.md#set-up-google-workspace) and [service account](../reference/plugins/services/reservation/google-calendar-reservation.md#set-up-service-account).

## Set Up Resources
Under the design of reservation API, the resource are the entity that user can book or reserve, such as table in restaurant or hairdresser. Before users can book a table, you should prepare your table resources first. Different provider has different way of define what resources are available for booking. Since we are use [Google calendar based provider](../reference/plugins/services/reservation/google-calendar-reservation.md), we use Google Admin console to define table resources and Google Calendar to store reservations.


You can set up your table resources in two steps:
1. In the Admin console, add your buildings and resources.
2. In the Google Calendar, set the business hours by adding block time, so users can't book tables when you are not open.

We take the following business information as an example to show you how to set up your resources.
1. **Restaurant name**: My First Restaurant
2. **Timezone**: America/Los_Angeles
3. **Business hours**
   - Monday: not open
   - Tuesday - Sunday: 11:00 AM - 10:00 PM
4. **Bookable resources**

| Resource Name | Resource Type | Capacity  | Duration |
|:--------------|:--------------|:----------|:---------|
| Small table   | table         | 2 guests  | 2 hours  |
| Medium table  | table         | 4 guests  | 2 hours  |
| Large table   | table         | 8 guests  | 2 hours  |


### Add Resources in Admin Console

Sign in to your [Google Admin console](https://admin.google.com/). To add resources:

1. Open the **Main menu**
   - Click **Directory** > **Buildings and resources** > **Manage resources**.
   - Click **ADD BUILDING**.

    ::: thumbnail
    ![resource management](/images/guide/reuse-module/resource-management.png)
    :::

2. In the Buildings section
   - Click **Add building**.
   - Fill in the form with the following information:
       - **Id**: 1
       - **Name**: My First Restaurant
       - **Description**: {"timezone": "America/Los_Angeles"}
       - **Floors**: 1
   - Click **ADD BUILDING**.
   - Switch back to **Resources**.

    ::: thumbnail
    ![add building](/images/guide/reuse-module/add-building.png)
    :::

3. In the Resources section
   - Click **Add new resource**.
   - Fill in the form with the following information:
       - **Category**: Other resource
       - **Type**: table
       - **Building**: My First Restaurant
       - **Resource name**: Small table
       - **Description (internal)**: {"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 2  }
   - Click **ADD RESOURCE**.

    ::: thumbnail
    ![add resource](/images/guide/reuse-module/add-resource.png)
    :::

4. Repeat step 3 to add the other two resources and change the value in the **Description** field.
   - Medium table: {"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 4  }
   - Large table: {"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 8  }

Once done, your building and resources should be the same as those in the screenshot below.

::: thumbnail
![resources example](/images/guide/reuse-module/resources-example.png)
:::

### Block Time in Google Calendar

Make sure you are an [admin](https://support.google.com/a/answer/172176?hl=en) first, then sign in to your [Google Calendar](https://calendar.google.com). To block time:

1. On Other calendars, click **+** > **Browse resources** (If there is no such option, you may need to wait for a few hours for ACL changes to take effect before you can manage these resources.)

    ::: thumbnail
    ![browse resources](/images/guide/reuse-module/browse-resources.png)
    :::

2. Tick your table resources.

    ::: thumbnail
    ![tick resources](/images/guide/reuse-module/tick-resources.png)
    :::

3. Back to your calendars, choose one resource calendar, and click **Settings and sharing**.

   ::: thumbnail
   ![click resoure](/images/guide/reuse-module/click-resoure.png)
   :::

4. Make sure the timezone of this resource calendar is correct. 

   ::: thumbnail
   ![check timezone](/images/guide/reuse-module/check-timezone.png)
   :::

5. Repeat steps 3 and 4 to check the timezone of the other two resource calendars.
6. Double click on your primary calendar to add an event. Set this event as follows:
   - **Title**: Closed
   - **Time**: `Mar 3, 2023 12:00am` to `11:00am Mar 3, 2023`
   - **Repeat**: Weekly on Sunday, Tuesday, Wednesday, Thursday, Friday, Saturday
   - **Rooms**:
     - (table)-My First Restaurant-1-Large table
     - (table)-My First Restaurant-1-Medium table
     - (table)-My First Restaurant-1-Small table

   ::: thumbnail
   ![add event](/images/guide/reuse-module/add-event.png)
   :::

7. Repeat step 6 to add the other events and change the **time** and **Repeat** fields for each event.
   - Event 2
       - **Time**: `Mar 3, 2023 10:00pm` to `11:59am Mar 3, 2023`
       - **Repeat**: Weekly on Sunday, Tuesday, Wednesday, Thursday, Friday, Saturday
   - Event 3
       - **Time**: `Mar 6, 2023` to `Mar 6, 2023`
       - **Repeat**: Weekly on Monday

Once done, the events in your resource calendars should be the same as those in the screenshot below.

::: thumbnail
![calendar example](/images/guide/reuse-module/calendar-example.png)
:::

## Import Table Reservation Module

Now it's time to create a table reservation chatbot and reuse the table reservation module.

1. [Create a chatbot](./pingpong.md#create-chatbot) and add the English language.
2. Enter the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/intent)
    - Click **Import**.
    - Select the chatbot you just created.
    - Click **Save**.

   ::: thumbnail
   ![import module](/images/guide/reuse-module/import-module.png)
   :::
## Set Up Reservation Provider

Before you can use the functionality provided by the reservation API, you should declare a reservation service first, then set up the reservation provider for that service.

To set up the reservation provider:

1. Enter the chatbot you just created.
2. Heading to **Settings** page, in **Integrations** tab
   - Click **Select Service** and select **services.opencui.reservation.IReservation**.
   - Follow [set up Google calendar reservation provider](../reference/plugins/services/reservation/google-calendar-reservation.md#set-up-google-calendar-reservation-provider) to complete this integration.

   ::: thumbnail
   ![set up provider](/images/guide/reuse-module/set-up-provider.png)
   :::

## Test Chatbot

Finally, you can try to use your chatbot to make a table reservation. To test the chatbot:

1. Use [Debug](../reference/platform/testing.md#debug) to send "_I want to book a table_" to start making a reservation. Then provide the number of guests, date and time. If there is an available table, you can book it successfully. For example:

   ::: thumbnail
   ![example conversation](/images/guide/reuse-module/example-conversation.png)
   :::

2. Once you've made a reservation, you can go to your Google Calendar and check that reservation. Here is the reservation made by the above example:

   ::: thumbnail
   ![example reservation](/images/guide/reuse-module/example-reservation.png)
   :::

The picture below shows how the reservation is made. 
::: thumbnail
![message process](/images/guide/reuse-module/message-process.png)
:::


::tada:: Well done! You've built up a table reservation chatbot. To explore more use cases, you can check the test cases in the [tableReservationApp](https://build.opencui.io/org/me.restaurant/agent/tableReservationApp/en/test_case) chatbot.