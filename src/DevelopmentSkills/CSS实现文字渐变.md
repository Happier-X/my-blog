---
cover: https://t.alcy.cc/fj?t=1709690400
date: 2024-03-06 10:00:00
order: -20240306100000
category: 开发
tag: CSS
excerpt: false
---

# CSS 实现文字渐变

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
