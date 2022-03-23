# Conversational Component
It is rare that businesses doesn't want to provide 24x7 personalized services. But they rarely do. Why?  It is easy to personalize content in graphical user interface (GUI), but it is generally impossible to personalize arbitrary services as user interaction design and implementation can get out of hand quickly. Hiring live agents is not an option, as it is not scalable. Chatbot has the potential to be the solution, but it is too expensive to build today.

There are many reasons why it is expensive to build usable conversational user interface (CUI) to your services. Today let's focus on one of the aspects: the lack of component based framework. I will talk about what is the component driven development and why it is a good idea to adopt this methodology. And then we will cover the main considerations for building a component based framework specific to conversational user experiences which reveals the main challenges in constructing CUI components. 

## Component driven development
Component-Driven Development (CDD) is a development methodology that advocate building things based on prefabricated components. This methodology is popular because it exploits the following observation: it is generally much more involved in building something than using it. Everyone can light a match, but the number of people how can produce a box of matches is considerably small. Using off-the-shelf component is a key way to reduce cost in building things. It is no surprise that CDD is widely adopted in real world, we can see its application everywhere, in construction, in computer manufacturing, and of course in software development. 

But what is a component? According to Cambridge dictionary, A component is a part that combines with other parts to form something bigger. In software development, there are three aspects about component:
1. Self contained. The component should provide the claimed functionality without external help. For example, any date picker will encapsulate the details like leap years, variance in months of the year and interaction between day of week and day of month, etc. The caller of the component does not need to know anything about it. 
2. Reusability. The same component can be wired into different context for different larger purpose. Like, the same date picker can be used in any context where we need to get a date from user, and it is typically possible to wire the result of this component to outer context declaratively. 
3. Configurability. Ideally, the builder can customize its behavior via configuration (think of low bandwidth control so caller does not have to say much). It is very easy to setup the initial state of date picker  for a better user experience, and sometimes, it is also easy to configure the look and feel via well defined control.

In a user facing front end development, CDD is even more prevalent. Almost all modern frontend framework at their core are component based, Reactjs, SwiftUI, Vue, you name it. But why is this the case?

## Benefit of the component based approach
There are many possible angles that component based approach can be advantageous.
1. Since the same component can be used multiple times in the different context, the average cost of getting the same functionality via a component is lower, sometimes much lower compared to building it from scratch (can be close to zero).
2. Update component version can fix the issues of component without much builder's involvement, some time before builder even realized there is problems.
3. Using components can greatly reduce the time to market. As a component can be prefabricated or developed in parallel.
4. Using components allows builders to try different things quickly. As builders can focus on what they want instead of how to build it.

Conversational user interaction (CUI) component
For conversational user interface, the component based approach can be more appealing. As half of the user interaction is dictated by end users, it is very likely that we will converge to a smaller set of CUI components thus introduce huge cost savings in building conversational user experiences. But what are the basic considerations of highly reusable conversational user interaction component?

### Schema
The center of the any CUI component is what information, or set of slots, can be collected from a user through conversation so that the chatbot can use such information to invoke services to user wants. Obviously schema for the same vertical can be fairly stable, which makes conversational user interaction a profitable target for componentization. 

### Interaction logic
Given the set of slots that chatbot need to collect through conversation, one can define the interaction logic, imperatively or declaratively, which dictates how these slot will be filled. This is the part of the CUI component that needs to be encapsulated. One of the key requirements of the conversational interaction logic is order insensitivity. Assume a user knows what they want, the collected information should not change regardless of what order the user chooses to provide the information. In other words, a CUI component should behave deterministically with respect to the order of user input. While the state machine is enough to model the graphical user interaction (GUI), one typically needs to use statechart (Harel statechart) to efficiently model the conversational user interaction even at the single frame level, because we can not control what the user might do. 

### Language hooks
It should be easy to port the same interaction logic into different languages. To this end, there should be a simple configuration on these CUI components that one can customize its dialog understanding and text generation behavior. Ideally, such configuration should require no background in the natural language understanding or machine learning so that everyone can contribute to language aspects without going through the steep learning curve.

### Runtime considerations
For graphical user interface components, the runtime can be fairly simple because the wiring of components doesn't change after being determined at configuration time. Since we can not control what user might say or do, the runtime for CUI component needs to be a lot more involved as we have to figure things out dynamically based on circumstances. For example, to support a user seamlessly switching between different topics, chatbot runtime needs to dynamically figure out the pronoun antecedent from context, automatically switch between different topics accordingly, so that chatbot and user are always on the same page. 

### Integration with service
For task oriented conversation, the goal is always connecting user with desired services. So it should be possible for the CUI component to pair up with different service providers for maximal reuse. Furthermore, when a CUI component is used together with the compatible backend component, builder can simply deliver services directly by populating the table hosted in the backend components, without needing to understand how component works at CUI level.

## Conclusion
The advent of high level component based frameworks greatly reduced the cost of building the GUI application, and there is little question that these frameworks contribute to the ubiquitous availability for web and mobile apps. However, the conversational user experience are still mainly built from scratch. It is excruciating slow and expensive and only the team with extreme deep pocket can do it well. Lack of a well designed component based CUI framework has plagued chatbot development for so long as there are many aspects needed to be taken care of. But the wait is over: check framely.io to see how one can build chatbot in a component approach today.