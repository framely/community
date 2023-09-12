---
layout: home
title: OpenCUI
hero:  
  name: ChatGPT for your user-facing product
  tagline: Help every user get value from your application, as if they are power users.
  actions:
    - theme: brand
      text: Start to Build
      link: https://build.opencui.io
      type: primary

contentCards:
  - title: Handle every user request, transactional or informational
    details: Automatically switching between dependable software and flexible LLMs, our dual-process approach always deliver good conversational experience.
    image: images/system1.png
    left: true
  - title: No training, hotfixable dialog understanding
    details: Using the same technology behind ChatGPT, labeling training data for each additional intent is a thing of past, now you can focus on business logic.
    image: images/language.png
    left: false
  - title: No more flow-based interaction logic
    details: Enumerating all possible conversation flow can create good user experience but with too high a cost. Schema based interaction logic changes that.  
    image: images/schema.png
    left: true

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
