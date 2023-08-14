# Overview

OpenCUI is a practical framework for building applications with a conversational user interface. At a high level, 
it adopts a dual-process approach, utilizing Language Models (LLMs) to address informational or low-impact queries
through prompt engineering. For high-impact and transactional queries, it relies on software engineering. 
Through the integration of LLM-based dialog understanding and schema-based interaction logic, 
OpenCUI facilitates cost-effective development of natural and reliable conversational experiences.

OpenCUI is specially designed to aid in building 'copilots,' which function as conversational companions for your
existing apps. Unlike regular chatbots that directly trigger backend APIs upon request, copilots provide information 
and frontend action buttons to guide users through app interactions. This allows you to address existing UX issues 
without the need to rebuild everything for a conversational user interface. As copilots respond to natural language
requests, they eliminate the steep learning curve typically associated with feature-rich applications. Furthermore, 
copilots offer context-dependent assistance, reducing the effort required for both new and casual users to derive
value from your application.

:::info The process of handling user query
![How copilot works](/images/copilot/process.png)
:::

The user query handling process involves the following steps:
1. When the **user** sends text to the **copilot frontend**, the **app frontend** will send context to the **copilot frontend**.
2. The **copilot frontend** passes the user query to the **copilot backend**.
3. Based on the predefined skills, the **copilot backend** responds with relevant text and suggested actions to the **copilot frontend**.
4. The **copilot frontend** displays the text and suggested actions to the **user**.
5. The **user** selects and performs a specific suggested action.
6. The **copilot frontend** executes the action within the **app frontend**.

Copilot is typically developed using the same client/server architecture: there will be copilot frontend that coexists
with your app's frontend, and then there will be a copilot backend, or simply a special chatbot that you can build 
using OpenCUI. To develop a copilot, or conversational companion for your application, you just need to follow four 
steps:
1. **Define/implement API for copilot**: This includes how to describe the context, and what actions can your 
   application perform.
2. **Build copilot backend**: This can be done by attaching dialog annotations to function schemas to so 
   that 
   copilot follows the desired interaction logic.
3. **Build copilot frontend**: Implement copilot frontend by integrating with OpenCUI SDK to interact with copilot 
   backend.
