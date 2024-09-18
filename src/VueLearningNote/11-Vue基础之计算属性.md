---
title: Vue 基础之计算属性
cover: https://t.alcy.cc/fj?t=1726642800
order: 11
date: 2024-09-18 15:00
category: 软件开发
tag: Vue
excerpt: false
---
## 基本用法

计算属性是基于其他数据计算得出的属性，它的值会根据依赖的数据自动更新

`computed` 方法接受一个 getter 函数，返回一个计算属性 ref

```html
<body>
    <div id="app">
        <div>{{ fullName }}</div>
    </div>
    <script type="module">
        import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const firstName = ref('Foo')
                const lastName = ref('Bar')
                const fullName = computed(() => {
                    return firstName.value + ' ' + lastName.value
                })
                return {
                    firstName,
                    lastName,
                    fullName
                }
            }
        }).mount('#app')
    </script>
</body>
```

我们定义了两个响应式数据 `firstName` 和 `lastName`，然后通过 `computed` 函数创建了一个计算属性 `fullName`，它的值是 `firstName` 和 `lastName` 的组合。当 `firstName` 或 `lastName` 发生变化时，`fullName` 会自动更新

## 计算属性缓存 vs 方法

计算属性会缓存其结果，只有当其依赖的响应式数据发生变化时才会重新计算。而方法每次调用都会执行，即使其依赖的数据没有变化

## 可写计算属性

计算属性默认只有 getter，但也可以提供一个 setter

```html
<body>
    <div id="app">
        <div>{{ firstName }}</div>
        <br>
        <div>{{ lastName }}</div>
        <br>
        <div>{{ fullName }}</div>
        <br>
        <button @click="fullName = 'Tom Sun'">修改 fullName</button>
    </div>
    <script type="module">
        import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const firstName = ref('Foo')
                const lastName = ref('Bar')
                const fullName = computed({
                    // getter
                    get() {
                        return firstName.value + ' ' + lastName.value
                    },
                    // setter
                    set(newValue) {
                        const names = newValue.split(' ')
                        firstName.value = names[0]
                        lastName.value = names[1]
                    }
                })
                return {
                    firstName,
                    lastName,
                    fullName
                }
            }
        }).mount('#app')
    </script>
</body>
```

当我们点击按钮修改 `fullName` 时，会触发 `fullName` 的 setter，从而修改 `firstName` 和 `lastName` 的值

## 注意事项

- getter 不应该有副作用，计算属性的 getter 应只做计算而没有其他副作用
- 避免直接修改计算属性的值
