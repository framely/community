import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')


import { sidebar, navbar } from "./configs"


export default {
  base: '/', // 项目的基础路径
  title: 'OpenCUI', // 文档的标题，会显示在
  description: 'Type-based Approach for Chatbot Development', // 文档描述
  lastUpdated: '上次更新时间', // string | boolean
  docsDir: 'docs',
  themeConfig: {
    logo: '/images/logo.png',
    // levels of TOC
    outline: 'deep',
    // nav social icons
    socialLinks: [
      { icon: 'github', link: 'https://github.com/opencui/community/discussions' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/opencui-official/' },
    ],
    // 顶部右侧导航
    nav: navbar.en,
    sidebar: sidebar.en,
    // footer
    footer: {
      copyright: 'OpenCUI, Inc © 2023 All rights reserved. &nbsp;&nbsp;<a href="/policy/terms.html">Terms</a>&nbsp;&nbsp;<a href="/policy/privacy.html">Privacy</a>'
    },
  },
}
