import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')


import { sidebar, navbar } from "./configs"


export default {
  base: '/', // 项目的基础路径
  title: 'OpenCUI', // 文档的标题，会显示在
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-L6RW3F0FPM' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'G-L6RW3F0FPM');`
    ]
  ],
  description: 'Type-based Approach for Chatbot Development', // 文档描述
  lastUpdated: '上次更新时间', // string | boolean
  docsDir: 'docs',
  themeConfig: {
    logo: '/images/logo.png',
    outline: 'deep',
    // 顶部右侧导航
    nav: navbar.en,
    sidebar: sidebar.en,
    // footer
    footer: {
      copyright: 'OpenCUI, Inc © 2023 All rights reserved. &nbsp;&nbsp;<a href="/policy/terms.html">Terms</a>&nbsp;&nbsp;<a href="/policy/privacy.html">Privacy</a>'
    },
  },

}
