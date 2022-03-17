---
title: Conceptual Model
---


# Conceptual Model

### Runtime
The core of chatbot is to build common understanding of what user want through conversation, connect user to the right service and generate the natural text for channel to rendering to user.  These core functionalities are provided by Framely runtime as APIs, so each chatbot can focus on what information to collect and leave the actually information collect to runtime. Runtime also contains session management and dispatcher.

### Dialog manager(DM)
Dialog manager is brain of the chatbot, and is responsible for calling DU with generated dialog expectation to get the frame event, and consult the dialog annotations to decide how to respond to user (in term of semantic frames and language independent way) for next turn, and use text generator to translate the frame into natural text reply in the language that user speaks. Turn by turn, dialog manger will figure out what user wants, and connect user with the service they care. Runtime is a fully decomposed system, with DM operating solely on DU output, and given DU output, DM output is entirely independent of user utterance, and given DM output, text generation is independent of DU output(DM input). This is important to make DM language independent.

### Dialog understanding (DU)
A major part of runtime is convert what user said into semantic structure representation, or frame, given the dialog expectation. In Framely, DU is fully controlled by the context dependent expression exemplars, for both initial design and hot fix.

### Dialog expectation
Information can be used to change how user utterance be understood. For example, if DU expect a song name, then "Beijing welcome you" will be recognized as a song and "Beijing" in there will not be recognized as city; if DU does not expect a song name, "Beijing" in there should be recognized as city. Dialog is used to summarize the conversational history so far, in term of understanding, or given dialog expectation, the conversational history does not provide additional useful information toward understanding of the user input for the current turn. Dialog expectation is automatically used by DU for this purpose, and builder does not need to worry about it.

### Frame event
The semantic structure representing what user said, converted by DU under given dialog  expectation. The Frame event can be at semantic level or pragmatic level.

### Text generation
To be able to easily interact with users in different language, we use text generation module to translate the same semantics into different natural text. For now we focus on the template based generation.

### Session Manager
This is used to manage the user session, so that each turn contains all the history information.

### Session
A session is a series of back and forth turns between user and chatbot to address user's needs at some point in time. Session can be started by user or chatbot (but do not be confused with who will have the first message, it is possible chatbot have the first message in the session that is started by user, particularly for live chat cases), and it has a closure, explicitly (by mutual agreement) or implicitly (by time out). There can be many sessions between chatbot and a particular user over time.

### Dispatcher
This manages the messages from channels and decide whether it is chatbot or human supports is responsible for the conversation.