
export const en = {
  '/guide/': [
    {
      text: 'Schema Grounded Approach',
      children: [
        '/guide/README.md',
        '/guide/are-you-ready.md',
        '/guide/getting-started.md',
      ],
    },
    {
      text: "Key Concepts",
      link: '/guide/concepts.md',
    },
    {
      text: "Essentials",
      children: [
        '/guide/cooperative.md',
        '/guide/sgcui.md',
        '/guide/5levels-cui.md',
        '/guide/slotfilling.md',
        '/guide/components.md',
        '/guide/architecture.md',
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
      ],
    },
    {
      text: 'Provider',
      collapsible: true,
      children: [
        '/reference/annotations/providerannot.md',
      ]
    },
    {
      text: 'Channel Reference',
      collapsible: true,
      children: [
        '/reference/channels/wpa.md',
        '/reference/channels/messenger.md',
        '/reference/channels/whatsapp.md',
      ],
    },
    {
      text: 'Support Reference',
      collapsible: true,
      children: [
          '/reference/support/overview.md',
          '/reference/support/Chatwoot.md',
      ],
    },
  ],
}
