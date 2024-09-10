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

## 使用全局构建

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 引入 Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <title>创建应用</title>
</head>
<body>
    <!-- 指定一个 id 为 app 的 div 容器 -->
    <!-- {{ }} 是插值表达式，可以将 Vue 实例中定义的数据在视图中渲染 -->
    <!-- 响应式数据是指当数据发生变化时，模板中依赖于该数据的部分会自动更新 -->
    <div id="app">
        <h1>{{ title }}</h1>
        <p>{{message.text1}}</p>
        <p>{{message.text2}}</p>
    </div>
    <script>
        // 创建一个 Vue 应用
        Vue.createApp({
            // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
            setup(){
                // Vue.reactive 用于创建一个响应式对象
                const message = Vue.reactive({
                    text1: 'Hello text1!',
                    text2: 'Hello text2!'
                })
                // 返回数据
                return{
                    title: 'Hello Vue',
                    message
                }
            }
        }).mount('#app') // 将 Vue 应用挂载到 id 为 app 的 div 容器上
    </script>
</body>
</html>
```

可以使用解构赋值语法来简写：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 引入 Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <title>创建应用</title>
</head>
<body>
    <!-- 指定一个 id 为 app 的 div 容器 -->
    <!-- {{ }} 是插值表达式，可以将 Vue 实例中定义的数据在视图中渲染 -->
    <!-- 响应式数据是指当数据发生变化时，模板中依赖于该数据的部分会自动更新 -->
    <div id="app">
        <h1>{{ title }}</h1>
        <p>{{message.text1}}</p>
        <p>{{message.text2}}</p>
    </div>
    <script>
        // 解构赋值，从 Vue 中导入 createApp 和 reactive
        const { createApp, reactive } = Vue
        // 创建一个 Vue 应用
        createApp({
            // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
            setup(){
                // reactive 用于创建一个响应式对象
                const message = reactive({
                    text1: 'Hello text1!',
                    text2: 'Hello text2!'
                })
                // 返回数据
                return{
                    title: 'Hello Vue',
                    message
                }
            }
        }).mount('#app') // 将 Vue 应用挂载到 id 为 app 的 div 容器上
    </script>
</body>
</html>
```

## 使用 ES 模块构建

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>创建应用</title>
</head>
<body>
    <!-- 指定一个 id 为 app 的 div 容器 -->
    <!-- {{ }} 是插值表达式，可以将 Vue 实例中定义的数据在视图中渲染 -->
    <!-- 响应式数据是指当数据发生变化时，模板中依赖于该数据的部分会自动更新 -->
    <div id="app">
        <h1>{{ title }}</h1>
        <p>{{message.text1}}</p>
        <p>{{message.text2}}</p>
    </div>
    <script type="module">
        import { createApp, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        // 创建一个 Vue 应用
        createApp({
            // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
            setup(){
                // reactive 用于创建一个响应式对象
                const message = reactive({
                    text1: 'Hello text1!',
                    text2: 'Hello text2!'
                })
                // 返回数据
                return{
                    title: 'Hello Vue',
                    message
                }
            }
        }).mount('#app') // 将 Vue 应用挂载到 id 为 app 的 div 容器上
    </script>
</body>
</html>
```