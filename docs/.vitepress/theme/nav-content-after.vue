<script setup>

import VPSwitch from 'vitepress/dist/client/theme-default/components/VPSwitch.vue'
import VPIconMoon from 'vitepress/dist/client/theme-default/components/icons/VPIconMoon.vue'
import VPIconSun from 'vitepress/dist/client/theme-default/components/icons/VPIconSun.vue'

import { isDark } from './composables/dark'

const toggleAppearance = function (v) {
  isDark.value = !isDark.value
}

</script>

<template #nav-bar-content-after>
  <a :href="'https://build.opencui.io'" :target="'_blank'">
    <button class="button-start">
      Request Access
    </button>
  </a>
  <!-- <VPSwitch title="toggle dark mode" class="VPSwitchAppearance" :aria-checked="isDark" @click="toggleAppearance">
    <VPIconSun class="sun" />
    <VPIconMoon class="moon" />
  </VPSwitch> -->
</template>

<style lang="scss">
.button-start {
  margin-left: 24px;
  margin-right: 24px;
  padding: 0 20px;
  line-height: 32px;
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

.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance .check {
  // /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
