---
cover: https://t.alcy.cc/fj?t=1730448000000
order: 32
date: 2024-11-01 16:00:00
category: 开发
tag: Vue
excerpt: false
---

# Vue 组合式 API

## setup()

`setup()` 函数是组合式 API 的入口函数。

### 基本使用

```vue
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    // 返回值会暴露给模板和组件实例
    return {
      count,
    };
  },

  mounted() {
    console.log(this.count); // 0
  },
};
</script>
```

### 访问 props

`setup()` 函数的第一个参数是组件的 `props`。

解构 `props` 时，解构出的变量将会丢失响应性。

```JavaScript
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

### 访问上下文对象

`setup()` 函数的第二个参数是组件的上下文对象。

```JavaScript
export default {
  setup(props, context) {
    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(context.attrs)

    // 插槽（非响应式的对象，等价于 $slots）
    console.log(context.slots)

    // 触发事件（函数，等价于 $emit）
    console.log(context.emit)

    // 暴露公共属性（函数）
    // expose 函数用于显式地限制该组件暴露出的属性，当父组件通过模板引用访问该组件的实例时，将仅能访问 expose 函数暴露出的内容
    console.log(context.expose)
  }
}
```

上下文对象是非响应式的，可以安全地解构。

```JavaScript
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

### 与渲染函数一起使用

`setup()` 也可以返回一个渲染函数，此时在渲染函数中可以直接使用在同一作用域下声明的响应式状态。

```JavaScript
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

返回一个渲染函数将会阻止我们返回其他东西。如果我们想通过模板引用将这个组件的方法暴露给父组件，我们可以使用 `expose` 函数。

```JavaScript
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

## 核心 API

### ref()

`ref()` 函数用于将普通 JavaScript 值转换为一个响应式对象。

```JavaScript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

### computed()

`computed()` 函数用于创建一个计算属性。

```JavaScript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
console.log(doubleCount.value) // 0
```

### reactive()

`reactive()` 函数用于将普通对象转换为响应式对象。

```JavaScript
import { reactive } from 'vue'

const state = reactive({
  count: 0
})
console.log(state.count) // 0
state.count++
console.log(state.count) // 1
```

### readonly()

`readonly()` 函数接受一个对象 (不论是响应式还是普通的) 或是一个 `ref`，返回一个原值的只读代理。

```JavaScript
import { ref, reactive, readonly } from 'vue'

const state = reactive({
  count: 0
})
const readonlyState = readonly(state)
readonlyState.count++ // error
const count = ref(0)
const readonlyCount = readonly(count)
readonlyCount.value++ // error
```

### watchEffect()

`watchEffect()` 函数用于创建一个副作用函数，该函数会在其依赖项发生变化时自动重新运行。

```JavaScript
import { ref, watchEffect } from "vue"

const count = ref(0)
watchEffect(() => {
  console.log("Current count:", count.value)
})
count.value++ // 触发副作用函数，输出 "Current count: 1"
```

### watchPostEffect()

`watchEffect()` 使用 `flush: 'post'` 选项时的别名。

### watchSyncEffect()

`watchEffect()` 使用 `flush: 'sync'` 选项时的别名。

### watch()

`watch()` 函数用于创建一个侦听器，该侦听器会在其依赖项发生变化时自动重新运行。

```JavaScript
import { ref, watch } from "vue"

const count = ref(0)
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})
count.value++ // 触发侦听器，输出 "count changed from 0 to 1"
```

### onWatcherCleanup()

`onWatcherCleanup()` 函数用于在侦听器被清理时执行回调函数。

```JavaScript
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const { response, cancel } = doAsyncWork(newId)
  // 如果 `id` 变化，则调用 `cancel`，
  // 如果之前的请求未完成，则取消该请求
  onWatcherCleanup(cancel)
})
```

## 工具函数

### isRef()

`isRef()` 函数用于判断一个值是否为 `ref` 创建的响应式引用对象。

```JavaScript
import { ref, isRef } from 'vue'

const count = ref(0)
console.log(isRef(count)) // true
```

### unref()

如果参数是 `ref`，则返回内部值，否则返回参数本身。

```JavaScript
import { ref, unref } from 'vue'

const count = ref(0)
console.log(unref(count)) // 0
const count1 = 1
console.log(unref(count1)) // 1
```

### toRef()

`toRef()` 函数用于将响应式对象的属性转换为 `ref`。

也可以将值、`refs` 或 `getters` 规范化为 `refs`。

```JavaScript
import { reactive, toRef } from 'vue'

const state = reactive({
  count: 0
})
const countRef = toRef(state, 'count')
console.log(countRef.value) // 0
countRef.value++
console.log(state.count) // 1
```

```JavaScript
// 按原样返回现有的 ref
toRef(existingRef)
// 创建一个只读的 ref，当访问 .value 时会调用此 getter 函数
toRef(() => props.foo)

// 从非函数的值中创建普通的 ref
// 等同于 ref(1)
toRef(1)
```

### toValue()

`toValue()` 函数用于将值、`refs` 或 `getters` 规范化为值。

```JavaScript
toValue(1) // 1
toValue(ref(1)) // 1
toValue(() => 1) // 1
toValue(reactive({ foo: 1 }).foo) // 1
```

### toRefs()

`toRefs()` 函数用于将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 `ref`。

```JavaScript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'John'
})
const { count, name } = toRefs(state)
console.log(count.value) // 0
console.log(name.value) // 'John'
```

### isProxy()

检查一个对象是否是由 `reactive()`、`readonly()`、`shallowReactive()` 或 `shallowReadonly()` 创建的代理。

```JavaScript
import { isProxy } from 'vue'

const state = reactive({ count: 0 })
console.log(isProxy(state)) // true
```

### isReactive()

检查一个对象是否是由 `reactive()` 或 `shallowReactive()` 创建的代理。

```JavaScript
import { reactive, isReactive } from 'vue'

const state = reactive({ count: 0 })
console.log(isReactive(state)) // true
```

### isReadonly()

检查一个对象是否是由 `readonly()` 或 `shallowReadonly()` 创建的只读代理。

```JavaScript
import { readonly, isReadonly } from 'vue'

const state = readonly({ count: 0 })
console.log(isReadonly(state)) // true
```

## 进阶 API

### shallowRef()

`ref()` 的浅层作用形式。

```JavaScript
import { shallowRef } from 'vue'

const state = shallowRef({ count: 1 })
// 不会触发更改
state.value.count = 2
// 会触发更改
state.value = { count: 2 }
```

### triggerRef()

强制触发依赖于一个浅层 `ref` 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

```JavaScript
import { shallowRef, triggerRef } from 'vue'

const shallow = shallowRef({
  greet: 'Hello, world'
})

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 打印 "Hello, universe"
triggerRef(shallow)
```

### customRef()

创建一个自定义的 `ref`，显式声明对其依赖追踪和更新触发的控制方式。

```JavaScript
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track() // 追踪依赖
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger() // 触发更新
        }, delay)
      }
    }
  })
}
```

```vue
<template>
  <input v-model="text" />
</template>

<script setup>
import { useDebouncedRef } from "./debouncedRef";
const text = useDebouncedRef("hello");
</script>
```

### shallowReactive()

`reactive()` 的浅层作用形式。

```JavaScript
import { shallowReactive, isReactive } from 'vue'

const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})
// 更改状态自身的属性是响应式的
state.foo++
// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested) // false
// 不是响应式的
state.nested.bar++
```

### shallowReadonly()

`readonly()` 的浅层作用形式。

```JavaScript
import { shallowReadonly, isReadonly } from 'vue'

const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})
// 更改状态自身的属性会失败
state.foo++
// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false
// 这是可以通过的
state.nested.bar++
```

### toRaw()

根据一个 Vue 创建的代理返回其原始对象。

```JavaScript
import { reactive, toRaw } from 'vue'

const foo = {}
const reactiveFoo = reactive(foo)
console.log(toRaw(reactiveFoo) === foo) // true
```

### markRaw()

将一个对象标记为不可被转为代理。返回该对象本身。

```JavaScript
import { markRaw, isReactive} from 'vue'

const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false
// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

### effectScope()

创建一个 `effect` 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。

```JavaScript
import { effectScope, computed, watch, watchEffect } from 'vue'
const scope = effectScope()
scope.run(() => {
  const doubled = computed(() => counter.value * 2)
  watch(doubled, () => console.log(doubled.value))
  watchEffect(() => console.log('Count: ', doubled.value))
})
// 处理掉当前作用域内的所有 effect
scope.stop()
```

### getCurrentScope()

返回当前活跃的 `effectScope` 实例，若当前没有活跃的 `effectScope` 则返回 `null`。

```JavaScript
import { effectScope, getCurrentScope } from 'vue'

const scope = effectScope()
console.log(getCurrentScope() === scope) // true
scope.run(() => {
  console.log(getCurrentScope() === scope) // true
})
scope.stop()
console.log(getCurrentScope()) // null
```

### onScopeDispose()

在当前活跃的 `effect` 作用域上注册一个处理回调函数。当相关的 `effect` 作用域停止时会调用这个回调函数。

```JavaScript
import { effectScope, onScopeDispose } from "vue"

const scope = effectScope()
onScopeDispose(() => {
  console.log("作用域已销毁")
})
scope.run(() => {
  // 执行作用域函数
})
scope.stop() // 停止作用域，并触发销毁回调
```

## 生命周期钩子

`onBeforeMount()`：在组件挂载到 DOM 之前执行。

`onMounted()`：在组件挂载到 DOM 并完成首次渲染后执行，此时可以访问 DOM 元素，通常在此发送网络请求。

`onBeforeUpdate()`：在组件更新之前执行。

`onUpdated()`：在组件更新并重新渲染后执行。

`onBeforeUnmount()`：在组件从 DOM 中销毁之前执行。

`onUnmounted()`：在组件从 DOM 中移除并销毁之后执行。

`onErrorCaptured()`：在组件捕获到错误时执行。

`onRenderTracked()`：在组件渲染过程中追踪到响应式依赖时执行。

`onRenderTriggered()`：在组件渲染过程中触发响应式依赖时执行。

`onActivated()`：在 `KeepAlive` 组件激活时执行。

`onDeactivated()`：在 `KeepAlive` 组件停用时执行。

`onServerPrefetch()`：在服务器端渲染期间执行，用于在渲染之前执行异步操作。

## 依赖注入

`provide()`：在当前组件中提供数据，供后代组件使用。

`inject()`：在后代组件中注入数据，使用 `provide()` 提供的数据。

`hasInjectionContext()`：检查当前组件是否具有注入的上下文。

## 辅助 API

### useAttrs()

返回组件的 `attrs` 对象。

### useSlots()

返回组件的 `slots` 对象。

### useModel()

这是驱动 `defineModel()` 的底层辅助函数。如果使用 `<script setup>`，应当优先使用 `defineModel()`。

### useTemplateRef()

返回一个模板引用。

### useId()

用于为无障碍属性或表单元素生成每个应用内唯一的 ID。

```vue
<template>
  <form>
    <label :for="id">Name:</label>
    <input :id="id" type="text" />
  </form>
</template>
<script setup>
import { useId } from "vue";

const id = useId();
</script>
```
