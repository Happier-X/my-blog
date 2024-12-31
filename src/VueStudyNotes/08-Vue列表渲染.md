---
title: Vue 列表渲染
cover: https://t.alcy.cc/fj?t=1726239600
order: 8
date: 2024-09-13 23:00
category: 开发
tag: Vue
excerpt: false
---

## 基本用法

使用 `v-for` 指令可以将一个数组渲染成一个列表

语法为 `v-for="item in items"`，其中 `items` 是要遍历的数组，`item` 是迭代项的别名

可以通过提供第二个参数表示位置索引

可以使用 `of` 来替代 `in`

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <li v-for="(item, index) in array">{{ item }}-{{ index }}</li>
  </ul>
  <ul>
    <li v-for="(item, index) of array">{{ item }}-{{ index }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
const array = ref([1, 2, 3, 4, 5]);
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <li v-for="(item,index) in array">{{ item }}-{{ index }}</li>
    </ul>
    <ul>
      <li v-for="(item,index) of array">{{ item }}-{{ index }}</li>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const array = ref([1, 2, 3, 4, 5]);
        return {
          array,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 遍历对象

可以使用 `v-for` 来遍历一个对象的所有属性，遍历的顺序为该对象调用 `Object.values()` 的返回值来决定

可以通过提供第二个参数表示属性名，提供第三个参数表示位置索引

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <li v-for="(item, key, index) in object">
      {{ item }}-{{ key }}-{{ index }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
const object = ref({
  name: "张三",
  age: 18,
  hobby: "篮球",
});
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <li v-for="(item,key,index) in object">
        {{ item }}-{{ key }}-{{ index }}
      </li>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const object = ref({
          name: "张三",
          age: 18,
          hobby: "篮球",
        });
        return {
          object,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 遍历整数值

当遍历一个整数值时，该模板会基于 `1...n` 的取值范围重复多次

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <li v-for="item in 10">{{ item }}</li>
  </ul>
</template>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <li v-for="item in 10">{{ item }}</li>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        return {};
      },
    }).mount("#app");
  </script>
</body>
```

:::

注意此处 `n` 的初值是从 `1` 开始而非 `0`

## 在 template 上使用

在 `<template>` 标签上可以使用 `v-for` 来渲染一个包含多个元素的块

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <template v-for="item in items">
      <li>{{ item.msg }}</li>
      <li>{{ item.phone }}</li>
    </template>
  </ul>
</template>

<script setup>
import { ref } from "vue";
const items = ref([
  {
    msg: "hello",
    phone: "123456789",
  },
  {
    msg: "你好",
    phone: "987654321",
  },
]);
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <template v-for="item in items">
        <li>{{ item.msg }}</li>
        <li>{{ item.phone }}</li>
      </template>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const items = ref([
          {
            msg: "hello",
            phone: "123456789",
          },
          {
            msg: "你好",
            phone: "987654321",
          },
        ]);
        return {
          items,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## v-for 与 v-if

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高，此时 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名

下面代码会报错：

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <li v-for="todoItem in todo" v-if="!todoItem.done">{{ todoItem.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
const todo = ref([
  {
    name: "吃饭",
    done: true,
  },
  {
    name: "睡觉",
    done: false,
  },
]);
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <li v-for="todoItem in todo" v-if="!todoItem.done">
        {{ todoItem.name }}
      </li>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const todo = ref([
          {
            name: "吃饭",
            done: true,
          },
          {
            name: "睡觉",
            done: false,
          },
        ]);
        return {
          todo,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

可以先包装一层 `<template>`，在其上面使用 `v-for` 来解决：

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <template v-for="todoItem in todo">
      <li v-if="!todoItem.done">{{ todoItem.name }}</li>
    </template>
  </ul>
</template>

<script setup>
import { ref } from "vue";
const todo = ref([
  {
    name: "吃饭",
    done: true,
  },
  {
    name: "睡觉",
    done: false,
  },
]);
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <template v-for="todoItem in todo">
        <li v-if="!todoItem.done">{{ todoItem.name }}</li>
      </template>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const todo = ref([
          {
            name: "吃饭",
            done: true,
          },
          {
            name: "睡觉",
            done: false,
          },
        ]);
        return {
          todo,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 通过 key 管理状态

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用 “就地更新” 的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置上正确渲染

为了给 Vue 一个提示，以便它可以跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一的 `key` 属性

`key` 绑定的值期望是一个基础类型的值，例如字符串或 number 类，不要用对象作为 `key` 的值

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <li v-for="(item, index) in array" :key="id">{{ item.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
const array = ref([
  {
    name: "张三",
    age: 18,
    id: 1,
  },
  {
    name: "李四",
    age: 19,
    id: 2,
  },
  {
    name: "王五",
    age: 20,
    id: 3,
  },
]);
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <li v-for="(item,index) in array" :key="id">{{ item.name }}</li>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const array = ref([
          {
            name: "张三",
            age: 18,
            id: 1,
          },
          {
            name: "李四",
            age: 19,
            id: 2,
          },
          {
            name: "王五",
            age: 20,
            id: 3,
          },
        ]);
        return {
          array,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 显示过滤/排序结果

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际改变或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组

:::tabs

@tab 单文件组件

```vue
<template>
  <ul>
    <li v-for="item in filteredArray" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
const array = ref([
  {
    name: "张三",
    age: 18,
    id: 1,
  },
  {
    name: "李四",
    age: 19,
    id: 2,
  },
  {
    name: "王五",
    age: 20,
    id: 3,
  },
]);
const filteredArray = computed(() => {
  return array.value.filter((item) => item.age > 18);
});
</script>
```

@tab HTML

```html
<body>
  <div id="app">
    <ul>
      <li v-for="item in filteredArray" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
  <script type="module">
    import {
      createApp,
      ref,
      computed,
    } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    createApp({
      setup() {
        const array = ref([
          {
            name: "张三",
            age: 18,
            id: 1,
          },
          {
            name: "李四",
            age: 19,
            id: 2,
          },
          {
            name: "王五",
            age: 20,
            id: 3,
          },
        ]);
        const filteredArray = computed(() => {
          return array.value.filter((item) => item.age > 18);
        });
        return {
          array,
          filteredArray,
        };
      },
    }).mount("#app");
  </script>
</body>
```

:::

## 在组件上使用

可以用 `v-for` 指令来渲染一个组件，但是任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域，组件需要通过 `props` 接收外部传入的数据
