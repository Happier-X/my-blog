---
cover: https://t.alcy.cc/fj?t=1734433200
order: 6
date: 2024-12-17 19:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 异常过滤器

## Nest 错误处理机制

Nest 提供了异常过滤器，它会捕捉抛出的异常，并将返回一个友好的响应。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E5%BC%82%E5%B8%B8%E8%BF%87%E6%BB%A4%E5%99%A801.jpg)

这里我们修改一下 `app.controller.ts`，在 `getHello` 方法中抛出一个异常。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        throw new Error('出错了！')
        return this.appService.getHello()
    }
}
```

启动项目，访问 `http://localhost:3000`，可以看到返回了如下信息。

```json
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

并没有返回我们定义的错误信息。这是因为 Nest 帮我们处理了异常，返回了一个错误信息。

## 抛出标准异常

Nest 提供了 `HttpException` 类，它是 Nest 的标准异常类，通过给它传递一个错误码 (status) 和错误信息 (response)，可以抛出标准的 HTTP 错误信息。

这里我们以 `app.controller.ts` 为例。

```TypeScript
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        throw new HttpException('出错了！', HttpStatus.BAD_REQUEST)
        return this.appService.getHello()
    }
}
```

此时，访问 `http://localhost:3000`，可以看到返回了如下信息。

```json
{
    "statusCode": 400,
    "message": "出错了！"
}
```

如果我们想覆盖整个响应，可以给错误信息 (response) 传入一个对象。

```TypeScript
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        throw new HttpException(
            {
                code: HttpStatus.BAD_REQUEST,
                msg: '出错了！'
            },
            HttpStatus.BAD_REQUEST
        )
        return this.appService.getHello()
    }
}
```

此时，访问 `http://localhost:3000`，可以看到返回了如下信息。

```json
{
    "code": 400,
    "msg": "出错了！"
}
```

## 内置 HTTP 异常

Nest 提供了一组内置的 HTTP 异常类，它们都是 `HttpException` 的子类，代表了常见的 HTTP 错误。

| 异常类 | 错误码 | 错误信息 |
| --- | --- | --- |
|BadRequestException | 400 | Bad Request（错误的请求）|
|UnauthorizedException| 401 | Unauthorized （未授权）|
|NotFoundException| 404 | Not Found （未找到）|
|ForbiddenException| 403 | Forbidden （禁止访问）|
|NotAcceptableException| 406 | Not Acceptable （无法接受）|
|RequestTimeoutException| 408 | Request Timeout （请求超时）|
|ConflictException| 409 | Conflict （冲突）|
|GoneException| 410 | Gone （已删除）|
|HttpVersionNotSupportedException| 505 | Http Version Not Supported （不支持的 HTTP 版本）|
|PayloadTooLargeException| 413 | Payload Too Large （请求实体过大）|
|UnsupportedMediaTypeException| 415 | Unsupported Media Type （不支持的媒体类型）|
|UnprocessableEntityException| 422 | Unprocessable Entity （无法处理的实体）|
|InternalServerErrorException| 500 | Internal Server Error （内部服务器错误）|
|NotImplementedException| 501 | Not Implemented （未实现）|
|ImATeapotException| 418 | I'm a teapot （我是茶壶）|
|MethodNotAllowedException| 405 | Method Not Allowed （方法不允许）|
|BadGatewayException| 502 | Bad Gateway （错误的网关）|
|ServiceUnavailableException| 503 | Service Unavailable （服务不可用）|
|GatewayTimeoutException| 504 | Gateway Timeout （网关超时）|
|PreconditionFailedException| 412 | Precondition Failed （先决条件失败）|

这里我们以 `BadRequestException` 为例，修改 `app.controller.ts`。

```TypeScript
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        throw new BadRequestException('出错了！')
        return this.appService.getHello()
    }
}
```

此时，访问 `http://localhost:3000`，可以看到返回了如下信息。

```json
{
    "message": "出错了！",
    "error": "Bad Request",
    "statusCode": 400
}
```

同样可以传入一个对象，覆盖整个响应。

```TypeScript
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        throw new BadRequestException({ msg: '出错了！' })
        return this.appService.getHello()
    }
}
```

此时，访问 `http://localhost:3000`，可以看到返回了如下信息。

```json
{
    "msg": "出错了！"
}
```

## 自定义异常

除了内置的 HTTP 异常，我们还可以通过继承 `HttpException` 来创建自定义异常。

我们在 `src/exceptions` 下新增一个 `custom.exception.ts` 文件，并编写如下代码。

```TypeScript
import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomException extends HttpException {
    constructor() {
        super('未知错误', HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
```

然后，在 `app.controller.ts` 中，我们使用自定义异常。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { CustomException } from './exceptions/custom.exception'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        throw new CustomException()
        return this.appService.getHello()
    }
}
```

此时，访问 `http://localhost:3000`，可以看到返回了如下信息。

```json
{
    "statusCode": 500,
    "message": "未知错误"
}
```

## 自定义异常过滤器

Nest 允许我们创建自定义异常过滤器，以处理应用程序中抛出的异常。异常过滤器必须要使用 `@Catch()` 装饰器来捕捉错误，可以指定捕捉特定的异常，也可以捕捉全部的异常，若要捕捉全部的异常，则可以不传参数给 `@Catch()` 装饰器。此外，异常过滤器这个类要实现 `ExceptionFilter`，它会限制一定要设计 `catch()` 方法。

这里我们使用如下命令来创建一个自定义异常过滤器。

```sh
nest generate filter filters/http-exception
```

我们可以在 `src/filters` 下看到一个 `http-exception.filter.ts` 文件，其内容如下。

```TypeScript
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
```

我们修改一下 `http-exception.filter.ts` 文件。

```TypeScript
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const status = exception.getStatus()
        const message = exception.message
        const timestamp = new Date().toISOString()
        const responseObject = {
            code: status,
            message: message,
            timestamp: timestamp
        }
        response.status(status).json(responseObject)
    }
}
```

这个自定义异常过滤器，会捕捉所有 `HttpException` 类型的异常，并返回一个如下格式的自定义的响应对象。

```json
{
    "code": 400,
    "message": "出错了！",
    "timestamp": "2021-08-25T09:43:25.748Z"
}
```

## 参数宿主

参数宿主 `ArgumentsHost` 是一个用来获取当前请求相关参数的类。因为 Nest 可以运行在多种环境中，比如 HTTP、微服务、WebSocket 等，所以参数宿主 `ArgumentsHost` 是一个抽象类，它提供了多种方法来获取不同环境下的参数。

可以通过 `getType()` 可以获得当前应用类型，以 HTTP 为例，其返回值如下。

```TypeScript
host.getType() // http
```

可以通过 `getArgs()` 可以获得封装参数，以 HTTP 为例，其返回值如下。

```TypeScript
host.getArgs() // [Request, Response, NextFunction]
const [request, response, next] = host.getArgs()
const request = host.getArgByIndex(0) // 也可以通过索引获得参数
```

当我们在不同环境中复用时，可以采用以下方式来获取参数。

```TypeScript
const rpcCtx = host.switchToRpc() // 微服务
const httpCtx = host.switchToHttp() // HTTP
const wsCtx = host.switchToWs() // WebSocket
```

## 使用异常过滤器

## 局部使用

局部使用异常过滤器，只需要在控制器方法或者控制器上使用 `@UseFilters()` 装饰器即可。

这里以 `AppController` 为例，在控制器方法中使用，它只会针对该方法生效，我们修改一下 `app.controller.ts` 文件。

```TypeScript
import {
    BadRequestException,
    Controller,
    Get,
    UseFilters
} from '@nestjs/common'
import { AppService } from './app.service'
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseFilters(HttpExceptionFilter)
    getHello() {
        throw new BadRequestException('出错了')
        return this.appService.getHello()
    }
}
```

我们也可以在控制器上使用，只需要将 `@UseFilters()` 装饰器放在控制器上即可。这里以 `AppController` 为例，在控制器上使用，它会对整个控制器生效，我们修改一下 `app.controller.ts` 文件。

```TypeScript
import {
    BadRequestException,
    Controller,
    Get,
    UseFilters
} from '@nestjs/common'
import { AppService } from './app.service'
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter'

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        throw new BadRequestException('出错了')
        return this.appService.getHello()
    }
}
```

此时我们访问 `http://localhost:3000`，会得到如下响应。

```json
{
    "code": 400,
    "message": "出错了",
    "timestamp": "2024-12-21T06:20:30.720Z"
}
```

> `@UseFilters()` 可以传入类或实例，尽量使用类的方式，而不是实例。这样做可以减少内存使用，因为 Nest 可以在整个模块中轻松重用相同类的实例。

## 全局使用

全局使用异常过滤器，只需要在 `main.ts` 中使用 `useGlobalFilters()` 方法即可。

```TypeScript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(3000)
}
bootstrap()
```

也可以使用依赖注入的方式，在 `AppModule` 中进行配置。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {}
```