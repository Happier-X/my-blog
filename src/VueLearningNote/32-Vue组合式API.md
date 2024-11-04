---
cover: https://t.alcy.cc/fj?t=1730448000000
order: 32
date: 2024-11-01 16:00
category: 软件开发
tag: Vue
excerpt: false
---

# Vue 组合式 API

## setup()

`setup()` 函数是组合式 API 的入口函数。

### 基本使用

```vue
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // 返回值会暴露给模板和组件实例
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>
```

### 访问 props

`setup()` 函数的第一个参数是组件的 `props`。

解构 `props` 时，解构出的变量将会丢失响应性。

```JavaScript
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

### 访问上下文对象

`setup()` 函数的第二个参数是组件的上下文对象。

```JavaScript
export default {
  setup(props, context) {
    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(context.attrs)

    // 插槽（非响应式的对象，等价于 $slots）
    console.log(context.slots)

    // 触发事件（函数，等价于 $emit）
    console.log(context.emit)

    // 暴露公共属性（函数）
    // expose 函数用于显式地限制该组件暴露出的属性，当父组件通过模板引用访问该组件的实例时，将仅能访问 expose 函数暴露出的内容
    console.log(context.expose)
  }
}
```

上下文对象是非响应式的，可以安全地解构。

```JavaScript
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

### 与渲染函数一起使用

`setup()` 也可以返回一个渲染函数，此时在渲染函数中可以直接使用在同一作用域下声明的响应式状态。

```JavaScript
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

返回一个渲染函数将会阻止我们返回其他东西。如果我们想通过模板引用将这个组件的方法暴露给父组件，我们可以使用 `expose` 函数。

```JavaScript
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

## 核心 API

### ref()

`ref()` 函数用于将普通 JavaScript 值转换为一个响应式对象。

```JavaScript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

### computed()

`computed()` 函数用于创建一个计算属性。

```JavaScript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
console.log(doubleCount.value) // 0
```

### reactive()

`reactive()` 函数用于将普通对象转换为响应式对象。

```JavaScript
import { reactive } from 'vue'

const state = reactive({
  count: 0
})
console.log(state.count) // 0
state.count++
console.log(state.count) // 1
```

### readonly()

`readonly()` 函数用于创建一个只读的响应式代理对象。

```JavaScript
import { ref, reactive, readonly } from 'vue'

const state = reactive({
  count: 0
})
const readonlyState = readonly(state)
readonlyState.count++ // error
const count = ref(0)
const readonlyCount = readonly(count)
readonlyCount.value++ // error
```

### watchEffect()

`watchEffect()` 函数用于创建一个副作用函数，该函数会在其依赖项发生变化时自动重新运行。

```JavaScript
import { ref, watchEffect } from "vue"

const count = ref(0)
watchEffect(() => {
  console.log("Current count:", count.value)
})
count.value++ // 触发副作用函数，输出 "Current count: 1"
```

### watchPostEffect()

`watchEffect()` 使用 `flush: 'post'` 选项时的别名。

### watchSyncEffect()

`watchEffect()` 使用 `flush: 'sync'` 选项时的别名。

### watch()

`watch()` 函数用于创建一个侦听器，该侦听器会在其依赖项发生变化时自动重新运行。

```JavaScript
import { ref, watch } from "vue"

const count = ref(0)
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})
count.value++ // 触发侦听器，输出 "count changed from 0 to 1"
```

### onWatcherCleanup()

`onWatcherCleanup()` 函数用于在侦听器被清理时执行回调函数。

```JavaScript
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const { response, cancel } = doAsyncWork(newId)
  // 如果 `id` 变化，则调用 `cancel`，
  // 如果之前的请求未完成，则取消该请求
  onWatcherCleanup(cancel)
})
```

