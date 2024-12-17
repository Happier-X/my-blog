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

