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
      <!-- <a :href="path"> -->
      <div class="blog-card-divider"></div>
      <div class="blog-card">
        <!-- <div>
          <img class="blog-card-image" :src="info.image" />
        </div> -->
        <div class="blog-card-time">{{ info.date }}</div>
        <div class="blog-card-info">
          <div v-if="info.title">
            <h2 class="blog-card-info-title">{{ info.title }}</h2>
          </div>
          <div v-if="info.description">
            <p class="blog-card-info-description">{{ info.description[0] }}</p>
          </div>
          <div class="blog-card-info-bottom">
            <!-- <div class="author">{{ info.author }}</div> -->
            <!-- <div v-if="info.date">{{ new Date(info.date).toLocaleDateString() }}</div> -->
          </div>
          <a :href="path">
            Read more →
          </a>
        </div>
      </div>
      <!-- </a> -->
      <!-- End new layout -->

    </article>
  </div>
</template>

<script setup>
// import { RouterLink, useRoute } from 'vue-router'
// import { useRouter } from 'vitepress'
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  // router: useRouter()
})
</script>
<style lang="scss">
.article-wrapper {
  display: flex;
  flex-direction: column;
  // grid-template-columns: 1fr 1fr 1fr;
  // grid-template-rows: 1fr;
  // margin: 2rem auto;
  // grid-row-gap: 2rem;
  // grid-column-gap: 4rem;

  .blog-card-divider {
    height: 1px;
    margin-bottom: 24px;
    background-color: var(--vp-c-divider);
  }

  .blog-card {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    position: relative;
    top: 0;
    transition: top ease 0.5s;

    &:hover {
      border-radius: 6px;
      top: -10px;
    }

    margin-bottom: 1.5rem;
  }

  .blog-card-time {
    width: 16rem;
    padding: 1rem;
  }

  .blog-card-image {
    width: 100%;
    height: 10rem;
    border-radius: 6px;
    object-fit: cover;
    background-color: var(--c-bg-light);
  }

  .blog-card-info {
    display: flex;
    flex-direction: column;
    color: var(--c-text);
    padding-top: 1rem;

    >a {
      color: var(--vp-c-brand);
    }
  }

  .blog-card-info-title {
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 700;
    border-bottom: none;
    margin-bottom: 1.5rem;
  }

  .blog-card-info-description {
    color: var(--c-text-lighter);
    margin-top: 0px;
    font-weight: normal;
    margin-bottom: 1.5rem;
  }

  .blog-card-info-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
    color: var(--c-text-lighter);
    font-size: 12px;
    font-weight: normal;
  }

  .author {
    text-transform: uppercase;
  }
}

@media (max-width:960px) {
  .article-wrapper {
    padding: 0 2rem;
    grid-column-gap: 2rem;

    .blog-card-image {
      height: 12rem;
    }
  }
}

@media (max-width:719px) {
  .article-wrapper {
    grid-template-columns: 1fr;
    align-items: center;
  }

  .blog-card {
    border: 1px solid var(--c-border);
    border-radius: 6px;
    padding: 2rem;
  }

}
</style>