---
title: Vue Transition 组件
cover: https://t.alcy.cc/fj?t=1727922600
order: 27
date: 2024-10-03 10:30:00
category: 开发
tag: Vue
excerpt: false
---

`<Transition>` 是一个内置组件，它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上

进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

`<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素

## 基于 CSS 的过渡

### CSS 过渡类名

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
import { ref } from "vue";
const show = ref(true);
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
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const show = ref(true);
        return {
          show,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

### 为过渡效果命名

可以通过 `name` 属性来为过渡效果命名

```vue
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

### CSS 的动画

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
import { ref } from "vue";
const show = ref(true);
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
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const show = ref(true);
        return {
          show,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

### 自定义过渡类名

可以向 `<Transition>` 组件传递如下几个属性：

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

它们将覆盖默认的过渡类名，这个功能可以用于集成一些动画库

```vue
<Transition name="customName" enter-from-class="类名">
    ...
</Transition>
```

### 同时使用过渡和动画

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 CSS `transitionend` 或 `animationend`，这取决于所使用的 CSS 规则。如果你使用其中任何一种，Vue 能自动检测到正确的类型

但是如果同时使用了过渡和动画，需要使用 Vue 提供的 `<Transition>` 组件的 `type` 属性，通过传入 `animation` 或 `transition` 来告知 Vue 关心那种类型

### 深层级过渡与显式过渡时长

可以使用深层级的 CSS 选择器在深层级的元素上触发过渡效果

:::tabs

@tab 单文件组件

```vue
<template>
  <button @click="show = !show">切换</button>
  <!-- 在嵌套的过渡元素中，我们期望等待所有内部元素的过渡完成，所有需要指定过渡的持续时间 -->
  <!-- 通过传入 duration 来显式指定过渡的持续时间 -->
  <!-- <Transition name="nested" :duration="500"> -->
  <!-- 分别指定进入和离开所需的时间 -->
  <Transition name="nested" :duration="{ enter: 500, leave: 800 }">
    <div v-if="show" class="outer">
      <div class="inner">Hello</div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
const show = ref(true);
</script>

<style scoped>
.outer,
.inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.inner {
  background: #ccc;
}

/* 应用于嵌套元素的规则 */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

/* 延迟嵌套元素的进入以获得交错效果 */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
</style>
```

@tab HTML

```html
<head>
  <style>
    .outer,
    .inner {
      background: #eee;
      padding: 30px;
      min-height: 100px;
    }

    .inner {
      background: #ccc;
    }

    /* 应用于嵌套元素的规则 */
    .nested-enter-active .inner,
    .nested-leave-active .inner {
      transition: all 0.3s ease-in-out;
    }

    /* 延迟嵌套元素的进入以获得交错效果 */
    .nested-enter-active .inner {
      transition-delay: 0.25s;
    }

    .nested-enter-from .inner,
    .nested-leave-to .inner {
      transform: translateX(30px);
      opacity: 0;
    }
  </style>
</head>

<body>
  <div id="app">
    <button @click="show = !show">切换</button>
    <!-- 在嵌套的过渡元素中，我们期望等待所有内部元素的过渡完成，所有需要指定过渡的持续时间 -->
    <!-- 通过传入 duration 来显式指定过渡的持续时间 -->
    <!-- <Transition name="nested" :duration="500"> -->
    <!-- 分别指定进入和离开所需的时间 -->
    <Transition name="nested" :duration="{ enter: 500, leave: 800 }">
      <div v-if="show" class="outer">
        <div class="inner">Hello</div>
      </div>
    </Transition>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const show = ref(true);
        return {
          show,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## JavaScript 钩子

Vue 的 `<Transition>` 组件提供了 JavaScript 钩子，允许在进入/离开过渡期间应用自定义 JavaScript 行为

有如下几个钩子：

- `before-enter`：在元素被插入到 DOM 之前调用，用这个钩子来设置元素的 `enter-from` 状态
- `enter`：在元素被插入到 DOM 之后的下一帧调用。用这个钩子来开始进入动画
- `after-enter`：在过渡动画完成之后调用
- `enter-cancelled`：在进入过渡完成之前被取消时调用
- `before-leave`：在 `leave` 钩子之前调用
- `leave`：在离开过渡开始时调用。用这个钩子来开始离开动画
- `after-leave`：在离开过渡完成且元素已经从 DOM 中移除时调用
- `leave-cancelled`：仅在 `v-show` 过渡中可用

这些钩子可以与 CSS 过渡或动画结合使用，也可以单独使用，在仅使用 JavaScript 钩子时，最好添加一个 `:css="false"` 属性

它们的参数如下：

- `el`：正在执行过渡的元素
- `done`：在 `enter` 和 `leave` 钩子中，是一个可调用函数，表示过渡结束

:::tabs

@tab 单文件组件

```vue
<template>
  <button @click="show = !show">Toggle</button>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    :css="false"
  >
    <div class="gsap-box" v-if="show"></div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const show = ref(true);

function onBeforeEnter(el) {
  gsap.set(el, {
    scaleX: 0.25,
    scaleY: 0.25,
    opacity: 1,
  });
}

function onEnter(el, done) {
  gsap.to(el, {
    duration: 1,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    ease: "elastic.inOut(2.5, 1)",
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    duration: 0.7,
    scaleX: 1,
    scaleY: 1,
    x: 300,
    ease: "elastic.inOut(2.5, 1)",
  });
  gsap.to(el, {
    duration: 0.2,
    delay: 0.5,
    opacity: 0,
    onComplete: done,
  });
}
</script>

<style scoped>
.gsap-box {
  background: #42b883;
  margin-top: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
```

@tab HTML

```html
<head>
  <style>
    .gsap-box {
      background: #42b883;
      margin-top: 20px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  </style>
</head>

<body>
  <div id="app">
    <button @click="show = !show">Toggle</button>
    <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <div class="gsap-box" v-if="show"></div>
    </Transition>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const show = ref(true);
        function onBeforeEnter(el) {
          gsap.set(el, {
            scaleX: 0.25,
            scaleY: 0.25,
            opacity: 1,
          });
        }

        function onEnter(el, done) {
          gsap.to(el, {
            duration: 1,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            ease: "elastic.inOut(2.5, 1)",
            onComplete: done,
          });
        }

        function onLeave(el, done) {
          gsap.to(el, {
            duration: 0.7,
            scaleX: 1,
            scaleY: 1,
            x: 300,
            ease: "elastic.inOut(2.5, 1)",
          });
          gsap.to(el, {
            duration: 0.2,
            delay: 0.5,
            opacity: 0,
            onComplete: done,
          });
        }
        return {
          show,
          onBeforeEnter,
          onEnter,
          onLeave,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 可复用过渡效果

要创建一个可被复用的过渡，我们需要为 `<Transition>` 组件创建一个包装组件，并向内传入插槽内容

:::tabs

@tab 单文件组件

```vue
<!-- MyTransition.vue -->
<template>
  <!-- 包装内置的 Transition 组件 -->
  <Transition name="my-transition">
    <!-- 向内传递插槽内容 -->
    <slot></slot>
  </Transition>
</template>

<style>
/* 这里避免使用 scoped */
.my-transition-enter-active,
.my-transition-leave-active {
  transition: opacity 0.5s ease;
}

.my-transition-enter-from,
.my-transition-leave-to {
  opacity: 0;
}
</style>
```

```vue
<!-- App.vue -->
<template>
  <button @click="show = !show">切换</button>
  <MyTransition>
    <div v-if="show">Hello</div>
  </MyTransition>
</template>

<script setup>
import { ref } from "vue";
import MyTransition from "./components/MyTransition.vue";
const show = ref(true);
</script>
```

@tab HTML

```javascript
// MyTransition.js
export default {
  template: `
        <!-- 包装内置的 Transition 组件 -->
        <Transition name="my-transition">
            <!-- 向内传递插槽内容 -->
            <slot></slot>
        </Transition>`,
};
```

```html
<head>
  <style>
    .my-transition-enter-active,
    .my-transition-leave-active {
      transition: opacity 0.5s ease;
    }

    .my-transition-enter-from,
    .my-transition-leave-to {
      opacity: 0;
    }
  </style>
</head>

<body>
  <div id="app">
    <button @click="show = !show">切换</button>
    <my-transition>
      <div v-if="show">Hello</div>
    </my-transition>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    import MyTransition from "./MyTransition.js";
    createApp({
      components: {
        MyTransition,
      },
      setup() {
        const show = ref(true);
        return {
          show,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 出现时过渡

如果想在某个节点初次渲染时应用一个过渡效果，可以使用 `appear` 属性

```vue
<Transition appear>
  ...
</Transition>
```

## 元素间过渡

除了 `v-if` 和 `v-show` 切换一个元素，我们也可以通过 `v-if` / `v-else` / `v-else-if` 来在元素之间进行切换，只要确保任一时刻只有一个元素被渲染即可

## 过渡模式

有时我么可能想要先执行离开动画，然后在其完成之后再执行元素的进入动画，这可以通过设置 `mode` 为 `out-in` 来实现

## 组件间过渡

`<Transition>` 也可以作用于动态组件之间的切换

## 动态过渡

`<Transition>` 的 props (如 `name`) 可以是动态的，允许我们根据组件的状态应用不同的过渡

## 使用 key 过渡

有时为了触发过渡，我们需要给元素添加一个唯一的 `key`，当 `key` 改变时，Vue 会认为这是一个新的元素，从而触发过渡
