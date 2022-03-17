---
title: Background Knowledge
---

# Background knowledge
### Abbreviation
#### CUI
Conversational user interface
#### CUX
Conversational user experience
#### GUI
Graphical user interface
#### SQL
Structure query language
#### RDBMS
Relational database management system
#### API
Application programming interface, typically in restful.

### Imperative
Builders describe to computer how things are done

### Declarative
Builders describe to computer what are needed and computer figure out how to do it.


### Syntax
The arrangement rules of words and phrases to create well-formed sentences in a language.

### Semantics
The meaning of a word, phrase, sentence, or text without context. In Framely, the semantics is defined semantic frames, or just frames.\

### Pragmatics
Study of how context contributes to meaning, or meaning under context. We use the frame to express meaning under context as well.

### Cooperative principle
This assume users are engaged in the conversation with bot for a common goal: user want to access some services that bot want to provide, thus it is user's interest to get what they want in lowest effort possible.

### Interaction logic
Defines how interaction should be carried out based on users input event.\

### Application logic
Also known as business logic or more commonly service, defines how services should be delivered based on the user requirement (aggregated user input). It is very common that interaction logic reflects underlying application logic.

### Frontend
User interacting application are commonly partitioned into frontend and backend. Where frontend manages the user interaction, and backend models data and application logic. And backend and frontend communicate via predefined-defined APIs. Frontend includes presentation layer and interaction logic layer, or frontend can also be partitioned into schema level and language level.

### Backend
Framely assume backend hosts all the data and application logic for different frontends, chatbot is one such frontend. Backend are typically just implementation of restful APIs on top of database. Popular open source databases includes mysql and postgresql. Backend can be thought provider for services (or implemented the function declared in the services)

### Chatbot
An end user facing application or CUI frontend, user can access information and service through conversations in text or voice instead of a graphical user interface. All user facing application can be generally built in three layers: language, interaction and schema.