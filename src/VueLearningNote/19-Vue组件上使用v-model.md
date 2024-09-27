---
title: Vue 组件上使用 v-model
cover: https://t.alcy.cc/fj?t=1727256600000
order: 19
date: 2024-09-25 17:30
category: 软件开发
tag: Vue
excerpt: false
---

## 基本用法

在子组件中使用 `defineModel()`，在父组件中的子组件上使用 `v-model` 绑定，此时 `defineModel()` 返回的值将和 `v-model` 绑定的值进行双向绑定

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  {{ studentName }}
  <Student v-model="studentName"></Student>
</template>

<script setup>
import Student from './components/Student.vue'
import { ref } from 'vue'
const studentName = ref('John')
</script>
```

```vue
<!-- Student.vue -->
<template>
    <input type="text" v-model="name">
</template>
<script setup>
const name = defineModel()
</script>
```
@tab HTML

`defineModel()` 只能用在 `<script setup>` 上，如想实现相同的效果，可以看下面底层原理部分

:::

## 底层原理

`defineModel()` 实际上是使用了 `props` 和自定义事件实现的

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  {{ studentName }}
  <Student :name="studentName" @update-name="$event => studentName = $event"></Student>
</template>

<script setup>
import Student from './components/Student.vue'
import { ref } from 'vue'
const studentName = ref('John')
</script>
```

```vue
<!-- Student.vue -->
<template>
    <input type="text" :value="name" @input="$emit('updateName', $event.target.value)">
</template>
<script setup>
const props = defineProps(['name'])
const emit = defineEmits(['updateName'])
</script>
```

@tab HTML

```html
<body>
    <div id="app">
        {{ studentName }}
        <Student :name="studentName" @update-name="$event => studentName = $event"></Student>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        createApp({
            components: {
                Student
            },
            setup() {
                const studentName = ref('John')
                return {
                    studentName
                }
            }
        }).mount('#app')
    </script>
</body>
```

```javascript
// Student.js
export default {
    props: ['name'],
    emits: ['updateName'],
    setup() {
        return {
        }
    },
    template: `
        <input type="text" :value="name" @input = "$emit('updateName', $event.target.value)">`
}
```

:::

因为 `defineModel()` 声明了一个 `prop`，我们可以给它传递选项，来声明底层 `prop` 的选项

## 多个 v-model 绑定

通过给 `v-model` 添加参数，可以绑定多个 `v-model`

在子组件中使用 `defineModel(参数名, 选项)`，在父组件中的子组件上使用 `v-model:参数名` 绑定

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  {{ studentName }}
  {{ studentAge }}
  <Student v-model:name="studentName" v-model:age="studentAge"></Student>
</template>

<script setup>
import Student from './components/Student.vue'
import { ref } from 'vue'
const studentName = ref('John')
const studentAge = ref(20)
</script>
```

```vue
<!-- Student.vue -->
<template>
    <input type="text" v-model="name">
    <input type="number" v-model="age">
</template>
<script setup>
const name = defineModel('name')
const age = defineModel('age')
</script>
```

@tab HTML

可参考底层原理实现

:::

## 处理 v-model 修饰符
