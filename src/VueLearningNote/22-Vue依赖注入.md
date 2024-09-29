---
title: Vue 依赖注入
cover: https://t.alcy.cc/fj?t=1727535600
order: 22
date: 2024-09-28 23:00
category: 软件开发
tag: Vue
excerpt: false
---

依赖注入是一种在组件之间共享数据或方法的技术

在 Vue 中，我们可以使用 `provide` 和 `inject` 来实现依赖注入，一个父组件相对于其后代组件，会作为依赖提供者，而后代组件则作为依赖注入者

## provide（提供）

`provide()` 函数可以为后代组件提供数据

它接受两个参数，第一个参数被称为注入名，可以是一个字符串或是一个 `Symbol`，第二个参数是提供的值

一个组件可以多次调用 `provide()` 函数

如果想确保提供的数据不能被后代组件修改，可以使用 `readonly()` 函数将提供的值包装为一个只读的 ref

## 应用层 provide

在应用层调用 `provide()` 函数，可以为整个应用提供数据

:::tabs

@tab 单文件组件

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.provide('message', 'Hello World!')
app.mount('#app')
```
@tab HTML

```html
<body>
    <div id="app">
    </div>
    <script type="module">
        import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({

        }).provide('message', 'Hello World!').mount('#app')
    </script>
</body>
```

## inject（注入）

`inject()` 函数可以为组件注入数据

它接受 `provide()` 函数提供的注入名作为参数，返回提供的值

如果提供的值是一个 ref，注入进来的值也是一个 ref，而不会自动解包为其内部的值

## 代码示例

:::

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <School></School>
</template>

<script setup>
import { provide } from 'vue';
import School from './components/School.vue'
provide('name', '张三')
</script>
```

```vue
<!-- School.vue -->
<template>
    <div>我是子组件</div>
    <Student></Student>
</template>

<script setup>
import Student from './Student.vue'
</script>
```

```vue
<!-- Student.vue -->
<template>
    <div>我是孙组件</div>
    <div>{{ name }}</div>
</template>

<script setup>
import { inject } from 'vue'
const name = inject('name')
</script>
```

@tab HTML

```html
<body>
    <div id="app">
        我是父组件
        <School></School>
    </div>
    <script type="module">
        import { createApp, provide } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import School from './School.js'
        createApp({
            components: {
                School
            },
            setup() {
                provide('name', '张三')
            }
        }).mount('#app')
    </script>
</body>
```

```javascript
// School.js
import Student from './Student.js'
export default {
    components: {
        Student
    },
    template: `
        <div>我是子组件</div>
        <Student></Student>`
}
```

```javascript
// Student.js
import { inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const name = inject('name')
        return {
            name
        }
    },
    template: `
        <div>我是孙组件</div>
        <div>{{ name }}</div>`
}
```

:::
