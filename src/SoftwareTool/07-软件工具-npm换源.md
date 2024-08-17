---
title: 软件工具-npm 换源
cover: https://t.alcy.cc/fj?t=1723905000
order: 7
date: 2024-08-17 22:30
category: 软件开发
tag: npm
excerpt: false
---

## 查看当前镜像源

```bash
npm get registry
```

## 更换淘宝镜像源

```bash
npm config set registry https://registry.npmmirror.com/
```

## 切换回官方镜像源

```bash
npm config set registry https://registry.npmjs.org/
```
