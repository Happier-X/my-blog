---
cover: https://t.alcy.cc/fj?t=1730712600000
order: 33
date: 2024-11-04 17:30
category: 开发
tag: Vue
excerpt: false
---

# Vue 内置内容

## 内置指令

### v-text

用于将数据绑定到文本节点，类似于 `{{}}` 语法。

```vue
<template>
  <div v-text="message"></div>
</template>
```

### v-html

用于将数据绑定到 HTML 节点，会解析 HTML 标签。

```vue
<template>
  <div v-html="htmlContent"></div>
</template>
```

### v-show

用于根据条件显示或隐藏元素 (通过设置元素的 `display` 属性)。

```vue
<template>
  <div v-show="isVisible">This is a visible element</div>
</template>
```

### v-if

用于根据条件渲染元素 (如果条件为假，则元素不会被渲染)。

```vue
<template>
  <div v-if="isTrue">This is a conditional element</div>
</template>
```

### v-else

用于配合 `v-if` 使用，表示 `v-if` 条件为假时的渲染内容。

```vue
<template>
  <div v-if="isTrue">This is a conditional element</div>
  <div v-else>This is an alternative element</div>
</template>
```

### v-else-if

用于配合 `v-if` 使用，表示 `v-if` 条件为假时的另一种条件渲染。

```vue
<template>
  <div v-if="condition1">This is the first condition</div>
  <div v-else-if="condition2">This is the second condition</div>
  <div v-else>This is the alternative element</div>
</template>
```

### v-for

基于原始数据多次渲染元素或模板块。

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

### v-on

给元素绑定事件监听器。

缩写为 `@`。

```vue
<template>
  <button v-on:click="handleClick">Click me</button>
</template>
```

### v-bind

动态的绑定一个或多个 `attribute`，也可以是组件的 `prop`。

缩写为 `:`。

```vue
<template>
  <img v-bind:src="imageSrc" alt="Image" />
</template>
```

### v-model

在表单输入元素或组件上创建双向绑定。

```vue
<template>
  <input v-model="message" placeholder="Type something" />
</template>
```

### v-slot

用于声明具名插槽或是期望接收 `props` 的作用域插槽。

缩写为 `#`。

```vue
<template>
  <child-component v-slot:default="slotProps">
    {{ slotProps.someProp }}
  </child-component>
</template>
```

### v-pre

跳过该元素及其所有子元素的编译。

```vue
<template>
  <div v-pre>{{ this will not be compiled }}</div>
</template>
```

### v-once

仅渲染元素和组件一次，并跳过之后的更新。

```vue
<template>
  <div v-once>{{ message }}</div>
</template>
```

### v-memo

用于缓存元素或组件的渲染结果，以避免不必要的重新渲染。

为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。

```vue
<template>
  <div v-memo="[item.id]">{{ item.name }}</div>
</template>
```

### v-cloak

用于隐藏尚未完成编译的 DOM 模板。

```vue
<template>
  <div v-cloak>{{ message }}</div>
</template>
```

## 内置组件

### Transition

为单个元素或组件提供动画过渡效果。

```vue
<template>
  <div>
    <button @click="show = !show">切换</button>
    <transition name="fade">
      <p v-if="show">Hello Vue!</p>
    </transition>
  </div>
</template>
```

### TransitionGroup

为列表中的多个元素或组件提供过渡效果。

```vue
<template>
  <div>
    <button @click="addItem">添加</button>
    <transition-group name="fade">
      <p v-for="(item, index) in items" :key="item">{{ item }}</p>
    </transition-group>
  </div>
</template>
```

### KeepAlive

缓存包裹在其中的动态切换组件。

```vue
<template>
  <div>
    <button @click="currentComponent = 'ComponentA'">A</button>
    <button @click="currentComponent = 'ComponentB'">B</button>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>
```

### Teleport

将其插槽内容渲染到 DOM 中的另一个位置。

```vue
<template>
  <div>
    <button @click="showModal = true">打开模态框</button>
    <teleport to="body">
      <div v-if="showModal" class="modal">
        <p>这是一个模态框</p>
        <button @click="showModal = false">关闭</button>
      </div>
    </teleport>
  </div>
</template>
```

## 内置特殊元素

### component

一个用于渲染动态组件或元素的 “元组件”。

```vue
<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" />
</template>

<script setup>
import Foo from "./Foo.vue";
import Bar from "./Bar.vue";
</script>
```

### slot

表示模板中的插槽内容出口。

```vue
<template>
  <div>
    <h2>我是父组件</h2>
    <slot></slot>
  </div>
</template>
```

### template

当我们想要使用内置指令而不在 DOM 中渲染元素时，`<template>` 标签可以作为占位符使用。

```vue
<template>
  <div>
    <h2>我是父组件</h2>
    <template v-if="isShow">
      <p>我是子组件</p>
    </template>
  </div>
</template>
```

## 内置特殊 Attributes

### key

`key` 主要作为 Vue 的虚拟 DOM 算法提示，在比较新旧节点列表时用于识别 vnode。

### ref

`ref` 用于注册模板引用。

### is

`is` 用于绑定动态组件。
