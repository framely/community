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
        <button class="button-cta">{{ cta.title }}</button>
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-s {
  padding: 0 40px;
  div {
    max-width: 1152px;
    margin: 60px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    //background-color: inherit;
    //border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    justify-content: center;
    padding: 60px 24px;

    h2 {
      //border: none;
      font-weight: 500;
      text-align: center;
      line-height: 36px;
      font-size: 24px;
      color: var(--vp-c-text-2);
      margin-bottom: 32px;
    }
  }
}
.button-cta {
  padding: 0 20px;
  line-height: 38px;
  text-align: center;
  font-weight: 600;
  border-radius: 20px;
  border: 1px solid var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-c-brand);
  &:hover {
    background: var(--vp-c-brand-light);
  }
}
</style>