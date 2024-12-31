---
title: Vue Router 重定向和别名
cover: https://t.alcy.cc/fj?t=1729938600
order: 6
date: 2024-10-26 18:30
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

## 重定向

重定向是指当用户访问一个路由时，自动跳转到另一个路由。在 Vue Router 中，可以使用 `redirect` 属性来实现重定向。

它可以是一个字符串，表示要跳转到的路由的路径；也可以是一个命名路由，表示要跳转到的路由的名称；还可以是一个方法。

```JavaScript
const routes = [{ path: '/', redirect: '/home' }]
```

```JavaScript
const routes = [{ path: '/', redirect: { name: 'homepage' } }]
```

```JavaScript
const routes = [
  {
    path: '/search',
    redirect: (to) => {
      // return 重定向的字符串路径/路径对象
      return { path: '/search' }
      // 也可以重定向到相对路径，相对位置不以/开头
      // return 'search'
    },
  }
]
```

## 别名

将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。

在 Vue Router 中，可以使用 `alias` 属性来实现别名。

```JavaScript
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```
