---
title: Vue Router 基本使用
cover: https://t.alcy.cc/fj?t=1728630000000
order: 1
date: 2024-10-11 15:00:00
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

Vue Router 是 Vue 的官方路由，它可以帮助我们更轻松地构建单页面应用程序 (SPA)

Vue Router 基于 Vue 的组件系统构建，你可以通过配置路由来告诉 Vue Router 为每个 URL 路径显示哪些组件

## 安装

```sh
npm install vue-router
```

## 基本使用

### 创建路由组件

在 `src/views` 目录下创建两个组件 `HomeView.vue` 和 `AboutView.vue`

```vue
<!-- src/views/HomeView.vue -->
<template>我是 Home 页面</template>
```

```vue
<!-- src/views/AboutView.vue -->
<template>我是 About 页面</template>
```

### 创建路由配置文件

在项目的 `src` 目录下创建一个 `router` 文件夹，并在该文件夹下创建一个 `index.js` 文件，用于创建路由器实例和配置路由

```javascript
// src/router/index.js
import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

// 路由配置，把 URL 路径（path）映射到组件（component）
const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/about",
    component: AboutView,
  },
];

// 通过 createRouter 创建路由器实例
const router = createRouter({
  // 控制了路由和 URL 路径是如何双向映射的
  history: createWebHistory(),
  // 路由配置
  routes,
});

// 导出路由器实例
export default router;
```

### 在 Vue 实例中使用路由器

在 `main.js` 文件中，将路由器实例注入到 Vue 实例中

```javascript
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
// 引入 router
import router from "./router/index.js";

createApp(App).use(router).mount("#app");
```

### 在模板中使用

```vue
<!-- src/App.vue -->
<template>
  <h1>我是 APP</h1>
  <!-- 使用 RouterLink 来创建链接 -->
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <span>|</span>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <!-- 使用 RouterView 来渲染当前 URL 路径对应的路由组件 -->
  <main>
    <RouterView />
  </main>
</template>
```

## 访问路由器和当前路由

在组件模板中，可以通过 `$router` 访问路由器实例，通过 `$route` 访问当前路由对象

在组合式 API 中，可以通过 `useRouter()` 和 `useRoute()` 来访问路由器和当前路由对象

```vue
<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(router);
console.log(route);
</script>
```
