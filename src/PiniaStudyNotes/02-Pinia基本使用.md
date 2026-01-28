---
title: Pinia 基本使用
cover: https://t.alcy.cc/fj?t=1730257200000
order: 2
date: 2024-10-30 11:00:00
category: 开发
tag:
  - Vue
  - Pinia
excerpt: false
---

## 定义 Store

`Store` 是用 `defineStore()` 定义的，它的第一个参数要求是一个独一无二的字符串，作为 `Store` 的 `id`，第二个参数是 `Setup 函数` 或 `Option 对象` (这里以 `Setup 函数` 为例)，用于配置 `Store`。

```JavaScript
// src/stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 可以任意命名 defineStore() 的返回值，但最好使用 use 前缀，使用 Store 结尾
// 第一个参数是 Store 的 id，它要求是唯一的，第二个参数是 Setup 函数
export const useCounterStore = defineStore('counter', () => {
    // 定义状态（State）
    const count = ref(0)
    // 定义计算属性（Getters）
    const doubleCount = computed(() => count.value * 2)
    // 定义方法（Actions）
    const increment = () => {
        count.value++
    }

    // 也可以依赖于全局提供的属性
    const route = useRoute()
    const router = useRouter()
    const appProvided = inject('appProvided')

    // 返回状态、计算属性和方法
    return { count, doubleCount, increment }
})
```

## 使用 Store

```vue
<script setup>
// 导入定义的 Store
import { useCounterStore } from "@/stores/counter";
// 获取 Store
const counterStore = useCounterStore();
// 从 Store 中获取状态、计算属性和方法
const count = counterStore.count;
const doubleCount = counterStore.doubleCount;
const increment = counterStore.increment;
</script>
```

如果直接解构 `Store` 中的状态和计算属性，会丢失响应式，所以需要使用 `storeToRefs()` 函数。

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
// 使用 `storeToRefs()` 函数解构状态和计算属性
const { count, doubleCount } = storeToRefs(counterStore);
// 方法可以直接解构
const { increment } = counterStore;
</script>
```

> 建议不使用解构赋值的方式，带上 `Store` 代码可读性也会更好一点。
