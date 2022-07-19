import type { NavbarConfig } from '@vuepress/theme-default'


// import { version } from '../meta' 

export const en = [
  {
    text: 'Guide',
    link: '/guide/',

  },
  {
    text: 'Reference',
    children: [
      {
        text: 'CUI Components',

        children: [
          {
            text: 'Overview',
            link: '/reference/annotations/overview.html',
            icon: '/navIcons/overview.svg',

          },
          {
            text: 'Initialization',
            link: '/reference/annotations/init.html',
            icon: '/navIcons/initialization.svg',
          },
          {
            text: 'Fill Strategy',
            link: '/reference/annotations/fillstrategy.html',
            icon: '/navIcons/fillstrategy.svg',
          },
          {
            text: 'Value Recommendation',
            link: '/reference/annotations/valuerec.html',
            icon: '/navIcons/valuerec.svg',
          },
          {
            text: 'Value Check',
            link: '/reference/annotations/valuecheck.html',
            icon: '/navIcons/valuecheck.svg',
          },
          {
            text: 'Confirmation',
            link: '/reference/annotations/confirmation.html',
            icon: '/navIcons/confirmation.svg',
          },
          {
            text: 'Beyond Slot Filling',
            link: '/reference/annotations/transition.html',
            icon: '/navIcons/confirmation.svg',
          },
        ],
      },
      {
        text: 'Providers',
        children: [
          {
            text: 'Overview',
            link: '/reference/providers/overview.html',
            icon: '/navIcons/overview.svg',
          },
          {
            text: 'Postgrest',
            link: '/reference/providers/postgrest.html',
            icon: '/navIcons/postgresql.svg',
          },
          {
            text: 'Google Sheets',
            link: '/reference/providers/googlesheets.html',
            icon: '/navIcons/google-sheets.svg',
          },
        ]
      },
      {
        text: 'Channels',
        children: [
          {
            text: 'Universal Channel',
            link: '/reference/channels/overview.html',
            icon: '/navIcons/wechat.svg',
          },
          {
            text: 'WeChat Official Account',
            link: '/reference/channels/wpa.html',
            icon: '/navIcons/wechat.svg',
          },
          {
            text: 'Messenger',
            link: '/reference/channels/messenger.html',
            icon: '/navIcons/messenger.svg',
          },
          {
            text: 'WhatsApp Business',
            link: '/reference/channels/whatsapp.html',
            icon: '/navIcons/whatsapp.svg',
          },
        ],
      },

      {
        text: 'Supports',
        children: [
          {
            text: 'Overview',
            link: '/reference/support/overview.html',
            icon: '/navIcons/overview.svg',
          },
          {
            text: 'Chatwoot',
            link: '/reference/support/Chatwoot.html',
            icon: '/navIcons/chat.svg',
          },
        ],
      },
    ],
  },
  {
    text: 'Pricing',
    link: '/pricing/'
  },
  {
    text: 'Blog',
    link: '/articles/'
  }
]
