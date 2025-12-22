---
cover: https://t.alcy.cc/fj?t=20250226143000
order: 18
date: 2025-02-26 14:30:00
category: 开发
tag:
  - Vue
  - Vue Router
excerpt: false
---

# Vue Router RouterView 插槽

RouterView 组件暴露了一个插槽，可以用来渲染路由组件。

```vue
<RouterView v-slot="{ Component }">
    <component :is="Component" />
</RouterView>
```

这等同于不带插槽的 `<RouterView />`。

## 配合 KeepAlive 和 Transition 组件使用

```vue
<RouterView v-slot="{ Component }">
    <KeepAlive>
        <component :is="Component" />
    </KeepAlive>
</RouterView>
```

```vue
<RouterView v-slot="{ Component }">
    <Transition>
        <component :is="Component" />
    </Transition>
</RouterView>
```

```vue
<RouterView v-slot="{ Component }">
    <Transition>
        <KeepAlive>
            <component :is="Component" />
        </KeepAlive>
    </Transition>
</RouterView>
```

## 模板引用

使用插槽可以直接将模板引用放置到路由组件上。

```vue
<RouterView v-slot="{ Component }">
    <component :is="Component" ref="routerViewRef" />
</RouterView>
```
