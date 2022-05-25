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
        text: 'Annotations',
        children: [
          {
          link:'/reference/annotations/overview.md',
          text:'Overview',
          icon:"/featureIcons/cui.svg",

          },
          {
            link:'/reference/annotations/vr.md',
            icon:"/featureIcons/hotfix.svg",
            text:"Value Recommendation"
          },
          {
            link:'/reference/annotations/confirmation.md',
            icon:"/featureIcons/declarative.svg",
            text:"Confirmation"
          }
          
         
        ],
      },
      {
        text: 'Channels',
        children: [
          '/reference/channels/wpa.md',
        ],
      },
 
      {
        text: 'Supports',
        children: [
          '/reference/support/overview.md',
          '/reference/support/Chatwoot.md'
        ],
      },
    ],
  },
  {
    text:"Pricing",
    link:"/pricing/"
  },
  {
    text: 'Blog',
    link: '/articles/' 
  }
]
