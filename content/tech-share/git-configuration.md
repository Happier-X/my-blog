---
title: Git 配置指南
createAt: 2024-03-05
description: 文章介绍了如何在Git中绑定用户名和邮箱，以及如何设置大小写敏感性。提供的命令简明易懂。
readingTime: 1
seo:
  description: 文章介绍了如何在Git中绑定用户名和邮箱，以及如何设置大小写敏感性。提供的命令简明易懂。
  title: Git Configuration
updateAt: 2024-03-05
wordCount: 62
---

## 绑定用户名和邮箱

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

## 设置大小写敏感

默认情况下是对大小写不敏感的，通过以下命令可以设置大小写敏感。

- 获取大小写忽略状态
  ```bash
  git config core.ignorecase
  ```
- 设置大小写敏感为false
  ```bash
  git config core.ignorecase false
  ```
