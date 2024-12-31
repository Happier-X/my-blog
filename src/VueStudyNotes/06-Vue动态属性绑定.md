---
title: Vue 动态属性绑定
cover: https://t.alcy.cc/fj?t=1726146000
order: 6
date: 2024-09-12 21:00
category: 开发
tag: Vue
excerpt: false
---

## 基本用法

使用指令 `v-bind` 来为 HTML 元素绑定属性，可以动态地改变属性值

简写形式为 `:`

:::tabs

@tab 单文件组件

```vue
<template>
  <p v-bind:id="dynamicId">你好</p>
  <button @click="dynamicId = 'id2'">改变id</button>
  <!-- 简写 -->
  <p :id="shorthandDynamicId">你好</p>
  <button @click="shorthandDynamicId = 'shorthandDynamicId2'">改变id</button>
</template>

<script setup>
import { ref } from "vue";
const dynamicId = ref("id1");
const shorthandDynamicId = ref("shorthandId1");
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <p v-bind:id="dynamicId">你好</p>
    <button @click="dynamicId = 'id2'">改变id</button>
    <!-- 简写 -->
    <p :id="shorthandDynamicId">你好</p>
    <button @click="shorthandDynamicId = 'shorthandDynamicId2'">改变id</button>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const dynamicId = ref("id1");
        const shorthandDynamicId = ref("shorthandId1");
        return {
          dynamicId,
          shorthandDynamicId,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 同名简写

如果绑定的属性名与绑定的 JavaScript 值的名称相同，可以进一步简化

:::tabs

@tab 单文件组件

```vue
<template>
  <p :id>你好</p>
  <button @click="id = 'id2'">改变id</button>
</template>

<script setup>
import { ref } from "vue";
const id = ref("id1");
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <p :id>你好</p>
    <button @click="id = 'id2'">改变id</button>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const id = ref("id1");
        return {
          id,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 动态绑定多个值

通过不带参数的 `v-bind`，可以将包含多个值的 JavaScript 对象绑定到单个元素上

:::tabs

@tab 单文件组件

```vue
<template>
  <p v-bind="object">你好</p>
</template>

<script setup>
import { ref } from "vue";
const object = ref({
  id: 1,
  name: "张三",
});
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <p v-bind="object">你好</p>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const object = ref({
          id: 1,
          name: "张三",
        });
        return {
          object,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::
