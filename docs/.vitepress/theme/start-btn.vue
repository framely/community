<script setup>
import DefaultTheme from 'vitepress/theme'

</script>

<template #nav-bar-content-after>
  <a :href="'https://build.opencui.io'" :target="'_blank'">
    <button class="button-start">
      Start to Build
    </button>
  </a>
</template>

<style lang="scss">
.button-start {
  margin-left: 24px;
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
