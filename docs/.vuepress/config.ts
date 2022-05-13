import { defineUserConfig } from '@vuepress/cli'
// @ts-ignore
import type { DefaultThemeOptions } from '@vuepress'
import { path } from '@vuepress/utils'
import { navbar, sidebar } from './configs'
import { mdEnhance } from "vuepress-plugin-md-enhance";

// 
const { tocPlugin } = require('@vuepress/plugin-toc')

const isProd = process.env.NODE_ENV === 'production'


export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  theme: path.resolve(__dirname, './theme'),
  
  alias:{
    '@theme/HomeFeatures.vue': path.resolve(__dirname, './components/features/HomeFeatures.vue'),
    '@theme/Navbar.vue': path.resolve(__dirname, './components/navbar/Navbar.vue'),
    '@theme/Home.vue': path.resolve(__dirname, './components/home/HomePage.vue'),
    '@theme/Page.vue': path.resolve(__dirname, './components/page/Page.vue'),
    '@theme/NavbarBrand.vue': path.resolve(__dirname, './components/navbar/NavbarBrand.vue'),
    '@theme/NavbarDropdown.vue': path.resolve(__dirname, './components/navbar/NavbarDropdown.vue'),
    '@theme/AutoLink.vue' : path.resolve(__dirname, './components/AutoLink/AutoLink.vue'),
    '@theme/Sidebar.vue': path.resolve(__dirname, './components/sidebar/Sidebar.vue'),
    '@theme/SidebarItem.vue':path.resolve(__dirname, './components/sidebar/SidebarItem.vue')


    
  },


  
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/images/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/images/icons/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'Framely' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Framely' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/images/icons/safari-pinned-tab.svg',
        color: '#4282fd',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#4282fd' }],
    ['meta', { name: 'theme-color', content: '#4282fd' }],
  ],



  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Framely',
      description: 'Cost-effective Conversational Interface for any Services',
    },
    // '/zh/': {
    //  lang: 'zh-CN',
    //  title: 'Framely',
    //  description: '让天下没有难的对话式服务',
    // },
  },

  themeConfig: {
    logo: '/images/logo.png',
    heroImage: '',
    docsDir: 'docs',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: navbar.en,

        // sidebar
        sidebar: sidebar.en,

        // page meta
        editLinkText: 'Edit this page on GitHub',

        darkMode: true,
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // navbar
        navbar: navbar.zh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',

        // sidebar
        sidebar: sidebar.zh,

        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',

        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        // a11y
        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',
      },
    },

    // For now, hide the contributor
    contributors: false,

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,

      externalLinkIcon: false,

      // use shiki plugin in production mode instead
      prismjs: !isProd,

    },
  },


  plugins: [
    tocPlugin({
      // options
    }),
  
    [
      '@vuepress/plugin-google-analytics',
      {
        // we have multiple deployments, which would use different id
        id: process.env.DOCS_GA_ID,
      },
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    // new container.
    [
      '@vuepress/plugin-container',
      {
        type:'story',
      },
    ],
    [
      '@vuepress/plugin-container',{
        type:'half',
      }
    ],
    [
      '@vuepress/plugin-container',{
        type:'third',
      }
    ],
    [
      '@vuepress/plugin-container',{
        type:'right',
      }
    ],
    [
      '@vuepress/plugin-container',{
        type:'left',
      }
    ],
    [
      '@vuepress/plugin-container',{
        type:'center',
      }
    ],
    [
      '@vuepress/plugin-container',{
        type:'card',
      }
    ],
    [
      '@vuepress/plugin-container',{
        type:'thumbnail',
      }
    ],

    mdEnhance({
        flowchart: true,
    }),

    // only enable shiki plugin in production mode
    [
      '@vuepress/plugin-shiki',
      isProd
        ? {
            theme: 'dark-plus',
          }
        : false,
    ],
  ],
})
