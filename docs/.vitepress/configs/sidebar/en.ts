
export const en = {
  '/essentials/': [
    {
      text: "Why OpenCUI",
      items: [
        { text: 'Cost-effective conversational experience', link: '/essentials/' },
        { text: 'Cooperative principle', link: '/essentials/cooperative' },
        { text: '5 levels of CUI', link: '/essentials/5levels-cui' },
        { text: 'Open sourced runtime', link: '/essentials/architecture' },
        { text: 'Document CUI design', link: '/essentials/document-requirement-for-cui' },
        {
          text: 'Dialog Understanding',
          items: [
            { text: '1: A ChatGPT reset', link: '/essentials/du/chatgpt-reset' },
            { text: '2: Theory', link: '/essentials/du/du-theory' },
            { text: '3: Towards zero shot', link: '/essentials/du/towards-zero-shot' },
            { text: '4: New formulations', link: '/essentials/du/new-formulations' },
            { text: '5: Tuning strategy', link: '/essentials/du/tuning-strategy' },
            { text: '6: Maintainable accuracy', link: '/essentials/du/maintainable-accuracy' },
          ],
        },
      ]
    }
  ],
  '/guide/': [
    {
      text: 'Quickstart',
      items: [
        { text: 'Sign up', link: '/guide/signingup' },
        { text: 'Clone an echo chatbot', link: '/guide/clone-simple-chatbot' },
        { text: 'Build an echo chatbot', link: '/guide/build-simple-chatbot' },
        { text: 'Reuse an hours module', link: '/guide/reuse-component' },
        { text: 'Build an hours module', link: '/guide/build-module' },
        { text: 'Build an hours provider', link: '/guide/build-provider' },
        { text: 'Deploy a chatbot', link: '/guide/deploy-to-channel' },
        { text: 'Get a team', link: '/guide/are-you-ready' },
        { text: 'OpenCUI workflow', link: '/guide/opencui-flow' },
        { text: 'Key concepts', link: '/guide/concepts' },
      ],
    }
  ],
  '/reference/': [
    {
      text: 'Dialog Annotations',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/reference/annotations/overview' },
        { text: 'Fill strategy', link: '/reference/annotations/fillstrategy' },
        { text: 'Initialization', link: '/reference/annotations/init' },
        { text: 'Value recommendation', link: '/reference/annotations/valuerec' },
        { text: 'Value check', link: '/reference/annotations/valuecheck' },
        { text: 'Confirmation', link: '/reference/annotations/confirmation' },
        { text: 'State transition', link: '/reference/annotations/transition' },
      ],
    },
    {
      text: 'Providers',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/reference/providers/overview' },
        { text: 'Native provider', link: '/reference/providers/native' },
        { text: 'PostgreSQL provider', link: '/reference/providers/postgrest' }
      ]
    },
    {
      text: 'Channels',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/reference/channels/overview' },
        { text: 'Universal Channel', link: '/reference/channels/universalmessage' },
        { text: 'Google Business Message', link: '/reference/channels/googlebusiness' },
        { text: 'Messenger', link: '/reference/channels/messenger' },
        { text: 'WhatsApp', link: '/reference/channels/whatsapp' },
      ],
    },
    {
      text: 'Supports',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/reference/support/overview' },
        { text: 'Chatwoot', link: '/reference/support/Chatwoot' }
      ],
    },
    {
      text: "Extensions",
      link: '/reference/providers/extension',
    },
    {
      text: 'CUI Components',
      collapsed: false,
      items: [
        { text: 'System CUI components', link: '/reference/annotations/systemcomponent' },
        {
          text: 'Date picker',
          link: '/reference/plugins/components/datepicker/',
          collapsed: true,
          items: [
            { text: 'CUI design', link: '/reference/plugins/components/datepicker/datepicker-design' }
          ],
        },
      ],
    },
    {
      text: 'Conversation Design',
      collapsed: false,
      items: [
        { text: 'Conversation Design', link: '/reference/conversation-design/conversation-design' },
        { text: 'Gathering requirements', link: '/reference/conversation-design/gathering-requirements' },
        { text: 'Design interactions', link: '/reference/conversation-design/design-interactions' },
        { text: 'Key use cases', link: '/reference/conversation-design/key-use-cases' },
      ]
    },
    {
      text: 'Platform',
      collapsed: false,
      items: [
        { text: 'Multilingual', link: '/reference/platform/multilingual' },
        { text: 'Testing', link: '/reference/platform/testing' },
        { text: 'Deployment', link: '/reference/platform/deployment' },
        { text: 'Version control', link: '/reference/platform/versioncontrol' },
        { text: 'Access control', link: '/reference/platform/access' },
        { text: 'Reusability', link: '/reference/platform/reusability' }
      ]
    },
    {
      text: "Glossary",
      link: '/reference/glossary'
    }
  ],
  '/policy/': [
    {
      text: 'Terms of service',
      link: '/policy/terms'
    },
    {
      text: 'Privacy policy',
      link: '/policy/privacy'
    }
  ]
}
