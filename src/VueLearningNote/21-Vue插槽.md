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

## 默认插槽

默认插槽没有指定 `name` 属性，默认插槽的内容会渲染到子组件中 `<slot>` 元素的位置

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

```vue-html
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
```

@tab HTML

```vue-html
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
```
@tab HTML

```vue-html
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

```vue-html
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

## 动态插槽名

动态指令参数可以用于插槽名，例如 `v-slot:[dynamicSlotName]`，其中 `dynamicSlotName` 是一个变量，其简写形式为 `#[dynamicSlotName]`

## 作用域插槽

有时需要从子组件向插槽传递数据，可以使用作用域插槽实现

通过在 `<slot>` 中传递 `props` 来实现，需要注意的是 `name` 是一个 Vue 特别保留的属性，因此不能用作 `props` 传递给插槽

### 在默认插槽中使用

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student>
    <template v-slot="slotProps">
      {{ slotProps.msg }}
    </template>
    <!-- 可以使用解构赋值 -->
    <!-- 
    <template v-slot="{ msg }">
      {{ msg }}
    </template> 
    -->
    <!-- 简写形式 -->
    <!-- 
    <template #default="slotProps">
      {{ slotProps.msg }}
    </template>
    -->
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
    <slot :msg="msg"></slot>
</template>

<script setup>
import { ref } from 'vue'
const msg = ref('子组件传递的数据')
</script>
```
@tab HTML

```vue-html
<body>
    <div id="app">
        我是父组件
        <Student>
            <template v-slot="slotProps">
                {{ slotProps.msg }}
            </template>
            <!-- 可以使用解构赋值 -->
            <!-- 
          <template v-slot="{ msg }">
            {{ msg }}
          </template> 
          -->
            <!-- 简写形式 -->
            <!-- 
          <template #default="slotProps">
            {{ slotProps.msg }}
          </template>
          -->
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
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const msg = ref('子组件传递的数据')
        return {
            msg
        }
    },
    template: `
        <div>我是子组件</div>
        <slot :msg="msg"></slot>`
}
```
:::

### 在具名插槽中使用

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student>
    <template v-slot:header="headerSlotProps">
      <h1>我是插槽header内容</h1>
      {{ headerSlotProps.msg }}
    </template>
    <!-- 简写形式 -->
    <template #main="mainSlotProps">
      <h2>我是插槽main内容</h2>
      {{ mainSlotProps.msg }}
    </template>
    <!-- 可以使用解构赋值 -->
    <template v-slot:footer="{ msg }">
      <h3>我是插槽footer内容</h3>
      {{ msg }}
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
    <slot name="header" :msg="headerMsg"></slot>
    <slot name="main" :msg="mainMsg"></slot>
    <slot name="footer" :msg="footerMsg"></slot>
</template>

<script setup>
import { ref } from 'vue'
const headerMsg = ref('子组件向header传递的数据')
const mainMsg = ref('子组件向main传递的数据')
const footerMsg = ref('子组件向footer传递的数据')
</script>
```
@tab HTML

```vue-html
<body>
    <div id="app">
        我是父组件
        <Student>
            <template v-slot:header="headerSlotProps">
                <h1>我是插槽header内容</h1>
                {{ headerSlotProps.msg }}
            </template>
            <!-- 简写形式 -->
            <template #main="mainSlotProps">
                <h2>我是插槽main内容</h2>
                {{ mainSlotProps.msg }}
            </template>
            <!-- 可以使用解构赋值 -->
            <template v-slot:footer="{ msg }">
                <h3>我是插槽footer内容</h3>
                {{ msg }}
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
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export default {
    setup() {
        const headerMsg = ref('子组件向header传递的数据')
        const mainMsg = ref('子组件向main传递的数据')
        const footerMsg = ref('子组件向footer传递的数据')
        return {
            headerMsg,
            mainMsg,
            footerMsg
        }
    },
    template: `
        <div>我是子组件</div>
        <slot name="header" :msg="headerMsg"></slot>
        <slot name="main" :msg="mainMsg"></slot>
        <slot name="footer" :msg="footerMsg"></slot>`
}
```
:::