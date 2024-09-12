---
title: Vue 基础之条件渲染
cover: https://t.alcy.cc/fj?t=1726043400000
order: 5
date: 2024-09-11 16:30
category: 软件开发
tag: Vue
excerpt: false
---
可以通过指令 `v-if` 或 `v-show` 控制组件的渲染

## v-if

根据表达式的真假条件性地渲染元素，可以配合 `v-else-if` 和 `v-else` 使用

```html
<body>
    <div id="app">
        <div v-if="count === 1">count为1时显示</div>
        <div v-else-if="count === 2">count为2时显示</div>
        <div v-else>count不为1或2时显示</div>
        <button @click="add">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                const add = () => {
                    count.value++
                }
                return {
                    count,
                    add,
                }
            }
        }).mount('#app')
    </script>
</body>
```

## v-show

根据表达式的真假条件性地显示或隐藏元素

```html
<body>
    <div id="app">
        <div v-show="count === 1">count为1时显示</div>
        <button @click="add">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                const add = () => {
                    count.value++
                }
                return {
                    count,
                    add,
                }
            }
        }).mount('#app')
    </script>
</body>
```

## v-if 对比 v-show
