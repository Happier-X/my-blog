---
title: Vue 基础之响应式
cover: https://t.alcy.cc/fj?t=1726029000000
order: 3
date: 2024-09-11 12:30
category: 软件开发
tag: Vue
excerpt: false
---
## 声明响应式状态

响应式状态是指当其数据发生变化时，模板中依赖该数据的部分会自动更新

- ref 用于创建一个响应式数据（也可以用来创建对象或数组）
- reactive 用于创建一个响应式对象（或数组）
- 用 ref 创建的响应式数据需要通过 `.value` 来访问和修改，在模板中不需要
- reactive 创建的响应式对象可以直接访问和修改

:::tabs

@tab 单文件组件

```vue
<template>
  <h1>{{ title }}</h1>
  <p>{{ message.text1 }}</p>
  <p>{{ message.text2 }}</p>
</template>

<script setup>
import { ref, reactive } from 'vue'
// ref 用于创建一个响应式数据
const title = ref('Hello Vue')
// 用 ref 创建的响应式数据需要通过 .value 来访问和修改
title.value = 'Hello Vue!'
// reactive 用于创建一个响应式对象
const message = reactive({
  text1: 'Hello text1',
  text2: 'Hello text2'
})
// reactive 创建的响应式对象可以直接访问和修改
message.text1 = 'Hello text1!'
message.text2 = 'Hello text2!'
</script>
```

@tab HTML

```html
<body>
    <div id="app">
        <h1>{{ title }}</h1>
        <p>{{message.text1}}</p>
        <p>{{message.text2}}</p>
    </div>
    <script type="module">
        import { createApp, ref, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                // ref 用于创建一个响应式数据
                const title = ref('Hello Vue')
                // 用 ref 创建的响应式数据需要通过 .value 来访问和修改
                title.value = 'Hello Vue!'
                // reactive 用于创建一个响应式对象
                const message = reactive({
                    text1: 'Hello text1',
                    text2: 'Hello text2'
                })
                // reactive 创建的响应式对象可以直接访问和修改
                message.text1 = 'Hello text1!'
                message.text2 = 'Hello text2!'
                return {
                    title,
                    message
                }
            }
        }).mount('#app')
    </script>
</body>
```

:::

## DOM 更新时机

当修改了响应式状态时，DOM 会被自动更新。但是 DOM 更新不是同步的，Vue 会在 `next tick` 更新周期中缓冲所有状态的修改，以确保不管进行多少次状态修改，每个组件都只会被更新一次

若要等待 DOM 更新完成后再执行额外的代码，可以使用 `nextTick()`

可以传递一个回调函数作为参数，或者 await 其返回的 Promise

:::tabs

@tab 单文件组件

```vue
<template>
  <h1>{{ count }}</h1>
  <button @click="add1">按钮1</button>
  <button @click="add2">按钮2</button>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const count = ref(0)
const add1 = () => {
  count.value++
  // 传递一个回调函数
  nextTick(() => {
    console.log('DOM 更新后执行某些操作')
  })
}
const add2 = async () => {
  count.value++
  // await 其返回的 Promise
  await nextTick()
  console.log('此时 DOM 已经更新了')
}
</script>
```

@tab HTML

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <button @click="add1">按钮1</button>
        <button @click="add2">按钮2</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                const add1= () => {
                    count.value++
                    // 传递一个回调函数
                    nextTick(() => {
                        console.log('DOM 更新后执行某些操作')
                    })
                }
                const add2= async () => {
                    count.value++
                    // await 其返回的 Promise
                    await nextTick()
                    console.log('此时 DOM 已经更新了')
                }
                return {
                    count,
                    add1,
                    add2
                }
            }
        }).mount('#app')
    </script>
</body>
```

:::
