---
title: Vue Router 导航守卫
cover: https://t.alcy.cc/fj?t=1730091600000
order: 11
date: 2024-10-28 13:00
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

## 全局导航守卫

### 全局前置守卫

使用 `router.beforeEach` 注册一个全局前置守卫。

```JavaScript
// src/router/index.js
const router = createRouter({ })

// 全局前置守卫，在每次路由跳转前执行
router.beforeEach((to, from) => {
    console.log('to', to) // 即将要进入的目标路由对象
    console.log('from', from)  // 当前导航正要离开的路由
    // 返回 false 以取消导航
    return false
    // 返回一个路由对象，表示要重定向到的路由
    // return { path: '/' }
})
```

### 全局解析守卫

使用 `router.beforeResolve` 注册一个全局解析守卫。

```JavaScript
// src/router/index.js
const router = createRouter({ })

// 全局解析守卫，在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用
// router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置
router.beforeResolve((to, from) => {
    console.log('to', to) // 即将要进入的目标路由对象
    console.log('from', from)  // 当前导航正要离开的路由
    // 返回 false 以取消导航
    return false
    // 返回一个路由对象，表示要重定向到的路由
    // return { path: '/' }
})
```

### 全局后置钩子

使用 `router.afterEach` 注册一个全局后置钩子。

```JavaScript
// src/router/index.js
const router = createRouter({ })

// 全局后置钩子，在每次路由跳转后执行，它不会改变导航本身
router.afterEach((to, from) => {
    console.log('to', to) // 即将要进入的目标路由对象
    console.log('from', from)  // 当前导航正要离开的路由
})
```

### 在守卫内的全局注入

可以在导航守卫内使用 `inject()` 方法。在 `app.provide()` 中提供的所有内容都可以在 `router.beforeEach()`、`router.beforeResolve()`、`router.afterEach()` 内获取到。

```JavaScript
// main.ts
const app = createApp(App)
app.provide('global', 'hello injections')
```

```JavaScript
// router.ts or main.ts
router.beforeEach((to, from) => {
  const global = inject('global') // 'hello injections'
})
```

## 路由独享的守卫

可以直接在路由配置上定义 `beforeEnter` 守卫。

```JavaScript
// src/router/index.js
const router = createRouter({ })

const routes = [
  {
    path: '/foo',
    component: Foo,
    beforeEnter: (to, from) => {
      // ...
    }
  }
]
```

`beforeEnter` 守卫只在进入路由时触发，不会在 `params`、`query` 或 `hash` 改变时触发。

它还接收一个函数数组。

```JavaScript
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```

可以在嵌套路由中使用，如果放在父级路由上，路由在具有相同父级的子路由之间移动时，它不会被触发。

## 组件内的守卫

可以在路由组件内直接定义路由导航守卫。

```vue
<script setup>
import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";

defineOptions({
  beforeRouteEnter: (to, from) => {
    // 在渲染该组件的对应路由被验证前调用，组件实例还没被创建
    console.log("to", to); // 即将要进入的目标路由对象
    console.log("from", from); // 当前导航正要离开的路由
  },
});

onBeforeRouteUpdate((to, from) => {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例。
  console.log("to", to); // 即将要进入的目标路由对象
  console.log("from", from); // 当前导航正要离开的路由
});
onBeforeRouteLeave((to, from) => {
  // 在导航离开渲染该组件的对应路由时调用
  // 与 `onBeforeRouteUpdate` 一样，它可以访问组件实例
  console.log("to", to); // 即将要进入的目标路由对象
  console.log("from", from); // 当前导航正要离开的路由
});
</script>
```

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `onBeforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `onBeforeRouteUpdate` 守卫。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。
