<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="articles.items" />
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import {useRouteLocale} from "@vuepress/client";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import ArticleList from "../components/ArticleList.vue";
// console.log(useRouteLocale(useBlogType("article"))
console.log(useRouteLocale("/article").value)
const articles = useBlogType("Article");
</script>