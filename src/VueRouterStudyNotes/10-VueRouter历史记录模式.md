---
title: Vue Router 历史记录模式
cover: https://t.alcy.cc/fj?t=1730088000000
order: 10
date: 2024-10-28 12:00:00
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

在创建路由器实例时，`history` 配置允许我们在不同的历史模式中进行选择。

## Hash 模式

Hash 模式使用 `createWebHashHistory()` 创建。

```JavaScript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory()
})
```

它在内部传递的 URL 会带有 `#` 符号，如 `http://example.com/#/some/path`。

这部分 URL 不会发送到服务器，因此它对服务器没有影响。

## HTML5 模式

HTML5 模式使用 `createWebHistory()` 创建。

```JavaScript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory()
})
```

它的地址栏看起来像这样：`http://example.com/some/path`。

URL 会直接发送到服务器。因此，服务器需要正确配置，以便在请求 URL 时返回应用程序的索引 HTML 文件。如果服务器没有正确配置，用户可能会在访问 (刷新) 子 URL 时遇到 404 错误。
