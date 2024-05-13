---
title: CSS 实现文字渐变
order: 1
date: 2024-03-06
category: 软件开发
tag: 
  - CSS
---

如果给文字直接设置渐变色会不生效：

```css
color: linear-gradient(to right, yellow, green);
```

我们可以使用以下方式实现：

```css
background: linear-gradient(to right, yellow, green); /*设置渐变*/
background-clip: text; /*将设置的背景颜色限制在文字中*/
-webkit-background-clip: text; /*将设置的背景颜色限制在文字中*/
-webkit-text-fill-color: transparent; /*将文字设置为透明*/
```

::: normal-demo 效果演示

```html
<div class="gradient-text">我是渐变色文字</div>
```

```css
.gradient-text {
  background: linear-gradient(to right, yellow, green);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

:::