---
title: Vue 模板引用
cover: https://t.alcy.cc/fj?t=1727006400
order: 14
date: 2024-09-22 20:00
category: 软件开发
tag: Vue
excerpt: false
---
## 什么是模板引用

模板引用是 Vue 提供的一种方式，允许我们直接访问 DOM 元素或子组件实例，在 Vue 中，我们可以使用 `ref` 特性来为元素或组件添加一个引用，然后使用 `useTemplateRef()` 函数来获取该引用

```html
<body>
    <div id="app">
        <h3 ref="messageRef">{{ message }}</h3>
    </div>
    <script type="module">
        import { createApp, ref, useTemplateRef, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const message = ref('hello world')
                // 函数的参数是模板引用的 ref 值
                const messageRef = useTemplateRef('messageRef')
                onMounted(() => {
                    console.log(messageRef.value) // <h3>hello world</h3>
                })
                return {
                    message
                }
            }
        }).mount('#app')
    </script>
</body>
```

注意：只可以在组件挂载后才能访问模板引用，如果你想在模板中的表达式上访问，在初次渲染时会是 `null`

## v-for 中的模版引用

在 `v-for` 中使用模板引用时，会返回一个数组，它将在元素被挂载后包含对应整个列表的所有元素

```html
<body>
    <div id="app">
        <ul>
            <li v-for="item in list" ref="itemsRef">{{ item }}</li>
        </ul>
    </div>
    <script type="module">
        import { createApp, ref, useTemplateRef, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const list = ref(['a', 'b', 'c'])
                const itemsRef = useTemplateRef('itemsRef')
                onMounted(() => {
                    console.log(itemsRef.value) // [li, li, li]
                })
                return {
                    list
                }
            }
        }).mount('#app')
    </script>
</body>
```

注意：ref 数组并不保证与源数组相同的顺序

## 函数模板引用

ref 还可以接受一个函数作为参数，会在每次组件更新时调用该函数，该函数会收到元素引用作为其第一个参数

当绑定的元素被卸载时，函数也会被调用一次，但此时参数会是 `null`

```vue
<h3 :ref="(el) => { /* 执行一些操作 */ }"></h3>
```
