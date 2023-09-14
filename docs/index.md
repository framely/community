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
  - title: Handle Every User Request, Transactional or Informational
    details: Automatically switching between dependable software and flexible LLMs, our dual-process approach always deliver cost-effective conversational experience for both your APIs and content.
    image: images/system1.png
    left: true
  - title: Understand Dialog with Zero or Few-Shot Learning
    details: Labeling training data for each additional intent is slow, expensive, and now unnecessary with LLMs. Without this step, you can focus on business logic and move at warp speed.
    image: images/language.png
    left: false
  - title: Focus on Service with Schema-based Interaction Logic 
    details: Enumerating all possible conversation flows imperatively often results in a poor user experience and high costs. Schema-based declarative interaction logic changes that.
    image: images/schema.png
    left: true

cta :
  - details: Import what you need, customize and deploy.
    title: Get Started
    link: /reference/guide/index

columnFooter :
  - title: OpenCUI
    tagline: ChatGPT for your user-facing product
    logo: /images/logo.png
    footerItems:
      - title: Social
        items:
          - text: Medium
            link: https://medium.com/opencui-official
          - text: LinkedIn
            link: https://www.linkedin.com/company/10969501/
      - title: Legal
        items:
          - text: Terms of Service
            link: /policy/terms
          - text: Privacy policy
            link: /policy/privacy

---

<script setup>
  import Cta from './components/cta/callToAction.vue'
  import ContentCard from './components/contentCard/ContentCard.vue'
  import Video from './components/video/videoSection.vue'
  import CFooter from './components/footer/columnFooter.vue'
</script>

<Video />
<ContentCard />
<Cta />
<CFooter />