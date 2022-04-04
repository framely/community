import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta'

export const en: NavbarConfig = [
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
          '/reference/annotations/vr.md',
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
          '/reference/support/chatwoot.md'
        ],
      },
    ],
  },
  // {
  //   text: 'Blog',
  //   link: '/blog/'
  // },
  {
    text: "Article",
    link: "/article/",
  },


]
