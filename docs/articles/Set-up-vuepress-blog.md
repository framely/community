---
article: true
date: 2022-04-13

image:
    - blog/test.png
description:
    - We will create a blog using vuepress2 for various use cases
author: karani
---

# Set up a blog with vuepressV2
![Banner](/images/blog/vuepress.png)

### outline

- Introduction
- What is vuepress
- Building the blog
- Conclusion
- Repo to get started

## What is vuepress

**Vuepress** is a static site generator that uses markdown. It's mainly used for documentation.

### Features

- Minimal setup
- Powered by allowing for customization and developing of new themes.
- Runs as a SPA
- A default theme that works out of the box
- A plugin API to add more fatures to your site.

On the next step, we will focus on our main abjective. This is how to bring up a blog for your content. The advantage with vuepress is you don't need a backend. Just markdown and a plugin that adds blog features.

#### Requirements

- `Node.js version 14+`
- Basic knowledge of vue

Once you have that installed on your machine, the next step is to install vuepress-next.
First make a new dir for your project
```
mkdir blog
cd blog
```
Then install
```
yarn add -D vuepress@next
```

We will then move to setting up the homepage for our initial set up.
```
mkdir docs
```
Then add in `docs` a file `README.md` and add the frontmatter for it to set up homepage. 
[Checkout the docs for for more](https://v2.vuepress.vuejs.org/guide/page.html#frontmatter)
We will only do the basics

```markdown
---
home: true

actions:
  - text: Blogs
    link: https://example.com
    type: primary
  - text: Portfolio
    link: https://example.com
    type: secondary
---

```
Now run the following command and you should be able to view your initial set up
```
npx vuepress dev docs
```

### Add the plugin

This allows us to add blog features to our new site
```
yarn add -D vuepress-plugin-blog2@next
```
In the docs folder, a directory `.vuepress` should have been created. We need to add a few more files and directories.

- `theme`
- `public` - stores our assets
- `config.ts` file

Let's add some configuration to the `.vupress/config.ts`. [Check this config file for more settings](https://v2.vuepress.vuejs.org/reference/config.html#site-config). We will basically do a minimum of this. Add a title and add a link for our blog

```ts
import { defineUserConfig } from '@vuepress/cli'

import type { DefaultThemeOptions } from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions>({

    title:"my vuepress blog",
     themeConfig:{
        navbar:[
            {
                text:"blog",
                link:"/blog/"
            }
        ]
    }
})
```

Next we move to setting up pages for listing our articles. If you click the blog page, it goes to 404. Let's create a page that we will import to show the articles. 
Go to `.vuepress/theme` and add `components` and `layouts` directory. In addition add an `index.ts`file in *theme* directory.

Inside `components` create a `.vue` file for my case `ArticleCard.vue` and add the following piece of code:
```vue
<template>
  <div class="article-wrapper">
    <div v-if="!items.length">Nothing in here.</div>
    <article class="article" v-for="{ info, path } in items" :key="path">
        <RouterLink :to="path">
          {{ info.title }}
        </RouterLink>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date" class="date"
          >Date: {{ new Date(info.date).toLocaleDateString() }}</span
        >
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped>
.article-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    article{
        display: flex;
        height: 100px;
        width: 50%;
        border-bottom:1px solid var(--c-border) ;
        align-items: center;
        a{
            font-size: 2em;
        }
    }
}
</style>
```
This is basically a vue file that will loop over an array of articles we will get. Next we create `layouts` directory and add `ArticlePage.vue` and import a few things. We are basically trying to extend the parent layout. [Read more about extending here.](https://v2.vuepress.vuejs.org/reference/theme-api.html#extends)
```vue
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
import ArticleList from "../components/ArticleCard.vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
const articles = useBlogType("article");
</script>
```
It is important to note the `useBlogType` used here that we pass ` "articles" ` as a parameter. This is in refrence to the plugin we added.
[Read more here](https://vuepress-theme-hope.github.io/v2/blog/config.html#blog-type-config)

Next we move to our `index.ts` file and do some configuration.

```ts
import { path } from "@vuepress/utils";
import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const blogTheme: Theme<DefaultThemeOptions> = {
  name: "blog-theme",

  extends: "@vuepress/theme-default",

  layouts: {
    Article: path.resolve(__dirname, "./layouts/ArticlePage.vue"),
  },

  plugins: [
    [
      "blog2",
      {
        filter: ({ filePathRelative }) =>
          filePathRelative && filePathRelative.startsWith("blog/"),
        getInfo: ({ frontmatter, title }) => ({
          title,
          author: frontmatter.author || "",
          date: frontmatter.date || null,
       
        }),
        type: [
          {
            key: "article",
            path: "/blog/",
            layout: "Article",
            frontmatter: () => ({ title: "Articles", sidebar: false, }),
          },
        ],
        hotReload: true,
      },
    ],
  ],
};

export default blogTheme;
```
We are basically extending the layout and configuring the plugin to check for our directory which contains the blog articles. This is basically why we have:
```ts
  filter: ({ filePathRelative }) =>
          filePathRelative && filePathRelative.startsWith("blog/"),
```
Incase we want to add documentation to other parts but consider a specific directory as containing our articles. For now we are focusing on the basics you can do more configuration by sorting, filtering other items using a boolean.

The `getInfo` takes the frontmatter and passes it to the components. [Read the docs for more on configurations](https://vuepress-theme-hope.github.io/v2/blog/config.html#plugin-options) 

Next we will import our theme to the `config.ts`.

```ts
...
    title:"my vuepress blog",
    theme: path.resolve(__dirname, "./theme"),
...

})
```
Now we should add our `blog` dir and add a few articles eg:

`/docs/blog/article1.md`
```md
---
date: 2022-01-01
---

# Article 1

## Heading 2

Here is the content.

### Heading 3

Here is the content.

```

`/docs/blog/article2.md`
```md
---
date: 2022-01-01
---

# Article 1

## Heading 2

Here is the content.

### Heading 3

Here is the content.
```
Now you should be able to see your article. 

## Conclusion
It is important to note that we can do anything and style our blogs and if we feel the default theme doesn't work for us we can change everything to whatever we want. This is the power of vuepress, you can replace anything you feel does not work for you. [Check out this list of components](https://github.com/vuepress/vuepress-next/tree/main/packages/%40vuepress/theme-default/src/client/components). You could pick them and change their styling to whatever format you wish.

[Here is the repo to this incase you just want to start](https://github.com/karani12/vuepress-blog). 