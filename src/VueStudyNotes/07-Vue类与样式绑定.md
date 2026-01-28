---
title: Vue 类与样式绑定
cover: https://t.alcy.cc/fj?t=1726207200000
order: 7
date: 2024-09-13 14:00:00
category: 开发
tag: Vue
excerpt: false
---

Vue 专门为 `class` 和 `style` 的 `v-bind` 用法提供了特殊的功能增强，除了字符串外，表达式的值也可以是对象或数组

## class 绑定

### 绑定对象

我们可以传给 `v-bind:class` (简写为 `:class`) 一个对象，以动态地切换 `class`

:::tabs

@tab 单文件组件

```vue
<template>
  <!-- 给 :class 传递一个对象来动态切换样式 -->
  <div :class="{ class1: isClass1 }">盒子1</div>
  <button @click="isClass1 = !isClass1">修改盒子1样式</button>
  <!-- :class 可以和普通 class 共存，对象中可以写多个字段 -->
  <div class="class1" :class="{ class2: isClass2, class3: isClass3 }">
    盒子2
  </div>
  <button @click="isClass2 = !isClass2">修改盒子2样式</button>
  <!-- 绑定的对象不一定需要写成内联字面量的形式，也可以直接绑定一个对象 -->
  <div :class="classObj">盒子3</div>
  <!-- 可以绑定一个返回对象的计算属性 -->
  <div :class="classObj2">盒子4</div>
</template>

<script setup>
import { ref, computed } from "vue";
const isClass1 = ref(true);
const isClass2 = ref(true);
const isClass3 = ref(false);
const classObj = ref({
  class3: true,
  class4: true,
});
const classObj2 = computed(() => ({
  class1: true,
  class2: false,
}));
</script>

<style scoped>
.class1 {
  background-color: pink;
}

.class2 {
  color: aquamarine;
}

.class3 {
  background-color: orange;
}

.class4 {
  color: red;
}
</style>
```

@tab HTML

```html
<head>
  <style>
    .class1 {
      background-color: pink;
    }
    .class2 {
      color: aquamarine;
    }
    .class3 {
      background-color: orange;
    }
    .class4 {
      color: red;
    }
  </style>
</head>

<body>
  <div id="app">
    <!-- 给 :class 传递一个对象来动态切换样式 -->
    <div :class="{ class1: isClass1 }">盒子1</div>
    <button @click="isClass1 = !isClass1">修改盒子1样式</button>
    <!-- :class 可以和普通 class 共存，对象中可以写多个字段 -->
    <div class="class1" :class="{ class2: isClass2, class3: isClass3 }">
      盒子2
    </div>
    <button @click="isClass2 = !isClass2">修改盒子2样式</button>
    <!-- 绑定的对象不一定需要写成内联字面量的形式，也可以直接绑定一个对象 -->
    <div :class="classObj">盒子3</div>
    <!-- 可以绑定一个返回对象的计算属性 -->
    <div :class="classObj2">盒子4</div>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
      computed,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const isClass1 = ref(true);
        const isClass2 = ref(true);
        const isClass3 = ref(false);
        const classObj = ref({
          class3: true,
          class4: true,
        });
        const classObj2 = computed(() => ({
          class1: true,
          class2: false,
        }));
        return {
          isClass1,
          isClass2,
          isClass3,
          classObj,
          classObj2,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

### 绑定数组

我们可以把一个数组传给 `v-bind:class` (简写为 `:class`)，以应用一个 `class` 列表

::: tabs
@tab 单文件组件

```vue
<template>
  <!-- 给 :class 传递一个数组 -->
  <div :class="[class1, class2]">盒子1</div>
  <!-- 如果想在数组中有条件地渲染某个 class,可以使用三元表达式 -->
  <div :class="[class1, isClass2 ? class2 : '']">盒子2</div>
  <button @click="isClass2 = !isClass2">修改盒子2样式</button>
  <!-- 可以在数组中嵌套对象 -->
  <div :class="[{ class3: true }, class4]">盒子3</div>
</template>

<script setup>
import { ref } from "vue";
const class1 = ref("class1");
const class2 = ref("class2");
const isClass2 = ref(true);
const class4 = ref("class4");
</script>

<style scoped>
.class1 {
  background-color: pink;
}

.class2 {
  color: aquamarine;
}

.class3 {
  background-color: orange;
}

.class4 {
  color: red;
}
</style>
```

@tab HTML

```html
<head>
  <style>
    .class1 {
      background-color: pink;
    }
    .class2 {
      color: aquamarine;
    }
    .class3 {
      background-color: orange;
    }
    .class4 {
      color: red;
    }
  </style>
</head>

<body>
  <div id="app">
    <!-- 给 :class 传递一个数组 -->
    <div :class="[class1, class2]">盒子1</div>
    <!-- 如果想在数组中有条件地渲染某个 class,可以使用三元表达式 -->
    <div :class="[class1, isClass2 ? class2 : '']">盒子2</div>
    <button @click="isClass2 = !isClass2">修改盒子2样式</button>
    <!-- 可以在数组中嵌套对象 -->
    <div :class="[{ class3: true },class4]">盒子3</div>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
      computed,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const class1 = ref("class1");
        const class2 = ref("class2");
        const isClass2 = ref(true);
        const class4 = ref("class4");
        return {
          class1,
          class2,
          isClass2,
          class4,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## style 绑定

### 绑定对象

我们可以传给 `v-bind:style` (简写为 `:style`) 一个对象

:::tabs

@tab 单文件组件

```vue
<template>
  <!-- 给 :style 传递一个对象 -->
  <div :style="{ color: color1, fontSize: '20px' }">盒子1</div>
  <!-- 也可以直接绑定一个对象 -->
  <div :style="styleObj">盒子2</div>
  <!-- 可以绑定一个返回对象的计算属性 -->
  <div :style="styleObj1">盒子3</div>
</template>

<script setup>
import { ref, computed } from "vue";
const color1 = ref("red");
const styleObj = ref({
  color: "pink",
  fontSize: "30px",
});
const styleObj1 = computed(() => ({
  color: "blue",
  fontSize: "40px",
}));
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <!-- 给 :style 传递一个对象 -->
    <div :style="{ color: color1 , fontSize: '20px'}">盒子1</div>
    <!-- 也可以直接绑定一个对象 -->
    <div :style="styleObj">盒子2</div>
    <!-- 可以绑定一个返回对象的计算属性 -->
    <div :style="styleObj1">盒子3</div>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
      computed,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const color1 = ref("red");
        const styleObj = ref({
          color: "pink",
          fontSize: "30px",
        });
        const styleObj1 = computed(() => ({
          color: "blue",
          fontSize: "40px",
        }));
        return {
          color1,
          styleObj,
          styleObj1,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

### 绑定数组

可以把一个样式对象数组传给 `v-bind:style` (简写为 `:style`)，以应用多个样式对象

:::tabs

@tab 单文件组件

```vue
<template>
  <!-- 给 :style 传递一个数组 -->
  <div :style="[styleObj, styleObj1]">盒子1</div>
</template>

<script setup>
import { ref, computed } from "vue";
const styleObj = ref({
  color: "pink",
  fontSize: "30px",
});
const styleObj1 = computed(() => ({
  backgroundColor: "blue",
  width: "100px",
}));
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <!-- 给 :style 传递一个数组 -->
    <div :style="[styleObj,styleObj1]">盒子1</div>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
      computed,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const styleObj = ref({
          color: "pink",
          fontSize: "30px",
        });
        const styleObj1 = computed(() => ({
          backgroundColor: "blue",
          width: "100px",
        }));
        return {
          styleObj,
          styleObj1,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

### 自动添加前缀

当 `:style` 使用需要添加浏览器引擎前缀的 CSS 属性时，Vue 会自动侦测并添加相应的前缀

### 样式多值

可以为 `:style` 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值

:::tabs

@tab 单文件组件

```vue
<template>
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">盒子</div>
</template>
```

@tab HTML

```html
<div id="app">
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">盒子</div>
</div>
```

:::
数组仅会渲染浏览器支持的最后一个值

## 组件中使用

详见：透传 Attributes
