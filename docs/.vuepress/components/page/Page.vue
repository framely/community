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
const options = {
  containerTag: 'nav',
  containerClass: 'vuepress-toc',
  listClass: 'vuepress-toc-list',
  itemClass: 'vuepress-toc-item',
  linkTag: 'RouterLink',
  linkClass: 'vuepress-toc-link',
  linkActiveClass: 'active',
  linkChildrenActiveClass: 'active',
}
const ShowToc = () => {
  if (typeof document !== undefined) {
    document.querySelector('.toc-content').classList.toggle('display-none')
    document.querySelector('.angle').classList.toggle('rotate-angle')
  }
}

const page = computed(() => {
  if (isArray(pageData.value.frontmatter)) {
    return pageData.value.frontmatter
  }
  return []
})
</script>

<template>
  <div class="container">
    <main class="page">
      <slot name="top" />
      <Pricing v-if="frontmatter.pricing" :frontmatter="frontmatter" />
      <div v-if="frontmatter.article" class="container-blog">
        <div class="theme-default-content">
          <div class="toc">
            <button @click="ShowToc" class="title">
              <p>In this page</p>
              <div class="angle">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                    fill="var(--c-text)"
                  />
                </svg>
              </div>
            </button>
            <div class="toc-content display-none">
              <Toc :headers="pageData.headers" :options="options" />
            </div>
          </div>
          <div class="content">
            <Content />
          </div>
        </div>
      </div>

      <div v-else class="theme-default-content">
        <div class="toc">
          <button @click="ShowToc" class="title">
            <p>In this page</p>
            <div class="angle">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                  fill="var(--c-text)"
                />
              </svg>
            </div>
          </button>
          <div class="toc-content display-none">
            <Toc :headers="pageData.headers" :options="options" />
          </div>
        </div>
        <div class="content">
          <ToggleMenu class="toggle" @click="ToggleMenuSidebar" />
          <Content />

          <div id="mask-sidebar" @click="ToggleMenuSidebar"></div>
        </div>
      </div>

      <PageMeta v-if="!frontmatter.pricing" />

      <PageNav v-if="!frontmatter.pricing" />

      <slot name="bottom" />
    </main>
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.page-nav {
  margin: 0 0;
}
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: none;
  align-items: center;
  border: none;
  background: var(--c-bg);
  height: 50px;
  font-size: 1em;
}
.toc-content .vuepress-toc .vuepress-toc-list .vuepress-toc-item a {
  color: var(--c-text);
}
.vuepress-toc {
  width: 100%;
  border-left: 1px solid var(--c-border);
  margin-left: 10px;
  font-size: 0.9em;
}
.vuepress-toc-list {
  background: #000;
  color: var(--c-text) !important;
}
.theme-default-content:not(.custom) {
  max-width: 100%;
  /* display: flex; */
}
.container-blog {
  .theme-default-content:not(.custom) {
    max-width: 70%;
  }
}
.toc {
  position: relative;
  height: fit-content;
  position: fixed;
  width: 30%;
  right: 0;
  margin: auto;
}
.content {
  max-width: 60%;
}
.toc-content {
}
.angle {
  display: none;
}
.toggle {
  position: fixed;

  top: calc( var(--navbar-height) + 18px );
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
  z-index: 1;
}
@media (max-width: 900px) {
  .theme-default-content:not(.custom) {
    flex-direction: column;
  }
  .toc {
    width: 100%;
    position: relative;
    height: fit-content;
    transition: 1s ease-in-out;
    padding-top: 20px;
  }
  .toc-content {
    position: relative;
    width: 100%;
    transition: 0.3s ease;
    background: var(--c-bg);
    transition: height 292ms ease-in-out 0s;
    font-size: 0.8em;
    // transition: 0.5s ease-in-out;
    // display: none;
  }
  .container-blog {
    .theme-default-content:not(.custom) {
      max-width: 100%;
    }
  }
  .content {
    max-width: 100%;
  }
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: none;
    align-items: center;
    border: none;
    background: var(--c-bg);
    height: 50px;
    font-size: 1em;
  }
  .angle {
    // transform: rotate(90deg);
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
    // transform: translateY(-200%);
  }
}
</style>