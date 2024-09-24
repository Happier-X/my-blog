---
title: Vue 组件化编程
cover: https://t.alcy.cc/fj?t=1727056800000
order: 15
date: 2024-09-23 10:00
category: 软件开发
tag: Vue
excerpt: false
---
组件化编程是 Vue 的核心思想之一，它允许我们将一个复杂的页面拆分成多个小的、可复用的组件，从而提高代码的可维护性和可读性

## 定义组件

使用 create-vue 构建项目时，每个 `.vue` 文件就是一个组件，他包含了模板、脚本和样式三部分

```vue
<!-- Student.vue -->
<!-- 定义了一个组件 -->
<template>
    <h1>{{ name }}</h1>
</template>
<script setup>
import { ref } from 'vue'
const name = ref('John')
</script>
<style scoped>
h1 {
    color: pink;
}
</style>
```

不使用 create-vue 构建项目时，一个 Vue 组件是一个包含 Vue 特定选项的对象

```javascript
// 定义一个组件
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const name = ref('John')
        return {
            name
        }
    },
    template: `
        <div>
            <h1>{{ name }}</h1>
        </div>`
}
```
