
export const en = {
  '/essentials/': [
    {
      text: "Why OpenCUI",
      collapsed: false,
      items: [
        { text: 'Cost-effective conversational experience', link: '/essentials/README.md' },
        { text: 'Cooperative principle', link: '/essentials/cooperative.md' },
        { text: '5 levels of CUI', link: '/essentials/5levels-cui.md' },
        { text: 'Open sourced runtime', link: '/essentials/architecture.md' },
        { text: 'Document CUI design', link: '/essentials/document-requirement-for-cui.md' }
      ]
    }
  ],
  '/guide/': [
    {
      text: 'Quickstart',
      items: [
        { text: 'Sign up', link: '/guide/signingup' },
        { text: 'Clone a simple chatbot', link: '/guide/clone-simple-chatbot.md' },
        { text: 'Build a simple chatbot', link: '/guide/build-simple-chatbot.md' },
        { text: 'Reuse a simple module', link: '/guide/reuse-component.md' },
        { text: 'Build a simple module', link: '/guide/build-module.md' },
        { text: 'Build a simple provider', link: '/guide/build-provider.md' },
        { text: 'Deploy a chatbot', link: '/guide/deploy-to-channel.md' },
        { text: 'OpenCUI workflow', link: '/guide/opencui-flow.md' },
        { text: 'Key concepts', link: '/guide/concepts.md' },
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
