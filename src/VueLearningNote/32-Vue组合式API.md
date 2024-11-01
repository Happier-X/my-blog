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
