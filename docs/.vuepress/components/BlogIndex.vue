<template>
<div>
    <div v-for="post in posts" :key="post">
        <h2>
            <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        </h2>
        
        <p>{{ post.frontmatter.description }}</p>

        <p><router-link :to="post.path">Read more</router-link></p>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent,toRefs } from 'vue'
import type { Page } from "@vuepress/core";

export default defineComponent({
    setup(props) {
        // @ts-ignore
        const pr = toRefs(props)
        


        
    },
})
</script>
