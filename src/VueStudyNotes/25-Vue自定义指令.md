---
title: Vue 自定义指令
cover: https://t.alcy.cc/fj?t=1727859600
order: 25
date: 2024-10-02 17:00:00
category: 开发
tag: Vue
excerpt: false
---

自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑

> 其他重用代码的方式：
>
> - 组件是主要的构建模块
> - 组合式函数侧重于重用有状态的逻辑

## 基本用法

一个自定义指令由一个包含类似组件生命周期钩子函数的对象来定义。钩子函数会接收到指令所绑定元素作为其参数

:::tabs

@tab 单文件组件

```vue
<template>
  <input v-focus />
</template>

<script setup>
// 任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <input v-focus />
  </div>
  <script type="module">
    import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      directives: {
        focus: {
          mounted(el) {
            el.focus();
          },
        },
      },
    }).mount("#app");
  </script>
</body>
```

:::

可以将自定义指令全局注册到应用层级：

:::tabs

@tab 单文件组件

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
// 全局注册自定义指令
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
app.mount("#app");
```

@tab HTML

```html
<body>
  <div id="app">
    <input v-focus />
  </div>
  <script type="module">
    import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({})
      .directive("focus", {
        mounted(el) {
          el.focus();
        },
      })
      .mount("#app");
  </script>
</body>
```

:::

## 指令钩子

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `created(el, binding, vnode)`：在绑定元素的 attribute 或事件监听器应用之前调用
- `beforeMount(el, binding, vnode)`：在元素被插入到 DOM 前调用
- `mounted(el, binding, vnode)`：在绑定元素的父组件及它自己的所有子节点都挂载完毕之后调用
- `beforeUpdate(el, binding, vnode, prevVnode)`：绑定元素的父组件更新之前调用
- `updated(el, binding, vnode, prevVnode)`：在绑定元素的父组件及它自己的所有子节点都更新后调用
- `beforeUnmount(el, binding, vnode)`：绑定元素的父组件卸载前调用
- `unmounted(el, binding, vnode)`：绑定元素的父组件卸载后调用

这些钩子函数会被传入以下参数：

- `el`：指令绑定到的元素。这可以用来直接操作 DOM
- `binding`：一个对象，包含以下属性：
  - `value`：传递给指令的值
  - `oldValue`：指令绑定的前一个值，仅在 `beforeUpdate` 和 `updated` 钩子中可用。无论值是否改变都可用
  - `arg`：传递给指令的参数
  - `modifiers`：一个包含修饰符的对象
  - `instance`：使用该指令的组件实例
  - `dir`：指令的定义对象，指向注册指令时绑定的对象
- `vnode`：代表绑定元素的底层 VNode
- `prevVnode`：代表之前的渲染中指令绑定元素的底层 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用

## 简化形式

在大多数情况下仅仅需要在 `mounted` 和 `updated` 钩子上实现，这时可以直接用一个函数来定义指令：

```javascript
app.directive("color", (el, binding) => {
  el.style.color = binding.value;
});
```
