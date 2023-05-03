<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

// const { Layout } = DefaultTheme
defineProps({
  frontmatter: {
    type: Object,
    default: () => [],
  },
})

// const { page, frontmatter } = useData()

</script>
<template>
  <div class="main">
    <div class="pricing-top-info">
      <h1 v-if="frontmatter.title" class="pricing-top-title">{{ frontmatter.title }}</h1>
      <p v-if="frontmatter.tagline" class="pricing-top-desc">{{ frontmatter.tagline }}</p>
    </div>
    <div class="cards" v-if="frontmatter.cards">
      <div class="card" v-for="card in frontmatter.cards" :key="card">
        <div class="card-head">
          <h4 class="card-head-package" v-if="card.package">{{ card.package }}</h4>
          <div class="price-badge-container">
            <h1 class="card-head-price" v-if="card.price">{{ card.price }}</h1>
            <span v-if="card.badge" class="badge-price">{{ card.badge }}</span>
          </div>
          <p v-if="card.tagline" class="text-tagline">{{ card.tagline }}</p>
        </div>
        <div class="card-body">
          <ul>
            <li v-for="list in card.features" :key="list">
              <p class="text-light">{{ list }}</p>
            </li>
          </ul>
        </div>
        <div class="card-footer">
          <p v-if="card.footertagline">{{ card.footertagline }}</p>
          <button v-if="card.link">
            <a :href="card.link">{{ card.buttonText }}</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.aside {
  width: 0 !important;
}

.main {
  max-width: var(--homepage-width);
  position: relative;
  margin-top: 30px;
  display: flex;
  margin: auto;
  flex-direction: column;

  .text-light {
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    padding-top: 8px;
  }

  .pricing-top-info {
  margin: 2.5rem;
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 2rem;

  .pricing-top-title {
    font-size: 36px;
    font-weight: 600;
    line-height: 1.6;
  }

  .pricing-top-desc {
    font-weight: 500;
    line-height: 28px;
    color: var(--vp-c-text-2);
    padding: 1rem;
  }
}
  .cards {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 48px;
    padding: 0 2rem;

    .card {
      background-color: var(--vp-c-bg-soft);
      //border: 1px solid var(--c-border);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      //padding: 1em;
      position: relative;
      top: 0;
      transition: top ease 0.5s;
      &:hover {
        top: -10px;
      }

      .card-head-package{
        font-weight: 500;
      }

      .price-badge-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-top: 24px;
      }

      .card-head-price{
        font-size: 48px;
        font-weight: 500;
      }
      .badge-price {
        background: var(--vp-c-bg-icon);
        padding: 2px 8px;
        color: var(--vp-c-brand) !important;
        border-radius: 4px;
        //height: 20px;
        margin-left: 6px;
      }

      .text-tagline{
        color: var(--vp-c-text-2);
        padding-top: 24px;
      }
      .card-head {
        padding: 24px 32px;
        border-bottom: 1px solid var(--vp-c-border);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 24px;
      }

      .card-body {
        height: 100%;
        padding: 32px 32px;
      }

      .card-footer {
        //display: flex;
        //flex-direction: column;
        //align-items: center;
        //row-gap: 10px;
        padding: 24px;
        text-align: center;

        button {
          width: 90%;
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
      }
    }
  }
}

@media (max-width: 719px) {
  .main {
    .cards {
      display: flex;
      flex-direction: column;

      .card {
        min-width: fit-content;
      }
    }
  }
}
</style>