---
title: Vue 组件化编程
cover: https://t.alcy.cc/fj?t=1727056800000
order: 15
date: 2024-09-23 10:00
category: 软件开发
tag: Vue
excerpt: false
---
组件化编程是 Vue 的核心思想之一，它允许我们将一个复杂的页面拆分成多个小的、可复用的组件，从而提高代码的可维护性和可读性

## 定义一个组件

:::tabs

@tab 单文件组件

每个 `.vue` 文件就是一个组件，他包含了模板、脚本和样式三部分

```vue
<!-- Student.vue -->
<!-- 定义了一个组件 -->
<template>
    <h1>{{ name }}</h1>
</template>
<script setup>
import { ref } from 'vue'
const name = ref('John')
</script>
<style scoped>
h1 {
    color: pink;
}
</style>
```

@tab HTML

一个 Vue 组件是一个包含 Vue 特定选项的对象

```javascript
// Student.js
// 定义了一个组件
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const name = ref('John')
        return {
            name
        }
    },
    template: `
        <div>
            <h1>{{ name }}</h1>
        </div>`
}
```

:::

## 组件注册

组件注册有两种方式：全局注册和局部注册

### 全局注册

全局注册的组件可以在任何地方使用，包括在父组件和子组件中

使用 `component` 方法注册组件

:::tabs

@tab 单文件组件

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import Student from './components/Student.vue'

const app = createApp(App)
// 全局注册组件
app.component('Student', Student)
app.mount('#app')
```

@tab HTML

```html
<body>
    <div id="app">
        {{ school }}
        <Student></Student>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const school = ref('QFNU')
                return {
                    school
                }
            }
        }).component(
            // 组件名称
            'Student',
            // 组件的实现
            {
                setup(){
                    const name = ref('John')
                    return {
                        name
                    }
                },
                template: `
                <div>
                    <h1>{{ name }}</h1>
                </div>`
            }
        ).mount('#app')
    </script>
</body>
```

:::

### 局部注册

局部注册的组件只能在注册它的父组件中使用，不能在父组件之外使用

:::tabs
@tab 单文件组件
```vue
<!-- App.vue -->
<template>
  {{ school }}
  <Student></Student>
</template>

<script setup>
// 导入组件即可
import Student from './components/Student.vue'
import { ref } from 'vue'
const school = ref('QFNU')
</script>
```

@tab HTML
```html
<body>
    <div id="app">
        {{ school }}
        <Student></Student>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        // 导入组件
        import Student from './Student.js'
        createApp({
            // 注册组件
            components: {
                Student
            },
            setup() {
                const school = ref('QFNU')
                return {
                    school
                }
            }
        }).mount('#app')
    </script>
</body>
```
:::

