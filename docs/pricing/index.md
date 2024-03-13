---
aside: false
layout: home
---
<script setup>
  import Pricing from '../components/pricing/pricing.vue';
</script>

<Pricing :pricingPlan="{
    title:'Dependable conversation your user deserves',
    tagline: `Pick up the right tools and start to build.`,
    cards: [
      {
        package:'Starters',
        price: '$19',
        badge: 'per seat/mo',
        tagline: 'For freelancers, who want to build and earn.',
        features: [
          'Single builder',
          'Public chatbots',
          'Public modules',
          'Test access only',
          'Single language',
          'Basic database backend',
          'Basic NLU model',
          'Basic Support',
        ],
        buttonText: 'Start 14-day trial',
        link: 'https://build.opencui.io'
      },
      {
        package:'Teams',
        price: '$199',
        badge: 'per seat/mo',
        tagline: 'For teams and agencies who take on bigger challenges.',
        features: [
          'Multiple builders',
          'Private chatbots',
          'Private modules',
          'Dual process support',
          'Larger NLU model',
          'Text-to-code support',
          'Channel integrations',
          'Contact center integration',
          'Multiple languages',
          'Priority support',
          'Addiitonal hosting package'
        ],
        buttonText: 'Add plan',
        link: 'https://build.opencui.io'
      },
      {
        package:'Enterprise',
        price: 'Custom',
        // badge: 'per seat/ year',
        tagline: 'For companies that want the ultimate conversational experience.',
        features: [
          'Unlimited knowledge base sources',
          'Private cloud hosting',
          'Bring your own LLM',
          'Export chatbots',
          'Custom Integrations',
          'Named support',
          'Custom contracting',
          'Advanced security',
        ],
        buttonText: 'Contact Sales',
        link: 'https://build.opencui.io'
      }
    ]
  }" 
/>

<!-- <Footer /> -->

<!-- ---
layout: pricing
title: Conversational experience that works.
tagline: When the wave arrives and you don't want to be left behind, all you have to do is pick up the right tools and start to build.
cards:
    - package: Builder
      price: $0
      badge: per user / year
      tagline: For these who want to build CUI the right way and share what they build.
      features:
                -  Public Projects
                -  Public Libraries
                -  CUI Components
                -  Multiple Language
                -  Hosting Backoffice
                -  Basic NLU Model
                -  Development environment
                -  Community Support
      buttonText: Start to build
      link: https://build.opencui.io

    - package: Business
      price: Custom
      badge: 
      tagline: Give us APIs that you want to expose conversationally along with conversational interaction design, we take care the rest.
      features:
                - 'Everything included in Starter and: '
                - Larger, purpose built NLU Model
                - Channel integration
                - Private deploy
                - OpenCUI hosting in production environment
                - Custom Integrations
                - Advanced security, performance and customer success
      buttonText: What are you waiting for?
      link: https://build.opencui.io

--- -->
