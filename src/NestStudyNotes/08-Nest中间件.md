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

### 函数中间件

这样的中间件函数接收三个参数，分别是 `Request`、`Response` 和 `NextFunction`。

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

此时会在`src`下创建一个`middlewares`文件夹，并在文件夹下生成一个 `logger.middleware.ts` 文件和 一个`logger.middleware.spec.ts` 文件。

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
