---
title: Vue 基础之列表渲染
cover: https://t.alcy.cc/fj?t=
order: 7
date: 2024-09-13 23:00
category: 软件开发
tag: Vue
excerpt: false
---
## 基础使用

使用 `v-for` 指令可以将一个数组渲染成一个列表

语法为 `v-for="item in items"`，其中 `items` 是要遍历的数组，`item` 是迭代项的别名

可以通过提供第二个参数表示位置索引

可以使用 `of` 来替代 `in`

```html
<body>
    <div id="app">
        <ul>
            <li v-for="(item,index) in array">{{ item }}-{{ index }}</li>
        </ul>
        <ul>
            <li v-for="(item,index) of array">{{ item }}-{{ index }}</li>
        </ul>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const array = ref([1, 2, 3, 4, 5])
                return {
                    array
                }
            }
        }).mount('#app')
    </script>
</body>
```

## 遍历对象

可以使用 `v-for` 来遍历一个对象的所有属性，遍历的顺序为该对象调用 `Object.values()` 的返回值来决定

可以通过提供第二个参数表示属性名，提供第三个参数表示位置索引

```html
<body>
    <div id="app">
        <ul>
            <li v-for="(item,key,index) in object">{{ item }}-{{ key }}-{{ index }}</li>
        </ul>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const object = ref({
                    name: '张三',
                    age: 18,
                    hobby: '篮球'
                })
                return {
                    object
                }
            }
        }).mount('#app')
    </script>
</body>
```

## 遍历整数值

当遍历一个整数值时，该模板会基于 `1...n` 的取值范围重复多次

```html
<body>
    <div id="app">
        <ul>
            <li v-for="item in 10">{{ item }}</li>
        </ul>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                return {
                }
            }
        }).mount('#app')
    </script>
</body>
```

注意此处 `n` 的初值是从 `1` 开始而非 `0`

## 在 template 上使用

在 `<template>` 标签上可以使用 `v-for` 来渲染一个包含多个元素的块

```html
<body>
    <div id="app">
        <ul>
            <template v-for="item in items">
                <li>{{ item.msg }}</li>
                <li>{{ item.phone }}</li>
            </template>
        </ul>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const items = ref([{
                    msg: 'hello',
                    phone: '123456789'
                }, {
                    msg: '你好',
                    phone: '987654321'
                }])
                return {
                    items
                }
            }
        }).mount('#app')
    </script>
</body>
```

## v-for 与 v-if

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高，此时 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名

下面代码会报错：

```html
<body>
    <div id="app">
        <ul>
            <li v-for="todoItem in todo" v-if="!todoItem.done">{{ todoItem.name }}</li>
        </ul>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const todo = ref([{
                    name: '吃饭',
                    done: true
                }, {
                    name: '睡觉',
                    done: false
                }])
                return {
                    todo
                }
            }
        }).mount('#app')
    </script>
</body>
```

可以先包装一层 `<template>`，在其上面使用 `v-for` 来解决：

```html
<body>
    <div id="app">
        <ul>
            <template v-for="todoItem in todo">
                <li v-if="!todoItem.done">{{ todoItem.name }}</li>
            </template>
        </ul>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const todo = ref([{
                    name: '吃饭',
                    done: true
                }, {
                    name: '睡觉',
                    done: false
                }])
                return {
                    todo
                }
            }
        }).mount('#app')
    </script>
</body>
```

##
