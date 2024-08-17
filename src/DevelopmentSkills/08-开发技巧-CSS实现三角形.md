---
title: 开发技巧-CSS 实现三角形
cover: https://t.alcy.cc/fj?t=1714370400
order: 8
date: 2024-04-29 14:00
category: 软件开发
tag: CSS
excerpt: false
---

网页中常见一些三角形，使用 CSS 边框可以 直接画出来，不必做成图片或者字体图标

1. 盒子宽度高度为 0
2. 4 个边框都要写，只保留需要的边框颜色，其余的不能省略，都改为 transparent （透明）

::: normal-demo Demo 演示

```html
<div class="box1"></div>
<div class="box2"></div>
```

```css
.box1 {
	width: 0;
	height: 0;
	border-top: 10px solid pink;
	border-right: 10px solid red;
	border-bottom: 10px solid blue;
	border-left: 10px solid green;
}
.box2 {
	width: 0;
	height: 0;
	border: 50px solid transparent;
	border-top-color: pink;
	margin: 100px auto;
}
```

:::
