---
title: Vue 模板语法
cover: https://t.alcy.cc/fj?t=1725971400
order: 2
date: 2024-09-10 20:30
category: 开发
tag: Vue
excerpt: false
---

Vue 模板语法用于在 HTML 中插入数据，并实现数据的动态更新

Vue 模板语法主要包括 Mustache 语法和指令

## Mustache 语法

Mustache 语法 (双大括号) 是最基本的语法，用于在模板中插入数据 (在标签体中插入内容)

双大括号中的内容会被 Vue 解析为 JavaScript 表达式，并替换为相应的值

:::tabs

@tab 单文件组件

```vue
<template>
  {{ message }}
</template>

<script setup>
import { ref } from "vue";
const message = ref("Hello Vue!");
</script>
```

@tab HTML

```html
<body>
  <div id="app">{{message}}</div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const message = ref("Hello Vue!");
        return {
          message,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 指令

指令是带有 `v-` 前缀的特殊 HTML 标签属性，用于在模板中实现特定的功能 (赋予 HTML 标签额外的功能)

一个完整的指令由 `v-` 前缀、指令名称、指令参数、指令修饰符和指令值组成

指令值将被 Vue 解析为 JavaScript 表达式，并替换为相应的值

### 参数

某些指令需要一个 “参数”，在指令名后通过一个冒号 `:` 隔开做标识

例如 `v-bind:href` 指令中的 `href` 就是参数，表示绑定 `href` 属性

### 动态参数

指令参数也可以是一个 JavaScript 表达式，需要用方括号 `[]` 包裹起来

例如 `v-bind:[attributeName]` 指令中的 `attributeName` 就是一个动态参数，表示绑定 `attributeName` 属性

#### 动态参数值的限制

动态参数值的类型应当是字符串或者 `null`

#### 动态参数语法的限制

动态参数表达式因为某些字符的存在，可能存在语法冲突，比如空格和引号，如果需要传入一个复杂的动态参数，可以使用计算属性来处理

当使用 DOM 模板时，注意避免使用大写字符来命名键名，因为浏览器会把特性名全部转为小写

### 修饰符

修饰符 (modifier) 是以点 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定
