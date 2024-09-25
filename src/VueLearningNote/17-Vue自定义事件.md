---
title: Vue 自定义事件
cover: https://t.alcy.cc/fj?t=1727247600000
order: 17
date: 2024-09-25 15:00
category: 软件开发
tag: Vue
excerpt: false
---

自定义事件允许子组件向父组件发送消息，从而实现父子组件之间的通信

## 基本用法

:::tabs

@tab 单文件组件

在子组件中，使用 `defineEmits()` 声明自定义事件

在父组件中，使用 `v-on` 或 `@` 监听子组件的自定义事件

在子组件中，使用 `$emit()`（在模板中） 或 `emit()` 触发自定义事件，也可以传递参数

```vue
<!-- App.vue -->
<template>
  {{ school }}
  <!-- 监听子组件的自定义事件 -->
  <Student @transfer-school="changeSchool"></Student>
</template>

<script setup>
import Student from './components/Student.vue'
import { ref } from 'vue'
const school = ref('QFNU')
// 可以接收子组件传递过来的参数
const changeSchool = (value) => {
  if (value) {
    school.value = value
  } else {
    school.value = 'THU'
  }
}
</script>
```

```vue
<!-- Student.vue -->
<template>
    <h1>{{ name }}</h1>
    <!-- 在模板中使用 $emit 触发 -->
    <button @click="$emit('transferSchool')">转学</button>
    <button @click="handleClick">转学</button>
    <!-- 使用 $emit 触发，并传递参数 -->
    <button @click="$emit('transferSchool', 'PKU')">传参</button>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
// 声明自定义事件
const emit = defineEmits(['transferSchool'])
const name = ref('John')
const handleClick = () => {
    // 使用 emit 触发
    emit('transferSchool')
}
</script>
<style scoped>
h1 {
    color: pink;
}
</style>
```

@tab HTML

在子组件中，使用 `emits` 选项声明自定义事件

在父组件中，使用 `v-on` 或 `@` 监听子组件的自定义事件

在子组件中，使用 `$emit()`（在模板中） 或上下文对象的 `emit()` 触发自定义事件，也可以传递参数

```html
<body>
    <div id="app">
        {{ school }}
        <!-- 监听子组件的自定义事件 -->
        <Student @transfer-school="changeSchool"></Student>
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
                // 可以接收子组件传递过来的参数
                const changeSchool = (value) => {
                    if (value) {
                        school.value = value
                    } else {
                        school.value = 'THU'
                    }
                }
                return {
                    school,
                    changeSchool
                }
            }
        }).mount('#app')
    </script>
</body>
```

```js
// Student.js
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    // 声明自定义事件
    emits: ['transferSchool'],
    setup(props, ctx) {
        const name = ref('John')
        const handleClick = () => {
            // 使用上下文对象的 emit 触发
            ctx.emit('transferSchool')
        }
        return {
            name,
            handleClick
        }
    },
    template: `
        <h1>{{ name }}</h1>
        <!-- 在模板中使用 $emit 触发 -->
        <button @click="$emit('transferSchool')">转学</button>
        <button @click="handleClick">转学</button>
        <!-- 使用 $emit 触发，并传递参数 -->
        <button @click="$emit('transferSchool', 'PKU')">传参</button>`
}
```

:::

## 事件校验

在声明自定义事件时以对象的形式传入，可以指定事件的校验规则

事件可以被赋值为一个函数，接受的参数就是触发事件时传递的参数，返回一个布尔值来表明事件是否合法

```javaScript
{
    emit名:(value)=>{
        // 返回 true 表示事件合法，返回 false 表示事件不合法
    }
}
```