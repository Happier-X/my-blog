---
title: Vue 基础之侦听器
cover: https://t.alcy.cc/fj?t=1726644600
order: 12
date: 2024-09-18 15:30
category: 软件开发
tag: Vue
excerpt: false
---
## 基本用法

侦听器可以在响应式状态发生变化时自动执行侦听器中的方法

`watch` 的第一个参数是侦听的属性名，第二个参数是侦听器方法，第三个参数是配置项

第一个参数可以是不同形式的数据源：一个响应式属性名、一个计算属性、一个 getter 函数或多个数据源组成的数组

```html
<body>
    <div id="app">
        <h3>{{ name }}</h3>
        <button @click="name = '李四'">改变name</button>
        <h3>{{ time }}</h3>
        <button @click="time.year = 2025">改变time</button>
        <h3>{{ list }}</h3>
        <button @click="list.push(5)">改变list</button>
        <h3>{{ fullTime }}</h3>
        <h3>{{ x }} + {{ y }} = {{ x + y }}</h3>
        <button @click="x = 10">改变x</button>
    </div>
    <script type="module">
        import { createApp, ref, reactive, watch, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const name = ref('张三')
                const time = reactive({
                    year: 2024,
                    month: 9,
                })
                const list = reactive([1, 2, 3, 4])
                const fullTime = computed(() => {
                    return `${time.year}-${time.month}`
                })
                const x = ref(1)
                const y = ref(2)
                // 监听 name 的变化
                watch(name, (newVal, oldVal) => {
                    console.log(newVal, oldVal)
                    if (newVal === '李四') {
                        alert('李四')
                    }
                })
                // 监听 time 的变化
                // 因为 time 是一个对象，对象是通过引用来传递的，而不是值传递
                // 当修改对象的属性时，实际上是修改了对象的引用，所以打印出来的结果是修改后的值
                watch(time, (newVal, oldVal) => {
                    console.log(newVal, oldVal) // 这里的 newVal 和 oldVal 都是修改后的值
                })
                // 监听 list 的变化
                // 因为 list 是一个数组，数组是通过引用来传递的，而不是值传递
                // 当修改数组时，实际上是修改了数组的引用，所以打印出来的结果是修改后的值
                watch(list, (newVal, oldVal) => {
                    console.log(newVal, oldVal) // 这里的 newVal 和 oldVal 都是修改后的值
                })
                // 监听 fullTime 的变化（计算属性）
                watch(fullTime, (newVal, oldVal) => {
                    console.log(newVal, oldVal)
                })
                // 监听 getter 函数
                watch(() => x.value + y.value, (newVal, oldVal) => {
                    console.log(newVal, oldVal)
                })
                // 监听多个数据源组成的数组
                watch([x, y], (newVal, oldVal) => {
                    console.log(newVal, oldVal)
                })
                // 监听对象中的某个属性，需要使用 getter 函数，不能直接监听响应式对象的属性
                watch(() => time.year, (newVal, oldVal) => {
                    console.log(newVal, oldVal)
                })
                return {
                    name,
                    time,
                    list,
                    fullTime,
                    x,
                    y
                }
            }
        }).mount('#app')
    </script>
</body>
```

## 深层侦听器
