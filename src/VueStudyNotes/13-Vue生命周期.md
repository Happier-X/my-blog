---
cover: https://t.alcy.cc/fj?t=1726824600000
order: 13
date: 2024-09-20 17:30:00
category: 开发
tag: Vue
excerpt: false
---

# Vue 生命周期

## 什么是生命周期

Vue 实例从创建到销毁的过程，就是生命周期。

## 生命周期钩子

生命周期钩子函数就是 Vue 实例在某一个时间点会自动执行的函数。

### 创建阶段

`setup()`：初始化数据，创建组件实例。

### 挂载阶段

`onBeforeMount()`：在组件挂载到 DOM 之前执行。

`onMounted()`：在组件挂载到 DOM 并完成首次渲染后执行，此时可以访问 DOM 元素，通常在此发送网络请求。

### 更新阶段

`onBeforeUpdate()`：在组件更新之前执行。

`onUpdated()`：在组件更新并重新渲染后执行。

### 卸载阶段

`onBeforeUnmount()`：在组件从 DOM 中销毁之前执行。

`onUnmounted()`：在组件从 DOM 中移除并销毁之后执行。

### 错误处理

`onErrorCaptured()`：在组件捕获到错误时执行。
