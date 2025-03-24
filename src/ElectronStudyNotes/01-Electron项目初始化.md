---
cover: https://t.alcy.cc/fj?t=20250323210000
order: 1
date: 2025-03-23 21:00:00
category: 开发
tag: Electron
excerpt: false
---

# Electron 项目初始化

需要安装 `Node.js` 和 `npm`。

## 安装 Electron

初始化项目。

```sh
npm init -y
```

安装 Electron。

```sh
npm install electron -D
```

## 运行 Electron

在项目根目录下创建一个 `main.js` 文件，这是主进程文件。

```js
const { app, BrowserWindow } = require("electron");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
}

app.whenReady().then(() => {
  createWindow();
});
```

在 `package.json` 中修改 `main`，并添加运行的命令。

```json
{
  "main": "main.js",
  "scripts": {
    "dev": "electron ."
  }
}
```

然后在命令行中运行。

```sh
npm run dev
```

## 渲染进程

渲染进程负责渲染网页内容，可以用 HTML、CSS、JavaScript 编写。

在项目根目录下创建一个 `index.html` 文件。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

在 `main.js` 中渲染 `index.html`。

```js
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  // 也可以用 loadURL 方法加载链接
  // mainWindow.loadURL("http://www.baidu.com");
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
});
```

## 处理不同平台窗口行为的差异

Electron 提供了 `process.platform` 属性，可以判断当前运行的平台。

在 `main.js` 中可以根据平台做不同的处理，处理窗口行为的差异。

```javascript
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

## 无边框效果实现

在 `main.js` 中可以隐藏边框。

```javascript
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // 隐藏边框
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

隐藏边框后会无法拖动窗口。此时，可以在需要触发拖拽行为的元素上添加 `-webkit-app-region:drag;` 样式，即可恢复拖拽功能。

## 配合 Vite、Vue 使用

> 在开发中推荐使用成熟的脚手架，如 [Electron-Vite](https://cn.electron-vite.org/)。
> 这里只是简单介绍一下如何自己搭建一个 Electron + Vite 项目。

搭建 Vite 项目。

```sh
npm create vite@latest
```

根据提示选择 Vue 模板，并安装依赖。

在项目中安装 Electron。

```sh
npm install electron -D
```

安装 `concurrently` 来执行两个命令。

```sh
npm i -D concurrently
```

修改 `package.json` 中的 `scripts` 字段来执行两个命令。

```json
"scripts": {
  "dev": "concurrently \"vite\" \"electron .\"",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  }
```

在 `package.json` 中添加 `main` 字段，这是主进程文件。

```json
"main": "main.js"
```

在项目根目录下创建一个 `main.js` 文件。

```javascript
import { BrowserWindow, app } from "electron";

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadURL("http://localhost:5175");
  // 真正使用时应根据环境变量使用 mainWindow.loadFile()
}

app.whenReady().then(() => {
  createWindow();
});
```

在控制台中运行 `npm run dev` 命令，即可启动 Electron 项目。