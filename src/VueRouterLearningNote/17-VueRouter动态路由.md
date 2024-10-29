---
title: Vue Router 动态路由
cover: https://t.alcy.cc/fj?t=1730192400000
order: 17
date: 2024-10-29 17:00
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

对路由的添加通常是通过 `routes` 选项来完成的，但是在某些情况下，你可能想在应用程序已经运行的时候添加或删除路由。

## 动态路由添加

你可以使用 `router.addRoute()` 方法动态添加路由。

它只注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要用 `router.push()` 或 `router.replace()` 来手动导航，才能显示该新路由。而在导航守卫中，则可以通过返回新的位置来触发重定向。

```JavaScript
router.addRoute({ path: '/about', component: About })
```

`addRoute()` 方法还可以接受一个嵌套的路由对象，通过给第一个参数传递 `name` 来实现。

```JavaScript
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
router.addRoute('admin', { path: 'settings', component: AdminSettings })
```

## 动态路由删除

通过添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由。

```JavaScript
router.addRoute({ path: '/about', name: 'about', component: About })
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })
```

当路由没有名称时，可以使用 `addRoute()` 方法的返回值来删除路由。

```JavaScript
const removeRoute = router.addRoute(routeRecord)
removeRoute() // 删除路由如果存在的话
```

也可以使用 `router.removeRoute()` 方法根据名称来动态删除路由。

```JavaScript
router.addRoute({ path: '/about', name: 'about', component: About })
// 删除路由
router.removeRoute('about')
```

注意：当路由被删除时，所有的别名和子路由也会被同时删除。

## 查看路由

`router.hasRoute(路由名称)`：检查路由是否存在。

`router.getRoutes()`：获取一个包含所有路由记录的数组。