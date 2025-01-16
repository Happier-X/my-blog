---
cover: https://t.alcy.cc/fj?t=1735542000000
order: 11
date: 2024-12-30 15:00:00
category: 开发
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

有时候我们需要针对不同的方法设置不同的元数据，这时候我们可以使用 `@SetMetadata` 装饰器。例如，角色权限。

我们创建一个 `Roles` 装饰器。

```sh
nest generate decorator decorators/roles
```

此时会在 `src/decorators/roles` 下创建一个 `roles.decorator.ts` 文件。

```TypeScript
import { SetMetadata } from '@nestjs/common'

export const Roles = (...args: string[]) => SetMetadata('roles', args)
```

以上代码的含义是：`Roles` 表示装饰器，通过 `@Roles('admin')` 将 `admin` 添加到装饰器中，`SetMetadata` 指定 `roles` 为 `key`，并将 `['admin']` 设为 `value`，最后设置为元数据。

我们创建一个 `RoleGuard` 来实现角色权限。

```sh
nest generate guard guards/role
```

此时会在 `src/guards/role` 下创建一个 `role.guard.ts` 文件和 `role.guard.spec.ts` 文件。

要获得元数据，我们需要通过依赖注入的方式使用 `Reflector`，并使用 `get()` 来获得指定的元数据，修改 `role.guard.ts` 文件。

```TypeScript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler()
        )
        const request = context.switchToHttp().getRequest()
        const user = request.user
        if (roles.find((role) => user.roles.includes(role))) {
            return true
        } else {
            return false
        }
    }
}
```

调整 `AddUserMiddleware` 文件，添加 `roles` 属性。

```TypeScript
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class AddUserMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        req.user = { name: 'Happier', roles: ['user'] }
        next()
    }
}
```

然后在 `app.controller.ts` 文件中使用 `@Roles()` 装饰器。

```TypeScript
import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from './decorators/user/user.decorator'
import { Roles } from './decorators/roles/roles.decorator'
import { RoleGuard } from './guards/role/role.guard'

@Controller()
export class AppController {
    constructor() {}

    @Get()
    @Roles('admin')
    @UseGuards(RoleGuard)
    getHello(@User('name') name: string): string {
        return name
    }
}
```

当我们访问 `http://localhost:3000/` 时，可以看到返回了如下内容。

```json
{
  "message": "Forbidden resource",
  "error": "Forbidden",
  "statusCode": 403
}
```

我们再次修改 `AddUserMiddleware` 文件，添加 `roles` 属性。

```TypeScript
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class AddUserMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        req.user = { name: 'Happier', roles: ['user', 'admin'] }
        next()
    }
}
```

当我们访问 `http://localhost:3000/` 时，可以看到返回了 `Happier`。

## 装饰器聚合

Nest 允许我们使用装饰器聚合，将多个装饰器聚合在一起。

创建一个 `Auth` 装饰器。

```sh
nest generate decorator decorators/auth
```

此时会在 `src/decorators/auth` 下创建一个 `auth.decorator.ts` 文件。

`Auth` 装饰器需要包含 `UseGuards`、`Roles` 装饰器。

创建一个 `AuthGuard`。

```sh
nest generate guard guards/auth
```

修改一下 `auth.decorator.ts` 文件。

```TypeScript
import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth/auth.guard'
import { RoleGuard } from 'src/guards/role/role.guard'
import { Roles } from '../roles/roles.decorator'

export const Auth = (...roles: string[]) =>
    applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard))
```

在 `app.controller.ts` 文件中使用 `Auth` 装饰器。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { Auth } from './decorators/auth/auth.decorator'
import { User } from './decorators/user/user.decorator'

@Controller()
export class AppController {
    constructor() {}

    @Get()
    @Auth('admin')
    getHello(@User('name') name: string): string {
        return name
    }
}
```

当我们访问 `http://localhost:3000/` 时，可以看到返回了 `Happier`。
