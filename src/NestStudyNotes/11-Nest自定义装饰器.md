---
cover: https://t.alcy.cc/fj?t=1735542000000
order: 11
date: 2024-12-30 15:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 自定义装饰器

Nest 允许我们创建自定义装饰器。

## 参数装饰器

使用如下命令可以快速创建一个装饰器。

```sh
nest generate decorator <DECORATOR_NAME>
```

> <DECORATOR_NAME> 可以是文件路径，例如 `decorators/user`。

这里我们创建一个 `User` 装饰器。

```sh
nest generate decorator decorators/user
```

此时会在 `src/decorators/user` 下创建一个 `user.decorator.ts` 文件。

```TypeScript
import { SetMetadata } from '@nestjs/common'

export const User = (...args: string[]) => SetMetadata('user', args)
```

参数装饰器并不是使用 `SetMetadata` 方法，而是使用 `createParamDecorator` 方法。通过 `createParamDecorator` 方法来创建一个参数装饰器，并使用 `ExecutionContext` 来获取请求的上下文，在从中获取请求的参数。这里我们修改 `user.decorator.ts` 文件，使用 `createParamDecorator` 方法。

```TypeScript
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return request.user
    }
)
```

再创建一个中间件。

```sh
nest generate middleware middlewares/add-user
```

此时会在 `src/middlewares/add-user` 下创建一个 `add-user.middleware.ts` 文件和 `add-user.middleware.spec.ts` 文件。

修改 `add-user.middleware.ts` 文件。

```TypeScript
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class AddUserMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        req.user = { name: 'Happier' }
        next()
    }
}
```

然后在 `app.module.ts` 文件中注册中间件。

```TypeScript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AddUserMiddleware } from './middlewares/add-user/add-user.middleware'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AddUserMiddleware).forRoutes('*')
    }
}
```

此时我们将 `user` 添加到了请求中。我们使用 `@User()` 装饰器来获取 `user` 对象。修改 `app.controller.ts` 文件。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { User } from './decorators/user/user.decorator'

@Controller()
export class AppController {
    constructor() {}

    @Get()
    getHello(@User() user: any): string {
        return user
    }
}
```

当我们访问 `http://localhost:3000/` 时，可以看到返回的 `user` 对象。

```json
{
  "name": "Happier"
}
```

如果我们想要像 `@Param('id')` 一样，获取特定参数，可以从 `createParamDecorator` 中的 `data` 参数中获取。我们修改 `user.decorator.ts` 文件。

```TypeScript
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user
        return data ? user[data] : user
    }
)
```

修改 `app.controller.ts` 文件。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { User } from './decorators/user/user.decorator'

@Controller()
export class AppController {
    constructor() {}

    @Get()
    getHello(@User('name') name: string): string {
        return name
    }
}
```

此时当我们访问 `http://localhost:3000/` 时，可以看到返回了 `Happier`。

## 元数据装饰器

