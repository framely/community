<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue'
import {
  ClientOnly,
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import type { FunctionalComponent } from 'vue'
import { computed, h } from 'vue'
import type { DefaultThemeHomePageFrontmatter } from '@vuepress/theme-default/lib/shared'
import { useDarkMode } from '@vuepress/theme-default/lib/client/composables'
const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()
const isDarkMode = useDarkMode()
const heroImage = computed(() => {
  if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
    return frontmatter.value.heroImageDark
  }
  return frontmatter.value.heroImage
})
const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }
  return frontmatter.value.heroText || siteLocale.value.title || 'Framely'
})
const heroAlt = computed(
  () => frontmatter.value.heroAlt || heroText.value || 'hero'
)
const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }
  return frontmatter.value.tagline || siteLocale.value.description || 'Framely'
})
const actions = computed(() => {
  if (!isArray(frontmatter.value.actions)) {
    return []
  }
  return frontmatter.value.actions.map(({ text, link, type = 'primary' }) => ({
    text,
    link,
    type,
  }))
})
const HomeHeroImage: FunctionalComponent = () => {
  if (!heroImage.value) return null
  const img = h('img', {
    src: withBase(heroImage.value),
    alt: heroAlt.value,
  })
  if (frontmatter.value.heroImageDark === undefined) {
    return img
  }
  return h(ClientOnly, () => img)
}
</script>

<template>
  <div class="main-hero-container">
    <div class="intro">
      <div class="text-info">
        <h1 v-if="heroText" id="main-title">
          {{ heroText }}
        </h1>
        <p v-if="tagline" class="description">
          {{ tagline }}
        </p>
      </div>
      <div>
        <p v-if="actions.length" class="actions">
          <AutoLink
            v-for="action in actions"
            :key="action.text"
            class="button-small"
            :class="[action.type]"
            :item="action"
          />
        </p>
      </div>
    </div>
    <div class="img">
      <div class="image">
        <HomeHeroImage />
      </div>
    </div>
  </div>
</template>


<style lang="scss"  scoped>
.main-hero-container {
  max-width: var(--homepage-width); 
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: auto;
  padding: 4rem 2rem 4rem 2rem;
}
.intro {
  width: 60%;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.text-info {
  margin-bottom: 60px;
}
.intro .text-info h1 {
  font-size: 60px;
  line-height: 80px;
  font-weight: 700;
}
.description {
  color: var(--c-text-lighter);
  line-height: 40px;
}
.img {
  display: flex;
  align-items: flex-end;
  width: 60%;
  //position: relative;
}
.image > img {
  width: 100%;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem; //this is button spacing
}
.btn {
  padding: 15px;
  background: var(--c-brand);
  border: none;
  color: var(--c-bg);
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 15px;
  margin-top: 15px;
}

@media (max-width: 719px) {
  .main-hero-container {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    align-items: center;
    padding: 4rem 0.5rem 0 0.5rem;
  }
  .intro {
    width: 100%;
  }
  .intro .text-info h1 {
    font-size: 36px;
    line-height: 50px;
  }
  .description {
    line-height: 20px;
  }
  .img {
    width: 100%;
  }
}
</style> 