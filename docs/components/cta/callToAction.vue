<script setup >
// import { usePageFrontmatter } from '@vuepress/client'
// import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import { useData } from 'vitepress'
// import type { DefaultThemeHomePageFrontmatter } from '../../shared'
const { site, frontmatter } = useData()
// const frontmatter = usePageFrontmatter < DefaultThemeHomePageFrontmatter > ()
const cta = computed(() => {
  if (Array.isArray(frontmatter.value.cta)) {
    return frontmatter.value.cta
  }
  return []
})
</script>

<template>
  <div v-if="cta.length" class="container-s">
    <div v-for="cta in cta" :key="cta.details">
      <h2>{{ cta.details }}</h2>
      <a :href="cta.link" target="_blank" rel="noopener noreferrer">
        <button class="button-small">{{ cta.title }}</button>
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-s {
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 380px;
    // background-color: var(--c-bg-cta);
    justify-content: center;

    h2 {
      border: none;
      font-weight: 600;
      text-align: center;
      font-size: 36px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-bottom: 48px;
    }
  }
}
</style>