---
title: Vue TransitionGroup 组件
cover: https://t.alcy.cc/fj?t=1728005400
order: 28
date: 2024-10-04 09:30
category: 软件开发
tag: Vue
excerpt: false
---

`<TransitionGroup>` 是一个内置组件，用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果

## 和 `<Transition>` 的区别

+ 默认情况下，它不会渲染一个容器元素，但是可以通过传入 `tag` 属性来指定一个元素作为容器元素来渲染
+ 过渡模式在 `<TransitionGroup>` 中不适用
+ 列表中的每个元素都必须有唯一的 `key`
+ CSS 过渡类名会被应用在列表内的元素上，而不是容器元素上

## 进入/离开动画

:::tabs
@tab 单文件组件
```vue
<template>
  <button @click="insert">添加</button>
  <button @click="remove">移除</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([1, 2, 3, 4, 5])
let id = items.value.length + 1
const insert = () => {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id++)
}
const remove = () => {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 1)
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```
@tab HTML
```html
<head>
    <style>
        .list-enter-active,
        .list-leave-active {
            transition: all 1s ease;
        }

        .list-enter-from,
        .list-leave-to {
            opacity: 0;
            transform: translateX(30px);
        }
    </style>
</head>

<body>
    <div id="app">
        <button @click="insert">添加</button>
        <button @click="remove">移除</button>
        <transition-group name="list" tag="ul">
            <li v-for="item in items" :key="item">{{ item }}</li>
        </transition-group>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const items = ref([1, 2, 3, 4, 5])
                let id = items.value.length + 1
                const insert = () => {
                    const i = Math.round(Math.random() * items.value.length)
                    items.value.splice(i, 0, id++)
                }
                const remove = () => {
                    const i = Math.round(Math.random() * items.value.length)
                    items.value.splice(i, 1)
                }
                return {
                    items,
                    insert,
                    remove
                }
            }
        }).mount('#app')
    </script>
</body>
```
:::

## 移动动画

上述例子中，当某一项被插入或移除时，它周围的元素会立即发生 “跳跃” 而不是平稳地移动，可通过如下方式解决

:::tabs
@tab 单文件组件
```vue
<template>
  <button @click="insert">添加</button>
  <button @click="remove">移除</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([1, 2, 3, 4, 5])
let id = items.value.length + 1
const insert = () => {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id++)
}
const remove = () => {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 1)
}
</script>

<style scoped>
.list-move,
/* 对移动中的元素应用过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除，以便能够正确地计算移动的动画 */
.list-leave-active {
  position: absolute;
}
</style>
```
@tab HTML
```html
<head>
    <style>
        .list-move,
        /* 对移动中的元素应用过渡 */
        .list-enter-active,
        .list-leave-active {
            transition: all 1s ease;
        }

        .list-enter-from,
        .list-leave-to {
            opacity: 0;
            transform: translateX(30px);
        }

        /* 确保将离开的元素从布局流中删除，以便能够正确地计算移动的动画 */
        .list-leave-active {
            position: absolute;
        }
    </style>
</head>

<body>
    <div id="app">
        <button @click="insert">添加</button>
        <button @click="remove">移除</button>
        <transition-group name="list" tag="ul">
            <li v-for="item in items" :key="item">{{ item }}</li>
        </transition-group>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const items = ref([1, 2, 3, 4, 5])
                let id = items.value.length + 1
                const insert = () => {
                    const i = Math.round(Math.random() * items.value.length)
                    items.value.splice(i, 0, id++)
                }
                const remove = () => {
                    const i = Math.round(Math.random() * items.value.length)
                    items.value.splice(i, 1)
                }
                return {
                    items,
                    insert,
                    remove
                }
            }
        }).mount('#app')
    </script>
</body>
```
:::

## 渐进延迟列表动画

通过在 JavaScript 钩子中读取元素的 data 属性，可以实现渐进延迟列表动画

::: tabs
@tab 单文件组件
```vue
<template>
  <TransitionGroup name="list" tag="ul" :css="false" appear @before-enter="beforeEnter" @enter="enter">
    <li v-for="(item, index) in items" :key="item" :data-index="index">{{ item }}</li>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'
const items = ref([1, 2, 3, 4, 5])
const beforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    duration: 1,
    delay: el.dataset.index * 0.5,
  })
}
</script>
```
@tab HTML
```html
<body>
    <div id="app">
        <transition-group name="list" tag="ul" :css="false" appear @before-enter="beforeEnter" @enter="enter">
            <li v-for="(item, index) in items" :key="item" :data-index="index">{{ item }}</li>
        </transition-group>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const items = ref([1, 2, 3, 4, 5])
                const beforeEnter = (el) => {
                    gsap.set(el, {
                        opacity: 0,
                    })
                }
                const enter = (el, done) => {
                    gsap.to(el, {
                        opacity: 1,
                        duration: 1,
                        delay: el.dataset.index * 0.5,
                    })
                }
                return {
                    items,
                    beforeEnter,
                    enter
                }
            }
        }).mount('#app')
    </script>
</body>
```
:::