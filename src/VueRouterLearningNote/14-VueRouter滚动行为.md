---
title: Vue Router 滚动行为
cover: https://t.alcy.cc/fj?t=1730183400000
order: 14
date: 2024-10-29 14:30
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

Vue Router 可以自定义路由切换时页面如何滚动。

注意: 这个功能只在支持 `history.pushState` 的浏览器中可用。

通过 `scrollBehavior` 选项来自定义路由切换时页面如何滚动。

```JavaScript
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // return 期望滚动到哪个的位置
  }
})
```

第三个参数 `savedPosition` 当且仅当 `popstate` 导航（通过浏览器的 前进/后退 按钮触发）时才可用。

它的返回值可以是一个 `Promise` 对象、一个位置对象或 `false`、`savedPosition`。

```JavaScript
(to, from, savedPosition) => {
  // return savedPosition
  // return { left: 0, top: 0 }
  // return { el: '#main' }
  // return { el: '#main', top: 100 }
  // return { el: '#main', top: 100, behavior: 'smooth' }
  // return { el: to.hash } 类似锚点
  // return false 
  // return { } 等效于 false
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ left: 0, top: 0 })
    })
  })
}
```