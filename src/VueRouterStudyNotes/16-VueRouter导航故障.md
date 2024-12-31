---
title: Vue Router 导航故障
cover: https://t.alcy.cc/fj?t=1730187000000
order: 16
date: 2024-10-29 15:30
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

## 检测导航故障

如果导航被阻止，导致用户停留在同一个页面上，由 `router.push` 返回的 `Promise` 的解析值将是 `Navigation Failure`。否则，它将是一个 `falsy` 值 (通常是 `undefined`)。

```JavaScript
const navigationResult = await router.push('/test')

if (navigationResult) {
  // 导航被阻止
} else {
  // 导航成功 (包括重新导航的情况)
}
```

`Navigation Failure` 是带有一些额外属性的 Error 实例，这些属性可以用来区分不同的导航故障。

要检查导航结果的性质，可以使用 `isNavigationFailure` 函数。

```JavaScript
import { NavigationFailureType, isNavigationFailure } from 'vue-router'

// 试图离开未保存的编辑文本界面
const failure = await router.push('/articles')

if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
  // 给用户显示一个小通知
  showToast('You have unsaved changes, discard and leave anyway?')
}
```

## 全局导航故障

可以使用 `router.afterEach()` 导航守卫来检测全局导航故障。

```JavaScript
router.afterEach((to, from, failure) => {
  if (failure) {
    // 导航被阻止
  }else {
    // 导航成功
  }
})
```

## 鉴别导航故障

有不同的情况会导致导航的中止，所有这些情况都会导致不同的 `Navigation Failure`。它们可以用 `isNavigationFailure` 和 `NavigationFailureType` 来区分。总共有三种不同的类型：

- `aborted`：在导航守卫中返回 `false` 中断了本次导航。
- `cancelled`：在当前导航完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 `router.push`。
- `duplicated`：导航被阻止，因为我们已经在目标位置了。

## 导航故障的属性

所有的导航失败都会暴露 `to` 和 `from` 属性，以反映失败导航的当前位置和目标位置。

```JavaScript
// 正在尝试访问 admin 页面
router.push('/admin').then(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```

## 检测重定向

通过读取路由地址中的 `redirectedFrom` 属性，对其进行不同的检查。

```JavaScript
await router.push('/test')
if (router.currentRoute.value.redirectedFrom) {
  // redirectedFrom 是解析出的路由地址，就像导航守卫中的 to和 from
}
```
