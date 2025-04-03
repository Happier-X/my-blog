---
cover: https://t.alcy.cc/fj?t=20250403090000
order: 3
date: 2025-04-03 09:00:00
category: 开发
tag: Electron
excerpt: false
---

# Electron 隔离进程

## 上下文隔离

上下文隔离是从安全角度考量的，即不允许 `webcontent` 网页使用 Electron 内部组件与 Node 等权限。默认情况下 Electron 是开启上下文隔离的。因为使用 Electron 开发的桌面应用是比较特殊的。它是使用网页开发的，所以会引用第三方的应用，如果不进行隔离，这些应用是有机会调用 Node.js API 的，如果应用是恶意的，就会对用户电脑带来安全隐患。使用上下文隔离对团队开发好处也是明显的，可以让熟悉 Vue、React 的前端工程师专门编写前端页面逻辑，让熟悉 Node.js 与 Electron 的开发者负责 Node.js 程序编写。

禁用上下文隔离后，网页脚本可以使用 Electron 和 Node.js 的部分高级 API。通过设置 `contextIsolation: false` 来禁用上下文隔离。

```javascript {12} title="main.js"
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      contextIsolation: false, // 关闭上下文隔离
    },
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
});
```

禁用上下文隔离后，preload.js 与 renderer.js 没有隔离，preload.js 中的变量可以直接在 renderer.js 中使用。

```javascript title="preload.js"
window.test = "hello world"; // 定义变量
```

```javascript title="renderer.js"
console.log(window.test); // hello world
```

禁用上下文隔离后，在 preload.js 中就不需要使用 `contextBridge` 来向 renderer.js 暴露 API 了。

可以通过修改 main.js 中的 `nodeIntegration` 来控制是否允许 Node.js 集成。开启 Node.js 集成后，preload.js 和 renderer.js 中就可以直接使用 Node.js 的高级 API 了。

preload.js 默认只能使用有限的 Node.js API，不能使用 `fs` 等 API，但开启了 `nodeIntegration` 后就可以使用了。

如果想在 renderer.js 中使用 Node.js 高级 API，需要在 main.js 中设置 `contextIsolation: false` 和 `nodeIntegration: true`。

## 进程沙盒

<!-- 当 Electron 中的渲染进程被沙盒化时，它们的行为与常规 Chrome 渲染器一样。一个沙盒化的渲染器不会有 Node.js 环境。在沙盒中，渲染进程只能通过进程间通讯 (inter-process communication，IPC) 委派任务给主进程的方式来执行需权限的任务 (例如：文件系统交互，对系统进行更改或生成子进程)。如果我们想在 preload.js 中使用 Node.js 与 Electron 高级应用，如 `shell`、`fs` 等，可以通过关闭沙盒完成。当然通过开启 `nodeIntegration` 也可以实现该功能，但这会让 renderer.js 也可以使用 Node.js 高级 api，这是不安全的。所以，开启沙盒，可以赋予 preload.js 高级权限，但不影响 renderer.js。

+ Electron 默认是开启沙盒模式的。
+ `nodeIntegration:true` 时会自动开启沙盒。
+ `sandbox: false` 时 preload.js 可以使用 Node.js、Electron 的高级 API，如 `fs` 模块。 -->