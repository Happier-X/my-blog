---
title: Vue 基础之事件处理
cover: https://t.alcy.cc/fj?t=1724945400
order: 4
date: 2024-08-29 23:30
category: 软件开发
tag: Vue
excerpt: false
---
## 事件监听

使用 `v-on` 指令（简写为 `@`）来监听 DOM 事件

用法：`v-on:事件="handler"` 或 `@事件="handler"`

handler（事件处理器）的值可以是：

- 方法事件处理器：一个指向组件上定义的方法的属性名或路径
- 内联事件处理器：事件被触发时执行的内联 JavaScript 语句

## 方法事件处理器

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <button v-on:click="add">按钮</button>
        <!-- 简写 -->
        <button @click="add">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                const add = () => {
                    count.value++
                }
                return {
                    count,
                    add
                }
            }
        }).mount('#app')
    </script>
</body>
```

### 获取事件对象

方法事件处理器会自动接收原生 DOM 事件并触发执行，我们可以在方法中用 `event` 参数接收

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <button @click="add">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                // 接收事件对象
                const add = (event) => {
                    count.value++
                    console.log('事件对象', event)
                }
                return {
                    count,
                    add
                }
            }
        }).mount('#app')
    </script>
</body>
```

## 内联事件处理器

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <button v-on:click="count++">按钮</button>
        <!-- 简写 -->
        <button @click="count++">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                return {
                    count
                }
            }
        }).mount('#app')
    </script>
</body>
```

### 在内联处理器中调用方法（用于向方法传入自定义参数）

在内联处理器中调用方法可以向方法传入自定义参数

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <button @click="add(2)">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                // 传入自定义参数
                const add = (number) => {
                    count.value += number
                }
                return {
                    count,
                    add
                }
            }
        }).mount('#app')
    </script>
</body>
```

### 获取事件对象

在内联处理器中调用方法时，我们可以传入一个特殊的 `$event` 变量或使用内联箭头函数来获取事件对象

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <!-- 使用 $event 变量 -->
        <button @click="add(2,$event)">按钮</button>
        <!-- 使用内联箭头函数 -->
        <button @click="(event) => add(2,event)">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                // 传入自定义参数
                const add = (number, event) => {
                    count.value += number
                    console.log('事件对象', event)
                }
                return {
                    count,
                    add
                }
            }
        }).mount('#app')
    </script>
</body>
```

## 修饰符

### 事件修饰符

- `.stop` 阻止事件冒泡
- `.prevent` 阻止默认事件
- `.self` 只有 `event.target` 是当前操作的元素时才触发事件
- `.capture` 使用事件的捕获模式
- `.once` 事件只触发一次
- `.passive` 事件的默认行为立即执行，无需等待事件回调执行完毕

### 按键修饰符

#### Vue 为一些常用的按键提供了别名：

- `.enter` 回车键
- `.tab` 制表键
- `.delete` 删除键（捕获“删除”和“退格”键）
- `.esc` 撤销键
- `.space` 空格键
- `.up` 上箭头键
- `.down` 下箭头键
- `.left` 左箭头键
- `.right` 右箭头键

Vue 中未提供的可以使用按键原始的 key 值去绑定，但注意要转为 `kebab-case` 形式

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <!-- 松开 enter 时触发 -->
        <input @keyup.enter="add" />
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
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

#### 系统修饰符

- `.ctrl` ctrl 键
- `.alt` alt 键
- `.shift` shift 键
- `.meta` Windows 键（在 Mac 系统上为 Command 键）

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <!-- 按下 ctrl + a 时触发 -->
        <button @click.ctrl.a="add">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
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

#### `.exact` 修饰符

`.exact` 修饰符允许精确控制触发事件所需的系统修饰符的组合

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <!-- 按下 ctrl 时触发 -->
        <button @click.ctrl="add1">按钮</button>
        <!-- 仅当按下 ctrl 且未按任何其他键时触发 -->
        <button @click.ctrl.exact="add2">按钮</button>
        <!-- 仅当未按下任何修饰键时触发 -->
        <button @click.exact="add3">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const count = ref(0)
                const add1 = () => {
                    count.value++
                }
                const add2 = () => {
                    count.value += 2
                }
                const add3 = () => {
                    count.value += 3
                }
                return {
                    count,
                    add1,
                    add2,
                    add3
                }
            }
        }).mount('#app')
    </script>
</body>
```

### 鼠标修饰符

- `.left` 左键点击
- `.right` 右键点击
- `.middle` 中键点击

```html
<body>
    <div id="app">
        <h1>{{count}}</h1>
        <button @click.right="add">按钮</button>
    </div>
    <script type="module">
        import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
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
