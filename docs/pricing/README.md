---
aside: false
layout: home
---
<script setup>
  import Pricing from '../components/pricing/pricing.vue';
</script>

<Pricing :frontmatter="{
    title:'Conversational experience that works.',
    tagline: `When the wave arrives and you don't want to be left behind, all you have to do is pick up the right tools and start to build.`,
    cards: [{package:'Builder',
      price: '$0',
      badge: 'per user / year',
      tagline: 'For these who want to build CUI the right way and share what they build.',
      features: ['Public Projects',
        'Public Libraries',
        'CUI Components',
        'Multiple Language',
        'Hosting Backoffice',
        'Basic NLU Model',
        'Development environment',
        'Community Support'
      ],
      buttonText: 'Start to build',
      link: 'https://build.opencui.io'
    },{package:'Business',
      price: 'Custom',
      // badge: 'per user / year',
      tagline: 'Beside services, you just need a conversational experience product owner.',
      features: ['Everything included in Starter and: ',
        'Larger, purpose built NLU Model',
        'Channel integration',
        'Private deploy',
        'OpenCUI hosting in production environment',
        'Custom Integrations',
        'Advanced security, performance and customer success'
      ],
      buttonText: 'What are you waiting for?',
      link: 'https://build.opencui.io'
    }]
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
      tagline: Beside services, you just need a conversational experience product owner.
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
