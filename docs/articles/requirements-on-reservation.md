---
article: true
date: 2022-12-21

image:
    - blog/banner/tutorial_reservation_i.png
description:
    - We list basic services a reservation chatbot should support
author: Sunny May
---

# Requirements for Table Reservation

In this article, we document high level design and requirements for conversational user interface on table reservation bot, so you get some idea on what the bot should behave conversationally. Here are the list of service we want to provide:

[[toc]]

There are some assumptions applied to all these services:
1. The bot can get the id of the user without asking.
2. A valid reservation means it is not expired and hasn't been canceled.

## Make a Reservation

The schema representation of the service can be sketched as follows:

Service: Make a reservation                                                                                            
Slots:
1. `userId` with type **String** 
2. `date` with type **LocalDate** 
3. `time` with type **LocalTime**  
4. `table type` with type **TableType** entity (e.g., _small_, _medium_, _large_)

The conversational behavior of the bot for this service can be described in the following contextual snippets: 

### Happy Path
1. Description: the user provides valid values and the reservation is made successfully.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to make a reservation.
:::

::: bot Bot
Which day would you like to book?
1. Wednesday, December 21, 2022
2. Thursday, December 22, 2022
3. Friday, December 23, 2022
:::

::: user User
This Sunday.
:::

::: bot Bot
What time would you like to book?
1. 9:00 AM - 12:00 PM
2. 1:00 PM - 9:00 PM
:::

::: user User
5:00 pm.
:::

::: bot Bot
Which table would you like to book?
1. Small table (1 - 4 People)
2. Medium table (4 - 6 People) 
3. Large table (6 - 10 People)
:::

::: user User
Small table, please.
:::

::: bot Bot
Are you sure to book a small table at 5:00 PM for Sunday, December 25, 2022?
:::

::: user User
Yes.
:::

::: bot Bot
Your reservation is secured. Thank you very much for making the reservation! You can check the reservation under your id: xxxx.
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true.

### Inform Failure
1. Description: the user confirms the reservation but the reservation fails.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true, fail to make a reservation.
3. Annotated conversation: 

:::: conversation

::: bot Bot
Are you sure to book a small table at 5:00 PM for Sunday, December 25, 2022?
:::

::: user User
Yes.
:::

::: bot Bot
Sorry, the table you want to book is not available at present. 
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true.


### Support Updating Value

1. Description: before the reservation has been made, the user wants to change the date.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
Can I change the date to this Saturday?
:::

::: bot Bot
The date is changed from Sunday, December 25, 2022 to Saturday, December 24, 2022.
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-24", `complete` = false. 

### Handle Invalid Value

1. Description: there is no available table for Sunday, the user changes to another date.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `complete` = false, there is no available table for 2022-12-25.
3. Annotated conversation:

:::: conversation

::: bot Bot
Sunday, December 25, 2022 is not available. Please choose another date. Which day would you like to book?
1. Wednesday, December 21, 2022
2. Thursday, December 22, 2022
3. Friday, December 23, 2022
:::

::: user User
Friday.
:::

::::

4. End state: `user id` = "xxxx", `date` = "2022-12-23", `complete` = false.

### Handle Denial

1. Description: the user denies all the values for making a reservation.
2. Precondition: `user id` = "xxxx", `date` = "2022-12-25", `time` = "17:00", `table type` = "small", `complete` = true.
3. Annotated conversation:

:::: conversation

::: bot Bot
Are you sure to book a small table at 5:00 PM for Sunday, December 25, 2022?
:::

::: user User
No.
:::

::::

4. End state: `user id` = "xxxx", `complete` = false.


## View Reservations

Slots:
1. `userId` with type **String**

The conversational behavior of the bot for this service can be described in the following contextual snippets: 

### Happy Path

1. Description: when the user has valid reservations, display them to the user.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to view my reservation.
:::

::: bot Bot
You have reserved a small table at 5:00 PM for Sunday, December 25, 2022.
:::

::::

4. End state: `user id` = "xxxx", `complete` = true.

### Inform None Reservation

1. Description: when the user has no valid reservations, notify the user.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to view my reservation.
:::

::: bot Bot
Sorry, I can't find your valid reservation. Please check whether you made the reservation with your current account.
:::

::::

4. End state: `user id` = "xxxx", `complete` = true.


## Cancel a Reservation
Slots:
1. `userId` with type **String** 
2. `reservation id` with type **Int**

The conversational behavior of the bot for this service can be described in the following contextual snippets: 

### Happy Path

1. Description: the user has a valid reservation and it is canceled successfully.
2. Precondition: `complete` = false.
3. Annotated conversation:

:::: conversation

::: user User
I want to cancel my reservation.
:::

::: bot Bot
Your reservation is a small table at 5:00 PM for Sunday, December 25, 2022. Are you sure to cancel it?
:::

::: user User
Yes, please.
:::

::: bot Bot
The reservation has been canceled successfully.
:::

::::

4. End state: `user id` = "xxxx", `reservation id` = "15", `complete` = true.

### Handle Several Reservations

1. Description: the user has more than one valid reservation so the user needs to choose one of them.
2. Precondition: `user id` = "xxxx", `complete` = false.
3. Annotated conversation:

:::: conversation

::: bot Bot
Which reservation would you like to cancel?
1. Small table at 5:00 PM for Sunday, December 25, 2022
2. Large table at 7:00 PM for Monday, December 26, 2022
:::

::: user User
The second.
:::

::::

4. End state: `user id` = "xxxx", `reservation id` = "16", `complete` = true.