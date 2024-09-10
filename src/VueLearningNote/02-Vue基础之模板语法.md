---
title: Vue 模板语法
cover: https://t.alcy.cc/fj?t=1725971400
order: 2
date: 2024-09-10 20:30
category: 软件开发
tag: Vue
excerpt: false
---

Vue 模板语法用于在 HTML 中插入数据，并实现数据的动态更新

Vue 模板语法主要包括 Mustache 语法和指令

## Mustache 语法

Mustache 语法（双大括号）是最基本的语法，用于在模板中插入数据（在标签体中插入内容）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mustache 语法</title>
</head>
<body>
    <div id="app">{{message}}</div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const message = ref('Hello Vue!')
                return {
                    message
                }
            }
        }).mount('#app')
    </script>
</body>
</html>
```

## 指令

指令是带有 `v-` 前缀的特殊属性，用于在模板中实现特定的功能（赋予 HTML 标签额外的功能）

> 后面会详细讲解 Vue 中的各个指令