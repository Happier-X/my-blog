---
title: Vue 组件上使用 v-model
cover: https://t.alcy.cc/fj?t=1727256600000
order: 19
date: 2024-09-25 17:30
category: 软件开发
tag: Vue
excerpt: false
---

## 基本用法

在子组件中使用 `defineModel()`，在父组件中的子组件上使用 `v-model` 绑定，此时 `defineModel()` 返回的值将和 `v-model` 绑定的值进行双向绑定

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  {{ studentName }}
  <Student v-model="studentName"></Student>
</template>

<script setup>
import Student from './components/Student.vue'
import { ref } from 'vue'
const studentName = ref('John')
</script>
```

```vue
<!-- Student.vue -->
<template>
    <input type="text" v-model="name">
</template>
<script setup>
import { defineModel } from 'vue'
const name = defineModel()
</script>
<style scoped>
h1 {
    color: pink;
}
</style>
```
@tab HTML

`defineModel()` 只能用在 `<script setup>` 上

:::