---
layout: home
title: OpenCUI
hero:  
  name: ChatGPT for your user-facing product
  tagline: Help every user get value from your application, as if they are power users.

Core
  image: 
    src: images/copilot_hero.png
    alt: OpenCUI
  actions:
    - theme: brand
      text: Start to Build
      link: https://build.opencui.io
      type: primary
features:
  - title: 💬 CUI for your APIs
    details: Building valuable services is hard, and we can not help with that. But if you already have APIs, building conversational user interface for it should be easy, with OpenCUI.
  - title: 💡 Separation of Concerns
    details: Decompose chatbot building into multiple concerns like service, interaction and language perception, so different aspects can be handled by different people.
  - title: 📦 Component-Based
    details: Never build from scratch, build complex behavior by reusing black-box components, so you can focus on what you want instead of how to implement it.
  - title: ⚡️ Hot Fixable NLU 
    details: Accuracy is not the most important metric when it comes to dialog understanding. To deploy a chatbot into production, every thing need to be hot fixable by the operation team.
  - title: 💟 Open Source Runtime
    details: Reactjs enables teams to focus on their application dependent interaction logic, instead of reinventing wheels. OpenCUI is doing the same for chatbots. 
  - title: 🚀 Universal Messages
    details: Omnichannel made easy, the universal messages you defined once will get automatically translated into native message for each channel.  
  - title: 👤 Support 
    details: Ran into conversations that bot can't handle, hand over to live agent with skill based routing, integration with any contact center software.
  - title:  🌐 Multi-language Ready
    details: The same interaction logic should be shared between all the different languages, so that you can use people with entirely different skillsets for this.
  - title: 🛠️ Fully Extensible
    details: The chatbot defined on the OpenCUI are generated into kotlin code, which makes it easy to integrate with any channel, support and services, take full advantage of java/kotlin ecosystem.

contentCards:
  - title: Dual process
    details: The future of chatbots will likely be a dual-process system that combines traditional software engineering with LLMs, depending on the use case.
    image: images/system1.png
    left: true
  - title: LLM based DU
    details: Accuracy is not the most important metric when it comes to dialog understanding. To deploy a chatbot into production, every thing need to be hot fixable by the operation team.
    image: images/language.png
    left: false
  - title: Schema based
    details: The separation of concerns in three-layered approach allows you to focus on specific tasks without worrying about the implementation details of other modules or layers, which can lead to more efficient development, easier debugging, greater code reuse, and reduced costs.
    image: images/schema.png
    left: true
  - title: Component based for reuse
    details: Never build from scratch, build complex behavior by reusing black-box components, so you can focus on what you want instead of how to implement it. 
    image: images/interaction.png
    left: false

cta :
  - details: Import what you need, customize and deploy.
    title: Get Started
    link: /reference/guide/index

---

<script setup>
  import Cta from './components/cta/callToAction.vue'
  import contentCard from './components/contentCard/ContentCard.vue'
</script>
<contentCard />
<Cta />
