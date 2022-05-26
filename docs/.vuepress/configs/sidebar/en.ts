
export const en = {
  '/guide/': [
    {
      text: 'Build Conversational App',
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
      text: 'Annotation Reference',
      icon:"/featureIcons/cui.svg",

      collapsible: true,

      children: [
        '/reference/annotations/overview.md',
        '/reference/annotations/vr.md',
        '/reference/annotations/confirmation.md',
      ],
    },
    {
      text: 'Channel Reference',
      collapsible: true,
      children: ['/reference/channels/wpa.md'],
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
