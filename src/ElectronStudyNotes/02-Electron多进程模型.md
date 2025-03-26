---
cover: https://t.alcy.cc/fj?t=20250326133000
order: 2
date: 2025-03-26 13:30:00
category: 开发
tag: Electron
excerpt: false
---

# Electron 多进程模型

## 多进程模型

### 主进程

每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。主进程在 `Node.js` 环境中运行，这意味着它具有使用 `Node.js` API 的能力。

主进程的主要目的是使用 `BrowserWindow` 模块创建和管理应用程序窗口。

### 渲染进程

每个 Electron 应用都会为使用 `BrowserWindow` 打开的窗口生成一个单独的渲染进程。

默认情况下渲染进程与主进程使用 `preload.js` 预加载脚本做为通信桥梁。

### 预加载脚本

预加载脚本包含了那些执行于渲染进程中，且先于网页内容开始加载的代码。这些脚本虽运行于渲染器的环境中，却能访问有限的 `Node.js`、`Electron 高级权限`。

因为 Electron 项目与其他桌面应用是有区别的，它具有浏览器的特性，所以开放主进程的 `Node.js` 给渲染进程是有安全隐患的。默认情况下，Electron 是不会开放高级权限给渲染进程的，而是要求开发者自行决定渲染进程可以使用哪些主进程任务，这块功能就要在预加载脚本中完成。

例如，我们使用预加载脚本通过 `Node.js` 来获取软件版本信息。

```JavaScript {10-12} title="main.js"
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
});
```

```JavaScript title="preload.js"
document.addEventListener("DOMContentLoaded", () => {
  for (const soft of ["chrome", "electron", "node"]) {
    console.log(soft);
    document.querySelector(`#${soft}`).innerHTML =
      `${soft}:` + process.versions[soft];
  }
});
```

```JavaScript title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
  </head>
  <body>
    <div id="chrome"></div>
    <div id="node"></div>
    <div id="electron"></div>
    <script src="renderer.js"></script>
  </body>
</html>
```

## 进程通信

### 渲染进程到主进程（单向）

这里实现从渲染进程向主进程发送请求，更改窗口标题。

```JavaScript {14-22} title="main.js"
const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
};
app.whenReady().then(() => {
  // 主进程事件监听
  ipcMain.on("setTitle", (event, title) => {
    // 获取当前窗口对象
    const webContents = event.sender;
    // 获取窗口对象
    const win = BrowserWindow.fromWebContents(webContents);
    // 设置窗口标题
    win.setTitle(title);
  });
  createWindow();
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
  app.on("activate", () => {
    createWindow();
  });
});
```

```JavaScript title="preload.js"
const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("setTitle", title),
});
```

```Html {10,11} title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    标题:<input id="title" type="text" placeholder="请输入标题" />
    <button id="btn">提交</button>
    <script src="./render.js"></script>
</body>
</html>
```

```JavaScript title="render.js"
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#btn");
  btn.addEventListener("click", () => {
    const value = document.querySelector("#title").value;
    // 使用 preload.js 中的 API 触发主进程事件
    window.electronAPI.setTitle(value);
  });
});
```
