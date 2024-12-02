---
cover: https://t.alcy.cc/fj?t=1730791800000
order: 1
date: 2024-11-05 15:30
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 开发环境搭建

## 下载安装 Node.js

在 [Node.js 官网](https://nodejs.org/)下载安装包，安装完成后，打开命令行工具，输入以下命令，如果出现版本号，则说明安装成功。

```sh
node -v
```

## 方式一

### 下载安装 TypeScript

在命令行工具中，输入以下命令，全局安装 TypeScript。

```sh
npm install -g typescript
```

### 编译 TypeScript 文件

在命令行工具中，进入 TypeScript 文件所在的目录，输入以下命令，将 TypeScript 文件编译为 JavaScript 文件。

```sh
tsc xxx.ts
```

其中，`xxx.ts` 是 TypeScript 文件的文件名。编译完成后，会在当前目录下生成一个同名的 JavaScript 文件。

## 方式二

使用 esno 这个工具。

```sh
npx esno xxx.ts
```