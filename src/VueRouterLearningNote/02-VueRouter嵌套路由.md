---
title: Vue Router 嵌套路由
cover: https://t.alcy.cc/fj?t=1729832400000
order: 2
date: 2024-10-25 13:30
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件。Vue Router 允许您通过嵌套路由配置来实现这一点。

通过在路由配置中添加 `children` 字段来定义嵌套路由。`children` 字段是一个路由数组，就像 routes 本身一样。

代码示例如下。

```JavaScript
// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DefaultView from '../views/DefaultView.vue'
import NewsView from '../views/NewsView.vue'
import MessageView from '../views/MessageView.vue'

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/about',
        component: AboutView,
        // 通过 children 属性添加子路由
        children: [
            {
                // 匹配 /about 路径
                path: '',
                component: DefaultView
            },
            {
                // 匹配 /about/news 路径
                path: 'news',
                component: NewsView
            },
            {
                // 匹配 /about/message 路径
                path: 'message',
                component: MessageView
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

```vue
<!-- src/views/AboutView.vue -->
<template>
    我是 About 页面
    <br>
    <RouterView></RouterView>
</template>
```

```vue
<!-- src/views/DefaultView.vue -->
<template>
    我是默认页面
    <br>
    <RouterLink to="/about/news">跳转到 News 页面</RouterLink>
    <span>|</span>
    <RouterLink to="/about/message">跳转到 Message 页面</RouterLink>
</template>
```

```vue
<!-- src/views/NewsView.vue -->
<template>
    我是 News 页面
    <br>
    <RouterLink to="/about">跳转到默认页面</RouterLink>
    <span>|</span>
    <RouterLink to="/about/message">跳转到 Message 页面</RouterLink>
</template>
```

```vue
<!-- src/views/MessageView.vue -->
<template>
    我是 Message 页面
    <br>
    <RouterLink to="/about">跳转到默认页面</RouterLink>
    <span>|</span>
    <RouterLink to="/about/news">跳转到 News 页面</RouterLink>
</template>
```