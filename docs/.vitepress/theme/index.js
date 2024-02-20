import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import '../styles/index.scss'
import NavContentAfter from './nav-content-after.vue'
import HomeFeaturesAfter from './home-features-after.vue'
import CookieConsentVue from './cookie-consent.js'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavContentAfter),
      'home-features-after': () => h(HomeFeaturesAfter),
    })
  },
  async enhanceApp({ app }) {
    console.log('enhanceApp', app);
    app.use(CookieConsentVue, {


      categories: {
        necessary: {
          enabled: true,  // this category is enabled by default
          readOnly: true  // this category cannot be disabled
        },
        analytics: {}
      },

      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies',
              description: 'We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content, to analyze our website traffic, and to understand where our visitors are coming from.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Accept only necessary cookies'
            },
          }
        }
      }
    })
  }
}