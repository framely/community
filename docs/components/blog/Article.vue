<template>
  <!-- <ParentLayout> -->
  <!-- <template #page> -->
  <main class="page">
    <div class="article-page">
      <div class="top-info">
        <div class="top-info-title">
          <h1>CUI Corner</h1>
        </div>
        <div class="top-info-desc">
          <p>Democratizing great conversational experiences, one blog at a time. </p>
        </div>
      </div>
      <ArticleList :items="articles.items" />
    </div>
  </main>
  <!-- </template> -->
  <!-- </ParentLayout> -->
</template>
<script setup >

import ArticleList from './ArticleList.vue'
import Footer from './../footer/footer.vue'

defineProps({
  frontmatter: {
    type: Object,
    default: () => [],
  },
  articles: {
    type: Object,
    default: () => [],
  },
})

</script>
<style lang="scss"  scoped>
.article-page {
  max-width: var(--homepage-width);
  position: relative;
  margin-top: 30px;
  display: flex;
  margin: auto;
  flex-direction: column;
}

.top-info-title {
  h1 {
    font-weight: 600;
    line-height: 3.0;
  }
}

@media (max-width: 719px) {
  .page {
    max-width: 100%;
  }

  /*.article-page{
  width: 100%;
  margin: auto;
}*/
}
</style>
