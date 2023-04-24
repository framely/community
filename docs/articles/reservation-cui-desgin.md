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
This document describes the design of a conversational user interface (CUI) for table reservations so that all stakeholders can stay in sync on goal and scope. The table reservation module provides a conversational service that enables user to make, view and cancel table reservations. The conversational experience of each functionality is described in detail below.

The design and implementation of this module are based on the following two assumptions:
1. The user ID can be obtained without asking from the chatbot runtime.
2. A reservation will remain valid until it is expired or canceled by the user. While businesses may change plans and render some reservations invalid, this module does not cover those scenarios.

## Make a reservation

To make a reservation, the user can simply say something like, *"I'd like to make a reservation,"* and the chatbot will then ask for the required information. The information that is needed to make a reservation includes the following (captured by slots):

1. `useId` **String** Required. A unique identifier for the user making the reservation.
2. `numberOfGuests` **Int** Required. The number of guests attending the reservation.
3. `date` **LocalDate** Required. The date of the reservation.
4. `time` **LocalTime** Required. The time of the reservation.

Once the user has provided all of the required information, the chatbot will confirm the reservation and take the necessary action.

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: Make the reservation and inform the user of the reservation details.
2. Precondition: N/A
3. Annotated conversation
   ```json
   User: "Hi, I'd like to reserve a table, please."
   Chatbot: "How many people will you need the reservation for?"
   User: "There will be two of us."
   Chatbot: "Which day will you be joining us on?"
   User: "December 25th, 2022."
   Chatbot: "What time would you like the reservation for?"
   User: "3:00 PM."
   Chatbot: "Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?"
   User: "Yes."
   Chatbot: "Your reservation has been made. We'll see you at 3:00 PM on Sunday, December 25, 2022. You can check the reservation under your ID: xxxx."
   ```
4. End state: Slots `useId`, `numberOfGuests`, `date` and `time` are filled.
   ```json
   {
   "useId": "1234567890",
   "numberOfGuests": 2,
   "date": "2022-12-25",
   "time": "15:00"
   }
   ```

### Inform reservation failure
1. Description: Informs the user when the reservation failed to be created.
2. Precondition: Slots `useId`, `numberOfGuests`, `date` and `time` are all filled.
3. Annotated conversation:
   ```json
   Chatbot: "Are you sure to book a table for 2 at 3:00 PM on Sunday, December 25, 2022?"
   User: "Yes."
   Chatbot: "I'm sorry, the table you requested is not available. Would you like to try a different time or date?"
   ```
4. End state: 
   - Keep the filling for slots `useId` and `numberOfGuests`.
   - Clear up slots: `date` and `time`.

### Handle invalid input
1. Description: When the chatbot receives a value for a slot that is not serviceable, it will ask the user to provide another value. Using the `date` as an example.
2. Precondition: Slots `useId` and `numberOfGuests` are filled.
3. Annotated conversation:
   ```json
   Chatbot: "Which day will you be joining us on?"
   User: "This Sunday."
   Chatbot: "Sunday, December 25, 2022 is not available. Please choose another date. Which day will you be joining us on?"
   ```
4. End state: 
   - Slots `useId` and `numberOfGuests` are filled.
   - Slot `date` is active.

### Handle value replacement
1. Description: When the user requests a change to a slot value, the chatbot will update the slot with the new value. Using the `date` as an example.
2. Precondition: Slots `useId`, `numberOfGuests` and `date` are filled,.
3. Annotated conversation:
   ```json
   User: "Can I change the date to this Saturday?"
   Chatbot: "Sure, the date is changed from Sunday, December 25, 2022 to Saturday, December 24, 2022."
   ```
4. End state: Slot `date` is filled with new value.

## View reservations

Users can view their reservations by simply asking the chatbot to "*show me my reservations.*" The chatbot will then display a list of all of the user's current reservations. To do this, the chatbot needs the following information:

1. `useId` **String** Required. The ID of the user whose reservations are being viewed.

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: Displays a list of all of the user's current reservations.
2. Precondition: N/A
3. Annotated conversation:
   ```json
   User: "Show me my reservations."
   Chatbot: "Here are your current reservations: a table for Sunday, December 25, 2022, at 3:00 PM."
   ```
4. End state: Slot `useId` is auto filled.

### No valid reservations
1. Description: When the user asks to see their reservations and there are none, the chatbot will inform the user that there are no valid reservations associated with their account.
2. Precondition: N/A
3. Annotated conversation:
   ```json
   User: "Show me my reservations."
   Chatbot: "Sorry, I can't find any valid reservation associated with your account. Please check to make sure that you made the reservation with your current account."
   ```   
4. End state: Slot `useId` is auto filled.

## Cancel a reservation

Users can cancel their reservation by simply asking the chatbot to *"cancel my reservation."* The chatbot will then ask the user to determine the specific reservation that they want to cancel. To cancel a reservation, the chatbot needs the following information:

1. `useId` **String** Required. The ID of the user.
2. `reservationId` **String** Required. The ID of the reservation that will be cancelled.

The service's conversational behavior is described in the following contextual snippets:

### Happy path
1. Description: Cancel the reservation and inform the user of the cancellation.
2. Precondition: N/A
3. Annotated conversation:
   ```json
   User: "Cancel my reservation."
   Chatbot: "Sure. Can you tell me which reservation you would like to cancel?"
            "1. Sunday, December 25, 2022, 3:00 PM"
            "2. Monday, December 26, 2022, 7:00 PM"
   User: "The second"
   Chatbot: "Okay, I see that reservation. Is this the correct reservation?"
   User: "Yes, that's correct."
   Chatbot: "Thank you. The reservation has been canceled successfully."
   ```
4. End state: Slot `useId` is autofilled, `reservationId` is user filled.