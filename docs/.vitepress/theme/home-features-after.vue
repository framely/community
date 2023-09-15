<script setup>
import { useData } from 'vitepress';
const { page, frontmatter } = useData()

console.log('frontmatter:', frontmatter);
import Cta from '../../components/cta/callToAction.vue'
import ContentCard from '../../components/contentCard/ContentCard.vue'
import Video from '../../components/video/videoSection.vue'
import CFooter from '../../components/footer/columnFooter.vue'

</script>

<template #home-features-after>
  <Video />
  <ContentCard />
  <Cta />
  <CFooter />
</template>

<style lang="scss">
.home-features-after {
  width: 100%;
  height: 200px;
  background: red;
}
</style>

