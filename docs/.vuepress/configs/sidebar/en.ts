
export const en = {
  '/guide/': [
    {
      text: 'Schema Grounded Approach',
      children: [
        '/guide/README.md',
        '/guide/are-you-ready.md',
        '/guide/getting-started.md',
        '/guide/pingpong.md'
      ],
    },
    {
      text: "Essentials",
      children: [
        '/guide/concepts.md',
        '/guide/cooperative.md',
        '/guide/sgcui.md',
        '/guide/5levels-cui.md',
        '/guide/slotfilling.md',
        '/guide/components.md',
        '/guide/architecture.md'
      ]
    },
    {
      text: "Glossary",
      link: '/guide/glossary.md',

    }
  ],
  '/reference/': [
    {
      text: 'CUI Components',
      icon:"/featureIcons/cui.svg",

      collapsible: true,

      children: [
        '/reference/annotations/overview.md',
        '/reference/annotations/init.md',
        '/reference/annotations/fillstrategy.md',
        '/reference/annotations/valuerec.md',
        '/reference/annotations/valuecheck.md',
        '/reference/annotations/confirmation.md',
        '/reference/annotations/transition.md',
        '/reference/annotations/systemcomponent.md'
      ],
    },
    {
      text: 'Providers',
      collapsible: true,
      children: [
        '/reference/providers/overview.md',
        '/reference/providers/postgrest.md',
        '/reference/providers/googlesheets.md'
      ]
    },
    {
      text: 'Channels',
      collapsible: true,
      children: [
        '/reference/channels/overview.md',
        '/reference/channels/universalmessage.md',
        '/reference/channels/googlebusiness.md',
        '/reference/channels/messenger.md',
        '/reference/channels/whatsapp.md',
        '/reference/channels/wpa.md'
      ],
    },
    {
      text: 'Supports',
      collapsible: true,
      children: [
          '/reference/support/overview.md',
          '/reference/support/Chatwoot.md'
      ],
    },
    {
      text: 'Platform',
      collapsible: true,
      children:[
        '/reference/platform/signingup.md',
        '/reference/platform/multilingual.md',
        '/reference/platform/testing.md',
        '/reference/platform/deployment.md',
        '/reference/platform/versioncontrol.md',
        '/reference/platform/access.md',
        '/reference/platform/reusability.md'
      ]
    },
  ],
}
