---
cover: https://t.alcy.cc/fj?t=1735288200000
order: 9
date: 2024-12-27 16:30
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 拦截器

拦截器 (Interceptors) 可以具有一系列功能，它可以：

- 在函数执行之前/之后添加额外的逻辑。
- 转换从函数返回的结果。
- 转换从函数抛出的异常。
- 扩展基本函数行为。
- 根据所选条件完全重写函数。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%8B%A6%E6%88%AA%E5%99%A801.jpg)

## 创建拦截器

使用如下命令可以快速创建一个拦截器。

```sh
nest generate interceptor <INTERCEPTOR_NAME>
```

> <INTERCEPTOR_NAME> 可以是文件路径，例如 `interceptors/hello-world`。

这里我们创建一个 `HelloWorldInterceptor` 拦截器。

```sh
nest generate interceptor interceptors/hello-world
```

此时会在 `src/interceptors/hello-world` 下创建了一个 `hello-world.interceptor.ts` 文件和一个 `hello-world.interceptor.spec.ts` 文件。

`hello-world.interceptor.ts` 文件内容如下。

```TypeScript
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class HelloWorldInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
    }
}
```

从上面的代码中可以看到 `HelloWorldInterceptor` 类使用了 `@Injectable()` 装饰器，该类实现了 `NestInterceptor` 接口，并且实现了接口要求的 `intercept()` 方法，该方法接收两个参数：`context: ExecutionContext` 和 `next: CallHandler`。

### CallHandler

`CallHandler` 接口实现了 `handle()` 方法，可以在拦截器的某个地方使用它来调用路由处理程序，如果在 `intercept()` 方法的实现中没有调用 `handle()` 方法，则路由处理程序将不会被执行。

由于 `CallHandler` 为 `intercept()` 方法的参数，所以它一定是在 `intercept()` 中被调用，也就是说，可以在返回 `handle()` 之前写一段逻辑，使其可以在进入控制器的方法之前被执行，又因为 `handle()` 返回的是 `Observable`，所以可以通过 `Observable` 的 `pipe()` 方法来对返回值做处理，使其可以在控制器的方法执行之后处理其他逻辑。

> `handle()` 方法返回的是 `Observable`，我们把它作为 `intercept()` 方法的返回值，这样 Nest 就可以订阅 (subscribe) 它了。根据 `Observable` 的特性，若不订阅它，则它不会执行。所以，在 `intercept()` 方法的实现中，必须返回 `handle()` 方法的返回值，否则路由处理程序将不会被执行。

### ExecutionContext

`ExecutionContext` 接口继承自 `ArgumentsHost` 接口，它提供了更多关于此次请求的上下文信息。

#### 获取控制器类

通过 `getClass()` 方法可以获取到当前请求对应的控制器类。

```TypeScript
const controller = context.getClass()
```

#### 获取控制器方法

通过 `getHandler()` 方法可以获取到当前请求对应的控制器方法。

```TypeScript
const method = context.getHandler()
```

## 使用拦截器

首先我们修改一下 `hello-world.interceptor.ts`。

```TypeScript
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class HelloWorldInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Hello World!')
        const input = Date.now()
        const handler = next.handle()
        return handler.pipe(
            tap(() => {
                console.log(`${Date.now() - input}ms`)
            })
        )
    }
}
```

然后我们就可以使用 `@UseInterceptors()` 装饰器来使用拦截器。它可以装饰在控制器类上，也可以装饰在控制器方法上。这里以 `app.controller.ts` 为例。

```TypeScript
import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { HelloWorldInterceptor } from './interceptors/hello-world/hello-world.interceptor'

@Controller()
@UseInterceptors(HelloWorldInterceptor)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
```

当我们访问 `http://localhost:3000/` 时，控制台会输出 `Hello World!`，然后会输出 `1ms`。

## 全局拦截器

在 `main.ts` 中，我们可以通过 `app.useGlobalInterceptors()` 方法来注册全局拦截器。

```TypeScript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HelloWorldInterceptor } from './interceptors/hello-world/hello-world.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalInterceptors(new HelloWorldInterceptor())
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

也可以通过依赖注入的方式在 `AppModule` 中注册全局拦截器。

```TypeScript
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HelloWorldInterceptor } from './interceptors/hello-world/hello-world.interceptor'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: HelloWorldInterceptor
        }
    ]
})
export class AppModule {}
```
