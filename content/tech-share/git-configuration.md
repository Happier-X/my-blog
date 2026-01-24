---
title: Git 配置指南
createAt: 2024-03-05
updateAt: 2024-03-05
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
