<script setup >
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, frontmatter } = useData()

const contentCard = computed(() => {
  if (Array.isArray(frontmatter.value.contentCards)) {
    return frontmatter.value.contentCards
  }
  return []
})
</script>

<template>
  <div v-if="contentCard.length" class="container-c">
    <div v-for="contentCard in contentCard" :key="contentCard.details" class="contentCards">
      <div class="contentCard-card" v-if="contentCard.left">
        <div class="image">
          <img :src="contentCard.image" alt="" />
        </div>
        <div class="content">
          <h2 class="title">{{ contentCard.title }}</h2>
          <p class="desc">{{ contentCard.details }}</p>
        </div>
      </div>
      <div class="contentCard-card" v-else>
        <div class="content">
          <h2 class="title">{{ contentCard.title }}</h2>
          <p class="desc">{{ contentCard.details }}</p>
        </div>
        <div class="image">
          <img :src="contentCard.image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-c {
  margin: 2.5rem auto;
  padding: 0 64px;
  .contentCards {
    max-width: 1152px;
    margin: 0 auto;
    .contentCard-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4rem 0;
      gap: 4rem;
      .image {
        width: 60%;
      }
      .content {
        width: 40%;
        display: flex;
        flex-direction: column;
        .title {
          font-weight: 700;
          font-size: 2.25rem;
          line-height: 1;
          margin-bottom: 1.5rem;
        }
        .desc {
          color: var(--vp-c-text-2);
          font-weight: 500;
          font-size: 1.25rem;
          line-height: 2rem;
          margin-bottom: 2.5rem;
        }
      }
    }
  }
}
@media (max-width: 719px) {
  .container-c {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    .contentCards {
      .contentCard-card {
        display: flex;
        flex-direction: column;
        //padding: 2rem 0;
        gap: 2.5rem;
        .image {
          width: 100%;
        }
        .content {
          width: 100%;
          order: 1;
        }
      }
    }
  }
}
</style>