# Test and iterate

You have now designed the schema required by the service based on your business needs. You have also designed the interactions and contextual snippets for different scenarios, it is important to start testing and iterating on your designs. This is because it can be difficult to identify usability problems when you are too close to the design process. An outsider's perspective can be helpful in identifying problems that you may have overlooked. The good news is that you can get insight into whether your design will work for users before actual building. 

## Get feedback to see if your design is working

The goal of this stage is not to verify the understanding and expression of the dialogue, but to verify the performance of the interaction. Can the bot provide help to the user or help the user complete the task? In other words, you need to check whether the bot can maintain a smooth conversation with the user every time the user interacts.

Since your goal is to update your design to reflect what works best for real users, you want your prototype to be as close to reality as possible. This means that you should ask users to describe their experience in their own words. How did it meet or fail to meet their expectations? Did anything surprise them? Were they satisfied? Remember that the focus is on their behavior, not their opinion.

## How to conduct usability tests 

Running experiments can help you understand how people will engage with your design. You may find that users are using your design in ways that you had not anticipated, which could mean that you need to make changes to better meet their needs.

**The key is to focus on the usability of your design**, not on what users say they want. Users may not always be able to articulate what they need, so it is important to observe their behavior and make changes based on what you see.

### Quick experiment

To test your desing, all you need is your contextual snippets, you can: 
1. Find someone who is unfamiliar with your project, such as a family member, friend, or colleague.
2. Ask them to role-play a conversation with you, using your contextual snippets as a guide.
3. Read the chatbot lines to your test user and observe how they react.
4. If the user goes out of scope, feel free to improvise what the interaction should be.

For example, if your test user follows the happy path, you can reply with the definition in the happy path to see if it confuses them. The happy path is the most common way that users will interact with your chatbot, so it's important to make sure that it is clear and easy to follow. If there is a problem with the happy path, it is likely that the schema or fill strategy is missing.

For example, suppose your system allows anyone to book a table. If a new user has not registered in the system and has not provided their name and phone number, then you will not know who the table belongs to. If the fill strategy is set to "recovery only", then this will cause an error. Recovery only works when the user actively mentions that they have not provided the required information. In this case, the fill strategy needs to be changed to "always ask".

If your test user provides a reservation time, you need to verify whether this value meets the business requirements according to the contextual snippet. For example, you need to check whether the time is within business hours and whether it has already been booked. If the time is invalid, you need to find a way to lead the user to another valid time.

By experiment your chatbot with contextual snippets, you can identify potential problems and make sure that it is ready for use by real users.

### Standard usability experiment

Of course, once you’ve started building your chatbot, you should test it often using the built-in Debug feature in the OpenCUI platform. You can also have your friends, family, or colleagues test it. For more information about how to test interaction with your chatbot, please see the [Testing](../platform/testing.md) documentation.