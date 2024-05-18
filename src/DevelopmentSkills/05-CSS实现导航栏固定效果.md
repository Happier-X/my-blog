---
title: CSS 实现导航栏固定效果
order: 5
date: 2024-04-29
category: 软件开发
tag: CSS
cover: /assets/images/CSS 实现导航栏固定效果.png
banner: /assets/images/CSS 实现导航栏固定效果.png
---

## 效果描述

当页面滚动时，导航栏固定在顶部。

## 实现方法

我们可以使用粘性定位来实现。

1. 将导航栏的`position`属性设置为`sticky`，并设置`top`属性将其固定在顶部。
2. 设置`z-index`属性以确保导航栏在页面其他元素之上显示。

## 效果展示

::: normal-demo 效果演示

```html
<div class="navbar">我是导航栏</div>
<div class="content">我是内容</div>
```

```css
.navbar{
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: pink;
  height:60px;
}
.content{
  background-color: skyblue;
  height: 1000px;
}
```

:::