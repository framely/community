# Gathering requirements

The requirements-gathering process for a conversational experience is more than just defining features and functionality. At its core, it is about understanding the business, the users, and the technical capabilities. By starting with clear and well-researched requirements, you can avoid major changes later in the development process.

## Identify your business 
> Ensure all the necessary information will be collected in a logical and efficient manner.

When designing conversational user experiences (CUIs), it is important to focus on the service that will provide. This is because the service determines the tasks that the CUI can perform and how it will interact with users.

To start, you need to answer the following questions:
- What are the essential services that you offer? 
- What kind of information do your users need to provide? 
- What are the key features that you want to highlight? 

### Create a schema
Once you have a good understanding of the service, you can create a schema that outlines all the required slots and their types. The schema will determine the information that needs to be collected from customers, and it will help to ensure that chatbot conversations are efficient and structured.

For example, if you are a restaurant owner, you want to provide a reservation service to your customers. A restaurant reservation chatbot needs to know at least the following information to complete a reservation: 
- The number of guests
- The date and time
- The contact person and information
- Any special requests or dietary restrictions

Once this information is collected, the chatbot can determine the best way to interact with the user. For example, if the user does not provide all of the necessary information, the chatbot can prompt them for the missing information. If the time reserved by the user is not available, the chatbot can offer alternative times or suggest other restaurants.

However, if this information is not confirmed in advance, it will be difficult to start the conversation design with the user's expressions. This is because there are endless ways that users can express themselves, and if they do not provide the necessary information, it will be impossible to complete the booking. More rounds of dialogue will only make the chatbot inefficient.

### Example
Here is an example of a schema that you could use for a restaurant reservation chatbot:

| Slots            | Type        | Description                                               |
|:---              |:---         |:---                                                       |
| Number of guests | Int         | *Required*. To specify how many people will be coming.    |
| Date             | LocalDate   | *Required*. The date of the reservation.                  |
| Time             | LocalTime   | *Required*. The time of the reservation.                  |
| Name             | Name        | *Required*. The name of the guest.                        |
| PhoneNumber      | PhoneNumber | *Required*. The phone number of the guest.                |
| Note             | Note        | *Required*. Any special requests or dietary restrictions. |

By collecting the necessary information from users, the chatbot can provide a more personalized and efficient reservation experience. The chatbot can also help to reduce the number of phone calls and emails that you  receive, freeing up your time to focus on other tasks.


## Identify your users 
> Get a better understanding of your users' needs and expectations.

While it is important to optimize your product for your most frequent users, you should not do so at the expense of other users' experiences. A well-designed product is inclusive and universally accessible. This means designing for different populations, such as people with disabilities, people who speak different languages, and people with different levels of technical expertise.

Here are some tips for accommodating all users:
- **Consider different abilities and disabilities.** When designing your chatbot, think about how people with different abilities and disabilities will interact with it. For example, you may need to provide alternative ways for users to interact with your chatbot if they are blind or have limited mobility.
- **Use clear and concise language.** Your chatbot's language should be clear and concise, so that users of all levels of understanding can easily understand it. Avoid using jargon or technical terms that users may not be familiar with.
- **Provide multiple ways to get help.** If users get stuck or have questions, they should be able to get help easily. You can provide multiple ways for users to get help, such as live chat.
- **Test your chatbot with a variety of users.** Once you have designed your chatbot, it is important to test it with a variety of users to make sure that it is accessible and usable for everyone.

### Create user personas and journeys

| User persona | User journeys | Critical user journeys |
|:--- |:--- |:--- |
| Who is the user? | What are the user’s goals? What’s the user’s context? | Describe each of the relevant moments in the journey |
| A user persona is a fictional character that represents a group of real users. It is a way to capture the needs, goals, and motivations of your users in a way that is easy to understand and empathize with. | A user journey is a map of the steps that a user takes to achieve a goal. It shows the user's interactions with your product, as well as the emotions and thoughts that they experience along the way. | Critical user journeys are those that are most important to your users. They may be journeys that happen very often, or they may be journeys that are essential for achieving a key goal. By focusing on critical user journeys, you can ensure that your chatbot is meeting the needs of your users. |

### Example

Here are just a few examples of user personas and journeys for a restaurant reservation service. There are many other possible personas and journeys, depending on the specific needs of your users. By creating user personas and journeys, you can gain a deeper understanding of your users and their needs, and you can use this information to design a chatbot that meets their needs.

| | John Smith | Sarah Jones | Michael Brown |
|:--- |:--- |:--- |:--- |
| Who is the user? | 35, Software engineer | 25, Student | 65, Retired |
| What are the user’s goals? | To make a restaurant reservation for dinner with his wife | To make a restaurant reservation for lunch with her friends | To make a restaurant reservation for dinner with his family |
| What’s the user’s context? | He doesn't have time to call the restaurant and make a reservation | She doesn't know the area well and doesn't know which restaurants are good | He has difficulty using a computer or smartphone |
| Describe each of the relevant moments in the journey | <ul><li> Moment 1: John opens the restaurant reservation chatbot on his phone. </li><li> Moment 2: The chatbot asks him what restaurant he wants to make a reservation for. </li><li> Moment 3: John tells the chatbot the name of the restaurant and the date and time he wants to make a reservation for. </li><li> Moment 4: The chatbot confirms the reservation and sends John a confirmation email. </li></ul> | <ul><li> Moment 1: Sarah opens the restaurant reservation chatbot on her phone. </li><li> Moment 2: The chatbot asks her what neighborhood she wants to make a reservation in. </li><li> Moment 3: Sarah tells the chatbot the neighborhood and the date and time she wants to make a reservation for. </li><li> Moment 4: The chatbot suggests a few restaurants that match her criteria. </li><li> Moment 5: Sarah selects a restaurant and makes a reservation. </li><li> Moment 6: The chatbot confirms the reservation and sends Sarah a confirmation email. </li></ul> | <ul><li> Moment 1: Michael calls the restaurant reservation chatbot. </li><li> Moment 2: The chatbot asks him what restaurant he wants to make a reservation for. </li><li> Moment 3: Michael tells the chatbot the name of the restaurant and the date and time he wants to make a reservation for. </li><li> Moment 4: The chatbot confirms the reservation and tells Michael the phone number of the restaurant. </li><li> Moment 5: Michael calls the restaurant to confirm the reservation. </li></ul> |


## Identify technical capabilities 
> Determine what is and isn’t possible given your timeline and resources.

This is an important step in the chatbot design process, as it helps to ensure that the chatbot is feasible and that the project is not overambitious. This part needs to be considered in combination with your actual situation, but here are some examples of things to consider:

**System: What are the capabilities and limitations of the various systems that your chatbots will rely on?**
- How will you identify users across sessions and channels?
- How many channels will you support? Multiple channels? Omni channel?
- How will you handle overlapping sessions?

**Data: What’s the format and quality of any data you’ll be using?**
- How and where will these data be saved? OpenCUI-hosted? Private deploy? 
- What type of database will you use? Will it be a relational database, a sheet, a calender, or something else?
- What are the limitations of the data storage system that you are using? 
- What format will the data be in when it is stored? For example, will it be in JSON format, XML format, or something else?

Here are some additional questions that you may want to consider:
- How will you manage the data lifecycle?
- How will you secure the data?
- How will you back up the data?

By considering these factors, you can get a better idea of what is and isn’t possible with your chatbot project. This will help you to set realistic expectations and make sure that you are using your time and resources effectively.
