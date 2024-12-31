---
title: Vue 条件渲染
cover: https://t.alcy.cc/fj?t=1726043400000
order: 5
date: 2024-09-11 16:30
category: 开发
tag: Vue
excerpt: false
---

可以通过指令 `v-if` 或 `v-show` 控制组件的渲染

## v-if

根据表达式的真假条件性地渲染元素，可以配合 `v-else-if` 和 `v-else` 使用

:::tabs

@tab 单文件组件

```vue
<template>
  <div v-if="count === 1">count为1时显示</div>
  <div v-else-if="count === 2">count为2时显示</div>
  <div v-else>count不为1或2时显示</div>
  <button @click="add">按钮</button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
const add = () => {
  count.value++;
};
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <div v-if="count === 1">count为1时显示</div>
    <div v-else-if="count === 2">count为2时显示</div>
    <div v-else>count不为1或2时显示</div>
    <button @click="add">按钮</button>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const count = ref(0);
        const add = () => {
          count.value++;
        };
        return {
          count,
          add,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

### 在 template 上使用

如果我们想要切换不止一个元素，可以用 `<template>` 元素包裹，最后渲染时并不会包含这个 `<template>` 元素

:::tabs

@tab 单文件组件

```vue
<template>
  <template v-if="count === 0">
    <div>元素1</div>
    <div>元素2</div>
    <div>元素3</div>
  </template>
  <button @click="add">按钮</button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
const add = () => {
  count.value++;
};
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <template v-if="count === 0">
      <div>元素1</div>
      <div>元素2</div>
      <div>元素3</div>
    </template>
    <button @click="add">按钮</button>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const count = ref(0);
        const add = () => {
          count.value++;
        };
        return {
          count,
          add,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## v-show

根据表达式的真假条件性地显示或隐藏元素

:::tabs

@tab 单文件组件

```vue
<template>
  <div v-show="count === 1">count为1时显示</div>
  <button @click="add">按钮</button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
const add = () => {
  count.value++;
};
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <div v-show="count === 1">count为1时显示</div>
    <button @click="add">按钮</button>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const count = ref(0);
        const add = () => {
          count.value++;
        };
        return {
          count,
          add,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## v-if 对比 v-show

- `v-if` 是 “真正” 的条件渲染，它会根据条件是否成立来决定是否渲染元素
- `v-show` 只是简单地切换元素的 CSS 属性 `display`，元素始终会被渲染并保留在 DOM 中

因此，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。所以，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好
