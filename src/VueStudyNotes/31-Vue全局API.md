---
cover: https://t.alcy.cc/fj?t=1728381600000
order: 31
date: 2024-10-08 18:00
category: 开发
tag: Vue
excerpt: false
---

# Vue 全局 API

全局 API 是一些全局性的方法或属性，可以在 Vue 应用程序中直接使用，而不需要通过组件实例来访问。

## 应用实例 API

### createApp()

创建一个应用实例。

第一个参数是根组件。第二个参数可选，它是要传递给根组件的 `props`。

```JavaScript
import { createApp } from 'vue'
import App from './App.vue'

// 直接内联根组件
const app = createApp({...})
// 也可以使用从别处导入的组件
// const app = createApp(App)
```

### createSSRApp()

创建一个服务端渲染应用实例。用法与 `createApp()` 相同。

### app.mount()

将应用实例挂载在一个容器元素中。

参数可以是一个实际的 DOM 元素或一个 CSS 选择器 (使用第一个匹配到的元素)。返回根组件的实例。

```JavaScript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app') // 挂载应用程序到具有 id "app" 的 DOM 元素上
```

### app.unmount()

卸载应用实例。

```JavaScript
// 卸载应用程序
app.unmount()
```

### app.onUnmount()

注册一个在应用实例卸载时调用的回调函数。

```JavaScript
app.onUnmount(() => {
  console.log('应用已卸载')
})
```

### app.component()

注册一个全局组件。

```JavaScript
app.component('my-component', {
  // ...
})
```

### app.directive()

注册一个全局指令。

```JavaScript
app.directive('my-directive', {
  // ...
})
```

### app.use()

安装一个插件。

第一个参数应是插件本身，可选的第二个参数是要传递给插件的选项。

```JavaScript
app.use(plugin, options)
```

### app.provide()

提供一个值，可以在应用中的所有后代组件中注入使用。

```JavaScript
app.provide('key', value)
```

### app.runWithContext()

在指定上下文中运行一个函数。

```JavaScript
app.runWithContext(context, fn)
```

### app.version

提供当前应用所使用的 Vue 版本号。

```JavaScript
console.log(app.version) // 输出 Vue 的版本信息
```

### app.config

提供一些全局配置选项。可以在挂载应用前更改这些属性。

```JavaScript
console.log(app.config) // 输出应用程序的配置选项
```

### app.config.errorHandler

设置一个全局的错误处理器，用于处理未捕获的错误。

错误处理器接收三个参数：错误对象、触发该错误的组件实例和一个指出错误来源类型信息的字符串。

```JavaScript
app.config.errorHandler = (err, instance, info) => {
  console.error(err, instance, info)
}
```

### app.config.warnHandler

设置一个全局的警告处理器，用于处理警告。

警告处理器将接受警告信息作为其第一个参数，来源组件实例为第二个参数，以及组件追踪字符串作为第三个参数。

```JavaScript
app.config.warnHandler = (msg, instance, trace) => {
  console.warn(msg, instance, trace)
}
```

### app.config.performance

启用性能检测。

```JavaScript
app.config.performance = true
```

### app.config.compilerOptions

配置运行时模版编译的选项。

```JavaScript
app.config.compilerOptions = {
    // 配置模板编译选项
}
```

#### app.config.compilerOptions.isCustomElement

用于指定一个检查方法来识别原生自定义元素。

```JavaScript
// 将所有标签前缀为 `ion-` 的标签视为自定义元素
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ion-')
}
```

#### app.config.compilerOptions.whitespace

配置模板编译时的空白字符处理策略。默认值为 `'condense'`。

设置为 `'preserve'` 时，保留所有空白字符。

设置为 `'condense'` 时，删除所有多余的空白字符。

```JavaScript
app.config.compilerOptions.whitespace = 'preserve'
```

#### app.config.compilerOptions.delimiters

配置模板编译时的分隔符。默认值为 `['{{', '}}']`。

```JavaScript
// 分隔符改为 ES6 模板字符串样式
app.config.compilerOptions.delimiters = ['${', '}']
```

#### app.config.compilerOptions.comments

配置模板编译时的注释处理策略。默认值为 `false`。

设置为 `true` 时，保留所有注释。

```JavaScript
app.config.compilerOptions.comments = true
```

### app.config.globalProperties

设置全局属性，可以在应用中的所有组件实例中访问。

```JavaScript
app.config.globalProperties.$http = axios
```

### app.config.idPrefix

配置此应用中通过 `useId()` 生成的所有 ID 的前缀。

```JavaScript
app.config.idPrefix = 'my-app'
```

```JavaScript
// 在组件中使用 useId() 生成的 ID 将以 'my-app' 开头
const id1 = useId() // 'my-app:0'
const id2 = useId() // 'my-app:1'
```

### app.config.throwUnhandledErrorInProduction

强制在生产模式下抛出未处理的错误。

```JavaScript
app.config.throwUnhandledErrorInProduction = true
```

## 通用 API

### version

提供当前应用所使用的 Vue 版本号。

```JavaScript
import { version } from 'vue'

console.log(version)
```

### nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，可以获取更新后的 DOM。

```JavaScript
import { nextTick } from 'vue'

nextTick(() => {
  // DOM 已更新
})
```

### defineComponent

定义一个组件。

```JavaScript
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  // 组件选项
})
```

### defineAsyncComponent

定义一个异步组件。

```JavaScript
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() => {
  return import('./AsyncComponent.vue')
})
```
