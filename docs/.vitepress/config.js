import { createRequire } from 'module'
import { defineConfig } from 'vitepress'
import mdItCustomAttrs from 'markdown-it-custom-attrs'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')


import { sidebar } from "./configs"


export default {
  base: '/', // 项目的基础路径
  title: 'OpenCUI', // 文档的标题，会显示在
  description: '前端技术文档', // 文档描述
  lastUpdated: '上次更新时间', // string | boolean
  docsDir: 'docs',
  themeConfig: {
    logo: '/images/logo.png',
    // 顶部右侧导航
    nav: [
      {
        text: 'Why OpenCUI',
        link: '/essentials/README.md',
        activeMatch: '/essentials/',
      },
      {
        text: 'Quickstart',
        link: '/guide/',
        activeMatch: '/guide/',
      },
      {
        text: 'Reference',
        link: '/reference/annotations/overview.html',
        activeMatch: '/reference/',
      },
      {
        text: 'Pricing',
        link: '/pricing/README.md',
        activeMatch: '/pricing/',
      },
      {
        text: 'Blog',
        link: '/articles/',
        activeMatch: '/articles/',
      },
      {
        text: 'Start to build',
        link: 'https://build.opencui.io',
        target: '_blank',
      }
    ],
    sidebar: sidebar.en,
  },
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': "gallery"
      })
    }
  },
  head: [
    [
      "link",
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }]
  ]
}