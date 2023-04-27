<script setup >
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, frontmatter } = useData()

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
    max-width: 1152px;
    margin: 112px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 380px;
    background-color: inherit;
    // border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    justify-content: center;



    h2 {
      border: none;
      font-weight: 600;
      text-align: center;
      font-size: 36px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-bottom: 68px;
    }
  }
}
</style>