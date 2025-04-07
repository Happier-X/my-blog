---
cover: https://t.alcy.cc/fj?t=20250407090000
order: 4
date: 2025-04-07 09:00:00
category: 开发
tag: Electron
excerpt: false
---

# Electron 进程沙盒化

<!-- 当 Electron 中的渲染进程被沙盒化时，它们的行为与常规 Chrome 渲染器一样。一个沙盒化的渲染器不会有 Node.js 环境。在沙盒中，渲染进程只能通过进程间通讯 (inter-process communication，IPC) 委派任务给主进程的方式来执行需权限的任务 (例如：文件系统交互，对系统进行更改或生成子进程)。如果我们想在 preload.js 中使用 Node.js 与 Electron 高级应用，如 `shell`、`fs` 等，可以通过关闭沙盒完成。当然通过开启 `nodeIntegration` 也可以实现该功能，但这会让 renderer.js 也可以使用 Node.js 高级 api，这是不安全的。所以，开启沙盒，可以赋予 preload.js 高级权限，但不影响 renderer.js。

+ Electron 默认是开启沙盒模式的。
+ `nodeIntegration:true` 时会自动开启沙盒。
+ `sandbox: false` 时 preload.js 可以使用 Node.js、Electron 的高级 API，如 `fs` 模块。 -->