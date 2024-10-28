---
title: Vue Router 匹配当前路由的链接
cover: https://t.alcy.cc/fj?t=1730086200000
order: 9
date: 2024-10-28 11:30
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

RouterLink 组件向活动链路添加了两个 CSS 类，`router-link-active` 和 `router-link-exact-active`，这两个类允许您自定义活动链接的样式。

使用 `router-link-active` 类，您可以定义活动链接的样式，无论它是否精确匹配当前路由。例如，如果您有一个嵌套的路由结构，并且您希望活动链接的样式应用于父路由和子路由，则可以使用 `router-link-active` 类。

使用 `router-link-exact-active` 类，您可以定义精确匹配当前路由的活动链接的样式。

```vue
<RouterLink
  activeClass="border-indigo-500"
  exactActiveClass="border-indigo-700"
  ...
>
```

也可以通过将 linkActiveClass 和 linkExactActiveClass 选项传递给 createRouter() 来全局更改默认类名。

```JavaScript
const router = createRouter({
  linkActiveClass: 'border-indigo-500',
  linkExactActiveClass: 'border-indigo-700',
  // ...
})
```