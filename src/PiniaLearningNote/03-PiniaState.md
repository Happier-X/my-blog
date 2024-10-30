---
title: Pinia State
cover: https://t.alcy.cc/fj?t=1730266200000
order: 3
date: 2024-10-30 13:30
category: 软件开发
tag: 
    - Vue
    - Pinia
excerpt: false
---

## 定义 State

```JavaScript
// src/stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    // 定义状态（state）
    const count = ref(0)
    // 返回状态
    return { count }
})
```


## 访问 State

可以通过 `Store` 实例访问 `State`，直接对其进行读写。

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
const count = counterStore.count
counterStore.count++
</script>
```