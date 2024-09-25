---
title: Vue 传递 Props
cover: https://t.alcy.cc/fj?t=1727242200000
order: 16
date: 2024-09-25 13:30
category: 软件开发
tag: Vue
excerpt: false
---

使用 `props` 可以将数据从父组件传递到子组件

## Props 声明

在子组件中，使用 `props` 声明需要从父组件接收的数据

:::tabs

@tab 单文件组件

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
import { ref, defineProps } from 'vue'
const name = ref('John')
// 接收父组件传递过来的数据
const props = defineProps(['schoolName'])
// 还可以使用对象的形式来接收父组件传递过来的数据
// 这里的每个属性 key 是 prop 的名字，value 是 prop 预期的类型
/*
const props = defineProps({
    schoolName: String
})
*/
</script>
<style scoped>
h1 {
    color: pink;
}
</style>
```

@tab HTML

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
    // 这里的每个属性 key 是 prop 的名字，value 是 prop 预期的类型
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
