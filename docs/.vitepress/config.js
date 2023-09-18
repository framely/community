import { sidebar, navbar } from "./configs"


export default {
  base: '/', // 项目的基础路径
  title: 'OpenCUI', // 文档的标题，会显示在
  appearance: 'dark',
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
    // levels of TOC
    outline: 'deep',
    // nav social icons
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/opencui/community' },
    //   { icon: 'linkedin', link: 'https://www.linkedin.com/company/opencui-official/' },
    // ],
    // 顶部右侧导航
    nav: navbar.en,
    sidebar: sidebar.en,
    // footer
    footer: {
      copyright: 'OpenCUI, Inc © 2023 All rights reserved'
    }
  },

}
