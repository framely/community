---
article: true
date: 2023-03-03

image:
    - blog/banner/quickstart_with_reservation.png
description:
    - We show you the steps of building a chatbot using a table reservation module
author: Sunny May
---
# Quickstart with Reservation

[[toc]]

## Overview

This guide shows you how to build a table reservation chatbot to help users to make/view/cancel reservations. To build this chatbot, you don't need to design any CUI or develop the backend. All you need to do is to reuse the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/intent). CUI design is already handled by that module and backend development is done in the [Google Calendar reservation provider](../plugins/services/reservation/google-calendar-reservation.md).

The following conversation shows how your chatbot helps the user make a reservation:

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

You can find all the services the table reservation module provides in [reservation CUI design](./build-reservation-module.md#cui-design).

## Before You Start

1. Read [Quickstart with PingPong](../reference/quickstarts/pingpong.md).
2. Read [Provider: Google Calendar](../plugins/services/reservation/google-calendar-reservation.md) and set up Google Workspace and service account.

## Set Up Resources

Before users can book a table, you should prepare your table resources first. A table resource represents a real table in your restaurant, so one table resource can only be booked once at a certain time.

In this guide, we use Google Admin console to store table resources and Google Calendar to store reservations. With reservation API, the chabot can get access to your resources and schedule reservations for users.

To begin with, you need to set up your table resources in two steps:
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
    ![resource management](/images/blog/quickstarts-with-reservation/resource-management.png)
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
    ![add building](/images/blog/quickstarts-with-reservation/add-building.png)
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
    ![add resource](/images/blog/quickstarts-with-reservation/add-resource.png)
    :::

4. Repeat step 3 to add the other two resources and change the value in the **Description** field.
   - Medium table: {"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 4  }
   - Large table: {"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 8  }

Once done, your building and resources should be the same as those in the screenshot below.

::: thumbnail
![resources example](/images/blog/quickstarts-with-reservation/resources-example.png)
:::

### Block Time in Google Calendar

Make sure you are an [admin](https://support.google.com/a/answer/172176?hl=en) first, then sign in to your [Google Calendar](https://calendar.google.com). To block time:

1. On Other calendars, click **+** > **Browse resources** (If there is no such option, you may need to wait for a few hours for ACL changes to take effect before you can manage these resources.)

    ::: thumbnail
    ![browse resources](/images/blog/quickstarts-with-reservation/browse-resources.png)
    :::

2. Tick your table resources.

    ::: thumbnail
    ![tick resources](/images/blog/quickstarts-with-reservation/tick-resources.png)
    :::

3. Back to your calendars, choose one resource calendar, and click **Settings and sharing**.

   ::: thumbnail
   ![click resoure](/images/blog/quickstarts-with-reservation/click-resoure.png)
   :::

4. Make sure the timezone of this resource calendar is correct. 

   ::: thumbnail
   ![check timezone](/images/blog/quickstarts-with-reservation/check-timezone.png)
   :::

5. Repeat steps 3 and 4 to check the timezone of the other two resource calendars.
6. Double click on your primary calendar to add an event. Set this event as follows
   - **Title**: Closed
   - **Time**: `Mar 3, 2023 12:00am` to `11:00am Mar 3, 2023`
   - **Repeat**: Weekly on Sunday, Tuesday, Wednesday, Thursday, Friday, Saturday
   - **Rooms**:
     - (table)-My First Restaurant-1-Large table
     - (table)-My First Restaurant-1-Medium table
     - (table)-My First Restaurant-1-Small table

   ::: thumbnail
   ![add event](/images/blog/quickstarts-with-reservation/add-event.png)
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
![calendar example](/images/blog/quickstarts-with-reservation/calendar-example.png)
:::

## Import Table Reservation Module

Now it's time to create a table reservation chatbot and reuse the table reservation module.

1. Create a chatbot and add the English language.
2. Enter the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/intent)
   - Click **Import**.
   - Select the chatbot you just created.
   - Click **Save**.

   ::: thumbnail
   ![import module](/images/blog/quickstarts-with-reservation/import-module.png)
   :::

## Set Up Reservation Provider

To use the functionality provided by the reservation API, follow these steps to set up the reservation provider:

1. Enter the chatbot you just created.
2. Heading to **Settings** page, in **Integrations** tab
   - Click **Select Service** and select **services.opencui.reservation.IReservation**.
   - Follow [set up Google calendar reservation provider](../plugins/services/reservation/google-calendar-reservation.md#set-up-google-calendar-reservation-provider) to complete this integration.

   ::: thumbnail
   ![set up provider](/images/blog/quickstarts-with-reservation/set-up-provider.png)
   :::

## Test Chatbot

Finally, you can try to use your chatbot to make a table reservation. To test the chatbot:

1. Click **Commit** on both **SRUCT** side and **EN** side.
2. On **EN** side, click **Debug** > **Connect**.
3. When it's connected, you can send "_I want to book a table_" to start making a reservation. Then provide the number of guests, date and time. If there is an available table, you can book it successfully. For example:

   ::: thumbnail
   ![example conversation](/images/blog/quickstarts-with-reservation/example-conversation.png)
   :::

4. Once you've made a reservation, you can go to your Google Calendar and check that reservation. Here is the reservation made by the above example:

   ::: thumbnail
   ![example reservation](/images/blog/quickstarts-with-reservation/example-reservation.png)
   :::

::tada:: Well done! You've built up a table reservation chatbot. To explore more use cases, you can check the test cases in the [tableReservationApp](https://build.opencui.io/org/me.restaurant/agent/tableReservationApp/en/test_case) chatbot.










