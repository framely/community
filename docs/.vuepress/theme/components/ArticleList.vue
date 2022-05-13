<template>
  <div class="article-wrapper">

    <div v-if="!items.length">Nothing in here.</div>
    <!-- <div class="container-article" v-for="{ info, path } in items" :key="info">
      <div class="sticky" v-if="info.sticky">
        {{info.title}}
      </div>
    </div> -->

    <article v-for="{ info, path } in items" :key="info">
      
      <!-- New layout -->
      <RouterLink :to="path">
      <div class="blog-card">
        <div >
          <img class="blog-card-image" :src="info.image" />
        </div>
        <div class="blog-card-info">
          <div v-if="info.title">
            <!-- <RouterLink :to="path"> -->
            <h2 class="blog-card-info-title">{{ info.title }}</h2>
          </div>
          <div v-if="info.description">
            <p class="blog-card-info-description">{{ info.description[0] }}</p>
          </div>
          <div class="blog-card-info-bottom">
            <div class="author">{{ info.author }}</div>
            <div v-if="info.date">{{ new Date(info.date).toLocaleDateString() }}</div> 
          </div>
        </div>
      </div>
      </RouterLink>
      <!-- End new layout -->

    </article>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
<style lang="scss">
/*.sticky{
  width: var;
}*/
.article-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  margin: 2rem auto;
  padding: 0 2rem;
  grid-row-gap: 2rem;
  //grid-column-gap: 2rem;

    .blog-card {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 1.5rem;
      position: relative;
      top: 0;
      transition: top ease 0.5s;
    }

    .blog-card:hover {
      border: 1px solid var(--c-border);
      border-radius: 6px;
      top: -10px;
    }

    .blog-card-image {
      width: 100%;
      height: 12rem;
      border-radius: 6px;
      object-fit: cover;
    }

    .blog-card-info {
      display: flex;
      flex-direction: column;
      color: var(--c-text);
      padding-top: 1rem;
    }      

    .blog-card-info-title {
      text-transform: capitalize;
      font-size: 20px;
      font-weight: 700;
      border-bottom: none;
    }

    .blog-card-info-description {
      color: var(--c-text-lighter);
      margin-top: 0px;
      font-weight: normal
    }

    .blog-card-info-bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.5rem;
      color: var(--c-text-lighter);
      font-size: 12px;
      font-weight: normal
    }

    .author{
      text-transform: uppercase;
    }
}
@media (max-width:719px){
  .article-wrapper {
    grid-template-columns:1fr ;
    //width: 100%;
    align-items: center;
    justify-items: center;
  }
  .blog-card {
    border: 1px solid var(--c-border);
    border-radius: 6px;
    padding: 2rem;
  }
   
}
</style>