---
title: Vue 组合式函数
cover: https://t.alcy.cc/fj?t=1727771400
order: 24
date: 2024-10-01 16:30:00
category: 开发
tag: Vue
excerpt: false
---

组合式函数 (Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数

## 基本用法

:::tabs

@tab 单文件组件

```vue
<!-- App.vue -->
<template>
  <p>Mouse position is at: {{ x }}, {{ y }}</p>
</template>

<script setup>
import { useMouse } from "./composables/useMouse.js";
const { x, y } = useMouse();
</script>
```

```javascript
// useMouse.js
import { ref, onMounted, onUnmounted } from "vue";

export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }
  // 一个组合式函数也可以挂靠在所属组件的生命周期上，来启动和卸载副作用
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });
  // 通过返回值暴露所管理的状态
  return { x, y };
}
```

@tab HTML

```html
<body>
  <div id="app">
    <p>Mouse position is at: {{ x }}, {{ y }}</p>
  </div>
  <script type="module">
    import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    import { useMouse } from "./useMouse.js";
    createApp({
      setup() {
        const { x, y } = useMouse();
        return {
          x,
          y,
        };
      },
    }).mount("#app");
  </script>
</body>
```

```javascript
// useMouse.js
import {
  ref,
  onMounted,
  onUnmounted,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }
  // 一个组合式函数也可以挂靠在所属组件的生命周期上，来启动和卸载副作用
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });
  // 通过返回值暴露所管理的状态
  return { x, y };
}
```

:::

组合式函数也可以接收参数，当接收一个响应式状态时，推荐使用 `toValue()` 处理一下

```javascript
import { ref, watchEffect, toValue } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    data.value = null;
    error.value = null;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error };
}
```

## 命名规范

组合式函数约定使用驼峰命名法并且以 `use` 作为前缀
