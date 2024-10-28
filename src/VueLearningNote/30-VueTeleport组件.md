---
title: Vue Teleport 组件
cover: https://t.alcy.cc/fj?t=1728043200
order: 30
date: 2024-10-04 20:00
category: 软件开发
tag: Vue
excerpt: false
---

`<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板 “传送” 到该组件的 DOM 结构外层的位置

## 基本用法

`<Teleport>` 接收一个 `to` 属性来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象

:::tabs
@tab 单文件组件
```vue
<template>
  <button @click="toggleModal">打开模态框</button>
  <teleport to="body">
    <div v-if="showModal" class="modal">
      <h2>这是一个模态框</h2>
      <p>模态框内容</p>
      <button @click="toggleModal">关闭模态框</button>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue"
const showModal = ref(false)
const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
}
</style>
```
@tab HTML
```html
<head>
    <style>
        .modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            padding: 20px;
            background-color: white;
            border: 1px solid #ccc;
        }
    </style>
</head>

<body>
    <div id="app">
        <button @click="toggleModal">打开模态框</button>
        <teleport to="body">
            <div v-if="showModal" class="modal">
                <h2>这是一个模态框</h2>
                <p>模态框内容</p>
                <button @click="toggleModal">关闭模态框</button>
            </div>
        </teleport>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const showModal = ref(false)
                const toggleModal = () => {
                    showModal.value = !showModal.value
                }
                return {
                    showModal,
                    toggleModal
                }
            }
        }).mount('#app')
    </script>
</body>
```
:::

## 禁用 Teleport

`<Teleport>` 组件有一个 `disabled` 属性，当 `disabled` 为 `true` 时，组件内部的模板将不会被传送，而是直接渲染在组件的 DOM 结构中

## 多个 Teleport 共享目标

如果多个 `<Teleport>` 组件共享同一个目标，它们的内容将会顺次追加到目标元素中

## 延迟解析的 Teleport

可以使用 `defer` 属性来延迟解析 `<Teleport>` 组件，直到应用的其他部分挂载

目标元素必须与 `<Teleport>` 组件在同一个挂载/更新周期内渲染
