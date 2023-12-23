---
article: true
date: 2023-04-02

image:
    - blog/banner/tutorial_reservation_chatbot.png
description:
    - Reuse table reservation module to build a chatbot
author: Sunny May
---

# Reuse table reservation module to build chatbot

<!--这篇文章主要写如何 reuse reservation module，应当和 reuse module 有所区分，因此：
1. 不需要赘述 reuse module 中的内容，如果需要读者具有相应 backgroud 应直接指向该文档；
2. 需要讲述和 reuse module 不同的地方，或者那篇文档里没有讲，在这里需要读者了解的信息；现在的介绍包括一部分 bg 但实际又不全面，影响理解；
3. 如果读者真的不想了解，也应当可以读下来，而不是被前置的不完整信息卡住；（因为本质上 reuse 了，就不需要关注 bg，可以直接照着做）
4. Dependency 的关系要讲明。
5. 像“Service can have one or more backend implementations, each can be accessed via its corresponding provider.”是指 platform 的机制，应该是在 background 里。并不是指在这里，builder reuse 之后可以在 chatbot 为 reservation interface 配置多个 backend。
-->

<!-- 这里是被注掉的原文
This guide shows you how to add a table reservation functionality to your chatbot by reusing a module. A module is a reusable conversational user interface(CUI) component whose conversational behavior is defined on top of some service APIs. Service can have one or more backend implementations, each can be accessed via its corresponding provider.

Modules can be composed into bigger ones to provide more comprehensive conversational experience. By importing the right module into your chatbot, you can quickly add new conversational functionality. 
-->

OpenCUI provides a mechanism for builders to share modules with each other. This means that you can take advantage of the expertise of others, which can save time and effort in building new chatbots.

Modules are reusable and composable, and can be enabled or disabled service as needed. In some cases, it may be possible to reuse one or more modules within a chatbot. However, when doing this, it is important to ensure that the modules are compatible with each other and the corresponding implementations of service interfaces are also wired. This will ensure that the module works as expected in the chatbot.

To use a pre-existing module, you first need to find a module that you are interested in. Then, you can simply import it into your chatbot, and use the functionality of the module directly in your chatbot. Modules are developed and maintained by other builders, so you can be confident that they are of high quality. You can also update modules as needed, which ensures that your chatbot always has the latest features and functionality. For more background and details about modules, see "[Reuse an hours module](../reference/guide/reuse-component.md)".

This guide will use table reservation as an example to show how to reuse the [tableReservation](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/type) module in your chatbot. When you are done with this guide, the chatbot can help users make, view, and cancel table reservations. For example, a user might say the following to the chatbot:

``` json
User: "Hi, I'd like to reserve a table, please."
Chatbot: "How many people will you need the reservation for?"
User: "There will be two of us."
Chatbot: "Which day will you be joining us on?"
User: "This Sunday."
Chatbot: "What time would you like the reservation for?"
User: "About 3pm."
Chatbot: "Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?"
User: "Yes."
Chatbot: "Your reservation has been made. We'll see you at 3:00 PM on Sunday, December 25, 2022. You can check the reservation under your ID: xxxx."
```

To reuse the `tableReservation` module, you need to understand the following dependencies: 
1. [Table reservation CUI design](reservation-cui-design.md): This is is the blueprint for the user experience and service scope of the table reservation module.
2. [Reservation API](./reservation/reservation-api.md): This is the API that the module relies on.
3. [Google Calendar provider](./reservation/google-calendar-reservation.md): This is the backend that the chatbot uses to store reservations. It means that you need a Google Workspace account.

## Before you start
1. Log in to [OpenCUI](https://build.opencui.io/login).
2. Follow the [quickstart guide](../reference/guide/index) to learn the basics of OpenCUI.
3. Set up [Google Workspace](./reservation/google-calendar-reservation#set-up-google-workspace) and [service account](./reservation/google-calendar-reservation#set-up-service-account).

## Set up Google Calendar
Under the design of the reservation API, resources are the entities that users can book, reserve or make appointment, such as tables in a restaurant or hairdressers. Resources are always associated with a specific location, and before users can book a resource, you need to first prepare the business-specific locations and resources in the backend. Different backends may have different ways of defining which resources are available for booking. [Google Calendar based backend](./reservation/google-calendar-reservation) use Google Admin console to define table resources and Google Calendar to store reservations.

To set up your table resources:
1. In the **Google Admin console**, add buildings as locations first and then add resources for each location to make them available for users to book.
2. In the **Google Calendar**, set your business hours, including blocking off times when users cannot book tables (e.g., when you are closed)."

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
To add resources, it is important to specify the location, or building in Google Calendar, they belong to. Once you have added a building, you can then add the desired resources.
Before you start, make sure you sign in to your [Google Admin console](https://admin.google.com/).

#### Add a building
1. To go the Buildings section: 
   1. From the **Main Menu** in the Google Admin console, select **Directory** > **Buildings and resources** > **Manage resources**.
   2. Click **ADD BUILDING**.
   
   ![resource management](/images/blog/tutorial-reuse-reservation/resource-management.png)

2. To add a building:
   1. In the Buildings section, click **Add building**.
   2. Fill in the form with the following information and add:
       - **Id**: 1
       - **Name**: My First Restaurant
       - **Description**: `{"timezone": "America/Los_Angeles"}`
       - **Floors**: 1
   3. Click **ADD BUILDING**.
   4. Switch back to **Resources**.

   ![add building](/images/blog/tutorial-reuse-reservation/add-building.png)

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

   ![add resource](/images/blog/tutorial-reuse-reservation/add-resource.png)

2. To add the other two resources, repeat the same steps but change each value in the **Description** field.
   - For the medium table: `{"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 4}`
   - For the large table: `{"@class":"me.restaurant.tableReservation.Table", "durations": [3600], "capacity": 8}`

After completing these steps, your building and resources should look like the screenshot below.

![resources example](/images/blog/tutorial-reuse-reservation/resources-example.png)

### Block time in Google Calendar
In order to prevent users making reservations when the restaurant is closed, you should block off any times outside of its opening hours. To do this:

[//]:<>(should we explain what is the primary calendar and resource calendar so that they know their way around?)
1. Add events in your primary calendar to block time.
2. Add resource calendars to your calendar so you can manage events in those calendars.
3. Respond to event invitations in those calendars to confirm that the time slots are blocked off.

[//]:<>(Should we make this a tip)
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

   ![add event](/images/blog/tutorial-reuse-reservation/add-event.png)

[//]:<>(step 6?)
3. Repeat step 6 to create additional events with the following details, then adjust the **time** and **Repeat** fields as needed:
   - Event 2
       - **Time**: `10:00pm` to `11:59am` (Select appropriate start and end dates based on the current date.)
       - **Repeat**: Weekly on Sunday, Tuesday, Wednesday, Thursday, Friday, Saturday
   - Event 3
       - **Time**: Select appropriate start and end dates based on the current date. (e.g., `Mar 6, 2023` to `Mar 6, 2023`)
       - **Repeat**: Weekly on Monday

#### Add resources calendar
1. On Other calendars, click **+** > **Browse resources**. If you don't see this option, wait a few hours for ACL changes to take effect before managing resources.

   ![browse resources](/images/blog/tutorial-reuse-reservation/browse-resources.png)

2. Tick the table resources you need.

   ![tick resources](/images/blog/tutorial-reuse-reservation/tick-resources.png)

3. Back to your calendars, choose one resource calendar, and click **Settings and sharing**.

   ![click resoure](/images/blog/tutorial-reuse-reservation/click-resoure.png)

4. Ensure the resource calendar's timezone matches its location to avoid scheduling errors.

   ![check timezone](/images/blog/tutorial-reuse-reservation/check-timezone.png)

5. Repeat steps 3-4 to check the timezone of the other two resource calendars.

#### Respond to event invitations
1. Open each resource calendar and locate the three events that you added.
2. At the bottom of each event, select **Yes** as a response for all recurring events.

After completing these steps, your resource calendars should resemble the example below.

![calendar example](/images/blog/tutorial-reuse-reservation/calendar-example.png)


## Reuse tableReservation module

### Import the module
Now it's time to create a table reservation chatbot and reuse the table reservation module.

1. Create a chatbot and add the **English(en)** language.
2. [Import](../reference/platform/reusability.md#import-1) the [table reservation module](https://build.opencui.io/org/me.restaurant/agent/tableReservation/struct/type) into your chatbot.

### Wire the provider
Before you can use the functionality provided by the reservation API, you should declare a reservation service first, then wire the reservation provider to the service.

To wire the reservation provider:

1. Enter the chatbot you just created.
2. In the navigation bar, select the **Settings** tab and head to **Integrations** page. In the **Debug service provider** section:
   - Click **Select service** and select `services.opencui.reservation.IReservation`.
   - Follow [set up Google calendar reservation provider](./reservation/google-calendar-reservation.md#set-up-google-calendar-reservation-provider) to complete this integration.

## Test the chatbot

Finally, you can try to use your chatbot to make a table reservation. To test the chatbot:

1. Use [Debug](../reference/platform/testing.md#debug) to send "_I want to book a table_" to start making a reservation. Then provide the number of guests, date and time. If there is an available table, you can book it successfully. For example:

   ![example conversation](/images/blog/tutorial-reuse-reservation/example-conversation.png)

2. Once you've made a reservation, you can go to your Google Calendar and check that reservation. Here is the reservation made by the above example:

   ![example reservation](/images/blog/tutorial-reuse-reservation/example-reservation.png)


The picture below shows how the reservation is made.

![message process](/images/blog/tutorial-reuse-reservation/message-process.png)


::tada:: Well done! You've built a table reservation chatbot. To explore more use cases, you can check the [Test cases](../reference/platform/testing.md#test-cases) in the [tableReservationApp](https://build.opencui.io/org/me.restaurant/agent/tableReservationApp/en/type?page=0&imported=false&search=&category=ALL) chatbot.
