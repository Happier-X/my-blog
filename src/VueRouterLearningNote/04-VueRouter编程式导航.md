---
title: Vue Router 编程式导航
cover: https://t.alcy.cc/fj?t=1729839600000
order: 4
date: 2024-10-25 15:00
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

除了使用 `<RouterLink>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

## 导航到不同的位置

使用 `router.push` 方法，这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，导航会回退到前一个记录。

```JavaScript
// 传字符串
router.push('home')
// 传对象
router.push({ path: 'home' })
router.push({ name: 'user' })
```

## 替换当前位置

`router.replace` 方法与 `router.push` 很相似，唯一的不同就是，它不会向 history 添加新记录，而是替换掉当前的记录。

在声明式导航中使用 `<RouterLink :to="" replace>` 实现。

```JavaScript
// 传字符串
router.replace('home')
// 传对象
router.replace({ path: 'home' })
router.replace({ name: 'user' })
```

## 横跨历史

`router.go` 方法允许我们在 history 记录中前进或后退多少步，它采用一个整数作为参数。
`router.forward` 等价于 `router.go(1)`，`router.back` 等价于 `router.go(-1)`。

```JavaScript
// 前进 1 步
router.go(1)
router.forward()
// 后退 1 步
router.go(-1)
router.back()
// 前进 3 步
router.go(3)
```