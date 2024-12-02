---
title: Vue Router 命名路由
cover: https://t.alcy.cc/fj?t=1729836000000
order: 3
date: 2024-10-25 14:00
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

通过给路由命名，可以更方便的跳转路由。

使用 `name` 属性给路由命名，命名的路由名称可以自定义但是要唯一。

通过 `:to="{ name: '路由名称' }"` 跳转路由。

代码示例如下。

```JavaScript
// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/about',
        // 通过 name 给路由命名
        name: 'about',
        component: AboutView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

```Vue
<!-- src/App.vue -->
<template>
  <h1>我是 APP</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <span>|</span>
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```