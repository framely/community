# Dual process: new paradigm for building chatbot

:::info Syetem 1 vs System 2
![Syetem 1 vs System 2](/images/essentials/system1.webp)
:::

OpenAI has demonstrated that one can build a chatbot capable of responding to common sense encoded in the web dump it was trained on. Additionally, retrieval-augmented generation allows businesses to create chatbots that expose business-specific information found in past conversations and documents, simply by feeding data to a transformer-based deep neural model, without the need to write a single line of conversation flow code. However, chatbots developed in this manner may lack the precise control sometimes required by businesses, an area in which traditional chatbot development excels. Therefore, the question arises: which approach represents the future of chatbot development?

In his popular book “Thinking, Fast and Slow,” Nobel laureate Daniel Kahneman revealed that the human brain actually has two distinct systems that work in tandem. System 1 provides quick responses for mundane tasks based on intuition, while System 2 steps in for tasks with higher impact that require more effortful and analytical thinking. This dual-process framework enables us to handle a wide range of cognitive tasks efficiently, make quick judgments when appropriate, and engage in more reflective thinking when faced with complex or novel situations.

The brain possesses limited cognitive power, and allocating it efficiently with a dual-process system is crucial for survival. Businesses have to navigate even more complexity with limited resources. We argue that the future chatbots that businesses build should also operate as a dual-process system. Therefore, they should be developed with both paradigms together.

## Software 1.0 corresponds to System 2
Until very recently, software was written in languages such as Python, C++, etc., using explicit instructions that dictate how the input is processed to produce the desired output. The software developed in this way is referred to as Software 1.0. It is often interpretable and transparent since it operates based on explicit rules and logical reasoning.

In software 1.0, the behavior and functionality of the software are explicitly programmed by developers. This requires developers to possess a detailed understanding of the problem domain. Software 1.0 development involves a deliberate process, including requirement analysis, design, implementation, testing, and deployment, making it clearly a System 2 activity. We further claim that the resulting software solution behaves like a System 2, as every step it takes is the result of the deliberation of its human expert developer.

## Software 2.0 corresponds to System 1
However, many real-world tasks, such as determining whether an input image contains a car or not, are impossible to solve with step-by-step solutions. This is where machine learning, particularly neural network-based approaches, comes into play.

:::info Software 2.0
![Syetem 1 vs System 2](/images/essentials/system1-2.webp)
:::

Machine learning-based, commonly known as software 2.0, refers to a new approach to building solutions. In software 2.0, the behavior and functionality of the software are learned from data instead of being explicitly programmed by developers. Building solutions using neural networks a more popular software 2.0 approach only requires:

1. A neural network architecture with connection strengths represented by corresponding parameters. Different weights for these parameters represent different solutions. The architecture is typically decided based on intuition and past experience.

2. A set of labeled examples, knows as training set, each consisting of an input and its target output. The solution consists of weights that can produce the target output for each labeled example given its input. The quality and quantity of the training set are major factors that determine the quality of the solution.

The way neural networks process information is very similar to System 1. They can process information in parallel, quickly analyze patterns in data, and make rapid predictions or classifications based on the learned patterns. In addition, they exhibit fast and automatic responses, just like system 1. Furthermore, when the data is available, picking architecture can be thought as a System 1 activity.

## Chatbots are also software
A chatbot/copilot is a software application with a conversational user interface. To decide which approach to use when developing a chatbot, it is useful to understand them from the following two perspectives.

1. Informational vs transactional. Historically, chatbots have provided users with information without taking any actions. However, with the emergence of copilot chatbots, there is an expectation for them to perform actions on behalf of users. This requires the chatbot to interact with backend systems in the service layer.

2. Differentiated vs undifferentiated solutions. Businesses need to differentiate in order to better serve their market segment. Figuring out what and how to differentiate from others requires deliberation and systematic experimentation. Businesses only differentiate when they need to. It is common for businesses to reuse existing solutions as much as possible to save costs.

## When to develop chatbots the software 1.0 way?
The benefit of using software 1.0 to build chatbot is the control it offers to business. Under the von Neumann architecture, the semantic of every instruction is deterministic, so chatbot built this way always generate exact response as designed. This deterministic control, however, comes with a steep cost.

For every functionality you provide to user through CUI, you need to design API schema first. The APIs need to be implemented and then deployed as service before frontend can expose these functionality to your user. The development of these deterministic solutions thus requires human experts in both business domain and software development stack, and it can be costly and will take a long time.

Software 1.0 development is best suited when the chatbot needs to take action or call functions via service APIs for the user. The conversational interactions required for taking action are typically more complex, often necessitating additional conversation flows such as confirmation and recommendations. To deliver a seamless conversational experience, these conversation flows need to interact with the production system in a controlled way. Developing chatbots in software 1.0 is also useful when businesses need to differentiate themselves, which generally involves experimenting with novel solution.

## When to build chatbot with LLMs
Neural networks has been used as component for chatbot, for example dialog understanding, in software 1.0 for a long time. But recently, they are used to build chatbot end to end for some use cases. In particular, Large Language Models (LLMs) are trained on vast amounts of text data to learn the patterns, structures, and semantics of language, as well as the common sense knowledge encoded in that data. An instruction-tuned LLM, such as ChatGPT, can assist users in various ways within a conversational user interface.

While it is possible to use prompts to solve many problems with LLMs, the solutions obtained under these zero-shot learning settings are only effective if the domain has a decent representation in the training set. No machine learning solution can perform well in new domains. However, manual labeling of data is never an efficient method for “teaching” a system the desired behavior and can be prohibitively expensive. But when there is an abundance of labeled examples available as a byproduct of human activities, training neural networks to solve problems becomes a sensible approach.

By combines the strengths of language generation and information retrieval, the retrieval augmented generation using LLMs has shown some promise in serving informational request using just existing document, knowledge base, etc without extra effort. It is also a good idea to build chatbot based on LLM for the undifferentiated services, when there are enough public domain examples already available.

## Chatbots should be dual-process system
Both software 1.0 and software 2.0 can be effective for building chatbots, but for different use cases. Instead of sticking to one approach, it is beneficial to pick the right tool for each use case. Therefore, the future of chatbots/copilots will very likely be a dual-process system, with a symbolic subsystem or System 2 built with software 1.0 responsible for differentiated or transactional services, and a neural subsystem or System 1 based on LLMs responsible for undifferentiated or informational services.

But how do two completely different subsystems work together? One way to make this dual-process approach work is to have two versions of the chatbot running in tandem. User input will be fed into both versions, also the response generated by one system will be feed into another system, so that both systems can have a complete conversation history. Of course, we need to figure out a way to model the capabilities of at least one system, so that we can dispatch the user input to the right subsystem.

## Parting words:
While LLMs have shown great potential in solving various problems, their abilities will always be limited by what is encoded in the training datasets. In cases where there is an abundance of labeled data, such as from historical manual records, LLMs can reduce the barrier to creating System 1 chatbot to serve your users. However, when data is not yet available or when you want to differentiate from common practices, software 1.0 development will still be the way to go. Using both approaches to building chatbots allows you to create a great conversational experience in a cost-effective fashion, maximizing the return on your investment.