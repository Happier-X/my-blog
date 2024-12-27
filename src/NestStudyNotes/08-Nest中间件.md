---
cover: https://t.alcy.cc/fj?t=1735282800000
order: 8
date: 2024-12-27 15:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 中间件

中间件 (Middleware) 是在路由处理程序之前调用的函数。中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 `next()` 中间件函数。

中间件函数可以执行以下任务：

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求 - 响应周期。
- 调用堆栈中的下一个中间件函数。
- 如果当前的中间件函数没有结束请求 - 响应周期，它必须调用 `next()` 将控制传递给下一个中间件函数。否则，请求将被挂起。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E4%B8%AD%E9%97%B4%E4%BB%B601.jpg)

## 创建中间件

中间件有两种创建方式，一种是使用普通的函数，另一种是使用带 `@Injectable()` 装饰器的类，并实现 `NestMiddleware` 接口。

### 函数式中间件

中间件函数接收三个参数，分别是 `Request`、`Response` 和 `NextFunction`。

```TypeScript
import { Request, Response, NextFunction } from 'express'

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request...')
    next()
}
```

### 类中间件

使用如下命令可以快速创建一个中间件。

```sh
nest generate middleware <MIDDLEWARE_NAME>
```

> <MIDDLEWARE_NAME> 可以是文件路径，例如 `middlewares/logger`。

这里我们创建一个 `LoggerMiddleware` 中间件。

```sh
nest generate middleware middlewares/logger
```

此时会在 `src` 下创建一个 `middlewares` 文件夹，并在文件夹下生成一个 `logger.middleware.ts` 文件和一个 `logger.middleware.spec.ts` 文件。

`logger.middleware.ts` 文件内容如下。

```TypeScript
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        next()
    }
}
```

## 使用中间件

使用模块类的 `configure()` 方法来配置中间件。包含中间件的模块必须实现 `NestModule` 接口。

这里我们先调整一下 `LoggerMiddleware` 的内容。

```TypeScript
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Hello Request')
        next()
    }
}
```

创建 `TodoModule` 和 `TodoController`。

```sh
nest generate module features/todo
nest generate controller features/todo
```

调整 `todo.controller.ts`。

```TypeScript
import { Controller, Get, Param } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Get()
    getAll() {
        return []
    }
    @Get(':id')
    get(@Param('id') id: string) {
        return { id }
    }
}
```

在 `app.module.ts` 中配置中间件，将 `AppModule` 配置为 `NestModule` 接口的实现，并实现 `configure()` 方法，通过 `forRoutes()` 方法指定中间件应用的路由。

```TypeScript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './features/todo/todo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/todos')
    }
}
```

当我们访问 `http://localhost:3000/todos` 或 `http://localhost:3000/todos/1` 时，会看到控制台打印了 `Hello Request`。而访问 `http://localhost:3000` 时，不会打印任何内容。

### 绑定多个路由与指定 Http 方法

通过 `forRoutes()` 方法可以绑定多个路由，也可以指定 Http 方法。

```TypeScript
import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './features/todo/todo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(
            {
                path: '/todos',
                method: RequestMethod.POST
            }, // POST /todos
            {
                path: '/',
                method: RequestMethod.GET
            } // GET /
        )
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 POST 请求时，会看到控制台打印了 `Hello Request`。而向 `http://localhost:3000/` 发送 GET 请求时，也会看到控制台打印了 `Hello Request`。

### 绑定控制器

通过 `forRoutes()` 方法可以绑定控制器。

```TypeScript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoController } from './features/todo/todo.controller'
import { TodoModule } from './features/todo/todo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(TodoController)
    }
}
```

当我们访问 `http://localhost:3000/todos` 以及 `http://localhost:3000/todos/1` 时，都看到控制台打印了 `Hello Request`。

### 排除特定路由与指定 Http 方法

通过 `exclude()` 方法可以排除特定路由与指定 Http 方法。

```TypeScript
import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoController } from './features/todo/todo.controller'
import { TodoModule } from './features/todo/todo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .exclude({
                path: '/todos',
                method: RequestMethod.GET
            })
            .forRoutes(TodoController)
    }
}
```

当我们访问 `http://localhost:3000/todos` 时，控制台不会打印任何内容。

### 应用多个中间件

通过 `apply()` 方法可以应用多个中间件，只需要将多个中间件作为参数传递给 `apply()` 方法即可。

这里我们创建一个 `OtherMiddleware` 中间件。

```sh
nest generate middleware middlewares/other
```

调整 `other.middleware.ts` 文件内容。

```TypeScript
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class OtherMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('OtherMiddleware')
        next()
    }
}
```

在 `app.module.ts` 中配置中间件，应用多个中间件。

```TypeScript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoController } from './features/todo/todo.controller'
import { TodoModule } from './features/todo/todo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'
import { OtherMiddleware } from './middlewares/other/other.middleware'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware, OtherMiddleware)
            .forRoutes(TodoController)
    }
}
```

当我们访问 `http://localhost:3000/todos` 时，会看到控制台打印了 `Hello Request` 和 `OtherMiddleware`。

## 全局中间件

在 `main.ts` 中使用 `use()` 方法，可以实现全局中间件。

```TypeScript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NextFunction, Request, Response } from 'express'

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Hello Request')
    next()
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(logger)
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

> 此方式只适用于函数式中间件。

如果是类中间件，则可以在 `AppModule` 中使用 `configure()` 方法，并指定路由为 `*`。

```TypeScript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './features/todo/todo.module'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
```
