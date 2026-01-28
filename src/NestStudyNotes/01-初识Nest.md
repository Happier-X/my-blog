---
cover: https://t.alcy.cc/fj?t=1733106600000
order: 1
date: 2024-12-02 10:30:00
category: 开发
tag: Nest
excerpt: false
---

# 初识 Nest

## Nest 基本概念

Nest 采用模块化设计，将功能拆分到不同的模块 (Modules) 中，至少有一个根模块 (Root Module)，模块以树状结构组织。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/%E5%88%9D%E8%AF%86Nest01.jpg)

一个有路由的模块会包含控制器 (Controllers) 和服务 (Services)。控制器与服务通过模块进行关联，将服务注入 (Inject) 到控制器中使用，这样控制器用来处理 HTTP 请求，服务用来处理业务逻辑。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/%E5%88%9D%E8%AF%86Nest02.jpg)

下面是一个实际的流程：

1. 用户向 Nest App 发送 HTTP 请求。
2. 控制器接收到请求。
3. 控制器调用服务中的方法处理业务逻辑。
4. 服务返回值，控制器将结果返回给用户。

## 构建 Nest App

### 安装 Nest CLI

Nest CLI 是官方提供的脚手架工具，用于帮助我们创建、开发和维护 Nest 应用程序。

建议全局安装。

```sh
npm install -g @nestjs/cli
```

更新 (有新版本时可以执行以下命令)。

```sh
npm update -g @nestjs/cli
```

### 创建 Nest 项目

```sh
nest new 项目名
```

### 运行项目

```sh
cd 项目所在文件夹
```

```sh
npm run start:dev
```

在浏览器中，打开 [http://localhost:3000](http://localhost:3000) 查看运行情况。

## Nest 项目结构

```sh
.
├─ dist
├─ node_modules
├─ src
|  ├─ app.controller.ts
|  ├─ app.controller.spec.ts
|  ├─ app.module.ts
|  ├─ app.service.ts
|  └─ main.ts
├─ test
|  ├─ app.e2e-spec.ts
|  └─ jest-e2e.json
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ nest-cli.json
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ tsconfig.build.json
└─ README.md
```

- `dist`：编译后的文件。
- `node_modules`：依赖包。
- `src`：源码。
- `test`：测试代码。
- `.eslintrc.js`：ESLint 配置文件。
- `.gitignore`：Git 忽略文件。
- `.prettierrc`：Prettier 配置文件。
- `nest-cli.json`：Nest CLI 配置文件。
- `package.json`：项目依赖包。
- `package-lock.json`：项目依赖包锁文件。
- `tsconfig.json`：TypeScript 配置文件。
- `tsconfig.build.json`：TypeScript 编译配置文件。

## 代码分析

### 项目入口文件

`src/main.ts` 为项目入口文件。

```TypeScript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

以异步的 `bootstrap` 函数，通过 `NestFactory.create(AppModule)` 创建一个 Nest App 实例，并调用该实例的 `listen` 方法启动服务。

### 根模块

`src/app.module.ts` 为根模块。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoController } from './todo/todo.controller'

@Module({
    imports: [],
    controllers: [AppController, TodoController],
    providers: [AppService]
})
export class AppModule {}
```

定义了一个名为 `AppModule` 的类，通过 `@Module()` 装饰器，将 `AppModule` 定义为一个模块，同时在这里定义了该模块的控制器和服务。

`app.controller.ts` 是注册在 `AppModule` 中的控制器。它不是必须的。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
```

定义了一个名为 `AppController` 的类，通过 `@Controller()` 装饰器，将 `AppController` 定义为一个控制器。这里的方法使用了 `@Get()` 装饰器，表示该方法处理 HTTP GET 请求。在 `constructor` 中使用依赖注入的方式，将 `AppService` 注入到 `AppController` 中，这样 `AppController` 可以调用 `AppService` 中的方法。

`app.service.ts` 是注册在 `AppModule` 中的服务。它不是必须的。

```TypeScript
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!'
    }
}
```

定义了一个名为 `AppService` 的类，这里使用的是 `@Injectable()` 装饰器，原因是服务属于抽象的概念，Nest 中许多抽象概念可以使用 `@Injectable()` 装饰器进行标记，它们统称为提供者 (Providers)。
