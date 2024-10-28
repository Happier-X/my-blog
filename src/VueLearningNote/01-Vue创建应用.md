---
title: Vue 创建应用
cover: https://t.alcy.cc/fj?t=1724250600
order: 1
date: 2024-08-21 22:30
category: 软件开发
tag: Vue
excerpt: false
---
> Vue 是一个用于构建用户界面的渐进式 JavaScript 框架，渐进式是指在使用 Vue 的过程中，可以根据项目的需求和复杂性，逐步选择和引入 Vue 的各个功能和特性

## 使用 create-vue 脚手架

`create-vue` 是一个用于快速创建 Vue 项目的脚手架工具，它可以帮助我们快速搭建一个 Vue 项目，并提供一些常用的配置和工具

```sh
npm create vue@latest
```

安装完后，根据提示选择配置并启动项目

```html
<!-- index.html -->
<body>
    <!-- 指定一个 id 为 app 的 div 容器 -->
   <div id="app"></div>
   <!-- 引入 Vue -->
   <script type="module" src="/src/main.js"></script>
</body>
```

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
// 创建一个 Vue 应用并将其挂载到 id 为 app 的 div 容器上
createApp(App).mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <!-- {{  }} 是插值表达式，可以将定义的数据在视图中渲染 -->
  <div class="container">{{ message }}</div>
</template>

<script>
// 书写逻辑代码
import { ref } from 'vue'
export default {
  // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
  setup() {
    // ref 是定义响应式数据的函数
    // 响应式数据是指当数据发生变化时，模板中依赖该数据的部分会自动更新
    const message = ref('Hello World')
    return {
      message
    }
  }
}
</script>

<style scoped>
/* 书写样式，scoped 表示样式只作用于当前组件 */
.container {
  color: pink;
}
</style>
```

可以使用 `setup` 语法糖来简写：

```vue
<!-- App.vue -->
<template>
  <!-- {{  }} 是插值表达式，可以将定义的数据在视图中渲染 -->
  <div class="container">{{ message }}</div>
</template>

<script setup>
// 书写逻辑代码
// ref 是定义响应式数据的函数
// 响应式数据是指当数据发生变化时，模板中依赖该数据的部分会自动更新
import { ref } from 'vue'
const message = ref('Hello World')
</script>

<style scoped>
/* 书写样式，scoped 表示样式只作用于当前组件 */
.container {
  color: pink;
}
</style>
```

## 使用 CDN 引入 Vue

### 使用全局构建

```vue-html
<head>
    <!-- 引入 Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body>
    <!-- 指定一个 id 为 app 的 div 容器 -->
    <!-- {{ }} 是插值表达式，可以将 Vue 实例中定义的数据在视图中渲染 -->
    <div id="app">
        <div>{{ message }}</div>
    </div>
    <script>
        // 创建一个 Vue 应用
        Vue.createApp({
            // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
            setup() {
                // Vue.ref 用于创建一个响应式数据
                // 响应式数据是指当数据发生变化时，模板中依赖该数据的部分会自动更新
                const message = Vue.ref('Hello World')
                // 返回数据
                return {
                    message
                }
            }
        }).mount('#app') // 将 Vue 应用挂载到 id 为 app 的 div 容器上
    </script>
</body>
```

可以使用解构赋值语法来简写：

```vue-html
<head>
    <!-- 引入 Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body>
    <!-- 指定一个 id 为 app 的 div 容器 -->
    <!-- {{ }} 是插值表达式，可以将 Vue 实例中定义的数据在视图中渲染 -->
    <div id="app">
        <div>{{ message }}</div>
    </div>
    <script>
        // 解构赋值，从 Vue 中导入 createApp 和 ref
        const { createApp, ref } = Vue
        // 创建一个 Vue 应用
        createApp({
            // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
            setup() {
                // ref 用于创建一个响应式数据
                // 响应式数据是指当数据发生变化时，模板中依赖该数据的部分会自动更新
                const message = ref('Hello World')
                // 返回数据
                return {
                    message
                }
            }
        }).mount('#app') // 将 Vue 应用挂载到 id 为 app 的 div 容器上
    </script>
</body>
```

### 使用 ES 模块构建

```vue-html
<body>
    <!-- 指定一个 id 为 app 的 div 容器 -->
    <!-- {{ }} 是插值表达式，可以将 Vue 实例中定义的数据在视图中渲染 -->
    <div id="app">
        <div>{{ message }}</div>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        // 创建一个 Vue 应用
        createApp({
            // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
            setup() {
                // ref 用于创建一个响应式数据
                // 响应式数据是指当数据发生变化时，模板中依赖该数据的部分会自动更新
                const message = ref('Hello World')
                // 返回数据
                return {
                    message
                }
            }
        }).mount('#app') // 将 Vue 应用挂载到 id 为 app 的 div 容器上
    </script>
</body>
```
