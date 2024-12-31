---
title: Vue 数据渲染
cover: https://t.alcy.cc/fj?t=1726641000000
order: 10
date: 2024-09-18 14:30
category: 开发
tag: Vue
excerpt: false
---

## v-text

`v-text` 指令用于将数据渲染到元素的文本内容中，它会覆盖元素原有的文本内容

:::tabs

@tab 单文件组件

```vue
<template>
  <div v-text="text"></div>
</template>

<script setup>
import { ref } from "vue";
const text = ref("hello world");
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <div v-text="text"></div>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const text = ref("hello world");
        return {
          text,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## v-html

`v-html` 指令用于将数据渲染到元素的 HTML 内容中，它会解析并渲染 HTML 标签

:::tabs

@tab 单文件组件

```vue
<template>
  <div v-html="html"></div>
</template>

<script setup>
import { ref } from "vue";
const html = ref("<h1>hello world</h1>");
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <div v-html="html"></div>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const html = ref("<h1>hello world</h1>");
        return {
          html,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::
