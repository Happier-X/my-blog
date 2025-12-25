---
title: VSCode 中禁止运行脚本问题
createAt: 2025-02-22
description: 文章介绍了在 VSCode 内置终端运行命令时遇到的“禁止运行脚本”的错误，并提供了解决方法：以管理员身份打开 PowerShell 并执行 `set-ExecutionPolicy RemoteSigned` 命令。
readingTime: 1
seo:
  description: 文章介绍了在 VSCode 内置终端运行命令时遇到的“禁止运行脚本”的错误，并提供了解决方法：以管理员身份打开 PowerShell 并执行 `set-ExecutionPolicy RemoteSigned` 命令。
  title: Vscdoe Prohibit Scripts Run
updateAt: 2025-02-22
wordCount: 54
---

## VSCode 中禁止运行脚本问题

在 VSCode 的内置终端中执行 `npm` 等命令时，可能会提示 `在此系统上禁止运行脚本` 的错误。

此时我们需要以管理员身份打开 `powershell`，执行如下命令即可。

```bash
set-ExecutionPolicy RemoteSigned
```
