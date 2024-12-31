---
title: Vue Router 路由元信息
cover: https://t.alcy.cc/fj?t=1730172600000
order: 12
date: 2024-10-29 11:30
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

通过配置 `meta` 字段，可以为路由添加元信息，路由元信息可以在路由中附加自定义的数据。

可以在导航守卫或路由对象中访问路由的元信息。

```JavaScript
const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'new',
        component: New,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        component: Detail,
        // 任何人都可以阅读文章
        meta: { requiresAuth: false },
      }
    ]
  }
]
```

在导航守卫中，可以通过 `to.meta` 访问路由的元信息。

在路由对象中，可以通过 `route.meta` 访问路由的元信息。
