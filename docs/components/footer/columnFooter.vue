<script setup >
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, frontmatter } = useData()

const columnFooter = computed(() => {
  if (Array.isArray(frontmatter.value.columnFooter)) {
    return frontmatter.value.columnFooter
  }
  return []
})
</script>

<template>
  <div v-if="columnFooter.length" class="container-f">
    <div v-for="columnFooter in columnFooter" :key="columnFooter.title" class="footer-wrapper">

      <div class="footer-info-wrapper">
        <div class="footer-info"> 
          <div class="footer-info-logo">
            <img :src="columnFooter.logo" alt="" />
          </div>
          <div class="footer-info-title">{{ columnFooter.title }}</div>
        </div>
        <div class="footer-info-tagline">{{ columnFooter.tagline }}</div>
      </div>

      <div class="footer-column-wrapper">
        <div v-for="footerItem in columnFooter.footerItems" :key="footerItem" class="footer-column-item">  
          <div class="footer-item-title">{{ footerItem.title }}</div>
          <ul>
            <li v-for="item in footerItem.items" :key="item" class="footer-item-list">
              <a :href="item.link">{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-f {
  padding: 0 40px;
  margin: 80px auto 0 auto;
  background-color: inherit;
}

.footer-wrapper {
  max-width: 1152px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.footer-info-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 50%;
}

.footer-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5rem;
}

.footer-info-logo {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.footer-info-title {
  font-weight: 700;
  font-size: 1.6rem;
}

.footer-info-tagline {
  color: var(--vp-c-text-3);
  font-weight: 500;
  font-size: 1rem;
  //line-height: 2rem;
}

.footer-column-wrapper {
  display:flex;
  flex-direction: row;
  gap: 4.5rem;
}

.footer-column-item {
  padding-right: 30px;
}

.footer-item-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.footer-item-list {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  padding-top: 4px;
}

@media (max-width: 719px) {
  .footer-wrapper {
    flex-direction: column;
    justify-content: normal;
    align-items: flex-start;
    gap: 2.5rem;
  }

  .footer-info-wrapper {
    max-width: 100%;
  }
  
  .footer-column-wrapper {
    flex-direction: column;
    gap: 2.5rem;
  }
}
</style>