---
title: Vue 插槽
cover: https://t.alcy.cc/fj?t=1727425800000
order: 21
date: 2024-09-27 16:30
category: 软件开发
tag: Vue
excerpt: false
---

## 插槽内容与出口

如果父组件想向子组件传递一些模板片段，让子组件在内部渲染这些片段，那么可以使用插槽

`<slot>` 元素作为子组件的占位符，是一个插槽出口，它标示了父组件向子组件传递的插槽内容在子组件中的渲染位置

插槽内容可以是任意合法的模板内容，包括 HTML 元素、文本、Vue 组件等

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student>
    <h1>你好</h1>
    <div>哈哈哈</div>
    啦啦啦
  </Student>
</template>

<script setup>
import Student from './components/Student.vue'
</script>
```

```vue
<!-- Student.vue -->
<template>
    <div>我是子组件</div>
    <slot></slot>
</template>
<script setup>
</script>
```

@tab HTML

```html
<body>
    <div id="app">
        我是父组件
        <Student>
            <h1>你好</h1>
            <div>哈哈哈</div>
            啦啦啦
        </Student>
    </div>
    <script type="module">
        import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        createApp({
            components: {
                Student
            }
        }).mount('#app')
    </script>
</body>
```

```javascript
// Student.js
export default {
    template: `
        <div>我是子组件</div>
        <slot></slot>`
}
```
:::

## 渲染作用域

插槽内容可以访问到父组件的数据作用域，无法访问到子组件的数据作用域

## 默认内容

在外部没有提供任何内容的情况下，可以为插槽指定默认内容

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student></Student>
</template>

<script setup>
import Student from './components/Student.vue'
</script>
```

```vue
<!-- Student.vue -->
<template>
    <div>我是子组件</div>
    <slot>
        <h1>默认内容</h1>
    </slot>
</template>
<script setup>
</script>
```

@tab HTML

```html
<body>
    <div id="app">
        我是父组件
        <Student></Student>
    </div>
    <script type="module">
        import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        createApp({
            components: {
                Student
            }
        }).mount('#app')
    </script>
</body>
```

```javascript
// Student.js
export default {
    template: `
        <div>我是子组件</div>
        <slot>
            <h1>默认内容</h1>
        </slot>`
}
```
:::

## 具名插槽

如果子组件有多个插槽出口，可以通过为 `<slot>` 元素添加 `name` 属性来指定插槽的名称，从而实现具名插槽

没有提供 `name` 的 `<slot>` 出口会隐式地命名为 `default`

父组件可以使用一个含有 `v-slot` 指令的 `<template>` 元素来指定插槽内容，并通过 `v-slot` 指令的参数来指定插槽名称

`v-slot` 指令可以简写为 `#`

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student>
    <template v-slot:header>
      <h1>我是插槽header内容</h1>
    </template>
    <template #main>
      <h2>我是插槽main内容</h2>
    </template>
    <template v-slot:footer>
      <h3>我是插槽footer内容</h3>
    </template>
  </Student>
</template>

<script setup>
import Student from './components/Student.vue'
</script>
```
```vue
<!-- Student.vue -->
<template>
    <div>我是子组件</div>
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
</template>
<script setup>
</script>
```
@tab HTML

```html
<body>
    <div id="app">
        我是父组件
        <Student>
            <template v-slot:header>
                <h1>我是插槽header内容</h1>
            </template>
            <template #main>
                <h2>我是插槽main内容</h2>
            </template>
            <template v-slot:footer>
                <h3>我是插槽footer内容</h3>
            </template>
        </Student>
    </div>
    <script type="module">
        import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        createApp({
            components: {
                Student
            }
        }).mount('#app')
    </script>
</body>
```
```javascript
// Student.js
export default {
    template: `
        <div>我是子组件</div>
        <slot name="header"></slot>
        <slot name="main"></slot>
        <slot name="footer"></slot>`
}
```
:::

## 条件插槽

有时需要根据插槽是否存在来渲染某些内容，可以使用 `$slots` 属性与 `v-if` 来实现

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student>
    <template v-slot:header>
      <h1>我是插槽header内容</h1>
    </template>
    <template #main>
      <h2>我是插槽main内容</h2>
    </template>
    <template v-slot:footer>
      <h3>我是插槽footer内容</h3>
    </template>
  </Student>
</template>

<script setup>
import Student from './components/Student.vue'
</script>
```

```vue
<!-- Student.vue -->
<template>
    <div>我是子组件</div>
    <div v-if="$slots.header" class="header">
        <slot name="header"></slot>
    </div>
    <div v-if="$slots.main" class="main">
        <slot name="main"></slot>
    </div>
    <div v-if="$slots.footer" class="footer">
        <slot name="footer"></slot>
    </div>
</template>
<script setup>
</script>
<style scoped>
.header {
    background-color: pink;
}

.main {
    background-color: skyblue;
}

.footer {
    background-color: yellow;
}
</style>
```
@tab HTML

```html
<head>
    <style>
        .header {
            background-color: pink;
        }

        .main {
            background-color: skyblue;
        }

        .footer {
            background-color: yellow;
        }
    </style>
</head>

<body>
    <div id="app">
        我是父组件
        <Student>
            <template v-slot:header>
                <h1>我是插槽header内容</h1>
            </template>
            <template #main>
                <h2>我是插槽main内容</h2>
            </template>
            <template v-slot:footer>
                <h3>我是插槽footer内容</h3>
            </template>
        </Student>
    </div>
    <script type="module">
        import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import Student from './Student.js'
        createApp({
            components: {
                Student
            }
        }).mount('#app')
    </script>
</body>
```
```javascript
// Student.js
export default {
    template: `
        <div>我是子组件</div>
        <div v-if="$slots.header" class="header">
            <slot name="header"></slot>
        </div>
        <div v-if="$slots.main" class="main">
            <slot name="main"></slot>
        </div>
        <div v-if="$slots.footer" class="footer">
            <slot name="footer"></slot>
        </div>`
}
```
:::