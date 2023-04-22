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
This text documents the design of a conversational user interface (CUI) for table reservations so that all stakeholders can stay in sync on goal and scope. The table reservation module provides a conversational service that enables user to make, view and cancel table reservations. The conversational experience of each functionality is described in detail below.

The design and implementation of this module are based on the following two assumptions :
1. The module can obtain the user ID without asking from the chatbot runtime.
2. A reservation will stay in valid until it is expired or canceled by user. While businesses may change plans and render some reservations invalid, this module does not cover those scenarios.

## Make a reservation
To make a reservation, the following information is needed (captured by slots):
1. `useId` to uniquely identify the user making the reservation, with type **String**, 
2. `numberOfGuests` for the number of guests attending, with type **Int**
3. `reservationDate` for the reservation, with type **LocalDate**
4. `reservationTime` for the reservation, with type **LocalTime**

The service's conversational behavior is described in the following [contextual snippets](document-requirement-for-cui.md):

### Happy path
1. Description: Helps the user make a reservation successfully.
2. Precondition: N/A
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

4. End state: Slots `useId`, `numberOfGuests`, `reservationDate` and `reservationTime` are filled, `complete` = true.


### Inform reservation failure
1. Description: Informs the user when there is a failure to create a reservation.
2. Precondition: Slots `useId`, `numberOfGuests`, `reservationDate` and `reservationTime` are all filled, `complete` = true
3. Annotated conversation:

   - 🤖 Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?
   - 🙂 Yes.
   - 🤖 Sorry, the table you want to book is not available at present. You may change to another time or date, and try it again.

4. End state: keep the filling for slots `useId` and `numberOfGuests`, clear up slot: `reservationDate`, `reservationTime` and `complete`.

### Handle invalid input
Using the `reservationDate` as example, the conversational experience should be as follows.
1. Description: Asks the user to provide another date when the date provided is not serviceable.
2. Precondition: Slots `useId` and `numberOfGuests` are filled, `complete` = false
3. Annotated conversation:

   - 🤖 Which day will you be joining us on?
   - 🙂 This Sunday.
   - 🤖 Sunday, December 25, 2022 is not available. Please choose another date. Which day will you be joining us on?

4. End state: Slots `useId` and `numberOfGuests` are filled, slot `reservationDate` are active, `complete` = false.

### Support updating value 
Again using `reservationDate` as example:
1. Description: Updates the slot with new value when the user requests a change.
2. Precondition: slot `useId`, `numberOfGuests` and `reservationDate` are filled, `complete` = false.
3. Annotated conversation:

   - 🙂 Can I change the date to this Saturday?
   - 🤖 Sure, the date is changed from Sunday, December 25, 2022 to Saturday, December 24, 2022.

4. End state: slot `reservationDate` is filled with new value, `complete` = false.

## View reservations
To view all valid reservations a user has so far, chatbot needs to identify the user whose reservations are being viewed. The service schema should have the following slot:

1. `useId` to uniquely identify the user, with type **String**

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: Displays valid reservations made by the user.
2. Precondition: `complete` = false.
3. Annotated conversation:

   - 🙂 Hello, I'd like to check my reservation. I can't remember which date I booked.
   - 🤖 No problem. You have booked a table for Sunday, December 25, 2022, at 3:00 PM.

4. End state: Slot `useId` is auto filled, `complete` = true.

#### No reservations found
1. Description: Informs the user that there are no valid reservations associated with their account.
2. Precondition: `complete` = false.
3. Annotated conversation:

   - 🙂 Hello, I'd like to check my reservation. I can't remember which date I booked.
   - 🤖 Sorry, I can't find a valid reservation under your ID (xxxx). Please check whether you made the reservation with your current account.
   
4. End state: Slot `useId` is auto filled, `complete` = true.

## Cancel a reservation
To cancel a reservation through dialogue, you will need to provide two unique identifiers:

1. `useId` to uniquely identify the user, with type **String**
2. `reservationId` to uniquely identify the reservation, with type **String**

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: Enables the user to cancel a valid reservation.
2. Precondition: `complete` = false.
3. Annotated conversation:

   - 🙂 Hi, I made a reservation earlier this week, but I have to cancel it.
   - 🤖 No problem. You have reserved a table for Sunday, December 25, 2022 at 3:00 PM. Are you sure to cancel it?
   - 🙂 Yes, please.
   - 🤖 The reservation has been canceled successfully.

4. End state: Slot `useId` is autofilled, `reservationId` is user filled, `complete` = true.

### Recommend reservation candidates
1. Description: Displays a list of valid reservation ids from which the user needs to choose one.
2. Precondition: `reservationId` is active, `complete` = false.
3. Annotated conversation:

   - 🤖 Which reservation would you like to cancel?
        1. Sunday, December 25, 2022, 3:00 PM
        2. Monday, December 26, 2022, 7:00 PM
   - 🙂 The second.

4. End state: Slot `useId` is autofilled, `reservationId` is user filled, `complete` = true.