---
title: Vue Router 命名视图
cover: https://t.alcy.cc/fj?t=1729846800000
order: 5
date: 2024-10-25 17:00
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，这时可以使用命名视图。

可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `<RouterView>` 没有设置名字，那么默认为 default。

为 `<RouterView>` 组件添加 `name` 属性，可以定义视图的名字。

代码示例如下。

```JavaScript
// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SidebarView from '../views/SidebarView.vue'
import FooterView from '../views/FooterView.vue'

const routes = [
    {
        path: '/',
        components: {
            default: HomeView,
            sidebar: SidebarView,
            footer: FooterView
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

```vue
<!-- src/App.vue -->
<template>
  <h1>我是 APP</h1>
  <main>
    <RouterView name="sidebar"></RouterView>
    <RouterView></RouterView>
    <RouterView name="footer"></RouterView>
  </main>
</template>
```

```vue
<!-- src/views/HomeView.vue -->
<template>
    我是 Home 页面
</template>
```

```vue
<!-- src/views/SidebarView.vue -->
<template>
    我是 Sidebar 页面
</template>
```

```vue
<!-- src/views/FooterView.vue -->
<template>
    我是 Footer 页面
</template>
```