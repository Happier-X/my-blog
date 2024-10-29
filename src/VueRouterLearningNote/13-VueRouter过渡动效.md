---
title: Vue Router 过渡动效
cover: https://t.alcy.cc/fj?t=1730179800000
order: 13
date: 2024-10-29 13:30
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

## 基本使用

在 Vue Router 中，我们可以使用 Vue 的过渡系统来为路由的切换添加过渡动效。这可以通过在路由组件上添加 `<transition>` 元素来实现。

```vue
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
```

## 结合元信息使用

如果想让每个路由的组件有不同的过渡，可以将元信息和动态的 name 结合在一起，放在 `<transition>` 上。

```JavaScript
// src/router/index.js
const routes = [
  {
    path: '/custom-transition',
    component: PanelLeft,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/other-transition',
    component: PanelRight,
    meta: { transition: 'slide-right' },
  },
]
```
```vue
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

## 强制在复用的视图之间进行过渡

Vue 可能会自动复用看起来相似的组件，从而忽略了任何过渡。可以添加一个 key 属性来强制过渡。

```vue
<router-view v-slot="{ Component, route }">
  <transition name="fade">
    <component :is="Component" :key="route.path" />
  </transition>
</router-view>
```