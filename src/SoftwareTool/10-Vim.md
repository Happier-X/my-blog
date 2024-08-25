---
title: Vim
cover: https://t.alcy.cc/fj?t=1724590800
order: 10
date: 2024-08-25 21:00
category: 软件工具
tag: 
    - Vim
    - VSCode
    - Edge
excerpt: false
---

## 在 VSCode 中使用 Vim

安装 `vim` 插件即可在 VSCode 中使用 Vim

## Vim 基础操作

### 模式

默认为正常模式

- `i` 正常模式 -> 插入模式（在光标前插入）
- `a` 正常模式 -> 插入模式（在光标后插入）
- `Esc` 或 `ctrl + [` 插入模式 -> 正常模式

> 在终端中退出插入模式：
> - `:wq` 保存并退出
> - `:q!` 强制退出

> 在 VSCode 中可以将插入模式 -> 正常模式修改为 `j + j`，通过在配置文件中添加：
> ```json
> "vim.insertModeKeyBindings": [
>     {
>         "before": [
>             "j",
>             "j"
>         ],
>         "after": [
>             "<Esc>"
>         ]
>     }
> ]
> ```

### 光标移动

- `h` 左移
- `j` 下移
- `k` 上移
- `l` 右移
