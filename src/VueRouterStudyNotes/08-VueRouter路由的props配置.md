---
title: Vue Router 路由的 props 配置
cover: https://t.alcy.cc/fj?t=1730084400000
order: 8
date: 2024-10-28 11:00
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

使用 `props` 配置可以方便地传递路由参数给组件，从而避免在组件中通过 `$route` 或 `useRoute()` 获取参数的繁琐操作。

## 传递路由参数给组件

### 布尔模式

布尔模式是最简单的 `props` 配置方式，它允许将路由参数直接作为组件的 `props` 传递。当 `props` 被设置为 `true` 时，路由参数会以对象的形式传递给组件。

```JavaScript
const routes = [
  {
    path: '/user/:id',
    component: User,
    props: true
  }
]
```

在上面的例子中，当访问 `/user/123` 时，`User` 组件会接收到一个 `props` 对象，其中包含 `id` 属性，值为 `123`。

### 对象模式

对象模式允许你显式地定义组件的 `props`，并将路由参数映射到这些 `props` 上。

```JavaScript
const routes = [
  {
    path: '/user/:id',
    component: User,
    props: { id: 'id' }
  }
]
```

在上面的例子中，当访问 `/user/123` 时，`User` 组件会接收到一个 `props` 对象，其中包含 `id` 属性，值为 `123`。

### 函数模式

函数模式允许你根据路由参数动态地生成 `props` 对象。

```JavaScript
const routes = [
  {

    path: '/user/:id',
    component: User,
    props: (route) => ({ id: route.params.id })
  }
]
```

在上面的例子中，当访问 `/user/123` 时，`User` 组件会接收到一个 `props` 对象，其中包含 `id` 属性，值为 `123`。

## 组件接收

在组件中，你可以通过 `props` 选项来接收路由参数。

```Vue
<!-- User.vue -->
<template>
  <div>
    <h1>User: {{ props.id }}</h1>
  </div>
</template>
<script setup>
const props = defineProps(['id'])
</script>
```
