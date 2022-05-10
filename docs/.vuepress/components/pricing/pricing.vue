<script lang="ts" setup>
defineProps({
  frontmatter: {
    type: Object,
    default: () => [],
  },
})
</script>
<template>
  <div class="main">
    <div class="top-info">
      <h1 v-if="frontmatter.title" class="top-info-title">{{ frontmatter.title }}</h1>
      <p v-if="frontmatter.tagline" class="top-info-desc">{{ frontmatter.tagline }}</p>
    </div>
    <div class="cards" v-if="frontmatter.cards">
      <!--  -->
      <div class="card" v-for="card in frontmatter.cards" :key="card">
        <div class="card-head">
          <h4 v-if="card.package">{{ card.package }}</h4>
          <div class="price-badge">
            <h1 v-if="card.price">{{ card.price }}</h1>
            <span v-if="card.badge" class="badge-price">{{ card.badge }}</span>
          </div>
          <p v-if="card.tagline" class="text-c-lightest">{{ card.tagline }}</p>
        </div>
        <div class="card-body">
          <ul>
            <li v-for="list in card.features" :key="list"><p class="text-c-lighter">{{ list }}</p></li>
          </ul>
        </div>
        <div class="card-footer">
          <p v-if="card.footertagline">{{ card.footertagline }}</p>
          <button class="button-small" v-if="card.link">
            <a :href="card.link">{{ card.buttonText }}</a>
          </button>
        </div>
      </div>

      <!--  -->
    </div>
  </div>

</template>
<style lang="scss" scoped>
footer{
    width: var(--homepage-width);
    margin: auto;
}
.main {
  max-width: var(--homepage-width);
  position: relative;
  margin-top: 30px;
  display: flex;
  margin: auto;
  flex-direction: column;

  .text-c-lightest{
    color: var(--c-text-lightest);
  }
  .text-c-lighter{
    color: var(--c-text-lighter);
  }

  .cards {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 0 2rem 2rem 2rem;

    .card {
      border: 1px solid var(--c-border);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      padding: 1em;

      .price-badge {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .badge-price {
          background: var(--c-icon);
          padding: 2px 5px;
          color: var(--c-brand) !important;
          border-radius: 2px;
          height: 20px;
          margin-left: 5px;
        }
      }
      .card-head {
        padding: 0 10px 20px 10px;
        border-bottom: 1px solid var(--c-border);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }
      .card-body {
        height: 100%;
        padding: 10px;

        ul {
          list-style: none;
          padding-left: 0;
          //height: 100%;
          min-height: fit-content;
        }
      }
      .card-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
        padding-top: 1rem;
        padding-bottom: 1rem;

        p {
          font-weight: bold;
        }
        button {
          width: 90%;
          a {
            color: var(--c-bg);
          }
        }
      }
    }
  }
}
@media (max-width: 719px) {
  .main {
    //width: 100%;
    .cards {
      display: flex;
      flex-direction: column;
      align-items: center;
      //width: 90%;
      .card {
        //width: 90%;
        min-width: fit-content;
      }
    }
  }
}
</style>