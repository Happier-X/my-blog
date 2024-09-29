---
title: Vue 传递 props
cover: https://t.alcy.cc/fj?t=1727242200000
order: 16
date: 2024-09-25 13:30
category: 软件开发
tag: Vue
excerpt: false
---

使用 `props` 可以将数据从父组件传递到子组件

## props 声明

:::tabs

@tab 单文件组件

在子组件中，使用 `defineProps()` 声明需要从父组件接收的数据

```vue
<!-- App.vue -->
<template>
  {{ school }}
  <!-- 向子组件传递 -->
  <Student :school-name="school"></Student>
</template>

<script setup>
import Student from './components/Student.vue'
import { ref } from 'vue'
const school = ref('QFNU')
</script>
```

```vue
<!-- Student.vue -->
<template>
    <h1>{{ name }}</h1>
    <h2>{{ props.schoolName }}</h2>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('John')
// 接收父组件传递过来的数据
const props = defineProps(['schoolName'])
// 还可以使用对象的形式来接收父组件传递过来的数据
// 这里的每个属性 key 是 props 的名字，value 是 props 预期的类型
/*
const props = defineProps({
    schoolName: String
})
*/
</script>
```

@tab HTML

在子组件中，使用 `props` 声明需要从父组件接收的数据

```html
<body>
    <div id="app">
        {{ school }}
        <Student :school-name="school"></Student>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        createApp({
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

```javascript
// Student.js
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    // 接收父组件传递过来的数据
    props: ['schoolName'],
    // 还可以使用对象的形式来接收父组件传递过来的数据
    // 这里的每个属性 key 是 props 的名字，value 是 props 预期的类型
    /*
    props: {
        schoolName: String
    },
    */
    setup(props) {
        const name = ref('John')
        return {
            name,
            props
        }
    },
    template: `
        <div>
            <h1>{{ name }}</h1>
            <h2>{{ props.schoolName }}</h2>
        </div>`
}
```

:::

## 命名规范

声明 `props` 时，推荐使用小驼峰命名法（camelCase）

向子组件传递 `props` 时，推荐使用短横线分隔命名法（kebab-case）

## 单向数据流

父组件向子组件传递数据是单向的，我们不应该修改 `props` 的值，它是只读的

## props 校验

在 `props` 中，我们可以对传递过来的数据进行校验，确保数据符合要求

```javascript
// 给需要校验的 props 对象添加校验规则
{
    props名称:{
        type: 类型, // 可以传入一个数组，表示接受多种类型
        required: 是否必传, // true 或 false, 默认为 false
        default: 默认值, // 默认值，对象、数组、函数类型的默认值必须使用函数返回
        validator(value,props){
            // 自定义校验规则，第二个参数是完整的 props，返回 true 表示校验通过，返回 false 表示校验失败
        }
    }
}
```
