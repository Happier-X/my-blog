---
title: 软件工具-Git 配置指南
cover: https://t.alcy.cc/fj?t=1709596800
order: 2
date: 2024-03-05 08:00
category: 软件工具
tag: Git
excerpt: false
---

## 查看配置信息

```bash
git config --list
```

## 配置用户信息

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

## 配置代理

### 设置全局代理

```bash
git config --global http.proxy http://127.0.0.1:7890
```

```bash
git config --global https.proxy https://127.0.0.1:7890
```

### 取消设置全局代理

```bash
git config --global --unset http.proxy
```

```bash
git config --global --unset https.proxy
```

### 设置对 GitHub 代理

```bash
git config --global http.https://github.com.proxy http://127.0.0.1:7890
```

```bash
git config --global https.https://github.com.proxy https://127.0.0.1:7890
```

### 取消设置对 GitHub 代理

```bash
git config --global --unset http.https://github.com.proxy
```

```bash
git config --global --unset https.https://github.com.proxy
```
