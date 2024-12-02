---
cover: https://t.alcy.cc/fj?t=1733106600000
order: 1
date: 2024-12-02 10:30
category: 软件开发
tag: Nest
excerpt: false
---

# 初识 Nest

## Nest 基本概念

Nest 采用模块化设计，将功能拆分到不同的模块 (Module) 中，至少有一个根模块 (Root Module)，模块以树状结构组织。

一个有路由的模块会包含控制器 (Controller) 和服务 (Service)。控制器与服务通过模块进行关联，将服务注入 (Inject) 到控制器中使用，这样控制器用来处理 HTTP 请求，服务用来处理业务逻辑。

下面是一个实际的流程：
1. 用户向 Nest App 发送 HTTP 请求。
2. 控制器 (Controller) 接收到请求。
3. 控制器 (Controller) 调用服务 (Service) 中的方法处理业务逻辑。
4. 服务 (Service) 返回值，控制器将结果返回给用户。

## 安装 Nest CLI

Nest CLI 是官方提供的脚手架工具，用于帮助我们创建、开发和维护 Nest 应用程序。

建议全局安装：

```sh
npm install -g @nestjs/cli
```

更新 (有新版本时可以执行以下命令)：

```sh
npm update -g @nestjs/cli
```

## 创建 Nest 项目

```sh
nest new 项目名
```

## 运行项目

```sh
cd 项目所在文件夹
```

```sh
npm run start:dev
```

在浏览器中，打开 [http://localhost:3000](http://localhost:3000) 查看运行情况。