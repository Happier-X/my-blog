---
title: Vue 自定义事件
cover: https://t.alcy.cc/fj?t=1727247600000
order: 17
date: 2024-09-25 15:00
category: 软件开发
tag: Vue
excerpt: false
---

自定义事件允许子组件向父组件发送消息，从而实现父子组件之间的通信

## 声明自定义事件

在子组件中，使用 `emits` 选项声明自定义事件