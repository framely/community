<script setup >
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, frontmatter } = useData()

const video = computed(() => {
  if (Array.isArray(frontmatter.value.video)) {
    return frontmatter.value.video
  }
  return []
})
</script>

<template>
  <div v-if="video.length" class="video-wrapper">
    <div v-for="video in video" :key="video.link">
      <video class="video-player" :src="video.link" controls>
      </video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video-wrapper {
  padding: 120px 40px 40px 40px;
  max-width: 1152px;
  margin: 0 auto;
  background-color: inherit;
  .video-player {
    height: 100%;
    width: 100%;
    border-radius: 12px;
  }
}

@media (max-width: 719px) {
  .video-wrapper {
    padding: 0 40px;
  }
}
</style>
