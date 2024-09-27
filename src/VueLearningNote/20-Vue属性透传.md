---
title: Vue 属性透传
cover: https://t.alcy.cc/fj?t=1727418600000
order: 20
date: 2024-09-27 14:30
category: 软件开发
tag: Vue
excerpt: false
---

## 基本概念

属性透传是指在 Vue 组件中，父组件传递给子组件的属性，如果子组件没有使用 `props` 或 `emits` 接收该属性，那么这些属性会自动传递给子组件的根元素

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student class="student" style="color:skyblue;" name="John" age="20" @click="handleClick">
  </Student>
</template>

<script setup>
import Student from './components/Student.vue'
const handleClick = () => {
  console.log('父组件的点击事件')
}
</script>

<style scoped>
.student {
  background-color: pink;
}
</style>
```

```vue
<!-- Student.vue -->
<template>
    <div ref="divRef" @click="handleClick">我是子组件{{ props.name }}</div>
</template>
<script setup>
import { onMounted, useTemplateRef } from 'vue'
const divRef = useTemplateRef('divRef')
const props = defineProps(['name'])
const emit = defineEmits(['click'])
onMounted(() => {
    console.log(divRef.value) // <div class="student" age="20" style="color: skyblue;">我是子组件John</div>
})
const handleClick = () => {
    console.log('子组件的点击事件')
}
</script>
```

`class`、`style`、`age` 属性会自动传递给子组件的根元素，而 `name` 属性则不会，因为子组件使用 `props` 接收了该属性，这里控制台不会打印 `父组件的点击事件`，因为子组件使用 `emits` 接收了该事件，如果不使用 `emits` 接收该事件，那么控制台将先打印 `子组件的点击事件`，然后打印 `父组件的点击事件`

## 属性合并

如果属性名相同会按照以下规则进行合并：

1. 如果属性是 `class` 或 `style`，那么父组件传递的属性会追加到子组件的根元素的属性中进行合并
2. 如果属性都是其他自定义的属性，那么父组件传递的属性会覆盖子组件的根元素的属性

## 深层组件透传

有些情况下一个组件会在根节点上渲染另一个组件，这种情况下，父组件传递给子组件的属性会自动传递给根节点渲染的组件，这种情况下称为深层组件透传

需要注意：
1. 透传的属性不会包含已经声明过的 `props` 或 `emits`
2. 透传的属性若符合声明，也可以被 `props` 或 `emits` 接收，来传入到深层组件中

## 禁用属性透传

如果不想属性自动透传，可以使用 `inheritAttrs: false` 来禁用属性透传

```vue
<!-- 在子组件中 -->
<script setup>
defineOptions({
    inheritAttrs: false
})
</script>
```

## 访问透传属性

在子组件 `<script setup>` 中可以通过 `useAttrs` 来访问透传的属性

在子组件模板中可以通过 `$attrs` 来访问透传的属性

```vue
<!-- App.vue -->
<template>
  我是父组件
  <Student class="student" style="color:skyblue;" name="John" age="20"></Student>
</template>

<script setup>
import Student from './components/Student.vue'
</script>

<style scoped>
.student {
  background-color: pink;
}
</style>
```

```vue
<!-- Student.vue -->
<template>
    <div>我是子组件{{ props.name }}{{ $attrs }}</div>
</template>
<script setup>
import { useAttrs } from 'vue'
defineOptions({
    inheritAttrs: false
})
const props = defineProps(['name'])
const attrs = useAttrs()
console.log(attrs) // { class: "student", style: { color: "skyblue" }, age: "20" }
</script>
```
