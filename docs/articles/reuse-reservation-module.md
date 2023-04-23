---
article: true
date: 2023-04-02

image:
    - blog/banner/tutorial_reservation_chatbot.png
description:
    - Reuse table reservation module to build a chatbot
author: Sunny May
---

# How to reuse reservation module to build chatbot
This guide shows you how to build a table reservation chatbot by reusing a module. A module is a reusable CUI (Conversational User Interface) unit whose conversational behavior is defined against some service APIs. There are two kinds of module, base module, which come with their own service APIs, and composite modules, which need to import other modules to deliver a complex conversational experience.
Notice that a base module can have one or more providers that provide the implementations of the service APIs defined in that module.

By importing the right module, you can quickly add new functionality to your chatbot. In this guide, we demonstrate how you can add table reservation to your restaurant chatbot using the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/intent). The table reservation module relies on a base module called the [reservation API](../reference/plugins/services/reservation/reservation-api.md), which currently has a [Google Calendar based provider](../reference/plugins/services/reservation/google-calendar-reservation.md). 

The resulting chatbot can help users make, view, and cancel table reservations. Here is an example dialogue to show how the chatbot works:

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

It only takes a few steps to add table reservation functionality to a chatbot:

1. **Set up** resources in Google platform (where "resource" refers to the booked table).
2. **Import** a table reservation module to your chatbot. 
3. **Set up** the provider in your chatbot to access to your resources.

## Before you start
1. [Sign up](./signingup.md#sign-up) for an account and log in to [OpenCUI](https://build.opencui.io/login).
2. We assume that you are already familiar with the procedures on the platform. If not, we recommend that you read the [Quickstart guide](../guide/README.md) first.
3. Set up [Google Workspace](../reference/plugins/services/reservation/google-calendar-reservation.md#set-up-google-workspace) and [service account](../reference/plugins/services/reservation/google-calendar-reservation.md#set-up-service-account).

## Set up resources
Under the design of reservation API, resources are the entities that users can book or reserve, such as tables in a restaurant or appointments with a hairdresser. Before users can book a table, you need to prepare your table resources first. Different providers have different ways of defining what resources are available for booking. Since we are using [Google Calendar based provider](../reference/plugins/services/reservation/google-calendar-reservation.md), we will use Google Admin console to define table resources and Google Calendar to store reservations.

To set up your table resources, follow these two steps:

1. In the **Google Admin console**, add buildings and resources to make them available for users to book when making reservations through the chatbot.
2. In the **Google Calendar**, set your business hours by adding block time when users cannot book tables (e.g., when you are not open).

We will use the following business information as an example to show you how to set up your resources.

1. **Restaurant name**: My First Restaurant
2. **Timezone**: America/Los_Angeles
3. **Business hours**
   - Monday: Closed
   - Tuesday to Sunday: 11:00 AM - 10:00 PM
4. **Bookable resources**

| Resource name | Resource type | Capacity  | Duration |
|:--------------|:--------------|:----------|:---------|
| Small table   | table         | 2 guests  | 2 hours  |
| Medium table  | table         | 4 guests  | 2 hours  |
| Large table   | table         | 8 guests  | 2 hours  |


### Add resources in Admin console
In order to add resources, it is important to specify the building they belong to. Once a building has been added, you can go ahead and add the desired resources.

Before you start, make sure you sign in to your [Google Admin console](https://admin.google.com/).

#### Add a building
1. To go the Buildings section: 
   1. From the **Main Menu** in the Google Admin console, select **Directory** > **Buildings and resources** > **Manage resources**.
   2. Click **ADD BUILDING**.
   ::: thumbnail
   ![resource management](/images/blog/tutorial-reuse-reservation/resource-management.png)
   :::

2. To add a building:
   1. In the Buildings section, click **Add building**.
   2. Fill in the form with the following information:
       - **Id**: 1
       - **Name**: My First Restaurant
       - **Description**: `{"timezone": "America/Los_Angeles"}`
       - **Floors**: 1
   3. Click **ADD BUILDING**.
   4. Switch back to **Resources**.
   ::: thumbnail
   ![add building](/images/blog/tutorial-reuse-reservation/add-building.png)
   :::

#### Add resources
1. To add the first resource in the [business information](#set-up-resources) :
   1. In the Resources section, click **Add new resource**.
   2. Fill in the form with the following information:
       - **Category**: Other resource
       - **Type**: table
       - **Building**: My First Restaurant
       - **Resource name**: Small table
       - **Description (internal)**: `{"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 2}`
   3. Click **ADD RESOURCE**.
   ::: thumbnail
   ![add resource](/images/blog/tutorial-reuse-reservation/add-resource.png)
   :::

2. To add the other two resources, repeat the same steps but change each value in the **Description** field.
   - For the medium table: `{"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 4}`
   - For the large table: `{"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 8}`

After completing these steps, your building and resources should look like the screenshot below.
::: thumbnail
![resources example](/images/blog/tutorial-reuse-reservation/resources-example.png)
:::

### Block time in Google Calendar
In order to avoid users making reservations when the restaurant is closed, you should block off any times outside of its opening hours. To do this, follow these three steps, using the business hours mentioned in the [business information](#set-up-resources) as an example:

1. Add events in your primary calendar to block time.
2. Add resource calendars to your calendar so you can manage events in those calendars.
3. Respond to event invitations in thos calendars to confirm that the time slots are blocked off.

Before you start, make sure you are an [admin](https://support.google.com/a/answer/172176?hl=en) first, then sign in to your [Google Calendar](https://calendar.google.com).

#### Add events to block time
1. In your primary calendar, double-click the schedule.
2. Specify the event details below and click **Save**:
   - **Title**: Closed
   - **Time**: `12:00am` to `11:00am` (Select appropriate start and end dates based on the current date.)
   - **Repeat**: Weekly on Sunday, Tuesday, Wednesday, Thursday, Friday, Saturday
   - **Rooms**:
     - (table)-My First Restaurant-1-Large table
     - (table)-My First Restaurant-1-Medium table
     - (table)-My First Restaurant-1-Small table

   ::: thumbnail
   ![add event](/images/blog/tutorial-reuse-reservation/add-event.png)
   :::

3. Repeat step 6 to create additional events with the following details, then adjust the **time** and **Repeat** fields as needed:
   - Event 2
       - **Time**: `10:00pm` to `11:59am` (Select appropriate start and end dates based on the current date.)
       - **Repeat**: Weekly on Sunday, Tuesday, Wednesday, Thursday, Friday, Saturday
   - Event 3
       - **Time**: Select appropriate start and end dates based on the current date. (e.g., `Mar 6, 2023` to `Mar 6, 2023`)
       - **Repeat**: Weekly on Monday

#### Add resources calendar
1. On Other calendars, click **+** > **Browse resources**. If you don't see this option, wait a few hours for ACL changes to take effect before managing resources.
   ::: thumbnail
   ![browse resources](/images/blog/tutorial-reuse-reservation/browse-resources.png)
   :::

2. Tick the table resources you need.
   ::: thumbnail
   ![tick resources](/images/blog/tutorial-reuse-reservation/tick-resources.png)
   :::

3. Back to your calendars, choose one resource calendar, and click **Settings and sharing**.
   ::: thumbnail
   ![click resoure](/images/blog/tutorial-reuse-reservation/click-resoure.png)
   :::

4. Ensure the resource calendar's timezone matches its location to avoid scheduling errors.
   ::: thumbnail
   ![check timezone](/images/blog/tutorial-reuse-reservation/check-timezone.png)
   :::

5. Repeat steps 3-4 to check the timezone of the other two resource calendars.

#### Respond to event invitations
1. Open each resource calendar and locate the three events that you added.
2. At the bottom of each event, select **Yes** as a response for all recurring events.

After completing these steps, your resource calendars should resemble the example below.
::: thumbnail
![calendar example](/images/blog/tutorial-reuse-reservation/calendar-example.png)
:::

## Import the module
Now it's time to create a table reservation chatbot and reuse the table reservation module.

1. Create a chatbot and add the **English(en)** language.
2. [Import](../reference/platform/reusability.md#import-1) the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/intent) into your chatbot.

## Wire the provider
Before you can use the functionality provided by the reservation API, you should declare a reservation service first, then wire the reservation provider to the service.

To wire the reservation provider:

1. Enter the chatbot you just created.
2. In the navigation bar, select the **Settings** tab and head to **Integrations** page. In the **Debug service provider** section:
   - Click **Select service** and select `services.opencui.reservation.IReservation`.
   - Follow [set up Google calendar reservation provider](../reference/plugins/services/reservation/google-calendar-reservation.md#set-up-google-calendar-reservation-provider) to complete this integration.

## Test a chatbot

Finally, you can try to use your chatbot to make a table reservation. To test the chatbot:

1. Use [Debug](../reference/platform/testing.md#debug) to send "_I want to book a table_" to start making a reservation. Then provide the number of guests, date and time. If there is an available table, you can book it successfully. For example:

   ::: thumbnail
   ![example conversation](/images/blog/tutorial-reuse-reservation/example-conversation.png)
   :::

2. Once you've made a reservation, you can go to your Google Calendar and check that reservation. Here is the reservation made by the above example:

   ::: thumbnail
   ![example reservation](/images/blog/tutorial-reuse-reservation/example-reservation.png)
   :::

The picture below shows how the reservation is made. 
::: thumbnail
![message process](/images/blog/tutorial-reuse-reservation/message-process.png)
:::

::tada:: Well done! You've built up a table reservation chatbot. To explore more use cases, you can check the [Test cases](../reference/platform/testing.md#test-cases) in the [tableReservationApp](https://build.opencui.io/org/me.restaurant/agent/tableReservationApp/en/type?page=0&imported=false&search=&category=ALL) chatbot.
