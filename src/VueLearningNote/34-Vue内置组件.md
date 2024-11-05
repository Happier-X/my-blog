---
cover: https://t.alcy.cc/fj?t=1730768400000
order: 34
date: 2024-11-05 09:00
category: 软件开发
tag: Vue
excerpt: false
---

# Vue 内置组件

## Transition

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

## TransitionGroup

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

## KeepAlive

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

## Teleport

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