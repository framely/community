# Date Picker CUI Design

## Usage

DatePicker component allows users to input or select a date using natural language in conversational interactions. It can recognize various ways of describing a date, such as the day of the week, day of the month, and date of the year, and will interact with the user to finalize a specific date. It is suitable for the context in which it appears. 

Common use cases include:
- Making a restaurant reservation.
- Scheduling a meeting.

Common interaction logics include:
- Ask for a date.
- Provide date options and help to shrink candidate dates.
- Pass business logic verification.
- Inform or double check with end-user the date value.


## Schema Representation

When the bot is making value recommendations, the auxiliary slots below can help the user to finalize a specific date through interaction.

### Main Slot
| Slot Label | Type                  | Description                                  | Expression Input |
| :---       | :---                  | :---                                         | :---             |
| date       | `java.time.LocalDate` | Always ask. Matches a certain calendar date. | *"today"*, *"this monday"*, *"the 14th of February"*, *"April 14, 2023"*, *"2023-01-18"*, *"the last Tuesday of October 2022"* |

### Auxiliary Slots
| Slot Label | Type                  | Description  | Expression Input |
| :---       | :---                  | :---         | :---             |
| dayOfWeek  | `java.time.DayOfWeek` | The 7 days of the week, from 1 (Monday) to 7 (Sunday). | *"monday"* |
| month      | `java.time.Month`     | Month of a year, from 1 (January) to 12 (December). | *"January"* |
| monthDay   | `java.time.MonthDay`  | A month-day in the ISO-8601 calendar system, the combination of a month and day-of-month. | *"15th February"*, *"15 of February"*, *"the 15th of February"* |
| year       | `java.time.Year`      | A year in the ISO-8601 calendar system. | *2023* |
| yearMonth  | `java.time.YearMonth` | A year-month in the ISO-8601 calendar system, the combination of a year and month. | *"October 2023"* |
| period     | `java.time.Period`    | The quantity or amount of time in terms of years, months and days. | *"4 days"*, *"coming week"*, *"next month"*, *"this quarter"* |

## Contextual Snippet

### 1. Happy Path

| Snippet 1                  | Happy Path                                    | 
| :---                       | :---                                          | 
| **Description**            | Defines what happens if everything goes well. | 
| **Precondition**           | complete: `false`                             | 
| **Annotated Conversation** | <ul><li> :robot: : Which date would you like？ <br>&emsp;&emsp;- 2023-01-19 <br>&emsp;&emsp;- 2023-01-20 <br>&emsp;&emsp;- 2023-01-21 </li><li> :blush: : Jan 19. </li><li> :robot: : Get, your date is 2023-01-19. </li></ul> | 
| **End State**              | <ul><li>date = `2023-01-19` </li><li>complete = `true` </li></ul> | 

### 2. Date Value Can NOT Pass Verification

| Snippet 2                  | Date Value Can NOT Pass Verification          | 
| :---                       | :---                                          | 
| **Description**            | After the user specifies a date, the date does not pass validation. Bot prompts the verification failure message and asks the user again. | 
| **Precondition**           | complete: `false`                             | 
| **Annotated Conversation** | <ul><li> :blush: : Jan 19. </li><li> :robot: : The date is not available. Which date would you like? <br>&emsp;&emsp;- 2023-01-20 <br>&emsp;&emsp;- 2023-01-21 <br>&emsp;&emsp;- 2023-01-22 </li></ul> | 
| **End State**              | complete: `false`                             | 

### 3. User Provides Partial Inform

| Snippet 3                  | User Provides Partial Inform                  | 
| :---                       | :---                                          | 
| **Description**            | After the bot provides candidates, the user proposes some conditions to narrow down the available options. | 
| **Precondition**           | complete: `false`                             | 
| **Annotated Conversation** | <ul><li> :robot: : Which date would you like？ <br>&emsp;&emsp;- 2023-01-19 <br>&emsp;&emsp;- 2023-01-20 <br>&emsp;&emsp;- 2023-01-21 </li><li> :blush: : mon or tues. </li><li> :robot: : Here are some optins for you: <br>&emsp;&emsp;- 2023-01-23 <br>&emsp;&emsp;- 2023-01-24 <br>&emsp;&emsp;- 2023-01-30 <br>&emsp;&emsp;- 2023-01-31</li></ul> | 
| **End State**              | complete: `false`                             | 

### 4. User Change Mind

| Snippet 4                  | User Change Mind                              | 
| :---                       | :---                                          | 
| **Description**            | After the date determined by the user, the user changes his mind. | 
| **Precondition**           | <ul><li>date = `2023-01-19` </li><li>complete = `true` </li></ul> | 
| **Annotated Conversation** | <ul><li> :blush: : Wait, I think Jan 30 is better. </li><li> :robot: : Get, your date is changed to 2023-01-30. </li></ul> | 
| **End State**              | <ul><li>date = `2023-01-30` </li><li>complete = `true` </li></ul> | 