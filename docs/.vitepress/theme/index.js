import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import '../styles/index.scss'
import NavContentAfter from './nav-content-after.vue'
import HomeFeaturesAfter from './home-features-after.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavContentAfter),
      'home-features-after': () => h(HomeFeaturesAfter),
    })
  }
}