
export const en = {
  '/essentials/': [
    {
      text: "Why OpenCUI",
      collapsed: false,
      items: [
        { text: 'Cost-effective conversational experience', link: '/essentials/README.md' },
        { text: 'Cooperative principle', link: '/essentials/cooperative.md' },
        { text: '5 levels of CUI', link: '/essentials/5levels-cui.md' },
        { text: 'Open sourced runtime', link: '/essentials/architecture.md' }
      ]
    }
  ],
  '/guide/': [
    {
      text: 'Quickstart',
      items: [
        { text: 'Cost-effective conversational experience', link: '/guide/signingup' },
        { text: 'Cost-effective conversational experience', link: '/guide/clone-simple-chatbot.md' },
        { text: 'Cost-effective conversational experience', link: '/guide/build-simple-chatbot.md' },
        { text: 'Reuse a full-stack component', link: '/guide/reuse-component.md' },
        { text: 'Cost-effective conversational experience', link: '/guide/build-module.md' },
        { text: 'Cost-effective conversational experience', link: '/guide/build-provider.md' },
        { text: 'Cost-effective conversational experience', link: '/guide/deploy-to-channel.md' },
        { text: 'Cost-effective conversational experience', link: '/guide/opencui-flow.md' },
        { text: 'Cost-effective conversational experience', link: '/guide/concepts.md' },
      ],
    }
  ],
  '/reference/': [
    {
      text: 'Got team?',
      link: '/reference/are-you-ready.md',
    },
    {
      text: 'Dialog Annotations',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/reference/annotations/overview.md' },
        { text: 'Fill strategy', link: '/reference/annotations/fillstrategy.md' },
        { text: 'Initialization', link: '/reference/annotations/init.md' },
        { text: 'Value recommendation', link: '/reference/annotations/valuerec.md' },
        { text: 'Value check', link: '/reference/annotations/valuecheck.md' },
        { text: 'Confirmation', link: '/reference/annotations/confirmation.md' },
        { text: 'State transition', link: '/reference/annotations/transition.md' },
      ],
    },
    {
      text: 'Providers',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/reference/providers/overview.md' },
        { text: 'Native provider', link: '/reference/providers/native.md' },
        { text: 'PostgreSQL provider', link: '/reference/providers/postgrest.md' }
      ]
    },
    {
      text: 'Channels',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/reference/channels/overview.md' },
        { text: 'Universal Channel', link: '/reference/channels/universalmessage.md' },
        { text: 'Google Business Message', link: '/reference/channels/googlebusiness.md' },
        { text: 'Messenger', link: '/reference/channels/messenger.md' },
        { text: 'WhatsApp', link: '/reference/channels/whatsapp.md' },
      ],
    },
    {
      text: 'Supports',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/reference/support/overview.md' },
        { text: 'Chatwoot', link: '/reference/support/Chatwoot.md' }
      ],
    },
    {
      text: "Extensions",
      link: '/reference/providers/extension.md',
    },
    {
      text: 'CUI Components',
      collapsible: true,
      items: [
        { text: 'System CUI components', link: '/reference/annotations/systemcomponent.md' },
        {
          text: 'Date picker',
          link: '/reference/plugins/components/datepicker/README.md',
          collapsible: true,
          items: [
            { text: 'CUI design', link: '/reference/plugins/components/datepicker/datepicker-design.md' }
          ],
        },
      ],
    },
    {
      text: 'Platform',
      collapsible: true,
      items: [
        { text: 'Multilingual', link: '/reference/platform/multilingual.md' },
        { text: 'Testing', link: '/reference/platform/testing.md' },
        { text: 'Deployment', link: '/reference/platform/deployment.md' },
        { text: 'Version control', link: '/reference/platform/versioncontrol.md' },
        { text: 'Access control', link: '/reference/platform/access.md' },
        { text: 'Reusability', link: '/reference/platform/reusability.md' }
      ]
    },
    {
      text: "Glossary",
      link: '/reference/glossary.md'
    }
  ],
  '/policy/': [
    {
      text: 'Terms of service',
      link: '/policy/terms.md'
    },
    {
      text: 'Privacy policy',
      link: '/policy/privacy.md'
    }
  ]
}
