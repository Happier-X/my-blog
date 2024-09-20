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

给第三个参数传入 `deep: true` 可以实现深层侦听器，当响应式对象中的某个属性发生变化时，会自动执行侦听器中的方法

上述例子中，我们给 `watch()` 传入了一个响应式对象，会隐式地创建一个深层侦听器，所以当 `time` 对象中的某个属性发生变化时，会自动执行侦听器中的方法

`deep` 还可以接收一个数字，表示最大遍历深度，即 Vue 应该遍历对象嵌套属性的层数

```vue
watch(source, callback, {
    deep: true
})
```

## 即时回调的侦听器

侦听器默认情况下，只有在侦听的数据发生变化时才会执行侦听器中的方法

给第三个参数传入 `immediate: true` 可以实现即时回调的侦听器，在创建侦听器时会自动执行侦听器中的方法

```vue
watch(source, callback, {
    immediate: true
})
```

## 一次性侦听器

侦听器默认情况下，每当侦听的数据发生变化时，都会执行侦听器中的方法

给第三个参数传入 `once: true` 可以实现一次性侦听器，回调函数只会在侦听的数据第一次变化时执行一次，之后不再执行

```vue
watch(source, callback, {
    once: true
})
```
## watchEffect()

`watchEffect()` 用于创建一个副作用监听器，它不需要显式地传入要侦听的数据，它会在依赖的响应式状态发生变化时自动执行回调函数

`watchEffect()` 会立即执行传入的函数，同时追踪其依赖的响应式状态，并在状态变更时重新运行该函数

```html
<body>
    <div id="app">
        <h3>{{ name }}</h3>
        <button @click="name = '李四'">改变name</button>
    </div>
    <script type="module">
        import { createApp, ref, watchEffect } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const name = ref('张三')
                // 监听 name 的变化
                watchEffect(() => {
                    console.log(name.value)
                })
                return {
                    name
                }
            }
        }).mount('#app')
    </script>
</body>
```

回调会立即执行，不需要指定 `immediate: true`，在执行期间，它会自动追踪 `name.value` 作为依赖（和计算属性类似），每当 `name.value` 变化时，回调会再次执行，我们不再需要明确传递 `name` 作为数据源

注意：`watchEffect` 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪

```html
<body>
    <div id="app">
        <h3>{{ count }}</h3>
        <button @click="count++">改变count</button>
        <h3>{{ message }}</h3>
        <button @click="message = `hello ${count}`">改变message</button>
    </div>
    <script type="module">
        import { createApp, ref, watchEffect } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                const message = ref('hello world')
                watchEffect(async () => {
                    console.log(count.value) // 在 await 之前访问，它会被追踪
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    console.log(message.value) // 在 await 之后访问，它不会被追踪
                })
                return {
                    count,
                    message
                }
            }
        }).mount('#app')
    </script>
</body>
```

这里我们在 `watchEffect` 中使用了异步回调，在第一个 `await` 之前访问了 `count.value`，因此它会被追踪。而在第一个 `await` 之后访问的 `message.value`，则不会被追踪

## 副作用清理

TODO：副作用清理

## 回调的触发时机

当改变侦听的响应式状态时，它可能会同时触发 Vue 组件更新和侦听器的回调

默认情况下，侦听器回调会在父组件更新（如有）之后、所属组件的 DOM 更新之前被调用，这意味着在回调中访问所属组件的 DOM 时，它将处于更新前的状态

如果想在侦听器回调中访问被 Vue 更新后的所属组件的 DOM，可以将 `flush` 选项设置为 `post`

```vue
watch(source, callback, { 
    flush: 'post' 
})
```

```vue
watchEffect(callback, { 
    flush: 'post' 
})
```

也可以使用 `watchPostEffect()`

```html
<body>
    <div id="app">
        <h3 id="e1">{{ count1 }}</h3>
        <button @click="count1++">改变count1</button>
        <h3 id="e2">{{ count2 }}</h3>
        <button @click="count2++">改变count2</button>
        <h3 id="e3">{{ count3 }}</h3>
        <button @click="count3++">改变count3</button>
    </div>
    <script type="module">
        import { createApp, ref, watchEffect, watchPostEffect } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count1 = ref(0)
                const count2 = ref(0)
                const count3 = ref(0)
                watchEffect(() => {
                    console.log(count1.value) // 初次打印 0
                    const element1 = document.querySelector('#e1')
                    console.log(element1) // 初次打印 null
                })
                watchEffect(() => {
                    console.log(count2.value) // 初次打印 0
                    const element2 = document.querySelector('#e2')
                    console.log(element2) // 初次打印 <h3 id="e2">0</h3>
                }, {
                    flush: 'post'
                })
                watchPostEffect(() => {
                    console.log(count3.value) // 初次打印 0
                    const element3 = document.querySelector('#e3')
                    console.log(element3) // 初次打印 <h3 id="e3">0</h3>
                })
                return {
                    count1,
                    count2,
                    count3
                }
            }
        }).mount('#app')
    </script>
</body>
```

还可以创建一个同步触发的侦听器，将 `flush` 选项设置为 `sync` 或 使用 `watchSyncEffect()`，它会在 Vue 进行任何更新之前触发回调

## 停止侦听器

在 `setup()` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止

如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏

```html
<body>
    <div id="app">
        <h3>{{ count1 }}</h3>
        <button @click="count1++">改变count1</button>
        <h3>{{ count2 }}</h3>
        <button @click="count2++">改变count2</button>
    </div>
    <script type="module">
        import { createApp, ref, watchEffect } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count1 = ref(0)
                const count2 = ref(0)
                // 它会自动停止
                watchEffect(() => {
                    console.log(count1.value)
                })
                // 它不会自动停止
                setTimeout(() => {
                    watchEffect(() => {
                        console.log(count2.value)
                    })
                }, 100)
                return {
                    count1,
                    count2,
                }
            }
        }).mount('#app')
    </script>
</body>
```

要手动停止一个侦听器，可以调用侦听器返回的停止函数

```vue
const unWatch = watchEffect(() => {})
// 当不再需要侦听器时
unWatch()
```

如果我们需要等待一些异步数据，可以使用条件式的侦听器，当条件为真时开始侦听

```vue
// 异步数据
const data = ref(null)
watchEffect(() => {
    if (data.value) {
        // 这将在 data 价值后启动侦听器
    }
})
```
