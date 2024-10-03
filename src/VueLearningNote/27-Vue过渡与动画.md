---
title: Vue 过渡与动画
cover: https://t.alcy.cc/fj?t=1727922600
order: 27
date: 2024-10-03 10:30
category: 软件开发
tag: Vue
excerpt: false
---

## Transition 组件

`<Transition>` 是一个内置组件，它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上

进入或离开可以由以下的条件之一触发：
- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

`<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素

### 基于 CSS 的过渡

#### CSS 过渡类名

1. `v-enter-from`：进入动画的开始状态。在元素插入之前添加，在元素插入完成之后的下一帧移除
2. `v-enter-active`：进入动画的生效状态。在元素被插入之前添加，在过渡或动画完成之后移除。这个类可以被用来定义进入动画的持续时间、延迟和速度曲线函数
3. `v-enter-to`：进入动画的结束状态。在元素插入完成之后的下一帧被添加，在过渡或动画完成之后移除
4. `v-leave-from`：离开动画的开始状态。在离开过渡效果被触发时添加，在下一帧后被移除
5. `v-leave-active`：离开动画的生效状态。在离开过渡效果被触发时添加，在过渡或动画完成之后移除。这个类可以被用来定义离开动画的持续时间、延迟和速度曲线函数
6. `v-leave-to`：离开动画的结束状态。在离开动画被触发后的下一帧添加，在过渡或动画完成之后移除

:::tabs

@tab 单文件组件

```vue
<template>
  <button @click="show = !show">切换</button>
  <Transition>
    <p v-if="show">Hello World!</p>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```
@tab HTML
```html
<head>
    <style>
        .v-enter-active,
        .v-leave-active {
            transition: opacity 0.5s ease;
        }

        .v-enter-from,
        .v-leave-to {
            opacity: 0;
        }
    </style>
</head>

<body>
    <div id="app">
        <button @click="show = !show">切换</button>
        <Transition>
            <p v-if="show">Hello World!</p>
        </Transition>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const show = ref(true)
                return {
                    show
                }
            }
        }).mount('#app')
    </script>
</body>
```
:::

#### 为过渡效果命名

可以通过 `name` 属性来为过渡效果命名

```template
<Transition name="customName">
    ...
</Transition>
```

此时的过渡类名如下：
- `customName-enter-from`
- `customName-enter-active`
- `customName-enter-to`
- `customName-leave-from`
- `customName-leave-active`
- `customName-leave-to`

#### CSS 的动画

CSS 动画用法同 CSS 过渡，区别在于 `v-enter-from` 不是在元素插入后立即移除，而是在一个 `animationend` 事件触发时被移除。对于大多数的 CSS 动画，我们可以简单地使用 `v-enter-active` 和 `v-leave-active` 这两个 class 来声明

:::tabs

@tab 单文件组件

```vue
<template>
  <button @click="show = !show">切换</button>
  <Transition name="bounce">
    <p v-if="show">Hello World!</p>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
```
@tab HTML
```html
<head>
    <style>
        .bounce-enter-active {
            animation: bounce-in 0.5s;
        }

        .bounce-leave-active {
            animation: bounce-in 0.5s reverse;
        }

        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }

            50% {
                transform: scale(1.25);
            }

            100% {
                transform: scale(1);
            }
        }
    </style>
</head>

<body>
    <div id="app">
        <button @click="show = !show">切换</button>
        <Transition name="bounce">
            <p v-if="show">Hello World!</p>
        </Transition>
    </div>
    <script type="module">
        import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const show = ref(true)
                return {
                    show
                }
            }
        }).mount('#app')
    </script>
</body>
```
:::

#### 自定义过渡类名

可以向 `<Transition>` 组件传递如下几个属性：
- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class` 

它们将覆盖默认的过渡类名，这个功能可以用于集成一些动画库

```template
<Transition name="customName" enter-from-class="类名">
    ...
</Transition>
```

#### 同时使用过渡和动画

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 CSS `transitionend` 或 `animationend`，这取决于所使用的 CSS 规则。如果你使用其中任何一种，Vue 能自动检测到正确的类型

但是如果同时使用了过渡和动画，需要使用 Vue 提供的 `<Transition>` 组件的 `type` 属性，通过传入 `animation` 或 `transition` 来告知 Vue 关心那种类型

#### 深层级过渡与显式过渡时长

可以使用深层级的 CSS 选择器在深层级的元素上触发过渡效果

