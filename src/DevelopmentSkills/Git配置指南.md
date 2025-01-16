---
cover: https://t.alcy.cc/fj?t=1709596800
date: 2024-03-05 08:00:00
category: 开发
tag: Git
excerpt: false
---

# Git 配置指南

## 查看配置信息

```sh
git config --list
```

## 配置用户信息

```sh
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

## 配置代理

### 设置全局代理

```sh
git config --global http.proxy http://127.0.0.1:7890
```

```sh
git config --global https.proxy https://127.0.0.1:7890
```

### 取消设置全局代理

```sh
git config --global --unset http.proxy
```

```sh
git config --global --unset https.proxy
```

### 设置对 GitHub 代理

```sh
git config --global http.https://github.com.proxy http://127.0.0.1:7890
```

```sh
git config --global https.https://github.com.proxy https://127.0.0.1:7890
```

### 取消设置对 GitHub 代理

```sh
git config --global --unset http.https://github.com.proxy
```

```sh
git config --global --unset https.https://github.com.proxy
```
