<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="article-page">
          <div class="top-info">
            <div class="top-info-title">
              <h1>Framely Blog</h1>
            </div>
            <div class="top-info-desc">
              <p>Machine intelligence for user experience</p>
            </div>
          </div>
          <ArticleList :items="articles.items" />
        </div>  
      </main>
      <Footer />
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import ArticleList from "../components/ArticleList.vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import Footer from "../../components/page/footer.vue"
const articles = useBlogType("article");
</script>
<style lang="scss"  scoped>
.article-page{
  max-width: var(--homepage-width);
  position: relative;
  margin-top: 30px;
  display: flex;
  margin: auto;
  flex-direction: column;
}

@media (max-width:719px){
  .page{
    max-width: 100%;
  }
 /*.article-page{
  width: 100%;
  margin: auto;
}*/
}

</style>
