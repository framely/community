
export const en = {
  '/essentials/': [
    {
      text: "Why OpenCUI",
      children: [
        '/essentials/README.md',
        '/essentials/cooperative.md',
        '/essentials/5levels-cui.md',
        '/essentials/architecture.md'
      ]
    }
  ],
  '/guide/': [
    {
      text: 'Quickstart',
      children: [
        '/guide/are-you-ready.md',
        '/guide/concepts.md',
        '/guide/signingup.md',
        '/guide/start-with-clone.md',
        '/guide/debug.md',
        '/guide/pingpong.md',
        '/guide/use-hours.md',
        '/guide/build-service.md',
        '/guide/quickstart-channel.md'
      ],
    }
  ],
  '/reference/': [
    {
      text: 'Dialog Annotations',
      collapsible: true,
      children: [
        '/reference/annotations/overview.md',
        '/reference/annotations/init.md',
        '/reference/annotations/fillstrategy.md',
        '/reference/annotations/valuerec.md',
        '/reference/annotations/valuecheck.md',
        '/reference/annotations/confirmation.md',
        '/reference/annotations/transition.md',
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
      text: 'CUI Components',
      collapsible: true,
      children: [
        '/reference/annotations/systemcomponent.md',
        {
          text: 'Date picker',
          link: '/reference/plugins/components/datepicker/',
          collapsible: true,
          children:[
            '/reference/plugins/components/datepicker/datepicker-design.md'
          ],
        },
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
  ],
  '/policy/': [
    {
      text: 'Terms of Service',
      link: '/policy/terms.md'
    },
    {
      text: 'Privacy Policy',
      link: '/policy/privacy.md'
    }
  ]
}
