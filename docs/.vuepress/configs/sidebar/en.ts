
export const en = {
  '/guide/': [
    {
      text: 'Step by Step',
      children: [
        '/guide/are-you-ready.md',
        '/guide/signingup.md',
        '/guide/pingpong.md',
        '/guide/quickstart-channel.md'
      ],
    }
  ],
  '/reference/': [
    {
      text: "Essentials",
      collapsible: true,
      children: [
        '/reference/essentials/concepts.md',
        '/reference/essentials/cooperative.md',
        '/reference/essentials/sgcui.md',
        '/reference/essentials/5levels-cui.md',
        '/reference/essentials/slotfilling.md',
        '/reference/essentials/components.md'
      ]
    },
    {
      text: 'Core Components',
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
        '/reference/providers/extension.md',
        '/reference/providers/native.md',
        '/reference/providers/postgrest.md'
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
        '/reference/platform/multilingual.md',
        '/reference/platform/testing.md',
        '/reference/platform/deployment.md',
        '/reference/platform/versioncontrol.md',
        '/reference/platform/access.md',
        '/reference/platform/reusability.md'
      ]
    },
    {
      text: 'Runtime',
      collapsible: true,
      children: [
        '/reference/runtime/architecture.md'
      ],
    },
    {
      text: 'CUI Components',
      collapsible: true,
      children: [
        {
          text: 'Date Picker',
          link: '/reference/plugins/components/datepicker/',
          collapsible: true,
          children:[
            '/reference/plugins/components/datepicker/datepicker-design.md'
          ],
        }
      ],
    },
    {
      text: 'Services',
      collapsible: true,
      children: [
        {
          text: 'Reservation',
          link: '/reference/plugins/services/reservation/',
          collapsible: true,
          children:[
            '/reference/plugins/services/reservation/reservation-api.md',
            '/reference/plugins/services/reservation/google-calendar-reservation.md'
          ],
        }
      ]
    },
    {
      text: "Glossary",
      link: '/reference/glossary.md'
    }
  ]
}
