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
    cards: [{package:'STARTER',
      price: '$99',
      badge: 'per year',
      tagline: 'For designers and freelancers, who want building and sharing',
      features: [
        'Public projects',
        'Public libraries',
        'CUI components',
        'Multiple language',
        'Hosting backoffice',
        'Basic NLU model',
        'Community Support'
      ],
      buttonText: 'Start building',
      link: 'https://build.opencui.io'
    },{package:'TEAMS',
      price: '$500',
      badge: 'per seat / mo',
      tagline: 'For growing teams and agencies who want stronger permissions',
      features: [
        'Unlimited agents',
        'Larger, purpose built NLU',
        'Channel integration',
        'Multiple language',
        'Export agents',
        'Advanced security',
        'Priority support'
      ],
      buttonText: 'Add plan',
      link: 'https://build.opencui.io'
    },{package:'ENTERPRICE',
      price: 'Custom',
      // badge: 'per user / year',
      tagline: 'For those needing  an enterprise-grade solution',
      features: [
        'Unlimited knowledge base sources',
        'Private cloud hosting',
        'Bring your own LLM',
        'Custom Integrations',
        'Migration services',
        'Custom contracting'
      ],
      buttonText: 'Contact Sales',
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
