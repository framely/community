<script setup lang="ts">
import NavbarBrand from '@theme/NavbarBrand.vue'
import NavbarItems from '@theme/NavbarItems.vue'
import ToggleDarkModeButton from '@theme/ToggleDarkModeButton.vue'
import ToggleSidebarButton from '@theme/ToggleSidebarButton.vue'
import { computed, onMounted, ref } from 'vue'
import { useThemeLocaleData } from '@vuepress/theme-default/lib/client/composables'
import { doc } from 'prettier'
import { usePageFrontmatter } from '@vuepress/client'
defineEmits(['toggle-sidebar'])
const frontmatter = usePageFrontmatter()

const themeLocale = useThemeLocaleData()
const navbar = ref<HTMLElement | null>(null)

// refs for menu bar
const navigationMenu = ref<HTMLElement | null>(null)
const lastToggleLine = ref<HTMLElement | null>(null)
const middleToggleLine = ref<HTMLElement | null>(null)
const firstToggleLine = ref<HTMLElement | null>(null)

const navbarBrand = ref<HTMLElement | null>(null)
const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

const ToggleMenu = () => {
  if (typeof document !== undefined) {
    const navigationMenu = document.getElementById('navbar-items-right')
    navigationMenu.classList.toggle('slide-in-menu')
    document.querySelector('.last').classList.toggle('transform-last')
    document.querySelector('.first').classList.toggle('transform-first')
    document.querySelector('.middle').classList.toggle('transform-middle')
  }
}

const enableDarkMode = computed(() => themeLocale.value.darkMode)
onMounted(() => {
  const MOBILE_DESKTOP_BREAKPOINT = 719
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight')
  const handleLinksWrapWidth = (): void => {
    if (window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0)
    }
  }
  handleLinksWrapWidth()
  window.addEventListener('resize', handleLinksWrapWidth, false)
  window.addEventListener('orientationchange', handleLinksWrapWidth, false)
})
function getCssValue(el: HTMLElement | null, property: string): number {
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}
</script>

<template>
  <header ref="navbar" class="navbar">
    <span ref="navbarBrand">
      <NavbarBrand />
    </span>

    <div class="navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <!-- <NavbarItems class="can-hide" /> -->
      <NavbarItems id="navbar-items-right" class="navbar-items-wrapper-links" />
      <button class="button can-hide">
        <a
          href="http://framely.naturali.io"
          target="_blank"
          rel="noopener noreferrer"
          >Get Started</a
        >
      </button>
      <slot name="after" />

      <ToggleDarkModeButton v-if="enableDarkMode" />

      <NavbarSearch />
      <div
        class="toggle-menu"
        id="toggle-menu"
        @click="ToggleMenu"
        role="button"
      >
        <span ref="firstToggleLine" class="first"></span>
        <span ref="middleToggleLine" class="middle"></span>
        <span ref="lastToggleLine " class="last"></span>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.navbar {
  //padding-left: 10px;
  padding-left: var(--navbar-padding-h);
}
.button {
  margin-left: 20px;
  padding: 0 16px;
  background: var(--c-brand);
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 48px;
  a {
    color: var(--c-bg);
  }
}
.button:hover {
	background: var(--c-brand-light);
}
@media (max-width: 719px) {
  .toggle-menu span:nth-child(1) {
    transform-origin: center;
  }
  .toggle-menu span:nth-child(2) {
    margin: 6px 0;
  }
  .toggle-menu {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 1.25rem;
    height: 1.25rem;
    align-self: center;
    cursor: pointer;
    position: relative;
    span {
      display: inline-block;
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background: var(--c-text);
      transition: 0.3s ease;
      transform-origin: center;
    }
  }
  .navbar-items-wrapper-links {
    background: var(--c-bg);
    display: flex;
    flex-direction: column;
    z-index: 9999999;
    transition: 0.5s ease-out;
    position: fixed;
    top: var(--navbar-height);
    margin-left: 10px;
    height: 100%;
    position: fixed;
    left: 0px;
    width: 100%;

    top: var(--navbar-height);
    transform: translate(-120%);
  }
  .slide-in-menu {
    transform: translateX(0%);
  }
  .transform-first {
    transform: rotate(45deg) translate3d(6px, 6px, 0);
  }
  .transform-last {
    transform: rotate(-45deg) translate3d(5px, -5.5px, 0);
  }
  .transform-middle {
    transform: scale3d(0, 1, 1);
  }
}
</style>
