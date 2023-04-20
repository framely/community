---
layout: home
title: OpenCUI
hero:
  image: 
    src: images/hero.png
    alt: VitePress
  tagline: Time to deliver personalized services, via chat.
  text: Type-based Approach for Chatbot Development
  actions:
    - theme: brand
      text: Start to Build
      link: https://build.opencui.io
      type: primary
    - theme: alt
      text: Learn More
      link: /guide/
      type: secondary
features:
  - title: CUI for your APIs
    details: Building valuable services is hard, and we can not help with that. But if you already have APIs, building conversational user interface for it should be easy, with OpenCUI.
    icon: 
      src: /images/featureIcons/cui.svg
  - title: Separation of Concerns
    details: Decompose chatbot building into multiple concerns like service, interaction and language perception, so different aspects can be handled by different people.
    icon: 
      src: /images/featureIcons/separate.svg
  - title: Component-Based
    details: Never build from scratch, build complex behavior by reusing black-box components, so you can focus on what you want instead of how to implement it.
    icon: 
      src: /images/featureIcons/component.svg
  - title: Hot Fixable NLU 
    details: Accuracy is not the most important metric when it comes to dialog understanding. To deploy a chatbot into production, every thing need to be hot fixable by the operation team.
    icon: 
      src: /images/featureIcons/hotfix.svg
  - title: Open Source Runtime
    details: Reactjs enables teams to focus on their application dependent interaction logic, instead of reinventing wheels. OpenCUI is doing the same for chatbots. 
    icon: 
      src: /images/featureIcons/open-source-line.svg
  - title: Universal Messages
    details: Omnichannel made easy, the universal messages you defined once will get automatically translated into native message for each channel.  
    icon: 
      src: /images/featureIcons/universal-message.svg
  - title: Support 
    details: Ran into conversations that bot can't handle, hand over to live agent with skill based routing, integration with any contact center software.
    icon: 
      src: /images/featureIcons/support.svg
  - title: Multi-language Ready
    details: The same interaction logic should be shared between all the different languages, so that you can use people with entirely different skillsets for this. 
    icon: 
      src: /images/featureIcons/multi-language.svg
  - title: Fully Extensible
    details: The chatbot defined on the OpenCUI are generated into kotlin code, which makes it easy to integrate with any channel, support and services, take full advantage of java/kotlin ecosystem.
    icon: 
      src: /images/featureIcons/raw-code.svg


cta :
  - details: Import what you need, customize and deploy.
    title: Get Started
    link: /guide/
    

footerHtml: true 
---

<script setup>
  import Footer from './components/footer/footer.vue';
  import Cta from './components/cta/callToAction.vue';
</script>
<Cta :frontmatter="[
  {
    details: 'Import what you need, customize and deploy.',
    title: 'Get Started',
    link: '/guide/'
  }
]"
/>
<Footer />