---
cover: https://t.alcy.cc/fj?t=1730768400000
order: 34
date: 2024-11-05 09:00
category: 开发
tag: Vue
excerpt: false
---

# Vue 单文件组件

## 语法

一个 Vue 单文件组件 (SFC)，通常使用 `*.vue` 作为文件扩展名。

一个 Vue 单文件组件包含三个部分：

- `<template>`：定义组件的 HTML 结构。
- `<script>`：定义组件的逻辑。
- `<style>`：定义组件的 CSS 样式。

可以使用 `lang` 属性来指定脚本和样式所使用的语言。例如，`<script lang="ts">` 表示使用 TypeScript 编写脚本。

可以使用 `src` 属性来引用外部的文件。例如，`<script src="path/to/script.js"></script>` 表示引用一个外部的 JavaScript 文件。

## \<script setup\>

`<script setup>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。

### 基本语法

`<script setup>` 中的代码会在每次组件实例被创建的时候执行。

```vue
<script setup>
console.log("hello script setup");
</script>
```

任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用。

```vue
<template>
  <button @click="log">{{ msg }}</button>
  <div>{{ capitalize("hello") }}</div>
</template>

<script setup>
import { capitalize } from "./helpers";
// 变量
const msg = "Hello!";
// 函数
function log() {
  console.log(msg);
}
</script>
```

### 响应式状态

响应式状态需要明确使用响应式 API 来创建。和 `setup()` 函数的返回值一样，`ref` 在模板中使用的时候会自动解包。

```vue
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
</script>
```

### 使用组件

`<script setup>` 范围里的值也能被直接作为自定义组件的标签名使用。

```vue
<template>
  <MyComponent />
</template>

<script setup>
import MyComponent from "./MyComponent.vue";
</script>
```

在 `<script setup>` 中要使用动态组件的时候，应该使用动态的 `:is` 来绑定。

```vue
<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>

<script setup>
import Foo from "./Foo.vue";
import Bar from "./Bar.vue";
</script>
```

一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 `FooBar.vue` 的组件可以在其模板中用 `<FooBar/>` 引用它自己。如果有具名的导入和组件自身推导的名字冲突了，可以为导入的组件添加别名。

```JavaScript
import { FooBar as FooBarChild } from './components'
```

可以使用带 `.` 的组件标签，例如 `<Foo.Bar>` 来引用嵌套在对象属性中的组件。

```vue
<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>

<script setup>
import * as Form from "./form-components";
</script>
```

### 使用自定义指令

全局注册的自定义指令将正常工作。本地的自定义指令在 `<script setup>` 中不需要显式注册，但他们必须遵循 `vNameOfDirective` 这样的命名规范。

```vue
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>

<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
  },
};
</script>
```

如果指令是从别处导入的，可以通过重命名来使其符合命名规范。

```vue
<script setup>
import { myDirective as vMyDirective } from "./MyDirective.js";
</script>
```

### defineProps() 和 defineEmits()

`defineProps()` 和 `defineEmits()` 用于声明 `props` 和 `emits`。

### defineModel()

这个宏可以用来声明一个双向绑定 `prop`，通过父组件的 `v-model` 来使用。

### defineExpose()

可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性。

### defineOptions()

这个宏可以用来直接在 `<script setup>` 中声明组件选项，而不必使用单独的 `<script>` 块。

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: {
    /* ... */
  },
});
</script>
```

### defineSlots()

这个宏可以用于为 IDE 提供插槽名称和 `props` 类型检查的类型提示。

### useSlots() 和 useAttrs()

它们分别用于访问 `slots` 和 `attrs`。

### 限制

`<script setup>` 不能和 `src` attribute 一起使用。

`<script setup>` 不支持 DOM 内根组件模板。

## CSS 功能

### 组件作用域 CSS

当 `<style>` 标签带有 `scoped` attribute 的时候，它的 CSS 只会影响当前组件的元素。

处于 `scoped` 样式中的选择器如果想要做更 “深度” 的选择，也即：影响到子组件，可以使用 `:deep()` 这个伪类。

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 `:slotted` 伪类以明确地将插槽内容作为选择器的目标。

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

如果想让其中一个样式规则应用到全局，可以使用 `:global` 伪类来实现。

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

也可以在同一个组件中同时包含作用域样式和非作用域样式。

```vue
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>
```

### CSS Modules

一个 `<style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS class 作为 `$style` 对象暴露给组件。

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

得出的 class 将被哈希化以避免冲突，实现了同样的将 CSS 仅作用于当前组件的效果。

可以通过给 `module` attribute 一个值来自定义注入 class 对象的属性名。

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

可以通过 `useCssModule` API 在 `setup()` 和 `<script setup>` 中访问注入的 class。

```JavaScript
import { useCssModule } from 'vue'

// 在 setup() 作用域中...
// 默认情况下，返回 <style module> 的 class
useCssModule()

// 具名情况下，返回 <style module="classes"> 的 class
useCssModule('classes')
```

### CSS V-bind

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态。

```vue
<template>
  <p>hello</p>
</template>

<script setup>
import { ref } from "vue";
const theme = ref({
  color: "red",
});
</script>

<style scoped>
p {
  color: v-bind("theme.color");
}
</style>
```
