---
title: Pinia 安装
cover: https://t.alcy.cc/fj?t=1730255400000
order: 1
date: 2024-10-30 10:30:00
category: 开发
tag:
  - Vue
  - Pinia
excerpt: false
---

## 安装

```sh
npm install pinia
```

## 在项目中使用

创建 `pinia` 实例，并使用 `createApp` 的 `use` 方法挂载到 `app` 上。

```JavaScript
// src/main.js
import { createApp } from 'vue'
// 引入 createPinia
import { createPinia } from 'pinia'
import App from './App.vue'

// 创建 pinia 实例
const pinia = createPinia()
// 使用 pinia
createApp(App).use(pinia).mount('#app')
```
