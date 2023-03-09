<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import type { DefaultThemeHomePageFrontmatter } from '../../shared'
const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const footerItems = computed(() => {
  if (isArray(frontmatter.value.mainfooter)) {
    return frontmatter.value.mainfooter
  }
  return []
})
</script>
<template>
<!-- hide home page column footer -->
<!-- 
  <div class="container-footer">
    <div class="grid">
      <div class="logo-socials">
        <a href="" class="logo-img">
          <img src="/images/logo.png" alt="" class="logo" />
        </a>
        <div class="socials"></div>
      </div>

      <div v-for="footerItem in footerItems" :key="footerItem" class="grid-2">
        <div v-for="grid in footerItem.firstgrid" :key="grid" class="col-1" >
          <h6>{{ grid.title }}</h6>
          <ul>
            <li v-for="link in grid.links" :key="link">
              <a :href="link.link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
                <div v-for="grid in footerItem.secondgrid" :key="grid" class="col-1" >
          <h6>{{ grid.title }}</h6>
          <ul>
            <li v-for="link in grid.links" :key="link">
              <a :href="link.link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
--> 
  <section class="footer-small">
    <div class="links">
      <p>OpenCUI, Inc &copy; 2023 All rights reserved</p>
    </div>
    <div class="links">
      <a href="https://opencui.medium.com/">Medium</a>
      <a href="/policy/terms.html">Terms</a>
      <a href="/policy/privacy.html">Privacy</a>
    </div>
  </section>
</template>
<style scoped>
.footer-small {
  padding-left: 0;
  padding-right: 0;
}
</style>
