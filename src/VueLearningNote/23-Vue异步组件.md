---
title: Vue 异步组件
cover: https://t.alcy.cc/fj?t=1727688600000
order: 23
date: 2024-09-30 17:30
category: 软件开发
tag: Vue
excerpt: false
---

Vue 提供了一个可以异步加载组件的机制，即异步组件

异步组件可以让我们在需要的时候才加载组件，从而提高用户的体验

## 基本用法

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student></Student>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const Student = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(import('./components/Student.vue'))
    }, 2000)
  })
  // ES 模块动态导入也会返回一个 Promise
  // return import('./components/Student.vue')
})
</script>
```
```vue
<!-- Student.vue -->
<template>
    <div>我是子组件</div>
</template>
```

@tab HTML

```html
<body>
    <div id="app">
        我是父组件
        <Student></Student>
    </div>
    <script type="module">
        import { createApp, defineAsyncComponent } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            components: {
                Student: defineAsyncComponent(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(import('./Student.js'))
                        }, 2000)
                    })
                    // ES 模块动态导入也会返回一个 Promise
                    // return import('./components/Student.vue')
                })
            }
        }).mount('#app')
    </script>
</body>
```
```javascript
// Student.js
export default {
    template: `
        <div>我是子组件</div>`
}
```
:::

