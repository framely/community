---
home: true
title: Home
heroImage: /images/hero.png
tagline: Schema grounded Chatbots for any Services
heroText: Open Frontend Framework for Chatbot Development
actions:
  - text: Start to Build
    link: https://build.opencui.io
    type: primary
  - text: Learn More
    link: /guide/getting-started.html
    type: secondary
features:
  - title: CUI for your APIs
    details: Building valuable services is hard, and we can not help with that. But if you already have APIs, building conversational user interface for it should be easy, with OpenCUI.
    icon: /images/featureIcons/cui.svg
  - title: Separation of Concerns
    details: Decompose chatbot building into multiple concerns like service, interaction and language perception, so different aspects can be handled by different people.
    icon: /images/featureIcons/separate.svg
  - title: Declarative
    details: Focus on what is the desired behavior for your chatbot instead of how such behavior should be implemented imperatively, you got OpenCUI for that. 
    icon: /images/featureIcons/declarative.svg
  - title: Component-First
    details: Never build from scratch, build complex behavior using imported components, so you can focus on what matters most for your business.
    icon: /images/featureIcons/component.svg
  - title: Hot Fixable NLU 
    details: Accuracy is not the most important metric when it comes to dialog understanding. To deploy a chatbot into production, every thing need to be hot fixable by the operation team.
    icon: /images/featureIcons/hotfix.svg
  - title: Open Source Runtime
    details: Reactjs enables teams to focus on their application dependent interaction logic, instead of reinventing wheels. OpenCUI is doing the same for chatbots. 
    icon: /images/featureIcons/open-source-line.svg
  - title: Universal Messages
    details: Omnichannel made easy, the universal messages you defined once will get automatically translated into native message for each channel.  
    icon: /images/featureIcons/universal-message.svg
  - title: Support 
    details: Ran into conversations that bot can't handle, hand over to live agent with intent based routing, integration with any contact center software.
    icon: /images/featureIcons/support.svg
  - title: Multi-language Ready
    details: The same interaction logic should be shared between all the different languages, so that you can use people with entirely different skillsets for this. 
    icon: /images/featureIcons/multi-language.svg
  - title: Fully Extensible
    details: The chatbot defined on the OpenCUI are generated into kotlin code, which makes it easy to integrate with any channel, support and services, take full advantage of java/kotlin ecosystem.
    icon: /images/featureIcons/raw-code.svg

contentCards:
  - title: Start with API Schema
    details: The services that you want to expose is uniquely defined by API schema, which on one hand, capture the data type of the input and output parameter, and signature of the function, and on the other hand, represent the meaning user expression in the utterances. 
    image: /images/schema.png
    left: true
  - title: Declare Interaction Logic
    details: Schema defines what information we need to collect from a user in order to deliver the desired user experience. The interaction logic is driven by business logic and goals. OpenCUI provides a set of interaction annotation which a builder can use declaratively to describe what conversational experience they want to provide, and OpenCUI runtime will take care of the rest.
    image: /images/interaction.png
    left: false
  - title: Link Utterances to Semantics 
    details: Natural language utterances in the different languages is translated to and from schema event by OpenCUI dialog understanding and module. To control the language perception related behavior, the builder only needs to touch the language part of the relevant interaction annotation, by providing exemplars for user utterance and template for bot messaging. No machine learning (ML) and natural language understanding (NLU) training is needed, certainly no need for a Ph.D hire.
    image: /images/language.png
    left: true

cta :
  - details: Build conversational interface for your APIs.
    title: Get Started
    link: https://build.opencui.io
    
mainfooter:
  - firstgrid:
      - title: Product
        links:
          - link: /database
            text: Component
          - link: /auth
            text: Chatbot
          - link: /storage
            text: Service
          - link: /functions
            text: Provider
          - link: /pricing
            text: Runtime
      - title: Resources
        links:
          - link: /guide/cooperative.html
            text: Cooperative Principle
          - link: /guide/sgcui.html
            text: Schema Grounded
          - link: /guide/5levels-cui.html
            text: 5 Levels of CUI
          - link: /guide/components.html
            text: CUI Component
          - link: /guide/architecture.html
            text: Under the Hood
  - secondgrid:
      - title: Builder
        links:
          - link: /guide/
            text: Guide
          - link: /reference/
            text: Reference
          - link: https://github.com/framely/community/discussions
            text: Community
          - link: https://github.com/framely/community/issues
            text: Issues
      - title: Company
        links:
          - link: https://opencui.medium.com/
            text: About
          - link: https://opencui.medium.com/
            text: Blog
          - link: /storage
            text: Career
          - link: https://framely.webflow.io/contact
            text: Contact

footerHtml: true 
---


