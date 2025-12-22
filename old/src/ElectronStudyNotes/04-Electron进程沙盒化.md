---
cover: https://t.alcy.cc/fj?t=20250407090000
order: 4
date: 2025-04-07 09:00:00
category: 开发
tag: Electron
excerpt: false
---

# Electron 进程沙盒化

## Electron 中的沙盒行为

Electron 默认是开启沙盒的。

### 渲染进程沙盒化

当 Electron 中的渲染进程被沙盒化时，它们的行为与常规 Chrome 渲染器一样。一个沙盒化的渲染器不会有 Node.js 环境。在沙盒中，渲染进程只能通过进程间通讯 (inter-process communication，IPC) 委派任务给主进程的方式来执行需权限的任务 (例如：文件系统交互，对系统进行更改或生成子进程)。

### 预加载脚本沙盒化

为了让渲染进程能与主进程通信，附属于沙盒化的渲染进程的预加载脚本中仍可使用一部分以 Polyfill 形式实现的 Node.js API。

## 配置沙盒

对于大多数应用程序来说，沙盒是最佳选择。在某些与沙盒不兼容的使用情况下 (例如，在渲染器中使用原生的 Node.js 模块时)，可以禁用特定进程的沙盒。但这会带来安全风险，特别是当未受信任的代码或内容存在于未沙盒化的进程中时。

### 为单个进程禁用沙盒

在创建 BrowserWindow 时，可以通过将 `sandbox` 选项设置为 `false` 来禁用沙盒。

```javascript {4} title="main.js"
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: false,
    },
  });
  win.loadURL("https://baidu.com");
});
```

在渲染器中启用 nodeIntegration 时，沙盒也会被禁用。可以通过在 BrowserWindow 构造函数中添加 nodeIntegration：true 标志的来实现。

```javascript {4} title="main.js"
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL("https://baidu.com");
});
```

### 全局启用沙盒

可以使用 `app.enableSandbox()` 方法来全局启用沙盒，注意，该方法必须在 `app` 模块的 `ready` 事件之前调用。

```javascript {1} title="main.js"
app.enableSandbox();
app.whenReady().then(() => {
  // 因为调用了app.enableSandbox()，所以任何sandbox:false的调用都会被覆盖。
  const win = new BrowserWindow();
  win.loadURL("https://baidu.com");
});
```
