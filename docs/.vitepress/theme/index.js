import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import '../styles/index.scss'
import NavStartBtn from './start-btn.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavStartBtn)
    })
  }
}