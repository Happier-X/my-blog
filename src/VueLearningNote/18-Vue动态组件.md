---
title: Vue 动态组件
cover: https://t.alcy.cc/fj?t=1727254800000
order: 18
date: 2024-09-25 17:00
category: 软件开发
tag: Vue
excerpt: false
---

当我们需要根据条件渲染不同的组件时，可以使用 Vue 的动态组件

使用 `<component>` 元素和 `is` 属性来实现

::: tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  <component :is="tab[index]"></component>
  <button @click="changeTab">切换</button>
</template>

<script setup>
import Student from './components/Student.vue'
import Teacher from './components/Teacher.vue'
import { ref } from 'vue'
const tab = [Student, Teacher]
const index = ref(0)
const changeTab = () => {
  index.value = index.value === 0 ? 1 : 0
}
</script>
```

```vue
<!-- Student.vue -->
<template>
    <h1>{{ name }}</h1>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Student')
</script>
```

```vue
<!-- Teacher.vue -->
<template>
    <h1>{{ name }}</h1>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Teacher')
</script>
```

@tab HTML

```html
<body>
    <div id="app">
        <component :is="tab[index]"></component>
        <button @click="changeTab">切换</button>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        import Teacher from './Teacher.js'
        createApp({
            components: {
                Student,
                Teacher
            },
            setup() {
                const tab = [Student, Teacher]
                const index = ref(0)
                const changeTab = () => {
                    index.value = index.value === 0 ? 1 : 0
                }
                return {
                    tab,
                    index,
                    changeTab
                }
            }
        }).mount('#app')
    </script>
</body>
```

```javaScript
// Student.js
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const name = ref('Student')
        return {
            name
        }
    },
    template: `
        <h1>{{ name }}</h1>`
}
```

```javaScript
// Teacher.js
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const name = ref('Teacher')
        return {
            name
        }
    },
    template: `
        <h1>{{ name }}</h1>`
}
```
:::

`is` 属性可以接受一个字符串或对象，如果是字符串，则表示组件的名称，如果是对象，则表示导入的组件对象，也可以传入一般的 HTML 元素

组件切换时，会卸载被切换的组件，可以使用 `<KeepAlive>` 组件来缓存组件，避免组件被卸载
