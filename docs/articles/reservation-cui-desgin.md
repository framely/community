---
article: true
date: 2023-04-19

image:
    - blog/banner/tutorial_reservation_cui.png
description:
    - Document high-level design by contextual snippets
author: Sunny May
---

# Table reservation CUI design
This guide shows you how to document the design of a conversational user interface (CUI) for reserving tables. By documenting high-level design and requirements for the CUI on the table reservation chatbot, we ensure it behaves conversationally as desired. The table reservation chatbot offers a range of services, including the ability to  [make](#make-a-reservation), [view](#view-reservations), and [cancel](#cancel-a-reservation) reservations. Each service is further described in detail below.

To clarify, there are two assumptions that apply to all services:

1. The chatbot can obtain the user ID without asking.
2. A valid reservation is neither expired nor canceled.

## Make a reservation
To complete a reservation through dialogue, specific information is needed, including a unique identifier to identify the user making the reservation, the number of guests attending, and the reservation date and time. The service schema can be represented by the following slots:

1. `user id` with type **String**
2. `number` with type **Int**
3. `date` with type **Date**
4. `time` with type **Time**

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: helps the user make a reservation successfully.
2. Precondition: `complete` = false.
3. Annotated conversation:

   - 🙂 Hi, I'd like to reserve a table, please.
   - 🤖 How many people will you need the reservation for?
   - 🙂 There will be **two** of us.
   - 🤖 Which day will you be joining us on?
   - 🙂 **December 25th, 2022**.
   - 🤖 What time would you like the reservation for?
   - 🙂 **3:00 PM**.
   - 🤖 Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?
   - 🙂 Yes.
   - 🤖 Your reservation has been made. We'll see you at 3:00 PM on Sunday, December 25, 2022. You can check the reservation under your ID: xxxx.

4. End state: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `time` = "15:00", `complete` = true.


### Inform reservation failure
1. Description: informs the user when there is a failure to create a reservation.
2. Precondition: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `time` = "15:00", `complete` = true, fail to make a reservation.
3. Annotated conversation:

   - 🤖 Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?
   - 🙂 Yes.
   - 🤖 Sorry, the table you want to book is not available at present. You may change to another time or date, and try it again.

4. End state: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `time` = "15:00", `complete` = true.

### Handle invalid value
1. Description: asks the user to provide valid input when the value provided is not acceptable.
2. Precondition: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `complete` = false, there is no available table for 2022-12-25.
3. Annotated conversation:

   - 🤖 Which day will you be joining us on?
   - 🙂 This Sunday.
   - 🤖 Sunday, December 25, 2022 is not available. Please choose another date. Which day will you be joining us on?

4. End state: `user id` = "xxxx", `number` = 2, `date` = null, `complete` = false.

### Support updating value
1. Description: updates the reservation details such as the number of people, date, or time before the reservation is confirmed, whenever the user requests a change.
2. Precondition: `user id` = "xxxx", `number` = 2, `date` = "2022-12-25", `complete` = false.
3. Annotated conversation:

   - 🙂 Can I change the date to this Saturday?
   - 🤖 Sure, the date is changed from Sunday, December 25, 2022 to Saturday, December 24, 2022.

4. End state: `user id` = "xxxx", `number` = 2, `date` = "2022-12-24", `complete` = false.

## View reservations
To view reservations through dialogue, specific information is needed, including a unique identifier to identify the user whose reservations are being viewed. The service schema can be represented by the following slot:

1. `user id`, with type **String**

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: displays reservations made by the user that are valid.
2. Precondition: `complete` = false.
3. Annotated conversation:

   - 🙂 Hello, I'd like to check my reservation. I can't remember which date I booked.
   - 🤖 No problem. You have booked a table for Sunday, December 25, 2022, at 3:00 PM.

4. End state: `user id` = "xxxx", `complete` = true.

#### No reservations found
1. Description: informs the user that there are no valid reservations associated with their account.
2. Precondition: `complete` = false.
3. Annotated conversation:

   - 🙂 Hello, I'd like to check my reservation. I can't remember which date I booked.
   - 🤖 Sorry, I can't find a valid reservation under your ID (xxxx). Please check whether you made the reservation with your current account.
   
4. End state: `user id` = "xxxx", `complete` = true.

## Cancel a reservation
To cancel a reservation through dialogue, you will need to provide two unique identifiers: one for the user who made the reservation, and another for the reservation to be cancelled. The service schema can be represented by the following slots:

1. `user id`, with type **String**
2. `reservation id` , with type **String**

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: assists the user in successfully cancelling a valid reservation.
2. Precondition: `complete` = false.
3. Annotated conversation:

   - 🙂 Hi, I made a reservation earlier this week, but I have to cancel it.
   - 🤖 No problem. You have reserved a table for Sunday, December 25, 2022 at 3:00 PM. Are you sure to cancel it?
   - 🙂 Yes, please.
   - 🤖 The reservation has been canceled successfully.

4. End state: `user id` = "xxxx", `reservation id` = "xx", `complete` = true.

### List multiple reservations
1. Description: displays a list of valid reservations from which the user needs to choose one.
2. Precondition: `user id` = "xxxx", `complete` = false.
3. Annotated conversation:

   - 🤖 Which reservation would you like to cancel?
        1. Sunday, December 25, 2022, 3:00 PM
        2. Monday, December 26, 2022, 7:00 PM
   - 🙂 The second.

4. End state: `user id` = "xxxx", `reservation id` = "xxx", `complete` = true.