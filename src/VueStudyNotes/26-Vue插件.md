---
title: Vue 插件
cover: https://t.alcy.cc/fj?t=1727863200
order: 26
date: 2024-10-02 18:00:00
category: 开发
tag: Vue
excerpt: false
---

## 什么是插件

插件是一种能为 Vue 添加全局功能的工具代码

一个插件可以是一个拥有 `install()` 方法的对象，也可以是一个安装函数

```javascript
const myPlugin = {
  // 安装函数会接收到安装它的应用实例和传递给 `app.use()` 的可选选项作为参数
  install(app, options) {
    // 配置此应用
  },
};
```

插件发挥作用的常见场景：

1. 通过 `app.component()` 和 `app.directive()` 注册全局组件或自定义指令
2. 通过 `app.provide()` 实现应用级的依赖注入
3. 通过 `app.config.globalProperties` 添加一些全局属性或方法
4. 包含上述所有功能

## 插件的安装

:::tabs

@tab 单文件组件

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.use(myPlugin, {
  // 可选的选项
});
app.mount("#app");
```

@tab HTML

```html
<body>
  <div id="app"></div>
  <script type="module">
    import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({})
      .use(myPlugin, {
        // 可选的选项
      })
      .mount("#app");
  </script>
</body>
```

:::

## 编写插件

::: tabs

@tab 单文件组件

```javascript
// i18n.js
export default {
  install(app, options) {
    app.config.globalProperties.$translate = (key) => {
      return key.split(".").reduce((o, i) => {
        if (o) return o[i];
      }, options);
    };
    app.provide("i18n", options);
  },
};
```

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import i18nPlugin from "./plugins/i18n.js";

const app = createApp(App);
app.use(i18nPlugin, {
  greetings: {
    hello: "你好",
  },
});
app.mount("#app");
```

```vue
<!-- App.vue -->
<template>
  <p>{{ $translate("greetings.hello") }}</p>
  <p>{{ i18n.greetings.hello }}</p>
</template>

<script setup>
import { inject } from "vue";
const i18n = inject("i18n");
</script>
```

@tab HTML

```javascript
// i18n.js
export default {
  install(app, options) {
    app.config.globalProperties.$translate = (key) => {
      return key.split(".").reduce((o, i) => {
        if (o) return o[i];
      }, options);
    };
    app.provide("i18n", options);
  },
};
```

```html
<body>
  <div id="app">
    <p>{{ $translate('greetings.hello') }}</p>
    <p>{{ i18n.greetings.hello }}</p>
  </div>
  <script type="module">
    import {
      createApp,
      inject,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    import i18nPlugin from "./i18n.js";
    createApp({
      setup() {
        const i18n = inject("i18n");
        return {
          i18n,
        };
      },
    })
      .use(i18nPlugin, {
        greetings: {
          hello: "你好",
        },
      })
      .mount("#app");
  </script>
</body>
```

:::
