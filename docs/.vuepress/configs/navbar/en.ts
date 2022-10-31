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
            icon: '/navIcons/transition.svg',
          },
          {
            text: 'System CUI Components',
            link: '/reference/annotations/systemcomponent.html',
            icon: '/navIcons/systemcomponent.svg',
          }
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
          text: 'Native',
            link: '/reference/providers/native.html',
            icon: '/navIcons/postgresql.svg',
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
            text: 'Overview',
            link: '/reference/channels/overview.html',
            icon: '/navIcons/overview.svg',
          },
          {
            text: 'Universal Channel',
            link: '/reference/channels/universalmessage.html',
            icon: '/navIcons/universal.svg',
          },
          {
            text: 'Google Business Message',
            link: '/reference/channels/googlebusiness.html',
            icon: '/navIcons/google-business.svg',
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

          {
            text: 'WeChat Official Account',
            link: '/reference/channels/wpa.html',
            icon: '/navIcons/wechat.svg',
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
            icon: '/navIcons/chatwoot.svg',
          },
        ],
      },
      {
      text: 'Platform',
      children:[
        {
          text: 'Sign Up',
          link: '/reference/platform/signingup.html',
          icon: '/navIcons/signup.svg',
        },
        {
          text: 'Multilingual',
          link: '/reference/platform/multilingual.html',
          icon: '/navIcons/multilingual.svg',
        },
        {
          text: 'Testing',
          link: '/reference/platform/testing.html',
          icon: '/navIcons/testing.svg',
        },
        {
          text: 'Deployment',
          link: '/reference/platform/deployment.html',
          icon: '/navIcons/deployment.svg',
        },
        {
          text: 'Version Control',
          link: '/reference/platform/versioncontrol.html',
          icon: '/navIcons/branch.svg',
        },
        {
          text: 'Access Control',
          link: '/reference/platform/access.html',
          icon: '/navIcons/permission.svg',
        },
        {
          text: 'Reusability',
          link: '/reference/platform/reusability.html',
          icon: '/navIcons/reusability.svg',
        }
        ]
      },
      {
        text: 'Extensions',
        children: [
          {
            text: 'Simple Tutorial',
            link: '/reference/extensions/tutorial.html',
            icon: '/navIcons/overview.svg',
          }
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
