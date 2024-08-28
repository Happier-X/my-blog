---
title: Vue 响应式数据
cover: https://t.alcy.cc/fj?t=1724851800
order: 3
date: 2024-08-28 21:30
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
    <div id="app">
        <h1>{{ title }}</h1>
        <p>{{message.text1}}</p>
        <p>{{message.text2}}</p>
    </div>
    <script type="module">
        import { createApp, ref, reactive } from 'https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js'
        // 创建一个 Vue 应用
        createApp({
            // setup 是一个特殊的函数，用于定义组件的响应式数据和方法等
            setup(){
                // ref 用于创建一个响应式数据
                const title = ref('Hello Vue')
                // 用 ref 创建的响应式数据需要通过 .value 来访问和修改
                title.value = 'Hello Vue!'
                // reactive 用于创建一个响应式对象
                const message = reactive({
                    text1: 'Hello text1',
                    text2: 'Hello text2'
                })
                // reactive 创建的响应式对象可以直接访问和修改
                message.text1 = 'Hello text1!'
                message.text2 = 'Hello text2!'
                // 返回数据
                return{
                    title,
                    message
                }
            }
        }).mount('#app') // 将 Vue 应用挂载到 id 为 app 的 div 容器上
    </script>
</body>
</html>
```

- ref 用于创建一个响应式数据（也可以用来创建对象或数组）
- reactive 用于创建一个响应式对象（或数组）
- 用 ref 创建的响应式数据需要通过 `.value` 来访问和修改，在模板中不需要
- reactive 创建的响应式对象可以直接访问和修改
