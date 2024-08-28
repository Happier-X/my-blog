---
title: Vue 模块化开发
cover: https://t.alcy.cc/fj?t=1724850000
order: 2
date: 2024-08-28 21:00
category: 软件开发
tag: Vue
excerpt: false
---

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue</title>
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
        import { createApp, reactive } from 'https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js'
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