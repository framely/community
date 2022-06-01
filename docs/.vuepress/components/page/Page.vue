<script setup lang="ts">
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
import ToggleSidebarButton from '@theme/ToggleSidebarButton.vue'
import Pricing from '../pricing/pricing.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import Footer from './footer.vue'
import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import ToggleMenu from '../ToggleMenu/ToggleMenu.vue'
const ToggleMenuSidebar = () => {
  if (typeof document !== undefined) {
    document.querySelector('.last-t').classList.toggle('last-transform')
    document.querySelector('.first-t').classList.toggle('first-transform')
    document.querySelector('.middle-t').classList.toggle('middle-transform')
    document.getElementById('mask-sidebar').classList.toggle('mask-sidebar')
    const sidebar = document.querySelector('.theme-container')
    sidebar.classList.toggle('sidebar-open')
  }
}

defineEmits(['toggle-sidebar'])
const pageData = usePageData()
const frontmatter = usePageFrontmatter()

const page = computed(() => {
  if (isArray(pageData.value.frontmatter)) {
    return pageData.value.frontmatter
  }
  return []
})
const checkPage = ()=>{
  if(frontmatter.value.pricing){
    return false
  }else if(frontmatter.value.article){
    return false
  }else{
    return true
  }
}
</script>

<template>
  <div class="container">
    <main class="page">
      <slot name="top" />
      <Pricing v-if="frontmatter.pricing" :frontmatter="frontmatter" />

      <div v-else class="theme-default-content">
        <ToggleMenu v-if="checkPage()"  class="toggle" @click="ToggleMenuSidebar" />
        <Content />

      <div id="mask-sidebar" @click="ToggleMenuSidebar"></div>
      </div>

      <PageMeta v-if="!frontmatter.pricing" />

      <PageNav v-if="!frontmatter.pricing" />

    <Footer />
    </main>
      <slot name="bottom" />
  </div>
</template>
<style lang="scss" scoped>
.angle {
  display: none;
}
.toggle {
  position: fixed;

  top: calc(var(--navbar-height) + 2px);
  left: 0;
  transform: translateX(-10px);
  background: var(--c-bg);
  padding: 4px 12px;
  z-index: 2;
  height: 36px;
  border-radius: 4px;
  border: 1px solid var(--c-border);
  background-position: 50% 50%;
  box-shadow: 2px 2px 4px var(--c-bg), -2px -2px 4px var(--c-bg);
}
.mask-sidebar {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000073;
  z-index: 9;
}
@media (max-width: 900px) {

  .angle {
    display: block;
    font-size: 1.5em;
    transition: 0.2s ease-in-out;
  }
  .rotate-angle {
    transform: rotate(180deg);
  }
  .display-none {
    display: none;
    height: 0;
    overflow: hidden;
    will-change: height;
  }
}
</style>