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

`defineModel()` 只能用在 `<script setup>` 上，如想实现相同的效果，请参考以下代码

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

`defineModel()` 只能用在 `<script setup>` 上，如想实现相同的效果，请参考以下代码

```html
<body>
    <div id="app">
        {{ studentName }}
        {{ studentAge}}
        <Student :name="studentName" @update-name="$event => studentName = $event" :age="studentAge"
            @update-age="$event => studentAge = $event"></Student>
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
                const studentAge = ref(20)
                return {
                    studentName,
                    studentAge
                }
            }
        }).mount('#app')
    </script>
</body>
```

```javascript
// Student.js
export default {
    props: ['name', 'age'],
    emits: ['updateName', 'updateAge'],
    setup() {
        return {
        }
    },
    template: `
        <input type="text" :value="name" @input = "$emit('updateName', $event.target.value)">
        <input type="number" :value="age" @input = "$emit('updateAge', $event.target.value)">`
}
```

:::

## 处理 v-model 修饰符

通过解构 `defineModel()`，可以处理 `v-model` 的修饰符

为了处理修饰符，我们需要在 `defineModel()` 选项中传入一个 `get` 或 `set` 函数，它将接收 `v-model` 绑定的值，并返回处理后的值

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  {{ studentName }}
  <!-- 一个自定义修饰符 -->
  <Student v-model.capitalize="studentName"></Student>
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
// 通过解构赋值获取 v-model 的值和修饰符
const [name, modifiers] = defineModel({
    set(value) {
        if (modifiers.capitalize) {
            // 如果有 capitalize 修饰符，则将首字母大写
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
        return value
    }
})
console.log(modifiers) // { capitalize: true }
</script>
```

@tab HTML

`defineModel()` 只能用在 `<script setup>` 上，如想实现相同的效果，请参考以下代码

```html
<body>
    <div id="app">
        {{ studentName }}
        <Student :name="studentName" :modifiers="{ capitalize:true }" @update-name="$event => studentName = $event">
        </Student>
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
    props: {
        name: String,
        modifiers: {
            default: () => ({})
        }
    },
    emits: ['updateName'],
    setup(props, ctx) {
        const emitValue = (e) => {
            let value = e.target.value
            if (props.modifiers.capitalize) {
                value = value.charAt(0).toUpperCase() + value.slice(1)
            }
            ctx.emit('updateName', value)
        }
        return {
            emitValue
        }
    },
    template: `
        <input type="text" :value="name" @input = "emitValue">`
}
```

:::

