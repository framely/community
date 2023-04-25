import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')


import { sidebar } from "./configs"
import { navbar } from "./configs"

export default {
  base: '/', // 项目的基础路径
  title: 'OpenCUI', // 文档的标题，会显示在
  description: 'Type-based Approach for Chatbot Development', // 文档描述
  lastUpdated: '上次更新时间', // string | boolean
  docsDir: 'docs',
  themeConfig: {
    logo: '/images/logo.png',
    navbar: navbar.en,
    sidebar: sidebar.en,
  },
}