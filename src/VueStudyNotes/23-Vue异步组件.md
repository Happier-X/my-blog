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
                    // return import('./Student.js')
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

## 加载与错误状态

异步组件在加载和错误状态时，可以显示不同的内容

```javascript
defineAsyncComponent({
    // 加载函数
    loader: () => import('./MyComponent.vue'),
    // 加载异步组件时显示的组件
    loadingComponent: LoadingComponent,
    // 展示加载组件之前的延迟时间，默认为 200ms
    delay: 200,
    // 加载失败时显示的组件
    errorComponent: ErrorComponent,
    // 如果提供了一个超时时间（单位为毫秒），并且加载组件超过了设定时间，将显示错误组件
    timeout: 3000
})

