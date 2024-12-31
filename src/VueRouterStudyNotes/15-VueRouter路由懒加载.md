---
title: Vue Router 路由懒加载
cover: https://t.alcy.cc/fj?t=1730185200000
order: 15
date: 2024-10-29 15:00
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

路由懒加载是一种优化技术，它允许我们在需要时才加载对应的组件，而不是在应用启动时就加载所有组件。这样可以减少应用的初始加载时间，提高用户体验。

在 Vue Router 中，我们可以使用动态导入 (Dynamic Imports) 来实现路由懒加载。动态导入是一种特殊的导入语法，它允许我们在需要时才加载对应的模块。

```JavaScript
// 将 import HomeView from './views/HomeView.vue' 替换成如下方式
const HomeView = () => import('./views/HomeView.vue')

const router = createRouter({
  routes: [
    { path: '/', component: HomeView }
    // 或在路由定义里直接使用它
    { path: '/about', component: () => import('./views/AboutView.vue') },
  ],
})
```
