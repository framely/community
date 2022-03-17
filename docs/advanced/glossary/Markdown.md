## Default theme markdown
### Table syntax
#### Input 
Learn more details click [here](https://vuepressbook.com/tutorial/tutorial5.html)
``` md
| Column 1             |   Column 2   |    Column 3 |
|----------------------|:------------:|------------:|
|Default align (left)  |Center align  |Right align  |
| x                    |x             |x            |
| xx                   |xx            |xx           |
```

#### Output
| Column 1             |   Column 2   |    Column 3 |
|----------------------|:------------:|------------:|
| Default align (left) | Center align | Right align |
| xx                   |      xx      |          xx |


### Custom Containers
#### Input
```md
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block
:::
```

#### Output
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block
:::


## Syntax extensions
### Links
[Home](../README.md)\
[Config Reference](../reference/config.md)\
[Github](http://github.com)


### Emoji 
 :heart: 

### Table of contents
[[toc]]

### Code blocks
#### Default
```ts
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: 'Hello, VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```
#### Highlight line 
```ts{1,6-8}
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: 'Hello, VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```
#### Disable line numbers 
```ts:no-line-numbers
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: 'Hello, VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```
### Wrap with v-pre
#### Default
```md
<!-- This will be kept as is by default -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```
#### No v-pre
```md:no-v-pre
<!-- This will be compiled by Vue -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```
## Using Vue in markdown
### Template syntax
Learn more click [here](https://vuejs.org/guide/essentials/template-syntax.html)
#### Input
```
One plus one equals: {{ 1 + 1 }} \

<span v-for="i in 3"> span: {{ i }} </span>
```
#### Output
One plus one equals: {{ 1 + 1 }} \
<span v-for="i in 3"> span: {{ i }} </span>

### Markdown and Vue SFC
SFC is single file component, learn more click [here](https://v2.vuepress.vuejs.org/advanced/cookbook/markdown-and-vue-sfc.html)
#### Input
```vue
_Hello, {{ msg }}_

<RedDiv>

_Current count is: {{ count }}_

</RedDiv>

<button @click="count++">Click Me!</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Vue in Markdown'
const count = ref(0)
</script>

<style>
.red-div {
  color: grey;
}
</style>
```
#### Output
_Hello, {{ msg }}_

<RedDiv>

_Current count is: {{ count }}_

</RedDiv>

<button @click="count++">Click Me!</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Vue in Markdown'
const count = ref(0)
</script>

<style>
.red-div {
  color: grey;
}
</style>

### Built in component
Click [here](https://v2.vuepress.vuejs.org/reference/default-theme/components.html#badge) for a full list of built-in components.
#### Input
``` md
- Badge
  - Default - <Badge text="demo" />
  - Tip at top - <Badge type="tip" text="v2" vertical="top" />
  - Warning at middle - <Badge type="warning" text="v2" vertical="middle" />
  - Danger at bottom - <Badge type="danger" text="v2" vertical="bottom" />
```
#### Output

- Badge
  - Default - <Badge text="demo" />
  - Tip at top - <Badge type="tip" text="v2" vertical="top" />
  - Warning at middle - <Badge type="warning" text="v2" vertical="middle" />
  - Danger at bottom - <Badge type="danger" text="v2" vertical="bottom" />
- Code group
<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>



