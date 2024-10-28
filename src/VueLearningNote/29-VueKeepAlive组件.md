---
title: Vue KeepAlive 组件
cover: https://t.alcy.cc/fj?t=1728034200
order: 29
date: 2024-10-04 17:30
category: 软件开发
tag: Vue
excerpt: false
---

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件动态切换时缓存被移除的组件实例

## 基本用法

:::tabs
@tab 单文件组件
```vue
<!-- App.vue -->
<template>
  <KeepAlive>
    <component :is="tab[index]"></component>
  </KeepAlive>
  <button @click="changeTab">切换</button>
</template>

<script setup>
import Student from './components/Student.vue'
import Teacher from './components/Teacher.vue'
import { ref } from 'vue'
const tab = [Student, Teacher]
const index = ref(0)
const changeTab = () => {
  index.value = index.value === 0 ? 1 : 0
}
</script>
```
```vue
<!-- Student.vue -->
<template>
    <h1>{{ name }}</h1>
    <button @click="name = 'Student-1'">改变名称</button>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Student')
</script>
```
```vue
<!-- Teacher.vue -->
<template>
    <h1>{{ name }}</h1>
    <button @click="name = 'Teacher-1'">改变名称</button>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Teacher')
</script>
```
@tab HTML
```html
<body>
    <div id="app">
        <keep-alive>
            <component :is="tab[index]"></component>
        </keep-alive>
        <button @click="changeTab">切换</button>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        import Teacher from './Teacher.js'
        createApp({
            components: {
                Student,
                Teacher
            },
            setup() {
                const tab = [Student, Teacher]
                const index = ref(0)
                const changeTab = () => {
                    index.value = index.value === 0 ? 1 : 0
                }
                return {
                    tab,
                    index,
                    changeTab
                }
            }
        }).mount('#app')
    </script>
</body>
```
```javaScript
// Student.js
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const name = ref('Student')
        return {
            name
        }
    },
    template: `
        <h1>{{ name }}</h1>
        <button @click="name = 'Student-1'">改变名称</button>`
}
```
```javaScript
// Teacher.js
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const name = ref('Teacher')
        return {
            name
        }
    },
    template: `
        <h1>{{ name }}</h1>
        <button @click="name = 'Teacher-1'">改变名称</button>`
}
```
:::

## 包含、排除

`<KeepAlive>` 组件可以通过 `include` 和 `exclude` 属性来指定哪些组件需要被缓存，这两个属性的值都可以是一个以英文逗号分隔的字符串、正则表达式或包含这两种类型的一个数组

```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="teacher,student"></KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/teacher|student/"></KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['teacher', 'student']"></KeepAlive>
```

它会根据组件的 `name` 选项进行匹配

## 最大缓存数

`<KeepAlive>` 组件可以通过 `max` 属性来限制缓存组件的最大数量，当缓存组件数量超过 `max` 时，最早缓存的组件将被销毁

```vue
<KeepAlive :max="10"></KeepAlive>
```

## 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新被激活

一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子

`onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用

这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件