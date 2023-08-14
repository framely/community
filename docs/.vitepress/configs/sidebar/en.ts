
export const en = {
  '/essentials/': [
    {
      text: "Why OpenCUI",
      items: [
        { text: 'Dual process', link: '/essentials/dual-process' },
        { text: 'Schema-guided conversational experiences', link: '/essentials/' },
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
  '/copilot/': [
    {
      text: 'Copilot',
      items: [
        { text: 'Why copilot', link: '/copilot/why-copilot' },
        {
          text: 'How to develop copilot',
          items: [
            { text: 'Overview', link: '/copilot/overview' },
            { text: 'Build copilot', link: '/copilot/build-copilot' },
            { text: 'Integrate with copilot', link: '/copilot/opencui-sdk' },
          ],
        },
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
      text: 'System CUI Components',
      link: '/reference/annotations/systemcomponent',
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
      text: 'Conversation Design',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/reference/conversation-design/conversation-design' },
        { text: 'Get started', link: '/reference/conversation-design/get-started' },
        { text: 'Gathering requirements', link: '/reference/conversation-design/gathering-requirements' },
        { text: 'Design interactions', link: '/reference/conversation-design/design-interactions' },
        { text: 'Key use cases', link: '/reference/conversation-design/key-use-cases' },
        { text: 'Test and iterate', link: '/reference/conversation-design/test-and-iterate' },
        { text: 'Design for the long tail', link: '/reference/conversation-design/design-for-long-tail' },
        { text: 'Scale your design', link: '/reference/conversation-design/scale-your-design' },
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
